---
id: handling-filters
title: Handling Filters
---

**refine** expects an array of type `CrudFilters` to filter results based on some field’s values. So you can use more than one filter. Even the `or` operator can be used to combine multiple filters.

## `CrudFilters`

`CrudFilters` is an array of objects with the following properties:

```ts
// Supported operators:
type CrudOperators =
    | "eq"
    | "ne"
    | "lt"
    | "gt"
    | "lte"
    | "gte"
    | "in"
    | "nin"
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
    | "nendswiths"

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

## `LogicalFilters`

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

## `ConditionalFilters`

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
import { DataProvider } from "@pankod/refine-core";

const dataProvider = (): DataProvider => ({
    getList: async ({ resource, pagination, filters, sort }) => {
        if (filters) {
            filters.map((filter) => {
                if (filter.operator !== "or" && filter.operator !== "and" && "field" in filter) {
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

-   [NestJS CRUD](https://github.com/refinedev/refine/tree/v3/packages/nestjsx-crud)
-   [Strapi](https://github.com/refinedev/refine/tree/v3/packages/strapi) - [Strapi v4](https://github.com/refinedev/refine/tree/v3/packages/strapi-v4)
-   [Strapi GraphQL](https://github.com/refinedev/refine/tree/v3/packages/strapi-graphql)
-   [Supabase](https://github.com/refinedev/refine/tree/v3/packages/supabase)
-   [Hasura](https://github.com/refinedev/refine/tree/v3/packages/hasura)
-   [Nhost](https://github.com/refinedev/refine/tree/v3/packages/nhost)

:::
