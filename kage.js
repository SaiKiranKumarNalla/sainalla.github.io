// ═══════════════════════════════════════════════════════════════
// KAGE (影) — The Shadow
// Poly samurai companion · Three.js r128
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  /* ─── Wait for Three.js ─────────────────────────────────── */
  function boot() {
    if (typeof THREE === 'undefined') { setTimeout(boot, 100); return; }
    init();
  }

  function init() {

    /* ── CSS ─────────────────────────────────────────────────── */
    const css = document.createElement('style');
    css.textContent = `
.kage-wrap{position:fixed;bottom:1.4rem;right:1.4rem;z-index:900;display:flex;flex-direction:column;align-items:center;gap:.35rem;opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s ease;pointer-events:none}
.kage-wrap.visible{opacity:1;transform:translateY(0);pointer-events:auto}
.kage-stage{width:140px;height:190px;border:1px solid rgba(240,235,227,.06);background:rgba(10,10,11,.65);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);position:relative;overflow:hidden;cursor:pointer;transition:border-color .35s,box-shadow .35s}
.kage-stage:hover{border-color:rgba(139,26,26,.35);box-shadow:0 0 28px rgba(139,26,26,.12)}
.kage-stage::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#8b1a1a,transparent);opacity:.4;transition:opacity .3s}
.kage-stage:hover::before{opacity:.8}
.kage-stage canvas{display:block;width:100%!important;height:100%!important}
.kage-tag{display:flex;align-items:center;gap:.45rem}
.kage-name{font-family:'Space Mono',monospace;font-size:.48rem;text-transform:uppercase;letter-spacing:.22em;color:#4a4a4a;transition:color .3s}
.kage-kanji{font-family:'Noto Serif JP',serif;font-size:.85rem;color:rgba(139,26,26,.35);transition:color .3s}
.kage-wrap:hover .kage-name{color:#c4bfb6}
.kage-wrap:hover .kage-kanji{color:rgba(139,26,26,.65)}
.kage-tooltip{position:absolute;bottom:calc(100% + .6rem);right:0;width:200px;border:1px solid rgba(139,26,26,.25);background:linear-gradient(135deg,rgba(139,26,26,.06),transparent 40%),rgba(10,10,11,.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);padding:.85rem;opacity:0;visibility:hidden;transform:translateY(6px);transition:all .3s ease;pointer-events:none}
.kage-tooltip.show{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto}
.kage-tooltip::after{content:'';position:absolute;bottom:-6px;right:20px;width:10px;height:10px;background:rgba(10,10,11,.95);border-right:1px solid rgba(139,26,26,.25);border-bottom:1px solid rgba(139,26,26,.25);transform:rotate(45deg)}
.kt-head{display:flex;align-items:center;gap:.5rem;margin-bottom:.55rem;padding-bottom:.5rem;border-bottom:1px solid rgba(240,235,227,.06)}
.kt-kanji{font-family:'Noto Serif JP',serif;font-size:1.4rem;color:rgba(139,26,26,.4)}
.kt-title{font-family:'Zen Antique',serif;font-size:.85rem;color:#f0ebe3}
.kt-status{font-family:'Space Mono',monospace;font-size:.42rem;text-transform:uppercase;letter-spacing:.14em;color:#c23b3b;margin-bottom:.45rem;display:flex;align-items:center;gap:.4rem}
.kt-status::before{content:'';width:5px;height:5px;background:#c23b3b;border-radius:50%;animation:ktPulse 2s ease-in-out infinite}
@keyframes ktPulse{0%,100%{opacity:.3}50%{opacity:1}}
.kt-desc{font-size:.72rem;color:#c4bfb6;line-height:1.6;font-weight:300}
.kt-soon{font-family:'Space Mono',monospace;font-size:.4rem;text-transform:uppercase;letter-spacing:.12em;color:#4a4a4a;margin-top:.55rem}
@media(max-width:600px){.kage-wrap{bottom:1rem;right:1rem}.kage-stage{width:110px;height:155px}}
`;
    document.head.appendChild(css);

    /* ── DOM ─────────────────────────────────────────────────── */
    const wrap = document.createElement('div');
    wrap.className = 'kage-wrap';
    wrap.innerHTML = `
      <div class="kage-tooltip" id="kageTooltip">
        <div class="kt-head"><span class="kt-kanji">影</span><span class="kt-title">Kage</span></div>
        <div class="kt-status">Shadow Protocol — Dormant</div>
        <div class="kt-desc">Your guide through this portfolio. I watch, I wait, I remember.</div>
        <div class="kt-soon">Activation — Coming Soon</div>
      </div>
      <div class="kage-stage" id="kageStage"></div>
      <div class="kage-tag"><span class="kage-name">Kage</span><span class="kage-kanji">影</span></div>
    `;
    document.body.appendChild(wrap);

    const stage = document.getElementById('kageStage');
    const tooltip = document.getElementById('kageTooltip');
    const W = 140, H = 190;

    /* ── Three.js Scene ──────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding || 3001;
    stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 50);
    camera.position.set(0, 1.6, 5.8);
    camera.lookAt(0, 1.15, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0x555555, 0.7));
    const dirLight = new THREE.DirectionalLight(0xf0ebe3, 0.9);
    dirLight.position.set(3, 6, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x8b1a1a, 0.4);
    rimLight.position.set(-3, 3, -2);
    scene.add(rimLight);
    const faceLight = new THREE.PointLight(0x8b1a1a, 0.25, 6);
    faceLight.position.set(0, 2.2, 3);
    scene.add(faceLight);

    /* ── Materials ────────────────────────────────────────────── */
    const M = {
      ink:     new THREE.MeshLambertMaterial({ color: 0x0e0e10, flatShading: true }),
      cloth:   new THREE.MeshLambertMaterial({ color: 0x141418, flatShading: true }),
      crimson: new THREE.MeshLambertMaterial({ color: 0x8b1a1a, flatShading: true }),
      accent:  new THREE.MeshLambertMaterial({ color: 0x5c1212, flatShading: true }),
      steel:   new THREE.MeshLambertMaterial({ color: 0x9a9590, flatShading: true }),
      blade:   new THREE.MeshLambertMaterial({ color: 0xf0ebe3, flatShading: true }),
      skin:    new THREE.MeshLambertMaterial({ color: 0x1e1c1a, flatShading: true }),
      eye:     new THREE.MeshBasicMaterial({ color: 0xc23b3b }),
      glow:    new THREE.MeshBasicMaterial({ color: 0x8b1a1a, transparent: true, opacity: 0.15 }),
    };

    /* ── Build Kage ──────────────────────────────────────────── */
    const kage = new THREE.Group();
    const parts = {};

    // ─ Head ─
    const headGrp = new THREE.Group();
    headGrp.position.y = 2.15;

    // Skull
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.52, 0.46), M.skin);
    headGrp.add(skull);

    // Hood — angular, pointed, layered
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.3, 0.56), M.cloth);
    hood.position.y = 0.18;
    headGrp.add(hood);

    const hoodTop = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.52), M.cloth);
    hoodTop.position.y = 0.35;
    headGrp.add(hoodTop);

    // Hood peak — crimson-tipped cone (4 sides for angular look)
    const peak = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.28, 4), M.crimson);
    peak.position.y = 0.54;
    peak.rotation.y = Math.PI / 4;
    headGrp.add(peak);

    // Hood brim (front overhang casting shadow on face)
    const brim = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.06, 0.16), M.cloth);
    brim.position.set(0, 0.12, 0.25);
    brim.rotation.x = -0.15;
    headGrp.add(brim);

    // Face wrap / mask
    const wrap2 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.08), M.ink);
    wrap2.position.set(0, -0.12, 0.22);
    headGrp.add(wrap2);

    // Eyes — narrow slits, glowing crimson
    const eyeGeo = new THREE.BoxGeometry(0.1, 0.035, 0.02);
    const eyeL = new THREE.Mesh(eyeGeo, M.eye.clone());
    eyeL.position.set(-0.11, 0.02, 0.24);
    headGrp.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, M.eye.clone());
    eyeR.position.set(0.11, 0.02, 0.24);
    headGrp.add(eyeR);
    parts.eyeL = eyeL;
    parts.eyeR = eyeR;

    kage.add(headGrp);
    parts.head = headGrp;

    // ─ Torso ─
    const torsoGrp = new THREE.Group();
    torsoGrp.position.y = 1.5;

    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.72, 0.34), M.cloth);
    torsoGrp.add(chest);

    // Diagonal sash
    const sash = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.78, 0.35), M.crimson);
    sash.rotation.z = -0.38;
    sash.position.set(0.05, 0, 0.005);
    torsoGrp.add(sash);

    // Sash knot / medallion (rotated diamond)
    const knot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.06), M.steel);
    knot.rotation.z = Math.PI / 4;
    knot.position.set(-0.18, -0.15, 0.18);
    torsoGrp.add(knot);

    // Left shoulder guard (sode) — crimson plate
    const sodeGrp = new THREE.Group();
    sodeGrp.position.set(-0.34, 0.32, 0);

    const sodeMain = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.32), M.crimson);
    sodeGrp.add(sodeMain);
    const sodeLower = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.28), M.accent);
    sodeLower.position.y = -0.07;
    sodeGrp.add(sodeLower);

    // Crest on shoulder (small triangle)
    const crest = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 3), M.steel);
    crest.position.set(0, 0.08, 0.1);
    sodeGrp.add(crest);
    sodeGrp.rotation.z = 0.18;
    torsoGrp.add(sodeGrp);

    kage.add(torsoGrp);
    parts.torso = torsoGrp;

    // ─ Haori (open coat panels) ─
    const coatL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.65, 0.28), M.cloth);
    coatL.position.set(-0.3, 1.3, 0.04);
    kage.add(coatL);
    parts.coatL = coatL;

    const coatR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.65, 0.28), M.cloth);
    coatR.position.set(0.3, 1.3, 0.04);
    kage.add(coatR);
    parts.coatR = coatR;

    // Coat tails (longer back panels)
    const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.04), M.cloth);
    tailL.position.set(-0.2, 1.0, -0.17);
    kage.add(tailL);
    parts.tailL = tailL;

    const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.04), M.cloth);
    tailR.position.set(0.2, 1.0, -0.17);
    kage.add(tailR);
    parts.tailR = tailR;

    // ─ Arms ─
    const armLGrp = new THREE.Group();
    armLGrp.position.set(-0.38, 1.38, 0);
    const upperArmL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.32, 0.15), M.cloth);
    armLGrp.add(upperArmL);
    const forearmL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.28, 0.13), M.ink);
    forearmL.position.y = -0.3;
    armLGrp.add(forearmL);
    // Wrist wrap
    const wristL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.14), M.crimson);
    wristL.position.y = -0.18;
    armLGrp.add(wristL);
    const handL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), M.skin);
    handL.position.y = -0.48;
    armLGrp.add(handL);
    kage.add(armLGrp);
    parts.armL = armLGrp;

    const armRGrp = new THREE.Group();
    armRGrp.position.set(0.38, 1.38, 0);
    const upperArmR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.32, 0.15), M.cloth);
    armRGrp.add(upperArmR);
    const forearmR = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.28, 0.13), M.ink);
    forearmR.position.y = -0.3;
    armRGrp.add(forearmR);
    const wristR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.14), M.crimson);
    wristR.position.y = -0.18;
    armRGrp.add(wristR);
    const handR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), M.skin);
    handR.position.y = -0.48;
    armRGrp.add(handR);
    // Right hand rests near katana handle
    armRGrp.rotation.z = 0.08;
    armRGrp.rotation.x = -0.1;
    kage.add(armRGrp);
    parts.armR = armRGrp;

    // ─ Hakama (lower robes — wide, angular) ─
    const hakama = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.4, 0.8, 4),
      M.ink
    );
    hakama.position.y = 0.7;
    hakama.rotation.y = Math.PI / 4;
    kage.add(hakama);
    parts.hakama = hakama;

    // Obi belt
    const obi = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.1, 0.36), M.accent);
    obi.position.y = 1.1;
    kage.add(obi);

    // ─ Feet (sandals) ─
    const footGeo = new THREE.BoxGeometry(0.13, 0.06, 0.2);
    const footL = new THREE.Mesh(footGeo, M.ink);
    footL.position.set(-0.14, 0.03, 0.02);
    kage.add(footL);
    const footR = new THREE.Mesh(footGeo, M.ink);
    footR.position.set(0.14, 0.03, 0.02);
    kage.add(footR);

    // ─ Katana (on back, diagonal) ─
    const katanaGrp = new THREE.Group();
    katanaGrp.position.set(0.12, 1.65, -0.2);
    katanaGrp.rotation.z = 0.2;

    // Blade
    const bladeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.95, 0.015), M.blade);
    katanaGrp.add(bladeMesh);

    // Tsuba (crossguard — rotated square)
    const tsuba = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.015, 0.12), M.steel);
    tsuba.position.y = -0.48;
    tsuba.rotation.y = Math.PI / 4;
    katanaGrp.add(tsuba);

    // Handle (tsuka)
    const tsuka = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.04), M.crimson);
    tsuka.position.y = -0.6;
    katanaGrp.add(tsuka);

    // Pommel (kashira)
    const kashira = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.05), M.steel);
    kashira.position.y = -0.72;
    katanaGrp.add(kashira);

    kage.add(katanaGrp);
    parts.katana = katanaGrp;

    // ─ Platform ─
    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.6, 0.06, 8),
      new THREE.MeshLambertMaterial({ color: 0x0c0c0e, flatShading: true })
    );
    platform.position.y = -0.03;
    scene.add(platform);

    // Platform edge ring
    const ringGeo = new THREE.RingGeometry(0.52, 0.6, 8);
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
      color: 0x8b1a1a, side: THREE.DoubleSide, transparent: true, opacity: 0.25
    }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);
    parts.ring = ring;

    // Subtle ground glow
    const glowDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.45, 16),
      new THREE.MeshBasicMaterial({ color: 0x8b1a1a, transparent: true, opacity: 0.06 })
    );
    glowDisc.rotation.x = -Math.PI / 2;
    glowDisc.position.y = 0.02;
    scene.add(glowDisc);

    // ─ Particles (crimson motes rising from base) ─
    const PARTICLE_COUNT = 18;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pVelocities = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 1.0;
      pPositions[i * 3 + 1] = Math.random() * 2.5;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
      pVelocities.push(0.003 + Math.random() * 0.006);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc23b3b, size: 0.03, transparent: true, opacity: 0.35
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    scene.add(kage);

    /* ── Animation Loop ──────────────────────────────────────── */
    let t = 0;
    let hovered = false;
    let targetRotY = 0;
    let currentRotY = 0.15;   // slight initial angle
    let entranceDone = false;

    function animate() {
      requestAnimationFrame(animate);
      t += 0.016;

      // Breathing
      parts.torso.scale.y = 1 + Math.sin(t * 1.4) * 0.012;
      parts.torso.position.y = 1.5 + Math.sin(t * 1.4) * 0.005;
      parts.head.position.y = 2.15 + Math.sin(t * 1.4) * 0.006;

      // Body sway
      const swayTarget = hovered ? targetRotY : Math.sin(t * 0.4) * 0.12;
      currentRotY += (swayTarget - currentRotY) * 0.04;
      kage.rotation.y = currentRotY;

      // Coat flutter
      parts.coatL.rotation.x = Math.sin(t * 1.8) * 0.04;
      parts.coatR.rotation.x = Math.sin(t * 1.8 + 0.8) * 0.04;
      parts.tailL.rotation.x = Math.sin(t * 1.2 + 0.3) * 0.03;
      parts.tailR.rotation.x = Math.sin(t * 1.2 + 1.1) * 0.03;

      // Arm subtle motion
      parts.armL.rotation.x = Math.sin(t * 0.8) * 0.03;
      parts.armR.rotation.x = Math.sin(t * 0.8 + Math.PI) * 0.025 - 0.1;

      // Eye glow pulse
      const eIntensity = hovered ? 1.0 : 0.55 + Math.sin(t * 2.2) * 0.35;
      const eColor = new THREE.Color(eIntensity * 0.76, eIntensity * 0.23, eIntensity * 0.23);
      parts.eyeL.material.color.copy(eColor);
      parts.eyeR.material.color.copy(eColor);

      // Platform ring rotation
      parts.ring.rotation.z += 0.004;

      // Particles drift upward
      const pos = particles.geometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3 + 1] += pVelocities[i];
        if (pos[i * 3 + 1] > 3) {
          pos[i * 3 + 1] = 0;
          pos[i * 3] = (Math.random() - 0.5) * 0.8;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Hover glow intensify
      faceLight.intensity = hovered ? 0.5 : 0.25;

      renderer.render(scene, camera);
    }

    animate();

    /* ── Entrance animation ──────────────────────────────────── */
    // Hide when Animus game is open
    function checkVisibility() {
      const ac2 = document.getElementById('ac2');
      if (ac2 && ac2.classList.contains('open')) {
        wrap.style.display = 'none';
      } else {
        wrap.style.display = '';
      }
    }
    setInterval(checkVisibility, 500);

    // Fade in after page load
    setTimeout(() => {
      wrap.classList.add('visible');
      // Entrance bow: head tilts forward
      setTimeout(() => {
        const bowTween = { v: 0 };
        const bowInterval = setInterval(() => {
          bowTween.v += 0.02;
          const angle = Math.sin(bowTween.v * Math.PI) * 0.2;
          parts.head.rotation.x = angle;
          if (bowTween.v >= 1) {
            clearInterval(bowInterval);
            parts.head.rotation.x = 0;
            entranceDone = true;
          }
        }, 16);
      }, 400);
    }, 2200);

    /* ── Interactions ─────────────────────────────────────────── */
    stage.addEventListener('mouseenter', () => { hovered = true; });
    stage.addEventListener('mouseleave', () => { hovered = false; targetRotY = 0; });
    stage.addEventListener('mousemove', (e) => {
      if (!hovered) return;
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      targetRotY = x * 0.7;
    });

    // Touch support
    stage.addEventListener('touchstart', () => { hovered = true; }, { passive: true });
    stage.addEventListener('touchend', () => {
      setTimeout(() => { hovered = false; targetRotY = 0; }, 1500);
    }, { passive: true });

    // Tooltip toggle on click
    let tooltipOpen = false;
    stage.addEventListener('click', (e) => {
      e.stopPropagation();
      tooltipOpen = !tooltipOpen;
      tooltip.classList.toggle('show', tooltipOpen);
    });

    // Close tooltip on outside click
    document.addEventListener('click', () => {
      if (tooltipOpen) {
        tooltipOpen = false;
        tooltip.classList.remove('show');
      }
    });
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
