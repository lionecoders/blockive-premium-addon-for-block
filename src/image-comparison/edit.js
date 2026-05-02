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
		className: 'lcibwc-image-comparison-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Images', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Before Image', 'lc-immeasurable-block-widgets-collection')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ beforeImage: media.url })}
								allowedTypes={['image']}
								value={beforeImage}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{beforeImage ? __('Change Image', 'lc-immeasurable-block-widgets-collection') : __('Select Image', 'lc-immeasurable-block-widgets-collection')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>

					<div style={{ marginBottom: '15px' }}>
						<label>{__('After Image', 'lc-immeasurable-block-widgets-collection')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ afterImage: media.url })}
								allowedTypes={['image']}
								value={afterImage}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{afterImage ? __('Change Image', 'lc-immeasurable-block-widgets-collection') : __('Select Image', 'lc-immeasurable-block-widgets-collection')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-immeasurable-block-widgets-collection')}>
					<ToggleControl
						label={__('Show Labels', 'lc-immeasurable-block-widgets-collection')}
						checked={showLabels}
						onChange={(val) => setAttributes({ showLabels: val })}
					/>

					{showLabels && (
						<>
							<TextControl
								label={__('Before Label', 'lc-immeasurable-block-widgets-collection')}
								value={beforeLabel}
								onChange={(val) => setAttributes({ beforeLabel: val })}
							/>
							<TextControl
								label={__('After Label', 'lc-immeasurable-block-widgets-collection')}
								value={afterLabel}
								onChange={(val) => setAttributes({ afterLabel: val })}
							/>
						</>
					)}

					<RangeControl
						label={__('Initial Slider Position (%)', 'lc-immeasurable-block-widgets-collection')}
						value={sliderPosition}
						onChange={(val) => setAttributes({ sliderPosition: val })}
						min={0}
						max={100}
						step={1}
					/>

					<TextControl
						label={__('Height (e.g., 400px)', 'lc-immeasurable-block-widgets-collection')}
						value={height}
						onChange={(val) => setAttributes({ height: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-image-comparison" data-position={sliderPosition}>
					<div className="lcibwc-comparison-image before-image" style={{ backgroundImage: beforeImage ? `url(${beforeImage})` : 'none' }}>
						{showLabels && <span className="lcibwc-label before-label">{beforeLabel}</span>}
					</div>
					<div className="lcibwc-comparison-image after-image" style={{ backgroundImage: afterImage ? `url(${afterImage})` : 'none', clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
						{showLabels && <span className="lcibwc-label after-label">{afterLabel}</span>}
					</div>
					<div className="lcibwc-comparison-handle" style={{ left: `${sliderPosition}%` }}>
						<span className="lcibwc-handle-icon"></span>
					</div>
				</div>
			</div>
		</>
	);
}
