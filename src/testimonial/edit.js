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
		'--bpafb-testimonial-text-color': textColor,
		'--bpafb-testimonial-bg-color': bgColor,
	};

	const blockProps = useBlockProps({
		className: `bpafb-testimonial-wrapper bpafb-testimonial-${style}`,
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
				<PanelBody title={__('Testimonials', 'blockive-premium-addon-for-block')} initialOpen={true}>
					{testimonials.map((testimonial, index) => (
						<div key={testimonial.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Name', 'blockive-premium-addon-for-block')}
								value={testimonial.name}
								onChange={(val) => updateTestimonial(index, 'name', val)}
							/>
							<TextControl
								label={__('Designation', 'blockive-premium-addon-for-block')}
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
												{testimonial.image ? __('Change Image', 'blockive-premium-addon-for-block') : __('Select Image', 'blockive-premium-addon-for-block')}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</div>
							<Button isDestructive onClick={() => removeTestimonial(index)} size="small">
								{__('Remove', 'blockive-premium-addon-for-block')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addTestimonial}>
						{__('Add Testimonial', 'blockive-premium-addon-for-block')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Settings', 'blockive-premium-addon-for-block')}>
					<SelectControl
						label={__('Style', 'blockive-premium-addon-for-block')}
						value={style}
						options={[
							{ label: 'Style 1', value: 'style1' },
							{ label: 'Style 2', value: 'style2' },
							{ label: 'Style 3', value: 'style3' },
						]}
						onChange={(val) => setAttributes({ style: val })}
					/>
					<ToggleControl
						label={__('Show Rating', 'blockive-premium-addon-for-block')}
						checked={showRating}
						onChange={(val) => setAttributes({ showRating: val })}
					/>
					<ToggleControl
						label={__('Show Dots', 'blockive-premium-addon-for-block')}
						checked={showDots}
						onChange={(val) => setAttributes({ showDots: val })}
					/>
					<ToggleControl
						label={__('Show Arrows', 'blockive-premium-addon-for-block')}
						checked={showArrows}
						onChange={(val) => setAttributes({ showArrows: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'blockive-premium-addon-for-block')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Text Color', 'blockive-premium-addon-for-block')}</label>
						<ColorPalette
							value={textColor}
							onChange={(val) => setAttributes({ textColor: val })}
						/>
					</div>
					<div>
						<label>{__('Background Color', 'blockive-premium-addon-for-block')}</label>
						<ColorPalette
							value={bgColor}
							onChange={(val) => setAttributes({ bgColor: val })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-testimonial-slider">
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							className={`bpafb-testimonial-item ${activeIndex === index ? 'active' : ''}`}
						>
							{testimonial.image && (
								<img
									src={testimonial.image}
									alt={testimonial.name}
									className="bpafb-testimonial-image"
								/>
							)}
							<p className="bpafb-testimonial-content">{testimonial.content}</p>
							{showRating && (
								<div className="bpafb-testimonial-rating">
									{[...Array(testimonial.rating)].map((_, i) => (
										<span key={i} className="bpafb-star">★</span>
									))}
								</div>
							)}
							<p className="bpafb-testimonial-name">{testimonial.name}</p>
							<p className="bpafb-testimonial-designation">{testimonial.designation}</p>
						</div>
					))}

					{showArrows && (
						<>
							<button className="bpafb-arrow bpafb-prev" onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}>
								❮
							</button>
							<button className="bpafb-arrow bpafb-next" onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}>
								❯
							</button>
						</>
					)}

					{showDots && (
						<div className="bpafb-testimonial-dots">
							{testimonials.map((_, index) => (
								<button
									key={index}
									className={`bpafb-dot ${activeIndex === index ? 'active' : ''}`}
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
