---
title: "useLogList Hook | Fetching Activity Logs in Refine v4"
display_title: "useLogList"
sidebar_label: "useLogList"
description: "Learn how to list and filter activity logs efficiently. Use the useLogList hook to build transparent audit trails for your enterprise applications."
---

If you need to list audit log events, you can use the `useLogList` hook of Refine, which uses the `get` method from [`auditLogProvider`](/core/docs/audit-logs/audit-log-provider#get) under the hood.

## Usage

```tsx
import { useLogList } from "@refinedev/core";

const postAuditLogResults = useLogList({
  resource: "posts",
});
```

## API Reference

### Properties

| Property                      | Type                                                              | Default                         |
| ----------------------------- | ----------------------------------------------------------------- | ------------------------------- |
| resource <PropTag asterisk /> | `string`                                                          | Action that it reads from route |
| action                        | `string`                                                          |                                 |
| author                        | `Record<string, any>`                                             |                                 |
| meta                          | `Record<string, any>`                                             |                                 |
| metaData                      | [`MetaDataQuery`](/core/docs/core/interface-references#metaquery) |                                 |
| queryOptions                  | `UseQueryOptions<TQueryFnData, TError, TData>`                    |                                 |

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Description                              | Type                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| Result of the `react-query`'s `useQuery` | [`UseQueryResult<{ data: TData; }>`](https://react-query.tanstack.com/reference/useQuery) |

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
