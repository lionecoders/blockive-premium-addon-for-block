import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { columns, showCount, showDescription, hideEmpty, limit } = attributes;

	const customStyles = {
		'--lcibwc-category-columns': columns,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-category-list-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div
				className="lcibwc-category-grid"
				data-show-count={showCount}
				data-show-description={showDescription}
				data-hide-empty={hideEmpty}
				data-limit={limit}
			>
				{/* Categories will be rendered via PHP/dynamic block */}
				<div className="lcibwc-category-item">
					<h3 className="lcibwc-category-name">
						<a href="#">Category</a>
					</h3>
				</div>
			</div>
		</div>
	);
}
