---
id: nhost
title: Nhost
example-tags: [antd, data-provider, nhost, auth-provider, graphql]
---

**refine** [Nhost](https://nhost.io/) GraphQL Data Provider comes out-of-the-box. Thanks to **refine**, you can connect to your Nhost database and create special queries and use your data easily. This example shows in detail how you can use the data in your Nhost database with **refine** project.

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

:::note Demo Credentials
**Username**: info@refine.dev
**Password**: demodemo
:::

<CodeSandboxExample path="--branch v3 data-provider-nhost" />
