import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { columns, showCount, showDescription, hideEmpty, limit } = attributes;

	const customStyles = {
		'--bpafb-category-columns': columns,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-category-list-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div
				className="bpafb-category-grid"
				data-show-count={showCount}
				data-show-description={showDescription}
				data-hide-empty={hideEmpty}
				data-limit={limit}
			>
				{/* Categories will be rendered via PHP/dynamic block */}
				<div className="bpafb-category-item">
					<h3 className="bpafb-category-name">
						<a href="#">Category</a>
					</h3>
				</div>
			</div>
		</div>
	);
}
