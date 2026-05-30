/**
 * Blockive Accordion Frontend Initialization Script
 * 
 * Sets up dynamic interactive behaviors for the Accordion Gutenberg block,
 * including accessibility toggles, icon switching, and active-state management.
 * Utilizes not(.bpafb-accordion-initialized) selector to avoid double binding.
 * 
 * @function initBlockiveAccordion
 * @returns {void}
 */
const initBlockiveAccordion = () => {
    // Select all uninitialized accordion wrappers on the page
    const accordions = document.querySelectorAll('.bpafb-accordion-wrapper:not(.bpafb-accordion-initialized)');

    accordions.forEach(accordion => {
        // Mark as initialized to prevent redundant event listeners
        accordion.classList.add('bpafb-accordion-initialized');
        
        // Find all accordion list items within this specific wrapper
        const items = accordion.querySelectorAll('.bpafb-accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.bpafb-accordion-header');
            const content = item.querySelector('.bpafb-accordion-content');

            if (header && content) {
                // Attach click event to header for expand/collapse toggle
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // 1. Close all other accordion items (Single Open Behavior)
                    items.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.bpafb-accordion-content');
                        if (otherContent) otherContent.style.display = 'none';

                        // Toggle indicator icons for inactive items
                        const openIcon = otherItem.querySelector('.bpafb-icon-open');
                        const closeIcon = otherItem.querySelector('.bpafb-icon-close');
                        if (openIcon) openIcon.style.display = 'inline';
                        if (closeIcon) closeIcon.style.display = 'none';
                    });

                    // 2. Toggle the selected accordion item state
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.display = 'block';

                        // Toggle indicator icons for active item
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

// Global flag to track initialization and prevent double execution
let hasInitialized = false;

// Register initialization based on current document loading state
if (document.readyState === 'loading') {
    // If DOM is still loading, wait for DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', () => {
        if (!hasInitialized) {
            initBlockiveAccordion();
            hasInitialized = true;
        }
    });
} else {
    // If DOM has already loaded, run the initialization directly
    if (!hasInitialized) {
        initBlockiveAccordion();
        hasInitialized = true;
    }
}
