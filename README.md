<div align="center">
  <img src="https://moonui.dev/favicon-512x512.png" alt="MoonUI Logo" width="120" height="120">
  
  # MoonUI Kit
  
  <p align="center">
    <strong>Beautiful, accessible React components built with Radix UI and Tailwind CSS</strong>
  </p>
  
  <p align="center">
    <a href="https://moonui.dev">Documentation</a>
    ·
    <a href="https://moonui.dev/components">Components</a>
    ·
    <a href="https://github.com/oguzhanayyldz/moonuikit/issues">Report Bug</a>
  </p>
  
  <p align="center">
    <a href="https://www.npmjs.com/package/@moontra/moonui">
      <img src="https://img.shields.io/npm/v/@moontra/moonui?style=flat-square&color=blue" alt="NPM Version">
    </a>
    <a href="https://www.npmjs.com/package/@moontra/moonui">
      <img src="https://img.shields.io/npm/dm/@moontra/moonui?style=flat-square&color=blue" alt="NPM Downloads">
    </a>
    <a href="https://github.com/oguzhanayyldz/moonuikit/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
    </a>
    <a href="https://github.com/oguzhanayyldz/moonuikit/stargazers">
      <img src="https://img.shields.io/github/stars/oguzhanayyldz/moonuikit?style=flat-square&color=yellow" alt="GitHub Stars">
    </a>
  </p>
</div>

---

## ✨ Features

- 🎨 **45 Free Components** - High-quality, production-ready React components
- 🎯 **Built on Radix UI** - Accessible, unstyled primitives for building design systems
- 💅 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🌙 **Dark Mode** - Built-in dark mode support with CSS variables
- 📱 **Responsive** - Mobile-first responsive design
- ♿ **Accessible** - WAI-ARIA compliant components
- 🎭 **Customizable** - Easy to customize with Tailwind classes
- 📦 **Tree Shakeable** - Only import what you need
- 🔧 **TypeScript** - Full TypeScript support with type definitions
- ⚡ **Fast** - Optimized for performance

## 🚀 Quick Start

### Installation

Install MoonUI via npm:

```bash
npm install @moontra/moonui
```

Or using yarn:

```bash
yarn add @moontra/moonui
```

Or using pnpm:

```bash
pnpm add @moontra/moonui
```

### Setup Tailwind CSS

Add the MoonUI path to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ...
    "./node_modules/@moontra/moonui/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

### Import Styles

Import the MoonUI styles in your main CSS file:

```css
@import "@moontra/moonui/dist/index.css";
```

### Usage

```tsx
import { Button, Card, Dialog } from '@moontra/moonui';

function App() {
  return (
    <Card>
      <h2>Welcome to MoonUI</h2>
      <p>Build beautiful UIs with ease</p>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## 📦 Components

### Free Components (45)

<table>
<tr>
<td>

**Layout**
- Accordion
- Card
- Collapsible
- Separator
- Tabs

</td>
<td>

**Forms**
- Button
- Checkbox
- Input
- Label
- Radio Group
- Select
- Slider
- Switch
- Textarea
- Tags Input

</td>
<td>

**Data Display**
- Avatar
- Badge
- Progress
- Table
- Tooltip

</td>
</tr>
<tr>
<td>

**Feedback**
- Alert
- Dialog
- Toast
- Skeleton

</td>
<td>

**Navigation**
- Breadcrumb
- Dropdown Menu
- Pagination
- Command

</td>
<td>

**Utilities**
- Aspect Ratio
- Calendar
- Date Picker
- Popover
- Scroll Area

</td>
</tr>
</table>

### 💎 Pro Components (120+ Pro-only)

Unlock advanced components with Pro:

- Advanced Data Table
- Dashboard Widgets
- Rich Text Editor
- Kanban Board
- Form Wizard
- Charts & Analytics
- And much more...

[View all Pro components →](https://moonui.dev/pricing)

## 🎨 Theming

MoonUI uses CSS variables for theming. You can easily customize the look and feel:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  /* ... */
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/oguzhanayyldz/moonuikit.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

```
moonuikit/
├── packages/
│   └── moonui/           # Main component library
├── examples/             # Example projects
│   ├── nextjs-app/       # Next.js example
│   └── vite-react/       # Vite + React example
├── docs/                 # Documentation
└── scripts/              # Build scripts
```

## 🤝 Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MoonUI is [MIT licensed](LICENSE).

## 🙏 Credits

Built with ❤️ by [Oğuzhan Ayyıldız](https://github.com/oguzhanayyldz) and [contributors](https://github.com/oguzhanayyldz/moonuikit/graphs/contributors).

Special thanks to:
- [Radix UI](https://radix-ui.com) for the amazing primitives
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) for inspiration

## 💖 Support

If you find MoonUI helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation
- 💰 [Sponsoring the project](https://github.com/sponsors/oguzhanayyldz)

## 🔗 Links

- [Website](https://moonui.dev)
- [Documentation](https://moonui.dev/docs)
- [NPM Package](https://www.npmjs.com/package/@moontra/moonui)
- [Twitter](https://twitter.com/moonuidesign)

---

<div align="center">
  <strong>Ready to build something amazing?</strong>
  
  [Get Started →](https://moonui.dev/docs/installation)
</div>