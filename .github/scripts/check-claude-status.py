#!/usr/bin/env python3
"""Emit an alert payload for unresolved major/critical incidents on status.claude.com."""

import json
import os
import urllib.request
from pathlib import Path

API = "https://status.claude.com/api/v2/incidents/unresolved.json"
ALERT_ON = {"major", "critical"}
STATE = Path("alerted.txt")


def fetch_incidents():
    with urllib.request.urlopen(API, timeout=20) as response:
        return json.load(response)["incidents"]


def summarise(incident):
    updates = incident.get("incident_updates") or []
    latest = updates[0]["body"] if updates else ""
    return f"[{incident['impact'].upper()}] {incident['name']}\n{latest}\n{incident['shortlink']}"


def main():
    seen = set(STATE.read_text().split()) if STATE.exists() else set()
    new = [
        i
        for i in fetch_incidents()
        if i["impact"] in ALERT_ON and i["id"] not in seen
    ]

    if new:
        Path("subject.txt").write_text(f"Claude {new[0]['impact']}: {new[0]['name']}")
        Path("body.txt").write_text("\n\n".join(summarise(i) for i in new))
        STATE.write_text("\n".join(sorted(seen | {i["id"] for i in new})))

    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as handle:
            handle.write(f"new={len(new)}\n")
    print(f"{len(new)} new major/critical incident(s)")


if __name__ == "__main__":
    main()
