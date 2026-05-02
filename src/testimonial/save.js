import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { testimonials, style, showRating, showDots, showArrows, textColor, bgColor } = attributes;

	const customStyles = {
		'--lcibwc-testimonial-text-color': textColor,
		'--lcibwc-testimonial-bg-color': bgColor,
	};

	const blockProps = useBlockProps.save({
		className: `lcibwc-testimonial-wrapper lcibwc-testimonial-${style}`,
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-testimonial-slider" data-show-dots={showDots} data-show-arrows={showArrows}>
				{testimonials.map((testimonial, index) => (
					<div
						key={testimonial.id}
						className="lcibwc-testimonial-item"
						data-index={index}
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
						<button className="lcibwc-arrow lcibwc-prev" type="button">
							❮
						</button>
						<button className="lcibwc-arrow lcibwc-next" type="button">
							❯
						</button>
					</>
				)}

				{showDots && (
					<div className="lcibwc-testimonial-dots">
						{testimonials.map((_, index) => (
							<button
								key={index}
								className={`lcibwc-dot ${index === 0 ? 'active' : ''}`}
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
