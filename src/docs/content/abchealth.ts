export const content = `
## Frontend

No Redux here — the portfolio listing calls this a static frontend (HTML/CSS/JS/Tailwind), and that's true for the client: \`public/index.html\` + \`public/script.js\` (vanilla JS, \`fetch\`-based) is the whole UI, plus \`public/admin.html\` for the publisher dashboard. The real depth is server-side — see below.

---

## Backend — Express + Passport + PostgreSQL

The repo is a full-stack app, not just a static site host. Entry point is \`server.js\`.

### Environment / config

Loaded via \`dotenv\` in both \`server.js\` and \`db.js\`: \`DATABASE_URL\`, \`SESSION_SECRET\`, \`APP_URL\`, \`GOOGLE_CLIENT_ID\`, \`GOOGLE_CLIENT_SECRET\`, \`GOOGLE_CALLBACK_URL\`, \`PUBLISHER_EMAILS\` (comma-separated allowlist), \`PORT\`, \`NODE_ENV\`.

### \`db.js\` — connection pool & schema bootstrap

Single \`pg.Pool\` (SSL, \`rejectUnauthorized: false\` for the hosted Postgres provider), exported and shared by every module that queries the database (\`auth-routes.js\`, \`passport-config.js\`, \`publisher-routes.js\`, \`email-job.js\`). \`pool.on('error', ...)\` calls \`process.exit(-1)\` on an unexpected idle-client error — a crash-and-restart strategy rather than reconnect logic.

\`initDB()\` runs once on boot and is idempotent (\`CREATE TABLE IF NOT EXISTS\`, \`ADD COLUMN IF NOT EXISTS\`) so it doubles as the migration path for columns added after the table already existed in production:

\`\`\`sql
CREATE TABLE IF NOT EXISTS abc_users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    name VARCHAR(255),
    avatar_url TEXT,
    founding_member_number INTEGER UNIQUE,
    referral_code VARCHAR(16) UNIQUE,
    referred_by INTEGER REFERENCES abc_users(id),
    role VARCHAR(20) NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- backfill columns for tables created before referral tracking existed
ALTER TABLE abc_users ADD COLUMN IF NOT EXISTS founding_member_number INTEGER UNIQUE;
ALTER TABLE abc_users ADD COLUMN IF NOT EXISTS referral_code VARCHAR(16) UNIQUE;
ALTER TABLE abc_users ADD COLUMN IF NOT EXISTS referred_by INTEGER REFERENCES abc_users(id);
ALTER TABLE abc_users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'viewer';

CREATE SEQUENCE IF NOT EXISTS abc_founding_member_seq START 1;

CREATE TABLE IF NOT EXISTS abc_email_jobs (
    id SERIAL PRIMARY KEY,
    triggered_by VARCHAR(50) NOT NULL,
    recipient_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

A third table, \`abc_session\`, is created separately by \`connect-pg-simple\` (\`createTableIfMissing: true\`) to persist Express sessions.

### \`server.js\` — middleware stack, in order

\`\`\`
1. cors({ origin: APP_URL, credentials: true })
2. express.json() / express.urlencoded({ extended: true })
3. express-session, store = connect-pg-simple(pool, table 'abc_session')
     cookie: 30-day maxAge, httpOnly, secure only when NODE_ENV === 'production'
4. passport.initialize() / passport.session()
5. captureReferrer            — reads ?ref=CODE off any request, stashes on req.session
6. /auth                       → auth-routes.js
7. /api/publisher               → publisher-routes.js (role-gated inside the router)
8. express.static('public')     — landing page + admin.html
9. GET /                        → public/index.html
10. GET /api/health              → { status, message, timestamp }
11. 404 handler                  → { error: 'Route not found' }
12. Error handler (4-arg)        → logs err.stack, 500 { error: 'Something went wrong!' }
\`\`\`

On successful \`app.listen\`, \`server.js\` also calls \`scheduleEmailGenerationJob()\` to arm the cron job (see below) — the job schedule is tied to process uptime, not a separate worker.

### Auth — Google OAuth via Passport (\`passport-config.js\`)

\`passport.serializeUser\` stores just the numeric \`id\` in the session; \`deserializeUser\` re-fetches the safe columns (\`id, google_id, email, name, avatar_url, founding_member_number, referral_code, role\`) on every authenticated request.

The \`GoogleStrategy\` verify callback does all the real work:

1. Look up \`SELECT * FROM abc_users WHERE google_id = $1\`
2. **Existing user** → \`UPDATE ... SET email, name, avatar_url, role WHERE google_id = $5\` (role is recomputed every login, so adding/removing someone from \`PUBLISHER_EMAILS\` takes effect on next sign-in, not retroactively)
3. **New user**:
   - \`SELECT nextval('abc_founding_member_seq')\` → sequential founding-member number, assigned atomically by Postgres (no race condition even under concurrent signups)
   - \`generateReferralCode()\` = \`crypto.randomBytes(4).toString('hex')\`, retried up to 5x on a uniqueness collision (\`SELECT 1 FROM abc_users WHERE referral_code = $1\`)
   - if \`req.session.referrerCode\` was set by the \`captureReferrer\` middleware earlier in the request chain, resolve it to the referrer's \`id\` → \`referred_by\`
   - \`roleForEmail(email)\` — checks the email against the \`PUBLISHER_EMAILS\` env allowlist (case-insensitive) → \`'publisher'\` or \`'viewer'\`
   - single \`INSERT INTO abc_users (google_id, email, name, avatar_url, founding_member_number, referral_code, referred_by, role) VALUES (...) RETURNING *\`

\`\`\`
Browser → GET /auth/google  (passport.authenticate, scope: profile+email)
        → Google consent screen
        → GET /auth/google/callback  (passport verifies, runs callback above)
        → redirect '/'  (failureRedirect '/?login=failed')
\`\`\`

### Referral attribution (\`capture-referrer.js\`)

Runs on *every* request, before the route table. If \`req.query.ref\` matches \`/^[a-f0-9]{1,16}$/i\` (defends against session-poisoning via garbage query strings), it's written to \`req.session.referrerCode\` and survives until the visitor eventually signs up — at which point \`passport-config.js\` reads it and resolves it to a \`referred_by\` foreign key. This is why the middleware has to run before \`/auth\`, not inside the auth route itself: the \`?ref=\` link and the eventual signup are two separate requests, potentially days apart.

### \`GET /auth/me\` — session check + referral count

\`\`\`sql
SELECT COUNT(*)::int AS count FROM abc_users WHERE referred_by = $1
\`\`\`

Returns \`{ authenticated, user: { id, name, email, avatarUrl, foundingMemberNumber, referralCode, referralCount, role } }\` — the referral count is computed live on every call rather than stored/cached on the user row.

### Role gate (\`require-role.js\`)

\`\`\`js
function requireRole(role) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Sign in required.' });
    if (req.user.role !== role) return res.status(403).json({ error: 'You do not have permission to do this.' });
    next();
  };
}
\`\`\`

Mounted once at the top of \`publisher-routes.js\` (\`router.use(requireRole('publisher'))\`), so every route in that router inherits the gate — 401 unauthenticated vs 403 wrong-role is distinguished correctly.

### Publisher dashboard (\`publisher-routes.js\`, all behind \`requireRole('publisher')\`)

| Route | Does |
|---|---|
| \`GET /api/publisher/users\` | full member list, \`ORDER BY founding_member_number ASC NULLS LAST\` |
| \`POST /api/publisher/email-job/run\` | manually triggers \`runEmailGenerationJob('manual:<email>')\` — the triggering publisher's email is stamped into the job record |
| \`GET /api/publisher/email-job/history\` | last 50 rows from \`abc_email_jobs\`, newest first |

### Email job (\`email-job.js\`)

\`\`\`js
async function runEmailGenerationJob(triggeredBy = 'schedule') {
  const { count } = (await pool.query(
    'SELECT COUNT(*)::int AS count FROM abc_users WHERE email IS NOT NULL'
  )).rows[0];
  // ⚠️ stub: logs what it *would* do, no ESP integration yet
  console.log(\`[email-job] Running (triggered by: \${triggeredBy}). Would generate emails for \${count} members.\`);
  return (await pool.query(
    \`INSERT INTO abc_email_jobs (triggered_by, recipient_count, status) VALUES ($1, $2, 'completed') RETURNING *\`,
    [triggeredBy, count]
  )).rows[0];
}
\`\`\`

\`scheduleEmailGenerationJob()\` uses \`node-cron\` with \`'0 8 * * *'\` (daily, 8:00 AM server time) and is started once from \`server.js\` on boot. Both the cron path and the manual publisher-triggered path funnel through the same \`runEmailGenerationJob()\`, so the audit trail in \`abc_email_jobs.triggered_by\` distinguishes \`'schedule'\` from \`'manual:<publisher-email>'\`. Wiring an actual ESP (SendGrid/Postmark/etc.) is the one clearly-flagged TODO in the whole backend.

### Error handling

Two catch-alls at the bottom of \`server.js\`: an unmatched-route 404 JSON handler, then a 4-arg Express error handler that logs \`err.stack\` server-side and returns a generic \`500 { error: 'Something went wrong!' }\` — no stack traces or internals leak to the client.

`;
