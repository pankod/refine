---
title: "Mantine Breadcrumb Component | UI Component in Refine v5"
display_title: "Breadcrumb"
sidebar_label: "Breadcrumb"
description: "Explore how to integrate Breadcrumb in Refine v5. Learn integrate React UI library, components for polished admin UIs. Explore with code snippets."
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Mantine [Breadcrumb][mantine-breadcrumb] components using the [`useBreadcrumb`](/core/docs/core/hooks/utilities/use-breadcrumb/) hook.

:::simple Good to know

- You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

- In earlier versions of Refine, `<Refine>` component had accepted `DashboardPage` which could be used to add an index page to your app. With the changes in `routerProvider` API of Refine, `DashboardPage` is deprecated. You can now define an index route yourself manually by your router package.

- In earlier versions, the home icon in the `Breadcrumb` was created by the `DashboardPage`, now it is rendered if you define a an action route as `/` in any one of your resources. It will be rendered with the home icon regardless of the current route. You can also hide the home icon by setting `showHome` to `false`.

:::

## Properties

### breadcrumbProps

The `<Breadcrumb />` component uses the Mantine [Breadcrumb][mantine-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { Show, Breadcrumb } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
```

### showHome

If you have a page with route `/`, it will be used as the root of the hierarchy and shown in the `Breadcrumb` with a home icon. To hide the root item, set `showHome` to `false.`

```tsx
import { List, Breadcrumb } from "@refinedev/mantine";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb showHome={true} />}
    >
      ...
    </List>
  );
};
```

### meta

If your routes has additional parameters in their paths, you can pass the `meta` property to the `<Breadcrumb>` component to use them while creating the paths and filling the parameters in the paths. By default, existing URL parameters are used. You can use `meta` to override them or add new ones.

```tsx
import { List, Breadcrumb } from "@refinedev/mantine";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb meta={{ authorId: "123" }} />}
    >
      ...
    </List>
  );
};
```

### hideIcons

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { Show, Breadcrumb } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb hideIcons />}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/Breadcrumb" />

[mantine-breadcrumb]: https://mantine.dev/core/breadcrumbs/
