document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.bpafb-image-accordion');

	accordions.forEach((accordion) => {
		const items = accordion.querySelectorAll('.bpafb-image-accordion-item');

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
