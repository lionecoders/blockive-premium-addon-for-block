/**
 * Frontend script for Blockive Progress Bar.
 * Handles Intersection Observer to animate the bar and counter on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
	const initProgressBars = () => {
		const progressBars = document.querySelectorAll('.blockive-progress-bar-wrapper[data-blockive-progress]:not(.blockive-pb-initialized)');
		
		if (!progressBars.length) return;

		const observer = new IntersectionObserver((entries, observerInstance) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const wrapper = entry.target;
					const fillArea = wrapper.querySelector('.blockive-pb-fill');
					const numberElements = wrapper.querySelectorAll('.blockive-pb-number');
					
					const targetPercentage = parseFloat(wrapper.getAttribute('data-percentage')) || 0;
					const duration = parseInt(wrapper.getAttribute('data-duration'), 10) || 1500;
					
					// 1. Animate Width
					if (fillArea) {
						fillArea.style.transition = `width ${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
						fillArea.style.width = `${targetPercentage}%`;
					}

					// 2. Animate Numbers
					if (numberElements.length > 0) {
						let startTimestamp = null;
						const step = (timestamp) => {
							if (!startTimestamp) startTimestamp = timestamp;
							const progress = Math.min((timestamp - startTimestamp) / duration, 1);
							
							// Ease Out Quart function for standard smooth deceleration
							const easeOut = 1 - Math.pow(1 - progress, 4);
							
							const currentVal = Math.floor(easeOut * targetPercentage);
							
							numberElements.forEach(el => {
								el.textContent = currentVal;
							});

							if (progress < 1) {
								window.requestAnimationFrame(step);
							} else {
								numberElements.forEach(el => {
									el.textContent = targetPercentage;
								});
							}
						};
						window.requestAnimationFrame(step);
					}

					// Mark as initialized and stop observing
					wrapper.classList.add('bpafb-pb-initialized');
					observerInstance.unobserve(wrapper);
				}
			});
		}, {
			rootMargin: '0px 0px -50px 0px',
			threshold: 0.1
		});

		progressBars.forEach(bar => {
			observer.observe(bar);
		});
	};

	initProgressBars();
});
