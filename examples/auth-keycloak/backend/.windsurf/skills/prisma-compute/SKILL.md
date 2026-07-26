---
name: prisma-compute
description: Prisma Compute deployment and hosting guide. Use whenever the user mentions Prisma Compute, `prisma.compute.ts`, `defineComputeConfig`, deploying or hosting a Prisma app, `@prisma/cli app deploy`, `compute:deploy`, `create-prisma --deploy`, `PRISMA_SERVICE_TOKEN`, `auth workspace`, Compute apps/deployments/build logs/domains, `@prisma/cli agent install`, `@prisma/cli feedback`, localhost vs `0.0.0.0`, deploy port binding, or framework deploy readiness for Hono, Elysia, Next.js, TanStack Start, Astro, Nuxt, Svelte, Nest, Turborepo, or custom/prebuilt artifacts.
license: MIT
metadata:
  author: prisma
  version: "1.4.1"
---

# Prisma Compute

Guide agents through Prisma Compute app creation, deployment, operations, and framework-specific deploy readiness.

## Prisma Compute CLI Surface

Use the Prisma Platform CLI for Compute app workflows:

```bash
bunx @prisma/cli@latest app deploy --help
bunx @prisma/cli@latest app --help
bunx @prisma/cli@latest build logs --help
bunx create-prisma@latest --help
```

Use `@prisma/cli@latest` for Compute app deployment. Use `create-prisma@latest` for new-project scaffolding.

## Send Feedback and Report CLI Issues

The CLI has a built-in feedback channel. Use it whenever a command crashes (`UNEXPECTED_ERROR`), a failure survives troubleshooting, or the user asks to send feedback to the Prisma team:

```bash
bunx @prisma/cli@latest feedback "app deploy crashed: <first error line>"
bunx @prisma/cli@latest feedback "love the deploy flow" --email you@example.com
```

Crash output points here on its own: `--json` crash envelopes carry the exact pre-filled command as a `recover` entry in `nextActions` (run it verbatim), and human crash output ends with a `Tell us what happened:` hint. Feedback is anonymous unless `--email` is passed and attaches only the CLI version, node version, and OS platform/arch. Never include secrets, connection URLs, or user data in the message.

## Source-of-Truth Order

Use evidence in this order when deciding what to edit or run:

1. The project's generated scripts and config, especially `prisma.compute.ts`, `compute:deploy`, framework config, and `package.json`.
2. CLI help output from `create-prisma` and `@prisma/cli`.
3. Local installed package code, generated artifacts, and type definitions.
4. Official docs.

## When to Apply

Use this skill for:

- Creating a new app that can deploy to Prisma Compute
- Deploying an existing TypeScript app to Prisma Compute
- Creating or updating a typed `prisma.compute.ts` deploy config
- Deciding whether a framework is Compute-ready
- Debugging `create-prisma --deploy`, `compute:deploy`, or `app deploy`
- Managing Compute app logs, deployments, environment variables, and domains, and listing platform branches (`branch list`; there are no branch create/remove commands)
- Inspecting GitHub/Console build logs and GitHub push-to-deploy status
- Running non-interactive deploys with browser auth, multiple stored workspaces, or Prisma service tokens
- Switching, selecting, listing, or logging out local Prisma Platform workspaces for `@prisma/cli`
- Installing or updating Prisma skills with `@prisma/cli agent install|update|status`
- Sending feedback or reporting unresolvable CLI failures with `@prisma/cli feedback`
- Programmatic deployments with `@prisma/compute-sdk` or Management API integrations

## Decision Tree

1. Existing project deployment or redeploy:
   Read [`references/app-deploy-cli.md`](references/app-deploy-cli.md).

2. Typed Compute config, monorepos, deploy targets, app roots, or build/env defaults:
   Read [`references/compute-config.md`](references/compute-config.md).

3. Framework-specific build/runtime work:
   Read [`references/frameworks.md`](references/frameworks.md).

4. New project from a scaffold:
   Read [`references/create-prisma.md`](references/create-prisma.md).

5. Programmatic deployment, SDKs, APIs, or low-level App/Deployment concepts:
   Read [`references/sdk-api.md`](references/sdk-api.md).

6. Build, auth, env, deploy, or runtime failures:
   Read [`references/troubleshooting.md`](references/troubleshooting.md).

## Rules by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Command verification | CRITICAL | `verify-` |
| 2 | Auth and workspace selection | CRITICAL | `auth-` |
| 3 | Framework readiness | CRITICAL | `framework-` |
| 4 | Runtime host and port binding | CRITICAL | `runtime-` |
| 5 | Typed Compute config | HIGH | `config-` |
| 6 | Branch, environment, and database wiring | HIGH | `env-` |
| 7 | Deploy operations | HIGH | `deploy-` |
| 8 | SDK and API automation | MEDIUM | `sdk-` |

## Quick Rules

### 1. Command Verification

