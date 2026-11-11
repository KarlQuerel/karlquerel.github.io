#!/usr/bin/env python3
"""Enforce this repo's hard git/npm rules (CLAUDE.md) as hooks, not prose.

  repo-rules.py prompt   UserPromptSubmit: remember whether this prompt asked to commit/push.
  repo-rules.py          PreToolUse(Bash): deny or ask before rule-breaking commands.
"""
import json
import os
import re
import shlex
import sys

# Consent lives per session, cleared by the next prompt that doesn't ask again.
STATE_DIR = os.path.join(os.environ.get("XDG_RUNTIME_DIR") or "/tmp", "claude-repo-rules")
NEGATION = re.compile(r"\b(don'?t|do not|never|no|not|without|avoid)\b[^.,;!?\n]{0,24}$", re.I)
OPERATORS = {"&&", "||", ";", "|", "&", "(", ")", ";;"}
GIT_OPTS_WITH_VALUE = {"-C", "-c", "--git-dir", "--work-tree", "--namespace"}
INSTALL_SUBCOMMANDS = {"npm": {"install", "i", "in", "add", "isntall"}, "pnpm": {"add", "install", "i"}, "yarn": {"add"}}


def state_path(session):
    return os.path.join(STATE_DIR, re.sub(r"[^\w-]", "_", session or "unknown") + ".json")


def asked_for(prompt, word):
    """True if the prompt mentions `word` at least once without a negation just before it."""
    for m in re.finditer(rf"\b{word}", prompt, re.I):
        if not NEGATION.search(prompt[max(0, m.start() - 40):m.start()]):
            return True
    return False


def record_prompt(data):
    prompt = data.get("prompt", "")
    push = asked_for(prompt, "push")
    consent = {"commit": push or asked_for(prompt, "commit"), "push": push}
    os.makedirs(STATE_DIR, exist_ok=True)
    with open(state_path(data.get("session_id")), "w") as f:
        json.dump(consent, f)


def consent_for(session):
    try:
        with open(state_path(session)) as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def tokens(cmd):
    try:
        lex = shlex.shlex(cmd, posix=True, punctuation_chars=True)
        lex.whitespace_split = True
        return list(lex)
    except ValueError:
        return re.findall(r"&&|\|\||[;&|()]|[^\s;&|()]+", cmd)


def invocations(toks, names):
    """Yield (program, args) for every occurrence of a program in `names`, args up to the next operator."""
    for i, tok in enumerate(toks):
        prog = os.path.basename(tok)
        if prog not in names:
            continue
        args = []
        for t in toks[i + 1:]:
            if t in OPERATORS:
                break
            args.append(t)
        yield prog, args


def git_sub(args):
    """Split git args into (subcommand, rest), skipping global options like -C <dir>."""
    i = 0
    while i < len(args) and args[i].startswith("-"):
        i += 2 if args[i] in GIT_OPTS_WITH_VALUE else 1
    return (args[i], args[i + 1:]) if i < len(args) else ("", [])


def check_git(sub, rest, consent):
    if sub == "stash" and (not rest or rest[0] not in {"list", "show"}):
        return "deny", ("Never stash in this checkout: peer sessions keep uncommitted work here and a stash "
                        "hides it from them. To compare before/after, edit your own file instead.")
    if (sub == "checkout" and any(a in {"-b", "-B", "--orphan"} for a in rest)) or \
       (sub == "switch" and any(a in {"-c", "-C", "--create", "--force-create", "--orphan"} for a in rest)) or \
       (sub == "branch" and rest and not rest[0].startswith("-")):
        return "deny", "No new branches on this repo: all work lands directly on master (CLAUDE.md)."
    if sub == "worktree" and rest[:1] == ["add"]:
        return "deny", "No git worktrees on this repo: edit the master checkout in place (CLAUDE.md)."
    if sub == "push" and not consent.get("push"):
        return "ask", ("Karl's latest message did not ask for a push. A push to master deploys the site, "
                       "and he reviews on 5173 first.")
    if sub == "commit" and not consent.get("commit"):
        return "ask", "Karl's latest message did not ask for a commit; he reviews changes before committing."
    return None


def check_install(prog, args):
    if not args or args[0] not in INSTALL_SUBCOMMANDS[prog]:
        return None
    pkgs = [a for a in args[1:] if not a.startswith("-")]
    if pkgs:
        return "ask", (f"Adds npm dependencies ({', '.join(pkgs)}). CLAUDE.md: never install new "
                       f"dependencies without asking; keep the bundle lean.")
    return None


def check_bash(data):
    toks = tokens(data.get("tool_input", {}).get("command", ""))
    consent = consent_for(data.get("session_id"))
    verdicts = [check_git(*git_sub(args), consent) for _, args in invocations(toks, {"git"})]
    verdicts += [check_install(prog, args) for prog, args in invocations(toks, set(INSTALL_SUBCOMMANDS))]
    verdicts = [v for v in verdicts if v]
    if not verdicts:
        return
    # deny outranks ask; report every reason so one round trip covers the whole command
    kind = "deny" if any(k == "deny" for k, _ in verdicts) else "ask"
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": kind,
            "permissionDecisionReason": " ".join(dict.fromkeys(r for _, r in verdicts)),
        }
    }))


def main():
    try:
        data = json.load(sys.stdin)
    except ValueError:
        return
    if sys.argv[1:] == ["prompt"]:
        record_prompt(data)
    else:
        check_bash(data)


if __name__ == "__main__":
    main()
