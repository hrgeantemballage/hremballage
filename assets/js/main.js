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
  $('#product-grid').innerHTML = productData.map(([name, description, details, image], index) => `<article class="product-card"><img src="${assetRoot}images/${image}" loading="lazy" width="1400" height="900" alt="${name} — ${photoLabel}"><div class="product-content"><small>${String(index + 1).padStart(2, '0')} / ${copy.solution}</small><h3>${name}</h3><p>${description}</p><p class="details">${details}</p><a href="#contact" aria-label="${copy.explore} ${name}">${copy.explore} ↗</a></div></article>`).join('');

  /* ==========================================================================
     04 — PACKAGING CONFIGURATOR
     Live CSS 3D previews for shipping, pizza and tacos styles. A simplified
     blank illustration is shown only for the standard shipping carton.
     Geometry approximates a regular slotted carton (RSC / FEFCO 0201);
     no prices or weights are invented.
     ========================================================================== */
  const T = {
    en: { qty: 'Quantity', qtyPh: 'e.g. 5000', view3d: '3D box', viewFlat: 'Flat blank', reset: 'Reset view',
      yourBox: 'Your box', style: 'Style', rsc: 'Shipping carton (RSC / FEFCO 0201)', pizza: 'Pizza box — illustrative', tacos: 'Tacos takeout box — illustrative', blank: 'Flat blank size', area: 'Board per box',
      total: 'Board for the order', volume: 'Volume', wall: 'Wall thickness', approx: 'Illustrative dimensions and area only. Confirm all production specifications with HR Géant Emballage.',
      range: 'Length and width: 100–1200 mm. Height: 40–1200 mm.', glue: 'Glue flap', cut: 'Cut', crease: 'Crease', sent: 'Your specification has been added to the quote form below.',
      walls: { unspecified: '≈ 3–4 mm (to be recommended)', single: '≈ 3–4 mm', double: '≈ 6–7 mm' },
      desc: 'Box specification from the online configurator', front: 'Front', side: 'Side', l: 'L', w: 'W', h: 'H', liters: 'L', m2: 'm²' },
    fr: { qty: 'Quantité', qtyPh: 'ex. 5000', view3d: 'Boîte 3D', viewFlat: 'Mise à plat', reset: 'Réinitialiser la vue',
      yourBox: 'Votre boîte', style: 'Modèle', rsc: 'Caisse de transport (FEFCO 0201)', pizza: 'Boîte à pizza — illustration', tacos: 'Boîte à tacos — illustration', blank: 'Format de la découpe à plat', area: 'Carton par boîte',
      total: 'Carton pour la commande', volume: 'Volume', wall: 'Épaisseur de paroi', approx: 'Dimensions et surface indicatives. Confirmez les spécifications de production avec HR Géant Emballage.',
      range: 'Longueur et largeur : 100–1200 mm. Hauteur : 40–1200 mm.', glue: 'Patte de collage', cut: 'Coupe', crease: 'Rainage', sent: 'Votre spécification a été ajoutée au formulaire de devis ci-dessous.',
      walls: { unspecified: '≈ 3–4 mm (à recommander)', single: '≈ 3–4 mm', double: '≈ 6–7 mm' },
      desc: 'Spécification issue du configurateur en ligne', front: 'Face', side: 'Côté', l: 'L', w: 'l', h: 'H', liters: 'L', m2: 'm²' },
    ar: { qty: 'الكمية', qtyPh: 'مثال: 5000', view3d: 'صندوق ثلاثي الأبعاد', viewFlat: 'الفرد المسطح', reset: 'إعادة ضبط العرض',
      yourBox: 'صندوقك', style: 'النموذج', rsc: 'صندوق شحن (FEFCO 0201)', pizza: 'علبة بيتزا — نموذج توضيحي', tacos: 'علبة تاكوس — نموذج توضيحي', blank: 'مقاس اللوح المسطح', area: 'الكرتون لكل صندوق',
      total: 'الكرتون للطلبية', volume: 'الحجم', wall: 'سماكة الجدار', approx: 'الأبعاد والمساحة توضيحية فقط. تُعتمد مواصفات الإنتاج مع HR Géant Emballage.',
      range: 'الطول والعرض: من 100 إلى 1200 مم. الارتفاع: من 40 إلى 1200 مم.', glue: 'لسان اللصق', cut: 'قص', crease: 'طي', sent: 'أُضيفت مواصفاتك إلى نموذج طلب عرض السعر أدناه.',
      walls: { unspecified: '≈ 3–4 مم (يُحدد لاحقاً)', single: '≈ 3–4 مم', double: '≈ 6–7 مم' },
      desc: 'مواصفات الصندوق من أداة التصميم', front: 'الواجهة', side: 'الجانب', l: 'ط', w: 'ع', h: 'ر', liters: 'لتر', m2: 'م²' }
  }[locale] || null;

  const controls = $('#config-form');
  const previewPane = $('.config-preview');
  const oldPreview = $('#preview-box');
  const nf = new Intl.NumberFormat(locale === 'ar' ? 'ar-DZ-u-nu-latn' : locale, { maximumFractionDigits: 2 });
  // These dimensions drive an illustrative preview, not a production dieline.
  const STYLE_SIZES = { shipping: [400, 300, 250], small: [200, 200, 40], medium: [260, 260, 40], large: [330, 330, 40], tacos: [220, 120, 50] };
  const sizeNames = {
    en: { custom: 'Custom dimensions', small: 'Small · 20 × 20 × 4 cm', medium: 'Medium · 26 × 26 × 4 cm', large: 'Large · indicative size', tacos: 'One tacos size · indicative' },
    fr: { custom: 'Dimensions personnalisées', small: 'Petit · 20 × 20 × 4 cm', medium: 'Moyen · 26 × 26 × 4 cm', large: 'Grand · taille indicative', tacos: 'Une taille tacos · indicative' },
    ar: { custom: 'أبعاد مخصصة', small: 'صغير · 20 × 20 × 4 سم', medium: 'متوسط · 26 × 26 × 4 سم', large: 'كبير · مقاس توضيحي', tacos: 'مقاس واحد للتاكوس · توضيحي' }
  }[locale];
  const sizeControl = $('#box-size');
  const dimensions = ['#length', '#width', '#height'].map(id => $(id));
  const setSizeOptions = () => {
    const style = $('#box-style').value;
    const options = style === 'pizza' ? ['small','medium','large'] : style === 'tacos' ? ['tacos'] : ['custom'];
    sizeControl.replaceChildren(...options.map(key => new Option(sizeNames[key], key)));
    sizeControl.disabled = options.length === 1;
    const [L, W, H] = STYLE_SIZES[options[0] === 'custom' ? 'shipping' : options[0]];
    [L, W, H].forEach((value, i) => { dimensions[i].value = value; dimensions[i].readOnly = style !== 'shipping'; });
    rx = style === 'shipping' ? -22 : -53; ry = -34;
    update();
  };
  const GLUE = 35;                                   // illustration allowance, not a manufacturing value
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
  const styleName = () => T[$('#box-style').value] || T.rsc;
  sStyle.textContent = styleName();
  // Keep dimension notation in LTR order inside the Arabic interface.
  [sBlank, sArea, sTotal, sVol].forEach(value => value.dir = 'ltr');

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
  const dimTag = (face, cls) => { const t = el('span', `box3__dim ${cls}`); faces[face].append(t); return t; };
  const tagL = dimTag('front', 'is-bottom'), tagH = dimTag('front', 'is-side'), tagW = dimTag('right', 'is-bottom');
  const flat = el('div', 'flat-blank'); flat.hidden = true;
  const viewNote = el('p', 'config-view-note'); viewNote.hidden = true; viewNote.textContent = { en: 'The flat blank is illustrated for the shipping carton only.', fr: 'La découpe à plat est illustrée uniquement pour la caisse de transport.', ar: 'يظهر مخطط الفرد لصندوق الشحن فقط.' }[locale];
  const stateLine = el('p', 'config-state'); stateLine.setAttribute('aria-live', 'polite');
  previewPane.append(tools, stage, flat, viewNote);
  // Keep the options readable outside the interactive 3D stage at every viewport width.
  previewPane.after(stateLine);

  let rx = -22, ry = -34, dragging = null, idle = true;
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
    const min = id === '#height' ? 40 : 100;
    const ok = input.value !== '' && v >= min && v <= 1200;
    input.toggleAttribute('aria-invalid', !ok);
    return { v: ok ? v : Math.min(1200, Math.max(min, v || min)), ok };
  };
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = (tag, attrs, text) => { const n = document.createElementNS(svgNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (text != null) n.textContent = text; return n; };
  const drawBlank = (L, W, H) => {
    const F = W / 2, total = GLUE + 2 * L + 2 * W, tall = H + 2 * F, pad = Math.max(total, tall) * 0.09;
    const root = svg('svg', { viewBox: `${-pad} ${-pad} ${total + 2 * pad} ${tall + 2 * pad * 1.6}`, role: 'img', 'aria-label': `${T.blank}: ${Math.round(total)} × ${Math.round(tall)} mm` });
    const fs = Math.max(total, tall) * 0.028;
    const panels = [GLUE, L, W, L, W]; let x = 0; const xs = [];
    panels.forEach(p => { xs.push(x); x += p; });
    // cut outline
    let d = `M0 ${F + 6} L${GLUE} ${F} `;
    for (let i = 1; i < 5; i++) { d += `L${xs[i] + 3} ${F} L${xs[i] + 3} 0 L${xs[i] + panels[i] - 3} 0 L${xs[i] + panels[i] - 3} ${F} `; }
    d += `L${total} ${F} L${total} ${F + H} `;
    for (let i = 4; i >= 1; i--) { d += `L${xs[i] + panels[i] - 3} ${F + H} L${xs[i] + panels[i] - 3} ${tall} L${xs[i] + 3} ${tall} L${xs[i] + 3} ${F + H} `; }
    d += `L${GLUE} ${F + H} L0 ${F + H - 6} Z`;
    root.append(svg('path', { d, class: 'fb-board' }), svg('path', { d, class: 'fb-cut' }));
    // creases
    let c = `M${GLUE} ${F} V${F + H} `;
    for (let i = 2; i < 5; i++) c += `M${xs[i]} ${F} V${F + H} `;
    c += `M${GLUE} ${F} H${total} M${GLUE} ${F + H} H${total}`;
    root.append(svg('path', { d: c, class: 'fb-crease' }));
    // labels
    const lab = (tx, ty, s) => root.append(svg('text', { x: tx, y: ty, 'font-size': fs, class: 'fb-label', 'text-anchor': 'middle' }, s));
    lab(xs[1] + L / 2, F + H / 2, `${T.l} ${L}`); lab(xs[2] + W / 2, F + H / 2, `${T.w} ${W}`);
    lab(xs[3] + L / 2, F + H / 2, `${T.l} ${L}`); lab(xs[4] + W / 2, F + H / 2, `${T.w} ${W}`);
    lab(xs[1] + L / 2, F + H / 2 + fs * 1.4, `${T.h} ${H}`);
    root.append(svg('text', { x: GLUE / 2, y: F + H / 2, 'font-size': fs * 0.7, class: 'fb-label fb-small', 'text-anchor': 'middle', transform: `rotate(-90 ${GLUE / 2} ${F + H / 2})` }, T.glue));
    const y = tall + pad * 0.9;
    root.append(svg('path', { d: `M0 ${y} H${total} M0 ${y - fs * 0.4} V${y + fs * 0.4} M${total} ${y - fs * 0.4} V${y + fs * 0.4}`, class: 'fb-dim' }));
    lab(total / 2, y + fs * 1.3, `${Math.round(total)} × ${Math.round(tall)} mm`);
    const ly = -pad * 0.35;
    root.append(svg('path', { d: `M0 ${ly} h${fs * 2}`, class: 'fb-cut' }), svg('text', { x: fs * 2.5, y: ly + fs * 0.35, 'font-size': fs * 0.8, class: 'fb-label fb-small' }, T.cut));
    root.append(svg('path', { d: `M${fs * 7} ${ly} h${fs * 2}`, class: 'fb-crease' }), svg('text', { x: fs * 9.5, y: ly + fs * 0.35, 'font-size': fs * 0.8, class: 'fb-label fb-small' }, T.crease));
    flat.replaceChildren(root);
  };

  const update = () => {
    const l = read('#length'), w = read('#width'), h = read('#height');
    const L = l.v, W = w.v, H = h.v;
    rangeMsg.hidden = l.ok && w.ok && h.ok; rangeMsg.textContent = T.range;
    const board = BOARD[$('#board').value] || BOARD.kraft, flute = $('#flute').value, print = $('#printing').value, finish = $('#finishing').value;
    const style = $('#box-style').value;
    box.dataset.style = style; sStyle.textContent = styleName();
    bFlat.disabled = style !== 'shipping'; viewNote.hidden = style === 'shipping';
    if (style !== 'shipping' && !flat.hidden) { flat.hidden = true; stage.hidden = false; bReset.hidden = false; bFlat.classList.remove('is-on'); b3d.classList.add('is-on'); bFlat.setAttribute('aria-pressed', 'false'); b3d.setAttribute('aria-pressed', 'true'); }
    // 3D size: fit the largest diagonal into the stage
    const size = Math.min(stage.clientWidth || 420, stage.clientHeight || 420) * 0.68;
    const s = size / Math.max(L, W, H);
    const px = (mm) => `${(mm * s).toFixed(1)}px`;
    box.style.setProperty('--L', px(L)); box.style.setProperty('--W', px(W)); box.style.setProperty('--H', px(H));
    box.style.setProperty('--edge', `${Math.max(1.5, Math.min(7, WALL_MM[flute] * s * 2.2)).toFixed(1)}px`);
    box.style.setProperty('--board', board.face); box.style.setProperty('--board-edge', board.edge);
    box.dataset.print = print; box.dataset.finish = finish;
    const qtyText = qtyInput.value && Number(qtyInput.value) > 0 ? ` · ${T.qty}: ${nf.format(Number(qtyInput.value))}` : '';
    stateLine.textContent = `${styleName()} · ${$('#board').selectedOptions[0].textContent} · ${$('#flute').selectedOptions[0].textContent} · ${$('#printing').selectedOptions[0].textContent} · ${$('#finishing').selectedOptions[0].textContent}${qtyText}`;
    [tagL, tagW, tagH].forEach(tag => tag.dir = 'ltr');
    tagL.textContent = `${T.l} ${L} mm`; tagW.textContent = `${T.w} ${W} mm`; tagH.textContent = `${T.h} ${H} mm`;
    // A flat blank estimate is meaningful here only for the shipping carton.
    const blankL = GLUE + 2 * L + 2 * W, blankW = H + W, areaM2 = blankL * blankW / 1e6;
    const qty = Math.max(0, Math.floor(Number(qtyInput.value) || 0));
    sBlank.parentElement.hidden = style !== 'shipping';
    sArea.parentElement.hidden = style !== 'shipping';
    sTotal.parentElement.hidden = style !== 'shipping';
    if (style === 'shipping') {
      sBlank.textContent = `${Math.round(blankL)} × ${Math.round(blankW)} mm`;
      sArea.textContent = `${nf.format(areaM2)} ${T.m2}`;
      sTotal.textContent = qty ? `${nf.format(Math.round(areaM2 * qty))} ${T.m2} (${nf.format(qty)} × ${nf.format(areaM2)})` : '—';
    }
    sVol.textContent = `${nf.format(L * W * H / 1e6)} ${T.liters}`;
    if (!flat.hidden) drawBlank(L, W, H);
    paintView();
  };
  controls.addEventListener('input', update); controls.addEventListener('change', update);
  $('#box-style').addEventListener('change', setSizeOptions);
  sizeControl.addEventListener('change', () => {
    const values = STYLE_SIZES[sizeControl.value];
    if (values) values.forEach((value, i) => { dimensions[i].value = value; });
    update();
  });
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
  bReset.addEventListener('click', () => { rx = $('#box-style').value === 'shipping' ? -22 : -53; ry = -34; paintView(); });

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
  let last = 0;
  const spin = (t) => {
    if (t - last >= 50) {
      if (idle && !reducedMotion.matches && !stage.hidden && document.visibilityState === 'visible') { ry += Math.min(60, t - last) * 0.006; paintView(); }
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
    if (!controls.reportValidity() || !['#length','#width','#height'].every(id => $(id).value !== '' && Number($(id).value) >= (id === '#height' ? 40 : 100) && Number($(id).value) <= 1200)) { rangeMsg.hidden = false; rangeMsg.textContent = T.range; return; }
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
