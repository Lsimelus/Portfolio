import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar, { navSections } from '.';

describe('Navbar mobile menu', () => {
  it('opens a drawer listing every section and the resume download', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const drawer = screen.getByRole('presentation');
    navSections.forEach(({ label }) =>
      expect(within(drawer).getByRole('button', { name: label })).toBeInTheDocument()
    );
    expect(within(drawer).getByRole('button', { name: /download resume/i })).toBeInTheDocument();
  });

  it('scrolls to a section and closes when one is picked', () => {
    const target = document.createElement('div');
    target.id = 'Projects';
    document.body.appendChild(target);

    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.click(within(screen.getByRole('presentation')).getByRole('button', { name: 'Projects' }));

    expect(target.scrollIntoView).toHaveBeenCalled();
    target.remove();
  });
});
