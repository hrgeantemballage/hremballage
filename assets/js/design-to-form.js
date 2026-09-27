/* Section 02 "From design to form": IDEA (dieline drawn) → ENGINEERING (fold lines, dimensions, board)
   → PRODUCTION (folding) → PACKAGING (tape and HR print). The phase list under it highlights in sync. */
(function () {
  const stageBox = document.querySelector('#engineering .transform-stage');
  if (!stageBox) return;
  const phases = Array.from(document.querySelectorAll('#engineering .phase-list li'));
  const HEX = '<polygon points="138,297 510,85 578,125 205,338 205,605 138,570" fill="#1470ae"/><polygon points="580,202 648,162 880,297 880,727 812,765 812,335" fill="#62a843"/><polygon points="138,648 510,860 745,730 745,805 510,940 138,727" fill="#f8e21a"/><path d="M248,362 H305 V482 H500 V540 H305 V660 L248,640 Z" fill="#e62e7b"/><path d="M500,362 L680,362 A89,89 0 0 1 680,540 L560,540 L560,660 L500,660 L500,482 L680,482 A31,31 0 0 0 680,420 L518,420 Z" fill="#e62e7b"/><path d="M600,540 L672,540 L770,660 L695,660 Z" fill="#e62e7b"/>';
  stageBox.classList.add('dtf-on');
  stageBox.innerHTML =
    '<div class="dtf-stage" aria-hidden="true"><div class="dtf-world">' +
      '<div class="dtf-grid"></div><div class="dtf-shadow"></div>' +
      '<svg class="dtf-dieline" viewBox="-120 -240 410 470">' +
        '<path class="dtf-cut" pathLength="1" d="M0 -230 H170 V0 H280 V120 H170 V230 H0 V120 H-110 V0 H0 Z"/>' +
        '<path class="dtf-fold" d="M0 -110 H170 M0 0 H170 M0 120 H170 M0 0 V120 M170 0 V120"/>' +
        '<text class="dtf-dim" x="85" y="-236" text-anchor="middle">L 400</text>' +
        '<text class="dtf-dim" x="286" y="64">W 280</text>' +
        '<text class="dtf-dim" x="-116" y="64" text-anchor="end">H 260</text>' +
      '</svg>' +
      '<div class="dtf-f dtf-bottom">' +
        '<div class="dtf-f dtf-back"><div class="dtf-f dtf-lid"><div class="dtf-tape"></div></div></div>' +
        '<div class="dtf-f dtf-front"><div class="dtf-print"><svg viewBox="120 70 780 880">' + HEX + '</svg><span>GÉANT EMBALLAGE</span></div></div>' +
        '<div class="dtf-f dtf-left"></div><div class="dtf-f dtf-right"></div>' +
      '</div>' +
    '</div></div>';

  const q = s => stageBox.querySelector(s);
  const stage = q('.dtf-stage'), world = q('.dtf-world'), cut = q('.dtf-cut'), fold = q('.dtf-fold');
  const dims = stageBox.querySelectorAll('.dtf-dim');
  const F = { bottom: q('.dtf-bottom'), front: q('.dtf-front'), back: q('.dtf-back'), left: q('.dtf-left'), right: q('.dtf-right'), lid: q('.dtf-lid') };
  const tape = q('.dtf-tape'), print = q('.dtf-print'), shadow = q('.dtf-shadow');
  const LOOP = 10;
  const clamp = v => Math.max(0, Math.min(1, v));
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const back = x => { const c = 1.4; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const FLAT = [199, 156, 105];
  const SHADE = { bottom: [150, 112, 72], front: [186, 140, 90], back: [140, 104, 66], left: [132, 98, 62], right: [170, 128, 82], lid: [214, 172, 121] };
  const mix = (a, b, t) => 'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',') + ')';
  let lastPhase = -1;

  function render(t) {
    const seg = (a, b, fn) => (fn || ease)(clamp((t - a) / (b - a)));
    const draw = seg(.3, 2.0), aux = seg(1.5, 2.2), lineFade = 1 - .8 * seg(3.0, 4.2), out = seg(9.1, 9.8);
    cut.style.strokeDasharray = 1; cut.style.strokeDashoffset = 1 - draw;
    cut.style.opacity = lineFade * (1 - out);
    fold.style.opacity = aux * lineFade * (1 - out);
    dims.forEach(d => { d.style.opacity = aux * (1 - seg(2.6, 3.2)); });
    const fill = seg(2.2, 3.0), walls = seg(3.0, 4.1), sides = seg(3.7, 4.8), lid = seg(4.8, 5.9, back);
    F.front.style.transform = 'rotateX(' + (90 * walls) + 'deg)';
    F.back.style.transform = 'rotateX(' + (-90 * walls) + 'deg)';
    F.left.style.transform = 'rotateY(' + (90 * sides) + 'deg)';
    F.right.style.transform = 'rotateY(' + (-90 * sides) + 'deg)';
    F.lid.style.transform = 'rotateX(' + (-90 * Math.min(lid, 1.02)) + 'deg)';
    const prog = { bottom: walls, front: walls, back: walls, left: sides, right: sides, lid: clamp(lid) };
    for (const k in F) { F[k].style.backgroundColor = mix(FLAT, SHADE[k], prog[k]); if (k !== 'lid') F[k].style.opacity = fill * (1 - out); }
    F.bottom.style.transform = 'translateZ(.5px)';
    shadow.style.opacity = seg(3.2, 5.6) * .9 * (1 - out);
    tape.style.transform = 'scaleY(' + seg(5.9, 6.4) + ')';
    const st = seg(6.4, 6.9);
    print.style.opacity = st;
    print.style.transform = 'rotateX(180deg) translateZ(.6px) scale(' + (1.35 - .35 * st) + ')';
    const drift = Math.sin(t / LOOP * Math.PI * 2) * 7, lift = seg(3.0, 6.0);
    world.style.transform = 'translateY(' + (-10 + 22 * lift) + 'px) rotateX(' + (58 - 4 * lift) + 'deg) rotateZ(' + (-38 + drift) + 'deg)';
    // IDEA → ENGINEERING → PRODUCTION → PACKAGING
    const phase = t < 1.8 ? 0 : t < 3.0 ? 1 : t < 6.0 ? 2 : 3;
    if (phase !== lastPhase && phases.length === 4) { lastPhase = phase; phases.forEach((li, i) => li.classList.toggle('dtf-now', i === phase)); }
  }

  const fit = () => {
    const r = stageBox.getBoundingClientRect();
    stage.style.setProperty('--dtf-s', Math.min(r.width / 640, r.height / 470).toFixed(3));
  };
  fit();
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stageBox); else window.addEventListener('resize', fit);

  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { render(8); return; }
  let visible = false, start = performance.now(), paused = 0, pausedAt = performance.now();
  function tick(now) {
    if (!visible || document.hidden) return;
    render(((now - start - paused) / 1000) % LOOP);
    requestAnimationFrame(tick);
  }
  const resume = () => { if (visible && !document.hidden) { paused += performance.now() - pausedAt; requestAnimationFrame(tick); } };
  render(0);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) { visible = true; resume(); }
      else if (!e.isIntersecting && visible) { visible = false; pausedAt = performance.now(); }
    }).observe(stageBox);
  } else { visible = true; requestAnimationFrame(tick); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pausedAt = performance.now(); else resume(); });
})();
