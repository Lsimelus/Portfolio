import { content as realCalc } from "./realCalc";
import { content as abchealth } from "./abchealth";

export interface CaseStudy {
  /** URL segment: /projects/:slug */
  slug: string;
  name: string;
  /** Short stack label shown above the title */
  tag: string;
  summary: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  decisions: string[];
  metrics: { label: string; value: string }[];
  /** Markdown body: problem, what I built, hard parts */
  content: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "real-calc",
    name: "REAL Estate Calculator",
    tag: "Rails + React + Postgres",
    summary:
      "Mortgage and location explorer: a mortgage breakdown, then a ranking of 29,717 US places from 0 to 100 on ten factors. Rebuilt in 2026 from FastAPI + Next.js into one Rails modular monolith that serves the React app.",
    liveUrl: "https://realcalc.lyndbergh.net/",
    stack: ["Rails 8.1", "Packwerk", "Grape", "Solid Queue", "PostgreSQL", "React 19 + Vite", "Kamal on a Hetzner VPS"],
    decisions: [
      "Matched towns to Zillow's metro-only data through a county → metro crosswalk built from official Census files, instead of by town name — raising real growth-data coverage from ~3% to ~47% of towns",
      "Made missing data visible: each factor reports whether real data exists, the UI shows \"N/A\" instead of a made-up percentage, and towns missing data on a factor the user prioritized rank lower",
      "Rebuilt two apps (FastAPI + Next.js) as one Rails modular monolith with Packwerk-enforced boundaries instead of microservices: one thing to deploy, monitor and roll back, with the old API contract kept exactly so nothing users saw changed",
      "Moved market data from 25 MB of CSV read per request into Postgres tables refreshed monthly, filling metro-only gaps from city and county data and recording each value's source",
      "Moved off AWS (ECS + RDS) to one ~$7/month VPS with Kamal after an account-level block; the same container shipped in a 4-minute first deploy",
    ],
    metrics: [
      { label: "Places ranked", value: "29,717" },
      { label: "Data coverage", value: "every factor > 92%" },
      { label: "Ranking factors", value: "10, weighted" },
      { label: "Tests", value: "121 specs + 139 frontend" },
    ],
    content: realCalc,
  },
  {
    slug: "abchealth",
    name: "ABChealth",
    tag: "Express + Passport + Postgres",
    summary:
      "Launch site and waitlist backed by a full Express app: Google sign-in, founding-member numbers, referral tracking, and a role-gated publisher dashboard with a scheduled email job.",
    liveUrl: "https://abchealth-expressjs.vercel.app/",
    stack: ["Express.js", "Passport.js (Google OAuth)", "PostgreSQL", "node-cron", "Vercel"],
    decisions: [
      "Stored sessions in PostgreSQL instead of server memory, so sign-ins survive restarts and redeploys",
      "Captured referral codes on the session at click time and resolved them at sign-up, since the two can be days apart",
      "Assigned founding-member numbers from a PostgreSQL sequence for race-free ordering under concurrent sign-ups",
      "Recalculated each member's role from an email allowlist at every sign-in, instead of granting it once",
    ],
    metrics: [
      { label: "Sign-in", value: "Google OAuth" },
      { label: "Access control", value: "401 / 403 role gate" },
      { label: "Email job", value: "Daily + manual" },
      { label: "Numbering", value: "Race-free sequence" },
    ],
    content: abchealth,
  },
];
