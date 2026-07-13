---
id: useResource
title: useResource
---

`useResource` is used to get the resources array that you defined in `<Refine>`. It also returns `resource` object, `resourceName` and query params `id` and `action`.

```ts
import { useResource } from "@pankod/refine-core";

const { resources, resource, action, id } = useResource();
```

## Properties

### `resourceNameOrRouteName`

It is used to get resource object by name or route name.

```ts
import { useResource } from "@pankod/refine-core";

const { resource } = useResource({
  resourceNameOrRouteName: "posts",
});
```

## Return Values

### `resources`

An array of resources that you defined in `<Refine>`.

### `resource`

Resource object.

### `resourceName`

Resource name of resource object.

### `id`

Query param `id`.

### `action`

Query param `action`.

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useResource"  />

### Return value

| Description  | Type                                                                  |
| ------------ | --------------------------------------------------------------------- |
| resources    | [`IResourceItem[]`](#interfaces)                                      |
| resource     | [`IResourceItem`](#interfaces)                                        |
| resourceName | `string`                                                              |
| id           | [`BaseKey`](/core/docs/3.xx.xx/api-reference/core/interfaces#basekey) |
| action       | `undefined` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"`        |

#### Interfaces

```ts
type OptionsProps<TExtends = { [key: string]: any }> = TExtends & {
  label?: string;
  route?: string;
  hide?: boolean;
  auditLog?: {
    permissions?: AuditLogPermissions[number][] | string[];
  };
};

interface IResourceComponentsProps<
  TCrudData = any,
  TOptionsPropsExtends = { [key: string]: any },
> {
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canShow?: boolean;
  name?: string;
  initialData?: TCrudData;
  options?: OptionsProps<TOptionsPropsExtends>;
}

interface IResourceComponents {
  list?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
  create?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
  edit?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
  show?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
}

interface IResourceItem extends IResourceComponents {
  name: string;
  label?: string;
  route?: string;
  icon?: ReactNode;
  canCreate?: boolean;
  canEdit?: boolean;
  canShow?: boolean;
  canDelete?: boolean;
  options?: OptionsProps;
  parentName?: string;
}
```

> The `canCreate`, `canShow` and `canEdit` properties are defined automatically if the `create`, `show` and `edit` components are defined on the `resources` property in `<Refine>`.
