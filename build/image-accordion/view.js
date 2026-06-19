/******/ (() => { // webpackBootstrap
/*!*************************************!*\
  !*** ./src/image-accordion/view.js ***!
  \*************************************/
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.bpafb-image-accordion');
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.bpafb-image-accordion-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map