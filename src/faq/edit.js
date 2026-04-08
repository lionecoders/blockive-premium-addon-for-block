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
		'--lc-faq-border-width': `${borderWidth}px`,
		'--lc-faq-border-color': borderColor,
		'--lc-faq-title-color': titleColor,
		'--lc-faq-title-active-color': titleActiveColor,
		'--lc-faq-title-bg': titleBgColor,
		'--lc-faq-content-color': contentColor,
		'--lc-faq-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps({
		className: `lc-faq-wrapper ${animationType !== 'none' ? `lc-animate-${animationType}` : ''}`,
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
				<PanelBody title={__('FAQ Items', 'lc-block-widgets')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Question', 'lc-block-widgets')}
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

				<PanelBody title={__('Main Heading Settings', 'lc-block-widgets')} initialOpen={false}>
					<SelectControl
						label={__('Heading Tag', 'lc-block-widgets')}
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
					<BaseControl label={__('Heading Color', 'lc-block-widgets')}>
						<ColorPalette value={headingColor} onChange={(val) => setAttributes({ headingColor: val })} />
					</BaseControl>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-block-widgets')} initialOpen={false}>
					<p style={{marginBottom: '15px'}}><em>{__('Note: FAQ Schema payload is automatically generated and added to the page.', 'lc-block-widgets')}</em></p>
					<SelectControl
						label={__('Title HTML Tag', 'lc-block-widgets')}
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
					<BaseControl label={__('Question Color', 'lc-block-widgets')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Question Active Color', 'lc-block-widgets')}>
						<ColorPalette value={titleActiveColor} onChange={(val) => setAttributes({ titleActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Question Background', 'lc-block-widgets')}>
						<ColorPalette value={titleBgColor} onChange={(val) => setAttributes({ titleBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Answer Color', 'lc-block-widgets')}>
						<ColorPalette value={contentColor} onChange={(val) => setAttributes({ contentColor: val })} />
					</BaseControl>
					<BaseControl label={__('Answer Background', 'lc-block-widgets')}>
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
					className="lc-faq-main-heading"
					style={{ textAlign: headingAlign, color: headingColor, marginBottom: '20px' }}
					value={headingText}
					onChange={(val) => setAttributes({ headingText: val })}
					placeholder={__('Enter FAQ Heading...', 'lc-block-widgets')}
				/>
				{items.map((item, index) => {
					const isActive = activeIndex === index;
					
					let iconElement = null;
					if (icon !== 'none') {
						if (icon === 'plus-minus') {
							iconElement = <span className="lc-faq-icon">{isActive ? '-' : '+'}</span>;
						} else if (icon === 'chevron') {
							iconElement = <span className="lc-faq-icon">{isActive ? '▲' : '▼'}</span>;
						} else if (icon === 'angle') {
							iconElement = <span className="lc-faq-icon">{isActive ? '∧' : '∨'}</span>;
						}
					}

					return (
						<div key={item.id} className={`lc-faq-item ${isActive ? 'active' : ''}`}>
							<div 
								className={`lc-faq-header flex-align-${iconAlign}`}
								onClick={() => setActiveIndex(isActive ? -1 : index)}
							>
								{iconAlign === 'left' && iconElement}
								<RichText
									tagName={titleTag}
									className="lc-faq-title"
									value={item.title}
									onChange={(val) => updateItem(index, 'title', val)}
									placeholder={__('Question...', 'lc-block-widgets')}
								/>
								{iconAlign === 'right' && iconElement}
							</div>
							{isActive && (
								<div className="lc-faq-content">
									<RichText
										tagName="p"
										value={item.content}
										onChange={(val) => updateItem(index, 'content', val)}
										placeholder={__('Answer...', 'lc-block-widgets')}
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
