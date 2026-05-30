/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/progress-bar/view.js ***!
  \**********************************/
/**
 * Blockive Progress Bar Frontend Animation Script
 * 
 * Sets up a highly optimized IntersectionObserver to lazily animate the progress 
 * bar's width and count up its numeric percentage label when it scrolls into view.
 * Uses custom cubic-bezier transitions and window.requestAnimationFrame for 
 * ultra-smooth framerate-independent rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Scans the page for progress bars and attaches intersection observer behavior.
   * 
   * @function initProgressBars
   * @returns {void}
   */
  const initProgressBars = () => {
    // Fetch all progressive elements that haven't been animated/loaded yet
    const progressBars = document.querySelectorAll('.bpafb-progress-bar-wrapper[data-blockive-progress]:not(.bpafb-pb-initialized)');
    if (!progressBars.length) return;

    // Initialize IntersectionObserver to track scroll intersection
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;
          const fillArea = wrapper.querySelector('.bpafb-pb-fill');
          const numberElements = wrapper.querySelectorAll('.bpafb-pb-number');

          // Read animation duration and target percentages from element attributes
          const targetPercentage = parseFloat(wrapper.getAttribute('data-percentage')) || 0;
          const duration = parseInt(wrapper.getAttribute('data-duration'), 10) || 1500;

          // 1. Animate Width of progress fill element using hardware-accelerated cubic-bezier transition
          if (fillArea) {
            fillArea.style.transition = `width ${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
            fillArea.style.width = `${targetPercentage}%`;
          }

          // 2. Animate Numbers with a smooth deceleration count-up
          if (numberElements.length > 0) {
            let startTimestamp = null;

            /**
             * Frame step counter callback executed via requestAnimationFrame.
             * 
             * @param {DOMHighResTimeStamp} timestamp 
             */
            const step = timestamp => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);

              // Ease Out Quart function for standard smooth deceleration curves
              const easeOut = 1 - Math.pow(1 - progress, 4);
              const currentVal = Math.floor(easeOut * targetPercentage);

              // Update values across all progress indicators
              numberElements.forEach(el => {
                el.textContent = currentVal;
              });
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                // Ensure exact target percentage is displayed on final frame
                numberElements.forEach(el => {
                  el.textContent = targetPercentage;
                });
              }
            };
            window.requestAnimationFrame(step);
          }

          // Mark wrapper element as fully initialized to prevent double triggers
          wrapper.classList.add('bpafb-pb-initialized');
          // Unobserve element to save resource overhead once animation starts
          observerInstance.unobserve(wrapper);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      // Trigger slightly before it fully enters viewport
      threshold: 0.1
    });

    // Start tracking every progress bar container
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  };

  // Execute scanner initial block query
  initProgressBars();
});
/******/ })()
;
//# sourceMappingURL=view.js.map