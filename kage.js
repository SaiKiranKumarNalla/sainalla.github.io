// ═══════════════════════════════════════════════════════════════
// KAGE — v3: light brown face, complete kasa, katana on back,
//   draws katana on hover, diagonal stance, no label text
// ═══════════════════════════════════════════════════════════════
(function(){
'use strict';
function boot(){if(typeof THREE==='undefined'){setTimeout(boot,100);return;}go();}

function go(){
var css=document.createElement('style');
css.textContent='.kw{position:fixed;bottom:0;right:0;z-index:900;display:flex;flex-direction:column;align-items:flex-end;opacity:0;transform:translate(16px,16px);transition:opacity .8s,transform .8s;pointer-events:none}.kw.vis{opacity:1;transform:translate(0,0);pointer-events:auto}.ks{width:80px;height:110px;background:0;position:relative;overflow:visible;cursor:pointer}.ks canvas{display:block;width:100%!important;height:100%!important}.ktt{position:absolute;bottom:100%;right:55px;width:185px;border:1px solid rgba(139,26,26,.2);background:linear-gradient(135deg,rgba(139,26,26,.05),transparent 40%),rgba(10,10,11,.94);backdrop-filter:blur(12px);padding:.7rem;opacity:0;visibility:hidden;transform:translate(8px,8px) scale(.95);transform-origin:bottom right;transition:all .3s;pointer-events:none}.ktt.show{opacity:1;visibility:visible;transform:translate(0,0) scale(1);pointer-events:auto}.ktt::after{content:"";position:absolute;bottom:-5px;right:10px;width:8px;height:8px;background:rgba(10,10,11,.94);border-right:1px solid rgba(139,26,26,.2);border-bottom:1px solid rgba(139,26,26,.2);transform:rotate(45deg)}.kth{display:flex;align-items:center;gap:.4rem;margin-bottom:.4rem;padding-bottom:.35rem;border-bottom:1px solid rgba(240,235,227,.06)}.kth b{font-family:"Noto Serif JP",serif;font-size:1.1rem;color:rgba(139,26,26,.35)}.kth span{font-family:"Zen Antique",serif;font-size:.75rem;color:#f0ebe3}.kts{font-family:"Space Mono",monospace;font-size:.36rem;text-transform:uppercase;letter-spacing:.12em;color:#c23b3b;margin-bottom:.3rem;display:flex;align-items:center;gap:.3rem}.kts::before{content:"";width:4px;height:4px;background:#c23b3b;border-radius:50%;animation:kp 2s ease-in-out infinite}@keyframes kp{0%,100%{opacity:.3}50%{opacity:1}}.ktd{font-size:.64rem;color:#c4bfb6;line-height:1.5;font-weight:300}.ktf{font-family:"Space Mono",monospace;font-size:.34rem;text-transform:uppercase;letter-spacing:.1em;color:#4a4a4a;margin-top:.4rem}html[data-theme="light"] .ktt{background:linear-gradient(135deg,rgba(139,26,26,.04),transparent 40%),rgba(240,235,227,.95)}html[data-theme="light"] .ktt::after{background:rgba(240,235,227,.95);border-color:rgba(139,26,26,.12)}html[data-theme="light"] .kth span{color:#1a1a1c}html[data-theme="light"] .ktd{color:#4a4540}@media(max-width:600px){.ks{width:65px;height:90px}.ktt{width:165px;right:45px}}';
document.head.appendChild(css);

var wrap=document.createElement('div');wrap.className='kw';
wrap.innerHTML='<div class="ktt" id="ktt"><div class="kth"><b>\u5F71</b><span>Kage</span></div><div class="kts">Shadow Protocol \u2014 Dormant</div><div class="ktd">Your guide through this portfolio. I watch, I wait, I remember.</div><div class="ktf">Activation \u2014 Coming Soon</div></div><div class="ks" id="ks"></div>';
document.body.appendChild(wrap);

var stage=document.getElementById('ks'),tip=document.getElementById('ktt');
var W=80,H=110;

var r=new THREE.WebGLRenderer({antialias:true,alpha:true});
r.setSize(W,H);r.setPixelRatio(Math.min(window.devicePixelRatio,2));
stage.appendChild(r.domElement);

var sc=new THREE.Scene();
var cam=new THREE.PerspectiveCamera(26,W/H,0.1,50);
cam.position.set(1.8,1.7,5.2);cam.lookAt(0,1.05,0);

sc.add(new THREE.AmbientLight(0x888888,0.9));
var dl=new THREE.DirectionalLight(0xfff5e8,1.1);dl.position.set(4,7,5);sc.add(dl);
var rl=new THREE.DirectionalLight(0x8b1a1a,0.3);rl.position.set(-3,2,-2);sc.add(rl);
var fl=new THREE.PointLight(0xffe8cc,0.35,6);fl.position.set(0,2.3,3);sc.add(fl);

// Materials — higher contrast
var M={
  body:new THREE.MeshLambertMaterial({color:0x2a2835,flatShading:true}),
  cloth:new THREE.MeshLambertMaterial({color:0x1f1d28,flatShading:true}),
  crim:new THREE.MeshLambertMaterial({color:0xa02020,flatShading:true}),
  accent:new THREE.MeshLambertMaterial({color:0x661515,flatShading:true}),
  steel:new THREE.MeshLambertMaterial({color:0xb0a89e,flatShading:true}),
  blade:new THREE.MeshLambertMaterial({color:0xf5f0e8,flatShading:true}),
  skin:new THREE.MeshLambertMaterial({color:0xc4a47a,flatShading:true}),
  skinDk:new THREE.MeshLambertMaterial({color:0xa88a62,flatShading:true}),
  eye:new THREE.MeshBasicMaterial({color:0xdd4444}),
  brow:new THREE.MeshLambertMaterial({color:0x3a2a1a,flatShading:true}),
  hat:new THREE.MeshLambertMaterial({color:0xa89060,flatShading:true}),
  hatDk:new THREE.MeshLambertMaterial({color:0x887046,flatShading:true})
};

var kg=new THREE.Group(),P={};

// HEAD
var hd=new THREE.Group();hd.position.y=2.08;

// Face — light brown, U-shape (box + chin box)
var face=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.40,0.38),M.skin);
hd.add(face);
// Chin (makes U shape)
var chin=new THREE.Mesh(new THREE.BoxGeometry(0.32,0.12,0.28),M.skin);
chin.position.set(0,-0.24,0.02);hd.add(chin);
// Jaw sides (U shape sides)
var jawL=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.14,0.28),M.skinDk);
jawL.position.set(-0.18,-0.18,0.02);hd.add(jawL);
var jawR=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.14,0.28),M.skinDk);
jawR.position.set(0.18,-0.18,0.02);hd.add(jawR);

