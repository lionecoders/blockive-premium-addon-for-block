import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ColorPalette,
	BaseControl,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
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

	const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

	useEffect(() => {
		if (!targetDate) return;
		const target = new Date(targetDate).getTime();
		
		if (isNaN(target)) return;

		const now = new Date().getTime();
		const distance = target - now;

		if (distance <= 0) {
			setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		setTimeLeft({
			days: days < 10 ? '0' + days : days,
			hours: hours < 10 ? '0' + hours : hours,
			minutes: minutes < 10 ? '0' + minutes : minutes,
			seconds: seconds < 10 ? '0' + seconds : seconds,
		});

	}, [targetDate]);

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

	const blockProps = useBlockProps({
		className: `bpafb-countdown-style-${styleType} align${alignment} ${animationType !== 'none' ? `bpafb-animate-${animationType}` : ''}`,
		style: customStyles,
	});

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={alignment}
					onChange={(newAlign) => setAttributes({ alignment: newAlign || 'center' })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Timer Settings', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<TextControl
						label={__('Target Date & Time', 'blockive-premium-addon-for-block')}
						type="datetime-local"
						value={targetDate}
						onChange={(val) => setAttributes({ targetDate: val })}
						help={__('Select the date and time to count down to.', 'blockive-premium-addon-for-block')}
					/>

					<SelectControl
						label={__('View Style', 'blockive-premium-addon-for-block')}
						value={styleType}
						options={[
							{ label: 'Block (Boxes)', value: 'block' },
							{ label: 'Inline', value: 'inline' },
						]}
						onChange={(val) => setAttributes({ styleType: val })}
					/>

					<ToggleControl
						label={__('Show Days', 'blockive-premium-addon-for-block')}
						checked={showDays}
						onChange={(val) => setAttributes({ showDays: val })}
					/>
					{showDays && (
						<TextControl label={__('Days Label', 'blockive-premium-addon-for-block')} value={labelDays} onChange={(val) => setAttributes({ labelDays: val })} />
					)}

					<ToggleControl
						label={__('Show Hours', 'blockive-premium-addon-for-block')}
						checked={showHours}
						onChange={(val) => setAttributes({ showHours: val })}
					/>
					{showHours && (
						<TextControl label={__('Hours Label', 'blockive-premium-addon-for-block')} value={labelHours} onChange={(val) => setAttributes({ labelHours: val })} />
					)}

					<ToggleControl
						label={__('Show Minutes', 'blockive-premium-addon-for-block')}
						checked={showMinutes}
						onChange={(val) => setAttributes({ showMinutes: val })}
					/>
					{showMinutes && (
						<TextControl label={__('Minutes Label', 'blockive-premium-addon-for-block')} value={labelMinutes} onChange={(val) => setAttributes({ labelMinutes: val })} />
					)}

					<ToggleControl
						label={__('Show Seconds', 'blockive-premium-addon-for-block')}
						checked={showSeconds}
						onChange={(val) => setAttributes({ showSeconds: val })}
					/>
					{showSeconds && (
						<TextControl label={__('Seconds Label', 'blockive-premium-addon-for-block')} value={labelSeconds} onChange={(val) => setAttributes({ labelSeconds: val })} />
					)}
				</PanelBody>

				<PanelBody title={__('Styling', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<RangeControl
						label={__('Space Between (Gap)', 'blockive-premium-addon-for-block')}
						value={gap}
						onChange={(val) => setAttributes({ gap: val })}
						min={0}
						max={100}
					/>

					{styleType === 'block' && (
						<>
							<RangeControl
								label={__('Border Width (px)', 'blockive-premium-addon-for-block')}
								value={boxBorderWidth}
								onChange={(val) => setAttributes({ boxBorderWidth: val })}
								min={0}
								max={20}
							/>
							<RangeControl
								label={__('Border Radius (px)', 'blockive-premium-addon-for-block')}
								value={boxBorderRadius}
								onChange={(val) => setAttributes({ boxBorderRadius: val })}
								min={0}
								max={100}
							/>
							<BaseControl label={__('Box Background Color', 'blockive-premium-addon-for-block')}>
								<ColorPalette value={boxBgColor} onChange={(val) => setAttributes({ boxBgColor: val })} />
							</BaseControl>
							<BaseControl label={__('Box Border Color', 'blockive-premium-addon-for-block')}>
								<ColorPalette value={boxBorderColor} onChange={(val) => setAttributes({ boxBorderColor: val })} />
							</BaseControl>
						</>
					)}
					
					<BaseControl label={__('Number Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={numberColor} onChange={(val) => setAttributes({ numberColor: val })} />
					</BaseControl>
					<BaseControl label={__('Label Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={labelColor} onChange={(val) => setAttributes({ labelColor: val })} />
					</BaseControl>
				</PanelBody>

				<PanelBody title={__('Motion Effects', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<SelectControl
						label={__('Entrance Animation', 'blockive-premium-addon-for-block')}
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
								label={__('Animation Duration', 'blockive-premium-addon-for-block')}
								value={animationDuration}
								onChange={(val) => setAttributes({ animationDuration: val })}
							/>
							<TextControl
								label={__('Animation Delay', 'blockive-premium-addon-for-block')}
								value={animationDelay}
								onChange={(val) => setAttributes({ animationDelay: val })}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-countdown-wrapper" data-target-date={targetDate}>
					{!targetDate && (
						<div style={{ padding: '20px', border: '1px dashed #ccc', textAlign: 'center', width: '100%' }}>
							{__('Please set a target date in the block settings.', 'blockive-premium-addon-for-block')}
						</div>
					)}
					
					{targetDate && showDays && (
						<div className="bpafb-countdown-item bpafb-cd-days">
							<div className="bpafb-countdown-number">{timeLeft.days}</div>
							<div className="bpafb-countdown-label">{labelDays}</div>
						</div>
					)}
					{targetDate && showHours && (
						<div className="bpafb-countdown-item bpafb-cd-hours">
							<div className="bpafb-countdown-number">{timeLeft.hours}</div>
							<div className="bpafb-countdown-label">{labelHours}</div>
						</div>
					)}
					{targetDate && showMinutes && (
						<div className="bpafb-countdown-item bpafb-cd-minutes">
							<div className="bpafb-countdown-number">{timeLeft.minutes}</div>
							<div className="bpafb-countdown-label">{labelMinutes}</div>
						</div>
					)}
					{targetDate && showSeconds && (
						<div className="bpafb-countdown-item bpafb-cd-seconds">
							<div className="bpafb-countdown-number">{timeLeft.seconds}</div>
							<div className="bpafb-countdown-label">{labelSeconds}</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
