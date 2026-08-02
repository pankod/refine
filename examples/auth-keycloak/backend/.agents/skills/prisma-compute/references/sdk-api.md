# SDK and API Automation

Use this reference when building automation rather than using `create-prisma` or `@prisma/cli app deploy`.

## Prefer the CLI for App Workflows

For normal app deployment:

1. Use generated `compute:deploy` when present.
2. Otherwise use `@prisma/cli app build/run/deploy`.
3. Use SDK/API only for custom automation, platform integrations, or tool builders.

## Compute SDK

Install:

```bash
npm install @prisma/compute-sdk @prisma/management-api-sdk
```

Config helper:

```typescript
import { defineComputeConfig } from "@prisma/compute-sdk/config";
```

Use this import in `prisma.compute.ts` for type checking. The helper is an identity function; the CLI loader aliases the import when it evaluates config files, so a user project does not need the SDK solely to load a Compute config.

Create an authenticated Management API client:

```typescript
import { createManagementApiClient } from "@prisma/management-api-sdk"

const apiClient = createManagementApiClient({
  token: process.env.PRISMA_API_TOKEN,
})
```

Token naming differs by surface. `@prisma/cli app ...` uses `PRISMA_SERVICE_TOKEN` for non-interactive service-token auth. The SDK examples here use `PRISMA_API_TOKEN` as an application convention for passing a token into `createManagementApiClient`; the SDK itself only receives the `token` string.

Deploy a prebuilt artifact:

```typescript
import { ComputeClient, PreBuilt } from "@prisma/compute-sdk"

const compute = new ComputeClient(apiClient)
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) throw new Error("DATABASE_URL is required")

const result = await compute.deploy({
  strategy: new PreBuilt({
    appPath: "./dist",
    entrypoint: "index.js",
  }),
  projectId: "proj_abc",
  appName: "my-app",
  region: "us-east-1",
  envVars: { DATABASE_URL: databaseUrl },
  portMapping: { http: 3000 },
})

if (result.isOk()) {
  console.log(result.value.deploymentEndpointDomain)
} else {
  console.error(result.error.message)
}
```

SDK methods return `Result<T, E>`. Check `isOk()` or `isErr()` instead of assuming errors throw. Deploy results expose app/deployment vocabulary including `appId`, `appName`, `projectId`, `region`, `deploymentId`, `deploymentEndpointDomain`, `appEndpointDomain`, `promoted`, `previousDeploymentId`, `previousDeploymentAction`, and `resolvedConfig`.

## SDK Build Strategies

Project Compute SDK strategies:

- `AutoBuild`: tries supported framework strategies such as Next.js, Nuxt, Astro, NestJS, TanStack Start, then Bun
- `NextjsBuild`: requires standalone output and returns `server.js`
- `NuxtBuild`: expects `.output/server/index.mjs`
- `AstroBuild`: expects `dist/server/entry.mjs`
- `NestjsBuild`: builds a NestJS HTTP server artifact
- `TanstackStartBuild`: runs `vite build` and expects a Nitro node server at `.output/server/index.mjs`; keep `tanstackStart()` and `nitro()` in Vite config
- `CustomBuild`: runs optional configured build settings and stages a configured artifact entrypoint
- `BunBuild`: runs `bun build` and needs an explicit entrypoint or `package.json` `main`
- `PreBuilt`: uses an existing artifact directory and relative entrypoint

## Regions

Known SDK region ids:

```text
us-east-1
us-west-1
eu-west-3
eu-central-1
ap-northeast-1
ap-southeast-1
```

Use `--region` in `@prisma/cli app deploy` or `region` in SDK deploy input only when creating a new Compute app. Existing apps keep their current region.

## Management API Concepts

Compute resources map roughly to:

- Project: parent container
- Branch: production or preview scope for env resolution and database/env attachment
- App: stable app endpoint and branch attachment
- Deployment: build artifact plus runtime status and preview URL

Low-level public routes use App/Deployment names:

- list/create apps under a project with `/v1/apps`
- get/update/delete an app
- create/list deployments for an app
- get/start/stop/delete deployments with `/v1/deployments/:deploymentId`
- promote or roll back an app using `deploymentId`
- stream logs with `/v1/deployments/:deploymentId/logs`
- manage custom domains

Internal compatibility aliases may still appear in code. Prefer App/Deployment names in new docs, skills, and automation.

Environment variables are not embedded directly in the low-level deployment create payload. The attached branch's role selects their scope: a preview branch resolves branch-scoped vars, while a production branch (or no branch) resolves project-scoped production vars. Use project/environment-variable APIs or CLI env commands to write env vars first, and keep the branch name consistent across app creation, database creation, and env writes.

When using the CLI alongside SDK automation:

```bash
bunx @prisma/cli@latest project env add --file .env.preview --branch feature/foo
bunx @prisma/cli@latest database create preview-db --branch feature/foo --json
bunx @prisma/cli@latest app deploy --branch feature/foo --json --no-interactive
```

Production promotion is not just "the same branch with another label"; `app promote <deployment-id>` rebuilds with production env vars.

## Secrets and Redaction

Management API deployment inspection exposes env var names with redacted values. Treat any value like `[redacted]` as a marker, not as the deployed value.

Do not log:

- service tokens
- OAuth tokens
- full database URLs
- env var values
- pre-signed upload URLs
