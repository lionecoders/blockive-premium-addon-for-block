( function( blocks, element, blockEditor, components, compose, hooks, i18n ) {
	const el = element.createElement;
	const { Fragment } = element;
	const { InspectorControls } = blockEditor;
	const { PanelBody, ColorPalette, RangeControl, SelectControl, ToggleControl, ButtonGroup, Button } = components;
	const { createHigherOrderComponent } = compose;
	const { addFilter } = hooks;
	const { __ } = i18n;

	const NAMESPACE = 'blockive-premium-addon-for-block/';

	// 1. Register container attributes for all Blockive blocks
	function addContainerAttributes( settings, name ) {
		if ( ! name.startsWith( NAMESPACE ) ) {
			return settings;
		}

		if ( ! settings.attributes ) {
			settings.attributes = {};
		}

		settings.attributes = Object.assign( {}, settings.attributes, {
			bpafbContainerBgColor: {
				type: 'string',
				default: '',
			},
			bpafbContainerPaddingTop: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerPaddingRight: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerPaddingBottom: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerPaddingLeft: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerMarginTop: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerMarginRight: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerMarginBottom: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerMarginLeft: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerBorderColor: {
				type: 'string',
				default: '',
			},
			bpafbContainerBorderStyle: {
				type: 'string',
				default: 'none',
			},
			bpafbContainerBorderWidth: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerBorderRadius: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerBoxShadow: {
				type: 'boolean',
				default: false,
			},
			bpafbContainerShadowColor: {
				type: 'string',
				default: 'rgba(0,0,0,0.1)',
			},
			bpafbContainerShadowBlur: {
				type: 'number',
				default: 10,
			},
			bpafbContainerShadowSpread: {
				type: 'number',
				default: 0,
			},
			bpafbContainerWidth: {
				type: 'number',
				default: undefined,
			},
			bpafbContainerWidthUnit: {
				type: 'string',
				default: 'px',
			},
			bpafbContainerAlign: {
				type: 'string',
				default: '',
			},
		} );

		return settings;
	}
	addFilter( 'blocks.registerBlockType', 'bpafb/container-attributes', addContainerAttributes );

	// 2. Inject Gutenberg InspectorControls sidebar panel for Blockive blocks
	const withContainerInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
		return ( props ) => {
			if ( ! props.name.startsWith( NAMESPACE ) ) {
				return el( BlockEdit, props );
			}

			const { attributes, setAttributes } = props;
			const {
				bpafbContainerBgColor,
				bpafbContainerPaddingTop,
				bpafbContainerPaddingRight,
				bpafbContainerPaddingBottom,
				bpafbContainerPaddingLeft,
				bpafbContainerMarginTop,
				bpafbContainerMarginRight,
				bpafbContainerMarginBottom,
				bpafbContainerMarginLeft,
				bpafbContainerBorderColor,
				bpafbContainerBorderStyle,
				bpafbContainerBorderWidth,
				bpafbContainerBorderRadius,
				bpafbContainerBoxShadow,
				bpafbContainerShadowColor,
				bpafbContainerShadowBlur,
				bpafbContainerShadowSpread,
				bpafbContainerWidth,
				bpafbContainerWidthUnit,
				bpafbContainerAlign,
			} = attributes;

			// Define width control ranges based on unit type
			let minWidth = 100;
			let maxWidth = 2000;
			let stepWidth = 1;
			if ( bpafbContainerWidthUnit === '%' ) {
				minWidth = 10;
				maxWidth = 100;
			} else if ( bpafbContainerWidthUnit === 'rem' ) {
				minWidth = 5;
				maxWidth = 150;
				stepWidth = 0.1;
			}

			return el(
				Fragment,
				null,
				el( BlockEdit, props ),
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{
							title: __( 'Container Settings', 'blockive-premium-addon-for-block' ),
							initialOpen: false,
						},
						// Width
						el( 'h3', { style: { marginTop: '0px', marginBottom: '10px', fontSize: '14px', fontWeight: '600' } }, __( 'Container Width', 'blockive-premium-addon-for-block' ) ),
						el(
							'div',
							{ style: { display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '15px' } },
							el(
								'div',
								{ style: { flexGrow: 1 } },
								el( RangeControl, {
									label: __( 'Container Max Width', 'blockive-premium-addon-for-block' ),
									value: bpafbContainerWidth,
									onChange: ( val ) => setAttributes( { bpafbContainerWidth: val } ),
									min: minWidth,
									max: maxWidth,
									step: stepWidth,
								} )
							),
							el(
								'div',
								{ style: { width: '80px', marginBottom: '16px' } },
								el( SelectControl, {
									label: __( 'Unit', 'blockive-premium-addon-for-block' ),
									value: bpafbContainerWidthUnit || 'px',
									options: [
										{ label: 'px', value: 'px' },
										{ label: '%', value: '%' },
										{ label: 'rem', value: 'rem' },
									],
									onChange: ( val ) => setAttributes( { bpafbContainerWidthUnit: val } ),
								} )
							)
						),
						el( 'p', { style: { marginTop: '0px', marginBottom: '8px', fontWeight: '500' } }, __( 'Alignment', 'blockive-premium-addon-for-block' ) ),
						el(
							ButtonGroup,
							{ style: { marginBottom: '20px', display: 'flex', width: '100%' } },
							el(
								Button,
								{
									isPrimary: bpafbContainerAlign === 'left',
									isSecondary: bpafbContainerAlign !== 'left',
									style: { flexGrow: 1, textAlign: 'center', justifyContent: 'center' },
									onClick: () => setAttributes( { bpafbContainerAlign: 'left' } ),
								},
								__( 'Left', 'blockive-premium-addon-for-block' )
							),
							el(
								Button,
								{
									isPrimary: bpafbContainerAlign === 'center' || ! bpafbContainerAlign,
									isSecondary: bpafbContainerAlign !== 'center' && bpafbContainerAlign !== '',
									style: { flexGrow: 1, textAlign: 'center', justifyContent: 'center' },
									onClick: () => setAttributes( { bpafbContainerAlign: 'center' } ),
								},
								__( 'Center', 'blockive-premium-addon-for-block' )
							),
							el(
								Button,
								{
									isPrimary: bpafbContainerAlign === 'right',
									isSecondary: bpafbContainerAlign !== 'right',
									style: { flexGrow: 1, textAlign: 'center', justifyContent: 'center' },
									onClick: () => setAttributes( { bpafbContainerAlign: 'right' } ),
								},
								__( 'Right', 'blockive-premium-addon-for-block' )
							)
						),

						el( 'hr', { style: { margin: '15px 0', borderColor: '#e0e0e0' } } ),

						// Background Settings
						el( 'h3', { style: { margin: '0 0 10px 0', fontSize: '14px', fontWeight: '600' } }, __( 'Background Color', 'blockive-premium-addon-for-block' ) ),
						el( ColorPalette, {
							value: bpafbContainerBgColor,
							onChange: ( val ) => setAttributes( { bpafbContainerBgColor: val } ),
						} ),

						el( 'hr', { style: { margin: '15px 0', borderColor: '#e0e0e0' } } ),

						// Spacing settings
						el( 'h3', { style: { margin: '0 0 10px 0', fontSize: '14px', fontWeight: '600' } }, __( 'Padding (px)', 'blockive-premium-addon-for-block' ) ),
						el(
							'div',
							{ style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' } },
							el( RangeControl, {
								label: __( 'Top', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerPaddingTop,
								onChange: ( val ) => setAttributes( { bpafbContainerPaddingTop: val } ),
								min: 0,
								max: 200,
							} ),
							el( RangeControl, {
								label: __( 'Right', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerPaddingRight,
								onChange: ( val ) => setAttributes( { bpafbContainerPaddingRight: val } ),
								min: 0,
								max: 200,
							} ),
							el( RangeControl, {
								label: __( 'Bottom', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerPaddingBottom,
								onChange: ( val ) => setAttributes( { bpafbContainerPaddingBottom: val } ),
								min: 0,
								max: 200,
							} ),
							el( RangeControl, {
								label: __( 'Left', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerPaddingLeft,
								onChange: ( val ) => setAttributes( { bpafbContainerPaddingLeft: val } ),
								min: 0,
								max: 200,
							} )
						),

						el( 'h3', { style: { margin: '0 0 10px 0', fontSize: '14px', fontWeight: '600' } }, __( 'Margin (px)', 'blockive-premium-addon-for-block' ) ),
						el(
							'div',
							{ style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' } },
							el( RangeControl, {
								label: __( 'Top', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerMarginTop,
								onChange: ( val ) => setAttributes( { bpafbContainerMarginTop: val } ),
								min: -100,
								max: 200,
							} ),
							el( RangeControl, {
								label: __( 'Right', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerMarginRight,
								onChange: ( val ) => setAttributes( { bpafbContainerMarginRight: val } ),
								min: -100,
								max: 200,
							} ),
							el( RangeControl, {
								label: __( 'Bottom', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerMarginBottom,
								onChange: ( val ) => setAttributes( { bpafbContainerMarginBottom: val } ),
								min: -100,
								max: 200,
							} ),
							el( RangeControl, {
								label: __( 'Left', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerMarginLeft,
								onChange: ( val ) => setAttributes( { bpafbContainerMarginLeft: val } ),
								min: -100,
								max: 200,
							} )
						),

						el( 'hr', { style: { margin: '15px 0', borderColor: '#e0e0e0' } } ),

						// Border options
						el( 'h3', { style: { margin: '0 0 10px 0', fontSize: '14px', fontWeight: '600' } }, __( 'Border Options', 'blockive-premium-addon-for-block' ) ),
						el( SelectControl, {
							label: __( 'Border Style', 'blockive-premium-addon-for-block' ),
							value: bpafbContainerBorderStyle || 'none',
							options: [
								{ label: __( 'None', 'blockive-premium-addon-for-block' ), value: 'none' },
								{ label: __( 'Solid', 'blockive-premium-addon-for-block' ), value: 'solid' },
								{ label: __( 'Dashed', 'blockive-premium-addon-for-block' ), value: 'dashed' },
								{ label: __( 'Dotted', 'blockive-premium-addon-for-block' ), value: 'dotted' },
								{ label: __( 'Double', 'blockive-premium-addon-for-block' ), value: 'double' },
							],
							onChange: ( val ) => setAttributes( { bpafbContainerBorderStyle: val } ),
						} ),
						bpafbContainerBorderStyle && bpafbContainerBorderStyle !== 'none' && el(
							Fragment,
							null,
							el( 'p', { style: { marginTop: '10px', marginBottom: '8px', fontWeight: '500' } }, __( 'Border Color', 'blockive-premium-addon-for-block' ) ),
							el( ColorPalette, {
								value: bpafbContainerBorderColor,
								onChange: ( val ) => setAttributes( { bpafbContainerBorderColor: val } ),
							} ),
							el( RangeControl, {
								label: __( 'Border Width (px)', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerBorderWidth,
								onChange: ( val ) => setAttributes( { bpafbContainerBorderWidth: val } ),
								min: 0,
								max: 20,
							} )
						),
						el( RangeControl, {
							label: __( 'Border Radius (px)', 'blockive-premium-addon-for-block' ),
							value: bpafbContainerBorderRadius,
							onChange: ( val ) => setAttributes( { bpafbContainerBorderRadius: val } ),
							min: 0,
							max: 100,
						} ),

						el( 'hr', { style: { margin: '15px 0', borderColor: '#e0e0e0' } } ),

						// Box Shadow settings
						el( 'h3', { style: { margin: '0 0 10px 0', fontSize: '14px', fontWeight: '600' } }, __( 'Box Shadow', 'blockive-premium-addon-for-block' ) ),
						el( ToggleControl, {
							label: __( 'Enable Box Shadow', 'blockive-premium-addon-for-block' ),
							checked: ! ! bpafbContainerBoxShadow,
							onChange: ( val ) => setAttributes( { bpafbContainerBoxShadow: val } ),
						} ),
						bpafbContainerBoxShadow && el(
							Fragment,
							null,
							el( 'p', { style: { marginTop: '10px', marginBottom: '8px', fontWeight: '500' } }, __( 'Shadow Color', 'blockive-premium-addon-for-block' ) ),
							el( ColorPalette, {
								value: bpafbContainerShadowColor || 'rgba(0,0,0,0.1)',
								onChange: ( val ) => setAttributes( { bpafbContainerShadowColor: val } ),
							} ),
							el( RangeControl, {
								label: __( 'Shadow Blur', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerShadowBlur !== undefined ? bpafbContainerShadowBlur : 10,
								onChange: ( val ) => setAttributes( { bpafbContainerShadowBlur: val } ),
								min: 0,
								max: 100,
							} ),
							el( RangeControl, {
								label: __( 'Shadow Spread', 'blockive-premium-addon-for-block' ),
								value: bpafbContainerShadowSpread !== undefined ? bpafbContainerShadowSpread : 0,
								onChange: ( val ) => setAttributes( { bpafbContainerShadowSpread: val } ),
								min: -50,
								max: 50,
							} )
						)
					)
				)
			);
		};
	}, 'withContainerInspectorControls' );
	addFilter( 'editor.BlockEdit', 'bpafb/container-controls', withContainerInspectorControls );

	// 3. Apply custom container styles dynamically to the block wrapper in the editor
	const withContainerStyles = createHigherOrderComponent( ( BlockListBlock ) => {
		return ( props ) => {
			if ( ! props.name.startsWith( NAMESPACE ) ) {
				return el( BlockListBlock, props );
			}

			const { attributes } = props;
			const styles = {};

			// Width logic
			if ( attributes.bpafbContainerWidth !== undefined ) {
				const unit = attributes.bpafbContainerWidthUnit || 'px';
				styles.width = '100%';
				styles.maxWidth = attributes.bpafbContainerWidth + unit;
			}

			// Margins Left/Right
			if ( attributes.bpafbContainerMarginLeft !== undefined ) {
				styles.marginLeft = attributes.bpafbContainerMarginLeft + 'px';
			}
			if ( attributes.bpafbContainerMarginRight !== undefined ) {
				styles.marginRight = attributes.bpafbContainerMarginRight + 'px';
			}

			// Margins Top/Bottom
			if ( attributes.bpafbContainerMarginTop !== undefined ) {
				styles.marginTop = attributes.bpafbContainerMarginTop + 'px';
			}
			if ( attributes.bpafbContainerMarginBottom !== undefined ) {
				styles.marginBottom = attributes.bpafbContainerMarginBottom + 'px';
			}

			// Background Color
			if ( attributes.bpafbContainerBgColor ) {
				styles.backgroundColor = attributes.bpafbContainerBgColor;
			}

			// Padding
			if ( attributes.bpafbContainerPaddingTop !== undefined ) {
				styles.paddingTop = attributes.bpafbContainerPaddingTop + 'px';
			}
			if ( attributes.bpafbContainerPaddingRight !== undefined ) {
				styles.paddingRight = attributes.bpafbContainerPaddingRight + 'px';
			}
			if ( attributes.bpafbContainerPaddingBottom !== undefined ) {
				styles.paddingBottom = attributes.bpafbContainerPaddingBottom + 'px';
			}
			if ( attributes.bpafbContainerPaddingLeft !== undefined ) {
				styles.paddingLeft = attributes.bpafbContainerPaddingLeft + 'px';
			}

			// Border settings
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

			// Box Shadow settings
			if ( attributes.bpafbContainerBoxShadow ) {
				const blur = attributes.bpafbContainerShadowBlur !== undefined ? attributes.bpafbContainerShadowBlur : 10;
				const spread = attributes.bpafbContainerShadowSpread !== undefined ? attributes.bpafbContainerShadowSpread : 0;
				const color = attributes.bpafbContainerShadowColor || 'rgba(0,0,0,0.1)';
				styles.boxShadow = `0 4px ${blur}px ${spread}px ${color}`;
			}

			// Merge styles and class name with existing wrapper props
			const existingStyle = props.wrapperProps?.style || {};
			const existingClassName = props.wrapperProps?.className || '';
			const align = attributes.bpafbContainerAlign || (attributes.bpafbContainerWidth !== undefined ? 'center' : '');
			let newClassName = `${existingClassName} bpafb-has-container-settings`;
			if ( align ) {
				newClassName += ` bpafb-align-${align}`;
			}
			newClassName = newClassName.trim();

			const wrapperProps = Object.assign( {}, props.wrapperProps, {
				style: Object.assign( {}, existingStyle, styles ),
				className: newClassName,
			} );

			return el( BlockListBlock, Object.assign( {}, props, { wrapperProps } ) );
		};
	}, 'withContainerStyles' );
	addFilter( 'editor.BlockListBlock', 'bpafb/container-styles', withContainerStyles );

} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.compose,
	window.wp.hooks,
	window.wp.i18n
);
