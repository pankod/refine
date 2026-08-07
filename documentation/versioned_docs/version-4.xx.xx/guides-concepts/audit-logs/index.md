---
title: "Audit Logs Concept Guide | Tracking in Refine v4"
display_title: "Audit Logs"
sidebar_label: "Audit Logs"
description: "Understand the core concepts of activity tracking. Learn how Refine v4 manages audit logs to provide transparency in enterprise applications."
---

Audit logs are useful tool for web applications, providing a reliable record of user actions and system changes. Capturing and storing these logs ensures transparency and accountability which can be crucial for **security**, **compliance**, and debugging purposes.

## Audit Log Provider

Refine offers [Audit Log Provider](/core/docs/audit-logs/audit-log-provider) to centralize retrieving audit logs easily across your application.

CRUD operations are automatically logged when **Audit Log Provider** is provided, along with the current user information coming from [useGetIdentity](/core/docs/authentication/hooks/use-get-identity) hook.

**Audit Log Provider** is an object that contains `get`, `create` and `update` methods.

```tsx title="audit-log-provider.ts"
import { AuditLogProvider } from "@refinedev/core";

export const auditLogProvider: AuditLogProvider = {
  get: async (params) => {
    const { resource, meta, action, author, metaData } = params;

    const response = await fetch(
      `https://example.com/api/audit-logs/${resource}/${meta.id}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return data;
  },
  // Ideally, audit logs should be created in the backend.
  // It's not reliable source of truth as it can be manipulated by the user.
  create: async (params) => {
    const { resource, meta, action, author, data, previousData } = params;

    console.log(resource); // "produts", "posts", etc.
    console.log(meta); // { id: "1" }, { id: "2" }, etc.
    console.log(action); // "create", "update", "delete"
    // author object is `useGetIdentity` hook's return value.
    console.log(author); // { id: "1", name: "John Doe" }
    console.log(data); // { name: "Product 1", price: 100 }
    console.log(previousData); // { name: "Product 1", price: 50 }

    await fetch("https://example.com/api/audit-logs", {
      method: "POST",
      body: JSON.stringify(params),
    });

    return { success: true };
  },
  update: async (params) => {
    const { id, name, ...rest } = params;
    console.log(id); // "1"
    console.log(name); // "Created Product 1"
    console.log(rest); // { foo: "bar" }

    await fetch(`https://example.com/api/audit-logs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(params),
    });

    return { success: true };
  },
};
```

And can be passed to `<Refine />` component's `auditLogProvider` prop:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

import { auditLogProvider } from "./audit-log-provider";

export const App = () => {
  return <Refine auditLogProvider={auditLogProvider}>{/* ... */}</Refine>;
};
```

### Hook Integrations

Refine's mutation hooks such as `useCreate`, `useCreateMany`, `useUpdate`, `useUpdateMany`, `useDelete`, `useDeleteMany` are already integrated with **Audit Log Provider**.

See the [Supported Hooks](/core/docs/audit-logs/audit-log-provider#supported-hooks) section for more information.

### Hooks

#### useLogList

You can use [useLogList](/core/docs/audit-logs/hooks/use-log) hook to retrieve audit logs. It uses **Audit Log Provider**'s `get` method under the hood.

```tsx
import { useLogList } from "@refinedev/core";

const productsAuditLogResults = useLogList({
  resource: "products",
});
```

#### useLog

You can use [useLog](/core/docs/audit-logs/hooks/use-log) hook for your custom logging needs. It uses **Audit Log Provider**'s `create` method under the hood.

```tsx
import { useLog } from "@refinedev/core";

const { log } = useLog();
const { mutate } = log;

mutate({
  resource: "products",
  action: "create",
  author: {
    username: "admin",
  },
  data: {
    title: "New Product",
  },
  meta: {
    id: 1,
  },
});
```
