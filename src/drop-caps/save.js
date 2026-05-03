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
		'--bpafb-dc-size': `${size}px`,
		'--bpafb-dc-space': `${space}px`,
		'--bpafb-dc-pd': `${dropCapPadding}px`,
		'--bpafb-dc-color': secondaryColor || 'inherit',
		'--bpafb-dc-bg': view === 'stacked' ? (primaryColor || '#000') : 'transparent',
		'--bpafb-dc-borderWidth': view === 'framed' ? `${borderWidth}px` : '0px',
		'--bpafb-dc-borderColor': primaryColor || '#000',
		'--bpafb-dc-radius': borderRadius > 0 ? `${borderRadius}px` : (shape === 'circle' ? '50%' : (shape === 'rounded' ? '5px' : '0')),
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
