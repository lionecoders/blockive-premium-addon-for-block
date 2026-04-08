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
		'--lc-pt-header-bg': headerBgColor || '#4f46e5',
		'--lc-pt-header-text': headerTextColor || '#ffffff',
		'--lc-pt-price-color': priceColor || '#0f172a',
		'--lc-pt-feature-text': featureTextColor || '#475569',
		'--lc-pt-button-bg': buttonBgColor || '#4f46e5',
		'--lc-pt-button-text': buttonTextColor || '#ffffff',
		'--lc-pt-box-bg': boxBgColor || '#ffffff',
		'--lc-pt-border-color': borderColor || '#f1f5f9',
		'--lc-pt-border-width': `${borderWidth !== undefined ? borderWidth : 1}px`,
		'--lc-pt-border-radius': `${borderRadius !== undefined ? borderRadius : 16}px`,
	};

	const blockProps = useBlockProps.save({
		className: `align${alignment || 'center'}`,
	});

	return (
		<div {...blockProps}>
			<div 
				className={`lc-pricing-table lc-pricing-${layoutStyle || 'style1'} ${isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`}
				style={{ ...customStyles, textAlign: alignment || 'center' }}
			>
				{isFeatured && (
					<div className="lc-pricing-badge">{featuredBadge}</div>
				)}
				
				<div className="lc-pricing-header">
					<RichText.Content
						tagName="h3"
						className="lc-pricing-title"
						value={title}
					/>
					<RichText.Content
						tagName="p"
						className="lc-pricing-subtitle"
						value={subtitle}
					/>
				</div>

				<div className="lc-pricing-price-area">
					<span className="lc-pricing-currency">{currency}</span>
					<RichText.Content
						tagName="span"
						className="lc-pricing-amount"
						value={price}
					/>
					<span className="lc-pricing-period">{period}</span>
				</div>

				<ul className="lc-pricing-features">
					{features && features.map((feature) => (
						<li key={feature.id} className={feature.active ? 'active' : 'inactive'}>
							<i className={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}></i>
							<span>{feature.text}</span>
						</li>
					))}
				</ul>

				<div className="lc-pricing-footer">
					<a href={buttonUrl || '#'} className="lc-pricing-button">
						<RichText.Content value={buttonText} />
					</a>
				</div>
			</div>
		</div>
	);
}
