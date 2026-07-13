---
id: can-access
title: <CanAccess>
siderbar_label: <CanAccess>
source: packages/core/src/components/canAccess/index.tsx
---

`<CanAccess>` is the component form of [`useCan`][use-can].

It internally uses [`useCan`][use-can]'s return values to provide its functionality.

Passes the given properties to the `can` method from your [access control provider][access-control-provider]. After, if it returns:

- `true`, it renders the children.
- `false`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it renders `null`.

[Refer to Access Control Provider for more information. &#8594][access-control-provider]

## Basic Usage

```tsx
import { CanAccess } from "@pankod/refine-core";

const MyComponent = () => (
  <CanAccess
    resource="posts"
    action="edit"
    params={{ id: 1 }}
    fallback={<CustomFallback />}
  >
    <YourComponent />
  </CanAccess>
);
```

## Properties

It's also accepts all the properties of [`useCan`](/core/docs/3.xx.xx/api-reference/core/hooks/accessControl/useCan/#properties).

### `fallback`

Component to render if [`useCan`][use-can] returns false. If `undefined`, it renders `null`.

```tsx
<CanAccess fallback={<div>You cannot access this section</div>}>
  <YourComponent />
</CanAccess>
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/CanAccess"/>

[use-can]: /core/docs/3.xx.xx/api-reference/core/hooks/accessControl/useCan/
[access-control-provider]: /core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider/
[can]: /core/docs/3.xx.xx/api-reference/core/hooks/accessControl/useCan/#can
