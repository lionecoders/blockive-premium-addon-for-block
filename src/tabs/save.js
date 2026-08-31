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
		bpafbUid,
	} = attributes;

	const customStyles = {
		'--bpafb-tab-bg': tabBgColor,
		'--bpafb-tab-active-bg': tabActiveColor,
		'--bpafb-tab-text': textColor,
		'--bpafb-tab-active-text': textActiveColor,
		'--bpafb-tab-content-bg': contentBgColor,
		'--bpafb-tab-content-text': contentTextColor,
		'--bpafb-tab-radius': `${tabBorderRadius}px`,
	};

	const blockProps = useBlockProps.save({
		className: 'bpafb-tabs-wrapper',
		style: customStyles,
	});

	return (
		<div {...blockProps}>
			<div className="bpafb-tabs-nav-track" role="tablist">
				{items.map((item, index) => {
					const isFirst = index === 0;
					const tabId = `bpafb-tab-${bpafbUid}-${item.id || index}`;
					const panelId = `bpafb-tabpanel-${bpafbUid}-${item.id || index}`;
					return (
						<div
							key={item.id || index}
							id={tabId}
							className={`bpafb-tab-pill ${isFirst ? 'active' : ''}`}
							role="tab"
							tabIndex={0}
							aria-selected={isFirst}
							aria-controls={panelId}
						>
							<div style={{ flex: 1, textAlign: 'center' }}>
								<RichText.Content
									tagName="span"
									className="bpafb-tab-title"
									value={item.title}
								/>
							</div>
						</div>
					);
				})}
			</div>

			<div className="bpafb-tabs-content-area">
				{items.map((item, index) => {
					const isFirst = index === 0;
					const tabId = `bpafb-tab-${bpafbUid}-${item.id || index}`;
					const panelId = `bpafb-tabpanel-${bpafbUid}-${item.id || index}`;
					return (
						<div
							key={item.id || index}
							id={panelId}
							className={`bpafb-tab-pane ${isFirst ? 'active' : ''}`}
							role="tabpanel"
							aria-labelledby={tabId}
						>
							<RichText.Content
								tagName="div"
								className="bpafb-tab-content-text"
								value={item.content}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
