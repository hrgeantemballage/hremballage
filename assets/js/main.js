/* HR Géant Emballage — static presentation layer. No tracking or backend dependencies. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const header = $('#site-header');
  const nav = $('#site-nav');
  const toggle = $('.menu-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // Translation architecture: supply professionally translated content before enabling FR/AR.
  const languages = { en: { enabled: true, dir: 'ltr' }, fr: { enabled: false, dir: 'ltr' }, ar: { enabled: false, dir: 'rtl' } };
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const code = button.dataset.lang;
    if (!languages[code].enabled) {
      button.title = 'Professional translation pending';
      button.setAttribute('aria-label', `${code.toUpperCase()} translation pending`);
      button.setAttribute('aria-disabled', 'true');
      button.addEventListener('click', () => {
        $('#form-status').textContent = 'FR and Arabic versions will be available after professional translation.';
        $('#form-status').scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      });
    }
  });
  const setScrolled = () => header.classList.toggle('scrolled', scrollY > 25);
  addEventListener('scroll', setScrolled, { passive: true }); setScrolled();
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
  });
  addEventListener('keydown', (event) => { if (event.key === 'Escape') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); } });
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver((entries, observer) => entries.forEach(({ target, isIntersecting }) => { if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); } }), { threshold: .09 });
    document.querySelectorAll('.reveal').forEach((el) => reveals.observe(el));
    const activeNav = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => { if (isIntersecting) { document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.hash === `#${target.id}`)); } }), { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((el) => activeNav.observe(el));
    const timeline = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => target.classList.toggle('active', isIntersecting)), { rootMargin: '-40% 0px -45% 0px' });
    document.querySelectorAll('.timeline li').forEach(el => timeline.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

  const productData = [
    ['01', 'Corrugated Boxes', 'Structural packaging for transport, handling and storage.', 'Board structure / Format / Load needs', 'corrugated-boxes.webp'],
    ['02', 'Custom Packaging', 'Made-to-fit concepts developed around the product.', 'Dimensions / Die-cut design / Fit', 'corrugated-boxes.webp'],
    ['03', 'Printed Packaging', 'Brand presence on a practical protective format.', 'Artwork / Coverage / Finish', 'corrugated-boxes.webp'],
    ['04', 'Industrial Packaging', 'Packaging concepts for demanding industrial movement.', 'Protection / Handling / Stacking', 'factory-production.webp'],
    ['05', 'E-commerce Packaging', 'Shipping formats with protection and presentation in mind.', 'Packing / Transit / Opening', 'corrugated-boxes.webp'],
    ['06', 'Protective Solutions', 'Internal corrugated elements designed around vulnerable parts.', 'Inserts / Separation / Cushioning', 'corrugated-boxes.webp']
  ];
  $('#product-grid').innerHTML = productData.map(([number, name, description, details, image]) => `<article class="product-card"><img src="assets/images/${image}" loading="lazy" width="1400" height="900" alt="${name} concept photograph"><div class="product-content"><small>${number} / SOLUTION</small><h3>${name}</h3><p>${description}</p><p class="details">${details}</p><a href="#contact" aria-label="Explore ${name} by requesting a quote">EXPLORE ↗</a></div></article>`).join('');

  const controls = $('#config-form');
  const preview = $('#preview-box');
  const updatePreview = () => {
    const length = Math.min(1200, Math.max(100, Number($('#length').value) || 400));
    const width = Math.min(1200, Math.max(100, Number($('#width').value) || 300));
    const height = Math.min(1200, Math.max(100, Number($('#height').value) || 250));
    preview.style.setProperty('--pw', `${Math.round(150 + 105 * length / 1200)}px`);
    preview.style.setProperty('--ph', `${Math.round(95 + 135 * height / 1200)}px`);
    preview.style.setProperty('--side', `${Math.round(50 + 55 * width / 1200)}px`);
    preview.style.setProperty('--board', $('#board').value === 'white' ? '#dedbd2' : '#b58a58');
    preview.className = `preview-box ${$('#printing').value} ${$('#finishing').value}`;
    $('#quote-dimensions').value = `${length} × ${width} × ${height} mm (indicative)`;
    $('#quote-printing').value = $('#printing').selectedOptions[0].textContent;
  };
  controls.addEventListener('input', updatePreview); controls.addEventListener('change', updatePreview); updatePreview();
  controls.addEventListener('submit', (event) => event.preventDefault());
  let dragStart = null;
  $('.config-preview').addEventListener('pointerdown', event => { if (event.pointerType === 'mouse' || event.pointerType === 'touch') dragStart = event.clientX; });
  $('.config-preview').addEventListener('pointermove', event => { if (dragStart !== null && !reducedMotion.matches) preview.style.transform = `skewY(-5deg) rotate(${Math.max(-12, Math.min(12, (event.clientX - dragStart) / 12))}deg)`; });
  addEventListener('pointerup', () => { dragStart = null; preview.style.transform = ''; });
  const hero = $('.hero');
  hero.addEventListener('pointermove', event => { if (event.pointerType === 'mouse' && !reducedMotion.matches && innerWidth > 850) { const x = (event.clientX / innerWidth - .5) * 18; const y = (event.clientY / innerHeight - .5) * 12; $('.box-cube').style.transform = `rotateX(${-22 - y}deg) rotateY(${-32 + x}deg)`; } });
  hero.addEventListener('pointerleave', () => { $('.box-cube').style.transform = ''; });
  $('#industry-list').addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; $('#industry-list').querySelectorAll('button').forEach(el => el.classList.toggle('selected', el === button)); $('#industry-detail').textContent = button.dataset.detail; });
  $('#industry-list').addEventListener('focusin', event => event.target.closest('button')?.click());

  // Static GitHub Pages has no form processing. Add a verified HTTPS endpoint, then enable this block.
  const FORM_ENDPOINT = ''; // e.g. your verified Formspree or custom API endpoint
  const WHATSAPP_NUMBER = ''; // E.164 digits, without + or spaces
  const whatsapp = $('#whatsapp-link');
  if (/^\d{8,15}$/.test(WHATSAPP_NUMBER)) { whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}`; whatsapp.hidden = false; }
  $('#quote-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = $('#form-status');
    if (!FORM_ENDPOINT || !/^https:\/\//.test(FORM_ENDPOINT)) { status.textContent = 'Quotation submissions are being configured. Please contact HR Géant Emballage through its verified contact channels once published.'; status.scrollIntoView({ block: 'center' }); return; }
    const button = $('#quote-form button[type=submit]'); button.disabled = true; status.textContent = 'Sending your request…';
    try {
      const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(event.currentTarget), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      status.textContent = 'Thank you. Your request has been sent.'; event.currentTarget.reset();
    } catch (error) { status.textContent = 'Your request could not be sent. Please try again later or use a verified contact channel.'; }
    finally { button.disabled = false; status.scrollIntoView({ block: 'center' }); }
  });
})();
