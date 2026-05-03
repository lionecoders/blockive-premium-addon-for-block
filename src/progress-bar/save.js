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
		'--bpafb-pb-height': `${barHeight !== undefined ? barHeight : 18}px`,
		'--bpafb-pb-radius': `${borderRadius !== undefined ? borderRadius : 50}px`,
		'--bpafb-pb-title-color': titleColor || '#1e293b',
		'--bpafb-pb-percent-color': percentageColor || '#1e293b',
		'--bpafb-pb-track-bg': trackColor || '#f1f5f9',
		'--bpafb-pb-inner-text': innerTextColor || '#ffffff',
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
				className={`bpafb-progress-bar-wrapper bpafb-pb-style-${layoutStyle || 'standard'}`}
				style={{ ...customStyles, textAlign: alignment || 'left' }}
				data-blockive-progress
				data-percentage={percentage}
				data-duration={animationDuration || 1500}
			>
				{layoutStyle === 'standard' && (
					<div className="bpafb-pb-header">
						<RichText.Content
							tagName="span"
							className="bpafb-pb-title"
							value={title}
						/>
						{displayPercentage && (
							<span className="bpafb-pb-percentage">
								<span className="bpafb-pb-number">0</span>%
							</span>
						)}
					</div>
				)}

				<div className="bpafb-pb-track">
					<div 
						className={`bpafb-pb-fill ${isStriped ? 'bpafb-pb-striped' : ''} ${isStriped && isAnimated ? 'bpafb-pb-striped-animated' : ''}`}
						style={{ 
							width: '0%', // Initially 0% for frontend animation!
							...barBgStyle
						}}
					>
						{layoutStyle === 'inside' && (
							<div className="bpafb-pb-inner-content">
								<RichText.Content
									tagName="span"
									className="bpafb-pb-inner-title"
									value={title}
								/>
								{displayPercentage && (
									<span className="bpafb-pb-inner-percent">
										<span className="bpafb-pb-number" style={{ opacity: isAnimated ? 0 : 1 }}>{percentage}</span>%
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
