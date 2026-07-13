---
id: list
title: List
sidebar_label: List
swizzle: true
---

`<List>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts
// visible-block-start
import React from "react";
import { useMany } from "@pankod/refine-core";
import {
  List,
  DataGrid,
  DateField,
  useDataGrid,
  GridColumns,
} from "@pankod/refine-mui";

const SampleList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColumns<any>>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "category",
        headerName: "Category",
        valueGetter: ({ row }) => {
          const value = row?.category?.id;

          return value;
        },
        minWidth: 300,
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
    ],
    [categoryData?.data],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/samples"]}
    resources={[{ name: "samples", list: SampleList }]}
  />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<List>` component. if you don't pass title props it uses the plural resource name by default. For example, for the `/posts` resource, it will be "Posts".

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts/create
// visible-block-start
import { List, Typography } from "@pankod/refine-mui";

const ListPage: React.FC = () => {
  return (
    <List
      // highlight-next-line
      title={<Typography variant="h5">Custom Title</Typography>}
    >
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: ListPage,
      },
    ]}
  />,
);
```

### `resource`

The `<List>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<List>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { List, Layout } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <List resource="posts">
      <span>Rest of your page here</span>
    </List>
  );
};

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        // highlight-start
        routes: [
          {
            element: <CustomPage />,
            path: "/custom",
          },
        ],
        // highlight-end
      }}
      Layout={Layout}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const authProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve("admin"),
  getUserIdentity: () => Promise.resolve(),
};

// visible-block-start
import { List } from "@pankod/refine-mui";
import { usePermissions } from "@pankod/refine-core";

const PostList: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <List
      /* highlight-start */
      canCreate={permissionsData?.includes("admin")}
      createButtonProps={{ size: "small" }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    authProvider={authProvider}
    dataProvider={dataProvider}
    initialRoutes={["/posts"]}
    Layout={RefineMui.Layout}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions)

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mui/components/breadcrumb)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List, Breadcrumb } from "@pankod/refine-mui";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      breadcrumb={
        <div
          style={{
            padding: "3px 6px",
            border: "2px dashed cornflowerblue",
          }}
        >
          <Breadcrumb />
        </div>
      }
      // highlight-end
    >
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
    DashboardPage={() => {
      return (
        <div>
          <p>This page is empty.</p>
          <RefineMui.ListButton resource="posts" />
        </div>
      );
    }}
  />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@pankod/refine-mui";

const PostList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <List
      // highlight-start
      wrapperProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### `headerProps`

If you want to customize the header of the `<List/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@pankod/refine-mui";

const PostList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <List
      // highlight-start
      headerProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### `contentProps`

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@pankod/refine-mui";

const PostList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <List
      // highlight-start
      contentProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List, Button } from "@pankod/refine-mui";

const PostList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <List
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List, Button } from "@pankod/refine-mui";

const PostList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <List
      // highlight-start
      headerButtonProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
    >
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<List>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<List>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/create.tsx"
// highlight-next-line
import { List, Typography } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
  return (
    <List
      // highlight-start
      cardHeaderProps={{
        title: <Typography variant="h5">Custom Title</Typography>,
      }}
      // highlight-end
    >
      ...
    </List>
  );
};
```

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<List>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/List"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtons-default="[`CreateButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/create-button/)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/core/docs/3.xx.xx/api-reference/mui/components/mui-breadcrumb/)"
createButtonProps-type="[`CreateButtonProps`](https://refine.dev/core/docs/api-reference/mui/components/buttons/create-button/)"
/>

```tsx live shared
const Wrapper = ({ children }) => {
  return (
    <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
      <RefineMui.CssBaseline />
      <RefineMui.GlobalStyles
        styles={{ html: { WebkitFontSmoothing: "auto" } }}
      />
      {children}
    </RefineMui.ThemeProvider>
  );
};
```
