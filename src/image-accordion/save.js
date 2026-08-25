import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { items, titleColor, contentColor, overlayOpacity, animationDuration, height, imageSize, imagePosition, showTitle, showContent } = attributes;

	const customStyles = {
		'--bpafb-image-accordion-title-color': titleColor,
		'--bpafb-image-accordion-content-color': contentColor,
		'--bpafb-image-accordion-overlay-opacity': overlayOpacity,
		'--bpafb-image-accordion-animation': animationDuration,
		'--bpafb-image-accordion-height': height,
		'--bpafb-image-accordion-bg-size': imageSize,
		'--bpafb-image-accordion-bg-position': imagePosition,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-image-accordion-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-image-accordion">
				{items.map((item, index) => (
					<div
						key={item.id}
						className={`bpafb-image-accordion-item ${index === 0 ? 'active' : ''}`}
						role="button"
						tabIndex="0"
						aria-current={index === 0 ? 'true' : 'false'}
						style={{
							backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none',
						}}
					>
						<div className="bpafb-image-accordion-content">
							{showTitle && <h3>{item.title}</h3>}
							{showContent && <p>{item.content}</p>}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
