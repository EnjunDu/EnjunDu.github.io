(() => {
  'use strict';

  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const atmosphere = document.querySelector('.hero-atmosphere');
  const canvas = document.querySelector('#agent-particles');
  const toggle = document.querySelector('.motion-toggle');
  if (!hero || !toggle) return;

  const label = toggle.querySelector('.motion-toggle-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const preferenceKey = 'working-agents-visual-motion';
  let preference = null;
  try {
    const saved = sessionStorage.getItem(preferenceKey);
    if (saved === 'on' || saved === 'off') preference = saved;
  } catch (_) { /* Motion remains available when session storage is blocked. */ }

  let enabled = preference ? preference === 'on' : !reducedMotion.matches;
  let heroInView = false;
  let pageVisible = !document.hidden;
  let context = null;
  try { context = canvas && canvas.getContext('2d', { alpha: true }); }
  catch (_) { /* The page and CSS effects also work without a canvas context. */ }

  // A quiet field of stars and routed signals frames the working surfaces.
  // Keep all storage outside the animation loop and the reading column clear.
  const capacity = 34;
  const x = new Float32Array(capacity);
  const y = new Float32Array(capacity);
  const phase = new Float32Array(capacity);
  const radius = new Float32Array(capacity);
  const opacity = new Float32Array(capacity);
  const starColors = ['#a9edf4', '#98b5ff', '#e3f5ff'];
  const signalColors = ['#6cdbed', '#8a9eff'];
  // Cubic routes stay in the outer quarter; no connecting web crosses the title.
  const routeDefinitions = [
    [-0.03, 0.17, 0.19, 0.18, 0.04, 0.43, 0.20, 0.57],
    [0.02, 0.76, 0.20, 0.73, 0.08, 0.45, 0.23, 0.37],
    [1.03, 0.21, 0.81, 0.18, 0.96, 0.48, 0.80, 0.63],
    [0.98, 0.83, 0.78, 0.76, 0.94, 0.52, 0.78, 0.39],
    [-0.02, 0.53, 0.18, 0.53, 0.02, 0.82, 0.19, 0.91],
    [1.02, 0.57, 0.84, 0.55, 0.98, 0.84, 0.81, 0.94]
  ];
  const samplesPerRoute = 48;
  const routes = routeDefinitions.map((definition, index) => ({
    definition,
    points: new Float32Array((samplesPerRoute + 1) * 2),
    phase: (index * 0.173) % 1,
    speed: 0.036 + (index % 3) * 0.005,
    color: signalColors[index % 2]
  }));
  const point = new Float32Array(2);
  const frameInterval = 1000 / 30;
  let count = 0;
  let routeCount = 0;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let lastDraw = 0;
  let time = 0;
  let pointerX = -1000;
  let pointerY = -1000;
  let pointerActive = false;
  let driftX = 0;
  let driftY = 0;

  function noise(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  }

  function sampleRoute(route, progress) {
    const location = Math.min(samplesPerRoute - 0.0001, Math.max(0, progress) * samplesPerRoute);
    const index = Math.floor(location);
    const fraction = location - index;
    const offset = index * 2;
    point[0] = route.points[offset] + (route.points[offset + 2] - route.points[offset]) * fraction;
    point[1] = route.points[offset + 1] + (route.points[offset + 3] - route.points[offset + 1]) * fraction;
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastDraw = 0;
  }

  function syncAnimation() {
    root.classList.toggle('hero-in-view', heroInView);
    root.classList.toggle('motion-page-visible', pageVisible);
    if (enabled && heroInView && pageVisible && context && width && height) {
      if (!frame) frame = requestAnimationFrame(draw);
    } else {
      stop();
    }
  }

  function resize() {
    if (!canvas || !context) return;
    const bounds = canvas.getBoundingClientRect();
    const nextWidth = Math.round(bounds.width);
    const nextHeight = Math.round(bounds.height);
    const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;
    width = nextWidth;
    height = nextHeight;
    dpr = nextDpr;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    count = width < 700 ? 10 : capacity;
    routeCount = width < 700 ? 4 : routes.length;
    for (let i = 0; i < count; i++) {
      const margin = width < 700 ? 0.14 : 0.25;
      const inset = 0.015 + noise(i + 1) * margin;
      x[i] = (i % 2 ? 1 - inset : inset) * width;
      y[i] = (0.04 + noise(i + 61) * 0.91) * height;
      phase[i] = noise(i + 113) * Math.PI * 2;
      radius[i] = i % 7 === 0 ? 1.65 : 0.5 + noise(i + 173) * 0.65;
      opacity[i] = 0.35 + noise(i + 227) * 0.48;
    }
    for (const route of routes) {
      const p = route.definition;
      for (let sample = 0; sample <= samplesPerRoute; sample++) {
        const t = sample / samplesPerRoute;
        const u = 1 - t;
        let routeX = u * u * u * p[0] + 3 * u * u * t * p[2] + 3 * u * t * t * p[4] + t * t * t * p[6];
        // On narrow displays keep signals close to the bezel, away from authors.
        if (width < 700) routeX = routeX < 0.5 ? routeX * 0.58 : 1 - (1 - routeX) * 0.58;
        route.points[sample * 2] = routeX * width;
        route.points[sample * 2 + 1] = (u * u * u * p[1] + 3 * u * u * t * p[3] + 3 * u * t * t * p[5] + t * t * t * p[7]) * height;
      }
    }
    syncAnimation();
  }

  function draw(now) {
    frame = 0;
    if (!enabled || !heroInView || !pageVisible || !context) return;
    if (lastDraw && now - lastDraw < frameInterval - 0.5) {
      frame = requestAnimationFrame(draw);
      return;
    }
    const dt = lastDraw ? Math.min((now - lastDraw) / 1000, 0.07) : 0;
    lastDraw = now;
    time += dt;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const smoothing = 1 - Math.exp(-dt * 3.2);
    const targetX = pointerActive ? (pointerX / width - 0.5) * 7 : 0;
    const targetY = pointerActive ? (pointerY / height - 0.5) * 5 : 0;
    driftX += (targetX - driftX) * smoothing;
    driftY += (targetY - driftY) * smoothing;
    context.translate(driftX, driftY);
    context.lineCap = 'round';

    for (let i = 0; i < routeCount; i++) {
      const route = routes[i];
      context.strokeStyle = route.color;
      context.lineWidth = 0.65;
      context.globalAlpha = 0.15;
      context.beginPath();
      for (let sample = 0; sample <= samplesPerRoute; sample++) {
        const offset = sample * 2;
        if (sample === 0) context.moveTo(route.points[offset], route.points[offset + 1]);
        else context.lineTo(route.points[offset], route.points[offset + 1]);
      }
      context.stroke();

      // One small delivery per route, with a soft tail and gradual endpoint fade.
      const progress = (time * route.speed + route.phase) % 1;
      const envelope = Math.pow(Math.sin(progress * Math.PI), 0.8);
      context.lineWidth = 1.25;
      for (let segment = 0; segment < 9; segment++) {
        const start = progress - (9 - segment) * 0.009;
        const end = start + 0.009;
        if (start < 0) continue;
        context.globalAlpha = envelope * (segment + 1) / 9 * 0.62;
        sampleRoute(route, start);
        context.beginPath();
        context.moveTo(point[0], point[1]);
        sampleRoute(route, end);
        context.lineTo(point[0], point[1]);
        context.stroke();
      }
      sampleRoute(route, progress);
      context.fillStyle = route.color;
      context.globalAlpha = envelope * 0.07;
      context.beginPath();
      context.arc(point[0], point[1], 6.5, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = envelope * 0.95;
      context.beginPath();
      context.arc(point[0], point[1], 1.6, 0, Math.PI * 2);
      context.fill();
    }

    for (let i = 0; i < count; i++) {
      let starX = x[i] + Math.sin(time * 0.11 + phase[i]) * 3.5;
      let starY = y[i] + Math.cos(time * 0.09 + phase[i]) * 4;
      if (pointerActive) {
        const dx = pointerX - starX;
        const dy = pointerY - starY;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < 180 * 180) {
          const influence = (1 - distanceSquared / (180 * 180)) * 0.025;
          starX += dx * influence;
          starY += dy * influence;
        }
      }
      const breath = 0.92 + Math.sin(time * 0.32 + phase[i]) * 0.08;
      const verticalFade = Math.min(1, Math.max(0, starY / 70), Math.max(0, (height - starY) / 100));
      context.fillStyle = starColors[i % starColors.length];
      context.globalAlpha = opacity[i] * verticalFade * 0.07 * breath;
      context.beginPath();
      context.arc(starX, starY, radius[i] * 4.5, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = opacity[i] * verticalFade * breath;
      context.beginPath();
      context.arc(starX, starY, radius[i], 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
    frame = requestAnimationFrame(draw);
  }

  const revealSelector = '.section-heading, .overview-grid > div, .dimensions-grid > div, .capability, .optimization-grid > article, .frontier, .paper-figure, .citation-grid > div, .closing-thought';
  const reveals = Array.from(document.querySelectorAll(revealSelector)).filter(element => !element.parentElement.closest(revealSelector));
  let revealObserver = null;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px 32px 0px', threshold: 0.04 });
  }

  for (let i = 0; i < reveals.length; i++) {
    const element = reveals[i];
    element.classList.add('motion-reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(i % 3 * 70, 200)}ms`);
  }

  function syncReveals() {
    if (!revealObserver || !enabled) {
      if (revealObserver) revealObserver.disconnect();
      for (const element of reveals) element.classList.add('is-visible');
      return;
    }
    for (const element of reveals) {
      // Anchor jumps and restored scroll positions must never leave passed content hidden.
      if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add('is-visible');
      else if (!element.classList.contains('is-visible')) revealObserver.observe(element);
    }
  }

  function syncEnabled() {
    root.classList.toggle('motion-active', enabled);
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', 'Enable visual motion');
    if (label) label.textContent = enabled ? 'Motion on' : 'Motion off';
    syncReveals();
    if (!enabled) {
      pointerActive = false;
      hero.style.removeProperty('--pointer-x');
      hero.style.removeProperty('--pointer-y');
      if (context) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    syncAnimation();
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    preference = enabled ? 'on' : 'off';
    try { sessionStorage.setItem(preferenceKey, preference); } catch (_) {}
    syncEnabled();
  });
  toggle.hidden = false;

  const listenMedia = (query, handler) => {
    if (query.addEventListener) query.addEventListener('change', handler);
    else if (query.addListener) query.addListener(handler);
  };
  listenMedia(reducedMotion, () => {
    if (preference === null) {
      enabled = !reducedMotion.matches;
      syncEnabled();
    }
  });
  listenMedia(finePointer, () => {
    if (!finePointer.matches) {
      pointerActive = false;
      hero.style.removeProperty('--pointer-x');
      hero.style.removeProperty('--pointer-y');
    }
  });

  hero.addEventListener('pointermove', event => {
    if (!enabled || !finePointer.matches || event.pointerType === 'touch') return;
    const heroBounds = (atmosphere || hero).getBoundingClientRect();
    hero.style.setProperty('--pointer-x', `${((event.clientX - heroBounds.left) / heroBounds.width * 100).toFixed(2)}%`);
    hero.style.setProperty('--pointer-y', `${((event.clientY - heroBounds.top) / heroBounds.height * 100).toFixed(2)}%`);
    if (canvas) {
      const bounds = canvas.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      pointerActive = true;
    }
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointerActive = false; }, { passive: true });

  function checkHeroVisibility() {
    const bounds = (atmosphere || hero).getBoundingClientRect();
    heroInView = bounds.bottom > 0 && bounds.top < window.innerHeight;
    syncAnimation();
  }
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      heroInView = entries[0].isIntersecting;
      syncAnimation();
    });
    heroObserver.observe(atmosphere || hero);
  } else {
    window.addEventListener('scroll', checkHeroVisibility, { passive: true });
  }
  if ('ResizeObserver' in window && canvas) {
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
  }
  window.addEventListener('resize', () => { resize(); checkHeroVisibility(); }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    syncAnimation();
  });
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', () => {
    pageVisible = !document.hidden;
    checkHeroVisibility();
  });

  resize();
  checkHeroVisibility();
  syncEnabled();
})();
