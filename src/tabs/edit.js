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
		'--lc-tab-bg': tabBgColor,
		'--lc-tab-active-bg': tabActiveColor,
		'--lc-tab-text': textColor,
		'--lc-tab-active-text': textActiveColor,
		'--lc-tab-content-bg': contentBgColor,
		'--lc-tab-content-text': contentTextColor,
		'--lc-tab-radius': `${tabBorderRadius}px`,
	};

	const blockProps = useBlockProps({
		className: 'lc-tabs-wrapper',
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
				<PanelBody title={__('Tabs Items', 'lc-block-widgets')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Title', 'lc-block-widgets')}
								value={item.title}
								onChange={(val) => updateItem(index, 'title', val)}
							/>
							<Button isDestructive onClick={() => removeItem(index)} disabled={items.length <= 1}>
								{__('Remove Item', 'lc-block-widgets')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Tab', 'lc-block-widgets')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Colors & Styles', 'lc-block-widgets')} initialOpen={false}>
					<RangeControl
						label={__('Tab Border Radius', 'lc-block-widgets')}
						value={tabBorderRadius}
						onChange={(val) => setAttributes({ tabBorderRadius: val })}
						min={0}
						max={30}
					/>
					<BaseControl label={__('Tabs Track Background', 'lc-block-widgets')}>
						<ColorPalette value={tabBgColor} onChange={(val) => setAttributes({ tabBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Active Tab Background', 'lc-block-widgets')}>
						<ColorPalette value={tabActiveColor} onChange={(val) => setAttributes({ tabActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Tab Text Color', 'lc-block-widgets')}>
						<ColorPalette value={textColor} onChange={(val) => setAttributes({ textColor: val })} />
					</BaseControl>
					<BaseControl label={__('Active Tab Text Color', 'lc-block-widgets')}>
						<ColorPalette value={textActiveColor} onChange={(val) => setAttributes({ textActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Background', 'lc-block-widgets')}>
						<ColorPalette value={contentBgColor} onChange={(val) => setAttributes({ contentBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Text Color', 'lc-block-widgets')}>
						<ColorPalette value={contentTextColor} onChange={(val) => setAttributes({ contentTextColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lc-tabs-nav-track">
					{items.map((item, index) => {
						const isActive = activeIndex === index;
						return (
							<div 
								key={item.id} 
								className={`lc-tab-pill ${isActive ? 'active' : ''}`}
								onClick={(e) => setActiveIndex(index)}
							>
								<div style={{ flex: 1, textAlign: 'center' }}>
									<RichText
										tagName="span"
										className="lc-tab-title"
										value={item.title}
										onChange={(val) => updateItem(index, 'title', val)}
										placeholder={__('Tab Title...', 'lc-block-widgets')}
									/>
								</div>
							</div>
						);
					})}
				</div>

				<div className="lc-tabs-content-area">
					{items.map((item, index) => {
						const isActive = activeIndex === index;
						if (!isActive) return null;
						return (
							<div key={item.id} className="lc-tab-pane active">
								<RichText
									tagName="div"
									className="lc-tab-content-text"
									value={item.content}
									onChange={(val) => updateItem(index, 'content', val)}
									placeholder={__('Enter content here...', 'lc-block-widgets')}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
