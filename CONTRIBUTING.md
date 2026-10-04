# Contributing to MoonUI Kit

First off, thank you for considering contributing to MoonUI Kit! It's people like you that make MoonUI Kit such a great tool.

## 🎯 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, npm version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linting (`npm run lint`)
6. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

## 📋 Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Local Development

1. Clone your fork:
```bash
git clone https://github.com/your-username/moonuikit.git
cd moonuikit
```

2. Install dependencies:
```bash
npm install
```

3. Start development:
```bash
npm run dev
```

### Project Structure

```
moonuikit/
├── packages/
│   └── moonui/           # Main component library
│       ├── src/
│       │   ├── components/   # Component source files
│       │   ├── hooks/        # Custom React hooks
│       │   ├── lib/          # Utilities
│       │   └── styles/       # CSS files
│       └── package.json
├── examples/             # Example projects
├── docs/                 # Documentation
└── scripts/              # Build and sync scripts
```

## 💻 Development Guidelines

### Component Development

When creating a new component:

1. **Use TypeScript** - All components must be written in TypeScript
2. **Follow existing patterns** - Look at existing components for reference
3. **Use Radix UI primitives** when available
4. **Style with Tailwind CSS** - Use utility classes
5. **Ensure accessibility** - Follow WAI-ARIA guidelines
6. **Add proper TypeScript types**
7. **Include JSDoc comments**
8. **Write tests** - Every component needs tests
9. **Update documentation**

Example component structure:

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'size-sm-classes',
        md: 'size-md-classes',
        lg: 'size-lg-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';

export { Component, componentVariants };
```

### Commit Messages

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

Examples:
```
feat: add new Button component variant
fix: resolve Dialog close issue on mobile
docs: update installation guide
```

### Testing

- Write unit tests for all components
- Use React Testing Library
- Aim for >80% code coverage
- Test accessibility features
- Test all component variants

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable names
- Keep components small and focused
- Extract reusable logic into hooks
- Avoid inline styles

## 📝 Documentation

When adding or updating components:

1. Update the component's documentation file
2. Include usage examples
3. Document all props
4. Add accessibility notes
5. Include keyboard navigation info
6. Add migration guides if breaking changes

## 🚀 Release Process

We use semantic versioning (SemVer):

- **Major** (x.0.0) - Breaking changes
- **Minor** (0.x.0) - New features
- **Patch** (0.0.x) - Bug fixes

Releases are managed by maintainers.

## 📮 Communication

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General discussions and questions
- **Twitter** - Updates and announcements

## 🙏 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in documentation

## ❓ Questions?

If you have questions, please:

1. Check the [documentation](https://moonui.dev/docs)
2. Search [existing issues](https://github.com/oguzhanayyldz/moonuikit/issues)
3. Ask in [GitHub Discussions](https://github.com/oguzhanayyldz/moonuikit/discussions)

Thank you for contributing to MoonUI Kit! 🎉