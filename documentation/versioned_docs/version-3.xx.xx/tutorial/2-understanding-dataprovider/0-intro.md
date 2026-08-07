---
id: index
title: 1. Data Provider
tutorial:
  order: 0
  prev: false
  next: 3.xx.xx/tutorial/understanding-dataprovider/swizzle
---

import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";

:::info
The data provider unit is optional for the tutorial and can be skipped to next unit - <UIConditional is="headless">[Adding CRUD Pages](/core/docs/3.xx.xx/tutorial/adding-crud-pages/headless/index)</UIConditional><UIConditional is="antd">[Adding CRUD Pages](/core/docs/3.xx.xx/tutorial/adding-crud-pages/antd/index)</UIConditional><UIConditional is="mantine">[Adding CRUD Pages](/core/docs/3.xx.xx/tutorial/adding-crud-pages/mantine/index)</UIConditional><UIConditional is="chakra-ui">[Adding CRUD Pages](/core/docs/3.xx.xx/tutorial/adding-crud-pages/chakra-ui/index)</UIConditional><UIConditional is="mui">[Adding CRUD Pages](/core/docs/3.xx.xx/tutorial/adding-crud-pages/mui/index)</UIConditional>
if desired.
:::

## What is data provider?

The data provider acts as a data layer for your app that makes the HTTP requests and encapsulates how the data is retrieved. **refine** consumes these methods via data hooks.

You don't need worry about creating data providers from scratch. **refine** offers built-in data provider support for the most popular [API providers](#supported-data-providers). So you can use one of them or you can create your own data provider according to your needs.

We'll see how to create data provider in the next sections.

Data providers can communicate with `REST`, `GraphQL`, `RPC`, and `SOAP` based API's. You can imagine the data provider is an adapter between refine and the API.

<div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/api-consuming-flow.webp" />
</div>
<br/>
<br/>

The typical data provider has following methods:

```ts
import { DataProvider } from "@pankod/refine-core";

const dataProvider: DataProvider = {
    create: ({ resource, variables, metaData }) => Promise,
    deleteOne: ({ resource, id, variables, metaData }) => Promise,
    getList: ({
        resource,
        pagination,
        hasPagination,
        sort,
        filters,
        metaData,
    }) => Promise,
    getOne: ({ resource, id, metaData }) => Promise,
    update: ({ resource, id, variables, metaData }) => Promise,
    getApiUrl: () => "",
    ...
}
```

These methods are used to perform data operations by **refine**.

**refine** comes with different data providers out of the box, but the one we’re interested in and will be using in this tutorial is the `refine-simple-rest` data provider, a data provider for communicating with RESTful APIs.

[Refer to the `refine-simple-rest` source code &#8594](https://github.com/refinedev/refine/tree/v3/packages/simple-rest)

## Using Data Providers in refine

In the previous units, we consumed the API and show the data in the auto-generated Inferencer pages. To allow refine to communicate with the API, we registered a data provider using `dataProvider` property of the `<Refine>` component.

```tsx
...
import dataProvider from "@pankod/refine-simple-rest";

<Refine
    ...
    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
/>;
```

You can refer to the **refine** component [dataProvider](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#dataprovider) prop documentation for more detailed information.

## How are data provider methods used in the app?

We use **refine's** data hooks whenever we need to fetch data from the API. These data hooks are connected to data provider methods internally. The required parameters are passed to the data provider methods, and the response from the API is returned.

To illustrate this internal connection, imagine we want to get all records from the `post` resource using refine's `useList` data hook.

```ts title="src/pages/posts/index.tsx"
import { useList } from "@pankod/refine-core";

const postUseListResult = useList({
  resource: "posts",
  config: {
    sort: [
      {
        field: "id",
        order: "desc",
      },
    ],
    filters: [
      {
        field: "title",
        operator: "contains",
        value: "hello",
      },
    ],
  },
});
```

As we can see, the parameters passed to the `useList` hook are forwarded to the data provider's `getList` method internally. In the background, **refine** connects all data provider methods to appropriate data hooks.

```ts title="dataProvider.ts"
const dataProvider = {
    getList: (params) => {
        console.log(params);
        /*
        {
          "resource": "posts",
          "sort": [
            {
              "field": "id",
              "order": "desc"
            }
          ],
          "filters": [
            {
              "field": "title",
              "operator": "contains",
              "value": "hello"
            }
          ],
        }
        */
    }
    ...
}
```

## Supported Data Providers

<SupportedDataProviders/>

<Checklist>

<ChecklistItem id="data-provider-intro">
I understood what is data provider and how it works.
</ChecklistItem>
<ChecklistItem id="data-provider-intro-2">
I learned that refine offers built-in data providers for the most popular systems.
</ChecklistItem>

</Checklist>
