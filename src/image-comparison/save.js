import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { beforeImage, afterImage, beforeLabel, afterLabel, showLabels, sliderPosition, height } = attributes;

	const customStyles = {
		height: height,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-image-comparison-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-image-comparison" data-position={sliderPosition}>
				<div className="bpafb-comparison-image before-image" style={{ backgroundImage: beforeImage ? `url(${beforeImage})` : 'none' }}>
					{showLabels && <span className="bpafb-label before-label">{beforeLabel}</span>}
				</div>
				<div className="bpafb-comparison-image after-image" style={{ backgroundImage: afterImage ? `url(${afterImage})` : 'none', clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
					{showLabels && <span className="bpafb-label after-label">{afterLabel}</span>}
				</div>
				<div className="bpafb-comparison-handle" style={{ left: `${sliderPosition}%` }}>
					<span className="bpafb-handle-icon"></span>
				</div>
			</div>
		</div>
	);
}
