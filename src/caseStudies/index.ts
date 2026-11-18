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
    tag: "Next.js + FastAPI + Postgres",
    summary:
      "Mortgage and location explorer: a budget-first questionnaire, then a FastAPI backend that ranks ~29,700 US towns on affordability, growth, rental yield, taxes, safety and disaster risk.",
    liveUrl: "https://real-calc-client-blush.vercel.app/",
    stack: ["Next.js (App Router)", "Redux Toolkit", "FastAPI", "PostgreSQL (Neon)", "Vercel"],
    decisions: [
      "Matched towns to Zillow's metro-only data through a county → metro crosswalk built from official Census files, instead of by town name — raising real growth-data coverage from ~3% to ~47% of towns",
      "Made missing data visible: each factor reports whether real data exists, the UI shows \"N/A\" instead of a made-up percentage, and towns missing data on a factor the user prioritized rank lower",
      "Removed features that weren't pulling their weight (an AI chat and a saved-calculations sign-in) instead of leaving them half-working — after first locking down an endpoint that could expose saved data",
    ],
    metrics: [
      { label: "Towns ranked", value: "~29,700" },
      { label: "Growth-data coverage", value: "~3% → ~47%" },
      { label: "Ranking factors", value: "9, weighted" },
      { label: "Tests added", value: "19 pytest + 8 RTL" },
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
