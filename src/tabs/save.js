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
		'--lcibwc-tab-bg': tabBgColor,
		'--lcibwc-tab-active-bg': tabActiveColor,
		'--lcibwc-tab-text': textColor,
		'--lcibwc-tab-active-text': textActiveColor,
		'--lcibwc-tab-content-bg': contentBgColor,
		'--lcibwc-tab-content-text': contentTextColor,
		'--lcibwc-tab-radius': `${tabBorderRadius}px`,
	};

	const blockProps = useBlockProps.save({
		className: 'lcibwc-tabs-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="lcibwc-tabs-nav-track" role="tablist">
				{items.map((item, index) => {
					const isFirst = index === 0;
					return (
						<div key={item.id || index} className={`lcibwc-tab-pill ${isFirst ? 'active' : ''}`} role="tab" tabIndex={0}>
							<div style={{ flex: 1, textAlign: 'center' }}>
								<RichText.Content
									tagName="span"
									className="lcibwc-tab-title"
									value={item.title}
								/>
							</div>
						</div>
					);
				})}
			</div>

			<div className="lcibwc-tabs-content-area">
				{items.map((item, index) => {
					const isFirst = index === 0;
					return (
						<div key={item.id || index} className={`lcibwc-tab-pane ${isFirst ? 'active' : ''}`}>
							<RichText.Content
								tagName="div"
								className="lcibwc-tab-content-text"
								value={item.content}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
