---
id: useBreadcrumb
title: useBreadcrumb
source: packages/core/src/hooks/breadcrumb
---

:::info Congratulations 🥇
The feature won first place with the joint votes of our team members in a May 2022 internal hackathon!

Congratulations [@salihozdemir](https://github.com/salihozdemir)! It was great seeing your project take first place! We're all very proud of you. Keep up the good work and don't forget to have fun while working here 🎉
:::

It is a hook that returns `breadcrumbs` to create breadcrumbs for the current page. The `breadcrumbs` is an array of objects with the following properties:

- `label`: the label of the resource.
- `href`: the route of the resource.
- `icon`: the icon of the resource.

## Basic Usage

```tsx
import React from "react";
import { useBreadcrumb } from "@pankod/refine-core";

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
    icon: <div>icon</div>,
    list: () => <div>List Page</div>,
    create: () => <div>Create Page</div>,
  },
];
```

- On the `list` page of the `posts` resource, the breadcrumbs look like this:

  ```tsx
  [
    {
      label: "Posts",
      href: "/posts",
      icon: <div>icon</div>,
    },
  ];
  ```

- On the `create` page of the `posts` resource, the breadcrumbs look like this:

  ```tsx
  [
    {
      label: "Posts",
      href: "/posts",
      icon: <div>icon</div>,
    },
    { label: "Create" },
  ];
  ```

:::info
If the resource has no `icon` property, the `icon` property of the breadcrumbs is `undefined`. Likewise, if the resource's list page is not found, the `href` property of the breadcrumbs is `undefined`.
:::

### Nested resource

If you have a nested resource definition as below:

```tsx
[
  {
    name: "cms",
  },
  {
    name: "users",
    parentName: "cms",
    list: () => <div>List Page</div>,
    create: () => <div>Create Page</div>,
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

## i18n support

If the `resource` definition has a `label` property, `useBreadcrumbs` uses the `label` property. Otherwise, the `name` property of the `resource` is used. Likewise, if the `resource` definition has `route` property, `useBreadcrumbs` uses the `route` property. Otherwise, the `name` property of the `resource` is used.

:::info

If a `label` is not provided in your `posts` resource, `useBreadcrumb` uses the [`useTranslate`](/core/docs/3.xx.xx/api-reference/core/hooks/translate/useTranslate) hook to translate the names.

For CRUD operations (`list`,`create`,`edit`,`show`) the `useBreadcrumb` uses the `actions` key to translate key `` translate(`actions.${action}`) ``.

For example; `create` action should look like : `` translate(`actions.create`) ``

:::

## API Reference

### Return values

| Property    | Description           | Type                |
| ----------- | --------------------- | ------------------- |
| breadcrumbs | The breadcrumbs array | `BreadcrumbsType`\* |

> **BreadcrumbsType**
>
> ```tsx
> type BreadcrumbsType = {
>   label: string;
>   href?: string;
>   icon?: React.ReactNode;
> };
> ```
