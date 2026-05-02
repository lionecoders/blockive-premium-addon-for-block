import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { items, titleColor, contentColor, overlayOpacity } = attributes;

	const customStyles = {
		'--lcibwc-image-accordion-title-color': titleColor,
		'--lcibwc-image-accordion-content-color': contentColor,
		'--lcibwc-image-accordion-overlay-opacity': overlayOpacity,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-image-accordion-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-image-accordion">
				{items.map((item) => (
					<div
						key={item.id}
						className="lcibwc-image-accordion-item"
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
	);
}
