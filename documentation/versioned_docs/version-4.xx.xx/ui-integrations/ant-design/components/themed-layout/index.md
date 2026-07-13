---
title: "Themed Layout Guide | Ant Design & Refine v4"
display_title: "<ThemedLayout />"
sidebar_label: "<ThemedLayout />"
description: "Master the official Ant Design Themed Layout in Refine v4. Documentation on customizing Sider, Header, and Footer for a professional admin dashboard."
swizzle: true
source: packages/antd/src/components/themedLayoutV2/index.tsx
---

```tsx live shared
const authProvider = {
  login: async () => ({
    success: true,
    redirectTo: "/",
  }),
  logout: async () => ({
    success: true,
    redirectTo: "/login",
  }),
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => ({
    authenticated: true,
  }),
  getIdentity: async () => ({
    id: 1,
    name: "Jane Doe",
    avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
  }),
};
```

`<ThemedLayoutV2>` component uses the [`<Layout>`][antd-layout] and [`<Sider>`][antd-sider] components from the Ant Design library to define the layout and structure of a web page. It includes customizable components for the header, sidebar, title, footer, and off-layout area, which can be replaced or customized as needed.

By using `<ThemedLayoutV2>`, developers can create a consistent look and feel across multiple pages or sections of a website, while also improving code maintainability and reusability. The customizable sections of `<ThemedLayoutV2>` include:

- [`<ThemedHeaderV2>`][themed-header]: displayed at the top of the page and can display the user's name and avatar.
- [`<ThemedSiderV2>`][themed-sider]: displayed on the left side of the page and can display menu items.
- [`<ThemedTitleV2>`][themed-title]: displayed at the top of [`<ThemedSiderV2>`][themed-sider] and includes an icon and text.
- `<Footer>`: displayed at the bottom of the page.
- `<OffLayoutArea>`: rendered outside of the main layout component and can be placed anywhere on the page while still being part of the overall layout.

## Usage

