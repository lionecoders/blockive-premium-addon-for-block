/**
 * Blockive Tabs Frontend Initialization Script
 * 
 * Provides interactive tab-switching mechanism for the Tabs Gutenberg block.
 * Handles active-state transitions, keyboard navigation (a11y), and 
 * handles safe multiple/dynamic loader hooks to avoid duplicate event listeners.
 * 
 * @function initBlockiveTabs
 * @returns {void}
 */
const initBlockiveTabs = () => {
    // Select all uninitialized tab component wrappers on the page
    const tabsWrappers = document.querySelectorAll('.bpafb-tabs-wrapper:not(.bpafb-tabs-initialized)');

    tabsWrappers.forEach(wrapper => {
        // Tag with initialization class to prevent duplicate binds
        wrapper.classList.add('bpafb-tabs-initialized');
        
        const pills = wrapper.querySelectorAll('.bpafb-tab-pill');
        const panes = wrapper.querySelectorAll('.bpafb-tab-pane');
        
        pills.forEach((pill, index) => {
            // Click transition handling
            pill.addEventListener('click', () => {
                // Remove active class from all navigation pills and tab content panes
                pills.forEach(p => p.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));
                
                // Set the current navigation pill and corresponding content pane as active
                pill.classList.add('active');
                if (panes[index]) {
                    panes[index].classList.add('active');
                }
            });
            
            // Native keyboard accessibility (Enter/Space support for focus states)
            pill.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pill.click();
                }
            });
        });
    });
};

// Global flag to track tabs script execution
let hasTabsInitialized = false;

// Register initialization based on current document loading state
if (document.readyState === 'loading') {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        if (!hasTabsInitialized) {
            initBlockiveTabs();
            hasTabsInitialized = true;
        }
    });
} else {
    // Initialize immediately if DOM is ready
    if (!hasTabsInitialized) {
        initBlockiveTabs();
        hasTabsInitialized = true;
    }
}
