export const content = `
## Frontend — Redux store & pages

Next.js App Router, one primary page. Redux Toolkit store at \`src/lib/store.tsx\` combines 3 slices:

\`\`\`ts
configureStore({
  reducer: {
    location: locationSlice.reducer,   // src/lib/locationSlice.tsx
    progress: progressSlice.reducer,   // src/lib/progressSlice.tsx
    userInput: userInputSlice.reducer, // src/lib/userInputSlice.tsx
  },
})
\`\`\`

| Slice | Holds | Notes |
|---|---|---|
| \`userInput\` | price, rate, term, down payment, budget inputs | primary mortgage inputs, budget-first flow |
| \`progress\` | which steps are complete | gates the results view until budget + loan steps are done |
| \`location\` | selected/best-known city's median value + rent | shared between Location Explorer and Mortgage Summary's Rent vs Buy graph, so both always compare the same city's price against its own rent instead of mixing a searched city's rent with the user's separate budget price |

**Page:** \`src/app/page.tsx\` — the whole questionnaire → Mortgage Summary → Location Explorer experience lives here, toggled by \`progress\` state rather than routed.

⚠️ An earlier AI chat feature (a mocked chat panel, plus a second unused "AIPropertyChat" shell with a real AWS Bedrock/Claude backend behind it) and a passwordless magic-link "saved calculations" flow (\`userInfoSlice\`, \`my-calculations/\` page) were both built earlier and then **fully removed** - the Bedrock integration because AWS account approval for Anthropic models was rejected at the account level regardless of setup, and the auth flow because nothing in the app actually used it (the save-to-backend calls it depended on, \`POST /api/user-info\` / \`POST /api/user-input\`, were never wired to the UI either). Both were deleted rather than left half-working.

### Location Explorer (\`locationExplorer.tsx\`)

The main feature: search and rank real US locations within a budget.

- **Multi-state filter** (up to 3 states) + **target city search**, run as two independent effects so typing a city name doesn't re-fetch on every priority-button click and vice versa
- **Prioritize up to 2 factors**: Affordability, Growth, Rental Yield, Low Taxes, Safety, Low Disaster Risk - each maps to a real weighted factor in the backend's ranking, with a data-source tooltip on hover
- **"Use my current location"**: reverse-geocodes the browser's coordinates (via a backend-proxied Census API call - the browser can't call Census directly, no CORS) straight to the exact city at that point, not just the containing state, then targets it like a manual search
- **Favorites**: up to 3 pinned cities, persisted to \`localStorage\`, always shown above the results regardless of current filters, fetched with real live data via the same \`include_city\` force-include mechanism used for a directly-searched city
- **Reach picks**: guarantees at least one "great area, worth a stretch" result 50-200k over budget instead of only ever showing in-budget matches
- **City Details modal** (\`cityDetailsModal.tsx\`): fetches full enriched data (Census/BLS demographics, FEMA hazard breakdown) for one city on demand, only when opened

### Mortgage Summary (\`mortgageSummaryCard.tsx\`)

Shown before Location Explorer, with three tabs (pie chart shown by default):
- **Where Your Payment Goes** - principal/interest/tax/insurance pie chart
- **Rent vs Buy** - break-even year, using the same city's real price when Location Explorer has surfaced one (via the \`location\` slice), falling back to a generic 70%-of-mortgage rent estimate before any location is picked
- **Loan & Equity Over Time** - stacked balance/interest/principal area chart, with a PMI-removal milestone callout (when 20% equity is reached)

---

## Backend — FastAPI + PostgreSQL

Separate repo, deployed at \`fastapi-postgres-gamma.vercel.app\`. Frontend talks to it only via \`src/constants/url.tsx\` (\`API_BASE_URL = NEXT_PUBLIC_API_BASE_URL\`, defaults to \`http://127.0.0.1:8000\` locally).

### Data sources

| Type | Sources |
|---|---|
| Live external APIs | US Census Bureau (geocoding + demographic enrichment), Bureau of Labor Statistics (unemployment), FRED (mortgage rate) |
| Static/cached datasets | 11 monthly Zillow CSVs (home value, rent, growth forecast, inventory, sale-to-list, days-on-market, ZORDI rental-competition index), FBI Crime Data Explorer CSV, FEMA National Risk Index (fetched once from a public ArcGIS FeatureServer, cached to JSON - the classic static-file download was retired), a Census CBSA county→metro crosswalk (also built once, cached to JSON) |

A few integrations that were built but never functional in production were removed outright rather than left as silent no-ops: an unmounted 478-line analytics-tracking router with no matching DB tables, a NOAA climate API call that always returned \`None\` (missing API key, plus a hardcoded FIPS code unrelated to the actual city being queried), and stub functions for FBI/GreatSchools/HUD/Redfin that were never actually implemented past a "not available" placeholder.

### \`location_data\` table (PostgreSQL / Neon)

~29,700 rows - individual US towns, not just major metros. Zillow's own CSVs only cover ~900 metro areas by name, so most rows get their market data (growth, rent, etc.) by resolving each town's *county* to its containing metro via the CBSA crosswalk, rather than by matching the town's own name directly. That single fix raised real growth-data coverage on this table from ~3% to ~47% of rows.

\`\`\`sql
CREATE TABLE location_data (
    id SERIAL PRIMARY KEY,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    county VARCHAR(100),
    median_value FLOAT,
    median_tax FLOAT,
    median_rent FLOAT,
    median_fee INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE INDEX idx_state_city ON location_data(state, city);
\`\`\`

Deliberately thin - growth, rental yield, tax rate, disaster risk, and crime rate are *not* stored columns. They're resolved live per-request from the CSVs/crosswalk/FEMA cache in \`csv_utils.py\`, joined against whichever candidate pool a given \`/api/rank-locations\` call is actually scoring. An earlier design (documented in an old \`database_schema.sql\`, since deleted) tried to normalize this into 12 separate tables with pre-computed \`investment_score\`/\`cash_flow\`/\`budget_level\` columns; it was abandoned before ever being wired to the live app and removed as dead code.

### \`GET /api/rank-locations\` - the core ranking endpoint

Scores every in-budget candidate on up to 9 factors - affordability, growth, rental yield, tax burden, HOA burden, market competitiveness, inventory, speed-to-close, safety, and disaster risk - each min-max normalized *within the current candidate pool* (not a fixed universal scale), then combined into one weighted \`match_score\`.

Two things the response makes explicit rather than papering over:

- **\`score_data_available\`**: a per-factor boolean flag. When a factor's real data doesn't exist for a candidate (e.g. Zillow has no growth forecast for a tiny town with no metro match), the score falls back to a neutral 0.5 rather than a fabricated-looking percentage - and the frontend shows "N/A" for that factor instead of a made-up number.
- **Missing-data penalty**: if the user explicitly prioritized a factor (weighted it), candidates missing real data on that specific factor get a small score penalty relative to candidates with real data - so "prioritize Growth" actually favors towns Zillow has real growth numbers for, not towns that happen to tie at the neutral fallback.

\`\`\`json
{
  "data": {
    "max_price": 400000,
    "locations": [
      {
        "state": "california", "city": "los-angeles", "county": "los-angeles",
        "median_value": 968028.19, "median_rent": 2927.26,
        "home_value_growth": -0.6, "rental_yield": 0.036,
        "crime_rate_per_1000": 34.2,
        "disaster_risk_score": 100, "disaster_risk_rating": "Very High",
        "match_score": 72.5,
        "score_breakdown": { "affordability": 0.4, "growth": 0.5, "safety": 0.5, "...": "..." },
        "score_data_available": { "affordability": true, "growth": true, "...": "..." },
        "reach_pick": false
      }
    ]
  },
  "meta": null,
  "error": null
}
\`\`\`

Other endpoints the frontend uses: \`GET /api/items/{state}/{city}\` (full location data, \`?enrich=true\` adds Census/BLS), \`GET /api/cities/{state}\`, \`GET /api/median-values\`, \`GET /api/geocode-state\` (reverse geocode coordinates → state/county/city), \`GET /api/mortgage-rate\`, \`GET /api/affordable-locations\` (price-sorted, no scoring). The backend still exposes \`POST /api/user-info\`/\`user-input\`/\`mortgage-calculation\` and the \`POST /api/auth/*\` session lookup guarding \`GET /api/user-inputs-by-email/{email}\`, but the frontend no longer calls them since the saved-calculations flow was removed. That lookup endpoint originally had no auth check at all (anyone who knew or guessed an email could read someone else's saved mortgage data); it was locked down before the flow was retired.

**Response envelope:** every backend response is wrapped as \`{ data, meta, error }\` rather than returning the resource directly.

### Testing & CI

Both repos are exercised by one GitHub Actions workflow (\`real-calc-client/.github/workflows/deploy-checks.yml\`, since Vercel's own git integration already handles deploy-on-push separately): frontend typecheck + jest + \`npm audit\` + Playwright e2e, and a cross-repo checkout of \`fastapi-postgres\` running its pytest suite (\`pip-audit\` informationally, real tests gating the deploy-ready check) - including dedicated coverage for the ranking function's missing-data penalty, \`include_city\` force-include behavior, and reach-pick logic, added alongside a matching React Testing Library suite for Location Explorer's search/favorites/geolocation-lock behavior.
`;

/** Short, recruiter-facing write-up for the public case-study page. */
export const caseStudy = `
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
