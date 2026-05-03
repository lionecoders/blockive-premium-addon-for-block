import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { number, suffix, prefix, title, numberColor, textColor, duration } = attributes;

	const customStyles = {
		'--bpafb-funfact-number-color': numberColor,
		'--bpafb-funfact-text-color': textColor,
		'--bpafb-funfact-duration': `${duration}ms`,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-funfact-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-funfact-content">
				<div className="bpafb-funfact-number">
					<span className="bpafb-funfact-prefix">{prefix}</span>
					<span className="bpafb-funfact-counter" data-count={number}>0</span>
					<span className="bpafb-funfact-suffix">{suffix}</span>
				</div>
				<h3 className="bpafb-funfact-title">{title}</h3>
			</div>
		</div>
	);
}
