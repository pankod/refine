---
id: audit-log-provider
title: Audit Log Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

**refine** allows you to track changes in your data and keep track of who made the changes. This is done by sending a new log event record whenever a new record is created, updated or deleted. Mutations made with data hooks are automatically sent the `auditLogProvider` as an event. You can also manually send events to the `auditLogProvider` via hooks.

An audit log provider must have the following three methods:

- `create`: Logs an event to the audit log.
- `get`: Returns a list of events.
- `update`: Updates an event in the audit log.

Below are the corresponding interfaces for each of these methods.

```ts
const auditLogProvider = {
    create: (params: {
        resource: string;
        action: string;
        data?: any;
        author?: {
            name?: string;
            [key: string]: any;
        };
        previousData?: any;
        meta?: Record<string, any>;
    }) => void;
    get: (params: {
        resource: string;
        action?: string;
        meta?: Record<string, any>;
        author?: Record<string, any>;
        metaData?: MetaDataQuery;
    }) => Promise<any>;
    update: (params: {
        id: BaseKey;
        name: string;
    }) => Promise<any>;
}
```

:::note
**refine** provides the `useLog` and `useLogList` hooks to access your `auditLogProvider` methods from anywhere in your application.
:::

## Usage

You just need to pass your `auditLogProvider` object to `<Refine>`:

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";

import auditLogProvider from "./auditLogProvider";

const App: React.FC = () => {
  return <Refine auditLogProvider={auditLogProvider} />;
};
```

## Creating an Audit Log Provider

Let's create an `auditLogProvider` to understand better. In this example, we will use `dataProvider` to handle events. But you can handle events whatever you want because **refine** provides an agnostic API. So, If you want to use a third-party library, of course, you can.

### `get`

This method is used to list audit log events.

For example, using `useLogList` hook to list all resource activities by a specific record id creates an event like this:

```json
{
  "resource": "posts",
  "meta": {
    "id": "1"
  }
}
```

:::info
The event is create with parameters passed to the `useLogList` hook.
:::

Now let's see how we can handle these events in our audit log provider.

```ts title="auditLogProvider.ts"
import refineSimpleRestDataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider = refineSimpleRestDataProvider(API_URL);

const auditLogProvider: AuditLogProvider = {
  get: async ({ resource, meta }) => {
    const { data } = await dataProvider(API_URL).getList({
      resource: "logs",
      filters: [
        {
          field: "resource",
          operator: "eq",
          value: resource,
        },
        {
          field: "meta.id",
          operator: "eq",
          value: meta?.id,
        },
      ],
    });

    return data;
  },
};
```

#### Parameter Types

This method can take the following parameters via hooks. You can use these parameters to filter the events.

| Name     | Type                                               |
| -------- | -------------------------------------------------- |
| resource | `string`                                           |
| action   | `"create"` \| `"update"` \| `"delete"` \| `string` |
| meta     | `Record<string, any>`                              |
| author   | `Record<string, any>`                              |

### `create`

This method is used to create an audit log event. It is triggered when a new successful mutation or when you use `useLog`'s `log` method. The incoming parameters show the values of the new record to be created.

:::caution
We recommend you create audit logs on the API side for security concerns because data can be changed on the client side.
:::

When the mutations is successful, the `create` method is called with the following parameters, depending on the mutation type:

<Tabs
defaultValue="create"
values={[
{label: 'Create event', value: 'create'},
{label: 'Update event', value: 'update'},
{label: 'Delete event', value: 'delete'}
]}>
<TabItem value="create">

When a record is created, refine automatically sends an event to `create` method like this:

```json
{
  "action": "create",
  "resource": "posts",
  "data": {
    "id": "1",
    "title": "Hello World",
    "content": "Hello World"
  },
  "meta": {
    "dataProviderName": "simple-rest",
    // If request response has a `id` field, it will be add in the `meta` field.
    "id": "1"
  }
}
```

:::info
The `id` of the created record is added to the `meta` object. It can be used for filtering purposes.
:::

</TabItem>
<TabItem value="update">

When a record is updated, refine automatically sends an event to `create` method like this:

```json
{
  "action": "update",
  "resource": "posts",
  "data": {
    "id": "1",
    "title": "New Hello World",
    "content": "New Hello World"
  },
  "previousData": {
    "id": "1",
    "title": "Hello World",
    "content": "Hello World"
  },
  "meta": {
    "dataProviderName": "simple-rest",
    "id": "1"
  }
}
```

:::info
**refine** returns the `previousData` from the react-query cache. So, if it cannot find the previous data, it will return `undefined`.
:::

</TabItem>
<TabItem value="delete">

When a record is deleted, refine automatically sends an event to `create` method like this:

```json
{
  "action": "delete",
  "resource": "posts",
  "meta": {
    "dataProviderName": "simple-rest",
    "id": "1"
  }
}
```

</TabItem>
</Tabs>

:::tip
If [`getUserIdentity`](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) is defined in your auth provider, the `author` object is added to the event with the value returned by `getUserIdentity`.

:::

<br />

Now let's see how we can handle these events in our audit log provider.

```ts title="auditLogProvider.ts"
import refineSimpleRestDataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider = refineSimpleRestDataProvider(API_URL);

