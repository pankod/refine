---
title: "useResourceParams Hook | Route State Management"
display_title: "useResourceParams"
sidebar_label: "useResourceParams"
description: "Fetch current resource parameters from the URL. Optimize your components by accessing route-bound data with Refine v4's utility hook."
source: packages/core/src/hooks/use-resource-params
---

`useResourceParams` is used to get the related parameters of the current resource such as `resource`, `id` and `action`. It also provides `formAction` to determine the action of the form and `setId` to set the `id` programmatically without having to use a separate state for it.

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

## API Reference

### Properties

<PropsTable module="@refinedev/core/useResourceParams"  />

### Return value

| Description | Type                                                                       |
| ----------- | -------------------------------------------------------------------------- |
| resource    | `IResourceItem` \| `undefined`                                             |
| identifier  | `string` \| `undefined`                                                    |
| id          | [`BaseKey` \| `undefined`](/core/docs/core/interface-references#basekey)   |
| setId       | `(id: BaseKey) => void`                                                    |
| action      | `undefined` \| `"list"` \| `"create"` \| `"edit"` \| `"show"` \| `"clone"` |
| formAction  | `"create"` \| `"edit"` \| `"clone"`                                        |
