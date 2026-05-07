/**
 * DisplayConditionsModal Component.
 *
 * Modal UI for managing template display conditions.
 * Currently renders the shell UI — full condition engine
 * will be implemented in a future iteration.
 *
 * @package Blockive\ThemeBuilder
 * @since   1.1.0
 */

import { Modal, Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Placeholder condition groups for UI scaffolding.
 */
const CONDITION_GROUPS = [
	{
		slug: 'general',
		label: __( 'General', 'blockive-premium-addon-for-block' ),
		icon: 'admin-site-alt3',
		items: [
			__( 'Entire Site', 'blockive-premium-addon-for-block' ),
			__( 'All Pages', 'blockive-premium-addon-for-block' ),
			__( 'Front Page', 'blockive-premium-addon-for-block' ),
		],
	},
	{
		slug: 'singular',
		label: __( 'Singular', 'blockive-premium-addon-for-block' ),
		icon: 'media-text',
		items: [
			__( 'All Posts', 'blockive-premium-addon-for-block' ),
			__( 'All Pages', 'blockive-premium-addon-for-block' ),
			__( 'Specific Post/Page', 'blockive-premium-addon-for-block' ),
		],
	},
	{
		slug: 'archive',
		label: __( 'Archive', 'blockive-premium-addon-for-block' ),
		icon: 'grid-view',
		items: [
			__( 'All Archives', 'blockive-premium-addon-for-block' ),
			__( 'Category Archive', 'blockive-premium-addon-for-block' ),
			__( 'Tag Archive', 'blockive-premium-addon-for-block' ),
			__( 'Author Archive', 'blockive-premium-addon-for-block' ),
		],
	},
];

export default function DisplayConditionsModal( { onClose } ) {
	return (
		<Modal
			title={ __( 'Display Conditions', 'blockive-premium-addon-for-block' ) }
			onRequestClose={ onClose }
			className="blockive-tb-conditions-modal"
			isDismissible
		>
			<Notice
				status="info"
				isDismissible={ false }
				className="blockive-tb-conditions-modal__notice"
			>
				{ __( 'Condition engine coming soon. This is a preview of the UI.', 'blockive-premium-addon-for-block' ) }
			</Notice>

			<p className="blockive-tb-conditions-modal__desc">
				{ __(
					'Choose where this template should be displayed on your site.',
					'blockive-premium-addon-for-block'
				) }
			</p>

			<div className="blockive-tb-conditions-groups">
				{ CONDITION_GROUPS.map( ( group ) => (
					<div
						key={ group.slug }
						className="blockive-tb-conditions-group"
					>
						<div className="blockive-tb-conditions-group__header">
							<span className={ `dashicons dashicons-${ group.icon }` } />
							<h3>{ group.label }</h3>
						</div>
						<ul className="blockive-tb-conditions-group__items">
							{ group.items.map( ( item, idx ) => (
								<li key={ idx }>
									<label className="blockive-tb-conditions-item">
										<input
											type="checkbox"
											disabled
											className="blockive-tb-conditions-item__checkbox"
										/>
										<span>{ item }</span>
									</label>
								</li>
							) ) }
						</ul>
					</div>
				) ) }
			</div>

			<div className="blockive-tb-conditions-modal__footer">
				<Button variant="tertiary" onClick={ onClose }>
					{ __( 'Cancel', 'blockive-premium-addon-for-block' ) }
				</Button>
				<Button variant="primary" onClick={ onClose }>
					{ __( 'Save Conditions', 'blockive-premium-addon-for-block' ) }
				</Button>
			</div>
		</Modal>
	);
}
