#!/usr/bin/env python3
"""PostToolUse(Write|Edit): run prettier + eslint --fix on the edited file and tell Claude what changed.

Silent rewrites used to bite twice: eslint dropped an import whose usage hadn't
landed yet, and prettier rewrapped text so the next Edit's old_string missed.
Now the hook hands back the diff, so Claude sees the file as it really is.
"""
import difflib
import json
import os
import subprocess
import sys

ESLINT_EXT = (".vue", ".js", ".mjs")
PRETTIER_EXT = ESLINT_EXT + (".css", ".scss")
MAX_DIFF_LINES = 40
MAX_LINT_MESSAGES = 8


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def run_eslint(bin_dir, path):
    """eslint --fix; return the problems it could not fix."""
    out = subprocess.run([os.path.join(bin_dir, "eslint"), "--fix", "--no-warn-ignored", "--format", "json", path],
                         capture_output=True, text=True).stdout
    try:
        return [m for r in json.loads(out) for m in r.get("messages", [])]
    except ValueError:
        return []


def describe_diff(before, after, rel):
    diff = list(difflib.unified_diff(before.splitlines(), after.splitlines(),
                                     f"{rel} (as written)", f"{rel} (on disk)", n=0, lineterm=""))
    if not diff:
        return None
    body = diff[2:]
    if len(body) > MAX_DIFF_LINES:
        hunks = [l for l in body if l.startswith("@@")]
        return (f"prettier/eslint rewrote {rel} in {len(hunks)} places (diff too long to show: "
                f"{' '.join(h.split(' ')[2] for h in hunks[:12])}). Re-read it before editing again.")
    return (f"prettier/eslint changed {rel} after your edit; it now differs from what you wrote "
            f"(+ = on disk now). Edit against this, not your own text:\n" + "\n".join(body))


def describe_lint(problems, rel):
    if not problems:
        return None
    lines = [f"  {m.get('line', '?')}:{m.get('column', '?')} {m.get('ruleId') or 'error'}: {m.get('message', '')}"
             for m in problems[:MAX_LINT_MESSAGES]]
    more = f"\n  … {len(problems) - MAX_LINT_MESSAGES} more" if len(problems) > MAX_LINT_MESSAGES else ""
    return f"eslint still reports {len(problems)} problem(s) in {rel} (lint:check fails on any):\n" + "\n".join(lines) + more


def main():
    try:
        data = json.load(sys.stdin)
    except ValueError:
        return
    path = (data.get("tool_input") or {}).get("file_path", "")
    root = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd", "")
    if not (path.endswith(PRETTIER_EXT) and os.path.isfile(path) and root):
        return
    path, root = os.path.realpath(path), os.path.realpath(root)
    if not path.startswith(root + os.sep):
        return  # another project's file: its own tooling, not ours
    bin_dir = os.path.join(root, "node_modules", ".bin")
    rel = os.path.relpath(path, root)

    written = read(path)
    subprocess.run([os.path.join(bin_dir, "prettier"), "--write", path], capture_output=True)
    problems = run_eslint(bin_dir, path) if path.endswith(ESLINT_EXT) else []
    notes = [n for n in (describe_diff(written, read(path), rel), describe_lint(problems, rel)) if n]
    if notes:
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse",
                                                 "additionalContext": "\n\n".join(notes)}}))


if __name__ == "__main__":
    main()
