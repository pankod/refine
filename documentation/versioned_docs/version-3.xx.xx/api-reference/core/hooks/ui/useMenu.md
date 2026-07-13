---
id: useMenu
title: useMenu
source: packages/core/src/hooks/menu/useMenu.tsx
---

```css live shared
body {
  padding: 4px;
  background: white;
}
```

`useMenu` is used to get menu items derived from the resources. These items include a link to the dashboard page (if it exists) and links to the user-defined resources (passed as children to `<Refine>`).

This hook can also be used to build custom menus, including multi-level support. `<Sider/>` components inside [`@pankod/refine-antd`](/core/docs/3.xx.xx/api-reference/antd/), [`@pankod/refine-mui`](/core/docs/3.xx.xx/api-reference/mui/), [`@pankod/refine-chakra-ui`](/core/docs/3.xx.xx/api-reference/chakra-ui/) and, [`@pankod/refine-mantine`](/core/docs/3.xx.xx/api-reference/mantine/) packages are using this hook as a base for their menus.

```ts
const { selectedKey, menuItems, defaultOpenKeys } = useMenu();
```

- `menuItems` is a list of style agnostic menu items. Each of them has a key.
- `selectedKey` is the key of the resource user is viewing at the moment. Its inferred from the route.
- `defaultOpenKeys` is the array with the keys of default opened menus.

<br />

:::caution

`useMenu` hooks exported from `@pankod/refine-antd` and `@pankod/refine-mui` packages are now **deprecated** and will be removed. Please use `useMenu` from `@pankod/refine-core`.
:::

## Usage

:::tip

If you are using [`@pankod/refine-antd`](/core/docs/3.xx.xx/api-reference/antd/), [`@pankod/refine-mui`](/core/docs/3.xx.xx/api-reference/mui/), [`@pankod/refine-chakra-ui`](/core/docs/3.xx.xx/api-reference/chakra-ui/) or [`@pankod/refine-mantine`](/core/docs/3.xx.xx/api-reference/mantine/) as a UI framework integration, you can find out more info about how their `<Sider/>` components are created and how to create a custom one by following their guides.

[Ant Design > Customization > Custom Sider &#8594](/core/docs/3.xx.xx/api-reference/antd/customization/antd-custom-sider/)

[Material UI > Customization > Custom Sider &#8594](/core/docs/3.xx.xx/api-reference/mui/customization/mui-custom-sider/)

[Mantine > Customization > Custom Sider &#8594](/core/docs/3.xx.xx/api-reference/mantine/customization/sider/)

:::

### Creating a Menu

We will show you how to use `useMenu` to create a simple menu for your **refine** application.

```tsx live hideCode url=http://localhost:3000
setInitialRoutes(["/"]);

// visible-block-start
import React from "react";
import {
  useMenu,
  LayoutProps,
  useRouterContext,
  useRefineContext,
  ITreeMenu,
} from "@pankod/refine-core";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // highlight-start
  const { menuItems, selectedKey } = useMenu();
  // highlight-end
  const { hasDashboard } = useRefineContext();
  const { Link } = useRouterContext();

  // You can also use navigation helpers from `useNavigation` hook instead of `Link` from your Router Provider.
  // const { push } = useNavigation();

  // highlight-start
  const renderMenuItems = (items: ITreeMenu[]) => {
    return (
      <>
        {items.map(({ name, label, icon, route }) => {
          const isSelected = route === selectedKey;
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
        <ul>
          {hasDashboard && (
            <li>
              <Link
                to="/"
                style={{
                  fontWeight: selectedKey === "/" ? "bold" : "normal",
                }}
              >
                <span>Dashboard</span>
              </Link>
            </li>
          )}
          {renderMenuItems(menuItems)}
        </ul>
        {/* highlight-end */}
      </div>
      <div>{children}</div>
    </div>
  );
};

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { Layout } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      dataProvider={dataProvider(API_URL)}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: () => <div>dummy posts page</div>,
        },
        {
          name: "categories",
          list: () => <div>dummy categories page</div>,
        },
      ]}
      Layout={Layout}
    />
  );
};
// visible-block-end

render(App);
```

We created `<Layout>` with a header with a logo and a list of links to all menu items (resources). The links are clickable and will navigate to the corresponding resource. To do this, we used the `useMenu` hook to get the menu items from the `<Refine/>` and the `useRouterContext` hook to get the `<Link/>` component from the router provider. Also [`useNavigation`][use-navigation] hook can be used to navigate between routes.

`children` is the content of the layout. In our case, it is the content of the **Page** components.

:::tip

[Refer to Custom Layout guide for more detailed information on layout customization. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-layout/)  
:::

After creating the `<Layout/>` component, we can use it in our application. We need to pass it to the `<Refine/>` component as a prop.

### Multi Level Menus

`useMenu` hook comes out of the box with multi level menu support, you can render menu items recursively to get a multi level menu.

Update your `resources` in `<Refine/>` with `parentName` to nest them inside a label.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { Layout } from "components/layout";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
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
          parentName: "CMS",
          list: () => <div>dummy posts page</div>,
        },
        {
          name: "categories",
          parentName: "CMS",
          list: () => <div>dummy categories page</div>,
        },
      ]}
      // highlight-end
      Layout={Layout}
    />
  );
};

