( function( element, compose, hooks ) {
	const { createHigherOrderComponent } = compose;
	const { addFilter } = hooks;

	const NAMESPACE = 'blockive-premium-addon-for-block/';

	// Every attribute powering the shared "Advanced" tab (see src/components/advanced-tab).
	// Registered globally for every Blockive block so no per-block block.json edits are needed.
	const ADVANCED_ATTRIBUTES = {
		// Layout
		bpafbDisplay: { type: 'string', default: '' },
		bpafbOverflow: { type: 'string', default: '' },
		bpafbPosition: { type: 'string', default: '' },
		bpafbContainerWidth: { type: 'number', default: undefined },
		bpafbContainerWidthUnit: { type: 'string', default: 'px' },
		bpafbContainerMinHeight: { type: 'number', default: undefined },
		bpafbContainerMaxHeight: { type: 'number', default: undefined },
		bpafbContainerAlign: { type: 'string', default: '' },

		// Spacing (desktop)
		bpafbContainerPaddingTop: { type: 'number', default: undefined },
		bpafbContainerPaddingRight: { type: 'number', default: undefined },
		bpafbContainerPaddingBottom: { type: 'number', default: undefined },
		bpafbContainerPaddingLeft: { type: 'number', default: undefined },
		bpafbContainerMarginTop: { type: 'number', default: undefined },
		bpafbContainerMarginRight: { type: 'number', default: undefined },
		bpafbContainerMarginBottom: { type: 'number', default: undefined },
		bpafbContainerMarginLeft: { type: 'number', default: undefined },

		// Spacing (tablet)
		bpafbContainerPaddingTopTablet: { type: 'number', default: undefined },
		bpafbContainerPaddingRightTablet: { type: 'number', default: undefined },
		bpafbContainerPaddingBottomTablet: { type: 'number', default: undefined },
		bpafbContainerPaddingLeftTablet: { type: 'number', default: undefined },
		bpafbContainerMarginTopTablet: { type: 'number', default: undefined },
		bpafbContainerMarginRightTablet: { type: 'number', default: undefined },
		bpafbContainerMarginBottomTablet: { type: 'number', default: undefined },
		bpafbContainerMarginLeftTablet: { type: 'number', default: undefined },

		// Spacing (mobile)
		bpafbContainerPaddingTopMobile: { type: 'number', default: undefined },
		bpafbContainerPaddingRightMobile: { type: 'number', default: undefined },
		bpafbContainerPaddingBottomMobile: { type: 'number', default: undefined },
		bpafbContainerPaddingLeftMobile: { type: 'number', default: undefined },
		bpafbContainerMarginTopMobile: { type: 'number', default: undefined },
		bpafbContainerMarginRightMobile: { type: 'number', default: undefined },
		bpafbContainerMarginBottomMobile: { type: 'number', default: undefined },
		bpafbContainerMarginLeftMobile: { type: 'number', default: undefined },

		// Background
		bpafbContainerBgType: { type: 'string', default: 'color' },
		bpafbContainerBgColor: { type: 'string', default: '' },
		bpafbContainerBgGradient: { type: 'string', default: '' },
		bpafbContainerBgImageUrl: { type: 'string', default: '' },
		bpafbContainerBgImageId: { type: 'number', default: 0 },
		bpafbContainerBgImageSize: { type: 'string', default: 'cover' },
		bpafbContainerOverlayColor: { type: 'string', default: '' },

		// Border
		bpafbContainerBorderColor: { type: 'string', default: '' },
		bpafbContainerBorderStyle: { type: 'string', default: 'none' },
		bpafbContainerBorderWidth: { type: 'number', default: undefined },
		bpafbContainerBorderRadius: { type: 'number', default: undefined },

		// Shadow
		bpafbContainerBoxShadow: { type: 'boolean', default: false },
		bpafbContainerShadowColor: { type: 'string', default: 'rgba(0,0,0,0.1)' },
		bpafbContainerShadowBlur: { type: 'number', default: 10 },
		bpafbContainerShadowSpread: { type: 'number', default: 0 },
		bpafbContainerHoverBoxShadow: { type: 'boolean', default: false },
		bpafbContainerHoverShadowColor: { type: 'string', default: 'rgba(0,0,0,0.15)' },
		bpafbContainerHoverShadowBlur: { type: 'number', default: 15 },
		bpafbContainerHoverShadowSpread: { type: 'number', default: 0 },

		// Visibility
		bpafbHideDesktop: { type: 'boolean', default: false },
		bpafbHideTablet: { type: 'boolean', default: false },
		bpafbHideMobile: { type: 'boolean', default: false },

		// Animation
		bpafbAnimationType: { type: 'string', default: 'none' },
		bpafbAnimationDuration: { type: 'number', default: 800 },
		bpafbAnimationDelay: { type: 'number', default: 0 },
		bpafbAnimationEasing: { type: 'string', default: 'ease' },

		// Transform
		bpafbTransformRotate: { type: 'number', default: 0 },
		bpafbTransformScale: { type: 'number', default: 100 },
		bpafbTransformTranslateX: { type: 'number', default: 0 },
		bpafbTransformTranslateY: { type: 'number', default: 0 },

		// Motion effects
		bpafbHoverAnimation: { type: 'string', default: 'none' },
		bpafbFloatingEffect: { type: 'boolean', default: false },

		// Z-Index
		bpafbZIndex: { type: 'number', default: undefined },

		// Custom CSS / unique id used to scope it
		bpafbCustomCss: { type: 'string', default: '' },
		bpafbUid: { type: 'string', default: '' },

		// HTML attributes
		bpafbHtmlId: { type: 'string', default: '' },
		bpafbHtmlClasses: { type: 'string', default: '' },
	};

	function addContainerAttributes( settings, name ) {
		if ( ! name.startsWith( NAMESPACE ) ) {
			return settings;
		}

		settings.attributes = Object.assign( {}, settings.attributes, ADVANCED_ATTRIBUTES );

		return settings;
	}
	addFilter( 'blocks.registerBlockType', 'bpafb/container-attributes', addContainerAttributes );

	// Live-preview the subset of Advanced attributes that are simple, static
	// wrapper styles. Hover states, responsive breakpoints, custom CSS and
	// scroll animations are frontend-only concerns (see frontend-animations.js
	// and bpafb_render_block_container()) and aren't simulated in the editor.
	const withContainerStyles = createHigherOrderComponent( ( BlockListBlock ) => {
		return ( props ) => {
			if ( ! props.name.startsWith( NAMESPACE ) ) {
				return element.createElement( BlockListBlock, props );
			}

			const { attributes } = props;
			const styles = {};

			if ( attributes.bpafbContainerWidth !== undefined ) {
				const unit = attributes.bpafbContainerWidthUnit || 'px';
				styles.width = '100%';
				styles.maxWidth = attributes.bpafbContainerWidth + unit;
			}

			[ 'MarginLeft', 'MarginRight', 'MarginTop', 'MarginBottom', 'PaddingTop', 'PaddingRight', 'PaddingBottom', 'PaddingLeft' ].forEach( ( suffix ) => {
				const attrKey = 'bpafbContainer' + suffix;
				if ( attributes[ attrKey ] !== undefined ) {
					const cssProp = suffix.replace( /([A-Z])/g, ( m, p1, offset ) => ( offset > 0 ? '-' : '' ) + p1.toLowerCase() );
					styles[ cssProp.replace( /-([a-z])/g, ( m, c ) => c.toUpperCase() ) ] = attributes[ attrKey ] + 'px';
				}
			} );

			if ( attributes.bpafbContainerBgType === 'gradient' && attributes.bpafbContainerBgGradient ) {
				styles.backgroundImage = attributes.bpafbContainerBgGradient;
			} else if ( attributes.bpafbContainerBgType === 'image' && attributes.bpafbContainerBgImageUrl ) {
				styles.backgroundImage = 'url(' + attributes.bpafbContainerBgImageUrl + ')';
				styles.backgroundSize = attributes.bpafbContainerBgImageSize || 'cover';
				styles.backgroundPosition = 'center center';
			} else if ( attributes.bpafbContainerBgColor ) {
				styles.backgroundColor = attributes.bpafbContainerBgColor;
			}

			if ( attributes.bpafbContainerBorderStyle && attributes.bpafbContainerBorderStyle !== 'none' ) {
				styles.borderStyle = attributes.bpafbContainerBorderStyle;
				if ( attributes.bpafbContainerBorderColor ) {
					styles.borderColor = attributes.bpafbContainerBorderColor;
				}
				if ( attributes.bpafbContainerBorderWidth !== undefined ) {
					styles.borderWidth = attributes.bpafbContainerBorderWidth + 'px';
				}
			}
			if ( attributes.bpafbContainerBorderRadius !== undefined ) {
				styles.borderRadius = attributes.bpafbContainerBorderRadius + 'px';
			}

			if ( attributes.bpafbContainerBoxShadow ) {
				const blur = attributes.bpafbContainerShadowBlur !== undefined ? attributes.bpafbContainerShadowBlur : 10;
				const spread = attributes.bpafbContainerShadowSpread !== undefined ? attributes.bpafbContainerShadowSpread : 0;
				const color = attributes.bpafbContainerShadowColor || 'rgba(0,0,0,0.1)';
				styles.boxShadow = `0 4px ${ blur }px ${ spread }px ${ color }`;
			}

			if ( attributes.bpafbDisplay ) {
				styles.display = attributes.bpafbDisplay;
			}
			if ( attributes.bpafbOverflow ) {
				styles.overflow = attributes.bpafbOverflow;
			}
			if ( attributes.bpafbPosition ) {
				styles.position = attributes.bpafbPosition;
			}
			if ( attributes.bpafbContainerMinHeight !== undefined ) {
				styles.minHeight = attributes.bpafbContainerMinHeight + 'px';
			}
			if ( attributes.bpafbContainerMaxHeight !== undefined ) {
				styles.maxHeight = attributes.bpafbContainerMaxHeight + 'px';
			}
			if ( attributes.bpafbZIndex !== undefined ) {
				styles.zIndex = attributes.bpafbZIndex;
			}

			const transforms = [];
			if ( attributes.bpafbTransformRotate ) {
				transforms.push( `rotate(${ attributes.bpafbTransformRotate }deg)` );
			}
			if ( attributes.bpafbTransformScale !== undefined && attributes.bpafbTransformScale !== 100 ) {
				transforms.push( `scale(${ attributes.bpafbTransformScale / 100 })` );
			}
			if ( attributes.bpafbTransformTranslateX ) {
				transforms.push( `translateX(${ attributes.bpafbTransformTranslateX }px)` );
			}
			if ( attributes.bpafbTransformTranslateY ) {
				transforms.push( `translateY(${ attributes.bpafbTransformTranslateY }px)` );
			}
			if ( transforms.length ) {
				styles.transform = transforms.join( ' ' );
			}

			const existingStyle = props.wrapperProps?.style || {};
			const existingClassName = props.wrapperProps?.className || '';
			const align = attributes.bpafbContainerAlign || ( attributes.bpafbContainerWidth !== undefined ? 'center' : '' );
			let newClassName = `${ existingClassName } bpafb-has-container-settings`;
			if ( align ) {
				newClassName += ` bpafb-align-${ align }`;
			}
			if ( attributes.bpafbFloatingEffect ) {
				newClassName += ' bpafb-floating';
			}
			if ( attributes.bpafbHtmlClasses ) {
				newClassName += ` ${ attributes.bpafbHtmlClasses }`;
			}
			newClassName = newClassName.trim();

			const wrapperProps = Object.assign( {}, props.wrapperProps, {
				style: Object.assign( {}, existingStyle, styles ),
				className: newClassName,
				id: attributes.bpafbHtmlId || undefined,
			} );

			return element.createElement( BlockListBlock, Object.assign( {}, props, { wrapperProps } ) );
		};
	}, 'withContainerStyles' );
	addFilter( 'editor.BlockListBlock', 'bpafb/container-styles', withContainerStyles );

} )(
	window.wp.element,
	window.wp.compose,
	window.wp.hooks
);
