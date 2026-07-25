import { useBlockProps, RichText } from '@wordpress/block-editor';
import { getTypographyStyles } from '../components/typography-controls';
import { getBorderStyles } from '../components/border-controls';
import { getShadowStyle } from '../components/shadow-controls';

export default function save( { attributes } ) {
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
		fontFamily,
		fontSize,
		fontWeight,
		lineHeight,
		letterSpacing,
		textTransform,
		textDecoration,
		borderType,
		borderWidth,
		borderRadius,
		borderColor,
		borderColorHover,
		boxShadow,
		shadowColor,
		shadowBlur,
		shadowSpread,
		hoverBoxShadow,
		hoverShadowColor,
		hoverShadowBlur,
		hoverShadowSpread,
	} = attributes;

	const customStyles = {
		'--bpafb-btn-text-color': textColor,
		'--bpafb-btn-bg-color': bgColor,
		'--bpafb-btn-text-color-hover': textColorHover,
		'--bpafb-btn-bg-color-hover': bgColorHover,
		'--bpafb-btn-badge-text-color': badgeTextColor,
		'--bpafb-btn-badge-bg-color': badgeBgColor,
		'--bpafb-btn-icon-spacing': `${ iconSpacing }px`,
		'--bpafb-btn-width': buttonWidth === 'full' ? '100%' : 'auto',
		'--bpafb-btn-justify':
			alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : alignment === 'justify' ? 'stretch' : 'center',
		'--bpafb-btn-border-color-hover': borderColorHover,
		'--bpafb-btn-shadow': getShadowStyle( { enabled: boxShadow, color: shadowColor, blur: shadowBlur, spread: shadowSpread } ),
		'--bpafb-btn-shadow-hover': getShadowStyle( { enabled: hoverBoxShadow, color: hoverShadowColor, blur: hoverShadowBlur, spread: hoverShadowSpread } ),
		...getTypographyStyles( { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textTransform, textDecoration }, '--bpafb-btn-text' ),
		...getBorderStyles( { borderType, borderWidth, borderRadius, borderColor }, '--bpafb-btn' ),
	};

	const blockProps = useBlockProps.save( {
		className: `bpafb-button-wrapper bpafb-button-align-${ alignment }`,
		style: customStyles,
	} );

	const InnerContent = () => (
		<span className="bpafb-button-inner">
			{ badgeText && <span className="bpafb-button-badge">{ badgeText }</span> }

			{ showIcon && iconPosition === 'left' && icon && (
				<i className={ `${ icon } bpafb-button-icon bpafb-button-icon--left` }></i>
			) }

			{ text && <RichText.Content tagName="span" className="bpafb-button-text" value={ text } /> }

			{ showIcon && iconPosition === 'right' && icon && (
				<i className={ `${ icon } bpafb-button-icon bpafb-button-icon--right` }></i>
			) }
		</span>
	);

	return (
		<div { ...blockProps }>
			{ url ? (
				<a
					href={ url }
					className="bpafb-button-link"
					target={ linkTarget ? '_blank' : undefined }
					rel={ linkTarget ? 'noopener noreferrer' : undefined }
				>
					<InnerContent />
				</a>
			) : (
				<div className="bpafb-button-link">
					<InnerContent />
				</div>
			) }
		</div>
	);
}
