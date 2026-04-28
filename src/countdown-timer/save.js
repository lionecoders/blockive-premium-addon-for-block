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
		'--lcibwc-cd-gap': gap !== undefined ? `${gap}px` : '20px',
		'--lcibwc-cd-box-bg': styleType === 'block' ? (boxBgColor || 'transparent') : 'transparent',
		'--lcibwc-cd-borderWidth': styleType === 'block' ? `${boxBorderWidth || 0}px` : '0px',
		'--lcibwc-cd-borderColor': styleType === 'block' ? (boxBorderColor || 'transparent') : 'transparent',
		'--lcibwc-cd-borderRadius': styleType === 'block' ? `${boxBorderRadius || 0}px` : '0px',
		'--lcibwc-cd-number-color': numberColor || 'inherit',
		'--lcibwc-cd-label-color': labelColor || 'inherit',
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration || '1s';
		customStyles.animationDelay = animationDelay || '0s';
	}

	const blockProps = useBlockProps.save({
		className: `lcibwc-countdown-style-${styleType} align${alignment} ${animationType !== 'none' ? `lcibwc-animate-${animationType}` : ''}`,
		style: customStyles,
	});

	if (!targetDate) return null;

	return (
		<div {...blockProps}>
			<div className="lcibwc-countdown-wrapper" data-target-date={targetDate}>
				{showDays && (
					<div className="lcibwc-countdown-item lcibwc-cd-days">
						<div className="lcibwc-countdown-number">00</div>
						<div className="lcibwc-countdown-label">{labelDays}</div>
					</div>
				)}
				{showHours && (
					<div className="lcibwc-countdown-item lcibwc-cd-hours">
						<div className="lcibwc-countdown-number">00</div>
						<div className="lcibwc-countdown-label">{labelHours}</div>
					</div>
				)}
				{showMinutes && (
					<div className="lcibwc-countdown-item lcibwc-cd-minutes">
						<div className="lcibwc-countdown-number">00</div>
						<div className="lcibwc-countdown-label">{labelMinutes}</div>
					</div>
				)}
				{showSeconds && (
					<div className="lcibwc-countdown-item lcibwc-cd-seconds">
						<div className="lcibwc-countdown-number">00</div>
						<div className="lcibwc-countdown-label">{labelSeconds}</div>
					</div>
				)}
			</div>
		</div>
	);
}
