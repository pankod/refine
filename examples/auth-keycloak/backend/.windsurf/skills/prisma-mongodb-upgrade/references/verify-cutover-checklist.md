# verify-cutover-checklist

Verification checklist for a v6 → Prisma Next cutover: the data never moves — only the code does.

## Priority

CRITICAL

## Why It Matters

A v6 → Next migration is a *client and workflow* migration against the **same MongoDB
database** — there is no data export/import step, and introducing one (or pointing the new
stack at a fresh database) turns a code migration into an outage. The checklist below keeps
the cutover observable and reversible.

## Ground rules

- **No data moves.** The Next contract is authored to describe the existing collections;
  both stacks read the same database during the staged phase.
- **v6 stays runnable until cutover is verified.** Do not delete the v6 client, schema, or
  dependencies until the checklist passes.

## Checklist

1. **Same database, verified:** the Next config points at the same connection string /
   database name the v6 app uses (minus v6-specific URL parameters that the `mongodb@^7`
   driver rejects — validate the URL with the driver first).
2. **Server floor:** MongoDB server is 8.0+ (Next's requirement; v6 tolerated older).
   Confirm before authoring any contract.
3. **Contract round-trip on a copy:** on a staging copy (or `mongodb-memory-server`), emit
   the contract, run plan → migrate → verify → sign, and confirm `verify` passes against
   data copied from production shape. Verification failures here are contract-mapping bugs,
   not database problems.
4. **Index parity:** enumerate indexes on every collection (`db.collection.getIndexes()`)
   and confirm the Next contract declares the same set — v6 `db push` may have created
   indexes the new contract must re-declare, or verification and query performance will
   diverge.
5. **Validator impact assessed:** Next emits closed `$jsonSchema` validators by default;
   confirm legacy documents (extra fields, drifted shapes) pass them on the staging copy
   before applying to production.
6. **Storage-name addressing audited:** every ported call site uses collection storage
   names (`db.orm.users`), not model names (see `schema-contract-mapping.md`).
7. **Transaction inventory mapped:** grep the v6 app for `$transaction`; each hit gets a
   driver-session equivalent (the `mongodb` driver is directly available; the façade wrapper
   is expected soon — see `client-api-mapping.md`).
8. **Raw call inventory mapped:** every `$runCommandRaw` / `findRaw` / `aggregateRaw` call
   has an explicit Next-side replacement (`mongoRaw(...)` lane or pipeline builder).
9. **Staged read-only soak:** run the Next stack read-only against staging/production data
   alongside v6 and compare outputs before allowing writes.
10. **Cutover + rollback:** switch writes to Next only after the soak; keep the v6 branch
    deployable as the rollback path. Rolling back is a code rollback — the data was never
    moved.

After cutover, install and follow Prisma Next's own skills for ongoing work (see the
hand-off rule in `SKILL.md`).

## References

- [v6 MongoDB documentation](https://www.prisma.io/docs/orm/overview/databases/mongodb)
- Prisma Next migrations + queries skills — authoritative for the Next side; verified @ `a2791c5dd59d579b4b3052942ae7f8fe5e2ee852`
