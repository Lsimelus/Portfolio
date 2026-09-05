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
        "Ruby on Rails modular monolith — 7,280 application files, 3,239 spec files — backed by MongoDB, Sidekiq and Kafka change-data-capture into Snowflake, with package boundaries enforced by Packwerk.",
        "Designed and delivered the authentication and authorisation layer for an internal insurance product portal: authored the architecture decision record (Okta federated into AWS Cognito, stateless JWTs, Cedar policy-based role access), then built every layer it specified — Cognito pools and a V2 pre-token-generation Lambda in Terraform, multi-issuer JWT support contributed to the company's shared authentication gem, a Rails engine exposing the authorisation context, and the React SPA's OIDC/PKCE integration.",
        "Selected the portal's OIDC library by building two working prototypes and testing them against a nine-point checklist with token exposure as the deciding axis; recorded the strongest option as needing InfoSec approval rather than adopting it unreviewed, then migrated to service-worker token isolation once approved and removed the fallback path so unsupported browsers fail closed.",
        "Decomposed a monolithic Ruby rating-engine gem into nine published gems across 73 pull requests, landing each move as an independently reviewable slice with the matching changes in both consuming Rails applications in the same slice, so neither repository was ever left broken.",
        "Replaced five session booleans governing multi-product quoting — roughly sixty references, none persisted or queryable — with a Mongoid domain model published to Snowflake via Kafka change-data-capture, migrating readers in slices that each left production working. Detected, diagnosed and reverted a regression from my own merge in 85 minutes, choosing revert-then-fix over fixing forward on customer-facing routing, and relanded it with the fix.",
        "Designed and implemented a PCI-compliant full-stack checkout system in React and Ruby on Rails, processing an average of $1.4 million in monthly policy premiums. Replaced the legacy payment iframe with vendor-hosted card tokenisation proxied to a third-party vault so card data never reached application storage, integrated Stripe for policy binding, and bound each submission to its session and cart with CSRF, journey-token and cart-digest fields.",
        "Reduced application drop-off by 10% on the Workers' Compensation application by performing exploratory analysis and setting up A/B tests for a pre-quote FEIN/SSN bypass, enabling 65% of applicants to receive an immediate quote indication.",
        "Defined service levels in Terraform with fast-burn and slow-burn alert conditions; retired an alert I had authored after it produced false positives against natural traffic swing, replacing it with a scheduled EventBridge job comparing daily volume against the same-weekday average over the preceding four weeks.",
        "Integrated or extended seven insurance carriers (Cerity, Employers, Liberty Mutual, biberk, Coterie, Harborway, SolePro) across four repositories — quote-request mapping, OAuth clients, pricing and installment logic, per-partner secrets and whitelisting — and coordinated breaking contract changes across producer and consumer services and with data teams through the shared schema registry.",
        "Contributed reusable components to the company's internal React design system, including conditional badge rendering and pricing display used across customer-facing quote and checkout pages.",
        "Reviewed 500+ pull requests across 12 repositories, and served as formal onboarding buddy for two engineering hires and two interns."
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