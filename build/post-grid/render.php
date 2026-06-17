<?php
/**
 * Render function for the Post Grid block.
 */

$columns        = isset( $attributes['columns'] ) ? $attributes['columns'] : 3;
$posts_per_page = isset( $attributes['postsPerPage'] ) ? $attributes['postsPerPage'] : 9;
$orderby        = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';
$order          = isset( $attributes['order'] ) ? $attributes['order'] : 'desc';
$show_image     = isset( $attributes['showImage'] ) ? $attributes['showImage'] : true;
$show_excerpt   = isset( $attributes['showExcerpt'] ) ? $attributes['showExcerpt'] : true;
$show_date      = isset( $attributes['showDate'] ) ? $attributes['showDate'] : true;
$show_author    = isset( $attributes['showAuthor'] ) ? $attributes['showAuthor'] : true;
$post_type        = isset( $attributes['postType'] ) ? $attributes['postType'] : 'post';
$date_format      = isset( $attributes['dateFormat'] ) && ! empty( $attributes['dateFormat'] ) ? $attributes['dateFormat'] : get_option( 'date_format' );
$title_color      = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '';
$date_color       = isset( $attributes['dateColor'] ) ? $attributes['dateColor'] : '';
$author_color     = isset( $attributes['authorColor'] ) ? $attributes['authorColor'] : '';
$excerpt_color    = isset( $attributes['excerptColor'] ) ? $attributes['excerptColor'] : '';
$card_bg_color    = isset( $attributes['cardBgColor'] ) ? $attributes['cardBgColor'] : '';
$card_br_radius   = isset( $attributes['cardBorderRadius'] ) ? $attributes['cardBorderRadius'] : 8;
$card_bd_color    = isset( $attributes['cardBorderColor'] ) ? $attributes['cardBorderColor'] : '';
$card_bd_width    = isset( $attributes['cardBorderWidth'] ) ? $attributes['cardBorderWidth'] : 0;
$card_bd_style    = isset( $attributes['cardBorderStyle'] ) ? $attributes['cardBorderStyle'] : 'solid';

$card_style = '';
if ( $card_bg_color ) {
	$card_style .= 'background-color: ' . esc_attr( $card_bg_color ) . ';';
}
if ( $card_br_radius !== '' ) {
	$card_style .= 'border-radius: ' . esc_attr( $card_br_radius ) . 'px;';
}
if ( $card_bd_width > 0 ) {
	$card_style .= 'border-width: ' . esc_attr( $card_bd_width ) . 'px;';
	$card_style .= 'border-style: ' . esc_attr( $card_bd_style ) . ';';
	if ( $card_bd_color ) {
		$card_style .= 'border-color: ' . esc_attr( $card_bd_color ) . ';';
	}
}

$title_style = $title_color ? 'color: ' . esc_attr( $title_color ) . ';' : '';
$date_style = $date_color ? 'color: ' . esc_attr( $date_color ) . ';' : '';
$author_style = $author_color ? 'color: ' . esc_attr( $author_color ) . ';' : '';
$excerpt_style = $excerpt_color ? 'color: ' . esc_attr( $excerpt_color ) . ';' : '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'bpafb-post-grid-wrapper',
	)
);

$query_args = array(
	'post_type'      => $post_type,
	'posts_per_page' => $posts_per_page,
	'orderby'        => $orderby === 'id' ? 'ID' : $orderby,
	'order'          => $order,
	'post_status'    => 'publish',
);

$post_query = new WP_Query( $query_args );

?>
<div <?php echo $wrapper_attributes; ?>>
	<?php if ( $post_query->have_posts() ) : ?>
		<div class="bpafb-post-grid" style="grid-template-columns: repeat(<?php echo esc_attr( $columns ); ?>, 1fr);">
			<?php while ( $post_query->have_posts() ) : $post_query->the_post(); ?>
				<article class="bpafb-post-card" style="<?php echo esc_attr( $card_style ); ?>">
					<?php if ( $show_image && has_post_thumbnail() ) : ?>
						<div class="bpafb-post-image">
							<a href="<?php echo esc_url( get_permalink() ); ?>">
								<?php the_post_thumbnail( 'medium' ); ?>
							</a>
						</div>
					<?php elseif ( $show_image ) : ?>
						<div class="bpafb-post-image">
							<div style="background-color: #f0f0f0; width: 100%; padding-bottom: 75%;"></div>
						</div>
					<?php endif; ?>

					<div class="bpafb-post-content">
						<?php if ( $show_date ) : ?>
							<span class="bpafb-post-date" style="<?php echo esc_attr( $date_style ); ?>"><?php echo esc_html( get_the_date( $date_format ) ); ?></span>
						<?php endif; ?>

						<h3 class="bpafb-post-title">
							<a href="<?php echo esc_url( get_permalink() ); ?>" style="<?php echo esc_attr( $title_style ); ?>"><?php the_title(); ?></a>
						</h3>

						<?php if ( $show_author ) : ?>
							<span class="bpafb-post-author" style="<?php echo esc_attr( $author_style ); ?>"><?php echo esc_html__( 'By', 'blockive-premium-addon-for-block' ) . ' ' . esc_html( get_the_author() ); ?></span>
						<?php endif; ?>

						<?php if ( $show_excerpt ) : ?>
							<div class="bpafb-post-excerpt" style="<?php echo esc_attr( $excerpt_style ); ?>">
								<?php the_excerpt(); ?>
							</div>
						<?php endif; ?>
					</div>
				</article>
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
		</div>
	<?php else : ?>
		<?php
			$tax_obj = get_post_type_object( $post_type );
			$tax_label = $tax_obj ? strtolower( $tax_obj->labels->singular_name ) : 'post';
		?>
		<p><?php printf( esc_html__( 'No %s found.', 'blockive-premium-addon-for-block' ), esc_html( $tax_label ) ); ?></p>
	<?php endif; ?>
</div>
