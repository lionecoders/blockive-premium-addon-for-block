import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		beforeImage,
		afterImage,
		beforeLabel,
		afterLabel,
		showLabels,
		sliderPosition,
		height,
	} = attributes;

	const customStyles = {
		height: height,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-image-comparison-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Images', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Before Image', 'blockive-premium-addon-for-block')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ beforeImage: media.url })}
								allowedTypes={['image']}
								value={beforeImage}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{beforeImage ? __('Change Image', 'blockive-premium-addon-for-block') : __('Select Image', 'blockive-premium-addon-for-block')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>

					<div style={{ marginBottom: '15px' }}>
						<label>{__('After Image', 'blockive-premium-addon-for-block')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ afterImage: media.url })}
								allowedTypes={['image']}
								value={afterImage}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{afterImage ? __('Change Image', 'blockive-premium-addon-for-block') : __('Select Image', 'blockive-premium-addon-for-block')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>
				</PanelBody>

				<PanelBody title={__('Settings', 'blockive-premium-addon-for-block')}>
					<ToggleControl
						label={__('Show Labels', 'blockive-premium-addon-for-block')}
						checked={showLabels}
						onChange={(val) => setAttributes({ showLabels: val })}
					/>

					{showLabels && (
						<>
							<TextControl
								label={__('Before Label', 'blockive-premium-addon-for-block')}
								value={beforeLabel}
								onChange={(val) => setAttributes({ beforeLabel: val })}
							/>
							<TextControl
								label={__('After Label', 'blockive-premium-addon-for-block')}
								value={afterLabel}
								onChange={(val) => setAttributes({ afterLabel: val })}
							/>
						</>
					)}

					<RangeControl
						label={__('Initial Slider Position (%)', 'blockive-premium-addon-for-block')}
						value={sliderPosition}
						onChange={(val) => setAttributes({ sliderPosition: val })}
						min={0}
						max={100}
						step={1}
					/>

					<TextControl
						label={__('Height (e.g., 400px)', 'blockive-premium-addon-for-block')}
						value={height}
						onChange={(val) => setAttributes({ height: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-image-comparison" data-position={sliderPosition}>
					<div className="bpafb-comparison-image before-image" style={{ backgroundImage: beforeImage ? `url(${beforeImage})` : 'none' }}>
						{showLabels && <span className="bpafb-label before-label">{beforeLabel}</span>}
					</div>
					<div className="bpafb-comparison-image after-image" style={{ backgroundImage: afterImage ? `url(${afterImage})` : 'none', clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
						{showLabels && <span className="bpafb-label after-label">{afterLabel}</span>}
					</div>
					<div className="bpafb-comparison-handle" style={{ left: `${sliderPosition}%` }}>
						<span className="bpafb-handle-icon"></span>
					</div>
				</div>
			</div>
		</>
	);
}
