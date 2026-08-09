import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext, { getEmbeddedFeaturedImageUrl } from '../../shared/use-preview-context';

const POSITION_OPTIONS = [
	{ label: __( 'Bottom', 'blockive-premium-addon-for-block' ), value: 'bottom' },
	{ label: __( 'Left', 'blockive-premium-addon-for-block' ), value: 'left' },
	{ label: __( 'Right', 'blockive-premium-addon-for-block' ), value: 'right' },
	{ label: __( 'None', 'blockive-premium-addon-for-block' ), value: 'none' },
];

const SIZE_OPTIONS = [
	{ label: __( 'Thumbnail', 'blockive-premium-addon-for-block' ), value: 'thumbnail' },
	{ label: __( 'Medium', 'blockive-premium-addon-for-block' ), value: 'medium' },
	{ label: __( 'Large', 'blockive-premium-addon-for-block' ), value: 'large' },
	{ label: __( 'Full Size', 'blockive-premium-addon-for-block' ), value: 'full' },
];

// Real product gallery ids are not reliably present on the generic
// `wp/v2/product` REST entity record, so the thumbnail strip is always
// mocked with placeholder squares in the editor; only the main image uses
// the previewed product's real featured image when available.
const PLACEHOLDER_THUMB_COUNT = 4;

export default function Edit( { attributes, setAttributes } ) {
	const { thumbnailPosition, thumbnailSize, mainImageSize } = attributes;

	const { record, isResolving } = usePreviewContext( 'product' );
	const previewImageUrl = getEmbeddedFeaturedImageUrl( record, mainImageSize );

	const blockProps = useBlockProps( {
		className: `bpafb-tb-product-gallery bpafb-gallery-thumbs-${ thumbnailPosition || 'bottom' }`,
	} );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Gallery', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<SelectControl
								label={ __( 'Thumbnail Position', 'blockive-premium-addon-for-block' ) }
								value={ thumbnailPosition }
								options={ POSITION_OPTIONS }
								onChange={ ( value ) => setAttributes( { thumbnailPosition: value } ) }
							/>
							<SelectControl
								label={ __( 'Main Image Size', 'blockive-premium-addon-for-block' ) }
								value={ mainImageSize }
								options={ SIZE_OPTIONS }
								onChange={ ( value ) => setAttributes( { mainImageSize: value } ) }
							/>
							<SelectControl
								label={ __( 'Thumbnail Size', 'blockive-premium-addon-for-block' ) }
								value={ thumbnailSize }
								options={ SIZE_OPTIONS }
								onChange={ ( value ) => setAttributes( { thumbnailSize: value } ) }
							/>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="bpafb-tb-product-gallery-main">
					{ previewImageUrl ? (
						<img src={ previewImageUrl } alt="" />
					) : (
						<div className="bpafb-tb-product-gallery-placeholder">
							{ isResolving
								? __( 'Loading…', 'blockive-premium-addon-for-block' )
								: __( 'Product Image', 'blockive-premium-addon-for-block' ) }
						</div>
					) }
				</div>
				{ thumbnailPosition !== 'none' && (
					<div className="bpafb-tb-product-gallery-thumbs">
						{ Array.from( { length: PLACEHOLDER_THUMB_COUNT } ).map( ( _, index ) => (
							<div className="bpafb-tb-product-gallery-thumb" key={ index }>
								{ index === 0 && previewImageUrl ? <img src={ previewImageUrl } alt="" /> : null }
							</div>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
