import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const {
		columns,
		postsPerPage,
		orderBy,
		order,
		showImage,
		showExcerpt,
		showDate,
		showAuthor,
	} = attributes;

	const customStyles = {
		'--bpafb-post-grid-columns': columns,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-post-grid-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div
				className="bpafb-post-grid"
				data-posts-per-page={postsPerPage}
				data-order-by={orderBy}
				data-order={order}
				data-show-image={showImage}
				data-show-excerpt={showExcerpt}
				data-show-date={showDate}
				data-show-author={showAuthor}
			>
				{/* Posts will be rendered via PHP/dynamic block */}
				<article className="bpafb-post-card">
					<div className="bpafb-post-content">
						<h3 className="bpafb-post-title">
							<a href="#">Sample Post</a>
						</h3>
					</div>
				</article>
			</div>
		</div>
	);
}
