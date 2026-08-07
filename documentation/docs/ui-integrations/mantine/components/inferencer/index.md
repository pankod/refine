---
title: "Mantine Inferencer Component | UI Component in Refine v5"
display_title: "Inferencer"
sidebar_label: "Inferencer"
description: "Learn to integrate Inferencer in Refine v5. Learn integration patterns for React UI library, components for polished admin UIs. Hands-on examples included."
---

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports `MantineListInferencer`, `MantineShowInferencer`, `MantineEditInferencer`, `MantineCreateInferencer` components and finally the `MantineInferencer` component, which combines all in one place.

## Usage

Inferencer components can be imported from `@refinedev/inferencer/mantine`. You can directly use the components in your routes without passing any props. If you use a `routerProvider`, it will infer the `resource`, `action` and `id` from the current route.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import { Layout, Global } from "@refinedev/mantine";
import { MantineProvider, LightTheme } from "@mantine/core";

// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";

const App = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            {/* highlight-next-line */}
            <Route path="/samples" element={<MantineInferencer />} />
          </Routes>
        </Refine>
      </BrowserRouter>
    </MantineProvider>
  );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";

const SampleList = () => {
  return (
    // highlight-next-line
    <MantineInferencer resource="samples" action="list" />
  );
};

const SampleShow = () => {
  return (
    // highlight-next-line
    <MantineInferencer resource="samples" action="show" id="1" />
  );
};

const SampleCreate = () => {
  return (
    // highlight-next-line
    <MantineInferencer resource="samples" action="create" />
  );
};

const SampleEdit = () => {
  return (
    // highlight-next-line
    <MantineInferencer resource="samples" action="edit" id="1" />
  );
};
```

  </TabItem>
</Tabs>

To learn more about `@refinedev/inferencer` package, please check out its [Documentation](/core/docs/packages/list-of-packages/)

## Views

### List

Generates a sample list view for your resources according to the API response. It uses the `List` component and from `@refinedev/mantine` and the `useTable` hook from `@refinedev/react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";

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

### Show

Generates a sample show view for your resources according to the API response. It uses the `Show` and field components from `@refinedev/mantine` with the `useShow` hook from `@refinedev/core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";

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
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "samples",
              show: "/samples/show/:id",
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
              <Route path="/samples/show/:id" element={<MantineInferencer />} />
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

### Create

Generates a sample create view for your resources according to the first record in list API response. It uses the `Create` component and the `useForm` hook from `@refinedev/mantine`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";

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
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "samples",
              create: "/samples/create",
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
              <Route path="/samples/create" element={<MantineInferencer />} />
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

### Edit

Generates a sample edit view for your resources according to the API response. It uses the `Edit` component and the `useForm` hook from `@refinedev/mantine`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { RefineThemes, ThemedLayout } from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";

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
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "samples",
              edit: "/samples/edit/:id",
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
              <Route path="/samples/edit/:id" element={<MantineInferencer />} />
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

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@refinedev/inferencer/mantine` components.

<CodeSandboxExample path="inferencer-mantine" />
