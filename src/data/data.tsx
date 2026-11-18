import port from "../assets/workImages/portfolio.webp"
import realEstate from "../assets/workImages/realEstate.webp"
import abc from "../assets/workImages/abc.webp"
import playlistVideo from "../assets/workImages/playlistVideo.webp"
import {
  AboutData,
  ProfileData,
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

export const profile: ProfileData = {
  name: "Lyndbergh Simelus",
  title: "Full-Stack Software Engineer",
  location: "Boston, MA",
  pitch: "I build secure, high-value systems — payments, auth, and data platforms — end to end with React, Ruby on Rails, Python, and AWS.",
  availability: "Open to senior full-stack roles · Boston or relocation",
  stats: [
    { value: "5 years", label: "shipping production software at companies acquired by S&P 500 firms — Travelers and Mastercard" },
    { value: "Payments & checkout", label: "built an on-site and phone checkout integrating third-party partner APIs end to end — card data kept out of PCI scope, no duplicate charges against slow partner systems" },
    { value: "SSO + role-based access", label: "designed sign-in and permissions end to end — Okta, AWS Cognito, OIDC/PKCE and policy-based roles, provisioned with Terraform" },
    { value: "Business logic as data + AI", label: "moved hard-coded business rules into a versioned database, then built an AI assistant that explains them and safely tests changes against real historical data" },
    { value: "Large-scale refactoring", label: "split a legacy monolithic library into 10+ reusable packages with zero downtime for the apps that depend on it" },
    { value: "Retiring legacy apps", label: "rebuilt a legacy platform used daily by 50+ operations staff, redesigning its workflows through user observation, prototyping and usability testing" },
  ],
}

export const about: AboutData = {
  paragraphs: [],
  lookingFor: {
    summary: "A **senior full-stack engineering role** where I **own features end to end** — from the database and APIs to the React UI customers use. I'm based in **Boston and open to relocating**.",
    points: [
      "Products where correctness and trust matter: **payments, identity and access, and data platforms**",
      "Turning **complex business rules and legacy systems** into clean, well-tested services",
      "Applying **AI to real workflows**, with people kept in the loop",
      "A team that ships in **small, reviewable steps** and values mentoring and code review",
    ],
  },
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
      company: "Simply Business (acquired by Travelers)",
      position: "Software Engineer II",
      period: "2023 - Present",
      achievements: [
        "Built an **on-site and phone checkout** in React and Ruby on Rails that lets customers buy policies from **5+ partner insurers** without leaving our website, processing **$2.4M+ in monthly premiums**; cards are vaulted by TokenEx, keyed in over the phone through Twilio Pay and charged through processors like Stripe, keeping card data out of our systems and **out of PCI DSS scope**.",
        "Built an **AI assistant** with RubyLLM on **AWS Bedrock and ECS** that answers questions about pricing rules and tests proposed changes by **replaying real past quotes**, with a person approving every change, traced in New Relic.",
        "Split our pricing engine into **10+ Ruby gems** **without disrupting dependent apps**, then moved its rules into a **versioned PostgreSQL graph**, so rules change and roll back **without a code release**.",
        "Designed **SSO and role-based permissions** for a pricing-rules tool: **Okta federated into AWS Cognito** over SAML, roles added to tokens by an AWS Lambda provisioned with Terraform, a TypeScript frontend signing in with **OIDC/PKCE**, and **Cedar policies**, inside a Packwerk modular monolith.",
        "Rebuilt our purchase process to **work reliably with partner insurers' slow, unpredictable APIs** over OAuth 2.0, **preventing duplicate charges** and drawing payment plans and fees from a payment options service I designed, covered by **RSpec and Pact contract tests**.",
        "**Cut workers' comp application drop-off 10%** by **A/B testing** a price-first flow: partner insurer APIs return a provisional quote before the tax ID is asked, so **65% of applicants see a price right away**.",
        "**Launched cross-selling** that gives customers whose liability quote is held for review an **instant business owner's policy quote** from their existing answers, stored in MongoDB and streamed through Kafka.",
        "Selected the pricing-rules tool's OIDC library by building **two working prototypes** and testing them against a nine-point checklist with token exposure as the deciding axis, then moved to **service-worker token isolation** once InfoSec approved it.",
        "Replaced five session booleans governing multi-product quoting with a **Mongoid domain model** published to Snowflake via **Kafka change-data-capture**, migrating readers in slices that each left production working; caught and **reverted a regression from my own merge in 85 minutes**, then relanded it with the fix.",
        "Defined **service levels in Terraform** with fast-burn and slow-burn alerts, and replaced a noisy volume alert with a **scheduled EventBridge job** comparing daily volume against the same weekday over the preceding four weeks.",
        "Contributed reusable components to the company's **internal React design system**, including badge and pricing displays used across customer-facing quote and checkout pages.",
        "**Reviewed 500+ pull requests across 12 repositories**, and served as **onboarding buddy** for two engineering hires and two interns."
      ],
      environment: "Ruby on Rails modular monolith (7,000+ application files) with Packwerk package boundaries, MongoDB, Sidekiq, and Kafka change-data-capture into Snowflake; React and TypeScript frontends; AWS (Cognito, Lambda, Bedrock, ECS) and Terraform; RSpec and Pact tests."
    },
    {
      company: "Recorded Future Inc",
      position: "Software Engineer I",
      period: "2021 - 2023",
      achievements: [
        "Owned the **end-to-end full-stack re-engineering** of a company-wide internal data curation platform used daily by **50+ dedicated operations staff**, modernizing legacy workflows with **React, TypeScript and Python (Flask)**.",
        "Designed features from **direct user observation and testing** with the operations team, resolving critical usability issues, **increasing curation throughput** and lowering operational overhead.",
        "Built in **automated audit logging, user authentication and data monitoring** so the platform stayed easy to maintain for engineers new to the codebase.",
        "Designed, implemented and tested Python services that maintained the **integrity of the threat-intelligence ontology graph**, MongoDB stores and data pipelines.",
        "**Rapidly diagnosed and resolved data pipeline failures** and other critical issues in response to real-world incidents, including data leaks."
      ]
    },
    {
      company: "Tamr, Inc",
      position: "Software Engineer Intern",
      period: "Summer 2020",
      achievements: [
        "Researched, presented and built **full-stack telemetry** into the company's UI framework with Python and React, improving system observability.",
        "Built **core React framework components** used across the company's internal and customer-facing applications."
      ]
    },
    {
      company: "MEMIC",
      position: "Software Engineer Intern",
      period: "Summer 2019",
      achievements: [
        "Designed and implemented a **custom C# logging framework** supporting Info, Warning and Error levels.",
        "Built a **REST API in C#/.NET** used by company web applications, and refined SQL queries in production apps."
      ]
    }
  ]
}

