/******/ (() => { // webpackBootstrap
/*!*******************************!*\
  !*** ./src/accordion/view.js ***!
  \*******************************/
const initLcAccordion = () => {
  const accordions = document.querySelectorAll('.lc-accordion-wrapper:not(.lc-accordion-initialized)');
  accordions.forEach(accordion => {
    accordion.classList.add('lc-accordion-initialized'); // Prevent double binding
    const items = accordion.querySelectorAll('.lc-accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.lc-accordion-header');
      const content = item.querySelector('.lc-accordion-content');
      if (header && content) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all others
          items.forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.lc-accordion-content');
            if (otherContent) otherContent.style.display = 'none';
            const openIcon = otherItem.querySelector('.lc-icon-open');
            const closeIcon = otherItem.querySelector('.lc-icon-close');
            if (openIcon) openIcon.style.display = 'inline';
            if (closeIcon) closeIcon.style.display = 'none';
          });

          // Toggle current
          if (!isActive) {
            item.classList.add('active');
            content.style.display = 'block';
            const openIcon = item.querySelector('.lc-icon-open');
            const closeIcon = item.querySelector('.lc-icon-close');
            if (openIcon) openIcon.style.display = 'none';
            if (closeIcon) closeIcon.style.display = 'inline';
          }
        });
      }
    });
  });
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLcAccordion);
} else {
  initLcAccordion();
}
/******/ })()
;
//# sourceMappingURL=view.js.map