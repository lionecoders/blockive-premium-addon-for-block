import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { beforeImage, afterImage, beforeLabel, afterLabel, showLabels, sliderPosition, height } = attributes;

	const customStyles = {
		height: height,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-image-comparison-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-image-comparison" data-position={sliderPosition}>
				<div className="lcibwc-comparison-image before-image" style={{ backgroundImage: beforeImage ? `url(${beforeImage})` : 'none' }}>
					{showLabels && <span className="lcibwc-label before-label">{beforeLabel}</span>}
				</div>
				<div className="lcibwc-comparison-image after-image" style={{ backgroundImage: afterImage ? `url(${afterImage})` : 'none', clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
					{showLabels && <span className="lcibwc-label after-label">{afterLabel}</span>}
				</div>
				<div className="lcibwc-comparison-handle" style={{ left: `${sliderPosition}%` }}>
					<span className="lcibwc-handle-icon"></span>
				</div>
			</div>
		</div>
	);
}
