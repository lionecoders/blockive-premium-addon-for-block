import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
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
		titleTag,
		headingText,
		headingTag,
		headingAlign,
		headingColor,
	} = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const customStyles = {
		'--bpafb-faq-borderWidth': `${borderWidth}px`,
		'--bpafb-faq-borderColor': borderColor,
		'--bpafb-faq-title-color': titleColor,
		'--bpafb-faq-title-active-color': titleActiveColor,
		'--bpafb-faq-title-bg': titleBgColor,
		'--bpafb-faq-content-color': contentColor,
		'--bpafb-faq-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps({
		className: `bpafb-faq-wrapper ${animationType !== 'none' ? `bpafb-animate-${animationType}` : ''}`,
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
					title: `Frequently Asked Question #${items.length + 1}`,
					content: 'Enter answer here...',
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
				<PanelBody title={__('FAQ Items', 'blockive-premium-addon-for-block')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Question', 'blockive-premium-addon-for-block')}
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

				<PanelBody title={__('Main Heading Settings', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<SelectControl
						label={__('Heading Tag', 'blockive-premium-addon-for-block')}
						value={headingTag}
						options={[
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'div', value: 'div' },
						]}
						onChange={(val) => setAttributes({ headingTag: val })}
					/>
					<BaseControl label={__('Heading Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={headingColor} onChange={(val) => setAttributes({ headingColor: val })} />
					</BaseControl>
				</PanelBody>

				<PanelBody title={__('Settings', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<p style={{marginBottom: '15px'}}><em>{__('Note: FAQ Schema payload is automatically generated and added to the page.', 'blockive-premium-addon-for-block')}</em></p>
					<SelectControl
						label={__('Title HTML Tag', 'blockive-premium-addon-for-block')}
						value={titleTag}
						options={[
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'div', value: 'div' },
							{ label: 'span', value: 'span' },
							{ label: 'p', value: 'p' },
						]}
						onChange={(val) => setAttributes({ titleTag: val })}
					/>
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
					<BaseControl label={__('Question Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Question Active Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleActiveColor} onChange={(val) => setAttributes({ titleActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Question Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={titleBgColor} onChange={(val) => setAttributes({ titleBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Answer Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={contentColor} onChange={(val) => setAttributes({ contentColor: val })} />
					</BaseControl>
					<BaseControl label={__('Answer Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={contentBgColor} onChange={(val) => setAttributes({ contentBgColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentControl
					value={headingAlign}
					onChange={(newAlign) => setAttributes({ headingAlign: newAlign })}
				/>
			</BlockControls>

			<div {...blockProps}>
				<RichText
					tagName={headingTag}
					className="bpafb-faq-main-heading"
					style={{ textAlign: headingAlign, color: headingColor, marginBottom: '20px' }}
					value={headingText}
					onChange={(val) => setAttributes({ headingText: val })}
					placeholder={__('Enter FAQ Heading...', 'blockive-premium-addon-for-block')}
				/>
				{items.map((item, index) => {
					const isActive = activeIndex === index;
					
					let iconElement = null;
					if (icon !== 'none') {
						if (icon === 'plus-minus') {
							iconElement = <span className="bpafb-faq-icon"><i className={isActive ? 'fas fa-minus' : 'fas fa-plus'}></i></span>;
						} else if (icon === 'chevron') {
							iconElement = <span className="bpafb-faq-icon"><i className={isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i></span>;
						} else if (icon === 'angle') {
							iconElement = <span className="bpafb-faq-icon"><i className={isActive ? 'fas fa-angle-up' : 'fas fa-angle-down'}></i></span>;
						}
					}

					return (
						<div key={item.id} className={`bpafb-faq-item ${isActive ? 'active' : ''}`}>
							<div 
								className={`bpafb-faq-header flex-align-${iconAlign}`}
								onClick={() => setActiveIndex(isActive ? -1 : index)}
							>
								{iconAlign === 'left' && iconElement}
								<RichText
									tagName={titleTag}
									className="bpafb-faq-title"
									value={item.title}
									onChange={(val) => updateItem(index, 'title', val)}
									placeholder={__('Question...', 'blockive-premium-addon-for-block')}
								/>
								{iconAlign === 'right' && iconElement}
							</div>
							{isActive && (
								<div className="bpafb-faq-content">
									<RichText
										tagName="p"
										value={item.content}
										onChange={(val) => updateItem(index, 'content', val)}
										placeholder={__('Answer...', 'blockive-premium-addon-for-block')}
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
