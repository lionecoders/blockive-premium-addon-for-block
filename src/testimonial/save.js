import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const {
		testimonials,
		style,
		showImage,
		showRating,
		showDots,
		showArrows,
		textColor,
		descColor,
		positionColor,
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
		cardBorderWidth,
		cardBorderRadius,
		cardBorderColor,
		enableBoxShadow,
		dotColor,
		activeDotColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
	} = attributes;

	const customStyles = {
		'--bpafb-testimonial-text-color': textColor,
		'--bpafb-testimonial-desc-color': descColor,
		'--bpafb-testimonial-position-color': positionColor,
		'--bpafb-testimonial-bg-color': bgColor,
		'--bpafb-arrow-color': arrowColor,
		'--bpafb-arrow-bg-color': arrowBgColor,
		'--bpafb-card-border-width': `${cardBorderWidth}px`,
		'--bpafb-card-border-radius': `${cardBorderRadius}px`,
		'--bpafb-card-border-color': cardBorderColor,
		'--bpafb-card-box-shadow': enableBoxShadow ? `${boxShadowHOffset}px ${boxShadowVOffset}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}` : 'none',
		'--bpafb-dot-color': dotColor,
		'--bpafb-active-dot-color': activeDotColor,
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
						{showImage && testimonial.image && (
							<img
								src={testimonial.image}
								alt={testimonial.name}
								className="bpafb-testimonial-image"
							/>
						)}
						<div className="bpafb-testimonial-text-wrap">
							<p className="bpafb-testimonial-content">{testimonial.content}</p>
							{showRating && (
								<div className="bpafb-testimonial-rating" role="img" aria-label={`${testimonial.rating} ${__('out of 5 stars', 'blockive-premium-addon-for-block')}`}>
									{[...Array(testimonial.rating)].map((_, i) => (
										<span key={i} className="bpafb-star" aria-hidden="true">★</span>
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
						<button className="bpafb-arrow bpafb-prev" type="button" aria-label={__('Previous testimonial', 'blockive-premium-addon-for-block')}>
							{arrowIcon === 'chevron' ? '‹' : arrowIcon === 'long-arrow' ? '←' : '❮'}
						</button>
						<button className="bpafb-arrow bpafb-next" type="button" aria-label={__('Next testimonial', 'blockive-premium-addon-for-block')}>
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
								aria-label={`${__('Go to testimonial', 'blockive-premium-addon-for-block')} ${index + 1}`}
							/>
						))}
					</div>
				)}

				{autoPlay && (
					<button
						type="button"
						className="bpafb-testimonial-autoplay-toggle"
						aria-pressed="false"
						aria-label={__('Pause automatic slideshow', 'blockive-premium-addon-for-block')}
					>
						<span className="bpafb-autoplay-icon" aria-hidden="true">⏸</span>
					</button>
				)}
			</div>
		</div>
	);
}
