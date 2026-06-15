import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		title,
		subtitle,
		isFeatured,
		featuredBadge,
		currency,
		price,
		period,
		features,
		buttonText,
		buttonUrl,
		layoutStyle,
		alignment,
		headerBgColor,
		headerTextColor,
		priceColor,
		featureTextColor,
		buttonBgColor,
		buttonTextColor,
		boxBgColor,
		borderColor,
		borderWidth,
		borderRadius,
		boxShadow,
	} = attributes;

	const customStyles = {
		'--bpafb-pt-header-bg': headerBgColor || '#4f46e5',
		'--bpafb-pt-header-text': headerTextColor || '#ffffff',
		'--bpafb-pt-price-color': priceColor || '#0f172a',
		'--bpafb-pt-feature-text': featureTextColor || '#475569',
		'--bpafb-pt-button-bg': buttonBgColor || '#4f46e5',
		'--bpafb-pt-button-text': buttonTextColor || '#ffffff',
		'--bpafb-pt-box-bg': boxBgColor || '#ffffff',
		'--bpafb-pt-borderColor': borderColor || '#f1f5f9',
		'--bpafb-pt-borderWidth': `${borderWidth !== undefined ? borderWidth : 1}px`,
		'--bpafb-pt-borderRadius': `${borderRadius !== undefined ? borderRadius : 16}px`,
	};

	const blockProps = useBlockProps.save({
		className: `align${alignment || 'center'}`,
	});

	return (
		<div {...blockProps}>
			<div 
				className={`bpafb-pricing-table bpafb-pricing-${layoutStyle || 'style1'} ${isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`}
				style={{ ...customStyles, textAlign: alignment || 'center' }}
			>
				{isFeatured && (
					<div className="bpafb-pricing-badge">{featuredBadge}</div>
				)}
				
				<div className="bpafb-pricing-header">
					<RichText.Content
						tagName="h3"
						className="bpafb-pricing-title"
						value={title}
					/>
					<RichText.Content
						tagName="p"
						className="bpafb-pricing-subtitle"
						value={subtitle}
					/>
				</div>

				<div className="bpafb-pricing-price-area">
					<span className="bpafb-pricing-currency">{currency}</span>
					<RichText.Content
						tagName="span"
						className="bpafb-pricing-amount"
						value={price}
					/>
					<span className="bpafb-pricing-period">{period}</span>
				</div>

				<ul className="bpafb-pricing-features">
					{features && features.map((feature) => (
						<li key={feature.id} className={feature.active ? 'active' : 'inactive'}>
							<i className={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}></i>
							<span>{feature.text}</span>
						</li>
					))}
				</ul>

				<div className="bpafb-pricing-footer">
					<a href={buttonUrl || '#'} className="bpafb-pricing-button">
						<RichText.Content value={buttonText} />
					</a>
				</div>
			</div>
		</div>
	);
}
