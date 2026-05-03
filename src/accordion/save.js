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
		'--bpafb-accordion-bw': `${borderWidth}px`,
		'--bpafb-accordion-borderColor': borderColor,
		'--bpafb-accordion-title-color': titleColor,
		'--bpafb-accordion-title-active-color': titleActiveColor,
		'--bpafb-accordion-title-bg': titleBgColor,
		'--bpafb-accordion-content-color': contentColor,
		'--bpafb-accordion-content-bg': contentBgColor,
	};

	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps.save({
		className: `bpafb-accordion-wrapper ${animationType !== 'none' ? `bpafb-animate-${animationType}` : ''}`,
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
								<span className="bpafb-accordion-icon bpafb-icon-open"><i className="fas fa-plus"></i></span>
								<span className="bpafb-accordion-icon bpafb-icon-close" style={{ display: 'none' }}><i className="fas fa-minus"></i></span>
							</>
						);
					} else if (icon === 'chevron') {
						iconElement = (
							<>
								<span className="bpafb-accordion-icon bpafb-icon-open"><i className="fas fa-chevron-down"></i></span>
								<span className="bpafb-accordion-icon bpafb-icon-close" style={{ display: 'none' }}><i className="fas fa-chevron-up"></i></span>
							</>
						);
					} else if (icon === 'angle') {
						iconElement = (
							<>
								<span className="bpafb-accordion-icon bpafb-icon-open"><i className="fas fa-angle-down"></i></span>
								<span className="bpafb-accordion-icon bpafb-icon-close" style={{ display: 'none' }}><i className="fas fa-angle-up"></i></span>
							</>
						);
					}
				}

				return (
					<div key={item.id || index} className={`bpafb-accordion-item ${isFirst ? 'active' : ''}`}>
						<div className={`bpafb-accordion-header flex-align-${iconAlign}`}>
							{iconAlign === 'left' && iconElement}
							<RichText.Content
								tagName="span"
								className="bpafb-accordion-title"
								value={item.title}
							/>
							{iconAlign === 'right' && iconElement}
						</div>
						<div className="bpafb-accordion-content" style={{ display: isFirst ? 'block' : 'none' }}>
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
