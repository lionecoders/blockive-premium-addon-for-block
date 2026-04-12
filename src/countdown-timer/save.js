import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		targetDate,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		labelDays,
		labelHours,
		labelMinutes,
		labelSeconds,
		styleType,
		boxBgColor,
		boxBorderColor,
		boxBorderWidth,
		boxBorderRadius,
		numberColor,
		labelColor,
		gap,
		alignment,
		animationType,
		animationDuration,
		animationDelay,
	} = attributes;

	const customStyles = {
		'--lc-cd-gap': gap !== undefined ? `${gap}px` : '20px',
		'--lc-cd-box-bg': styleType === 'block' ? (boxBgColor || 'transparent') : 'transparent',
		'--lc-cd-borderWidth': styleType === 'block' ? `${boxBorderWidth || 0}px` : '0px',
		'--lc-cd-borderColor': styleType === 'block' ? (boxBorderColor || 'transparent') : 'transparent',
		'--lc-cd-borderRadius': styleType === 'block' ? `${boxBorderRadius || 0}px` : '0px',
		'--lc-cd-number-color': numberColor || 'inherit',
		'--lc-cd-label-color': labelColor || 'inherit',
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration || '1s';
		customStyles.animationDelay = animationDelay || '0s';
	}

	const blockProps = useBlockProps.save({
		className: `lc-countdown-style-${styleType} align${alignment} ${animationType !== 'none' ? `lc-animate-${animationType}` : ''}`,
		style: customStyles,
	});

	if (!targetDate) return null;

	return (
		<div {...blockProps}>
			<div className="lc-countdown-wrapper" data-target-date={targetDate}>
				{showDays && (
					<div className="lc-countdown-item lc-cd-days">
						<div className="lc-countdown-number">00</div>
						<div className="lc-countdown-label">{labelDays}</div>
					</div>
				)}
				{showHours && (
					<div className="lc-countdown-item lc-cd-hours">
						<div className="lc-countdown-number">00</div>
						<div className="lc-countdown-label">{labelHours}</div>
					</div>
				)}
				{showMinutes && (
					<div className="lc-countdown-item lc-cd-minutes">
						<div className="lc-countdown-number">00</div>
						<div className="lc-countdown-label">{labelMinutes}</div>
					</div>
				)}
				{showSeconds && (
					<div className="lc-countdown-item lc-cd-seconds">
						<div className="lc-countdown-number">00</div>
						<div className="lc-countdown-label">{labelSeconds}</div>
					</div>
				)}
			</div>
		</div>
	);
}
