import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { videoUrl, width, height, autoplay, controls, loop } = attributes;

	const customStyles = {
		width: width,
		height: height,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-video-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-video-container">
				<video
					controls={controls}
					autoPlay={autoplay}
					loop={loop}
					style={{ width: '100%', height: '100%', objectFit: 'contain' }}
				>
					<source src={videoUrl} />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	);
}