- `verify-help-first` - Use CLI help output to confirm command syntax while working.
- `verify-prisma-vs-platform-cli` - Do not assume `prisma app deploy` exists in the ORM CLI; check whether the task should use `@prisma/cli`.
- `verify-generated-scripts` - Prefer the generated `compute:deploy` script when a project already has one.
- `verify-public-url` - After a real deploy, request the public deployment URL instead of trusting local or readiness-only checks.
- `verify-config-support` - Treat `prisma.compute.ts` as the typed Compute config; inspect the project's config and generated scripts before editing or deploying.
- `verify-auth-workspace-support` - Use `@prisma/cli auth workspace` commands for local workspace list/use/logout flows.

### 2. Auth and Workspace Selection

- `auth-source-precedence` - A non-empty `PRISMA_SERVICE_TOKEN` is the active auth source for commands and local OAuth workspaces are ignored for execution. If it is set but empty, the CLI should fail instead of falling back to stored OAuth.
- `auth-multi-workspace` - `auth login` can store OAuth sessions for multiple workspaces on the same machine. The active workspace pointer selects which stored OAuth grant normal commands use.
- `auth-list-before-switch` - Use `auth workspace list --json` to inspect local sessions. Agents should prefer workspace ids from JSON over names because names can be ambiguous.
- `auth-switch-explicitly` - Use `auth workspace use <id-or-name>` for non-interactive switching. Use `auth workspace use` with no argument only for an interactive picker or when exactly one local OAuth workspace exists.
- `auth-no-fallthrough` - If the active OAuth workspace is logged out or fails refresh, the CLI should not silently fall through to another cached workspace. Run `auth workspace use <id>` to choose the next workspace.
- `auth-single-workspace-logout` - Use `auth workspace logout <id-or-name>` or `auth logout --workspace <id-or-name>` to remove one local OAuth workspace session. Plain `auth logout` clears all local OAuth workspace sessions.
- `auth-service-token-switching` - While `PRISMA_SERVICE_TOKEN` is set, `auth workspace use` is unavailable because the service token is the active auth source; unset the env var to switch local OAuth workspaces. Workspace logout still only cleans local OAuth state.
- `auth-storage-awareness` - Local OAuth credentials live in the platform auth file, with workspace metadata in a sidecar context file. Project pins live in `.prisma/local.json`, and CLI app/project state lives in `.prisma/cli/state.json` near `prisma.compute.ts` when present.

### 3. Framework Readiness

- `framework-cli-first` - Evaluate deploy readiness against `@prisma/cli app deploy`, not against what `create-prisma` can scaffold.
- `framework-supported-cli-deploy` - Compute deploy supports `nextjs`, `nuxt`, `astro`, `hono`, `nestjs`, `tanstack-start`, `custom`, and `bun`.
- `framework-create-prisma-defaults-only` - `create-prisma` can provide generated defaults and `compute:deploy`, but it is not the general deploy surface for existing apps.
- `framework-build-output` - Compute needs a server entrypoint or framework artifact, not only static output.

### 4. Runtime Host and Port Binding

- `runtime-bind-all-interfaces` - Deployed servers must bind on all interfaces (`0.0.0.0` or the framework equivalent), not hard-coded `localhost` or `127.0.0.1`.
- `runtime-match-http-port` - The app must listen on the deployed HTTP port: read `process.env.PORT` when possible, or pass the matching `--http-port`.
- `runtime-readiness-port-only` - Compute readiness watches listening ports; a loopback-only listener can look ready while public ingress cannot reach it.

### 5. Typed Compute Config

- `config-optional-simple-app` - `prisma.compute.ts` is not required to deploy a normal single app; use flags when there is no durable config.
- `config-init-formalizer` - Generate a fresh config with `bunx @prisma/cli@latest init`: it detects the framework, pins name/framework/httpPort (plus entry for Bun/Hono), and offers the Project link. `--format json` writes a dependency-free `prisma.compute.json` instead. `init` refuses when any config already exists, never scaffolds code, and never deploys.
- `config-use-prisma-compute-ts` - Put reusable deploy defaults in `prisma.compute.ts` with `defineComputeConfig`, not in `prisma.config.ts`.
- `config-app-vs-apps` - Use `app` for a single deploy target and `apps` for monorepos or multi-app repos; define exactly one.
- `config-monorepo-roots` - For monorepos, use `prisma.compute.ts` to declare app targets, roots, framework defaults, entrypoints, ports, and env inputs.
- `config-targets` - In multi-app configs, `@prisma/cli app deploy web` selects the `apps.web` target. Without `[app]`, commands can infer the target from the current directory; otherwise deploy can run all targets while build/run require one.
- `config-region-new-app-only` - A config `region` is only a default for newly created apps; deploys to existing apps keep the app's current region.
- `config-custom-artifact` - Use `framework: "custom"` with `build.outputDirectory` and `build.entrypoint` for prebuilt or custom-built artifacts.
- `config-no-project-branch-secrets` - Do not commit Workspace, Project, Branch, production intent, service tokens, or secret values in `prisma.compute.ts`; keep those in flags, `.prisma/local.json`, env storage, or CI secrets. App-level defaults such as `region`, `root`, `framework`, `entry`, `httpPort`, and non-secret env file paths belong in config.
- `config-flags-win` - Explicit deploy flags such as `--framework`, `--entry`, `--http-port`, `--region`, and `--env` override matching config values.

