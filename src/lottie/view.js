// Load Lottie Web library if not already loaded
if (!window.lottie && !document.querySelector('script[src*="lottie"]')) {
	const script = document.createElement('script');
	script.src = 'https://unpkg.com/@dotlottie/player-web@latest';
	script.type = 'module';
	document.head.appendChild(script);
}
