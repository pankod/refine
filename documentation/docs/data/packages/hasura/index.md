---
title: "Hasura Integration Guide | REST API Integration in Refine v5"
display_title: "Hasura"
sidebar_label: "Hasura"
description: "Explore how to implement Hasura in Refine v5. Explore best practices to scale REST, GraphQL for custom APIs and scalable data flows. Hands-on examples included."
source: https://github.com/refinedev/refine/tree/main/packages/hasura
swizzle: true
---

Refine provides a data provider for APIs powered with [Hasura](https://hasura.io), a platform to build and deploy GraphQL APIs.

:::simple Good to know

- This library uses [`graphql-request@5`](https://github.com/jasonkuhrt/graphql-request) to handle the requests.
- The [`graphql-ws@5`](https://the-guild.dev/graphql/ws) package, used to handle the realtime subscriptions is included in the package.
- You can also use [`graphql-tag`](https://www.npmjs.com/package/graphql-tag) to write your queries and mutations.
- To learn more about data fetching in Refine, check out the [Data Fetching](/core/docs/guides-concepts/data-fetching/) guide.
- To learn more about realtime features of Refine, check out the [Realtime](/core/docs/guides-concepts/realtime/) guide.

:::

## Installation

<InstallPackagesCommand args="@refinedev/hasura"/>

## Usage

We'll create a GraphQL Client with our API url and pass it to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/hasura";

// highlight-start
const client = new GraphQLClient("<API_URL>", {
  headers: {
    "x-hasura-role": "public",
  },
});
// highlight-end

const App = () => (
  <Refine
    // highlight-next-line
    dataProvider={dataProvider(client)}
  >
    {/* ... */}
  </Refine>
);
```

### Developer Experience

We suggest using `GraphQL Code Generator` to generate types for your queries and mutations. You can check out the [GraphQL Code Generator Documentation](https://the-guild.dev/graphql/codegen/docs/getting-started) to learn more about it.

It simplifies the process of writing queries and mutations and provides a better developer experience with auto-completions.

Make sure you install GraphQL Language Service for your code editor to get the best experience.

VSCode: https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql

```bash
npm i -D @graphql-codegen/cli@5 @graphql-codegen/typescript@4 @graphql-codegen/import-types-preset@3
```

Add a `graphql.config.ts` file to the root of your project.

<details>
<summary>Show Config File</summary>

```ts title="graphql.config.ts"
import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "https://flowing-mammal-24.hasura.app/v1/graphql",
  extensions: {
    codegen: {
      // Optional, you can use this to format your generated files.
      hooks: {
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },
      generates: {
        "src/graphql/schema.types.ts": {
          plugins: ["typescript"],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
          },
        },
        "src/graphql/types.ts": {
          preset: "import-types",
          documents: ["src/**/*.{ts,tsx}"],
          plugins: ["typescript-operations"],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
            preResolveTypes: false,
            useTypeImports: true,
          },
          presetConfig: {
            typesPath: "./schema.types",
          },
        },
      },
    },
  },
};

export default config;
```

</details>

Add the following script to your `package.json` file.

```json title="package.json"
{
  "scripts": {
    "codegen": "graphql-codegen --config ./graphql.config.ts"
  }
}
```

Now you can run the following command to generate your types.

```bash
npm run codegen
```

It will generate the following files:

- `src/graphql/schema.types.ts`: This file contains the types for your schema.
- `src/graphql/types.ts`: This file contains the types for your queries and mutations.

### Usage with `graphql-tag`

You can use [`graphql-tag`](https://www.npmjs.com/package/graphql-tag) to write your queries and mutations.

Refine hooks' `meta` object has optional `gqlQuery` and `gqlMutation` properties, you can use them to write your queries and mutations.

As a best-practice, we suggest writing your queries/mutations in a separate file, next to the component that uses it.

```tsx title="src/pages/posts/queries.ts"
import gql from "graphql-tag";

export const POSTS_LIST_QUERY = gql`
  query PostsList(
    $offset: Int!
    $limit: Int!
    $order_by: [posts_order_by!]
    $where: posts_bool_exp
  ) {
    posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
      id
      title
      content
      created_at
      category {
        id
        title
      }
    }
    posts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const POST_EDIT_MUTATION = gql`
  mutation PostEdit($id: uuid!, $object: posts_set_input!) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      title
      content
      category_id
      category {
        id
        title
      }
    }
  }
`;
```

Once you write your query, you can generate types for it with `GraphQL Code Generator`.

```bash
npm run codegen
```

:::simple Good to know

`@refinedev/hasura` also exports 3 utility types:

- GetFields: Get fields from your non-list queries and mutations.
- GetFieldsFromList: Get fields from your offset-paginated list queries.
- GetVariables: Get variables from your queries and mutations.

You can use these types to extract the type of selected fields of your queries/mutations.

