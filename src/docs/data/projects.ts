import { content as realCalcContent } from "../content/real-calc";
import { content as abchealthContent } from "../content/abchealth";

export interface ProjectOverview {
  stack: string[];
  decisions: string[];
  metrics: { label: string; value: string }[];
}

export interface ProjectDoc {
  slug: string;
  name: string;
  tag: string;
  color: string;
  summary: string;
  repoUrl?: string;
  liveUrl?: string;
  overview: ProjectOverview;
  content: string;
}

export const projects: ProjectDoc[] = [
  {
    slug: "real-calc",
    name: "REAL Estate Calculator",
    tag: "Next.js + FastAPI + Postgres",
    color: "#3380FF",
    summary:
      "Mortgage/affordability calculator. Redux-driven questionnaire, a FastAPI backend that pre-joins 7 external data APIs + 15 Zillow/gov CSVs into Postgres, and a magic-link auth flow for saved calculations.",
    repoUrl: "https://github.com/Lsimelus/real-calc-client",
    liveUrl: "https://real-calc-client-blush.vercel.app/",
    overview: {
      stack: ["Next.js (App Router)", "Redux Toolkit", "FastAPI", "PostgreSQL", "Vercel"],
      decisions: [
        "Pre-compute derived scores (investment_score, cash_flow, budget_level) at write time instead of per-request — moved cost off the hot path",
        "Passwordless magic-link auth for saved calculations instead of a full account system",
        "Backend responses standardized to a { data, meta, error } envelope across every endpoint",
        "Built a real AWS Bedrock (Claude) chat backend, then deliberately removed it after AWS account approval was rejected — kept the UI as an honest 'not connected' preview rather than ship something broken",
      ],
      metrics: [
        { label: "External data sources", value: "7 APIs + 15 CSVs" },
        { label: "Locations tracked", value: "~550 metros" },
        { label: "Query latency", value: "<50ms (indexed)" },
        { label: "Speedup from pre-compute", value: "~10x (3-5s → 300-500ms)" },
      ],
    },
    content: realCalcContent,
  },
  {
    slug: "abchealth",
    name: "ABChealth",
    tag: "Express + Passport + Postgres",
    color: "#2DC85D",
    summary:
      "Waitlist/landing page backed by a real full-stack app: Google OAuth signup, founding-member numbering, referral attribution, and a role-gated publisher dashboard with a scheduled email job.",
    repoUrl: "https://github.com/Lsimelus/abchealth-expressjs",
    liveUrl: "https://abchealth-expressjs.vercel.app/",
    overview: {
      stack: ["Express.js", "Passport.js (Google OAuth)", "PostgreSQL", "node-cron", "Vercel"],
      decisions: [
        "Sessions persisted in Postgres (connect-pg-simple) rather than in-memory, so auth survives server restarts/redeploys",
        "Referral attribution split across two requests: a middleware stashes ?ref=CODE on the session at click-time, resolved to a user id only later at signup",
        "Founding-member numbering assigned via a Postgres SEQUENCE for atomic, race-free ordering under concurrent signups",
        "Role-based access (viewer/publisher) computed from an email allowlist and re-evaluated on every login rather than stored as a one-time grant",
      ],
      metrics: [
        { label: "Auth", value: "Google OAuth, session-based" },
        { label: "Role gate", value: "401 unauth / 403 wrong-role" },
        { label: "Email job", value: "daily cron + manual trigger" },
        { label: "Referral code retries", value: "up to 5x on collision" },
      ],
    },
    content: abchealthContent,
  },
];
