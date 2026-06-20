import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { 
		members, 
		columns,
		columnGap, 
		showImage,
		imageStyle,
		imageBorderWidth,
		imageBorderColor,
		textColor, 
		descColor,
		positionColor,
		bgColor,
		cardBorderWidth,
		cardBorderRadius,
		cardBorderColor,
		enableBoxShadow,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
	} = attributes;

	const customStyles = {
		'--bpafb-team-text-color': textColor,
		'--bpafb-team-desc-color': descColor,
		'--bpafb-team-position-color': positionColor,
		'--bpafb-team-bg-color': bgColor,
		'--bpafb-team-columns': columns,
		'--bpafb-team-column-gap': `${columnGap}px`,
		'--bpafb-card-border-width': `${cardBorderWidth}px`,
		'--bpafb-card-border-radius': `${cardBorderRadius}px`,
		'--bpafb-card-border-color': cardBorderColor,
		'--bpafb-card-box-shadow': enableBoxShadow ? `${boxShadowHOffset}px ${boxShadowVOffset}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}` : 'none',
		'--bpafb-image-border-width': `${imageBorderWidth}px`,
		'--bpafb-image-border-color': imageBorderColor,
	};

	const blockProps = useBlockProps.save({
		className: `bpafb-team-wrapper bpafb-image-style-${imageStyle}`,
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-team-grid">
				{members.map((member) => (
					<div key={member.id} className="bpafb-team-card">
						{showImage && member.image && <img src={member.image} alt={member.name} className="bpafb-team-image" />}
						<h3 className="bpafb-team-name">{member.name}</h3>
						<p className="bpafb-team-role">{member.role}</p>
						<p className="bpafb-team-bio">{member.bio}</p>
					</div>
				))}
			</div>
		</div>
	);
}
