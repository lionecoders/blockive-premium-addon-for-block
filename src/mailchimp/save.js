import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, subtitle, placeholderText, buttonText, bgColor, textColor } = attributes;

	const customStyles = {
		'--lcibwc-mailchimp-bg': bgColor,
		'--lcibwc-mailchimp-text': textColor,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-mailchimp-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-mailchimp-content">
				<h2 className="lcibwc-mailchimp-title">{title}</h2>
				<p className="lcibwc-mailchimp-subtitle">{subtitle}</p>
				<form className="lcibwc-mailchimp-form">
					<input
						type="email"
						className="lcibwc-mailchimp-input"
						placeholder={placeholderText}
						required
					/>
					<button type="submit" className="lcibwc-mailchimp-button">
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
}
