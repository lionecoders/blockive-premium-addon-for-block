import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { animationUrl, width, height, loop, autoplay, align } = attributes;

	const customStyles = {
		textAlign: align,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-lottie-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Lottie Animation', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Animation File (JSON)', 'lc-immeasurable-block-widgets-collection')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ animationUrl: media.url })}
								allowedTypes={['application/json']}
								value={animationUrl}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{animationUrl ? __('Change Animation', 'lc-immeasurable-block-widgets-collection') : __('Select Animation', 'lc-immeasurable-block-widgets-collection')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>

					<TextControl
						label={__('Width (e.g., 200px, 100%)', 'lc-immeasurable-block-widgets-collection')}
						value={width}
						onChange={(val) => setAttributes({ width: val })}
					/>

					<TextControl
						label={__('Height (e.g., 200px)', 'lc-immeasurable-block-widgets-collection')}
						value={height}
						onChange={(val) => setAttributes({ height: val })}
					/>

					<ToggleControl
						label={__('Autoplay', 'lc-immeasurable-block-widgets-collection')}
						checked={autoplay}
						onChange={(val) => setAttributes({ autoplay: val })}
					/>

					<ToggleControl
						label={__('Loop', 'lc-immeasurable-block-widgets-collection')}
						checked={loop}
						onChange={(val) => setAttributes({ loop: val })}
					/>

					<SelectControl
						label={__('Alignment', 'lc-immeasurable-block-widgets-collection')}
						value={align}
						options={[
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						]}
						onChange={(val) => setAttributes({ align: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-lottie-container" style={{ width: width, height: height }}>
					{animationUrl ? (
						<lottie-player
							src={animationUrl}
							autoplay={autoplay}
							loop={loop}
							style={{ width: '100%', height: '100%' }}
						/>
					) : (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f0f0f0', color: '#999', borderRadius: '8px' }}>
							{__('Select a Lottie animation file', 'lc-immeasurable-block-widgets-collection')}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
