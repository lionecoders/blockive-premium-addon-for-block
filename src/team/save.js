import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { members, columns, textColor, bgColor } = attributes;

	const customStyles = {
		'--lcibwc-team-text-color': textColor,
		'--lcibwc-team-bg-color': bgColor,
		'--lcibwc-team-columns': columns,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-team-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-team-grid">
				{members.map((member) => (
					<div key={member.id} className="lcibwc-team-card">
						{member.image && <img src={member.image} alt={member.name} className="lcibwc-team-image" />}
						<h3 className="lcibwc-team-name">{member.name}</h3>
						<p className="lcibwc-team-role">{member.role}</p>
						<p className="lcibwc-team-bio">{member.bio}</p>
					</div>
				))}
			</div>
		</div>
	);
}
