"""One-time local integration into current EN/FR/AR HTML. No deployment build step.

Run from repository root: python3 scripts/add_manufacturing_animation.py
This script preserves existing copy, typography, stylesheets, and configurator code.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION = '20260927i'
MARKUP = '<div class="manufacturing-process-visual" aria-hidden="true"><canvas></canvas></div>'
TIMELINE = '<ol class="timeline" id="timeline">'

pending = []
for name in ('index.html', 'fr/index.html', 'ar/index.html'):
    path = ROOT / name
    source = path.read_text(encoding='utf-8')
    prefix = 'assets/' if name == 'index.html' else '../assets/'
    link = f'<link rel="stylesheet" href="{prefix}css/manufacturing-animation.css?v={VERSION}">'
    script = f'<script defer src="{prefix}js/manufacturing-animation.js?v={VERSION}"></script>'
    if MARKUP in source and link in source and script in source:
        print(f'{name}: already integrated')
        continue
    if any(part in source for part in (MARKUP, link, script)):
        raise SystemExit(f'{name}: partial integration found; inspect manually before continuing')
    if source.count(TIMELINE) != 1 or source.count('</head>') != 1 or source.count('</body>') != 1:
        raise SystemExit(f'{name}: expected page structure differs; no files changed')
    updated = source.replace(TIMELINE, MARKUP + TIMELINE, 1)
    updated = updated.replace('</head>', link + '</head>', 1)
    updated = updated.replace('</body>', script + '</body>', 1)
    pending.append((path, name, updated))

# Validate every locale before changing any page.
for path, name, updated in pending:
    path.write_text(updated, encoding='utf-8')
    print(f'{name}: animation integrated')
