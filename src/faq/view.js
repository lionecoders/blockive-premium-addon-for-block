document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.lc-faq-wrapper');
    
    wrappers.forEach(wrapper => {
        const items = wrapper.querySelectorAll('.lc-faq-item');
        
        items.forEach(item => {
            const header = item.querySelector('.lc-faq-header');
            if (header) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all others
                    items.forEach(i => {
                        i.classList.remove('active');
                        const content = i.querySelector('.lc-faq-content');
                        if (content) content.style.display = 'none';
                        
                        const iconOpen = i.querySelector('.lc-icon-open');
                        const iconClose = i.querySelector('.lc-icon-close');
                        if (iconOpen) iconOpen.style.display = 'inline-block';
                        if (iconClose) iconClose.style.display = 'none';
                    });
                    
                    // Toggle current
                    if (!isActive) {
                        item.classList.add('active');
                        const content = item.querySelector('.lc-faq-content');
                        if (content) content.style.display = 'block';
                        
                        const iconOpen = item.querySelector('.lc-icon-open');
                        const iconClose = item.querySelector('.lc-icon-close');
                        if (iconOpen) iconOpen.style.display = 'none';
                        if (iconClose) iconClose.style.display = 'inline-block';
                    }
                });
            }
        });
    });
});
