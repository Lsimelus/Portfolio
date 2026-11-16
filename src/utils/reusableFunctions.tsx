/** Public, stable URL of the resume PDF (served from /public). */
export const RESUME_URL = "/Lyndbergh-Simelus-Resume.pdf";

export const handleClickScroll = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/** Downloads the resume PDF with a readable filename. */
export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = "Lyndbergh-Simelus-Resume.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/** Opens the resume in the browser's own PDF viewer. */
export const viewResume = () => {
  window.open(RESUME_URL, "_blank", "noopener");
};
