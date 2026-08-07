---
title: "useLogList Hook | Options, Patterns & Edge Cases | Refine v5"
display_title: "useLogList"
sidebar_label: "useLogList"
description: "Integrate Use Log List in Refine v5. Learn best practices. Explore best practices for result for compliance and traceability. Hands-on examples included."
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

| Property                      | Type                                           | Default                         |
| ----------------------------- | ---------------------------------------------- | ------------------------------- |
| resource <PropTag asterisk /> | `string`                                       | Action that it reads from route |
| action                        | `string`                                       |                                 |
| author                        | `Record<string, any>`                          |                                 |
| meta                          | `Record<string, any>`                          |                                 |
| queryOptions                  | `UseQueryOptions<TQueryFnData, TError, TData>` |                                 |

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
