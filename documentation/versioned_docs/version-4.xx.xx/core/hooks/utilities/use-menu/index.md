---
title: "useMenu Hook | Customizing Sidebar Navigation in Refine v4"
display_title: "useMenu"
sidebar_label: "useMenu"
description: "Take full control of your application's menu. Learn how to use the useMenu hook to build dynamic, permission-aware navigation in Refine v4."
source: packages/core/src/hooks/menu/useMenu.tsx
---

```css live shared
body {
  padding: 4px;
  background: white;
}
```

`useMenu` is used to get menu items derived from the resources. These items include a link to the dashboard page (if it exists) and links to the user-defined resources (passed as children to `<Refine>`).

This hook can also be used to build custom menus, including multi-level support. `<Sider/>` components inside the [`@refinedev/antd`](/core/docs/ui-integrations/ant-design/introduction), [`@refinedev/mui`](/core/docs/ui-integrations/material-ui/introduction), [`@refinedev/chakra-ui`](/core/docs/ui-integrations/chakra-ui/introduction) and, [`@refinedev/mantine`](/core/docs/ui-integrations/mantine/introduction) packages for example use this hook as a base for their menus.

```ts
const { selectedKey, menuItems, defaultOpenKeys } = useMenu();
```

- `menuItems` is a list of style agnostic menu items. Each of them has a key.
- `selectedKey` is the key of the resource user is viewing at the moment. Its inferred from the route.
- `defaultOpenKeys` is the array with the keys of default opened menus.

:::simple Deprecation Notice

`useMenu` hooks exported from `@refinedev/antd` and `@refinedev/mui` packages are now **deprecated** and will be removed. Please use `useMenu` from `@refinedev/core`.

:::

## Usage

If you are using [`@refinedev/antd`](/core/docs/ui-integrations/ant-design/introduction), [`@refinedev/mui`](/core/docs/ui-integrations/material-ui/introduction), [`@refinedev/chakra-ui`](/core/docs/ui-integrations/chakra-ui/introduction) or [`@refinedev/mantine`](/core/docs/ui-integrations/mantine/introduction) as a UI framework integration, you can find out more info about their structure and how to use `useMenu` in the [Custom Layout][customlayout]

### Creating a Menu

We will show you how to use `useMenu` to create a simple menu for your Refine application.

```tsx live hideCode url=http://localhost:3000
setInitialRoutes(["/"]);

// visible-block-start
import React from "react";
import { useMenu, LayoutProps, ITreeMenu } from "@refinedev/core";

import { Link } from "react-router";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // highlight-start
  const { menuItems, selectedKey } = useMenu();
  // highlight-end

  // highlight-start
  const renderMenuItems = (items: ITreeMenu[]) => {
    return (
      <>
        {items.map(({ key, name, label, icon, route }) => {
          const isSelected = key === selectedKey;
          return (
            <li key={name}>
              <Link
                to={route}
                style={{
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {icon}
                <span>{label ?? name}</span>
              </Link>
            </li>
          );
        })}
      </>
    );
  };
  // highlight-end

  return (
    <div>
      <div>
        <Link to="/">
          <img src="https://refine.dev/img/refine_logo.png" alt="Logo" />
        </Link>
        {/* highlight-start */}
        <ul>{renderMenuItems(menuItems)}</ul>
        {/* highlight-end */}
      </div>
      <div>{children}</div>
    </div>
  );
};

import { Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { Layout } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider(API_URL)}
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
          {
            name: "categories",
            list: "/categories",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<NavigateToResource />} />
            <Route path="/posts" element={<div>dummy posts page</div>} />
            <Route
              path="/categories"
              element={<div>dummy categories page</div>}
            />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
// visible-block-end

render(App);
```

We created `<Layout>` with a header with a logo and a list of links to all menu items (resources). The links are clickable and will navigate to the corresponding resource. To do this, we used the `useMenu` hook to get the menu items from the `<Refine/>` and the `useRouterContext` hook to get the `<Link/>` component from the router provider. The [`useNavigation`][use-navigation] hook can be used for navigating between routes as well.

`children` is the content of the layout. In our case, it is the content of the **Page** components.

After creating the `<Layout/>` component, we can use it in our application. We need to pass it to the `<Refine/>` component as a prop.