See the [Utility Types](#utility-types) section for more information.

:::

And then you can use it with hooks:

```tsx
import { useList, useTable, useForm } from "@refinedev/core";
import { GetFields, GetFieldsFromList, GetVariables } from "@refinedev/hasura";

import { PostsListQuery, PostEditMutation } from "src/graphql/types";
import { POSTS_LIST_QUERY, POST_EDIT_MUTATION } from "./queries";

const { result, query } = useList<GetFieldsFromList<PostsListQuery>>({
  meta: { gqlQuery: POSTS_LIST_QUERY },
});

const { tableProps } = useTable<GetFieldsFromList<PostsListQuery>>({
  meta: { gqlQuery: POSTS_LIST_QUERY },
});

const { formProps } = useForm<
  GetFields<PostEditMutation>,
  HttpError,
  GetVariables<PostEditVariables>
>({
  meta: { gqlMutation: POST_EDIT_MUTATION },
});
```

On initial render, useForm hook, will make `getOne` query to your API to get the initial values of the form. Notice, we didn't pass a separate `gqlQuery` field for this. It's because `@refinedev/hasura` package will automatically detect the `gqlMutation`, extract selected fields from it and make a `getOne` query to your API.

If you want to customize the `getOne` query, you can also pass a `gqlQuery` field to the `meta` object.

```tsx
const POST_EDIT_QUERY = gql`
  query PostEdit($id: uuid!) {
    blogPost(id: $id) {
      id
      title
      status
      category {
        id
        title
      }
      categoryId
      content
    }
  }
`;

const { formProps } = useForm<GetFields<PostEditMutation>>({
  meta: {
    gqlMutation: POST_EDIT_MUTATION,
    // highlight-next-line
    gqlQuery: POST_EDIT_QUERY,
  },
});
```

### Utility Types

`@refinedev/hasura` exports 3 utility types, `GetFields`, `GetFieldsFromList` and `GetVariables`.

These types can be used to extract selection set from your queries mutations.

#### GetFields

Let's say we have the following queries and mutations:

```graphql
query PostShow($id: uuid!) {
  posts_by_pk(id: $id) {
    id
  }
}

mutation PostCreate($object: posts_insert_input!) {
  insert_posts_one(object: $object) {
    id
  }
}
```

While you can use this type directly, it's not very useful, because you would need to extract fields manually, by passing your query/mutation name.

```ts
import { GetFields } from "@refinedev/hasura";
import { PostShowQuery, PostCreateMutation } from "src/graphql/types";

PostShowQuery; // { posts_by_pk: { id: string }; }

GetFields<PostShowQuery>; // { id: string; }

PostCreateMutation; // { insert_posts_one: { id: string; } }

GetFields<PostCreateMutation>; // { id: string; }
```

#### GetFieldsFromList

Let's say you have the following query:

```graphql
query PostsList(
  $offset: Int!
  $limit: Int!
  $order_by: [posts_order_by!]
  $where: posts_bool_exp
) {
  posts(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
    id
    posts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
}
```

This query will generate the following type:

```ts
export type PostsListQuery = {
  posts: Array<
    Pick<
      Types.Posts,
      "id" | "title" | "content" | "category_id" | "created_at"
    > & {
      category?: Types.Maybe<Pick<Types.Categories, "id" | "title">>;
    }
  >;
  posts_aggregate: {
    aggregate?: Types.Maybe<Pick<Types.Posts_Aggregate_Fields, "count">>;
  };
};
```

As you can see, the selectionSet is under `posts` and `posts_aggregate`, and it's not very useful, because data provider already returns normalized result.

`GetFieldsFromList` will convert it to:

```ts
import { GetFieldsFromList } from "@refinedev/hasura";

type PostFields = GetFieldsFromList<PostsListQuery>;

PostFields; // { id: string, total: number }
```

#### GetVariables

Let's say you have the following mutation:

```graphql
mutation PostCreate($object: posts_insert_input!) {
  insert_posts_one(object: $object) {
    id
  }
}
```

This mutation will generate the following type for variables:

```ts
export type PostCreateVariables = Types.Exact<{
  object: Types.Posts_Insert_Input;
}>;
```

`GetVariables` will convert it to:

```ts
import { GetVariables } from "@refinedev/hasura";

type PostCreateVariables = GetVariables<PostCreateVariables>;

PostCreateVariables; // { title: string; content: string; }
```

### Realtime

`@refinedev/hasura` also provides a `liveProvider` to enable realtime features of Refine. These features are powered by GraphQL subscriptions and uses [`graphql-ws`](https://the-guild.dev/graphql/ws) to handle the connections.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
// highlight-next-line
import dataProvider, {
  GraphQLClient,
  liveProvider,
  graphqlWS,
} from "@refinedev/hasura";

const client = new GraphQLClient("<API_URL>", {
  headers: {
    "x-hasura-role": "public",
  },
});
// highlight-next-line
const wsClient = graphqlWS.createClient({
  url: "<WS_URL>",
});

const App = () => (
  <Refine
    dataProvider={dataProvider(client)}
    // highlight-next-line
    liveProvider={liveProvider(wsClient)}
    options={{ liveMode: "auto" }}
  >
    {/* ... */}
  </Refine>
);
```

## Example

<CodeSandboxExample path="data-provider-hasura" />
