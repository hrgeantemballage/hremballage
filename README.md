# HR Géant Emballage website

Static GitHub Pages website. The included `CNAME` preserves the existing `www.hrgeantemballage.com` GitHub Pages domain. No build step is required.

## Before launch

- Replace illustrative imagery in `assets/images/` with approved company photography. Current images are original concept visuals, not documentary images of the HR factory or products.
- Verify the isolated emblem in `assets/logo.png` against approved brand artwork before print or brand-sensitive use.
- Replace every `[ADD REAL DATA]` with verified contact details, capabilities and case studies, or remove those placeholders when publishing a customer-facing version.
- Set `FORM_ENDPOINT` in `assets/js/main.js` to a tested HTTPS endpoint supporting multipart uploads. The quote form deliberately does not transmit until configured. Test privacy and upload limits with the chosen service.
- Set `WHATSAPP_NUMBER` in `assets/js/main.js` to the verified international digits. The floating action stays hidden until then.
- Add professionally translated FR and AR content to the language architecture in `assets/js/main.js` before enabling those controls. Arabic must set `lang="ar" dir="rtl"` on the root element and be checked across all pages and form fields.
- Check actual printing processes, flute profiles and plant-specific stages before presenting them as capabilities.

## File structure

`index.html` · `CNAME` · `robots.txt` · `sitemap.xml` · `assets/logo.png` · `assets/css/style.css` · `assets/js/main.js` · `assets/images/*.webp`

The existing `CNAME` must be preserved unchanged when merging this upgrade. Asset paths are relative and work from the custom domain or repository root. No Node.js runtime or framework is required.

## Deployment

Upload the files in this directory to the repository root on `main` (or merge a review branch). Keep `CNAME` as included. GitHub Pages should serve from the root of the branch. The canonical metadata uses the requested apex URL; if the deployed site permanently redirects to `www`, update the canonical and sitemap to the final preferred URL.
