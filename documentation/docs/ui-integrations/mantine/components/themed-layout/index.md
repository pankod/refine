---
title: "Mantine ThemedLayout Component | Layout in Refine v5"
display_title: "<ThemedLayout />"
sidebar_label: "<ThemedLayout />"
description: "Learn to integrate ThemedLayout in Refine v5. Explore customization options for React UI library, components for polished admin UIs. Explore with code snippets."
swizzle: true
source: packages/mantine/src/components/themedLayout/index.tsx
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

The `<ThemedLayout>` component that uses the [`<Drawer>`][mantine-drawer] from Mantine library to define the layout and structure of a web page. It includes customizable components for the header, sidebar, title, footer, and off-layout area, which can be replaced or customized as needed.

By using `<ThemedLayout>`, developers can create a consistent look and feel across multiple pages or sections of a website, while also improving code maintainability and reusability. The customizable sections of `<ThemedLayout>` include:

- [`<ThemedHeader>`][themed-header]: displayed at the top of the page and can display the user's name and avatar.
- [`<ThemedSider>`][themed-sider]: displayed on the left side of the page and can display menu items.
- [`<ThemedTitle>`][themed-title]: displayed at the top of [`<ThemedSider>`][themed-sider] and includes an icon and text.
- `<Footer>`: displayed at the bottom of the page.
- `<OffLayoutArea>`: rendered outside of the main layout component and can be placed anywhere on the page while still being part of the overall layout.

:::simple Good to know

`Footer` and `OffLayoutArea` do not have any default components.

:::

## Usage

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";

// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <MantineProvider
      theme={RefineThemes.Blue}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
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
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              {/* highlight-next-line */}
              <Route path="/samples" element={<MantineInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

`<ThemedLayout>` is designed to be responsive. In the live-preview, it appears in tablet mode and toggle [`<Drawer>`][mantine-drawer]. On larger screens, it will use fixed to open [`<Drawer>`][mantine-drawer].

Example of above showing how to use `<ThemedLayout>` with [`React Router`](/core/docs/packages/list-of-packages/). You can see these examples for other routers:

- [React Router](https://github.com/refinedev/refine/blob/main/examples/auth-mantine/src/App.tsx#L180)
- [Next.js](https://github.com/refinedev/refine/blob/main/examples/with-nextjs/src/app/layout.tsx#L35)
- [Remix](https://github.com/refinedev/refine/blob/main/examples/with-remix-auth/app/routes/_protected.tsx)

## Props

### Sider

In `<ThemedLayout>`, the sidebar section is rendered using the [`<ThemedSider>`][themed-sider] component by default. This component is specifically designed to generate menu items based on the resources defined in [`<Refine>`][refine-component] components, using the [`useMenu`][use-menu] hook. However, if desired, it's possible to replace the default [`<ThemedSider>`][themed-sider] component by passing a custom component to the `Sider` prop.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";

import { CustomSider } from "./CustomSider";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayout
        // highlight-next-line
        Sider={() => <CustomSider />}
      >
        {/* ... */}
      </ThemedLayout>
    </Refine>
  );
};
```

Also, you can customize the default [`<ThemedSider>`][themed-sider] component either by using its props or with the [swizzle](#customizing-with-swizzle) feature.

Here is an example of how to customize the default [`<ThemedSider>`][themed-sider] component using the `render` and `Title` prop:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout, ThemedSider } from "@refinedev/mantine";

import { CustomTitle } from "./CustomTitle";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayout
        // highlight-start
        Sider={() => (
          <ThemedSider
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
      </ThemedLayout>
    </Refine>
  );
};
```

#### Sider Props

| Prop                     | Type                                          | Description                                                                     |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------- |
| [`Title`](#title)        | `React.FC`                                    | Component to render at the top                                                  |
| `render`                 | [`SiderRenderFunction`](#siderrenderfunction) | Function to render the menu items and other elements inside the `<ThemedSider>` |
| `meta`                   | `Record<string,any>`                          | Meta data to use when creating routes for the menu items                        |
| `activeItemDisabled`     | `boolean`                                     | Whether clicking on an active sider item should reload the page                 |
| `siderItemsAreCollapsed` | `boolean`                                     | Whether nested sider items are by default expanded or collapsed                 |

```tsx
type SiderRenderFunction = (props: {
  items: JSX.Element[];
  logout: React.ReactNode;
  dashboard: React.ReactNode;
  collapsed: boolean;
}) => React.ReactNode;
```

### initialSiderCollapsed

This prop is used to set the initial collapsed state of the [`<ThemedSider>`][themed-sider] component.

- `true`: The [`<ThemedSider>`][themed-sider] component will be collapsed by default.
- `false`: The [`<ThemedSider>`][themed-sider] component will be expanded by default.

```tsx
<ThemedLayout
  // highlight-next-line
  initialSiderCollapsed={true}
>
  {/* ... */}
</ThemedLayout>
```

### `onSiderCollapsed`

Will be triggered when the [`<ThemedSider>`][themed-sider] component's `collapsed` state changes.

Can be used to persist collapsed state on the localstorage. Then you can use localStorage item to decide if sider should be collapsed initially or not.

Here's an example of how to use the `onSiderCollapsed` prop:

```tsx
const MyLayout = () => {
  const onSiderCollapse = (collapsed: boolean) => {
    localStorage.setItem("siderCollapsed", collapsed);
  };

  const initialSiderCollapsed = Boolean(localStorage.getItem("siderCollapsed"));

  return (
    <ThemedLayout
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapse}
    >
      {/* ... */}
    </ThemedLayout>
  );
};
```

### Header

In `<ThemedLayout>`, the header section is rendered using the [`<ThemedHeader>`][themed-header] component by default. It uses the [`useGetIdentity`](/core/docs/authentication/hooks/use-get-identity/) hook to display the user's name and avatar on the right side of the header. However, if desired, it's possible to replace the default [`<ThemedHeader>`][themed-header] component by passing a custom component to the `Header` prop.

Here is an example of how to replace the default [`<ThemedHeader>`][themed-header] component:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";

// highlight-next-line
import { CustomHeader } from "./CustomHeader";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayout
        // highlight-next-line
        Header={() => <CustomHeader />}
      >
        {/* ... */}
      </ThemedLayout>
    </Refine>
  );
};
```

You can also make it sticky using the `sticky` property, which is optional and defaults to `false`. An example of its usage is shown below.

```tsx
import { Refine } from "@refinedev/core";
import {
  ThemedLayout,
  // highlight-next-line
  ThemedHeader,
} from "@refinedev/mantine";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayout
        // highlight-start
        Header={() => <ThemedHeader sticky />}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayout>
    </Refine>
  );
};
```

### Title

In `<ThemedLayout>`, the title section is rendered using the [`<ThemedTitle>`][themed-title] component by default. However, if desired, it's possible to replace the default [`<ThemedTitle>`][themed-title] component by passing a custom component to the `Title` prop.

Here is an example of how to replace the default [`<ThemedTitle>`][themed-title] component:

```tsx
import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayout, ThemedTitle } from "@refinedev/mantine";

