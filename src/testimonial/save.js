import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { testimonials, style, showRating, showDots, showArrows, textColor, bgColor } = attributes;

	const customStyles = {
		'--bpafb-testimonial-text-color': textColor,
		'--bpafb-testimonial-bg-color': bgColor,
	};

	const blockProps = useBlockProps.save({
		className: `bpafb-testimonial-wrapper bpafb-testimonial-${style}`,
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-testimonial-slider" data-show-dots={showDots} data-show-arrows={showArrows}>
				{testimonials.map((testimonial, index) => (
					<div
						key={testimonial.id}
						className="bpafb-testimonial-item"
						data-index={index}
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
						<button className="bpafb-arrow bpafb-prev" type="button">
							❮
						</button>
						<button className="bpafb-arrow bpafb-next" type="button">
							❯
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
