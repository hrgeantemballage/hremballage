/* Section 09 "Responsible design": one small looping illustration per principle card.
   01 Recyclability · 02 Material optimization · 03 Waste reduction · 04 Efficient design.
   Pure CSS animation on inline SVG; it only runs while the section is on screen. */
(function () {
  const section = document.getElementById('sustainability');
  const cards = section ? Array.from(section.querySelectorAll('.principle-grid article')) : [];
  if (cards.length !== 4) return;
  const kraft = '#c9a575', dark = '#9b7448', sage = '#8db889';
  const box = (x, y, w, h, cls) => '<g class="' + (cls || '') + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="1.5" fill="' + kraft + '" stroke="' + dark + '" stroke-width="1.2"/><line x1="' + x + '" y1="' + (y + h * .32) + '" x2="' + (x + w) + '" y2="' + (y + h * .32) + '" stroke="' + dark + '" stroke-width="1"/><rect x="' + (x + w / 2 - 2) + '" y="' + y + '" width="4" height="' + (h * .32) + '" fill="#e3c796"/></g>';
  const tick = '<g class="e-tick"><circle cx="100" cy="16" r="9" fill="none" stroke="' + sage + '" stroke-width="2"/><path d="M95.5 16.5 L99 20 L105 12.5" fill="none" stroke="' + sage + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>';
  const wave = (x0, x1, y, a) => { let d = ''; for (let x = x0; x <= x1; x += 2) d += (x === x0 ? 'M' : 'L') + x + ' ' + (y + a * Math.sin((x - x0) / 8 * Math.PI)).toFixed(1); return d; };

  const art = [
    // 01 recyclability: a turning recovery loop around a box
    '<g class="e-loop"><circle cx="60" cy="40" r="24" fill="none" stroke="' + sage + '" stroke-width="3" stroke-dasharray="37.2 13.07" stroke-linecap="round"/>' +
      '<path d="M56.3 63.7 L60.4 58.0 L60.6 70.0 Z M41.3 25.0 L44.2 31.3 L33.7 25.5 Z M82.4 31.3 L75.4 30.7 L85.7 24.5 Z" fill="' + sage + '"/></g>' +
      box(51, 34, 18, 13, 'e-core'),
    // 02 material optimization: an over-built double wall is trimmed to the board the product needs
    '<g class="e-extra"><rect x="22" y="48" width="76" height="3" fill="' + kraft + '"/><path d="' + wave(22, 98, 55, 3) + '" fill="none" stroke="' + dark + '" stroke-width="1.4"/></g>' +
      '<rect x="22" y="60" width="76" height="3" fill="' + kraft + '"/><path d="' + wave(22, 98, 67, 3) + '" fill="none" stroke="' + dark + '" stroke-width="1.4"/><rect x="22" y="71" width="76" height="3" fill="' + kraft + '"/>' +
      '<g class="e-prod"><rect x="44" y="26" width="32" height="22" rx="3" fill="' + sage + '" opacity=".9"/><rect x="50" y="31" width="20" height="3" rx="1.5" fill="#0c1512" opacity=".45"/></g>' + tick,
    // 03 waste reduction: an oversized box shrinks to fit the product; the offcuts fall away
    '<g class="e-scraps"><rect class="e-s1" x="14" y="16" width="10" height="7" fill="' + kraft + '"/><rect class="e-s2" x="100" y="36" width="9" height="8" fill="' + kraft + '"/><rect class="e-s3" x="12" y="60" width="9" height="7" fill="' + kraft + '"/><rect class="e-s4" x="96" y="60" width="10" height="8" fill="' + kraft + '"/></g>' +
      '<rect class="e-prod3" x="46" y="31" width="28" height="20" rx="3" fill="' + sage + '" opacity=".9"/>' +
      '<rect class="e-fit" x="22" y="12" width="76" height="58" rx="3" fill="none" stroke="' + kraft + '" stroke-width="2.4" stroke-dasharray="6 4"/>' + tick,
    // 04 efficient design: boxes stack neatly on a pallet, then the load leaves for transport
    '<g class="e-load">' +
      '<rect x="24" y="64" width="72" height="4" fill="' + dark + '"/><rect x="28" y="68" width="6" height="5" fill="' + dark + '"/><rect x="57" y="68" width="6" height="5" fill="' + dark + '"/><rect x="86" y="68" width="6" height="5" fill="' + dark + '"/>' +
      box(28, 50, 20, 14, 'e-b e-b1') + box(50, 50, 20, 14, 'e-b e-b2') + box(72, 50, 20, 14, 'e-b e-b3') +
      box(28, 36, 20, 14, 'e-b e-b4') + box(50, 36, 20, 14, 'e-b e-b5') + box(72, 36, 20, 14, 'e-b e-b6') +
    '</g><path class="e-road" d="M14 76 H106" stroke="' + sage + '" stroke-width="1.5" stroke-dasharray="4 5" opacity=".6"/>'
  ];
  cards.forEach((card, i) => {
    const holder = document.createElement('div');
    holder.className = 'eco-ico eco-' + (i + 1);
    holder.setAttribute('aria-hidden', 'true');
    holder.innerHTML = '<svg viewBox="0 0 120 80" focusable="false">' + art[i] + '</svg>';
    const num = card.querySelector('b');
    card.insertBefore(holder, num ? num.nextSibling : card.firstChild);
  });
  section.classList.add('eco-ready');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => section.classList.toggle('eco-run', e.isIntersecting), { rootMargin: '60px' }).observe(section);
  } else section.classList.add('eco-run');
})();
