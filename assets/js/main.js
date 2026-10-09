/* HR Géant Emballage — static presentation layer. No tracking or backend dependencies. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const header = $('#site-header');
  const nav = $('#site-nav');
  const toggle = $('.menu-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  /* 08 / Print & Brand: offset-press loop. Reduced motion restores the original photo;
     playback runs only while the video is on screen. */
  const printVideo = $('.printing-video');
  if (printVideo) {
    const frame = printVideo.parentElement;
    const toPhoto = () => {
      const img = printVideo.querySelector('img');
      if (img && printVideo.isConnected) { printVideo.pause(); frame.classList.remove('printing-image--video'); printVideo.replaceWith(img); }
    };
    if (reducedMotion.matches) toPhoto();
    else {
      let inView = false;
      const syncPrint = () => {
        if (!printVideo.isConnected) return;
        if (reducedMotion.matches) { toPhoto(); return; }
        if (inView && document.visibilityState === 'visible') { const p = printVideo.play(); if (p && p.catch) p.catch(() => {}); }
        else printVideo.pause();
      };
      if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { inView = e.isIntersecting; syncPrint(); }, { threshold: 0.15 }).observe(frame);
      else inView = true;
      printVideo.addEventListener('play', () => { if (!inView || reducedMotion.matches || document.visibilityState !== 'visible') printVideo.pause(); });
      document.addEventListener('visibilitychange', syncPrint);
      if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', syncPrint);
      syncPrint();
    }
  }

  /* Section 01 box-forming loop: honour reduced motion and pause while off screen. */
  const companyVideo = $('.company-video video');
  if (companyVideo) {
    let visible = true;
    const sync = () => {
      if (reducedMotion.matches || !visible || document.visibilityState !== 'visible') { companyVideo.pause(); return; }
      const p = companyVideo.play(); if (p && p.catch) p.catch(() => {});
    };
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.05 }).observe(companyVideo);
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
  }

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
  addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); } });
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
      ['Custom Packaging','Packaging formats developed around the product.','Dimensions / Die-cut design / Fit','corrugated-boxes.webp'],
      ['Printed Packaging','Brand presence on a practical protective format.','Artwork / Coverage / Finish','corrugated-boxes.webp'],
      ['Industrial Packaging','Packaging for demanding industrial handling.','Protection / Handling / Stacking','factory-production.webp'],
      ['E-commerce Packaging','Shipping formats with protection and presentation in mind.','Packing / Transit / Opening','corrugated-boxes.webp'],
      ['Protective Solutions','Internal corrugated elements designed around vulnerable parts.','Inserts / Separation / Cushioning','corrugated-boxes.webp']
    ],
    fr: [
      ['Caisses en carton ondulé','Emballages structurels pour le transport, la manutention et le stockage.','Structure / Format / Charge','corrugated-boxes.webp'],
      ['Emballage sur mesure','Des emballages adaptés à la forme et aux besoins de votre produit.','Dimensions / Découpe / Ajustement','corrugated-boxes.webp'],
      ['Emballage imprimé','Une expression de votre marque sur une protection fonctionnelle.','Fichiers / Couverture / Finition','corrugated-boxes.webp'],
      ['Emballage industriel','Des emballages pour les exigences du transport industriel.','Protection / Manutention / Gerbage','factory-production.webp'],
      ['Emballage e-commerce','Des formats d’expédition pensés pour protéger et présenter.','Conditionnement / Transport / Ouverture','corrugated-boxes.webp'],
      ['Solutions de protection','Des éléments intérieurs adaptés aux parties sensibles du produit.','Calages / Séparation / Protection','corrugated-boxes.webp']
    ],
    ar: [
      ['صناديق كرتون مموج','عبوات متينة للنقل والمناولة والتخزين.','البنية / الشكل / الحمولة','corrugated-boxes.webp'],
      ['تغليف مخصص','عبوات مصممة وفق شكل منتجك واحتياجاته.','الأبعاد / القص / الملاءمة','corrugated-boxes.webp'],
      ['تغليف مطبوع','حضور لعلامتك التجارية على عبوة توفر الحماية.','ملفات التصميم / مساحة الطباعة / التشطيب','corrugated-boxes.webp'],
      ['تغليف صناعي','عبوات تلائم متطلبات الحركة والنقل الصناعي.','الحماية / المناولة / التكديس','factory-production.webp'],
      ['تغليف التجارة الإلكترونية','عبوات شحن تراعي الحماية والعرض عند الفتح.','التعبئة / النقل / الفتح','corrugated-boxes.webp'],
      ['حلول الحماية','عناصر داخلية مموجة تحمي الأجزاء الحساسة.','فواصل / تثبيت / حماية','corrugated-boxes.webp']
    ]
  }[locale] || [];
  const assetRoot = locale === 'en' ? 'assets/' : '../assets/';
  const photoLabel = { en: 'illustrative packaging image', fr: 'visuel d’emballage illustratif', ar: 'صورة توضيحية' }[locale];
  /* Product cards with a looping animation (by card index). Each photo stays as poster and fallback;
     reduced-motion visitors get the original photo cards unchanged. */
  const cardVideos = {
    0: { file: 'corrugated-boxes.mp4', bg: 'linear-gradient(180deg,#c9c4bc 0%,#cdc8c1 45%,#c7c2ba 100%)', label: { en: 'Animation: a corrugated blank folds into a sealed HR carton and a stack of three', fr: 'Animation : un flan en carton ondulé se plie en caisse HR scellée, puis en pile de trois', ar: 'رسم متحرك: لوح كرتون مموج يُطوى إلى صندوق HR مغلق ثم كومة من ثلاثة صناديق' } },
    1: { file: 'custom-packaging.mp4', bg: 'linear-gradient(180deg,#101214 0%,#101316 50%,#0c0f11 100%)', label: { en: 'Animation: a die-cut insert and carton are formed around a cylindrical product', fr: 'Animation : un calage découpé et une boîte se forment autour d’un produit cylindrique', ar: 'رسم متحرك: حشوة مقطوعة وعلبة تتشكلان حول منتج أسطواني' } }
  };
  const productMedia = (name, image, index) => {
    const img = `<img src="${assetRoot}images/${image}" loading="lazy" width="1400" height="900" alt="${name} — ${photoLabel}">`;
    const cv = cardVideos[index];
    if (!cv || reducedMotion.matches) return img;
    return `<div class="product-media"><video class="product-video" poster="${assetRoot}images/${image}" autoplay muted loop playsinline preload="metadata" disablepictureinpicture disableremoteplayback aria-label="${cv.label[locale] || cv.label.en}"><source src="${assetRoot}videos/${cv.file}" type="video/mp4">${img}</video></div>`;
  };
  $('#product-grid').innerHTML = productData.map(([name, description, details, image], index) => `<article class="product-card${cardVideos[index] && !reducedMotion.matches ? ' product-card--video' : ''}" data-card="${index}">${productMedia(name, image, index)}<div class="product-content"><small>${String(index + 1).padStart(2, '0')} / ${copy.solution}</small><h3>${name}</h3><p>${description}</p><p class="details">${details}</p><a href="#contact" aria-label="${copy.explore} ${name}">${copy.explore} ↗</a></div></article>`).join('');

  document.querySelectorAll('.product-card--video').forEach((card) => {
    const video = card.querySelector('video');
    card.querySelector('.product-media').style.setProperty('--media-bg', cardVideos[card.dataset.card].bg); // set via CSSOM: CSP blocks inline style attributes
    const content = card.querySelector('.product-content');
    // Reserve the space above the copy for the animation so it is never covered or cropped.
    const fit = () => card.style.setProperty('--copy-h', `${content.offsetHeight + 27 + 18}px`);
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(content); else addEventListener('resize', fit);
    let onScreen = false;
    const syncVideo = () => {
      if (reducedMotion.matches) { video.pause(); video.removeAttribute('autoplay'); video.load(); return; } // back to poster
      if (onScreen && document.visibilityState === 'visible') { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
      else video.pause();
    };
    if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; syncVideo(); }, { threshold: 0.15 }).observe(card);
    else onScreen = true;
    document.addEventListener('visibilitychange', syncVideo);
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', syncVideo);
    // Anything that starts playback while the card is hidden (autoplay, a race with scrolling) is stopped.
    video.addEventListener('play', () => { if (!onScreen || reducedMotion.matches || document.visibilityState !== 'visible') video.pause(); });
    syncVideo();
  });

  /* ==========================================================================
     04 — PACKAGING CONFIGURATOR
     16 box models with a live CSS 3D preview and an illustrative flat blank
     (RSC, mailer, tuck-end, tray, clamshell, telescope).
     Geometry approximates a regular slotted carton (RSC / FEFCO 0201);
     no prices or weights are invented.
     ========================================================================== */
  const T = {
    en: { qty: 'Quantity', qtyPh: 'e.g. 5000', view3d: '3D box', viewFlat: 'Flat blank', reset: 'Reset view',
      yourBox: 'Your box', style: 'Style', rsc: 'Shipping carton (RSC / FEFCO 0201)', pizza: 'Pizza box — illustrative', tacos: 'Tacos takeout box — illustrative', blank: 'Flat blank size', area: 'Board per box',
      total: 'Board for the order', volume: 'Volume', wall: 'Wall thickness', approx: 'Illustrative dimensions and area only. Confirm all production specifications with HR Géant Emballage.',
      range: 'Each dimension: 20–1200 mm.', glue: 'Glue flap', cut: 'Cut', crease: 'Crease', sent: 'Your specification has been added to the quote form below.',
      walls: { unspecified: '≈ 3–4 mm (to be recommended)', single: '≈ 3–4 mm', double: '≈ 6–7 mm' },
      desc: 'Box specification from the online configurator', front: 'Front', side: 'Side', l: 'L', w: 'W', h: 'H', liters: 'L', m2: 'm²' },
    fr: { qty: 'Quantité', qtyPh: 'ex. 5000', view3d: 'Boîte 3D', viewFlat: 'Mise à plat', reset: 'Réinitialiser la vue',
      yourBox: 'Votre boîte', style: 'Modèle', rsc: 'Caisse de transport (FEFCO 0201)', pizza: 'Boîte à pizza — illustration', tacos: 'Boîte à tacos — illustration', blank: 'Format de la découpe à plat', area: 'Carton par boîte',
      total: 'Carton pour la commande', volume: 'Volume', wall: 'Épaisseur de paroi', approx: 'Dimensions et surface indicatives. Confirmez les spécifications de production avec HR Géant Emballage.',
      range: 'Chaque dimension : 20–1200 mm.', glue: 'Patte de collage', cut: 'Coupe', crease: 'Rainage', sent: 'Votre spécification a été ajoutée au formulaire de devis ci-dessous.',
      walls: { unspecified: '≈ 3–4 mm (à recommander)', single: '≈ 3–4 mm', double: '≈ 6–7 mm' },
      desc: 'Spécification issue du configurateur en ligne', front: 'Face', side: 'Côté', l: 'L', w: 'l', h: 'H', liters: 'L', m2: 'm²' },
    ar: { qty: 'الكمية', qtyPh: 'مثال: 5000', view3d: 'صندوق ثلاثي الأبعاد', viewFlat: 'الفرد المسطح', reset: 'إعادة ضبط العرض',
      yourBox: 'صندوقك', style: 'النموذج', rsc: 'صندوق شحن (FEFCO 0201)', pizza: 'علبة بيتزا — نموذج توضيحي', tacos: 'علبة تاكوس — نموذج توضيحي', blank: 'مقاس اللوح المسطح', area: 'الكرتون لكل صندوق',
      total: 'الكرتون للطلبية', volume: 'الحجم', wall: 'سماكة الجدار', approx: 'الأبعاد والمساحة توضيحية فقط. تُعتمد مواصفات الإنتاج مع HR Géant Emballage.',
      range: 'كل بُعد: من 20 إلى 1200 مم.', glue: 'لسان اللصق', cut: 'قص', crease: 'طي', sent: 'أُضيفت مواصفاتك إلى نموذج طلب عرض السعر أدناه.',
      walls: { unspecified: '≈ 3–4 مم (يُحدد لاحقاً)', single: '≈ 3–4 مم', double: '≈ 6–7 مم' },
      desc: 'مواصفات الصندوق من أداة التصميم', front: 'الواجهة', side: 'الجانب', l: 'ط', w: 'ع', h: 'ر', liters: 'لتر', m2: 'م²' }
  }[locale] || null;

  const controls = $('#config-form');
  const previewPane = $('.config-preview');
  const oldPreview = $('#preview-box');
  const nf = new Intl.NumberFormat(locale === 'ar' ? 'ar-DZ-u-nu-latn' : locale, { maximumFractionDigits: 2 });
  // Box catalogue: one entry per industry. Sizes are illustrative examples except the HR pizza and tacos ranges.
  // kind drives both the 3D preview and the flat blank: rsc | mailer | tuck | tray | clam | tele
  const CATALOG = [
    { key: 'pizza', kind: 'mailer', sizes: [[200, 200, 40], [260, 260, 40], [330, 330, 40]], range: true,
      name: { en: 'Pizza box', fr: 'Boîte à pizza', ar: 'علبة بيتزا' } },
    // Tacos: one fixed size, as requested by HR Géant Emballage.
    { key: 'tacos', kind: 'mailer', sizes: [[220, 120, 50]], fixed: true,
      name: { en: 'Tacos / fast-food box', fr: 'Boîte tacos / fast-food', ar: 'علبة تاكوس / وجبات سريعة' } },
    { key: 'dates', kind: 'mailer', window: 'top', sizes: [[200, 110, 45]],
      name: { en: 'Date box (Deglet Nour)', fr: 'Boîte à dattes (Deglet Nour)', ar: 'علبة تمور (دقلة نور)' } },
    { key: 'cake', kind: 'clam', lid: 0.5, window: 'top', sizes: [[250, 250, 120]],
      name: { en: 'Cake & pastry box', fr: 'Boîte gâteaux & pâtisserie', ar: 'علبة حلويات وكعك' } },
    { key: 'burger', kind: 'clam', lid: 0.5, sizes: [[115, 115, 90]],
      name: { en: 'Burger box', fr: 'Boîte burger', ar: 'علبة برغر' } },
    { key: 'sandwich', kind: 'tuck', window: 'front', sizes: [[190, 75, 65]],
      name: { en: 'Sandwich box', fr: 'Boîte sandwich', ar: 'علبة ساندويتش' } },
    { key: 'takeaway', kind: 'clam', lid: 0.29, sizes: [[200, 140, 70]],
      name: { en: 'Takeaway food box', fr: 'Boîte repas à emporter', ar: 'علبة طعام سفري' } },
    { key: 'produce', kind: 'tray', sizes: [[400, 300, 150]],
      name: { en: 'Fruit & vegetable box', fr: 'Caisse fruits & légumes', ar: 'صندوق خضر وفواكه' } },
    { key: 'beverage', kind: 'rsc', sizes: [[280, 190, 330]],
      name: { en: 'Beverage / bottle carton', fr: 'Carton boissons / bouteilles', ar: 'كرتونة مشروبات / قوارير' } },
    { key: 'ecommerce', kind: 'mailer', sizes: [[300, 220, 100]],
      name: { en: 'E-commerce shipping box', fr: 'Boîte d’expédition e-commerce', ar: 'علبة شحن للتجارة الإلكترونية' } },
    { key: 'shipping', kind: 'rsc', sizes: [[400, 300, 250]],
      name: { en: 'Standard RSC shipping carton', fr: 'Caisse américaine standard (RSC)', ar: 'صندوق شحن قياسي (RSC)' } },
    { key: 'gift', kind: 'tele', sizes: [[300, 220, 90]],
      name: { en: 'Premium gift box', fr: 'Coffret cadeau premium', ar: 'علبة هدايا فاخرة' } },
    { key: 'cosmetics', kind: 'tuck', sizes: [[50, 50, 150]],
      name: { en: 'Cosmetics / personal care box', fr: 'Étui cosmétique / soins', ar: 'علبة مستحضرات التجميل' } },
    { key: 'pharma', kind: 'tuck', sizes: [[70, 25, 110]],
      name: { en: 'Pharmaceutical carton', fr: 'Étui pharmaceutique', ar: 'علبة أدوية' } },
    { key: 'industrial', kind: 'rsc', sizes: [[600, 400, 400]],
      name: { en: 'Industrial heavy-duty carton', fr: 'Caisse industrielle renforcée', ar: 'صندوق صناعي شديد التحمل' } },
    { key: 'custom', kind: 'mailer', zone: true, sizes: [[250, 180, 80]],
      name: { en: 'Custom box — your design', fr: 'Boîte sur mesure — votre design', ar: 'علبة حسب الطلب — تصميمك' } }
  ];
  const WORDS = {
    en: { single: 'One size', custom: 'Custom dimensions', example: 'Example size', small: 'Small', medium: 'Medium', large: 'Large', base: 'BASE', lid: 'LID', back: 'BACK', front: 'FRONT', tuck: 'tuck flap', window: 'window', zone: 'YOUR DESIGN', glue: 'glue flap', lidNote: 'lid' },
    fr: { single: 'Taille unique', custom: 'Dimensions personnalisées', example: 'Format exemple', small: 'Petit', medium: 'Moyen', large: 'Grand', base: 'FOND', lid: 'COUVERCLE', back: 'DOS', front: 'FACE', tuck: 'rabat', window: 'fenêtre', zone: 'VOTRE DESIGN', glue: 'patte de collage', lidNote: 'couvercle' },
    ar: { single: 'مقاس واحد', custom: 'أبعاد مخصصة', example: 'مقاس مثال', small: 'صغير', medium: 'متوسط', large: 'كبير', base: 'القاعدة', lid: 'الغطاء', back: 'الخلف', front: 'الواجهة', tuck: 'لسان', window: 'نافذة', zone: 'تصميمك', glue: 'لسان اللصق', lidNote: 'الغطاء' }
  }[locale];
  const styleSelect = $('#box-style');
  // The 16 models are listed in the page HTML (translated per language); CATALOG adds geometry and sizes.
  const current = () => CATALOG.find(item => item.key === styleSelect.value) || CATALOG[10];
  const sizeControl = $('#box-size');
  const dimensions = ['#length', '#width', '#height'].map(id => $(id));
  dimensions.forEach(input => { input.min = 20; input.max = 1200; });
  const cm = (v) => nf.format(v / 10);
  const sizeLabel = (item, i) => {
    const [L, W, H] = item.sizes[i];
    const name = item.range ? [WORDS.small, WORDS.medium, WORDS.large][i] : item.fixed ? WORDS.single : WORDS.example;
    return `${name} · ${cm(L)} × ${cm(W)} × ${cm(H)} ${locale === 'ar' ? 'سم' : 'cm'}`;
  };
  const setDims = ([L, W, H]) => [L, W, H].forEach((value, i) => { dimensions[i].value = value; });
  const setSizeOptions = () => {
    const item = current();
    const options = item.sizes.map((_, i) => new Option(sizeLabel(item, i), String(i)));
    if (!item.fixed) options.push(new Option(WORDS.custom, 'custom'));
    sizeControl.replaceChildren(...options);
    sizeControl.disabled = !!item.fixed;
    sizeControl.value = '0';
    setDims(item.sizes[0]);
    dimensions.forEach(input => { input.readOnly = !!item.fixed; });
    resetAngle(); update();
  };
  const WALL_MM = { unspecified: 3.5, single: 3.5, double: 6.5 };
  const BOARD = { kraft: { face: '#b98a56', edge: '#8a6238' }, white: { face: '#ebe7de', edge: '#a47a4c' } };
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  // Quantity field (sits under the three dimension fields)
  const qtyLabel = el('label', 'config-qty', T.qty);
  const qtyInput = el('input'); Object.assign(qtyInput, { type: 'number', id: 'config-qty', min: 1, step: 1, inputMode: 'numeric', placeholder: T.qtyPh });
  qtyLabel.append(qtyInput);
  $('.dimension-fields').after(qtyLabel);
  const rangeMsg = el('p', 'config-error'); rangeMsg.setAttribute('role', 'alert'); rangeMsg.hidden = true;
  qtyLabel.after(rangeMsg);

  // Live specification panel (above the CTA)
  const spec = el('div', 'config-spec'); spec.setAttribute('aria-live', 'polite');
  spec.append(el('p', 'config-spec__title', T.yourBox));
  const specList = el('dl'); spec.append(specList, el('p', 'config-spec__note', T.approx));
  $('#config-cta').before(spec);
  const specRow = (k) => { const d = el('div'); const dt = el('dt', null, k); const dd = el('dd'); d.append(dt, dd); specList.append(d); return dd; };
  const sStyle = specRow(T.style), sBlank = specRow(T.blank), sArea = specRow(T.area), sTotal = specRow(T.total), sVol = specRow(T.volume);
  const styleName = () => styleSelect.selectedOptions[0].textContent.trim();
  sStyle.textContent = styleName();
  // Keep dimension notation in LTR order inside the Arabic interface.
  sBlank.dir = 'ltr'; // numbers with Arabic units (م², لتر) keep the page's RTL order

  // Preview: view switch + 3D stage + flat blank
  oldPreview.hidden = true;
  previewPane.classList.add('is-live');
  const tools = el('div', 'config-views'); tools.setAttribute('role', 'group');
  const b3d = el('button', 'is-on', T.view3d), bFlat = el('button', null, T.viewFlat), bReset = el('button', 'config-views__reset', T.reset);
  [b3d, bFlat, bReset].forEach(b => { b.type = 'button'; tools.append(b); });
  b3d.setAttribute('aria-pressed', 'true'); bFlat.setAttribute('aria-pressed', 'false');
  const stage = el('div', 'box-stage'); stage.tabIndex = 0;
  stage.setAttribute('aria-label', `${T.view3d}. ← → ↑ ↓`);
  const box = el('div', 'box3'); stage.append(box); box.append(el('div', 'box3__floor'));
  const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];
  const NORMALS = { front: [0, 0, 1], back: [0, 0, -1], right: [1, 0, 0], left: [-1, 0, 0], top: [0, -1, 0], bottom: [0, 1, 0] };
  const faces = {};
  FACES.forEach(name => {
    const f = el('div', `box3__face box3__${name}`);
    f.append(el('i', 'box3__print'), el('i', 'box3__sheen'), el('i', 'box3__shade'));
    box.append(f); faces[name] = f;
  });
  const logo = () => { const i = el('img'); i.src = `${assetRoot}logo.png`; i.alt = ''; i.decoding = 'async'; return i; };
  ['front', 'back', 'top'].forEach(n => faces[n].querySelector('.box3__print').append(logo()));
  faces.top.append(el('i', 'box3__seam'), el('i', 'box3__tape'), el('i', 'box3__lid-mark'));
  faces.front.append(el('i', 'box3__closure'));
  faces.left.append(el('i', 'box3__fold')); faces.right.append(el('i', 'box3__fold'));
  ['top', 'front'].forEach(n => faces[n].append(el('i', 'box3__win')));
  ['left', 'right'].forEach(n => faces[n].append(el('i', 'box3__hole')));
  ['front', 'back'].forEach(n => faces[n].append(el('i', 'box3__vent')));
  ['front', 'back', 'left', 'right'].forEach(n => faces[n].append(el('i', 'box3__split')));
  faces.top.append(el('i', 'box3__tuckline'));
  const dimTag = (face, cls) => { const t = el('span', `box3__dim ${cls}`); faces[face].append(t); return t; };
  const tagL = dimTag('front', 'is-bottom'), tagH = dimTag('front', 'is-side'), tagW = dimTag('right', 'is-bottom');
  const flat = el('div', 'flat-blank'); flat.hidden = true;
  const stateLine = el('p', 'config-state'); stateLine.setAttribute('aria-live', 'polite');
  // Board cross-section: makes the flute choice visible (a closed box hides its wall structure).
  const fluteInset = el('figure', 'flute-inset'); fluteInset.setAttribute('aria-hidden', 'true');
  const fluteCaption = el('figcaption');
  previewPane.append(tools, stage, flat, fluteInset);
  const drawFlute = (flute) => {
    const walls = flute === 'double' ? 2 : 1, W = 120, H = walls === 2 ? 46 : 28, root = svg('svg', { viewBox: `0 0 ${W} ${H}` });
    const liner = y => root.append(svg('rect', { x: 0, y, width: W, height: 3, class: 'fi-liner' }));
    const wave = (y0, amp) => {
      let d = `M0 ${y0 + amp}`;
      for (let x = 0; x < W; x += 12) d += ` Q${x + 3} ${y0 - amp} ${x + 6} ${y0} T${x + 12} ${y0 + amp}`;
      root.append(svg('path', { d, class: flute === 'unspecified' ? 'fi-flute fi-unknown' : 'fi-flute' }));
    };
    liner(0); wave(12.5, 9); liner(22);
    if (walls === 2) { wave(34.5, 9); liner(43); }
    fluteCaption.textContent = $('#flute').selectedOptions[0].textContent;
    fluteInset.replaceChildren(root, fluteCaption);
  };
  // Preview and option summary travel together in one sticky column, so the box stays in view while options change.
  const previewCol = el('div', 'config-preview-col');
  previewPane.before(previewCol); previewCol.append(previewPane, stateLine);

  let rx = -22, ry = -34, dragging = null, idle = true;
  // Flat boxes (pizza, mailers) are viewed from above so the lid reads clearly.
  const resetAngle = () => {
    const [L, W, H] = dimensions.map(input => Number(input.value) || 100);
    rx = H < Math.max(L, W) * 0.35 ? -50 : -22; ry = -34;
  };
  const light = (() => { const v = [-0.45, -0.75, 0.55]; const m = Math.hypot(...v); return v.map(x => x / m); })();
  const rotate = ([x, y, z]) => {                    // CSS "rotateX(rx) rotateY(ry)": Y first, then X
    const a = ry * Math.PI / 180, b = rx * Math.PI / 180;
    const x1 = x * Math.cos(a) + z * Math.sin(a), z1 = -x * Math.sin(a) + z * Math.cos(a);
    return [x1, y * Math.cos(b) - z1 * Math.sin(b), y * Math.sin(b) + z1 * Math.cos(b)];
  };
  const paintView = () => {
    box.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    FACES.forEach(n => {
      const nv = rotate(NORMALS[n]);
      const lit = Math.max(0, nv[0] * light[0] + nv[1] * light[1] + nv[2] * light[2]);
      faces[n].style.setProperty('--shade', (0.62 - 0.6 * lit).toFixed(3));
      faces[n].style.setProperty('--sheen-x', `${Math.round(50 + nv[0] * 60)}%`);
    });
  };
  const read = (id) => {
    const input = $(id); const v = Number(input.value);
    const min = 20;
    const ok = input.value !== '' && v >= min && v <= 1200;
    input.toggleAttribute('aria-invalid', !ok);
    return { v: ok ? v : Math.min(1200, Math.max(min, v || min)), ok };
  };
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = (tag, attrs, text) => { const n = document.createElementNS(svgNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; return n; };
  // Dimension labels stay in left-to-right order on the Arabic page (e.g. "370 × 694 mm").
  const svgText = (attrs, text) => svg('text', { direction: 'ltr', ...attrs }, text);
  // ---- Flat blank geometry (illustrative; internal dimensions, no board-thickness allowance)
  const Rct = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  // print: panels that carry the logo and brand colours when a printed option is selected
  const makeNet = () => ({ polys: [], holes: [], labels: [], print: [] });
  const lab = (n, x, y, text, size = 1, rot = 0, bold = false) => n.labels.push({ x, y, text, size, rot, bold });
  const nets = {
    rsc(L, W, H) {
      const n = makeNet(), g = Math.max(L, W) > 250 ? 35 : 25, F = W / 2, s = 3;
      const xs = [0, g, g + L, g + L + W, g + 2 * L + W, g + 2 * L + 2 * W];
      n.polys.push([[0, F + 6], [g, F], [g, F + H], [0, F + H - 6]]);
      for (let i = 1; i < 5; i++) {
        n.polys.push(Rct(xs[i], F, xs[i + 1], F + H), Rct(xs[i] + s, F + H, xs[i + 1] - s, H + W), Rct(xs[i] + s, 0, xs[i + 1] - s, F));
        lab(n, (xs[i] + xs[i + 1]) / 2, F + H / 2, `${i % 2 ? T.l : T.w} ${i % 2 ? L : W}`, 1.2, 0, true);
      }
      lab(n, xs[2] + W / 2, F + H * 0.28, `${T.h} ${H}`);
      n.print.push({ x0: xs[1], y0: F, x1: xs[2], y1: F + H }, { x0: xs[3], y0: F, x1: xs[4], y1: F + H });
      return n;
    },
    mailer(L, W, H, item) {
      const n = makeNet(), Tk = Math.min(0.75 * H, 45), e = 3, tab = Math.min(18, W * 0.12);
      n.polys.push(Rct(0, 0, L, W), Rct(-H, 0, 0, W), Rct(L, 0, L + H, W), Rct(-2 * H + 2, 5, -H, W - 5), Rct(L + H, 5, L + 2 * H - 2, W - 5));
      for (const yc of [W * 0.3, W * 0.7]) n.polys.push(Rct(-2 * H - 3, yc - tab / 2, -2 * H + 2, yc + tab / 2), Rct(L + 2 * H - 2, yc - tab / 2, L + 2 * H + 3, yc + tab / 2));
      n.polys.push(Rct(0, -H, L, 0), Rct(0, W, L, W + H));
      for (const [y0, y1] of [[-H + 2, -2], [W + 2, W + H - 2]]) {
        n.polys.push([[0, y0], [0, y1], [-(H - e), y1 - 3], [-(H - e), y0 + 3]], [[L, y0], [L + H - e, y0 + 3], [L + H - e, y1 - 3], [L, y1]]);
      }
      const ly = W + H, fy = ly + W;
      n.polys.push(Rct(0, ly, L, fy));
      n.polys.push([[0, ly + 4], [0, fy - 4], [-(H - e), fy - 14], [-(H - e), ly + 14]], [[L, ly + 4], [L + H - e, ly + 14], [L + H - e, fy - 14], [L, fy - 4]]);
      n.polys.push(Rct(0, fy, L, fy + H), [[4, fy + H], [L - 4, fy + H], [L - 4 - Tk * 0.5, fy + H + Tk], [4 + Tk * 0.5, fy + H + Tk]]);
      lab(n, L / 2, W / 2, WORDS.base, 1.2, 0, true); lab(n, L / 2, W / 2 + W * 0.16, `${T.l} ${L} × ${T.w} ${W}`);
      lab(n, L / 2, ly + W * (item.window || item.zone ? 0.85 : 0.5), WORDS.lid, 1.2, 0, true);
      lab(n, L / 2, -H / 2, `${T.h} ${H}`); lab(n, L / 2, fy + H + Tk / 2, WORDS.tuck, 0.8);
      if (item.window) n.holes.push({ t: 'rrect', x0: L * 0.25, y0: ly + W * 0.3, x1: L * 0.75, y1: ly + W * 0.62, r: 8 });
      if (item.zone) { n.holes.push({ t: 'zone', x0: L * 0.12, y0: ly + W * 0.12, x1: L * 0.88, y1: ly + W * 0.62 }); lab(n, L / 2, ly + W * 0.4, WORDS.zone, 1.1, 0, true); }
      if (!item.window && !item.zone) n.print.push({ x0: 0, y0: ly, x1: L, y1: fy });
      return n;
    },
    tuck(L, W, H, item) {
      const n = makeNet(), g = Math.max(12, Math.min(20, W * 0.4)), Tk = Math.max(12, Math.min(22, W * 0.5)), D = W * 0.55;
      const xs = [0, g, g + L, g + L + W, g + 2 * L + W, g + 2 * L + 2 * W];
      n.polys.push([[0, 4], [g, 0], [g, H], [0, H - 4]]);
      for (let i = 1; i < 5; i++) n.polys.push(Rct(xs[i], 0, xs[i + 1], H));
      let a = xs[3], b = xs[4];
      n.polys.push(Rct(a, H, b, H + W), [[a + 2, H + W], [b - 2, H + W], [b - 2 - Tk * 0.4, H + W + Tk], [a + 2 + Tk * 0.4, H + W + Tk]]);
      a = xs[1]; b = xs[2];
      n.polys.push(Rct(a, -W, b, 0), [[a + 2, -W], [a + 2 + Tk * 0.4, -W - Tk], [b - 2 - Tk * 0.4, -W - Tk], [b - 2, -W]]);
      for (const i of [2, 4]) {
        a = xs[i]; b = xs[i + 1];
        n.polys.push([[a + 1, H], [b - 1, H], [b - 1, H + D * 0.6], [a + W * 0.35, H + D]], [[a + 1, 0], [a + W * 0.35, -D], [b - 1, -D * 0.6], [b - 1, 0]]);
      }
      lab(n, xs[1] + L / 2, H * (item.window ? 0.2 : 0.5), WORDS.front, 1.1, 0, true);
      lab(n, xs[3] + L / 2, H / 2, `${T.l} ${L} × ${T.h} ${H}`);
      lab(n, xs[2] + W / 2, H / 2, `${T.w} ${W}`, 0.9, -90); lab(n, xs[4] + W / 2, H / 2, `${T.w} ${W}`, 0.9, -90);
      if (item.window) n.holes.push({ t: 'rrect', x0: xs[1] + L * 0.2, y0: H * 0.42, x1: xs[1] + L * 0.8, y1: H * 0.8, r: 5 });
      n.print.push(item.window ? { x0: xs[3], y0: 0, x1: xs[4], y1: H } : { x0: xs[1], y0: 0, x1: xs[2], y1: H });
      return n;
    },
    tray(L, W, H, item, x0 = 0, y0 = 0, title = WORDS.base, extras = true) {
      const n = makeNet(), P = poly => poly.map(([x, y]) => [x + x0, y + y0]), c = H - 4;
      n.polys.push(P(Rct(0, 0, L, W)), P(Rct(0, -H, L, 0)), P(Rct(0, W, L, W + H)), P(Rct(-H, 0, 0, W)), P(Rct(L, 0, L + H, W)));
      for (const [ya, yb] of [[-H + 2, -2], [W + 2, W + H - 2]]) {
        n.polys.push(P([[0, ya], [0, yb], [-c, yb - 3], [-c, ya + 3]]), P([[L, ya], [L + c, ya + 3], [L + c, yb - 3], [L, yb]]));
      }
      if (extras && item.kind === 'tray') {
        for (const cx of [-H / 2, L + H / 2]) { const w = Math.min(22, H * 0.25), h = Math.min(90, W * 0.35); n.holes.push({ t: 'rrect', x0: cx - w / 2 + x0, y0: W / 2 - h / 2 + y0, x1: cx + w / 2 + x0, y1: W / 2 + h / 2 + y0, r: w / 2 }); }
        for (const fx of [0.25, 0.5, 0.75]) for (const fy of [0.3, 0.7]) n.holes.push({ t: 'circle', cx: L * fx + x0, cy: W * fy + y0, r: Math.min(14, L * 0.03) });
      }
      lab(n, L / 2 + x0, W / 2 + y0, title, 1.2, 0, true); lab(n, L / 2 + x0, W / 2 - W * 0.16 + y0, `${T.l} ${L} × ${T.w} ${W}`);
      lab(n, L / 2 + x0, -H / 2 + y0, `${T.h} ${H}`);
      return n;
    },
    clam(L, W, H, item) {
      const n = makeNet(), hl = Math.max(10, Math.round(H * item.lid)), hb = H - hl;
      n.polys.push(Rct(0, 0, L, W), Rct(0, -hb, L, 0), Rct(0, W, L, W + hb), Rct(-hb, 0, 0, W), Rct(L, 0, L + hb, W));
      for (const [ya, yb] of [[-hb + 2, -2], [W + 2, W + hb - 2]]) { const c = hb - 4; n.polys.push([[0, ya], [0, yb], [-c, yb - 3], [-c, ya + 3]], [[L, ya], [L + c, ya + 3], [L + c, yb - 3], [L, yb]]); }
      const ly = W + hb;
      n.polys.push(Rct(0, ly, L, ly + W), Rct(-hl, ly + 2, 0, ly + W), Rct(L, ly + 2, L + hl, ly + W), Rct(0, ly + W, L, ly + W + hl));
      if (hl > 8) { const c = hl - 3, ya = ly + W + 2, yb = ly + W + hl - 2; n.polys.push([[0, ya], [0, yb], [-c, yb - 2], [-c, ya + 2]], [[L, ya], [L + c, ya + 2], [L + c, yb - 2], [L, yb]]); }
      const tw = Math.min(40, L * 0.3), ty = ly + W + hl;
      n.polys.push([[L / 2 - tw / 2, ty], [L / 2 + tw / 2, ty], [L / 2 + tw / 2 - 5, ty + 14], [L / 2 - tw / 2 + 5, ty + 14]]);
      n.holes.push({ t: 'rrect', x0: L / 2 - tw / 2 - 1, y0: -hb * 0.45, x1: L / 2 + tw / 2 + 1, y1: -hb * 0.45 + 2, r: 0.5 });
      lab(n, L / 2, W / 2, WORDS.base, 1.2, 0, true); lab(n, L / 2, W / 2 + W * 0.16, `${T.l} ${L} × ${T.w} ${W}`);
      lab(n, L / 2, ly + W * (item.window ? 0.8 : 0.5), WORDS.lid, 1.2, 0, true);
      lab(n, L / 2, -hb * 0.78, `${T.h} ${hb}`); lab(n, L / 2, ly + W + hl / 2, `${T.h} ${hl}`, 0.9);
      if (item.window) n.holes.push({ t: 'rrect', x0: L * 0.22, y0: ly + W * 0.18, x1: L * 0.78, y1: ly + W * 0.62, r: 8 });
      else n.print.push({ x0: 0, y0: ly, x1: L, y1: ly + W });
      return n;
    },
    tele(L, W, H, item) {
      const lidH = Math.max(15, Math.round(Math.min(40, H * 0.45))), t = 3;
      const base = nets.tray(L, W, H, item, 0, 0, WORDS.base, false);
      const lid = nets.tray(L + 2 * t, W + 2 * t, lidH, item, L + 2 * H + lidH + 40, -t, WORDS.lid, false);
      const lx = L + 2 * H + lidH + 40;
      return { polys: [...base.polys, ...lid.polys], holes: [], labels: [...base.labels, ...lid.labels], print: [{ x0: lx, y0: -t, x1: lx + L + 2 * t, y1: W + t }] };
    }
  };
  const classify = (polys) => {
    const eps = 1e-6, edges = [];
    polys.forEach((poly, i) => poly.forEach((p, k) => edges.push([p, poly[(k + 1) % poly.length], i])));
    const ax = edges.map(([[x0, y0], [x1, y1]]) => Math.abs(y0 - y1) < eps ? ['h', y0, Math.min(x0, x1), Math.max(x0, x1)] : Math.abs(x0 - x1) < eps ? ['v', x0, Math.min(y0, y1), Math.max(y0, y1)] : null);
    const cuts = [], creases = [];
    edges.forEach((e, n) => {
      const a = ax[n];
      if (!a) { cuts.push([e[0], e[1]]); return; }
      const [kind, c, lo, hi] = a, pts = new Set([lo, hi]), others = [];
      ax.forEach((b, m) => {
        if (b && m !== n && b[0] === kind && Math.abs(b[1] - c) < eps && b[2] < hi - eps && b[3] > lo + eps && edges[m][2] !== e[2]) {
          others.push([b, edges[m][2]]); pts.add(Math.max(lo, b[2])); pts.add(Math.min(hi, b[3]));
        }
      });
      const sorted = [...pts].sort((p, q) => p - q);
      for (let k = 0; k < sorted.length - 1; k++) {
        const s0 = sorted[k], s1 = sorted[k + 1]; if (s1 - s0 < eps) continue;
        const mid = (s0 + s1) / 2, partner = others.filter(([b]) => b[2] - eps <= mid && mid <= b[3] + eps).map(([, j]) => j);
        const seg = kind === 'h' ? [[s0, c], [s1, c]] : [[c, s0], [c, s1]];
        if (partner.length) { if (e[2] < Math.min(...partner)) creases.push(seg); } else cuts.push(seg);
      }
    });
    return { cuts, creases };
  };
  const netInfo = (net) => {
    const xs = net.polys.flat().map(p => p[0]), ys = net.polys.flat().map(p => p[1]);
    const area = net.polys.reduce((sum, poly) => sum + Math.abs(poly.reduce((acc, p, i) => { const q = poly[(i + 1) % poly.length]; return acc + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2, 0);
    return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys), area: area / 1e6 };
  };
  const buildNet = (item, L, W, H) => nets[item.kind](L, W, H, item);
  const drawBlank = (item, L, W, H) => {
    const net = buildNet(item, L, W, H), b = netInfo(net), w = b.x1 - b.x0, h = b.y1 - b.y0, span = Math.max(w, h), pad = span * 0.08, fs = span * 0.024;
    // SVG y grows downwards: mirror the net so labels read the same way as the PDF.
    const Y = y => b.y1 + b.y0 - y;
    const root = svg('svg', { viewBox: `${b.x0 - pad} ${b.y0 - pad * 1.2} ${w + 2 * pad} ${h + pad * 3}`, role: 'img', 'aria-label': `${T.blank}: ${Math.round(w)} × ${Math.round(h)} mm` });
    const pathOf = poly => 'M' + poly.map(([x, y]) => `${x} ${Y(y)}`).join(' L') + ' Z';
    net.polys.forEach(poly => root.append(svg('path', { d: pathOf(poly), class: 'fb-board' })));
    const { cuts, creases } = classify(net.polys);
    const segs = list => list.map(([[x0, y0], [x1, y1]]) => `M${x0} ${Y(y0)} L${x1} ${Y(y1)}`).join(' ');
    root.append(svg('path', { d: segs(creases), class: 'fb-crease' }), svg('path', { d: segs(cuts), class: 'fb-cut' }));
    net.holes.forEach(hole => {
      if (hole.t === 'circle') root.append(svg('circle', { cx: hole.cx, cy: Y(hole.cy), r: hole.r, class: 'fb-hole' }));
      else root.append(svg('rect', { x: hole.x0, y: Y(hole.y1), width: hole.x1 - hole.x0, height: hole.y1 - hole.y0, rx: hole.r || 0, class: hole.t === 'zone' ? 'fb-zone' : 'fb-hole' }));
    });
    // Selected print, drawn under the labels: brand-colour band and logo, sized from each printable panel.
    const print = $('#printing').value;
    root.dataset.board = $('#board').value;
    if (print !== 'none') net.print.forEach(({ x0, y0, x1, y1 }) => {
      const pw = x1 - x0, ph = y1 - y0;
      if (print === 'graphic') {
        const bh = Math.max(2, ph * 0.09);
        ['#1E6FD9', '#4CAF50', '#F5D800', '#E5197D'].forEach((color, i) =>
          root.append(svg('rect', { x: x0 + pw * i / 4, y: Y(y0 + bh), width: pw / 4, height: bh, fill: color })));
      }
      // Logo sits in the upper part of the panel so it never covers the centred dimension labels.
      const size = Math.min(pw * 0.34, ph * 0.36), cy = y0 + ph * 0.73;
      root.append(svg('image', { href: `${assetRoot}logo.png`, x: x0 + (pw - size) / 2, y: Y(cy + size / 2), width: size, height: size,
        class: print === 'mark' ? 'fb-logo fb-logo--mark' : 'fb-logo', preserveAspectRatio: 'xMidYMid meet' }));
    });
    net.labels.forEach(({ x, y, text, size, rot, bold }) => {
      const attrs = { x, y: Y(y), 'font-size': fs * size, class: bold ? 'fb-label fb-bold' : 'fb-label', 'text-anchor': 'middle', 'dominant-baseline': 'middle' };
      if (rot) attrs.transform = `rotate(${rot} ${x} ${Y(y)})`;
      root.append(svgText(attrs, text));
    });
    const dy = b.y1 + pad * 0.9;
    root.append(svg('path', { d: `M${b.x0} ${dy} H${b.x1} M${b.x0} ${dy - fs * 0.4} V${dy + fs * 0.4} M${b.x1} ${dy - fs * 0.4} V${dy + fs * 0.4}`, class: 'fb-dim' }));
    root.append(svgText({ x: (b.x0 + b.x1) / 2, y: dy + fs * 1.4, 'font-size': fs, class: 'fb-label', 'text-anchor': 'middle' }, `${Math.round(w)} × ${Math.round(h)} mm`));
    const ly = b.y0 - pad * 0.55;
    root.append(svg('path', { d: `M${b.x0} ${ly} h${fs * 2}`, class: 'fb-cut' }), svgText({ x: b.x0 + fs * 2.5, y: ly + fs * 0.35, 'font-size': fs * 0.85, class: 'fb-label fb-small' }, T.cut));
    root.append(svg('path', { d: `M${b.x0 + fs * 8} ${ly} h${fs * 2}`, class: 'fb-crease' }), svgText({ x: b.x0 + fs * 10.5, y: ly + fs * 0.35, 'font-size': fs * 0.85, class: 'fb-label fb-small' }, T.crease));
    flat.replaceChildren(root);
  };

  const update = () => {
    const l = read('#length'), w = read('#width'), h = read('#height');
    const L = l.v, W = w.v, H = h.v;
    rangeMsg.hidden = l.ok && w.ok && h.ok; rangeMsg.textContent = T.range;
    const board = BOARD[$('#board').value] || BOARD.kraft, flute = $('#flute').value, print = $('#printing').value, finish = $('#finishing').value;
    const item = current(), style = item.key;
    box.dataset.style = style; box.dataset.kind = item.kind; box.dataset.window = item.window || 'none';
    sStyle.textContent = styleName();
    const lidFrac = item.kind === 'clam' ? item.lid : item.kind === 'tele' ? Math.min(40, H * 0.45) / H : 0;
    box.style.setProperty('--lidfrac', lidFrac.toFixed(3));
    // 3D size: fit the largest diagonal into the stage
    // Scale by the space diagonal so the box never leaves the stage, whatever the rotation.
    const s = Math.min(stage.clientWidth || 420, stage.clientHeight || 420) * 0.82 / Math.hypot(L, W, H);
    const px = (mm) => `${(mm * s).toFixed(1)}px`;
    box.style.setProperty('--L', px(L)); box.style.setProperty('--W', px(W)); box.style.setProperty('--H', px(H));
    box.style.setProperty('--edge', `${Math.max(1.5, Math.min(7, WALL_MM[flute] * s * 2.2)).toFixed(1)}px`);
    box.style.setProperty('--board', board.face); box.style.setProperty('--board-edge', board.edge);
    box.dataset.print = print; box.dataset.finish = finish; box.dataset.flute = flute;
    drawFlute(flute); fluteInset.hidden = !flat.hidden;
    const qtyText = qtyInput.value && Number(qtyInput.value) > 0 ? ` · ${T.qty}: ${nf.format(Number(qtyInput.value))}` : '';
    stateLine.textContent = `${styleName()} · ${$('#board').selectedOptions[0].textContent} · ${$('#flute').selectedOptions[0].textContent} · ${$('#printing').selectedOptions[0].textContent} · ${$('#finishing').selectedOptions[0].textContent}${qtyText}`;
    [tagL, tagW, tagH].forEach(tag => tag.dir = 'ltr');
    tagL.textContent = `${T.l} ${L} mm`; tagW.textContent = `${T.w} ${W} mm`; tagH.textContent = `${T.h} ${H} mm`;
    // Blank size and board area come from the same illustrative net as the flat view.
    const info = netInfo(buildNet(item, L, W, H)), areaM2 = info.area;
    const qty = Math.max(0, Math.floor(Number(qtyInput.value) || 0));
    sBlank.textContent = `${Math.round(info.x1 - info.x0)} × ${Math.round(info.y1 - info.y0)} mm`;
    sArea.textContent = `${nf.format(areaM2)} ${T.m2}`;
    sTotal.textContent = qty ? `${nf.format(Math.round(areaM2 * qty))} ${T.m2} (${nf.format(qty)} × ${nf.format(areaM2)})` : '—';
    sVol.textContent = `${nf.format(L * W * H / 1e6)} ${T.liters}`;
    if (!flat.hidden) drawBlank(item, L, W, H);
    paintView();
  };
  controls.addEventListener('input', update); controls.addEventListener('change', update);
  controls.addEventListener('change', (event) => {
    if (!event.target.matches('select') || reducedMotion.matches) return;
    stage.classList.remove('is-updated'); void stage.offsetWidth; stage.classList.add('is-updated');
  });
  $('#box-style').addEventListener('change', setSizeOptions);
  sizeControl.addEventListener('change', () => {
    const item = current();
    if (sizeControl.value !== 'custom') setDims(item.sizes[Number(sizeControl.value)]);
    resetAngle(); update();
  });
  dimensions.forEach(input => input.addEventListener('input', () => { if (!current().fixed) sizeControl.value = 'custom'; }));
  controls.addEventListener('submit', (event) => event.preventDefault());
  addEventListener('resize', update);

  // View switch
  const setView = (isFlat) => {
    flat.hidden = !isFlat; stage.hidden = isFlat; bReset.hidden = isFlat;
    b3d.classList.toggle('is-on', !isFlat); bFlat.classList.toggle('is-on', isFlat);
    b3d.setAttribute('aria-pressed', String(!isFlat)); bFlat.setAttribute('aria-pressed', String(isFlat));
    update();
  };
  b3d.addEventListener('click', () => setView(false)); bFlat.addEventListener('click', () => setView(true));
  bReset.addEventListener('click', () => { resetAngle(); paintView(); });

  // Drag / keyboard rotation, gentle idle turn
  stage.addEventListener('pointerdown', e => { dragging = { x: e.clientX, y: e.clientY, rx, ry }; idle = false; stage.setPointerCapture(e.pointerId); stage.classList.add('is-drag'); });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    ry = dragging.ry + (e.clientX - dragging.x) * 0.45;
    rx = Math.max(-80, Math.min(20, dragging.rx - (e.clientY - dragging.y) * 0.35));
    paintView();
  });
  const endDrag = () => { dragging = null; stage.classList.remove('is-drag'); };
  stage.addEventListener('pointerup', endDrag); stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('keydown', e => {
    const k = { ArrowLeft: [0, -10], ArrowRight: [0, 10], ArrowUp: [-8, 0], ArrowDown: [8, 0] }[e.key];
    if (!k) return; e.preventDefault(); idle = false;
    rx = Math.max(-80, Math.min(20, rx + k[0])); ry += k[1]; paintView();
  });
  let last = 0, onScreen = false;
  new IntersectionObserver(entries => { onScreen = entries[0].isIntersecting; }).observe(stage);
  const spin = (t) => {
    if (t - last >= 50) {
      if (idle && onScreen && !reducedMotion.matches && !stage.hidden && document.visibilityState === 'visible') { ry += Math.min(60, t - last) * 0.006; paintView(); }
      last = t;
    }
    requestAnimationFrame(spin);
  };
  requestAnimationFrame(spin);

  // Export a useful summary without implying that a quotation was sent.
  const exportBox = el('div', 'config-export'); exportBox.hidden = true;
  const exportNote = el('p', null, { en: 'Copy these details into your message to HR Géant Emballage.', fr: 'Copiez ces données dans votre message à HR Géant Emballage.', ar: 'انسخ هذه البيانات في رسالتك إلى HR Géant Emballage.' }[locale]);
  const exportText = el('textarea'); exportText.readOnly = true; exportText.rows = 9;
  exportText.setAttribute('aria-label', T.yourBox);
  const copyButton = el('button', 'button quiet', { en: 'COPY SPECIFICATION', fr: 'COPIER LES DONNÉES', ar: 'انسخ المواصفات' }[locale]); copyButton.type = 'button';
  const exportLink = el('a', 'button primary', { en: 'CONTACT HR GÉANT EMBALLAGE ↗', fr: 'CONTACTER HR GÉANT EMBALLAGE ↗', ar: 'تواصل مع HR GÉANT EMBALLAGE ↗' }[locale]);
  const copyStatus = el('p', 'config-copy-status'); copyStatus.setAttribute('role', 'status');
  exportLink.href = '#contact'; exportBox.append(exportNote, exportText, copyButton, copyStatus, exportLink); $('#config-cta').after(exportBox);
  copyButton.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(exportText.value); copyButton.textContent = { en: 'COPIED', fr: 'COPIÉ', ar: 'تم النسخ' }[locale]; copyStatus.textContent = ''; }
    catch { exportText.focus(); exportText.select(); copyStatus.textContent = { en: 'The text is selected. Tap Copy in your phone’s menu.', fr: 'Le texte est sélectionné. Appuyez sur Copier dans le menu de votre téléphone.', ar: 'تم تحديد النص. اضغط على «نسخ» من قائمة هاتفك.' }[locale]; }
  });
  $('#config-cta').addEventListener('click', e => {
    e.preventDefault();
    if (!controls.reportValidity() || !['#length','#width','#height'].every(id => $(id).value !== '' && Number($(id).value) >= 20 && Number($(id).value) <= 1200)) { rangeMsg.hidden = false; rangeMsg.textContent = T.range; return; }
    const c = locale === 'fr' ? ' :' : ':';
    const sel = id => $(id).selectedOptions[0].textContent.trim();
    const lines = [
      `${T.desc}${c}`, `${T.style}${c} ${styleName()}`,
      `${T.l} × ${T.w} × ${T.h}${c} ${$('#length').value} × ${$('#width').value} × ${$('#height').value} mm`,
      `${$('label[for="board"]').textContent.replace(/^\d+\s*—\s*/, '')}${c} ${sel('#board')}`,
      `${$('label[for="flute"]').textContent.replace(/^\d+\s*—\s*/, '')}${c} ${sel('#flute')}`,
      `${$('label[for="printing"]').textContent.replace(/^\d+\s*—\s*/, '')}${c} ${sel('#printing')}`,
      `${$('label[for="finishing"]').textContent.replace(/^\d+\s*—\s*/, '')}${c} ${sel('#finishing')}`
    ];
    if (qtyInput.value) lines.push(`${T.qty}${c} ${qtyInput.value}`);
    exportText.value = lines.join('\n'); copyStatus.textContent = ''; exportBox.hidden = false;
    exportBox.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  setSizeOptions();
  const hero = $('.hero');
  hero.addEventListener('pointermove', event => { if (event.pointerType === 'mouse' && !reducedMotion.matches && innerWidth > 850) { const x = (event.clientX / innerWidth - .5) * 18; const y = (event.clientY / innerHeight - .5) * 12; $('.box-cube').style.transform = `rotateX(${-22 - y}deg) rotateY(${-32 + x}deg)`; } });
  hero.addEventListener('pointerleave', () => { $('.box-cube').style.transform = ''; });
  $('#industry-list').addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; $('#industry-list').querySelectorAll('button').forEach(el => el.classList.toggle('selected', el === button)); $('#industry-detail').textContent = button.dataset.detail; });
  $('#industry-list').addEventListener('focusin', event => event.target.closest('button')?.click());

  // Static GitHub Pages has no form processing. Add a verified HTTPS endpoint, then enable this block.
  const FORM_ENDPOINT = ''; // e.g. your verified Formspree or custom API endpoint
  const WHATSAPP_NUMBER = '213770691631'; // E.164 digits, without + or spaces
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
