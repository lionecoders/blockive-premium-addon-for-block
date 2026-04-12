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
		'--lc-pb-height': `${barHeight !== undefined ? barHeight : 18}px`,
		'--lc-pb-radius': `${borderRadius !== undefined ? borderRadius : 50}px`,
		'--lc-pb-title-color': titleColor || '#1e293b',
		'--lc-pb-percent-color': percentageColor || '#1e293b',
		'--lc-pb-track-bg': trackColor || '#f1f5f9',
		'--lc-pb-inner-text': innerTextColor || '#ffffff',
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
				<PanelBody title={__('Content Settings', 'lc-block-widgets')} initialOpen={true}>
					<RangeControl
						label={__('Percentage (%)', 'lc-block-widgets')}
						value={percentage}
						onChange={(val) => setAttributes({ percentage: val })}
						min={0}
						max={100}
					/>
					<ToggleControl
						label={__('Display Percentage Label?', 'lc-block-widgets')}
						checked={displayPercentage}
						onChange={(val) => setAttributes({ displayPercentage: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Design Options', 'lc-block-widgets')} initialOpen={false}>
					<SelectControl
						label={__('Layout Style', 'lc-block-widgets')}
						value={layoutStyle}
						options={[
							{ label: 'Standard (Top Info)', value: 'standard' },
							{ label: 'Inline Inside Bar', value: 'inside' },
						]}
						onChange={(val) => setAttributes({ layoutStyle: val })}
					/>
					<RangeControl
						label={__('Bar Height (px)', 'lc-block-widgets')}
						value={barHeight}
						onChange={(val) => setAttributes({ barHeight: val })}
						min={5}
						max={100}
					/>
					<RangeControl
						label={__('Border Radius (px)', 'lc-block-widgets')}
						value={borderRadius}
						onChange={(val) => setAttributes({ borderRadius: val })}
						min={0}
						max={50}
					/>
					<ToggleControl
						label={__('Striped Bar?', 'lc-block-widgets')}
						checked={isStriped}
						onChange={(val) => setAttributes({ isStriped: val })}
					/>
					{isStriped && (
						<ToggleControl
							label={__('Animate Stripes? (Scrolling)', 'lc-block-widgets')}
							checked={isAnimated}
							onChange={(val) => setAttributes({ isAnimated: val })}
						/>
					)}
					<RangeControl
						label={__('Entrance Animation Speed (ms)', 'lc-block-widgets')}
						value={animationDuration}
						onChange={(val) => setAttributes({ animationDuration: val })}
						min={500}
						max={5000}
						step={100}
						help={__('Controls how long the bar takes to fill up.', 'lc-block-widgets')}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Colors', 'lc-block-widgets')} initialOpen={true}>
					<BaseControl label={__('Bar Progress Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={barColor || '#4f46e5'} onChange={(val) => setAttributes({ barColor: val })} />
					</BaseControl>
					<BaseControl label={__('Track Background', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={trackColor || '#f1f5f9'} onChange={(val) => setAttributes({ trackColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={titleColor || '#1e293b'} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Percentage Color', 'lc-block-widgets')}>
						<ColorPalette colors={themeColors} value={percentageColor || '#1e293b'} onChange={(val) => setAttributes({ percentageColor: val })} />
					</BaseControl>
					
					{layoutStyle === 'inside' && (
						<BaseControl label={__('Inner Text Color', 'lc-block-widgets')}>
							<ColorPalette colors={themeColors} value={innerTextColor || '#ffffff'} onChange={(val) => setAttributes({ innerTextColor: val })} />
						</BaseControl>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div 
					className={`lc-progress-bar-wrapper lc-pb-style-${layoutStyle || 'standard'}`}
					style={{ ...customStyles, textAlign: alignment || 'left' }}
				>
					{layoutStyle === 'standard' && (
						<div className="lc-pb-header">
							<RichText
								tagName="span"
								className="lc-pb-title"
								value={title}
								onChange={(val) => setAttributes({ title: val })}
								placeholder={__('Skill or Metric', 'lc-block-widgets')}
							/>
							{displayPercentage && (
								<span className="lc-pb-percentage">{percentage}%</span>
							)}
						</div>
					)}

					<div className="lc-pb-track">
						<div 
							className={`lc-pb-fill ${isStriped ? 'lc-pb-striped' : ''} ${isStriped && isAnimated ? 'lc-pb-striped-animated' : ''}`}
							style={{ 
								width: `${percentage}%`,
								...barBgStyle
							}}
						>
							{layoutStyle === 'inside' && (
								<div className="lc-pb-inner-content">
									<RichText
										tagName="span"
										className="lc-pb-inner-title"
										value={title}
										onChange={(val) => setAttributes({ title: val })}
										placeholder={__('Label', 'lc-block-widgets')}
									/>
									{displayPercentage && (
										<span className="lc-pb-inner-percent">{percentage}%</span>
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
