import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { formId, showTitle, title, description } = attributes;

	const blockProps = useBlockProps({
		className: 'bpafb-contact-form-7-wrapper',
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Form Settings', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<TextControl
						label={__('Contact Form 7 ID', 'blockive-premium-addon-for-block')}
						value={formId}
						onChange={(val) => setAttributes({ formId: val })}
						help="Enter the ID of the Contact Form 7 form"
						placeholder="e.g., 123"
					/>
					<ToggleControl
						label={__('Show Title', 'blockive-premium-addon-for-block')}
						checked={showTitle}
						onChange={(val) => setAttributes({ showTitle: val })}
					/>
					{showTitle && (
						<>
							<TextControl
								label={__('Title', 'blockive-premium-addon-for-block')}
								value={title}
								onChange={(val) => setAttributes({ title: val })}
							/>
							<TextControl
								label={__('Description', 'blockive-premium-addon-for-block')}
								value={description}
								onChange={(val) => setAttributes({ description: val })}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{showTitle && (
					<>
						<h2 className="bpafb-cf7-title">{title}</h2>
						{description && <p className="bpafb-cf7-description">{description}</p>}
					</>
				)}
				<div className="bpafb-cf7-form-wrapper">
					{formId ? (
						<p style={{ color: '#666', fontStyle: 'italic' }}>
							{__('Contact Form 7 (ID: ' + formId + ') will display here on frontend', 'blockive-premium-addon-for-block')}
						</p>
					) : (
						<p style={{ color: '#d32f2f' }}>
							{__('Please enter a Contact Form 7 ID in the block settings', 'blockive-premium-addon-for-block')}
						</p>
					)}
				</div>
			</div>
		</>
	);
}
