# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 18 + TypeScript portfolio web application built with Vite. The frontend is deployed to Vercel at https://www.lyndbergh.net. Contact form submissions go to a separate Rails app, `lyndbergh-platform`, whose URL is set only in Vercel (`REACT_APP_API_URL`).

## Development Commands

All commands should be run from the repository root:

```bash
# Start development server (http://localhost:3002)
npm start

# Run tests once (Vitest); `npm run test:watch` for watch mode
npm test

# Type check + production build into build/
npm run build
```

## Architecture

### Project Structure

The main source code lives in `/src/` with the following organization:

- **`/components/`** - One folder per section, styled with MUI `sx` props
  - Page sections, in order: HeaderSection (hero + Navbar) → ResumeSection → PortfolioSection → SkillsSection → AboutSection → ContactSection
  - Shared: SectionHeader (eyebrow/title/subtitle), RichText (renders `**bold**` markup from data.tsx), Alert
  - Navbar: desktop links + mobile drawer menu (`Open menu` button below `md`)
  - CaseStudyPage - public `/projects/:slug` page; content in `src/caseStudies/` (typed list + Markdown body per project)

- **`/data/data.tsx`** - Central content file: `profile` (hero + stats), `about`, `resumeData`, `technologies`, `portfolioData`, `contactLinks`
  - **To update portfolio content, modify this file**
  - A project with `caseStudySlug` gets a "Case study" button; the slug must exist in `src/caseStudies/index.ts`

- **`/utils/reusableFunctions.tsx`** - `handleClickScroll()`, `downloadResume()`, `viewResume()`, `RESUME_URL`

- **`/assets/`** - Profile and project images as WebP (resize to ≤1200px wide before adding)
- **`/public/`** - `Lyndbergh-Simelus-Resume.pdf` (stable public URL), `og-image.png` (link preview, 1200×630), icons
- **`/caseStudies/`** - Case-study data and Markdown bodies
- **`/docs/`** (repo root) - Architecture Decision Records, numbered in walk-through order; add new ADRs there

### Technology Stack

- **UI Framework:** React 18.3.1 with TypeScript 5.6
- **Styling:** Material-UI 5 (emotion) — `sx` props, theme in `src/theme`
- **HTTP Client:** axios 1.12.2 (for backend API calls)
- **Routing:** react-router-dom 6 (`/`, lazy `/projects/:slug`); `vercel.json` rewrites deep links to `index.html`
- **Analytics:** `@vercel/analytics` `<Analytics />` in `src/index.tsx` (enable Web Analytics in the Vercel dashboard)
- **CI:** `.github/workflows/ci.yml` runs type check, tests and build on push/PR
- **Testing:** Vitest (jsdom, globals: `vi`, `describe`, `it`) + @testing-library/react (`npm test`); `src/setupTests.ts` mocks IntersectionObserver/scrolling. A `beforeEach` must not return a function (Vitest runs it as cleanup), so use braces. Components using router links must be rendered inside a `MemoryRouter`. `marked` is ESM-only, so tests mock `MarkdownView`.
- **Build Tool:** Vite 5 (`vite.config.ts`; dev server on 3002, output in `build/`). Env vars keep the `REACT_APP_` prefix (`envPrefix`) and are read via `import.meta.env`.
- **Other:** marked (markdown for case studies)

### Backend Integration

The frontend communicates with `lyndbergh-platform` (Rails, separate public repo):

- **Backend API:** `REACT_APP_API_URL` only (Vercel env; locally `http://localhost:3004`). Don't hardcode the production URL in this public repo.
- **Contact Form Endpoint:** POST to `/api/contact-form`
- **Integration Point:** `ContactSection` component
- **Payload:** `{ name, email, subject, message }`

The backend is NOT part of this repository. It stores form submissions in SQLite.

### Component Architecture

This is a single-page application (SPA) with scroll-based navigation:

1. **App.tsx** - Root component that composes all sections (recruiter-first order)
2. **Navbar** - Fixed nav; active section tracked by an IntersectionObserver over section ids
3. **Section Components** - Each renders a `section` with an `id` used by the nav

Types live in `src/types/index.ts`. SEO/link-preview tags and JSON-LD are in `index.html` (repo root).

### Data Management

Static content is managed in `/src/data/data.tsx`. To add/update:
- **Portfolio projects:** Modify the projects array (title, description, image, links, optional `featured` and `caseStudySlug`)
- **Resume data:** Update education, experience, and skills arrays
- **Contact info:** Update social links and contact details

No state management library is used (React hooks only).

### Styling Approach

The project uses a hybrid styling approach:
- **Material-UI components** for base UI elements (Grid, Paper, Typography, etc.)
- **CSS files** (App.css, index.css) for global styles
- Theme customization is possible through MUI's theming system

## Conventions

- Commit messages use Conventional Commits (`feat:`, `fix:`, `docs:`, `ci:`, `chore:`…); squash each batch of work into one commit.
- Headings: one `h1` per page, sections are `h2`; use `component` on Typography to keep visual size and semantic level separate.
- Keep text colors at WCAG AA contrast (Lighthouse accessibility is 100).

## Deployment

- **Platform:** Vercel
- **Build Output:** `/build/`
- **Predeploy Hook:** Automatically runs `npm run build` before deployment
- **Environment:** Production build uses homepage setting from package.json; `REACT_APP_API_URL` configures the backend base URL (see `.env.example`)
