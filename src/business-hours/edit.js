import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ColorPalette,
	BaseControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		hours,
		highlightToday,
		timeFormat,
		titleColor,
		containerBgColor,
		itemBgColor,
		itemTextColor,
		todayBgColor,
		todayTextColor,
		closedColor,
	} = attributes;

	const customStyles = {
		'--bpafb-bh-title-color': titleColor,
		'--bpafb-bh-container-bg': containerBgColor,
		'--bpafb-bh-item-bg': itemBgColor,
		'--bpafb-bh-item-text-color': itemTextColor,
		'--bpafb-bh-today-bg': todayBgColor,
		'--bpafb-bh-today-text-color': todayTextColor,
		'--bpafb-bh-closed-color': closedColor,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-business-hours-wrapper',
		style: customStyles,
	});

	const updateHour = (index, key, value) => {
		const newHours = [...hours];
		newHours[index] = { ...newHours[index], [key]: value };
		setAttributes({ hours: newHours });
	};

	const addHour = () => {
		setAttributes({
			hours: [
				...hours,
				{ day: 'monday', openTime: '09:00', closeTime: '18:00', isClosed: false, closedText: 'Closed' },
			],
		});
	};

	const removeHour = (index) => {
		const newHours = hours.filter((_, i) => i !== index);
		setAttributes({ hours: newHours });
	};

	const dayOptions = [
		{ label: __('Monday', 'blockive-premium-addon-for-block'), value: 'monday' },
		{ label: __('Tuesday', 'blockive-premium-addon-for-block'), value: 'tuesday' },
		{ label: __('Wednesday', 'blockive-premium-addon-for-block'), value: 'wednesday' },
		{ label: __('Thursday', 'blockive-premium-addon-for-block'), value: 'thursday' },
		{ label: __('Friday', 'blockive-premium-addon-for-block'), value: 'friday' },
		{ label: __('Saturday', 'blockive-premium-addon-for-block'), value: 'saturday' },
		{ label: __('Sunday', 'blockive-premium-addon-for-block'), value: 'sunday' },
	];

	const formatTime = (time) => {
		if (!time) return '';
		
		if (timeFormat === '12') {
			let [hours, minutes] = time.split(':');
			if (!hours || !minutes) return time;
			
			let suffix = 'AM';
			let h = parseInt(hours, 10);
			if (h >= 12) {
				suffix = 'PM';
				if (h > 12) h -= 12;
			}
			if (h === 0) h = 12;
			
			return `${h.toString().padStart(2, '0')}:${minutes} ${suffix}`;
		}
		
		return time;
	};

	const currentDayIndex = new Date().getDay();
	// JS getDay(): 0 = Sunday, 1 = Monday...
	const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	const todayString = dayMap[currentDayIndex];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Business Hours List', 'blockive-premium-addon-for-block')} initialOpen={true}>
					{hours.map((hour, index) => (
						<div key={index} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<SelectControl
								label={__('Day', 'blockive-premium-addon-for-block')}
								value={hour.day}
								options={dayOptions}
								onChange={(val) => updateHour(index, 'day', val)}
							/>
							<ToggleControl
								label={__('Closed', 'blockive-premium-addon-for-block')}
								checked={hour.isClosed}
								onChange={(val) => updateHour(index, 'isClosed', val)}
							/>
							{hour.isClosed ? (
								<TextControl
									label={__('Closed Text', 'blockive-premium-addon-for-block')}
									value={hour.closedText}
									onChange={(val) => updateHour(index, 'closedText', val)}
								/>
							) : (
								<>
									<TextControl
										label={__('Open Time', 'blockive-premium-addon-for-block')}
										type="time"
										value={hour.openTime}
										onChange={(val) => updateHour(index, 'openTime', val)}
									/>
									<TextControl
										label={__('Close Time', 'blockive-premium-addon-for-block')}
										type="time"
										value={hour.closeTime}
										onChange={(val) => updateHour(index, 'closeTime', val)}
									/>
								</>
							)}
							<Button isDestructive onClick={() => removeHour(index)}>
								{__('Remove Item', 'blockive-premium-addon-for-block')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addHour}>
						{__('Add Item', 'blockive-premium-addon-for-block')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Settings', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<ToggleControl
						label={__('Highlight Today', 'blockive-premium-addon-for-block')}
						checked={highlightToday}
						onChange={(val) => setAttributes({ highlightToday: val })}
					/>
					<SelectControl
						label={__('Time Format', 'blockive-premium-addon-for-block')}
						value={timeFormat}
						options={[
							{ label: '12 Hour', value: '12' },
							{ label: '24 Hour', value: '24' },
						]}
						onChange={(val) => setAttributes({ timeFormat: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Colors', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<BaseControl label={__('Title Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Container Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={containerBgColor} onChange={(val) => setAttributes({ containerBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Item Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={itemBgColor} onChange={(val) => setAttributes({ itemBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Item Text Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={itemTextColor} onChange={(val) => setAttributes({ itemTextColor: val })} />
					</BaseControl>
					<BaseControl label={__('Closed Tag Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={closedColor} onChange={(val) => setAttributes({ closedColor: val })} />
					</BaseControl>
					
					{highlightToday && (
						<>
							<BaseControl label={__('Today Background', 'blockive-premium-addon-for-block')}>
								<ColorPalette value={todayBgColor} onChange={(val) => setAttributes({ todayBgColor: val })} />
							</BaseControl>
							<BaseControl label={__('Today Text Color', 'blockive-premium-addon-for-block')}>
								<ColorPalette value={todayTextColor} onChange={(val) => setAttributes({ todayTextColor: val })} />
							</BaseControl>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-business-hours-container">
					{title && (
						<RichText
							tagName="h3"
							className="bpafb-business-hours-title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder={__('Business Hours', 'blockive-premium-addon-for-block')}
						/>
					)}
					
					<div className="bpafb-business-hours-list">
						{hours.map((hour, index) => {
							const isToday = highlightToday && hour.day === todayString;
							const itemClass = `bpafb-business-hours-item ${isToday ? 'today' : ''}`;
							
							const dayLabel = dayOptions.find(d => d.value === hour.day)?.label || hour.day;

							return (
								<div key={index} className={itemClass} data-day={hour.day}>
									<span className="bpafb-business-hours-day">{dayLabel}</span>
									
									{hour.isClosed ? (
										<span className="bpafb-business-hours-time closed">{hour.closedText}</span>
									) : (
										<span className="bpafb-business-hours-time">
											{formatTime(hour.openTime)} - {formatTime(hour.closeTime)}
										</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
