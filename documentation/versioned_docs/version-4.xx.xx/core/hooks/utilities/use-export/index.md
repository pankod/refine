---
title: "useExport Hook | CSV Data Export in Refine v4"
display_title: "useExport"
sidebar_label: "useExport"
description: "Add data export features to your tables. Use the useExport hook to download resource collections as CSV files directly from Refine v4."
---

`useExport` hook allows you to export data as a `CSV` file. It calls the `getList` method of your data provider and downloads the data as a `CSV` file.

Internally, it uses [Papa Parse][papaparse] to create the `CSV` file.

## Usage

Here is a basic usage example of the `useExport` hook:

```tsx
import { useExport } from "@refinedev/core";

interface IPost {
  id: number;
  slug: string;
  title: string;
  content: string;
}

export const PostList: React.FC = () => {
  const { triggerExport } = useExport<IPost>();

  return <button onClick={triggerExport}>Export Button</button>;
};
```

## Properties

### resource

Determines which resource is passed to the `getList` method of your data provider. By default, it reads the resource name from the current route.

```ts
useExport({
  resource: "posts",
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### mapData

If you want to map the data before exporting it, you can use the `mapData` property.

```ts
interface IPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  category: {
    id: number;
  };
}

useExport<IPost>({
  mapData: (item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.content,
      categoryId: item.category.id,
    };
  },
});
```

### sorters

If you want to sort the data before exporting it, you can use the `sorters` property. It will be passed to the `getList` method of your data provider.

> For more information, refer to the [`CrudSorting` interface&#8594](/core/docs/core/interface-references#crudsorting)

```ts
useExport({
  sorters: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

### filters

If you want to filter the data before exporting it, you can use the `filters` property. It will be passed to the `getList` method of your data provider.

> For more information, refer to the [`CrudFilters` interface &#8594](/core/docs/core/interface-references#crudfilters)

```ts
useExport({
  filters: [
    {
      field: "title",
      operator: "contains",
      value: "foo",
    },
  ],
});
```

### maxItemCount

By default, the `useExport` hook will export all the data. If you want to limit the number of items to be exported, you can use the `maxItemCount` property.

```ts
useExport({
  maxItemCount: 100,
});
```

### pageSize

Requests to fetch data are made in batches of 20 by default. The `pageSize` property determines the number of items to be fetched in each request.

```ts
useExport({
  pageSize: 50,
});
```

### download

Whether to generate download of the CSV in browser environments, defaults to `true`.

```ts
useExport({
  download: false,
});
```

### unparseConfig

You can pass additional options to the [Papa Parse][papaparse] package by using the `unparseConfig` property.

> For more information, refer to the [`Papa Parse` options &#8594](https://www.papaparse.com/docs#config)

```ts
useExport({
  unparseConfig: {
    complete: (results, file) => {
      console.log("Parsing complete:", results, file);
    },
  },
});
```

### meta

If you want to send additional data to the `create` or `createMany` method of your data provider, you can use the `meta` property.

```ts
useExport({
  meta: {
    foo: "bar",
  },
});
```

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useExport({
  dataProviderName: "second-data-provider",
});
```

### onError

Callback function that is called when an error occurs while fetching data.

```ts
useExport({
  onError: (error) => {
    console.log(error);
  },
});
```

### ~~exportOptions~~ <PropTag deprecated />

Use [`unparseConfig`](#unparseconfig) prop instead.

You can pass additional options to the `export-to-csv` package by using the `exportOptions` property.

> For more information, refer to the [`ExportToCsv` options &#8594](https://github.com/alexcaza/export-to-csv#api)

```ts
useExport({
  exportOptions: {
    filename: "posts",
  },
});
```

### ~~resourceName~~ <PropTag deprecated />

Use `resource` instead.

### ~~sorter~~ <PropTag deprecated />

Use `sorters` instead.

## Return Values

### triggerExport

A function that triggers the export process.

```tsx
const { triggerExport } = useExport();

return <button onClick={triggerExport}>Export Button</button>;
```

### isLoading

A boolean value that indicates whether the export process is in progress.

```tsx
const { isLoading } = useExport();

return isLoading ? <div>Loading...</div> : <div>Loaded</div>;
```

## FAQ

### Handling Relational Data

A mapping function can be run on all entries before saving them, which is useful in cases where you need to reference relational data or save files in a specific format for processing in other applications.

Consider this endpoint containing some relational data:

```json
[
 {
    "id": 2,
    "title": "Et architecto et aut ex.",
    "slug": "dolorum-et-quia",
    "content": "Reprehenderit qui voluptatem in cum qui odio et.",
    "category": {
      "id": 35
    },
    "user": {
      "id": 10
    },
  },
  {
    "id": 3,
    "title": "Quam maiores officia suscipit quia vel asperiores nisi non excepturi.",
    "slug": "delectus-laborum-provident",
    "content": "Placeat eos esse.",
    "category": {
      "id": 4
    },
    "user": {
      "id": 50
    },
  },
  ...
]
```

We have the `category` and `user` fields as possible relational data keys. Their data is not responsibility of this export operation.

If we want to save their `id`'s without any other related data, we can use a mapping function to save `category.id` as `categoryId` and `user.id` as `userId`.

```ts
useExport<IPost>({
  mapData: (item) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      categoryId: item.category.id,
      userId: item.user.id,
    };
  },
});

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  category: { id: number };
  user: { id: number };
}
```

This will save the data as follows:

```json
[
  {
    "id": 2,
    "title": "Et architecto et aut ex.",
    "slug": "dolorum-et-quia",
    "content": "Reprehenderit qui voluptatem in cum qui odio et.",
    "categoryId": 35,
    "userId": 10
  },
  {
    "id": 3,
    "title": "Quam maiores officia suscipit quia vel asperiores nisi non excepturi.",
    "slug": "delectus-laborum-provident",
    "content": "Placeat eos esse.",
    "categoryId": 4,
    "userId": 50
  },
  ...
]
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useExport" />

### Return Values

| Key           | Description                                | Type               |
| ------------- | ------------------------------------------ | ------------------ |
| isLoading     | Shows true when there is an export process | `boolean`          |
| triggerExport | When invoked, starts the exporting process | `async () => void` |

### Type Parameters

| Property   | Description                                                                | Default                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------- |
| TData      | Result type of the data query type that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TVariables | Values for params                                                          | `any`                      |

[papaparse]: https://www.papaparse.com/
[baserecord]: /core/docs/core/interface-references#baserecord
