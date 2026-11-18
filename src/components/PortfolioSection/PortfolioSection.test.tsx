import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Portfolio from '.';
import { portfolioData } from '../../data/data';
import { caseStudies } from '../../caseStudies';

describe('Projects section', () => {
  it('links each project with a case study to its page', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Portfolio /></MemoryRouter>);
    const withStudies = portfolioData.projects.filter((p) => p.caseStudySlug);
    expect(withStudies.length).toBeGreaterThan(0);

    const links = screen.getAllByRole('link', { name: /case study/i }).map((a) => a.getAttribute('href'));
    withStudies.forEach((p) => expect(links).toContain(`/projects/${p.caseStudySlug}`));
  });

  it('only references case-study slugs that exist', () => {
    const slugs = caseStudies.map((c) => c.slug);
    portfolioData.projects
      .filter((p) => p.caseStudySlug)
      .forEach((p) => expect(slugs).toContain(p.caseStudySlug));
  });

  it('shows only featured projects, with no "More projects" list', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Portfolio /></MemoryRouter>);
    portfolioData.projects.forEach((p) =>
      expect(!!screen.queryByRole('heading', { name: p.title })).toBe(!!p.featured)
    );
    expect(screen.queryByText('More projects')).not.toBeInTheDocument();
  });

  it('badges in-progress projects and gives image-less projects a placeholder', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Portfolio /></MemoryRouter>);
    const inProgress = portfolioData.projects.filter((p) => p.featured && p.inProgress);
    expect(screen.getAllByText('In progress')).toHaveLength(inProgress.length);
    portfolioData.projects
      .filter((p) => p.featured && !p.media)
      .forEach((p) => expect(screen.getAllByText(p.title)).toHaveLength(2)); // placeholder + heading
  });
});
