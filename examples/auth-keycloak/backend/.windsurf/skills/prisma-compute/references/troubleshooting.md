# Troubleshooting Prisma Compute

Use this reference when setup, build, deploy, env, or runtime behavior fails.

## First Checks

Run:

```bash
bunx @prisma/cli@latest --help
bunx @prisma/cli@latest app deploy --help
bunx @prisma/cli@latest auth whoami
bunx @prisma/cli@latest auth workspace list --json
```

Then inspect:

```bash
pwd
cat package.json
find .. -maxdepth 3 \( -name 'prisma.compute.ts' -o -name 'prisma.compute.mts' -o -name 'prisma.compute.js' -o -name 'prisma.compute.mjs' -o -name 'prisma.compute.cjs' \) -print
test -f .env && sed -n 's/=.*/=<redacted>/p' .env
```

Do not print unredacted secrets.

## `prisma.compute.ts` Not Picked Up

This only matters when the project is supposed to use a config-backed deploy. A simple app without `prisma.compute.ts` can still deploy with explicit `app deploy` flags.

Symptoms:

- deploy ignores the expected framework, entrypoint, port, env file, or app root
- a monorepo target such as `api` is not recognized
- local state appears in the wrong `.prisma/` directory

Check:

```bash
pwd
find .. -maxdepth 4 \( -name 'prisma.compute.ts' -o -name 'prisma.compute.mts' -o -name 'prisma.compute.js' -o -name 'prisma.compute.mjs' -o -name 'prisma.compute.cjs' \) -print
bunx @prisma/cli@latest app deploy --help
```

Fix:

- keep exactly one compute config file in the directory where it lives
- put repo-wide or monorepo config at the repository/workspace root
- run commands from inside the repo or workspace boundary so discovery can walk up to the config
- use `[app]` targets from the `apps` keys, such as `bunx @prisma/cli@latest app deploy api`
- remember that config-relative paths such as `root` and `env.file` resolve from the config file directory

## Compute Config Invalid

Symptoms:

- `COMPUTE_CONFIG_INVALID`
- `COMPUTE_CONFIG_TARGET_REQUIRED`
- `COMPUTE_CONFIG_TARGET_UNKNOWN`
- "Multiple compute config files found"

Fix:

- export `defineComputeConfig({ app: ... })` or `defineComputeConfig({ apps: ... })`
- define exactly one of `app` or `apps`
- remove unknown top-level keys
- pass a target for multi-app build/run commands, such as `app build web`
- pass an existing `apps` key for multi-app deploys, such as `app deploy api`
- remove config `build` blocks from `nuxt`, `astro`, and `nestjs` targets
- for `framework: "custom"`, set both `build.outputDirectory` and `build.entrypoint`
- when `build.outputDirectory` is set for a configurable framework, also set `build.entrypoint` if the framework needs a configured runtime entrypoint

Minimal recovery config:

```typescript
import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: {
    framework: "hono",
    entry: "src/index.ts",
    httpPort: 8080,
  },
});
```

## `create-prisma --yes` Did Not Deploy

`--yes` skips prompts and does not opt into deploy. Pass `--deploy` explicitly:

```bash
bunx create-prisma@latest --name my-api --template hono --provider postgresql --deploy
```

If the integrated deploy cannot complete, scaffold succeeds but deploy should be reported as failed.

## Accidental Prisma Postgres Provisioning

With PostgreSQL, no `--database-url`, and no `--no-prisma-postgres`, setup can provision Prisma Postgres. For local smoke tests, pass:

```bash
--no-prisma-postgres --database-url "postgresql://USER:PASSWORD@HOST:PORT/DB"
```

Use a disposable real database URL if Prisma commands need to run.

## Auth Fails

Symptoms:

- `project list` fails
- `auth whoami` fails
- browser login was not completed
- commands use the wrong workspace after a second login
- another workspace is stored locally but commands behave signed out
- `PRISMA_SERVICE_TOKEN` is missing, empty, expired, or lacks workspace/project permissions

Fix:

```bash
bunx @prisma/cli@latest auth login
bunx @prisma/cli@latest auth whoami
bunx @prisma/cli@latest auth workspace list --json
```

If multiple local OAuth workspaces exist, switch explicitly. Prefer ids from JSON:

```bash
bunx @prisma/cli@latest auth workspace use <workspace-id>
bunx @prisma/cli@latest auth whoami --json
bunx @prisma/cli@latest project list --json
```

For a human terminal, `auth workspace use` with no argument opens an interactive picker or selects the only local OAuth workspace without prompting. In non-interactive or `--json` mode, use `auth workspace use <id-or-name>` instead.

If the active workspace was logged out or its token refresh failed, the CLI intentionally stays signed out for OAuth commands rather than falling through to another cached workspace. Recover by running `auth workspace list --json` and then `auth workspace use <workspace-id>`.

To remove only one local OAuth workspace session:

