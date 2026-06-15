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
		className: 'bpafb-lottie-wrapper',
		style: customStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Lottie Animation', 'blockive-premium-addon-for-block')} initialOpen={true}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Animation File (JSON)', 'blockive-premium-addon-for-block')}</label>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => setAttributes({ animationUrl: media.url })}
								allowedTypes={['application/json']}
								value={animationUrl}
								render={({ open }) => (
									<Button onClick={open} isPrimary>
										{animationUrl ? __('Change Animation', 'blockive-premium-addon-for-block') : __('Select Animation', 'blockive-premium-addon-for-block')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>

					<TextControl
						label={__('Width (e.g., 200px, 100%)', 'blockive-premium-addon-for-block')}
						value={width}
						onChange={(val) => setAttributes({ width: val })}
					/>

					<TextControl
						label={__('Height (e.g., 200px)', 'blockive-premium-addon-for-block')}
						value={height}
						onChange={(val) => setAttributes({ height: val })}
					/>

					<ToggleControl
						label={__('Autoplay', 'blockive-premium-addon-for-block')}
						checked={autoplay}
						onChange={(val) => setAttributes({ autoplay: val })}
					/>

					<ToggleControl
						label={__('Loop', 'blockive-premium-addon-for-block')}
						checked={loop}
						onChange={(val) => setAttributes({ loop: val })}
					/>

					<SelectControl
						label={__('Alignment', 'blockive-premium-addon-for-block')}
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
				<div className="bpafb-lottie-container" style={{ width: width, height: height }}>
					{animationUrl ? (
						<lottie-player
							src={animationUrl}
							autoplay={autoplay}
							loop={loop}
							style={{ width: '100%', height: '100%' }}
						/>
					) : (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f0f0f0', color: '#999', borderRadius: '8px' }}>
							{__('Select a Lottie animation file', 'blockive-premium-addon-for-block')}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
