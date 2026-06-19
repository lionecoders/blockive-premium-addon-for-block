/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/image-comparison/view.js ***!
  \**************************************/
document.addEventListener('DOMContentLoaded', () => {
  const comparisons = document.querySelectorAll('.bpafb-image-comparison');
  comparisons.forEach(comparison => {
    const handle = comparison.querySelector('.bpafb-comparison-handle');
    const beforeImage = comparison.querySelector('.bpafb-comparison-image.before-image');
    let isActive = false;
    const updatePosition = x => {
      const rect = comparison.getBoundingClientRect();
      let position = (x - rect.left) / rect.width * 100;
      if (position < 0) position = 0;
      if (position > 100) position = 100;
      handle.style.left = position + '%';
      if (beforeImage) {
        beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
      }
    };
    const startInteraction = x => {
      isActive = true;
      updatePosition(x);
    };
    const endInteraction = () => {
      isActive = false;
    };

    // Mouse events
    comparison.addEventListener('mousedown', e => {
      startInteraction(e.clientX);
    });
    window.addEventListener('mousemove', e => {
      if (!isActive) return;
      updatePosition(e.clientX);
    });
    window.addEventListener('mouseup', endInteraction);

    // Touch events
    comparison.addEventListener('touchstart', e => {
      if (e.touches.length > 0) {
        startInteraction(e.touches[0].clientX);
      }
    });
    window.addEventListener('touchmove', e => {
      if (!isActive) return;
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX);
      }
    });
    window.addEventListener('touchend', endInteraction);
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map