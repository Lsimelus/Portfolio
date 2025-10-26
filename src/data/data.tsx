import cookie from "../assets/workImages/cookie.png"
import neural from "../assets/workImages/neural.png"
import port from "../assets/workImages/portfolio.png"
import royal from "../assets/workImages/royal.png"
import cookieVid from "../assets/workVids/cookieVid.mp4"
import neuralVid from "../assets/workVids/neuralVid.mp4"
import royalVid from "../assets/workVids/royalVid.mp4"
import marhabanVid from "../assets/workVids/marhabanVid.mp4"
import marhaban from "../assets/workImages/marhaban.png"
import techPic from "../assets/workImages/tech.png"
import realEstateVid from "../assets/workVids/realEstateVid.mp4"
import realEstate from "../assets/workImages/realEstate.png"
import {
  AboutData,
  ServicePlan,
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
// SERVICE SECTION
// ============================================================================

export const servicesData: ServicePlan[] = [
  {
    title: "Explore Plan",
    price: "$499",
    features: [
      "Custom coded website or platform",
      "3 page layout website",
      "Responsive design for mobile",
      "1 round of revision"
    ],
    accentColor: "#2DC85D"
  },
  {
    title: "Premium Plan",
    price: "$999",
    features: [
      "Custom coded website or platform",
      "5 page responsive website",
      "Up to 5 revisions",
      "Social media integration"
    ],
    accentColor: "#3380FF"
  },
  {
    title: "Immersive Plan",
    price: "$1999",
    features: [
      "Unlimited pages",
      "Unlimited revisions",
      "Social media campaigns",
      "Brand messaging and logos"
    ],
    accentColor: "#BE33FF"
  }
]

// For backwards compatibility - map to old property names
export const services = servicesData.map(s => ({
  title: s.title,
  price: s.price,
  desc: s.features,
  color: s.accentColor
}))

export const service = services

// ============================================================================
// TECHNOLOGIES / SKILLS SECTION
// ============================================================================

export const technologies: Technology[] = [
  { name: "React", primaryColor: "#61DAFB", secondaryColor: "#222222", proficiencyLevel: 9, category: TechCategory.FRONTEND },
  { name: "JavaScript", primaryColor: "#F99D28", secondaryColor: "#FFCA3F", proficiencyLevel: 9, category: TechCategory.FRONTEND },
  { name: "TypeScript", primaryColor: "#2F71BB", secondaryColor: "white", proficiencyLevel: 9, category: TechCategory.FRONTEND },
  { name: "HTML", primaryColor: "#FF3337", secondaryColor: "#FD7A63", proficiencyLevel: 10, category: TechCategory.FRONTEND },
  { name: "CSS", primaryColor: "#047CB6", secondaryColor: "#0399E7", proficiencyLevel: 9, category: TechCategory.FRONTEND },
  { name: "Tailwind CSS", primaryColor: "#3ABDF7", secondaryColor: "", proficiencyLevel: 8, category: TechCategory.FRONTEND },
  { name: "Bootstrap", primaryColor: "#8411F5", secondaryColor: "", proficiencyLevel: 7, category: TechCategory.FRONTEND },
  { name: "Redux", primaryColor: "#764ABC", secondaryColor: "white", proficiencyLevel: 8, category: TechCategory.FRONTEND },
  { name: "MongoDB", primaryColor: "#01EC64", secondaryColor: "#000000", proficiencyLevel: 9, category: TechCategory.FRONTEND },

  { name: "Node.js", primaryColor: "#83CD29", secondaryColor: "#404137", proficiencyLevel: 8, category: TechCategory.BACKEND },
  { name: "Python", primaryColor: "#336998", secondaryColor: "#F1D55B", proficiencyLevel: 7, category: TechCategory.BACKEND },
  { name: "Ruby on Rails", primaryColor: "#D30002", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.BACKEND },
  { name: "Java", primaryColor: "#f89820", secondaryColor: "#5382a1", proficiencyLevel: 6, category: TechCategory.BACKEND },
  { name: "GraphQL", primaryColor: "#DE33A6", secondaryColor: "white", proficiencyLevel: 7, category: TechCategory.BACKEND },
  { name: "SQL", primaryColor: "#0072CB", secondaryColor: "white", proficiencyLevel: 8, category: TechCategory.BACKEND },
  { name: "Swift", primaryColor: "#FD6330", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.BACKEND },
  { name: "Processing", primaryColor: "#1E30A2", secondaryColor: "#7EA5F2", proficiencyLevel: 5, category: TechCategory.BACKEND },

  { name: "AWS", primaryColor: "#FF9900", secondaryColor: "#146EB4", proficiencyLevel: 8, category: TechCategory.TOOLS },
  { name: "Azure", primaryColor: "#0B58A1", secondaryColor: "#3AC2F1", proficiencyLevel: 7, category: TechCategory.TOOLS },
  { name: "Docker", primaryColor: "#218FE0", secondaryColor: "", proficiencyLevel: 7, category: TechCategory.TOOLS },
  { name: "Firebase", primaryColor: "#E87B09", secondaryColor: "#0393DA", proficiencyLevel: 7, category: TechCategory.TOOLS },
  { name: "Github", primaryColor: "#7241C8", secondaryColor: "", proficiencyLevel: 9, category: TechCategory.TOOLS },
  { name: "Postman", primaryColor: "#FC6C35", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.TOOLS },
  { name: "Yarn", primaryColor: "#2987B2", secondaryColor: "white", proficiencyLevel: 8, category: TechCategory.TOOLS },
  { name: "Visual Studio Code", primaryColor: "#249FE6", secondaryColor: "#0569AA", proficiencyLevel: 9, category: TechCategory.TOOLS },
  { name: "Render.com", primaryColor: "#44DCB0", secondaryColor: "#3F4358", proficiencyLevel: 7, category: TechCategory.TOOLS },
  { name: "AirBrake", primaryColor: "#F3991D", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.TOOLS },
  { name: "New Relic", primaryColor: "#1EE783", secondaryColor: "#1D252C", proficiencyLevel: 7, category: TechCategory.TOOLS },
  { name: "Figma", primaryColor: "#EB4B1D", secondaryColor: "#19B6F6", proficiencyLevel: 8, category: TechCategory.TOOLS },
  { name: "Jira", primaryColor: "#0052CC", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.TOOLS },
  {name: "Vercel", primaryColor: "#000000", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.TOOLS }
]

// For backwards compatibility - map to old format
export const tech: Record<string, any> = {}
technologies.forEach(t => {
  tech[t.name] = {
    color: t.primaryColor,
    color2: t.secondaryColor,
    skill: t.proficiencyLevel,
    cat: t.category === TechCategory.FRONTEND ? 0 : t.category === TechCategory.BACKEND ? 1 : 2
  }
})

// ============================================================================
// PORTFOLIO SECTION
// ============================================================================

export const portfolioData: PortfolioData = {
  projects: [
    {
      title: "REAL Estate Calculator",
      description: "This application is designed to provide users with insight into how U.S. real estate markets compare in terms of affordability and profitability. It also allows for easy comparison between locations and shows how a loan can be paid off over time, as well as how that affects the equity you build in your home.",
      technologies: ["React", "TypeScript", "Python"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/real-calc-client",
      liveUrl: "https://real-calc-client-blush.vercel.app/",
      date: "2025",
      media: { image: realEstate, video: realEstateVid },
      featured: true
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
    },
    {
      title: "Web Portfolio",
      description: "A portfolio web application created with React TypeScript version 18. The backend is a Node.js application that saves user info in MongoDB. The backend is hosted using render.com and the frontend is hosted on Vercel.",
      technologies: ["React", "Node.js", "MongoDB", "Render.com", "TypeScript", "Vercel"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/portfolio",
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
      date: "April 2023",
      media: { image: marhaban, video: marhabanVid }
    },
    {
      title: "Royal Fitness",
      description: "An iOS mobile fitness application built with Swift. Features user login and authentication, tracks user movement while running (returning mph and average mile speed), and includes built-in suggested workouts and videos.",
      technologies: ["Firebase", "Swift"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/RoyalFitness",
      date: "Feb 2021",
      media: { image: royal, video: royalVid }
    },
    {
      title: "Cookie Recipe Generator",
      description: "A system that successfully generates unique cookie recipes by analyzing molecular similarities, combining different recipes for numerous generations, and allowing mutations. Molecular data sourced from FlavorDB.",
      technologies: ["Python"],
      type: [ProjectType.BACKEND],
      githubUrl: "https://github.com/Lsimelus/Genetic-Algorithm-Cookie-recipe-builder",
      date: "Feb 2021",
      media: { image: cookie, video: cookieVid }
    },
    {
      title: "Neural Networks Python",
      description: "A Neural Network that processes movie scripts between 2 actors, then uses the knowledge base to classify actor dialogue and predict who is speaking.",
      technologies: ["Python"],
      type: [ProjectType.BACKEND],
      githubUrl: "https://github.com/Lsimelus/Neural_Networks",
      date: "Jan 2020",
      media: { image: neural, video: neuralVid }
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