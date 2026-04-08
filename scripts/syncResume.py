# python3 scripts/syncResume.py
# python3 scripts/syncResume.py --push

import re
import sys
import os
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
RESUME_PATH = os.path.join(PROJECT_DIR, '..', 'resume-rawnak', 'resume.tex')
DATA_PATH = os.path.join(PROJECT_DIR, 'src', 'data.ts')


def clean_latex(text: str) -> str:
    text = re.sub(r'\\textbf\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\textit\{([^}]*)\}', r'\1', text)
    text = re.sub(r'\\href\{[^}]*\}\{([^}]*)\}', r'\1', text)
    text = text.replace('\\&', '&')
    text = text.replace('\\%', '%')
    text = text.replace('\\#', '#')
    text = text.replace('\\_', '_')
    text = text.replace('~', ' ')
    text = re.sub(r'[{}]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def extract_braced(source: str, start: int) -> tuple[str, int]:
    i = start
    while i < len(source) and source[i] != '{':
        i += 1
    content_start = i + 1
    depth = 1
    i += 1
    while i < len(source) and depth > 0:
        if source[i] == '{':
            depth += 1
        elif source[i] == '}':
            depth -= 1
        i += 1
    return source[content_start:i - 1], i


def parse_work_items(source: str) -> list[dict]:
    m = re.search(r'\\section\{Experience\}(.*?)\\section\{Technical Skills\}', source, re.DOTALL)
    if not m:
        print('Could not find Experience section in resume.tex', file=sys.stderr)
        sys.exit(1)

    section = m.group(1)

    pattern = re.compile(
        r'\\resumeSubheading\s*'
        r'\{([^}]*)\}\{([^}]*)\}\s*'
        r'\{([^}]*)\}\{([^}]*)\}\s*'
        r'\\resumeItemListStart(.*?)\\resumeItemListEnd',
        re.DOTALL,
    )

    items = []
    for match in pattern.finditer(section):
        company, date, role, location, raw_points = match.groups()

        points = []
        for item_match in re.finditer(r'\\resumeItem\{', raw_points):
            content, _ = extract_braced(raw_points, item_match.start() + len('\\resumeItem'))
            points.append(clean_latex(content))

        items.append({
            'company': clean_latex(company),
            'role': clean_latex(role),
            'date': clean_latex(date),
            'location': clean_latex(location),
            'points': points,
        })

    return items


def format_items(items: list[dict]) -> str:
    def escape(s: str) -> str:
        return s.replace('\\', '\\\\').replace("'", "\\'")

    entries = []
    for item in items:
        points_str = '\n'.join(f"      '{escape(p)}'," for p in item['points'])
        entries.append(
            f"  {{\n"
            f"    company: '{escape(item['company'])}',\n"
            f"    role: '{escape(item['role'])}',\n"
            f"    date: '{escape(item['date'])}',\n"
            f"    location: '{escape(item['location'])}',\n"
            f"    points: [\n{points_str}\n    ],\n"
            f"  }},"
        )
    return 'export const workItems: WorkItem[] = [\n' + '\n'.join(entries) + '\n];'


def git_push():
    subprocess.run(['git', 'add', DATA_PATH], cwd=PROJECT_DIR, check=True)
    subprocess.run(
        ['git', 'commit', '-m', 'sync work items from resume.tex'],
        cwd=PROJECT_DIR, check=True,
    )
    subprocess.run(['git', 'push'], cwd=PROJECT_DIR, check=True)
    print('Pushed to remote.')


def main():
    should_push = '--push' in sys.argv

    source = open(RESUME_PATH).read()
    items = parse_work_items(source)

    data = open(DATA_PATH).read()
    new_array = format_items(items)
    updated = re.sub(
        r'export const workItems: WorkItem\[\] = \[[\s\S]*?\n\];',
        new_array,
        data,
    )

    with open(DATA_PATH, 'w') as f:
        f.write(updated)

    print(f'Synced {len(items)} work items from resume.tex -> data.ts')

    if should_push:
        git_push()


if __name__ == '__main__':
    main()
