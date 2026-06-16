<?php
/**
 * Render category-list block.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 */

$showCount       = isset( $attributes['showCount'] ) ? $attributes['showCount'] : true;
$showDescription = isset( $attributes['showDescription'] ) ? $attributes['showDescription'] : false;
$hideEmpty       = isset( $attributes['hideEmpty'] ) ? $attributes['hideEmpty'] : true;
$limit           = isset( $attributes['limit'] ) ? $attributes['limit'] : 10;
$orderBy         = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'name';
$order           = isset( $attributes['order'] ) ? $attributes['order'] : 'asc';
$exclude         = isset( $attributes['exclude'] ) ? $attributes['exclude'] : '';
$layoutType      = isset( $attributes['layoutType'] ) ? $attributes['layoutType'] : 'vertical';
$showHierarchy   = isset( $attributes['showHierarchy'] ) ? $attributes['showHierarchy'] : false;
$gap             = isset( $attributes['gap'] ) ? $attributes['gap'] : 20;
$enableLink      = isset( $attributes['enableLink'] ) ? $attributes['enableLink'] : true;
$itemBgColor     = isset( $attributes['itemBgColor'] ) ? $attributes['itemBgColor'] : '';
$itemBorderColor = isset( $attributes['itemBorderColor'] ) ? $attributes['itemBorderColor'] : '';
$itemBorderWidth = isset( $attributes['itemBorderWidth'] ) ? $attributes['itemBorderWidth'] : 0;
$itemBorderRadius= isset( $attributes['itemBorderRadius'] ) ? $attributes['itemBorderRadius'] : 0;
$columns         = isset( $attributes['columns'] ) ? $attributes['columns'] : 3;
$itemPadding     = isset( $attributes['itemPadding'] ) ? $attributes['itemPadding'] : 10;
$textAlign       = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
$enableBoxShadow = isset( $attributes['enableBoxShadow'] ) ? $attributes['enableBoxShadow'] : false;
$removeChildBorder= isset( $attributes['removeChildBorder'] ) ? $attributes['removeChildBorder'] : false;
$taxonomy        = isset( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : 'category';

$item_style = '';
if ( $itemBgColor ) {
	$item_style .= 'background-color: ' . esc_attr( $itemBgColor ) . '; ';
}
if ( $itemBorderColor ) {
	$item_style .= 'border-color: ' . esc_attr( $itemBorderColor ) . '; ';
}
if ( $itemBorderWidth > 0 ) {
	$item_style .= 'border-width: ' . esc_attr( $itemBorderWidth ) . 'px; border-style: solid; ';
}
if ( $itemBorderRadius > 0 ) {
	$item_style .= 'border-radius: ' . esc_attr( $itemBorderRadius ) . 'px; ';
}
$item_style .= 'padding: ' . esc_attr( $itemPadding ) . 'px; ';
$item_style .= 'text-align: ' . esc_attr( $textAlign ) . '; ';
if ( $enableBoxShadow ) {
	$item_style .= 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); ';
}

$grid_style = 'gap: ' . esc_attr( $gap ) . 'px;';
if ( $layoutType === 'horizontal' && $columns ) {
	$grid_style .= ' grid-template-columns: repeat(' . esc_attr( $columns ) . ', 1fr);';
}

$exclude_ids = ! empty( $exclude ) ? array_map( 'intval', array_filter( array_map( 'trim', explode( ',', $exclude ) ) ) ) : array();

$args = array(
	'taxonomy'   => $taxonomy,
	'hide_empty' => $hideEmpty,
	'number'     => $limit,
	'orderby'    => $orderBy === 'id' ? 'id' : ( $orderBy === 'count' ? 'count' : 'name' ),
	'order'      => strtoupper( $order ),
	'exclude'    => $exclude_ids,
);

$categories = get_terms( $args );

if ( ! is_wp_error( $categories ) && $showHierarchy ) {
	$map = array();
	$tree = array();
	foreach ( $categories as $cat ) {
		$cat->children = array();
		$map[ $cat->term_id ] = $cat;
	}
	foreach ( $categories as $cat ) {
		if ( $cat->parent && isset( $map[ $cat->parent ] ) ) {
			$map[ $cat->parent ]->children[] = $map[ $cat->term_id ];
		} else {
			$tree[] = $map[ $cat->term_id ];
		}
	}
	$categories = $tree;
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'bpafb-category-list-wrapper bpafb-layout-' . esc_attr( $layoutType ),
	)
);

$render_category_item = function( $category, $depth = 0 ) use ( &$render_category_item, $showCount, $showDescription, $layoutType, $enableLink, $item_style, $removeChildBorder ) {
	$current_item_style = $item_style;
	if ( $depth > 0 && $removeChildBorder ) {
		$current_item_style .= 'border-width: 0px; border-style: none; ';
	}
	ob_start();
	?>
	<div class="bpafb-category-item bpafb-depth-<?php echo esc_attr( $depth ); ?>" style="<?php echo esc_attr( $current_item_style ); ?>">
		<h3 class="bpafb-category-name">
			<?php if ( $enableLink ) : ?>
				<a href="<?php echo esc_url( get_term_link( $category ) ); ?>">
					<?php echo esc_html( $category->name ); ?>
				</a>
			<?php else : ?>
				<span><?php echo esc_html( $category->name ); ?></span>
			<?php endif; ?>
			<?php if ( $showCount ) : ?>
				<span class="bpafb-category-count"> (<?php echo esc_html( $category->count ); ?>)</span>
			<?php endif; ?>
		</h3>
		<?php if ( $showDescription && ! empty( $category->description ) && $layoutType !== 'horizontal' ) : ?>
			<p class="bpafb-category-description"><?php echo esc_html( $category->description ); ?></p>
		<?php endif; ?>
		<?php if ( ! empty( $category->children ) ) : ?>
			<div class="bpafb-category-children">
				<?php foreach ( $category->children as $child ) {
					echo $render_category_item( $child, $depth + 1 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				} ?>
			</div>
		<?php endif; ?>
	</div>
	<?php
	return ob_get_clean();
};
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) : ?>
		<div class="bpafb-category-grid" style="<?php echo esc_attr( $grid_style ); ?>">
			<?php foreach ( $categories as $category ) : ?>
				<?php echo $render_category_item( $category ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php endforeach; ?>
		</div>
	<?php else : 
		$tax_obj = get_taxonomy( $taxonomy );
		$tax_label = $tax_obj ? strtolower( $tax_obj->labels->singular_name ) : 'category';
		?>
		<p><?php printf( esc_html__( 'No %s found.', 'blockive-premium-addon-for-block' ), esc_html( $tax_label ) ); ?></p>
	<?php endif; ?>
</div>
