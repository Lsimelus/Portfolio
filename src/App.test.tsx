import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { profile, resumeData, portfolioData } from './data/data';

vi.mock('axios', () => ({ __esModule: true, default: { post: vi.fn() } }));

const renderApp = () => render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></MemoryRouter>);

describe('App', () => {
  it('renders sections in recruiter-first order', () => {
    const { container } = renderApp();
    const ids = Array.from(container.querySelectorAll('header[id], section[id]')).map((el) => el.id);
    expect(ids).toEqual(['Home', 'Resume', 'Projects', 'Skills', 'About', 'Contact']);
  });

  it('shows the hero with name, title and resume actions', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getAllByText(profile.title).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /download resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view resume/i })).toBeInTheDocument();
    profile.stats.forEach((stat) => expect(screen.getByText(stat.label)).toBeInTheDocument());
  });

  it('has a nav entry for every section', () => {
    renderApp();
    const nav = screen.getByRole('navigation');
    ['Home', 'Experience', 'Projects', 'Skills', 'About', 'Contact'].forEach((label) =>
      expect(within(nav).getByRole('button', { name: label })).toBeInTheDocument()
    );
  });

  it('lists every job and featured project', () => {
    renderApp();
    resumeData.work.forEach((job) => expect(screen.getByText(job.company)).toBeInTheDocument());
    portfolioData.projects.filter((p) => p.featured).forEach((p) => expect(screen.getByRole('heading', { name: p.title })).toBeInTheDocument());
  });
});
