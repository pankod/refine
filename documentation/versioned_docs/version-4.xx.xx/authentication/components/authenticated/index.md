---
title: "Authenticated Component | Protecting Routes in Refine v4"
display_title: "<Authenticated />"
sidebar_label: "<Authenticated />"
description: "Secure your UI and routes with the Authenticated component. Learn how to handle redirection and unauthorized access in Refine v4 applications."
---

`<Authenticated>` is the component form of [`useIsAuthenticated`][use-is-authenticated].

It internally uses `useIsAuthenticated`'s return values (`data.authenticated`, `data.error`, and, `isLoading`) to provide its functionality.

When:

- `data.authenticated` is `true`, it renders its children.
- `data.authenticated` is `false`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it redirects to `data.redirectTo` page.
- `isLoading` is `true`, it renders the [`loading`](#loading) prop.

You may want to use this component when rendering a page that requires authentication. You will be able to render a fallback or redirect to an authentication page depending on your case. `Authenticated` can also be used to render a conditional content based on the user's authentication status.

## Basic Usage

```tsx
import { Authenticated } from "@refinedev/core";

const MyPage = () => (
  <Authenticated>
    <YourComponent />
  </Authenticated>
);
```

## Properties

### key <PropTag required />

A differentiator prop for the `<Authenticated />` component. This is crucial for the authentication logic to work properly in certain scenarios where `<Authenticated />` is used multiple times in same tree level. key prop will signal React to remount the component rather than updating the current props.

#### Why is it required?

Due to the [nature of React](https://react.dev/learn/rendering-lists#why-does-react-need-keys), components are not unmounted and remounted again if props are changed. While this is mostly a good practice for performance, in some cases you'll want your component to re-mount instead of updating; for example if you don't want to use any of the previous states and effects initiated with the old props.

The `<Authenticated />` component has this kind of scenario when its used for page level authentication checks. If the previous check results were used for the rendering of the content (`fallback` or `children`) this may lead to unexpected behaviors and flashing of the unwanted content.

To avoid this, a `key` prop must be set with different values for each use of the `<Authenticated />` components. This will make sure that React will unmount and remount the component instead of updating the props.

```tsx
import { Authenticated } from "@refinedev/core";

const MyPage = () => (
  <Authenticated key="dashboard">
    <h1>Dashboard Page</h1>
  </Authenticated>
);
```

### redirectOnFail

The path to redirect to if the user is not logged in. If left empty, the user will be redirected to the value in the `redirectTo` property of the `check` function of the `AuthProvider`.

:::info

This property only works if the `fallback` prop is not provided.

:::

### appendCurrentPathToQuery

If `true`, the current path will be appended to the `to` query parameter. This is useful when you want to redirect the user to the page they were trying to access after they log in.

### fallback

Component to render if the user is not logged in. If `undefined`, the page will be redirected to `/login`.

```tsx
<Authenticated fallback={<div>You cannot access this section</div>}>
  <YourComponent />
</Authenticated>
```

### loading

Component to render while checking whether the user is logged in.

```tsx
<Authenticated loading={<div>loading...</div>}>
  <YourComponent />
</Authenticated>
```

### params

Additional params to be passed to Auth Provider's `check` method via `useIsAuthenticated` hook.

```tsx
<Authenticated params={{ foo: "bar" }}>
  <YourComponent />
</Authenticated>
```

## API Reference

### Properties

<PropsTable
  module="@refinedev/core/Authenticated"
  v3LegacyAuthProviderCompatible-required={false}
  v3LegacyAuthProviderCompatible-type="boolean"
  v3LegacyAuthProviderCompatible-description="This must be set to `true` if legacy auth provider is being used."
/>

[use-is-authenticated]: /core/docs/authentication/hooks/use-is-authenticated
