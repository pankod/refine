# Prisma Compute Config

Use this reference when creating or updating `prisma.compute.ts`, especially for monorepos, multi-app deploys, reusable framework defaults, env inputs, ports, entrypoints, or build settings.

`prisma.compute.ts` is not required for every deploy. A simple app can deploy with `@prisma/cli app deploy --framework ... --entry ... --http-port ... --env ...`. The config file exists to make those app-level defaults typed and repeatable.

For monorepos or multi-app repositories, use `prisma.compute.ts`: it is the practical way to tell Compute which app target lives at which `root` and which framework/entry/env defaults belong to each target.

## Generating a Config with `init`

Prefer `bunx @prisma/cli@latest init` over hand-writing a fresh single-app config. It detects the framework from the same registry deploy uses, pins `name`, `framework`, and `httpPort` (plus `entry` for Bun and Hono), previews every value with its source, offers the `@prisma/compute-sdk` devDependency for editor types, and offers the Project link. Useful flags: `--framework`, `--entry`, `--http-port`, `--name`, `--no-link`, `--json`.

`--format json` writes a dependency-free static `prisma.compute.json` instead of the TypeScript config; a later explicit `init --format ts` converts it in place when the config needs to become programmatic. `init` fails with `INIT_CONFIG_EXISTS` when any compute config already exists, never scaffolds application code, and never deploys. Multi-app monorepo configs are still written by hand.

## File Names and Discovery

The canonical file is `prisma.compute.ts`. The loader also accepts:

```text
prisma.compute.mts
prisma.compute.js
prisma.compute.mjs
prisma.compute.cjs
prisma.compute.json
```

`prisma.compute.json` is the static, dependency-free variant of the same config; it is discovered and loaded like the others.

Keep exactly one compute config file in a directory. If multiple names exist together, the CLI reports `COMPUTE_CONFIG_INVALID`.

The CLI searches from the invocation directory up to the repository or workspace boundary. Boundaries include `.git`, `pnpm-workspace.yaml`, `bun.lock`, `bun.lockb`, or `package.json#workspaces`. Config-relative paths such as `root` and `env.file` resolve from the config file directory. `--env` flag paths still resolve from the invocation directory.

When a config is discovered, its directory becomes the Compute project directory for local state: `.prisma/local.json` and `.prisma/cli/state.json` live beside that config, not necessarily inside the app root.

## Basic Shape

Import `defineComputeConfig` from `@prisma/compute-sdk/config`. The CLI aliases this helper when loading the config, so the command can evaluate the config without a local SDK install solely for runtime loading.

```typescript
import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: {
    name: "api",
    framework: "hono",
    httpPort: 8080,
    env: ".env",
  },
});
```

JavaScript configs can default-export a plain object, but prefer `prisma.compute.ts` for type checking.

Define exactly one of:

- `app` for a single deploy target
- `apps` for a monorepo or multi-app repository

Do not define both. Besides `app`/`apps`, the only other allowed top-level key is `region`: a project-level default region applied when deploy creates new apps, overridable per app and by `--region`.

## App Fields

Each app target accepts:

| Field | Meaning |
|-------|---------|
| `name` | Deployed app name. Defaults to the `apps` key, then CLI inference. |
| `region` | Compute region id used only when deploy creates a new app. Existing apps keep their current region. |
| `root` | App directory relative to the config file. Defaults to the config directory. |
| `framework` | Deploy framework: `nextjs`, `nuxt`, `astro`, `hono`, `nestjs`, `tanstack-start`, `custom`, or `bun`. |
| `entry` | Entrypoint path for Bun/Hono-style deploys, relative to the app root. |
| `httpPort` | Deployed HTTP port. Use this for fixed-port apps. |
| `env` | Dotenv file path string, or `{ file, vars }`. Paths resolve from the config directory. |
| `build` | `{ command, outputDirectory, entrypoint }`. Present means the config owns build settings for that target. |

`env` examples:

```typescript
export default defineComputeConfig({
  app: {
    framework: "nextjs",
    env: {
      file: [".env", ".env.production"],
      vars: {
        NODE_ENV: "production",
      },
    },
  },
});
```

Do not put secrets directly in committed `vars`. Keep secret values in platform env, CI secrets, or dotenv files that are intentionally managed outside version control.

