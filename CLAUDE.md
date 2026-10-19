# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also `AGENTS.md` (dev-server workflow and links to the relevant Astro docs guides — consult them before routing, styling, content collections, i18n or framework-component work).

## Project

Coffee landing page built on Astro 7 (static site). Currently still the untouched `basics` starter: `src/pages/index.astro` renders the placeholder `Welcome` component inside `src/layouts/Layout.astro`. Expect to replace `Welcome.astro`, the starter assets and the `<title>Astro Basics</title>` in the layout.

- Package manager: **pnpm**. Node `>=22.22.0` (enforced via `engines`).
- No integrations, UI framework, Tailwind, linter, formatter or test runner are installed yet; `astro.config.mjs` is empty. Add integrations with `pnpm astro add <name>`.
- TypeScript uses `astro/tsconfigs/strict`.

## Commands

```sh
pnpm install
astro dev --background   # preferred: background dev server (localhost:4321); manage with astro dev stop|status|logs
pnpm build               # static build to ./dist/
pnpm preview             # serve the built site
pnpm astro check         # type-check .astro/.ts files (prompts to install @astrojs/check on first run)
```

## Higgsfield (image/video generation)

`@higgsfield/cli` is installed **locally** as a devDependency (not global), so `higgsfield` is not on PATH. Whenever a `higgsfield-*` skill in `.claude/skills/` says to run `higgsfield …`, run `pnpm exec higgsfield …` instead. Skills are tracked in `skills-lock.json`.

## Structure

- `src/pages/` — file-based routing; each `.astro` file is a route.
- `src/layouts/Layout.astro` — HTML shell (head, favicon, global `html/body` reset); pages wrap content in `<Layout>` and it renders via `<slot />`.
- `src/components/` — `.astro` components; styles in `<style>` blocks are component-scoped by default.
- `src/assets/` — images processed/optimized by Astro (import them); `public/` — served as-is at the site root.
