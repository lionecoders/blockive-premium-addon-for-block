import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { number, suffix, prefix, title, numberColor, textColor, duration } = attributes;

	const customStyles = {
		'--lcibwc-funfact-number-color': numberColor,
		'--lcibwc-funfact-text-color': textColor,
		'--lcibwc-funfact-duration': `${duration}ms`,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-funfact-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-funfact-content">
				<div className="lcibwc-funfact-number">
					<span className="lcibwc-funfact-prefix">{prefix}</span>
					<span className="lcibwc-funfact-counter" data-count={number}>0</span>
					<span className="lcibwc-funfact-suffix">{suffix}</span>
				</div>
				<h3 className="lcibwc-funfact-title">{title}</h3>
			</div>
		</div>
	);
}
