import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ColorPalette,
	RangeControl,
	TextControl,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		items,
		titleColor,
		contentColor,
		overlayOpacity,
		animationDuration,
	} = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const customStyles = {
		'--bpafb-image-accordion-title-color': titleColor,
		'--bpafb-image-accordion-content-color': contentColor,
		'--bpafb-image-accordion-overlay-opacity': overlayOpacity,
		'--bpafb-image-accordion-animation': animationDuration,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-image-accordion-wrapper',
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
					title: `Image Accordion Item #${items.length + 1}`,
					imageUrl: '',
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
				<PanelBody title={__('Image Accordion Items', 'blockive-premium-addon-for-block')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Title', 'blockive-premium-addon-for-block')}
								value={item.title}
								onChange={(val) => updateItem(index, 'title', val)}
							/>
							<div style={{ marginBottom: '10px' }}>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => updateItem(index, 'imageUrl', media.url)}
										allowedTypes={['image']}
										value={item.imageUrl}
										render={({ open }) => (
											<Button onClick={open} isPrimary>
												{item.imageUrl ? __('Change Image', 'blockive-premium-addon-for-block') : __('Select Image', 'blockive-premium-addon-for-block')}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</div>
							<Button isDestructive onClick={() => removeItem(index)}>
								{__('Remove Item', 'blockive-premium-addon-for-block')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Item', 'blockive-premium-addon-for-block')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Styling', 'blockive-premium-addon-for-block')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Title Color', 'blockive-premium-addon-for-block')}</label>
						<ColorPalette
							value={titleColor}
							onChange={(val) => setAttributes({ titleColor: val })}
						/>
					</div>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Content Color', 'blockive-premium-addon-for-block')}</label>
						<ColorPalette
							value={contentColor}
							onChange={(val) => setAttributes({ contentColor: val })}
						/>
					</div>
					<RangeControl
						label={__('Overlay Opacity', 'blockive-premium-addon-for-block')}
						value={overlayOpacity}
						onChange={(val) => setAttributes({ overlayOpacity: val })}
						min={0}
						max={1}
						step={0.1}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-image-accordion">
					{items.map((item, index) => (
						<div
							key={item.id}
							className={`bpafb-image-accordion-item ${activeIndex === index ? 'active' : ''}`}
							onClick={() => setActiveIndex(index)}
							style={{
								backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none',
							}}
						>
							<div className="bpafb-image-accordion-content">
								<h3>{item.title}</h3>
								<p>{item.content}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
