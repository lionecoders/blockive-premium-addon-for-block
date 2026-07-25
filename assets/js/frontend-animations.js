/**
 * Scroll-triggered entrance animations for the shared Advanced tab.
 * Adds `bpafb-in-view` to any [data-bpafb-animation] element once it enters
 * the viewport; the CSS animation itself (duration/delay/easing) is driven
 * by the --bpafb-anim-* custom properties set inline by the PHP renderer.
 */
( function() {
	function initBpafbAnimations() {
		var targets = document.querySelectorAll( '[data-bpafb-animation]' );
		if ( ! targets.length ) {
			return;
		}

		if ( ! ( 'IntersectionObserver' in window ) ) {
			targets.forEach( function( el ) {
				el.classList.add( 'bpafb-in-view' );
			} );
			return;
		}

		var observer = new IntersectionObserver(
			function( entries, obs ) {
				entries.forEach( function( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'bpafb-in-view' );
						obs.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
		);

		targets.forEach( function( el ) {
			observer.observe( el );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initBpafbAnimations );
	} else {
		initBpafbAnimations();
	}
} )();
