/**
 * Consolidated editor bundle for every Blockive Template Block.
 *
 * Deliberately the ONLY place that calls registerBlockType() for these
 * blocks. Each block's block.json has no `editorScript`, so WordPress never
 * auto-enqueues an editor script for it on Posts/Pages/Products/other
 * editors; this bundle is manually enqueued only on the `blockive_template`
 * editor screen (see Bpafb_Template_Blocks::enqueue_editor_assets), which is
 * what keeps these blocks out of every other editor's inserter while their
 * render.php still works wherever a template ends up rendered on the
 * frontend.
 */
import './style.css';

// Post / Core Template Blocks.
import './post';

// Pro-only Template Blocks (WooCommerce, Events, Dynamic Field): teaser
// placeholders only, advertising the "(Pro)" feature in the inserter.
import './pro-teasers';
