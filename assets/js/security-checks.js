/* HR Géant Emballage — "Security checks" radar panel, opened from a discreet footer badge.
   Results are entered by hand in assets/data/security-checks.json (7 fixed providers).
   A provider appears only with a result, a date and an https report link. Nothing is live-monitored. */
(function () {
  'use strict';
  const footer = document.querySelector('.footer-bottom');
  if (!footer || !window.fetch) return;
  const html = document.documentElement;
  const lang = (html.lang || 'en').slice(0, 2);
  const rtl = (html.dir || '').toLowerCase() === 'rtl';
  const root = lang === 'en' ? '' : '../';
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MAX = 7, OLD_DAYS = 90, SHOW_MS = 11000, FADE_MS = 600;
  const T = {
    en: { today:'Today: {date}', badge:'Website security checks', title:'Security checks', emblem:'Security checks',
      clean:'Clean site', cleanSince:'Checked {date}', datesNote:'Checks made on the dates shown',
      ok:'No threats detected at the last check.', issues:'Issues were reported at the last check.', unknown:'No result was available at the last check.',
      checked:'Checked {date}', old:'Older result', oldHint:'More than {days} days old; may not reflect the current state.',
      reported:'Reported:', via:'Result reported via {name}', view:'View report', newTab:'(opens a new tab)',
      prev:'Previous check', next:'Next check', pause:'Pause', play:'Play', all:'View all checks', radar:'Back to radar', close:'Close',
      count:'{n} of {t}' },
    fr: { today:'Aujourd’hui : {date}', badge:'Contrôles de sécurité du site', title:'Contrôles de sécurité', emblem:'Contrôles de sécurité',
      clean:'Site sain', cleanSince:'Vérifié le {date}', datesNote:'Vérifications effectuées aux dates indiquées',
      ok:'Aucune menace détectée lors de la dernière vérification.', issues:'Des problèmes ont été signalés lors de la dernière vérification.', unknown:'Aucun résultat n’était disponible lors de la dernière vérification.',
      checked:'Vérifié le {date}', old:'Résultat ancien', oldHint:'Plus de {days} jours ; peut ne pas refléter la situation actuelle.',
      reported:'Résultat communiqué :', via:'Résultat communiqué via {name}', view:'Voir le rapport', newTab:'(nouvel onglet)',
      prev:'Vérification précédente', next:'Vérification suivante', pause:'Pause', play:'Lecture', all:'Voir toutes les vérifications', radar:'Retour au radar', close:'Fermer',
      count:'{n} sur {t}' },
    ar: { today:'اليوم: {date}', badge:'فحوصات أمان الموقع', title:'فحوصات الأمان', emblem:'فحوصات الأمان',
      clean:'موقع سليم', cleanSince:'تاريخ الفحص: {date}', datesNote:'فحوصات أُجريت في التواريخ المبيّنة',
      ok:'لم يتم رصد أي تهديد في آخر فحص.', issues:'تم الإبلاغ عن مشكلات في آخر فحص.', unknown:'لم تتوفر نتيجة في آخر فحص.',
      checked:'تاريخ الفحص: {date}', old:'نتيجة قديمة', oldHint:'مضى عليها أكثر من {days} يوماً وقد لا تعكس الوضع الحالي.',
      reported:'النتيجة المُبلغ عنها:', via:'النتيجة عبر {name}', view:'عرض التقرير', newTab:'(علامة تبويب جديدة)',
      prev:'الفحص السابق', next:'الفحص التالي', pause:'إيقاف مؤقت', play:'تشغيل', all:'عرض كل الفحوصات', radar:'العودة إلى الرادار', close:'إغلاق',
      count:'{n} من {t}' }
  };
  const t = T[lang] || T.en;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const SHIELD = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.8 4.5 5.6v6.1c0 4.6 3.1 8.6 7.5 9.7 4.4-1.1 7.5-5.1 7.5-9.7V5.6z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m8.6 12.2 2.3 2.3 4.6-4.7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const EMBLEM = '<svg viewBox="0 0 120 136" aria-hidden="true" focusable="false"><defs><linearGradient id="secEg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2a33"/><stop offset="1" stop-color="#0c1216"/></linearGradient><linearGradient id="secEs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8db889"/><stop offset="1" stop-color="#3f8fe3"/></linearGradient></defs>' +
    '<path d="M60 6 12 24v38c0 31 20 57 48 68 28-11 48-37 48-68V24z" fill="url(#secEg)" stroke="url(#secEs)" stroke-width="3"/>' +
    '<path d="M60 18 23 32v30c0 24 15 45 37 54 22-9 37-30 37-54V32z" fill="none" stroke="rgba(141,184,137,.35)" stroke-width="1.2"/>' +
    '<path d="m42 68 13 13 25-26" fill="none" stroke="#8db889" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function valid(c) {
    return c && typeof c.name === 'string' && c.name.trim() && ['clean', 'issues', 'unknown'].includes(c.result) &&
      /^\d{4}-\d{2}-\d{2}$/.test(c.checked || '') && !isNaN(Date.parse(c.checked + 'T00:00:00Z')) && /^https:\/\/[^\s"'<>]+$/.test(c.report || '');
  }
  const fmt = iso => { try { return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-DZ-u-nu-latn' : lang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z')); } catch (e) { return iso; } };
  const ageDays = iso => Math.floor((Date.now() - Date.parse(iso + 'T00:00:00Z')) / 864e5);

  fetch(root + 'assets/data/security-checks.json', { cache: 'no-cache', credentials: 'same-origin' })
    .then(r => (r.ok ? r.json() : null))
    .then(d => {
      const list = (d && Array.isArray(d.providers) ? d.providers : []).filter(valid).slice(0, MAX);
      if (list.length) build(list);
    })
    .catch(() => {});

  function card(c) {
    const art = el('article', 'sec-card sec-' + c.result);
    const top = el('div', 'sec-top');
    const nameText = el('span', 'sec-name', c.name.trim()); nameText.dir = 'auto';
    const logoOk = typeof c.logo === 'string' && /^assets\/security\/[\w./-]+\.(svg|png|webp)$/.test(c.logo) && !/\.\./.test(c.logo);
    if (logoOk) {
      const img = el('img', 'sec-logo'); img.src = root + c.logo; img.alt = ''; img.decoding = 'async';
      nameText.classList.add('sec-sr'); // logo only on screen; the name is still read aloud
      img.addEventListener('error', () => { img.remove(); nameText.classList.remove('sec-sr'); });
      top.appendChild(img);
    }
    top.appendChild(nameText);
    const old = ageDays(c.checked) > OLD_DAYS;
    if (old) { top.appendChild(el('span', 'sec-old', t.old)); art.classList.add('is-old'); }
    art.appendChild(top);
    const check = c.check && (c.check[lang] || c.check.en); if (check) art.appendChild(el('p', 'sec-check', check));
    art.appendChild(el('p', 'sec-status', t[c.result === 'clean' ? 'ok' : c.result]));
    if (typeof c.reported === 'string' && c.reported.trim()) { const r = el('p', 'sec-reported'); const q = el('q', '', c.reported.trim()); q.dir = 'auto'; r.append(el('span', '', t.reported + ' '), q); art.appendChild(r); }
    const meta = el('p', 'sec-meta'); const tm = el('time', '', t.checked.replace('{date}', fmt(c.checked))); tm.dateTime = c.checked; meta.appendChild(tm);
    if (typeof c.via === 'string' && c.via.trim()) meta.appendChild(el('span', '', t.via.replace('{name}', c.via.trim())));
    art.appendChild(meta);
    if (old) art.appendChild(el('p', 'sec-oldhint', t.oldHint.replace('{days}', OLD_DAYS)));
    const a = el('a', 'sec-link'); a.href = c.report; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.append(el('span', '', t.view + ' ↗'), el('span', 'sec-sr', ' ' + t.newTab)); art.appendChild(a);
    return art;
  }

  function build(list) {
    // footer badge
    const badge = el('button', 'sec-badge'); badge.type = 'button';
    badge.setAttribute('aria-haspopup', 'dialog'); badge.setAttribute('aria-controls', 'sec-panel'); badge.setAttribute('aria-expanded', 'false');
    badge.innerHTML = SHIELD; badge.appendChild(el('span','',t.badge));
    footer.insertBefore(badge, footer.firstElementChild ? footer.firstElementChild.nextSibling : null);

    // panel
    const backdrop = el('div', 'sec-backdrop'); backdrop.hidden = true;
    const dlg = el('section', 'sec-panel'); dlg.id = 'sec-panel'; dlg.hidden = true;
    dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-labelledby', 'sec-title');
    if (rtl) dlg.dir = 'rtl';
    const head = el('div', 'sec-head');
    const h = el('h2', 'sec-title', t.title); h.id = 'sec-title'; h.tabIndex = -1;
    const x = el('button', 'sec-x', '×'); x.type = 'button'; x.setAttribute('aria-label', t.close);
    head.append(h, x);

    // radar stage
    const stage = el('div', 'sec-stage');
    const radar = el('div', 'sec-radar'); radar.setAttribute('aria-hidden', 'true');
    radar.innerHTML = '<svg class="sec-grid" viewBox="0 0 400 400" focusable="false"><g fill="none" stroke="rgba(141,184,137,.16)" stroke-width="1"><circle cx="200" cy="200" r="60"/><circle cx="200" cy="200" r="110"/><circle cx="200" cy="200" r="160"/><circle cx="200" cy="200" r="196" stroke="rgba(63,143,227,.22)"/><path d="M200 4V396M4 200H396M61 61 339 339M339 61 61 339" stroke="rgba(141,184,137,.08)"/></g></svg><div class="sec-beam"></div>';
    const emblem = el('div', 'sec-emblem');
    const em = el('div', 'sec-em-ic'); em.innerHTML = EMBLEM;
    emblem.append(em, el('p', 'sec-em-title', t.emblem));
    // "Clean site" only when every shown result is clean and recent; always dated
    const allClean = list.every(c => c.result === 'clean' && ageDays(c.checked) <= OLD_DAYS);
    if (allClean) {
      const oldest = list.map(c => c.checked).sort()[0];
      const cl = el('p', 'sec-em-clean'); cl.append(el('strong', '', t.clean), el('span', '', ' · ' + t.cleanSince.replace('{date}', fmt(oldest))));
      emblem.appendChild(cl);
    }
    emblem.appendChild(el('p', 'sec-em-note', t.datesNote));
    const slot = el('div', 'sec-slot');
    stage.append(radar, emblem, slot);

    // stable list ("View all")
    const all = el('div', 'sec-all'); all.hidden = true;
    const ul = el('ul', 'sec-list'); list.forEach(c => { const li = el('li'); li.appendChild(card(c)); ul.appendChild(li); }); all.appendChild(ul);

    // controls
    const ctr = el('div', 'sec-controls');
    const mk = (label, txt, cls) => { const b = el('button', 'sec-cbtn ' + (cls || ''), txt); b.type = 'button'; b.setAttribute('aria-label', label); return b; };
    const bPrev = mk(t.prev, rtl ? '›' : '‹', 'sec-arrow'), bPlay = mk(t.pause, '❚❚', 'sec-play'), bNext = mk(t.next, rtl ? '‹' : '›', 'sec-arrow');
    const count = el('span', 'sec-count'); count.setAttribute('aria-live', 'polite');
    const bAll = el('button', 'sec-allbtn', t.all); bAll.type = 'button'; bAll.setAttribute('aria-pressed', 'false');
    ctr.append(bPrev, bPlay, bNext, count, bAll);
    const todayDate=el('time','sec-today');
    dlg.append(head, todayDate, stage, all, ctr);
    document.body.append(backdrop, dlg);
    // Today's date is separate from the actual security report dates.
    let dateTimer=0;
    const dayFormat=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Algiers',year:'numeric',month:'2-digit',day:'2-digit'});
    const clockFormat=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Algiers',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
    function updateToday() {
      clearTimeout(dateTimer);dateTimer=0;
      const now=new Date(),parts=Object.fromEntries(dayFormat.formatToParts(now).map(p=>[p.type,p.value]));
      const iso=parts.year+'-'+parts.month+'-'+parts.day;
      [todayDate].forEach(tm=>{tm.dateTime=iso;tm.textContent=t.today.replace('{date}',fmt(iso));});
      if(!document.hidden){
        const clock=Object.fromEntries(clockFormat.formatToParts(now).map(p=>[p.type,p.value]));
        const untilMidnight=(86400-Number(clock.hour)*3600-Number(clock.minute)*60-Number(clock.second))*1000-now.getMilliseconds();
        dateTimer=setTimeout(updateToday,Math.max(100,Math.min(60000,untilMidnight)));
      }
    }
    document.addEventListener('visibilitychange',updateToday);
    window.addEventListener('pageshow',updateToday);
    window.addEventListener('focus',updateToday);
    window.addEventListener('pagehide',()=>{clearTimeout(dateTimer);dateTimer=0;});
    updateToday();

    // rotation: one card at a time, predefined positions around the emblem on desktop
    const POS = ['p-tl', 'p-tr', 'p-br', 'p-bl'];
    let i = 0, playing = !reduce, hover = false, timer = 0, manualMsg = false, listView = false;
    const cards = list.map(card);
    function show(n, announce) {
      i = (n + list.length) % list.length;
      const cur = slot.firstElementChild;
      const put = () => {
        slot.replaceChildren(cards[i]);
        slot.className = 'sec-slot ' + POS[i % POS.length];
        requestAnimationFrame(() => slot.classList.add('in'));
        count.textContent = announce ? t.count.replace('{n}', i + 1).replace('{t}', list.length) : '';
        if (!announce) count.dataset.v = t.count.replace('{n}', i + 1).replace('{t}', list.length);
        visCount.textContent = t.count.replace('{n}', i + 1).replace('{t}', list.length);
      };
      if (cur && !reduce) { slot.classList.remove('in'); setTimeout(put, FADE_MS); } else put();
      schedule();
    }
    const visCount = el('span', 'sec-count-vis'); visCount.setAttribute('aria-hidden', 'true'); ctr.insertBefore(visCount, count);
    function schedule() { clearTimeout(timer); if (playing && !hover && !listView && !dlg.hidden && !document.hidden && list.length > 1) timer = setTimeout(() => show(i + 1, false), SHOW_MS); }
    function setPlaying(p) { playing = p; bPlay.textContent = p ? '❚❚' : '▶'; bPlay.setAttribute('aria-label', p ? t.pause : t.play); schedule(); }
    // never move a card while someone is interacting with it
    slot.addEventListener('pointerenter', () => { hover = true; clearTimeout(timer); });
    slot.addEventListener('pointerleave', () => { hover = false; schedule(); });
    slot.addEventListener('focusin', () => { hover = true; clearTimeout(timer); });
    slot.addEventListener('focusout', e => { if (!slot.contains(e.relatedTarget)) { hover = false; schedule(); } });
    bPrev.addEventListener('click', () => show(i - 1, true));
    bNext.addEventListener('click', () => show(i + 1, true));
    bPlay.addEventListener('click', () => setPlaying(!playing));
    bAll.addEventListener('click', () => {
      listView = !listView;
      all.hidden = !listView; stage.hidden = listView;
      [bPrev, bPlay, bNext].forEach(b => { b.hidden = listView; }); visCount.hidden = listView;
      bAll.textContent = listView ? t.radar : t.all; bAll.setAttribute('aria-pressed', listView ? 'true' : 'false');
      dlg.classList.toggle('is-list', listView);
      schedule();
    });
    if (list.length < 2) { [bPrev, bPlay, bNext].forEach(b => { b.hidden = true; }); visCount.hidden = true; }
    document.addEventListener('visibilitychange', schedule);

    let lastFocus = null;
    function open() {
      updateToday();
      lastFocus = document.activeElement;
      backdrop.hidden = false; dlg.hidden = false;
      document.body.classList.add('sec-open');
      badge.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => { backdrop.classList.add('in'); dlg.classList.add('in', 'sec-running'); });
      show(i, false);
      h.focus({ preventScroll: true });
    }
    function close() {
      clearTimeout(timer);
      dlg.classList.remove('in', 'sec-running'); backdrop.classList.remove('in');
      dlg.hidden = true; backdrop.hidden = true;
      document.body.classList.remove('sec-open');
      badge.setAttribute('aria-expanded', 'false');
      (lastFocus && lastFocus.focus ? lastFocus : badge).focus({ preventScroll: true });
    }
    badge.addEventListener('click', open);
    x.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (dlg.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
      if (e.key === 'Tab') {
        const f = Array.from(dlg.querySelectorAll('a[href], button:not([disabled])')).filter(b => !b.hidden && b.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === h)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }, true);
    setPlaying(playing);
  }
})();
