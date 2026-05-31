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
		iconBorderColor,
		iconBorderWidth,
		iconBorderStyle,
	} = attributes;

	const customStyles = {
		'--bpafb-ib-icon-size': `${iconSize}px`,
		'--bpafb-ib-icon-color': iconColor,
		'--bpafb-ib-icon-bg': iconBgColor,
		'--bpafb-ib-icon-padding': `${iconPadding}px`,
		'--bpafb-ib-icon-radius': `${iconBorderRadius}px`,
		'--bpafb-ib-title-color': titleColor,
		'--bpafb-ib-desc-color': descColor,
		'--bpafb-ib-box-bg': boxBgColor,
		'--bpafb-ib-alignment': boxAlignment,
		'--bpafb-ib-icon-border-color': iconBorderColor,
		'--bpafb-ib-icon-border-width': iconBorderWidth ? `${iconBorderWidth}px` : undefined,
		'--bpafb-ib-icon-border-style': iconBorderStyle,
	};

	const blockProps = useBlockProps.save({
		className: `bpafb-icon-box-wrapper bpafb-icon-box--${iconPosition}`,
		style: customStyles,
	});

	const TitleTag = titleTag;

	const ContentElement = () => (
		<>
			{icon && (
				<div className="bpafb-icon-box-icon-wrapper">
					<i className={`${icon} bpafb-icon-box-icon`}></i>
				</div>
			)}

			<div className="bpafb-icon-box-content">
				{title && (
					<RichText.Content
						tagName={TitleTag}
						className="bpafb-icon-box-title"
						value={title}
					/>
				)}

				{description && (
					<RichText.Content
						tagName="div"
						className="bpafb-icon-box-description"
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
					className="bpafb-icon-box-link"
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
