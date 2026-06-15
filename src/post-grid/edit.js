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
		'--bpafb-post-grid-columns': columns,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-post-grid-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'blockive-premium-addon-for-block')}
						value={columns}
						onChange={(val) => setAttributes({ columns: val })}
						min={1}
						max={4}
					/>

					<RangeControl
						label={__('Posts Per Page', 'blockive-premium-addon-for-block')}
						value={postsPerPage}
						onChange={(val) => setAttributes({ postsPerPage: val })}
						min={1}
						max={50}
					/>
				</PanelBody>

				<PanelBody title={__('Query', 'blockive-premium-addon-for-block')}>
					<SelectControl
						label={__('Order By', 'blockive-premium-addon-for-block')}
						value={orderBy}
						options={[
							{ label: 'Date', value: 'date' },
							{ label: 'Title', value: 'title' },
							{ label: 'Random', value: 'rand' },
						]}
						onChange={(val) => setAttributes({ orderBy: val })}
					/>

					<SelectControl
						label={__('Order', 'blockive-premium-addon-for-block')}
						value={order}
						options={[
							{ label: 'Descending', value: 'desc' },
							{ label: 'Ascending', value: 'asc' },
						]}
						onChange={(val) => setAttributes({ order: val })}
					/>
				</PanelBody>

				<PanelBody title={__('Display', 'blockive-premium-addon-for-block')}>
					<ToggleControl
						label={__('Show Image', 'blockive-premium-addon-for-block')}
						checked={showImage}
						onChange={(val) => setAttributes({ showImage: val })}
					/>

					<ToggleControl
						label={__('Show Excerpt', 'blockive-premium-addon-for-block')}
						checked={showExcerpt}
						onChange={(val) => setAttributes({ showExcerpt: val })}
					/>

					<ToggleControl
						label={__('Show Date', 'blockive-premium-addon-for-block')}
						checked={showDate}
						onChange={(val) => setAttributes({ showDate: val })}
					/>

					<ToggleControl
						label={__('Show Author', 'blockive-premium-addon-for-block')}
						checked={showAuthor}
						onChange={(val) => setAttributes({ showAuthor: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-post-grid">
					<article className="bpafb-post-card">
						{showImage && (
							<div className="bpafb-post-image">
								<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E" alt="Post" />
							</div>
						)}
						<div className="bpafb-post-content">
							{showDate && <span className="bpafb-post-date">January 1, 2024</span>}
							<h3 className="bpafb-post-title">
								<a href="#">Sample Post Title</a>
							</h3>
							{showAuthor && <span className="bpafb-post-author">By Admin</span>}
							{showExcerpt && (
								<p className="bpafb-post-excerpt">
									This is a sample post excerpt. Posts will be displayed here on the frontend.
								</p>
							)}
						</div>
					</article>
				</div>
				<p style={{ color: '#666', fontStyle: 'italic', marginTop: '15px' }}>
					{__('Posts will be loaded dynamically on the frontend', 'blockive-premium-addon-for-block')}
				</p>
			</div>
		</>
	);
}
