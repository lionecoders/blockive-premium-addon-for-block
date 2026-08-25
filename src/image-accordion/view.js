document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.bpafb-image-accordion');

	accordions.forEach((accordion) => {
		const items = accordion.querySelectorAll('.bpafb-image-accordion-item');

		items.forEach((item) => {
			const activateItem = () => {
				items.forEach((i) => {
					i.classList.remove('active');
					i.setAttribute('aria-current', 'false');
				});
				item.classList.add('active');
				item.setAttribute('aria-current', 'true');
			};

			item.addEventListener('click', activateItem);

			item.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					activateItem();
				}
			});
		});
	});
});
