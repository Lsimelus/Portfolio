# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 18 + TypeScript portfolio web application built with Create React App. The frontend is deployed to Vercel at https://www.lyndbergh.net. The backend is a separate FastAPI application (`https://fastapi-postgres-gamma.vercel.app`) that handles contact form submissions and stores data in Postgres.

## Development Commands

All commands should be run from the repository root:

```bash
# Start development server (http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Create production build
npm run build

# Lint code (configured via ESLint with react-app preset)
# ESLint runs automatically with react-scripts
```

## Architecture

### Project Structure

The main source code lives in `/src/` with the following organization:

- **`/components/`** - One folder per section, styled with MUI `sx` props
  - Page sections, in order: HeaderSection (hero + Navbar) → ResumeSection → PortfolioSection → SkillsSection → AboutSection → ContactSection
  - Shared: SectionHeader (eyebrow/title/subtitle), RichText (renders `**bold**` markup from data.tsx), Alert
  - Navbar: desktop links + mobile drawer menu (`Open menu` button below `md`)
  - CaseStudyPage - public `/projects/:slug` page, reusing `src/docs/data/projects.ts` content

- **`/data/data.tsx`** - Central content file: `profile` (hero + stats), `about`, `resumeData`, `technologies`, `portfolioData`, `contactLinks`
  - **To update portfolio content, modify this file**
  - A project with `caseStudySlug` gets a "Case study" button; the slug must exist in `src/docs/data/projects.ts`

- **`/utils/reusableFunctions.tsx`** - `handleClickScroll()`, `downloadResume()`, `viewResume()`, `RESUME_URL`

- **`/assets/`** - Profile and project images as WebP (resize to ≤1200px wide before adding)
- **`/public/`** - `Lyndbergh-Simelus-Resume.pdf` (stable public URL), `og-image.png` (link preview, 1200×630), icons
- **`/docs/`** - `/docs` route is dev-only study notes; its markdown styles live in `markdown.css` and are shared with CaseStudyPage

### Technology Stack

- **UI Framework:** React 18.3.1 with TypeScript 4.9.5
- **Styling:** Material-UI 5 (emotion) — `sx` props, theme in `src/theme`
- **HTTP Client:** axios 1.12.2 (for backend API calls)
- **Routing:** react-router-dom 6 (`/`, `/projects/:slug`, dev-only `/docs/*`); `vercel.json` rewrites deep links to `index.html`
- **Analytics:** `@vercel/analytics` `<Analytics />` in `src/index.tsx` (enable Web Analytics in the Vercel dashboard)
- **CI:** `.github/workflows/ci.yml` runs type check, tests and `CI=true` build (lint warnings fail the build) on push/PR
- **Testing:** Jest + @testing-library/react (`CI=true npx react-scripts test --watchAll=false`); `src/setupTests.ts` mocks IntersectionObserver/scrolling. Components using router links must be rendered inside a `MemoryRouter`. `marked` is ESM-only, so tests mock `MarkdownView`.
- **Build Tool:** Create React App (react-scripts 5.0.1)
- **Other:** marked (markdown for case studies)

### Backend Integration

The frontend communicates with a separate FastAPI backend:

- **Backend API:** `https://fastapi-postgres-gamma.vercel.app` (overridable via `REACT_APP_API_URL`)
- **Contact Form Endpoint:** POST to `/api/contact-form`
- **Integration Point:** `ContactSection` component
- **Payload:** `{ name, email, subject, message }`

The backend is NOT part of this repository. It stores form submissions in Postgres.

### Component Architecture

This is a single-page application (SPA) with scroll-based navigation:

1. **App.tsx** - Root component that composes all sections (recruiter-first order)
2. **Navbar** - Fixed nav; active section tracked by an IntersectionObserver over section ids
3. **Section Components** - Each renders a `section` with an `id` used by the nav

Types live in `src/types/index.ts`. SEO/link-preview tags and JSON-LD are in `public/index.html`.

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
