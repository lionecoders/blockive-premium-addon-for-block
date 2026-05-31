import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		imageUrl,
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
		imageRadius,
		titleColor,
		descColor,
		linkColor,
		boxBgColor,
		imageSpacing,
		imageSize,
	} = attributes;

	const customStyles = {
		'--bpafb-imgbox-img-radius': `${imageRadius}px`,
		'--bpafb-imgbox-title-color': titleColor,
		'--bpafb-imgbox-desc-color': descColor,
		'--bpafb-imgbox-link-color': linkColor,
		'--bpafb-imgbox-box-bg': boxBgColor,
		'--bpafb-imgbox-spacing': `${imageSpacing}px`,
		'--bpafb-imgbox-align': contentAlign,
		'--bpafb-imgbox-valign': verticalAlign === 'top' ? 'flex-start' : (verticalAlign === 'bottom' ? 'flex-end' : 'center'),
		'--bpafb-imgbox-img-width': imageSize,
	};

	const blockProps = useBlockProps.save({
		className: `bpafb-image-box-wrapper bpafb-image-box--${imagePosition}`,
		style: customStyles,
	});

	const TitleTag = titleTag;

	const ContentElement = () => (
		<>
			{imageUrl && (
				<div className="bpafb-image-box-img-wrapper">
					<img src={imageUrl} alt={imageAlt} className="bpafb-image-box-img" />
				</div>
			)}

			<div className="bpafb-image-box-content">
				{title && (
					<RichText.Content
						tagName={TitleTag}
						className="bpafb-image-box-title"
						value={title}
					/>
				)}

				{description && (
					<RichText.Content
						tagName="div"
						className="bpafb-image-box-description"
						value={description}
					/>
				)}

				{linkUrl && linkText && (
					<div className="bpafb-image-box-link">
						{linkText}
					</div>
				)}
			</div>
		</>
	);

	return (
		<div {...blockProps}>
			{linkUrl ? (
				<a
					href={linkUrl}
					className="bpafb-image-box-link-wrapper"
					target={linkTarget ? '_blank' : undefined}
					rel={linkTarget ? 'noopener noreferrer' : undefined}
				>
					<ContentElement />
				</a>
			) : (
				<ContentElement />
			)}
		</div>
	);
}
