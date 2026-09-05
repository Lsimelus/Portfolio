export const content = `
## Frontend — Redux store & pages

Next.js App Router, one primary page. Redux Toolkit store at \`src/lib/store.tsx\` combines 5 slices:

\`\`\`ts
configureStore({
  reducer: {
    location: locationSlice.reducer,   // src/lib/locationSlice.tsx
    progress: progressSlice.reducer,   // src/lib/progressSlice.tsx
    userInput: userInputSlice.reducer, // src/lib/userInputSlice.tsx
    userInfo: userInfoSlice.reducer,   // src/lib/userInfoSlice.tsx
    chat: chatReducer,                 // src/lib/chatSlice.tsx
  },
})
\`\`\`

| Slice | Holds | Notes |
|---|---|---|
| \`userInput\` | price, rate, term, down payment | primary mortgage inputs |
| \`userInfo\` | debt, income, email | used for affordability + magic-link lookup |
| \`progress\` | which steps are complete | gates "See Affordable Locations" until \`progress.budget && progress.loan\` |
| \`location\` | selected target location | drives the results/graphs view |
| \`chat\` | chat message history | see caveat below |

**Pages:**

- \`src/app/page.tsx\` — the whole questionnaire → results experience lives here, toggled by \`progress\` state rather than routed
- \`src/app/my-calculations/page.tsx\` (+ \`myCalculationsClient.tsx\`) — magic-link "retrieve my past calculations" page

⚠️ The chat panel wired into the page (\`ChatInterface\` in \`chatInterface.tsx\`, used by \`page.tsx\`) is still **mocked** — \`handleSend()\` returns a templated string after a fixed delay, no LLM/backend call wired up (inline \`TODO\`). \`chatBot.tsx\` is an unused "coming soon" stub.

There's a second, unused chat surface: \`AIPropertyChat.tsx\` (+ its \`FloatingChatButton\`) is a more built-out UI shell for a natural-language property assistant, not currently imported by \`page.tsx\`. Its history is worth knowing — a real AWS Bedrock (Claude) backend was built for it (\`bedrock-client.ts\`, \`property-tools.ts\`, \`tool-executor.ts\`, an \`/api/chat\` route), then **deliberately removed**: AWS account approval for Anthropic models on Bedrock was rejected at the account level regardless of credentials/endpoint/SDK used. Rather than keep fighting that, the Bedrock integration was stripped out entirely and the component's copy was updated to honestly say "not connected yet" instead of silently failing.

---

## Backend — FastAPI + PostgreSQL

Separate repo, deployed at \`fastapi-postgres-gamma.vercel.app\`. Frontend talks to it only via \`src/constants/url.tsx\` (\`API_BASE_URL = NEXT_PUBLIC_API_BASE_URL\`, defaults to \`http://127.0.0.1:8000\` locally). This section is condensed and cross-checked against the backend's own \`DATA_FLOW_DOCUMENTATION.md\` committed in the frontend repo.

### Data sources feeding the pipeline

| Type | Sources |
|---|---|
| External APIs (7) | US Census Bureau, Bureau of Labor Statistics (BLS), FBI Crime Data, GreatSchools, NOAA, FRED, HUD |
| CSV files (15+) | 11 monthly Zillow files (home value, rent, inventory, growth forecast, ZORDI rental-competition index, sale-to-list ratio, days-on-market) + property tax by county, HOA fees by state, city↔county mapping, metro industry/type/region classifications |

### \`location_data\` table (PostgreSQL)

~550 rows (major US metro areas), 35+ columns, ~2.5 MB table / ~800 KB indexes, avg query time < 50ms.

\`\`\`sql
CREATE TABLE location_data (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    county VARCHAR(255),
    metro_name VARCHAR(255),

    -- Zillow-sourced
    median_value NUMERIC,
    median_value_bottom_tier NUMERIC,
    median_value_top_tier NUMERIC,
    median_tax NUMERIC,
    median_rent NUMERIC,
    median_fee NUMERIC,
    home_value_growth NUMERIC,
    rental_competition NUMERIC,      -- ZORDI index (0-100)
    rental_forecast NUMERIC,
    inventory_level NUMERIC,
    sale_to_list_ratio NUMERIC,
    days_on_market INTEGER,

    -- Census API
    population INTEGER,
    median_income NUMERIC,
    housing_units INTEGER,
    owner_occupied_pct NUMERIC,

    -- BLS API
    unemployment_rate NUMERIC,
    average_wage NUMERIC,

    -- FBI API/CSV
    crime_index NUMERIC,
    violent_crime_rate NUMERIC,
    property_crime_rate NUMERIC,

    home_affordability NUMERIC,

    -- metro_classifications.json lookup
    primary_industry VARCHAR(50),
    metro_type VARCHAR(50),
    region VARCHAR(50),

    -- pre-computed at write time (see below)
    investment_score NUMERIC,
    cash_flow NUMERIC,
    budget_level VARCHAR(20),         -- 'below' | 'at' | 'stretch'
    affordability_percent NUMERIC,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT unique_city_state UNIQUE (city, state)
);

CREATE INDEX idx_median_value ON location_data(median_value);
CREATE INDEX idx_state ON location_data(state);
CREATE INDEX idx_investment_score ON location_data(investment_score DESC);
CREATE INDEX idx_budget_level_score ON location_data(budget_level, investment_score DESC);
CREATE INDEX idx_region ON location_data(region);
\`\`\`

### Processing pipeline (offline ingestion → runtime query)

| Step | Module | Function | Does |
|---|---|---|---|
| 1 | \`import_data.py\` | \`import_all_data()\` | pulls all 7 APIs + 15 CSVs (~30s, one-time/periodic job) |
| 2–5 | \`csv_utils.py\` | \`get_median_home_value_from_csv()\`, \`get_median_rent_from_csv()\`, \`get_home_value_growth()\`, \`get_rental_competition_from_csv()\` | parse CSVs, extract latest month column from time-series data, join by city/state/county |
| 6–8 | \`external_apis.py\` | \`get_census_data()\`, \`get_bls_unemployment()\`, \`get_fbi_crime_data()\` | fetch + shape external API responses (~500ms/300ms/400ms each) |
| 9 | \`database.py\` | \`SessionLocal.add()\` | insert/upsert one row per metro into \`location_data\` |
| 10–11 | \`csv_utils.py\` | \`calculate_investment_score()\`, \`determine_budget_level()\` | **pre-compute** derived fields at write time instead of on every request |
| 12 | \`main.py\` | \`get_affordable_cities()\` | serves the runtime API request |

The key optimization called out in the backend's own docs: \`investment_score\`, \`cash_flow\`, \`budget_level\`, and \`affordability_percent\` used to be computed **client-side per request** (3–5s). Moving them to a one-time \`UPDATE location_data SET ...\` at ingestion time dropped runtime response time to 300–500ms — roughly a 10x speedup.

\`\`\`sql
UPDATE location_data SET
  investment_score = calculate_investment_score(cash_flow_score, growth_score, population_score),
  cash_flow = median_rent - estimated_monthly_payment,
  budget_level = CASE
    WHEN median_value <= low_budget THEN 'below'
    WHEN median_value <= med_budget THEN 'at'
    ELSE 'stretch'
  END,
  affordability_percent = (median_value / max_budget) * 100;
\`\`\`

### \`GET /api/affordable-locations\`

**Query params:** \`monthly_payment\`, \`down_payment\`, \`rate\`, \`years\` (budget mode, recommended) — or legacy \`max_price\` — plus \`limit\` (default 10) and \`page\` (default 1).

**Query executed** (window function — one top pick per state, ranked by score, filtered to the user's price band):

\`\`\`sql
WITH ranked_locations AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY state ORDER BY investment_score DESC) AS state_rank
  FROM location_data
  WHERE median_value BETWEEN :min_price AND :max_price
    AND median_value > 0
)
SELECT * FROM ranked_locations
WHERE state_rank = 1
ORDER BY investment_score DESC
LIMIT 4;
\`\`\`

Query time < 50ms with indexes. Response ~4KB for 4 locations, < 200ms total round trip.

\`\`\`json
{
  "locations": [
    {
      "city": "Austin", "state": "TX", "county": "Travis County",
      "median_value": 450000, "median_rent": 2200, "median_tax": 1.81,
      "home_value_growth": 5.2, "rental_competition": 85,
      "investment_score": 87, "cash_flow": 200,
      "budget_level": "at", "affordability_percent": 95,
      "population": 964254, "median_income": 78542,
      "unemployment_rate": 3.2, "crime_index": 42,
      "primary_industry": "Tech", "metro_type": "Urban", "region": "South"
    }
  ],
  "total": 36, "page": 1, "limit": 4, "has_more": true
}
\`\`\`

Other endpoints called from the frontend (\`src/constants/url.tsx\`): \`POST /api/user-info\`, \`POST /api/user-input\`, \`POST /api/auth/validate-token\`, \`POST /api/auth/resend-access-link\`, \`GET /api/user-inputs-by-email/:email\`.

**Response envelope:** every backend response is wrapped as \`{ data, meta, error }\` rather than returning the resource directly. Frontend API consumers (\`src/api/authApi.tsx\`, \`src/api/fetchData.tsx\`, and the fetch call sites in \`loan.tsx\`/\`targetLocation.tsx\`/\`affordableLocationsList.tsx\`) unwrap \`envelope.data\` before use, and read \`envelope.error.message\` on failure (the old flat \`error.detail\` shape no longer exists).

### Auth — passwordless magic link (\`src/app/my-calculations/\`)

1. User submits email → \`resendAccessLink()\` (\`src/api/authApi.tsx\`) → \`POST /api/auth/resend-access-link\` — backend emails a tokenized link
2. User clicks the link → \`extractTokenFromUrl()\` → \`validateAccessToken()\` → \`POST /api/auth/validate-token\` — backend sets an HTTPOnly session cookie, returns email + expiry
3. \`GET /api/user-inputs-by-email/:email\` — cookie-authenticated, paginated (default 20, full count in \`envelope.meta.total\`) — returns the user's saved calculation history

No password at any point; the link itself is the credential.

`;
