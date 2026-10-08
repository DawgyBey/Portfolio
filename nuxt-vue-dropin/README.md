# Projects motion drop-in (Nuxt / Vue / plain HTML)

1. Copy `motion.css` and `motion.js` to `assets/` and `ProjectsSection.vue` to `components/`.
2. Nuxt: add `css: ['~/assets/motion.css']` in `nuxt.config.ts`; add `class="grain"` to `<body>` (optional).
3. Use `<ProjectsSection :projects="projects" />` with `{ id, name, kind, year, desc, stack, link, image|video }`.
4. Any other element: add `data-reveal` to a wrapper, then `.mask-line > span` / `.fade-up` children animate when scrolled into view.
5. Plain HTML: `import { initReveal, initCrosshair } from './motion.js'` and call both on load.

Reduced-motion and touch devices are handled automatically.
