---
title: "shadcn/ui Show Button Component | Navigation UI in Refine v5"
display_title: "Show"
sidebar_label: "Show"
description: "Explore how to integrate Show Button in Refine v5. Learn integration patterns for route for polished admin UIs. Hands-on examples included."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/buttons/show.tsx
---

`<ShowButton>` uses shadcn/ui's [`<Button>`](https://ui.shadcn.com/docs/components/button) component and the `show` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation/) under the hood.

It can be useful when redirecting the app to the show page with the record id route of the resource.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/buttons.json
```

This will add all button components including `ShowButton`.

## Usage

```tsx
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const PostList = () => {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];

  return (
    <Table>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>
              <ShowButton resource="posts" recordItemId={post.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path. By default, the `recordItemId` is inferred from the route params.

```tsx
import { ShowButton } from "@/components/refine-ui/buttons/show";

const MyComponent = () => {
  return <ShowButton resource="posts" recordItemId="123" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

### resource

`resource` is used to redirect the app to the `show` action of the given resource name. By default, the app redirects to the inferred resource's `show` action path.

```tsx
import { ShowButton } from "@/components/refine-ui/buttons/show";

const MyComponent = () => {
  return <ShowButton resource="categories" recordItemId="123" />;
};
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

### meta

It is used to pass additional parameters to the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/). By default, existing parameters in the route are used by the `show` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `show` action route is defined by the pattern: `/posts/:authorId/show/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <ShowButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx
import { ShowButton } from "@/components/refine-ui/buttons/show";

const MyComponent = () => {
  return <ShowButton recordItemId="123" hideText={true} />;
};
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/).

```tsx
import { ShowButton } from "@/components/refine-ui/buttons/show";

const MyComponent = () => {
  return (
    <ShowButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### children

It is used to change the text of the button. By default, the text is "Show".

```tsx
import { ShowButton } from "@/components/refine-ui/buttons/show";

const MyComponent = () => {
  return <ShowButton recordItemId="123">View Details</ShowButton>;
};
```

## API Reference

### Properties

| Property        | Type                                                  | Default                                        | Description                                                                                                             |
| --------------- | ----------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `recordItemId`  | `BaseKey` (string or number)                          | Inferred from route params                     | The ID of the record to show                                                                                            |
| `resource`      | `string`                                              | Inferred from route                            | The resource name or identifier                                                                                         |
| `meta`          | `Record<string, unknown>`                             | -                                              | Additional metadata to pass to the `show` method                                                                        |
| `hideText`      | `boolean`                                             | `false`                                        | If true, only the icon will be shown                                                                                    |
| `accessControl` | `{ enabled?: boolean; hideIfUnauthorized?: boolean }` | `{ enabled: true, hideIfUnauthorized: false }` | Configures access control behavior                                                                                      |
| `children`      | `ReactNode`                                           | Default text & icon                            | Custom content for the button                                                                                           |
| `...rest`       | `React.ComponentProps<typeof Button>`                 | -                                              | Other props are passed to the underlying shadcn/ui `Button` component (e.g., `variant`, `size`, `className`, `onClick`) |

:::info External Props
It also accepts all props of shadcn/ui [Button](https://ui.shadcn.com/docs/components/button).
:::