`build` examples:

```typescript
export default defineComputeConfig({
  app: {
    framework: "nextjs",
    build: {
      command: "pnpm build",
      outputDirectory: ".next/standalone",
    },
  },
});
```

Use `command: null` to skip the build step only when the app root already contains the deployable artifact.

For a custom or prebuilt artifact, make the deploy target explicit:

```typescript
export default defineComputeConfig({
  app: {
    framework: "custom",
    build: {
      command: "npm run build",
      outputDirectory: "build",
      entrypoint: "handler.js",
    },
  },
});
```

`build.entrypoint` is relative to `build.outputDirectory` when an output directory is set. For Bun/Hono configs without an output directory, an entrypoint-backed build can supply the source entrypoint. Do not set both `entry` and `build.entrypoint` unless they describe the same file.

A config `build` block is accepted for every supported framework: the config-backed build types are `nextjs`, `nuxt`, `astro`, `nestjs`, `tanstack-start`, `custom`, and `bun` (`hono` builds through the `bun` strategy). Only `custom` requires one (`build.outputDirectory` and `build.entrypoint`); for the others it overrides inferred build settings.

## Monorepos and Multi-App Repos

For monorepos, put `prisma.compute.ts` at the repo or workspace root and use `apps`. This keeps project binding and local `.prisma/` state at the repo root while each app builds from its own `root`.

```typescript
import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  apps: {
    web: {
      root: "apps/web",
      framework: "nextjs",
      env: "apps/web/.env",
    },
    api: {
      root: "apps/api",
      framework: "hono",
      entry: "src/index.ts",
      httpPort: 8080,
      env: {
        file: "apps/api/.env",
        vars: {
          LOG_LEVEL: "info",
        },
      },
    },
    frontend: {
      root: "apps/frontend",
      framework: "custom",
      build: {
        command: "pnpm --filter frontend build",
        outputDirectory: "dist/server",
        entrypoint: "index.mjs",
      },
    },
  },
});
```

Target selection:

```bash
bunx @prisma/cli@latest app deploy web
bunx @prisma/cli@latest app deploy api
bunx @prisma/cli@latest app build api
bunx @prisma/cli@latest app run api --port 8080
```

If no `[app]` argument is passed, commands can infer the target from the invocation directory when it is inside a configured `root`. The deepest matching root wins. If no target is inferred from a multi-app config, a bare deploy can deploy all targets in declaration order:

```bash
bunx @prisma/cli@latest app deploy --branch feature/foo --json --no-interactive
```

Deploy-all rejects per-app overrides such as `--app`, `--framework`, `--entry`, `--http-port`, `--region`, `--env`, and `PRISMA_APP_ID`. Project, branch, production, and confirmation flags still apply to the whole run. Keep database setup in explicit database and project-env commands.

`app build` and `app run` still need one target in multi-app configs because a local build/run command cannot operate N apps at once.

Additional target rules:

- A single-entry `apps` map can deploy its only target without an argument.
- With a single `app` config, `[app]` is accepted only when it equals the configured `name`.
- `[app]` without any compute config file is a usage error.

## Precedence

Explicit flags win over config values:

- `--framework` overrides `framework`
- `--entry` overrides `entry`
- `--http-port` overrides `httpPort`
- `--region` overrides `region`
- any `--env` flag replaces all config env inputs
- `--app` and `PRISMA_APP_ID` rank above config app names

`region` is not an app selector. Config `region` and `--region` are only used when deploy creates a new app. If the selected app already exists, deploy keeps that app's existing region.

`prisma.compute.ts` never selects Workspace, Project, Branch, or production intent. Keep those in CLI flags, environment variables, `.prisma/local.json`, or CI configuration:

```bash
bunx @prisma/cli@latest app deploy api \
  --project proj_123 \
  --branch feature/foo \
  --prod \
  --yes
```

## Database Scope

The config does not declare databases. Keep database intent in `database create`, project env commands, or external automation. Read [`app-deploy-cli.md`](app-deploy-cli.md) for deploy-all, migration, and env-var guardrails.

## Relationship to `prisma.config.ts`

Do not put Compute deploy defaults in `prisma.config.ts`. Prisma ORM uses `prisma.config.ts`, while Compute uses `prisma.compute.ts`.
