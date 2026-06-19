import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const {
		testimonials,
		style,
		showRating,
		showDots,
		showArrows,
		textColor,
		bgColor,
		arrowIcon,
		imagePosition,
		imageStyle,
		textAlign,
		autoPlay,
		autoPlaySpeed,
		arrowColor,
		arrowBgColor,
		infiniteLoop,
	} = attributes;

	const customStyles = {
		'--bpafb-testimonial-text-color': textColor,
		'--bpafb-testimonial-bg-color': bgColor,
		'--bpafb-arrow-color': arrowColor,
		'--bpafb-arrow-bg-color': arrowBgColor,
	};

	const blockProps = useBlockProps.save({
		className: `bpafb-testimonial-wrapper bpafb-testimonial-${style} bpafb-image-pos-${imagePosition} bpafb-image-style-${imageStyle} bpafb-text-align-${textAlign}`,
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div
				className="bpafb-testimonial-slider"
				data-show-dots={showDots}
				data-show-arrows={showArrows}
				data-autoplay={autoPlay}
				data-autoplay-speed={autoPlaySpeed}
				data-infinite-loop={infiniteLoop}
			>
				{testimonials.map((testimonial, index) => (
					<div
						key={testimonial.id}
						className={`bpafb-testimonial-item ${index === 0 ? 'active' : ''}`}
						data-index={index}
					>
						{testimonial.image && (
							<img
								src={testimonial.image}
								alt={testimonial.name}
								className="bpafb-testimonial-image"
							/>
						)}
						<div className="bpafb-testimonial-text-wrap">
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
					</div>
				))}

				{showArrows && (
					<>
						<button className="bpafb-arrow bpafb-prev" type="button">
							{arrowIcon === 'chevron' ? '‹' : arrowIcon === 'long-arrow' ? '←' : '❮'}
						</button>
						<button className="bpafb-arrow bpafb-next" type="button">
							{arrowIcon === 'chevron' ? '›' : arrowIcon === 'long-arrow' ? '→' : '❯'}
						</button>
					</>
				)}

				{showDots && (
					<div className="bpafb-testimonial-dots">
						{testimonials.map((_, index) => (
							<button
								key={index}
								className={`bpafb-dot ${index === 0 ? 'active' : ''}`}
								type="button"
								data-index={index}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
