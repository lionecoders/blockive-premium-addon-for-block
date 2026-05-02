import { useBlockProps, RichText } from '@wordpress/block-editor';

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
		borderColor,
		borderColorHover,
		badgeTextColor,
		badgeBgColor,
		iconSpacing,
	} = attributes;

	const customStyles = {
		'--lcibwc-btn-text-color': textColor,
		'--lcibwc-btn-bg-color': bgColor,
		'--lcibwc-btn-border-color': borderColor,
		'--lcibwc-btn-text-color-hover': textColorHover,
		'--lcibwc-btn-bg-color-hover': bgColorHover,
		'--lcibwc-btn-border-color-hover': borderColorHover,
		'--lcibwc-btn-badge-text-color': badgeTextColor,
		'--lcibwc-btn-badge-bg-color': badgeBgColor,
		'--lcibwc-btn-icon-spacing': `${iconSpacing}px`,
		'--lcibwc-btn-width': buttonWidth === 'full' ? '100%' : 'auto',
		'--lcibwc-btn-justify': alignment === 'left' ? 'flex-start' : (alignment === 'right' ? 'flex-end' : (alignment === 'justify' ? 'stretch' : 'center')),
	};

	const blockProps = useBlockProps.save({
		className: `lcibwc-button-wrapper lcibwc-button-align-${alignment}`,
		style: customStyles,
	});

	const InnerContent = () => (
		<span className="lcibwc-button-inner">
			{badgeText && (
				<span className="lcibwc-button-badge">{badgeText}</span>
			)}
			
			{showIcon && iconPosition === 'left' && icon && (
				<i className={`${icon} lcibwc-button-icon lcibwc-button-icon--left`}></i>
			)}

			{text && (
				<RichText.Content
					tagName="span"
					className="lcibwc-button-text"
					value={text}
				/>
			)}

			{showIcon && iconPosition === 'right' && icon && (
				<i className={`${icon} lcibwc-button-icon lcibwc-button-icon--right`}></i>
			)}
		</span>
	);

	return (
		<div {...blockProps}>
			{url ? (
				<a
					href={url}
					className="lcibwc-button-link"
					target={linkTarget ? '_blank' : undefined}
					rel={linkTarget ? 'noopener noreferrer' : undefined}
				>
					<InnerContent />
				</a>
			) : (
				<div className="lcibwc-button-link">
					<InnerContent />
				</div>
			)}
		</div>
	);
}
