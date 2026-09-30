/* Packy's shared SVG face and event-driven animation controller. No AI state. */
(function () {
  'use strict';
  if (window.PackyCharacter) return;
  const records = new Map(), abort = new AbortController();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const SHAPE = "<svg class=\"hrg-mascot\" viewBox=\"0 0 200 200\" aria-hidden=\"true\" focusable=\"false\"><polygon points=\"29.0,49.2 12.9,68.2 52.1,31.2 68.2,12.3\" fill=\"#cea169\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"30.7,48.0 16.8,64.3 50.5,32.5 64.4,16.2\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.26\" stroke-width=\"1\" /><polygon points=\"187.1,56.8 171.0,75.8 171.0,154.8 187.1,135.8\" fill=\"#7f6340\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"186.0,63.7 172.1,80.0 172.1,147.9 186.0,131.6\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.10\" stroke-width=\"1\" /><polygon points=\"52.1,31.2 131.8,35.1 147.9,16.1 68.2,12.3\" fill=\"#cda168\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"58.8,30.2 127.3,33.5 141.2,17.2 72.7,13.9\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.26\" stroke-width=\"1\" /><polygon points=\"131.8,35.1 171.0,75.8 187.1,56.8 147.9,16.1\" fill=\"#9f7c51\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"135.6,36.6 169.3,71.6 183.2,55.3 149.5,20.3\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.17\" stroke-width=\"1\" /><polygon points=\"44.1,158.4 12.9,147.2 52.1,187.9\" fill=\"#b28e1a\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"43.0,159.2 16.2,149.6 49.9,184.6\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.12\" stroke-width=\"1\" /><polygon points=\"52.1,187.9 131.8,191.7 123.8,162.2 44.1,158.4\" fill=\"#7f6340\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"57.1,186.1 125.6,189.4 118.8,164.0 50.3,160.7\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.10\" stroke-width=\"1\" /><polygon points=\"44.1,79.4 12.9,68.2 12.9,147.2 44.1,158.4\" fill=\"#c39863\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"41.9,84.1 15.1,74.5 15.1,142.4 41.9,152.0\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.24\" stroke-width=\"1\" /><polygon points=\"131.8,191.7 171.0,154.8 123.8,162.2\" fill=\"#9b2457\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"133.2,188.6 166.9,156.8 126.4,163.2\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.10\" stroke-width=\"1\" /><polygon points=\"52.1,31.2 12.9,68.2 44.1,79.4\" fill=\"#3884f8\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"49.9,35.2 16.2,67.0 43.0,76.6\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.31\" stroke-width=\"1\" /><polygon points=\"171.0,154.8 171.0,75.8 123.8,83.2 123.8,162.2\" fill=\"#94744b\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"167.7,149.8 167.7,81.8 127.1,88.2 127.1,156.1\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.14\" stroke-width=\"1\" /><polygon points=\"123.8,83.2 131.8,35.1 52.1,31.2 44.1,79.4\" fill=\"#e3b173\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"118.8,79.6 125.6,38.2 57.1,34.9 50.3,76.3\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.31\" stroke-width=\"1\" /><polygon points=\"123.8,83.2 171.0,75.8 131.8,35.1\" fill=\"#3f9c48\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><polygon points=\"126.4,80.6 166.9,74.2 133.2,39.2\" fill=\"none\" stroke=\"#fff3dc\" stroke-opacity=\"0.23\" stroke-width=\"1\" /><polygon points=\"123.8,162.2 123.8,83.2 44.1,79.4 44.1,158.4\" fill=\"#0e1114\" stroke=\"#4d361f\" stroke-opacity=\".8\" stroke-width=\"1.3\" stroke-linejoin=\"round\" /><g transform=\"matrix(79.691,3.840,0.000,78.981,44.13,79.38)\"><rect x=\".05\" y=\".05\" width=\".9\" height=\".9\" rx=\".2\" fill=\"#12171b\" /><ellipse cx=\".5\" cy=\".42\" rx=\".42\" ry=\".3\" fill=\"#1b2328\" opacity=\".7\" /></g><g transform=\"matrix(79.691,3.840,-7.945,48.159,52.08,31.22)\" class=\"p-hr-logo\"><g transform=\"translate(.5 .5) scale(0.000795 0.000955) translate(-510 -512)\"><polygon points=\"138,297 510,85 578,125 205,338 205,605 138,570\" fill=\"#1470ae\" /><polygon points=\"580,202 648,162 880,297 880,727 812,765 812,335\" fill=\"#62a843\" /><polygon points=\"138,648 510,860 745,730 745,805 510,940 138,727\" fill=\"#f8e21a\" /><path d=\"M248,362 H305 V482 H500 V540 H305 V660 L248,640 Z M500,362 L680,362 A89,89 0 0 1 680,540 L560,540 L560,660 L500,660 L500,482 L680,482 A31,31 0 0 0 680,420 L518,420 Z M600,540 L672,540 L770,660 L695,660 Z\" fill=\"#e62e7b\" /></g></g></svg>";
  const cream = '#fff1d6';
  const eye = (x,y,w,h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w/2}" fill="${cream}"/>`;
  const line = d => `<path d="${d}" fill="none" stroke="${cream}" stroke-width=".065" stroke-linecap="round"/>`;
  const oval = (x,y,rx,ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${cream}"/>`;
  const EXPRESSIONS = {
    friendly: { eyes:eye(.17,.32,.23,.22)+eye(.6,.32,.23,.22), mouth:'M.35 .7 Q.5 .84 .65 .7', brows:'' },
    happy: { eyes:line('M.17 .49 Q.285 .27 .4 .49 M.6 .49 Q.715 .27 .83 .49'), mouth:'M.28 .66 Q.5 1 .72 .66 Z', brows:'' },
    curious: { eyes:eye(.17,.29,.23,.27)+eye(.6,.37,.23,.16), mouth:'M.37 .7 Q.51 .85 .67 .68', brows:line('M.16 .23 Q.27 .12 .4 .2 M.61 .29 L.81 .29') },
    focused: { eyes:eye(.17,.3,.23,.25)+eye(.6,.3,.23,.25), mouth:'M.41 .72 Q.5 .79 .59 .72', brows:line('M.18 .23 Q.28 .19 .39 .23 M.61 .23 Q.72 .19 .82 .23') },
    thinking: { eyes:eye(.17,.3,.23,.19)+eye(.6,.3,.23,.24), mouth:'M.35 .71 Q.5 .88 .67 .68', brows:line('M.17 .23 L.4 .23 M.6 .21 Q.72 .12 .83 .19') },
    surprised: { eyes:oval(.285,.43,.135,.175)+oval(.715,.43,.135,.175), mouth:'M.32 .66 Q.5 .95 .68 .66 Q.5 .73 .32 .66 Z', brows:line('M.17 .17 Q.28 .08 .4 .17 M.6 .17 Q.72 .08 .83 .17') },
    playful: { eyes:line('M.17 .46 Q.285 .35 .4 .46')+eye(.6,.3,.23,.25), mouth:'M.3 .69 Q.51 .94 .72 .64', brows:line('M.61 .21 Q.72 .13 .83 .21') },
    reassuring: { eyes:eye(.17,.36,.23,.16)+eye(.6,.36,.23,.16), mouth:'M.31 .69 Q.5 .9 .69 .69', brows:line('M.17 .29 Q.28 .24 .4 .29 M.6 .29 Q.72 .24 .83 .29') },
    // Gentle concern appears only after a blocked attempt with invalid box dimensions.
    worried: { eyes:eye(.17,.35,.23,.2)+eye(.6,.35,.23,.2), mouth:'M.38 .77 Q.5 .69 .62 .77', brows:line('M.17 .28 Q.29 .26 .4 .18 M.6 .18 Q.71 .26 .83 .28') }
  };
  let frame=0, timer=0, dirty=true, pointer=null, scrollUntil=0, scrollGaze=0, previousY=scrollY, previousTime=performance.now();
  let guided=null, guideUntil=0, observer;
  const listen=(target,name,fn,options={}) => target.addEventListener(name,fn,{...options,signal:abort.signal});
  function render({size='compact'}={}) {
    const face=`<g class="p-face-plane" transform="matrix(79.691,3.840,0,78.981,44.13,79.38)"><rect x=".05" y=".05" width=".9" height=".9" fill="transparent" pointer-events="none"/><g class="p-gaze" transform="translate(0.0000 0.0000)"><g class="p-blink"><g class="p-expression-eyes"></g></g></g><g class="p-brows"></g><path class="p-mouth" fill="none" stroke="${cream}" stroke-width=".06" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    return SHAPE.replace('<svg ',`<svg data-packy-size="${size}" data-expression="friendly" `).replace('</svg>',face+'</svg>');
  }
  function register(svg) {
    if(records.has(svg)) return records.get(svg);
    const record={svg,face:svg.querySelector('.p-face-plane'),gaze:svg.querySelector('.p-gaze'),blink:svg.querySelector('.p-blink'),eyes:svg.querySelector('.p-expression-eyes'),brows:svg.querySelector('.p-brows'),mouth:svg.querySelector('.p-mouth'),base:'friendly',expression:'',until:0,x:0,y:0,rect:null,nextBlink:performance.now()+3500,blinkUntil:0,tapUntil:0,taps:0,hover:false};
    records.set(svg,record); paint(record,'friendly');
    const button=svg.closest('button');
    if(button) {
      listen(button,'pointerenter',()=>{record.hover=true;wake();},{passive:true});
      listen(button,'pointerleave',()=>{record.hover=false;wake();},{passive:true});
      listen(button,'focus',()=>{record.hover=true;wake();});
      listen(button,'blur',()=>{record.hover=false;wake();});
    }
    dirty=true;return record;
  }
  function scan(root=document) {
    if(root.matches?.('.hrg-mascot')) register(root);
    root.querySelectorAll?.('.hrg-mascot').forEach(register);
    for(const [svg] of records) if(!svg.isConnected) records.delete(svg);
    wake();
  }
  function paint(r,name) {
    if(r.expression===name) return;
    const shape=EXPRESSIONS[name]||EXPRESSIONS.friendly;
    r.expression=name;r.svg.dataset.expression=name;r.eyes.innerHTML=shape.eyes;r.brows.innerHTML=shape.brows;
    r.mouth.setAttribute('d',shape.mouth);
    r.mouth.setAttribute('fill',name==='happy'||name==='surprised'?cream:'none');
  }
  function set(host,name,duration=0) {
    host?.querySelectorAll('.hrg-mascot').forEach(svg=>{
      const r=register(svg);
      if(duration) {r.transient=name;r.until=performance.now()+duration;} else {r.base=name;r.until=0;}
      paint(r,name);
    });dirty=true;wake();
  }
  function tap(host) {
    host?.querySelectorAll('.hrg-mascot').forEach(svg=>{
      const r=register(svg),now=performance.now();
      if(now<r.tapUntil) return;
      r.tapUntil=now+(motion.matches?150:720);r.transient=['happy','playful','reassuring'][r.taps++%3];r.until=now+900;
      paint(r,r.transient);
      if(!motion.matches){svg.classList.remove('is-tapped');void svg.getBoundingClientRect();svg.classList.add('is-tapped');r.blinkUntil=now+110;}
    });wake();
  }
  function guide(target) {if(!target)return;guided=target;guideUntil=performance.now()+850;dirty=true;wake();}
  function clearGuide(){guided=null;guideUntil=0;wake();}
  function visible(r) {
    const host=r.svg.closest('.hrg-hero,.hrg-launch,.hrg-panel,.hrg-tour');
    if(!r.svg.isConnected || r.svg.closest('[hidden]') || !host) return false;
    const style=getComputedStyle(host),rect=r.svg.getBoundingClientRect();
    return style.visibility!=='hidden'&&Number(style.opacity)>.05&&rect.width>0&&rect.bottom>0&&rect.top<innerHeight;
  }
  function wake(){clearTimeout(timer);timer=0;if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
  function tick(now) {
    frame=0;if(document.hidden)return;
    let unsettled=false,deadline=Infinity;
    for(const r of records.values()) {
      if(dirty||!r.rect){r.visible=visible(r);if(r.visible)r.rect=r.face.getBoundingClientRect();}
      if(!r.visible) continue;
      if(r.until&&now>=r.until)r.until=0;
      paint(r,r.until?r.transient:r.hover&&r.base==='friendly'?'curious':r.base);
      let x=0,y=0,aim=null;
      if(!motion.matches) {
        if(guided?.isConnected&&now<guideUntil){const g=guided.getBoundingClientRect();aim={x:g.left+g.width/2,y:g.top+Math.min(g.height,100)/2};}
        else if(now<scrollUntil)y=scrollGaze;
        else if(pointer)aim=pointer;
        else if(r.expression==='thinking'){x=-.018;y=-.025;}
        if(aim){const dx=aim.x-(r.rect.left+r.rect.width/2),dy=aim.y-(r.rect.top+r.rect.height*.43);const d=Math.hypot(dx,dy)||1,k=Math.min(1,d/220);x=dx/d*.045*k;y=dy/d*.035*k;}
      }
      r.x+=(x-r.x)*.2;r.y+=(y-r.y)*.2;
      if(Math.abs(x-r.x)+Math.abs(y-r.y)<.0005){r.x=x;r.y=y;}
      if(motion.matches){r.x=0;r.y=0;}
      r.gaze.setAttribute('transform',`translate(${r.x.toFixed(4)} ${r.y.toFixed(4)})`);
      if(!motion.matches && now>=r.nextBlink){r.blinkUntil=now+110;r.nextBlink=now+4200;}
      r.blink.setAttribute('transform',!motion.matches&&now<r.blinkUntil?'translate(0 .43) scale(1 .12) translate(0 -.43)':'');
      if(now>=r.tapUntil&&r.svg.classList.contains('is-tapped'))r.svg.classList.remove('is-tapped');
      unsettled ||= !motion.matches&&(Math.abs(x-r.x)+Math.abs(y-r.y)>.0005||now<r.blinkUntil);
      if(now<r.until)deadline=Math.min(deadline,r.until);
      if(now<r.tapUntil)deadline=Math.min(deadline,r.tapUntil);
      if(!motion.matches)deadline=Math.min(deadline,r.nextBlink);
    }
    dirty=false;
    // No permanent RAF loop: only animate an active response or settling gaze.
    if(unsettled||(!motion.matches&&(now<scrollUntil||now<guideUntil)))wake();
    else if(Number.isFinite(deadline))timer=setTimeout(wake,Math.max(16,deadline-now));
  }
  listen(window,'pointermove',e=>{if(e.pointerType!=='mouse')return;pointer={x:e.clientX,y:e.clientY};scrollUntil=0;dirty=true;wake();},{passive:true});
  listen(document.documentElement,'pointerleave',()=>{pointer=null;wake();},{passive:true});
  listen(window,'pointerout',e=>{if(!e.relatedTarget){pointer=null;wake();}},{passive:true});
  listen(window,'blur',()=>{pointer=null;wake();});
  listen(window,'scroll',()=>{
    const now=performance.now(),delta=scrollY-previousY,elapsed=Math.max(16,now-previousTime);
    previousY=scrollY;previousTime=now;dirty=true;
    if(delta){scrollGaze=Math.sign(delta)*Math.min(.035,.012+Math.abs(delta)/elapsed*.012);scrollUntil=now+500;pointer=null;wake();}
  },{passive:true});
  listen(window,'resize',()=>{dirty=true;wake();},{passive:true});
  listen(document,'visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);clearTimeout(timer);frame=timer=0;for(const r of records.values()){r.svg.classList.remove('is-tapped');r.tapUntil=0;}}else{previousY=scrollY;previousTime=performance.now();dirty=true;wake();}});
  listen(motion,'change',()=>{dirty=true;wake();});
  let dimensionConcern=false;
  function dimensionsValid() {
    return ['length','width','height'].every(id=>{
      const input=document.getElementById(id);
      return input && input.value.trim()!=='' && Number(input.value)>=20 && Number(input.value)<=1200 && input.validity.valid;
    });
  }
  listen(document,'input',e=>{
    if(!e.target.closest('.config-controls'))return;
    if(dimensionConcern) {
      if(dimensionsValid()){dimensionConcern=false;set(document.body,'reassuring',1200);}
      else set(document.body,'worried',Infinity);
    } else set(document.body,'thinking',800);
  },{passive:true});
  listen(document,'change',e=>{if(e.target.id==='box-style'&&!dimensionConcern)set(document.body,'surprised',850);},{passive:true});
  listen(document,'click',e=>{
    if(!e.target.closest('#config-cta'))return;
    if(!dimensionsValid()){dimensionConcern=true;set(document.body,'worried',Infinity);}
    else {
      dimensionConcern=false;
      const controls=document.querySelector('.config-controls');
      if(controls?.checkValidity())set(document.body,'reassuring',1600);
    }
  },{passive:true});
  observer=new MutationObserver(list=>{for(const m of list){if(m.type==='attributes'&&m.target.matches('body,.hrg-hero,.hrg-launch,.hrg-panel,.hrg-tour')){dirty=true;wake();}for(const node of m.addedNodes)if(node.nodeType===1&&(node.matches('.hrg-mascot')||node.querySelector('.hrg-mascot')))scan(node);}});
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class']});
  listen(window,'pagehide',e=>{cancelAnimationFrame(frame);clearTimeout(timer);frame=timer=0;if(!e.persisted){observer.disconnect();abort.abort();records.clear();}});
  listen(window,'pageshow',()=>{dirty=true;wake();});
  window.PackyCharacter={render,set,tap,guide,clearGuide,expressions:Object.keys(EXPRESSIONS)};
  scan();
})();
