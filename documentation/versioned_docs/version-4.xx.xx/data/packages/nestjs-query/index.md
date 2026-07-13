---
title: "Nestjs-query Provider | Refine v4 Backend Sync"
display_title: "Nest.js Query"
sidebar_label: "Nest.js Query"
description: "Integrate NestJS with Refine v4 using Nestjs-query. Streamline your full-stack React development with automated data provider configurations."
source: https://github.com/refinedev/refine/tree/main/packages/nestjs-query
---

Refine provides a data provider for APIs powered with [Nest.js Query](https://doug-martin.github.io/nestjs-query/), a module for Nest.js that provides easier ways to build CRUD graphql APIs.

:::simple Good to know

- This library uses [`graphql-request@5`](https://github.com/jasonkuhrt/graphql-request) to handle the requests.
- This library uses [`graphql-ws`](https://the-guild.dev/graphql/ws) to handle the subscriptions.
- You can also use [`graphql-tag`](https://www.npmjs.com/package/graphql-tag) to write your queries and mutations.
- To learn more about data fetching in Refine, check out the [Data Fetching](/core/docs/guides-concepts/data-fetching) guide.
- To learn more about realtime features of Refine, check out the [Realtime](/core/docs/guides-concepts/realtime) guide.

:::

## Installation

```bash
npm i @refinedev/nestjs-query graphql-tag
```

If you're going to use **LiveProvider** you'll also need to install the `graphql-ws` package to handle graphql subscriptions.

```bash
npm i graphql-ws
```

## Usage

We'll create a GraphQL Client with our API url and pass it to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider, { GraphQLClient } from "@refinedev/nestjs-query";

// highlight-next-line
const client = new GraphQLClient("https://api.nestjs-query.refine.dev/graphql");

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
  schema: "https://api.nestjs-query.refine.dev/graphql",
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
    $paging: OffsetPaging!
    $filter: BlogPostFilter
    $sorting: [BlogPostSort!]!
  ) {
    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        title
        category {
          title
        }
        content
        createdAt
      }
      totalCount
    }
  }
`;

export const POST_EDIT_MUTATION = gql`
  mutation PostEdit($input: UpdateOneBlogPostInput!) {
    updateOneBlogPost(input: $input) {
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
```

Once you write your query, you can generate types for it with `GraphQL Code Generator`.

```bash
npm run codegen
```

:::simple Good to know

`@refinedev/nestjs-query` also exports 2 utility types:

- GetFields: Get fields from your non-list queries and mutations.
- GetFieldsFromList: Get fields from your offset-paginated list queries.

You can use these types to extract the type of selected fields of your queries/mutations.

See the [Utility Types](#utility-types) section for more information.
:::

And then you can use it with hooks:

```tsx
import { useList, useTable, useForm } from "@refinedev/core";
import { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query";

import { PostsListQuery, PostEditMutation } from "src/graphql/types";
import { POSTS_LIST_QUERY, POST_EDIT_MUTATION } from "./queries";

const { data, isLoading } = useList<GetFieldsFromList<PostsListQuery>>({
  meta: { gqlQuery: POSTS_LIST_QUERY },
});

const { tableProps } = useTable<GetFieldsFromList<PostsListQuery>>({
  meta: { gqlQuery: POSTS_LIST_QUERY },
});

const { formProps } = useForm<GetFields<PostEditMutation>>({
  meta: { gqlMutation: POST_EDIT_MUTATION },
});
```

On initial render, useForm hook, will make `getOne` query to your API to get the initial values of the form. Notice, we didn't pass a separate `gqlQuery` field for this. It's because `@refinedev/nestjs-query` package will automatically detect the `gqlMutation`, extract selected fields from it and make a `getOne` query to your API.

If you want to customize the `getOne` query, you can also pass a `gqlQuery` field to the `meta` object.

```tsx
const POST_EDIT_QUERY = gql`
  query PostEdit($id: ID!) {
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

`@refinedev/nestjs-query` exports 2 utility types, `GetFields` and `GetFieldsFromList`.

These types can be used to extract selection set from your queries mutations.

#### GetFields

Let's say we have the following queries and mutations:

```graphql
query PostShow($id: ID!) {
  post(id: $id) {
    id
  }
}

mutation PostCreate($input: CreateOneBlogPostInput!) {
  createOneBlogPost(input: $input) {
    id
  }
}
```

While you can use this type directly, it's not very useful, because you would need to extract fields manually, by passing your query/mutation name.

```ts
import { GetFields } from "@refinedev/nestjs-query";
import { PostShowQuery, PostCreateMutation } from "src/graphql/types";

PostShowQuery; // { blogPost: { id: string }; }

GetFields<PostShowQuery>; // { id: string; }

PostCreateMutation; // { createOneBlogPost: { id: string; } }

GetFields<PostCreateMutation>; // { id: string; }
```

#### GetFieldsFromList

Let's say you have the following query:

```graphql
query PostsList(
  $paging: OffsetPaging!
  $filter: BlogPostFilter
  $sorting: [BlogPostSort!]!
) {
  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {
    nodes {
      id
    }
    totalCount
  }
}
```

This query will generate the following type:

```ts
export type BlogPostsListQuery = {
  blogPosts: Pick<Types.BlogPostConnection, "totalCount"> & {
    nodes: Array<Pick<Types.BlogPost, "id">>;
  };
};
```

As you can see, the selectionSet is under `nodes`, and it's not very useful, because data provider already returns normalized result.

`GetFieldsFromList` will convert it to:

```ts
import { GetFieldsFromList } from "@refinedev/nestjs-query";

type PostFields = GetFieldsFromList<BlogPostListQuery>;

PostFields; // { id: string }
```

### Realtime

`@refinedev/nestjs-query` also provides a `liveProvider` to enable realtime features of Refine. These features are powered by GraphQL subscriptions and uses [`graphql-ws`](https://the-guild.dev/graphql/ws) to handle the connections.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
// highlight-next-line
import dataProvider, {
  GraphQLClient,
  liveProvider,
} from "@refinedev/nestjs-query";
// highlight-next-line
import { createClient } from "graphql-ws";

const client = new GraphQLClient("https://api.nestjs-query.refine.dev/graphql");
// highlight-next-line
const wsClient = createClient({
  url: "wss://api.nestjs-query.refine.dev/graphql",
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

## Backend Configuration

Currently `@refinedev/nestjs-query` supports [`OffsetPagingStrategy`](https://doug-martin.github.io/nestjs-query/docs/graphql/paging#offset-based-paging) **only**. [See their offset pagination example](https://github.com/doug-martin/nestjs-query/tree/master/examples/offset-paging)

You can configure [resolvers](https://doug-martin.github.io/nestjs-query/docs/graphql/resolvers) in your `app.module.ts` file as follows:

```ts title="app.module.ts"
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // ...other config
      // Enable for live provider.
      installSubscriptionHandlers: true,
      subscriptions: {
        "graphql-ws": true,
      },
    }),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([BlogPostEntity])],
      resolvers: [
        {
          // Only OFFSET paging strategy is supported.
          pagingStrategy: PagingStrategies.OFFSET,
          // Needed for dataprovider to build pagination.
          enableTotalCount: true,
          DTOClass: BlogPostDTO,
          // enable for live provider
          enableSubscriptions: true,
        },
      ],
    }),
  ],
})
export class AppModule {}
```

## Authentication

If your API uses authentication, you can easily provide a custom fetcher for the requests and handle the authentication logic there. When creating a GraphQL Client, you can pass a `fetch` function to the client options. This function will be used to append the authentication headers to the requests.

```tsx title="data-provider.tsx"
import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";

const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        /**
         * For demo purposes, we're using `localStorage` to access the token.
         * You can use your own authentication logic here.
         * In real world applications, you'll need to handle it in sync with your `authProvider`.
         */
        // highlight-next-line
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
});

const wsClient = createClient({
  url: WS_URL,
  connectionParams: () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
});

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = graphqlLiveProvider(wsClient);
```

## Example

<CodeSandboxExample path="data-provider-nestjs-query" />
