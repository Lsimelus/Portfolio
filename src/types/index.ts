// Type definitions for portfolio data

export interface HeroStat {
  value: string;
  label: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  /** One-line pitch shown under the title in the hero */
  pitch: string;
  /** Short availability line, e.g. "Open to full-time roles" */
  availability: string;
  stats: HeroStat[];
}

export interface AboutData {
  /** Paragraphs rendered in the About section */
  paragraphs: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  details: string[];
  year: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  achievements: string[];
  /** Optional "Tech environment" line shown under the bullets */
  environment?: string;
}

export enum TechCategory {
  LANGUAGES = 'Languages',
  FRONTEND = 'Frontend & Mobile',
  BACKEND = 'Backend & Data',
  SECURITY = 'Security & Auth',
  CLOUD = 'Cloud & Infrastructure',
  PRACTICES = 'Practices, Testing & Tools'
}

export interface Technology {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  proficiencyLevel: number; // 1-10
  category: TechCategory;
}

export interface ProjectMedia {
  image: string;
  video?: string;
}

export enum ProjectType {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  FULLSTACK = 'Full Stack'
}

export interface PortfolioProject {
  title: string;
  description: string;
  technologies: string[];
  type: ProjectType[];
  /** Omit for private repositories */
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  media: ProjectMedia;
  featured?: boolean;
  /** Slug of the public case-study page at /projects/:slug, if one exists */
  caseStudySlug?: string;
}

export interface ContactLinks {
  github: string;
  githubRepo: string;
  email: string;
  emailLink: string;
  linkedin: string;
}

export interface ResumeData {
  education: EducationItem[];
  work: WorkExperience[];
}

export interface PortfolioData {
  projects: PortfolioProject[];
}
