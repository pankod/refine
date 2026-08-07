---
id: useLog
title: useLog
---

## Overview

If you need to create or update an audit log, **refine** provides the `useLog` hook for it. The hook returns two mutations called `log` and `rename`.

```tsx
import { useLog } from "@pankod/refine-core";

const { log, rename } = useLog();
```

## `log`

`log` is used to create an audit log event. The mutation uses `create` method from [`auditLogProvider`](/core/docs/3.xx.xx/api-reference/core/providers/audit-log-provider#create) under the hood.

```tsx
import { useLog } from "@pankod/refine-core";

const { log } = useLog();
const { mutate } = log;

mutate({
  resource: "posts",
  action: "create",
  author: {
    username: "admin",
  },
  data: {
    id: 1,
    title: "New post",
  },
  meta: {
    id: 1,
  },
});
```

:::caution
This hook can only be used if `auditLogProvider`'s `create` method is provided.
:::

### Properties

| Property                                                                                            | Type                  |
| --------------------------------------------------------------------------------------------------- | --------------------- |
| <div className="required-block"><div>resource</div> <div className=" required">Required</div></div> | `string`              |
| <div className="required-block"><div>action</div> <div className=" required">Required</div></div>   | `string`              |
| author                                                                                              | `Record<string, any>` |
| meta                                                                                                | `Record<string, any>` |
| data                                                                                                | `Record<string, any>` |
| previousData                                                                                        | `Record<string, any>` |

### Type Parameters

| Property   | Desription                                                                                                       | Type                                                                        | Default                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)       | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |
| TVariables | Values for mutation function                                                                                     | `{}`                                                                        | `{}`                                                                        |

### Return value

| Description                               | Type                                                                                                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData},`<br/>`TError,`<br/>` { id: BaseKey; name: string; },`<br/>` unknown>`](https://tanstack.com/query/v4/docs/framework/react/reference/useMutation) |

## `rename`

`log` is used to update an audit log event. The mutation uses `update` method from [`auditLogProvider`](/core/docs/3.xx.xx/api-reference/core/providers/audit-log-provider#update) under the hood.

```tsx
import { useLog } from "@pankod/refine-core";

const { rename } = useLog();
const { mutate } = rename;

mutate({
  id: 1,
  name: "Updated Name",
});
```

:::caution
This hook can only be used if `auditLogProvider`'s `update` method is provided.
:::

### Properties

| Property                                       | Type      |
| ---------------------------------------------- | --------- |
| id<div className=" required">Required</div>    | `BaseKey` |
| name <div className=" required">Required</div> | `string`  |

### Type Parameters

| Property   | Desription                                                                                                       | Type                                                                        | Default                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| TData      | Result data of the mutation. Extends [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) | [`BaseRecord`](/core/docs/3.xx.xx/api-reference/core/interfaces#baserecord) |
| TError     | Custom error object that extends [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)       | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   | [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror)   |
| TVariables | Values for mutation function                                                                                     | `{}`                                                                        | `{}`                                                                        |

### Return value

| Description                               | Type                                                                                                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result of the `react-query`'s useMutation | [`UseMutationResult<`<br/>`{ data: TData},`<br/>`TError,`<br/>` { id: BaseKey; name: string; },`<br/>` unknown>`](https://tanstack.com/query/v4/docs/framework/react/reference/useMutation) |

<br />

:::info
You can get audit logs with [`useLogList`](/core/docs/3.xx.xx/api-reference/core/hooks/audit-log/useLogList).
:::
