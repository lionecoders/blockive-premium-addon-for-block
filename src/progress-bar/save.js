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

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div 
				className={`lc-progress-bar-wrapper lc-pb-style-${layoutStyle || 'standard'}`}
				style={{ ...customStyles, textAlign: alignment || 'left' }}
				data-lc-progress
				data-percentage={percentage}
				data-duration={animationDuration || 1500}
			>
				{layoutStyle === 'standard' && (
					<div className="lc-pb-header">
						<RichText.Content
							tagName="span"
							className="lc-pb-title"
							value={title}
						/>
						{displayPercentage && (
							<span className="lc-pb-percentage">
								<span className="lc-pb-number">0</span>%
							</span>
						)}
					</div>
				)}

				<div className="lc-pb-track">
					<div 
						className={`lc-pb-fill ${isStriped ? 'lc-pb-striped' : ''} ${isStriped && isAnimated ? 'lc-pb-striped-animated' : ''}`}
						style={{ 
							width: '0%', // Initially 0% for frontend animation!
							...barBgStyle
						}}
					>
						{layoutStyle === 'inside' && (
							<div className="lc-pb-inner-content">
								<RichText.Content
									tagName="span"
									className="lc-pb-inner-title"
									value={title}
								/>
								{displayPercentage && (
									<span className="lc-pb-inner-percent">
										<span className="lc-pb-number" style={{ opacity: isAnimated ? 0 : 1 }}>{percentage}</span>%
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
