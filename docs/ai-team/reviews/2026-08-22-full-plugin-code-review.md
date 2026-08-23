# Full Plugin Code Review — 2026-08-22

Stage 1 (Code Review) of the mandatory development cycle, run across the entire plugin. Five parallel Code Reviewer passes covered all 25 blocks, all 10 shared components, all 12 `includes/` PHP classes, the template-blocks/template-builder system, and the main plugin bootstrap file. No code was modified during this stage.

**Total findings: 54** — 0 P0, 12 P1, 23 P2, 19 P3.

QA testing (Stage 2) has not run yet. Nothing below is fixed; this is the Team Lead's consolidated, deduplicated, prioritized backlog awaiting approval.

---

## Cross-cutting patterns ("epics")

Several findings are the same root cause repeated across multiple blocks. Fixing the shared root cause once resolves all listed instances with one reviewed change, so these are called out ahead of the flat list.

### Epic 1 — Custom interactive widgets lack keyboard/ARIA support (P1/P2)
Mouse-only `onClick` on a plain `<div>`, no `role`, `tabIndex`, `onKeyDown`, or `aria-*` state.
- A-1 Accordion (P1 — core interaction fully inaccessible)
- B-1 FAQ (P2)
- B-2 Image Accordion (P2)
- C-1 Image Comparison slider handle (P2)
- D-4 Progress Bar (missing `role="progressbar"`) (P2)
- D-6 Tabs (partial ARIA Tabs pattern — missing state/relationships) (P2)
- D-7 Testimonial (icon-only nav + star rating with no accessible name) (P3)

### Epic 2 — Link/URL attributes rendered into `href`/`src`/`action` with no validation (P2)
Defense-in-depth gap: relies solely on WordPress's `unfiltered_html`-gated `wp_kses` behavior on save, no block-level scheme validation.
- A-2 Button
- B-6 Heading, Icon Box, Image Box
- C-4 Lottie, Mailchimp, Pricing Table
- D-2 Social Icons
- D-3 Video (P3 — Media Library-only path, lower likelihood)

### Epic 3 — In-place mutation of nested attribute objects (P1/P2)
Breaks Gutenberg's immutability assumption for undo/redo and shared default objects.
- C-14 Pricing Table `addFeature`/`removeFeature` (P1 — can throw on default/frozen data)
- B-8 Fun Fact `updateItem` (P2 — undo/redo only)

### Epic 4 — `border: none !important` silently defeats the shared Advanced-Tab Border control (P1)
Confirmed via grep across all block stylesheets; a third match (Countdown Timer) was checked and ruled a false positive — it resets an inner per-item box in the "inline" display variant, not the block wrapper that receives the shared container border.
- D-1 Team
- C-15 Pricing Table

### Epic 5 — Shared `advanced-tab` component gaps (P1/P2)
- E-2 `bpafbUid` isn't regenerated on block duplication → duplicated blocks share one CSS scope key and cross-contaminate each other's responsive/custom-CSS styling. **Affects all ~70 blocks that use AdvancedTab.** (P1)
- B-10 HTML ID / HTML Classes / Custom CSS attributes are fully wired on the PHP render side but have **no inspector UI** in AdvancedTab — unreachable feature. (P2)
- B-11 The Custom CSS render path has no capability check — any user who can edit a post containing an AdvancedTab block can inject page-wide CSS, not just users with `unfiltered_html`. (P2)
- E-5 Several RangeControls have no default value → React "uncontrolled to controlled" warnings across all consumers. (P2)

### Epic 6 — Container-style injection pipeline is regex-based and order-dependent (P1/P2)
- E-1 `bpafb_inject_styles()` matches "the first tag" via regex; 8 Template Blocks that emit a hover-color `<style>` tag before their wrapper get their entire Advanced-Tab container styling (padding/margin/border/background/shadow/animation/etc.) injected into the `<style>` tag instead — settings silently stop applying. (P1)
- E-7 Root cause: regex tag-matching instead of `WP_HTML_Tag_Processor` (available since WP 6.2, plugin already requires 6.8). Larger refactor — treat as a planned follow-up once E-1's narrow fix lands. (P2)

### Epic 7 — Template Blocks bypass password-protection (P1/P2)
Unlike WP core's `core/post-content` block and this plugin's own Post Excerpt block, these don't check `post_password_required()` before rendering full content.
- E-3 `template-blocks/post/post-content` (P1)
- E-4 `template-blocks/woocommerce/tabs` Description pane (P2)

---

## P1 — High priority

| ID | Block/Area | Problem |
|---|---|---|
| A-1 | Accordion | Header is click-only; keyboard/screen-reader users cannot open any panel |
| A-5 | Contact Form 7 | `formId` free-text field concatenated into shortcode string → shortcode injection |
| A-7 | Countdown Timer | `interval` read before declaration when target date already passed → `ReferenceError`, aborts init for all later countdown instances on the page |
| B-7 | Image Box | `linkText` rendered as raw JSX text instead of `RichText.Content` → formatting shows as literal tags on frontend |
| C-2 | Lottie | Unconditionally injects unpinned `@dotlottie/player-web@latest` from unpkg.com that the block never actually uses (dead code + supply-chain exposure) |
| C-12 | Post Grid | Editor preview always shows literal "By Author" instead of the real author, despite `_embed` data being fetched |
| C-14 | Pricing Table | `addFeature`/`removeFeature` mutate nested state in place (Epic 3) |
| C-15 | Pricing Table | `border: none !important` defeats shared container Border control (Epic 4) |
| D-1 | Team | Same as C-15 (Epic 4) |
| E-1 | 8 Template Blocks | Container-style injection breaks when render.php emits a `<style>` tag before the wrapper (Epic 6) |
| E-2 | ~70 blocks (AdvancedTab) | `bpafbUid` not regenerated on duplicate → CSS scope collisions between block instances (Epic 5) |
| E-3 | Post Content template block | Bypasses `post_password_required()` — protected content exposed (Epic 7) |

