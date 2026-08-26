import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { getSafeLottieUrl } from './utils';

export default function Save({ attributes }) {
	const { animationUrl, width, height, align, linkUrl, linkTarget } = attributes;
	const safeLinkUrl = getSafeLottieUrl( linkUrl );

	const alignmentMap = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};

	const customStyles = {
		display: 'flex',
		justifyContent: alignmentMap[align] || 'center',
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-lottie-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-lottie-container" style={{ width: width, height: height }}>
				{animationUrl && (
					animationUrl.includes('.mp4') ? (
						safeLinkUrl ? (
							<a href={safeLinkUrl} target={linkTarget ? '_blank' : '_self'} rel={linkTarget ? 'noopener noreferrer' : undefined} style={{ display: 'block', width: '100%', height: '100%' }}>
								<video src={animationUrl} autoPlay={true} loop={true} muted={true} playsInline={true} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
							</a>
						) : (
							<video src={animationUrl} autoPlay={true} loop={true} muted={true} playsInline={true} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
						)
					) : (
						safeLinkUrl ? (
							<a href={safeLinkUrl} target={linkTarget ? '_blank' : '_self'} rel={linkTarget ? 'noopener noreferrer' : undefined} style={{ display: 'block', width: '100%', height: '100%' }}>
								<img src={animationUrl} alt={__('Animation', 'blockive-premium-addon-for-block')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
							</a>
						) : (
							<img src={animationUrl} alt={__('Animation', 'blockive-premium-addon-for-block')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
						)
					)
				)}
			</div>
		</div>
	);
}
