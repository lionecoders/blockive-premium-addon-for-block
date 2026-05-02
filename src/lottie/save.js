import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { animationUrl, width, height, loop, autoplay, align } = attributes;

	const customStyles = {
		textAlign: align,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-lottie-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-lottie-container" style={{ width: width, height: height }}>
				{animationUrl && (
					<lottie-player
						src={animationUrl}
						autoplay={autoplay ? 'true' : 'false'}
						loop={loop ? 'true' : 'false'}
						style={{ width: '100%', height: '100%' }}
					/>
				)}
			</div>
		</div>
	);
}
