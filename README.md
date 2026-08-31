# Blockive — Premium Addon For Block

A powerful, high-performance, and elegant collection of premium blocks for the WordPress Gutenberg block editor. Empowering developers and creators to design stunning websites with advanced layout controls, beautiful styling, and complete customizability—no page builders required.

---

## 🚀 Key Features

- **Lightweight & Fast**: Built using native Gutenberg APIs (`@wordpress/scripts`), ensuring assets are enqueued only when blocks are actively used on a page.
- **Fully Responsive**: Every block is designed mobile-first, rendering perfectly across desktops, tablets, and smartphones.
- **Rich Customization**: Deep typography controls, custom borders, gradient background options, active state styling, and motion controls.
- **Accessibility (A11y) First**: Focus management and keyboard accessibility are natively implemented for interactive elements (such as Tabs and Accordions).

---

## 📦 Included Premium Blocks

| Icon | Block Name | Description | Key Customization Features |
|:---:|:---|:---|:---|
| 📋 | **Blockive Accordion** | Beautiful, collapsible content sections ideal for FAQs or structured info. | Icon alignments, active state colors, expand/collapse speed. |
| 🕒 | **Blockive Business Hours** | Display your business opening and closing times with custom styling and current-day highlighting. | Current-day highlight, row typography, border options. |
| 🔘 | **Blockive Button** | A highly customizable button with icon and badge support. | Hover animations, custom badges, icon position, styling. |
| 🗂️ | **Blockive Category List** | A styled taxonomy browser for organizing and surfacing site content. | Hierarchy display, grid/list layouts, per-item styling, post-count badges. |
| ✉️ | **Blockive Contact Form 7** | Drop-in Contact Form 7 integration styled to match the rest of your layout. | Form selection by ID, live editor placeholder, custom container styling. |
| ⏱️ | **Blockive Countdown Timer** | Urgency-inducing timers for sales, promotions, and events. | Labels, border styling, color mapping. |
| 🔠 | **Blockive Drop Caps** | Editorial-style typographic enhancements for standard paragraphs. | First-letter custom padding, custom margins, colored initials. |
| ❓ | **Blockive FAQ** | Schema-ready accordion style FAQ lists. | Structured data auto-generation, schema support toggle. |
| 🔢 | **Blockive Fun Fact** | Show off your achievements with an animated statistics/counter block. | Prefix/suffix options, animation speed, layouts, typography. |
| ✍️ | **Blockive Heading** | Eye-catching titles with gradients, stroke highlights, and text shadows. | Stroke width/color, blend modes, text-shadow offset/blur. |
| 📦 | **Blockive Icon Box** | A stylish box displaying an icon, title, description, and custom link. | Icon styling, custom animations, border/background options. |
| 🖼️ | **Blockive Image Accordion** | Interactive image panels that expand to reveal a title and description on hover. | Custom overlay opacity, animation speed, per-item height, text colors. |
| 🖼️ | **Blockive Image Box** | An image box that displays an image, title, description, and link. | Image layout modes, hover effects, styling controls. |
| ↔️ | **Blockive Image Comparison** | A draggable before/after slider for showcasing edits, redesigns, or comparisons. | Keyboard-accessible handle, horizontal/vertical orientation, custom labels. |
| 🎬 | **Blockive Lottie** | Play lightweight, scalable Lottie animations anywhere on your site. | Loop, autoplay, playback speed, scroll or hover triggers. |
| 📧 | **Blockive MailChimp** | Capture newsletter signups with a styled Mailchimp subscription form. | List selection, secure form handling, custom field styling. |
| 📊 | **Blockive Pie Chart** | High-performance interactive data visualizations. | Custom legend placement, donut/pie toggle, Chart.js backend. |
| 📰 | **Blockive Post Grid** | A dynamic, query-driven grid for showcasing your latest posts anywhere on your site. | Custom queries, pagination, responsive grid columns, post-type filtering. |
| 💰 | **Blockive Pricing Table** | A fully customizable pricing table block with features list and button. | Ribbon/badge, features styling, toggle support. |
| 📈 | **Blockive Progress Bar** | Dynamic animated bar and line indicators to show project/skill levels. | Animated steps, custom height, percentage toggle. |
| 🔗 | **Blockive Social Icons** | Premium links to social profiles with custom shapes and hover animations. | Shape variants (round/circle/square), custom SVG color mapping, animations. |
| 📑 | **Blockive Tabs** | Sleek content switchers to organize large amounts of tabular content. | Tab pills alignment, keyboard focus/arrow-key transitions. |
| 👥 | **Blockive Team** | Introduce your team with photos, roles, bios, and social links in a clean grid. | Per-member social links, responsive columns, avatar and bio styling. |
| 💬 | **Blockive Testimonial** | A polished testimonials slider with star ratings and customer avatars. | Pausable autoplay, star ratings, avatar styling, accessible navigation. |
| 🎥 | **Blockive Video** | Embed and style video content with a custom cover image and lightbox playback. | Custom cover image, play button styling, lightbox option. |