// ============================================================================
// TECHNOLOGIES / SKILLS SECTION
// ============================================================================

export const technologies: Technology[] = [
  // Languages
  { name: "TypeScript", primaryColor: "#2F71BB", secondaryColor: "white", proficiencyLevel: 9, category: TechCategory.LANGUAGES },
  { name: "JavaScript", primaryColor: "#F7DF1E", secondaryColor: "#000000", proficiencyLevel: 9, category: TechCategory.LANGUAGES },
  { name: "Ruby", primaryColor: "#CC342D", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.LANGUAGES },
  { name: "Python", primaryColor: "#336998", secondaryColor: "#F1D55B", proficiencyLevel: 7, category: TechCategory.LANGUAGES },
  { name: "SQL", primaryColor: "#0072CB", secondaryColor: "white", proficiencyLevel: 8, category: TechCategory.LANGUAGES },
  { name: "Swift", primaryColor: "#FD6330", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.LANGUAGES },
  // Frontend & Mobile
  { name: "React", primaryColor: "#61DAFB", secondaryColor: "#222222", proficiencyLevel: 9, category: TechCategory.FRONTEND },
  { name: "Next.js", primaryColor: "#000000", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.FRONTEND },
  { name: "Redux", primaryColor: "#764ABC", secondaryColor: "white", proficiencyLevel: 8, category: TechCategory.FRONTEND },
  { name: "Tailwind CSS", primaryColor: "#3ABDF7", secondaryColor: "", proficiencyLevel: 8, category: TechCategory.FRONTEND },
  { name: "Design systems", primaryColor: "#7C4DFF", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.FRONTEND },
  // Backend & Data
  { name: "Ruby on Rails", primaryColor: "#D30002", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.BACKEND },
  { name: "Node.js", primaryColor: "#83CD29", secondaryColor: "#404137", proficiencyLevel: 8, category: TechCategory.BACKEND },
  { name: "Express.js", primaryColor: "#000000", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.BACKEND },
  { name: "FastAPI / Flask", primaryColor: "#009688", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.BACKEND },
  { name: "PostgreSQL", primaryColor: "#336791", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.BACKEND },
  { name: "MongoDB", primaryColor: "#01EC64", secondaryColor: "#000000", proficiencyLevel: 9, category: TechCategory.BACKEND },
  { name: "Sidekiq", primaryColor: "#B1003E", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.BACKEND },
  { name: "Packwerk", primaryColor: "#D30002", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.BACKEND },
  { name: "Stripe", primaryColor: "#635BFF", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.BACKEND },
  { name: "Kafka (CDC)", primaryColor: "#231F20", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.BACKEND },
  { name: "Twilio Pay", primaryColor: "#F22F46", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.BACKEND },
  { name: "RubyLLM", primaryColor: "#CC342D", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.BACKEND },
  { name: "Snowflake", primaryColor: "#29B5E8", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.BACKEND },
  // Security & Auth
  { name: "PCI DSS", primaryColor: "#0B5394", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.SECURITY },
  { name: "OAuth 2.0 / OIDC + PKCE", primaryColor: "#EB5424", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.SECURITY },
  { name: "JWT", primaryColor: "#D63AFF", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.SECURITY },
  { name: "AWS Cognito", primaryColor: "#DD344C", secondaryColor: "#FF9900", proficiencyLevel: 8, category: TechCategory.SECURITY },
  { name: "Okta", primaryColor: "#007DC1", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.SECURITY },
  { name: "Cedar policies", primaryColor: "#FF9900", secondaryColor: "#232F3E", proficiencyLevel: 7, category: TechCategory.SECURITY },
  { name: "IAM", primaryColor: "#DD344C", secondaryColor: "#FF9900", proficiencyLevel: 7, category: TechCategory.SECURITY },
  { name: "SAML", primaryColor: "#0B5394", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.SECURITY },
  { name: "TokenEx", primaryColor: "#1A73E8", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.SECURITY },
  // Cloud & Infrastructure
  { name: "AWS", primaryColor: "#FF9900", secondaryColor: "#146EB4", proficiencyLevel: 8, category: TechCategory.CLOUD },
  { name: "Terraform", primaryColor: "#7B42BC", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.CLOUD },
  { name: "AWS Lambda", primaryColor: "#FF9900", secondaryColor: "#232F3E", proficiencyLevel: 7, category: TechCategory.CLOUD },
  { name: "AWS Bedrock", primaryColor: "#01A88D", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.CLOUD },
  { name: "AWS ECS", primaryColor: "#FF9900", secondaryColor: "#232F3E", proficiencyLevel: 6, category: TechCategory.CLOUD },
  { name: "EventBridge", primaryColor: "#E7157B", secondaryColor: "#FFFFFF", proficiencyLevel: 6, category: TechCategory.CLOUD },
  { name: "Docker", primaryColor: "#218FE0", secondaryColor: "", proficiencyLevel: 7, category: TechCategory.CLOUD },
  { name: "Vercel", primaryColor: "#000000", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.CLOUD },
  { name: "Firebase", primaryColor: "#E87B09", secondaryColor: "#0393DA", proficiencyLevel: 7, category: TechCategory.CLOUD },
  { name: "Render.com", primaryColor: "#44DCB0", secondaryColor: "#3F4358", proficiencyLevel: 7, category: TechCategory.CLOUD },
  // Practices, Testing & Tools
  { name: "SLOs & burn-rate alerting", primaryColor: "#1EE783", secondaryColor: "#1D252C", proficiencyLevel: 7, category: TechCategory.PRACTICES },
  { name: "A/B testing", primaryColor: "#7C4DFF", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.PRACTICES },
  { name: "Architecture decision records", primaryColor: "#455A64", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.PRACTICES },
  { name: "RSpec", primaryColor: "#CC342D", secondaryColor: "#FFFFFF", proficiencyLevel: 8, category: TechCategory.PRACTICES },
  { name: "Pact contract tests", primaryColor: "#2E7D32", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.PRACTICES },
  { name: "Jest + React Testing Library", primaryColor: "#C21325", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.PRACTICES },
  { name: "New Relic", primaryColor: "#1EE783", secondaryColor: "#1D252C", proficiencyLevel: 7, category: TechCategory.PRACTICES },
  { name: "AirBrake", primaryColor: "#F3991D", secondaryColor: "#FFFFFF", proficiencyLevel: 7, category: TechCategory.PRACTICES },
  { name: "Figma", primaryColor: "#EB4B1D", secondaryColor: "#19B6F6", proficiencyLevel: 8, category: TechCategory.PRACTICES }
]

