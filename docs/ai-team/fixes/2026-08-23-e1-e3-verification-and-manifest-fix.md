# Fix Report — E-1/E-3 Live Verification + New Finding — 2026-08-23

Follow-up to `2026-08-22-p1-fixes.md`, which left E-1 and E-3 "build-verified only, not live-tested" because neither could be easily reproduced on the generic QA test page. This session live-tested both — and in doing so found a third, previously-undiscovered issue that was silently blocking both fixes from ever executing.

## New Issue Found: F-1 (P1) — Template Builder blocks never run their PHP render callback

**Problem:** Every Template Builder block (43 blocks total, under `src/template-blocks/<category>/<block>/`, e.g. `post/post-title`, `woocommerce/add-to-cart`, `events/event-title`) registers with `is_dynamic() === false` server-side — meaning `render.php` never executes anywhere: not in the editor, not via REST, not on any frontend. This is a pre-existing bug, unrelated to the original P1 batch, discovered only because it was silently blocking E-1/E-3 verification.

**Root cause:** The build script (`wp-scripts build --blocks-manifest`) generates `build/blocks-manifest.php` by keying every block on `path.basename(path.dirname(file))` — just the immediate folder name (`node_modules/@wordpress/scripts/scripts/build-blocks-manifest.js:40`). WordPress core's `WP_Block_Metadata_Registry::get_collection_block_metadata_files()` then reconstructs each block's file path as `{collection_path}/{manifest_key}/block.json`. For top-level blocks (`build/accordion/`, one level deep) this is correct. All 43 Template Builder blocks live two levels deep (`build/template-blocks/<category>/<block>/`), so the reconstructed path (e.g. `build/post-title/block.json`) doesn't exist. `register_block_type_from_metadata()` still finds the metadata (via the manifest cache) but sets `$metadata['file'] = null` since the guessed file path doesn't exist on disk, which breaks the `render` field's path resolution (`wp-includes/blocks.php:610-634`) — `render_callback` is silently never attached.

Confirmed empirically via `wp.apiFetch('/wp/v2/block-types/...')`: top-level dynamic blocks (`post-grid`, `category-list`) reported `is_dynamic: true`; every Template Builder block checked (`tb-post-title`, `tb-post-content`, `tb-categories`, `tb-breadcrumbs`, `tb-dynamic-field`, `tb-event-register-button`, `tb-event-title`) reported `is_dynamic: false`.

**Fix:** In `bpafb_register_blocks()` (`blockive-premium-addon-for-block.php`), after the manifest-based bulk registration, re-register every `build/template-blocks/*/*/block.json` directly from its real folder path (unregistering first if the manifest pass already registered it under the broken path). This gives WP core the correct, existing file path, so `$metadata['file']` resolves and `render.php` gets wired up as the render callback — without touching the build tooling or restructuring the source tree.

**Files Changed:** `blockive-premium-addon-for-block.php`

**Backward Compatibility:** Purely additive to registration; doesn't change any block's name, attributes, or existing (already-working) top-level block registration path. No frontend template-assignment pipeline exists yet for these blocks (the `blockive_template` CPT is `public => false` with no `template_include` hook and a placeholder "Display Conditions" UI), so this fix has no visible effect on any currently-live page — it only makes each block's `render.php` reachable via direct usage (e.g. dropped into a real post/page, or via the REST block-renderer, both of which resolve `postId` via `get_the_ID()`/`post_id` context) and via any future frontend-assignment feature built on top.

## E-1 — Live Verification (previously build-verified only)

Tested via the REST block-renderer endpoint (`/wp/v2/block-renderer/blockive-premium-addon-for-block/tb-post-title`) with `textHoverColor`, `bpafbUid`, and container border attributes set, against a real post (`post_id`), using an authenticated `wp.apiFetch` call from within the wp-admin editor context (direct unauthenticated REST calls are rejected by WordPress's cookie-nonce check, so this required running in-page).

Confirmed on the actual rendered HTML:
- The hover-color `<style>` tag is emitted before the block's `<h2>` wrapper (reproducing the original bug scenario).
- The wrapper `<h2>` itself carries `border-style: dashed`, `border-width: 8px`, `border-color: #00ff00`, and the `bpafb-uid-*` class — i.e., the container styling lands on the real element, not swallowed into the `<style>` tag.

E-1 is now fully confirmed, not just build-verified.

## E-3 — Live Verification (previously build-verified only)

Created a scratch password-protected page via REST (`wp/v2/pages`, `password: "qa-secret-123"`), then rendered `tb-post-content` against it via the block-renderer endpoint.

- Password-protected post: rendered output does **not** contain the post's actual body text; it contains the password form instead.
- Control (same block, unprotected post): rendered output is the normal content, no password form — confirming the check doesn't over-trigger.

Scratch test page deleted after verification (not left in the database).

E-3 is now fully confirmed, not just build-verified.

## Build & Lint

- `php -l` on `blockive-premium-addon-for-block.php`: no syntax errors.
- No JS changes in this session; no rebuild required.

## Remaining / Not Yet Actioned

- The Template Builder's frontend-assignment pipeline (making a `blockive_template` post actually render on a real site URL, and its "Display Conditions" panel) still doesn't exist. F-1's fix makes the blocks *capable* of rendering correctly once that pipeline is built, but doesn't build it — that's a separate, larger feature, not a bug fix, and out of scope here.
- Everything else from `2026-08-22-p1-fixes.md`'s "Remaining / Not Yet Actioned" list (B-10/B-11 recheck, C-2 cleanup, 17 untested P2/P3 blocks) is still open.
