// ═══════════════════════════════════════════════════════════════
// KAGE (影) — The Shadow  ·  v2
// Poly samurai companion · Three.js r128
// Smaller · Straw hat (kasa) · Visible katana · Diagonal popup
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  function boot() {
    if (typeof THREE === 'undefined') { setTimeout(boot, 100); return; }
    init();
  }

  function init() {
    var css = document.createElement('style');
    css.textContent = [
'.kage-wrap{position:fixed;bottom:0;right:0;z-index:900;display:flex;flex-direction:column;align-items:flex-end;opacity:0;transform:translate(20px,20px);transition:opacity .8s ease,transform .8s ease;pointer-events:none}',
'.kage-wrap.visible{opacity:1;transform:translate(0,0);pointer-events:auto}',
'.kage-stage{width:90px;height:115px;background:transparent;position:relative;overflow:visible;cursor:pointer}',
'.kage-stage canvas{display:block;width:100%!important;height:100%!important}',
'.kage-tag{display:flex;align-items:center;gap:.3rem;padding-right:.6rem;margin-top:-.15rem}',
'.kage-name{font-family:"Space Mono",monospace;font-size:.4rem;text-transform:uppercase;letter-spacing:.2em;color:#4a4a4a;transition:color .3s}',
'.kage-kanji{font-family:"Noto Serif JP",serif;font-size:.7rem;color:rgba(139,26,26,.3);transition:color .3s}',
'.kage-wrap:hover .kage-name{color:#c4bfb6}',
'.kage-wrap:hover .kage-kanji{color:rgba(139,26,26,.6)}',
'.kage-tooltip{position:absolute;bottom:100%;right:60px;width:190px;border:1px solid rgba(139,26,26,.22);background:linear-gradient(135deg,rgba(139,26,26,.05),transparent 40%),rgba(10,10,11,.94);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);padding:.75rem;opacity:0;visibility:hidden;transform:translate(10px,10px) scale(.95);transform-origin:bottom right;transition:all .3s ease;pointer-events:none}',
'.kage-tooltip.show{opacity:1;visibility:visible;transform:translate(0,0) scale(1);pointer-events:auto}',
'.kage-tooltip::after{content:"";position:absolute;bottom:-5px;right:12px;width:8px;height:8px;background:rgba(10,10,11,.94);border-right:1px solid rgba(139,26,26,.22);border-bottom:1px solid rgba(139,26,26,.22);transform:rotate(45deg)}',
'.kt-head{display:flex;align-items:center;gap:.4rem;margin-bottom:.45rem;padding-bottom:.4rem;border-bottom:1px solid rgba(240,235,227,.06)}',
'.kt-kanji{font-family:"Noto Serif JP",serif;font-size:1.2rem;color:rgba(139,26,26,.35)}',
'.kt-title{font-family:"Zen Antique",serif;font-size:.78rem;color:#f0ebe3}',
'.kt-status{font-family:"Space Mono",monospace;font-size:.38rem;text-transform:uppercase;letter-spacing:.12em;color:#c23b3b;margin-bottom:.35rem;display:flex;align-items:center;gap:.35rem}',
'.kt-status::before{content:"";width:4px;height:4px;background:#c23b3b;border-radius:50%;animation:ktP 2s ease-in-out infinite}',
'@keyframes ktP{0%,100%{opacity:.3}50%{opacity:1}}',
'.kt-desc{font-size:.66rem;color:#c4bfb6;line-height:1.55;font-weight:300}',
'.kt-soon{font-family:"Space Mono",monospace;font-size:.36rem;text-transform:uppercase;letter-spacing:.1em;color:#4a4a4a;margin-top:.45rem}',
'[data-theme="light"] .kage-tooltip{background:linear-gradient(135deg,rgba(139,26,26,.04),transparent 40%),rgba(240,235,227,.95)}',
'[data-theme="light"] .kage-tooltip::after{background:rgba(240,235,227,.95);border-color:rgba(139,26,26,.15)}',
'[data-theme="light"] .kt-title{color:#1a1a1c}',
'[data-theme="light"] .kt-desc{color:#4a4540}',
'@media(max-width:600px){.kage-stage{width:72px;height:95px}.kage-tooltip{width:170px;right:50px}}'
    ].join('\n');
    document.head.appendChild(css);

    var wrap = document.createElement('div');
    wrap.className = 'kage-wrap';
    wrap.innerHTML = '<div class="kage-tooltip" id="kageTooltip"><div class="kt-head"><span class="kt-kanji">\u5F71</span><span class="kt-title">Kage</span></div><div class="kt-status">Shadow Protocol \u2014 Dormant</div><div class="kt-desc">Your guide through this portfolio. I watch, I wait, I remember.</div><div class="kt-soon">Activation \u2014 Coming Soon</div></div><div class="kage-stage" id="kageStage"></div><div class="kage-tag"><span class="kage-name">Kage</span><span class="kage-kanji">\u5F71</span></div>';
    document.body.appendChild(wrap);

    var stageEl = document.getElementById('kageStage');
    var tooltip = document.getElementById('kageTooltip');
    var W = 90, H = 115;

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    stageEl.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(28, W / H, 0.1, 50);
    camera.position.set(1.2, 1.8, 5.5);
    camera.lookAt(0, 1.1, 0);

    scene.add(new THREE.AmbientLight(0x666666, 0.8));
    var dirL = new THREE.DirectionalLight(0xf0ebe3, 1.0);
    dirL.position.set(4, 6, 5);
    scene.add(dirL);
    var rimL = new THREE.DirectionalLight(0x8b1a1a, 0.35);
    rimL.position.set(-3, 2, -2);
    scene.add(rimL);
    var faceL = new THREE.PointLight(0xffeedd, 0.3, 6);
    faceL.position.set(0, 2.2, 3);
    scene.add(faceL);

    var M = {
      ink:     new THREE.MeshLambertMaterial({ color: 0x0e0e10, flatShading: true }),
      cloth:   new THREE.MeshLambertMaterial({ color: 0x161619, flatShading: true }),
      crimson: new THREE.MeshLambertMaterial({ color: 0x8b1a1a, flatShading: true }),
      accent:  new THREE.MeshLambertMaterial({ color: 0x5c1212, flatShading: true }),
      steel:   new THREE.MeshLambertMaterial({ color: 0xa09a92, flatShading: true }),
      blade:   new THREE.MeshLambertMaterial({ color: 0xf0ebe3, flatShading: true }),
      skin:    new THREE.MeshLambertMaterial({ color: 0x221e1a, flatShading: true }),
      eye:     new THREE.MeshBasicMaterial({ color: 0xc23b3b }),
      straw:   new THREE.MeshLambertMaterial({ color: 0x8a7a58, flatShading: true }),
      strawDk: new THREE.MeshLambertMaterial({ color: 0x6b5d42, flatShading: true })
    };

    var kage = new THREE.Group();
    var P = {};

    // HEAD
    var headGrp = new THREE.Group();
    headGrp.position.y = 2.1;
    headGrp.add(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.46, 0.4), M.skin));
    var mask = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.14, 0.07), M.ink);
    mask.position.set(0, -0.1, 0.2); headGrp.add(mask);
    var egeo = new THREE.BoxGeometry(0.08, 0.03, 0.02);
    var eL = new THREE.Mesh(egeo, M.eye.clone()); eL.position.set(-0.09, 0.04, 0.21); headGrp.add(eL);
    var eR = new THREE.Mesh(egeo, M.eye.clone()); eR.position.set(0.09, 0.04, 0.21); headGrp.add(eR);
    P.eyeL = eL; P.eyeR = eR;

    // STRAW HAT (KASA)
    var kasa = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.35, 8), M.straw);
    kasa.position.y = 0.38; kasa.rotation.y = Math.PI / 8; headGrp.add(kasa);
    var kasaRing = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.7, 8), M.strawDk);
    kasaRing.rotation.x = Math.PI / 2; kasaRing.position.y = 0.21; kasaRing.rotation.z = Math.PI / 8; headGrp.add(kasaRing);
    var kasaTip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.1, 4), M.crimson);
    kasaTip.position.y = 0.56; kasaTip.rotation.y = Math.PI / 4; headGrp.add(kasaTip);
    kage.add(headGrp); P.head = headGrp;

    // TORSO
    var torsoGrp = new THREE.Group(); torsoGrp.position.y = 1.48;
    torsoGrp.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.3), M.cloth));
    var sash = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.31), M.crimson);
    sash.rotation.z = -0.35; sash.position.set(0.04, 0, 0.003); torsoGrp.add(sash);
    var knot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), M.steel);
    knot.rotation.z = Math.PI / 4; knot.position.set(-0.16, -0.13, 0.16); torsoGrp.add(knot);
    var sode = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.28), M.crimson);
    sode.position.set(-0.3, 0.28, 0); sode.rotation.z = 0.2; torsoGrp.add(sode);
    kage.add(torsoGrp); P.torso = torsoGrp;

    // COAT PANELS
    var cL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.55, 0.22), M.cloth);
    cL.position.set(-0.27, 1.28, 0.04); kage.add(cL); P.coatL = cL;
    var cR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.55, 0.22), M.cloth);
    cR.position.set(0.27, 1.28, 0.04); kage.add(cR); P.coatR = cR;
    var tL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.03), M.cloth);
    tL.position.set(-0.17, 1.0, -0.15); kage.add(tL); P.tailL = tL;
    var tR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.03), M.cloth);
    tR.position.set(0.17, 1.0, -0.15); kage.add(tR); P.tailR = tR;

    // ARMS
    var aL = new THREE.Group(); aL.position.set(-0.34, 1.35, 0);
    aL.add(new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.28, 0.13), M.cloth));
    var fL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.24, 0.11), M.ink); fL.position.y = -0.26; aL.add(fL);
    var hL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), M.skin); hL.position.y = -0.42; aL.add(hL);
    kage.add(aL); P.armL = aL;

    var aR = new THREE.Group(); aR.position.set(0.34, 1.35, 0);
    aR.add(new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.28, 0.13), M.cloth));
    var fR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.24, 0.11), M.ink); fR.position.y = -0.26; aR.add(fR);
    var hR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), M.skin); hR.position.y = -0.42; aR.add(hR);
    aR.rotation.x = -0.12; kage.add(aR); P.armR = aR;

    // HAKAMA + OBI
    var hak = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 0.72, 4), M.ink);
    hak.position.y = 0.68; hak.rotation.y = Math.PI / 4; kage.add(hak);
    var obi = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.32), M.accent);
    obi.position.y = 1.06; kage.add(obi);

    // FEET
    var fg = new THREE.BoxGeometry(0.11, 0.05, 0.17);
    var f1 = new THREE.Mesh(fg, M.ink); f1.position.set(-0.12, 0.025, 0.02); kage.add(f1);
    var f2 = new THREE.Mesh(fg, M.ink); f2.position.set(0.12, 0.025, 0.02); kage.add(f2);

    // KATANA — right side, angled outward, visible blade
    var katGrp = new THREE.Group();
    katGrp.position.set(0.35, 1.15, 0.05);
    katGrp.rotation.z = 0.6;
    katGrp.rotation.x = -0.15;
    var bl = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.85, 0.012), M.blade);
    katGrp.add(bl);
    var blGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.035, 0.85, 0.004),
      new THREE.MeshBasicMaterial({ color: 0xf0ebe3, transparent: true, opacity: 0.15 })
    );
    blGlow.position.z = 0.01; katGrp.add(blGlow);
    var tsu = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.012, 0.1), M.steel);
    tsu.position.y = -0.43; tsu.rotation.y = Math.PI / 4; katGrp.add(tsu);
    var tsk = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.2, 0.035), M.crimson);
    tsk.position.y = -0.54; katGrp.add(tsk);
    var ksh = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.04), M.steel);
    ksh.position.y = -0.65; katGrp.add(ksh);
    kage.add(katGrp); P.katana = katGrp; P.bladeGlow = blGlow;

    // PLATFORM
    var plat = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.04, 8),
      new THREE.MeshLambertMaterial({ color: 0x0c0c0e, flatShading: true }));
    plat.position.y = -0.02; scene.add(plat);
    var ring = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.46, 8),
      new THREE.MeshBasicMaterial({ color: 0x8b1a1a, side: THREE.DoubleSide, transparent: true, opacity: 0.2 }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.005; scene.add(ring); P.ring = ring;

    // PARTICLES
    var PC = 10, pGeo = new THREE.BufferGeometry(), pArr = new Float32Array(PC * 3), pVel = [];
    for (var i = 0; i < PC; i++) {
      pArr[i*3] = (Math.random()-0.5)*0.8; pArr[i*3+1] = Math.random()*2.2; pArr[i*3+2] = (Math.random()-0.5)*0.8;
      pVel.push(0.002 + Math.random()*0.005);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
    var pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xc23b3b, size: 0.025, transparent: true, opacity: 0.3 }));
    scene.add(pts);

    kage.rotation.y = 0.25;
    scene.add(kage);

    // ANIMATION
    var t = 0, hovered = false, targetRot = 0.25, curRot = 0.25;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.016;
      P.torso.scale.y = 1 + Math.sin(t*1.4)*0.01;
      P.head.position.y = 2.1 + Math.sin(t*1.4)*0.004;
      var sw = hovered ? targetRot : 0.25 + Math.sin(t*0.4)*0.08;
      curRot += (sw - curRot) * 0.04; kage.rotation.y = curRot;
      P.coatL.rotation.x = Math.sin(t*1.8)*0.03;
      P.coatR.rotation.x = Math.sin(t*1.8+0.8)*0.03;
      P.tailL.rotation.x = Math.sin(t*1.2)*0.025;
      P.tailR.rotation.x = Math.sin(t*1.2+1)*0.025;
      P.armL.rotation.x = Math.sin(t*0.8)*0.025;
      P.armR.rotation.x = Math.sin(t*0.8+Math.PI)*0.02 - 0.12;
      var ei = hovered ? 1.0 : 0.5 + Math.sin(t*2.2)*0.35;
      var ec = new THREE.Color(ei*0.76, ei*0.23, ei*0.23);
      P.eyeL.material.color.copy(ec); P.eyeR.material.color.copy(ec);
      P.bladeGlow.material.opacity = 0.1 + Math.sin(t*1.5)*0.06;
      P.ring.rotation.z += 0.003;
      var pp = pts.geometry.attributes.position.array;
      for (var i = 0; i < PC; i++) {
        pp[i*3+1] += pVel[i];
        if (pp[i*3+1] > 2.5) { pp[i*3+1] = 0; pp[i*3] = (Math.random()-0.5)*0.6; pp[i*3+2] = (Math.random()-0.5)*0.6; }
      }
      pts.geometry.attributes.position.needsUpdate = true;
      faceL.intensity = hovered ? 0.5 : 0.3;
      renderer.render(scene, camera);
    }
    animate();

    // VISIBILITY (hide when game overlay open)
    setInterval(function() {
      var ac2 = document.getElementById('ac2');
      wrap.style.display = (ac2 && ac2.classList.contains('open')) ? 'none' : '';
    }, 500);

    // ENTRANCE
    setTimeout(function() {
      wrap.classList.add('visible');
      setTimeout(function() {
        var v = 0, iv = setInterval(function() {
          v += 0.025;
          P.head.rotation.x = Math.sin(v * Math.PI) * 0.18;
          if (v >= 1) { clearInterval(iv); P.head.rotation.x = 0; }
        }, 16);
      }, 350);
    }, 2000);

    // INTERACTIONS
    stageEl.addEventListener('mouseenter', function() { hovered = true; });
    stageEl.addEventListener('mouseleave', function() { hovered = false; targetRot = 0.25; });
    stageEl.addEventListener('mousemove', function(e) {
      if (!hovered) return;
      var r = stageEl.getBoundingClientRect();
      targetRot = 0.25 + ((e.clientX - r.left) / r.width - 0.5) * 0.6;
    });
    stageEl.addEventListener('touchstart', function() { hovered = true; }, { passive: true });
    stageEl.addEventListener('touchend', function() {
      setTimeout(function() { hovered = false; targetRot = 0.25; }, 1200);
    }, { passive: true });

    var ttOpen = false;
    stageEl.addEventListener('click', function(e) {
      e.stopPropagation(); ttOpen = !ttOpen;
      tooltip.classList.toggle('show', ttOpen);
    });
    document.addEventListener('click', function() {
      if (ttOpen) { ttOpen = false; tooltip.classList.remove('show'); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
