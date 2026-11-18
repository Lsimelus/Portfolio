/** Public case study: REAL Estate Calculator. Rendered as Markdown on /projects/real-calc. */
export const content = `
## The problem

Home buyers ask two questions — *what can I afford?* and *where should I buy?* — but most calculators answer only the first, with a single number. Real Calc answers both: it turns a budget into a clear monthly picture, then ranks real US towns that fit it.

## What I built

- **Budget-first questionnaire** (Next.js + Redux Toolkit) leading to a **Mortgage Summary**: where each payment goes, rent-vs-buy break-even, and loan and equity over time, including when PMI drops off.
- **Location Explorer**: filter by up to 3 states, prioritize up to 2 factors (affordability, growth, rental yield, taxes, safety, disaster risk), pin favorites, use your current location, and see "reach picks" just over budget.
- **FastAPI + PostgreSQL backend** that ranks ~29,700 US towns on up to 9 weighted factors, combining Census, BLS, FRED, Zillow, FBI and FEMA data.

## The hard parts

- **Thin data.** Zillow publishes market data for only ~900 metros by name. Mapping each town's county to its metro area raised real growth-data coverage from ~3% to ~47% of towns.
- **Honest scores.** When a town has no real data for a factor, the app says "N/A" rather than showing a neutral score that looks real.
- **A data source disappeared mid-project.** FEMA retired its National Risk Index download; I found and verified a public replacement instead of dropping disaster risk.

## Quality

One GitHub Actions workflow checks both repos on every change: type checks, Jest and React Testing Library, Playwright end-to-end tests, dependency audits, and the backend's pytest suite — including tests for the ranking logic.
`;
