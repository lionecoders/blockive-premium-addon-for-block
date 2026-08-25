document.addEventListener('DOMContentLoaded', () => {
	const comparisons = document.querySelectorAll('.bpafb-image-comparison');

	comparisons.forEach((comparison) => {
		const handle = comparison.querySelector('.bpafb-comparison-handle');
		const beforeImage = comparison.querySelector('.bpafb-comparison-image.before-image');
		let isActive = false;

		const setPosition = (position) => {
			if (position < 0) position = 0;
			if (position > 100) position = 100;

			handle.style.left = position + '%';
			handle.setAttribute('aria-valuenow', Math.round(position));
			if (beforeImage) {
				beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
			}
		};

		const updatePosition = (x) => {
			const rect = comparison.getBoundingClientRect();
			const position = ((x - rect.left) / rect.width) * 100;
			setPosition(position);
		};

		const startInteraction = (x) => {
			isActive = true;
			updatePosition(x);
		};

		const endInteraction = () => {
			isActive = false;
		};

		// Mouse events
		comparison.addEventListener('mousedown', (e) => {
			startInteraction(e.clientX);
		});

		window.addEventListener('mousemove', (e) => {
			if (!isActive) return;
			updatePosition(e.clientX);
		});

		window.addEventListener('mouseup', endInteraction);

		// Touch events
		comparison.addEventListener('touchstart', (e) => {
			if (e.touches.length > 0) {
				startInteraction(e.touches[0].clientX);
			}
		});

		window.addEventListener('touchmove', (e) => {
			if (!isActive) return;
			if (e.touches.length > 0) {
				updatePosition(e.touches[0].clientX);
			}
		});

		window.addEventListener('touchend', endInteraction);

		// Keyboard interaction (WAI-ARIA slider pattern)
		const currentPosition = () => parseFloat(handle.getAttribute('aria-valuenow')) || 0;
		const STEP = 5;

		handle.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'ArrowLeft':
				case 'ArrowDown':
					e.preventDefault();
					setPosition(currentPosition() - STEP);
					break;
				case 'ArrowRight':
				case 'ArrowUp':
					e.preventDefault();
					setPosition(currentPosition() + STEP);
					break;
				case 'Home':
					e.preventDefault();
					setPosition(0);
					break;
				case 'End':
					e.preventDefault();
					setPosition(100);
					break;
				default:
					break;
			}
		});
	});
});