We'll show what default `<ThemedLayoutV2>` looks like in the following example.

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                // highlight-next-line
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path="/samples" element={<AntdInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

`<ThemedLayoutV2>` is designed to be responsive. In the live-preview, it appears in tablet mode and uses [`<Drawer>`][antd-drawer]. On larger screens, it will use [`<Sider>`][antd-sider].

Example of above showing how to use `<ThemedLayoutV2>` with [`React Router`](/core/docs/packages/list-of-packages). You can see these examples for other routers:

- [React Router](https://github.com/refinedev/refine/blob/main/examples/auth-antd/src/App.tsx#L186)
- [Next.js](https://github.com/refinedev/refine/blob/main/examples/with-nextjs/src/app/layout.tsx#L35)
- [Remix](https://github.com/refinedev/refine/blob/main/examples/with-remix-auth/app/routes/_protected.tsx)

## Props

### Sider

In `<ThemedLayoutV2>`, the sidebar section is rendered using the [`<ThemedSiderV2>`][themed-sider] component by default. This component is specifically designed to generate menu items based on the resources defined in [`<Refine>`][refine-component] components, using the [`useMenu`][use-menu] hook. However, if desired, it's possible to replace the default [`<ThemedSiderV2>`][themed-sider] component by passing a custom component to the `Sider` prop.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

import { CustomSider } from "./CustomSider";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-next-line
        Sider={() => <CustomSider />}
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

Also, you can customize the default [`<ThemedSiderV2>`][themed-sider] component either by using its props or with the [swizzle](#customizing-with-swizzle) feature.

Here is an example of how to customize the default [`<ThemedSiderV2>`][themed-sider] component using the `render` and `Title` prop:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

import { CustomTitle } from "./CustomTitle";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Sider={() => (
          <ThemedSiderV2
            Title={({ collapsed }) => <CustomTitle collapsed={collapsed} />}
            render={({ items, logout, collapsed }) => {
              return (
                <>
                  <div>My Custom Element</div>
                  {items}
                  {logout}
                </>
              );
            }}
          />
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

Also, you can make the sidebar fixed by passing the `fixed` property, which is optional and `false` by default. You can see the usage as follows:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Sider={() => <ThemedSiderV2 fixed />}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

#### Sider Props

| Prop                 | Type                                          | Description                                                                       |
| -------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| [`Title`](#title)    | `React.FC`                                    | Component to render at the top                                                    |
| `render`             | [`SiderRenderFunction`](#siderrenderfunction) | Function to render the menu items and other elements inside the `<ThemedSiderV2>` |
| `meta`               | `Record<string,any>`                          | Meta data to use when creating routes for the menu items                          |
| `fixed`              | `boolean`                                     | Whether the sider is fixed or not                                                 |
| `activeItemDisabled` | `boolean`                                     | Whether clicking on an active sider item should reload the page                   |
| `onSiderCollapsed`   | `(collapsed: boolean) => void`                | Callback function invoked when the sider collapses or expands                     |

```tsx
type SiderRenderFunction = (props: {
  items: JSX.Element[];
  logout: React.ReactNode;
  dashboard: React.ReactNode;
  collapsed: boolean;
}) => React.ReactNode;
```

### initialSiderCollapsed

This prop is used to set the initial collapsed state of the [`<ThemedSiderV2>`][themed-sider] component.

- `true`: The [`<ThemedSiderV2>`][themed-sider] component will be collapsed by default.
- `false`: The [`<ThemedSiderV2>`][themed-sider] component will be expanded by default.

```tsx
<ThemedLayoutV2
  // highlight-next-line
  initialSiderCollapsed={true}
>
  {/* ... */}
</ThemedLayoutV2>
```

### `onSiderCollapsed`

Will be triggered when the [`<ThemedSiderV2>`][themed-sider] component's `collapsed` state changes.

Can be used to persist collapsed state on the localstorage. Then you can use localStorage item to decide if sider should be collapsed initially or not.

Here's an example of how to use the `onSiderCollapsed` prop:

```tsx
const MyLayout = () => {
  const onSiderCollapse = (collapsed: boolean) => {
    localStorage.setItem("siderCollapsed", collapsed);
  };

  const initialSiderCollapsed = Boolean(localStorage.getItem("siderCollapsed"));

  return (
    <ThemedLayoutV2
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapse}
    >
      {/* ... */}
    </ThemedLayoutV2>
  );
};
```

### Header

In `<ThemedLayoutV2>`, the header section is rendered using the [`<ThemedHeaderV2>`][themed-header] component by default. It uses [`useGetIdentity`](/core/docs/authentication/hooks/use-get-identity) hook to display the user's name and avatar on the right side of the header. However, if desired, it's possible to replace the default [`<ThemedHeaderV2>`][themed-header] component by passing a custom component to the `Header` prop.

Here is an example of how to replace the default [`<ThemedHeaderV2>`][themed-header] component:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

// highlight-next-line
import { CustomHeader } from "./CustomHeader";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-next-line
        Header={() => <CustomHeader />}
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

You can also make it sticky using the `sticky` property:

```tsx
import { Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  // highlight-next-line
  ThemedHeaderV2,
} from "@refinedev/antd";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Header={() => <ThemedHeaderV2 sticky />}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

### Title

In `<ThemedLayoutV2>`, the title section is rendered using the [`<ThemedTitleV2>`][themed-title] component by default. However, if desired, it's possible to replace the default [`<ThemedTitleV2>`][themed-title] component by passing a custom component to the `Title` prop.

Here is an example of how to replace the default [`<ThemedTitleV2>`][themed-title] component:

```tsx
import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";

// highlight-next-line
import { MyLargeIcon, MySmallIcon } from "./MyIcon";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Title={({ collapsed }) => (
          <ThemedTitleV2
            // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
            collapsed={collapsed}
            icon={collapsed ? <MySmallIcon /> : <MyLargeIcon />}
            text="My Project"
          />
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

### Footer

The footer section of the layout is displayed at the bottom of the page. Refine doesn't provide a default footer component. However, you can pass a custom component to the `Footer` prop to display a footer section.

Here is an example of how to display a footer section:

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                // highlight-next-line
                <ThemedLayoutV2
                  Footer={() => (
                    <Layout.Footer
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        backgroundColor: "#7dbcea",
                      }}
                    >
                      My Custom Footer
                    </Layout.Footer>
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path="samples">
                <Route index element={<AntdInferencer />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Layout } from "antd";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-next-line
        Footer={() => (
          <Layout.Footer
            style={{
              textAlign: "center",
              color: "#fff",
              backgroundColor: "#7dbcea",
            }}
          >
            My Custom Footer
          </Layout.Footer>
        )}
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

### OffLayoutArea

Used to component is rendered outside of the main layout component, allowing it to be placed anywhere on the page while still being part of the overall layout .Refine doesn't provide a default off-layout area component. However, you can pass a custom component to the `OffLayoutArea` prop to display a custom off-layout area.

Here is an example of how to display a custom off-layout area:

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Button } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                // highlight-next-line
                <ThemedLayoutV2
                  OffLayoutArea={() => (
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => alert("Off layout are clicked")}
                      style={{
                        position: "fixed",
                        left: "8px",
                        bottom: "8px",
                        zIndex: 1000,
                      }}
                    >
                      Send us Feedback 👋
                    </Button>
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path="/samples" element={<AntdInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Button } from "antd";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        OffLayoutArea={() => (
          <Button
            type="primary"
            size="small"
            onClick={() => alert("Off layout are clicked")}
            style={{
              position: "fixed",
              left: "8px",
              bottom: "8px",
              zIndex: 1000,
            }}
          >
            Send us Feedback 👋
          </Button>
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

## Customizing with swizzle

> 🚨 This feature can be used with `@refine/cli`. Please refer to [CLI documentation](/core/docs/packages/list-of-packages#swizzle) for more information.

`<ThemedLayoutV2>` component source code can be ejecting using the `swizzle` command. This will create a copy of the component in your project's `src` directory, allowing you to customize as your needs.

### Usage

Let's create a new component by swizzling the `<ThemedLayoutV2>` components.

```bash
> npm run refine swizzle

? Which package do you want to swizzle? (Use arrow keys or type to search)

Data Provider
 ◯ @refinedev/simple-rest
UI Framework
 ◉ @refinedev/antd
```

First, you need to select the package you want to swizzle. In this example, we will swizzle the `@refinedev/antd` package.

Refine CLI will only show the packages that are installed in your project.

```bash
? Which component do you want to swizzle?

 ◯ TagField
 ◯ TextField
 ◯ UrlField
Other
 ◯ Breadcrumb
❯◉ ThemedLayoutV2
Pages
 ◯ ErrorPage
 ◯ AuthPage
(Move up and down to reveal more choices)
```

Then, you need to select the component you want to swizzle. In this example, we will swizzle the `ThemedLayoutV2` component.

```bash
Successfully swizzled Themed Layout
Files created:
 - src/components/themedLayout/sider.tsx
 - src/components/themedLayout/header.tsx
 - src/components/themedLayout/title.tsx
 - src/components/themedLayout/index.tsx

Warning:
If you want to change the default layout;
You should pass layout related components to the <ThemedLayoutV2/> component's props.

    ╭ App.tsx ───────────────────────────────────────────────────────────────────────────────────────╮
    │                                                                                                │
    │   import { ThemedLayoutV2 } from "components/themedLayout";                                    │
    │   import { ThemedHeaderV2 } from "components/themedLayout/header";                             │
    │   import { ThemedSiderV2 } from "components/themedLayout/sider";                               │
    │   import { ThemedTitleV2 } from "components/themedLayout/title";                               │
    │                                                                                                │
    │   const App = () => {                                                                          │
    │       return (                                                                                 │
    │           <Refine                                                                              │
    │               /* ... */                                                                        │
    │           >                                                                                    │
    │               <ThemedLayoutV2                                                                  │
    │                    Header={ThemedHeaderV2}                                                     │
    │                    Sider={ThemedSiderV2}                                                       │
    │                    Title={ThemedTitleV2}                                                       │
    │                />                                                                              │
    │                   /* ... */                                                                    │
    │               </ThemedLayoutV2>                                                                │
    │           </Refine>                                                                            │
    │       );                                                                                       │
    │   }                                                                                            │
    │                                                                                                │
    ╰────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Finally, the swizzle command will create a new folder in the `src/components/layout` directory and generate the layout components of the `@refinedev/antd` package in it.

You can use these components in your project as you wish.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "components/themedLayout";
import { ThemedHeaderV2 } from "components/themedLayout/header";
import { ThemedSiderV2 } from "components/themedLayout/sider";
import { ThemedTitleV2 } from "components/themedLayout/title";

const App = () => {
  return (
    <Refine
    /* ... */
    >
      <ThemedLayoutV2
        Header={ThemedHeaderV2}
        Sider={ThemedSiderV2}
        Title={ThemedTitleV2}
      >
        /* ... */
      </ThemedLayoutV2>
    </Refine>
  );
};
```

:::simple Good to know

Refine CLI determines the path to create a new folder according to the framework you are using. For example, if you are using the `remix`, the path will be `app/components/layout`.

If there is already a file with the same name in the directory, the swizzle command will not overwrite it.

:::

## Migrate ThemedLayout to ThemedLayoutV2

Fixed some UI problems with `ThemedLayoutV2`. If you are still using `ThemedLayout` you can update it by following these step.

```diff title="src/App.tsx"
-import { ThemedLayout } from "@refinedev/antd";
+import { ThemedLayoutV2 } from "@refinedev/antd";
...
-<ThemedLayout>
+<ThemedLayoutV2>
    <Outlet />
-</ThemedLayout>
+</ThemedLayoutV2>
...
```

## collapse/uncollapse `Sider` component with `useThemedLayoutContext` hook

The `useThemedLayoutContext` hook is that is used to collapse/uncollapse the `Sider` component. You can do this anywhere you want using the `useThemedLayoutContext` hook. Below you can see an example put on the dashboard page.

```tsx live previewHeight=300px hideCode url=http://localhost:3000/
setInitialRoutes(["/"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import {
  ThemedLayoutV2,
  RefineThemes,
  useThemedLayoutContext,
} from "@refinedev/antd";
import { ConfigProvider, Button, Space } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const DashboardPage = () => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  return (
    <Space style={{ paddingTop: 30 }}>
      <Button
        type="primary"
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
      >
        toggle mobile sider
      </Button>
      <Button type="primary" onClick={() => setSiderCollapsed(!siderCollapsed)}>
        toggle collapse of sider
      </Button>
    </Space>
  );
};
// highlight-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            // highlight-start
            {
              name: "dashboard",
              list: "/",
            },
            // highlight-end
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              {/* highlight-next-line */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/samples" element={<AntdInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

## FAQ

### How can I persist the collapsed state of the [`<ThemedSiderV2>`][themed-sider] component?

You can use [`initialSiderCollapsed`](#initialsidercollapsed) prop to persist the collapsed state of the [`<ThemedSiderV2>`][themed-sider] component.

For example, you can get `initialSiderCollapsed`'s value from `localStorage` or `cookie` for persistence between sessions:

<Tabs
defaultValue="react-router"
values={[
{label: 'React Router', value: 'react-router'},
{label: 'Next.js', value: 'next.js'},
{label: 'Remix', value: 'remix'},
]}>

<TabItem value="react-router">

```tsx title="src/App.tsx"
import { useState } from "react";
import { Refine } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ThemedLayoutV2 } from "@refinedev/antd";

const App: React.FC = () => {
  // you can get this value from `localStorage` or `cookie`
  // for persistence between sessions
  const [initialSiderCollapsed, setInitialSiderCollapsed] = useState(true);

  return (
    <BrowserRouter>
      <Refine
      // ...
      >
        {/* ... */}
        <Routes>
          <Route
            element={
              <ThemedLayoutV2 initialSiderCollapsed={initialSiderCollapsed}>
                <Outlet />
              </ThemedLayoutV2>
            }
          >
            {/* ... */}
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
```

</TabItem>

<TabItem value="next.js">

```tsx title="pages/_app.tsx"
import { useState } from "react";

import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

import type { AppProps } from "next/app";
import type { NextPage } from "next";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // you can get this value from `localStorage` or `cookie`
  // for persistence between sessions
  const [initialSiderCollapsed, setInitialSiderCollapsed] = useState(true);

  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2 initialSiderCollapsed={initialSiderCollapsed}>
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <Refine
    // ...
    >
      {/* ... */}
      {renderComponent()}
    </Refine>
  );
}

export default MyApp;
```

</TabItem>

<TabItem value="remix">

```tsx title="app/routes/_layout.tsx"
import { useState } from "react";
import { Outlet } from "@remix-run/react";
import { ThemedLayoutV2 } from "@refinedev/antd";

export default function BaseLayout() {
  // you can get this value from `localStorage` or `cookie`
  // for persistence between sessions
  const [initialSiderCollapsed, setInitialSiderCollapsed] = useState(true);

  return (
    <ThemedLayoutV2 initialSiderCollapsed={initialSiderCollapsed}>
      <Outlet />
    </ThemedLayoutV2>
  );
}
```

</TabItem>

</Tabs>
```

[themed-sider]: https://github.com/refinedev/refine/blob/main/packages/antd/src/components/themedLayoutV2/sider/index.tsx
[themed-header]: https://github.com/refinedev/refine/blob/main/packages/antd/src/components/themedLayoutV2/header/index.tsx
[themed-title]: https://github.com/refinedev/refine/blob/main/packages/antd/src/components/themedLayoutV2/title/index.tsx
[use-menu]: /core/docs/core/hooks/utilities/use-menu
[refine-component]: /core/docs/core/refine-component
[antd-drawer]: https://ant.design/components/drawer
[antd-sider]: https://ant.design/components/layout#layoutsider
[antd-layout]: https://ant.design/components/layout
