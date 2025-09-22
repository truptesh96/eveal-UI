# ⛳️ Cabot – UI Library #

The main objective is to meet WCAG compliance for a better user experience, where accessibility will be a core part of the development process from the beginning, not an addition. 
The plan includes using modern, scalable, and high-performance CSS practices, reducing code duplication, and maximizing shared resources for efficiency.

***

To streamline the workflow and boost efficiency, we will utilize a GIT-based versioning alongside a local development environment. This is eliminating the need for servers or databases during early stages. Here’s a breakdown of the core ideas:

***

## 🏌️ Getting Started

Please ensure you are running Node.js **v22.18.0** before starting development or running build processes, as earlier versions will not be supported.

### Installation
Install the required Node.js modules by running:
```bash
npm install
```

### Development
Start development mode with hot reloading:
```bash
npm run dev
```

### Production
Build optimized, minified assets by running:
```bash
npm run build
```

***

## ♿️ Accessibility & WCAG

1. Use semantic HTML: `nav`, `main`, `header`, `section`, `article`, `aside`, `footer`, etc.
1. Use proper landmark roles and heading levels (`h2`-`h6`) hierarchically – no skipping.
1. All interactive elements must be focusable, navigable via keyboard, and have a visible focus state.
1. Use `inert`, `aria-hidden`, and `role="presentation"` where applicable.

#### Always consider to: 

- Provide empty `alt` text for images.
- Use `aria-*` only when semantic HTML is not enough.
- Manage focus traps and restore focus for modals, overlays, and dynamic content.
- Respect user preferences via `@media (prefers-reduced-motion: reduce){ ... }`.

***

## 🎨 Layout & CSS
2. Mobile–first by default, only use desktop–first if justified.
2. Maintain consistent file structure and naming conventions across components and styles.
    - Use BEMIT (Block__Element--Modifier + ITCSS) for clarity and modularity (ex: `.o-section`, `.o-section--reverse` `.c-button`, etc.)
    - Use SMACSS naming for custom states (ex: `.is-active`, `.is-open`)
    - Use Atomic/Utility-first approach for common parts (ex: `.font-primary`)
2. Use responsive units (`em`, `rem`, `%`, `auto`, `fit-content`, `max-content`) instead of fixed `px` values where possible.
    - Use `em` for properties that should scale relative to their parent font size, such as dynamic margins and paddings within generic elements.
    - Use `rem` for sizing relative to the root font size (`:root`), making it easier to adjust the overall scale by changing a single root value.
    - Use `%`, `auto`, `fit-content`, and `max-content` for flexible layout widths, heights, and spacing that adapt proportionally within their containers.
2. Use CSS Grid and Flexbox for layout – avoid floats, fixed widths.
2. Prefer `gap` over `margin` for spacing in layouts (grid, flex).
2. Use shorthands where appropriate (ex: `font: 400 1.25rem/1.5 Arial`)
2. Use `aspect-ratio` rather than fixed width/height for media and blocks.
2. Use `object-fit: cover` for media to control how they adapt and scale within their containers.
2. Use `currentColor` or `inherit` where applicable for inheriting styles.
2. Avoid deep specificity – keep selectors simple and modular.
2. Limit SCSS nesting to 2 levels deep – often `&` can be skipped for clarity.
2. Don’t manually handle spacing/margins across components – centralize in utility classes, variables or layout primitives (2).

#### Use CSS variables for:
- Colors (ex: `--color-primary`),
- Spacing (ex: `--space-sm`),
- Z-index (ex: `--z-modal`),
- Transitions, border-radius, shadows.

#### Embrace modern CSS:
- `min()`, `max()`, `clamp()` to reduce media queries usage,
- `:is()`, `:where()` for multiple selectors,
- `:has()` for progressive enhancements,
- `color-mix()` for colours varations,
- `margin-inline`, `padding-block`, etc. for logical properties.

***

## 🏗 Reusability Guidelines

#### Components & Duplication
- Avoid creating new components that duplicate existing functionality.
- Apply **modifier classes** to adapt shared components for different variations.
- Extract common styles into **utility classes** (ex: spacing, typography).
- Place shared styles inside **reusable components** rather than repeating CSS rules.

#### Components & Creation
- Use existing global UI elements (buttons, cards, inputs) across all blocks.
- Do *not* create block-specific versions unless absolutely necessary.

#### Components & Modularity
- Ensure components are **independent** and configurable either with **modifier** or **state** classes.
- Enable easy customization without needing to duplicate code or styles.

***

## 📚 Additional Resources

***

[Learn BEMIT](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture)

***

[Learn ITCSS](https://www.freecodecamp.org/news/managing-large-s-css-projects-using-the-inverted-triangle-architecture-3c03e4b1e6df/)

***

[Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)