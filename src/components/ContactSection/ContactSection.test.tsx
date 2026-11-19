import type { Mock } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Contact from '.';

vi.mock('axios', () => ({ __esModule: true, default: { post: vi.fn() } }));
const mockPost = axios.post as Mock;

const fill = (label: RegExp, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe('Contact form', () => {
  beforeEach(() => { mockPost.mockReset(); }); // braces: Vitest runs a returned function as cleanup

  it('prefills the subject from an inquiry chip', () => {
    render(<Contact alertCallback={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Job opportunity' }));
    expect(screen.getByLabelText(/subject/i)).toHaveValue('Job opportunity');
  });

  it('warns and does not post when fields are missing', () => {
    const alert = vi.fn();
    const { container } = render(<Contact alertCallback={alert} />);
    fireEvent.submit(container.querySelector('form')!);
    expect(alert).toHaveBeenCalledWith('Please fill in all required fields.', 'warning');
    expect(mockPost).not.toHaveBeenCalled();
  });

  it('posts the payload to the contact endpoint and clears the form', async () => {
    mockPost.mockResolvedValue({ data: {} });
    const alert = vi.fn();
    render(<Contact alertCallback={alert} />);

    fill(/name/i, 'Ada');
    fill(/email/i, 'ada@example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Freelance project' }));
    fill(/message/i, 'Hello!');
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(alert).toHaveBeenCalledWith(expect.stringMatching(/sent successfully/), 'success'));
    expect(mockPost).toHaveBeenCalledWith(expect.stringMatching(/\/api\/contact-form$/), {
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Freelance project',
      message: 'Hello!',
    });
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });

  it('shows an error alert when the request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockPost.mockRejectedValue(new Error('network'));
    const alert = vi.fn();
    render(<Contact alertCallback={alert} />);

    fill(/name/i, 'Ada');
    fill(/email/i, 'ada@example.com');
    fill(/subject/i, 'Hi');
    fill(/message/i, 'Hello!');
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(alert).toHaveBeenCalledWith('Something went wrong. Please try again.', 'error'));
  });
});
