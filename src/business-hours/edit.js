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
	} = attributes;

	const customStyles = {
		'--lcibwc-bh-title-color': titleColor,
		'--lcibwc-bh-container-bg': containerBgColor,
		'--lcibwc-bh-item-bg': itemBgColor,
		'--lcibwc-bh-item-text-color': itemTextColor,
		'--lcibwc-bh-today-bg': todayBgColor,
		'--lcibwc-bh-today-text-color': todayTextColor,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-business-hours-wrapper',
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
		{ label: __('Monday', 'lc-immeasurable-block-widgets-collection'), value: 'monday' },
		{ label: __('Tuesday', 'lc-immeasurable-block-widgets-collection'), value: 'tuesday' },
		{ label: __('Wednesday', 'lc-immeasurable-block-widgets-collection'), value: 'wednesday' },
		{ label: __('Thursday', 'lc-immeasurable-block-widgets-collection'), value: 'thursday' },
		{ label: __('Friday', 'lc-immeasurable-block-widgets-collection'), value: 'friday' },
		{ label: __('Saturday', 'lc-immeasurable-block-widgets-collection'), value: 'saturday' },
		{ label: __('Sunday', 'lc-immeasurable-block-widgets-collection'), value: 'sunday' },
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
				<PanelBody title={__('Business Hours List', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					{hours.map((hour, index) => (
						<div key={index} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<SelectControl
								label={__('Day', 'lc-immeasurable-block-widgets-collection')}
								value={hour.day}
								options={dayOptions}
								onChange={(val) => updateHour(index, 'day', val)}
							/>
							<ToggleControl
								label={__('Closed', 'lc-immeasurable-block-widgets-collection')}
								checked={hour.isClosed}
								onChange={(val) => updateHour(index, 'isClosed', val)}
							/>
							{hour.isClosed ? (
								<TextControl
									label={__('Closed Text', 'lc-immeasurable-block-widgets-collection')}
									value={hour.closedText}
									onChange={(val) => updateHour(index, 'closedText', val)}
								/>
							) : (
								<>
									<TextControl
										label={__('Open Time', 'lc-immeasurable-block-widgets-collection')}
										type="time"
										value={hour.openTime}
										onChange={(val) => updateHour(index, 'openTime', val)}
									/>
									<TextControl
										label={__('Close Time', 'lc-immeasurable-block-widgets-collection')}
										type="time"
										value={hour.closeTime}
										onChange={(val) => updateHour(index, 'closeTime', val)}
									/>
								</>
							)}
							<Button isDestructive onClick={() => removeHour(index)}>
								{__('Remove Item', 'lc-immeasurable-block-widgets-collection')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addHour}>
						{__('Add Item', 'lc-immeasurable-block-widgets-collection')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<ToggleControl
						label={__('Highlight Today', 'lc-immeasurable-block-widgets-collection')}
						checked={highlightToday}
						onChange={(val) => setAttributes({ highlightToday: val })}
					/>
					<SelectControl
						label={__('Time Format', 'lc-immeasurable-block-widgets-collection')}
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
				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<BaseControl label={__('Title Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Container Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={containerBgColor} onChange={(val) => setAttributes({ containerBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Item Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={itemBgColor} onChange={(val) => setAttributes({ itemBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Item Text Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={itemTextColor} onChange={(val) => setAttributes({ itemTextColor: val })} />
					</BaseControl>
					
					{highlightToday && (
						<>
							<BaseControl label={__('Today Background', 'lc-immeasurable-block-widgets-collection')}>
								<ColorPalette value={todayBgColor} onChange={(val) => setAttributes({ todayBgColor: val })} />
							</BaseControl>
							<BaseControl label={__('Today Text Color', 'lc-immeasurable-block-widgets-collection')}>
								<ColorPalette value={todayTextColor} onChange={(val) => setAttributes({ todayTextColor: val })} />
							</BaseControl>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-business-hours-container">
					{title && (
						<RichText
							tagName="h3"
							className="lcibwc-business-hours-title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder={__('Business Hours', 'lc-immeasurable-block-widgets-collection')}
						/>
					)}
					
					<div className="lcibwc-business-hours-list">
						{hours.map((hour, index) => {
							const isToday = highlightToday && hour.day === todayString;
							const itemClass = `lcibwc-business-hours-item ${isToday ? 'today' : ''}`;
							
							const dayLabel = dayOptions.find(d => d.value === hour.day)?.label || hour.day;

							return (
								<div key={index} className={itemClass} data-day={hour.day}>
									<span className="lcibwc-business-hours-day">{dayLabel}</span>
									
									{hour.isClosed ? (
										<span className="lcibwc-business-hours-time closed">{hour.closedText}</span>
									) : (
										<span className="lcibwc-business-hours-time">
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
