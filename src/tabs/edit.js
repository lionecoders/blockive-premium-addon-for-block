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
		'--bpafb-tab-bg': tabBgColor,
		'--bpafb-tab-active-bg': tabActiveColor,
		'--bpafb-tab-text': textColor,
		'--bpafb-tab-active-text': textActiveColor,
		'--bpafb-tab-content-bg': contentBgColor,
		'--bpafb-tab-content-text': contentTextColor,
		'--bpafb-tab-radius': `${tabBorderRadius}px`,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-tabs-wrapper',
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
				<PanelBody title={__('Tabs Items', 'blockive-premium-addon-for-block')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Title', 'blockive-premium-addon-for-block')}
								value={item.title}
								onChange={(val) => updateItem(index, 'title', val)}
							/>
							<Button isDestructive onClick={() => removeItem(index)} disabled={items.length <= 1}>
								{__('Remove Item', 'blockive-premium-addon-for-block')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Tab', 'blockive-premium-addon-for-block')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Colors & Styles', 'blockive-premium-addon-for-block')} initialOpen={false}>
					<RangeControl
						label={__('Tab Border Radius', 'blockive-premium-addon-for-block')}
						value={tabBorderRadius}
						onChange={(val) => setAttributes({ tabBorderRadius: val })}
						min={0}
						max={30}
					/>
					<BaseControl label={__('Tabs Track Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={tabBgColor} onChange={(val) => setAttributes({ tabBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Active Tab Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={tabActiveColor} onChange={(val) => setAttributes({ tabActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Tab Text Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={textColor} onChange={(val) => setAttributes({ textColor: val })} />
					</BaseControl>
					<BaseControl label={__('Active Tab Text Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={textActiveColor} onChange={(val) => setAttributes({ textActiveColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Background', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={contentBgColor} onChange={(val) => setAttributes({ contentBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Content Text Color', 'blockive-premium-addon-for-block')}>
						<ColorPalette value={contentTextColor} onChange={(val) => setAttributes({ contentTextColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-tabs-nav-track">
					{items.map((item, index) => {
						const isActive = activeIndex === index;
						return (
							<div 
								key={item.id} 
								className={`bpafb-tab-pill ${isActive ? 'active' : ''}`}
								onClick={(e) => setActiveIndex(index)}
							>
								<div style={{ flex: 1, textAlign: 'center' }}>
									<RichText
										tagName="span"
										className="bpafb-tab-title"
										value={item.title}
										onChange={(val) => updateItem(index, 'title', val)}
										placeholder={__('Tab Title...', 'blockive-premium-addon-for-block')}
									/>
								</div>
							</div>
						);
					})}
				</div>

				<div className="bpafb-tabs-content-area">
					{items.map((item, index) => {
						const isActive = activeIndex === index;
						if (!isActive) return null;
						return (
							<div key={item.id} className="bpafb-tab-pane active">
								<RichText
									tagName="div"
									className="bpafb-tab-content-text"
									value={item.content}
									onChange={(val) => updateItem(index, 'content', val)}
									placeholder={__('Enter content here...', 'blockive-premium-addon-for-block')}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
