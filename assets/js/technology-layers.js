/* Section 07: how corrugated board gets its strength.
   Fluting is formed between corrugating rollers → glue on the flute tips → top liner → bottom liner
   → the board is bonded → a load presses down and the arches carry it. The page's own (translated)
   LINER / FLUTING / LINER labels light up in sync. */
(function () {
  const box = document.querySelector('#technology .board-diagram');
  if (!box) return;
  const labels = Array.from(box.querySelectorAll('.board-labels span'));
  labels.forEach(s => s.classList.add('tl-label'));
  const NS = 'http://www.w3.org/2000/svg';
  const W = 600, H = 330, X0 = 30, X1 = 570, MID = 176, AMP = 26, WL = 44, ROLL_X = 128;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.setAttribute('class', 'tl-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML =
    '<defs>' +
      '<linearGradient id="tlK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8b484"/><stop offset="1" stop-color="#a47a4b"/></linearGradient>' +
      '<linearGradient id="tlS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffd68c" stop-opacity="0"/><stop offset=".5" stop-color="#ffd68c" stop-opacity=".55"/><stop offset="1" stop-color="#ffd68c" stop-opacity="0"/></linearGradient>' +
      '<clipPath id="tlC"><rect x="' + X0 + '" y="0" width="' + (X1 - X0) + '" height="' + H + '"/></clipPath>' +
    '</defs>' +
    '<g class="tl-rollers"></g>' +
    '<g clip-path="url(#tlC)">' +
      '<path class="tl-feed" fill="none" stroke="#b98d5c" stroke-width="3"/>' +
      '<path class="tl-flute" fill="none" stroke="#b98d5c" stroke-width="4" stroke-linejoin="round"/>' +
      '<g class="tl-glue"></g>' +
      '<rect class="tl-top" x="' + X0 + '" width="' + (X1 - X0) + '" height="10" rx="2" fill="url(#tlK)" stroke="#765637"/>' +
      '<rect class="tl-bottom" x="' + X0 + '" width="' + (X1 - X0) + '" height="10" rx="2" fill="url(#tlK)" stroke="#765637"/>' +
      '<rect class="tl-sweep" y="' + (MID - AMP - 20) + '" width="120" height="' + (2 * AMP + 40) + '" fill="url(#tlS)"/>' +
    '</g>' +
    '<g class="tl-load"><rect x="-70" y="-62" width="140" height="62" rx="4" fill="url(#tlK)" stroke="#765637"/>' +
      '<rect x="-70" y="-62" width="140" height="8" fill="#e8c897" opacity=".6"/>' +
      '<rect x="-12" y="-62" width="24" height="62" fill="#e3c796" opacity=".5"/></g>' +
    '<g class="tl-arrows" stroke="#8fc2f0" stroke-width="3" fill="none" stroke-linecap="round"></g>';
  const keep = box.querySelector('.board-labels');
  box.querySelectorAll('.board-liner, .board-flute').forEach(e => e.remove());
  box.insertBefore(svg, keep);
  box.classList.add('tl-on');

  const q = s => svg.querySelector(s);
  const feed = q('.tl-feed'), flute = q('.tl-flute'), glueG = q('.tl-glue'), top = q('.tl-top'), bottom = q('.tl-bottom');
  const sweep = q('.tl-sweep'), load = q('.tl-load'), arrowsG = q('.tl-arrows'), rollersG = q('.tl-rollers');

  // corrugating rollers
  const gear = (cx, cy, r) => {
    let d = '';
    for (let i = 0; i <= 32; i++) { const a = i / 32 * Math.PI * 2, rr = i % 2 ? r : r * .86; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1); }
    const g = document.createElementNS(NS, 'g');
    g.innerHTML = '<path d="' + d + 'Z" fill="#1b2328" stroke="#8fa3ad" stroke-width="2"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (r * .25) + '" fill="none" stroke="#8fa3ad" stroke-width="2"/>';
    rollersG.appendChild(g);
    return g;
  };
  const rTop = gear(ROLL_X, MID - AMP - 30, 30), rBot = gear(ROLL_X, MID + AMP + 30, 30);
  // glue dots on every flute tip
  const tips = [];
  for (let n = 1, x = ROLL_X + WL / 2; x < X1 - 4; n++, x = ROLL_X + n * WL / 2) {
    const up = n % 2 === 0; // crests every wavelength, troughs half-way between
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', (up ? MID - AMP : MID + AMP).toFixed(1));
    c.setAttribute('r', '4'); c.setAttribute('fill', '#ffd68c');
    glueG.appendChild(c); tips.push({ c, x, up });
  }
  for (let i = 0; i < 5; i++) {
    const p = document.createElementNS(NS, 'path');
    const x = 190 + i * 55; p.setAttribute('d', 'M' + x + ' 10 V52 M' + (x - 9) + ' 42 L' + x + ' 54 L' + (x + 9) + ' 42');
    arrowsG.appendChild(p);
  }

  const LOOP = 12;
  const clamp = v => Math.max(0, Math.min(1, v));
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  let lastPhase = -1;

  function render(t) {
    const seg = (a, b) => ease(clamp((t - a) / (b - a)));
    const out = seg(11.2, 11.9);
    const alpha = 1 - out;
    // 1. fluting forms between the rollers (wave front travels right)
    const front = ROLL_X + (X1 - ROLL_X) * seg(0.2, 2.4);
    const press = 1 - 0.035 * Math.sin(Math.PI * seg(8.8, 10.4)); // arches flex slightly under load
    let d = '';
    for (let x = ROLL_X; x <= X1; x += 3) {
      const k = x <= front ? Math.min(1, (front - x) / 30) : 0;
      const y = MID + AMP * press * k * Math.sin((x - ROLL_X) / WL * Math.PI * 2 - Math.PI / 2);
      d += (x === ROLL_X ? 'M' : 'L') + x + ' ' + y.toFixed(1);
    }
    flute.setAttribute('d', d);
    flute.setAttribute('opacity', alpha);
    feed.setAttribute('d', 'M' + X0 + ' ' + MID + ' L' + ROLL_X + ' ' + MID);
    feed.setAttribute('opacity', alpha * (1 - seg(3.2, 4)));
    const spin = t * 140;
    rTop.setAttribute('transform', 'rotate(' + spin + ' ' + ROLL_X + ' ' + (MID - AMP - 30) + ')');
    rBot.setAttribute('transform', 'rotate(' + (-spin) + ' ' + ROLL_X + ' ' + (MID + AMP + 30) + ')');
    rollersG.setAttribute('opacity', (1 - seg(3.0, 3.8)) * alpha);
    // 2. glue on the tips, left to right
    tips.forEach((g, i) => {
      const on = seg(1.6 + i * 0.05, 2.0 + i * 0.05);
      g.c.setAttribute('opacity', (on * (1 - 0.6 * seg(6.8, 7.4))) * alpha);
      g.c.setAttribute('r', (4 * on).toFixed(2));
    });
    // 3. top liner lands on the crests, 4. bottom liner on the troughs
    const topRest = MID - AMP * press - 10, botRest = MID + AMP * press;
    top.setAttribute('y', (topRest - 150 * (1 - seg(3.2, 4.8))).toFixed(1));
    top.setAttribute('opacity', seg(3.0, 3.5) * alpha);
    bottom.setAttribute('y', (botRest + 150 * (1 - seg(5.0, 6.6))).toFixed(1));
    bottom.setAttribute('opacity', seg(4.8, 5.3) * alpha);
    // 5. bonded: a light passes through the board
    const sw = seg(6.8, 8.2);
    sweep.setAttribute('x', (X0 - 120 + (X1 - X0 + 120) * sw).toFixed(1));
    sweep.setAttribute('opacity', (sw > 0 && sw < 1 ? 1 : 0) * alpha);
    // 6. load test: a box lands, arrows push, the arches carry it
    const drop = seg(8.2, 9.0);
    load.setAttribute('transform', 'translate(300 ' + (topRest - 190 * (1 - drop)).toFixed(1) + ')');
    load.setAttribute('opacity', seg(8.0, 8.4) * alpha);
    const ar = seg(8.9, 9.3) * (1 - seg(10.4, 10.9));
    arrowsG.setAttribute('opacity', ar * alpha);
    arrowsG.setAttribute('transform', 'translate(0 ' + (topRest - 150 + 8 * Math.sin(t * 8)).toFixed(1) + ')');
    const glow = seg(8.9, 9.4) * (1 - seg(10.4, 11));
    flute.setAttribute('stroke', glow > 0.02 ? 'rgb(' + Math.round(185 + 70 * glow) + ',' + Math.round(141 + 73 * glow) + ',' + Math.round(92 + 48 * glow) + ')' : '#b98d5c');
    // labels: FLUTING → LINER (top) → LINER (bottom) → all together
    const phase = t < 3.1 ? 1 : t < 4.9 ? 0 : t < 6.7 ? 2 : 3;
    if (phase !== lastPhase && labels.length === 3) {
      lastPhase = phase;
      labels.forEach((s, i) => s.classList.toggle('tl-now', phase === 3 || i === phase));
    }
  }

  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { render(9.6); return; }
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
    }).observe(box);
  } else { visible = true; requestAnimationFrame(tick); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pausedAt = performance.now(); else resume(); });
})();
