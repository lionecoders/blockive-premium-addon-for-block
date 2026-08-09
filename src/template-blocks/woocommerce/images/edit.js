import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext, { getEmbeddedFeaturedImageUrl } from '../../shared/use-preview-context';

const SIZE_OPTIONS = [
	{ label: __( 'Thumbnail', 'blockive-premium-addon-for-block' ), value: 'thumbnail' },
	{ label: __( 'Medium', 'blockive-premium-addon-for-block' ), value: 'medium' },
	{ label: __( 'Large', 'blockive-premium-addon-for-block' ), value: 'large' },
	{ label: __( 'Full Size', 'blockive-premium-addon-for-block' ), value: 'full' },
];

const ASPECT_OPTIONS = [
	{ label: __( 'Original', 'blockive-premium-addon-for-block' ), value: '' },
	{ label: '1:1', value: '1/1' },
	{ label: '4:3', value: '4/3' },
	{ label: '3:2', value: '3/2' },
	{ label: '16:9', value: '16/9' },
	{ label: '21:9', value: '21/9' },
];

const OBJECT_FIT_OPTIONS = [
	{ label: __( 'Cover', 'blockive-premium-addon-for-block' ), value: 'cover' },
	{ label: __( 'Contain', 'blockive-premium-addon-for-block' ), value: 'contain' },
	{ label: __( 'Fill', 'blockive-premium-addon-for-block' ), value: 'fill' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { imageSize, aspectRatio, borderRadius, objectFit, lazyLoad, isLink } = attributes;

	const { record, isResolving } = usePreviewContext( 'product' );
	const previewImageUrl = getEmbeddedFeaturedImageUrl( record, imageSize );

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-product-images',
		style: {
			aspectRatio: aspectRatio || undefined,
			borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
			overflow: borderRadius ? 'hidden' : undefined,
		},
	} );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Image', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<SelectControl
								label={ __( 'Image Size', 'blockive-premium-addon-for-block' ) }
								value={ imageSize }
								options={ SIZE_OPTIONS }
								onChange={ ( value ) => setAttributes( { imageSize: value } ) }
							/>
							<SelectControl
								label={ __( 'Aspect Ratio', 'blockive-premium-addon-for-block' ) }
								value={ aspectRatio }
								options={ ASPECT_OPTIONS }
								onChange={ ( value ) => setAttributes( { aspectRatio: value } ) }
							/>
							<SelectControl
								label={ __( 'Object Fit', 'blockive-premium-addon-for-block' ) }
								value={ objectFit }
								options={ OBJECT_FIT_OPTIONS }
								onChange={ ( value ) => setAttributes( { objectFit: value } ) }
							/>
							<ToggleControl
								label={ __( 'Lazy Load', 'blockive-premium-addon-for-block' ) }
								checked={ !! lazyLoad }
								onChange={ ( value ) => setAttributes( { lazyLoad: value } ) }
							/>
							<ToggleControl
								label={ __( 'Link to Product', 'blockive-premium-addon-for-block' ) }
								checked={ !! isLink }
								onChange={ ( value ) => setAttributes( { isLink: value } ) }
							/>
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<RangeControl
								label={ __( 'Border Radius (px)', 'blockive-premium-addon-for-block' ) }
								value={ borderRadius }
								onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<figure { ...blockProps }>
				{ previewImageUrl ? (
					<img src={ previewImageUrl } alt="" style={ { objectFit, width: '100%', height: '100%' } } />
				) : (
					<div className="bpafb-tb-product-images-placeholder">
						{ isResolving
							? __( 'Loading…', 'blockive-premium-addon-for-block' )
							: __( 'Product Image Placeholder', 'blockive-premium-addon-for-block' ) }
					</div>
				) }
			</figure>
		</>
	);
}
