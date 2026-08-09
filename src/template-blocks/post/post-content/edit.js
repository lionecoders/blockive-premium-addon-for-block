import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl } from '@wordpress/components';
import { RawHTML } from '@wordpress/element';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext from '../../shared/use-preview-context';

export default function Edit( { attributes, setAttributes } ) {
	const { wordLimit, showReadMore, readMoreText, maxWidth, dropCap, textAlign } = attributes;

	const { record, isResolving } = usePreviewContext();

	const rawHtml = record?.content?.rendered || '';
	const placeholderHtml = `<p>${ __(
		'This is sample post content. The full post content will be displayed here dynamically when this template is used on a real post.',
		'blockive-premium-addon-for-block'
	) }</p>`;

	let previewHtml = rawHtml || ( ! isResolving ? placeholderHtml : '' );
	let isTruncated = false;

	if ( wordLimit > 0 && previewHtml ) {
		const plain = previewHtml
			.replace( /<[^>]+>/g, ' ' )
			.replace( /\s+/g, ' ' )
			.trim();
		const words = plain.split( ' ' ).filter( Boolean );
		if ( words.length > wordLimit ) {
			isTruncated = true;
			previewHtml = `<p>${ words.slice( 0, wordLimit ).join( ' ' ) }…</p>`;
		} else {
			previewHtml = `<p>${ plain }</p>`;
		}
	}

	const blockProps = useBlockProps( {
		className: `bpafb-tb-post-content${ dropCap ? ' bpafb-has-drop-cap' : '' }`,
		style: {
			textAlign: textAlign || undefined,
			maxWidth: maxWidth ? `${ maxWidth }px` : undefined,
		},
	} );

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( value ) => setAttributes( { textAlign: value } ) }
				/>
			</BlockControls>

			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Content', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<RangeControl
								label={ __( 'Truncate to Words (0 = full content)', 'blockive-premium-addon-for-block' ) }
								value={ wordLimit }
								onChange={ ( value ) => setAttributes( { wordLimit: value } ) }
								min={ 0 }
								max={ 500 }
							/>
							{ wordLimit > 0 && (
								<>
									<ToggleControl
										label={ __( 'Show Read More Link', 'blockive-premium-addon-for-block' ) }
										checked={ !! showReadMore }
										onChange={ ( value ) => setAttributes( { showReadMore: value } ) }
									/>
									{ showReadMore && (
										<TextControl
											label={ __( 'Read More Text', 'blockive-premium-addon-for-block' ) }
											value={ readMoreText }
											onChange={ ( value ) => setAttributes( { readMoreText: value } ) }
										/>
									) }
								</>
							) }
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<RangeControl
								label={ __( 'Max Width (px, 0 = none)', 'blockive-premium-addon-for-block' ) }
								value={ maxWidth }
								onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
								min={ 0 }
								max={ 1600 }
							/>
							<ToggleControl
								label={ __( 'Drop Cap', 'blockive-premium-addon-for-block' ) }
								checked={ !! dropCap }
								onChange={ ( value ) => setAttributes( { dropCap: value } ) }
							/>
							<p className="bpafb-help-text">
								{ __( 'Font, size, weight, color and other typography options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
							</p>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<RawHTML>{ previewHtml }</RawHTML>
				{ isTruncated && showReadMore && (
					<p className="bpafb-tb-post-content-readmore">
						<span className="bpafb-tb-post-content-readmore-link">
							{ readMoreText || __( 'Read More', 'blockive-premium-addon-for-block' ) }
						</span>
					</p>
				) }
			</div>
		</>
	);
}
