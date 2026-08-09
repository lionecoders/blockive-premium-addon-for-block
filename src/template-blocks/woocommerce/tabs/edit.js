import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useState, RawHTML } from '@wordpress/element';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext from '../../shared/use-preview-context';

const SAMPLE_DESCRIPTION = __(
	'The full product description goes here, describing the product in detail.',
	'blockive-premium-addon-for-block'
);

// WooCommerce attribute/review data isn't part of the generic REST post
// shape, so those two tabs always show realistic static sample content.
const SAMPLE_ATTRIBUTE_ROWS = [
	{ label: __( 'Color', 'blockive-premium-addon-for-block' ), value: 'Red, Blue, Green' },
	{ label: __( 'Size', 'blockive-premium-addon-for-block' ), value: 'Small, Medium, Large' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { showDescriptionTab, showAttributesTab, showReviewsTab } = attributes;

	const { record, isResolving } = usePreviewContext( 'product' );
	const previewDescription = record?.content?.rendered;

	const tabs = [];
	if ( showDescriptionTab ) {
		tabs.push( { key: 'description', label: __( 'Description', 'blockive-premium-addon-for-block' ) } );
	}
	if ( showAttributesTab ) {
		tabs.push( { key: 'attributes', label: __( 'Additional Information', 'blockive-premium-addon-for-block' ) } );
	}
	if ( showReviewsTab ) {
		tabs.push( { key: 'reviews', label: __( 'Reviews (0)', 'blockive-premium-addon-for-block' ) } );
	}

	const [ activeIndex, setActiveIndex ] = useState( 0 );
	const currentIndex = activeIndex < tabs.length ? activeIndex : 0;

	const blockProps = useBlockProps( { className: 'bpafb-tb-product-tabs-wrapper' } );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Tabs', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<ToggleControl
								label={ __( 'Show Description Tab', 'blockive-premium-addon-for-block' ) }
								checked={ !! showDescriptionTab }
								onChange={ ( value ) => setAttributes( { showDescriptionTab: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show Additional Information Tab', 'blockive-premium-addon-for-block' ) }
								checked={ !! showAttributesTab }
								onChange={ ( value ) => setAttributes( { showAttributesTab: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show Reviews Tab', 'blockive-premium-addon-for-block' ) }
								checked={ !! showReviewsTab }
								onChange={ ( value ) => setAttributes( { showReviewsTab: value } ) }
							/>
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Tab colors follow the theme defaults; use Advanced > Custom CSS for further styling.', 'blockive-premium-addon-for-block' ) }
							</p>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				{ tabs.length === 0 ? (
					<p className="bpafb-help-text">
						{ __( 'Enable at least one tab in the block settings.', 'blockive-premium-addon-for-block' ) }
					</p>
				) : (
					<>
						<div className="bpafb-tb-product-tabs-nav" role="tablist">
							{ tabs.map( ( tab, index ) => (
								<button
									key={ tab.key }
									type="button"
									className={ `bpafb-tb-product-tab-pill${ index === currentIndex ? ' active' : '' }` }
									onClick={ () => setActiveIndex( index ) }
								>
									{ tab.label }
								</button>
							) ) }
						</div>
						<div className="bpafb-tb-product-tabs-panels">
							{ tabs.map( ( tab, index ) => (
								<div
									key={ tab.key }
									className={ `bpafb-tb-product-tab-pane${ index === currentIndex ? ' active' : '' }` }
								>
									{ tab.key === 'description' &&
										( isResolving && ! previewDescription ? (
											__( 'Loading…', 'blockive-premium-addon-for-block' )
										) : previewDescription ? (
											<RawHTML>{ previewDescription }</RawHTML>
										) : (
											<p>{ SAMPLE_DESCRIPTION }</p>
										) ) }
									{ tab.key === 'attributes' && (
										<table className="bpafb-tb-product-attributes-table">
											<tbody>
												{ SAMPLE_ATTRIBUTE_ROWS.map( ( row ) => (
													<tr key={ row.label }>
														<th>{ row.label }</th>
														<td>{ row.value }</td>
													</tr>
												) ) }
											</tbody>
										</table>
									) }
									{ tab.key === 'reviews' && (
										<p>{ __( 'There are no reviews yet.', 'blockive-premium-addon-for-block' ) }</p>
									) }
								</div>
							) ) }
						</div>
					</>
				) }
			</div>
		</>
	);
}
