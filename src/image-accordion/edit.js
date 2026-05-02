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
		'--lcibwc-image-accordion-title-color': titleColor,
		'--lcibwc-image-accordion-content-color': contentColor,
		'--lcibwc-image-accordion-overlay-opacity': overlayOpacity,
		'--lcibwc-image-accordion-animation': animationDuration,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-image-accordion-wrapper',
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
				<PanelBody title={__('Image Accordion Items', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					{items.map((item, index) => (
						<div key={item.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Title', 'lc-immeasurable-block-widgets-collection')}
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
												{item.imageUrl ? __('Change Image', 'lc-immeasurable-block-widgets-collection') : __('Select Image', 'lc-immeasurable-block-widgets-collection')}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</div>
							<Button isDestructive onClick={() => removeItem(index)}>
								{__('Remove Item', 'lc-immeasurable-block-widgets-collection')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addItem}>
						{__('Add Item', 'lc-immeasurable-block-widgets-collection')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Styling', 'lc-immeasurable-block-widgets-collection')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Title Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={titleColor}
							onChange={(val) => setAttributes({ titleColor: val })}
						/>
					</div>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Content Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={contentColor}
							onChange={(val) => setAttributes({ contentColor: val })}
						/>
					</div>
					<RangeControl
						label={__('Overlay Opacity', 'lc-immeasurable-block-widgets-collection')}
						value={overlayOpacity}
						onChange={(val) => setAttributes({ overlayOpacity: val })}
						min={0}
						max={1}
						step={0.1}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-image-accordion">
					{items.map((item, index) => (
						<div
							key={item.id}
							className={`lcibwc-image-accordion-item ${activeIndex === index ? 'active' : ''}`}
							onClick={() => setActiveIndex(index)}
							style={{
								backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none',
							}}
						>
							<div className="lcibwc-image-accordion-content">
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
