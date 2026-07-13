---
title: "shadcn/ui Create Button Component | Navigation UI in Refine v5"
display_title: "Create"
sidebar_label: "Create"
description: "Secure Create Button in Refine v5. Learn best practices. Learn integrate Radix UI, Tailwind CSS for polished admin UIs. Real-world snippets included."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/buttons/create.tsx
---

`<CreateButton>` uses shadcn/ui's [`<Button>`](https://ui.shadcn.com/docs/components/button) component and the `create` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation/) under the hood.

It can be useful when redirecting the app to the create page of the resource.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/buttons.json
```

This will add all button components including `CreateButton`.

## Usage

```tsx
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { List } from "@/components/refine-ui/views/list";

const PostList = () => {
  return (
    <List>
      <div className="flex justify-between items-center mb-4">
        <h1>Posts</h1>
        <CreateButton resource="posts" />
      </div>
      {/* Your list content */}
    </List>
  );
};
```

## Properties

### resource

`resource` is used to redirect the app to the `create` action of the given resource name. By default, the app redirects to the inferred resource's `create` action path.

```tsx
import { CreateButton } from "@/components/refine-ui/buttons/create";

const MyComponent = () => {
  return <CreateButton resource="categories" />;
};
```

Clicking the button will trigger the `create` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `create` action path of the resource.

### meta

It is used to pass additional parameters to the `create` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/). By default, existing parameters in the route are used by the `create` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `create` action route is defined by the pattern: `/posts/create/:authorId`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <CreateButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { CreateButton } from "@/components/refine-ui/buttons/create";

const MyComponent = () => {
  return <CreateButton hideText={true} />;
};
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/).

```tsx
import { CreateButton } from "@/components/refine-ui/buttons/create";

const MyComponent = () => {
  return (
    <CreateButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### children

It is used to change the text of the button. By default, the text is "Create".

```tsx
import { CreateButton } from "@/components/refine-ui/buttons/create";

const MyComponent = () => {
  return <CreateButton>Add New Post</CreateButton>;
};
```

## API Reference

### Properties

| Property        | Type                                                  | Default                                        | Description                                                                                                             |
| --------------- | ----------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `resource`      | `string`                                              | Inferred from route                            | The resource name or identifier                                                                                         |
| `meta`          | `Record<string, unknown>`                             | -                                              | Additional metadata to pass to the `create` method                                                                      |
| `hideText`      | `boolean`                                             | `false`                                        | If true, only the icon will be shown                                                                                    |
| `accessControl` | `{ enabled?: boolean; hideIfUnauthorized?: boolean }` | `{ enabled: true, hideIfUnauthorized: false }` | Configures access control behavior                                                                                      |
| `children`      | `ReactNode`                                           | Default text & icon                            | Custom content for the button                                                                                           |
| `...rest`       | `React.ComponentProps<typeof Button>`                 | -                                              | Other props are passed to the underlying shadcn/ui `Button` component (e.g., `variant`, `size`, `className`, `onClick`) |

:::info External Props
It also accepts all props of shadcn/ui [Button](https://ui.shadcn.com/docs/components/button).
:::
