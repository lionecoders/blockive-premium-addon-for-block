import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { items, titleColor, contentColor, overlayOpacity } = attributes;

	const customStyles = {
		'--bpafb-image-accordion-title-color': titleColor,
		'--bpafb-image-accordion-content-color': contentColor,
		'--bpafb-image-accordion-overlay-opacity': overlayOpacity,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-image-accordion-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-image-accordion">
				{items.map((item) => (
					<div
						key={item.id}
						className="bpafb-image-accordion-item"
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
	);
}
