# HR Géant Emballage website

Static GitHub Pages website. The included `CNAME` preserves the existing `www.hrgeantemballage.com` GitHub Pages domain. No build step is required.

## Before launch

- Replace illustrative imagery in `assets/images/` with approved company photography. Current images are original concept visuals, not documentary images of the HR factory or products.
- Verify the isolated emblem in `assets/logo.png` against approved brand artwork before print or brand-sensitive use. It is an optimized 128 × 128 concept extraction, not a verified copy of the official artwork.
- Replace every `[ADD REAL DATA]` with verified contact details, capabilities and case studies, or remove those placeholders when publishing a customer-facing version.
- Set `FORM_ENDPOINT` in `assets/js/main.js` to a tested HTTPS endpoint supporting multipart uploads, then run `python3 scripts/build_locales.py`. The generator adds the endpoint origin to `connect-src` on all three pages. Test the submission and confirmation with the chosen service. The quote form deliberately does not transmit until configured.
- The honeypot is named `_gotcha`, and the client checks artwork against a 10 MB limit. Configure the future form service or Worker to inspect the same `_gotcha` field, enforce file types and size, and add its own rate limits. Client-side checks alone do not stop spam or oversized requests.
- Set `WHATSAPP_NUMBER` in `assets/js/main.js` to the verified international digits. The floating action stays hidden until then.
- Review the French and Arabic editorial copy with a native industry specialist before final publication. The site includes static localized pages at `/fr/` and `/ar/`; the latter sets `lang="ar" dir="rtl"`. Edit the English master in `index.html` and translations in `scripts/build_locales.py`, then rerun the script to regenerate all pages. Dynamic product content and status messages live in `assets/js/main.js`.
- Check actual printing processes, flute profiles and plant-specific stages before presenting them as capabilities.

## File structure

`index.html` · `fr/index.html` · `ar/index.html` · `CNAME` · `robots.txt` · `sitemap.xml` · `assets/logo.png` · `assets/css/style.css` · `assets/js/main.js` · `assets/images/*.webp`

The existing `CNAME` must be preserved unchanged when merging this upgrade. Canonical, social metadata, schema, robots and sitemap use the `www` host consistently. Asset paths are relative and work from the custom domain or repository root. No Node.js runtime or framework is required. The CSP uses self-hosted CSS, JavaScript and images; external Google Fonts have been removed.

## Deployment

Upload the files in this directory to the repository root on `main` (or merge a review branch). Keep `CNAME` as included. GitHub Pages should serve from the root of the branch. The preferred canonical URL is `https://www.hrgeantemballage.com/`.
