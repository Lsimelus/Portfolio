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
      "Mortgage/affordability calculator and location explorer. Redux-driven questionnaire, a FastAPI backend that ranks ~29,700 US towns by a weighted multi-factor score (affordability, growth, rent yield, taxes, safety, FEMA disaster risk), and a county→metro crosswalk that fixed real data coverage from ~3% to ~47%.",
    repoUrl: "https://github.com/Lsimelus/real-calc-client",
    liveUrl: "https://real-calc-client-blush.vercel.app/",
    overview: {
      stack: ["Next.js (App Router)", "Redux Toolkit", "FastAPI", "PostgreSQL (Neon)", "Vercel"],
      decisions: [
        "Every ranked factor exposes a score_data_available flag alongside its score, so the UI shows 'N/A' instead of a fabricated-looking percentage when a town's real data doesn't exist - and prioritizing a factor applies a small penalty to candidates missing real data on it",
        "Individual towns matched to Zillow's metro-only CSVs via a county→metro crosswalk (built from the official Census CBSA delineation file) rather than by town name, since Zillow only publishes ~900 metro areas by name",
        "FEMA's classic National Risk Index static-file download was retired mid-project; found and verified a working alternative (a public ArcGIS FeatureServer) rather than dropping the feature",
        "Built a real AWS Bedrock (Claude) chat backend and a passwordless magic-link auth flow, then removed both outright once neither was load-bearing (Bedrock: AWS account approval for Anthropic models was rejected; auth: nothing in the app actually called the save endpoints it depended on) - deleted rather than left as dead code",
      ],
      metrics: [
        { label: "Towns ranked", value: "~29,700 (not just ~900 metros)" },
        { label: "Growth-data coverage fix", value: "~3% → ~47% of rows" },
        { label: "Ranking factors", value: "9, weighted + user-prioritized" },
        { label: "Test coverage added", value: "19 pytest + 8 RTL tests" },
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
