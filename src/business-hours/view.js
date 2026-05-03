document.addEventListener('DOMContentLoaded', () => {
	const wrappers = document.querySelectorAll('.bpafb-business-hours-wrapper[data-highlight-today="true"]');
	if (!wrappers.length) return;

	const currentDayIndex = new Date().getDay();
	const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	const todayString = dayMap[currentDayIndex];

	wrappers.forEach(wrapper => {
		const items = wrapper.querySelectorAll('.bpafb-business-hours-item');
		items.forEach(item => {
			if (item.getAttribute('data-day') === todayString) {
				item.classList.add('today');
			}
		});
	});
});
