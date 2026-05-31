import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		content,
		level,
		alignment,
		link,
		linkTarget,
		textShadowColor,
		textShadowBlur,
		textShadowX,
		textShadowY,
		blendMode,
		animationType,
		animationDuration,
		animationDelay,
	} = attributes;

	const customStyles = {};
	if (alignment) customStyles.textAlign = alignment;

	if (textShadowX || textShadowY || textShadowBlur) {
		customStyles.textShadow = `${textShadowX || 0}px ${textShadowY || 0}px ${textShadowBlur || 0}px ${textShadowColor || '#000'}`;
	}
	if (blendMode && blendMode !== 'normal') {
		customStyles.mixBlendMode = blendMode;
	}
	if (animationType !== 'none') {
		customStyles.animationDuration = animationDuration;
		customStyles.animationDelay = animationDelay;
	}

	const blockProps = useBlockProps.save({
		className: animationType !== 'none' ? `bpafb-animate-${animationType}` : '',
		style: customStyles,
	});

	const TagName = `h${level}`;

	const contentElement = (
		<RichText.Content
			tagName={TagName}
			{...blockProps}
			value={content}
		/>
	);

	if (link) {
		return (
			<a href={link} target={linkTarget} rel={linkTarget === '_blank' ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none' }}>
				{contentElement}
			</a>
		);
	}

	return contentElement;
}
