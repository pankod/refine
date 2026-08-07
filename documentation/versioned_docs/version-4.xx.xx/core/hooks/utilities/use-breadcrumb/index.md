---
title: "useBreadcrumb Hook | Dynamic Navigation in Refine v4"
display_title: "useBreadcrumb"
sidebar_label: "useBreadcrumb"
description: "Add data export features to your tables. Use the useExport hook to download resource collections as CSV files directly from Refine v4."
source: packages/core/src/hooks/breadcrumb
---

:::simple Congratulations 🥇

The feature won first place with the joint votes of our team members in a May 2022 internal hackathon!

Congratulations [@salihozdemir](https://github.com/salihozdemir)! It was great seeing your project take first place! We're all very proud of you. Keep up the good work and don't forget to have fun while working here 🎉

:::

It is a hook that returns `breadcrumbs` to create breadcrumbs for the current page. The `breadcrumbs` is an array of objects with the following properties:

- `label`: the label of the resource.
- `href`: the route of the resource's list action.
- `icon`: the icon of the resource.

## Usage

```tsx
import React from "react";
import { useBreadcrumb } from "@refinedev/core";

export const Breadcrumb: React.FC = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ul>
      {breadcrumbs.map(({ label, href, icon }) => (
        <li key={label}>
          {icon}
          {href ? <a href={href}>{label}</a> : label}
        </li>
      ))}
    </ul>
  );
};
```

## Examples

### Resource

The `breadcrumbs` are created with your resource definitions. For example, if you have a resource with the following definition:

```tsx
[
  {
    name: "posts",
    icon: <PostsIcon />,
    list: "/posts",
    create: "/posts/create",
  },
];
```

- On the `list` page of the `posts` resource, the breadcrumbs look like this:

  ```tsx
  [
    {
      label: "Posts",
      href: "/posts",
      icon: <PostsIcon />,
    },
  ];
  ```

- On the `create` page of the `posts` resource, the breadcrumbs look like this:

  ```tsx
  [
    {
      label: "Posts",
      href: "/posts",
      icon: <PostsIcon />,
    },
    { label: "Create" },
  ];
  ```

If the resource has no `icon` property, the `icon` property of the breadcrumbs is `undefined`. Likewise, if the resource's list page is not found, the `href` property of the breadcrumbs is `undefined`.

### Nested resource

If you have a nested resource definition as below:

```tsx
[
  {
    name: "cms",
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    meta: { parent: "cms" },
  },
];
```

- On the `list` page of the `users` resource, the breadcrumbs look like this:

  ```tsx
  [
    { label: "Cms" },
    {
      label: "Users",
      href: "/users",
    },
  ];
  ```

- On the `create` page of the `users` resource, the breadcrumbs look like this:

  ```tsx
  [
    { label: "Cms" },
    {
      label: "Users",
      href: "/users",
    },
    { label: "Create" },
  ];
  ```

### Adding a Home/Root Page

In earlier versions of Refine, `<Refine>` component accepted `DashboardPage` which could be used to add an index page to your app. With the changes in `routerProvider` API of Refine, `DashboardPage` is deprecated. You can now define an index route manually in your router package.

In earlier versions, the home icon in the `Breadcrumb` was created by the `DashboardPage`, but now it is rendered if you define an action route as `/` in any one of your resources. It will be rendered with the home icon regardless of the current route. You can also hide the home icon by setting `showHome` to `false`.

```tsx
[
  {
    name: "dashboard", // name of the resource is not important for the `useBreadcrumb` hook
    list: "/", // If any one of your resources has a list action with `/` route, the home icon will be rendered
  },
];
```

## i18n support

If the `resource` definition has a `label` property, `useBreadcrumbs` uses the `label` property. Otherwise, the `name` property of the `resource` is used. Likewise, if the `resource` definition has `route` property, `useBreadcrumbs` uses the `route` property. Otherwise, the `name` property of the `resource` is used.

If a `label` is not provided in your `posts` resource, `useBreadcrumb` uses the [`useTranslate`](/core/docs/i18n/hooks/use-translation) hook to translate the names.

For CRUD operations (`list`,`create`,`edit`,`show`) the `useBreadcrumb` uses the `actions` key to translate the key `` translate(`actions.${action}`) ``.

For example, `create` action should look like: `` translate(`actions.create`) ``

## API Reference

### Return values

| Property    | Description           | Type              |
| ----------- | --------------------- | ----------------- |
| breadcrumbs | The breadcrumbs array | `BreadcrumbsType` |

#### BreadcrumbsType

```tsx
type BreadcrumbsType = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};
```
