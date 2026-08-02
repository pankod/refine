---
name: prisma-postgres-setup
description: Set up a new Prisma Postgres database and connect it to a local project using the Management API. Use when asked to "set up a database", "create a Prisma Postgres project", "get a connection string", "connect my app to Prisma Postgres", or "provision a database".
license: MIT
metadata:
  author: prisma
  version: "1.1.0"
---

# Prisma Postgres Setup

Procedural skill that guides you through provisioning a new Prisma Postgres database via the Management API and connecting it to a local project.

## When to Apply

Use this skill when:

- Setting up a new Prisma Postgres database for a project
- Creating a Prisma Postgres project and connecting it locally
- Obtaining a connection string for Prisma Postgres
- Provisioning a database via the Management API (not the Console UI)

Do **not** use this skill when:

- Setting up CI/CD preview databases — use `prisma-postgres-cicd`
- Building multi-tenant database provisioning into an app — use `prisma-postgres-integrator`
- Working with a database that already exists and is connected (schema/migration tasks are standard Prisma CLI)

## Prerequisites

- Node.js 18+
- A Prisma Postgres workspace (create one at https://console.prisma.io if needed)
- A workspace service token (see `references/auth.md`)

## UX Guidelines

When presenting choices to the user (region selection, project deletion, etc.), **use your platform's interactive selection mechanism** (e.g., `ask` tool in Claude Code, structured prompts in other agents). Do not print static tables and ask the user to type a value — present selectable options so the user can pick with minimal effort.

## Workflow

Follow these steps in order. Each step includes the API call to make and how to handle the response.

### Step 1: Authenticate

You need a service token. Try these methods in order:

**1a. Token in the user's prompt**

Check if the user included a service token in their initial message (e.g., "Set up Prisma Postgres with token eyJ..."). If so, use it **exactly as provided** — do not truncate, re-encode, or round-trip it through a file. Store it in a shell variable for subsequent calls.

**1b. Token in the environment**

Check for `PRISMA_SERVICE_TOKEN` in the environment or `.env` file.

**1c. Ask the user to create one**

If no token is available, instruct the user:

> Create a service token in Prisma Console → Workspace Settings → Service Tokens.
> Copy the token and paste it here.

Read `references/auth.md` for details on service token creation.

Once you have a token, store it in a shell variable (`PRISMA_SERVICE_TOKEN`) and use it for all subsequent API calls.

### Step 2: List available regions

Fetch the list of available Prisma Postgres regions to let the user choose where to deploy.

```bash
curl -s -H "Authorization: Bearer $PRISMA_SERVICE_TOKEN" \
  https://api.prisma.io/v1/regions/postgres
```

The response contains an array of regions with `id`, `name`, and `status`. Only present regions where `status` is `available`.

**Present the regions as an interactive menu** — let the user pick from options rather than typing a region ID manually.

Read `references/endpoints.md` for the full response shape.

### Step 3: Create a project with a database

```bash
curl -s -X POST https://api.prisma.io/v1/projects \
  -H "Authorization: Bearer $PRISMA_SERVICE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "<project-name>",
    "region": "<region-id>",
    "createDatabase": true
  }'
```

Use the current directory name as the project name by default.

The response is wrapped in `{ "data": { ... } }`. Extract:

- `data.id` — the project ID (prefixed with `proj_`)
- `data.database.id` — the database ID (prefixed with `db_`)
- `data.database.connections[0].endpoints.direct.connectionString` — the direct PostgreSQL connection string

Use the **direct** connection string (`endpoints.direct.connectionString`). Do not use the pooled or accelerate endpoints — those are for legacy Accelerate setups and not needed for new projects.

If the response status is `provisioning`, wait a few seconds and poll `GET /v1/databases/<database-id>` until `status` is `ready`.

**If creation fails due to a database limit**, list the user's existing projects and present them as an interactive menu for deletion. After the user picks one, delete it and retry.

Read `references/endpoints.md` for the full request/response shapes.

### Step 4: Create a named connection (optional)

If you need a dedicated connection (e.g., per-developer or per-environment), create one:

```bash
curl -s -X POST https://api.prisma.io/v1/databases/<database-id>/connections \
  -H "Authorization: Bearer $PRISMA_SERVICE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "name": "dev" }'
```

Extract the direct connection string from `data.endpoints.direct.connectionString`.

### Step 5: Configure the local project

1. Install dependencies:

```bash
npm install prisma @prisma/client @prisma/adapter-pg pg dotenv
```

All five packages are required:
- `prisma` — CLI for migrations, schema push, client generation
- `@prisma/client` — the generated query client
- `@prisma/adapter-pg` — Prisma 7 driver adapter for direct PostgreSQL connections
- `pg` — Node.js PostgreSQL driver (used by the adapter)
- `dotenv` — loads `.env` variables for `prisma.config.ts`

2. Write the direct connection string to `.env`. **Append** to the file if it already exists — do not overwrite existing entries:

```
DATABASE_URL="<direct-connection-string>"
```

3. Verify `.gitignore` includes `.env`. Create `.gitignore` if it does not exist. Warn the user if `.env` is not gitignored.

4. Ensure `package.json` has `"type": "module"` set (Prisma 7 generates ESM output).

5. If `prisma/schema.prisma` does not exist, run `npx prisma init` to scaffold the project. This creates both `prisma/schema.prisma` and `prisma.config.ts`.

6. Ensure `schema.prisma` has the `postgresql` provider and **no** `url` or `directUrl` in the datasource block (Prisma 7 manages connection URLs in `prisma.config.ts`, not in the schema):

```prisma
datasource db {
  provider = "postgresql"
}
```

7. Ensure `prisma.config.ts` loads the connection URL from the environment:

```typescript
import path from 'node:path'
import { defineConfig } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join(import.meta.dirname, 'prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
```

**Important Prisma 7 notes:**
- Connection URLs go in `prisma.config.ts`, never in `schema.prisma`
- The provider in `schema.prisma` must be `"postgresql"` (not `"prismaPostgres"`)
- `dotenv/config` must be imported in `prisma.config.ts` to load `.env` variables

### Step 6: Define schema and push

If the schema already has models, skip to pushing. Otherwise, **present these options as an interactive menu**:

1. **"I'll define my schema manually"** — Tell the user to edit `prisma/schema.prisma` and come back when ready. Wait for them before proceeding.
2. **"Give me a starter schema"** — Add a Blog starter schema (User, Post, Comment with relations) to `prisma/schema.prisma`. Show the user what was added and ask if they want to adjust it before pushing.
3. **"I'll describe what I need"** — Ask the user to describe their data model in natural language (e.g., "I'm building a task manager with projects, tasks, and team members"). Generate a schema from the description, show it, and ask for confirmation before pushing.

Once the schema has models and the user is ready, create a migration and generate the client:

```bash
npx prisma migrate dev --name init
```

This creates migration files in `prisma/migrations/` **and** generates the client in one step. Migration history is essential for CI/CD workflows (`prisma migrate deploy`) and production deployments.

Only use `npx prisma db push` if the user explicitly asks for prototyping-only mode (no migration history). In that case, follow it with `npx prisma generate`.

### Step 7: Verify the connection

After generating the client, create and run a quick verification script to confirm everything works end-to-end. This is **critical** — do not skip this step.

Create a file named `test-connection.ts`:

```typescript
import 'dotenv/config'
import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const result = await prisma.$queryRawUnsafe('SELECT 1 as connected')
console.log('Connected to Prisma Postgres:', result)

await prisma.$disconnect()
await pool.end()
```

Run it:

```bash
npx tsx test-connection.ts
```

**Prisma 7 client instantiation rules:**
- Import from `./generated/prisma/client.js` (not `./generated/prisma`)
- Create a `pg.Pool` with the `DATABASE_URL` connection string
- Wrap it in a `PrismaPg` adapter
- Pass `{ adapter }` to the `PrismaClient` constructor
- Do **not** use `datasourceUrl` — that option does not exist in Prisma 7
- Do **not** use `new PrismaClient()` with no arguments — it will throw

After verification succeeds, delete `test-connection.ts`.

Then share links for the user to explore their database:

- **Prisma Studio (CLI):** `npx prisma studio` — opens a visual data browser locally
- **Console:** `https://console.prisma.io/<workspaceId>/<projectId>/<databaseId>/dashboard` — strip the prefixes (`wksp_`, `proj_`, `db_`) from the IDs returned in Step 3 to build this URL

Read `references/prisma7-client.md` for the full client instantiation reference.

## Error Handling

Read `references/api-basics.md` for the full error reference. Key self-correction patterns:

| HTTP Status | Error Code | Action |
|---|---|---|
| 401 | `authentication-failed` | Service token is invalid or expired. Ask the user to create a new one in Console → Workspace Settings → Service Tokens. |
| 404 | `resource-not-found` | Check that the resource ID includes the correct prefix (`proj_`, `db_`, `con_`). |
| 422 | `validation-error` | Check request body against the endpoint schema. Common: missing `name`, invalid `region`. |
| 429 | `rate-limit-exceeded` | Back off and retry after a few seconds. |

## Reference Files

Detailed API and usage information is in:

```
references/auth.md             — Service token creation and usage
references/api-basics.md       — Base URL, envelope, IDs, errors, pagination
references/endpoints.md        — Endpoint details for projects, databases, connections, regions
references/prisma7-client.md   — Prisma 7 client instantiation and usage patterns
```
