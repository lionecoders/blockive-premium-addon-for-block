import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

const LABELS = {
	sku: __( 'SKU', 'blockive-premium-addon-for-block' ),
	categories: __( 'Categories', 'blockive-premium-addon-for-block' ),
	tags: __( 'Tags', 'blockive-premium-addon-for-block' ),
	stockStatus: __( 'Stock Status', 'blockive-premium-addon-for-block' ),
};

// WooCommerce fields (SKU, categories, stock) aren't part of the generic
// REST post shape used by usePreviewContext, so the editor always shows
// realistic static sample values rather than live data.
const SAMPLE_VALUES = {
	sku: __( 'SKU: WD-1234', 'blockive-premium-addon-for-block' ),
	categories: __( 'Accessories', 'blockive-premium-addon-for-block' ),
	tags: __( 'Sample Tag', 'blockive-premium-addon-for-block' ),
	stockStatus: __( 'In stock', 'blockive-premium-addon-for-block' ),
};

const ICONS = {
	sku: 'barcode',
	categories: 'folder',
	tags: 'tags',
	stockStatus: 'boxes-stacked',
};

/**
 * Minimal HTML5 drag-and-drop reorderable list, copied from the Post Meta
 * Template Block's ReorderableItemsList (@wordpress/components has no
 * built-in sortable list).
 */
function ReorderableItemsList( { items, onChange } ) {
	const [ dragIndex, setDragIndex ] = useState( null );

	const moveItem = ( from, to ) => {
		if ( from === to || from == null || to == null ) {
			return;
		}
		const next = [ ...items ];
		const [ moved ] = next.splice( from, 1 );
		next.splice( to, 0, moved );
		onChange( next );
	};

	return (
		<ul className="bpafb-product-meta-reorder-list">
			{ items.map( ( item, index ) => (
				<li
					key={ item.key }
					className="bpafb-product-meta-reorder-item"
					draggable
					onDragStart={ () => setDragIndex( index ) }
					onDragOver={ ( event ) => event.preventDefault() }
					onDrop={ ( event ) => {
						event.preventDefault();
						moveItem( dragIndex, index );
						setDragIndex( null );
					} }
				>
					<span className="bpafb-product-meta-drag-handle" aria-hidden="true">
						<i className="fa-solid fa-grip-vertical" />
					</span>
					<ToggleControl
						label={ LABELS[ item.key ] || item.key }
						checked={ !! item.enabled }
						onChange={ ( checked ) => {
							const next = items.map( ( it, i ) => ( i === index ? { ...it, enabled: checked } : it ) );
							onChange( next );
						} }
					/>
				</li>
			) ) }
		</ul>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { items, separator, showIcons } = attributes;

	const blockProps = useBlockProps( { className: 'bpafb-tb-product-meta' } );

	const enabledItems = items.filter( ( item ) => item.enabled );

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Meta Items', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Drag to reorder. Toggle to show or hide.', 'blockive-premium-addon-for-block' ) }
							</p>
							<ReorderableItemsList items={ items } onChange={ ( next ) => setAttributes( { items: next } ) } />
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<TextControl
								label={ __( 'Separator', 'blockive-premium-addon-for-block' ) }
								value={ separator }
								onChange={ ( value ) => setAttributes( { separator: value } ) }
							/>
							<ToggleControl
								label={ __( 'Show Icons', 'blockive-premium-addon-for-block' ) }
								checked={ !! showIcons }
								onChange={ ( value ) => setAttributes( { showIcons: value } ) }
							/>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				{ enabledItems.map( ( item, index ) => (
					<span className="bpafb-tb-product-meta-item" key={ item.key }>
						{ index > 0 && separator && <span className="bpafb-tb-product-meta-sep">{ separator }</span> }
						{ showIcons && <i className={ `fa-solid fa-${ ICONS[ item.key ] || 'circle' }` } /> }
						{ ' ' }
						{ SAMPLE_VALUES[ item.key ] || item.key }
					</span>
				) ) }
			</div>
		</>
	);
}
