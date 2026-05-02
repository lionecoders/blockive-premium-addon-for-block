import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { formId, showTitle, title, description } = attributes;

	const blockProps = useBlockProps.save({
		className: 'lcibwc-contact-form-7-wrapper',
	});

	return (
		<div {...blockProps}>
			{showTitle && (
				<>
					<h2 className="lcibwc-cf7-title">{title}</h2>
					{description && <p className="lcibwc-cf7-description">{description}</p>}
				</>
			)}
			<div className="lcibwc-cf7-form-wrapper">
				{formId && `[contact-form-7 id="${formId}"]`}
			</div>
		</div>
	);
}
