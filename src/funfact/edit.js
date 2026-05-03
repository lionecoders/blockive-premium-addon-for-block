import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	ColorPalette,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { number, suffix, prefix, title, icon, numberColor, textColor, duration } = attributes;

	const customStyles = {
		'--bpafb-funfact-number-color': numberColor,
		'--bpafb-funfact-text-color': textColor,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-funfact-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<TextControl
						label={__('Number', 'blockive-premium-addon-for-block')}
						value={number}
						onChange={(val) => setAttributes({ number: val })}
					/>
					<TextControl
						label={__('Prefix', 'blockive-premium-addon-for-block')}
						value={prefix}
						onChange={(val) => setAttributes({ prefix: val })}
					/>
					<TextControl
						label={__('Suffix', 'blockive-premium-addon-for-block')}
						value={suffix}
						onChange={(val) => setAttributes({ suffix: val })}
					/>
					<TextControl
						label={__('Title', 'blockive-premium-addon-for-block')}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Settings', 'blockive-premium-addon-for-block')}>
					<RangeControl
						label={__('Animation Duration (ms)', 'blockive-premium-addon-for-block')}
						value={duration}
						onChange={(val) => setAttributes({ duration: val })}
						min={500}
						max={3000}
						step={100}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'blockive-premium-addon-for-block')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Number Color', 'blockive-premium-addon-for-block')}</label>
						<ColorPalette
							value={numberColor}
							onChange={(val) => setAttributes({ numberColor: val })}
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
				<div className="bpafb-funfact-content">
					<div className="bpafb-funfact-number">
						<span className="bpafb-funfact-prefix">{prefix}</span>
						<span className="bpafb-funfact-counter" data-count={number}>0</span>
						<span className="bpafb-funfact-suffix">{suffix}</span>
					</div>
					<h3 className="bpafb-funfact-title">{title}</h3>
				</div>
			</div>
		</>
	);
}
