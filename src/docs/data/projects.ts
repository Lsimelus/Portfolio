import { content as realCalcContent } from "../content/real-calc";
import { content as abchealthContent } from "../content/abchealth";

export interface ProjectDoc {
  slug: string;
  name: string;
  tag: string;
  color: string;
  summary: string;
  repoUrl?: string;
  liveUrl?: string;
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
    content: abchealthContent,
  },
];
