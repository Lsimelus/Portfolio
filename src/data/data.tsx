import port from "../assets/workImages/portfolio.png"
import marhabanVid from "../assets/workVids/marhabanVid.mp4"
import marhaban from "../assets/workImages/marhaban.png"
import techPic from "../assets/workImages/tech.png"
import realEstateVid from "../assets/workVids/realEstateVid.mp4"
import realEstate from "../assets/workImages/realEstate.png"
import abc from "../assets/workImages/abc.png"
import {
  AboutData,
  Technology,
  TechCategory,
  ProjectType,
  ContactLinks,
  ResumeData,
  PortfolioData
} from "../types"

// Re-export types and enums for easy access
export { TechCategory, ProjectType }

// ============================================================================
// ABOUT SECTION
// ============================================================================

export const about: AboutData = {
  description: "I am a full-stack Software Engineer based in Boston, Massachusetts  with a deep specialization in secure, high-value systems like payments and enterprise data platforms. I enjoy developing complex and scalable web applications with modern technologies, which contributes to the overall success of a product. At Simply Business, I directly supported $1.4 Million in average monthly policy premium sold by engineering the full-stack, PCI-compliant checkout architecture from the ground up. My expertise includes leveraging frameworks like React for user interfaces, and Ruby on Rails and Python for scalable backends. \n In my spare time, I work on freelance projects, primarily designing static user interfaces for my clients. In addition to coding, as a Haitian-American, I find great joy in exploring and learning about diverse cultures, languages, traditions, and histories. Having devoted four years to the sport of track and field, running and practicing martial arts are two of my favorite ways to stay active. Please find below my professional resume, which showcases my skills and achievements as a software engineer."
}

// ============================================================================
// RESUME SECTION
// ============================================================================

export const resumeData: ResumeData = {
  education: [
    {
      institution: "Bowdoin College",
      degree: "Bachelor of Arts, Computer Science major and Biology minor",
      details: [
        "Independent Study: With a partner, created an iOS mobile fitness application in Swift",
        "Worked in IT for all 4 years, troubleshooting issues and helping customers"
      ],
      year: "2021"
    },
    {
      institution: "Harvard Business School Online",
      degree: "HBX CORe (Credential of Readiness) Certificate",
      details: [],
      year: ""
    }
  ],

  work: [
    {
      company: "Simply Business",
      position: "Mid Level Software Engineer",
      period: "2023 - Present",
      achievements: [
        "Improved Workers' Compensation application process by implementing a pre-quote FEIN/SSN bypass. This change allows ~65% of applicants to view a quote indication before entering sensitive information, addressing a key customer pain point that previously caused a ~10% drop-off. A/B testing demonstrated significant improvements: 12% increase in sales conversion, 20% increase in quote requests, and 25% increase in users reaching the legal agreements stage.",
        "Collaborated with cross-functional teams to design and implement secure, scalable solutions for integrating third-party APIs for insurance quote generation and purchase, adhering to PCI compliance standards. This included robust tokenization of credit card information and IP whitelisting for secure partner communication.",
        "Ensured data protection and privacy by working closely with security teams.",
        "Troubleshot and resolved integration issues with partners and internal teams.",
        "Maintained current knowledge of industry best practices and emerging technologies in API integration, PCI compliance, and tokenization.",
        "Developed using Ruby, React, and AWS"
      ]
    },
    {
      company: "Recorded Future Inc",
      position: "Software Engineer",
      period: "2021 - 2022",
      achievements: [
        "Designed, implemented, and tested Python services that maintained the integrity of ontology graph, MongoDBs, and data pipelines",
        "Developed a React Typescript (front-end) and Python Flask (back-end) web application, the primary focus being ease of maintenance and friendly to inexperienced developers through the inclusion of features such as built-in automated audit logging, user authentication, data monitoring, and analysis",
        "Utilized Amazon S3 to store and retrieve data",
        "Contributed to Agile ceremonies, led demos and presentations, and helped new engineers learn established norms",
        "Conducted rounds of UX design prototyping and user observation/testing",
        "Revamped an API-Centric JavaScript internal web application through research, user data and metrics. Ultimately increasing the application's capabilities and overall efficiency"
      ]
    },
    {
      company: "Tamr, Inc",
      position: "Software Engineer Intern",
      period: "Summer 2020",
      achievements: [
        "Researched, presented, and implemented telemetry into company's UI framework",
        "Created React components that are used throughout the company and its customers",
        "Practiced Agile programming methodology",
        "Gained familiarity with various Azure services"
      ]
    },
    {
      company: "MEMIC",
      position: "Software Engineer Intern",
      period: "Summer 2019",
      achievements: [
        "Created a REST API in C#/.NET that was implemented into company web applications",
        "Developed & debugged action buttons on company websites using various technologies",
        "Utilized ticketing system, navigated larger repositories, and refined SQL queries in company apps"
      ]
    }
  ]
}

