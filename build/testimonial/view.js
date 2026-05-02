/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./src/testimonial/view.js ***!
  \*********************************/
document.addEventListener('DOMContentLoaded', () => {
  const testimonialSliders = document.querySelectorAll('.lcibwc-testimonial-slider');
  testimonialSliders.forEach(slider => {
    const items = slider.querySelectorAll('.lcibwc-testimonial-item');
    const arrows = slider.querySelectorAll('.lcibwc-arrow');
    const dots = slider.querySelectorAll('.lcibwc-dot');
    let currentIndex = 0;
    const showSlide = index => {
      items.forEach(item => item.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      items[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
      currentIndex = index;
    };
    arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        if (arrow.classList.contains('lcibwc-prev')) {
          currentIndex = (currentIndex - 1 + items.length) % items.length;
        } else {
          currentIndex = (currentIndex + 1) % items.length;
        }
        showSlide(currentIndex);
      });
    });
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });

    // Show first slide initially
    if (items.length > 0) {
      showSlide(0);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map