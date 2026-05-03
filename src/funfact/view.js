function animateCounter(counter) {
	const target = parseInt(counter.getAttribute('data-count'));
	const duration = parseInt(getComputedStyle(counter.closest('.bpafb-funfact-wrapper')).getPropertyValue('--bpafb-funfact-duration')) || 1000;
	const increment = target / (duration / 16);
	let current = 0;

	const updateCounter = () => {
		current += increment;
		if (current < target) {
			counter.textContent = Math.floor(current);
			requestAnimationFrame(updateCounter);
		} else {
			counter.textContent = target;
		}
	};

	updateCounter();
}

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.bpafb-funfact-counter');

	const observerOptions = {
		threshold: 0.5,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && entry.target.textContent === '0') {
				animateCounter(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	counters.forEach((counter) => {
		observer.observe(counter);
	});
});
