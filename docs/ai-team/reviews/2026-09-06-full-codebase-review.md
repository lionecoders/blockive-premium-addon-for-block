# Full Codebase Review — Duplicate Code, Security, WPCS
**Date:** 2026-09-06
**Reviewer:** AI Team (Code Reviewer role, 4 parallel passes) — consolidated by Team Lead
**Scope:** All ~28 blocks under `src/`, shared components (`src/components/**`), `src/template-builder/**`, `src/template-blocks/**`, and all PHP (main plugin file, `includes/**`, all `render.php` files). 86 PHP files, 151 JS files.

No files were modified. This is a review-only pass, per the project's Code Reviewer role rules.

## Headline result

- **Security / WordPress Coding Standards: clean.** The PHP layer (all render.php files, includes/, main plugin file) shows no missing escaping, no missing sanitization, no missing nonce/capability checks, no SQL injection risk, no deprecated/unsafe functions, no missing ABSPATH guards. This is unusually disciplined for a plugin this size.
- **The real findings are duplicate code (architectural) and a handful of genuine JS/React bugs**, plus one P1 functional gap (testimonial quote text isn't editable).
- **0 P0 (critical) issues.**

| Priority | Count |
|---|---|
| P0 — Critical | 0 |
| P1 — High | 1 |
| P2 — Medium | 14 |
| P3 — Low | ~24 |

---

## P1 — High Priority

### P1-1: Testimonial block — quote text has no editor control
**File:** `src/testimonial/edit.js`, `src/testimonial/save.js`, `src/testimonial/block.json`
**Problem:** `content` (the actual testimonial quote) is registered, has a default, and is rendered on canvas and frontend — but the inspector panel only exposes Name, Designation, Image, and Rating. There is no `TextareaControl`/`RichText` anywhere to edit the quote itself.
**Impact:** Users adding a testimonial cannot enter their real customer quote — stuck with placeholder text.
**Fix:** Add a `TextareaControl` (or make the canvas paragraph an inline `RichText`) wired to `updateTestimonial(index, 'content', val)`. Purely additive, low risk.

---

## P2 — Medium Priority

### P2-1 (merged): URL-sanitizer function copy-pasted across ~12 blocks
**Files:** `button/utils.js`, `heading/utils.js`, `icon-box/utils.js`, `image-box/utils.js`, `lottie/utils.js`, `mailchimp/utils.js`, `pricing-table/utils.js`, `social-icons/utils.js`, `video/utils.js` (+ others)
**Problem:** The same protocol-allowlist sanitizer (blocks `javascript:`/`data:`/`vbscript:`, allows `http:`/`https:`/`mailto:`/`tel:`/relative/anchor) is byte-for-byte duplicated under ~9 different export names, with no shared implementation in `src/components/`.
**Why it matters:** This is security-relevant logic. A future fix to the allowlist has to be applied in ~9-12 places by hand; missing one silently reintroduces a vulnerability in that block only. All copies are currently correct, so no active exploit — this is a maintenance/regression risk, not a live bug.
**Fix:** Extract one shared `getSafeUrl(url, allowedProtocols)` helper; have each block's `utils.js` re-export it under the existing name so no call sites change. Low risk, pure refactor.

### P2-2: image-accordion — background-image URL not sanitized
**File:** `src/image-accordion/edit.js:225`, `src/image-accordion/save.js:32`
**Problem:** `item.imageUrl` is interpolated into CSS `url(...)` directly, unlike the equivalent link attributes in button/heading/icon-box, which all use the allowlist sanitizer above.
**Impact:** Low exploitability (browsers don't execute `javascript:` in CSS `url()`), but it's an inconsistency versus the codebase's own established pattern.
**Fix:** Reuse the shared URL helper from P2-1 here too.

### P2-3: social-icons — mutates array item in place before setAttributes
**File:** `src/social-icons/edit.js:63-77` (`updateItem`)
**Problem:** Shallow-copies the array but mutates the existing item object (`newItems[index][key] = value`) instead of `{ ...newItems[index], [key]: value }`.
**Impact:** Can corrupt Gutenberg's undo/redo history since the object reference isn't new — editing a field then hitting Undo can intermittently restore an already-mutated value. Hard to reproduce in manual QA but a real correctness bug.
**Fix:** One-line change to spread the item instead of mutating it.

### P2-4: testimonial — removing all items produces NaN slider state
**File:** `src/testimonial/edit.js:102-106` (`removeTestimonial`)
**Problem:** No guard against removing the last testimonial (unlike `tabs/edit.js`, which does guard). At 0 items, prev/next math (`% length`) becomes `% 0` → `NaN`.
**Fix:** Mirror the tabs pattern — block removal below 1 item, or hide arrows/dots at 0 items.

### P2-5: template-builder — priority `0` silently coerced to `10`
**File:** `src/template-builder/display-conditions-panel.js:78`
**Problem:** `parseInt(value, 10) || 10` — when the user types `0`, `0 || 10` evaluates to `10` because `0` is falsy in JS. Per the panel's own help text, `0` is the highest-priority (most-preferred) value, and it's silently unreachable.
**Fix:** `Number.isNaN(parsed) ? 10 : parsed` instead of `||`.

### P2-6: countdown-timer — editor preview never ticks
**File:** `src/countdown-timer/edit.js:49-75`
**Problem:** Computes `timeLeft` once on `targetDate` change but never starts a `setInterval`, unlike the frontend `view.js` which ticks every second.
**Impact:** Editor preview looks frozen/broken compared to the live frontend behavior.
**Fix:** Add `setInterval`+cleanup mirroring `view.js`.

### P2-7: related-posts — spacing setting silently capped below desktop
**File:** `src/template-blocks/post/related-posts/view.js:33-58`
**Problem:** Frontend Swiper hard-caps `spaceBetween` to 15px at default/640px breakpoints; only the full configured value (up to 50px) applies at 1024px+. Editor preview always shows the full value.
**Impact:** A value the editor set (e.g. 40px) silently differs on tablet/mobile with no indication anywhere in the UI.
**Fix:** Remove the cap, or surface it in the inspector's help text.

### P2-8: video block — empty `<video>` tag rendered on frontend when no video selected
**File:** `src/video/save.js:17-30` vs `edit.js:90-106`
**Problem:** edit.js shows a placeholder when `videoUrl` is empty; save.js unconditionally emits a `<video><source></video>` tag regardless.
**Impact:** Visitors see an empty, non-functional video player box on published pages where no video was ever set; some browsers log a console error.
**Fix:** Wrap the `<video>` output in save.js with the same `{videoUrl && (...)}` condition edit.js already uses.

### P2-9: team/testimonial — hand-rolled shadow controls duplicate `ShadowControls`
**File:** `src/team/edit.js:193-257`, `src/testimonial/edit.js:252-316`
**Problem:** Both blocks build a full custom shadow control UI (toggle/offset/blur/spread/color) instead of the existing shared `src/components/shadow-controls`. Note: the shared component currently lacks H/V-offset support these blocks use, so migration isn't a drop-in — flagged for future work, not immediate action.

### P2-10 (merged, PHP): hover-color `<style>` block hand-written in 10 render.php files
**Files:** author, breadcrumbs, categories, comments-count, post-content, post-meta, previous-next-navigation, tags, related-posts, post-title (all under `src/template-blocks/post/*/render.php`)
**Problem:** The same hover-CSS-emission pattern is copy-pasted 10 times, despite the codebase already centralizing similar logic (`icon_html()`, `sanitize_css_color()`) in `Bpafb_Template_Block_Render` specifically to avoid this.
**Fix:** Add one shared static helper (e.g. `hover_color_style($uid, $selector_suffix, $color)`) to that class; low-risk additive extraction.

### P2-11: contact-form-7 — static block relies on `the_content` shortcode expansion
**File:** `src/contact-form-7/save.js:19-21`
**Problem:** This is a static block whose saved markup is the literal `[contact-form-7 id="..."]` shortcode text, relying on WP's default `the_content` filter to expand it. Any renderer that outputs block markup outside `the_content` (custom templates, some page builders, REST consumers) shows raw shortcode text to visitors instead of a form.
**Fix (flagged for Team Lead prioritization, not urgent):** Convert to a dynamic block with a `render.php` calling `do_shortcode()` directly — this requires a deprecation path for existing saved content, so treat as a planned change, not a quick patch.

### P2-12: post-meta — drag-to-reorder has no keyboard alternative
**File:** `src/template-blocks/post/post-meta/edit.js:46-89`
**Problem:** Item reordering uses only native HTML5 drag-and-drop (WCAG 2.1.1 — not keyboard-operable).
**Fix:** Add move-up/move-down buttons alongside the existing drag handles, calling the existing `moveItem()` helper.

### P2-13 (merged): `customStyles` object construction duplicated between edit.js and save.js
**Files:** accordion, business-hours, button, drop-caps, faq, icon-box, countdown-timer, image-accordion (8 blocks, each with the pattern in both edit.js and save.js)
**Problem:** Each block re-derives its full CSS-custom-property object independently in edit.js and save.js rather than sharing one function, risking edit/save drift.
**Fix:** Extract one `getStyles(attributes)` per block, imported by both files. Low-medium risk — verify editor/frontend visual parity after extraction.

### P2-14: accordion/faq — near-duplicate collapsible-item implementation
**Files:** `src/accordion/{edit,save,view}.js` vs `src/faq/{edit,save,view}.js`
**Problem:** The toggle-state logic, icon-swap markup, and vanilla-JS accordion behavior are implemented twice, nearly line-for-line (faq's own block.json description says "based on accordion behavior"). The two copies have already started drifting — see the related FE-01 icon-state bug below.
**Fix:** Extract a shared collapsible-list hook/component and shared frontend toggle script, parameterized by class prefix.

---

## P3 — Low Priority (grouped, not itemized individually)

**Duplicate code / architecture:**
- Border/shadow CSS-variable construction copy-pasted across `author-avatar`, `featured-image`, `featured-video` render.php (mirrors JS helpers that ARE shared — PHP side isn't).
- `formatTime()` and day-label mapping duplicated between business-hours edit.js/save.js using two different data structures.
- Countdown math duplicated between edit.js and view.js.
- pie-chart's Chart.js config-building duplicated between edit.js and view.js.
- Repeater add/update/remove CRUD logic duplicated near-identically across pricing-table, team, testimonial, tabs, including a weak `Date.now().toString()` id/key generator that can collide on rapid double-adds (React key collision → wrong item edited).
- 4 blocks (category-list, contact-form-7, funfact, image-accordion) hand-roll simple color/border UI instead of the shared `ColorStateControls`/`BorderControls` (legitimate for their simpler needs, but inconsistent style).
- "No results found" fallback duplicated between category-list and post-grid (trivial, not worth extracting on its own).

**Dead / inconsistent attributes:**
- `bpafbContainerAlign` registered in every block's `block.json` but never referenced in any JS file — dead schema clutter across the whole plugin.
- Shared `AdvancedTab`'s `BackgroundControls` call omits `bgImageId`, so re-opening the media picker never highlights the previously-selected background image (cosmetic).
- `team` block's `socialLinks` field exists in the data model but has no UI or rendering anywhere.
- `related-posts`' `showExcerpt` attribute is dead — superseded by `contentType`.

**Minor JS/React:**
- lottie's `linkUrl` attribute has no default, causing a one-time "uncontrolled input" React warning.
- image-comparison registers per-instance global mousemove/touchmove listeners instead of one delegated listener (fine at typical 1-3 sliders/page).
- post-grid rebuilds an inline query object for `getEntityRecords` and a separately-declared literal for its loading-state check that must stay structurally identical — fragile but currently correct.
- social-icons' `aria-label` string isn't wrapped in `__()`/`sprintf()` (not translatable).

**Accessibility (all low severity, same fix pattern — wrap in `BaseControl` for proper label association):**
- funfact, image-accordion, image-comparison color-picker fields use bare `<label>` with no `htmlFor`.
- image-accordion items with title/description both hidden have no accessible name at all (background-image-only content).
- pricing-table's optional plan image always uses hard-coded `alt="Pricing Plan"` regardless of actual plan name.
- pricing-table's feature check/cross icons aren't `aria-hidden`, unlike testimonial's equivalent star icons.
- team member photo `alt={member.name}` duplicates the adjacent visible heading (redundant announcement, not harmful).
- accordion/faq: the always-open first item shows the "closed" icon on initial page load until the user interacts (edit.js gets this right, save.js for both blocks doesn't).

**Component-library internals (very low impact):**
- `ColorStateControls` keys list items by label text rather than a stable id (latent risk only — no current caller passes duplicate labels).
- `AdvancedTab`'s block-instance-id collision tracker grows for the life of the page and is never cleaned up on unmount (negligible in practice).
- `BackgroundControls`/`ShadowControls`' `ColorPalette` fields don't pass `enableAlpha`, limiting opacity control on settings whose purpose depends on transparency.

---

## Security & WordPress Coding Standards — detail

No P0/P1/P2 security or WPCS findings anywhere in the plugin. Specifically verified clean:
- Every render.php uses `isset()`/default-fallback consistently; `esc_html()`/`esc_attr()`/`esc_url()` applied at the correct output boundary.
- Hover-color values destined for `<style>` tag text correctly go through `sanitize_css_color()` rather than `esc_attr()` (context-appropriate escaping).
- `get_block_wrapper_attributes()`'s pre-escaped output is the only thing echoed with a `phpcs:ignore`, and that's the correct, standard pattern.
- REST access to the private `blockive_template` CPT is capability-gated; Custom CSS is capability-gated at save time.
- No raw `$_GET`/`$_POST`/`$_REQUEST` use without `wp_unslash()` + sanitize; no raw `$wpdb` queries; no `eval()`/`extract()`/`unserialize()`; no missing `ABSPATH` guards; no missing text-domains.
- Mailchimp block stores/emits only the public form action URL — no API key or credential is present in attributes or saved markup.
- `post-grid`'s use of `post.excerpt.rendered` is REST-API-sanitized server-side content (same trust model as WordPress core's own Latest Posts block), not raw attribute HTML — not a `dangerouslySetInnerHTML` risk.

---

## Recommendation for next steps

Per the project's required workflow (Review → QA → Prioritize → Fix → Build → Re-review → Re-test → Approve), suggest tackling in this order:

1. **P1-1** (testimonial quote uneditable) — real functional gap, should ship soon.
2. **P2-3, P2-4, P2-5** — small, low-risk, genuine correctness bugs (mutation bug, NaN crash risk, silent value coercion).
3. **P2-1** (shared URL sanitizer extraction) — highest-value duplicate-code fix since it's security-relevant and touches ~12 files; do as one careful, low-risk refactor with wrapper functions preserving existing export names.
4. Remaining P2 items — batch by block, following the Fix Agent's "inspect dependencies, smallest safe change" rules.
5. P3 items — bundle into a cleanup pass; not blocking.

None of these require removing functionality, renaming attributes, or a large refactor. Let me know which issues you'd like approved for the Fix Agent to act on.
