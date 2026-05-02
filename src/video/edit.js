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
		className: 'lcibwc-video-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Video Settings', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Video URL or File', 'lc-immeasurable-block-widgets-collection')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ videoUrl: media.url })}
								allowedTypes={['video']}
								value={videoUrl}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{videoUrl ? __('Change Video', 'lc-immeasurable-block-widgets-collection') : __('Select Video', 'lc-immeasurable-block-widgets-collection')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>

					<TextControl
						label={__('Width (e.g., 100%, 600px)', 'lc-immeasurable-block-widgets-collection')}
						value={width}
						onChange={(val) => setAttributes({ width: val })}
					/>

					<TextControl
						label={__('Height (e.g., 400px)', 'lc-immeasurable-block-widgets-collection')}
						value={height}
						onChange={(val) => setAttributes({ height: val })}
					/>

					<ToggleControl
						label={__('Autoplay', 'lc-immeasurable-block-widgets-collection')}
						checked={autoplay}
						onChange={(val) => setAttributes({ autoplay: val })}
					/>

					<ToggleControl
						label={__('Show Controls', 'lc-immeasurable-block-widgets-collection')}
						checked={controls}
						onChange={(val) => setAttributes({ controls: val })}
					/>

					<ToggleControl
						label={__('Loop', 'lc-immeasurable-block-widgets-collection')}
						checked={loop}
						onChange={(val) => setAttributes({ loop: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-video-container">
					{videoUrl ? (
						<video controls={controls} autoPlay={autoplay} loop={loop} style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
							<source src={videoUrl} />
							{__('Your browser does not support the video tag.', 'lc-immeasurable-block-widgets-collection')}
						</video>
					) : (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f0f0f0', color: '#999' }}>
							{__('Select a video to display', 'lc-immeasurable-block-widgets-collection')}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
