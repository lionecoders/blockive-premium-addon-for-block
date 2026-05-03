const initBlockiveTabs = () => {
    const tabsWrappers = document.querySelectorAll('.blockive-tabs-wrapper:not(.blockive-tabs-initialized)');
    
    tabsWrappers.forEach(wrapper => {
        wrapper.classList.add('bpafb-tabs-initialized'); // Prevent double binding
        const pills = wrapper.querySelectorAll('.blockive-tab-pill');
        const panes = wrapper.querySelectorAll('.blockive-tab-pane');
        
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
            pill.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pill.click();
                }
            });
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlockiveTabs);
} else {
    initBlockiveTabs();
}
