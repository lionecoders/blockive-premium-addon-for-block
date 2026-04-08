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
		'--lc-cd-gap': gap !== undefined ? `${gap}px` : '20px',
		'--lc-cd-box-bg': styleType === 'block' ? (boxBgColor || 'transparent') : 'transparent',
		'--lc-cd-border-width': styleType === 'block' ? `${boxBorderWidth || 0}px` : '0px',
		'--lc-cd-border-color': styleType === 'block' ? (boxBorderColor || 'transparent') : 'transparent',
		'--lc-cd-border-radius': styleType === 'block' ? `${boxBorderRadius || 0}px` : '0px',
		'--lc-cd-number-color': numberColor || 'inherit',
		'--lc-cd-label-color': labelColor || 'inherit',
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration || '1s';
		customStyles.animationDelay = animationDelay || '0s';
	}

	const blockProps = useBlockProps({
		className: `lc-countdown-style-${styleType} align${alignment} ${animationType !== 'none' ? `lc-animate-${animationType}` : ''}`,
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
				<PanelBody title={__('Timer Settings', 'lc-block-widgets')} initialOpen={true}>
					<TextControl
						label={__('Target Date & Time', 'lc-block-widgets')}
						type="datetime-local"
						value={targetDate}
						onChange={(val) => setAttributes({ targetDate: val })}
						help={__('Select the date and time to count down to.', 'lc-block-widgets')}
					/>

					<SelectControl
						label={__('View Style', 'lc-block-widgets')}
						value={styleType}
						options={[
							{ label: 'Block (Boxes)', value: 'block' },
							{ label: 'Inline', value: 'inline' },
						]}
						onChange={(val) => setAttributes({ styleType: val })}
					/>

					<ToggleControl
						label={__('Show Days', 'lc-block-widgets')}
						checked={showDays}
						onChange={(val) => setAttributes({ showDays: val })}
					/>
					{showDays && (
						<TextControl label={__('Days Label', 'lc-block-widgets')} value={labelDays} onChange={(val) => setAttributes({ labelDays: val })} />
					)}

					<ToggleControl
						label={__('Show Hours', 'lc-block-widgets')}
						checked={showHours}
						onChange={(val) => setAttributes({ showHours: val })}
					/>
					{showHours && (
						<TextControl label={__('Hours Label', 'lc-block-widgets')} value={labelHours} onChange={(val) => setAttributes({ labelHours: val })} />
					)}

					<ToggleControl
						label={__('Show Minutes', 'lc-block-widgets')}
						checked={showMinutes}
						onChange={(val) => setAttributes({ showMinutes: val })}
					/>
					{showMinutes && (
						<TextControl label={__('Minutes Label', 'lc-block-widgets')} value={labelMinutes} onChange={(val) => setAttributes({ labelMinutes: val })} />
					)}

					<ToggleControl
						label={__('Show Seconds', 'lc-block-widgets')}
						checked={showSeconds}
						onChange={(val) => setAttributes({ showSeconds: val })}
					/>
					{showSeconds && (
						<TextControl label={__('Seconds Label', 'lc-block-widgets')} value={labelSeconds} onChange={(val) => setAttributes({ labelSeconds: val })} />
					)}
				</PanelBody>

				<PanelBody title={__('Styling', 'lc-block-widgets')} initialOpen={false}>
					<RangeControl
						label={__('Space Between (Gap)', 'lc-block-widgets')}
						value={gap}
						onChange={(val) => setAttributes({ gap: val })}
						min={0}
						max={100}
					/>

					{styleType === 'block' && (
						<>
							<RangeControl
								label={__('Border Width (px)', 'lc-block-widgets')}
								value={boxBorderWidth}
								onChange={(val) => setAttributes({ boxBorderWidth: val })}
								min={0}
								max={20}
							/>
							<RangeControl
								label={__('Border Radius (px)', 'lc-block-widgets')}
								value={boxBorderRadius}
								onChange={(val) => setAttributes({ boxBorderRadius: val })}
								min={0}
								max={100}
							/>
							<BaseControl label={__('Box Background Color', 'lc-block-widgets')}>
								<ColorPalette value={boxBgColor} onChange={(val) => setAttributes({ boxBgColor: val })} />
							</BaseControl>
							<BaseControl label={__('Box Border Color', 'lc-block-widgets')}>
								<ColorPalette value={boxBorderColor} onChange={(val) => setAttributes({ boxBorderColor: val })} />
							</BaseControl>
						</>
					)}
					
					<BaseControl label={__('Number Color', 'lc-block-widgets')}>
						<ColorPalette value={numberColor} onChange={(val) => setAttributes({ numberColor: val })} />
					</BaseControl>
					<BaseControl label={__('Label Color', 'lc-block-widgets')}>
						<ColorPalette value={labelColor} onChange={(val) => setAttributes({ labelColor: val })} />
					</BaseControl>
				</PanelBody>

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
								label={__('Animation Duration', 'lc-block-widgets')}
								value={animationDuration}
								onChange={(val) => setAttributes({ animationDuration: val })}
							/>
							<TextControl
								label={__('Animation Delay', 'lc-block-widgets')}
								value={animationDelay}
								onChange={(val) => setAttributes({ animationDelay: val })}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lc-countdown-wrapper" data-target-date={targetDate}>
					{!targetDate && (
						<div style={{ padding: '20px', border: '1px dashed #ccc', textAlign: 'center', width: '100%' }}>
							{__('Please set a target date in the block settings.', 'lc-block-widgets')}
						</div>
					)}
					
					{targetDate && showDays && (
						<div className="lc-countdown-item lc-cd-days">
							<div className="lc-countdown-number">{timeLeft.days}</div>
							<div className="lc-countdown-label">{labelDays}</div>
						</div>
					)}
					{targetDate && showHours && (
						<div className="lc-countdown-item lc-cd-hours">
							<div className="lc-countdown-number">{timeLeft.hours}</div>
							<div className="lc-countdown-label">{labelHours}</div>
						</div>
					)}
					{targetDate && showMinutes && (
						<div className="lc-countdown-item lc-cd-minutes">
							<div className="lc-countdown-number">{timeLeft.minutes}</div>
							<div className="lc-countdown-label">{labelMinutes}</div>
						</div>
					)}
					{targetDate && showSeconds && (
						<div className="lc-countdown-item lc-cd-seconds">
							<div className="lc-countdown-number">{timeLeft.seconds}</div>
							<div className="lc-countdown-label">{labelSeconds}</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
