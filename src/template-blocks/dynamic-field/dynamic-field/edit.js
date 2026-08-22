import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import ColorStateControls from '../../../components/color-state-controls';

const TAG_OPTIONS = [
	{ label: 'Div', value: 'div' },
	{ label: 'Span', value: 'span' },
	{ label: 'Paragraph', value: 'p' },
];

const OUTPUT_TYPE_OPTIONS = [
	{ label: __( 'Text', 'blockive-premium-addon-for-block' ), value: 'text' },
	{ label: __( 'HTML', 'blockive-premium-addon-for-block' ), value: 'html' },
	{ label: __( 'Image', 'blockive-premium-addon-for-block' ), value: 'image' },
	{ label: __( 'Link', 'blockive-premium-addon-for-block' ), value: 'link' },
	{ label: __( 'Date', 'blockive-premium-addon-for-block' ), value: 'date' },
	{ label: __( 'Number', 'blockive-premium-addon-for-block' ), value: 'number' },
];

// Prefix/suffix only make sense wrapped around plain text/date/number output,
// never around raw html/image markup or a link's href, matching render.php's
// Bpafb_Dynamic_Field_Output logic.
const PREFIX_SUFFIX_OUTPUT_TYPES = [ 'text', 'date', 'number' ];

/**
 * Builds the friendly "Sample Value" placeholder shown in the editor.
 *
 * There is no live post-meta/ACF/etc. data to preview against reliably here
 * (the resolved value depends entirely on which provider+field the user
 * picks, and the generic WP REST post shape used by usePreviewContext()
 * doesn't carry arbitrary meta), so the editor always shows a static
 * placeholder instead of trying to fetch/resolve the real value client-side.
 */
function buildPreview( { fieldKey, outputType, linkText, prefix, suffix, fallback } ) {
	const fieldLabel = fieldKey || __( 'Value', 'blockive-premium-addon-for-block' );

	if ( outputType === 'image' ) {
		return { type: 'image' };
	}

	if ( outputType === 'link' ) {
		return {
			type: 'link',
			text: linkText || fieldKey || __( 'Link', 'blockive-premium-addon-for-block' ),
		};
	}

	if ( outputType === 'html' ) {
		return {
			type: 'text',
			/* translators: %s: field key. */
			text: fallback || sprintf( __( 'Sample HTML for “%s”', 'blockive-premium-addon-for-block' ), fieldLabel ),
		};
	}

	let sample;
	if ( fallback ) {
		sample = fallback;
	} else if ( outputType === 'date' ) {
		sample = __( 'January 1, 2026', 'blockive-premium-addon-for-block' );
	} else if ( outputType === 'number' ) {
		sample = '123';
	} else {
		/* translators: %s: field key. */
		sample = sprintf( __( 'Sample %s', 'blockive-premium-addon-for-block' ), fieldLabel );
	}

	const showAffixes = PREFIX_SUFFIX_OUTPUT_TYPES.includes( outputType );

	return {
		type: 'text',
		text: `${ showAffixes ? prefix || '' : '' }${ sample }${ showAffixes ? suffix || '' : '' }`,
	};
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		provider,
		fieldKey,
		outputType,
		linkText,
		dateFormat,
		prefix,
		suffix,
		fallback,
		tagName,
		textColor,
		textHoverColor,
	} = attributes;

	const providerOptions = window.bpafbTemplateBlocks?.dynamicProviders || [];
	const showAffixes = PREFIX_SUFFIX_OUTPUT_TYPES.includes( outputType );

	const TagName = tagName || 'div';

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-dynamic-field',
		style: {
			color: textColor || undefined,
		},
	} );

	const preview = buildPreview( { fieldKey, outputType, linkText, prefix, suffix, fallback } );

	return (
		<>
			<InspectorTabs
				general={
					<PanelBody title={ __( 'Field', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<SelectControl
							label={ __( 'Provider', 'blockive-premium-addon-for-block' ) }
							value={ provider }
							options={ providerOptions }
							onChange={ ( value ) => setAttributes( { provider: value } ) }
						/>
						<TextControl
							label={ __( 'Field', 'blockive-premium-addon-for-block' ) }
							help={ __( 'The field key/name understood by the selected provider, e.g. a meta key or ACF field name.', 'blockive-premium-addon-for-block' ) }
							value={ fieldKey }
							onChange={ ( value ) => setAttributes( { fieldKey: value } ) }
						/>
						<SelectControl
							label={ __( 'Output Type', 'blockive-premium-addon-for-block' ) }
							value={ outputType }
							options={ OUTPUT_TYPE_OPTIONS }
							onChange={ ( value ) => setAttributes( { outputType: value } ) }
						/>
						{ outputType === 'link' && (
							<TextControl
								label={ __( 'Link Text', 'blockive-premium-addon-for-block' ) }
								placeholder={ fieldKey }
								value={ linkText }
								onChange={ ( value ) => setAttributes( { linkText: value } ) }
							/>
						) }
						{ outputType === 'date' && (
							<TextControl
								label={ __( 'Date Format', 'blockive-premium-addon-for-block' ) }
								help={ __( 'PHP date format, e.g. F j, Y. Leave blank to use the site default.', 'blockive-premium-addon-for-block' ) }
								value={ dateFormat }
								onChange={ ( value ) => setAttributes( { dateFormat: value } ) }
							/>
						) }
						{ showAffixes && (
							<>
								<TextControl
									label={ __( 'Prefix', 'blockive-premium-addon-for-block' ) }
									value={ prefix }
									onChange={ ( value ) => setAttributes( { prefix: value } ) }
								/>
								<TextControl
									label={ __( 'Suffix', 'blockive-premium-addon-for-block' ) }
									value={ suffix }
									onChange={ ( value ) => setAttributes( { suffix: value } ) }
								/>
							</>
						) }
						<TextControl
							label={ __( 'Fallback', 'blockive-premium-addon-for-block' ) }
							help={ __( 'Shown when the resolved field value is empty.', 'blockive-premium-addon-for-block' ) }
							value={ fallback }
							onChange={ ( value ) => setAttributes( { fallback: value } ) }
						/>
						<SelectControl
							label={ __( 'HTML Tag', 'blockive-premium-addon-for-block' ) }
							value={ TagName }
							options={ TAG_OPTIONS }
							onChange={ ( value ) => setAttributes( { tagName: value } ) }
						/>
					</PanelBody>
				}
				style={
					<PanelBody title={ __( 'Colors', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
						<ColorStateControls
							normal={ [
								{
									label: __( 'Text Color', 'blockive-premium-addon-for-block' ),
									value: textColor,
									onChange: ( value ) => setAttributes( { textColor: value } ),
								},
							] }
							hover={ [
								{
									label: __( 'Text Color', 'blockive-premium-addon-for-block' ),
									value: textHoverColor,
									onChange: ( value ) => setAttributes( { textHoverColor: value } ),
								},
							] }
						/>
						<p className="bpafb-help-text">
							{ __( 'Font, size, weight and other typography options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			{ preview.type === 'image' && (
				<TagName { ...blockProps }>
					<div className="bpafb-tb-dynamic-field-placeholder">
						{ __( 'Image Field Placeholder', 'blockive-premium-addon-for-block' ) }
					</div>
				</TagName>
			) }
			{ preview.type === 'link' && (
				<TagName { ...blockProps }>
					<a href="#" onClick={ ( event ) => event.preventDefault() }>
						{ preview.text }
					</a>
				</TagName>
			) }
			{ preview.type === 'text' && (
				<TagName { ...blockProps }>{ preview.text }</TagName>
			) }
		</>
	);
}
