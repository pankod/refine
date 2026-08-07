---
id: authenticated
title: <Authenticated>
---

`<Authenticated>` is the component form of [`useAuthenticated`][useauthenticated].

It internally uses [`useAuthenticated`][useauthenticated]'s return values (`isSuccess`, `isLoading`, and, `isError`) to provide its functionality.

When:

- `isSuccess` is `true`, it renders to children.
- `isLoading` is `true`, it renders [`loading`](#loading) prop.
- `isError` is `true`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it redirects to `/login` page.

## Basic Usage

```tsx
import { Authenticated } from "@pankod/refine-core";

const MyPage = () => (
  <Authenticated>
    <YourComponent />
  </Authenticated>
);
```

> Refer to [Custom Pages Example][custom pages example] and [it's explanation][custom pages explanation] to learn how to use it with custom pages. &#8594

## Properties

### `fallback`

Component to render if the user is not logged in. If `undefined`, the page will be redirected to `/login`.

```tsx
<Authenticated fallback={<div>You cannot access this section</div>}>
  <YourComponent />
</Authenticated>
```

### `loading`

Component to render while checking whether the user is logged in.

```tsx
<Authenticated loading={<div>loading...</div>}>
  <YourComponent />
</Authenticated>
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/Authenticated"/>

| Property | Description                                                                                               | Type        | Default |
| -------- | --------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| fallback | Component to render if the user is not logged in. If `undefined`, the page will be redirected to `/login` | `ReactNode` |         |
| loading  | Component to render while checking whether user is logged in                                              | `ReactNode` |         |

[useauthenticated]: /core/docs/3.xx.xx/api-reference/core/hooks/auth/useAuthenticated
[custom pages explanation]: /core/docs/3.xx.xx/advanced-tutorials/custom-pages#authenticated-custom-pages
[custom pages example]: /core/docs/examples/custom-pages
