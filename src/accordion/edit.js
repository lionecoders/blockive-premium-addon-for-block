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
	RangeControl,
	TextControl,
	Button,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		items,
		icon,
		iconAlign,
		titleColor,
		titleActiveColor,
		titleBgColor,
		contentColor,
		contentBgColor,
		borderColor,
		borderWidth,
		animationType,
		animationDuration,
		animationDelay,
	} = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const customStyles = {
		'--lc-accordion-borderWidth': `${borderWidth}px`,
		'--lc-accordion-borderColor': borderColor,
		'--lc-accordion-title-color': titleColor,
		'--lc-accordion-title-active-color': titleActiveColor,
		'--lc-accordion-title-bg': titleBgColor,
		'--lc-accordion-content-color': contentColor,
		'--lc-accordion-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps({
		className: `lc-accordion-wrapper ${animationType !== 'none' ? `lc-animate-${animationType}` : ''}`,
		style: customStyles,
	});

	const updateItem = (index, key, value) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], [key]: value };
		setAttributes({ items: newItems });
	};

	const addItem = () => {
		setAttributes({
			items: [
				...items,
				{
					id: Date.now().toString(),
					title: `Accordion Item #${items.length + 1}`,
					content: 'Enter content here...',
				},
			],
		});
		setActiveIndex(items.length);
	};

	const removeItem = (index) => {
		const newItems = items.filter((_, i) => i !== index);
		setAttributes({ items: newItems });
		setActiveIndex(0);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Accordion Items', 'lc-block-widgets')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Title', 'lc-block-widgets')}
								value={item.title}
								onChange={(val) => updateItem(index, 'title', val)}
							/>
							<Button isDestructive onClick={() => removeItem(index)}>
								{__('Remove Item', 'lc-block-widgets')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Item', 'lc-block-widgets')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-block-widgets')} initialOpen={false}>
					<SelectControl
						label={__('Icon', 'lc-block-widgets')}
						value={icon}
						options={[
							{ label: 'Plus / Minus', value: 'plus-minus' },
							{ label: 'Chevron', value: 'chevron' },
							{ label: 'Angle', value: 'angle' },
							{ label: 'None', value: 'none' },
						]}
						onChange={(val) => setAttributes({ icon: val })}
					/>
					<SelectControl
						label={__('Icon Alignment', 'lc-block-widgets')}
						value={iconAlign}
						options={[
							{ label: 'Left', value: 'left' },
							{ label: 'Right', value: 'right' },
						]}
						onChange={(val) => setAttributes({ iconAlign: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
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

				<PanelBody title={__('Colors & Borders', 'lc-block-widgets')} initialOpen={false}>
					<RangeControl
						label={__('Border Width (px)', 'lc-block-widgets')}
						value={borderWidth}
						onChange={(val) => setAttributes({ borderWidth: val })}
						min={0}
						max={10}
					/>
					<BaseControl label={__('Border Color', 'lc-block-widgets')}>
						<ColorPalette value={borderColor} onChange={(val) => setAttributes({ borderColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Color', 'lc-block-widgets')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Active Color', 'lc-block-widgets')}>
						<ColorPalette value={titleActiveColor} onChange={(val) => setAttributes({ titleActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Background', 'lc-block-widgets')}>
						<ColorPalette value={titleBgColor} onChange={(val) => setAttributes({ titleBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Color', 'lc-block-widgets')}>
						<ColorPalette value={contentColor} onChange={(val) => setAttributes({ contentColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Background', 'lc-block-widgets')}>
						<ColorPalette value={contentBgColor} onChange={(val) => setAttributes({ contentBgColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{items.map((item, index) => {
					const isActive = activeIndex === index;
					
					let iconElement = null;
					if (icon !== 'none') {
						if (icon === 'plus-minus') {
							iconElement = <span className="lc-accordion-icon"><i className={isActive ? 'fas fa-minus' : 'fas fa-plus'}></i></span>;
						} else if (icon === 'chevron') {
							iconElement = <span className="lc-accordion-icon"><i className={isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i></span>;
						} else if (icon === 'angle') {
							iconElement = <span className="lc-accordion-icon"><i className={isActive ? 'fas fa-angle-up' : 'fas fa-angle-down'}></i></span>;
						}
					}

					return (
						<div key={item.id} className={`lc-accordion-item ${isActive ? 'active' : ''}`}>
							<div 
								className={`lc-accordion-header flex-align-${iconAlign}`}
								onClick={() => setActiveIndex(isActive ? -1 : index)}
							>
								{iconAlign === 'left' && iconElement}
								<RichText
									tagName="span"
									className="lc-accordion-title"
									value={item.title}
									onChange={(val) => updateItem(index, 'title', val)}
									placeholder={__('Title...', 'lc-block-widgets')}
								/>
								{iconAlign === 'right' && iconElement}
							</div>
							{isActive && (
								<div className="lc-accordion-content">
									<RichText
										tagName="p"
										value={item.content}
										onChange={(val) => updateItem(index, 'content', val)}
										placeholder={__('Content...', 'lc-block-widgets')}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}
