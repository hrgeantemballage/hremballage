/* Decorative packaging-production animation. HTML timeline provides all text. */
(function(){
  const root = document.querySelector('.manufacturing-process-visual');
  if (!root) return;
  const cv = root.querySelector('canvas');
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const STEPS = Array(7).fill(null); // Labels stay in the site's existing, translated HTML timeline.
  const BRAND = ['#1470ae','#62a843','#f8e21a','#e62e7b'];
  const TAU = Math.PI*2;
  let W=0,H=0,k=1,X=[],SY=[],SU=[],SEG=[],TOTAL=0,P=0,L=0,SPEED=0,mobile=false;

  // The line is a path: one straight segment on desktop, a staircase on phones.
  function buildPath(pts){
    SEG=[]; let u=0;
    for (let i=0;i<pts.length-1;i++){
      const [x0,y0]=pts[i],[x1,y1]=pts[i+1], len=Math.hypot(x1-x0,y1-y0);
      if (len<.5) continue;
      SEG.push({x0,y0,len,u0:u,ang:Math.atan2(y1-y0,x1-x0)}); u+=len;
    }
    TOTAL=u;
  }
  function uOf(x,y){ // distance along the path of a point that lies on it
    for (const g of SEG){
      const dx=x-g.x0, dy=y-g.y0, d=dx*Math.cos(g.ang)+dy*Math.sin(g.ang);
      const off=Math.abs(-dx*Math.sin(g.ang)+dy*Math.cos(g.ang));
      if (off<1 && d>=-1 && d<=g.len+1) return g.u0+d;
    }
    return 0;
  }
  function segAt(u){ for (const g of SEG) if (u<=g.u0+g.len) return g; return SEG[SEG.length-1]; }
  function at(u, fn){ // draw in local coords centred at path point u
    const g=segAt(u), d=u-g.u0;
    ctx.save(); ctx.translate(g.x0+Math.cos(g.ang)*d, g.y0+Math.sin(g.ang)*d); ctx.rotate(g.ang); fn(); ctx.restore();
  }
  function along(u0,u1,fn){ // draw a stretch of the path, split per segment
    for (const g of SEG){
      const a=Math.max(u0,g.u0), b=Math.min(u1,g.u0+g.len);
      if (b<=a) continue;
      ctx.save(); ctx.translate(g.x0,g.y0); ctx.rotate(g.ang); fn(a-g.u0,b-g.u0,g.u0); ctx.restore();
    }
  }

  function resize(){
    W = root.clientWidth; H = root.clientHeight;
    if (W <= 0 || H <= 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, W < 700 ? 1.5 : 2);
    cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
    mobile = W < 700;
    if (!mobile){
      k = Math.max(.45, Math.min(1.15, W/1200));
      const mx = Math.max(W*0.07, 70*k);
      X = STEPS.map((_,i)=> mx + (W-2*mx)*i/6);
      SY = STEPS.map(()=> H*0.72);
      buildPath([[X[0]-40*k,SY[0]],[X[6]+40*k,SY[0]]]);
    } else {
      k = Math.max(.5, Math.min(.7, W/620));
      const mx = 56*k+10, top = H*0.43, bottom = H*0.90;
      X = STEPS.map((_,i)=> mx + (W-2*mx+20*k)*i/6);
      SY = STEPS.map((_,i)=> top + (bottom-top)*i/6);
      const a = (X[1]-X[0])*0.44, pts=[];
      X.forEach((x,i)=>{ pts.push([x-a,SY[i]]); pts.push([x+a,SY[i]]); });
      pts[0][0] = X[0]-40*k; pts[pts.length-1][0] = X[6]+30*k;
      buildPath(pts);
    }
    SU = X.map((x,i)=> uOf(x,SY[i]));
    P = 78*k; L = 56*k; SPEED = 38*k;
  }
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(root);
  else window.addEventListener('resize', resize);

  const gold = a => `rgba(230,197,135,${a})`;
  const kraft = a => `rgba(199,156,105,${a})`;
  const mod = (a,n) => ((a%n)+n)%n;

  function roller(x,y,r,ang,teeth,alpha){
    ctx.save(); ctx.translate(x,y); ctx.rotate(ang);
    ctx.strokeStyle = gold(alpha); ctx.lineWidth = 1.2;
    ctx.beginPath();
    if (teeth){
      for (let i=0;i<=teeth*2;i++){
        const a = i/(teeth*2)*TAU, rr = i%2 ? r : r*0.84;
        i ? ctx.lineTo(Math.cos(a)*rr, Math.sin(a)*rr) : ctx.moveTo(rr,0);
      }
    } else ctx.arc(0,0,r,0,TAU);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(0,0,r*0.22,0,TAU); ctx.stroke();
    for (let i=0;i<3;i++){ const a=i/3*TAU; ctx.beginPath(); ctx.moveTo(Math.cos(a)*r*.22,Math.sin(a)*r*.22); ctx.lineTo(Math.cos(a)*r*.7,Math.sin(a)*r*.7); ctx.stroke(); }
    ctx.restore();
  }

  // corrugated board drawn in local coords (x0..x1 on y=0); phase keeps flutes moving
  function flutes(x0,x1,phase,alpha){
    if (x1<=x0) return;
    const h = 5*k, wl = 9*k;
    ctx.strokeStyle = kraft(alpha); ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(x0,-h); ctx.lineTo(x1,-h); ctx.moveTo(x0,h); ctx.lineTo(x1,h); ctx.stroke();
    ctx.lineWidth = 1; ctx.beginPath();
    for (let x=x0;x<=x1;x+=1.5){ const yy = h*0.85*Math.sin((x+phase)/wl*TAU); x===x0?ctx.moveTo(x,yy):ctx.lineTo(x,yy); }
    ctx.stroke();
  }

  function printMark(cx,y,a){
    const w = 5*k;
    BRAND.forEach((c,i)=>{ ctx.globalAlpha = a; ctx.fillStyle=c; ctx.fillRect(cx-2*w+i*w, y-6.5*k, w-1, 2.4*k); });
    ctx.globalAlpha = 1;
  }

  function frame(t){
    const s = t*SPEED;
    ctx.clearRect(0,0,W,H);

    // travelling light along the path
    const lu = mod(t/9,1)*(TOTAL+160*k) - 60*k;
    const lp = {x:0,y:0}; { const g=segAt(Math.max(0,Math.min(TOTAL,lu))), d=Math.max(0,Math.min(TOTAL,lu))-g.u0; lp.x=g.x0+Math.cos(g.ang)*d; lp.y=g.y0+Math.sin(g.ang)*d; }
    const gl = ctx.createRadialGradient(lp.x, lp.y, 0, lp.x, lp.y, 240*k);
    gl.addColorStop(0, gold(.13)); gl.addColorStop(1, gold(0));
    ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
    if (!mobile){
      ctx.strokeStyle = gold(.04); ctx.lineWidth = 1;
      for (let x = mod(-s*.3, 48*k); x < W; x += 48*k){ ctx.beginPath(); ctx.moveTo(x, SY[0]+30*k); ctx.lineTo(x - 60*k, H); ctx.stroke(); }
    }

    // rail under the whole line
    along(0, TOTAL, (a,b)=>{ ctx.strokeStyle = gold(.18); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a,16*k); ctx.lineTo(b,16*k); ctx.stroke(); });
    along(SU[3], SU[6], (a,b,u0)=>{ ctx.setLineDash([2*k,16*k]); ctx.lineDashOffset = -(s - u0); ctx.lineWidth = 3*k; ctx.strokeStyle = gold(.14);
      ctx.beginPath(); ctx.moveTo(a,20*k); ctx.lineTo(b,20*k); ctx.stroke(); ctx.setLineDash([]); });

    // 01 raw paper
    const r1 = 40*k, r2 = 28*k;
    const c1 = {x:X[0], y:SY[0]-66*k}, c2 = {x:X[0]-40*k, y:SY[0]-24*k};
    [[c1,r1],[c2,r2]].forEach(([c,r])=>{
      ctx.fillStyle = kraft(.10); ctx.beginPath(); ctx.arc(c.x,c.y,r,0,TAU); ctx.fill();
      ctx.strokeStyle = kraft(.55); ctx.lineWidth = 1.2;
      for (let rr=r; rr>r*.3; rr-=5*k){ ctx.beginPath(); ctx.arc(c.x,c.y,rr,0,TAU); ctx.globalAlpha = rr===r?1:.35; ctx.stroke(); }
      ctx.globalAlpha = 1;
      roller(c.x,c.y,r*.3,s/(r*.9),0,.6);
    });
    ctx.setLineDash([7*k,7*k]); ctx.lineDashOffset = -s; ctx.strokeStyle = kraft(.6); ctx.lineWidth = 1.3;
    const e2x = X[1]-18*k, e2y = SY[1];
    ctx.beginPath(); ctx.moveTo(c1.x, c1.y+r1); ctx.quadraticCurveTo(e2x-42*k, e2y-5*k, e2x, e2y-5*k); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(c2.x, c2.y+r2); ctx.quadraticCurveTo(e2x-52*k, e2y+5*k, e2x, e2y+5*k); ctx.stroke();
    ctx.setLineDash([]);

    // 02 corrugation
    roller(X[1], SY[1]-24*k, 19*k,  s/(19*k), 12, .6);
    roller(X[1], SY[1]+24*k, 19*k, -s/(19*k), 12, .6);
    ctx.strokeStyle = gold(.18); ctx.lineWidth = 1;
    for (let i=0;i<3;i++){
      const ph = mod(t*0.5 + i/3, 1), yy = SY[1]-50*k - ph*50*k;
      ctx.globalAlpha = Math.sin(ph*Math.PI);
      ctx.beginPath();
      for (let j=0;j<=20;j++){ const yj = yy - j*1.4*k; const xj = X[1] + (i-1)*12*k + Math.sin(j/3 + t*2 + i)*3*k; j?ctx.lineTo(xj,yj):ctx.moveTo(xj,yj); }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    along(SU[1]+19*k, SU[3], (a,b,u0)=> flutes(a,b,u0-s,.6));

    // 03 printing
    roller(X[2], SY[2]-32*k, 24*k,  s/(24*k), 0, .55);
    roller(X[2], SY[2]+20*k, 12*k, -s/(12*k), 0, .45);
    ctx.strokeStyle = gold(.3); ctx.beginPath(); ctx.arc(X[2], SY[2]-32*k, 28*k, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    for (let u = SU[3] - mod(SU[3] - SU[2] - s, P); u > SU[2]+8*k; u -= P) at(u, ()=>printMark(0,0,.8));
    for (let i=0;i<4;i++){ const a = s/(24*k) + i*TAU/4; ctx.fillStyle = BRAND[i]; ctx.globalAlpha=.8; ctx.beginPath(); ctx.arc(X[2]+Math.cos(a)*24*k, SY[2]-32*k+Math.sin(a)*24*k, 2.2*k, 0, TAU); ctx.fill(); }
    ctx.globalAlpha = 1;

    // 04 die cutting
    roller(X[3], SY[3]-30*k, 22*k,  s/(22*k), 0, .55);
    roller(X[3], SY[3]+20*k, 12*k, -s/(12*k), 0, .45);
    ctx.strokeStyle = gold(.7); ctx.lineWidth = 1.6;
    for (let i=0;i<3;i++){
      const a = s/(22*k) + i*TAU/3;
      ctx.beginPath(); ctx.moveTo(X[3]+Math.cos(a)*22*k, SY[3]-30*k+Math.sin(a)*22*k); ctx.lineTo(X[3]+Math.cos(a)*29*k, SY[3]-30*k+Math.sin(a)*29*k); ctx.stroke();
    }

    // pieces: flat sheet -> folded -> checked -> stacked
    const folded = {w:L*.58, h:24*k};
    for (let c = SU[3] + mod(s - SU[3], P) - P; c < SU[6]; c += P){
      if (c + L/2 < SU[3]) continue;
      let fp = Math.max(0, Math.min(1, (c - (SU[4]-26*k)) / (52*k)));
      fp = fp<.5 ? 2*fp*fp : 1-Math.pow(-2*fp+2,2)/2;
      const w = L + (folded.w - L)*fp, h = 10*k + (folded.h - 10*k)*fp;
      if (c + w/2 > SU[6] - folded.w*0.5) continue;
      const left = Math.max(-w/2, SU[3] - c), right = w/2;
      const qc = Math.max(0, 1 - Math.abs(c - SU[5]) / (w*0.7));
      at(c, ()=>{
        const top = 5*k - h;
        ctx.fillStyle = kraft(.14 + .1*fp); ctx.fillRect(left, top, right-left, h);
        ctx.strokeStyle = qc > 0 ? `rgba(127,227,160,${.5+.5*qc})` : kraft(.7);
        ctx.lineWidth = 1.2; ctx.strokeRect(left, top, right-left, h);
        if (fp < .2) flutes(left+1, right-1, c - s, .35);
        if (left < -10*k) printMark(0, fp>.5 ? top+12*k : 0, .85);
        if (fp > .9){ ctx.strokeStyle = kraft(.4); ctx.beginPath(); ctx.moveTo(left, top+6*k); ctx.lineTo(right, top+6*k); ctx.stroke(); }
      });
    }

    // 05 folding & gluing
    const y4 = SY[4];
    ctx.strokeStyle = gold(.45); ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(X[4]-30*k, y4+14*k); ctx.lineTo(X[4]-30*k, y4-44*k); ctx.quadraticCurveTo(X[4], y4-62*k, X[4]+30*k, y4-44*k); ctx.lineTo(X[4]+30*k, y4+14*k); ctx.stroke();
    for (let i=0;i<2;i++){ const ph = mod(t*1.4 + i*.5, 1); ctx.fillStyle = gold(.7*(1-ph)); ctx.beginPath(); ctx.arc(X[4]-6*k+i*12*k, y4-44*k + ph*26*k, 1.8*k, 0, TAU); ctx.fill(); }

    // 06 quality control
    const y5 = SY[5], sweep = Math.sin(t*2.2)*.5+.5;
    const bg = ctx.createLinearGradient(0, y5-80*k, 0, y5+10*k);
    bg.addColorStop(0, 'rgba(127,227,160,0)'); bg.addColorStop(1, 'rgba(127,227,160,.28)');
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.moveTo(X[5]-3*k, y5-74*k); ctx.lineTo(X[5]+3*k, y5-74*k); ctx.lineTo(X[5]+(14+10*sweep)*k, y5+8*k); ctx.lineTo(X[5]-(14+10*sweep)*k, y5+8*k); ctx.fill();
    ctx.strokeStyle = gold(.5); ctx.strokeRect(X[5]-12*k, y5-84*k, 24*k, 10*k);
    ctx.fillStyle = 'rgba(127,227,160,.9)'; ctx.beginPath(); ctx.arc(X[5]+7*k, y5-79*k, 1.8*k, 0, TAU); ctx.fill();

    // 07 finished packaging
    const y6 = SY[6];
    const arrived = Math.floor((s - (SU[6] - folded.w*.5 - SU[3])) / P);
    const count = arrived < 0 ? 0 : (arrived % 6) + 1;
    ctx.strokeStyle = gold(.4); ctx.beginPath(); ctx.moveTo(X[6]-24*k, y6+9*k); ctx.lineTo(X[6]+24*k, y6+9*k); ctx.stroke();
    for (let i=0;i<count;i++){
      const bx = X[6] - folded.w/2 + (i%2 ? 3*k : 0), by = y6 + 5*k - folded.h*(i+1);
      ctx.fillStyle = kraft(.22); ctx.fillRect(bx, by, folded.w, folded.h);
      ctx.strokeStyle = kraft(.75); ctx.strokeRect(bx, by, folded.w, folded.h);
      ctx.beginPath(); ctx.moveTo(bx, by+6*k); ctx.lineTo(bx+folded.w, by+6*k); ctx.stroke();
      printMark(bx+folded.w/2, by+13*k, .85);
    }


  }

  // Draw only while visible; cap frame rate and respect reduced motion.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = false, scheduled = false, elapsed = 0, origin = performance.now(), lastPaint = 0;
  const drawStill = () => { if (W > 0 && H > 0) frame(6); };
  if (reduce) {
    drawStill();
    if ('ResizeObserver' in window) new ResizeObserver(drawStill).observe(root);
    else window.addEventListener('resize', drawStill);
    return;
  }
  function schedule() {
    if (visible && !document.hidden && !scheduled) {
      scheduled = true;
      requestAnimationFrame(tick);
    }
  }
  function tick(now) {
    scheduled = false;
    if (!visible || document.hidden) return;
    const interval = mobile ? 50 : 33;
    if (now - lastPaint >= interval) {
      elapsed = (now - origin) / 1000;
      frame(elapsed);
      lastPaint = now;
    }
    schedule();
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        origin = performance.now() - elapsed * 1000;
        schedule();
      } else if (!entry.isIntersecting) visible = false;
    }, { rootMargin: '80px' }).observe(root);
  } else { visible = true; schedule(); }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { origin = performance.now() - elapsed * 1000; schedule(); }
  });
})();
