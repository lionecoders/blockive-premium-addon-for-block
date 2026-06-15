import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { videoUrl, width, height, autoplay, controls, loop } = attributes;

	const customStyles = {
		width: width,
		height: height,
	};

	const blockProps = useBlockProps({
		className: 'bpafb-video-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Video Settings', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Video URL or File', 'blockive-premium-addon-for-block')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ videoUrl: media.url })}
								allowedTypes={['video']}
								value={videoUrl}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{videoUrl ? __('Change Video', 'blockive-premium-addon-for-block') : __('Select Video', 'blockive-premium-addon-for-block')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>

					<TextControl
						label={__('Width (e.g., 100%, 600px)', 'blockive-premium-addon-for-block')}
						value={width}
						onChange={(val) => setAttributes({ width: val })}
					/>

					<TextControl
						label={__('Height (e.g., 400px)', 'blockive-premium-addon-for-block')}
						value={height}
						onChange={(val) => setAttributes({ height: val })}
					/>

					<ToggleControl
						label={__('Autoplay', 'blockive-premium-addon-for-block')}
						checked={autoplay}
						onChange={(val) => setAttributes({ autoplay: val })}
					/>

					<ToggleControl
						label={__('Show Controls', 'blockive-premium-addon-for-block')}
						checked={controls}
						onChange={(val) => setAttributes({ controls: val })}
					/>

					<ToggleControl
						label={__('Loop', 'blockive-premium-addon-for-block')}
						checked={loop}
						onChange={(val) => setAttributes({ loop: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="bpafb-video-container">
					{videoUrl ? (
						<video controls={controls} autoPlay={autoplay} loop={loop} style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
							<source src={videoUrl} />
							{__('Your browser does not support the video tag.', 'blockive-premium-addon-for-block')}
						</video>
					) : (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f0f0f0', color: '#999' }}>
							{__('Select a video to display', 'blockive-premium-addon-for-block')}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
