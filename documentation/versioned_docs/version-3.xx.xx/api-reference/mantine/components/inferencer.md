---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `MantineListInferencer`, `MantineShowInferencer`, `MantineEditInferencer`, `MantineCreateInferencer` and `MantineInferencer` (which combines all in one place) components.

## Usage

Mantine components can be imported from `@pankod/refine-inferencer/mantine`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import {
  Layout,
  MantineProvider,
  LightTheme,
  Global,
} from "@pankod/refine-mantine";

// highlight-next-line
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

const App = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        resources={[
          {
            name: "samples",
            // highlight-start
            list: MantineInferencer,
            show: MantineInferencer,
            create: MantineInferencer,
            edit: MantineInferencer,
            // highlight-end
          },
        ]}
      />
    </MantineProvider>
  );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

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

:::info
To learn more about `@pankod/refine-inferencer` package, please check out [Docs](/core/docs/3.xx.xx/packages/documentation/inferencer)
:::

## Views

### `List`

Generates a sample list view for your resources according to the API response. It uses `List` component and from `@pankod/refine-mantine` and `useTable` hook from `@pankod/refine-react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  MantineProvider,
  LightTheme,
  Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            // highlight-next-line
            list: MantineInferencer,
            show: MantineInferencer,
            create: MantineInferencer,
            edit: MantineInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            // highlight-next-line
            list: MantineInferencer,
            show: MantineInferencer,
          },
          {
            name: "tags",
            // highlight-next-line
            list: MantineInferencer,
            show: MantineInferencer,
          },
        ]}
      />
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Show`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-mantine` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  MantineProvider,
  LightTheme,
  Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: MantineInferencer,
            // highlight-next-line
            show: MantineInferencer,
            create: MantineInferencer,
            edit: MantineInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: MantineInferencer,
            // highlight-next-line
            show: MantineInferencer,
          },
          {
            name: "tags",
            list: MantineInferencer,
            // highlight-next-line
            show: MantineInferencer,
          },
        ]}
      />
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Create`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component and `useForm` hook from `@pankod/refine-mantine`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  MantineProvider,
  LightTheme,
  Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: MantineInferencer,
            show: MantineInferencer,
            // highlight-next-line
            create: MantineInferencer,
            edit: MantineInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: MantineInferencer,
            show: MantineInferencer,
          },
          {
            name: "tags",
            list: MantineInferencer,
            show: MantineInferencer,
          },
        ]}
      />
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Edit`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component and `useForm` hook from `@pankod/refine-mantine`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  MantineProvider,
  LightTheme,
  Global,
} from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: MantineInferencer,
            show: MantineInferencer,
            create: MantineInferencer,
            // highlight-next-line
            edit: MantineInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: MantineInferencer,
            show: MantineInferencer,
          },
          {
            name: "tags",
            list: MantineInferencer,
            show: MantineInferencer,
          },
        ]}
      />
    </MantineProvider>
  );
};

// visible-block-end

render(<App />);
```

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/mantine` components.

<CodeSandboxExample path="inferencer-mantine" />
