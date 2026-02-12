#!/usr/bin/env python3
"""
Syncs a specific Apple Note to your website.

Usage:
    python3 sync_note.py "My Note Title"
    python3 sync_note.py "My Note Title" --push

The script reads the note content from Apple Notes using AppleScript,
updates src/noteContent.ts, and optionally commits + pushes to trigger
a redeploy.
"""

import subprocess
import sys
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "src", "noteContent.ts")


def read_apple_note(note_title: str) -> str:
    """Read a note's content from Apple Notes via AppleScript."""
    applescript = f'''
    tell application "Notes"
        set noteList to every note whose name is "{note_title}"
        if (count of noteList) is 0 then
            error "Note not found: {note_title}"
        end if
        set theNote to item 1 of noteList
        return plaintext of theNote
    end tell
    '''
    result = subprocess.run(
        ["osascript", "-e", applescript],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"Error reading note: {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    text = result.stdout.strip()
    # Strip the note title (first line) since Apple Notes includes it
    lines = text.split("\n")
    body = "\n".join(lines[1:]).strip()
    return body if body else text


def write_note_content(content: str):
    """Write the note content to src/noteContent.ts."""
    # Escape backticks and backslashes for the TS template literal
    escaped = content.replace("\\", "\\\\").replace("`", "\\`").replace("$", "\\$")
    ts_content = (
        "// This file is auto-updated by sync_note.py from Apple Notes\n"
        f"export const noteContent = `{escaped}`;\n"
    )
    with open(OUTPUT_FILE, "w") as f:
        f.write(ts_content)
    print(f"Updated {OUTPUT_FILE}")


def git_push():
    """Commit and push the updated note content."""
    subprocess.run(["git", "add", OUTPUT_FILE], cwd=SCRIPT_DIR, check=True)
    subprocess.run(
        ["git", "commit", "-m", "update note content from apple notes"],
        cwd=SCRIPT_DIR, check=True
    )
    subprocess.run(["git", "push"], cwd=SCRIPT_DIR, check=True)
    print("Pushed to remote — redeploy should trigger automatically.")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 sync_note.py \"Note Title\" [--push]")
        sys.exit(1)

    note_title = sys.argv[1]
    should_push = "--push" in sys.argv

    print(f"Reading note: {note_title}")
    content = read_apple_note(note_title)
    print(f"Got {len(content)} chars")

    write_note_content(content)

    if should_push:
        git_push()
    else:
        print("Run with --push to also commit and push to remote.")


if __name__ == "__main__":
    main()
