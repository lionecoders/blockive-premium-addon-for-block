document.addEventListener('DOMContentLoaded', () => {
	const testimonialSliders = document.querySelectorAll('.bpafb-testimonial-slider');

	testimonialSliders.forEach((slider) => {
		const items = slider.querySelectorAll('.bpafb-testimonial-item');
		const arrows = slider.querySelectorAll('.bpafb-arrow');
		const dots = slider.querySelectorAll('.bpafb-dot');
		let currentIndex = 0;

		const showSlide = (index) => {
			items.forEach((item) => item.classList.remove('active'));
			dots.forEach((dot) => dot.classList.remove('active'));

			items[index].classList.add('active');
			if (dots[index]) dots[index].classList.add('active');
			currentIndex = index;
		};

		arrows.forEach((arrow) => {
			arrow.addEventListener('click', () => {
				if (arrow.classList.contains('bpafb-prev')) {
					currentIndex = (currentIndex - 1 + items.length) % items.length;
				} else {
					currentIndex = (currentIndex + 1) % items.length;
				}
				showSlide(currentIndex);
			});
		});

		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				showSlide(index);
			});
		});

		// Show first slide initially
		if (items.length > 0) {
			showSlide(0);
		}
	});
});
