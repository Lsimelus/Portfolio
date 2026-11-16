import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CaseStudyPage from '.';
import { projects } from '../../docs/data/projects';

// `marked` ships as ESM only, which Jest (CRA config) can't transform; the renderer itself isn't under test.
jest.mock('../../docs/MarkdownView', () => ({
  MarkdownView: ({ content }: { content: string }) => <div data-testid="markdown">{content.length}</div>,
}));

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<div>home page</div>} />
        <Route path="/projects/:slug" element={<CaseStudyPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('CaseStudyPage', () => {
  it.each(projects.map((p) => [p.slug, p]))('renders the %s case study', (slug, project) => {
    renderAt(`/projects/${slug}`);
    expect(screen.getByRole('heading', { level: 1, name: project.name })).toBeInTheDocument();
    project.overview.decisions.forEach((d) => expect(screen.getByText(d)).toBeInTheDocument());
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to portfolio/i })).toHaveAttribute('href', '/#Projects');
    expect(document.title).toContain(project.name);
  });

  it('restores the page title when leaving', () => {
    document.title = 'Portfolio home';
    const { unmount } = renderAt(`/projects/${projects[0].slug}`);
    expect(document.title).toContain(projects[0].name);
    unmount();
    expect(document.title).toBe('Portfolio home');
  });

  it('redirects home for an unknown project', () => {
    renderAt('/projects/does-not-exist');
    expect(screen.getByText('home page')).toBeInTheDocument();
  });
});
