import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * Frontend hydration for the Related Posts block's Slider layout. Grid
 * layout needs no JS. Only Swiper's JS modules are imported here (not
 * `swiper/css`) - the handful of layout rules Swiper's core stylesheet
 * would otherwise provide are hand-written into style-index.css instead, so
 * this block doesn't need its own separately-enqueued view stylesheet and
 * keeps to the "viewScript only" convention every other Template Block uses.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const sliders = document.querySelectorAll( '.bpafb-tb-related-posts-slider' );

	sliders.forEach( ( sliderEl ) => {
		if ( sliderEl.dataset.bpafbSwiperInitialized ) {
			return;
		}
		sliderEl.dataset.bpafbSwiperInitialized = 'true';

		new Swiper( sliderEl, {
			modules: [ Navigation, Pagination ],
			slidesPerView: 1,
			spaceBetween: 20,
			loop: false,
			pagination: {
				el: sliderEl.querySelector( '.swiper-pagination' ),
				clickable: true,
			},
			navigation: {
				nextEl: sliderEl.querySelector( '.swiper-button-next' ),
				prevEl: sliderEl.querySelector( '.swiper-button-prev' ),
			},
			breakpoints: {
				782: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
			},
		} );
	} );
} );
