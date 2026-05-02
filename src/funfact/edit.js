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
		'--lcibwc-funfact-number-color': numberColor,
		'--lcibwc-funfact-text-color': textColor,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-funfact-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<TextControl
						label={__('Number', 'lc-immeasurable-block-widgets-collection')}
						value={number}
						onChange={(val) => setAttributes({ number: val })}
					/>
					<TextControl
						label={__('Prefix', 'lc-immeasurable-block-widgets-collection')}
						value={prefix}
						onChange={(val) => setAttributes({ prefix: val })}
					/>
					<TextControl
						label={__('Suffix', 'lc-immeasurable-block-widgets-collection')}
						value={suffix}
						onChange={(val) => setAttributes({ suffix: val })}
					/>
					<TextControl
						label={__('Title', 'lc-immeasurable-block-widgets-collection')}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-immeasurable-block-widgets-collection')}>
					<RangeControl
						label={__('Animation Duration (ms)', 'lc-immeasurable-block-widgets-collection')}
						value={duration}
						onChange={(val) => setAttributes({ duration: val })}
						min={500}
						max={3000}
						step={100}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Number Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={numberColor}
							onChange={(val) => setAttributes({ numberColor: val })}
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
				<div className="lcibwc-funfact-content">
					<div className="lcibwc-funfact-number">
						<span className="lcibwc-funfact-prefix">{prefix}</span>
						<span className="lcibwc-funfact-counter" data-count={number}>0</span>
						<span className="lcibwc-funfact-suffix">{suffix}</span>
					</div>
					<h3 className="lcibwc-funfact-title">{title}</h3>
				</div>
			</div>
		</>
	);
}
