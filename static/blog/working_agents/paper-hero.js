(() => {
 'use strict';
 document.querySelectorAll('[data-work-index]').forEach(link => {
  link.addEventListener('click', () => {
   const tab = document.querySelectorAll('.work-tab')[Number(link.dataset.workIndex)];
   if (tab) tab.click();
  });
 });
})();
