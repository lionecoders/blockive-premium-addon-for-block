import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		items,
		tabBgColor,
		tabActiveColor,
		textColor,
		textActiveColor,
		contentBgColor,
		contentTextColor,
		tabBorderRadius,
	} = attributes;

	const customStyles = {
		'--lc-tab-bg': tabBgColor,
		'--lc-tab-active-bg': tabActiveColor,
		'--lc-tab-text': textColor,
		'--lc-tab-active-text': textActiveColor,
		'--lc-tab-content-bg': contentBgColor,
		'--lc-tab-content-text': contentTextColor,
		'--lc-tab-radius': `${tabBorderRadius}px`,
	};

	const blockProps = useBlockProps.save({
		className: 'lc-tabs-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lc-tabs-nav-track" role="tablist">
				{items.map((item, index) => {
					const isFirst = index === 0;
					return (
						<div key={item.id || index} className={`lc-tab-pill ${isFirst ? 'active' : ''}`} role="tab" tabIndex={0}>
							<div style={{ flex: 1, textAlign: 'center' }}>
								<RichText.Content
									tagName="span"
									className="lc-tab-title"
									value={item.title}
								/>
							</div>
						</div>
					);
				})}
			</div>

			<div className="lc-tabs-content-area">
				{items.map((item, index) => {
					const isFirst = index === 0;
					return (
						<div key={item.id || index} className={`lc-tab-pane ${isFirst ? 'active' : ''}`}>
							<RichText.Content
								tagName="div"
								className="lc-tab-content-text"
								value={item.content}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
