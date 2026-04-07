import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	ColorPalette,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		content,
		level,
		alignment,
		link,
		linkTarget,
		textStrokeColor,
		textStrokeWidth,
		textShadowColor,
		textShadowBlur,
		textShadowX,
		textShadowY,
		blendMode,
		animationType,
		animationDuration,
		animationDelay,
	} = attributes;

	const customStyles = {};
	if (alignment) customStyles.textAlign = alignment;
	if (textStrokeWidth) {
		customStyles.WebkitTextStrokeWidth = `${textStrokeWidth}px`;
		if (textStrokeColor) customStyles.WebkitTextStrokeColor = textStrokeColor;
	}
	if (textShadowX || textShadowY || textShadowBlur) {
		customStyles.textShadow = `${textShadowX || 0}px ${textShadowY || 0}px ${textShadowBlur || 0}px ${textShadowColor || '#000'}`;
	}
	if (blendMode && blendMode !== 'normal') {
		customStyles.mixBlendMode = blendMode;
	}
	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps({
		className: animationType !== 'none' ? `lc-animate-${animationType}` : '',
		style: customStyles,
	});

	const TagName = `h${level}`;

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={alignment}
					onChange={(newAlign) => setAttributes({ alignment: newAlign })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Settings', 'lc-block-widgets')} initialOpen={true}>
					<SelectControl
						label={__('HTML Tag', 'lc-block-widgets')}
						value={level}
						options={[
							{ label: 'H1', value: 1 },
							{ label: 'H2', value: 2 },
							{ label: 'H3', value: 3 },
							{ label: 'H4', value: 4 },
							{ label: 'H5', value: 5 },
							{ label: 'H6', value: 6 },
						]}
						onChange={(newLevel) => setAttributes({ level: parseInt(newLevel) })}
					/>
					<TextControl
						label={__('Link', 'lc-block-widgets')}
						value={link}
						onChange={(val) => setAttributes({ link: val })}
					/>
					{link && (
						<ToggleControl
							label={__('Open in new tab', 'lc-block-widgets')}
							checked={linkTarget === '_blank'}
							onChange={(val) => setAttributes({ linkTarget: val ? '_blank' : '_self' })}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Motion Effects', 'lc-block-widgets')} initialOpen={false}>
					<SelectControl
						label={__('Entrance Animation', 'lc-block-widgets')}
						value={animationType}
						options={[
							{ label: 'None', value: 'none' },
							{ label: 'Fade In', value: 'fadeIn' },
							{ label: 'Fade In Up', value: 'fadeInUp' },
							{ label: 'Fade In Down', value: 'fadeInDown' },
							{ label: 'Zoom In', value: 'zoomIn' },
							{ label: 'Slide In Left', value: 'slideInLeft' },
							{ label: 'Slide In Right', value: 'slideInRight' },
						]}
						onChange={(val) => setAttributes({ animationType: val })}
					/>
					{animationType !== 'none' && (
						<>
							<TextControl
								label={__('Animation Duration (e.g., 1s, 500ms)', 'lc-block-widgets')}
								value={animationDuration}
								onChange={(val) => setAttributes({ animationDuration: val })}
							/>
							<TextControl
								label={__('Animation Delay (e.g., 0s, 200ms)', 'lc-block-widgets')}
								value={animationDelay}
								onChange={(val) => setAttributes({ animationDelay: val })}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Advanced Effects', 'lc-block-widgets')} initialOpen={false}>
					<SelectControl
						label={__('Blend Mode', 'lc-block-widgets')}
						value={blendMode}
						options={[
							{ label: 'Normal', value: 'normal' },
							{ label: 'Multiply', value: 'multiply' },
							{ label: 'Screen', value: 'screen' },
							{ label: 'Overlay', value: 'overlay' },
							{ label: 'Darken', value: 'darken' },
							{ label: 'Lighten', value: 'lighten' },
							{ label: 'Color Dodge', value: 'color-dodge' },
							{ label: 'Color Burn', value: 'color-burn' },
							{ label: 'Difference', value: 'difference' },
							{ label: 'Exclusion', value: 'exclusion' },
							{ label: 'Hue', value: 'hue' },
							{ label: 'Saturation', value: 'saturation' },
							{ label: 'Color', value: 'color' },
							{ label: 'Luminosity', value: 'luminosity' },
						]}
						onChange={(val) => setAttributes({ blendMode: val })}
					/>

					<BaseControl label={__('Text Shadow Color', 'lc-block-widgets')}>
						<ColorPalette
							value={textShadowColor}
							onChange={(val) => setAttributes({ textShadowColor: val })}
						/>
					</BaseControl>

					<RangeControl
						label={__('Text Shadow Blur', 'lc-block-widgets')}
						value={textShadowBlur}
						onChange={(val) => setAttributes({ textShadowBlur: val })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__('Text Shadow X', 'lc-block-widgets')}
						value={textShadowX}
						onChange={(val) => setAttributes({ textShadowX: val })}
						min={-100}
						max={100}
					/>
					<RangeControl
						label={__('Text Shadow Y', 'lc-block-widgets')}
						value={textShadowY}
						onChange={(val) => setAttributes({ textShadowY: val })}
						min={-100}
						max={100}
					/>

					<BaseControl label={__('Text Stroke Color', 'lc-block-widgets')}>
						<ColorPalette
							value={textStrokeColor}
							onChange={(val) => setAttributes({ textStrokeColor: val })}
						/>
					</BaseControl>
					<RangeControl
						label={__('Text Stroke Width (px)', 'lc-block-widgets')}
						value={textStrokeWidth}
						onChange={(val) => setAttributes({ textStrokeWidth: val })}
						min={0}
						max={20}
					/>
				</PanelBody>
			</InspectorControls>

			<RichText
				{...blockProps}
				tagName={TagName}
				value={content}
				onChange={(val) => setAttributes({ content: val })}
				placeholder={__('Enter heading...', 'lc-block-widgets')}
				allowedFormats={['core/bold', 'core/italic', 'core/link']}
			/>
		</>
	);
}
