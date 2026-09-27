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
      subject:'Packaging enquiry', next:'Next', back:'Back', finish:'Finish', menu:'Main menu', close:'Close',
      step:'Stop {n} of {t}', play:'Play automatically', pause:'Pause', endTour:'End the tour',
      end:'That’s it! Ready to talk about your packaging?', restart:'Choose another tour',
      sendDesign:'Email my design', sendNote:'Your email app opens with your box details. You send it yourself.',
      lines:{
        company:'This is us. Nice to meet you!',
        products:'Here are our packaging solutions. Let me show you each one.',
        industries:'Which world is yours? Let me flip through them.',
        configurator:'Watch this: I change the box live. Your turn next!',
        'printing-section':'Your logo on your box. That’s where brands come alive.',
        manufacturing:'Hop on! Let’s ride the production line together.',
        quality:'Here are the quality points to discuss, one by one.',
        technology:'The secret is in the layers: liner, fluting, liner.',
        location:'Here’s where to find us in Algeria.',
        contact:'Ready when you are. Email or call our team!',
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
      subject:'Demande d’emballage', next:'Suivant', back:'Précédent', finish:'Terminer', menu:'Menu principal', close:'Fermer',
      step:'Étape {n} sur {t}', play:'Lecture automatique', pause:'Pause', endTour:'Quitter la visite',
      end:'Et voilà ! Parlons de votre projet d’emballage ?', restart:'Choisir une autre visite',
      sendDesign:'Envoyer mon design par e-mail', sendNote:'Votre messagerie s’ouvre avec les détails de votre caisse. C’est vous qui l’envoyez.',
      lines:{
        company:'Voici qui nous sommes. Enchanté !',
        products:'Voici nos solutions d’emballage. Je vous les montre une par une.',
        industries:'Quel est votre secteur ? Je les fais défiler.',
        configurator:'Regardez : je modifie la caisse en direct. À vous ensuite !',
        'printing-section':'Votre logo sur votre emballage : votre marque prend vie.',
        manufacturing:'En route ! Parcourons la ligne de production ensemble.',
        quality:'Voici les points qualité à discuter, un par un.',
        technology:'Le secret est dans les couches : couverture, cannelure, couverture.',
        location:'Voici où nous trouver en Algérie.',
        contact:'Quand vous voulez ! Écrivez ou appelez notre équipe.',
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
      subject:'استفسار عن التغليف', next:'التالي', back:'السابق', finish:'إنهاء', menu:'القائمة الرئيسية', close:'إغلاق',
      step:'المحطة {n} من {t}', play:'تشغيل تلقائي', pause:'إيقاف مؤقت', endTour:'إنهاء الجولة',
      end:'هذا كل شيء! هل نناقش مشروع التغليف الخاص بك؟', restart:'اختر جولة أخرى',
      sendDesign:'أرسل تصميمي بالبريد', sendNote:'يفتح تطبيق البريد مع تفاصيل عبوتك، وأنت من يرسلها.',
      lines:{
        company:'هذه نحن. تشرفنا بمعرفتك!',
        products:'إليك حلول التغليف لدينا. سأعرضها عليك واحداً تلو الآخر.',
        industries:'ما قطاعك؟ دعني أتصفحها لك.',
        configurator:'شاهد: أغيّر العبوة مباشرة. والآن دورك!',
        'printing-section':'شعارك على عبوتك: هنا تنبض علامتك بالحياة.',
        manufacturing:'هيا بنا! لنرافق خط الإنتاج معاً.',
        quality:'إليك جوانب الجودة التي نناقشها، واحداً تلو الآخر.',
        technology:'السرّ في الطبقات: طبقة خارجية، تموج، طبقة خارجية.',
        location:'هنا تجدنا في الجزائر.',
        contact:'نحن جاهزون متى شئت. راسل فريقنا أو اتصل به!',
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
    const hh = header ? header.getBoundingClientRect().height : 0;
    const r = target.getBoundingClientRect();
    let y = r.top + window.scrollY - hh - 12;
    if (block === 'center') y = r.top + window.scrollY - Math.max(hh + 12, (window.innerHeight - r.height) / 2);
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
    return box;
  }

  function renderHome() {
    highlight(null);
    body.replaceChildren();
    body.appendChild(el('p', 'hrg-say hrg-ask', t.ask));
    if (byId('configurator') && $('#config-cta')) {
      const d = btn(t.design, 'hrg-design', startDesign);
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
  const tpBubble = el('p', 'hrg-tbubble');
  const tpRow = el('div', 'hrg-tour-row');
  const tpBot = bot('hrg-tour-bot');
  const pill = el('div', 'hrg-pill'); pill.setAttribute('role', 'toolbar'); pill.setAttribute('aria-label', t.name);
  const pBack = btn(rtl ? '›' : '‹', 'hrg-pbtn hrg-arrow', () => go(idx - 1)); pBack.setAttribute('aria-label', t.back);
  const pCount = el('span', 'hrg-pcount');
  const pNext = btn(rtl ? '‹' : '›', 'hrg-pbtn hrg-pnext hrg-arrow', () => go(idx + 1));
  const pPlay = btn('▶', 'hrg-pbtn hrg-play', () => setPlay(!playing));
  const pEnd = btn('✕', 'hrg-pbtn', () => endTour(false)); pEnd.setAttribute('aria-label', t.endTour);
  pill.append(pBack, pCount, pNext, pPlay, pEnd);
  tpRow.append(tpBot, pill);
  tp.append(tpBubble, tpRow);
  const waves = el('div', 'hrg-waves'); waves.setAttribute('aria-hidden', 'true');
  for (let k = 0; k < 3; k++) waves.appendChild(el('i', ''));
  document.body.append(waves, tp);

  let steps = [], idx = -1, token = 0, playing = false, playTimer = 0, lit = [];
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
  }
  function fireWaves(target) {
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
      spot(item, true); fireWaves(item);
      if (fn) fn(item, i);
      if (window.innerWidth <= 700) { const r = item.getBoundingClientRect(); if (r.top < 90 || r.bottom > window.innerHeight - 140) scrollToEl(item, 'center'); }
    }));
    return start + items.length * gap + 600;
  }
  function setSelect(sel, value) {
    if (!sel || !Array.from(sel.options).some(o => o.value === value)) return;
    sel.value = value;
    sel.dispatchEvent(new Event('input', { bubbles: true }));
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // What Packy does at each stop. Every action works on the page's own elements. Returns its length in ms.
  const ACT = {
    company(s) { lightTitle(s); const cta = $('.text-link, .button', s); if (cta) later(2600, () => { spot(cta); fireWaves(cta); }); return 5200; },
    products(s) { lightTitle(s); return sequence($$('#product-grid .product-card'), 2200, 1100); },
    industries(s) { lightTitle(s); return sequence($$('#industry-list button'), 1900, 1200, b => b.click()); },
    configurator(s) {
      lightTitle(s);
      const style = byId('box-style'), print = byId('printing'), preview = $('.config-preview');
      later(1900, () => { if (window.innerWidth <= 700 && preview) scrollToEl(preview, 'center'); });
      later(2300, () => { setSelect(style, 'pizza'); spot(style, true); fireWaves(style); });
      later(3900, () => { setSelect(print, 'mark'); spot(print, true); fireWaves(print); });
      later(5500, () => { setSelect(style, 'gift'); spot(style, true); fireWaves(style); });
      later(7000, () => { if (preview) { spot(preview, true); fireWaves(preview); } tpBubble.appendChild(btn(t.tryIt, 'hrg-send', startDesign)); });
      return 9000;
    },
    'printing-section'(s) { lightTitle(s); const img = $('.printing-image', s); later(2600, () => { spot(img); fireWaves(img); }); return 5600; },
    manufacturing(s) {
      lightTitle(s);
      later(1500, () => { if (window.HRManufacturing) window.HRManufacturing.ride(reduce ? 0 : 7000); });
      return 9000;
    },
    quality(s) { lightTitle(s); return sequence($$('.quality-list > div', s), 2000, 800); },
    technology(s) { lightTitle(s); return sequence($$('.board-diagram .board-liner, .board-diagram .board-flute', s), 2200, 1000); },
    location(s) {
      lightTitle(s);
      const map = $('.map-panel', s), open = $('.map-open', s);
      later(2300, () => { if (map) { if (window.innerWidth <= 700) scrollToEl(map, 'center'); spot(map); map.classList.add('hrg-pin'); fireWaves(map); } });
      later(4200, () => { if (open) { spot(open); fireWaves(open); } });
      return 6500;
    },
    contact(s) { lightTitle(s); return sequence($$('.section-heading .button', s), 2200, 1200); }
  };

  // "Design your box with me": Packy demonstrates on the live preview, then hands control back to the visitor.
  const views = () => $$('.config-views button');
  const boxStage = () => $('.box-stage');
  function turn(deg, stepMs) { // rotates the live 3D preview through the site's own keyboard control
    const st = boxStage(); if (!st) return;
    const n = Math.round(Math.abs(deg) / 10), key = deg > 0 ? 'ArrowRight' : 'ArrowLeft';
    for (let i = 0; i < n; i++) later(i * (stepMs || 45), () => st.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true })));
  }
  function tilt(steps) { const st = boxStage(); if (st) for (let i = 0; i < Math.abs(steps); i++) later(i * 60, () => st.dispatchEvent(new KeyboardEvent('keydown', { key: steps > 0 ? 'ArrowDown' : 'ArrowUp', bubbles: true }))); }
  function showView(flat) { const v = views(); const b = flat ? v[1] : v[0]; if (b) b.click(); }
  function resetView() { const r = $('.config-views__reset'); if (r) r.click(); }
  // try an option on the preview, then give the visitor's own choice back
  let cleanups = [];
  function runCleanups() { const c = cleanups; cleanups = []; c.forEach(fn => fn()); }
  function tryOption(sel, values, start, gap) {
    const e = byId(sel); if (!e) return start;
    const mine = e.value;
    let changed = false;
    const restore = () => { if (changed) { changed = false; setSelect(e, mine); } };
    cleanups.push(restore); // the visitor's own choice always comes back, even if they skip ahead
    values.forEach((v, i) => later(start + i * gap, () => { changed = true; setSelect(e, v); spot(e, true); fireWaves(e); }));
    later(start + values.length * gap, restore);
    return start + values.length * gap + 300;
  }
  function focusPreview() {
    const p = $('.config-preview');
    if (p && window.innerWidth <= 700) scrollToEl(p, 'center');
    return p;
  }
  const DESIGN = [
    { line: 'd1', run() {
      const style = byId('box-style'); if (style) { scrollToEl(style, 'center'); later(500, () => { spot(style); fireWaves(style); }); }
      later(1300, focusPreview);
      tryOption('box-style', ['pizza', 'cake', 'gift'], 1700, 1300);
      later(5900, () => { if (style) { scrollToEl(style, 'center'); spot(style, true); } });
    } },
    { line: 'd2', run() {
      const dims = $('.dimension-fields'); if (dims) { scrollToEl(dims, 'center'); later(500, () => { spot(dims); fireWaves(dims); }); }
      later(1400, () => { focusPreview(); showView(false); spot($('.config-preview')); });
      later(1900, () => turn(360, 40));
      later(3600, () => tilt(-3));
      later(4600, () => { resetView(); if (dims) scrollToEl(dims, 'center'); });
    } },
    { line: 'd3', run() {
      const board = byId('board'); if (board) { scrollToEl(board, 'center'); later(500, () => { spot(board); fireWaves(board); }); }
      later(1200, focusPreview);
      const n = tryOption('board', ['white'], 1600, 1600);
      tryOption('flute', ['double'], n + 200, 1800);
      later(n + 2400, () => { if (board) scrollToEl(board, 'center'); });
    } },
    { line: 'd4', run() {
      const pr = byId('printing'); if (pr) { scrollToEl(pr, 'center'); later(500, () => { spot(pr); fireWaves(pr); }); }
      later(1200, focusPreview);
      const n = tryOption('printing', ['mark', 'graphic'], 1600, 1500);
      later(n + 300, () => { if (pr) scrollToEl(pr, 'center'); spot(byId('finishing')); });
    } },
    { line: 'd5', run() {
      const p = $('.config-preview'); if (p) { scrollToEl(p, 'center'); later(500, () => { spot(p); fireWaves(p); }); }
      later(900, () => showView(true));
      later(4200, () => showView(false));
    } },
    { line: 'd6', run() {
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
  function designStep(d) { d.run(); return 0; }
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
    clearTimeout(playTimer);
    pPlay.textContent = playing ? '❚❚' : '▶';
    pPlay.setAttribute('aria-label', playing ? t.pause : t.play);
    pPlay.setAttribute('aria-pressed', playing ? 'true' : 'false');
    if (playing && idx >= 0) scheduleNext(steps[idx].len || 6000);
  }
  function scheduleNext(ms) { clearTimeout(playTimer); if (playing) playTimer = setTimeout(() => go(idx + 1), Math.max(4500, ms + 900)); }

  function go(i) {
    if (i < 0) { endTour(false); return; }
    if (i >= steps.length) { endTour(true); return; }
    runCleanups(); token++; idx = i;
    unlight(); waves.classList.remove('go');
    const st = steps[i];
    tp.hidden = false; document.body.classList.add('hrg-touring-mode');
    pCount.textContent = (i + 1) + '/' + steps.length;
    pCount.setAttribute('aria-label', t.step.replace('{n}', i + 1).replace('{t}', steps.length));
    const last = i === steps.length - 1;
    pNext.textContent = last ? '✓' : (rtl ? '‹' : '›');
    pNext.setAttribute('aria-label', last ? t.finish : t.next);
    tpBubble.replaceChildren(el('span', '', t.lines[st.line] || ''));
    tpBubble.classList.remove('pop'); void tpBubble.offsetWidth; tpBubble.classList.add('pop');
    let len;
    if (st.design) { highlight(null); len = designStep(st.design); }
    else { const s = byId(st.id); highlight(s); scrollToEl(s); len = (ACT[st.id] || (sec => { lightTitle(sec); return 4500; }))(s); }
    st.len = len;
    const c = st.id ? stopContent(byId(st.id)) : null;
    announce(t.step.replace('{n}', i + 1).replace('{t}', steps.length) + '. ' + (t.lines[st.line] || '') + (c ? ' ' + c.title : ''));
    if (playing) scheduleNext(len);
  }
  function begin(list, canPlay) {
    close(false);
    steps = list; pPlay.hidden = !canPlay; setPlay(false);
    go(0);
    pNext.focus({ preventScroll: true });
  }
  function startTour(key) { begin(PATHS[key].map(id => ({ id, line: id })), true); }
  function startDesign() { begin(DESIGN.map(d => ({ design: d, line: d.line })), false); }
  function endTour(finished) {
    runCleanups(); token++; setPlay(false);
    idx = -1; unlight(); highlight(null);
    tp.hidden = true; document.body.classList.remove('hrg-touring-mode');
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
    if (view === 'end') renderEnd(); else renderHome();
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
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.preventDefault(); e.stopPropagation(); close(); } });
  if (rtl) panel.dir = 'rtl';
})();
