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
						
						// Remove entrance animation attributes after completion so continuous animations (like floating) can take over
						entry.target.addEventListener( 'animationend', function( e ) {
							if ( e.animationName && e.animationName.indexOf( 'bpafb-' ) === 0 && e.animationName !== 'bpafb-floating' ) {
								entry.target.removeAttribute( 'data-bpafb-animation' );
								entry.target.classList.remove( 'bpafb-animate', 'bpafb-in-view' );
							}
						}, { once: true } );
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
