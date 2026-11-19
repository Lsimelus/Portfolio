import { downloadResume, viewResume, RESUME_URL } from './reusableFunctions';

describe('resume helpers', () => {
  it('downloads the resume with a readable filename', () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    let anchor: HTMLAnchorElement | undefined;
    click.mockImplementation(function (this: HTMLAnchorElement) { anchor = this; });

    downloadResume();

    expect(anchor?.getAttribute('href')).toBe(RESUME_URL);
    expect(anchor?.download).toBe('Lyndbergh-Simelus-Resume.pdf');
    expect(document.body.contains(anchor!)).toBe(false); // cleaned up
    click.mockRestore();
  });

  it('opens the resume in a new tab', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    viewResume();
    expect(open).toHaveBeenCalledWith(RESUME_URL, '_blank', 'noopener');
    open.mockRestore();
  });
});
