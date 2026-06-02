import {
	useBlockProps,
	RichText,
	__experimentalGetBorderClassesAndStyles,
} from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		text,
		url,
		linkTarget,
		showIcon,
		icon,
		iconPosition,
		badgeText,
		alignment,
		buttonWidth,
		textColor,
		bgColor,
		textColorHover,
		bgColorHover,
		badgeTextColor,
		badgeBgColor,
		iconSpacing,
	} = attributes;

	const customStyles = {
		'--bpafb-btn-text-color': textColor,
		'--bpafb-btn-bg-color': bgColor,
		'--bpafb-btn-text-color-hover': textColorHover,
		'--bpafb-btn-bg-color-hover': bgColorHover,
		'--bpafb-btn-badge-text-color': badgeTextColor,
		'--bpafb-btn-badge-bg-color': badgeBgColor,
		'--bpafb-btn-icon-spacing': `${iconSpacing}px`,
		'--bpafb-btn-width': buttonWidth === 'full' ? '100%' : 'auto',
		'--bpafb-btn-justify': alignment === 'left' ? 'flex-start' : (alignment === 'right' ? 'flex-end' : (alignment === 'justify' ? 'stretch' : 'center')),
	};

	const borderProps = __experimentalGetBorderClassesAndStyles( attributes );

	const blockProps = useBlockProps.save({
		className: `bpafb-button-wrapper bpafb-button-align-${alignment}`,
		style: customStyles,
	});

	const InnerContent = () => (
		<span className="bpafb-button-inner">
			{badgeText && (
				<span className="bpafb-button-badge">{badgeText}</span>
			)}
			
			{showIcon && iconPosition === 'left' && icon && (
				<i className={`${icon} bpafb-button-icon bpafb-button-icon--left`}></i>
			)}

			{text && (
				<RichText.Content
					tagName="span"
					className="bpafb-button-text"
					value={text}
				/>
			)}

			{showIcon && iconPosition === 'right' && icon && (
				<i className={`${icon} bpafb-button-icon bpafb-button-icon--right`}></i>
			)}
		</span>
	);

	return (
		<div {...blockProps}>
			{url ? (
				<a
					href={url}
					className={`bpafb-button-link ${borderProps.className || ''}`}
					style={borderProps.style}
					target={linkTarget ? '_blank' : undefined}
					rel={linkTarget ? 'noopener noreferrer' : undefined}
				>
					<InnerContent />
				</a>
			) : (
				<div
					className={`bpafb-button-link ${borderProps.className || ''}`}
					style={borderProps.style}
				>
					<InnerContent />
				</div>
			)}
		</div>
	);
}
