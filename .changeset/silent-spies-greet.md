---
"create-refine-app": minor
"@refinedev/devtools-internal": minor
"@refinedev/devtools-server": minor
"@refinedev/devtools-shared": minor
"@refinedev/react-hook-form": minor
"@refinedev/nextjs-router": minor
"@refinedev/nestjs-query": minor
"@refinedev/nestjsx-crud": minor
"@refinedev/react-router": minor
"@refinedev/remix-router": minor
"@refinedev/devtools-ui": minor
"@refinedev/react-table": minor
"@refinedev/simple-rest": minor
"@refinedev/inferencer": minor
"@refinedev/chakra-ui": minor
"@refinedev/refine-ui": minor
"@refinedev/strapi-v4": minor
"@refinedev/airtable": minor
"@refinedev/appwrite": minor
"@refinedev/devtools": minor
"@refinedev/supabase": minor
"@refinedev/ui-tests": minor
"@refinedev/ui-types": minor
"@refinedev/graphql": minor
"@refinedev/mantine": minor
"@refinedev/hasura": minor
"@refinedev/medusa": minor
"@refinedev/strapi": minor
"@refinedev/ably": minor
"@refinedev/antd": minor
"@refinedev/core": minor
"@refinedev/kbar": minor
"@refinedev/rest": minor
"@refinedev/cli": minor
"@refinedev/mui": minor
---

[Resolves #6969](https://github.com/refinedev/refine/issues/6969) Move from tsup to tsdown since the former is not more actively maintained.

This change also introduces the lint rule to explicitly indicate types during module re-exports. This avoids triggering rolldown's isolated module transpilation related error.
