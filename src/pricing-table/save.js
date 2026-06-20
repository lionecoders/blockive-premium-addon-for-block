import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		tables,
		columns,
		columnGap,
		layoutStyle,
		alignment,
		headerBgColor,
		headerTitleColor,
		headerSubtitleColor,
		priceColor,
		featureTextColor,
		buttonBgColor,
		buttonTextColor,
		buttonBorderColor,
		buttonBorderWidth,
		buttonBorderRadius,
		badgeBgColor,
		badgeTextColor,
		boxBgColor,
		borderColor,
		borderWidth,
		borderRadius,
		boxShadow,
	} = attributes;

	const customStyles = {
		'--bpafb-pt-header-bg': headerBgColor || '#4f46e5',
		'--bpafb-pt-header-title-color': headerTitleColor || '#ffffff',
		'--bpafb-pt-header-subtitle-color': headerSubtitleColor || '#ffffff',
		'--bpafb-pt-price-color': priceColor || '#0f172a',
		'--bpafb-pt-feature-text': featureTextColor || '#475569',
		'--bpafb-pt-button-bg': buttonBgColor || '#4f46e5',
		'--bpafb-pt-button-text': buttonTextColor || '#ffffff',
		'--bpafb-pt-btn-border-color': buttonBorderColor || 'transparent',
		'--bpafb-pt-btn-border-width': `${buttonBorderWidth !== undefined ? buttonBorderWidth : 0}px`,
		'--bpafb-pt-btn-border-radius': `${buttonBorderRadius !== undefined ? buttonBorderRadius : 50}px`,
		'--bpafb-pt-badge-bg': badgeBgColor || 'linear-gradient(135deg, #ef4444, #b91c1c)',
		'--bpafb-pt-badge-color': badgeTextColor || '#ffffff',
		'--bpafb-pt-box-bg': boxBgColor || '#ffffff',
		'--bpafb-pt-borderColor': borderColor || '#f1f5f9',
		'--bpafb-pt-borderWidth': `${borderWidth !== undefined ? borderWidth : 1}px`,
		'--bpafb-pt-borderRadius': `${borderRadius !== undefined ? borderRadius : 16}px`,
		'--bpafb-pt-columns': columns,
		'--bpafb-pt-column-gap': `${columnGap}px`,
	};

	const blockProps = useBlockProps.save({
		className: `bpafb-pricing-wrapper align${alignment || 'center'}`,
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-pricing-grid">
				{tables && tables.map((table) => {
					const tableStyles = {
						...(table.headerBgColor && { '--bpafb-pt-header-bg': table.headerBgColor }),
						...(table.headerTitleColor && { '--bpafb-pt-header-title-color': table.headerTitleColor }),
						...(table.headerSubtitleColor && { '--bpafb-pt-header-subtitle-color': table.headerSubtitleColor }),
						...(table.priceColor && { '--bpafb-pt-price-color': table.priceColor }),
						...(table.featureTextColor && { '--bpafb-pt-feature-text': table.featureTextColor }),
						...(table.buttonBgColor && { '--bpafb-pt-button-bg': table.buttonBgColor }),
						...(table.buttonTextColor && { '--bpafb-pt-button-text': table.buttonTextColor }),
						...(table.buttonBorderColor && { '--bpafb-pt-btn-border-color': table.buttonBorderColor }),
						...(table.badgeBgColor && { '--bpafb-pt-badge-bg': table.badgeBgColor }),
						...(table.badgeTextColor && { '--bpafb-pt-badge-color': table.badgeTextColor }),
						...(table.boxBgColor && { '--bpafb-pt-box-bg': table.boxBgColor }),
					};

					return (
					<div 
						key={table.id}
						className={`bpafb-pricing-table bpafb-pricing-${layoutStyle || 'style1'} ${table.isFeatured ? 'is-featured' : ''} ${boxShadow ? 'has-shadow' : ''}`}
						style={tableStyles}
					>
						{table.isFeatured && (
							<div className="bpafb-pricing-badge">{table.featuredBadge}</div>
						)}
						
						<div className="bpafb-pricing-header">
							<RichText.Content
								tagName="h3"
								className="bpafb-pricing-title"
								value={table.title}
							/>
							<RichText.Content
								tagName="p"
								className="bpafb-pricing-subtitle"
								value={table.subtitle}
							/>
						</div>

						{table.image && (
							<div className="bpafb-pricing-image-wrap" style={{ margin: '20px 0' }}>
								<img src={table.image} alt="Pricing Plan" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
							</div>
						)}

						<div className="bpafb-pricing-price-area">
							<span className="bpafb-pricing-currency">{table.currency}</span>
							<RichText.Content
								tagName="span"
								className="bpafb-pricing-amount"
								value={table.price}
							/>
							<span className="bpafb-pricing-period">{table.period}</span>
						</div>

						<ul className="bpafb-pricing-features">
							{table.features && table.features.map((feature) => (
								<li key={feature.id} className={feature.active ? 'active' : 'inactive'}>
									<i className={feature.icon || (feature.active ? 'fas fa-check' : 'fas fa-times')}></i>
									<RichText.Content tagName="span" value={feature.text} />
								</li>
							))}
						</ul>

						<div className="bpafb-pricing-footer">
							<a href={table.buttonUrl || '#'} className="bpafb-pricing-button">
								<RichText.Content value={table.buttonText} />
							</a>
						</div>
					</div>
				)})}
			</div>
		</div>
	);
}