## P2 — Medium priority

| ID | Block/Area | Problem |
|---|---|---|
| A-2 | Button | `href` URL not validated (Epic 2) |
| A-4 | Category List | Limit/Exclude filters applied before hierarchy is built → orphaned children shown as top-level when "Show Hierarchy" is on |
| B-1 | FAQ | Keyboard/ARIA gap (Epic 1) |
| B-2 | Image Accordion | Keyboard/ARIA gap (Epic 1) |
| B-5 | FAQ | JSON-LD schema emitted as raw `<script>` in `save()` — stripped by `wp_kses` for any author without `unfiltered_html`; core SEO feature silently missing |
| B-6 | Heading, Icon Box, Image Box | `href` URL not validated (Epic 2) |
| B-8 | Fun Fact | In-place mutation (Epic 3) |
| B-10 | AdvancedTab (~70 blocks) | HTML ID/Classes/Custom CSS have no UI despite full PHP support (Epic 5) |
| B-11 | AdvancedTab (~70 blocks) | Custom CSS injection has no capability gate (Epic 5) |
| C-1 | Image Comparison | Keyboard/ARIA gap (Epic 1) |
| C-4 | Lottie, Mailchimp, Pricing Table | URL not validated (Epic 2) |
| C-5 | Mailchimp | Form `target="_blank"` without `rel="noopener noreferrer"` — reverse tabnabbing |
| C-6 | Mailchimp | Email input has only a placeholder, no accessible label |
| C-9 | Post Grid | `columns`/`cardBorderRadius`/`cardBorderWidth` only `esc_attr()`'d, not cast with `absint()`, before use in inline CSS |
| C-10 | Post Grid | `postsPerPage` has no server-side bound — UI clamp (1–50) can be bypassed |
| D-2 | Social Icons | URL not validated (Epic 2) |
| D-4 | Progress Bar | Missing `role="progressbar"`/`aria-value*` (Epic 1) |
| D-5 | Progress Bar | Static markup hardcodes 0%; if `view.js` fails to run, visitors see 0% instead of the real value (no progressive enhancement) |
| D-6 | Tabs | Incomplete ARIA Tabs pattern (Epic 1) |
| E-4 | WooCommerce Tabs (template block) | Bypasses password protection (Epic 7) |
| E-5 | AdvancedTab (~70 blocks) | Uncontrolled→controlled RangeControl warnings (Epic 5) |
| E-6 | Site-wide | Font Awesome loaded unconditionally from `cdnjs.cloudflare.com` on every page load, even pages with no Blockive block |
| E-7 | Shared render pipeline | Regex-based tag matching is fragile by design (Epic 6, root cause of E-1) |

## P3 — Low priority

| ID | Block/Area | Problem |
|---|---|---|
| A-3 | Button | Two `setAttributes` calls instead of one — minor undo-history inconsistency |
| A-6 | Contact Form 7 | Dynamic string built inside `__()` — breaks i18n extraction |
| A-8 | Countdown Timer | No `aria-live` region for the live-updating numbers |
| A-9 | Business Hours | "Today" highlight uses browser-local clock, not site timezone (informational — static block, no fix required now) |
| B-3 | FAQ | `animationType`/`animationDuration`/`animationDelay` attributes wired but no inspector UI to set them |
| B-4 | Heading | Two independent entrance-animation systems (own + AdvancedTab) can both be enabled — label/doc clarification, not a functional bug |
| B-9 | Fun Fact | `parseInt` on comma-formatted numbers (e.g. "10,000") silently truncates |
| C-3 | Lottie | `alt="Animation"` hardcoded, not wrapped in `__()` |
| C-7 | Pie Chart | Alignment classes don't reset `float`, could be overridden by theme CSS |
| C-8 | Pie Chart | `<canvas>` has no accessible text alternative for the data |
| C-11 | Post Grid | `postType` not validated against `is_post_type_viewable()` |
| C-13 | Post Grid | Editor `alt` text double-encodes HTML entities from REST title |
| D-3 | Video | `src` URL not validated (Epic 2, lower severity — Media Library-only path) |
| D-7 | Testimonial | Icon-only nav buttons + star rating have no accessible name (Epic 1) |
| D-8 | Team | `socialLinks` attribute exists in data model but has no UI or renderer (informational) |
| D-9 | Video, Social Icons, Team, Testimonial, Tabs, Progress Bar | Unused `InspectorControls` import (lint only) |
| E-8 | Shared render pipeline | Style-attribute string escaped twice (once per value, once for the whole string) |
| E-9 | Template CPT | `register_meta` auth_callback checks generic `edit_posts` instead of the specific post's `edit_post` capability |
| E-10 | `responsive-controls` (~70 blocks) | Padding and Margin device selectors (Desktop/Tablet/Mobile) don't stay in sync within the same panel |

---

## Not yet done
- **Stage 2 (QA Testing)** has not run. Recommend spot-checking the 12 P1s live in the editor/frontend before any fix work starts, per CLAUDE.md's requirement that build success and code review alone never constitute verification.
- **Stage 4 (Fix)** has not started. Nothing here is approved for implementation yet — this file is the Team Lead's prioritized backlog for review/approval.
