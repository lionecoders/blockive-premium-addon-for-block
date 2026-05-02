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
		'--lcibwc-post-grid-columns': columns,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-post-grid-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div
				className="lcibwc-post-grid"
				data-posts-per-page={postsPerPage}
				data-order-by={orderBy}
				data-order={order}
				data-show-image={showImage}
				data-show-excerpt={showExcerpt}
				data-show-date={showDate}
				data-show-author={showAuthor}
			>
				{/* Posts will be rendered via PHP/dynamic block */}
				<article className="lcibwc-post-card">
					<div className="lcibwc-post-content">
						<h3 className="lcibwc-post-title">
							<a href="#">Sample Post</a>
						</h3>
					</div>
				</article>
			</div>
		</div>
	);
}
