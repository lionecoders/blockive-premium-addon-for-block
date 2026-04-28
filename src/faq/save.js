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
		'--lcibwc-faq-borderWidth': `${borderWidth}px`,
		'--lcibwc-faq-borderColor': borderColor,
		'--lcibwc-faq-title-color': titleColor,
		'--lcibwc-faq-title-active-color': titleActiveColor,
		'--lcibwc-faq-title-bg': titleBgColor,
		'--lcibwc-faq-content-color': contentColor,
		'--lcibwc-faq-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps.save({
		className: `lcibwc-faq-wrapper ${animationType !== 'none' ? `lcibwc-animate-${animationType}` : ''}`,
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
					className="lcibwc-faq-main-heading"
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
								<span className="lcibwc-faq-icon lcibwc-icon-open"><i className="fas fa-plus"></i></span>
								<span className="lcibwc-faq-icon lcibwc-icon-close" style={{ display: 'none' }}><i className="fas fa-minus"></i></span>
							</>
						);
					} else if (icon === 'chevron') {
						iconElement = (
							<>
								<span className="lcibwc-faq-icon lcibwc-icon-open"><i className="fas fa-chevron-down"></i></span>
								<span className="lcibwc-faq-icon lcibwc-icon-close" style={{ display: 'none' }}><i className="fas fa-chevron-up"></i></span>
							</>
						);
					} else if (icon === 'angle') {
						iconElement = (
							<>
								<span className="lcibwc-faq-icon lcibwc-icon-open"><i className="fas fa-angle-down"></i></span>
								<span className="lcibwc-faq-icon lcibwc-icon-close" style={{ display: 'none' }}><i className="fas fa-angle-up"></i></span>
							</>
						);
					}
				}

				return (
					<div key={item.id || index} className={`lcibwc-faq-item ${isFirst ? 'active' : ''}`}>
						<div className={`lcibwc-faq-header flex-align-${iconAlign}`}>
							{iconAlign === 'left' && iconElement}
							<RichText.Content
								tagName={titleTag}
								className="lcibwc-faq-title"
								value={item.title}
							/>
							{iconAlign === 'right' && iconElement}
						</div>
						<div className="lcibwc-faq-content" style={{ display: isFirst ? 'block' : 'none' }}>
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
