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
		'--lcibwc-faq-borderWidth': `${borderWidth}px`,
		'--lcibwc-faq-borderColor': borderColor,
		'--lcibwc-faq-title-color': titleColor,
		'--lcibwc-faq-title-active-color': titleActiveColor,
		'--lcibwc-faq-title-bg': titleBgColor,
		'--lcibwc-faq-content-color': contentColor,
		'--lcibwc-faq-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps({
		className: `lcibwc-faq-wrapper ${animationType !== 'none' ? `lcibwc-animate-${animationType}` : ''}`,
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
				<PanelBody title={__('FAQ Items', 'lc-immeasurable-block-widgets-collectionblock-widgets-collection')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Question', 'lc-immeasurable-block-widgets-collection')}
								value={item.title}
								onChange={(val) => updateItem(index, 'title', val)}
							/>
							<Button isDestructive onClick={() => removeItem(index)}>
								{__('Remove Item', 'lc-immeasurable-block-widgets-collection')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Item', 'lc-immeasurable-block-widgets-collection')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Main Heading Settings', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<SelectControl
						label={__('Heading Tag', 'lc-immeasurable-block-widgets-collection')}
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
					<BaseControl label={__('Heading Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={headingColor} onChange={(val) => setAttributes({ headingColor: val })} />
					</BaseControl>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<p style={{marginBottom: '15px'}}><em>{__('Note: FAQ Schema payload is automatically generated and added to the page.', 'lc-immeasurable-block-widgets-collection')}</em></p>
					<SelectControl
						label={__('Title HTML Tag', 'lc-immeasurable-block-widgets-collection')}
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
						label={__('Icon', 'lc-immeasurable-block-widgets-collection')}
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
						label={__('Icon Alignment', 'lc-immeasurable-block-widgets-collection')}
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
				<PanelBody title={__('Motion Effects', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<SelectControl
						label={__('Entrance Animation', 'lc-immeasurable-block-widgets-collection')}
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
								label={__('Animation Duration', 'lc-immeasurable-block-widgets-collection')}
								value={animationDuration}
								onChange={(val) => setAttributes({ animationDuration: val })}
							/>
							<TextControl
								label={__('Animation Delay', 'lc-immeasurable-block-widgets-collection')}
								value={animationDelay}
								onChange={(val) => setAttributes({ animationDelay: val })}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Colors & Borders', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<RangeControl
						label={__('Border Width (px)', 'lc-immeasurable-block-widgets-collection')}
						value={borderWidth}
						onChange={(val) => setAttributes({ borderWidth: val })}
						min={0}
						max={10}
					/>
					<BaseControl label={__('Border Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={borderColor} onChange={(val) => setAttributes({ borderColor: val })} />
					</BaseControl>
					<BaseControl label={__('Question Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Question Active Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={titleActiveColor} onChange={(val) => setAttributes({ titleActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Question Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={titleBgColor} onChange={(val) => setAttributes({ titleBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Answer Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={contentColor} onChange={(val) => setAttributes({ contentColor: val })} />
					</BaseControl>
					<BaseControl label={__('Answer Background', 'lc-immeasurable-block-widgets-collection')}>
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
					className="lcibwc-faq-main-heading"
					style={{ textAlign: headingAlign, color: headingColor, marginBottom: '20px' }}
					value={headingText}
					onChange={(val) => setAttributes({ headingText: val })}
					placeholder={__('Enter FAQ Heading...', 'lc-immeasurable-block-widgets-collection')}
				/>
				{items.map((item, index) => {
					const isActive = activeIndex === index;
					
					let iconElement = null;
					if (icon !== 'none') {
						if (icon === 'plus-minus') {
							iconElement = <span className="lcibwc-faq-icon"><i className={isActive ? 'fas fa-minus' : 'fas fa-plus'}></i></span>;
						} else if (icon === 'chevron') {
							iconElement = <span className="lcibwc-faq-icon"><i className={isActive ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i></span>;
						} else if (icon === 'angle') {
							iconElement = <span className="lcibwc-faq-icon"><i className={isActive ? 'fas fa-angle-up' : 'fas fa-angle-down'}></i></span>;
						}
					}

					return (
						<div key={item.id} className={`lcibwc-faq-item ${isActive ? 'active' : ''}`}>
							<div 
								className={`lcibwc-faq-header flex-align-${iconAlign}`}
								onClick={() => setActiveIndex(isActive ? -1 : index)}
							>
								{iconAlign === 'left' && iconElement}
								<RichText
									tagName={titleTag}
									className="lcibwc-faq-title"
									value={item.title}
									onChange={(val) => updateItem(index, 'title', val)}
									placeholder={__('Question...', 'lc-immeasurable-block-widgets-collection')}
								/>
								{iconAlign === 'right' && iconElement}
							</div>
							{isActive && (
								<div className="lcibwc-faq-content">
									<RichText
										tagName="p"
										value={item.content}
										onChange={(val) => updateItem(index, 'content', val)}
										placeholder={__('Answer...', 'lc-immeasurable-block-widgets-collection')}
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
