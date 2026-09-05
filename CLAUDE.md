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

- **`/components/`** - Feature-based React components (14 components total)
  - Each major section (Header, About, Resume, Portfolio, Contact) has dedicated components
  - Reusable components include Button and Alert

- **`/styles/`** - Styled components using styled-components and @emotion/styled
  - `commonUIComponents/` contains shared styled components (ItemStyled, ButtonStyled)
  - Section-specific styles are organized by feature (headerSection/, aboutSection/, etc.)

- **`/data/data.tsx`** - Central data file containing all content
  - About information, resume/education data, portfolio projects, contact links
  - **To update portfolio content, modify this file**

- **`/utils/reusableFunctions.tsx`** - Shared utilities
  - `useOnScreen()` - Intersection observer hook for scroll animations
  - `handleClickScroll()` - Smooth scroll navigation
  - `downloadResume()` - Resume PDF download handler

- **`/assets/`** - Static media files
  - Profile images, resume PDF, portfolio work images (18), and videos (12)

### Technology Stack

- **UI Framework:** React 18.3.1 with TypeScript 4.9.5
- **Styling:** Material-UI 5.18.0 + styled-components 5.3.11
- **HTTP Client:** axios 1.12.2 (for backend API calls)
- **Testing:** Jest + @testing-library/react
- **Build Tool:** Create React App (react-scripts 5.0.1)
- **Special Libraries:**
  - react-player - Video/media playback
  - @react-pdf-viewer - PDF resume viewing
  - particles-bg - Animated particle backgrounds

### Backend Integration

The frontend communicates with a separate FastAPI backend:

- **Backend API:** `https://fastapi-postgres-gamma.vercel.app` (overridable via `REACT_APP_API_URL`)
- **Contact Form Endpoint:** POST to `/api/contact-form`
- **Integration Point:** `ContactSection` component
- **Payload:** `{ name, email, subject, message }`

The backend is NOT part of this repository. It stores form submissions in Postgres.

### Component Architecture

This is a single-page application (SPA) with scroll-based navigation:

1. **App.tsx** - Root component that composes all sections
2. **Navbar** - Sticky navigation with smooth scroll to sections
3. **Section Components** - Full-height sections (Header, About, Resume, Portfolio, Contact)
4. **Card Components** - Reusable cards for portfolio items
5. **Modal Components** - Resume viewer modal with PDF display

All components use TypeScript with proper type definitions in `/src/global`.

### Data Management

Static content is managed in `/src/data/data.tsx`. To add/update:
- **Portfolio projects:** Modify the projects array (includes title, description, images/videos, links)
- **Resume data:** Update education, experience, and skills arrays
- **Contact info:** Update social links and contact details

No state management library is used (React hooks only).

### Styling Approach

The project uses a hybrid styling approach:
- **Material-UI components** for base UI elements (Grid, Paper, Typography, etc.)
- **styled-components** for custom component styling
- **CSS files** (App.css, index.css) for global styles
- Theme customization is possible through MUI's theming system

## Known Issues & Future Work

From README.md, planned improvements include:
- Update technologies used for repositories
- Add comprehensive tests
- Remove some old projects from College

## Deployment

- **Platform:** Vercel
- **Build Output:** `/build/`
- **Predeploy Hook:** Automatically runs `npm run build` before deployment
- **Environment:** Production build uses homepage setting from package.json; `REACT_APP_API_URL` configures the backend base URL (see `.env.example`)
