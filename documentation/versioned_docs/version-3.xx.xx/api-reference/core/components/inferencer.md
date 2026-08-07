---
id: inferencer
title: Inferencer
---

You can automatically generate views for your resources using `@pankod/refine-inferencer`. Inferencer exports `HeadlessListInferencer`, `HeadlessShowInferencer`, `HeadlessEditInferencer`, `HeadlessCreateInferencer` and `HeadlessInferencer` (which combines all in one place) components.

:::caution Dependencies

`@pankod/refine-inferencer/headless` uses [`@pankod/refine-react-hook-form`](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm) and [`@pankod/refine-react-table`](/core/docs/3.xx.xx/packages/documentation/react-table) to create views.

Make sure you include them in your dependencies.

:::

## Usage

Ant Design components can be imported from `@pankod/refine-inferencer/headless`. You can directly use the components in `resources` prop of `Refine` component or you can use them in your custom components by passing the `resource` prop as the resource name.

<Tabs
defaultValue="resources"
values={[
{label: <>In<code style={{ margin: "0 0.7ch" }}>resources</code>prop</>, value: 'resources'},
{label: 'In Custom Components', value: 'custom'}
]}>
<TabItem value="resources">

```tsx
// highlight-next-line
import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "samples",
          // highlight-start
          list: HeadlessInferencer,
          show: HeadlessInferencer,
          create: HeadlessInferencer,
          edit: HeadlessInferencer,
          // highlight-end
        },
      ]}
    />
  );
};
```

  </TabItem>
  <TabItem value="custom">

```tsx
// highlight-next-line
import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

const SampleList = () => {
  return (
    // highlight-next-line
    <HeadlessInferencer resource="samples" action="list" />
  );
};

const SampleShow = () => {
  return (
    // highlight-next-line
    <HeadlessInferencer resource="samples" action="show" id="1" />
  );
};

const SampleCreate = () => {
  return (
    // highlight-next-line
    <HeadlessInferencer resource="samples" action="create" />
  );
};

const SampleEdit = () => {
  return (
    // highlight-next-line
    <HeadlessInferencer resource="samples" action="edit" id="1" />
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

Generates a sample list view for your resources according to the API response. It uses `useTable` hook from `@pankod/refine-react-table`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      resources={[
        {
          name: "samples",
          // highlight-next-line
          list: HeadlessInferencer,
          show: HeadlessInferencer,
          create: HeadlessInferencer,
          edit: HeadlessInferencer,
          canDelete: true,
        },
        {
          name: "categories",
          // highlight-next-line
          list: HeadlessInferencer,
          show: HeadlessInferencer,
        },
        {
          name: "tags",
          // highlight-next-line
          list: HeadlessInferencer,
          show: HeadlessInferencer,
        },
      ]}
    />
  );
};

// visible-block-end

render(<App />);
```

### `Show`

Generates a sample show view for your resources according to the API response. It uses `useShow` hook from `@pankod/refine-core`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      resources={[
        {
          name: "samples",
          list: HeadlessInferencer,
          // highlight-next-line
          show: HeadlessInferencer,
          create: HeadlessInferencer,
          edit: HeadlessInferencer,
          canDelete: true,
        },
        {
          name: "categories",
          list: HeadlessInferencer,
          // highlight-next-line
          show: HeadlessInferencer,
        },
        {
          name: "tags",
          list: HeadlessInferencer,
          // highlight-next-line
          show: HeadlessInferencer,
        },
      ]}
    />
  );
};

// visible-block-end

render(<App />);
```

### `Create`

Generates a sample create view for your resources according to the first record in list API response. It uses `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      resources={[
        {
          name: "samples",
          list: HeadlessInferencer,
          show: HeadlessInferencer,
          // highlight-next-line
          create: HeadlessInferencer,
          edit: HeadlessInferencer,
          canDelete: true,
        },
        {
          name: "categories",
          list: HeadlessInferencer,
          show: HeadlessInferencer,
        },
        {
          name: "tags",
          list: HeadlessInferencer,
          show: HeadlessInferencer,
        },
      ]}
    />
  );
};

// visible-block-end

render(<App />);
```

### `Edit`

Generates a sample edit view for your resources according to the API response. It uses `useForm` hook from `@pankod/refine-react-hook-form`.

```tsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      resources={[
        {
          name: "samples",
          list: HeadlessInferencer,
          show: HeadlessInferencer,
          create: HeadlessInferencer,
          // highlight-next-line
          edit: HeadlessInferencer,
          canDelete: true,
        },
        {
          name: "categories",
          list: HeadlessInferencer,
          show: HeadlessInferencer,
        },
        {
          name: "tags",
          list: HeadlessInferencer,
          show: HeadlessInferencer,
        },
      ]}
    />
  );
};

// visible-block-end

render(<App />);
```

## Example

Below you'll find a Live CodeSandbox Example displaying a fully setup `Refine` app with `@pankod/refine-inferencer/headless` components.

<CodeSandboxExample path="inferencer-headless" />
