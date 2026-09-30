/* HR Géant Emballage — website assistant "Packy".
   A scripted guide, not AI. Titles, descriptions, product cards, lists and contact details are read from the
   page itself, in the page's language. Packy's own short lines are playful and make no product claims. */
(function () {
  'use strict';
  if (window.__hrGuide) return; window.__hrGuide = true;

  const html = document.documentElement;
  const lang = (html.lang || 'en').slice(0, 2);
  const rtl = (html.dir || '').toLowerCase() === 'rtl';
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = {
    en: { launcher:'Packy', name:'Packy', sub:'Your website assistant',
      bubble:'Hey, I’m Packy, your assistant. Let me help you!', hi:'Welcome.',
      ask:'Welcome. Excellence in structural packaging begins here.',
      disclosure:'I’m an automated assistant, not AI. I only show information published on this site.',
      intents:{ boxes:'📦 I need boxes for my products', print:'🎨 I want printed boxes with my brand', work:'🏭 I want to see how you work', look:'👀 Just looking around' },
      design:'✏️ Design your box with me', designNote:'Build it live in 3D, then copy or email the details to us.', copyDetails:'Copy details', copied:'Copied!', tryIt:'✏️ Design your box with me', goto:'Or go straight to', contact:'Talk to our team',
      email:'Email our sales team', emailNote:'Opens your email app. You send the message yourself.', call:'Call', whatsapp:'WhatsApp',
      subject:'Packaging enquiry', next:'Next', back:'Back', finish:'Finish', menu:'Main menu', close:'Close', more:'More', less:'Less', contactAsk:'How would you like to reach us?', follow:'Follow us', repeat:'Repeat all', viewSection:'View this section', move:'Drag this message to move it; use Alt and arrow keys to adjust its position.',
      step:'Stop {n} of {t}', play:'Play automatically', pause:'Pause', endTour:'End the tour',
      end:'That’s it! Ready to talk about your packaging?', restart:'Choose another tour',
      sendDesign:'Email my design', sendNote:'Your email app opens with your box details. You send it yourself.',
      lines:{
        company:'Discover how we approach packaging around the product and its journey.',
        products:'Explore each packaging family. Select a product for its details, or continue when you are ready.',
        industries:'Explore the applications shown for each sector. Tell us about your product to discuss a suitable format.',
        configurator:'See how the model and print affect this illustrative box preview. Your own choices will be restored.',
        'printing-section':'Printing connects the package with your brand. Discuss artwork and available processes with our team.',
        manufacturing:'Follow the seven stages shown here, from paper to finished packaging. Continue at your pace.',
        quality:'These quality considerations help frame a project discussion. Ask our team about your requirements.',
        technology:'See how the outer liners and the fluted middle layer form corrugated board.',
        location:'Find us in Béni Tamou, Blida. Open the map when you want directions.',
        contact:'Describe your project by email, or call our commercial team directly.',
        d0:'Let’s design your box together! This is our live box builder. I’ll show you every choice.',
        d1:'Step 1: choose your box model. Watch the live preview change!', d2:'Step 2: type your size in millimetres. I’ll turn the box so you see every side.',
        d3:'Step 3: see natural kraft change to white kraft. We’ll keep the white surface for the next steps.', d4:'Step 4: compare single and double wall. We’ll continue with double wall.',
        d5:'Step 5: add your print. Your box, your brand.', d6:'Step 6: compare natural, matte and smooth finishing. We’ll keep smooth.',
        d7:'Step 7: here’s your box unfolded, the flat blank.', d8:'Your box is ready! Copy the details or email them to our team.' },
      dest:{products:'Products', configurator:'Box configurator', manufacturing:'Manufacturing', location:'Our location', contact:'Contact sales'} },
    fr: { launcher:'Packy', name:'Packy', sub:'Votre assistant sur le site',
      bubble:'Salut, je suis Packy, votre assistant. Laissez-moi vous aider !', hi:'Bienvenue.',
      ask:'Bienvenue. L’excellence dans la conception structurelle des emballages commence ici.',
      disclosure:'Je suis un assistant automatique, pas une IA. Je montre uniquement les informations publiées sur ce site.',
      intents:{ boxes:'📦 J’ai besoin de caisses pour mes produits', print:'🎨 Je veux des emballages imprimés à mon image', work:'🏭 Je veux voir comment vous travaillez', look:'👀 Je jette juste un œil' },
      design:'✏️ Concevez votre caisse avec moi', designNote:'Créez-la en 3D en direct, puis copiez ou envoyez-nous les détails.', copyDetails:'Copier les détails', copied:'Copié !', tryIt:'✏️ Concevez votre caisse avec moi', goto:'Ou allez directement à', contact:'Parler à notre équipe',
      email:'Écrire au service commercial', emailNote:'Ouvre votre messagerie. C’est vous qui envoyez le message.', call:'Appeler', whatsapp:'WhatsApp',
      subject:'Demande d’emballage', next:'Suivant', back:'Précédent', finish:'Terminer', menu:'Menu principal', close:'Fermer', more:'Plus', less:'Moins', contactAsk:'Comment souhaitez-vous nous contacter ?', follow:'Suivez-nous', repeat:'Revoir toute la visite', viewSection:'Voir cette section', move:'Faites glisser ce message pour le déplacer ; utilisez Alt et les flèches pour ajuster sa position.',
      step:'Étape {n} sur {t}', play:'Lecture automatique', pause:'Pause', endTour:'Quitter la visite',
      end:'Et voilà ! Parlons de votre projet d’emballage ?', restart:'Choisir une autre visite',
      sendDesign:'Envoyer mon design par e-mail', sendNote:'Votre messagerie s’ouvre avec les détails de votre caisse. C’est vous qui l’envoyez.',
      lines:{
        company:'Découvrez notre approche de l’emballage, pensée autour du produit et de son parcours.',
        products:'Explorez chaque famille d’emballages. Consultez les détails avant de poursuivre à votre rythme.',
        industries:'Découvrez les applications présentées pour chaque secteur. Parlez-nous de votre produit.',
        configurator:'Observez l’effet du modèle et de l’impression sur cet aperçu illustratif. Vos choix seront rétablis.',
        'printing-section':'L’impression relie l’emballage à votre marque. Discutez des visuels et des procédés disponibles avec notre équipe.',
        manufacturing:'Suivez les sept étapes présentées, du papier à l’emballage fini, à votre rythme.',
        quality:'Ces points de qualité aident à préciser vos besoins. Parlez de vos exigences à notre équipe.',
        technology:'Découvrez les deux couvertures et la cannelure qui composent le carton ondulé.',
        location:'Retrouvez-nous à Béni Tamou, Blida. Ouvrez la carte pour obtenir l’itinéraire.',
        contact:'Décrivez votre projet par e-mail ou appelez directement notre équipe commerciale.',
        d0:'Concevons votre caisse ensemble ! Voici notre configurateur en direct. Je vous montre chaque choix.',
        d1:'Étape 1 : choisissez votre modèle. Regardez l’aperçu changer en direct !', d2:'Étape 2 : indiquez vos dimensions en millimètres. Je fais tourner la caisse pour voir chaque face.',
        d3:'Étape 3 : passez du kraft naturel au kraft blanc. Nous gardons le blanc pour la suite.', d4:'Étape 4 : comparez la simple et la double cannelure. Nous continuons en double cannelure.',
        d5:'Étape 5 : ajoutez votre impression. Votre caisse, votre marque.', d6:'Étape 6 : comparez les finitions naturelle, mate et lisse. Nous gardons la finition lisse.',
        d7:'Étape 7 : voici votre caisse à plat, le flan découpé.', d8:'Votre caisse est prête ! Copiez les détails ou envoyez-les à notre équipe.' },
      dest:{products:'Produits', configurator:'Configurateur', manufacturing:'Fabrication', location:'Notre implantation', contact:'Service commercial'} },
    ar: { launcher:'Packy', name:'Packy', sub:'مساعدك في الموقع',
      bubble:'مرحباً، أنا باكي، مساعدك. دعني أساعدك!', hi:'أهلاً بكم.',
      ask:'أهلاً بكم. التميّز في التصميم الهيكلي للتغليف يبدأ هنا.',
      disclosure:'أنا مساعد آلي ولست ذكاءً اصطناعياً. أعرض فقط المعلومات المنشورة على هذا الموقع.',
      intents:{ boxes:'📦 أحتاج صناديق لمنتجاتي', print:'🎨 أريد عبوات مطبوعة بعلامتي', work:'🏭 أريد أن أرى طريقة عملكم', look:'👀 أتصفح فقط' },
      design:'✏️ صمّم عبوتك معي', designNote:'اصنعها مباشرة بتقنية ثلاثية الأبعاد، ثم انسخ التفاصيل أو أرسلها إلينا.', copyDetails:'انسخ التفاصيل', copied:'تم النسخ!', tryIt:'✏️ صمّم عبوتك معي', goto:'أو انتقل مباشرة إلى', contact:'تحدث مع فريقنا',
      email:'راسل فريق المبيعات', emailNote:'يفتح تطبيق البريد لديك، وأنت من يرسل الرسالة.', call:'اتصل', whatsapp:'واتساب',
      subject:'استفسار عن التغليف', next:'التالي', back:'السابق', finish:'إنهاء', menu:'القائمة الرئيسية', close:'إغلاق', more:'المزيد', less:'أقل', contactAsk:'كيف تفضّل التواصل معنا؟', follow:'تابعنا', repeat:'إعادة الجولة كاملة', viewSection:'عرض هذا القسم', move:'اسحب هذه الرسالة لتحريكها، أو استخدم Alt مع مفاتيح الأسهم لضبط موضعها.',
      step:'المحطة {n} من {t}', play:'تشغيل تلقائي', pause:'إيقاف مؤقت', endTour:'إنهاء الجولة',
      end:'هذا كل شيء! هل نناقش مشروع التغليف الخاص بك؟', restart:'اختر جولة أخرى',
      sendDesign:'أرسل تصميمي بالبريد', sendNote:'يفتح تطبيق البريد مع تفاصيل عبوتك، وأنت من يرسلها.',
      lines:{
        company:'تعرّف على نهجنا في تصميم التغليف بما يلائم المنتج ورحلته.',
        products:'استكشف فئات التغليف وتفاصيلها، ثم تابع الجولة بالوتيرة التي تناسبك.',
        industries:'تعرّف على التطبيقات المعروضة لكل قطاع، وأخبرنا عن منتجك لمناقشة العبوة المناسبة.',
        configurator:'شاهد تأثير النموذج والطباعة على هذه المعاينة التوضيحية. سنعيد اختياراتك كما كانت.',
        'printing-section':'تربط الطباعة العبوة بعلامتك. ناقش التصميم والخيارات المتاحة مع فريقنا.',
        manufacturing:'تابع المراحل السبع المعروضة من الورق إلى العبوة النهائية، على مهل.',
        quality:'تساعد جوانب الجودة هذه في تحديد احتياجات مشروعك. ناقش متطلباتك مع فريقنا.',
        technology:'تعرّف على الطبقتين الخارجيتين والطبقة المموجة بينهما.',
        location:'تجدنا في بني تامو بالبليدة. افتح الخريطة لمعرفة الطريق.',
        contact:'صف مشروعك عبر البريد الإلكتروني أو اتصل بفريق المبيعات مباشرة.',
        d0:'لنصمّم عبوتك معاً! هذه أداة التصميم المباشر. سأريك كل خيار.',
        d1:'الخطوة 1: اختر نموذج عبوتك. شاهد المعاينة تتغير مباشرة!', d2:'الخطوة 2: أدخل المقاسات بالمليمتر. سأدير العبوة لترى كل جوانبها.',
        d3:'الخطوة 3: شاهد الانتقال من الكرافت الطبيعي إلى الكرافت الأبيض. سنحتفظ بالأبيض للخطوات التالية.', d4:'الخطوة 4: قارن الجدار الواحد بالجدار المزدوج. سنكمل بالجدار المزدوج.',
        d5:'الخطوة 5: أضف الطباعة. عبوتك بعلامتك.', d6:'الخطوة 6: قارن التشطيب الطبيعي والمطفي والناعم. سنحتفظ بالتشطيب الناعم.',
        d7:'الخطوة 7: هذه عبوتك مفرودة، أي القطعة المسطحة قبل الطي.', d8:'عبوتك جاهزة! انسخ التفاصيل أو أرسلها إلى فريقنا.' },
      dest:{products:'المنتجات', configurator:'أداة التصميم', manufacturing:'التصنيع', location:'موقعنا', contact:'فريق المبيعات'} }
  };
  const t = T[lang] || T.en;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const byId = id => document.getElementById(id);
  const DEST = ['products','configurator','manufacturing','location','contact'].filter(byId);

  // ---------- content read from the page (never invented) ----------
  const clean = s => (s || '').replace(/\s+/g, ' ').trim();
  function stopContent(section) {
    const eyebrow = $('.eyebrow', section), h2 = $('h2', section);
    let textEl = null;
    for (const p of $$('p', section)) {
      if (p.classList.contains('eyebrow') || p.closest('form') || p.closest('.hrg-panel') || p.closest('.config-spec')) continue;
      if (clean(p.textContent).length > 25) { textEl = p; break; }
    }
    return { title: clean(eyebrow ? eyebrow.textContent : (h2 ? h2.textContent : section.id)), titleEl: h2, textEl };
  }
  const mail = $('a[href^="mailto:"]'), tel = $('a[href^="tel:"]'), wa = byId('whatsapp-link');
  const email = mail ? mail.getAttribute('href').replace(/^mailto:/, '').split('?')[0] : '';
  const phone = tel ? tel.getAttribute('href').replace(/^tel:/, '') : '';
  const phoneShown = tel ? clean(tel.textContent).replace(/[^\d+ ]/g, '').trim() || phone : '';

  // ---------- Packy: a small folded-cardboard rhombicuboctahedron (static SVG, no ids, safe to repeat) ----------
  function bot(cls) {
    const s = document.createElement('span');
    s.className = 'hrg-bot ' + (cls || '');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = window.PackyCharacter.render({ size:'compact' });
    return s;
  }
  function packyScene() {
    const w = document.createElement('span');
    w.className = 'hrg-scene';
    w.setAttribute('aria-hidden', 'true');
    w.innerHTML = '<span class="hrg-scene-shadow"></span>' + window.PackyCharacter.render({ size:'hero' });
    return w;
  }
  function tapPacky(host, then) {
    const expression=window.PackyCharacter.tap(host);
    if (then) {
      then();
      // Carry the reaction into the assistant that replaces the tapped mascot.
      if (!panel.hidden && expression) window.PackyCharacter.set(panel, expression, 1600);
    }
  }

  // ---------- DOM helpers ----------
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function btn(label, cls, onClick) { const b = el('button', 'hrg-btn ' + (cls || ''), label); b.type = 'button'; b.addEventListener('click', onClick); return b; }
  function link(label, href, cls, note) {
    const a = el('a', 'hrg-btn ' + (cls || '')); a.href = href;
    a.appendChild(el('span', '', label));
    if (note) a.appendChild(note);
    return a;
  }
  const ltr = s => { const b = el('bdi', '', s); b.dir = 'ltr'; return b; };

  // ---------- corner button + panel ----------
  const launch = el('button', 'hrg-launch');
  launch.type = 'button';
  launch.setAttribute('aria-expanded', 'false');
  launch.setAttribute('aria-controls', 'hrg-panel');
  launch.append(bot(), el('span', 'hrg-launch-label', t.launcher));

  const panel = el('section', 'hrg-panel');
  panel.id = 'hrg-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'hrg-title');
  panel.hidden = true;
  const head = el('div', 'hrg-head');
  head.appendChild(bot('hrg-bot-sm'));
  const who = el('div', 'hrg-who');
  const title = el('h2', 'hrg-title', t.name); title.id = 'hrg-title'; title.tabIndex = -1;
  who.append(title, el('p', 'hrg-sub', t.sub));
  head.appendChild(who);
  const x = btn('×', 'hrg-x', () => close()); x.setAttribute('aria-label', t.close);
  head.appendChild(x);
  const body = el('div', 'hrg-body');
  const live = el('p', 'hrg-sr'); live.setAttribute('aria-live', 'polite');
  panel.append(head, body, live);
  document.body.append(launch, panel);
  document.body.classList.add('hrg-ready'); // hides the old floating WhatsApp button; its link lives in the panel

  // ---------- Packy in the hero ----------
  const heroSection = byId('home');
  let stage = null, bubbleText = null;
  if (heroSection) {
    stage = el('button', 'hrg-hero');
    stage.type = 'button';
    stage.setAttribute('aria-expanded', 'false');
    stage.setAttribute('aria-controls', 'hrg-panel');
    const bubble = el('span', 'hrg-bubble');
    bubbleText = el('span', '', t.bubble);
    bubble.appendChild(bubbleText);
    stage.append(bubble, packyScene());
    heroSection.appendChild(stage);
    document.body.classList.add('hrg-has-hero');
    let heroVisible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; document.body.classList.toggle('hrg-hero-visible', heroVisible); }, { threshold: 0.2 }).observe(heroSection);
    }
    stage.addEventListener('click', () => {
      if (!panel.hidden) { close(); return; }
      stage.classList.add('is-out');
      bubbleText.textContent = t.hi;
      tapPacky(stage, () => open(stage));
    });

  }

  // ---------- shared behaviour ----------
  const header = byId('site-header');
  let spotSection = null;
  function scrollToEl(target, block) {
    if (!target) return;
    const hh = header ? header.getBoundingClientRect().height : 0;
    const designTour = document.body.classList.contains('hrg-design-tour');
    // The live preview stays docked while the visitor reads the relevant control.
    // Scrolling it into the middle of the screen would push that control away.
    if (designTour && target.closest('.config-preview-col')) return;
    const r = target.getBoundingClientRect();
    let y = r.top + window.scrollY - hh - 12;
    if (designTour) {
      const preview = $('.config-preview');
      const previewCol = $('.config-preview-col');
      const reserve = window.innerWidth <= 700
        ? (previewCol ? parseFloat(getComputedStyle(previewCol).top) || 180 : 180)
          + (preview ? preview.getBoundingClientRect().height : 220) + 22
        : hh + 154;
      y = r.top + window.scrollY - reserve;
    } else if (block === 'center') y = r.top + window.scrollY - Math.max(hh + 12, (window.innerHeight - r.height) / 2);
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
  }
  function highlight(section) {
    if (spotSection) spotSection.classList.remove('hrg-spot');
    spotSection = section || null;
    if (spotSection) spotSection.classList.add('hrg-spot');
  }
  function announce(s) { live.textContent = ''; setTimeout(() => { live.textContent = s; }, 60); }

  function contactBlock() {
    const box = el('div', 'hrg-contact');
    box.appendChild(el('p', 'hrg-label', t.contact));
    if (email) box.appendChild(link(t.email, 'mailto:' + email + '?subject=' + encodeURIComponent(t.subject), 'hrg-primary', el('small', 'hrg-note', t.emailNote)));
    if (phone) { const a = link(t.call + ' ', 'tel:' + phone, ''); a.firstChild.appendChild(ltr(phoneShown)); box.appendChild(a); }
    if (wa && !wa.hidden && /^https:\/\/wa\.me\/\d{8,15}$/.test(wa.href)) {
      const a = link(t.whatsapp, wa.href, ''); a.target = '_blank'; a.rel = 'noopener noreferrer'; box.appendChild(a);
    }
    const socials = $$('.social-3d a.s3d:not(.s3d-wa)');
    if (socials.length) {
      const row = el('div', 'hrg-social');
      socials.forEach(s => { const a = link(clean($('.s3d-name', s).textContent), s.href, ''); a.target = '_blank'; a.rel = 'noopener noreferrer'; row.appendChild(a); });
      box.append(el('p', 'hrg-label', t.follow), row);
    }
    return box;
  }
  function renderContact() {
    highlight(null);
    body.replaceChildren(el('p', 'hrg-say hrg-ask', t.contactAsk), contactBlock());
    const back = btn(t.menu, 'hrg-link', renderHome); body.appendChild(back);
  }

  function renderHome() {
    highlight(null);
    body.replaceChildren();
    body.appendChild(el('p', 'hrg-say hrg-ask', t.ask));
    if (byId('configurator') && $('#config-cta')) {
      const d = btn(t.design, 'hrg-design', () => startDesign());
      d.appendChild(el('small', 'hrg-note', t.designNote));
      body.appendChild(d);
    }
    const intents = el('div', 'hrg-intents');
    Object.keys(PATHS).forEach(key => { if (PATHS[key].length) intents.appendChild(btn(t.intents[key], 'hrg-intent', () => startTour(key))); });
    body.appendChild(intents);
    if (DEST.length) {
      body.appendChild(el('p', 'hrg-label', t.goto));
      const grid = el('div', 'hrg-grid');
      DEST.forEach(id => grid.appendChild(btn(t.dest[id], '', () => jump(id))));
      body.appendChild(grid);
    }
    body.appendChild(contactBlock());
  }
  function renderEnd() {
    highlight(null);
    body.replaceChildren();
    body.appendChild(el('p', 'hrg-say', t.end));
    body.appendChild(contactBlock());
    if (lastTour) body.appendChild(btn(t.repeat, 'hrg-primary hrg-wide', repeatAll));
    body.appendChild(btn(t.restart, 'hrg-link', renderHome));
    announce(t.end);
  }
  function jump(id) {
    const target = byId(id);
    close(false);
    scrollToEl(target);
    const h = $('h2', target);
    if (h) { if (!h.hasAttribute('tabindex')) h.tabIndex = -1; setTimeout(() => h.focus({ preventScroll: true }), reduce ? 0 : 450); }
  }
  // ---------- tours: Packy travels, sends waves, lights up the page and demonstrates it ----------
  const PATHS = {
    boxes: ['products', 'industries', 'configurator', 'contact'],
    print: ['printing-section', 'configurator', 'contact'],
    work: ['manufacturing', 'quality', 'technology', 'location'],
    look: ['company', 'products', 'manufacturing', 'industries', 'contact']
  };
  Object.keys(PATHS).forEach(k => { PATHS[k] = PATHS[k].filter(byId); });

  const tp = el('div', 'hrg-tour'); tp.hidden = true;
  const tpBubble = el('div', 'hrg-tbubble');
  tpBubble.tabIndex = 0;
  tpBubble.setAttribute('aria-label', t.move);
  const tpRow = el('div', 'hrg-tour-row');
  // Bubble text lives in its own area so it can be shortened on phones ("More" / "Less").
  let tbText = el('div', 'hrg-tb-text');
  const tbMore = el('button', 'hrg-tb-more', t.more); tbMore.type = 'button'; tbMore.hidden = true;
  tbMore.addEventListener('click', () => {
    const open = !tpBubble.classList.contains('is-open');
    tpBubble.classList.toggle('is-open', open);
    tbMore.textContent = open ? t.less : t.more;
    tbMore.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  function fitText() {
    requestAnimationFrame(() => {
      if (tpBubble.classList.contains('is-open')) { tbMore.hidden = false; return; }
      tbMore.hidden = !(tbText.scrollHeight > tbText.clientHeight + 2);
    });
  }
  function setNote(text) {
    const prev = $('.hrg-item-note', tbText); if (prev) prev.remove();
    if (text) {
      // on phones the item being shown comes first; Packy's introduction stays one tap away ("More")
      const n = el('span', 'hrg-item-note', text);
      if (window.innerWidth <= 700 && !document.body.classList.contains('hrg-design-tour')) { n.classList.add('is-first'); tbText.prepend(n); } else tbText.appendChild(n);
    }
    fitText();
  }
  const tpBot = el('button', 'hrg-tour-bot');
  tpBot.type = 'button'; tpBot.setAttribute('aria-label', ({en:'Animate Packy',fr:'Animer Packy',ar:'تحريك باكي'})[lang] || 'Animate Packy');
  tpBot.append(bot());
  tpBot.addEventListener('click', () => tapPacky(tpBot));
  const pill = el('div', 'hrg-pill'); pill.setAttribute('role', 'toolbar'); pill.setAttribute('aria-label', t.name);
  const pBack = btn(rtl ? '›' : '‹', 'hrg-pbtn hrg-arrow', () => go(idx - 1)); pBack.setAttribute('aria-label', t.back);
  const pCount = el('span', 'hrg-pcount');
  const pNext = btn(rtl ? '‹' : '›', 'hrg-pbtn hrg-pnext hrg-arrow', () => go(idx + 1));
  const pPlay = btn('▶', 'hrg-pbtn hrg-play', () => setPlay(!playing));
  const pRepeat = btn('↺', 'hrg-pbtn hrg-repeat', repeatAll); pRepeat.setAttribute('aria-label', t.repeat); pRepeat.title = t.repeat;
  const pEnd = btn('✕', 'hrg-pbtn', () => endTour(false)); pEnd.setAttribute('aria-label', t.endTour);
  pill.append(pBack, pCount, pNext, pPlay, pRepeat, pEnd);
  tpRow.append(tpBot, pill);
  tp.append(tpBubble, tpRow);
  const waves = el('div', 'hrg-waves'); waves.setAttribute('aria-hidden', 'true');
  for (let k = 0; k < 3; k++) waves.appendChild(el('i', ''));
  document.body.append(waves, tp);

  let steps = [], idx = -1, token = 0, playing = false, playTimer = 0, lit = [], lastTour = null, looping = false;
  // The message is visitor-movable without dragging its action buttons.
  let drag = null, bubbleX = 0, bubbleY = 0;
  const clampBubble = (x, y) => {
    const r = tpBubble.getBoundingClientRect();
    return [Math.max(12 - r.left + bubbleX, Math.min(x, innerWidth - 12 - r.right + bubbleX)),
      Math.max(12 - r.top + bubbleY, Math.min(y, innerHeight - 12 - r.bottom + bubbleY))];
  };
  const moveBubble = (x, y) => {
    [bubbleX, bubbleY] = clampBubble(x, y);
    tpBubble.style.setProperty('--hrg-drag-x', bubbleX + 'px');
    tpBubble.style.setProperty('--hrg-drag-y', bubbleY + 'px');
  };
  tpBubble.addEventListener('pointerdown', e => {
    if (e.target.closest('button,a,input,textarea,select') || e.button !== 0) return;
    drag = { id:e.pointerId, x:e.clientX, y:e.clientY, bx:bubbleX, by:bubbleY };
    tpBubble.setPointerCapture(e.pointerId);
    tpBubble.classList.add('hrg-dragging');
  });
  tpBubble.addEventListener('pointermove', e => {
    if (!drag || drag.id !== e.pointerId) return;
    userMovedBubble = true;
    moveBubble(drag.bx + e.clientX - drag.x, drag.by + e.clientY - drag.y);
  });
  const stopDrag = e => { if (drag && drag.id === e.pointerId) { drag = null; tpBubble.classList.remove('hrg-dragging'); } };
  tpBubble.addEventListener('pointerup', stopDrag);
  tpBubble.addEventListener('pointercancel', stopDrag);
  tpBubble.addEventListener('keydown', e => {
    if (e.target !== tpBubble || !e.altKey || !/^Arrow(Left|Right|Up|Down)$/.test(e.key)) return;
    e.preventDefault(); e.stopPropagation(); userMovedBubble = true;
    moveBubble(bubbleX + (e.key === 'ArrowLeft' ? -24 : e.key === 'ArrowRight' ? 24 : 0),
      bubbleY + (e.key === 'ArrowUp' ? -24 : e.key === 'ArrowDown' ? 24 : 0));
  });
  window.addEventListener('resize', () => { if (!tp.hidden) moveBubble(bubbleX, bubbleY); }, { passive:true });
  const later = (ms, fn) => { const tk = token; setTimeout(() => { if (tk === token) fn(); }, reduce ? Math.min(ms, 50) : ms); };
  function unlight() {
    lit.forEach(e => e.classList.remove('hrg-lit-title', 'hrg-lit-text', 'hrg-lit-item', 'hrg-pin'));
    lit = [];
  }
  function mark(e, cls) { if (e) { e.classList.add(cls); lit.push(e); } }
  function spot(e, only) {
    if (!e) return;
    if (only) lit.filter(x => x.classList.contains('hrg-lit-item')).forEach(x => x.classList.remove('hrg-lit-item'));
    mark(e, 'hrg-lit-item');
    window.PackyCharacter.guide(e);
  }
  function fireWaves(target) {
    window.PackyCharacter.guide(target);
    if (reduce || !target) return;
    const a = tpBot.getBoundingClientRect(), r = target.getBoundingClientRect();
    const ox = a.left + a.width / 2, oy = a.top + a.height * 0.08;
    const tx = rtl ? r.right - Math.min(r.width, 260) / 2 : r.left + Math.min(r.width, 260) / 2;
    const ty = r.top + Math.min(r.height, 80) / 2;
    const d = Math.max(80, Math.hypot(tx - ox, ty - oy) + 30);
    const ang = Math.atan2(ty - oy, tx - ox) * 180 / Math.PI + 90;
    waves.style.left = (ox - d) + 'px'; waves.style.top = (oy - d) + 'px';
    waves.style.width = waves.style.height = (2 * d) + 'px';
    waves.style.setProperty('--from', (ang - 32) + 'deg');
    waves.classList.remove('go'); void waves.offsetWidth; waves.classList.add('go');
    tpBot.classList.remove('hrg-emit'); void tpBot.offsetWidth; tpBot.classList.add('hrg-emit');
  }
  function lightTitle(section) {
    const c = stopContent(section);
    later(650, () => {
      fireWaves(c.titleEl || section);
      later(650, () => {
        mark(c.titleEl, 'hrg-lit-title');
        if (c.textEl) later(700, () => { c.textEl.style.setProperty('--hrg-h', c.textEl.offsetHeight + 'px'); mark(c.textEl, 'hrg-lit-text'); });
      });
    });
    return c;
  }
  // step through a list: light each item in turn, with a wave, optionally doing something to it
  function sequence(items, start, gap, fn) {
    items.forEach((item, i) => later(start + i * gap, () => {
      spot(item, true); showItem(item); later(reduce ? 0 : 480, () => fireWaves(item));
      if (fn) fn(item, i);
      setNote(noteFor(item));
    }));
    return start + items.length * gap + 600;
  }
  function noteFor(item) {
    const head = item.querySelector('h3, h4, strong');
    let title;
    if (head) title = clean(head.textContent);
    else { const c = item.cloneNode(true); $$('span', c).forEach(x => { if (/^[\s↗→←]*$/.test(x.textContent)) x.remove(); }); title = clean(c.textContent); }
    let detail = item.getAttribute('data-detail') || '';
    if (!detail) { const p = Array.from(item.querySelectorAll('p')).find(x => !x.classList.contains('details') && clean(x.textContent) !== title); if (p) detail = clean(p.textContent); }
    title = title.slice(0, 90); detail = detail.slice(0, 170);
    return title + (detail ? ': ' + detail : '');
  }
  // Keep what Packy is talking about on screen and out from under his bubble.
  const headerH = () => (header ? header.getBoundingClientRect().height : 0);
  let userMovedBubble = false;
  function setDock(top) { document.body.style.setProperty('--hrg-header-h', Math.round(headerH()) + 'px'); tp.classList.toggle('hrg-dock-top', !!top); }
  function placeDock(target) {
    if (!target || userMovedBubble || document.body.classList.contains('hrg-design-tour') || tp.hidden) return;
    const r = target.getBoundingClientRect(), c = tp.getBoundingClientRect(), h = c.height, hh = headerH();
    if (!(r.left < c.right && c.left < r.right)) { setDock(false); return; }
    const ov = (a1, a2, b1, b2) => Math.max(0, Math.min(a2, b2) - Math.max(a1, b1));
    const low = ov(r.top, r.bottom, window.innerHeight - h - 16, window.innerHeight);
    const high = ov(r.top, r.bottom, hh + 8, hh + 8 + h);
    setDock(low > 0 && high < low);
  }
  function showItem(target) {
    if (!target || document.body.classList.contains('hrg-design-tour')) return;
    const hh = headerH(), dockH = tp.getBoundingClientRect().height || 0, mobile = window.innerWidth <= 700;
    const top = hh + 10, bottom = window.innerHeight - (mobile ? dockH + 14 : 16);
    const r = target.getBoundingClientRect();
    if (r.top >= top && r.bottom <= bottom) { placeDock(target); return; }
    const room = Math.max(120, bottom - top);
    if (r.height > room && mobile) {
      // Taller than the free space (e.g. a product card): Packy's bubble goes to the top
      // and the bottom of the item, where its text is, stays in view.
      setDock(true);
      const y = r.bottom + window.scrollY - window.innerHeight + 12;
      window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    const y = r.height <= room ? r.top + window.scrollY - top - (room - r.height) / 2 : r.top + window.scrollY - top;
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
    later(reduce ? 0 : 520, () => placeDock(target));
  }
  function setSelect(sel, value) {
    if (!sel || !Array.from(sel.options).some(o => o.value === value)) return;
    sel.value = value;
    sel.dispatchEvent(new Event('input', { bubbles: true }));
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // What Packy does at each stop. Every action works on the page's own elements. Returns its length in ms.
  const ACT = {
    company(s) { const c = lightTitle(s); if (c.textEl) later(2100, () => showItem(c.textEl)); const cta = $('.text-link, .button', s); if (cta) later(3400, () => { spot(cta); showItem(cta); later(480, () => fireWaves(cta)); }); return 6400; },
    products(s) { lightTitle(s); return sequence($$('#product-grid .product-card'), 2600, 3200); },
    industries(s) { lightTitle(s); return sequence($$('#industry-list button'), 2400, 3200, b => b.click()); },
    configurator(s) {
      lightTitle(s);
      const style = byId('box-style'), print = byId('printing'), preview = $('.config-preview');
      later(1900, () => { const f = window.innerWidth > 700 ? $('.config-layout') || style : preview; if (f) showItem(f); });
      const optName = sel => sel && sel.selectedOptions[0] ? clean(sel.selectedOptions[0].textContent) : '';
      later(2300, () => { setSelect(style, 'pizza'); spot(style, true); fireWaves(style); setNote(optName(style)); });
      later(3900, () => { setSelect(print, 'mark'); spot(print, true); fireWaves(print); setNote(optName(style) + ' · ' + optName(print)); });
      later(5500, () => { setSelect(style, 'gift'); spot(style, true); fireWaves(style); setNote(optName(style) + ' · ' + optName(print)); });
      later(7000, () => { if (preview) { spot(preview, true); fireWaves(preview); } tpBubble.appendChild(btn(t.tryIt, 'hrg-send', () => startDesign())); });
      return 9000;
    },
    'printing-section'(s) { lightTitle(s); const img = $('.printing-image', s); later(2600, () => { spot(img); showItem(img); later(480, () => fireWaves(img)); }); return 6000; },
    manufacturing(s) {
      lightTitle(s);
      // Packy rides the line; his bubble names each stage as he passes it (names come from the page).
      const stages = $$('.mfg-steps li', s).map(li => clean(Array.from(li.children).map(c => c.textContent).join(' ') || li.textContent));
      later(1300, () => showItem(s)); // on phones the stairs are low in the section: the bubble moves to the top
      const per = 1300;
      later(1500, () => { if (window.HRManufacturing) window.HRManufacturing.ride(reduce ? 0 : per * Math.max(1, stages.length)); });
      stages.forEach((name, k) => later(1500 + k * per, () => setNote(name)));
      return 1500 + per * stages.length + 1200;
    },
    quality(s) { lightTitle(s); return sequence($$('.quality-list > div', s), 2200, 3200); },
    technology(s) { lightTitle(s); const layers = $$('.tl-label', s); if (layers.length) return sequence(layers, 2400, 3000); return sequence($$('.board-diagram .board-liner, .board-diagram .board-flute', s), 2200, 3200); },
    location(s) {
      lightTitle(s);
      const map = $('.map-panel', s), open = $('.map-open', s);
      later(2300, () => { if (map) { spot(map); map.classList.add('hrg-pin'); showItem(map); later(480, () => fireWaves(map)); const adr = $('.footer-map'); if (adr) setNote(clean(adr.textContent).replace(/\s*↗\s*$/, '')); } });
      later(4400, () => { if (open) { spot(open); showItem(open); later(480, () => fireWaves(open)); } });
      return 6500;
    },
    contact(s) { lightTitle(s); return sequence($$('.section-heading .button', s), 2200, 1200); }
  };

  // "Design your box with me": Packy demonstrates on the live preview, then hands control back to the visitor.
  const views = () => $$('.config-views button');
  let designInitialView = null;
  let userChangedView = false;
  // Programmatic demonstrations must not overwrite a view the visitor chose.
  document.addEventListener('click', e => {
    if (idx >= 0 && steps[idx] && steps[idx].design && e.isTrusted && e.target.closest('.config-views button')) userChangedView = true;
  });
  const boxStage = () => $('.box-stage');
  function glide(ms) { // the preview eases between Packy's moves instead of jumping
    const st = boxStage(); if (!st || reduce) return;
    st.classList.add('hrg-glide');
    clearTimeout(glide.t); glide.t = setTimeout(() => st.classList.remove('hrg-glide'), ms);
    cleanups.push(() => st.classList.remove('hrg-glide'));
  }
  function turn(deg, stepMs) { // rotates the live 3D preview through the site's own keyboard control
    const st = boxStage(); if (!st) return;
    const n = Math.round(Math.abs(deg) / 10), key = deg > 0 ? 'ArrowRight' : 'ArrowLeft', gap = stepMs || 45;
    later(0, () => glide(n * gap + 1200));
    for (let i = 0; i < n; i++) later(i * gap, () => st.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true })));
  }
  function tilt(steps) { const st = boxStage(); if (!st) return; later(0, () => glide(Math.abs(steps) * 260 + 1200)); for (let i = 0; i < Math.abs(steps); i++) later(i * 260, () => st.dispatchEvent(new KeyboardEvent('keydown', { key: steps > 0 ? 'ArrowDown' : 'ArrowUp', bubbles: true }))); }
  function showView(flat) { const v = views(); const b = flat ? v[1] : v[0]; if (b) b.click(); }
  function resetView() { const r = $('.config-views__reset'); if (r) r.click(); }
  // Demonstrate options; selected tour steps carry their final choice forward.
  let cleanups = [];
  function swap() { const st = boxStage(); if (!st || reduce) return; st.classList.remove('hrg-swap'); void st.offsetWidth; st.classList.add('hrg-swap'); }
  function runCleanups() { const c = cleanups; cleanups = []; c.forEach(fn => fn()); }
  function tryOption(sel, values, start, gap, keepFinal = false) {
    const e = byId(sel); if (!e) return start;
    const mine = e.value;
    let changed = false, visitorChanged = false;
    const onChange = event => { if (event.isTrusted) visitorChanged = true; };
    e.addEventListener('change', onChange);
    const settle = () => {
      const finalValue = keepFinal ? values[values.length - 1] : mine;
      if (!visitorChanged && (changed || keepFinal) && e.value !== finalValue) setSelect(e, finalValue);
      changed = false;
    };
    cleanups.push(() => { settle(); e.removeEventListener('change', onChange); });
    values.forEach((v, i) => later(start + i * gap, () => { if (visitorChanged) return; changed = true; swap(); setSelect(e, v); spot(e, true); fireWaves(e); }));
    later(start + values.length * gap, settle);
    return start + values.length * gap + 300;
  }
  function focusPreview() {
    const p = $('.config-preview');
    if (p && window.innerWidth <= 700 && !document.body.classList.contains('hrg-design-tour')) scrollToEl(p, 'center');
    return p;
  }
  // The design tour opens on the configurator's own title before the first control.
  // A real timer is used so the title stays readable with reduced motion too.
  const DESIGN_INTRO_MS = 4200;
  const wait = (ms, fn) => { const tk = token; setTimeout(() => { if (tk === token) fn(); }, ms); };
  function designIntro(done) {
    const sec = byId('configurator');
    if (!sec) { done(); return; }
    const c = stopContent(sec);
    const line = $('.hrg-tb-line', tbText);
    if (line) { line.textContent = t.lines.d0; fitText(); }
    later(120, () => announce(t.lines.d0));
    highlight(sec);
    const top = $('.eyebrow', sec) || c.titleEl || sec;
    // Keep the title just below Packy's docked bubble. Measured from layout, not the animated
    // size (the bubble's pop-in scale under-measures it), and checked again once scrolling ends.
    const place = smooth => {
      const bTop = getComputedStyle(tpBubble).position === 'fixed' ? parseFloat(getComputedStyle(tpBubble).top) || 0 : 0;
      const clear = Math.max(headerH(), bTop ? bTop + tpBubble.offsetHeight : 0) + 16;
      const off = top.getBoundingClientRect().top - clear;
      if (Math.abs(off) > 4) window.scrollTo({ top: Math.max(0, window.scrollY + off), behavior: smooth && !reduce ? 'smooth' : 'auto' });
    };
    place(true);
    wait(reduce ? 60 : 900, () => place(true));
    lightTitle(sec);
    wait(DESIGN_INTRO_MS, () => {
      unlight(); highlight(null);
      if (line) { line.textContent = t.lines.d1; fitText(); }
      announce(t.lines.d1);
      done();
    });
  }
  const DESIGN = [
    { line: 'd1', run() {
      if (!userChangedView) showView(false);
      designIntro(() => {
        const style = byId('box-style'); if (style) { scrollToEl(style, 'center'); later(500, () => { spot(style); fireWaves(style); }); }
        later(1300, focusPreview);
        const shown = tryOption('box-style', ['shipping', 'beverage', 'burger', 'takeaway', 'dates', 'cake'], 1700, 2300, true);
        later(shown, () => { if (style) spot(style, true); });
      });
    } },
    { line: 'd2', run() {
      const dims = $('.dimension-fields'); if (dims) { scrollToEl(dims, 'center'); later(500, () => { spot(dims); fireWaves(dims); }); }
      later(1400, () => { focusPreview(); if (!userChangedView) showView(false); spot($('.config-preview')); });
      later(1900, () => turn(360, 190));
      later(9000, () => tilt(-2));
      later(10400, () => { glide(1400); resetView(); if (dims) spot(dims, true); });
    } },
    { line: 'd3', run() {
      const board = byId('board'); if (board) { scrollToEl(board, 'center'); later(500, () => { spot(board); fireWaves(board); }); }
      later(1200, focusPreview);
      tryOption('board', ['white'], 1600, 2600, true);
    } },
    { line: 'd4', run() {
      const flute = byId('flute'); if (flute) { scrollToEl(flute, 'center'); later(500, () => { spot(flute); fireWaves(flute); }); }
      later(1200, focusPreview);
      tryOption('flute', ['single', 'double'], 1600, 2600, true);
    } },
    { line: 'd5', run() {
      const pr = byId('printing'); if (pr) { scrollToEl(pr, 'center'); later(500, () => { spot(pr); fireWaves(pr); }); }
      later(1200, focusPreview);
      const n = tryOption('printing', ['mark', 'graphic'], 1600, 2800);
      later(n + 300, () => { if (pr) spot(pr, true); });
    } },
    { line: 'd6', run() {
      const finish = byId('finishing'); if (finish) { scrollToEl(finish, 'center'); later(500, () => { spot(finish); fireWaves(finish); }); }
      later(1200, focusPreview);
      tryOption('finishing', ['matte', 'smooth'], 1600, 2600, true);
    } },
    { line: 'd7', run() {
      const p = $('.config-preview'); if (p) { scrollToEl(p, 'center'); later(500, () => { spot(p); fireWaves(p); }); }
      later(1200, () => { if (!userChangedView) { swap(); showView(true); } });
      later(5600, () => { if (!userChangedView) { swap(); showView(false); } });
    } },
    { line: 'd8', run() {
      const cta = byId('config-cta');
      if (cta) cta.click(); // the site's own button writes the specification summary
      const box = $('.config-export');
      later(300, () => { if (box && !box.hidden) { scrollToEl(box, 'center'); spot(box); fireWaves(box); } else { const err = $('.config-error'); if (err) scrollToEl(err, 'center'); } });
      later(700, () => {
        const copy = btn(t.copyDetails, 'hrg-copy', () => {
          const b = $('.config-export button');
          if (b) { b.click(); copy.textContent = t.copied; }
        });
        tpBubble.append(btn(t.sendDesign, 'hrg-send', sendDesign), copy, el('small', 'hrg-note', t.sendNote));
      });
    } }
  ];
  const DESIGN_MS = { d1: 17000 + DESIGN_INTRO_MS, d2: 12500, d3: 5500, d4: 7500, d5: 8500, d6: 7500, d7: 7000, d8: 9000 };
  // Every (re)start of the design tour begins from the builder's default state.
  function resetDesigner() {
    const form = byId('config-form'); if (!form) return;
    const def = sel => { const o = Array.from(sel.options).find(x => x.defaultSelected) || sel.options[0]; return o ? o.value : sel.value; };
    ['box-style', 'board', 'flute', 'printing', 'finishing'].forEach(id => {
      const e = byId(id); if (e && e.value !== def(e)) setSelect(e, def(e));
    });
    const style = byId('box-style'); if (style) style.dispatchEvent(new Event('change', { bubbles: true })); // default size and dimensions
    const qty = byId('config-qty'); if (qty && qty.value) { qty.value = ''; qty.dispatchEvent(new Event('input', { bubbles: true })); }
    const exp = $('.config-export'); if (exp) exp.hidden = true;
    showView(false); resetView();
  }
  function designStep(d) { d.run(); return DESIGN_MS[d.line] || 8000; }
  function sendDesign() {
    const cta = byId('config-cta');
    if (cta) cta.click();
    const box = $('.config-export textarea');
    const spec = box ? box.value : '';
    if (!spec) { const err = $('.config-error'); if (err) scrollToEl(err, 'center'); return; }
    const model = byId('box-style');
    const subject = t.subject + (model ? ' · ' + clean(model.selectedOptions[0].textContent) : '');
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(spec + '\n\n');
  }

  function setPlay(on) {
    playing = !!on;
    if (!playing && looping) setLoop(false);
    clearTimeout(playTimer);
    pPlay.textContent = playing ? '❚❚' : '▶';
    pPlay.setAttribute('aria-label', playing ? t.pause : t.play);
    pPlay.setAttribute('aria-pressed', playing ? 'true' : 'false');
    if (playing && idx >= 0) scheduleNext(steps[idx].len || 6000);
  }
  function scheduleNext(ms) {
    clearTimeout(playTimer);
    const current = tpBubble.textContent.length;
    if (playing) playTimer = setTimeout(() => go(idx + 1), Math.max(8000, ms + 1400, current * 80));
  }
  function setLoop(on) {
    looping = !!on;
    pRepeat.classList.toggle('is-on', looping);
    pRepeat.setAttribute('aria-pressed', looping ? 'true' : 'false');
  }
  // Repeat all: Packy plays the whole tour automatically and starts it again at the end, until the visitor stops him.
  function repeatAll() {
    if (idx >= 0) {
      const on = !looping;
      // On the last design step, ↺ always means "start again from step 1 with default settings".
      if (steps[idx] && steps[idx].design && idx === steps.length - 1) { runCleanups(); token++; resetDesigner(); setLoop(true); setPlay(true); go(0); return; }
      setLoop(on); setPlay(on || playing); if (on && !playing) setPlay(true); return;
    }
    if (!lastTour) return;
    if (lastTour.kind === 'design') startDesign(true, true); else startTour(lastTour.kind, true);
    setLoop(true);
  }

  function go(i) {
    if (i < 0) { endTour(false); return; }
    if (i >= steps.length) { if (looping && playing) { i = 0; if (steps[0] && steps[0].design) { runCleanups(); token++; resetDesigner(); } } else { endTour(true); return; } }
    runCleanups(); token++; idx = i;
    unlight(); waves.classList.remove('go');
    const st = steps[i];
    window.PackyCharacter.set(tpBot, st.line === 'd8' ? 'reassuring' : st.design ? 'thinking' : 'focused');
    tp.hidden = false; document.body.classList.add('hrg-touring-mode');
    document.body.classList.toggle('hrg-design-tour', !!st.design);
    document.body.classList.toggle('hrg-design-summary', st.line === 'd8');
    if (st.design) requestAnimationFrame(() => {
      const r = tpBubble.getBoundingClientRect();
      if (r.height) document.body.style.setProperty('--hrg-dock', Math.round(r.bottom + 8) + 'px');
    });
    pCount.textContent = (i + 1) + '/' + steps.length;
    pCount.setAttribute('aria-label', t.step.replace('{n}', i + 1).replace('{t}', steps.length));
    const last = i === steps.length - 1;
    pNext.textContent = last ? '✓' : (rtl ? '‹' : '›');
    pNext.setAttribute('aria-label', last ? t.finish : t.next);
    tbText = el('div', 'hrg-tb-text');
    tbText.appendChild(el('span', 'hrg-tb-line', t.lines[st.line] || ''));
    tpBubble.classList.remove('is-open'); tbMore.textContent = t.more; tbMore.setAttribute('aria-expanded', 'false');
    tpBubble.replaceChildren(tbText, tbMore);
    fitText();
    if (!st.design) setDock(false);
    moveBubble(bubbleX, bubbleY);
    tpBubble.classList.remove('pop'); void tpBubble.offsetWidth; tpBubble.classList.add('pop');
    let len;
    if (st.design) { highlight(null); len = designStep(st.design); }
    else { const s = byId(st.id); highlight(s); scrollToEl(s); len = (ACT[st.id] || (sec => { lightTitle(sec); return 4500; }))(s); }
    st.len = len;
    const c = st.id ? stopContent(byId(st.id)) : null;
    announce(t.step.replace('{n}', i + 1).replace('{t}', steps.length) + '. ' + (t.lines[st.line] || '') + (c ? ' ' + c.title : ''));
    if (playing) scheduleNext(len);
  }
  function begin(list, canPlay, auto) {
    close(false);
    steps = list; pPlay.hidden = !canPlay; setPlay(false);
    go(0);
    if (auto) setPlay(true);
    pNext.focus({ preventScroll: true });
  }
  function startTour(key, auto = false) { lastTour = { kind:key }; begin(PATHS[key].map(id => ({ id, line:id })), true, auto); }
  function startDesign(auto = false, fresh = false) {
    lastTour = { kind:'design' };
    designInitialView = views().findIndex(b => b.getAttribute('aria-pressed') === 'true');
    userChangedView = false;
    if (fresh) { runCleanups(); token++; resetDesigner(); }
    begin(DESIGN.map(d => ({ design:d, line:d.line })), true, auto);
  }
  function endTour(finished) {
    runCleanups(); token++; setLoop(false); setPlay(false);
    if (designInitialView >= 0 && !userChangedView) showView(designInitialView === 1);
    designInitialView = null;
    userChangedView = false;
    idx = -1; unlight(); highlight(null);
    window.PackyCharacter.clearGuide();
    tp.hidden = true; document.body.classList.remove('hrg-touring-mode', 'hrg-design-tour', 'hrg-design-summary');
    waves.classList.remove('go');
    if (window.HRManufacturing) window.HRManufacturing.ride(-1);
    if (finished) open(null, 'end'); else launch.focus({ preventScroll: true });
  }
  document.addEventListener('keydown', e => {
    if (idx < 0 || !e.isTrusted || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target && e.target.closest && e.target.closest('.box-stage, .config-controls')) return; // arrows there rotate the box or edit the form
    if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '')) return;
    const fwd = rtl ? 'ArrowLeft' : 'ArrowRight', bwd = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd) { e.preventDefault(); go(idx + 1); }
    else if (e.key === bwd) { e.preventDefault(); go(idx - 1); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); endTour(false); }
  });
  document.addEventListener('click', e => {
    if (idx >= 0 && playing && e.isTrusted && !e.target.closest('.hrg-tour, .hrg-panel')) setPlay(false);
  });

  // ---------- open / close ----------
  function place(anchor) {
    panel.classList.remove('hrg-anchored');
    ['left', 'top', 'right', 'bottom'].forEach(k => panel.style.removeProperty(k));
    if (!anchor || window.innerWidth <= 700) return;
    const r = anchor.getBoundingClientRect(), pw = panel.offsetWidth, ph = panel.offsetHeight, m = 16;
    let left = rtl ? r.right + m : r.left - pw - m;
    left = Math.max(m, Math.min(window.innerWidth - pw - m, left));
    const top = Math.max(90, Math.min(window.innerHeight - ph - m, r.bottom - ph));
    panel.classList.add('hrg-anchored');
    panel.style.left = left + 'px'; panel.style.top = top + 'px'; panel.style.right = 'auto'; panel.style.bottom = 'auto';
  }
  function open(anchor, view) {
    panel.hidden = false;
    launch.setAttribute('aria-expanded', 'true');
    if (stage) stage.setAttribute('aria-expanded', 'true');
    document.body.classList.add('hrg-open');
    if (view === 'end') renderEnd(); else if (view === 'contact') renderContact(); else renderHome();
    place(anchor);
    requestAnimationFrame(() => panel.classList.add('hrg-in'));
    title.focus({ preventScroll: true });
  }
  function close(returnFocus) {
    highlight(null);
    panel.classList.remove('hrg-in');
    panel.hidden = true;
    launch.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('hrg-open');
    if (stage) {
      stage.setAttribute('aria-expanded', 'false');
      stage.classList.remove('is-out');
      bubbleText.textContent = t.bubble;
    }
    if (returnFocus !== false) {
      const heroShown = stage && document.body.classList.contains('hrg-hero-visible');
      (heroShown ? stage : launch).focus({ preventScroll: true });
    }
  }
  launch.addEventListener('click', () => { if (!panel.hidden) { close(); return; } tapPacky(launch, () => open(null)); });
  document.addEventListener('click', e => {
    const opener = e.target.closest && e.target.closest('[data-hrg-open]');
    if (!opener) return;
    e.preventDefault();
    if (idx >= 0) endTour(false);
    open(null, opener.getAttribute('data-hrg-open'));
  });
  const foot = $('footer');
  if (foot && 'IntersectionObserver' in window) new IntersectionObserver(([e]) => document.body.classList.toggle('hrg-footer-visible', e.isIntersecting), { threshold: 0.05 }).observe(foot);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); e.stopPropagation(); close(); } });
  if (rtl) panel.dir = 'rtl';
})();
