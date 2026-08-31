import { __, sprintf } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import {
	PanelRow,
	SelectControl,
	FormTokenField,
	TextControl,
	Notice,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useMemo, useState } from '@wordpress/element';

const TEMPLATE_POST_TYPE = window.bpafbTemplateBuilder?.postType || 'blockive_template';

/**
 * Encodes a record as a FormTokenField token so its id survives the
 * string-only token list, then is decoded back out in onChangeIds().
 */
const tokenForRecord = ( record ) => `${ record.title?.rendered || record.title || '(no title)' } (#${ record.id })`;

const idFromToken = ( token ) => {
	const match = /\(#(\d+)\)\s*$/.exec( token );
	return match ? parseInt( match[ 1 ], 10 ) : null;
};

const DisplayConditionsPanel = () => {
	const [ meta, setMeta ] = useEntityProp( 'postType', TEMPLATE_POST_TYPE, 'meta' );
	const [ search, setSearch ] = useState( '' );

	const targetPostType = meta?._bpafb_template_type || 'post';
	const scope = meta?._bpafb_display_condition_scope || 'specific';
	const ids = Array.isArray( meta?._bpafb_display_condition_ids ) ? meta._bpafb_display_condition_ids : [];
	const priority = Number.isFinite( meta?._bpafb_template_priority ) ? meta._bpafb_template_priority : 10;

	const targetPostTypeLabel = useSelect(
		( select ) => select( 'core' ).getPostType( targetPostType )?.labels?.name || targetPostType,
		[ targetPostType ]
	);

	const selectedRecords = useSelect(
		( select ) => {
			if ( ! ids.length ) {
				return [];
			}
			return select( 'core' ).getEntityRecords( 'postType', targetPostType, {
				include: ids,
				per_page: ids.length,
				context: 'view',
			} ) || [];
		},
		[ targetPostType, ids.join( ',' ) ]
	);

	const searchResults = useSelect(
		( select ) => {
			if ( scope !== 'specific' || ! search ) {
				return [];
			}
			return select( 'core' ).getEntityRecords( 'postType', targetPostType, {
				search,
				per_page: 20,
				context: 'view',
			} ) || [];
		},
		[ targetPostType, search, scope ]
	);

	const currentTokens = useMemo(
		() => ids.map( ( id ) => {
			const record = selectedRecords.find( ( item ) => item.id === id );
			return record ? tokenForRecord( record ) : `#${ id }`;
		} ),
		[ ids, selectedRecords ]
	);

	const suggestions = useMemo(
		() => searchResults.map( tokenForRecord ),
		[ searchResults ]
	);

	const setIds = ( nextIds ) => setMeta( { ...meta, _bpafb_display_condition_ids: nextIds } );

	return (
		<PluginDocumentSettingPanel
			name="bpafb-display-conditions"
			title={ __( 'Display Conditions', 'blockive-premium-addon-for-block' ) }
			className="bpafb-display-conditions-panel"
		>
			<PanelRow>
				<SelectControl
					label={ __( 'Apply this template to', 'blockive-premium-addon-for-block' ) }
					value={ scope }
					options={ [
						{
							label: sprintf(
								/* translators: %s: post type name, e.g. "Products". */
								__( 'All %s', 'blockive-premium-addon-for-block' ),
								targetPostTypeLabel
							),
							value: 'all',
						},
						{ label: __( 'Specific posts', 'blockive-premium-addon-for-block' ), value: 'specific' },
					] }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_display_condition_scope: value } ) }
				/>
			</PanelRow>

			{ scope === 'specific' && (
				<PanelRow>
					<FormTokenField
						label={ __( 'Posts', 'blockive-premium-addon-for-block' ) }
						value={ currentTokens }
						suggestions={ suggestions }
						onInputChange={ setSearch }
						onChange={ ( tokens ) => {
							const nextIds = tokens
								.map( idFromToken )
								.filter( ( id ) => id !== null );
							setIds( nextIds );
						} }
						__experimentalExpandOnFocus
						__next40pxDefaultSize
						help={ __(
							'Start typing a title, then choose it from the suggestions list.',
							'blockive-premium-addon-for-block'
						) }
					/>
				</PanelRow>
			) }

			{ scope === 'specific' && ids.length === 0 && (
				<Notice status="warning" isDismissible={ false }>
					{ __(
						'No posts selected yet - this template will not appear on the frontend until you add one.',
						'blockive-premium-addon-for-block'
					) }
				</Notice>
			) }

			<PanelRow>
				<TextControl
					type="number"
					label={ __( 'Priority', 'blockive-premium-addon-for-block' ) }
					help={ __(
						'When more than one template matches the same post, the lowest number wins.',
						'blockive-premium-addon-for-block'
					) }
					value={ priority }
					onChange={ ( value ) => setMeta( { ...meta, _bpafb_template_priority: parseInt( value, 10 ) || 10 } ) }
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default function registerDisplayConditionsPanel() {
	registerPlugin( 'bpafb-display-conditions', {
		render: DisplayConditionsPanel,
	} );
}
