---
title: "Chakra UI Inferencer Component | UI Component in Refine v5"
display_title: "Inferencer"
sidebar_label: "Inferencer"
description: "Integrate Inferencer in Refine v5. Learn best practices. Learn integrate accessibility, components for polished admin UIs. Hands-on examples included."
---

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports `ChakraUIListInferencer`, `ChakraUIShowInferencer`, `ChakraUIEditInferencer`, `ChakraUICreateInferencer` components and finally the `ChakraUIInferencer` component, which combines all in one place.

## Usage

Inferencer components can be imported from `@refinedev/inferencer/chakra-ui`. You can directly use the components in your routes without passing any props. If you use a `routerProvider`, it will infer the `resource`, `action` and `id` from the current route.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import { Layout, refineTheme } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

const App = () => {
  return (
    <ChakraProvider theme={refineTheme}>
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
            <Route path="/samples" element={<ChakraUIInferencer />} />
          </Routes>
        </Refine>
      </BrowserRouter>
    </ChakraProvider>
  );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

const SampleList = () => {
  return (
    // highlight-next-line
    <ChakraUIInferencer resource="samples" action="list" />
  );
};

const SampleShow = () => {
  return (
    // highlight-next-line
    <ChakraUIInferencer resource="samples" action="show" id="1" />
  );
};

const SampleCreate = () => {
  return (
    // highlight-next-line
    <ChakraUIInferencer resource="samples" action="create" />
  );
};

const SampleEdit = () => {
  return (
    // highlight-next-line
    <ChakraUIInferencer resource="samples" action="edit" id="1" />
  );
};
```

  </TabItem>
</Tabs>

To learn more about `@refinedev/inferencer` package, please check out its [documentation](/core/docs/packages/list-of-packages/)

## Views

### List

Generates a sample list view for your resources according to the API response. It uses the `List` component from `@refinedev/chakra-ui` and `useTable` hook from `@refinedev/react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={RefineThemes.Blue}>
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
              <Route path="/samples" element={<ChakraUIInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

### Show

Generates a sample show view for your resources according to the API response. It uses the `Show` and `field` components from `@refinedev/chakra-ui` with the `useShow` hook from `@refinedev/core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={RefineThemes.Blue}>
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
              <Route
                path="/samples/show/:id"
                element={<ChakraUIInferencer />}
              />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

### Create

Generates a sample create view for your resources according to the first record in list API response. It uses the `Create` component from `@refinedev/chakra-ui` and the `useForm` hook from `@refinedev/react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={RefineThemes.Blue}>
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
              <Route path="/samples/create" element={<ChakraUIInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

### Edit

Generates a sample edit view for your resources according to the API response. It uses the `Edit` component from `@refinedev/chakra-ui` and the `useForm` hook from `@refinedev/react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={RefineThemes.Blue}>
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
              <Route
                path="/samples/edit/:id"
                element={<ChakraUIInferencer />}
              />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

## Example

Below, you will find a Live CodeSandbox Example displaying a fully setup `Refine` app with the `@refinedev/inferencer/chakra-ui` components.

<CodeSandboxExample path="inferencer-chakra-ui" />
