---
title: "Link Component | SSR in Refine v5"
display_title: "<Link />"
sidebar_label: "<Link />"
description: "Build Link in Refine v5. Learn the key steps. Learn SSR, navigation for real-world React admin panels. See practical code samples."
source: packages/core/src/components/link/index.tsx
---

`<Link />` is a component that is used to navigate to different pages in your application.

It uses [`routerProvider.Link`](/core/docs/routing/router-provider/#link) under the hood, if [`routerProvider`](/core/docs/routing/router-provider/) is not provided, it will be use [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) HTML element.

## Usage

```tsx
import { Link } from "@refinedev/core";

const MyComponent = () => {
  return (
    <>
      {/* simple usage, navigates to `/posts` */}
      <Link to="/posts">Posts</Link>
      {/* complex usage with more control, navigates to `/posts` with query filters */}
      <Link
        go={{
          query: {
            // `useTable` or `useDataGrid` automatically uses these filters to fetch data if `syncWithLocation` is true.
            filters: [
              {
                operator: "eq",
                value: "published",
                field: "status",
              },
            ],
          },
          to: {
            resource: "posts",
            action: "list",
          },
        }}
      >
        Posts
      </Link>
    </>
  );
};
```

## Props

The `<Link />` component takes all the props from the [`routerProvider.Link`](/core/docs/routing/router-provider/#link) and the props that an `<a>` HTML element uses. In addition to these props, it also accepts the `go`
and `to` props to navigate to a specific `resource` defined in the `<Refine />` component.

### go

When `go` prop is provided, this component will use [`useGo`](/core/docs/routing/hooks/use-go/) to create the URL to navigate to. It's accepts all the props that `useGo.go` accepts.

It's useful to use this prop when you want to navigate to a resource with a specific action.

:::caution

- `routerProvider` is required to use this prop.
- When `to` prop is provided, `go` will be ignored.

:::

### to

The URL to navigate to.

## Type support with generics

`<Link />` works with any routing library because it uses [`routerProvider.Link`](/core/docs/routing/router-provider/#link) internally. However, when importing it from `@refinedev/core`, it doesn't provide type support for your specific routing library. To enable full type support, you can use generics.

```tsx
import type { LinkProps } from "react-router";
import { Link } from "@refinedev/core";

const MyComponent = () => {
  return (
    // Omit 'to' prop from LinkProps (required by react-router) since we use the 'go' prop
    <Link<Omit<LinkProps, "to">>
      // Props from "react-router"
      // highlight-start
      replace={true}
      unstable_viewTransition={true}
      preventScrollReset={true}
      // highlight-end
      // Props from "@refinedev/core"
      go={{
        to: {
          resource: "posts",
          action: "list",
        },
      }}
    >
      Posts
    </Link>
  );
};
```
