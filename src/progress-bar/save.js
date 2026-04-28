import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div 
				className={`lcibwc-progress-bar-wrapper lcibwc-pb-style-${layoutStyle || 'standard'}`}
				style={{ ...customStyles, textAlign: alignment || 'left' }}
				data-lc-progress
				data-percentage={percentage}
				data-duration={animationDuration || 1500}
			>
				{layoutStyle === 'standard' && (
					<div className="lcibwc-pb-header">
						<RichText.Content
							tagName="span"
							className="lcibwc-pb-title"
							value={title}
						/>
						{displayPercentage && (
							<span className="lcibwc-pb-percentage">
								<span className="lcibwc-pb-number">0</span>%
							</span>
						)}
					</div>
				)}

				<div className="lcibwc-pb-track">
					<div 
						className={`lcibwc-pb-fill ${isStriped ? 'lcibwc-pb-striped' : ''} ${isStriped && isAnimated ? 'lcibwc-pb-striped-animated' : ''}`}
						style={{ 
							width: '0%', // Initially 0% for frontend animation!
							...barBgStyle
						}}
					>
						{layoutStyle === 'inside' && (
							<div className="lcibwc-pb-inner-content">
								<RichText.Content
									tagName="span"
									className="lcibwc-pb-inner-title"
									value={title}
								/>
								{displayPercentage && (
									<span className="lcibwc-pb-inner-percent">
										<span className="lcibwc-pb-number" style={{ opacity: isAnimated ? 0 : 1 }}>{percentage}</span>%
									</span>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
