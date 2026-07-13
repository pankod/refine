---
id: hasura
title: Hasura
example-tags: [antd,data-provider,hasura,graphql,live-provider]
---

Any REST or GraphQL custom backend work integrated with **refine**. **refine** [Hasura](https://hasura.io/) GraphQL Data Provider comes out-of-the-box. Thanks to **refine**, you can connect to your Hasura database and create special queries and use your data easily. This example shows in detail how you can use the data in your Hasura database with **refine** project.

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
