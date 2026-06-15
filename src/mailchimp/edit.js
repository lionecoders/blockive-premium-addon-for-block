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
		'--bpafb-mailchimp-bg': bgColor,
		'--bpafb-mailchimp-text': textColor,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-mailchimp-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<TextControl
						label={__('Title', 'blockive-premium-addon-for-block')}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>
					<TextControl
						label={__('Subtitle', 'blockive-premium-addon-for-block')}
						value={subtitle}
						onChange={(val) => setAttributes({ subtitle: val })}
					/>
					<TextControl
						label={__('Placeholder Text', 'blockive-premium-addon-for-block')}
						value={placeholderText}
						onChange={(val) => setAttributes({ placeholderText: val })}
					/>
					<TextControl
						label={__('Button Text', 'blockive-premium-addon-for-block')}
						value={buttonText}
						onChange={(val) => setAttributes({ buttonText: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'blockive-premium-addon-for-block')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Background Color', 'blockive-premium-addon-for-block')}</label>
						<ColorPalette
							value={bgColor}
							onChange={(val) => setAttributes({ bgColor: val })}
						/>
					</div>
					<div>
						<label>{__('Text Color', 'blockive-premium-addon-for-block')}</label>
						<ColorPalette
							value={textColor}
							onChange={(val) => setAttributes({ textColor: val })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-mailchimp-content">
					<h2 className="bpafb-mailchimp-title">{title}</h2>
					<p className="bpafb-mailchimp-subtitle">{subtitle}</p>
					<form className="bpafb-mailchimp-form">
						<input
							type="email"
							className="bpafb-mailchimp-input"
							placeholder={placeholderText}
							disabled
						/>
						<button type="button" className="bpafb-mailchimp-button" disabled>
							{buttonText}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
