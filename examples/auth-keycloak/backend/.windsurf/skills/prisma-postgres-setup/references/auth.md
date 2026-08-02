# auth

How to authenticate with the Prisma Management API using service tokens.

## Service Tokens

Service tokens authenticate server-to-server requests. They are scoped to a workspace and grant access to all resources within it.

### Creating a service token

1. Open https://console.prisma.io
2. Navigate to **Workspace Settings** → **Service Tokens**
3. Click **Create Token**
4. Copy the token immediately — it is only shown once

### Using a service token

Set the token as an environment variable:

```bash
export PRISMA_SERVICE_TOKEN="eyJ..."
```

Include it in the `Authorization` header of every API request:

```bash
curl -H "Authorization: Bearer $PRISMA_SERVICE_TOKEN" \
  https://api.prisma.io/v1/projects
```

### Token scope

Service tokens are workspace-scoped. A single token grants access to all projects, databases, and connections within the workspace. There are no project-scoped tokens at this time.

### Security practices

- Store tokens in environment variables or secret managers, never in source code
- Add `.env` to `.gitignore` to prevent accidental commits
- Rotate tokens periodically via Console → Workspace Settings → Service Tokens
- In CI/CD, store tokens as encrypted secrets (e.g., GitHub Secrets)

## OAuth 2.0 (for user-scoped access)

OAuth is used when acting on behalf of a user, typically in partner/integrator flows. See the `prisma-postgres-integrator` skill for OAuth details.

For standard database setup, service tokens are the recommended authentication method.
