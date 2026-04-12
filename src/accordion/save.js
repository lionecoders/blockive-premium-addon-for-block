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
	} = attributes;

	const customStyles = {
		'--lc-accordion-bw': `${borderWidth}px`,
		'--lc-accordion-borderColor': borderColor,
		'--lc-accordion-title-color': titleColor,
		'--lc-accordion-title-active-color': titleActiveColor,
		'--lc-accordion-title-bg': titleBgColor,
		'--lc-accordion-content-color': contentColor,
		'--lc-accordion-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps.save({
		className: `lc-accordion-wrapper ${animationType !== 'none' ? `lc-animate-${animationType}` : ''}`,
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			{items.map((item, index) => {
				const isFirst = index === 0;
				let iconElement = null;
				
				if (icon !== 'none') {
					if (icon === 'plus-minus') {
						iconElement = (
							<>
								<span className="lc-accordion-icon lc-icon-open"><i className="fas fa-plus"></i></span>
								<span className="lc-accordion-icon lc-icon-close" style={{ display: 'none' }}><i className="fas fa-minus"></i></span>
							</>
						);
					} else if (icon === 'chevron') {
						iconElement = (
							<>
								<span className="lc-accordion-icon lc-icon-open"><i className="fas fa-chevron-down"></i></span>
								<span className="lc-accordion-icon lc-icon-close" style={{ display: 'none' }}><i className="fas fa-chevron-up"></i></span>
							</>
						);
					} else if (icon === 'angle') {
						iconElement = (
							<>
								<span className="lc-accordion-icon lc-icon-open"><i className="fas fa-angle-down"></i></span>
								<span className="lc-accordion-icon lc-icon-close" style={{ display: 'none' }}><i className="fas fa-angle-up"></i></span>
							</>
						);
					}
				}

				return (
					<div key={item.id || index} className={`lc-accordion-item ${isFirst ? 'active' : ''}`}>
						<div className={`lc-accordion-header flex-align-${iconAlign}`}>
							{iconAlign === 'left' && iconElement}
							<RichText.Content
								tagName="span"
								className="lc-accordion-title"
								value={item.title}
							/>
							{iconAlign === 'right' && iconElement}
						</div>
						<div className="lc-accordion-content" style={{ display: isFirst ? 'block' : 'none' }}>
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
