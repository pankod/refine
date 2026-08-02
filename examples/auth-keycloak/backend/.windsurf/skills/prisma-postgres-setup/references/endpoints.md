# endpoints

Management API endpoint details for database setup workflows.

## List regions

```
GET /v1/regions/postgres
```

No request body. Returns available Prisma Postgres regions.

**Response:**

```json
{
  "data": [
    {
      "id": "us-east-1",
      "type": "region",
      "name": "US East (N. Virginia)",
      "status": "available"
    },
    {
      "id": "eu-west-1",
      "type": "region",
      "name": "EU West (Ireland)",
      "status": "available"
    }
  ]
}
```

Only use regions where `status` is `available`.

## Create project (with database)

```
POST /v1/projects
```

**Request body:**

```json
{
  "name": "my-project",
  "region": "us-east-1",
  "createDatabase": true
}
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | string | No | Auto-generated | Project display name |
| `region` | string | No | `us-east-1` | Region for the database |
| `createDatabase` | boolean | No | `true` | Create a default database with the project |

**Response** (with `createDatabase: true`):

```json
{
  "data": {
    "id": "proj_clx7abc123",
    "type": "project",
    "url": "https://api.prisma.io/v1/projects/proj_clx7abc123",
    "name": "my-project",
    "createdAt": "2025-06-15T10:30:00.000Z",
    "defaultRegion": "us-east-1",
    "workspace": {
      "id": "wksp_xyz789",
      "url": "https://api.prisma.io/v1/workspaces/wksp_xyz789",
      "name": "My Workspace"
    },
    "database": {
      "id": "db_def456",
      "type": "database",
      "url": "https://api.prisma.io/v1/databases/db_def456",
      "name": "my-project",
      "status": "ready",
      "createdAt": "2025-06-15T10:30:00.000Z",
      "isDefault": true,
      "defaultConnectionId": "con_ghi789",
      "connections": [
        {
          "id": "con_ghi789",
          "type": "connection",
          "url": "https://api.prisma.io/v1/connections/con_ghi789",
          "name": "Default",
          "createdAt": "2025-06-15T10:30:00.000Z",
          "kind": "postgres",
          "endpoints": {
            "direct": {
              "host": "db.prisma.io",
              "port": 5432,
              "connectionString": "postgres://user:pass@db.prisma.io:5432/postgres?sslmode=require"
            }
          }
        }
      ],
      "region": {
        "id": "us-east-1",
        "name": "US East (N. Virginia)"
      }
    }
  }
}
```

Key field to extract:

- `data.database.connections[0].endpoints.direct.connectionString` → use as `DATABASE_URL`

The response also includes `pooled` and `accelerate` endpoints — ignore these for new projects. The direct connection string is all you need.

If `data.database.status` is `provisioning`, poll `GET /v1/databases/{id}` until `status` is `ready`.

## Get database

```
GET /v1/databases/{databaseId}
```

Use to check database status after creation or to retrieve database details.

**Response:**

```json
{
  "data": {
    "id": "db_def456",
    "type": "database",
    "url": "https://api.prisma.io/v1/databases/db_def456",
    "name": "my-project",
    "status": "ready",
    "createdAt": "2025-06-15T10:30:00.000Z",
    "isDefault": true,
    "defaultConnectionId": "con_ghi789",
    "connections": [],
    "project": {
      "id": "proj_clx7abc123",
      "url": "https://api.prisma.io/v1/projects/proj_clx7abc123",
      "name": "my-project"
    },
    "region": {
      "id": "us-east-1",
      "name": "US East (N. Virginia)"
    }
  }
}
```

## Create connection

```
POST /v1/databases/{databaseId}/connections
```

Creates a new named connection string for a database. Use for per-developer or per-environment connections.

**Request body:**

```json
{
  "name": "dev"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Display name for the connection |

**Response:**

```json
{
  "data": {
    "id": "con_newcon123",
    "type": "connection",
    "url": "https://api.prisma.io/v1/connections/con_newcon123",
    "name": "dev",
    "createdAt": "2025-06-15T10:31:00.000Z",
    "kind": "postgres",
    "endpoints": {
      "direct": {
        "host": "db.prisma.io",
        "port": 5432,
        "connectionString": "postgres://user:pass@db.prisma.io:5432/postgres?sslmode=require"
      }
    },
    "database": {
      "id": "db_def456",
      "url": "https://api.prisma.io/v1/databases/db_def456",
      "name": "my-project"
    }
  }
}
```

Extract: `data.endpoints.direct.connectionString` → use as `DATABASE_URL`.

## Delete database

```
DELETE /v1/databases/{databaseId}
```

Permanently deletes a database and all its connections. Returns `204 No Content` on success.

## List projects

```
GET /v1/projects
```

Returns all projects in the workspace. Supports cursor-based pagination (`?cursor=...&limit=...`).

## Delete project

```
DELETE /v1/projects/{projectId}
```

Permanently deletes a project and all its databases. Returns `204 No Content` on success.
