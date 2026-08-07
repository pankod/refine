---
id: hasura
title: "Hasura GraphQL Example | Refine v4 & PostgreSQL"
display_title: "Hasura"
sidebar_label: "Hasura"
description: "Master GraphQL with Hasura and Refine v4. A hands-on example of building a data-driven admin panel with PostgreSQL."
example-tags: [data-provider, live-provider]
---

Any REST or GraphQL custom backend work integrated with Refine. Refine [Hasura](https://hasura.io/) GraphQL Data Provider comes out-of-the-box. Thanks to Refine, you can connect to your Hasura database and create special queries and use your data easily. This example shows in detail how you can use the data in your Hasura database with Refine project.

## ID Data Type

By default, the data provider assume that your `ID` type is `uuid`, you can change this behavior by using the `idType` option. You can pass `Int` or `uuid` as the value of `idType` option or use function to determine the `idType` based on the resource name.

#### Passing 'Int' or 'uuid' to `idType`

This will allow you to determine the `idType` for all resources.

```tsx
const myDataProvider = dataProvider(client, {
  idType: "Int",
});
```

#### Passing function to `idType`

This will allow you to determine the `idType` based on the resource name.

```tsx
const idTypeMap: Record<string, "Int" | "uuid"> = {
  users: "Int",
  posts: "uuid",
};

const myDataProvider = dataProvider(client, {
  idType: (resource) => idTypeMap[resource] ?? "uuid",
});
```

<CodeSandboxExample path="data-provider-hasura" />