// highlight-next-line
import { MyLargeIcon, MySmallIcon } from "./MyIcon";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayout
        // highlight-start
        Title={({ collapsed }) => (
          <ThemedTitle
            // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
            collapsed={collapsed}
            icon={collapsed ? <MySmallIcon /> : <MyLargeIcon />}
            text="My Project"
          />
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayout>
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

import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Center, Global } from "@mantine/core";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <MantineProvider
      theme={RefineThemes.Blue}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
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
                <ThemedLayout
                  Footer={() => (
                    <Center
                      w="100%"
                      h="64px"
                      sx={(theme) => ({
                        borderTop: `1px solid ${theme.colors.gray[4]}`,
                        backgroundColor: theme.colors.gray[2],
                      })}
                    >
                      My Custom Footer
                    </Center>
                  )}
                >
                  <Outlet />
                </ThemedLayout>
              }
            >
              {/* highlight-next-line */}
              <Route path="/samples" element={<MantineInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";
import { Center } from "@mantine/core";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayout
        // highlight-start
        Footer={() => (
          <Center
            w="100%"
            h="64px"
            sx={(theme) => ({
              borderTop: `1px solid ${theme.colors.gray[4]}`,
              backgroundColor: theme.colors.gray[2],
            })}
          >
            My Custom Footer
          </Center>
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayout>
    </Refine>
  );
};
```

### OffLayoutArea

Off-layout area component is rendered outside of the main layout component, allowing it to be placed anywhere on the page while still being part of the overall layout .Refine doesn't provide a default off-layout area component. However, you can pass a custom component to the `OffLayoutArea` prop to display a custom off-layout area.

Here is an example of how to display a custom off-layout area:

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";

import { MantineInferencer } from "@refinedev/inferencer/mantine";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Button, Global } from "@mantine/core";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <MantineProvider
      theme={RefineThemes.Blue}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
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
                <ThemedLayout
                  OffLayoutArea={() => (
                    <Button
                      onClick={() => alert("Off layout are clicked")}
                      compact
                      sx={{
                        position: "fixed",
                        bottom: "16px",
                        left: "16px",
                      }}
                    >
                      Send us Feedback 👋
                    </Button>
                  )}
                >
                  <Outlet />
                </ThemedLayout>
              }
            >
              {/* highlight-next-line */}
              <Route path="/samples" element={<MantineInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayout
        // highlight-start
        OffLayoutArea={() => (
          <Button
            onClick={() => alert("Off layout are clicked")}
            compact
            sx={{
              position: "fixed",
              bottom: "16px",
              left: "16px",
            }}
          >
            Send us Feedback 👋
          </Button>
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayout>
    </Refine>
  );
};
```

## Customizing with swizzle

🚨 This feature is available with `@refine/cli`. Please refer to the [CLI documentation](/core/docs/packages/list-of-packages#swizzle) for more information.

`<ThemedLayout>` component source code can be ejecting using the `swizzle` command. This will create a copy of the component in your project's `src` directory, allowing you to customize as your needs.

### Usage

Let's create a new component by swizzling the `<ThemedLayout>` components.

```bash
> npm run refine swizzle

? Which package do you want to swizzle? (Use arrow keys or type to search)

Data Provider
 ◯ @refinedev/simple-rest
UI Framework
 ◉ @refinedev/mantine
```

First, you need to select the package you want to swizzle. In this example, we will swizzle the `@refinedev/mantine` package.

Refine CLI will only show the packages that are installed in your project.

```bash
? Which component do you want to swizzle?

 ◯ TagField
 ◯ TextField
 ◯ UrlField
Other
 ◯ Breadcrumb
❯◉ ThemedLayout
Pages
 ◯ ErrorPage
 ◯ AuthPage
(Move up and down to reveal more choices)
```

Then, you need to select the component you want to swizzle. In this example, we will swizzle the `ThemedLayout` component.

```bash
Successfully swizzled Themed Layout
Files created:
 - src/components/themedLayout/sider.tsx
 - src/components/themedLayout/header.tsx
 - src/components/themedLayout/title.tsx
 - src/components/themedLayout/index.tsx

Warning:
If you want to change the default layout;
You should pass layout related components to the <ThemedLayout/> component's props.

    ╭ App.tsx ───────────────────────────────────────────────────────────────────────────────────────╮
    │                                                                                                │
    │   import { ThemedLayout } from "components/themedLayout";                                    │
    │   import { ThemedHeader } from "components/themedLayout/header";                             │
    │   import { ThemedSider } from "components/themedLayout/sider";                               │
    │   import { ThemedTitle } from "components/themedLayout/title";                               │
    │                                                                                                │
    │   const App = () => {                                                                          │
    │       return (                                                                                 │
    │           <Refine                                                                              │
    │               /* ... */                                                                        │
    │           >                                                                                    │
    │               <ThemedLayout                                                                  │
    │                    Header={ThemedHeader}                                                     │
    │                    Sider={ThemedSider}                                                       │
    │                    Title={ThemedTitle}                                                       │
    │                />                                                                              │
    │                    /* ... */                                                                   │
    │               </ThemedLayout>                                                                │
    │           </Refine>                                                                            │
    │       );                                                                                       │
    │   }                                                                                            │
    │                                                                                                │
    ╰────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Finally, the swizzle command will create a new folder in the `src/components/layout` directory and generate the layout components of the `@refinedev/mantine` package in it.

You can use these components in your project as you wish.

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout } from "components/themedLayout";
import { ThemedHeader } from "components/themedLayout/header";
import { ThemedSider } from "components/themedLayout/sider";
import { ThemedTitle } from "components/themedLayout/title";

const App = () => {
  return (
    <Refine
    /* ... */
    >
      <ThemedLayout
        Header={ThemedHeader}
        Sider={ThemedSider}
        Title={ThemedTitle}
      >
        /* ... */
      </ThemedLayout>
    </Refine>
  );
};
```

:::simple Good to know

Refine CLI determines the path to create a new folder according to the framework you are using. For example, if you are using the `remix`, the path will be `app/components/layout`.

If there is already a file with the same name in the directory, the swizzle command will not overwrite it.

:::

## Hamburger Menu

The `HamburgerMenu` component is a component that is used to collapse/uncollapse the `Sider` component. It is used by default in the `Header` component. However, you can do this anywhere you want using the `<HamburgerMenu />` component. Below you can see an example put on the dashboard page.

```tsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@refinedev/core";

import { MantineInferencer } from "@refinedev/inferencer/mantine";
import {
  ThemedLayout,
  RefineThemes,
  // highlight-next-line
  HamburgerMenu,
} from "@refinedev/mantine";
import { MantineProvider, Global, Box } from "@mantine/core";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./authProvider";

import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const DashboardPage = () => {
  return (
    <Box>
      <HamburgerMenu />
    </Box>
  );
};
// highlight-end

const App: React.FC = () => {
  return (
    <MantineProvider
      theme={RefineThemes.Blue}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            // highlight-start
            {
              name: "Dashboard",
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
                // highlight-next-line
                <ThemedLayout Header={() => null}>
                  <Outlet />
                </ThemedLayout>
              }
            >
              {/* highlight-next-line */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/samples" element={<MantineInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

## FAQ

### How can I persist the collapsed state of the [`<ThemedSider>`][themed-sider] component?

You can use the [`initialSiderCollapsed`](#initialsidercollapsed) prop to persist the collapsed state of the [`<ThemedSider>`][themed-sider] component.

For example, you can get `initialSiderCollapsed`'s value from `localStorage` or `cookie` for persistence between sessions.

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
import { ThemedLayout } from "@refinedev/mantine";

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
              <ThemedLayout initialSiderCollapsed={initialSiderCollapsed}>
                <Outlet />
              </ThemedLayout>
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
import { ThemedLayout } from "@refinedev/mantine";

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
      <ThemedLayout initialSiderCollapsed={initialSiderCollapsed}>
        <Component {...pageProps} />
      </ThemedLayout>
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
import { ThemedLayout } from "@refinedev/mantine";

export default function BaseLayout() {
  // you can get this value from `localStorage` or `cookie`
  // for persistence between sessions
  const [initialSiderCollapsed, setInitialSiderCollapsed] = useState(true);

  return (
    <ThemedLayout initialSiderCollapsed={initialSiderCollapsed}>
      <Outlet />
    </ThemedLayout>
  );
}
```

</TabItem>

</Tabs>
```

[themed-sider]: https://github.com/refinedev/refine/blob/main/packages/mantine/src/components/themedLayout/sider/index.tsx
[themed-header]: https://github.com/refinedev/refine/blob/main/packages/mantine/src/components/themedLayout/header/index.tsx
[themed-title]: https://github.com/refinedev/refine/blob/main/packages/mantine/src/components/themedLayout/title/index.tsx
[use-menu]: /core/docs/core/hooks/utilities/use-menu
[refine-component]: /core/docs/core/refine-component
[mantine-drawer]: https://mantine.dev/core/drawer/
