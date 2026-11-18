import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Resume from '.';
import { resumeData } from '../../data/data';

/** Finds a bullet by its rendered text (bold markup removed). */
const bullet = (raw: string) => {
  const plain = raw.replace(/\*\*/g, '');
  return (_: string, el: Element | null) => el?.tagName === 'LI' && el.textContent === plain;
};

describe('Resume section', () => {
  const job = resumeData.work[0];

  it('shows the first four bullets of a long role, then expands', () => {
    render(<Resume />);
    expect(screen.getByText(bullet(job.achievements[0]))).toBeInTheDocument();
    expect(screen.queryByText(bullet(job.achievements[4]))).not.toBeInTheDocument();

    const hidden = job.achievements.length - 4;
    fireEvent.click(screen.getByRole('button', { name: `Show ${hidden} more` }));
    expect(screen.getByText(bullet(job.achievements[4]))).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show less' }));
    expect(screen.queryByText(bullet(job.achievements[4]))).not.toBeInTheDocument();
  });

  it('renders **marked** phrases in bold', () => {
    render(<Resume />);
    expect(screen.getByText('$2.4M+ in monthly premiums').tagName).toBe('STRONG');
    expect(document.body.textContent).not.toContain('**');
  });

  it('leads the current role with the checkout achievement', () => {
    expect(job.achievements[0]).toMatch(/on-site and phone checkout/);
  });
});
