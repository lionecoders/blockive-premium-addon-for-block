import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ColorPalette,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, placeholderText, buttonText, bgColor, textColor } = attributes;

	const customStyles = {
		'--lcibwc-mailchimp-bg': bgColor,
		'--lcibwc-mailchimp-text': textColor,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-mailchimp-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<TextControl
						label={__('Title', 'lc-immeasurable-block-widgets-collection')}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>
					<TextControl
						label={__('Subtitle', 'lc-immeasurable-block-widgets-collection')}
						value={subtitle}
						onChange={(val) => setAttributes({ subtitle: val })}
					/>
					<TextControl
						label={__('Placeholder Text', 'lc-immeasurable-block-widgets-collection')}
						value={placeholderText}
						onChange={(val) => setAttributes({ placeholderText: val })}
					/>
					<TextControl
						label={__('Button Text', 'lc-immeasurable-block-widgets-collection')}
						value={buttonText}
						onChange={(val) => setAttributes({ buttonText: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Background Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={bgColor}
							onChange={(val) => setAttributes({ bgColor: val })}
						/>
					</div>
					<div>
						<label>{__('Text Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={textColor}
							onChange={(val) => setAttributes({ textColor: val })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-mailchimp-content">
					<h2 className="lcibwc-mailchimp-title">{title}</h2>
					<p className="lcibwc-mailchimp-subtitle">{subtitle}</p>
					<form className="lcibwc-mailchimp-form">
						<input
							type="email"
							className="lcibwc-mailchimp-input"
							placeholder={placeholderText}
							disabled
						/>
						<button type="button" className="lcibwc-mailchimp-button" disabled>
							{buttonText}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