```bash
bunx @prisma/cli@latest auth workspace logout <workspace-id-or-name>
# or:
bunx @prisma/cli@latest auth logout --workspace <workspace-id-or-name>
```

Use plain `auth logout` only when you want to clear all local OAuth workspace sessions.

For CI, `@prisma/cli` can authenticate with `PRISMA_SERVICE_TOKEN`:

```bash
test -n "${PRISMA_SERVICE_TOKEN:-}" && echo "PRISMA_SERVICE_TOKEN is set"
bunx @prisma/cli@latest auth whoami
bunx @prisma/cli@latest app deploy --json --no-interactive --prod --yes --env .env
```

If `PRISMA_SERVICE_TOKEN` is set and non-empty, it is the active auth source and local OAuth workspace switching is unavailable for command execution. Unset `PRISMA_SERVICE_TOKEN` before using `auth workspace use` to change local OAuth workspace context.

If `PRISMA_SERVICE_TOKEN` is set but empty, the CLI errors before trying browser-login credentials. Unset it or provide a valid workspace service token. Never echo, log, or paste the token value; only check whether it is present.

Local storage hints for debugging:

- Override auth storage with `PRISMA_COMPUTE_AUTH_FILE` when isolating tests.
- Default macOS OAuth credential file: `~/Library/Application Support/prisma/auth.json`.
- Active workspace metadata sidecar: `~/Library/Application Support/prisma/auth.context.json`.
- Project binding: `.prisma/local.json`.
- Local app/project state: `.prisma/cli/state.json`, usually next to the discovered `prisma.compute.ts`.

Do not print credential files or token values into logs.

## Project Setup Fails

Symptoms:

- `PROJECT_SETUP_REQUIRED`
- non-interactive deploy cannot choose a Project
- deploy was expected to create a Project but did not

Fix:

```bash
bunx @prisma/cli@latest app deploy --project <id-or-name> --json --no-interactive
bunx @prisma/cli@latest app deploy --create-project <name> --yes
```

Do not rely on `--yes` alone to choose Project scope. `--project`, `--create-project`, and `PRISMA_PROJECT_ID` are mutually exclusive.

## Missing or Placeholder `DATABASE_URL`

Symptoms:

- Prisma Client throws `DATABASE_URL is required`
- migration scripts fail immediately
- deploy runs but app fails on database access

Fix:

1. Put a real production-ready `DATABASE_URL` in `.env` or project env.
2. Run `prisma generate`.
3. Run migrations with the project's `db:migrate` or production migration command.
4. Redeploy with `--env .env` or project env configured.

If Prisma Client generation or runtime env loading is the concrete failure, then inspect Prisma-specific config:

```bash
test -f prisma.config.ts && sed -n '1,160p' prisma.config.ts
test -f prisma/schema.prisma && sed -n '1,220p' prisma/schema.prisma
```

Never deploy `postgresql://USER:PASSWORD@HOST:PORT/DATABASE` placeholder values.

## Wrong Branch, Env, or Database

Symptoms:

- preview deploy reads production env
- branch deploy cannot find `DATABASE_URL`
- app is deployed to the expected branch but points at the wrong database
- logs are inspected for the current app while the failing URL belongs to a different deployment id

Check:

```bash
bunx @prisma/cli@latest project show --json
bunx @prisma/cli@latest project env list --role production --json
bunx @prisma/cli@latest project env list --role preview --json
bunx @prisma/cli@latest project env list --branch feature/foo --json
bunx @prisma/cli@latest app list-deploys --json
bunx @prisma/cli@latest app logs --deployment <deployment-id> --json
```

Fix:

- pass the same `--branch <git-name>` to `app deploy`, `database create`, and branch-specific `project env` commands
- use `--role production` for production env and `--role preview` for preview-template env
- capture the deployment id and URL from deploy JSON, then inspect logs with `app logs --deployment <deployment-id>`
- `app show`, `app list-deploys`, and `app logs` do not filter by branch; capture and use the deployment id
- treat `app promote <deployment-id>` as a production action because it rebuilds with production env vars
- do not expect `prisma.compute.ts` to select Project, Branch, production, or database scope; it only supplies app deploy defaults

## Database Wiring or Schema Did Not Apply

Symptoms:

- deploy runs but the app cannot find `DATABASE_URL`
- database env vars exist but the database is empty
- a deploy-all run points multiple apps at the same branch database

Fix:

- read [`app-deploy-cli.md`](app-deploy-cli.md) `Database and Env` for the database/env guardrails
- create and assign database env vars explicitly for the intended branch/app scope
- run migrations, seed, or schema push yourself after database setup; Compute never applies schema changes for you
- for multi-app deploy-all with app-specific database isolation, create and assign those database env vars explicitly before deploy

## Next.js Standalone Missing

Error shape:

```text
Next.js build did not produce standalone output
```

Fix `next.config.ts`:

```typescript
const nextConfig = {
  output: "standalone",
}

export default nextConfig
```

Then reinstall/build if needed and deploy again.

