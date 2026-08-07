---
title: "Ant Design Inferencer Component | UI Component in Refine v5"
display_title: "Inferencer"
sidebar_label: "Inferencer"
description: "Secure Inferencer in Refine v5. Learn best practices. Learn integration patterns for enterprise UI, components for polished admin UIs. Learn with code examples."
---

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports the `AntdListInferencer`, `AntdShowInferencer`, `AntdEditInferencer`, `AntdCreateInferencer` components and finally the `AntdInferencer` component, which combines all in one place.

## Usage

Inferencer components can be imported from `@refinedev/inferencer/antd`. You can directly use the components in your routes without passing any props. If you use a `routerProvider`, it will infer the `resource`, `action` and `id` from the current route.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import routerProvider from "@refinedev/react-router";
import { BrowserRouter } from "react-router";
// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const App = () => {
  return (
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
          <Route path="/samples" element={<AntdInferencer />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const SampleList = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="list" />
  );
};

const SampleShow = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="show" id="1" />
  );
};

const SampleCreate = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="create" />
  );
};

const SampleEdit = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="edit" id="1" />
  );
};
```

  </TabItem>
</Tabs>

> For more information, refer to the [Inferencer documentation](/core/docs/packages/inferencer/)

## Views

### List

Generates a sample list view for your resources according to the API response. It uses the `List` and `Table` components with the `useTable` hook from `@refinedev/antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
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

### Show

Generates a sample show view for your resources according to the API response. It uses the `Show` and field components from `@refinedev/antd` with the `useShow` hook from `@refinedev/core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { RefineThemes, ThemedLayout } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
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
              <Route path="/samples/show/:id" element={<AntdInferencer />} />
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

### Create

Generates a sample create view for your resources according to the first record in list API response. It uses the `Create` component and the `useForm` hook from `@refinedev/antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
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
              <Route path="/samples/create" element={<AntdInferencer />} />
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

### Edit

Generates a sample edit view for your resources according to the API response. It uses the `Edit` component and the `useForm` hook from `@refinedev/antd`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
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
              <Route path="/samples/edit/:id" element={<AntdInferencer />} />
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

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup Refine app with the `@refinedev/inferencer/antd` components.

<CodeSandboxExample path="inferencer-antd" />
