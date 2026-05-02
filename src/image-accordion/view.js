document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.lcibwc-image-accordion');

	accordions.forEach((accordion) => {
		const items = accordion.querySelectorAll('.lcibwc-image-accordion-item');

		items.forEach((item) => {
			item.addEventListener('click', () => {
				items.forEach((i) => i.classList.remove('active'));
				item.classList.add('active');
			});

			item.addEventListener('mouseover', () => {
				items.forEach((i) => i.classList.remove('hovered'));
				item.classList.add('hovered');
			});
		});
	});
});
