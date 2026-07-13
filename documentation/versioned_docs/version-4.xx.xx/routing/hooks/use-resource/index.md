---
title: "useResource Hook | Managing Refine v4 Resources"
display_title: "useResource"
sidebar_label: "useResource"
description: "Retrieve metadata and configuration for your resources. Learn how to use the useResource hook to build dynamic, data-driven UIs."
---

`useResource` is used to get the resources array that you defined in `<Refine>`. It also returns the `resource` object. You can pass a resource name or identifier to match a resource or it will return the resource object that matches the current route.

If you pass a resource name or identifier to `useResource`, it will return the `resource` object that matches the name or identifier. If there is no match, a temporary `resource` will be created with the provided name or identifier.

## Usage

### Without parameters

If you don't pass any parameter to `useResource`, it will return the resource object that matches the current route by default. If there is no match, the `resource` will be `undefined`.

```ts
import { useResource } from "@refinedev/core";

const { resources, resource, action, id } = useResource();
```

### With a resource name or identifier

If you pass a resource name or identifier to `useResource`, it will return the resource object that matches the name or identifier. If there is no match, a temporary `resource` will be created with the provided name or identifier.

```ts
import { useResource } from "@refinedev/core";

const { resource } = useResource("posts");
```

## Return Values

### resources

An array of resources that you defined in `<Refine>`.

### resource

The `resource` object.

### resourceName

Resource name of the `resource` object.

### ~~id~~ <PropTag deprecated />

> Use [`useResourceParams`](/core/docs/routing/hooks/use-resource-params) instead.

`id` parameter of the current route.

### ~~action~~ <PropTag deprecated />

> Use [`useResourceParams`](/core/docs/routing/hooks/use-resource-params) instead.

`action` from the current route if there is a match.

### select

The function allows you to retrieve a `resource` object and matched `identifier` by providing either a resource `name` or `identifier`. By default, if there is no match for the given `name` or `identifier`, the function will return the `resource` object and `identifier` associated with the provided value.

If you don't pass any parameter to `useResource`, it will try to infer the `resource` from the current route. If there is no match, the `resource` and `identifier` will be `undefined`.

The function also accepts a second parameter `force` which is `true` by default. If you set it to `false`, it will not return a `resource` object and `identifier` if there is no match.

### identifier

Identifier value for the current resource, this can either be the `identifier` property or the `name` property of the resource.

## API Reference

### Properties

<PropsTable module="@refinedev/core/useResource"  />

### Return value

| Description  | Type                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| resources    | [`IResourceItem[]`](#interfaces)                                                                                          |
| resource     | [`IResourceItem` \| `undefined`](#interfaces)                                                                             |
| resourceName | `string` \| `undefined`                                                                                                   |
| id           | [`BaseKey`](/core/docs/core/interface-references#basekey)                                                                 |
| action       | `undefined` \| `"list"` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"`                                                |
| select       | `(resourceName: string, force?: boolean) => { resource: IResourceItem` \| `undefined, identifier: string` \| `undefined}` |
| identifier   | `string` \| `undefined`                                                                                                   |

#### Interfaces

```ts
interface IResourceComponents {
  list?:
    | string
    | React.ComponentType<any>
    | { component: React.ComponentType<any>; path: string };
  create?:
    | string
    | React.ComponentType<any>
    | { component: React.ComponentType<any>; path: string };
  edit?:
    | string
    | React.ComponentType<any>
    | { component: React.ComponentType<any>; path: string };
  show?:
    | string
    | React.ComponentType<any>
    | { component: React.ComponentType<any>; path: string };
}

interface IResourceItem extends IResourceComponents {
  name: string;
  identifier?: string;
  meta?: MetaProps;
}
```
