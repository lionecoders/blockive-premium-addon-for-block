import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { number, suffix, prefix, title, numberColor, textColor, duration } = attributes;

	const blockProps = useBlockProps.save({
		className: 'bpafb-funfact-wrapper',
	});

	return (
		<div {...blockProps} data-duration={duration || 1000}>
			<div className="bpafb-funfact-content">
				<div className="bpafb-funfact-number">
					<span className="bpafb-funfact-prefix" style={{ color: numberColor }}>{prefix}</span>
					<span className="bpafb-funfact-counter" data-count={number} style={{ color: numberColor }}>0</span>
					<span className="bpafb-funfact-suffix" style={{ color: numberColor }}>{suffix}</span>
				</div>
				<h3 className="bpafb-funfact-title" style={{ color: textColor }}>{title}</h3>
			</div>
		</div>
	);
}
