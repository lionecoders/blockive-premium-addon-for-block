import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { beforeImage, afterImage, beforeLabel, afterLabel, showLabels, labelColor, labelBackgroundColor, labelPosition, separatorColor, arrowColor, sliderPosition, height } = attributes;

	const customStyles = {
		height: height,
		'--bpafb-label-color': labelColor,
		'--bpafb-label-bg': labelBackgroundColor,
		'--bpafb-separator-color': separatorColor,
		'--bpafb-arrow-color': arrowColor,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-image-comparison',
		style: customStyles,
		'data-position': sliderPosition,
		'data-label-position': labelPosition,
	});

	return (
		<div {...blockProps}>
				<div
					className="bpafb-comparison-image after-image"
					style={{ backgroundImage: afterImage ? `url(${afterImage})` : 'none' }}
					role="img"
					aria-label={afterLabel || __('After image', 'blockive-premium-addon-for-block')}
				>
					{showLabels && <span className="bpafb-label after-label">{afterLabel}</span>}
				</div>
				<div
					className="bpafb-comparison-image before-image"
					style={{ backgroundImage: beforeImage ? `url(${beforeImage})` : 'none', clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
					role="img"
					aria-label={beforeLabel || __('Before image', 'blockive-premium-addon-for-block')}
				>
					{showLabels && <span className="bpafb-label before-label">{beforeLabel}</span>}
				</div>
				{beforeImage && (
					<img src={beforeImage} alt="" style={{ visibility: 'hidden', display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }} />
				)}
				<div
					className="bpafb-comparison-handle"
					style={{ left: `${sliderPosition}%` }}
					role="slider"
					tabIndex={0}
					aria-orientation="horizontal"
					aria-valuenow={sliderPosition}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label={__('Image comparison slider', 'blockive-premium-addon-for-block')}
				>
					<span className="bpafb-handle-icon"></span>
				</div>
		</div>
	);
}