### 6. Branch, Environment, and Database

- `env-do-not-leak-secrets` - Never print full `DATABASE_URL`, service tokens, or secret values.
- `env-deploy-loads-dotenv` - Generated deploy scripts may load env via `prisma.compute.ts` or `--env .env`; inspect the actual script/config before redeploy.
- `env-migrations-separate` - Redeploy scripts do not run migrations or seed data. Run the appropriate Prisma database scripts separately.
- `env-cli-token-name` - `@prisma/cli` uses `PRISMA_SERVICE_TOKEN` for service-token auth.
- `env-branch-scope` - Branch deploys, branch env vars, and branch databases must use the same branch name; pass `--branch <git-name>` explicitly when targeting a preview branch.
- `env-production-vs-preview` - Use `--role production` for production env, `--role preview` for preview template env, and `--branch <git-name>` for branch-specific overrides.
- `env-db-explicit` - Keep database and env wiring explicit through database and project env commands; deploy examples should not add database setup, and deploys do not run migrations, seed data, or create one database per app automatically.

### 7. Deploy Operations

- `deploy-prod-intent` - Use `--prod --yes` only when the user intends a production deploy. The first production deploy of an App auto-promotes without `--prod`; the flag gates subsequent production-branch deploys.
- `deploy-no-promote` - Use `app deploy --no-promote` for build-then-verify: it builds a candidate reachable at its own URL without touching the live deployment, promoted later with `app promote <deployment-id>`.
- `deploy-github-default-branch` - When a Compute app is connected to GitHub push-to-deploy, a merge to the default branch is the production deploy path; check deployment records or GitHub check runs instead of telling users to redeploy the merged PR branch or run a default-branch preview deploy.
- `deploy-build-logs` - Use `@prisma/cli build logs <build-id>` for GitHub/Console build output. Use `app logs` for runtime deployment logs; the two ids are different.
- `deploy-noninteractive-auth` - Non-interactive deploys need either the correct active stored OAuth workspace or a supported service token env var; never print the token.
- `deploy-json-for-agents` - Use `--json --no-interactive` for scripts and agent-readable output.
- `deploy-create-project` - Use `--create-project <name>` only when the user wants deploy to create and link a new project; it conflicts with `--project` and `PRISMA_PROJECT_ID`.
- `deploy-ops-targets` - App show/open/logs/list-deploys/promote/rollback/remove and domain commands can also accept `[app]` targets from `prisma.compute.ts`.
- `deploy-report-cli-bugs` - On `UNEXPECTED_ERROR` or an unresolvable failure, report it with the feedback command; see "Send Feedback and Report CLI Issues" above.

### 8. SDK and API

- `sdk-use-cli-first` - Prefer `@prisma/cli app deploy` for app workflows; use `create-prisma` only to scaffold a new app unless the user is building lower-level automation.
- `sdk-result-handling` - `@prisma/compute-sdk` returns `Result` values; check `isOk()`/`isErr()` instead of relying on exceptions.

## Preferred Workflow

1. Inspect the project: package manager, template/framework, `package.json` scripts, Prisma version, Prisma client location, `prisma.compute.ts`, and existing `compute:deploy`.
2. Verify CLI help output for the package actually being used.
3. Verify auth context before project/app mutations: `auth whoami --json`, and when multiple local sessions may exist, `auth workspace list --json`.
4. Choose the path:
   - existing app deploy: config-backed target when present, generated `compute:deploy`, or `@prisma/cli app build/run/deploy` flags
   - new app scaffold: `create-prisma`, then generated `compute:deploy` or `@prisma/cli app deploy`
   - low-level automation: `@prisma/compute-sdk` or Management API
5. Check framework readiness plus host/port/env/runtime requirements, including project and branch scope.
6. Run a local build or `app build` before deploying when feasible.
7. Deploy with JSON output when automating, then request the public URL and summarize app URL, app id, deployment id, project id, workspace id, and follow-up steps.
8. For GitHub/Console builds, inspect the `Prisma Compute Deploy` check run or `build logs <build-id>` before guessing why a build failed.

## Avoid

- Do not bury Compute deployment guidance in the generic `prisma-cli` skill.
- Do not run `create-prisma` inside an existing app just to deploy it; use the generated `compute:deploy` script or `@prisma/cli app deploy`.
- Do not tell users that every `create-prisma` template can auto-deploy.
- Do not deploy with placeholder `DATABASE_URL` values.
- Do not assume `next start` is the Compute runtime path; Next.js deploys need standalone output.
