// Type definitions for portfolio data

export interface AboutData {
  description: string;
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
}

export enum TechCategory {
  DEVELOPMENT = 'Languages & Frameworks',
  INFRASTRUCTURE = 'Tools & Infrastructure'
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
  githubUrl: string;
  liveUrl?: string;
  date: string;
  media: ProjectMedia;
  featured?: boolean;
}

export interface ContactLinks {
  github: string;
  githubRepo: string;
  email: string;
  emailLink: string;
  linkedin: string;
  phone: string;
  phoneLink: string;
}

export interface ResumeData {
  education: EducationItem[];
  work: WorkExperience[];
}

export interface PortfolioData {
  projects: PortfolioProject[];
}
