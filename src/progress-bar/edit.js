import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	BaseControl,
	ColorPalette,
} from '@wordpress/components';

const themeColors = [
	{ name: 'Indigo', color: '#4f46e5' },
	{ name: 'Blue', color: '#2563eb' },
	{ name: 'Dark Slate', color: '#0f172a' },
	{ name: 'Gray Element', color: '#f1f5f9' },
	{ name: 'Slate Gray', color: '#475569' },
	{ name: 'White', color: '#ffffff' },
	{ name: 'Red', color: '#ef4444' },
	{ name: 'Green', color: '#22c55e' },
	{ name: 'Gradient Mix', color: 'linear-gradient(90deg, #4f46e5 0%, #0ea5e9 100%)' },
];

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		percentage,
		displayPercentage,
		layoutStyle,
		barHeight,
		borderRadius,
		isStriped,
		isAnimated,
		animationDuration,
		titleColor,
		percentageColor,
		barColor,
		trackColor,
		innerTextColor,
		alignment,
	} = attributes;

	const customStyles = {
		'--lcibwc-pb-height': `${barHeight !== undefined ? barHeight : 18}px`,
		'--lcibwc-pb-radius': `${borderRadius !== undefined ? borderRadius : 50}px`,
		'--lcibwc-pb-title-color': titleColor || '#1e293b',
		'--lcibwc-pb-percent-color': percentageColor || '#1e293b',
		'--lcibwc-pb-track-bg': trackColor || '#f1f5f9',
		'--lcibwc-pb-inner-text': innerTextColor || '#ffffff',
	};

	let barBgStyle = {};
	if (barColor && barColor.includes('gradient')) {
		barBgStyle.backgroundImage = barColor;
	} else {
		barBgStyle.backgroundColor = barColor || '#4f46e5';
	}

	const blockProps = useBlockProps();

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={alignment}
					onChange={(newAlign) => setAttributes({ alignment: newAlign || 'left' })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Content Settings', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<RangeControl
						label={__('Percentage (%)', 'lc-immeasurable-block-widgets-collection')}
						value={percentage}
						onChange={(val) => setAttributes({ percentage: val })}
						min={0}
						max={100}
					/>
					<ToggleControl
						label={__('Display Percentage Label?', 'lc-immeasurable-block-widgets-collectionblock-widgets-collection')}
						checked={displayPercentage}
						onChange={(val) => setAttributes({ displayPercentage: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Design Options', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<SelectControl
						label={__('Layout Style', 'lc-immeasurable-block-widgets-collection')}
						value={layoutStyle}
						options={[
							{ label: 'Standard (Top Info)', value: 'standard' },
							{ label: 'Inline Inside Bar', value: 'inside' },
						]}
						onChange={(val) => setAttributes({ layoutStyle: val })}
					/>
					<RangeControl
						label={__('Bar Height (px)', 'lc-immeasurable-block-widgets-collection')}
						value={barHeight}
						onChange={(val) => setAttributes({ barHeight: val })}
						min={5}
						max={100}
					/>
					<RangeControl
						label={__('Border Radius (px)', 'lc-immeasurable-block-widgets-collection')}
						value={borderRadius}
						onChange={(val) => setAttributes({ borderRadius: val })}
						min={0}
						max={50}
					/>
					<ToggleControl
						label={__('Striped Bar?', 'lc-immeasurable-block-widgets-collection')}
						checked={isStriped}
						onChange={(val) => setAttributes({ isStriped: val })}
					/>
					{isStriped && (
						<ToggleControl
							label={__('Animate Stripes? (Scrolling)', 'lc-immeasurable-block-widgets-collection')}
							checked={isAnimated}
							onChange={(val) => setAttributes({ isAnimated: val })}
						/>
					)}
					<RangeControl
						label={__('Entrance Animation Speed (ms)', 'lc-immeasurable-block-widgets-collection')}
						value={animationDuration}
						onChange={(val) => setAttributes({ animationDuration: val })}
						min={500}
						max={5000}
						step={100}
						help={__('Controls how long the bar takes to fill up.', 'lc-immeasurable-block-widgets-collection')}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<BaseControl label={__('Bar Progress Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette colors={themeColors} value={barColor || '#4f46e5'} onChange={(val) => setAttributes({ barColor: val })} />
					</BaseControl>
					<BaseControl label={__('Track Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette colors={themeColors} value={trackColor || '#f1f5f9'} onChange={(val) => setAttributes({ trackColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette colors={themeColors} value={titleColor || '#1e293b'} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Percentage Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette colors={themeColors} value={percentageColor || '#1e293b'} onChange={(val) => setAttributes({ percentageColor: val })} />
					</BaseControl>
					
					{layoutStyle === 'inside' && (
						<BaseControl label={__('Inner Text Color', 'lc-immeasurable-block-widgets-collection')}>
							<ColorPalette colors={themeColors} value={innerTextColor || '#ffffff'} onChange={(val) => setAttributes({ innerTextColor: val })} />
						</BaseControl>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div 
					className={`lcibwc-progress-bar-wrapper lcibwc-pb-style-${layoutStyle || 'standard'}`}
					style={{ ...customStyles, textAlign: alignment || 'left' }}
				>
					{layoutStyle === 'standard' && (
						<div className="lcibwc-pb-header">
							<RichText
								tagName="span"
								className="lcibwc-pb-title"
								value={title}
								onChange={(val) => setAttributes({ title: val })}
								placeholder={__('Skill or Metric', 'lc-immeasurable-block-widgets-collection')}
							/>
							{displayPercentage && (
								<span className="lcibwc-pb-percentage">{percentage}%</span>
							)}
						</div>
					)}

					<div className="lcibwc-pb-track">
						<div 
							className={`lcibwc-pb-fill ${isStriped ? 'lcibwc-pb-striped' : ''} ${isStriped && isAnimated ? 'lcibwc-pb-striped-animated' : ''}`}
							style={{ 
								width: `${percentage}%`,
								...barBgStyle
							}}
						>
							{layoutStyle === 'inside' && (
								<div className="lcibwc-pb-inner-content">
									<RichText
										tagName="span"
										className="lcibwc-pb-inner-title"
										value={title}
										onChange={(val) => setAttributes({ title: val })}
										placeholder={__('Label', 'lc-immeasurable-block-widgets-collection')}
									/>
									{displayPercentage && (
										<span className="lcibwc-pb-inner-percent">{percentage}%</span>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
