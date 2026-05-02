import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		icon,
		title,
		titleTag,
		description,
		url,
		linkTarget,
		iconPosition,
		iconSize,
		iconColor,
		iconBgColor,
		titleColor,
		descColor,
		boxBgColor,
		iconPadding,
		iconBorderRadius,
		boxAlignment,
	} = attributes;

	const customStyles = {
		'--lcibwc-ib-icon-size': `${iconSize}px`,
		'--lcibwc-ib-icon-color': iconColor,
		'--lcibwc-ib-icon-bg': iconBgColor,
		'--lcibwc-ib-icon-padding': `${iconPadding}px`,
		'--lcibwc-ib-icon-radius': `${iconBorderRadius}px`,
		'--lcibwc-ib-title-color': titleColor,
		'--lcibwc-ib-desc-color': descColor,
		'--lcibwc-ib-box-bg': boxBgColor,
		'--lcibwc-ib-alignment': boxAlignment,
	};

	const blockProps = useBlockProps.save({
		className: `lcibwc-icon-box-wrapper lcibwc-icon-box--${iconPosition}`,
		style: customStyles,
	});

	const TitleTag = titleTag;

	const ContentElement = () => (
		<>
			{icon && (
				<div className="lcibwc-icon-box-icon-wrapper">
					<i className={`${icon} lcibwc-icon-box-icon`}></i>
				</div>
			)}

			<div className="lcibwc-icon-box-content">
				{title && (
					<RichText.Content
						tagName={TitleTag}
						className="lcibwc-icon-box-title"
						value={title}
					/>
				)}

				{description && (
					<RichText.Content
						tagName="div"
						className="lcibwc-icon-box-description"
						value={description}
					/>
				)}
			</div>
		</>
	);

	return (
		<div {...blockProps}>
			{url ? (
				<a
					href={url}
					className="lcibwc-icon-box-link"
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
