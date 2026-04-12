import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		items,
		shape,
		alignment,
		iconSize,
		iconPadding,
		iconSpacing,
		colorType,
		customPrimaryColor,
		customSecondaryColor,
		hoverAnimation,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `lc-social-icons-wrapper lc-align-${alignment} lc-social-shape-${shape} lc-social-hover-${hoverAnimation}`
	});

	return (
		<div {...blockProps}>
			{items.map((item, index) => {
				const bg = colorType === 'custom' ? customPrimaryColor : item.color;
				const color = colorType === 'custom' ? customSecondaryColor : '#ffffff';
				
				return (
					<a 
						key={item.id} 
						href={item.link || '#'} 
						className="lc-social-icon-item" 
						target="_blank" 
						rel="noopener noreferrer"
						style={{ 
							backgroundColor: bg,
							color: color,
							fontSize: `${iconSize}px`,
							padding: `${iconPadding}px`,
							marginRight: index === items.length - 1 ? 0 : `${iconSpacing}px`,
							width: `${iconSize + (iconPadding * 2)}px`,
							height: `${iconSize + (iconPadding * 2)}px`
						}}
						aria-label={`Visit our ${item.network}`}
					>
						<i className={item.icon}></i>
					</a>
				);
			})}
		</div>
	);
}