// Eyes — larger, more visible
var eg=new THREE.BoxGeometry(0.09,0.04,0.02);
var eL=new THREE.Mesh(eg,M.eye.clone());eL.position.set(-0.1,0.04,0.2);hd.add(eL);
var eR=new THREE.Mesh(eg,M.eye.clone());eR.position.set(0.1,0.04,0.2);hd.add(eR);
P.eL=eL;P.eR=eR;

// Eyebrows — dark, above eyes
var bg=new THREE.BoxGeometry(0.12,0.025,0.03);
var bL=new THREE.Mesh(bg,M.brow);bL.position.set(-0.1,0.1,0.19);bL.rotation.z=0.1;hd.add(bL);
var bR=new THREE.Mesh(bg,M.brow);bR.position.set(0.1,0.1,0.19);bR.rotation.z=-0.1;hd.add(bR);

// KASA — full conical straw hat
var kasa=new THREE.Mesh(new THREE.ConeGeometry(0.75,0.4,12),M.hat);
kasa.position.y=0.36;hd.add(kasa);
// Bottom disc to complete the hat
var kasaBot=new THREE.Mesh(new THREE.CircleGeometry(0.75,12),M.hatDk);
kasaBot.rotation.x=Math.PI/2;kasaBot.position.y=0.16;hd.add(kasaBot);
// Tip accent
var kasaTip=new THREE.Mesh(new THREE.ConeGeometry(0.06,0.12,4),M.crim);
kasaTip.position.y=0.57;kasaTip.rotation.y=Math.PI/4;hd.add(kasaTip);

kg.add(hd);P.head=hd;

// TORSO
var tg=new THREE.Group();tg.position.y=1.45;
tg.add(new THREE.Mesh(new THREE.BoxGeometry(0.48,0.62,0.28),M.body));
// Sash
var sash=new THREE.Mesh(new THREE.BoxGeometry(0.055,0.66,0.29),M.crim);
sash.rotation.z=-0.35;sash.position.set(0.04,0,0.003);tg.add(sash);
// Knot
var knot=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.07,0.04),M.steel);
knot.rotation.z=Math.PI/4;knot.position.set(-0.14,-0.12,0.15);tg.add(knot);
// Left shoulder plate
var sode=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.055,0.26),M.crim);
sode.position.set(-0.28,0.26,0);sode.rotation.z=0.18;tg.add(sode);
kg.add(tg);P.torso=tg;

