import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl, BaseControl, ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext from '../../shared/use-preview-context';
import { formatPreviewDate } from '../../shared/format';

const LABELS = {
	date: __( 'Date', 'blockive-premium-addon-for-block' ),
	author: __( 'Author', 'blockive-premium-addon-for-block' ),
	categories: __( 'Categories', 'blockive-premium-addon-for-block' ),
	tags: __( 'Tags', 'blockive-premium-addon-for-block' ),
	comments: __( 'Comments', 'blockive-premium-addon-for-block' ),
	readingTime: __( 'Reading Time', 'blockive-premium-addon-for-block' ),
};

const SAMPLE_VALUES = {
	date: __( 'January 1, 2026', 'blockive-premium-addon-for-block' ),
	author: __( 'Jane Doe', 'blockive-premium-addon-for-block' ),
	categories: __( 'News', 'blockive-premium-addon-for-block' ),
	tags: __( 'Sample Tag', 'blockive-premium-addon-for-block' ),
	comments: __( '3 Comments', 'blockive-premium-addon-for-block' ),
	readingTime: __( '4 min read', 'blockive-premium-addon-for-block' ),
};

/**
 * Minimal HTML5 drag-and-drop reorderable list. @wordpress/components has no
 * built-in sortable list, so this implements just enough drag-and-drop to
 * reorder the `items` attribute array without pulling in a new dependency.
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
		<ul className="bpafb-post-meta-reorder-list">
			{ items.map( ( item, index ) => (
				<li
					key={ item.key }
					className="bpafb-post-meta-reorder-item"
					draggable
					onDragStart={ () => setDragIndex( index ) }
					onDragOver={ ( event ) => event.preventDefault() }
					onDrop={ ( event ) => {
						event.preventDefault();
						moveItem( dragIndex, index );
						setDragIndex( null );
					} }
				>
					<span className="bpafb-post-meta-drag-handle" aria-hidden="true">
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
	const { items, separator, showIcons, linkHoverColor } = attributes;
	const { record } = usePreviewContext();

	const blockProps = useBlockProps( { className: 'bpafb-tb-post-meta' } );

	const previewValue = ( key ) => {
		if ( ! record ) {
			return SAMPLE_VALUES[ key ];
		}
		switch ( key ) {
			case 'date':
				return formatPreviewDate( record.date );
			default:
				return SAMPLE_VALUES[ key ];
		}
	};

	const enabledItems = items.filter( ( item ) => item.enabled );

	return (
		<>
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
						<BaseControl label={ __( 'Link Hover Color', 'blockive-premium-addon-for-block' ) }>
							<ColorPalette
								value={ linkHoverColor }
								onChange={ ( value ) => setAttributes( { linkHoverColor: value } ) }
							/>
						</BaseControl>
						<p className="bpafb-help-text">
							{ __( 'Applies to any linked items (Categories, Tags) within this block.', 'blockive-premium-addon-for-block' ) }
						</p>
					</PanelBody>
				}
				advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
			/>

			<div { ...blockProps }>
				{ enabledItems.map( ( item, index ) => (
					<span className="bpafb-tb-post-meta-item" key={ item.key }>
						{ index > 0 && separator && <span className="bpafb-tb-post-meta-sep">{ separator }</span> }
						{ showIcons && <i className={ `fa-regular fa-${ item.key === 'date' ? 'calendar' : 'circle' }` } /> }
						{ ' ' }
						{ previewValue( item.key ) }
					</span>
				) ) }
			</div>
		</>
	);
}
