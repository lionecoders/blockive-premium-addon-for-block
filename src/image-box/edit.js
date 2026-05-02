import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ColorPalette,
	BaseControl,
	TextControl,
	ToggleControl,
	RangeControl,
	Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		imageUrl,
		imageId,
		imageAlt,
		title,
		titleTag,
		description,
		linkUrl,
		linkText,
		linkTarget,
		imagePosition,
		contentAlign,
		verticalAlign,
		imageSize,
		imageRadius,
		titleColor,
		descColor,
		linkColor,
		boxBgColor,
		imageSpacing,
	} = attributes;

	const customStyles = {
		'--lcibwc-imgbox-img-radius': `${imageRadius}px`,
		'--lcibwc-imgbox-title-color': titleColor,
		'--lcibwc-imgbox-desc-color': descColor,
		'--lcibwc-imgbox-link-color': linkColor,
		'--lcibwc-imgbox-box-bg': boxBgColor,
		'--lcibwc-imgbox-spacing': `${imageSpacing}px`,
		'--lcibwc-imgbox-align': contentAlign,
		'--lcibwc-imgbox-valign': verticalAlign === 'top' ? 'flex-start' : (verticalAlign === 'bottom' ? 'flex-end' : 'center'),
	};

	const blockProps = useBlockProps({
		className: `lcibwc-image-box-wrapper lcibwc-image-box--${imagePosition}`,
		style: customStyles,
	});

	const onSelectImage = (media) => {
		setAttributes({
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media.alt || media.title || '',
		});
	};

	const removeImage = () => {
		setAttributes({
			imageUrl: '',
			imageId: 0,
			imageAlt: '',
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<BaseControl label={__('Image', 'lc-immeasurable-block-widgets-collection')} className="lcibwc-image-upload-control">
						{imageUrl ? (
							<div className="lcibwc-image-preview" style={{ marginBottom: '10px' }}>
								<img src={imageUrl} alt={imageAlt} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
								<Button isDestructive onClick={removeImage} style={{ marginTop: '5px' }}>
									{__('Remove Image', 'lc-immeasurable-block-widgets-collection')}
								</Button>
							</div>
						) : (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={['image']}
									value={imageId}
									render={({ open }) => (
										<Button isPrimary onClick={open}>
											{__('Choose Image', 'lc-immeasurable-block-widgets-collection')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}
					</BaseControl>

					<SelectControl
						label={__('Title HTML Tag', 'lc-immeasurable-block-widgets-collection')}
						value={titleTag}
						options={[
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'P', value: 'p' },
							{ label: 'DIV', value: 'div' },
						]}
						onChange={(val) => setAttributes({ titleTag: val })}
					/>

					<TextControl
						label={__('Link URL', 'lc-immeasurable-block-widgets-collection')}
						value={linkUrl}
						onChange={(val) => setAttributes({ linkUrl: val })}
						type="url"
					/>

					{linkUrl && (
						<ToggleControl
							label={__('Open in new tab', 'lc-immeasurable-block-widgets-collection')}
							checked={linkTarget}
							onChange={(val) => setAttributes({ linkTarget: val })}
						/>
					)}

					<SelectControl
						label={__('Image Position', 'lc-immeasurable-block-widgets-collection')}
						value={imagePosition}
						options={[
							{ label: 'Top', value: 'top' },
							{ label: 'Left', value: 'left' },
							{ label: 'Right', value: 'right' },
						]}
						onChange={(val) => setAttributes({ imagePosition: val })}
					/>

					<SelectControl
						label={__('Content Alignment', 'lc-immeasurable-block-widgets-collection')}
						value={contentAlign}
						options={[
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
							{ label: 'Justify', value: 'justify' },
						]}
						onChange={(val) => setAttributes({ contentAlign: val })}
					/>

					{(imagePosition === 'left' || imagePosition === 'right') && (
						<SelectControl
							label={__('Vertical Alignment', 'lc-immeasurable-block-widgets-collection')}
							value={verticalAlign}
							options={[
								{ label: 'Top', value: 'top' },
								{ label: 'Middle', value: 'middle' },
								{ label: 'Bottom', value: 'bottom' },
							]}
							onChange={(val) => setAttributes({ verticalAlign: val })}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__('Image Styles', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					<RangeControl
						label={__('Image Spacing', 'lc-immeasurable-block-widgets-collection')}
						value={imageSpacing}
						onChange={(val) => setAttributes({ imageSpacing: val })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__('Border Radius', 'lc-immeasurable-block-widgets-collection')}
						value={imageRadius}
						onChange={(val) => setAttributes({ imageRadius: val })}
						min={0}
						max={100}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')} initialOpen={false}>
					<BaseControl label={__('Box Background', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={boxBgColor} onChange={(val) => setAttributes({ boxBgColor: val })} />
					</BaseControl>
					<BaseControl label={__('Title Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={titleColor} onChange={(val) => setAttributes({ titleColor: val })} />
					</BaseControl>
					<BaseControl label={__('Description Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={descColor} onChange={(val) => setAttributes({ descColor: val })} />
					</BaseControl>
					<BaseControl label={__('Link Color', 'lc-immeasurable-block-widgets-collection')}>
						<ColorPalette value={linkColor} onChange={(val) => setAttributes({ linkColor: val })} />
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{imageUrl && (
					<div className="lcibwc-image-box-img-wrapper">
						<img src={imageUrl} alt={imageAlt} className="lcibwc-image-box-img" />
					</div>
				)}

				<div className="lcibwc-image-box-content">
					<RichText
						tagName={titleTag}
						className="lcibwc-image-box-title"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
						placeholder={__('Enter title...', 'lc-immeasurable-block-widgets-collection')}
					/>

					<RichText
						tagName="div"
						className="lcibwc-image-box-description"
						value={description}
						onChange={(val) => setAttributes({ description: val })}
						placeholder={__('Enter description...', 'lc-immeasurable-block-widgets-collection')}
					/>

					{linkUrl && linkText && (
						<RichText
							tagName="div"
							className="lcibwc-image-box-link"
							value={linkText}
							onChange={(val) => setAttributes({ linkText: val })}
							placeholder={__('Link Text...', 'lc-immeasurable-block-widgets-collection')}
						/>
					)}
				</div>
			</div>
		</>
	);
}
