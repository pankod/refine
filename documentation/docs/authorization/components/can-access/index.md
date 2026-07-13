---
title: "Can Access Component | RBAC & Security in Refine v5"
display_title: "<CanAccess />"
sidebar_label: "<CanAccess />"
description: "Learn to implement Can Access in Refine v5. Explore secure patterns for RBAC, ABAC for secure enterprise React apps. Hands-on examples included."
siderbar_label: <CanAccess />
source: packages/core/src/components/canAccess/index.tsx
---

`<CanAccess>` is the component form of [`useCan`][use-can].

It internally uses [`useCan`][use-can]'s return values to provide its functionality.

Passes the given properties to the `can` method from your access control provider. After, if it returns `true`, it renders the children, otherwise, if it returns `false`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it renders `null`.

To learn more about authorization, check out the [Authorization](/core/docs/guides-concepts/authorization/) guide and [Access Control Provider](/core/docs/authorization/access-control-provider/) documentation.

## Basic Usage

By default, the `CanAccess` component will infer the current `resource` and the `action` based on your route automatically. `id` will also be inferred if the current route includes one.

So if you are at the `/posts` route, `CanAccess` will check authorization for the `posts` resource and the `list` action.

For `/posts/show/:id` route, the action will be `show`.

```tsx
import { CanAccess } from "@refinedev/core";

const MyComponent = () => (
  <CanAccess fallback={<CustomFallback />}>
    <YourComponent />
  </CanAccess>
);
```

### Usage with props

You may have a case like in the `/posts/show/:id` page, where, inferred resource is `posts` and action is `show`, but you want to authorize a different resource eg. `category`.

In this case, you can explicitly pass props to the `CanAccess` component for authorizing a different resource.

```tsx
import { CanAccess } from "@refinedev/core";

export const MyComponent = () => {
  return (
    <Buttons>
      <CreateButton>Create</CreateButton>
      <CanAccess resource="posts" action="delete">
        <DeleteButton>Delete</DeleteButton>
      </CanAccess>
    </Buttons>
  );
};
```

## Properties

It also accepts all the properties of [`useCan`](/core/docs/authorization/hooks/use-can#properties).

### onUnauthorized

Callback to be called when [`useCan`][use-can] returns false.

```tsx
<CanAccess
  onUnauthorized={({ resource, reason, action, params }) =>
    console.log(
      `You cannot access ${resource}-${params.id} resource with ${action} action because ${reason}`,
    )
  }
>
  <YourComponent />
</CanAccess>
```

### fallback

Component to render if [`useCan`][use-can] returns false. If `undefined`, it renders `null`.

```tsx
<CanAccess fallback={<div>You cannot access this section</div>}>
  <YourComponent />
</CanAccess>
```

### queryOptions

Accepts `UseQueryOptions<CanReturnType>` to customize the caching behavior of the underlying query.

```tsx
<CanAccess queryOptions={{ cacheTime: 25000 }}>
  <YourComponent />
</CanAccess>
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/CanAccess"/>

[use-can]: /core/docs/authorization/hooks/use-can
[access-control-provider]: /core/docs/authorization/access-control-provider
