import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	SelectControl,
	ToggleControl,
	RangeControl,
	ColorPalette,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		testimonials,
		style,
		showRating,
		showDots,
		showArrows,
		textColor,
		bgColor,
	} = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const customStyles = {
		'--lcibwc-testimonial-text-color': textColor,
		'--lcibwc-testimonial-bg-color': bgColor,
	};

	const blockProps = useBlockProps({
		className: `lcibwc-testimonial-wrapper lcibwc-testimonial-${style}`,
		style: customStyles,
	});

	const updateTestimonial = (index, key, value) => {
		const newTestimonials = [...testimonials];
		newTestimonials[index] = { ...newTestimonials[index], [key]: value };
		setAttributes({ testimonials: newTestimonials });
	};

	const addTestimonial = () => {
		setAttributes({
			testimonials: [
				...testimonials,
				{
					id: Date.now().toString(),
					name: `Testimonial Author #${testimonials.length + 1}`,
					designation: 'Position',
					image: '',
					content: 'Enter testimonial content here...',
					rating: 5,
				},
			],
		});
		setActiveIndex(testimonials.length);
	};

	const removeTestimonial = (index) => {
		const newTestimonials = testimonials.filter((_, i) => i !== index);
		setAttributes({ testimonials: newTestimonials });
		setActiveIndex(0);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Testimonials', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					{testimonials.map((testimonial, index) => (
						<div key={testimonial.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Name', 'lc-immeasurable-block-widgets-collection')}
								value={testimonial.name}
								onChange={(val) => updateTestimonial(index, 'name', val)}
							/>
							<TextControl
								label={__('Designation', 'lc-immeasurable-block-widgets-collection')}
								value={testimonial.designation}
								onChange={(val) => updateTestimonial(index, 'designation', val)}
							/>
							<div style={{ marginBottom: '10px' }}>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => updateTestimonial(index, 'image', media.url)}
										allowedTypes={['image']}
										value={testimonial.image}
										render={({ open }) => (
											<Button onClick={open} isPrimary size="small">
												{testimonial.image ? __('Change Image', 'lc-immeasurable-block-widgets-collection') : __('Select Image', 'lc-immeasurable-block-widgets-collection')}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</div>
							<Button isDestructive onClick={() => removeTestimonial(index)} size="small">
								{__('Remove', 'lc-immeasurable-block-widgets-collection')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addTestimonial}>
						{__('Add Testimonial', 'lc-immeasurable-block-widgets-collection')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-immeasurable-block-widgets-collection')}>
					<SelectControl
						label={__('Style', 'lc-immeasurable-block-widgets-collection')}
						value={style}
						options={[
							{ label: 'Style 1', value: 'style1' },
							{ label: 'Style 2', value: 'style2' },
							{ label: 'Style 3', value: 'style3' },
						]}
						onChange={(val) => setAttributes({ style: val })}
					/>
					<ToggleControl
						label={__('Show Rating', 'lc-immeasurable-block-widgets-collection')}
						checked={showRating}
						onChange={(val) => setAttributes({ showRating: val })}
					/>
					<ToggleControl
						label={__('Show Dots', 'lc-immeasurable-block-widgets-collection')}
						checked={showDots}
						onChange={(val) => setAttributes({ showDots: val })}
					/>
					<ToggleControl
						label={__('Show Arrows', 'lc-immeasurable-block-widgets-collection')}
						checked={showArrows}
						onChange={(val) => setAttributes({ showArrows: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Text Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={textColor}
							onChange={(val) => setAttributes({ textColor: val })}
						/>
					</div>
					<div>
						<label>{__('Background Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={bgColor}
							onChange={(val) => setAttributes({ bgColor: val })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-testimonial-slider">
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							className={`lcibwc-testimonial-item ${activeIndex === index ? 'active' : ''}`}
						>
							{testimonial.image && (
								<img
									src={testimonial.image}
									alt={testimonial.name}
									className="lcibwc-testimonial-image"
								/>
							)}
							<p className="lcibwc-testimonial-content">{testimonial.content}</p>
							{showRating && (
								<div className="lcibwc-testimonial-rating">
									{[...Array(testimonial.rating)].map((_, i) => (
										<span key={i} className="lcibwc-star">★</span>
									))}
								</div>
							)}
							<p className="lcibwc-testimonial-name">{testimonial.name}</p>
							<p className="lcibwc-testimonial-designation">{testimonial.designation}</p>
						</div>
					))}

					{showArrows && (
						<>
							<button className="lcibwc-arrow lcibwc-prev" onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}>
								❮
							</button>
							<button className="lcibwc-arrow lcibwc-next" onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}>
								❯
							</button>
						</>
					)}

					{showDots && (
						<div className="lcibwc-testimonial-dots">
							{testimonials.map((_, index) => (
								<button
									key={index}
									className={`lcibwc-dot ${activeIndex === index ? 'active' : ''}`}
									onClick={() => setActiveIndex(index)}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
