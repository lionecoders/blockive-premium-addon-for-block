import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';

const LAYOUT_OPTIONS = [
	{ label: __( 'Grid', 'blockive-premium-addon-for-block' ), value: 'grid' },
	{ label: __( 'Slider', 'blockive-premium-addon-for-block' ), value: 'slider' },
];

const ORDER_BY_OPTIONS = [
	{ label: __( 'Date', 'blockive-premium-addon-for-block' ), value: 'date' },
	{ label: __( 'Title', 'blockive-premium-addon-for-block' ), value: 'title' },
	{ label: __( 'Random', 'blockive-premium-addon-for-block' ), value: 'rand' },
];

const ORDER_OPTIONS = [
	{ label: __( 'Descending', 'blockive-premium-addon-for-block' ), value: 'desc' },
	{ label: __( 'Ascending', 'blockive-premium-addon-for-block' ), value: 'asc' },
];

/**
 * Related Posts previews with static placeholder cards rather than firing a
 * second live REST query in the editor - the block already needs a
 * tax_query relative to "the current post" to be meaningful, which doesn't
 * exist yet while editing a template, so a placeholder keeps editor
 * complexity reasonable (per the Template Blocks preview guidelines).
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		numberOfPosts,
		layout,
		columns,
		orderBy,
		order,
		sameCategory,
		showImage,
		showDate,
		showExcerpt,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `bpafb-tb-related-posts bpafb-tb-related-posts-${ layout }`,
	} );

	const placeholderCards = Array.from( { length: Math.min( numberOfPosts || 3, 6 ) } );

	const renderCard = ( _, index ) => (
		<article className="bpafb-tb-related-post-card" key={ index }>
			{ showImage && <div className="bpafb-tb-related-post-image bpafb-tb-related-post-image-placeholder" /> }
			<div className="bpafb-tb-related-post-content">
				{ showDate && <span className="bpafb-tb-related-post-date">{ __( 'January 1, 2026', 'blockive-premium-addon-for-block' ) }</span> }
				<h3 className="bpafb-tb-related-post-title">
					<a href="#related-post-preview" onClick={ ( event ) => event.preventDefault() }>
						{ __( 'Sample Related Post', 'blockive-premium-addon-for-block' ) } { index + 1 }
					</a>
				</h3>
				{ showExcerpt && (
					<div className="bpafb-tb-related-post-excerpt">
						{ __( 'A short excerpt preview of the related post goes here…', 'blockive-premium-addon-for-block' ) }
					</div>
				) }
			</div>
		</article>
	);

	return (
		<>
			<InspectorControls>
				<InspectorTabs
					general={
						<>
							<PanelBody title={ __( 'Layout', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Number of Posts', 'blockive-premium-addon-for-block' ) }
									value={ numberOfPosts }
									onChange={ ( value ) => setAttributes( { numberOfPosts: value } ) }
									min={ 1 }
									max={ 12 }
								/>
								<SelectControl
									label={ __( 'Layout', 'blockive-premium-addon-for-block' ) }
									value={ layout }
									options={ LAYOUT_OPTIONS }
									onChange={ ( value ) => setAttributes( { layout: value } ) }
								/>
								{ layout === 'grid' && (
									<RangeControl
										label={ __( 'Columns', 'blockive-premium-addon-for-block' ) }
										value={ columns }
										onChange={ ( value ) => setAttributes( { columns: value } ) }
										min={ 1 }
										max={ 6 }
									/>
								) }
							</PanelBody>
							<PanelBody title={ __( 'Query', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Order By', 'blockive-premium-addon-for-block' ) }
									value={ orderBy }
									options={ ORDER_BY_OPTIONS }
									onChange={ ( value ) => setAttributes( { orderBy: value } ) }
								/>
								<SelectControl
									label={ __( 'Order', 'blockive-premium-addon-for-block' ) }
									value={ order }
									options={ ORDER_OPTIONS }
									onChange={ ( value ) => setAttributes( { order: value } ) }
								/>
								<ToggleControl
									label={ __( 'Match Same Category', 'blockive-premium-addon-for-block' ) }
									checked={ !! sameCategory }
									onChange={ ( value ) => setAttributes( { sameCategory: value } ) }
									help={ __( 'Only show posts sharing a category (or the primary taxonomy) with the current post.', 'blockive-premium-addon-for-block' ) }
								/>
							</PanelBody>
							<PanelBody title={ __( 'Display', 'blockive-premium-addon-for-block' ) } initialOpen={ false }>
								<ToggleControl
									label={ __( 'Show Image', 'blockive-premium-addon-for-block' ) }
									checked={ !! showImage }
									onChange={ ( value ) => setAttributes( { showImage: value } ) }
								/>
								<ToggleControl
									label={ __( 'Show Date', 'blockive-premium-addon-for-block' ) }
									checked={ !! showDate }
									onChange={ ( value ) => setAttributes( { showDate: value } ) }
								/>
								<ToggleControl
									label={ __( 'Show Excerpt', 'blockive-premium-addon-for-block' ) }
									checked={ !! showExcerpt }
									onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
								/>
							</PanelBody>
						</>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Card typography and spacing options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
							</p>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				{ layout === 'slider' ? (
					<div className="bpafb-tb-related-posts-slider-preview">
						{ placeholderCards.map( renderCard ) }
					</div>
				) : (
					<div
						className="bpafb-tb-related-posts-grid"
						style={ { gridTemplateColumns: `repeat(${ columns || 3 }, 1fr)` } }
					>
						{ placeholderCards.map( renderCard ) }
					</div>
				) }
			</div>
		</>
	);
}
