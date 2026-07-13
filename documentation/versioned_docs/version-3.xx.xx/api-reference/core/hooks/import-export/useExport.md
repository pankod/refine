---
id: useExport
title: useExport
---

`useExport` hook allows you to export data as a `CSV` file. It calls the `getList` method of your data provider and downloads the data as a `CSV` file.

Internally, it uses [`export-to-csv`][export-to-csv] to create the `CSV` file.

## Basic Usage

Here is a basic usage example of `useExport` hook:

```tsx
import { useExport } from "@pankod/refine-core";

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

### `resourceName`

> Default: Read from the current route

Determines which resource is passed to the `getList` method of your data provider.

```ts
useExport({
  resourceName: "posts",
});
```

### `mapData`

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

### `sorter`

If you want to sort the data before exporting it, you can use the `sorter` property. It will be passed to the `getList` method of your data provider.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudsorting)

```ts
useExport({
  sorter: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

### `filters`

If you want to filter the data before exporting it, you can use the `filters` property. It will be passed to the `getList` method of your data provider.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudfilters)

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

### `maxItemCount`

By default, the `useExport` hook will export all the data. If you want to limit the number of items to be exported, you can use the `maxItemCount` property.

```ts
useExport({
  maxItemCount: 100,
});
```

### `pageSize`

> Default: 20

Requests to fetch data are made in batches. The `pageSize` property determines the number of items to be fetched in each request.

```ts
useExport({
  pageSize: 50,
});
```

### `exportOptions`

You can pass additional options to the `export-to-csv` package by using the `exportOptions` property.

[Refer to the `ExportToCsv` options for more information &#8594](https://github.com/alexcaza/export-to-csv#api)

```ts
useExport({
  exportOptions: {
    filename: "posts",
  },
});
```

### `metaData`

If you want to send additional data to the `create` or `createMany` method of your data provider, you can use the `metaData` property.

```ts
useExport({
  metaData: {
    foo: "bar",
  },
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useExport({
  dataProviderName: "second-data-provider",
});
```

### `onError`

Callback function that is called when an error occurs while fetching data.

```ts
useExport({
  onError: (error) => {
    console.log(error);
  },
});
```

## Return Values

### `triggerExport`

A function that triggers the export process.

```tsx
const { triggerExport } = useExport();

return <button onClick={triggerExport}>Export Button</button>;
```

### `isLoading`

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

We have the `category` and `user` fields as possible relational data keys. Their data is out of the responsibility of this export operation.

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

<PropsTable module="@pankod/refine-core/useExport" />

### Return Values

| Key           | Description                                | Type               |
| ------------- | ------------------------------------------ | ------------------ |
| isLoading     | Shows true when there is an export process | `boolean`          |
| triggerExport | When invoked, starts the exporting process | `async () => void` |

### Type Parameters

| Property   | Desription                                                                 | Default                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------- |
| TData      | Result type of the data query type that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TVariables | Values for params                                                          | `any`                      |

[export-to-csv]: https://github.com/alexcaza/export-to-csv
[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
