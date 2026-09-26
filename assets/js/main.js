/* HR Géant Emballage — static presentation layer. No tracking or backend dependencies. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const header = $('#site-header');
  const nav = $('#site-nav');
  const toggle = $('.menu-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const locale = document.documentElement.lang || 'en';
  const copy = {
    en: { solution: 'SOLUTION', explore: 'EXPLORE', detail: 'Visual demonstration only', dimensions: 'indicative', pending: 'Quotation submissions are being configured. Please contact HR Géant Emballage through its verified contact channels once published.', sending: 'Sending your request…', success: 'Thank you. Your request has been sent.', failure: 'Your request could not be sent. Please try again later or use a verified contact channel.', tooLarge: 'The file is too large. Please choose one under 10 MB.', opening: 'Open menu', closing: 'Close menu' },
    fr: { solution: 'SOLUTION', explore: 'DÉCOUVRIR', detail: 'Simulation visuelle uniquement', dimensions: 'indicatif', pending: 'L’envoi des demandes de devis est en cours de configuration. Contactez HR Géant Emballage via ses coordonnées vérifiées une fois publiées.', sending: 'Envoi de votre demande…', success: 'Merci. Votre demande a été envoyée.', failure: 'Votre demande n’a pas pu être envoyée. Réessayez plus tard ou utilisez un moyen de contact vérifié.', tooLarge: 'Le fichier est trop volumineux. Choisissez un fichier de moins de 10 Mo.', opening: 'Ouvrir le menu', closing: 'Fermer le menu' },
    ar: { solution: 'حل', explore: 'اكتشف', detail: 'عرض بصري فقط', dimensions: 'تقريبي', pending: 'يجري إعداد خدمة إرسال طلبات عروض الأسعار. يرجى التواصل مع HR Géant Emballage عبر بيانات اتصال مؤكدة بعد نشرها.', sending: 'جارٍ إرسال طلبك…', success: 'شكراً لك. تم إرسال طلبك.', failure: 'تعذر إرسال طلبك. حاول لاحقاً أو استخدم وسيلة اتصال مؤكدة.', tooLarge: 'حجم الملف كبير جداً. اختر ملفاً أصغر من 10 ميغابايت.', opening: 'فتح القائمة', closing: 'إغلاق القائمة' }
  }[locale] || null;

  const setScrolled = () => header.classList.toggle('scrolled', scrollY > 25);
  addEventListener('scroll', setScrolled, { passive: true }); setScrolled();
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? copy.closing : copy.opening);
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', copy.opening); }
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

  const productData = {
    en: [
      ['Corrugated Boxes','Structural packaging for transport, handling and storage.','Board structure / Format / Load needs','corrugated-boxes.webp'],
      ['Custom Packaging','Made-to-fit concepts developed around the product.','Dimensions / Die-cut design / Fit','corrugated-boxes.webp'],
      ['Printed Packaging','Brand presence on a practical protective format.','Artwork / Coverage / Finish','corrugated-boxes.webp'],
      ['Industrial Packaging','Packaging concepts for demanding industrial movement.','Protection / Handling / Stacking','factory-production.webp'],
      ['E-commerce Packaging','Shipping formats with protection and presentation in mind.','Packing / Transit / Opening','corrugated-boxes.webp'],
      ['Protective Solutions','Internal corrugated elements designed around vulnerable parts.','Inserts / Separation / Cushioning','corrugated-boxes.webp']
    ],
    fr: [
      ['Caisses en carton ondulé','Emballages structurels pour le transport, la manutention et le stockage.','Structure / Format / Charge','corrugated-boxes.webp'],
      ['Emballage sur mesure','Des concepts adaptés à la forme et aux besoins de votre produit.','Dimensions / Découpe / Ajustement','corrugated-boxes.webp'],
      ['Emballage imprimé','Une expression de votre marque sur une protection fonctionnelle.','Fichiers / Couverture / Finition','corrugated-boxes.webp'],
      ['Emballage industriel','Des concepts pour les exigences du transport industriel.','Protection / Manutention / Gerbage','factory-production.webp'],
      ['Emballage e-commerce','Des formats d’expédition pensés pour protéger et présenter.','Conditionnement / Transport / Ouverture','corrugated-boxes.webp'],
      ['Solutions de protection','Des éléments intérieurs adaptés aux parties sensibles du produit.','Calages / Séparation / Protection','corrugated-boxes.webp']
    ],
    ar: [
      ['صناديق كرتون مموج','عبوات متينة للنقل والمناولة والتخزين.','البنية / الشكل / الحمولة','corrugated-boxes.webp'],
      ['تغليف مخصص','تصورات مصممة وفق شكل منتجك واحتياجاته.','الأبعاد / القص / الملاءمة','corrugated-boxes.webp'],
      ['تغليف مطبوع','حضور لعلامتك التجارية على عبوة توفر الحماية.','ملفات التصميم / مساحة الطباعة / التشطيب','corrugated-boxes.webp'],
      ['تغليف صناعي','تصورات تلائم متطلبات الحركة والنقل الصناعي.','الحماية / المناولة / التكديس','factory-production.webp'],
      ['تغليف التجارة الإلكترونية','عبوات شحن تراعي الحماية والعرض عند الفتح.','التعبئة / النقل / الفتح','corrugated-boxes.webp'],
      ['حلول الحماية','عناصر داخلية مموجة تحمي الأجزاء الحساسة.','فواصل / تثبيت / حماية','corrugated-boxes.webp']
    ]
  }[locale] || [];
  const assetRoot = locale === 'en' ? 'assets/' : '../assets/';
  const photoLabel = { en: 'concept photograph', fr: 'photographie de concept', ar: 'صورة توضيحية' }[locale];
  $('#product-grid').innerHTML = productData.map(([name, description, details, image], index) => `<article class="product-card"><img src="${assetRoot}images/${image}" loading="lazy" width="1400" height="900" alt="${name} — ${photoLabel}"><div class="product-content"><small>${String(index + 1).padStart(2, '0')} / ${copy.solution}</small><h3>${name}</h3><p>${description}</p><p class="details">${details}</p><a href="#contact" aria-label="${copy.explore} ${name}">${copy.explore} ↗</a></div></article>`).join('');

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
    $('#quote-dimensions').value = `${length} × ${width} × ${height} mm (${copy.dimensions})`;
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
  const MAX_ARTWORK_BYTES = 10 * 1024 * 1024;
  const whatsapp = $('#whatsapp-link');
  if (/^\d{8,15}$/.test(WHATSAPP_NUMBER)) { whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}`; whatsapp.hidden = false; }
  const artwork = $('#quote-form input[name="artwork"]');
  artwork.addEventListener('change', () => {
    const status = $('#form-status');
    if (artwork.files[0]?.size > MAX_ARTWORK_BYTES) { artwork.value = ''; status.textContent = copy.tooLarge; }
    else if (status.textContent === copy.tooLarge) status.textContent = '';
  });
  $('#quote-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = $('#form-status');
    // Save the form before await: currentTarget is cleared once event dispatch ends.
    const form = event.currentTarget;
    // Client checks improve the experience; the eventual endpoint must repeat both checks.
    if (form.elements['_gotcha'].value.trim()) return;
    if (artwork.files[0]?.size > MAX_ARTWORK_BYTES) { status.textContent = copy.tooLarge; status.scrollIntoView({ block: 'center' }); return; }
    if (!FORM_ENDPOINT || !/^https:\/\//.test(FORM_ENDPOINT)) { status.textContent = copy.pending; status.scrollIntoView({ block: 'center' }); return; }
    const button = $('#quote-form button[type=submit]'); button.disabled = true; status.textContent = copy.sending;
    try {
      const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      status.textContent = copy.success; form.reset();
    } catch (error) { status.textContent = copy.failure; }
    finally { button.disabled = false; status.scrollIntoView({ block: 'center' }); }
  });
})();
