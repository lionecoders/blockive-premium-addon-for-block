import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { formId, showTitle, title, description } = attributes;

	const blockProps = useBlockProps.save({
		className: 'bpafb-contact-form-7-wrapper',
	});

	return (
		<div {...blockProps}>
			{showTitle && (
				<>
					<h2 className="bpafb-cf7-title">{title}</h2>
					{description && <p className="bpafb-cf7-description">{description}</p>}
				</>
			)}
			<div className="bpafb-cf7-form-wrapper">
				{formId && `[contact-form-7 id="${formId}"]`}
			</div>
		</div>
	);
}
