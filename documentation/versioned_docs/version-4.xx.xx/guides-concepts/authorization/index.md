---
title: "Authorization Concepts | RBAC & Security in Refine"
display_title: "Authorization"
sidebar_label: "Authorization"
description: "Deep dive into access control patterns. Understand how Refine v4 handles roles, permissions, and conditional UI rendering effectively."
---

Authorization is a key aspect of security and user experience in web applications. Whether you are building a complex **enterprise-level** application or a simple CRUD interface, Refine's authorization system provides the necessary infrastructure to protect your resources and ensure that users interact with your application in a secure and controlled manner.

Refine's **flexible architecture** allows you to easily implement various authorization strategies:

- Role-Based Access Control (**RBAC**)
- Attribute-Based Access Control (**ABAC**)
- Access Control List (**ACL**)

With **any** authorization solution. (i.e. [Okta](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/okta/overviews/authorization.htm), [Casbin](https://casbin.org/), [Cerbos](https://cerbos.dev), or more)

Refine offers several features to help you implement authorization in your application:

- `<CanAccess />` component: Conditionally renders child components based on the user's access to a resource.
- `useCan` hook: Returns a value indicating whether the user has access to a resource based on the given parameters.
- **UI Integrations**: Conditionally renders UI elements such as **buttons**, **menu items**, etc. based on the user's access to a resource.

In order to enable these features, Refine uses the **Access Control Provider** as an interface to connect your application with your authorization solution and provides necessary parameters to make access control decisions.

## Access Control Provider

The [Access Control Provider](/core/docs/authorization/access-control-provider) is an object that contains a `can` method. This method is called by Refine to understand if the user can see a certain resource or perform an action.

A basic **Access Control Provider** looks like this:

```tsx title="access-control-provider.ts"
import { AccessControlProvider } from "@refinedev/core";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    console.log(resource); // products, orders, etc.
    console.log(action); // list, edit, delete, etc.
    console.log(params); // { id: 1 }, { id: 2 }, etc.

    if (meetSomeCondition) {
      return { can: true };
    }

    return {
      can: false,
      reason: "Unauthorized",
    };
  },
};
```

And can be passed to `<Refine />` component's `accessControlProvider` prop:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

import { accessControlProvider } from "./access-control-provider";

export const App = () => {
  return (
    <Refine
      // highlight-next-line
      accessControlProvider={accessControlProvider}
    >
      {/* ... */}
    </Refine>
  );
};
```

[To learn more about the `Access Control Provider`, check out the reference page.](/core/docs/authorization/access-control-provider)

## CanAccess Component

The `CanAccess` component can be used to wrap your **pages** or **components** to hide them from unauthorized users.

It calls **Access Control Provider**'s `can` method and conditionally renders its children based on the result.

Here's a basic example of how to use the `CanAccess` component:

```tsx title="list-page.tsx"
import { CanAccess } from "@refinedev/core";

export const ListPage = () => {
  return (
    <CanAccess
      resource="products"
      action="list"
      fallback={<h1>You are not authorized to see this page.</h1>}
    >
      <>
        <h1>Products</h1>
        <CanAccess resource="products" action="show" params={{ id: 1 }}>
          <Button>See Details</Button>
        </CanAccess>
      </>
    </CanAccess>
  );
};
```

[To learn more about the `CanAccess` component, check out the reference page.](/core/docs/authorization/components/can-access)

### Router Integrations

Refine's router integrations can infer `resource`, `action`, and `params.id` props from the current route and pass them to the `<CanAccess />` component.

This means you can wrap all of your routes with a single `<CanAccess />` component, instead of wrapping each page individually.

See [React Router](/core/docs/packages/list-of-packages), [Next.js](/core/docs/packages/list-of-packages), [Remix](/core/docs/packages/list-of-packages) integration pages for more information.

## useCan Hook

The `useCan` hook can be used to check if the user has access to a resource or action.

It calls **Access Control Provider**'s `can` method and returns a value indicating whether the user has access to the resource or action.

Here's a basic example of how to use the `useCan` hook:

```tsx title="list-page.tsx"
import { useCan } from "@refinedev/core";

export const ListPage = () => {
  const { data } = useCan({
    resource: "products",
    action: "show",
    params: { id: 1 },
  });

  return (
    <>
      <h1>Products</h1>
      {data?.can && <Button>See Details</Button>}
    </>
  );
};
```

[To learn more about the `useCan` hook, check out the reference page.](/core/docs/authorization/hooks/use-can)

## Handling Authorization

import { AccessControlExample } from "./example";

<AccessControlExample />

## UI Integrations

When Access Control Provider is provided, Refine's UI Integrations automatically manages the **visibility** of their components like **buttons** and **menu items**, simplifying the management of UI.

These UI Integrations uses the Access Control Provider to check if a user has the necessary permissions. This check is performed without requiring manual implementation for each component, streamlining the development process.

### Sider

Sider component's **menu items** will **automatically hidden** if user don't have access.

Let's assume we have **products** resource.

Menu item of this resource will call `can` method with following parameters:

```
{ resource: "products", action: "list" }
```

And if user isn't allowed to `list` products, menu item will be hidden.

### Buttons

If you are using one of our buttons from our UI Integrations in your application, you don't need to wrap it with `<CanAccess />` or use `useCan` every time. These buttons will automatically be shown or hidden.

```tsx title=button-example.ts
// Following buttons call `can` method with commented parameters.
import {
  CreateButton, //  { resource: "products", action: "create", params: { resource }}
  ListButton, //    { resource: "products", action: "list" , params: { resource }}
  EditButton, //    { resource: "products", action: "edit", params: { id: 1, resource } }
  ShowButton, //    { resource: "products", action: "show", params: { id: 1, resource } }
  DeleteButton, //  { resource: "products", action: "delete", params: { id: 1, resource } }
  CloneButton, //   { resource: "products", action: "clone", params: { id: 1, resource } }
} from "@refinedev/antd"; // or @refinedev/chakra-ui, @refinedev/mui, @refinedev/mantine
```
