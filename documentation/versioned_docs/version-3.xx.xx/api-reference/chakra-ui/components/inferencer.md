---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `ChakraUIListInferencer`, `ChakraUIShowInferencer`, `ChakraUIEditInferencer`, `ChakraUICreateInferencer` and `ChakraUIInferencer` (which combines all in one place) components.

## Usage

Chakra UI components can be imported from `@pankod/refine-inferencer/chakra-ui`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";

// highlight-next-line
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";

const App = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        resources={[
          {
            name: "samples",
            // highlight-start
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
            create: ChakraUIInferencer,
            edit: ChakraUIInferencer,
            // highlight-end
          },
        ]}
      />
    </ChakraProvider>
  );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";

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

:::info
To learn more about `@pankod/refine-inferencer` package, please check out [Docs](/core/docs/3.xx.xx/packages/documentation/inferencer)
:::

## Views

### `List`

Generates a sample list view for your resources according to the API response. It uses `List` component from `@pankod/refine-chakra-ui` and `useTable` hook from `@pankod/refine-react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            // highlight-next-line
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
            create: ChakraUIInferencer,
            edit: ChakraUIInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            // highlight-next-line
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
          },
          {
            name: "tags",
            // highlight-next-line
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
          },
        ]}
      />
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Show`

Generates a sample show view for your resources according to the API response. It uses `Show` and field components from `@pankod/refine-chakra-ui` with `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: ChakraUIInferencer,
            // highlight-next-line
            show: ChakraUIInferencer,
            create: ChakraUIInferencer,
            edit: ChakraUIInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: ChakraUIInferencer,
            // highlight-next-line
            show: ChakraUIInferencer,
          },
          {
            name: "tags",
            list: ChakraUIInferencer,
            // highlight-next-line
            show: ChakraUIInferencer,
          },
        ]}
      />
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Create`

Generates a sample create view for your resources according to the first record in list API response. It uses `Create` component from `@pankod/refine-chakra-ui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
            // highlight-next-line
            create: ChakraUIInferencer,
            edit: ChakraUIInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
          },
          {
            name: "tags",
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
          },
        ]}
      />
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

### `Edit`

Generates a sample edit view for your resources according to the API response. It uses `Edit` component from `@pankod/refine-chakra-ui` and `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, ChakraProvider, refineTheme } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "samples",
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
            create: ChakraUIInferencer,
            // highlight-next-line
            edit: ChakraUIInferencer,
            canDelete: true,
          },
          {
            name: "categories",
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
          },
          {
            name: "tags",
            list: ChakraUIInferencer,
            show: ChakraUIInferencer,
          },
        ]}
      />
    </ChakraProvider>
  );
};

// visible-block-end

render(<App />);
```

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/chakra-ui` components.

<CodeSandboxExample path="inferencer-chakra-ui" />
