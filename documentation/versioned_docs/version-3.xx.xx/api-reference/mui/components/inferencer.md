---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `MuiListInferencer`, `MuiShowInferencer`, `MuiEditInferencer`, `MuiCreateInferencer` and `MuiInferencer` (which combines all in one place) components.

## Usage

Material UI components can be imported from `@pankod/refine-inferencer/mui`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import {
  ThemeProvider,
  LightTheme,
  CssBaseline,
  GlobalStyles,
} from "@pankod/refine-mui";

// highlight-next-line
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        resources={[
          {
            name: "samples",
            // highlight-start
            list: MuiInferencer,
            show: MuiInferencer,
            create: MuiInferencer,
            edit: MuiInferencer,
            // highlight-end
          },
        ]}
      />
    </ThemeProvider>
  );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const SampleList = () => {
  return (
    // highlight-next-line
    <MuiInferencer resource="samples" action="list" />
  );
};

const SampleShow = () => {
  return (
    // highlight-next-line
    <MuiInferencer resource="samples" action="show" id="1" />
  );
};

const SampleCreate = () => {
  return (
    // highlight-next-line
    <MuiInferencer resource="samples" action="create" />
  );
};

const SampleEdit = () => {
  return (
    // highlight-next-line
    <MuiInferencer resource="samples" action="edit" id="1" />
  );
};
```

  </TabItem>
</Tabs>

:::info
To learn more about `@pankod/refine-inferencer` package, please check out [Docs](/core/docs/3.xx.xx/packages/documentation/inferencer)
:::

## Views

### `List`

Generates a sample list view for your resources according to the API response. It uses `List` component and `useDatagrid` hook from `@pankod/refine-mui`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/posts
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ThemeProvider,
  LightTheme,
  CssBaseline,
  GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            // highlight-next-line
            list: MuiInferencer,
            show: MuiInferencer,
            create: MuiInferencer,
            edit: MuiInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            // highlight-next-line
            list: MuiInferencer,
            show: MuiInferencer,
          },
          {
            name: "tags",
            // highlight-next-line
            list: MuiInferencer,
            show: MuiInferencer,
          },
        ]}
      />
    </ThemeProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Show`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-mui` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ThemeProvider,
  LightTheme,
  CssBaseline,
  GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: MuiInferencer,
            // highlight-next-line
            show: MuiInferencer,
            create: MuiInferencer,
            edit: MuiInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: MuiInferencer,
            // highlight-next-line
            show: MuiInferencer,
          },
          {
            name: "tags",
            list: MuiInferencer,
            // highlight-next-line
            show: MuiInferencer,
          },
        ]}
      />
    </ThemeProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Create`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component from `@pankod/refine-mui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ThemeProvider,
  LightTheme,
  CssBaseline,
  GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: MuiInferencer,
            show: MuiInferencer,
            // highlight-next-line
            create: MuiInferencer,
            edit: MuiInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: MuiInferencer,
            show: MuiInferencer,
          },
          {
            name: "tags",
            list: MuiInferencer,
            show: MuiInferencer,
          },
        ]}
      />
    </ThemeProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Edit`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component from `@pankod/refine-mui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ThemeProvider,
  LightTheme,
  CssBaseline,
  GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: MuiInferencer,
            show: MuiInferencer,
            create: MuiInferencer,
            // highlight-next-line
            edit: MuiInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: MuiInferencer,
            show: MuiInferencer,
          },
          {
            name: "tags",
            list: MuiInferencer,
            show: MuiInferencer,
          },
        ]}
      />
    </ThemeProvider>
  );
};

// visible-block-end

render(<App />);
```

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/mui` components.

<CodeSandboxExample path="inferencer-material-ui" />
