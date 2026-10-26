(() => {
  'use strict';
  const figures = [...document.querySelectorAll('figure[data-figure]')];
  if (!figures.length) return;
  let dialog, viewport, canvas, picture, scaleLabel, closer, zoomIn, zoomOut;
  let scale = 1, fitted = true, returnFocus, pan;
  const steps = [.125, .25, .5, .75, 1, 1.5, 2];

  function fittedScale() {
    const pad = parseFloat(getComputedStyle(canvas).paddingLeft) * 2;
    return Math.min(1, (viewport.clientWidth - pad) / picture.naturalWidth,
      (viewport.clientHeight - pad) / picture.naturalHeight);
  }
  function setScale(next, fit = false) {
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / canvas.offsetWidth;
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / canvas.offsetHeight;
    fitted = fit;
    scale = Math.max(.05, Math.min(2, next));
    const padding = parseFloat(getComputedStyle(canvas).paddingLeft) * 2;
    const width = picture.naturalWidth * scale, height = picture.naturalHeight * scale;
    picture.style.width = width + 'px';
    picture.style.height = height + 'px';
    canvas.style.width = Math.ceil(width + padding) + 'px';
    canvas.style.height = Math.ceil(height + padding) + 'px';
    scaleLabel.textContent = Math.round(scale * 100) + '%';
    zoomIn.disabled = scale >= 2;
    zoomOut.disabled = scale <= .125;
    viewport.classList.toggle('can-pan', width + padding > viewport.clientWidth || height + padding > viewport.clientHeight);
    viewport.scrollLeft = fit ? 0 : centerX * canvas.offsetWidth - viewport.clientWidth / 2;
    viewport.scrollTop = fit ? 0 : centerY * canvas.offsetHeight - viewport.clientHeight / 2;
  }
  function zoom(direction) {
    const next = direction > 0 ? steps.find(step => step > scale + .01)
      : [...steps].reverse().find(step => step < scale - .01);
    if (next) setScale(next);
  }
  function createViewer() {
    dialog = document.createElement('dialog');
    dialog.className = 'cover-viewer';
    dialog.setAttribute('aria-labelledby', 'cover-viewer-title');
    dialog.innerHTML = `<div class="cover-viewer-toolbar"><div class="cover-viewer-title" id="cover-viewer-title">Evolution of Agent Work<small>From responses to connected workspaces</small></div><div class="cover-viewer-controls"><button type="button" data-fit aria-label="Fit the whole figure">Fit</button><button type="button" data-minus aria-label="Zoom out">−</button><span class="cover-viewer-scale" aria-live="polite"></span><button type="button" data-plus aria-label="Zoom in">+</button><button type="button" data-actual aria-label="Show original resolution">100%</button><button type="button" data-close aria-label="Close figure viewer" autofocus>×</button></div></div><div class="cover-viewer-viewport" tabindex="0" aria-label="Figure canvas. Use arrow keys to scroll when zoomed."><div class="cover-viewer-canvas"><img class="cover-viewer-image" alt="" draggable="false"></div></div><p class="cover-viewer-footnote">Zoom in to read · Drag or scroll to explore · Esc to close</p>`;
    document.body.append(dialog);
    viewport = dialog.querySelector('.cover-viewer-viewport');
    canvas = dialog.querySelector('.cover-viewer-canvas');
    picture = dialog.querySelector('img');
    scaleLabel = dialog.querySelector('.cover-viewer-scale');
    closer = dialog.querySelector('[data-close]');
    zoomIn = dialog.querySelector('[data-plus]');
    zoomOut = dialog.querySelector('[data-minus]');
    closer.addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-fit]').addEventListener('click', () => setScale(fittedScale(), true));
    dialog.querySelector('[data-actual]').addEventListener('click', () => setScale(1));
    zoomIn.addEventListener('click', () => zoom(1));
    zoomOut.addEventListener('click', () => zoom(-1));
    dialog.addEventListener('keydown', event => {
      if (event.key === '+' || event.key === '=') { event.preventDefault(); zoom(1); }
      if (event.key === '-') { event.preventDefault(); zoom(-1); }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { pan = null; viewport.classList.remove('is-panning'); returnFocus?.focus({preventScroll:true}); });
    viewport.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || !viewport.classList.contains('can-pan')) return;
      event.preventDefault();
      viewport.focus({preventScroll:true});
      pan = {x:event.clientX, y:event.clientY, left:viewport.scrollLeft, top:viewport.scrollTop};
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('is-panning');
    });
    viewport.addEventListener('pointermove', event => {
      if (!pan) return;
      viewport.scrollLeft = pan.left - event.clientX + pan.x;
      viewport.scrollTop = pan.top - event.clientY + pan.y;
    });
    const endPan = () => { pan = null; viewport.classList.remove('is-panning'); };
    viewport.addEventListener('pointerup', endPan);
    viewport.addEventListener('pointercancel', endPan);
    viewport.addEventListener('lostpointercapture', endPan);
    window.addEventListener('resize', () => { if (dialog.open && fitted) setScale(fittedScale(), true); });
  }
  for (const figure of figures) figure.addEventListener('click', async event => {
    const link = event.target.closest('a');
    if (!link || !figure.classList.contains('is-loaded') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.origin !== location.origin) return;
    event.preventDefault();
    if (!dialog) createViewer();
    const title=dialog.querySelector('.cover-viewer-title');
    title.textContent=figure.dataset.figureTitle || 'Manuscript figure';
    const subtitle=document.createElement('small');subtitle.textContent='Work Agents · Original manuscript figure';title.append(subtitle);
    returnFocus = link;
    const original = figure.querySelector('img');
    picture.src = original.src;
    picture.alt = original.alt;
    await picture.decode();
    if (!dialog.open) dialog.showModal();
    setScale(fittedScale(), true);
  });
})();
