/**
 * Frontend slider initialization for the Upsells Template Block. Identical
 * to the Related Products / Cross Sells view.js - each dynamic block's
 * viewScript is its own webpack entry, so this small script is duplicated
 * rather than shared.
 */
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const initBpafbProductCardSliders = () => {
	const lists = document.querySelectorAll(
		'.bpafb-product-card-list--slider:not(.bpafb-pcl-initialized)'
	);

	lists.forEach( ( list ) => {
		const swiperEl = list.querySelector( '.swiper' );
		if ( ! swiperEl ) {
			return;
		}
		list.classList.add( 'bpafb-pcl-initialized' );

		const columns = parseInt( list.getAttribute( 'data-columns' ), 10 ) || 4;

		new Swiper( swiperEl, {
			modules: [ Navigation, Pagination ],
			slidesPerView: 1,
			spaceBetween: 20,
			navigation: {
				nextEl: list.querySelector( '.bpafb-pcl-next' ),
				prevEl: list.querySelector( '.bpafb-pcl-prev' ),
			},
			pagination: {
				el: list.querySelector( '.bpafb-pcl-pagination' ),
				clickable: true,
			},
			breakpoints: {
				480: { slidesPerView: Math.min( 2, columns ) },
				782: { slidesPerView: Math.min( 3, columns ) },
				1024: { slidesPerView: columns },
			},
		} );
	} );
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initBpafbProductCardSliders );
} else {
	initBpafbProductCardSliders();
}
