import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { getSafeMailchimpUrl } from './utils';

export default function Save({ attributes }) {
	const { 
		title, subtitle, placeholderText, buttonText, 
		titleColor, subtitleColor, inputBgColor, 
		buttonBgColor, buttonTextColor, formAction,
		inputBorderRadius, buttonBorderRadius,
		buttonHoverBgColor, buttonHoverTextColor,
		showInputIcon, inputIconBgColor, inputIconColor,
		showButtonIcon, inputBorderWidth, inputBorderColor,
		buttonBorderWidth, buttonBorderColor, formGap
	} = attributes;

	const titleStyle = titleColor ? { color: titleColor } : undefined;
	const subtitleStyle = subtitleColor ? { color: subtitleColor } : undefined;
	const inputStyle = {
		backgroundColor: inputBgColor || undefined,
		borderRadius: `${inputBorderRadius}px`,
	};
	const buttonStyle = {
		backgroundColor: buttonBgColor || undefined,
		color: buttonTextColor || undefined,
		borderRadius: `${buttonBorderRadius}px`,
		border: `${buttonBorderWidth}px solid ${buttonBorderColor}`,
	};

	const customStyles = {};
	if (buttonHoverBgColor) customStyles['--bpafb-mailchimp-btn-hover-bg'] = buttonHoverBgColor;
	if (buttonHoverTextColor) customStyles['--bpafb-mailchimp-btn-hover-text'] = buttonHoverTextColor;

	const blockProps = useBlockProps.save({
		className: 'bpafb-mailchimp-wrapper',
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-mailchimp-content" style={Object.keys(customStyles).length > 0 ? customStyles : undefined}>
				<h2 className="bpafb-mailchimp-title" style={titleStyle}>{title}</h2>
				<p className="bpafb-mailchimp-subtitle" style={subtitleStyle}>{subtitle}</p>
				<form className="bpafb-mailchimp-form" action={getSafeMailchimpUrl(formAction) || '#'} method="post" target="_blank" rel="noopener noreferrer" style={{ gap: `${formGap}px` }}>
					<div className="bpafb-mailchimp-input-wrapper" style={{ 
						display: 'flex', 
						border: `${inputBorderWidth}px solid ${inputBorderColor}`,
						borderRadius: `${inputBorderRadius}px`,
						overflow: 'hidden',
						backgroundColor: inputBgColor || '#ffffff',
						flex: 1
					}}>
						{showInputIcon && (
							<div className="bpafb-mailchimp-input-icon" style={{
								backgroundColor: inputIconBgColor,
								color: inputIconColor,
								padding: '0 15px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRight: `${inputBorderWidth}px solid ${inputBorderColor}`
							}}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
							</div>
						)}
						<input
							type="email"
							name="EMAIL"
							className="bpafb-mailchimp-input"
							placeholder={placeholderText}
							aria-label={placeholderText || __('Email address', 'blockive-premium-addon-for-block')}
							style={{
								...inputStyle,
								border: 'none',
								borderRadius: 0,
								backgroundColor: 'transparent',
							}}
							required
						/>
					</div>
					<button type="submit" className="bpafb-mailchimp-button" style={buttonStyle}>
						{showButtonIcon && (
							<svg style={{ marginRight: '8px' }} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
						)}
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
}
