import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title, subtitle, placeholderText, buttonText, bgColor, textColor } = attributes;

	const customStyles = {
		'--bpafb-mailchimp-bg': bgColor,
		'--bpafb-mailchimp-text': textColor,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-mailchimp-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-mailchimp-content">
				<h2 className="bpafb-mailchimp-title">{title}</h2>
				<p className="bpafb-mailchimp-subtitle">{subtitle}</p>
				<form className="bpafb-mailchimp-form">
					<input
						type="email"
						className="bpafb-mailchimp-input"
						placeholder={placeholderText}
						required
					/>
					<button type="submit" className="bpafb-mailchimp-button">
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
}