// For backwards compatibility - map to old property names
export const resume = {
  education: resumeData.education.map(edu => ({
    location: edu.institution,
    title: edu.degree,
    time: edu.year,
    info: edu.details
  })),
  work: resumeData.work.map(job => ({
    location: job.company,
    title: job.position,
    time: job.period,
    info: job.achievements
  }))
}

// ============================================================================
// TECHNOLOGIES / SKILLS SECTION
// ============================================================================

export const technologies: Technology[] = [
  // Languages & Frameworks
  { name: "React", primaryColor: "#61DAFB", secondaryColor: "#222222", proficiencyLevel: 9, category: TechCategory.DEVELOPMENT },
  { name: "Next.js", primaryColor: "#000000", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.DEVELOPMENT },
  { name: "TypeScript", primaryColor: "#2F71BB", secondaryColor: "white", proficiencyLevel: 9, category: TechCategory.DEVELOPMENT },
  { name: "Tailwind CSS", primaryColor: "#3ABDF7", secondaryColor: "", proficiencyLevel: 8, category: TechCategory.DEVELOPMENT },
  { name: "Redux", primaryColor: "#764ABC", secondaryColor: "white", proficiencyLevel: 8, category: TechCategory.DEVELOPMENT },
  { name: "Node.js", primaryColor: "#83CD29", secondaryColor: "#404137", proficiencyLevel: 8, category: TechCategory.DEVELOPMENT },
  { name: "Express.js", primaryColor: "#000000", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.DEVELOPMENT },
  { name: "Python", primaryColor: "#336998", secondaryColor: "#F1D55B", proficiencyLevel: 7, category: TechCategory.DEVELOPMENT },
  { name: "Ruby on Rails", primaryColor: "#D30002", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.DEVELOPMENT },
  { name: "Swift", primaryColor: "#FD6330", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.DEVELOPMENT },
  { name: "MongoDB", primaryColor: "#01EC64", secondaryColor: "#000000", proficiencyLevel: 9, category: TechCategory.DEVELOPMENT },
  { name: "SQL", primaryColor: "#0072CB", secondaryColor: "white", proficiencyLevel: 8, category: TechCategory.DEVELOPMENT },

  // Tools & Infrastructure
  { name: "AWS", primaryColor: "#FF9900", secondaryColor: "#146EB4", proficiencyLevel: 8, category: TechCategory.INFRASTRUCTURE },
    { name: "Docker", primaryColor: "#218FE0", secondaryColor: "", proficiencyLevel: 7, category: TechCategory.INFRASTRUCTURE },
  { name: "Firebase", primaryColor: "#E87B09", secondaryColor: "#0393DA", proficiencyLevel: 7, category: TechCategory.INFRASTRUCTURE },
  { name: "Vercel", primaryColor: "#000000", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.INFRASTRUCTURE },
  { name: "Render.com", primaryColor: "#44DCB0", secondaryColor: "#3F4358", proficiencyLevel: 7, category: TechCategory.INFRASTRUCTURE },
    { name: "Figma", primaryColor: "#EB4B1D", secondaryColor: "#19B6F6", proficiencyLevel: 8, category: TechCategory.INFRASTRUCTURE },
    { name: "AirBrake", primaryColor: "#F3991D", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.INFRASTRUCTURE },
  { name: "New Relic", primaryColor: "#1EE783", secondaryColor: "#1D252C", proficiencyLevel: 7, category: TechCategory.INFRASTRUCTURE }
]

