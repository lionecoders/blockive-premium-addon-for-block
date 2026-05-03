import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { members, columns, textColor, bgColor } = attributes;

	const customStyles = {
		'--bpafb-team-text-color': textColor,
		'--bpafb-team-bg-color': bgColor,
		'--bpafb-team-columns': columns,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-team-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-team-grid">
				{members.map((member) => (
					<div key={member.id} className="bpafb-team-card">
						{member.image && <img src={member.image} alt={member.name} className="bpafb-team-image" />}
						<h3 className="bpafb-team-name">{member.name}</h3>
						<p className="bpafb-team-role">{member.role}</p>
						<p className="bpafb-team-bio">{member.bio}</p>
					</div>
				))}
			</div>
		</div>
	);
}
