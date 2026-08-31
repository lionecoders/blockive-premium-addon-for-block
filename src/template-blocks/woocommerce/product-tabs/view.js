/**
 * Blockive Product Tabs frontend initialization script.
 *
 * Vanilla-JS click handling, adapted from the Tabs block's view.js
 * (src/tabs/view.js). Kept as a separate copy (rather than a shared import)
 * because each dynamic block's viewScript is its own webpack entry.
 */
const initBpafbProductTabs = () => {
	const wrappers = document.querySelectorAll(
		'.bpafb-tb-product-tabs-wrapper:not(.bpafb-tb-product-tabs-initialized)'
	);

	wrappers.forEach( ( wrapper ) => {
		wrapper.classList.add( 'bpafb-tb-product-tabs-initialized' );

		const pills = wrapper.querySelectorAll( '.bpafb-tb-product-tab-pill' );
		const panes = wrapper.querySelectorAll( '.bpafb-tb-product-tab-pane' );

		pills.forEach( ( pill, index ) => {
			pill.addEventListener( 'click', () => {
				pills.forEach( ( p ) => p.classList.remove( 'active' ) );
				panes.forEach( ( p ) => p.classList.remove( 'active' ) );

				pill.classList.add( 'active' );
				if ( panes[ index ] ) {
					panes[ index ].classList.add( 'active' );
				}
			} );

			pill.addEventListener( 'keydown', ( event ) => {
				if ( event.key === 'Enter' || event.key === ' ' ) {
					event.preventDefault();
					pill.click();
				}
			} );
		} );
	} );
};

let bpafbProductTabsInitialized = false;

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', () => {
		if ( ! bpafbProductTabsInitialized ) {
			initBpafbProductTabs();
			bpafbProductTabsInitialized = true;
		}
	} );
} else if ( ! bpafbProductTabsInitialized ) {
	initBpafbProductTabs();
	bpafbProductTabsInitialized = true;
}
