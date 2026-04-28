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
		'--lcibwc-pt-header-bg': headerBgColor || '#4f46e5',
		'--lcibwc-pt-header-text': headerTextColor || '#ffffff',
		'--lcibwc-pt-price-color': priceColor || '#0f172a',
		'--lcibwc-pt-feature-text': featureTextColor || '#475569',
		'--lcibwc-pt-button-bg': buttonBgColor || '#4f46e5',
		'--lcibwc-pt-button-text': buttonTextColor || '#ffffff',
		'--lcibwc-pt-box-bg': boxBgColor || '#ffffff',
		'--lcibwc-pt-borderColor': borderColor || '#f1f5f9',
		'--lcibwc-pt-borderWidth': `${borderWidth !== undefined ? borderWidth : 1}px`,
		'--lcibwc-pt-borderRadius': `${borderRadius !== undefined ? borderRadius : 16}px`,
	};

	const blockProps = useBlockProps.save({
		className: `align${alignment || 'center'}`,
	});

	return (
		<div {...blockProps}>
			<div 
				className={`lcibwc-pricing-table lcibwc-pricing-${layoutStyle || 'style1'} ${isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`}
				style={{ ...customStyles, textAlign: alignment || 'center' }}
			>
				{isFeatured && (
					<div className="lcibwc-pricing-badge">{featuredBadge}</div>
				)}
				
				<div className="lcibwc-pricing-header">
					<RichText.Content
						tagName="h3"
						className="lcibwc-pricing-title"
						value={title}
					/>
					<RichText.Content
						tagName="p"
						className="lcibwc-pricing-subtitle"
						value={subtitle}
					/>
				</div>

				<div className="lcibwc-pricing-price-area">
					<span className="lcibwc-pricing-currency">{currency}</span>
					<RichText.Content
						tagName="span"
						className="lcibwc-pricing-amount"
						value={price}
					/>
					<span className="lcibwc-pricing-period">{period}</span>
				</div>

				<ul className="lcibwc-pricing-features">
					{features && features.map((feature) => (
						<li key={feature.id} className={feature.active ? 'active' : 'inactive'}>
							<i className={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}></i>
							<span>{feature.text}</span>
						</li>
					))}
				</ul>

				<div className="lcibwc-pricing-footer">
					<a href={buttonUrl || '#'} className="lcibwc-pricing-button">
						<RichText.Content value={buttonText} />
					</a>
				</div>
			</div>
		</div>
	);
}
