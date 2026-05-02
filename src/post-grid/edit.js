import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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

	const blockProps = useBlockProps({
		className: 'lcibwc-post-grid-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'lc-immeasurable-block-widgets-collection')}
						value={columns}
						onChange={(val) => setAttributes({ columns: val })}
						min={1}
						max={4}
					/>

					<RangeControl
						label={__('Posts Per Page', 'lc-immeasurable-block-widgets-collection')}
						value={postsPerPage}
						onChange={(val) => setAttributes({ postsPerPage: val })}
						min={1}
						max={50}
					/>
				</PanelBody>

				<PanelBody title={__('Query', 'lc-immeasurable-block-widgets-collection')}>
					<SelectControl
						label={__('Order By', 'lc-immeasurable-block-widgets-collection')}
						value={orderBy}
						options={[
							{ label: 'Date', value: 'date' },
							{ label: 'Title', value: 'title' },
							{ label: 'Random', value: 'rand' },
						]}
						onChange={(val) => setAttributes({ orderBy: val })}
					/>

					<SelectControl
						label={__('Order', 'lc-immeasurable-block-widgets-collection')}
						value={order}
						options={[
							{ label: 'Descending', value: 'desc' },
							{ label: 'Ascending', value: 'asc' },
						]}
						onChange={(val) => setAttributes({ order: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Display', 'lc-immeasurable-block-widgets-collection')}>
					<ToggleControl
						label={__('Show Image', 'lc-immeasurable-block-widgets-collection')}
						checked={showImage}
						onChange={(val) => setAttributes({ showImage: val })}
					/>

					<ToggleControl
						label={__('Show Excerpt', 'lc-immeasurable-block-widgets-collection')}
						checked={showExcerpt}
						onChange={(val) => setAttributes({ showExcerpt: val })}
					/>

					<ToggleControl
						label={__('Show Date', 'lc-immeasurable-block-widgets-collection')}
						checked={showDate}
						onChange={(val) => setAttributes({ showDate: val })}
					/>

					<ToggleControl
						label={__('Show Author', 'lc-immeasurable-block-widgets-collection')}
						checked={showAuthor}
						onChange={(val) => setAttributes({ showAuthor: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-post-grid">
					<article className="lcibwc-post-card">
						{showImage && (
							<div className="lcibwc-post-image">
								<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E" alt="Post" />
							</div>
						)}
						<div className="lcibwc-post-content">
							{showDate && <span className="lcibwc-post-date">January 1, 2024</span>}
							<h3 className="lcibwc-post-title">
								<a href="#">Sample Post Title</a>
							</h3>
							{showAuthor && <span className="lcibwc-post-author">By Admin</span>}
							{showExcerpt && (
								<p className="lcibwc-post-excerpt">
									This is a sample post excerpt. Posts will be displayed here on the frontend.
								</p>
							)}
						</div>
					</article>
				</div>
				<p style={{ color: '#666', fontStyle: 'italic', marginTop: '15px' }}>
					{__('Posts will be loaded dynamically on the frontend', 'lc-immeasurable-block-widgets-collection')}
				</p>
			</div>
		</>
	);
}
