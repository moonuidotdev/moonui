# MoonUI 🌙

A premium React component library built for modern web applications. MoonUI provides beautifully designed, accessible, and highly customizable components that help you build stunning user interfaces faster.

[![npm version](https://badge.fury.io/js/%40moontra%2Fmoonui.svg)](https://badge.fury.io/js/%40moontra%2Fmoonui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## ✨ Features

### 🎨 **Beautiful Design**

- **50+ Premium Components** - Carefully crafted with attention to detail
- **Modern Aesthetics** - Clean, minimalist design that works everywhere
- **Consistent Typography** - Harmonious text hierarchy and spacing
- **Smooth Animations** - Delightful micro-interactions powered by Framer Motion

### 🌙 **Dark Mode Ready**

- **Built-in Dark Mode** - Seamless light/dark theme switching
- **CSS Variables** - Easy customization with design tokens
- **Theme Provider** - Consistent theming across your application
- **Custom Themes** - Create your own color palettes

### ♿ **Accessibility First**

- **WCAG Compliant** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Friendly** - Proper ARIA labels and descriptions
- **Focus Management** - Intuitive focus handling

### 🔧 **Developer Experience**

- **TypeScript** - Full type safety and IntelliSense
- **Tree Shaking** - Import only what you use
- **Tailwind Preset** - One line in your config wires up every design token
- **CLI Tool** - Easy installation with the `@moontra/moonui-cli` CLI
- **Storybook** - Interactive component documentation

### 📱 **Responsive & Performance**

- **Mobile First** - Optimized for all screen sizes
- **Lightweight** - Minimal bundle impact
- **React 18+ Compatible** - Latest React features
- **SSR Ready** - Next.js and other SSR frameworks

## 🚀 Quick Start

### Installation

```bash
# Install the package
npm install @moontra/moonui

# Tailwind is a peer dependency; the components also use the animate plugin
npm install -D tailwindcss tailwindcss-animate
```

Optionally scaffold the project files (`moonui.config.js`, `src/lib/utils.ts`,
`src/components/ui/`) with the CLI. It does **not** edit your Tailwind config or
global CSS — steps 1 and 2 below are still yours to add:

```bash
npx @moontra/moonui-cli init
```

### Setup

Steps 1 and 2 are both required. Skip either one and the components render
unstyled — the utility classes they rely on are simply never generated.

1. **Add the Tailwind preset** (required)

The preset maps Tailwind's color, radius and animation scales onto MoonUI's CSS
variables. Without it, classes such as `bg-primary`, `border-border` and
`animate-accordion-down` are never produced. The `content` entry for
`dist/**` matters just as much: Tailwind only generates classes it can *see*, and
the component classes live inside the package bundle.

```javascript
// tailwind.config.js  (Tailwind v3 config format)
module.exports = {
    presets: [require("@moontra/moonui/tailwind-preset")],
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@moontra/moonui/dist/**/*.{js,mjs}",
    ],
    // Radix-driven components use animate-in / fade-in-0 / slide-in-from-*
    plugins: [require("tailwindcss-animate")],
};
```

Everything the preset sets is still yours to override — add your own
`theme.extend` block and it wins.

2. **Import the design tokens** (required)

The preset only *maps* the variables; this file *defines* them (light and dark).

```css
/* globals.css */
@import "@moontra/moonui/src/styles/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

> **Why the `src/styles/…` path and not `@moontra/moonui/tokens.css`?** Because the
> two are resolved by different machinery. `postcss-import` — what handles CSS
> `@import` in the usual Tailwind v3 + PostCSS setup — does not read a package's
> `exports` map, so in CSS it needs the physical path (it ships in the tarball via
> the package `files` field). Bundler/Node resolution is the mirror image: it *is*
> `exports`-aware, so from JavaScript use the subpath instead:
>
> ```jsx
> // app/layout.tsx
> import "@moontra/moonui/tokens.css";
> ```
>
> Either route loads the same file — pick one, not both.

Recommended: also add the semantic layer. It defines extra tokens (elevation,
duration, easing) and the handful of utilities that have no Tailwind equivalent —
`shadow-xs`, `animate-fade-in`, `duration-fast`, `ease-bounce`. Every token the
preset reads already lives in `tokens.css`, so components still render correctly
without it; you only lose those extras (for example the `Skeleton` fade-in).

```css
@import "@moontra/moonui/src/styles/design-system.css";
```

3. **Start using components**

```jsx
import { Button, Card, Input } from "@moontra/moonui";

function App() {
    return (
        <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to MoonUI</h1>
            <div className="space-y-4">
                <Input placeholder="Enter your name" />
                <Button variant="primary" size="lg">
                    Get Started
                </Button>
            </div>
        </Card>
    );
}
```

## 🌐 CDN / no-build usage

MoonUI runs from a plain HTML page, with no bundler and no `npm install`. Two
routes are supported; they differ in who owns the artifact, not in what works.

**One rule applies to both: React must come from the page, never from the MoonUI
bundle.** Bundling React ships a second copy alongside the page's own, the hook
dispatcher ends up `null`, and every component that uses a hook throws
`Cannot read properties of null`. This was measured as a controlled experiment —
same source, same page, only React's location changed: React inside the bundle
crashed 7 of 7 component scenarios, React outside passed 7 of 7.

### Route A — esm.sh (zero setup, works today)

Nothing to build or publish; this works against the currently published package.

```html
<script type="importmap">
{
  "imports": {
    "react":      "https://esm.sh/react@19.2.3",
    "react/":     "https://esm.sh/react@19.2.3/",
    "react-dom":  "https://esm.sh/react-dom@19.2.3",
    "react-dom/": "https://esm.sh/react-dom@19.2.3/",
    "@moontra/moonui": "https://esm.sh/@moontra/moonui@6.19.2?bundle&external=react,react-dom&target=es2022"
  }
}
</script>

<div id="root"></div>
<script type="module">
  import { createRoot } from "react-dom/client";
  import { createElement as h } from "react";
  import { Button, Card, CardContent } from "@moontra/moonui";

  createRoot(document.getElementById("root")).render(
    h(Card, null, h(CardContent, { className: "p-6" },
      h(Button, { variant: "primary" }, "Hello from the CDN")))
  );
</script>
```

For React 18, swap both React URLs for `18.3.1`. Everything else is identical.

**All three query parameters are mandatory. Dropping any one of them breaks the
page, and two of the three fail silently:**

| Parameter | Drop it and… |
|---|---|
| `external=react,react-dom` | esm.sh resolves the peer range itself and loads a React independent of your importmap — including canary builds. All 7 component scenarios crash: `Cannot read properties of null (reading 'useContext')` on React 19, `Minified React error #31` on React 18. |
| `bundle` | Every module in the Radix / lucide / framer-motion graph becomes its own request: **464 requests instead of 17**, and roughly double the bytes on the wire. |
| `target=es2022` | The response carries `vary: User-Agent`, so the JavaScript you get depends on the browser asking. |

> **esm.sh is a third party and is not covered by any MoonUI SLA.** If esm.sh is
> unavailable, the page renders nothing at all — React is loaded from there too.
> There is no published commitment to the `?bundle` semantics. Use Route A to get
> started fast; use Route B when you need the artifact to be ours.

### Route B — MoonUI's own CDN artifacts

> **Not published yet.** These files are produced by this repository's build but
> ship with the *next* release of `@moontra/moonui`. The URLs below are the shape
> they will take, not links that resolve today.

| File | Format | Global | React support |
|---|---|---|---|
| `dist/cdn/moonui.global.js` | IIFE | `window.MoonUI` | **React 18 only** |
| `dist/cdn/moonui.esm.js` | ESM + importmap | — | React 18 **and** 19 |
| `dist/cdn/moonui.css` | stylesheet | — | both |

`unpkg` and `jsdelivr` in `package.json` point at the IIFE build.

**Why two formats:** the IIFE build reads React off `window.React`, which requires
React's UMD build — and **React 19 publishes no UMD build**. If you are on React 19,
the ESM file is the only route B option. That is not a MoonUI limitation; it is
where React left the UMD format.

```html
<!-- React 18, IIFE -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@moontra/moonui/dist/cdn/moonui.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@moontra/moonui/dist/cdn/moonui.global.js"></script>
<script>
  const { Button } = window.MoonUI;
  ReactDOM.createRoot(document.getElementById("root"))
    .render(React.createElement(Button, { variant: "primary" }, "Hello"));
</script>
```

```html
<!-- React 18 or 19, ESM -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@moontra/moonui/dist/cdn/moonui.css">
<script type="importmap">
{
  "imports": {
    "react":            "https://esm.sh/react@19.2.3",
    "react/jsx-runtime":"https://esm.sh/react@19.2.3/jsx-runtime",
    "react-dom":        "https://esm.sh/react-dom@19.2.3",
    "react-dom/client": "https://esm.sh/react-dom@19.2.3/client"
  }
}
</script>
<script type="module">
  import { createRoot } from "react-dom/client";
  import { createElement as h } from "react";
  import { Button } from "https://cdn.jsdelivr.net/npm/@moontra/moonui/dist/cdn/moonui.esm.js";
  createRoot(document.getElementById("root")).render(h(Button, { variant: "primary" }, "Hello"));
</script>
```

Verified in a real browser against the produced artifacts — IIFE + React 18, ESM +
React 18, ESM + React 19: 410 exports, 7 of 7 components rendered (Card, Button,
Switch, Tooltip, Accordion, Dialog, Select, Tabs), 6 of 6 interactions passed, zero
page errors. Reproduce with `npm run verify:cdn` inside `packages/moonui`.

### Styling on a CDN page

Component styles do **not** come from the JavaScript bundle. Classes like
`bg-primary` and `border-border` are normally generated by *your* Tailwind build,
and a CDN page has no Tailwind build — which is why `moonui.css` exists and why
loading it is not optional.

**Known limit:** `moonui.css` is generated by scanning MoonUI's own source, so it
contains the classes MoonUI components use and nothing else. Your own utility
classes — `mt-[37px]`, `text-[13px]` — are not in it and will not apply. Two ways out:

- Add [Tailwind Play CDN](https://tailwindcss.com/docs/installation/play-cdn) next
  to MoonUI. Measured working, including MoonUI's own colors when you feed it the
  preset. Tailwind marks Play CDN as **not for production**: compilation happens in
  the browser (FOUC plus extra JavaScript), it is Tailwind v3, and it is a third
  external dependency.
- Or write layout with inline `style` attributes.

For anything beyond a prototype, the npm route above with your own Tailwind build
is the better answer — and at that point you are not on a CDN anymore.

### Browser support

`<script type="importmap">` requires Chrome/Edge 89+, Safari 16.4+, Firefox 108+
(per MDN/caniuse; not measured here). Older browsers need a polyfill such as
`es-module-shims`, which MoonUI has not tested. The IIFE route has no importmap
requirement, but it is React 18 only.

## 📚 Components

A selection of what ships in the package — every name below is a real export of
`@moontra/moonui`. The full, always-current list lives at
**[moonui.dev/docs/components](https://moonui.dev/docs/components)**.

### Layout & Structure

- **Card** - Flexible content containers
- **Separator** - Visual content dividers
- **AspectRatio** - Responsive aspect ratio containers
- **ScrollArea** - Custom scrollable areas
- **Collapsible** - Expandable content

### Navigation

- **Breadcrumb** - Hierarchical navigation
- **Pagination** - Page navigation controls
- **Tabs** - Tabbed interfaces
- **DropdownMenu** - Context menus
- **Command** - Command palette interface

### Form Controls

- **Button**, **ButtonGroup** - Interactive buttons with variants
- **Input**, **Textarea** - Text input fields
- **Select** - Dropdown selections
- **Checkbox**, **CheckboxGroup** - Boolean selections
- **RadioGroup** - Single choice selections
- **Switch**, **Toggle**, **ToggleGroup** - Toggle controls
- **Slider** - Range inputs
- **Label** - Form field labels
- **InputOTP** - One-time-code input
- **PhoneInput**, **TagsInput** - Specialized inputs
- **CardNumberInput**, **CardExpiryInput**, **CardCVCInput**, **CardZipInput** - Payment fields
- **Rating** - Star ratings
- **FileUpload** - File upload interface

### Feedback & Overlays

- **Dialog**, **DialogForm** - Modal dialogs
- **Toast** / **Toaster** - Notification messages
- **Alert** - Inline notifications
- **Tooltip**, **SimpleTooltip** - Contextual information
- **Popover** - Floating content panels
- **Spinner** - Inline loading indicator

### Data Display

- **Avatar**, **AvatarGroup** - User profile images
- **Badge** - Status indicators
- **Kbd** - Keyboard shortcut hints
- **Progress** - Loading indicators
- **Skeleton** (+ **SkeletonText**, **SkeletonCard**, **SkeletonAvatar**) - Loading placeholders
- **Table** - Structured data display
- **MoonUIDataTableBasic** - Basic TanStack-powered data table
- **Accordion** - Collapsible content
- **Carousel** - Slideshows

### Dates & Color

- **MoonUICalendar** - Date selection
- **DatePicker**, **DateRangePicker**, **DateTimePicker**, **MonthPicker** - Date input controls
- **ColorPicker**, **SimpleColorPicker**, **GradientPicker** - Color selection

### Interaction & Motion

- **DraggableList** - Sortable lists
- **SwipeableCard** - Touch-friendly cards
- **GestureDrawer** - Gesture-driven drawer
- **ScrollReveal** (+ **ScrollRevealContainer**, **ScrollRevealItem**) - Scroll-driven reveals

### Editors

- **RichTextEditor** - WYSIWYG editor
- **SimpleEditor** - Lightweight text editor

> Components are also exported under a `MoonUI`-prefixed alias (for example
> `MoonUIButton`, `MoonUICard`) if you need to avoid name collisions. Two of them
> — `Calendar` and `DataTableBasic` — are available **only** under their prefixed
> names: `MoonUICalendar` and `MoonUIDataTableBasic`.

## 🎨 Theming

### CSS Variables

MoonUI uses CSS variables for theming. These are the values `tokens.css` ships
with — components read them as `hsl(var(--primary))` and friends:

```css
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 217.2 91.2% 51%;
    --primary-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --ring: 217.2 91.2% 51%;
    --radius: 0.5rem;
    /* ... more variables */
}

.dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
    /* ... dark theme variables */
}
```

### Dark Mode

Dark mode is **class-based**: `tokens.css` defines a `.dark` block and the preset
sets `darkMode: "class"`. Put the `dark` class on your root element — yourself, or
with a library such as `next-themes` — and every component follows:

```jsx
<html className="dark">
    <body>{children}</body>
</html>
```

### Theme Provider

`ThemeProvider` is **optional** and does something different from dark mode: it
swaps whole colour *presets* at runtime. The default preset is the static
`tokens.css`, so mounting the provider changes nothing until you pick another one.

```jsx
import { ThemeProvider } from "@moontra/moonui/theme";

function App() {
    return (
        <ThemeProvider defaultPreset="ocean" persist>
            <YourApp />
        </ThemeProvider>
    );
}
```

| Prop            | Type                              | Default     | Description                              |
| --------------- | --------------------------------- | ----------- | ---------------------------------------- |
| `defaultPreset` | `ThemePresetName`                 | `"default"` | Preset used on first render              |
| `preset`        | `ThemePresetName`                 | —           | Controlled preset (overrides internal state) |
| `overrides`     | `Partial<ThemeTokens>`            | —           | Per-token overrides                      |
| `persist`       | `boolean`                         | `false`     | Persist the selection to `localStorage`  |
| `storageKey`    | `string`                          | —           | Key used when `persist` is on            |

Available presets: `default`, `brand`, `corporate`, `creative`, `nature`,
`minimal`, `ocean`. Read the active one with `useTheme()` (it must be called
inside a `ThemeProvider`).

### Custom Colors

Redeclare any token in your own `:root` block **after** the import and it wins:

```css
:root {
    --primary: 142 76% 36%; /* Custom green */
    --secondary: 210 40% 95%;
}
```

## 🔧 CLI Tool

The MoonUI CLI helps you add components easily:

```bash
# Initialize MoonUI in your project
npx @moontra/moonui-cli init

# Add specific components
npx @moontra/moonui-cli add button
npx @moontra/moonui-cli add card input

# Add multiple components
npx @moontra/moonui-cli add button card input dialog

# Browse what is available
npx @moontra/moonui-cli list
```

Other commands: `theme`, `templates`, `license`, `login`, `logout`, `whoami`.
Run `npx @moontra/moonui-cli --help` for the full list.

## 📖 Documentation

- **🌐 Website**: [moonui.dev](https://moonui.dev)
- **📚 Components**: [moonui.dev/docs/components](https://moonui.dev/docs/components)
- **🎨 Theming**: [moonui.dev/docs/theming](https://moonui.dev/docs/theming)
- **🔧 CLI**: [moonui.dev/docs/cli](https://moonui.dev/docs/cli)

## 🤖 AI Integration

MoonUI includes MCP (Model Context Protocol) support for AI assistants:

```bash
npm install -g @moontra/moonui-mcp-server
```

Then register it with your MCP client (Claude Desktop shown here):

```json
{
    "mcpServers": {
        "moonui": {
            "command": "npx",
            "args": ["@moontra/moonui-mcp-server"]
        }
    }
}
```

AI assistants can then help you:

- 🎯 Find the right components for your use case
- 🔧 Generate component code automatically
- 🐛 Fix import issues
- 🎨 Configure theming and customization

## 💼 Pro Version

Upgrade to MoonUI Pro for advanced components:

- **DataTable** - Advanced data grids with sorting, filtering, export, bulk actions
- **AdvancedChart**, **ChartWidget** - Data visualization built on Recharts
- **RichTextEditor** - WYSIWYG editor
- **FormWizard** - Multi-step forms with validation
- **AdvancedCalendar** - Event calendars and advanced date/time pickers
- **DraggableList** - Sortable lists
- **FileTree** - Hierarchical data display
- **Timeline** - Event timelines
- **Kanban** - Drag-and-drop board layouts
- **BentoGrid**, **Spotlight**, **VirtualList** - Layout, search and virtualization

[Learn more about Pro →](https://moonui.dev/pricing)

## 🛠️ Development

### Requirements

Declared peer dependencies:

- React 18 or 19 (`react`, `react-dom`)
- Tailwind CSS 3 or 4

Recommended for development: Node.js 18+ and TypeScript 5+.

### Local Development

```bash
git clone https://github.com/oguzhanayyldz/moonuikit
cd moonuikit/packages/moonui
npm install
npm run dev
```

### Building

```bash
npm run build      # Build for production
npm run build:dts  # Generate type definitions
npm run lint       # Lint code
npm run test       # Run tests
```

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](https://github.com/oguzhanayyldz/moonuikit/blob/main/CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

### Component Guidelines

- Follow accessibility best practices
- Include TypeScript types
- Add Storybook stories
- Write comprehensive tests
- Document props and usage

## 📦 Package Details

- **Bundle Size** (v6.17.0, unminified): ~311 KB `dist/index.mjs`, ~335 KB `dist/index.js`
- **Formats**: ESM + CJS, both marked `"use client"` for the Next.js App Router
- **Type Definitions**: Full TypeScript support (`dist/index.d.ts`)
- **Tree Shaking**: Enabled — `sideEffects` is limited to `**/*.css`, so unused
  components are dropped by the bundler
- **Subpath exports**: `.`, `./theme`, `./hooks`, `./tokens.css`,
  `./design-system.css`, `./tailwind-preset`

## 🔗 Ecosystem

- **[@moontra/moonui-pro](https://npmjs.com/package/@moontra/moonui-pro)** - Premium components
- **[@moontra/moonui-cli](https://npmjs.com/package/@moontra/moonui-cli)** - Command line tool
- **[@moontra/moonui-mcp-server](https://npmjs.com/package/@moontra/moonui-mcp-server)** - AI integration

## 📄 License

Licensed under the [MIT License](https://github.com/oguzhanayyldz/moonuikit/blob/main/LICENSE).

## 🙏 Acknowledgments

Built with:

- [React](https://reactjs.org/)
- [Radix UI](https://radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

**[Website](https://moonui.dev) • [Documentation](https://moonui.dev/docs) • [Components](https://moonui.dev/docs/components) • [GitHub](https://github.com/oguzhanayyldz/moonuikit)**

Made with ❤️ by the MoonUI team

</div>
