import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
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
		tabBgColor,
		tabActiveColor,
		textColor,
		textActiveColor,
		contentBgColor,
		contentTextColor,
		tabBorderRadius,
	} = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const customStyles = {
		'--lcibwc-tab-bg': tabBgColor,
		'--lcibwc-tab-active-bg': tabActiveColor,
		'--lcibwc-tab-text': textColor,
		'--lcibwc-tab-active-text': textActiveColor,
		'--lcibwc-tab-content-bg': contentBgColor,
		'--lcibwc-tab-content-text': contentTextColor,
		'--lcibwc-tab-radius': `${tabBorderRadius}px`,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-tabs-wrapper',
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
					title: `Tab ${items.length + 1}`,
					content: 'Enter content here...',
				},
			],
		});
		setActiveIndex(items.length);
	};

	const removeItem = (index) => {
		if (items.length <= 1) return; // Prevent removing last item
		const newItems = items.filter((_, i) => i !== index);
		setAttributes({ items: newItems });
		setActiveIndex(Math.max(0, activeIndex - 1));
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Tabs Items', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Title', 'lc-immeasurable-block-widgets-collection')}
								value={item.title}
								onChange={(val) => updateItem(index, 'title', val)}
							/>
							<Button isDestructive onClick={() => removeItem(index)} disabled={items.length <= 1}>
								{__('Remove Item', 'lc-immeasurable-block-widgets-collection')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Tab', 'lc-immeasurable-block-widgets-collection')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Colors & Styles', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<RangeControl
						label={__('Tab Border Radius', 'lc-immeasurable-block-widgets-collection')}
						value={tabBorderRadius}
						onChange={(val) => setAttributes({ tabBorderRadius: val })}
						min={0}
						max={30}
					/>
					<BaseControl label={__('Tabs Track Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={tabBgColor} onChange={(val) => setAttributes({ tabBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Active Tab Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={tabActiveColor} onChange={(val) => setAttributes({ tabActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Tab Text Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={textColor} onChange={(val) => setAttributes({ textColor: val })} />
					</BaseControl>
					<BaseControl label={__('Active Tab Text Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={textActiveColor} onChange={(val) => setAttributes({ textActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={contentBgColor} onChange={(val) => setAttributes({ contentBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Text Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={contentTextColor} onChange={(val) => setAttributes({ contentTextColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-tabs-nav-track">
					{items.map((item, index) => {
						const isActive = activeIndex === index;
						return (
							<div 
								key={item.id} 
								className={`lcibwc-tab-pill ${isActive ? 'active' : ''}`}
								onClick={(e) => setActiveIndex(index)}
							>
								<div style={{ flex: 1, textAlign: 'center' }}>
									<RichText
										tagName="span"
										className="lcibwc-tab-title"
										value={item.title}
										onChange={(val) => updateItem(index, 'title', val)}
										placeholder={__('Tab Title...', 'lc-immeasurable-block-widgets-collection')}
									/>
								</div>
							</div>
						);
					})}
				</div>

				<div className="lcibwc-tabs-content-area">
					{items.map((item, index) => {
						const isActive = activeIndex === index;
						if (!isActive) return null;
						return (
							<div key={item.id} className="lcibwc-tab-pane active">
								<RichText
									tagName="div"
									className="lcibwc-tab-content-text"
									value={item.content}
									onChange={(val) => updateItem(index, 'content', val)}
									placeholder={__('Enter content here...', 'lc-immeasurable-block-widgets-collection')}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
