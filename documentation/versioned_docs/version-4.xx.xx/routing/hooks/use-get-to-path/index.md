---
title: "useGetToPath Hook | Dynamic URL Generation"
display_title: "useGetToPath"
sidebar_label: "useGetToPath"
description: "Resolve resource paths programmatically. Use the useGetToPath hook to generate accurate URLs for CRUD actions in Refine v4."
---

`useGetToPath` is a hook that returns a function that composes the URL for the given `resource` and the `action` by using the URL parameters and the `meta` property if provided.

This is useful when you want to navigate to a specific action of a resource and you want to have the URL to be composed automatically.

## Usage

```tsx
import { useGetToPath, useGo } from "@refinedev/core";

// Let's assume that we have a resource named `posts` and the `edit` action path is `/:authorId/posts/:id/edit`

const MyComponent = () => {
  const getToPath = useGetToPath();

  const go = useGo();

  return (
    <Button
      onClick={() => {
        go({
          to: getToPath({
            resource: "posts",
            action: "edit",
            meta: {
              id: 1,
              authorId: 2,
            },
          }),
        });
      }}
    >
      Go To Edit Post
    </Button>
  );

  /* ... */
};
```

:::tip

The `authorId` and `id` parameters will be inferred from the route if they are present in the URL. If you want to explicitly set the value of a parameter, you can use the `meta` property.

:::

## Parameters

### resource

This is the name of the resource that you want to navigate to.

### action

This is the name of the action that you want to navigate to.

### meta

This is the meta object that you want to use to compose the URL. It will be merged with the `params` object that is parsed from the URL.

### legacy

This is a boolean value that indicates whether the legacy URL format should be used or not. If it is set to `true`, the URL will be composed for the legacy routers. Default value is `false`.
