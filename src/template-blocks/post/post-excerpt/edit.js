import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext from '../../shared/use-preview-context';

export default function Edit( { attributes, setAttributes } ) {
	const { excerptLength, showReadMore, readMoreText, textAlign } = attributes;

	const { record, isResolving } = usePreviewContext();

	const rawExcerpt = record?.excerpt?.rendered
		? record.excerpt.rendered.replace( /<[^>]+>/g, ' ' ).replace( /\s+/g, ' ' ).trim()
		: null;
	const placeholder = __(
		'This is a sample excerpt. A short summary of the post content will be displayed here.',
		'blockive-premium-addon-for-block'
	);

	let text = rawExcerpt || ( ! isResolving ? placeholder : '' );
	let isTruncated = false;

	if ( excerptLength > 0 && text.length > excerptLength ) {
		isTruncated = true;
		let trimmed = text.slice( 0, excerptLength );
		const lastSpace = trimmed.lastIndexOf( ' ' );
		if ( lastSpace > 0 ) {
			trimmed = trimmed.slice( 0, lastSpace );
		}
		text = trimmed.trim() + '…';
	}

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-post-excerpt',
		style: { textAlign: textAlign || undefined },
	} );

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( value ) => setAttributes( { textAlign: value } ) }
				/>
			</BlockControls>

			<InspectorTabs
				general={
					<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<RangeControl
							label={ __( 'Character Limit (0 = full excerpt)', 'blockive-premium-addon-for-block' ) }
							value={ excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
							min={ 0 }
							max={ 1000 }
						/>
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

			<p { ...blockProps }>
				{ text }
				{ isTruncated && showReadMore && (
					<>
						{ ' ' }
						<span className="bpafb-tb-post-excerpt-readmore">
							{ readMoreText || __( 'Read More', 'blockive-premium-addon-for-block' ) }
						</span>
					</>
				) }
			</p>
		</>
	);
}
