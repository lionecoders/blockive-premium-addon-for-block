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
		'--lcibwc-accordion-bw': `${borderWidth}px`,
		'--lcibwc-accordion-borderColor': borderColor,
		'--lcibwc-accordion-title-color': titleColor,
		'--lcibwc-accordion-title-active-color': titleActiveColor,
		'--lcibwc-accordion-title-bg': titleBgColor,
		'--lcibwc-accordion-content-color': contentColor,
		'--lcibwc-accordion-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps.save({
		className: `lcibwc-accordion-wrapper ${animationType !== 'none' ? `lcibwc-animate-${animationType}` : ''}`,
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
								<span className="lcibwc-accordion-icon lcibwc-icon-open"><i className="fas fa-plus"></i></span>
								<span className="lcibwc-accordion-icon lcibwc-icon-close" style={{ display: 'none' }}><i className="fas fa-minus"></i></span>
							</>
						);
					} else if (icon === 'chevron') {
						iconElement = (
							<>
								<span className="lcibwc-accordion-icon lcibwc-icon-open"><i className="fas fa-chevron-down"></i></span>
								<span className="lcibwc-accordion-icon lcibwc-icon-close" style={{ display: 'none' }}><i className="fas fa-chevron-up"></i></span>
							</>
						);
					} else if (icon === 'angle') {
						iconElement = (
							<>
								<span className="lcibwc-accordion-icon lcibwc-icon-open"><i className="fas fa-angle-down"></i></span>
								<span className="lcibwc-accordion-icon lcibwc-icon-close" style={{ display: 'none' }}><i className="fas fa-angle-up"></i></span>
							</>
						);
					}
				}

				return (
					<div key={item.id || index} className={`lcibwc-accordion-item ${isFirst ? 'active' : ''}`}>
						<div className={`lcibwc-accordion-header flex-align-${iconAlign}`}>
							{iconAlign === 'left' && iconElement}
							<RichText.Content
								tagName="span"
								className="lcibwc-accordion-title"
								value={item.title}
							/>
							{iconAlign === 'right' && iconElement}
						</div>
						<div className="lcibwc-accordion-content" style={{ display: isFirst ? 'block' : 'none' }}>
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