### 🏗️ Template Builder Blocks

Includes over **50+ dynamic blocks** specifically designed for the **Blockive Template Builder**. Easily create custom templates for single posts, archives, events, and full WooCommerce product pages with elements like Dynamic Fields, Post Content, Add to Cart, Product Variations, and more.

---

## 🛠️ Development Setup

The plugin uses the official `@wordpress/scripts` toolchain for bundling, linting, and optimizing assets.

### Prerequisites

- **WordPress**: 6.8 or newer
- **PHP**: 7.4 or newer
- **Node.js**: 16.x or newer
- **npm**: 8.x or newer

### Installation & Compilation

1. Clone or copy the plugin to your `wp-content/plugins/` directory:
   ```bash
   cd wp-content/plugins/blockive-premium-addon-for-block
   ```

2. Install build dependencies:
   ```bash
   npm install
   ```

3. Start the hot-reloading development server:
   ```bash
   npm run start
   ```

4. Build production-ready, optimized assets (runs minifiers, compiles CSS/SASS, generates manifests):
   ```bash
   npm run build
   ```

---

## 📂 Project Directory Structure

```text
blockive-premium-addon-for-block/
├── .distignore
├── .editorconfig
├── .gitignore
├── .wp-org/
├── assets/                       # Shared global assets
│   ├── css/                      # Editor/frontend shared stylesheets
│   ├── js/                       # Editor container-settings + frontend animation scripts
│   └── webfonts/                 # Font files
├── build/                        # Compiled production-ready assets (auto-generated)
│   ├── blocks-manifest.php
│   ├── accordion/
│   ├── business-hours/
│   ├── button/
│   ├── category-list/
│   ├── contact-form-7/
│   ├── countdown-timer/
│   ├── drop-caps/
│   ├── faq/
│   ├── funfact/
│   ├── heading/
│   ├── icon-box/
│   ├── image-accordion/
│   ├── image-box/
│   ├── image-comparison/
│   ├── lottie/
│   ├── mailchimp/
│   ├── pie-chart/
│   ├── post-grid/
│   ├── pricing-table/
│   ├── progress-bar/
│   ├── social-icons/
│   ├── tabs/
│   ├── team/
│   ├── template-blocks/          # 45 dynamic sub-blocks for the Template Builder
│   ├── template-builder/         # Template Builder editor bundle
│   ├── testimonial/
│   └── video/
├── includes/                     # PHP classes: Template Builder CPT, dynamic-field
│                                  # providers, WooCommerce/events adapters
├── node_modules/                # Development dependency packages (not committed)
├── package-lock.json
├── package.json                 # Dependencies, scripts, and metadata
├── README.md                    # Project documentation
├── blockive-premium-addon-for-block.php # Main plugin entry point
├── readme.txt                   # WordPress.org plugin directory description
└── src/                         # Raw Gutenberg block source files
    ├── accordion/
    ├── business-hours/
    ├── button/
    ├── category-list/
    ├── components/               # Shared inspector controls (typography, border,
    │                              # spacing, background, shadow, animation, advanced tab)
    ├── contact-form-7/
    ├── countdown-timer/
    ├── drop-caps/
    ├── faq/
    ├── funfact/
    ├── heading/
    ├── icon-box/
    ├── image-accordion/
    ├── image-box/
    ├── image-comparison/
    ├── lottie/
    ├── mailchimp/
    ├── pie-chart/
    ├── post-grid/
    ├── pricing-table/
    ├── progress-bar/
    ├── social-icons/
    ├── tabs/
    ├── team/
    ├── template-blocks/          # 45 dynamic sub-blocks (post, events, woocommerce)
    ├── template-builder/         # Template Builder editor UI
    ├── testimonial/
    └── video/
```

---

## 🔒 License & Credits

Distributed under the **GPL-2.0-or-later** License. 
For details, see [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html) or `readme.txt`.

Developed with ❤️ by **Lionecoders**.