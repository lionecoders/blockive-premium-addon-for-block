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
		'--bpafb-accordion-bw': `${borderWidth}px`,
		'--bpafb-accordion-borderColor': borderColor,
		'--bpafb-accordion-title-color': titleColor,
		'--bpafb-accordion-title-active-color': titleActiveColor,
		'--bpafb-accordion-title-bg': titleBgColor,
		'--bpafb-accordion-content-color': contentColor,
		'--bpafb-accordion-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps({
		className: `bpafb-accordion-wrapper ${animationType !== 'none' ? `bpafb-animate-${animationType}` : ''}`,
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
				<PanelBody title={__('Accordion Items', 'blockive-premium-addon-for-block')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Title', 'blockive-premium-addon-for-block')}
								value={item.title}
								onChange={(val) => updateItem(index, 'title', val)}
							/>
							<Button isDestructive onClick={() => removeItem(index)}>
								{__('Remove Item', 'blockive-premium-addon-for-block')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Item', 'blockive-premium-addon-for-block')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Settings', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<SelectControl
						label={__('Icon', 'blockive-premium-addon-for-block')}
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
						label={__('Icon Alignment', 'blockive-premium-addon-for-block')}
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

				<PanelBody title={__('Colors & Borders', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<RangeControl
						label={__('Border Width (px)', 'blockive-premium-addon-for-block')}
						value={borderWidth}
						onChange={(val) => setAttributes({ borderWidth: val })}
						min={0}
						max={10}
					/>
					<BaseControl label={__('Border Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={borderColor} onChange={(val) => setAttributes({ borderColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Active Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleActiveColor} onChange={(val) => setAttributes({ titleActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleBgColor} onChange={(val) => setAttributes({ titleBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={contentColor} onChange={(val) => setAttributes({ contentColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Background', 'blockive-premium-addon-for-block')}>
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
							iconElement = <span className="bpafb-accordion-icon"><i className={isActive ? 'fas fa-minus' : 'fas fa-plus'}></i></span>;
						} else if (icon === 'chevron') {
							iconElement = <span className="bpafb-accordion-icon"><i className={isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i></span>;
						} else if (icon === 'angle') {
							iconElement = <span className="bpafb-accordion-icon"><i className={isActive ? 'fas fa-angle-up' : 'fas fa-angle-down'}></i></span>;
						}
					}

					return (
						<div key={item.id} className={`bpafb-accordion-item ${isActive ? 'active' : ''}`}>
							<div 
								className={`bpafb-accordion-header flex-align-${iconAlign}`}
								onClick={() => setActiveIndex(isActive ? -1 : index)}
							>
								{iconAlign === 'left' && iconElement}
								<RichText
									tagName="span"
									className="bpafb-accordion-title"
									value={item.title}
									onChange={(val) => updateItem(index, 'title', val)}
									placeholder={__('Title...', 'blockive-premium-addon-for-block')}
								/>
								{iconAlign === 'right' && iconElement}
							</div>
							{isActive && (
								<div className="bpafb-accordion-content">
									<RichText
										tagName="p"
										value={item.content}
										onChange={(val) => updateItem(index, 'content', val)}
										placeholder={__('Content...', 'blockive-premium-addon-for-block')}
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
