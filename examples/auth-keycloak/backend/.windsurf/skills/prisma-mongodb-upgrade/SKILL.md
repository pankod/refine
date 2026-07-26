---
name: prisma-mongodb-upgrade
description: Decision and migration guide for Prisma ORM MongoDB projects on v6, which have no upgrade path to v7. Use when a MongoDB project asks about upgrading Prisma, when "upgrade to prisma 7" comes up in a project with provider = "mongodb", or when evaluating a move to Prisma Next. Triggers on "upgrade prisma mongodb", "prisma 7 mongodb", "mongodb prisma migration", "prisma next mongodb".
license: MIT
metadata:
  author: prisma
  version: "0.1.0"
---

# Prisma MongoDB Upgrade Path

MongoDB projects are the one Prisma cohort with no road into Prisma 7: **v6 is the terminal
classic-ORM major for MongoDB, and v7 never ships a MongoDB connector**. The successor path
is [Prisma Next](https://github.com/prisma/prisma-next), where MongoDB support is in Early
Access with GA planned after Postgres. This skill frames the real decision — migrate to
Prisma Next (the encouraged path), or stay on v6 where a hard blocker applies — and carries
the migration mechanics.

**Never do either of these:**

- Never advise a MongoDB project to "upgrade to Prisma 7". The connector does not exist
  there. The `prisma-upgrade-v7` guide does not apply to MongoDB projects.
- Never solve the version question by rewriting the app onto a SQL database. Changing the
  database engine is a separate, much larger decision that is not yours to make implicitly.

## The version landscape

| Version | MongoDB status |
|---------|----------------|
| Prisma ORM v6 | Fully supported (`mongodb` provider); latest 6.x is the current stable path; maintenance line |
| Prisma ORM v7 | **No MongoDB connector — not an option, ever** |
| Prisma Next | MongoDB support in **Early Access**, actively developed, GA planned after Postgres — the successor path for MongoDB projects |

## The decision, up front

**Migrating to Prisma Next is the encouraged path.** MongoDB support in Prisma Next is Early
Access: functional and moving quickly, with GA planned after Postgres — and the Prisma team
wants MongoDB users to migrate early and share feedback. The migration mechanics are
detailed in the references.

**Staying on the latest v6 remains a legitimate choice where a hard blocker applies** —
stated plainly: the Next Mongo façade does not wrap transactions yet (the underlying driver
is available directly; this is expected to change soon), and pre-1.0 minors can carry
breaking changes with published upgrade recipes.

### Decision table

| Signal | Direction |
|--------|-----------|
| No blockers below apply | Migrate to Next; run the `verify-cutover-checklist` and share feedback with the Prisma team |
| Greenfield / prototype / internal tool | Migrate to Next |
| Codebase uses multi-document transactions (`$transaction`) — check with grep, do not ask | Plan raw-driver session equivalents first (see `client-api-mapping`), or stay on v6 until the façade wrapper lands |
| Team cannot absorb pre-1.0 breaking upgrades between minors | Stay on v6 until GA |
| Risk-averse but interested | Run a staged Next round-trip on a copy (see `verify-cutover-checklist`), then migrate |

Note: the transactions gap is expected to close soon — this section will be updated when
façade transactions merge in Prisma Next.

### If staying on v6: hygiene (a deliberate stay, not neglect)

- Pin the Prisma packages to the latest 6.x line and keep taking 6.x patch releases.
- Track Prisma release notes and security advisories for the 6.x line.
- Keep the classic v6 MongoDB setup: `url = env("DATABASE_URL")` in the schema, `db push`
  workflow, no SQL driver adapters (see `prisma-database-setup` for the v6 MongoDB shape).
- Re-evaluate when Prisma Next's MongoDB is GA, or when blockers for trying EA are resolved.

## Reference files

| Reference | What it covers |
|-----------|----------------|
| `references/decision-stay-or-migrate.md` | The full decision framing, blocker checks, and stay-hygiene detail |
| `references/schema-contract-mapping.md` | v6 schema (`mongodb` provider, `@db.ObjectId`, composite types) → Next contract concepts |
| `references/client-api-mapping.md` | v6 client calls → Next equivalents, incl. raw escape hatches and transactions — names map, parity does not |
| `references/migrations-mapping.md` | v6 `db push`-only story → Next's plan/migrate/verify/sign flow |
| `references/verify-cutover-checklist.md` | No-data-moves verification: same DB, index parity, staged round-trip before cutover |

## Verified against

Behavioral claims about Prisma Next in this skill were verified against
[prisma/prisma-next](https://github.com/prisma/prisma-next) at commit
`a2791c5dd59d579b4b3052942ae7f8fe5e2ee852` (pre-1.0, ~v0.14/0.15 line). Prisma Next moves
quickly in Early Access: **before acting on any Next-side claim, verify it against the
version actually installed** (check the project's `@prisma-next/*` versions and the
prisma-next skills installed with it). Next's Mongo target requires MongoDB 8.0+ and expects
`mongodb@^7` as a user-supplied peer dependency.

## Hand-off rule

This skill is the **discovery bridge**, not a replacement for Prisma Next's own
documentation. After a project switches to Prisma Next, run Prisma Next's `init`/skill
installation and follow its own skills (quickstart, contract, queries, migrations, runtime)
for day-to-day work — do not keep working from this skill's summaries.