export default App;
```

Now you can update your `<Layout/>` to support multi level rendering with following code:

```tsx title="src/components/Layout.tsx"
import React from "react";
import {
  useMenu,
  LayoutProps,
  useRouterContext,
  useRefineContext,
  ITreeMenu,
} from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { menuItems, selectedKey } = useMenu();
  const { Link } = useRouterContext();

  // highlight-start
  const renderMenuItems = (items: ITreeMenu[]) => {
    return (
      <>
        {items.map(({ name, label, icon, route, children, list }) => {
          if (!list) {
            return (
              <li key={label}>
                <span>{label ?? name}</span>
                {children ? renderMenuItems(children) : null}
              </li>
            );
          }

          const isSelected = route === selectedKey;

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
        <ul>
          {hasDashboard && (
            <li>
              <Link
                to="/"
                style={{
                  fontWeight: selectedKey === "/" ? "bold" : "normal",
                }}
              >
                <span>Dashboard</span>
              </Link>
            </li>
          )}
          {renderMenuItems(menuItems)}
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
};
```

## Return Values

### `selectedKey`

Key of the resource the user is viewing at the moment.

### `menuItems`

List of keys and routes and some metadata of resources and also the dashboard if exists.

### `defaultOpenKeys`

Array with the keys of default opened menus.

## API Reference

### Return values

| Property        | Description                                                                              | Type                         |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------- |
| selectedKey     | Key of the resource the user is viewing at the moment.                                   | `string`                     |
| menuItems       | List of keys and routes and some metadata of resources and also the dashboard if exists. | [`ITreeMenu[]`](#interfaces) |
| defaultOpenKeys | Array with the keys of default opened menus.                                             | `string[]`                   |

#### Interfaces

```ts
interface IResourceItem extends IResourceComponents {
  name: string;
  label?: string;
  route?: string;
  icon?: ReactNode;
  canCreate?: boolean;
  canEdit?: boolean;
  canShow?: boolean;
  canDelete?: boolean;
  parentName?: string;
  options?: OptionsProps;
}

interface IResourceComponents {
  list?: React.FunctionComponent<IResourceComponentsProps>;
  create?: React.FunctionComponent<IResourceComponentsProps>;
  edit?: React.FunctionComponent<IResourceComponentsProps>;
  show?: React.FunctionComponent<IResourceComponentsProps>;
}

interface IResourceComponentsProps<TCrudData = any> {
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canShow?: boolean;
  name?: string;
  initialData?: TCrudData;
}

type OptionsProps<TExtends = { [key: string]: any }> = TExtends & {
  label?: string;
  route?: string;
  auditLog?: {
    permissions?: AuditLogPermissions[number][] | string[];
  };
  hide?: boolean;
  [key: string]: any;
};

// highlight-start
type IMenuItem = IResourceItem & {
  key: string;
};

type ITreeMenu = IMenuItem & {
  children: ITreeMenu[];
};
// highlight-end
```

## Example

<CodeSandboxExample path="core-use-menu" />

[use-navigation]: /core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation/
