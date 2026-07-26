# migrations-mapping

How the v6 MongoDB "no migrations" story maps onto Prisma Next's first-class migration flow.

## Priority

HIGH

## Why It Matters

This is the largest workflow change in the migration — in v6, MongoDB explicitly has no
Prisma Migrate, while in Prisma Next MongoDB participates in the full migration lifecycle.
Teams porting a `db push` habit into Next without understanding the plan/verify/sign flow
will fight the tooling or bypass its safety rails.

## v6: `db push` only

MongoDB on v6 has no Prisma Migrate and no plans to add it — "MongoDB projects do not rely
on internal schemas" ([no support for Prisma Migrate](https://www.prisma.io/docs/orm/overview/databases/mongodb#no-support-for-prisma-migrate)).
The workflow is `prisma db push` to sync indexes and unique constraints, with no migration
history on disk.

## Prisma Next: first-class, contract-driven migrations (Mongo included)

Migration authoring in Next is first-class for Postgres **and Mongo** (prisma-next
`skills/prisma-next-migrations/SKILL.md`) — MongoDB is not a push-only special case:

- **Flow:** contract *emit* → diff → *plan* (writes a content-hashed migration package) →
  *migrate* (apply in graph order) → *verify* (live schema vs destination contract) →
  *sign* (advance the marker after a verify pass).
- **Mongo migration ops** come from dedicated factories: `createCollection`,
  `dropCollection`, `validatedCollection`, `setValidation`, `createIndex`, `dropIndex`,
  `collMod`, and `dataTransform` for data backfills.
- **Marker storage:** Next records migration state in a document in the
  `_prisma_migrations` collection (per space) — the same collection name family v6 users
  know from SQL, repurposed for Mongo state.
- **DDL is not transactional on Mongo:** the runner applies operations, verifies the live
  schema against the destination contract, and only advances the marker on a verify pass —
  making interrupted runs resumable rather than atomic (see Prisma Next's
  `prisma-next-migrations` skill).
- **Push-style alternative still exists:** `db update` diffs the live database against the
  contract and applies directly without writing a migration directory — the closest
  analogue to the v6 `db push` habit, at the cost of no history.
- Validators: Next emits closed `$jsonSchema` validators by default since 0.12 (prisma-next
  `CHANGELOG.md`) — collections gain schema enforcement v6 never applied.

## Bad

```text
Porting the v6 habit: run the Next equivalent of `db push` for every change in production,
accumulating no migration history, and hand-editing collections when verification fails.
```

## Good

```text
Adopt the Next lifecycle: emit the contract, plan a migration package, apply it with
migrate, let verify gate the marker, and sign. Reserve `db update` for local prototyping,
mirroring how `db push` was used on v6.
```

## References

- [v6: no Prisma Migrate for MongoDB](https://www.prisma.io/docs/orm/overview/databases/mongodb#no-support-for-prisma-migrate)
- Prisma Next migrations skill (`skills/prisma-next-migrations`) — authoritative for the Next side; verified @ `a2791c5dd59d579b4b3052942ae7f8fe5e2ee852`
