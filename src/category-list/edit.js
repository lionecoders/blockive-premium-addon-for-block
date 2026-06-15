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
		'--bpafb-category-columns': columns,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-category-list-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<RangeControl
						label={__('Columns', 'blockive-premium-addon-for-block')}
						value={columns}
						onChange={(val) => setAttributes({ columns: val })}
						min={1}
						max={4}
					/>

					<RangeControl
						label={__('Limit', 'blockive-premium-addon-for-block')}
						value={limit}
						onChange={(val) => setAttributes({ limit: val })}
						min={1}
						max={50}
					/>

					<ToggleControl
						label={__('Show Count', 'blockive-premium-addon-for-block')}
						checked={showCount}
						onChange={(val) => setAttributes({ showCount: val })}
					/>

					<ToggleControl
						label={__('Show Description', 'blockive-premium-addon-for-block')}
						checked={showDescription}
						onChange={(val) => setAttributes({ showDescription: val })}
					/>

					<ToggleControl
						label={__('Hide Empty Categories', 'blockive-premium-addon-for-block')}
						checked={hideEmpty}
						onChange={(val) => setAttributes({ hideEmpty: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-category-grid">
					<div className="bpafb-category-item">
						<h3 className="bpafb-category-name">
							<a href="#" onClick={(e) => e.preventDefault()}>
								{__('Category Name', 'blockive-premium-addon-for-block')}
							</a>
						</h3>
						{showCount && <span className="bpafb-category-count">(12)</span>}
						{showDescription && <p className="bpafb-category-description">Category description goes here...</p>}
					</div>
				</div>
				<p style={{ color: '#666', fontStyle: 'italic', marginTop: '15px' }}>
					{__('Categories will display here on the frontend', 'blockive-premium-addon-for-block')}
				</p>
			</div>
		</>
	);
}
