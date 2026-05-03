/******/ (() => { // webpackBootstrap
/*!*******************************!*\
  !*** ./src/accordion/view.js ***!
  \*******************************/
const initBlockiveAccordion = () => {
  const accordions = document.querySelectorAll('.bpafb-accordion-wrapper:not(.bpafb-accordion-initialized)');
  accordions.forEach(accordion => {
    accordion.classList.add('bpafb-accordion-initialized'); // Prevent double binding
    const items = accordion.querySelectorAll('.bpafb-accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.bpafb-accordion-header');
      const content = item.querySelector('.bpafb-accordion-content');
      if (header && content) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all others
          items.forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.bpafb-accordion-content');
            if (otherContent) otherContent.style.display = 'none';
            const openIcon = otherItem.querySelector('.bpafb-icon-open');
            const closeIcon = otherItem.querySelector('.bpafb-icon-close');
            if (openIcon) openIcon.style.display = 'inline';
            if (closeIcon) closeIcon.style.display = 'none';
          });

          // Toggle current
          if (!isActive) {
            item.classList.add('active');
            content.style.display = 'block';
            const openIcon = item.querySelector('.bpafb-icon-open');
            const closeIcon = item.querySelector('.bpafb-icon-close');
            if (openIcon) openIcon.style.display = 'none';
            if (closeIcon) closeIcon.style.display = 'inline';
          }
        });
      }
    });
  });
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlockiveAccordion);
} else {
  initBlockiveAccordion();
}
/******/ })()
;
//# sourceMappingURL=view.js.map