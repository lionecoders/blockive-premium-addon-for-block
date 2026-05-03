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
		'--bpafb-cd-gap': gap !== undefined ? `${gap}px` : '20px',
		'--bpafb-cd-box-bg': styleType === 'block' ? (boxBgColor || 'transparent') : 'transparent',
		'--bpafb-cd-borderWidth': styleType === 'block' ? `${boxBorderWidth || 0}px` : '0px',
		'--bpafb-cd-borderColor': styleType === 'block' ? (boxBorderColor || 'transparent') : 'transparent',
		'--bpafb-cd-borderRadius': styleType === 'block' ? `${boxBorderRadius || 0}px` : '0px',
		'--bpafb-cd-number-color': numberColor || 'inherit',
		'--bpafb-cd-label-color': labelColor || 'inherit',
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration || '1s';
		customStyles.animationDelay = animationDelay || '0s';
	}

	const blockProps = useBlockProps.save({
		className: `bpafb-countdown-style-${styleType} align${alignment} ${animationType !== 'none' ? `bpafb-animate-${animationType}` : ''}`,
		style: customStyles,
	});

	if (!targetDate) return null;

	return (
		<div {...blockProps}>
			<div className="bpafb-countdown-wrapper" data-target-date={targetDate}>
				{showDays && (
					<div className="bpafb-countdown-item bpafb-cd-days">
						<div className="bpafb-countdown-number">00</div>
						<div className="bpafb-countdown-label">{labelDays}</div>
					</div>
				)}
				{showHours && (
					<div className="bpafb-countdown-item bpafb-cd-hours">
						<div className="bpafb-countdown-number">00</div>
						<div className="bpafb-countdown-label">{labelHours}</div>
					</div>
				)}
				{showMinutes && (
					<div className="bpafb-countdown-item bpafb-cd-minutes">
						<div className="bpafb-countdown-number">00</div>
						<div className="bpafb-countdown-label">{labelMinutes}</div>
					</div>
				)}
				{showSeconds && (
					<div className="bpafb-countdown-item bpafb-cd-seconds">
						<div className="bpafb-countdown-number">00</div>
						<div className="bpafb-countdown-label">{labelSeconds}</div>
					</div>
				)}
			</div>
		</div>
	);
}