> For more information on layout customization, refer to the [Custom Layout guide &#8594](/core/docs/advanced-tutorials/custom-layout/)

### Multi Level Menus

`useMenu` hook comes out of the box with multi level menu support, you can render menu items recursively to get a multi level menu.

Update your `resources` in `<Refine/>` with `meta.parent` to nest them inside a label:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { Layout } from "components/layout";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        // highlight-start
        resources={[
          {
            name: "CMS",
          },
          {
            name: "posts",
            list: "/CMS/posts",
            meta: { parent: "CMS" },
          },
          {
            name: "categories",
            list: "/CMS/categories",
            meta: { parent: "CMS" },
          },
        ]}
        // highlight-end
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<NavigateToResource />} />
            <Route path="/posts" element={<div>dummy posts page</div>} />
            <Route
              path="/categories"
              element={<div>dummy categories page</div>}
            />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
```

Now you can update your `<Layout/>` to support multi level rendering with following code:

```tsx title="src/components/Layout.tsx"
import React from "react";
import { useMenu, LayoutProps, ITreeMenu } from "@refinedev/core";

import { Link } from "react-router";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { menuItems, selectedKey } = useMenu();

  // highlight-start
  const renderMenuItems = (items: ITreeMenu[]) => {
    return (
      <>
        {items.map(({ key, name, label, icon, route, children, list }) => {
          if (!list) {
            return (
              <li key={label}>
                <span>{label ?? name}</span>
                {children ? renderMenuItems(children) : null}
              </li>
            );
          }

          const isSelected = key === selectedKey;

          return (
            <li key={label}>
              <Link
                to={route}
                style={{
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {icon}
                <span>{label ?? name}</span>
              </Link>
            </li>
          );
        })}
      </>
    );
  };
  // highlight-end

  return (
    <div>
      <div>
        <Link to="/">
          <img src="https://refine.dev/img/refine_logo.png" alt="Logo" />
        </Link>
        <ul>{renderMenuItems(menuItems)}</ul>
      </div>
      <div>{children}</div>
    </div>
  );
};
```

## Properties

### hideOnMissingParameter

It only affects menu items that require additional parameters to generate their URL. If the parameters are missing in the current URL neither in the `meta` property of the `useMenu` or in the `meta` property of the resource definition, the menu items that require a parameter will be hidden. By default, this property is set to `true`.

For example, suppose you have a resource with a list path defined as `/authors/:authorId/books`. If there is no `authorId` parameter in the current URL or in the `meta` object, the menu item for this resource will be hidden.

However, if you set `hideOnMissingParameter` to `false` when calling `useMenu`, the menu item for this resource will still be shown, even if the `authorId` parameter is missing.

### meta

An object of parameters to use when additional parameters are present in the resource paths. For example, if you have a resource with list path defined as `/:authorId/posts` and want to show this resource in your menu:

```ts
const { menuItems } = useMenu({ meta: { authorId: 123 } });
```

If there is already an `authorId` parameter in the current URL or in the `meta` property of the resource definition, `useMenu` will use this parameter by default. You can override this behavior by passing the `meta` property to the `useMenu` hook.

## Return Values

### selectedKey

If the current URL matches a resource path, the key of the resource will be returned. Otherwise, `undefined` will be returned.

### menuItems

List of the menu tems returned based on the `resources` prop of the `<Refine/>` component.

### defaultOpenKeys

Array with the keys of default opened menus.

## API Reference

### Properties

| Property               | Description                                                                                 | Type                      | Default |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------- | ------- |
| hideOnMissingParameter | Whether to hide menu items that require additional parameters to generate their URL or not. | `boolean`                 | `true`  |
| meta                   | It is used when creating menu item URL with additional parameters.                          | `Record<string, unknown>` | `{}`    |

### Return values

| Property        | Description                                                        | Type                            |
| --------------- | ------------------------------------------------------------------ | ------------------------------- |
| selectedKey     | Key of the resource the user is viewing at the moment.             | `string` \| `undefined`         |
| menuItems       | List of the menu items returned based on the resource definitions. | [`TreeMenuItem[]`](#interfaces) |
| defaultOpenKeys | Array with the keys of default opened menus.                       | `string[]`                      |

#### Interfaces

```ts
// highlight-start
export type TreeMenuItem = IResourceItem & {
  key: string;
  route?: string;
  icon?: React.ReactNode;
  label?: string;
  children: TreeMenuItem[];
};
// highlight-end
```

## Example

<CodeSandboxExample path="core-use-menu" />

[use-navigation]: /core/docs/routing/hooks/use-navigation
[customlayout]: /core/docs/advanced-tutorials/custom-layout/
