---
title: "useResourceParams Hook | Best Practices for Usage & Patterns in Refine v5"
display_title: "useResourceParams"
sidebar_label: "useResourceParams"
description: "Build Use Resource Params in Refine v5. Learn the key steps. Explore best practices for SSR, navigation for real-world React admin panels."
source: packages/core/src/hooks/use-resource-params
---

`useResourceParams` is used to access the related parameters of the current resource, such as `resource`, `id`, and `action`. It also provides `formAction` to determine the form action, and `setId` to set the `id` programmatically without needing a separate state. In addition, it returns the `resources` array defined in `<Refine />`.

If you pass a resource name or identifier to `useResourceParams`, it will return the matching `resource` object. If no match is found, a temporary `resource` will be created using the provided name or identifier.

## Usage

```tsx
const {
  id?, // ID of the record
  setId, // Function to set the ID
  resource?, // Resource object
  action?, // Passed action or inferred from the route
  identifier?, // Identifier value of the resource
  formAction?, // Form action derived from the action
} = useResourceParams({
  id?, // ID to set explicitly. Inferred from the route if not provided
  action?, // Action to set explicitly. Inferred from the route if not provided
  resource?, // Resource object to set explicitly. Inferred from the route if not provided
});
```

### Inferring the `id` from the route

When the `id` is not explicitly passed, it can be inferred from the route. Inference from the route is only possible under certain conditions:

- If there's no explicitly set `resource` value.
- If there's an explicitly set `resource` value and it's the same as the current route.

This check is necessary to prevent the `id` from being inferred from a different resource.

If there's no explicit `id` value, no `id` from the route or there's a mismatch between the `resource` and the route, the `id` will be set to `undefined`.

### Inferring the `formAction` from the route

The `formAction` is inferred from the `action` value.

- If the `action` is a valid form action (`create`, `edit` or `clone`), the `formAction` will be set to the `action`.
- Otherwise, the `formAction` will be set to `create`.

This is done to provide a more convenient way to determine the action of the form.

## Return Values

### resource

The `resource` object.

### identifier

Identifier value for the current resource, this can either be the `identifier` property or the `name` property of the resource.

### id

`id` parameter to be used in the actions.

### setId

Function to set the `id` programmatically.

### action

Current action to be performed. This can be explicitly passed via the `action` parameter or inferred from the route.

### formAction

Apart from the `action` value, `formAction` can only be `create`, `edit` or `clone`. If the `action` is not one of these, `formAction` will be set to `create` for convenience.

### resources

An array of resources that you defined in `<Refine>`.

### select

The function allows you to retrieve a `resource` object and matched `identifier` by providing either a resource `name` or `identifier`. By default, if there is no match for the given `name` or `identifier`, the function will return the `resource` object and `identifier` associated with the provided value.

If you don't pass any parameter to `useResource`, it will try to infer the `resource` from the current route. If there is no match, the `resource` and `identifier` will be `undefined`.

The function also accepts a second parameter `force` which is `true` by default. If you set it to `false`, it will not return a `resource` object and `identifier` if there is no match.

## API Reference

### Properties

<PropsTable module="@refinedev/core/useResourceParams"  />

### Return value

| Description | Type                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| resource    | `IResourceItem` \| `undefined`                                                                                            |
| identifier  | `string` \| `undefined`                                                                                                   |
| id          | [`BaseKey` \| `undefined`](/core/docs/core/interface-references#basekey)                                                  |
| setId       | `(id: BaseKey) => void`                                                                                                   |
| action      | `undefined` \| `"list"` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"`                                                |
| formAction  | `"create"` \| `"edit"` \| `"clone"`                                                                                       |
| select      | `(resourceName: string, force?: boolean) => { resource: IResourceItem` \| `undefined, identifier: string` \| `undefined}` |
| resources   | [`IResourceItem[]`](#interfaces)                                                                                          |
