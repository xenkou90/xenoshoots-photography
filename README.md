# Xeno Shoots — Photography Portfolio

[![CI](https://github.com/xenkou90/xenoshoots-photography/actions/workflows/ci.yml/badge.svg)](https://github.com/xenkou90/xenoshoots-photography/actions/workflows/ci.yml)

Portfolio website for Xeno Shoots, a product photographer based in Greece. This is a ground-up rebuild of the current site at [xenoshoots.site](https://xenoshoots.site), moving from vanilla HTML, CSS and JavaScript to **Next.js, React, TypeScript and Tailwind CSS**.

> **Status:** in progress. The live site still runs the original version ([source](https://github.com/xenkou90/xenoshoots-portfolio)) until this rebuild is complete.

## Why rebuild it

The original site works, but its structure made it hard to maintain:

- The sidebar, mobile navigation and modals were copied into every HTML page, so content drifted apart between pages.
- Behavior and styling were connected only by class names across separate files. For example, one CSS rule silently overrode the lightbox's click handling in the JavaScript.
- Gallery images were hidden by default and revealed by JavaScript, so a single script error would hide every photo.
- Full-resolution photos were served as small thumbnails.
- The canonical and social metadata pointed to an old domain.

The goal is the same visual identity, with a component-based, typed and accessible implementation.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router), exported as a fully static site
- React 19 and TypeScript (strict mode)
- Tailwind CSS 4 with a restricted, custom color palette
- Self-hosted fonts via `next/font` (Cormorant Garamond and Inter)
- Responsive WebP images generated at build time with `sharp`
- ESLint (including Tailwind class checks) and Prettier
- [Playwright](https://playwright.dev) end-to-end tests in Chromium and WebKit, with [axe](https://github.com/dequelabs/axe-core) accessibility scans
- GitHub Actions CI

## Getting started

Requires [Node.js](https://nodejs.org) 26 (LTS). With [nvm](https://github.com/nvm-sh/nvm), `nvm use` picks up the version from `.nvmrc`.

```bash
nvm use
npm ci
npm run dev
```

Then open http://localhost:3000.

| Command             | What it does                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `npm run dev`       | Start the development server                                            |
| `npm run format`    | Format all files with Prettier                                          |
| `npm run lint`      | Check the code with ESLint                                              |
| `npm run typecheck` | Check types with TypeScript                                             |
| `npm run build`     | Build the static site into `out/`                                       |
| `npm run test:e2e`  | Run the end-to-end and accessibility tests against `out/` (build first) |
| `npx serve out`     | Preview the production build locally                                    |

## Deployment

`npm run build` produces a folder of plain HTML, CSS, JavaScript and images in `out/`. The plan is to serve that folder with nginx on a self-managed server, so no Node.js process runs in production.

## Workflow

- `main` is protected and always deployable. All work happens on feature branches.
- Every pull request is checked by GitHub Actions: formatting, linting, type checking, a production build, and end-to-end and accessibility tests at desktop and mobile sizes. A pull request can't be merged unless all checks pass.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org).
- Pull requests are merged with rebase merging, so every individual commit stays visible in a linear history.
- Milestones are tagged, starting with `v0.1-foundation`.

## Roadmap

- [x] Project foundation: static export, fonts, color tokens, metadata, icons
- [x] Site layout: sidebar, mobile header and navigation
- [x] Home page
- [x] Gallery with an accessible lightbox
- [x] Contact modal
- [x] Build-time image optimization
- [ ] Accessibility and performance review
- [ ] Deployment to production

## Copyright

All photographs and branding © Xeno Shoots. All rights reserved.