// ============================================================================
// PORTFOLIO SECTION
// ============================================================================

export const portfolioData: PortfolioData = {
  projects: [
    {
      title: "REAL Estate Calculator",
      description: "Answers “what can I afford?” and “where should I buy?” in one flow: a budget-first mortgage breakdown, then a ranking of **~29,700 US towns** on up to 9 weighted factors in **under 200 ms**. Matching towns to Zillow's metro data through Census county files raised real data coverage from **~3% to ~47%**.",
      technologies: ["Next.js", "TypeScript", "Redux", "Python", "FastAPI", "PostgreSQL"],
      type: [ProjectType.FULLSTACK],
      liveUrl: "https://real-calc-client-blush.vercel.app/",
      caseStudySlug: "real-calc",
      date: "2025",
      media: { image: realEstate },
      featured: true
    },
    {
      title: "Music Video Playlist",
      description: "Paste an Apple Music playlist, get back a YouTube Music playlist of the songs' **official music videos**. A **Python matching engine** scores each search result and rejects lyric videos, remixes and live versions, handling **300 songs in about 45 seconds**; a Rails front end previews the matches and saves through **Google OAuth and the YouTube Data API**.",
      technologies: ["Python", "Ruby on Rails", "YouTube Data API", "OAuth 2.0", "Docker", "Caddy"],
      type: [ProjectType.FULLSTACK],
      date: "2026",
      media: { image: playlistVideo },
      featured: true
    },
    {
      title: "ABChealth",
      description: "Launch site and waitlist for a goal-setting and community platform, built as a full **Express + PostgreSQL** app: **Google OAuth signup**, race-free founding-member numbering, **referral tracking** from link click to signup, and a **role-gated publisher dashboard** with scheduled email.",
      technologies: ["JavaScript", "Tailwind CSS", "Node.js", "Express.js", "Passport.js", "PostgreSQL"],
      type: [ProjectType.FULLSTACK],
      liveUrl: "https://abchealth-expressjs.vercel.app/",
      caseStudySlug: "abchealth",
      date: "2025",
      media: { image: abc },
      featured: true
    },
    {
      title: "Web Portfolio",
      description: "This site: a recruiter-first **React and TypeScript** portfolio with case-study pages, a mobile menu and link previews, covered by **Jest and React Testing Library** and checked by **CI on every push**. The contact form posts to a separate **Python FastAPI** service that stores messages in **PostgreSQL**.",
      technologies: ["React", "TypeScript", "MUI", "Jest", "FastAPI", "PostgreSQL", "Vercel"],
      type: [ProjectType.FULLSTACK],
      githubUrl: "https://github.com/Lsimelus/Portfolio",
      liveUrl: "https://www.lyndbergh.net/",
      date: "2026",
      media: { image: port },
      featured: true
    }
  ]
}

// ============================================================================
// CONTACT LINKS
// ============================================================================

export const contactLinks: ContactLinks = {
  github: "https://github.com/Lsimelus",
  githubRepo: "https://github.com/Lsimelus/Portfolio",
  email: "lsimelus@gmail.com",
  emailLink: "mailto:lsimelus@gmail.com",
  linkedin: "https://www.linkedin.com/in/lyndbergh-simelus/"
}
