document.addEventListener('DOMContentLoaded', () => {
	const testimonialSliders = document.querySelectorAll('.bpafb-testimonial-slider');

	testimonialSliders.forEach((slider) => {
		const items = slider.querySelectorAll('.bpafb-testimonial-item');
		const arrows = slider.querySelectorAll('.bpafb-arrow');
		const dots = slider.querySelectorAll('.bpafb-dot');
		let currentIndex = 0;
		let autoplayInterval;

		const isAutoplay = slider.getAttribute('data-autoplay') === 'true';
		const autoplaySpeed = parseInt(slider.getAttribute('data-autoplay-speed'), 10) || 3000;
		const isInfinite = slider.getAttribute('data-infinite-loop') !== 'false';

		const updateArrows = () => {
			if (!isInfinite) {
				arrows.forEach(arrow => {
					if (arrow.classList.contains('bpafb-prev')) {
						if (currentIndex === 0) {
							arrow.style.opacity = '0.5';
							arrow.style.cursor = 'not-allowed';
						} else {
							arrow.style.opacity = '1';
							arrow.style.cursor = 'pointer';
						}
					} else if (arrow.classList.contains('bpafb-next')) {
						if (currentIndex === items.length - 1) {
							arrow.style.opacity = '0.5';
							arrow.style.cursor = 'not-allowed';
						} else {
							arrow.style.opacity = '1';
							arrow.style.cursor = 'pointer';
						}
					}
				});
			}
		};

		const showSlide = (index) => {
			items.forEach((item) => item.classList.remove('active'));
			dots.forEach((dot) => dot.classList.remove('active'));

			items[index].classList.add('active');
			if (dots[index]) dots[index].classList.add('active');
			currentIndex = index;
			updateArrows();
		};

		const nextSlide = () => {
			if (!isInfinite && currentIndex === items.length - 1) return;
			const newIndex = (currentIndex + 1) % items.length;
			showSlide(newIndex);
		};

		const prevSlide = () => {
			if (!isInfinite && currentIndex === 0) return;
			const newIndex = (currentIndex - 1 + items.length) % items.length;
			showSlide(newIndex);
		};

		const startAutoplay = () => {
			if (isAutoplay && items.length > 1) {
				stopAutoplay(); // clear existing if any
				autoplayInterval = setInterval(nextSlide, autoplaySpeed);
			}
		};

		const stopAutoplay = () => {
			if (autoplayInterval) {
				clearInterval(autoplayInterval);
			}
		};

		arrows.forEach((arrow) => {
			arrow.addEventListener('click', () => {
				if (arrow.classList.contains('bpafb-prev')) {
					prevSlide();
				} else {
					nextSlide();
				}
				stopAutoplay();
				startAutoplay(); // reset timer
			});
		});

		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				showSlide(index);
				stopAutoplay();
				startAutoplay(); // reset timer
			});
		});

		// Pause on hover
		slider.addEventListener('mouseenter', stopAutoplay);
		slider.addEventListener('mouseleave', startAutoplay);

		// Show first slide initially
		if (items.length > 0) {
			showSlide(0);
			startAutoplay();
		}
	});
});
