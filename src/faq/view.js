document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.bpafb-faq-wrapper');

    wrappers.forEach(wrapper => {
        const items = wrapper.querySelectorAll('.bpafb-faq-item');

        items.forEach(item => {
            const header = item.querySelector('.bpafb-faq-header');
            if (header) {
                const toggleItem = () => {
                    const isActive = item.classList.contains('active');

                    // Close all others
                    items.forEach(i => {
                        i.classList.remove('active');
                        const content = i.querySelector('.bpafb-faq-content');
                        if (content) content.style.display = 'none';

                        const otherHeader = i.querySelector('.bpafb-faq-header');
                        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');

                        const iconOpen = i.querySelector('.bpafb-icon-open');
                        const iconClose = i.querySelector('.bpafb-icon-close');
                        if (iconOpen) iconOpen.style.display = 'inline-block';
                        if (iconClose) iconClose.style.display = 'none';
                    });

                    // Toggle current
                    if (!isActive) {
                        item.classList.add('active');
                        const content = item.querySelector('.bpafb-faq-content');
                        if (content) content.style.display = 'block';
                        header.setAttribute('aria-expanded', 'true');

                        const iconOpen = item.querySelector('.bpafb-icon-open');
                        const iconClose = item.querySelector('.bpafb-icon-close');
                        if (iconOpen) iconOpen.style.display = 'none';
                        if (iconClose) iconClose.style.display = 'inline-block';
                    }
                };

                // Attach click event to header for expand/collapse toggle
                header.addEventListener('click', toggleItem);

                // Attach keyboard support (Enter / Space) for the same toggle
                header.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleItem();
                    }
                });
            }
        });
    });
});
