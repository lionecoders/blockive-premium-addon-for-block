/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/image-comparison/view.js ***!
  \**************************************/
document.addEventListener('DOMContentLoaded', () => {
  const comparisons = document.querySelectorAll('.bpafb-image-comparison');
  comparisons.forEach(comparison => {
    const handle = comparison.querySelector('.bpafb-comparison-handle');
    const afterImage = comparison.querySelector('.bpafb-comparison-image.after-image');
    let isActive = false;
    const updatePosition = x => {
      const rect = comparison.getBoundingClientRect();
      let position = (x - rect.left) / rect.width * 100;
      if (position < 0) position = 0;
      if (position > 100) position = 100;
      handle.style.left = position + '%';
      afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    };
    handle.addEventListener('mousedown', () => {
      isActive = true;
    });
    document.addEventListener('mousemove', e => {
      if (!isActive) return;
      updatePosition(e.clientX);
    });
    document.addEventListener('mouseup', () => {
      isActive = false;
    });
    comparison.addEventListener('touchstart', () => {
      isActive = true;
    });
    document.addEventListener('touchmove', e => {
      if (!isActive) return;
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX);
      }
    });
    document.addEventListener('touchend', () => {
      isActive = false;
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map