const auditLogProvider: AuditLogProvider = {
  create: (params) => {
    return dataProvider(API_URL).create({
      resource: "logs",
      variables: params,
    });
  },
};
```

#### Parameter Types

This method can take the following parameters.

| Name     | Type                                               |
| -------- | -------------------------------------------------- |
| resource | `string`                                           |
| action   | `"create"` \| `"update"` \| `"delete"` \| `string` |
| meta     | `Record<string, any>`                              |
| data     | `Record<string, any>`                              |
| author   | `Record<string, any>`                              |

<br/>

:::info
**refine** will use this `create` method in the [`useLog`](/core/docs/3.xx.xx/api-reference/core/hooks/audit-log/useLog) hook.

[Refer to the `useLog` documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/audit-log/useLog)

:::

### `update`

This method is used to update an audit log event.

:::tip
If you want to name an event, this is the way to do it. You can create a milestone by naming it.
:::

For example, using `useLog`'s `log` method creates an event like below:

```json
{
  "id": "1",
  "name": "event name"
}
```

```ts title="auditLogProvider.ts"
import refineSimpleRestDataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const dataProvider = refineSimpleRestDataProvider(API_URL);

const auditLogProvider: AuditLogProvider = {
  update: async ({ id, name }) => {
    const { data } = await dataProvider(API_URL).update({
      resource: "logs",
      id,
      variables: { name },
    });
    return data;
  },
};
```

#### Parameter Types

This method can take the following parameters.

| Name | Type      |
| ---- | --------- |
| id   | `BaseKey` |
| name | `string`  |

<br />

:::info

**refine** will use this `update` method in the [`useLog`](/core/docs/3.xx.xx/api-reference/core/hooks/audit-log/useLog) hook.

[Refer to the `useLog` documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/audit-log/useLog)

:::

## Supported Hooks

**refine** creates an audit log event when the mutation is successful on hooks that `useCreate`, `useUpdate` and `useDelete` hooks. The `useCreateMany`, `useUpdateMany` and `useDeleteMany` hooks are not create audit log events.

### `useCreate`

When `useCreate` is called, `refine` sends the following parameters to audit log provider's `create` method.

```ts
const { mutate } = useCreate();

mutate({
  resource: "posts",
  values: {
    title: "New Post",
    status: "published",
    content: "New Post Content",
  },
  metaData: {
    foo: "bar",
  },
});
```

```json title="Create event"
{
  "action": "create",
  "resource": "posts",
  "data": {
    "title": "Title",
    "status": "published",
    "content": "New Post Content"
  },
  "meta": {
    "id": "1",
    // `metaData` is included in `meta`.
    "foo": "bar"
  }
}
```

### `useUpdate`

When `useUpdate` is called, `refine` sends the following parameters to audit log provider's `create` method.

```ts
const { mutate } = useUpdate();

mutate({
  id: 1,
  resource: "posts",
  values: {
    title: "Updated New Title",
  },
});
```

```json title="Update event"
{
  "action": "update",
  "resource": "posts",
  "data": {
    "title": "Updated New Title",
    "status": "published",
    "content": "New Post Content"
  },
  "previousData": {
    "title": "Title",
    "status": "published",
    "content": "New Post Content"
  },
  "meta": {
    "id": 1
  }
}
```

### `useDelete`

When `useDelete` is called, `refine` sends the following parameters to audit log provider's `create` method.

```ts
const { mutate } = useDelete();

mutate({
  id: 1,
  resource: "posts",
});
```

```json title="Delete event"
{
  "action": "delete",
  "resource": "posts",
  "meta": {
    "id": 1
  }
}
```

<br/>

## Enable/Disable to Audit Log by Mutation Type for a Resource

The `options` allows you to manage the audit log events for a resource. In addition, it can be managed in which type of mutations an event will be created. **If no definition is made, it works in all actions**.

In this case, only events will be created for the `create` mutation.

```ts title="App.tsx"
<Refine
  dataProvider={dataProvider(API_URL)}
  resources={[
    {
      name: "posts",
      list: PostList,
      create: PostCreate,
      edit: PostEdit,
      show: PostShow,
      canDelete: true,
      // highlight-start
      options: {
        auditLog: {
          permissions: ["create"],
        },
      },
      // highlight-end
    },
  ]}
/>
```

## Example

<CodeSandboxExample path="audit-log-provider" />