// COAT PANELS
var cL=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.5,0.2),M.cloth);cL.position.set(-0.25,1.25,0.03);kg.add(cL);P.cL=cL;
var cR=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.5,0.2),M.cloth);cR.position.set(0.25,1.25,0.03);kg.add(cR);P.cR=cR;
var tL=new THREE.Mesh(new THREE.BoxGeometry(0.14,0.28,0.03),M.cloth);tL.position.set(-0.15,0.98,-0.14);kg.add(tL);P.tL=tL;
var tR=new THREE.Mesh(new THREE.BoxGeometry(0.14,0.28,0.03),M.cloth);tR.position.set(0.15,0.98,-0.14);kg.add(tR);P.tR=tR;

// ARMS
var aL=new THREE.Group();aL.position.set(-0.32,1.32,0);
aL.add(new THREE.Mesh(new THREE.BoxGeometry(0.12,0.26,0.12),M.body));
var fAL=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.22,0.1),M.cloth);fAL.position.y=-0.24;aL.add(fAL);
var hL=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.08,0.08),M.skin);hL.position.y=-0.38;aL.add(hL);
kg.add(aL);P.aL=aL;

var aR=new THREE.Group();aR.position.set(0.32,1.32,0);
aR.add(new THREE.Mesh(new THREE.BoxGeometry(0.12,0.26,0.12),M.body));
var fAR=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.22,0.1),M.cloth);fAR.position.y=-0.24;aR.add(fAR);
var hR=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.08,0.08),M.skin);hR.position.y=-0.38;aR.add(hR);
kg.add(aR);P.aR=aR;

// HAKAMA + OBI
var hak=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.33,0.68,4),M.cloth);
hak.position.y=0.66;hak.rotation.y=Math.PI/4;kg.add(hak);
var obi=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.07,0.3),M.accent);
obi.position.y=1.02;kg.add(obi);

// FEET
var fg=new THREE.BoxGeometry(0.1,0.045,0.16);
kg.add(Object.assign(new THREE.Mesh(fg,M.cloth),{position:new THREE.Vector3(-0.11,0.022,0.02)}));
kg.add(Object.assign(new THREE.Mesh(fg,M.cloth),{position:new THREE.Vector3(0.11,0.022,0.02)}));

// KATANA — on the back, handle up near right shoulder, blade down
var katG=new THREE.Group();
// Back position: handle near right shoulder, blade pointing down-left
katG.position.set(0.1,1.6,-0.18);
katG.rotation.set(0.1,0,-0.5); // angled across back

var bladeM=new THREE.Mesh(new THREE.BoxGeometry(0.022,0.82,0.01),M.blade);
katG.add(bladeM);
var blGlow=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.82,0.003),
  new THREE.MeshBasicMaterial({color:0xf5f0e8,transparent:true,opacity:0.12}));
blGlow.position.z=0.008;katG.add(blGlow);
var tsu=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.01,0.09),M.steel);
tsu.position.y=0.42;tsu.rotation.y=Math.PI/4;katG.add(tsu);
var tsk=new THREE.Mesh(new THREE.BoxGeometry(0.03,0.18,0.03),M.crim);
tsk.position.y=0.52;katG.add(tsk);
var ksh=new THREE.Mesh(new THREE.BoxGeometry(0.035,0.02,0.035),M.steel);
ksh.position.y=0.62;katG.add(ksh);
kg.add(katG);P.kat=katG;P.blGlow=blGlow;

// Katana target positions
var katBack={px:0.1,py:1.6,pz:-0.18,rx:0.1,ry:0,rz:-0.5};
var katReady={px:0.42,py:1.05,pz:0.15,rx:-0.3,ry:0,rz:0.8};

// PLATFORM
sc.add(new THREE.Mesh(new THREE.CylinderGeometry(0.38,0.42,0.035,8),
  new THREE.MeshLambertMaterial({color:0x0c0c0e,flatShading:true})).translateY(-0.018));
var ring=new THREE.Mesh(new THREE.RingGeometry(0.36,0.42,8),
  new THREE.MeshBasicMaterial({color:0x8b1a1a,side:THREE.DoubleSide,transparent:true,opacity:0.18}));
ring.rotation.x=-Math.PI/2;ring.position.y=0.002;sc.add(ring);P.ring=ring;

