# 2026-09-27 — Integration fixes

- Manufacturing section: new headline in EN/FR/AR; factory photo and old description removed; full-section production-line animation with translated step names, mirrored for Arabic. Replaces the earlier `manufacturing-animation` add-on (files removed).
- `scripts/build_locales.py` disabled: it no longer matches the pages and would have misplaced translations and blocked the Google map (`frame-src 'none'`). FR/AR pages are edited directly.
- Added the missing social sharing image `assets/images/hr-geant-emballage-social.jpg` (1200 × 630), referenced by every page's Open Graph and Twitter tags.
- WhatsApp button label translated on the French and Arabic pages.
- Removed committed `__pycache__` files; added `.gitignore`.

# HR Géant Emballage — French and Arabic + security update

Version: 2026-09-27-fr-ar-security

Revision: form and RTL fixes. The quote form keeps a stable `form` reference across the asynchronous request, and its honeypot field is `_gotcha`. Arabic headings use normal letter spacing. The static page generator includes a configured HTTPS quote endpoint in the CSP of all three languages when pages are regenerated.

Reconciled with the supplied `hr-geant-emballage-2026-09-27-fixes.zip`: the honeypot no longer sits 10,000 px outside the Arabic page, Arabic text uses zero letter spacing, the honeypot is hidden from assistive technology, and the WhatsApp vector path is repaired. The automatic CSP endpoint handling is retained.

The ZIP contains 15 files (plus directory entries). In particular:
- `fr/index.html` — complete French page, with French metadata.
- `ar/index.html` — complete Arabic page, with `lang="ar" dir="rtl"`.
- `scripts/build_locales.py` — source translation strings and static page generator.
- `assets/js/main.js` — localized product cards and form messages.
- `assets/css/style.css` — Arabic layout and self-hosted font stack.
- `assets/logo.png` — optimized 128 px concept emblem.
- `index.html`, `fr/index.html`, `ar/index.html` — CSP and referrer policy; matching www canonical URLs.
- `sitemap.xml` and `robots.txt` — matching www URLs.

The quotation form stays inactive until a verified endpoint is configured. The photos remain concept visuals; replace with approved HR photography. Verify the emblem against approved brand artwork.
