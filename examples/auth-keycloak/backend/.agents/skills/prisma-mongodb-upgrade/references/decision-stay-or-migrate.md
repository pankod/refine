# decision-stay-or-migrate

How to decide between migrating a MongoDB project to Prisma Next and staying on Prisma v6.

## Priority

CRITICAL

## Why It Matters

MongoDB projects cannot follow the general "upgrade Prisma" advice: Prisma 7 has no MongoDB
connector, so the forward path is Prisma Next. Advising an impossible v7 upgrade, or
silently rewriting the app onto SQL, are both serious failure modes. The encouraged path is
migrating to Prisma Next — its MongoDB support is Early Access and the Prisma team wants
early adopters' feedback — with a deliberate stay on v6 where a hard blocker applies.

## The facts the decision rests on

Prisma Next side (verified against prisma/prisma-next @ `a2791c5dd59d579b4b3052942ae7f8fe5e2ee852`;
status confirmed by the Prisma team 2026-07):

- **MongoDB support is Early Access**, actively developed, with GA planned after Postgres.
- The implementation is deep, not a stub: a full package family (ORM, typed
  aggregation-pipeline builder, raw lane, driver over the official `mongodb` package),
  first-class contract-driven migrations, and extensive tests against real in-memory MongoDB.
- **The Mongo client façade does not wrap `db.transaction(...)` yet** — multi-document
  atomicity is done through the MongoDB driver's session API, which is directly available
  (the `mongodb` package is a user-supplied peer dependency). A façade wrapper is expected;
  this skill will be updated when it merges.
- Early Access means pre-1.0 minors can carry breaking changes, with published upgrade
  recipes (e.g. 0.11→0.12 changed Mongo validator emission and made `mongodb` a
  user-supplied peer dependency). Floor: MongoDB 8.0 and `mongodb@^7`.

Prisma v6 side:

- v6 fully supports MongoDB, including transactions on replica sets — "MongoDB only allows
  you to start a transaction on a replica set. Prisma ORM uses transactions internally"
  ([replica set configuration](https://www.prisma.io/docs/orm/overview/databases/mongodb#replica-set-configuration)).
- v6 MongoDB has no Prisma Migrate; the workflow is `db push`
  ([no support for Prisma Migrate](https://www.prisma.io/docs/orm/overview/databases/mongodb#no-support-for-prisma-migrate)).

## Blocker checks before migrating

Run these checks yourself — from the codebase, not by asking the user:

- **Search the codebase for `$transaction` usage** (grep for `$transaction`). If present,
  plan the raw-driver session equivalents before migrating (see `client-api-mapping.md`) —
  or stay on v6 until the façade wrapper lands.
- **Check the MongoDB server version** (must be 8.0+ for Next; v6 tolerated older).
- **Confirm the team can absorb pre-1.0 upgrades.** Next publishes versioned upgrade recipes
  between minors; someone has to run them. For a production app, confirm the user accepts
  Early Access status before migrating.

## Bad

```text
User: "We're on Prisma 6 with MongoDB. Should we upgrade to Prisma 7?"
Agent: "Yes — here's the v7 upgrade guide. Step 1: install a driver adapter..."
```

Prisma 7 has no MongoDB connector; this migration is impossible and the SQL driver-adapter
steps corrupt a working v6 setup.

## Good

```text
User: "We're on Prisma 6 with MongoDB. Should we upgrade to Prisma 7?"
Agent: "Prisma 7 does not support MongoDB — v6 is the last classic-ORM
major for MongoDB. The path forward is Prisma Next, the successor: its MongoDB support is
Early Access and migrating is encouraged. Let me check the codebase for blockers first —
searching for $transaction usage and checking the MongoDB server version..."
```

## Stay-on-v6 hygiene

Staying is a decision, not a default-by-neglect:

- Pin `prisma` and `@prisma/client` to the latest 6.x and keep taking 6.x patches.
- Watch Prisma release notes and security advisories for the 6.x maintenance line.
- Keep the classic setup (`url = env("DATABASE_URL")` in the schema; `db push`; no SQL
  driver adapters).
- Re-evaluate when Prisma Next's MongoDB is GA, or when blockers for trying EA are resolved.

## References

- [Prisma Next repository](https://github.com/prisma/prisma-next)
- [Prisma v6 MongoDB documentation](https://www.prisma.io/docs/orm/overview/databases/mongodb)
