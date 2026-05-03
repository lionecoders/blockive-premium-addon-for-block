const initBlockiveAccordion = () => {
    const accordions = document.querySelectorAll('.blockive-accordion-wrapper:not(.blockive-accordion-initialized)');

    accordions.forEach(accordion => {
        accordion.classList.add('bpafb-accordion-initialized'); // Prevent double binding
        const items = accordion.querySelectorAll('.blockive-accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.blockive-accordion-header');
            const content = item.querySelector('.blockive-accordion-content');

            if (header && content) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all others
                    items.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.blockive-accordion-content');
                        if (otherContent) otherContent.style.display = 'none';

                        const openIcon = otherItem.querySelector('.blockive-icon-open');
                        const closeIcon = otherItem.querySelector('.blockive-icon-close');
                        if (openIcon) openIcon.style.display = 'inline';
                        if (closeIcon) closeIcon.style.display = 'none';
                    });

                    // Toggle current
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.display = 'block';

                        const openIcon = item.querySelector('.blockive-icon-open');
                        const closeIcon = item.querySelector('.blockive-icon-close');
                        if (openIcon) openIcon.style.display = 'none';
                        if (closeIcon) closeIcon.style.display = 'inline';
                    }
                });
            }
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlockiveAccordion);
} else {
    initBlockiveAccordion();
}
