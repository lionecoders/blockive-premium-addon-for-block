import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { items, columns, numberColor, textColor, duration, gap } = attributes;

	const blockProps = useBlockProps.save({
		className: `bpafb-funfact-wrapper bpafb-columns-${columns}`,
	});

	return (
		<div {...blockProps} data-duration={duration || 1000} style={{
			'--bpafb-funfact-columns': columns || 3,
			'--bpafb-funfact-gap': `${gap}px`
		}}>
			{(items || []).map((item, index) => (
				<div key={item.id || index} className="bpafb-funfact-item">
					<div className="bpafb-funfact-content">
						<div className="bpafb-funfact-number">
							<span className="bpafb-funfact-prefix" style={{ color: numberColor }}>{item.prefix || ''}</span>
							<span className="bpafb-funfact-counter" data-count={item.number || '0'} style={{ color: numberColor }}>0</span>
							<span className="bpafb-funfact-suffix" style={{ color: numberColor }}>{item.suffix || ''}</span>
						</div>
						<h3 className="bpafb-funfact-title" style={{ color: textColor }}>{item.title || ''}</h3>
					</div>
				</div>
			))}
		</div>
	);
}
