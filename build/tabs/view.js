/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./src/tabs/view.js ***!
  \**************************/
const initLcTabs = () => {
  const tabsWrappers = document.querySelectorAll('.lc-tabs-wrapper:not(.lc-tabs-initialized)');
  tabsWrappers.forEach(wrapper => {
    wrapper.classList.add('lc-tabs-initialized'); // Prevent double binding
    const pills = wrapper.querySelectorAll('.lc-tab-pill');
    const panes = wrapper.querySelectorAll('.lc-tab-pane');
    pills.forEach((pill, index) => {
      pill.addEventListener('click', () => {
        // Remove active class from all pills and panes
        pills.forEach(p => p.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked pill and corresponding pane
        pill.classList.add('active');
        if (panes[index]) {
          panes[index].classList.add('active');
        }
      });

      // Add keyboard accessibility
      pill.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pill.click();
        }
      });
    });
  });
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLcTabs);
} else {
  initLcTabs();
}
/******/ })()
;
//# sourceMappingURL=view.js.map