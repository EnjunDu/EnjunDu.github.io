(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); };
  menu.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });

  const tabs = [...document.querySelectorAll('.work-tab')];
  const panels = [...document.querySelectorAll('.work-panel')];
  const selectTab = index => {
    tabs.forEach((tab, i) => { tab.classList.toggle('active', i === index); tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; panels[i].hidden = i !== index; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(next); tabs[next].focus(); }
    });
  });

  const rows = [...document.querySelectorAll('.resource-table tbody tr')];
  const search = document.querySelector('#resource-search');
  const domain = document.querySelector('#domain-filter');
  const filters = [...document.querySelectorAll('.filter')];
  const count = document.querySelector('#resource-count');
  const showAll = document.querySelector('#show-all');
  const reset = document.querySelector('#reset-filters');
  let selectedForm = 'all';
  let expanded = false;
  const updateResources = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const active = query !== '' || selectedForm !== 'all' || domain.value !== 'all';
    let matched = 0;
    let shown = 0;
    rows.forEach(row => {
      const matches = row.dataset.search.includes(query) && (selectedForm === 'all' || row.dataset.form === selectedForm) && (domain.value === 'all' || row.dataset.domain === domain.value);
      if (matches) matched++;
      const visible = matches && (active || expanded || shown < 8);
      row.hidden = !visible;
      if (visible) shown++;
    });
    count.textContent = matched === 0 ? '0 matching resources' : `Showing ${shown} of ${matched} ${active ? 'matching ' : ''}resources`;
    showAll.hidden = active || matched <= 8;
    showAll.innerHTML = expanded ? 'Show fewer resources <span aria-hidden="true">↑</span>' : `Show all ${matched} resources <span aria-hidden="true">↓</span>`;
    showAll.setAttribute('aria-expanded', String(expanded));
    reset.hidden = !active;
    document.querySelector('#no-results').hidden = matched !== 0;
    filters.forEach(filter => { const selected = filter.dataset.form === selectedForm; filter.classList.toggle('active', selected); filter.setAttribute('aria-pressed', String(selected)); });
  };
  const clearFilters = () => { search.value = ''; domain.value = 'all'; selectedForm = 'all'; expanded = false; updateResources(); };
  search.addEventListener('input', updateResources);
  domain.addEventListener('change', updateResources);
  filters.forEach(filter => filter.addEventListener('click', () => { selectedForm = filter.dataset.form; updateResources(); }));
  reset.addEventListener('click', clearFilters);
  document.querySelector('#empty-reset').addEventListener('click', () => { clearFilters(); search.focus(); });
  showAll.addEventListener('click', () => { expanded = !expanded; updateResources(); if (!expanded) document.querySelector('.resource-controls').scrollIntoView({ block: 'start', behavior: 'auto' }); });
  updateResources();

  const copy = document.querySelector('#copy-citation');
  const copyStatus = document.querySelector('#copy-status');
  copy.addEventListener('click', async () => {
    const citation = document.querySelector('#bibtex').textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(citation);
      else {
        const field = document.createElement('textarea');
        field.value = citation; field.style.position = 'fixed'; field.style.opacity = '0';
        document.body.appendChild(field); field.select();
        const success = document.execCommand('copy'); field.remove();
        if (!success) throw new Error('Copy unavailable');
      }
      copyStatus.textContent = 'Citation copied.'; copy.textContent = 'Copied ✓';
      setTimeout(() => { copy.innerHTML = 'Copy <span aria-hidden="true">⧉</span>'; }, 2200);
    } catch (_) {
      const selection = window.getSelection(); const range = document.createRange();
      range.selectNodeContents(document.querySelector('#bibtex')); selection.removeAllRanges(); selection.addRange(range);
      copyStatus.textContent = 'Citation selected. Use your browser’s copy command.';
    }
  });
  const progress = document.querySelector('.reading-progress span');
  let scheduled = false;
  const updateProgress = () => { const range = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${range > 0 ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 0}%`; scheduled = false; };
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
  if ('IntersectionObserver' in window) {
    const links = [...navigation.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -65% 0px' });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
})();
