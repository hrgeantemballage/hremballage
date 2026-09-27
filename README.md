# HR Géant Emballage website

Static GitHub Pages website. The included `CNAME` preserves the existing `www.hrgeantemballage.com` GitHub Pages domain. No build step is required.

## Before launch

- Replace illustrative imagery in `assets/images/` with approved company photography. Current images are original concept visuals, not documentary images of the HR factory or products.
- Verify the isolated emblem in `assets/logo.png` against approved brand artwork before print or brand-sensitive use. It is an optimized 128 × 128 concept extraction, not a verified copy of the official artwork.
- Replace every `[ADD REAL DATA]` with verified contact details, capabilities and case studies, or remove those placeholders when publishing a customer-facing version.
- Set `FORM_ENDPOINT` in `assets/js/main.js` to a tested HTTPS endpoint supporting multipart uploads, then add the endpoint origin to `connect-src` in the Content-Security-Policy `<meta>` tag of all three pages. Test the submission and confirmation with the chosen service. The quote form deliberately does not transmit until configured.
- The honeypot is named `_gotcha`, and the client checks artwork against a 10 MB limit. Configure the future form service or Worker to inspect the same `_gotcha` field, enforce file types and size, and add its own rate limits. Client-side checks alone do not stop spam or oversized requests.
- Set `WHATSAPP_NUMBER` in `assets/js/main.js` to the verified international digits. The floating action stays hidden until then.
- Review the French and Arabic editorial copy with a native industry specialist before final publication. The site includes static localized pages at `/fr/` and `/ar/`; the latter sets `lang="ar" dir="rtl"`. **Edit all three pages directly** (`index.html`, `fr/index.html`, `ar/index.html`) and keep them in sync. `scripts/build_locales.py` is outdated and disabled: it was written for an older page and would misplace translations and block the Google map. Dynamic product content and status messages live in `assets/js/main.js`.
- Check actual printing processes, flute profiles and plant-specific stages before presenting them as capabilities.

## File structure

`index.html` · `fr/index.html` · `ar/index.html` · `CNAME` · `robots.txt` · `sitemap.xml` · `assets/logo.png` · `assets/css/style.css` · `assets/css/manufacturing-section.css` · `assets/js/main.js` · `assets/js/manufacturing-section.js` · `assets/images/*.webp` · `assets/images/hr-geant-emballage-social.jpg`

The Manufacturing section (`#manufacturing`) is a headline over a decorative canvas animation (`manufacturing-section.js`). The 7 step names are read from the hidden, translated `<ol class="timeline mfg-steps">` in each page, so edit step names there. The animation mirrors automatically on the Arabic page, pauses off-screen, and shows a still frame when the visitor prefers reduced motion.

The existing `CNAME` must be preserved unchanged when merging this upgrade. Canonical, social metadata, schema, robots and sitemap use the `www` host consistently. Asset paths are relative and work from the custom domain or repository root. No Node.js runtime or framework is required. The CSP uses self-hosted CSS, JavaScript and images; external Google Fonts have been removed. Note: `style.css` names 'Space Grotesk' but no font files are included, so visitors see the fallback fonts unless the font files are added to the repository with an `@font-face` rule.

Do not commit `__pycache__/` folders (see `.gitignore`).

## Deployment

Upload the files in this directory to the repository root on `main` (or merge a review branch). Keep `CNAME` as included. GitHub Pages should serve from the root of the branch. The preferred canonical URL is `https://www.hrgeantemballage.com/`.
