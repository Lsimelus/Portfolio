import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Resume from '.';
import { resumeData } from '../../data/data';

describe('Resume section', () => {
  const job = resumeData.work[0];

  it('shows the first four bullets of a long role, then expands', () => {
    render(<Resume />);
    expect(screen.getByText(job.achievements[0])).toBeInTheDocument();
    expect(screen.queryByText(job.achievements[4])).not.toBeInTheDocument();

    const hidden = job.achievements.length - 4;
    fireEvent.click(screen.getByRole('button', { name: `Show ${hidden} more` }));
    expect(screen.getByText(job.achievements[4])).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show less' }));
    expect(screen.queryByText(job.achievements[4])).not.toBeInTheDocument();
  });

  it('leads the current role with the checkout achievement', () => {
    expect(job.achievements[0]).toMatch(/PCI-compliant full-stack checkout/);
  });
});
