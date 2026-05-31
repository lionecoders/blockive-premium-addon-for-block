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
| ⏱️ | **Blockive Countdown Timer** | Urgency-inducing timers for sales, promotions, and events. | Labels, border styling, color mapping. |
| 🔠 | **Blockive Drop Caps** | Editorial-style typographic enhancements for standard paragraphs. | First-letter custom padding, custom margins, colored initials. |
| ❓ | **Blockive FAQ** | SEO/Schema-ready accordion style FAQ lists. | Structured data auto-generation, schema support toggle. |
| ✍️ | **Blockive Heading** | Eye-catching titles with gradients, stroke highlights, and text shadows. | Stroke width/color, blend modes, text-shadow offset/blur. |
| 📊 | **Blockive Pie Chart** | High-performance interactive data visualizations. | Custom legend placement, donut/pie toggle, Chart.js backend. |
| 📈 | **Blockive Progress Bar** | Dynamic animated bar and line indicators to show project/skill levels. | Animated steps, custom height, percentage toggle. |
| 🔗 | **Blockive Social Icons** | Premium links to social profiles with custom shapes and hover animations. | Shape variants (round/circle/square), custom SVG color mapping, animations. |
| 📑 | **Blockive Tabs** | Sleek content switchers to organize large amounts of tabular content. | Tab pills alignment, keyboard focus/arrow-key transitions. |

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
├── assets/                       # Shared global assets
│   └── css/                      # Webfonts (Font Awesome) and style helpers
├── build/                        # Compiled production-ready assets (auto-generated)
├── src/                          # Raw Gutenberg block components
│   ├── accordion/                # Block: Accordion (edit, save, view, style)
│   ├── business-hours/           # Block: Business Hours
│   ├── button/                   # Block: Premium Buttons
│   ├── countdown-timer/          # Block: Countdown Timer
│   ├── drop-caps/                # Block: Drop Caps
│   ├── faq/                      # Block: Schema FAQ
│   ├── funfact/                  # Block: Animated Counter
│   ├── heading/                  # Block: Advanced Heading
│   ├── icon-box/                 # Block: Icon Box
│   ├── image-box/                # Block: Image Box
│   ├── pie-chart/                # Block: Interactive Pie Charts
│   ├── progress-bar/             # Block: Progress Bar
│   ├── social-icons/             # Block: Premium Social Icons
│   └── tabs/                     # Block: Sleek Tabs
├── blockive-premium-addon-for-block.php # Main entry-point class
├── readme.txt                    # WordPress.org plugin directory description
└── package.json                  # Dependencies, scripts, and package metadata
```

---

## 🔒 License & Credits

Distributed under the **GPL-2.0-or-later** License. 
For details, see [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html) or `readme.txt`.

Developed with ❤️ by **Lionecoders**.
