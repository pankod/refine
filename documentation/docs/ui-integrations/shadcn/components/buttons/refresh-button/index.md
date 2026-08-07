---
title: "shadcn/ui Refresh Button Component | UI Button in Refine v5"
display_title: "Refresh"
sidebar_label: "Refresh"
description: "Explore how to integrate Refresh Button in Refine v5. Explore customization options for Radix UI, Tailwind CSS for polished admin UIs."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/buttons/refresh.tsx
---

`<RefreshButton>` uses shadcn/ui's [`<Button>`](https://ui.shadcn.com/docs/components/button) component and the `invalidate` method from [`useInvalidate`](/core/docs/data/hooks/use-invalidate/) under the hood.

It can be useful when you want to refresh the data without navigating to another page.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/buttons.json
```

This will add all button components including `RefreshButton`.

## Usage

```tsx
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";
import { List } from "@/components/refine-ui/views/list";

const PostList = () => {
  return (
    <List>
      <div className="flex justify-between items-center mb-4">
        <h1>Posts</h1>
        <RefreshButton resource="posts" />
      </div>
      {/* Your list content */}
    </List>
  );
};
```

## Properties

### resource

`resource` is used to determine which resource's data will be refreshed. By default, the resource is inferred from the current route.

```tsx
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";

const MyComponent = () => {
  return <RefreshButton resource="categories" />;
};
```

### recordItemId

`recordItemId` is used to refresh a specific record's data. If not provided, all data for the resource will be refreshed.

```tsx
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";

const MyComponent = () => {
  return <RefreshButton resource="posts" recordItemId="123" />;
};
```

### onRefresh

`onRefresh` callback allows you to do something after the refresh operation is completed.

```tsx
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";

const MyComponent = () => {
  return (
    <RefreshButton
      onRefresh={() => {
        console.log("Data refreshed!");
      }}
    />
  );
};
```

### meta

It is used to pass additional parameters to the invalidation.

```tsx
const MyComponent = () => {
  return <RefreshButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";

const MyComponent = () => {
  return <RefreshButton hideText={true} />;
};
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/).

```tsx
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";

const MyComponent = () => {
  return (
    <RefreshButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### children

It is used to change the text of the button. By default, the text is "Refresh".

```tsx
import { RefreshButton } from "@/components/refine-ui/buttons/refresh";

const MyComponent = () => {
  return <RefreshButton>Reload Data</RefreshButton>;
};
```

## API Reference

### Properties

| Property        | Type                                                  | Default                                        | Description                                                                                                             |
| --------------- | ----------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `resource`      | `string`                                              | Inferred from route                            | The resource name or identifier                                                                                         |
| `recordItemId`  | `BaseKey` (string or number)                          | -                                              | If provided, refreshes data for this specific record                                                                    |
| `onRefresh`     | `() => void`                                          | -                                              | Callback function invoked after refresh operation                                                                       |
| `meta`          | `Record<string, unknown>`                             | -                                              | Additional metadata to pass to the invalidation                                                                         |
| `hideText`      | `boolean`                                             | `false`                                        | If true, only the icon will be shown                                                                                    |
| `accessControl` | `{ enabled?: boolean; hideIfUnauthorized?: boolean }` | `{ enabled: true, hideIfUnauthorized: false }` | Configures access control behavior                                                                                      |
| `children`      | `ReactNode`                                           | Default text & icon                            | Custom content for the button                                                                                           |
| `...rest`       | `React.ComponentProps<typeof Button>`                 | -                                              | Other props are passed to the underlying shadcn/ui `Button` component (e.g., `variant`, `size`, `className`, `onClick`) |

:::info External Props
It also accepts all props of shadcn/ui [Button](https://ui.shadcn.com/docs/components/button).
:::
