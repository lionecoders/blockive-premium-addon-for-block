/******/ (() => { // webpackBootstrap
/*!*************************************!*\
  !*** ./src/countdown-timer/view.js ***!
  \*************************************/
document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.lc-countdown-wrapper');
  wrappers.forEach(timer => {
    const targetDateStr = timer.getAttribute('data-target-date');
    if (!targetDateStr) return;
    const targetDate = new Date(targetDateStr).getTime();
    const daysEl = timer.querySelector('.lc-cd-days .lc-countdown-number');
    const hoursEl = timer.querySelector('.lc-cd-hours .lc-countdown-number');
    const minsEl = timer.querySelector('.lc-cd-minutes .lc-countdown-number');
    const secsEl = timer.querySelector('.lc-cd-seconds .lc-countdown-number');
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        if (daysEl) daysEl.innerText = '00';
        if (hoursEl) hoursEl.innerText = '00';
        if (minsEl) minsEl.innerText = '00';
        if (secsEl) secsEl.innerText = '00';
        if (interval) clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(distance % (1000 * 60) / 1000);
      if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
      if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
      if (minsEl) minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
      if (secsEl) secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map