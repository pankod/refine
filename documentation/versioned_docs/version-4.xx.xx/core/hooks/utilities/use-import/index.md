---
title: "useImport Hook | CSV Data Import in Refine v4"
display_title: "useImport"
sidebar_label: "useImport"
description: "Streamline data entry with the useImport hook. Learn how to parse CSV files and bulk-insert records into your Refine v4 application."
---

`useImport` hook allows you to import data from a `CSV` file. For each row in the file, it calls the `create` or `createMany` method of your data provider according to your configuration.

Internally, it uses [Papa Parse][papaparse] to parse the file contents.

## Usage

Here is a basic usage example of the `useImport` hook:

```tsx
import { useImport } from "@refinedev/core";

interface IPostFile {
  title: string;
  categoryId: string;
}

export const PostList: React.FC = () => {
  const { inputProps } = useImport<IPostFile>();

  return <input {...inputProps} />;
};
```

## Properties

### resource

Determines which resource is passed to the `create` or `createMany` method of your data provider. By default, it reads the resource name from the current route.

```ts
useImport({
  resource: "posts",
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### mapData

If you want to map the data before sending it to a data provider method, you can use the `mapData` property.

```ts
useImport({
  mapData: (data) => ({
    ...data,
    category: {
      id: data.categoryId,
    },
  }),
});
```

### paparseOptions

You can pass any Papa Parse [options](https://www.papaparse.com/docs#config) to the `paparseOptions` property.

```ts
useImport({
  paparseOptions: {
    header: true,
  },
});
```

### batchSize

If you want to send the data in batches, you can use the `batchSize` property. When the `batchSize` is 1, it calls the `create` method of your data provider for each row in the file. When the `batchSize` is greater than 1, it calls the `createMany` method of your data provider for each batch. By default, it is set to [`Number.MAX_SAFE_INTEGER`][number.max_safe_integer]

```ts
useImport({
  batchSize: 1,
});
```

### onFinish

If you want to do something after the import is finished, you can use the `onFinish` property. It returns an object with two properties: `succeeded` and `errored`, which contain the responses of the successful and failed requests.

```ts
useImport({
  onFinish: (result) => {
    // success requests response
    result.succeeded.forEach((item) => {
      console.log(item);
    });

    // failed requests response
    result.errored.forEach((item) => {
      console.log(item);
    });
  },
});
```

### meta

If you want to send additional data to the `create` or `createMany` method of your data provider, you can use the `meta` property.

```ts
useImport({
  meta: {
    foo: "bar",
  },
});
```

### onProgress

A callback function that is called when the import progress changes. It returns an object with two properties: `totalAmount` and `processedAmount` which contain the total amount of rows and the processed amount of rows.

```ts
useImport({
  onProgress: ({ totalAmount, processedAmount }) => {
    // progress percentage
    console.log((processedAmount / totalAmount) * 100);
  },
});
```

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useImport({
  dataProviderName: "second-data-provider",
});
```

### ~~resourceName~~ <PropTag deprecated />

Use `resource` instead.

## Return Values

### inputProps

`inputProps` is an object that contains the props of the `input` element. You can spread it to the `input` element.

```tsx
const { inputProps } = useImport();

return <input {...inputProps} />;
```

#### type

It is set to `file` by default.

#### accept

It is set to `.csv` by default.

#### onChange

It handles the file change event. If the file exists, it will call the `handleChange` method with the file as an argument.

### handleChange

`handleChange` is a function that handles the file change event. It accepts an object with a `file` property which is the file that is selected by the user.

```tsx
const { handleChange } = useImport();

return (
  <input
    type="file"
    onChange={(event) => {
      if (event.target.files) {
        handleChange({
          file: event.target.files[0],
        });
      }
    }}
  />
);
```

### isLoading

`isLoading` is a boolean that indicates whether the import is in progress or not.

### mutationResult

Returns the result of either the [`useCreate`](/core/docs/data/hooks/use-create) or the [`useCreateMany`](/core/docs/data/hooks/use-create) hook.

## FAQ

### Handling Relational Data

Sometimes you need to process your parsed `CSV` data for certain cases, such as when your data includes relational data and references to other data or when your backend API requires a specific data format. To handle this, you can use the `mapData` option in `useImport` to customize the process.

For example, the `CSV` file is as follows:

```csv title="dummy.csv"
"title","content","status","categoryId","userId"
"dummy title 1","dummy content 1","rejected","3","8"
"dummy title 2","dummy content 2","draft","44","8"
"dummy title 3","cummy content 3","published","41","10"
```

Since the `user` and `category` are relational fields, we store only their `id` fields in the exported file as `userId` and `categoryId` respectively. To create resources from this file, we need to map the data back to the required format of the backend API. To do this, we use the mapData option in `useImport`. Here's an example:

When creating these resources back, we should map it back to our backend API's required format. `mapData` option allows us to do this. Here is an example:

```ts
useImport<IPostFile>({
  mapData: (item) => {
    return {
      title: item.title,
      content: item.content,
      status: item.status,
      category: {
        id: item.categoryId,
      },
      user: {
        id: item.userId,
      },
    };
  },
});

interface IPostFile {
  title: string;
  status: string;
  content: string;
  categoryId: string;
  userId: string;
}
```

With this code, the parsed data will be mapped to conform to the API requirements.

## API Reference

### Properties

<PropsTable module="@refinedev/core/useImport" />

### Return Values

| Property       | Description                                                            | Type                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputProps     | Props to that you can pass `<input />` element props.                  | [`UseImportInputPropsType`][useimportinputpropstype]                                                                                                                                                                                   |
| handleChange   | Props to handle `<input type="file">` element `onChange`               | `function`                                                                                                                                                                                                                             |
| isLoading      | It can be used to handle the `loading` status for the Import operation | `boolean`                                                                                                                                                                                                                              |
| mutationResult | Result of the mutation/mutations of creating imported resources        | [`UseMutationResult<{ data: TData }, TError, { resource: string; values: TVariables; }, unknown>`][usemutation]) \| [`UseMutationResult<{ data: TData[]},TError, { resource: string; values: TVariables[]; }, unknown>`][usemutation]) |

### Type Parameters

| Property   | Description                                                                | Default                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------- |
| TItem      | Interface of parsed csv data                                               | `any`                      |
| TData      | Result type of the data query type that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]                  | [`HttpError`][httperror]   |
| TVariables | Values for mutation function                                               | `any`                      |

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[papaparse]: https://www.papaparse.com/
[usemutation]: https://tanstack.com/query/latest/docs/react/reference/useMutation
[number.max_safe_integer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
[useimportinputpropstype]: /core/docs/core/interface-references#useimportinputpropstype

## Example

<CodeSandboxExample path="core-use-import" />
