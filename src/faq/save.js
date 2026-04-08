import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		items,
		icon,
		iconAlign,
		titleColor,
		titleActiveColor,
		titleBgColor,
		contentColor,
		contentBgColor,
		borderColor,
		borderWidth,
		animationType,
		animationDuration,
		animationDelay,
		titleTag,
		headingText,
		headingTag,
		headingAlign,
		headingColor,
	} = attributes;

	const customStyles = {
		'--lc-faq-border-width': `${borderWidth}px`,
		'--lc-faq-border-color': borderColor,
		'--lc-faq-title-color': titleColor,
		'--lc-faq-title-active-color': titleActiveColor,
		'--lc-faq-title-bg': titleBgColor,
		'--lc-faq-content-color': contentColor,
		'--lc-faq-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps.save({
		className: `lc-faq-wrapper ${animationType !== 'none' ? `lc-animate-${animationType}` : ''}`,
		style: customStyles,
	});

	// Generate FAQ schema
	const schemaData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": items.map(item => ({
			"@type": "Question",
			"name": item.title.replace(/<\/?[^>]+(>|$)/g, ""),
			"acceptedAnswer": {
				"@type": "Answer",
				"text": item.content
			}
		}))
	};
	
	const schemaStr = JSON.stringify(schemaData).replace(/</g, '\\u003c');

	return (
		<div {...blockProps}>
			<script 
				type="application/ld+json" 
				dangerouslySetInnerHTML={{ __html: schemaStr }} 
			/>
			{headingText && (
				<RichText.Content
					tagName={headingTag}
					className="lc-faq-main-heading"
					style={{ textAlign: headingAlign, color: headingColor, marginBottom: '20px' }}
					value={headingText}
				/>
			)}
			{items.map((item, index) => {
				const isFirst = index === 0;
				let iconElement = null;
				
				if (icon !== 'none') {
					if (icon === 'plus-minus') {
						iconElement = (
							<>
								<span className="lc-faq-icon lc-icon-open">+</span>
								<span className="lc-faq-icon lc-icon-close" style={{ display: 'none' }}>-</span>
							</>
						);
					} else if (icon === 'chevron') {
						iconElement = (
							<>
								<span className="lc-faq-icon lc-icon-open">▼</span>
								<span className="lc-faq-icon lc-icon-close" style={{ display: 'none' }}>▲</span>
							</>
						);
					} else if (icon === 'angle') {
						iconElement = (
							<>
								<span className="lc-faq-icon lc-icon-open">∨</span>
								<span className="lc-faq-icon lc-icon-close" style={{ display: 'none' }}>∧</span>
							</>
						);
					}
				}

				return (
					<div key={item.id || index} className={`lc-faq-item ${isFirst ? 'active' : ''}`}>
						<div className={`lc-faq-header flex-align-${iconAlign}`}>
							{iconAlign === 'left' && iconElement}
							<RichText.Content
								tagName={titleTag}
								className="lc-faq-title"
								value={item.title}
							/>
							{iconAlign === 'right' && iconElement}
						</div>
						<div className="lc-faq-content" style={{ display: isFirst ? 'block' : 'none' }}>
							<RichText.Content
								tagName="p"
								value={item.content}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
