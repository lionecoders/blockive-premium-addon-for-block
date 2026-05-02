import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { columns, showCount, showDescription, hideEmpty, limit } = attributes;

	const customStyles = {
		'--lcibwc-category-columns': columns,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-category-list-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'lc-immeasurable-block-widgets-collection')}
						value={columns}
						onChange={(val) => setAttributes({ columns: val })}
						min={1}
						max={4}
					/>

					<RangeControl
						label={__('Limit', 'lc-immeasurable-block-widgets-collection')}
						value={limit}
						onChange={(val) => setAttributes({ limit: val })}
						min={1}
						max={50}
					/>

					<ToggleControl
						label={__('Show Count', 'lc-immeasurable-block-widgets-collection')}
						checked={showCount}
						onChange={(val) => setAttributes({ showCount: val })}
					/>

					<ToggleControl
						label={__('Show Description', 'lc-immeasurable-block-widgets-collection')}
						checked={showDescription}
						onChange={(val) => setAttributes({ showDescription: val })}
					/>

					<ToggleControl
						label={__('Hide Empty Categories', 'lc-immeasurable-block-widgets-collection')}
						checked={hideEmpty}
						onChange={(val) => setAttributes({ hideEmpty: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-category-grid">
					<div className="lcibwc-category-item">
						<h3 className="lcibwc-category-name">
							<a href="#" onClick={(e) => e.preventDefault()}>
								{__('Category Name', 'lc-immeasurable-block-widgets-collection')}
							</a>
						</h3>
						{showCount && <span className="lcibwc-category-count">(12)</span>}
						{showDescription && <p className="lcibwc-category-description">Category description goes here...</p>}
					</div>
				</div>
				<p style={{ color: '#666', fontStyle: 'italic', marginTop: '15px' }}>
					{__('Categories will display here on the frontend', 'lc-immeasurable-block-widgets-collection')}
				</p>
			</div>
		</>
	);
}
