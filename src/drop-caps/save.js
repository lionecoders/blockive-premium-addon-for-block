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
		'--lcibwc-dc-size': `${size}px`,
		'--lcibwc-dc-space': `${space}px`,
		'--lcibwc-dc-pd': `${dropCapPadding}px`,
		'--lcibwc-dc-color': secondaryColor || 'inherit',
		'--lcibwc-dc-bg': view === 'stacked' ? (primaryColor || '#000') : 'transparent',
		'--lcibwc-dc-borderWidth': view === 'framed' ? `${borderWidth}px` : '0px',
		'--lcibwc-dc-borderColor': primaryColor || '#000',
		'--lcibwc-dc-radius': borderRadius > 0 ? `${borderRadius}px` : (shape === 'circle' ? '50%' : (shape === 'rounded' ? '5px' : '0')),
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
