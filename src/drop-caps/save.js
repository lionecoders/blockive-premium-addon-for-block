import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		content,
		view,
		shape,
		primaryColor,
		secondaryColor,
		size,
		space,
		borderWidth,
		borderRadius,
		dropCapPadding,
		alignment,
	} = attributes;

	const customStyles = {
		textAlign: alignment,
		'--lc-dc-size': `${size}px`,
		'--lc-dc-space': `${space}px`,
		'--lc-dc-padding': `${dropCapPadding}px`,
		'--lc-dc-color': secondaryColor || 'inherit',
		'--lc-dc-bg': view === 'stacked' ? (primaryColor || '#000') : 'transparent',
		'--lc-dc-border-width': view === 'framed' ? `${borderWidth}px` : '0px',
		'--lc-dc-border-color': primaryColor || '#000',
		'--lc-dc-radius': borderRadius > 0 ? `${borderRadius}px` : (shape === 'circle' ? '50%' : (shape === 'rounded' ? '5px' : '0')),
	};

	const blockProps = useBlockProps.save({
		className: `has-drop-cap is-view-${view} is-shape-${shape}`,
		style: customStyles,
	});

	return (
		<RichText.Content
			{...blockProps}
			tagName="p"
			value={content}
		/>
	);
}
