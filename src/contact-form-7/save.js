import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { formId, showTitle, title, description, titleColor, descriptionColor } = attributes;
	const safeFormId = ( formId || '' ).replace( /[^0-9]/g, '' );

	const blockProps = useBlockProps.save({
		className: 'bpafb-contact-form-7-wrapper',
	});

	return (
		<div {...blockProps}>
			{showTitle && (
				<>
					<h2 className="bpafb-cf7-title" style={{ color: titleColor }}>{title}</h2>
					{description && <p className="bpafb-cf7-description" style={{ color: descriptionColor }}>{description}</p>}
				</>
			)}
			<div className="bpafb-cf7-form-wrapper">
				{safeFormId && `[contact-form-7 id="${safeFormId}"]`}
			</div>
		</div>
	);
}
