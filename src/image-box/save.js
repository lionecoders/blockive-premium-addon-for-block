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

	const blockProps = useBlockProps.save({
		className: `lcibwc-image-box-wrapper lcibwc-image-box--${imagePosition}`,
		style: customStyles,
	});

	const TitleTag = titleTag;

	const ContentElement = () => (
		<>
			{imageUrl && (
				<div className="lcibwc-image-box-img-wrapper">
					<img src={imageUrl} alt={imageAlt} className="lcibwc-image-box-img" />
				</div>
			)}

			<div className="lcibwc-image-box-content">
				{title && (
					<RichText.Content
						tagName={TitleTag}
						className="lcibwc-image-box-title"
						value={title}
					/>
				)}

				{description && (
					<RichText.Content
						tagName="div"
						className="lcibwc-image-box-description"
						value={description}
					/>
				)}

				{linkUrl && linkText && (
					<div className="lcibwc-image-box-link">
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
					className="lcibwc-image-box-link-wrapper"
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
