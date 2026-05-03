document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.blockive-countdown-wrapper');
    
    wrappers.forEach(timer => {
        const targetDateStr = timer.getAttribute('data-target-date');
        if (!targetDateStr) return;
        
        const targetDate = new Date(targetDateStr).getTime();
        
        const daysEl = timer.querySelector('.blockive-cd-days .blockive-countdown-number');
        const hoursEl = timer.querySelector('.blockive-cd-hours .blockive-countdown-number');
        const minsEl = timer.querySelector('.blockive-cd-minutes .blockive-countdown-number');
        const secsEl = timer.querySelector('.blockive-cd-seconds .blockive-countdown-number');
        
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
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
            if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            if (minsEl) minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
            if (secsEl) secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
        };
        
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
    });
});