## Nitro Entry Missing

Nuxt or TanStack Start error shape:

```text
.output/server/index.mjs
```

General fix:

- ensure the correct framework plugins are installed
- run the framework build locally
- avoid custom Nitro presets that produce a non-Node target
- use the default Nitro node server preset

For TanStack Start specifically:

- keep `nitro` in `dependencies`
- keep `import { nitro } from "nitro/vite"` in `vite.config.ts`
- keep `plugins: [tanstackStart(), nitro(), viteReact()]` or the framework-equivalent plugin order
- run `bun run build` and verify `.output/server/index.mjs` exists
- do not replace the production server with `vite preview`

Compute detection selects TanStack Start when it sees `@tanstack/react-start` or `@tanstack/solid-start`. If the Nitro entrypoint is missing after that, fix the TanStack/Nitro build output; do not assume Compute will silently use a Bun deployment.

## Bun Entrypoint Missing

Error shape:

```text
Entrypoint is required
Entrypoint file does not exist
```

Fix either:

```json
{
  "main": "src/index.ts"
}
```

or deploy with:

```bash
bunx @prisma/cli@latest app deploy --framework bun --entry src/index.ts
```

## Port Mismatch

Symptoms:

- deploy succeeds but the app is unreachable
- health checks fail
- logs show the server listening on a different port

Fix:

- read `process.env.PORT`
- pass `--http-port <port>` when the app has a fixed port
- use the generated `compute:deploy` script when it exists
- remember the `@prisma/cli app deploy` default is HTTP `3000`; generated Hono/Elysia projects usually configure `8080` through `prisma.compute.ts` or flag-backed `--http-port 8080` scripts
- use the template defaults: Hono/Elysia `8080`, Next/TanStack/Nuxt `3000`, Astro `4321`

## Public URL Smoke Test Fails

Symptoms:

- deploy command completed
- `app show` or deploy output has a URL
- the public URL times out, returns 5xx, or returns an unexpected page

Check:

```bash
curl -i https://<deployment-url>
curl -i https://<deployment-url>/health
bunx @prisma/cli@latest app logs --json
```

Fix by following the first concrete failure:

- connection timeout or 5xx: check logs, host binding, and port mapping
- unexpected status or body: verify the route path and app framework output
- local URL tested by mistake: rerun against the public deployment URL, not `localhost` or `127.0.0.1`

## Localhost Binding

Symptoms:

- deploy says the app started or the port was observed, but the public URL is unreachable
- logs show a server listening on `localhost` or `127.0.0.1`
- `app run` works locally, but the deployed app cannot receive external traffic

Why this happens:

Compute's boot watcher polls `/proc/net/tcp` and `/proc/net/tcp6` for configured ports entering `LISTEN`. That readiness signal tracks the port, not whether the app bound `127.0.0.1` or all interfaces. A loopback-only listener can therefore look ready while public ingress still cannot reach it.

Fix:

- remove hard-coded `localhost` or `127.0.0.1` server host settings
- bind on `0.0.0.0` or the framework equivalent, such as Astro `server.host: true`
- for Next.js standalone, do not deploy with `HOSTNAME=localhost`; use `HOSTNAME=0.0.0.0` if the host is overridden
- keep port and host fixes together: `0.0.0.0:<deployed-http-port>`

## Env Changes Did Not Apply

Generated `compute:deploy` scripts redeploy using the generated flags and/or `prisma.compute.ts`; they do not run migrations or seed data.

After env changes:

```bash
bunx @prisma/cli@latest project env list
bunx @prisma/cli@latest project env list --branch feature/foo
bunx @prisma/cli@latest app deploy --prod --yes --env .env
bunx @prisma/cli@latest app deploy --branch feature/foo --env .env.preview
```

If using branch-specific env, confirm the branch name and role.

## Need Logs

Runtime logs for the current app:

```bash
bunx @prisma/cli@latest app logs
```

Specific deployment:

```bash
bunx @prisma/cli@latest app logs --deployment <deployment-id>
```

Machine-readable:

```bash
bunx @prisma/cli@latest app logs --json
```

Build logs for GitHub/Console builds:

```bash
bunx @prisma/cli@latest build logs <build-id>
bunx @prisma/cli@latest build logs <build-id> --follow
bunx @prisma/cli@latest build logs <build-id> --json
```

Use `build logs` for build output keyed by a Build id from a GitHub check run, Console build page, or Management API build record. Use `app logs` for runtime logs keyed by the current app deployment or a deployment id.

Summarize relevant errors. Do not paste secrets.

## Report Unresolved CLI Issues

When a CLI failure survives the checks above, or a command crashes with `UNEXPECTED_ERROR`, report it to the Prisma team:

```bash
bunx @prisma/cli@latest feedback "app deploy crashed: <first error line>"
```

Prefer the pre-filled command from a `--json` crash envelope's `nextActions` verbatim. Anonymous; never put secrets, connection URLs, or tokens in the message.
