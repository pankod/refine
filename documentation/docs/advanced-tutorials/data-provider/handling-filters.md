---
id: handling-filters
title: "Handling Filters Tutorial | REST API Integration in Refine v5"
display_title: "Handling Filters"
sidebar_label: "Handling Filters"
description: "Implement Handling Filters in Refine v5. Learn the key steps. Explore production tips for GraphQL for custom APIs and scalable data flows."
---

**Refine** expects an array of type `CrudFilters` to filter results based on some field’s values. So you can use more than one filter. Even the `or` operator can be used to combine multiple filters.

## CrudFilters

`CrudFilters` is an array of objects with the following properties:

```ts
// Supported operators:
type CrudOperators =
  | "eq"
  | "ne"
  | "eqs"
  | "nes"
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "in"
  | "nin"
  | "ina"
  | "nina"
  | "contains"
  | "ncontains"
  | "containss"
  | "ncontainss"
  | "between"
  | "nbetween"
  | "null"
  | "nnull"
  | "or"
  | "startswith"
  | "nstartswith"
  | "startswiths"
  | "nstartswiths"
  | "endswith"
  | "nendswith"
  | "endswiths"
  | "nendswiths";

// Supported filter types:
type LogicalFilter = {
  field: string;
  operator: Exclude<CrudOperators, "or">;
  value: any;
};

type ConditionalFilter = {
  operator: "or";
  value: LogicalFilter[];
};

type CrudFilter = LogicalFilter | ConditionalFilter;
//highlight-next-line
type CrudFilters = CrudFilter[];
```

## LogicalFilters

`LogicalFilter` works with `AND` logic. For example, if you want to filter by `name` field and `age` field, you can use the following filter:

```ts
const filter = [
  {
    field: "name",
    operator: "eq",
    value: "John",
  },
  {
    field: "age",
    operator: "lt",
    value: 30,
  },
];
```

Here the query will look like: `"name" = "John" AND "age" < 30`

## ConditionalFilters

`ConditionalFilter` works `or` / `and` operator and expects an array of `LogicalFilter` objects in the `value` property. For example, if you want to filter multiple `OR` by `name` field and `age` field, you can use the following filter:

```ts
const filter = [
  {
    operator: "or",
    value: [
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "John Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 30,
          },
        ],
      },
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "JR.Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 1,
          },
        ],
      },
    ],
  },
];
```

Here the query will look like: `("name" = John Doe AND "age" = 30) OR ("name" = JR.Doe AND "age" = 1)`

### Top level multiple conditional filters usage

If you create multiple Conditional Filters at the top level, you must add a key to it. Otherwise, you will get a warning in the console and your filters may not be combined correctly.

```ts
const filter = [
  {
    key: "parent",
    operator: "or",
    value: [
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "John Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 30,
          },
        ],
      },
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "Jane Doe",
          },
          {
            field: "age",
            operator: "eq",
            value: 28,
          },
        ],
      },
    ],
  },
  {
    key: "children",
    operator: "or",
    value: [
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "JR John",
          },
          {
            field: "age",
            operator: "eq",
            value: 1,
          },
        ],
      },
      {
        operator: "and",
        value: [
          {
            field: "name",
            operator: "eq",
            value: "JR Jane",
          },
          {
            field: "age",
            operator: "eq",
            value: 2,
          },
        ],
      },
    ],
  },
];
```

## Combining Filters

You can group multiple parameters in the same query using the logical filters or the conditional filters operators to filter results based on more than one criteria at the same time. This allows you to create more complex queries.

Example query: Find posts with 2 possible dates & a specific status

```ts
filter = [
  {
    operator: "or",
    value: [
      {
        field: "createdAt",
        operator: "eq",
        value: "2022-01-01",
      },
      {
        field: "createdAt",
        operator: "eq",
        value: "2022-01-02",
      },
    ],
  },
  {
    operator: "eq",
    field: "status",
    value: "published",
  },
];
```

Here the query will look like:
`"status" == "published" AND ("createdAt" == "2022-01-01" OR "createdAt" == "2022-01-02")`

## Handle filters in a data provider

```tsx title="dataProvider.ts"
import { DataProvider } from "@refinedev/core";

const dataProvider = (): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    if (filters) {
      filters.map((filter) => {
        if (
          filter.operator !== "or" &&
          filter.operator !== "and" &&
          "field" in filter
        ) {
          // Handle your logical filters here
          // console.log(typeof filter); // LogicalFilter
        } else {
          // Handle your conditional filters here
          // console.log(typeof filter); // ConditionalFilter
        }
      });
    }
  },
});
```

:::tip

Data providers that support `or` and `and` filtering logic are as follows:

- [NestJS CRUD](https://github.com/refinedev/refine/tree/main/packages/nestjsx-crud)
- [Strapi](https://github.com/refinedev/refine/tree/main/packages/strapi) - [Strapi v4](https://github.com/refinedev/refine/tree/main/packages/strapi-v4)
- [Supabase](https://github.com/refinedev/refine/tree/main/packages/supabase)
- [Hasura](https://github.com/refinedev/refine/tree/main/packages/hasura)

:::

## Handle Custom GraphQL Variables

The [GraphQLQueryOptions](https://refine.dev/core/docs/core/interface-references/#graphqlqueryoptions) property `gqlVariables` enables dynamic GraphQL variables to be passed to the data provider for more advanced GraphQL queries.

Packages that support custom GraphQL variables for more advanced filtering are as follows:

- [Hasura](https://github.com/refinedev/refine/tree/main/packages/hasura)

The following data providers do not yet support `meta.gqlVariables`;

- [Nestjs-Query](https://github.com/refinedev/refine/tree/main/packages/nestjs-query)
- [GraphQL](https://github.com/refinedev/refine/tree/main/packages/graphql)

```tsx
// Hasura Data Provider Example
import gql from "graphql-tag";
import { useTable } from "@refinedev/antd";
import type { GetFieldsFromList } from "@refinedev/hasura";
import type { GetPostsQuery } from "graphql/types";

const POSTS_QUERY = gql`
    query GetPosts(
        $offset: Int!
        $limit: Int!
        $order_by: [posts_order_by!]
        $where: posts_bool_exp
    ) {
        posts(
            offset: $offset
            limit: $limit
            order_by: $order_by
            where: $where
        ) {
            id
            title
            content
            category_id
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

export const PostList = () => {
  const { tableProps } = useTable<
  GetFieldsFromList<GetPostsQuery>
  >({
  meta: {
    gqlQuery: POSTS_QUERY,
    gqlVariables: {
      where: {
        _and: [
          {
            _not: {
              category: { title: { _eq: "ok" } },
            },
          },
          {
            title: {
              _ilike: "%Updated%",
            },
          },
          {
            title: {
              _ilike: "%3%",
            },
          },
          {
            created_at: {
              _gte: "2023-08-04T08:26:26.489116+00:00",
            },
          },
        ],
      },
    },
  });
  return ( <Table {...tableProps}/> );
}

```
