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
  const finePointer = window.matchMedia && matchMedia('(pointer: fine)').matches;

  const T = {
    en: { launcher:'Packy', name:'Packy', sub:'Your website assistant',
      bubble:'Hey, I’m Packy, your assistant. Let me help you!', hi:'Hello!',
      ask:'Hello! What brings you here?',
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
        d1:'Step 1: choose your box model. Watch the live preview change!', d2:'Step 2: type your size in millimetres. I’ll turn the box so you see every side.',
        d3:'Step 3: kraft or white? Single or double wall? See the difference live.', d4:'Step 4: add your print and finish. Your box, your brand.',
        d5:'Step 5: here’s your box unfolded, the flat blank.', d6:'Your box is ready! Copy the details or email them to our team.' },
      dest:{products:'Products', configurator:'Box configurator', manufacturing:'Manufacturing', location:'Our location', contact:'Contact sales'} },
    fr: { launcher:'Packy', name:'Packy', sub:'Votre assistant sur le site',
      bubble:'Salut, je suis Packy, votre assistant. Laissez-moi vous aider !', hi:'Bonjour !',
      ask:'Bonjour ! Qu’est-ce qui vous amène ?',
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
        d1:'Étape 1 : choisissez votre modèle. Regardez l’aperçu changer en direct !', d2:'Étape 2 : indiquez vos dimensions en millimètres. Je fais tourner la caisse pour voir chaque face.',
        d3:'Étape 3 : kraft ou blanc ? Simple ou double cannelure ? Voyez la différence en direct.', d4:'Étape 4 : ajoutez impression et finition. Votre caisse, votre marque.',
        d5:'Étape 5 : voici votre caisse à plat, le flan découpé.', d6:'Votre caisse est prête ! Copiez les détails ou envoyez-les à notre équipe.' },
      dest:{products:'Produits', configurator:'Configurateur', manufacturing:'Fabrication', location:'Notre implantation', contact:'Service commercial'} },
    ar: { launcher:'Packy', name:'Packy', sub:'مساعدك في الموقع',
      bubble:'مرحباً، أنا باكي، مساعدك. دعني أساعدك!', hi:'مرحباً!',
      ask:'مرحباً! ما الذي أتى بك إلى هنا؟',
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
        d1:'الخطوة 1: اختر نموذج عبوتك. شاهد المعاينة تتغير مباشرة!', d2:'الخطوة 2: أدخل المقاسات بالمليمتر. سأدير العبوة لترى كل جوانبها.',
        d3:'الخطوة 3: كرافت أم أبيض؟ طبقة واحدة أم طبقتان؟ شاهد الفرق مباشرة.', d4:'الخطوة 4: أضف الطباعة والتشطيب. عبوتك بعلامتك.',
        d5:'الخطوة 5: هذه عبوتك مفرودة، أي القطعة المسطحة قبل الطي.', d6:'عبوتك جاهزة! انسخ التفاصيل أو أرسلها إلى فريقنا.' },
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

  // ---------- Packy portrait: head + the top of his carton with the HR logo ----------
  const HEX = '<polygon points="138,297 510,85 578,125 205,338 205,605 138,570" fill="#1470ae"/><polygon points="580,202 648,162 880,297 880,727 812,765 812,335" fill="#62a843"/><polygon points="138,648 510,860 745,730 745,805 510,940 138,727" fill="#f8e21a"/>';
  const HRL = '<path d="M248,362 H305 V482 H500 V540 H305 V660 L248,640 Z" fill="#e62e7b"/><path d="M500,362 L680,362 A89,89 0 0 1 680,540 L560,540 L560,660 L500,660 L500,482 L680,482 A31,31 0 0 0 680,420 L518,420 Z" fill="#e62e7b"/><path d="M600,540 L672,540 L770,660 L695,660 Z" fill="#e62e7b"/>';
  let uid = 0;
  function bot(cls) {
    const id = 'hrg' + (++uid);
    const s = document.createElement('span');
    s.className = 'hrg-bot ' + (cls || '');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML =
      '<svg viewBox="0 0 120 120" focusable="false"><defs>' +
      '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf8ef"/><stop offset="1" stop-color="#ddcfb7"/></linearGradient>' +
      '<linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e2b0"/><stop offset=".5" stop-color="#c9994b"/><stop offset="1" stop-color="#a8792f"/></linearGradient>' +
      '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3220"/><stop offset="1" stop-color="#22160c"/></linearGradient>' +
      '<clipPath id="' + id + 'c"><circle cx="60" cy="60" r="60"/></clipPath></defs>' +
      '<g clip-path="url(#' + id + 'c)">' +
      '<rect x="14" y="86" width="92" height="44" rx="7" fill="url(#' + id + 'b)"/>' +
      '<rect x="14" y="94" width="92" height="2.2" fill="url(#' + id + 'g)"/>' +
      '<g transform="translate(60 109) scale(.028) translate(-510 -512)">' + HEX + HRL + '</g>' +
      '<rect x="52" y="78" width="16" height="10" rx="3" fill="#1d2226"/>' +
      '</g>' +
      '<line x1="60" y1="17" x2="60" y2="8" stroke="#cfb07a" stroke-width="2.6" stroke-linecap="round"/>' +
      '<g transform="translate(60 5.5) scale(.017) translate(-510 -512)">' + HEX + '</g>' +
      '<circle cx="21" cy="48" r="7" fill="url(#' + id + 'g)"/><circle cx="99" cy="48" r="7" fill="url(#' + id + 'g)"/>' +
      '<rect x="23" y="16" width="74" height="64" rx="25" fill="url(#' + id + 's)"/>' +
      '<rect x="30" y="25" width="60" height="44" rx="18" fill="#101417"/>' +
      '<g class="hrg-eyes"><rect x="46" y="36" width="9" height="14" rx="4.5" fill="#ffc766"/><rect x="65" y="36" width="9" height="14" rx="4.5" fill="#ffc766"/></g>' +
      '<ellipse cx="39" cy="58" rx="4.5" ry="2.6" fill="#ff8f7a" opacity=".55"/><ellipse cx="81" cy="58" rx="4.5" ry="2.6" fill="#ff8f7a" opacity=".55"/>' +
      '<path d="M54 59 Q60 64 66 59" stroke="#ffc766" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '</svg>';
    return s;
  }
  // ---------- Packy in his box (hero, replaces the decorative 3D box) ----------
  function packyScene() {
    const id = 'hrp' + (++uid);
    const w = document.createElement('span');
    w.className = 'hrg-scene';
    w.setAttribute('aria-hidden', 'true');
    const hex = '<polygon points="138,297 510,85 578,125 205,338 205,605 138,570" fill="#1470ae"/><polygon points="580,202 648,162 880,297 880,727 812,765 812,335" fill="#62a843"/><polygon points="138,648 510,860 745,730 745,805 510,940 138,727" fill="#f8e21a"/>';
    const hr = '<path d="M248,362 H305 V482 H500 V540 H305 V660 L248,640 Z" fill="#e62e7b"/><path d="M500,362 L680,362 A89,89 0 0 1 680,540 L560,540 L560,660 L500,660 L500,482 L680,482 A31,31 0 0 0 680,420 L518,420 Z" fill="#e62e7b"/><path d="M600,540 L672,540 L770,660 L695,660 Z" fill="#e62e7b"/>';
    const fingers = x => [0, 6, 12, 18].map(d => '<rect x="' + (x + d) + '" y="143" width="5" height="12" rx="2.5" fill="#f4ecdf" stroke="#cdbb9c" stroke-width=".6"/>').join('');
    w.innerHTML =
      '<svg viewBox="0 -34 240 280" focusable="false"><defs>' +
      '<linearGradient id="' + id + 'k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8ad78"/><stop offset="1" stop-color="#b3864f"/></linearGradient>' +
      '<linearGradient id="' + id + 'd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c7445"/><stop offset="1" stop-color="#7b5a33"/></linearGradient>' +
      '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf8ef"/><stop offset="1" stop-color="#ddcfb7"/></linearGradient>' +
      '<linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e2b0"/><stop offset=".5" stop-color="#c9994b"/><stop offset="1" stop-color="#a8792f"/></linearGradient>' +
      '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3220"/><stop offset="1" stop-color="#22160c"/></linearGradient>' +
      '</defs>' +
      '<ellipse cx="128" cy="244" rx="104" ry="9" fill="#000" opacity=".45"/>' +
      // back flap + inside of the box
      '<path d="M82 130 L212 130 L200 94 L96 94 Z" fill="url(#' + id + 'd)"/>' +
      '<path d="M40 150 L170 150 L212 130 L82 130 Z" fill="#1c120a"/>' +
      // Packy (moves up when he comes out)
      '<g class="p-packy"><g transform="translate(84 96)">' +
        '<g class="p-arms">' +
          '<path d="M10 94 C-4 104 -8 118 -6 128" stroke="#cfb07a" stroke-width="7" stroke-linecap="round" fill="none"/>' +
          '<circle cx="-6" cy="133" r="7" fill="url(#' + id + 's)"/>' +
          '<g transform="translate(74 94)"><g class="p-wave">' +
            '<path d="M0 0 L22 -30" stroke="#cfb07a" stroke-width="7" stroke-linecap="round"/>' +
            '<circle cx="26" cy="-38" r="8.5" fill="url(#' + id + 's)"/>' +
            '<rect x="18.5" y="-58" width="4.6" height="14" rx="2.3" fill="#f4ecdf" transform="rotate(-14 21 -46)"/>' +
            '<rect x="23.5" y="-61" width="4.6" height="15" rx="2.3" fill="#f4ecdf"/>' +
            '<rect x="28.5" y="-60" width="4.6" height="14" rx="2.3" fill="#f4ecdf" transform="rotate(12 31 -47)"/>' +
            '<rect x="33" y="-55" width="4.4" height="12" rx="2.2" fill="#f4ecdf" transform="rotate(26 35 -44)"/>' +
            '<rect x="12" y="-42" width="4.6" height="11" rx="2.3" fill="#f4ecdf" transform="rotate(-55 15 -37)"/>' +
          '</g></g>' +
        '</g>' +
        '<rect x="34" y="72" width="16" height="12" rx="4" fill="#1d2226"/>' +
        '<rect x="8" y="80" width="68" height="56" rx="5" fill="url(#' + id + 'b)"/>' +
        '<rect x="8" y="94" width="68" height="2" fill="url(#' + id + 'g)"/>' +
        '<g transform="translate(42 114) scale(.03) translate(-510 -512)">' + hex + hr + '</g>' +
        '<g class="p-head">' +
          '<g class="p-ant"><line x1="42" y1="2" x2="42" y2="-12" stroke="#cfb07a" stroke-width="3" stroke-linecap="round"/>' +
          '<g transform="translate(42 -18) scale(.026) translate(-510 -512)">' + hex + '</g></g>' +
          '<circle cx="-3" cy="38" r="9" fill="url(#' + id + 'g)"/><circle cx="87" cy="38" r="9" fill="url(#' + id + 'g)"/>' +
          '<rect x="0" y="0" width="84" height="74" rx="28" fill="url(#' + id + 's)"/>' +
          '<rect x="8" y="10" width="68" height="50" rx="20" fill="#101417"/>' +
          '<g class="p-look"><g class="p-eyes"><rect x="26" y="22" width="10" height="16" rx="5" fill="#ffc766"/><rect x="48" y="22" width="10" height="16" rx="5" fill="#ffc766"/></g>' +
          '<circle cx="33" cy="26" r="2" fill="#fff6de"/><circle cx="55" cy="26" r="2" fill="#fff6de"/></g>' +
          '<ellipse cx="19" cy="46" rx="5" ry="3" fill="#ff8f7a" opacity=".55"/><ellipse cx="65" cy="46" rx="5" ry="3" fill="#ff8f7a" opacity=".55"/>' +
          '<path class="p-mouth" d="M35 47 Q42 53 49 47" stroke="#ffc766" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
          '<path d="M14 7 Q26 2 40 3" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>' +
        '</g>' +
      '</g></g>' +
      // box: front, side, flaps, logo (drawn over Packy)
      '<g class="p-box">' +
        '<path d="M40 150 L82 130 L52 110 L8 132 Z" fill="url(#' + id + 'd)"/>' +
        '<path d="M170 150 L212 130 L234 150 L192 172 Z" fill="#a47a48"/>' +
        '<path d="M170 150 L212 130 L212 218 L170 240 Z" fill="#9a7244"/>' +
        '<rect x="40" y="150" width="130" height="90" fill="url(#' + id + 'k)"/>' +
        '<path d="M40 150 H170" stroke="#e8c897" stroke-width="1.5"/>' +
        '<g transform="translate(105 197) scale(.075) translate(-510 -512)">' + hex + hr + '</g>' +
      '</g>' +
      // fingers holding the front edge while he waits inside
      '<g class="p-grip">' + fingers(74) + fingers(128) + '</g>' +
      '</svg>';
    return w;
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
  let stage = null, bubbleText = null, look = null;
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
    look = $('.p-look', stage);
    document.body.classList.add('hrg-has-hero');
    let heroVisible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; document.body.classList.toggle('hrg-hero-visible', heroVisible); }, { threshold: 0.2 }).observe(heroSection);
    }
    stage.addEventListener('click', () => {
      if (!panel.hidden) { close(); return; }
      stage.classList.add('is-out');
      if (look) look.style.transform = '';
      bubbleText.textContent = t.hi;
      setTimeout(() => open(stage), reduce ? 0 : 750);
    });

    // His eyes follow the visitor: the mouse on desktop, the scroll direction on phones. He stays in his box.
    if (!reduce && look) {
      stage.classList.add('hrg-eyes-live');
      let raf = 0, px = 0, py = 0;
      const aim = () => {
        raf = 0;
        if (!heroVisible || stage.classList.contains('is-out')) return;
        const r = stage.querySelector('svg').getBoundingClientRect();
        const cx = r.left + r.width * 0.525, cy = r.top + r.height * 0.55;
        const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
        look.style.transform = 'translate(' + (dx / d * 5 * k).toFixed(2) + 'px,' + (dy / d * 3.2 * k).toFixed(2) + 'px)';
      };
      if (finePointer) {
        window.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(aim); }, { passive: true });
      } else {
        let lastY = window.scrollY, back = 0;
        window.addEventListener('scroll', () => {
          if (!heroVisible || stage.classList.contains('is-out')) return;
          const dir = Math.sign(window.scrollY - lastY); lastY = window.scrollY;
          if (!dir) return;
          look.style.transform = 'translate(0,' + (dir * 3) + 'px)';
          clearTimeout(back); back = setTimeout(() => { look.style.transform = ''; }, 450);
        }, { passive: true });
      }
    }
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
  // ---------- guided tours (rebuilt 2026-09-29) ----------
  // One controller, one card. Every timer goes through `sched` so Pause, Next and Close cancel everything.
  // The visitor's configuration is never changed except by an explicit "Watch a demonstration",
  // which snapshots it first and restores it unless the visitor interacts in the meantime.
  const PATHS = {
    boxes: ['products', 'industries', 'configurator', 'contact'],
    print: ['printing-section', 'configurator', 'contact'],
    work: ['manufacturing', 'quality', 'technology', 'location'],
    look: ['company', 'products', 'manufacturing', 'industries', 'contact']
  };
  Object.keys(PATHS).forEach(k => { PATHS[k] = PATHS[k].filter(byId); });

  const TT = {
    en: {
      titles: { company:'Who we are', products:'Packaging solutions', industries:'Industries we serve', configurator:'Live box preview', 'printing-section':'Printing and branding', manufacturing:'Manufacturing journey', quality:'Quality points', technology:'Corrugated board', location:'Where we are', contact:'Start your project' },
      tries: { company:'Read how we work, then use “Discuss your requirements” when you are ready.', products:'Open a product card to see what it covers.', industries:'Tap a sector to see the matching packaging application.', configurator:'Change the box model and watch the preview follow, or let me guide you step by step.', 'printing-section':'Keep your logo and artwork files ready to share when you contact us.', manufacturing:'Watch the line: each stage lights up as I pass it.', quality:'Note the points that matter most for your product and mention them in your request.', technology:'Watch the layers come together in the animation.', location:'Open the map for directions to Béni Tamou.', contact:'Email or call our team. Your email app opens with a ready subject.' },
      design: {
        d1:['Box model','Choose the model closest to your product. The 3D preview switches to that shape.','Open the list and pick your model.'],
        d2:['Size','Enter length, width and height in millimetres, or pick an example size. The preview follows your numbers.','Type your length in millimetres.'],
        d3:['Board and flute','Choose natural kraft or a white surface, and a flute profile. Flute profiles must be confirmed with HR Géant Emballage.','Switch between kraft and white and compare.'],
        d4:['Printing and finish','Add printing and choose a finish. The preview shows where the print goes; artwork is agreed with our team.','Pick a printing option.'],
        d5:['Flat blank','Flat blank shows your box unfolded, as the cut sheet before folding.','Tap “Flat blank”, then “3D box” to come back.'],
        d6:['Your box details','Your choices are summarised as a specification you can copy or email to our sales team.','Tap “Show my box details”.']
      },
      ui: { more:'More details', less:'Less', options:'More options', play:'Play automatically', pause:'Pause', repeatOn:'Repeat all: on', repeatOff:'Repeat all: off', reset:'Reset position', showMe:'Show me: {x}', seeResult:'See result', back:'Back to option', demo:'Watch a demonstration', demoNote:'Your choices are saved first and come back after.', stopDemo:'Stop demonstration', move:'Move Packy. Drag, or use the arrow keys.', of:'{n} of {t}', next:'Next', prev:'Previous step', close:'Close the tour', finish:'Finish', design:'Design your box', showSpec:'Show my box details', now:'Now: {x}' }
    },
    fr: {
      titles: { company:'Qui nous sommes', products:'Solutions d’emballage', industries:'Secteurs servis', configurator:'Aperçu 3D en direct', 'printing-section':'Impression et marque', manufacturing:'Parcours de fabrication', quality:'Points qualité', technology:'Le carton ondulé', location:'Où nous trouver', contact:'Lancer votre projet' },
      tries: { company:'Découvrez notre approche, puis utilisez « Discuter de vos besoins » quand vous êtes prêt.', products:'Ouvrez une fiche produit pour voir ce qu’elle couvre.', industries:'Touchez un secteur pour voir l’application d’emballage correspondante.', configurator:'Changez le modèle et regardez l’aperçu suivre, ou laissez-moi vous guider étape par étape.', 'printing-section':'Préparez votre logo et vos fichiers à partager lorsque vous nous contactez.', manufacturing:'Regardez la ligne : chaque étape s’allume à mon passage.', quality:'Notez les points importants pour votre produit et mentionnez-les dans votre demande.', technology:'Regardez les couches s’assembler dans l’animation.', location:'Ouvrez la carte pour l’itinéraire vers Béni Tamou.', contact:'Écrivez ou appelez notre équipe. Votre messagerie s’ouvre avec un objet prêt.' },
      design: {
        d1:['Modèle de caisse','Choisissez le modèle le plus proche de votre produit. L’aperçu 3D prend cette forme.','Ouvrez la liste et choisissez votre modèle.'],
        d2:['Dimensions','Saisissez longueur, largeur et hauteur en millimètres, ou choisissez un format exemple. L’aperçu suit vos valeurs.','Saisissez votre longueur en millimètres.'],
        d3:['Carton et cannelure','Choisissez kraft naturel ou surface blanche, et un profil de cannelure. Les profils de cannelure doivent être confirmés avec HR Géant Emballage.','Passez du kraft au blanc et comparez.'],
        d4:['Impression et finition','Ajoutez une impression et une finition. L’aperçu montre l’emplacement de l’impression ; la maquette est validée avec notre équipe.','Choisissez une option d’impression.'],
        d5:['Mise à plat','La mise à plat montre votre caisse dépliée, comme le flan découpé avant pliage.','Touchez « Mise à plat », puis « Boîte 3D » pour revenir.'],
        d6:['Détails de votre caisse','Vos choix sont résumés dans une fiche que vous pouvez copier ou envoyer par e-mail à notre service commercial.','Touchez « Afficher les détails de ma caisse ».']
      },
      ui: { more:'Plus de détails', less:'Moins', options:'Plus d’options', play:'Lecture automatique', pause:'Pause', repeatOn:'Tout répéter : activé', repeatOff:'Tout répéter : désactivé', reset:'Réinitialiser la position', showMe:'Montre-moi : {x}', seeResult:'Voir le résultat', back:'Retour à l’option', demo:'Voir une démonstration', demoNote:'Vos choix sont enregistrés avant et rétablis après.', stopDemo:'Arrêter la démonstration', move:'Déplacer Packy. Glissez, ou utilisez les flèches du clavier.', of:'{n} sur {t}', next:'Suivant', prev:'Étape précédente', close:'Fermer la visite', finish:'Terminer', design:'Concevez votre caisse', showSpec:'Afficher les détails de ma caisse', now:'En ce moment : {x}' }
    },
    ar: {
      titles: { company:'من نحن', products:'حلول التغليف', industries:'القطاعات التي نخدمها', configurator:'معاينة العبوة المباشرة', 'printing-section':'الطباعة والعلامة', manufacturing:'رحلة التصنيع', quality:'جوانب الجودة', technology:'الكرتون المموج', location:'أين نحن', contact:'ابدأ مشروعك' },
      tries: { company:'اقرأ عن طريقة عملنا، ثم استخدم زر مناقشة احتياجاتك عندما تكون جاهزاً.', products:'افتح بطاقة منتج لترى ما تشمله.', industries:'اضغط على قطاع لترى تطبيق التغليف المناسب له.', configurator:'غيّر نموذج العبوة وشاهد المعاينة تتبعك، أو دعني أرشدك خطوة بخطوة.', 'printing-section':'جهّز شعارك وملفات التصميم لمشاركتها عند التواصل معنا.', manufacturing:'شاهد الخط: كل مرحلة تضيء عندما أمر بها.', quality:'دوّن الجوانب الأهم لمنتجك واذكرها في طلبك.', technology:'شاهد الطبقات تتجمع في الرسم المتحرك.', location:'افتح الخريطة للحصول على الاتجاهات إلى بني تامو.', contact:'راسل فريقنا أو اتصل به. يفتح تطبيق البريد مع عنوان جاهز.' },
      design: {
        d1:['نموذج العبوة','اختر النموذج الأقرب إلى منتجك، وستتخذ المعاينة ثلاثية الأبعاد هذا الشكل.','افتح القائمة واختر نموذجك.'],
        d2:['المقاسات','أدخل الطول والعرض والارتفاع بالمليمتر أو اختر مقاساً مثالياً، وستتبع المعاينة أرقامك.','اكتب الطول بالمليمتر.'],
        d3:['الكرتون والتموج','اختر كرافت طبيعياً أو سطحاً أبيض ونوع التموج. يجب تأكيد نوع التموج مع HR Géant Emballage.','بدّل بين الكرافت والأبيض وقارن.'],
        d4:['الطباعة والتشطيب','أضف طباعة واختر تشطيباً. تُظهر المعاينة موضع الطباعة، ويُتفق على التصميم مع فريقنا.','اختر خيار طباعة.'],
        d5:['القطعة المسطحة','تُظهر القطعة المسطحة عبوتك مفرودة كما تُقص قبل الطي.','اضغط على زر العرض المسطح، ثم على زر العرض ثلاثي الأبعاد للعودة.'],
        d6:['تفاصيل عبوتك','تُلخَّص اختياراتك في مواصفات يمكنك نسخها أو إرسالها بالبريد إلى فريق المبيعات.','اضغط على «اعرض تفاصيل عبوتي».']
      },
      ui: { more:'المزيد من التفاصيل', less:'أقل', options:'خيارات إضافية', play:'تشغيل تلقائي', pause:'إيقاف مؤقت', repeatOn:'تكرار الكل: مفعّل', repeatOff:'تكرار الكل: متوقف', reset:'إعادة ضبط الموضع', showMe:'أرني: {x}', seeResult:'عرض النتيجة', back:'العودة إلى الخيار', demo:'شاهد عرضاً توضيحياً', demoNote:'تُحفظ اختياراتك أولاً ثم تُعاد بعد العرض.', stopDemo:'إيقاف العرض', move:'تحريك باكي: اسحب أو استخدم مفاتيح الأسهم.', of:'{n} من {t}', next:'التالي', prev:'الخطوة السابقة', close:'إغلاق الجولة', finish:'إنهاء', design:'صمّم عبوتك', showSpec:'اعرض تفاصيل عبوتي', now:'الآن: {x}' }
    }
  };
  const tt = TT[lang] || TT.en;
  const fmt = (s, o) => s.replace(/\{(\w)\}/g, (_, k) => (o[k] != null ? o[k] : ''));

  // ---------- targets ----------
  const STOPS = {
    company: s => $('h2', s) || s,
    products: s => { const c = $('#product-grid .product-card', s); return (c && mobileNow() && $('.product-content', c)) || c || s; },
    industries: s => $('#industry-list', s) || s,
    configurator: s => $('.config-preview', s) || s,
    'printing-section': s => $('.printing-image', s) || $('.section-heading', s) || s,
    manufacturing: s => $('.mfg-content', s) || $('h2', s) || s,
    quality: s => $('.quality-list', s) || s,
    technology: s => $('.board-diagram', s) || s,
    location: s => $('.map-panel', s) || s,
    contact: s => (mobileNow() ? $('h2', s) : $('.section-heading', s)) || s
  };
  const DESIGN = [
    { key:'d1', anchor: () => byId('box-style'), after: () => byId('box-style'), demo: 'models' },
    { key:'d2', anchor: () => $('.dimension-fields'), after: () => $('.dimension-fields'), demo: 'turn' },
    { key:'d3', anchor: () => byId('board'), after: () => byId('flute'), demo: 'board' },
    { key:'d4', anchor: () => byId('printing'), after: () => byId('finishing') || byId('printing'), demo: 'print' },
    { key:'d5', anchor: () => $('.config-views'), float: true, demo: 'flat' },
    { key:'d6', anchor: () => byId('config-cta'), after: () => byId('config-cta') }
  ];
  const mobileNow = () => window.innerWidth <= 700;
  const headerH = () => (header ? header.getBoundingClientRect().height : 0);

  // ---------- the card: mascot, explanation and controls in one unit ----------
  const card = el('section', 'hrg-card'); card.hidden = true;
  card.setAttribute('role', 'region'); card.setAttribute('aria-label', t.name);
  if (rtl) card.dir = 'rtl';
  const cHead = el('div', 'hrg-card-head');
  const grip = el('button', 'hrg-grip'); grip.type = 'button'; grip.setAttribute('aria-label', tt.ui.move);
  grip.innerHTML = '<svg width="14" height="20" viewBox="0 0 14 20" aria-hidden="true"><g fill="currentColor"><circle cx="4" cy="4" r="1.6"/><circle cx="10" cy="4" r="1.6"/><circle cx="4" cy="10" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="4" cy="16" r="1.6"/><circle cx="10" cy="16" r="1.6"/></g></svg>';
  const cAvatar = bot('hrg-card-bot');
  const cWho = el('div', 'hrg-card-who');
  const cMeta = el('span', 'hrg-card-meta');
  const cTitle = el('strong', 'hrg-card-title');
  cWho.append(cMeta, cTitle);
  const cClose = el('button', 'hrg-card-x', '×'); cClose.type = 'button'; cClose.setAttribute('aria-label', tt.ui.close);
  cHead.append(grip, cAvatar, cWho, cClose);
  const cBody = el('div', 'hrg-card-body');
  const cText = el('p', 'hrg-card-text');
  const cTry = el('p', 'hrg-card-try');
  const cNow = el('p', 'hrg-card-now'); cNow.hidden = true;
  const cActions = el('div', 'hrg-card-actions');
  const cDetails = el('div', 'hrg-card-details'); cDetails.hidden = true; cDetails.id = 'hrg-card-details';
  cBody.append(cText, cTry, cNow, cActions, cDetails);
  const cFoot = el('div', 'hrg-card-foot');
  const bMore = el('button', 'hrg-link-btn', tt.ui.more); bMore.type = 'button'; bMore.setAttribute('aria-expanded', 'false'); bMore.setAttribute('aria-controls', 'hrg-card-details');
  const cNav = el('div', 'hrg-card-nav');
  const bPrev = el('button', 'hrg-round'); bPrev.type = 'button'; bPrev.setAttribute('aria-label', tt.ui.prev);
  bPrev.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="' + (rtl ? 'M6 3l5 5-5 5' : 'M10 3L5 8l5 5') + '" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
  const bMenu = el('button', 'hrg-round'); bMenu.type = 'button'; bMenu.setAttribute('aria-label', tt.ui.options); bMenu.setAttribute('aria-expanded', 'false'); bMenu.setAttribute('aria-haspopup', 'true');
  bMenu.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><g fill="currentColor"><circle cx="4" cy="9" r="1.6"/><circle cx="9" cy="9" r="1.6"/><circle cx="14" cy="9" r="1.6"/></g></svg>';
  const bNext = el('button', 'hrg-next', tt.ui.next); bNext.type = 'button';
  cNav.append(bPrev, bMenu, bNext);
  const menu = el('div', 'hrg-menu'); menu.hidden = true;
  const mPlay = el('button', 'hrg-menu-item', tt.ui.play); mPlay.type = 'button';
  const mRepeat = el('button', 'hrg-menu-item', tt.ui.repeatOff); mRepeat.type = 'button'; mRepeat.setAttribute('aria-pressed', 'false');
  const mReset = el('button', 'hrg-menu-item', tt.ui.reset); mReset.type = 'button';
  menu.append(mPlay, mRepeat, mReset);
  cFoot.append(bMore, cNav, menu);
  card.append(cHead, cBody, cFoot);
  const showMe = el('button', 'hrg-showme'); showMe.type = 'button'; showMe.hidden = true;
  document.body.append(card, showMe);

  // ---------- controller state ----------
  let steps = [], idx = -1, playing = false, looping = false, lastTour = null, tourKind = null;
  let target = null, timers = new Set(), demo = null, detailsOpen = false, hover = false, lastTyping = 0;
  let userPos = null; try { userPos = JSON.parse(sessionStorage.getItem('hrg-card-pos') || 'null'); } catch (e) { userPos = null; }
  let autoScrolling = false, autoTimer = 0, followRaf = 0, inlineHost = null;
  function sched(ms, fn) { const id = setTimeout(() => { timers.delete(id); fn(); }, reduce ? Math.min(ms, 40) : ms); timers.add(id); return id; }
  function cancelAll() { timers.forEach(clearTimeout); timers.clear(); }

  // ---------- configuration snapshot (demonstrations only) ----------
  const form = byId('config-form');
  const views = () => $$('.config-views button');
  function snapshot() {
    const vals = {};
    if (form) $$('select, input', form).forEach(e => { if (e.id) vals[e.id] = e.value; });
    return { vals, view: views().findIndex(b => b.getAttribute('aria-pressed') === 'true') };
  }
  function setField(e, v) {
    if (!e || e.value === v) return;
    e.value = v;
    e.dispatchEvent(new Event('input', { bubbles: true }));
    e.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function restore(s) {
    if (!s) return;
    // model first (it resets size options), then size, then everything else
    const order = ['box-style', 'box-size'];
    order.forEach(id => setField(byId(id), s.vals[id]));
    Object.keys(s.vals).forEach(id => { if (!order.includes(id)) setField(byId(id), s.vals[id]); });
    const v = views(); if (s.view >= 0 && v[s.view] && v[s.view].getAttribute('aria-pressed') !== 'true') v[s.view].click();
  }
  function endDemo(keepVisitorChoices) {
    if (!demo) return;
    const d = demo; demo = null;
    d.timers.forEach(clearTimeout);
    if (!keepVisitorChoices) restore(d.snap);
    const st = $('.box-stage'); if (st) st.classList.remove('hrg-glide');
    renderActions();
  }
  // any real change by the visitor stops a demonstration and keeps their latest choice
  ['input', 'change', 'pointerdown'].forEach(type => document.addEventListener(type, e => {
    if (!e.isTrusted) return;
    if (type !== 'pointerdown') lastTyping = Date.now();
    if (demo && e.target.closest && e.target.closest('#config-form, .config-preview-col')) endDemo(true);
  }, true));
  function runDemo(kind) {
    endDemo(false);
    const d = demo = { snap: snapshot(), timers: [] };
    const at = (ms, fn) => d.timers.push(setTimeout(() => { if (demo === d) fn(); }, reduce ? Math.min(ms, 40) : ms));
    const stage = $('.box-stage');
    if (stage && !reduce) stage.classList.add('hrg-glide');
    let end = 0;
    if (kind === 'models') { ['dates', 'cosmetics', 'produce'].forEach((v, i) => at(400 + i * 3200, () => setField(byId('box-style'), v))); end = 400 + 3 * 3200; }
    if (kind === 'board') { at(400, () => setField(byId('board'), 'white')); at(3200, () => setField(byId('flute'), 'double')); end = 6200; }
    if (kind === 'print') { at(400, () => setField(byId('printing'), 'mark')); at(3400, () => setField(byId('printing'), 'graphic')); end = 6400; }
    if (kind === 'flat') { at(400, () => { const v = views(); if (v[1]) v[1].click(); }); end = 4600; }
    if (kind === 'turn' && stage) { for (let i = 0; i < 36; i++) at(400 + i * 190, () => stage.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))); end = 400 + 36 * 190 + 900; }
    at(end, () => endDemo(false));
    renderActions();
  }

  // ---------- rendering one step ----------
  function stepInfo(st) {
    if (st.design) { const c = tt.design[st.design.key]; return { title: c[0], text: c[1], tryIt: c[2] }; }
    return { title: tt.titles[st.id] || '', text: (t.lines && t.lines[st.id]) || '', tryIt: tt.tries[st.id] || '' };
  }
  function renderActions() {
    cActions.replaceChildren();
    const st = steps[idx]; if (!st) return;
    const add = (label, cls, fn) => { const b = el('button', 'hrg-action ' + (cls || ''), label); b.type = 'button'; b.addEventListener('click', fn); cActions.appendChild(b); return b; };
    if (st.id === 'configurator') add(tt.ui.design, 'is-primary', () => startDesign());
    if (st.design) {
      const dd = st.design;
      if (dd.key === 'd6') {
        add(tt.ui.showSpec, 'is-primary', () => {
          const cta = byId('config-cta'); if (cta) cta.click();
          sched(350, () => { const box = $('.config-export'); if (box && !box.hidden) { setTarget(box); bringIntoView(box); } renderSpecActions(); });
        });
      }
      if (mobileNow() && dd.key !== 'd5' && dd.key !== 'd6') {
        const seeing = card.dataset.seeing === '1';
        add(seeing ? tt.ui.back : tt.ui.seeResult, '', () => {
          const p = $('.config-preview');
          if (card.dataset.seeing === '1') { card.dataset.seeing = ''; bringIntoView(dd.anchor()); }
          else { card.dataset.seeing = '1'; if (p) bringIntoView(p); }
          renderActions();
        });
      }
    }
    // demonstrations are optional and live in the details
    cDetails.replaceChildren();
    const info = steps[idx] ? stepInfo(steps[idx]) : null;
    const extra = st.id ? stopContent(byId(st.id)) : null;
    if (extra && extra.textEl) cDetails.appendChild(el('p', '', clean(extra.textEl.textContent)));
    if (st.design && st.design.demo) {
      if (demo) { const b = el('button', 'hrg-action', tt.ui.stopDemo); b.type = 'button'; b.addEventListener('click', () => endDemo(false)); cDetails.appendChild(b); }
      else { const b = el('button', 'hrg-action', tt.ui.demo); b.type = 'button'; b.addEventListener('click', () => runDemo(st.design.demo)); cDetails.appendChild(b); }
      cDetails.appendChild(el('small', 'hrg-card-note', tt.ui.demoNote));
    }
    bMore.hidden = !cDetails.childNodes.length;
    if (bMore.hidden) setDetails(false);
    void info;
  }
  function renderSpecActions() {
    const add = (label, cls, fn) => { const b = el('button', 'hrg-action ' + (cls || ''), label); b.type = 'button'; b.addEventListener('click', fn); cActions.appendChild(b); return b; };
    cActions.replaceChildren();
    add(t.sendDesign, 'is-primary', sendDesign);
    const copy = add(t.copyDetails, '', () => { const b = $('.config-export button'); if (b) { b.click(); copy.textContent = t.copied; } });
    cActions.appendChild(el('small', 'hrg-card-note', t.sendNote));
  }
  function sendDesign() {
    const cta = byId('config-cta'); if (cta) cta.click();
    const box = $('.config-export textarea'); const spec = box ? box.value : '';
    if (!spec) { const err = $('.config-error'); if (err) bringIntoView(err); return; }
    const model = byId('box-style');
    const subject = t.subject + (model ? ' · ' + clean(model.selectedOptions[0].textContent) : '');
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(spec + '\n\n');
  }
  function setDetails(open) {
    detailsOpen = !!open;
    cDetails.hidden = !detailsOpen;
    bMore.textContent = detailsOpen ? tt.ui.less : tt.ui.more;
    bMore.setAttribute('aria-expanded', detailsOpen ? 'true' : 'false');
    card.classList.toggle('is-expanded', detailsOpen);
    reschedule();
  }

  // ---------- where things are, and where the card goes ----------
  function freeArea() {
    let top = headerH() + 12, bottom = window.innerHeight - 12;
    const vv = window.visualViewport; if (vv) bottom = Math.min(bottom, vv.offsetTop + vv.height - 12);
    if (mobileNow() && !card.hidden && !card.classList.contains('is-inline')) bottom -= card.getBoundingClientRect().height + 8;
    if (document.body.classList.contains('hrg-guided-design') && window.innerWidth <= 850) {
      const col = $('.config-preview-col');
      if (col && card.dataset.seeing !== '1') top = Math.max(top, headerH() + 6 + col.getBoundingClientRect().height + 10);
    }
    return { top, bottom };
  }
  function scrollRoom() { const a = freeArea(); return a.bottom - a.top; }
  function unionRect(list) {
    const rs = list.filter(Boolean).map(e => e.getBoundingClientRect());
    return { top: Math.min(...rs.map(r => r.top)), bottom: Math.max(...rs.map(r => r.bottom)), get height() { return this.bottom - this.top; } };
  }
  function bringIntoView(el2, then, withEl) {
    if (!el2) { if (then) then(); return; }
    const a = freeArea(), r = withEl ? unionRect([el2, withEl]) : el2.getBoundingClientRect();
    let y = null;
    if (r.top < a.top || r.bottom > a.bottom) {
      const room = a.bottom - a.top;
      // wide targets go to the top of the free area, leaving the lower corner free for the card
      const wide = !mobileNow() && (el2.getBoundingClientRect().width > window.innerWidth * 0.6);
      y = (r.height <= room && !wide) ? r.top + window.scrollY - a.top - (room - r.height) / 2 : r.top + window.scrollY - a.top;
    }
    if (y === null) { placeCard(); if (then) then(); return; }
    autoScrolling = true; clearTimeout(autoTimer);
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
    // wait until movement settles (scrollend, or the position stops changing)
    let last = -1, still = 0, done = false;
    const finish = () => { if (done) return; done = true; autoTimer = setTimeout(() => { autoScrolling = false; }, 120); placeCard(); if (then) then(); };
    if ('onscrollend' in window) window.addEventListener('scrollend', finish, { once: true });
    const check = () => { if (done) return; const s = window.scrollY; still = s === last ? still + 1 : 0; last = s; if (still > 4) finish(); else requestAnimationFrame(check); };
    requestAnimationFrame(check);
    sched(1500, finish);
  }
  // for text blocks, use where the text actually is (a full-width heading block leaves room beside its words)
  function targetRect(elx) {
    if (elx && elx.matches && elx.matches('h2, .section-heading, .mfg-content') && document.createRange) {
      const rg = document.createRange(); rg.selectNodeContents(elx);
      const r = rg.getBoundingClientRect(); if (r.width && r.height) return r;
    }
    return elx.getBoundingClientRect();
  }
  function setCardXY(x, y) { card.style.setProperty('--hrg-x', Math.round(x) + 'px'); card.style.setProperty('--hrg-y', Math.round(y) + 'px'); }
  function overlap(a, b) { return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom; }
  function placeCard() {
    if (card.hidden) return;
    document.body.style.setProperty('--hrg-header-h', Math.round(headerH()) + 'px');
    if (mobileNow() || card.classList.contains('is-inline')) { checkFollow(); return; }
    const W = window.innerWidth, H = window.innerHeight, m = 14, top = headerH() + m;
    const cw = card.offsetWidth, ch = card.offsetHeight;
    const r = target ? targetRect(target) : null;
    const rect = (x, y) => ({ left: x, top: y, right: x + cw, bottom: y + ch });
    const fits = (x, y) => x >= m && y >= top && x + cw <= W - m && y + ch <= H - m && !(r && overlap(rect(x, y), r));
    if (userPos) {
      const x = Math.min(Math.max(m, userPos.x), W - cw - m), y = Math.min(Math.max(top, userPos.y), H - ch - m);
      if (!r || !overlap(rect(x, y), r)) { setCardXY(x, y); card.dataset.docked = ''; checkFollow(); return; }
    }
    let chosen = null;
    if (r && r.bottom > top && r.top < H) {
      const clampY = y => Math.min(Math.max(top, y), H - ch - m), clampX = x => Math.min(Math.max(m, x), W - cw - m);
      const opts = { right: [r.right + m, clampY(r.top)], left: [r.left - cw - m, clampY(r.top)], below: [clampX(r.left), r.bottom + m], above: [clampX(r.left), r.top - ch - m] };
      const order = rtl ? ['left', 'right', 'below', 'above'] : ['right', 'left', 'below', 'above'];
      // prefer the side with the most room
      order.sort((p, q) => {
        const room = s => (s === 'right' ? W - r.right : s === 'left' ? r.left : s === 'below' ? H - r.bottom : r.top - top);
        return (room(q) >= cw ? 1 : 0) - (room(p) >= cw ? 1 : 0);
      });
      for (const s of order) { const [x, y] = opts[s]; if (fits(x, y)) { chosen = [x, y]; break; } }
    }
    if (!chosen) { // docked: a corner that does not cover the target
      const x = rtl ? m : W - cw - m;
      chosen = [x, H - ch - m];
      if (r && overlap(rect(chosen[0], chosen[1]), r)) chosen = [x, top];
      card.dataset.docked = '1';
    } else card.dataset.docked = '';
    setCardXY(chosen[0], chosen[1]);
    checkFollow();
  }
  // "Show me": appears when the visitor has scrolled the target away themselves
  function checkFollow() {
    if (card.hidden || !target) { showMe.hidden = true; return; }
    const a = freeArea(), r = target.getBoundingClientRect();
    const visible = r.bottom > a.top + 24 && r.top < a.bottom - 24;
    showMe.hidden = visible || autoScrolling;
  }
  window.addEventListener('scroll', () => {
    if (card.hidden || followRaf) return;
    followRaf = requestAnimationFrame(() => { followRaf = 0; card.classList.add('no-anim'); placeCard(); clearTimeout(card._na); card._na = setTimeout(() => card.classList.remove('no-anim'), 160); });
  }, { passive: true });
  ['wheel', 'touchstart', 'keydown'].forEach(type => window.addEventListener(type, e => { if (autoScrolling && e.isTrusted && !(type === 'keydown' && !/Page|Arrow|Home|End|Space/.test(e.key))) autoScrolling = false; }, { passive: true }));
  showMe.addEventListener('click', () => { showMe.hidden = true; bringIntoView(target); });
  const relayout = () => { if (!card.hidden) { card.classList.toggle('is-sheet', mobileNow() && !card.classList.contains('is-inline')); keyboardMode(); placeCard(); } };
  window.addEventListener('resize', relayout, { passive: true });
  window.addEventListener('orientationchange', relayout);
  if ('ResizeObserver' in window) new ResizeObserver(() => { if (!card.hidden) placeCard(); }).observe(card);

  // mobile keyboard: keep the input visible and collapse the guide to one line
  function keyboardMode() {
    const vv = window.visualViewport; if (!vv) return;
    const kb = mobileNow() && vv.height < window.innerHeight - 140 && /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '');
    document.body.classList.toggle('hrg-kb', kb);
    card.style.setProperty('--hrg-kb', kb ? Math.max(0, window.innerHeight - (vv.offsetTop + vv.height)) + 'px' : '0px');
    if (kb) { const a = document.activeElement; setTimeout(() => { const r = a.getBoundingClientRect(), f = freeArea(); if (r.top < f.top || r.bottom > f.bottom) window.scrollBy({ top: r.top - f.top - 12, behavior: 'auto' }); }, 60); }
  }
  if (window.visualViewport) window.visualViewport.addEventListener('resize', () => { if (!card.hidden) { keyboardMode(); placeCard(); } });

  // ---------- drag (grip only), keyboard nudge, reset ----------
  let drag = null;
  grip.addEventListener('pointerdown', e => {
    if (mobileNow() || card.classList.contains('is-inline') || e.button !== 0) return;
    const r = card.getBoundingClientRect();
    drag = { id: e.pointerId, dx: e.clientX - r.left, dy: e.clientY - r.top, moved: false };
    grip.setPointerCapture(e.pointerId); card.classList.add('is-dragging');
  });
  grip.addEventListener('pointermove', e => {
    if (!drag || drag.id !== e.pointerId) return;
    drag.moved = true;
    userPos = { x: e.clientX - drag.dx, y: e.clientY - drag.dy };
    const m = 14, cw = card.offsetWidth, ch = card.offsetHeight;
    userPos.x = Math.min(Math.max(m, userPos.x), window.innerWidth - cw - m);
    userPos.y = Math.min(Math.max(headerH() + m, userPos.y), window.innerHeight - ch - m);
    setCardXY(userPos.x, userPos.y);
  });
  const endDrag = e => { if (!drag || drag.id !== e.pointerId) return; const moved = drag.moved; drag = null; card.classList.remove('is-dragging'); if (moved) { try { sessionStorage.setItem('hrg-card-pos', JSON.stringify(userPos)); } catch (x) {} } };
  grip.addEventListener('pointerup', endDrag); grip.addEventListener('pointercancel', endDrag);
  grip.addEventListener('keydown', e => {
    if (mobileNow() || card.classList.contains('is-inline')) return;
    const d = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] }[e.key];
    if (!d) return;
    e.preventDefault(); e.stopPropagation();
    const r = card.getBoundingClientRect();
    userPos = { x: r.left + d[0], y: r.top + d[1] };
    try { sessionStorage.setItem('hrg-card-pos', JSON.stringify(userPos)); } catch (x) {}
    placeCard();
  });
  function resetPosition() { userPos = null; try { sessionStorage.removeItem('hrg-card-pos'); } catch (x) {} placeCard(); }

  // ---------- highlight, inline placement for the configurator ----------
  function setTarget(elx) {
    if (target) target.classList.remove('hrg-target', 'hrg-ping');
    target = elx || null;
    if (target) { target.classList.add('hrg-target'); if (!reduce) { void target.offsetWidth; target.classList.add('hrg-ping'); } }
  }
  function mountCard(inlineAfter) {
    const wantInline = !!inlineAfter && !mobileNow();
    if (wantInline) {
      if (card.parentNode !== inlineAfter.parentNode || card.previousElementSibling !== inlineAfter) inlineAfter.after(card);
      card.classList.add('is-inline'); card.classList.remove('is-sheet');
      if (!reduce && card.animate) card.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
    } else {
      if (card.parentNode !== document.body) document.body.appendChild(card);
      card.classList.remove('is-inline');
      card.classList.toggle('is-sheet', mobileNow());
    }
  }

  // ---------- autoplay: reading time, held while the visitor reads or works ----------
  let playTimer = 0;
  function readingMs() {
    const st = steps[idx]; if (!st) return 7000;
    const i = stepInfo(st); const words = (i.text + ' ' + i.tryIt).split(/\s+/).length;
    return Math.max(7000, words * 330 + 2600) + (st.id === 'manufacturing' ? 9000 : 0);
  }
  function held() { return detailsOpen || hover || !!demo || Date.now() - lastTyping < 5000 || !menu.hidden; }
  function reschedule() {
    clearTimeout(playTimer); playTimer = 0;
    if (!playing || idx < 0) return;
    playTimer = setTimeout(function tick() {
      if (!playing) return;
      if (held()) { playTimer = setTimeout(tick, 1500); return; }
      go(idx + 1, true);
    }, readingMs());
  }
  function setPlay(on) {
    playing = !!on;
    mPlay.textContent = playing ? tt.ui.pause : tt.ui.play;
    card.classList.toggle('is-playing', playing);
    if (!playing) { cancelAll(); endDemo(false); if (window.HRManufacturing) window.HRManufacturing.ride(-1); }
    reschedule();
  }
  function setLoop(on) {
    looping = !!on;
    mRepeat.textContent = looping ? tt.ui.repeatOn : tt.ui.repeatOff;
    mRepeat.setAttribute('aria-pressed', looping ? 'true' : 'false');
  }
  card.addEventListener('pointerenter', () => { hover = true; });
  card.addEventListener('pointerleave', () => { hover = false; });

  // ---------- the state machine ----------
  function go(i, auto) {
    if (i < 0) return;
    if (i >= steps.length) { if (looping) i = 0; else { endTour(true); return; } }
    cancelAll(); endDemo(false); clearTimeout(playTimer);
    if (window.HRManufacturing) window.HRManufacturing.ride(-1);
    idx = i;
    const st = steps[i], info = stepInfo(st);
    card.dataset.state = 'positioning'; card.dataset.seeing = '';
    card.hidden = false; showMe.hidden = true;
    document.body.classList.add('hrg-touring-mode');
    document.body.classList.toggle('hrg-guided-design', !!st.design);
    setDetails(false); menu.hidden = true; bMenu.setAttribute('aria-expanded', 'false');
    cMeta.textContent = fmt(tt.ui.of, { n: i + 1, t: steps.length });
    cTitle.textContent = info.title;
    showMe.textContent = fmt(tt.ui.showMe, { x: info.title });
    cText.textContent = info.text;
    cTry.textContent = info.tryIt;
    cNow.hidden = true;
    const last = i === steps.length - 1 && !looping;
    bNext.textContent = last ? tt.ui.finish : (mobileNow() ? tt.ui.next : tt.ui.next + ' ›');
    bPrev.disabled = i === 0;
    renderActions();
    let tgt, after = null;
    if (st.design) { tgt = st.design.anchor(); after = st.design.float ? null : (st.design.after ? st.design.after() : null); }
    else { const s = byId(st.id); tgt = (STOPS[st.id] || (x => x))(s); }
    mountCard(after);
    setTarget(null);
    announce(info.title + '. ' + info.text + ' ' + info.tryIt);
    const settle = () => {
      card.dataset.state = 'explaining';
      setTarget(tgt);
      placeCard();
      if (!reduce) { cAvatar.classList.remove('is-waving'); void cAvatar.offsetWidth; cAvatar.classList.add('is-waving'); }
      if (st.id === 'manufacturing') {
        const s = byId('manufacturing');
        const stages = $$('.mfg-steps li', s).map(li => clean(Array.from(li.children).map(c => c.textContent).join(' ') || li.textContent));
        const per = 1300;
        if (window.HRManufacturing) window.HRManufacturing.ride(reduce ? 0 : per * Math.max(1, stages.length));
        stages.forEach((name, k) => sched(k * per, () => { cNow.hidden = false; cNow.textContent = fmt(tt.ui.now, { x: name }); }));
      }
    };
    bringIntoView(tgt, settle, card.classList.contains('is-inline') ? card : null);
    reschedule();
    if (!auto && document.activeElement && card.contains(document.activeElement) === false && idx === 0) bNext.focus({ preventScroll: true });
  }
  function begin(list, kind, auto) {
    close(false);
    steps = list; tourKind = kind; lastTour = { kind };
    setLoop(false);
    go(0);
    setPlay(!!auto);
    bNext.focus({ preventScroll: true });
  }
  function startTour(key, auto = false) { begin(PATHS[key].map(id => ({ id })), key, auto); }
  function startDesign(auto = false) { begin(DESIGN.map(d => ({ design: d })), 'design', auto); }
  function repeatAll() { if (!lastTour) return; if (lastTour.kind === 'design') startDesign(true); else startTour(lastTour.kind, true); setLoop(true); }
  function endTour(finished) {
    cancelAll(); endDemo(false); clearTimeout(playTimer);
    playing = false; setLoop(false);
    if (window.HRManufacturing) window.HRManufacturing.ride(-1);
    setTarget(null); idx = -1;
    card.hidden = true; showMe.hidden = true; menu.hidden = true;
    if (card.parentNode !== document.body) document.body.appendChild(card);
    card.classList.remove('is-inline');
    document.body.classList.remove('hrg-touring-mode', 'hrg-guided-design', 'hrg-kb');
    if (finished) open(null, 'end');
    else {
      const heroShown = stage && document.body.classList.contains('hrg-hero-visible');
      (heroShown ? stage : launch).focus({ preventScroll: true });
    }
  }

  // ---------- controls ----------
  bNext.addEventListener('click', () => go(idx + 1));
  bPrev.addEventListener('click', () => go(idx - 1));
  cClose.addEventListener('click', () => endTour(false));
  bMore.addEventListener('click', () => setDetails(!detailsOpen));
  bMenu.addEventListener('click', () => { const open2 = menu.hidden; menu.hidden = !open2; bMenu.setAttribute('aria-expanded', open2 ? 'true' : 'false'); if (open2) mPlay.focus(); });
  mPlay.addEventListener('click', () => { setPlay(!playing); menu.hidden = true; bMenu.setAttribute('aria-expanded', 'false'); bMenu.focus(); });
  mRepeat.addEventListener('click', () => { setLoop(!looping); if (looping && !playing) setPlay(true); const st = steps[idx]; if (st) bNext.textContent = (idx === steps.length - 1 && !looping) ? tt.ui.finish : (mobileNow() ? tt.ui.next : tt.ui.next + ' ›'); });
  mReset.addEventListener('click', () => { resetPosition(); menu.hidden = true; bMenu.setAttribute('aria-expanded', 'false'); });
  document.addEventListener('pointerdown', e => { if (!menu.hidden && !menu.contains(e.target) && e.target !== bMenu && !bMenu.contains(e.target)) { menu.hidden = true; bMenu.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', e => {
    if (idx < 0 || !e.isTrusted || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Escape') {
      if (!menu.hidden) { menu.hidden = true; bMenu.setAttribute('aria-expanded', 'false'); bMenu.focus(); }
      else if (detailsOpen) setDetails(false);
      else endTour(false);
      e.preventDefault(); e.stopPropagation(); return;
    }
    if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '')) return;
    if (e.target && e.target.closest && e.target.closest('.box-stage, .config-controls, .hrg-grip')) return;
    const fwd = rtl ? 'ArrowLeft' : 'ArrowRight', bwd = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd && card.contains(document.activeElement)) { e.preventDefault(); go(idx + 1); }
    else if (e.key === bwd && card.contains(document.activeElement)) { e.preventDefault(); go(idx - 1); }
  });
  document.addEventListener('focusin', e => { if (idx >= 0 && e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) setTimeout(keyboardMode, 250); });
  document.addEventListener('focusout', () => { if (idx >= 0) setTimeout(keyboardMode, 250); });
  document.addEventListener('click', e => {
    if (idx >= 0 && playing && e.isTrusted && !e.target.closest('.hrg-card, .hrg-panel, .hrg-showme')) setPlay(false);
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
  launch.addEventListener('click', () => (panel.hidden ? open(null) : close()));
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
