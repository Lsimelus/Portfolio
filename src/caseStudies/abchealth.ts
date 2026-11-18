/** Public case study: ABChealth. Rendered as Markdown on /projects/abchealth. */
export const content = `
## The problem

A new goal-setting and community platform needed a launch page that did more than collect emails. It had to reward early members, show who invited whom, and give the team a way to see and contact everyone on the waitlist.

## What I built

- **Landing page and waitlist** (HTML, Tailwind and vanilla JavaScript) served by an **Express** app.
- **Google sign-in** with Passport, with sessions stored in **PostgreSQL** so sign-ins survive restarts and redeploys.
- **Founding-member numbers and personal referral links**, with each member's referral count shown live.
- **A publisher dashboard** limited to an allowlist of team emails: the member list, a daily email job, and a manual trigger with an audit trail of who ran it.

## The hard parts

- **Referrals happen across two visits.** Someone clicks a referral link, then may sign up days later. A small middleware saves the referral code on the visitor's session at click time (after checking its format), and sign-up turns it into a link to the referrer.
- **Numbering without races.** Founding-member numbers come from a PostgreSQL sequence, so two people signing up at the same moment can never get the same number.
- **Permissions that stay current.** A member's role is recalculated from the allowlist at every sign-in, so adding or removing a publisher takes effect on their next login. Signed-out requests get 401 and signed-in members without access get 403.
- **Safe schema changes.** The database setup runs on every start and only adds what's missing, so new columns reach production without a separate migration step.

## What's next

The email job records what it would send but isn't connected to an email provider yet — that's the one open item.
`;