// For backwards compatibility - map to old format
export const tech: Record<string, any> = {}
technologies.forEach(t => {
  tech[t.name] = {
    color: t.primaryColor,
    color2: t.secondaryColor,
    skill: t.proficiencyLevel,
    cat: t.category === TechCategory.DEVELOPMENT ? 0 : 1
  }
})

// ============================================================================
// PORTFOLIO SECTION
// ============================================================================

export const portfolioData: PortfolioData = {
  projects: [
    {
      title: "ABChealth",
      description: "A waitlist/landing page for ABChealth - a social media platform combining goal setting, blogging, and community engagement for personal growth - backed by a full Express + PostgreSQL application. Includes Google OAuth signup, founding-member numbering, referral tracking, and a role-gated publisher dashboard.",
      technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "SQL"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/abchealth-expressjs",
      liveUrl: "https://abchealth-expressjs.vercel.app/",
      date: "2025",
      media: { image: abc },
      featured: true
    },
    {
      title: "REAL Estate Calculator",
      description: "This application is designed to provide users with insight into how U.S. real estate markets compare in terms of affordability and profitability. It also allows for easy comparison between locations and shows how a loan can be paid off over time, as well as how that affects the equity you build in your home. Backend pre-joins 7 external data APIs and 15+ government/Zillow datasets into PostgreSQL for sub-200ms location ranking.",
      technologies: ["Next.js", "TypeScript", "Redux", "Python", "SQL"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/real-calc-client",
      liveUrl: "https://real-calc-client-blush.vercel.app/",
      date: "2025",
      media: { image: realEstate, video: realEstateVid },
      featured: true
    },
    {
      title: "Web Portfolio",
      description: "The system is built on a modern, full-stack architecture: the interactive frontend uses React and TypeScript, while the robust backend is powered by Python FastAPI. All user input is securely managed in a PostgreSQL database, and the entire application is seamlessly hosted on Vercel.",
      technologies: ["React", "Node.js", "MongoDB", "Render.com", "TypeScript", "Vercel"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/portfolio",
      liveUrl: "https://www.lyndbergh.net/",
      date: "Feb 2023",
      media: { image: port },
      featured: true
    },
    {
      title: "Marhaban",
      description: "Marhaban is a non-profit organization website focused on expanding the beautiful religion of Islam. The frontend is TypeScript, the backend is Node.js, and contact form responses are saved in MongoDB. News articles are integrated using NewsAPI.",
      technologies: ["React", "Node.js", "MongoDB", "Render.com", "TypeScript"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/Marhaban",
      liveUrl: "https://marhaban.vercel.app/",
      date: "April 2023",
      media: { image: marhaban, video: marhabanVid }
    },
    {
      title: "Tech Interview Prep",
      description: "A technical assignment for a software engineering position. This is front-end application.",
      technologies: ["JavaScript", "JavaScript", "HTML", "CSS"],
      type: [ProjectType.FRONTEND],
      githubUrl: "https://github.com/Lsimelus/TechAssessment",
      date: "Feb 2023",
      media: { image: techPic },
      featured: true
    }
  ]
}

// For backwards compatibility
export const portfolio = {
  tech: ["FrontEnd", "BackEnd"],
  projects: portfolioData.projects.map(p => ({
    name: p.title,
    stack: p.technologies,
    end: p.type.includes(ProjectType.FULLSTACK) ? [0, 1] :
         p.type.includes(ProjectType.FRONTEND) ? [0] : [1],
    link: p.githubUrl,
    blurb: p.description,
    date: p.date,
    media: p.media
  }))
}

// ============================================================================
// CONTACT LINKS
// ============================================================================

export const contactLinks: ContactLinks = {
  github: "https://github.com/Lsimelus",
  githubRepo: "https://github.com/Lsimelus/Portfolio",
  email: "lsimelus@gmail.com",
  emailLink: "mailto:lsimelus@gmail.com",
  linkedin: "https://www.linkedin.com/in/lyndbergh-simelus/",
  phone: "7813508711",
  phoneLink: "tel:+7813508711"
}

// For backwards compatibility
export const links = {
  main: contactLinks.github,
  site: contactLinks.githubRepo,
  mail: contactLinks.email,
  mailto: contactLinks.emailLink,
  linkedin: contactLinks.linkedin,
  phone: contactLinks.phone,
  tel: contactLinks.phoneLink
}