// PARTICLES
var PC=8,pG=new THREE.BufferGeometry(),pA=new Float32Array(PC*3),pV=[];
for(var i=0;i<PC;i++){pA[i*3]=(Math.random()-.5)*.7;pA[i*3+1]=Math.random()*2;pA[i*3+2]=(Math.random()-.5)*.7;pV.push(.002+Math.random()*.004);}
pG.setAttribute('position',new THREE.BufferAttribute(pA,3));
var pts=new THREE.Points(pG,new THREE.PointsMaterial({color:0xc23b3b,size:0.02,transparent:true,opacity:0.25}));
sc.add(pts);

// Diagonal stance
kg.rotation.y=0.35;
sc.add(kg);

// ANIMATION
var t=0,hov=false,tgtR=0.35,curR=0.35,katLerp=0;

function lerp(a,b,f){return a+(b-a)*f;}

function anim(){
  requestAnimationFrame(anim);t+=0.016;

  // Breathing
  P.torso.scale.y=1+Math.sin(t*1.4)*.01;
  P.head.position.y=2.08+Math.sin(t*1.4)*.003;

  // Sway
  var sw=hov?tgtR:0.35+Math.sin(t*.4)*.06;
  curR+=(sw-curR)*.04;kg.rotation.y=curR;

  // Coat flutter
  P.cL.rotation.x=Math.sin(t*1.8)*.025;P.cR.rotation.x=Math.sin(t*1.8+.8)*.025;
  P.tL.rotation.x=Math.sin(t*1.2)*.02;P.tR.rotation.x=Math.sin(t*1.2+1)*.02;

  // Arms
  P.aL.rotation.x=Math.sin(t*.8)*.02;
  P.aR.rotation.x=hov?-0.3:Math.sin(t*.8+Math.PI)*.02;

  // Eyes
  var ei=hov?1:0.5+Math.sin(t*2.2)*.35;
  var ec=new THREE.Color(ei*.86,ei*.27,ei*.27);
  P.eL.material.color.copy(ec);P.eR.material.color.copy(ec);

  // Blade glow
  P.blGlow.material.opacity=0.08+Math.sin(t*1.5)*.05;

  // Katana lerp: back (0) → ready (1)
  var katTarget=hov?1:0;
  katLerp+=(katTarget-katLerp)*.06;
  P.kat.position.set(
    lerp(katBack.px,katReady.px,katLerp),
    lerp(katBack.py,katReady.py,katLerp),
    lerp(katBack.pz,katReady.pz,katLerp)
  );
  P.kat.rotation.set(
    lerp(katBack.rx,katReady.rx,katLerp),
    lerp(katBack.ry,katReady.ry,katLerp),
    lerp(katBack.rz,katReady.rz,katLerp)
  );

  // Head bow on hover
  P.head.rotation.x=hov?0.12:Math.sin(t*.6)*.015;

  P.ring.rotation.z+=.003;

  // Particles
  var pp=pts.geometry.attributes.position.array;
  for(var i=0;i<PC;i++){pp[i*3+1]+=pV[i];if(pp[i*3+1]>2.2){pp[i*3+1]=0;pp[i*3]=(Math.random()-.5)*.6;pp[i*3+2]=(Math.random()-.5)*.6;}}
  pts.geometry.attributes.position.needsUpdate=true;

  fl.intensity=hov?.5:.35;
  r.render(sc,cam);
}
anim();

// Visibility
setInterval(function(){var a=document.getElementById('ac2');wrap.style.display=(a&&a.classList.contains('open'))?'none':'';},500);

// Entrance
setTimeout(function(){wrap.classList.add('vis');
  setTimeout(function(){var v=0;var iv=setInterval(function(){v+=.03;P.head.rotation.x=Math.sin(v*Math.PI)*.2;if(v>=1){clearInterval(iv);P.head.rotation.x=0;}},16);},300);
},2000);

// Interactions
stage.addEventListener('mouseenter',function(){hov=true;});
stage.addEventListener('mouseleave',function(){hov=false;tgtR=0.35;});
stage.addEventListener('mousemove',function(e){if(!hov)return;var rc=stage.getBoundingClientRect();tgtR=0.35+((e.clientX-rc.left)/rc.width-.5)*.5;});
stage.addEventListener('touchstart',function(){hov=true;},{passive:true});
stage.addEventListener('touchend',function(){setTimeout(function(){hov=false;tgtR=0.35;},1500);},{passive:true});

var ttO=false;
stage.addEventListener('click',function(e){e.stopPropagation();ttO=!ttO;tip.classList.toggle('show',ttO);});
document.addEventListener('click',function(){if(ttO){ttO=false;tip.classList.remove('show');}});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
