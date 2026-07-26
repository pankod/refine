# schema-contract-mapping

How v6 MongoDB schema concepts map onto Prisma Next's contract model.

## Priority

HIGH

## Why It Matters

Prisma Next does not consume the v6 `schema.prisma` as-is: the schema becomes a *contract*
(authored in PSL or TypeScript via the contract builder), and several v6 MongoDB idioms have
different — or deliberately absent — equivalents. Translating mechanically without knowing
the mapping produces contracts that fail verification or, worse, silently change collection
addressing.

## The mapping

| v6 concept | Prisma Next equivalent | Notes |
|------------|------------------------|-------|
| `datasource db { provider = "mongodb" }` + `url = env(...)` ([v6 docs](https://www.prisma.io/docs/orm/overview/databases/mongodb#example)) | `defineConfig` from `@prisma-next/mongo/config` wiring the mongo family/target/adapter/driver descriptors | Next selects MongoDB by importing the `@prisma-next/mongo` façade, not by a provider string in the schema; `prisma-next init` accepts `mongodb` as a target name |
| `@id @default(auto()) @map("_id") @db.ObjectId` ([using ObjectId](https://www.prisma.io/docs/orm/overview/databases/mongodb#using-objectid)) | ObjectId-typed id field in the Next contract (PSL or TS builder) | Verify the exact attribute surface against the installed Next version's `prisma-next-contract` skill — the contract builder also exposes `index` and `valueObject` |
| Composite (embedded) types — MongoDB-only in v6 ([composite types](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types)) | Value objects / embedded shapes in the Next contract (`valueObject` in the Mongo contract builder) | Same conceptual role: documents embedded in a parent document |
| Model names address the client (`prisma.user`) | **Collection storage names** address the ORM: `db.orm.users`, i.e. the `@@map(...)` name or the lowercased model name — not `db.orm.User` | prisma-next `skills/prisma-next/SKILL.md`, `skills/prisma-next-quickstart/SKILL.md`; the most common porting mistake |
| Indexes declared in schema, applied by `db push` | Indexes are contract-declared and applied through migrations (`createIndex`/`dropIndex` factories) | See `migrations-mapping.md` |
| No native polymorphism | No schema-layer polymorphism on Mongo either: `@@base`/`@@discriminator` are SQL-only in Next; model an explicit `discriminator` field | prisma-next `skills/prisma-next-contract/SKILL.md` |

## Bad

```typescript
// Ported from v6 and addressed by model name:
const user = await db.orm.User.first(); // undefined — Mongo ORM keys are storage names
```

## Good

```typescript
// Mongo ORM keys are collection storage names (@@map or lowercased model name):
const user = await db.orm.users.first();
```

## Environment requirements

Prisma Next's Mongo target requires MongoDB 8.0+ and `mongodb@^7` installed by the user as a
peer dependency (prisma-next `CHANGELOG.md`, 0.11→0.12). v6 supports older MongoDB servers,
so check the server version before planning a migration.

## References

- [v6 MongoDB schema documentation](https://www.prisma.io/docs/orm/overview/databases/mongodb)
- [v6 composite types (MongoDB-only)](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types)
- Prisma Next contract skill (`skills/prisma-next-contract`) in the prisma-next repository — authoritative for the Next side
