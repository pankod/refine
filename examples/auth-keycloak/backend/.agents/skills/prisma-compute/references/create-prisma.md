# create-prisma Compute Flow

Use this reference when creating a new app with Prisma and optionally deploying it to Prisma Compute.

Do not use `create-prisma` as the deploy path for an existing app. For existing projects, use the generated `compute:deploy` script when present, or call `bunx @prisma/cli@latest app deploy` directly.

## Reference

Useful scaffold checks:

```bash
bunx create-prisma@latest --help
bunx create-prisma@latest --version
```

Use `create-prisma@latest` for new-project scaffolding.

## Supported Templates

`create-prisma@latest` scaffolds `hono`, `elysia`, `nest`, `next`, `svelte`, `astro`, `nuxt`, `tanstack-start`, and `turborepo`.

Integrated `--deploy` support applies to `hono`, `elysia`, `nest`, `next`, `astro`, `nuxt`, `tanstack-start`, and `turborepo`. For `turborepo`, the generated config target is usually `api`.

The scaffold template name is `nest`, but the Compute deploy framework/config key is `nestjs`.

`svelte` is scaffold-only for Compute because `@prisma/cli app deploy --framework` has no `svelte` key.

## Basic Commands

Interactive creation:

```bash
bunx create-prisma@latest
```

Non-interactive scaffold only:

```bash
bunx create-prisma@latest \
  --name my-api \
  --template hono \
  --provider postgresql \
  --no-install \
  --no-generate \
  --no-migrate-and-seed \
  --no-deploy
```

Create and deploy a supported template:

```bash
bunx create-prisma@latest \
  --name my-api \
  --template hono \
  --provider postgresql \
  --deploy
```

## PostgreSQL and Database Behavior

With PostgreSQL, no explicit `--database-url`, and no `--no-prisma-postgres`, the Compute flow can create:

- a Prisma Compute project
- a `main` Prisma Postgres database on the `main` branch
- a `.env` file containing `DATABASE_URL`
- an initial Compute deployment with env vars loaded from `.env`

`create-prisma` is the new-project path. If the user needs a later preview branch deploy, use the generated `compute:deploy` script or `@prisma/cli app deploy --branch <git-name>` after the app exists. Keep branch names aligned across `app deploy --branch`, `database create --branch`, and `project env ... --branch`.

For unattended local tests, pass `--no-prisma-postgres` unless you intentionally want provisioning:

```bash
bunx create-prisma@latest \
  --name smoke-app \
  --template hono \
  --provider postgresql \
  --no-prisma-postgres \
  --database-url "postgresql://USER:PASSWORD@HOST:PORT/DB" \
  --no-deploy
```

Do not deploy placeholder database URLs. If `DATABASE_URL` came from a placeholder default, omit it from deploy env and ask the user for a real production database.

## Generated Deploy Script

When the deploy flow is selected, `create-prisma` can add:

```json
{
  "scripts": {
    "compute:deploy": "bunx @prisma/cli@latest app deploy --prod --yes ..."
  }
}
```

Use the actual generated script from `package.json`; do not reconstruct it from memory. The script redeploys app code using generated flags and/or `prisma.compute.ts`. It does not create a new project, create a new database, run migrations, or seed data. If a scaffolded project does not have `compute:deploy`, use `@prisma/cli app deploy` directly.

Inspect the generated `package.json`, `prisma.compute.ts`, and README before editing deploy behavior.

## Generated Files to Preserve

Preserve generated framework runtime files and `prisma.compute.ts` unless you are intentionally changing the deploy target. For framework-specific deploy/runtime details, read [`frameworks.md`](frameworks.md).

All Prisma 7 scaffolds:

- use `prisma.config.ts`
- load `dotenv/config` where the runtime supports it
- generate Prisma Client into a template-local path such as `src/generated/prisma`
- use `@prisma/adapter-pg` with a `DATABASE_URL` connection string for PostgreSQL

## Addon Notes

`create-prisma` supports `--skills`, `--mcp`, and `--extension`. Those are separate from Compute deployment. Do not imply that enabling skills or MCP deploys the app.

## Failure Handling

If `--deploy` is explicit and setup cannot authenticate, cannot run the Platform CLI, or cannot complete the integrated deploy, report that deploy failed and keep the scaffolded project. Do not delete the user's files.
