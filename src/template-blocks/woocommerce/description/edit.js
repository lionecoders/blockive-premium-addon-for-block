import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { RawHTML } from '@wordpress/element';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext from '../../shared/use-preview-context';

const SAMPLE_TEXT = __(
	'The full product description goes here. It typically includes several paragraphs covering features, materials, sizing and other details customers need before buying.',
	'blockive-premium-addon-for-block'
);

export default function Edit( { attributes, setAttributes } ) {
	const { maxWidth } = attributes;

	const { record, isResolving } = usePreviewContext( 'product' );
	const previewHtml = record?.content?.rendered || '';

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-product-description',
		style: {
			maxWidth: maxWidth ? `${ maxWidth }px` : undefined,
		},
	} );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<RangeControl
								label={ __( 'Max Width (px)', 'blockive-premium-addon-for-block' ) }
								value={ maxWidth }
								onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
								min={ 0 }
								max={ 1200 }
								help={ __( '0 = no limit.', 'blockive-premium-addon-for-block' ) }
							/>
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Font, size, weight, color and other typography options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
							</p>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				{ isResolving && ! previewHtml ? (
					__( 'Loading…', 'blockive-premium-addon-for-block' )
				) : previewHtml ? (
					<RawHTML>{ previewHtml }</RawHTML>
				) : (
					<p>{ SAMPLE_TEXT }</p>
				) }
			</div>
		</>
	);
}
