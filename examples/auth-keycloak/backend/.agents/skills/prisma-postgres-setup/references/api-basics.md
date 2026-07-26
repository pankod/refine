# api-basics

Core conventions for the Prisma Management API. All three `prisma-postgres-*` skills share these patterns.

## Base URL

```
https://api.prisma.io/v1
```

API documentation: https://api.prisma.io/v1/doc

## Response Envelope

### Single resource

```json
{
  "data": {
    "id": "proj_clx7abc123def456",
    "type": "project",
    "name": "My Project",
    "createdAt": "2025-06-15T10:30:00.000Z"
  }
}
```

### Collection

```json
{
  "data": [
    { "id": "proj_aaa", "type": "project", "name": "Alpha" },
    { "id": "proj_bbb", "type": "project", "name": "Beta" }
  ],
  "pagination": {
    "hasMore": true,
    "nextCursor": "clx7cursor123"
  }
}
```

## Resource ID Prefixes

Every resource ID carries a type prefix:

| Prefix | Resource |
|---|---|
| `proj_` | Project |
| `db_` | Database |
| `con_` | Connection |
| `wksp_` | Workspace |

Always include the prefix when sending IDs in API requests.

## Pagination

Collection endpoints use cursor-based pagination:

```
GET /v1/projects?limit=10
GET /v1/projects?cursor=clx7abc123&limit=10
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `cursor` | string | — | Opaque cursor from `nextCursor` |
| `limit` | number | 100 | Maximum items per page |

Continue fetching while `pagination.hasMore` is `true`, using `pagination.nextCursor` as the `cursor` parameter.

## Error Responses

All errors follow this shape:

```json
{
  "error": {
    "code": "resource-not-found",
    "message": "database with id db_abc not found"
  }
}
```

### Error codes by HTTP status

| HTTP Status | Error Code | Meaning |
|---|---|---|
| 400 | `client-error` | Malformed request |
| 401 | `authentication-failed` | Missing or invalid token |
| 403 | `permission-denied` | Token lacks required access |
| 404 | `resource-not-found` | Resource does not exist or is not accessible |
| 422 | `validation-error` | Request body failed validation |
| 429 | `rate-limit-exceeded` | Too many requests |
| 500 | `internal-server-error` | Server error — retry after a delay |

### Self-correction patterns

- **401**: Token is invalid or expired. Create a new service token in Console → Workspace Settings → Service Tokens.
- **404**: Verify the resource ID includes the correct prefix (`proj_`, `db_`, `con_`). Use `GET /v1/projects` or `GET /v1/databases` to list available resources.
- **422**: Check the request body against the endpoint schema. Common issues: missing required fields, invalid region ID, empty `name`.
- **429**: Wait 2–5 seconds and retry. If repeated, increase the backoff interval.
