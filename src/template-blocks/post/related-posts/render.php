<?php
if (!defined('ABSPATH')) {
	exit;
}
/**
 * Render function for the Related Posts Template Block.
 *
 * Server-rendered via WP_Query, mirroring src/post-grid/render.php's
 * query-building pattern. The per-post card markup is built with a local
 * closure (not a top-level function) so it can be reused for both the Grid
 * and Slider layouts without declaring anything that would fatal ("cannot
 * redeclare") if this block renders more than once on the same request.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content (unused, dynamic block).
 * @var WP_Block $block      Block instance.
 */

$bpafb_post_id = Bpafb_Template_Block_Render::get_post_id($block);
$bpafb_post_type = Bpafb_Template_Block_Render::get_post_type($block);

$bpafb_number_of_posts = isset($attributes['numberOfPosts']) ? (int) $attributes['numberOfPosts'] : 3;
$bpafb_layout = isset($attributes['layout']) && $attributes['layout'] === 'slider' ? 'slider' : 'grid';
$bpafb_columns = isset($attributes['columns']) ? (int) $attributes['columns'] : 3;
$bpafb_order_by = isset($attributes['orderBy']) ? $attributes['orderBy'] : 'date';
$bpafb_order = isset($attributes['order']) && strtolower($attributes['order']) === 'asc' ? 'ASC' : 'DESC';
$bpafb_same_category = !isset($attributes['sameCategory']) || !empty($attributes['sameCategory']);
$bpafb_show_image = !isset($attributes['showImage']) || !empty($attributes['showImage']);
$bpafb_show_date = !isset($attributes['showDate']) || !empty($attributes['showDate']);
$bpafb_show_excerpt = !empty($attributes['showExcerpt']);

// Resolve a relation taxonomy + the current post's terms in it, for the
// "same category" relation toggle.
$bpafb_related_taxonomy = '';
$bpafb_related_term_ids = [];
if ($bpafb_same_category && $bpafb_post_id) {
	if (is_object_in_taxonomy($bpafb_post_type, 'category')) {
		$bpafb_related_taxonomy = 'category';
	} else {
		foreach (get_object_taxonomies($bpafb_post_type, 'objects') as $bpafb_tax_obj) {
			if (!empty($bpafb_tax_obj->public)) {
				$bpafb_related_taxonomy = $bpafb_tax_obj->name;
				break;
			}
		}
	}

	if ($bpafb_related_taxonomy) {
		$bpafb_terms = wp_get_post_terms($bpafb_post_id, $bpafb_related_taxonomy, ['fields' => 'ids']);
		if (!is_wp_error($bpafb_terms)) {
			$bpafb_related_term_ids = $bpafb_terms;
		}
	}
}

$bpafb_query_args = [
	'post_type'           => $bpafb_post_type,
	'posts_per_page'      => $bpafb_number_of_posts,
	'post_status'         => 'publish',
	'ignore_sticky_posts'  => true,
	'orderby'             => $bpafb_order_by === 'title' ? 'title' : ($bpafb_order_by === 'rand' ? 'rand' : 'date'),
	'order'               => $bpafb_order,
	'no_found_rows'       => true,
];
if ($bpafb_post_id) {
	$bpafb_query_args['post__not_in'] = [$bpafb_post_id];
}
// Only actually scope by taxonomy if the current post has terms there;
// otherwise fall back to the plain latest-posts query rather than an
// always-empty tax_query.
if ($bpafb_related_taxonomy && !empty($bpafb_related_term_ids)) {
	$bpafb_query_args['tax_query'] = [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		[
			'taxonomy' => $bpafb_related_taxonomy,
			'field'    => 'term_id',
			'terms'    => $bpafb_related_term_ids,
		],
	];
}

$bpafb_related_query = new WP_Query($bpafb_query_args);

// Builds one post card's markup. Kept as a local closure (assigned to a
// variable) rather than a `function card(...) {}` declaration - closures
// aren't registered in PHP's global function table, so re-including this
// render.php on the same request never triggers a redeclare fatal.
$bpafb_render_card = function ($bpafb_card_post) use ($bpafb_show_image, $bpafb_show_date, $bpafb_show_excerpt) {
	$bpafb_card_id = $bpafb_card_post->ID;
	ob_start();
	?>
	<article class="bpafb-tb-related-post-card">
		<?php if ($bpafb_show_image && has_post_thumbnail($bpafb_card_id)) : ?>
			<a class="bpafb-tb-related-post-image" href="<?php echo esc_url(get_permalink($bpafb_card_id)); ?>">
				<?php echo get_the_post_thumbnail($bpafb_card_id, 'medium'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		<?php endif; ?>
		<div class="bpafb-tb-related-post-content">
			<?php if ($bpafb_show_date) : ?>
				<span class="bpafb-tb-related-post-date"><?php echo esc_html(get_the_date('', $bpafb_card_id)); ?></span>
			<?php endif; ?>
			<h3 class="bpafb-tb-related-post-title">
				<a href="<?php echo esc_url(get_permalink($bpafb_card_id)); ?>"><?php echo esc_html(get_the_title($bpafb_card_id)); ?></a>
			</h3>
			<?php if ($bpafb_show_excerpt) : ?>
				<div class="bpafb-tb-related-post-excerpt">
					<?php echo esc_html(wp_trim_words(get_the_excerpt($bpafb_card_id), 20)); ?>
				</div>
			<?php endif; ?>
		</div>
	</article>
	<?php
	return ob_get_clean();
};

$bpafb_wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'bpafb-tb-related-posts bpafb-tb-related-posts-' . $bpafb_layout,
]);

echo '<div ' . $bpafb_wrapper_attributes . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

if ($bpafb_related_query->have_posts()) {
	if ($bpafb_layout === 'slider') {
		?>
		<div class="bpafb-tb-related-posts-slider swiper">
			<div class="swiper-wrapper">
				<?php foreach ($bpafb_related_query->posts as $bpafb_related_post) : ?>
					<div class="swiper-slide"><?php echo $bpafb_render_card($bpafb_related_post); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				<?php endforeach; ?>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"><?php echo Bpafb_Template_Block_Render::icon_html('fa-solid fa-chevron-left'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
			<div class="swiper-button-next"><?php echo Bpafb_Template_Block_Render::icon_html('fa-solid fa-chevron-right'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
		</div>
		<?php
	} else {
		?>
		<div class="bpafb-tb-related-posts-grid" style="grid-template-columns: repeat(<?php echo esc_attr($bpafb_columns); ?>, 1fr);">
			<?php foreach ($bpafb_related_query->posts as $bpafb_related_post) : ?>
				<?php echo $bpafb_render_card($bpafb_related_post); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php endforeach; ?>
		</div>
		<?php
	}
} else {
	echo '<p class="bpafb-tb-related-posts-empty">' . esc_html__('No related posts found.', 'blockive-premium-addon-for-block') . '</p>';
}

// No setup_postdata()/the_post() was used above (every helper call was given
// an explicit post id/object), so there is no loop pointer to reset here.

echo '</div>';
