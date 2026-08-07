---
title: "MUI List View | Refine v4 Data Grids"
display_title: "List"
sidebar_label: "List"
description: "Build professional 'List' pages with Material UI. Documentation on implementing tables, pagination, and data filters for your Refine v4 resources."
swizzle: true
---

`<List>` provides us a layout to display the page. It does not contain any logic and just adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { useMany } from "@refinedev/core";
import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const SampleList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef<any>[]>(
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
        display: "flex",
        renderCell: function render({ row }) {
          const value = row?.category?.id;
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
        display: "flex",
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
    ],
    [categoryData?.data],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<SampleList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

## Properties

### title

`title` allows the addition of titles inside the `<List>` component. If you don't pass title props it uses the plural resource name by default. For example, for the `/posts` resource, it will be "Posts".

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mui";
import { Typography } from "@mui/material";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<ListPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

The `<List>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<List>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/custom
setInitialRoutes(["/custom"]);

// visible-block-start
import { List } from "@refinedev/mui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <List resource="posts">
      <span>Rest of your page here</span>
    </List>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/custom"
          element={
            <div style={{ padding: 16 }}>
              <CustomPage />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### canCreate and createButtonProps

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, Refine adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const authProvider = {
  login: async () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: async () => {
    return {
      success: true,
    };
  },
  forgotPassword: async () => {
    return {
      success: true,
    };
  },
  updatePassword: async () => {
    return {
      success: true,
    };
  },
  logout: async () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },
  check: async () => ({
    authenticated: true,
  }),
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => ["admin"],
  getIdentity: async () => null,
};

// visible-block-start
import { List } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      authProvider={authProvider}
      dataProvider={dataProvider}
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`usePermission` documentation &#8594](/core/docs/authentication/hooks/use-permissions)

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mui` package.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, Breadcrumb } from "@refinedev/mui";

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
          <Breadcrumb minItems={0} />
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/material-ui/components/breadcrumb)

### wrapperProps

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mui";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation from Material UI &#8594](https://mui.com/material-ui/api/card/)

### headerProps

If you want to customize the header of the `<List/>` component, you can use the `headerProps` property.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mui";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`CardHeader` documentation from Material UI &#8594](https://mui.com/material-ui/api/card-header/)

### contentProps

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mui";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`CardContent` documentation from Material UI &#8594](https://mui.com/material-ui/api/card-content/)

### headerButtons

By default, the `<List/>` component has a [`<CreateButton>`][create-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, createButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If "create" resource is not defined or [`canCreate`](#cancreate-and-createbuttonprops) is `false`, the [`<CreateButton>`][create-button] will not render and `createButtonProps` will be `undefined`.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mui";
import { Button } from "@mui/material";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<CreateButton>`][create-button] component.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, CreateButton } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostList: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <List
      // highlight-start
      headerButtons={({ createButtonProps }) => (
        <>
          {createButtonProps && (
            <CreateButton {...createButtonProps} meta={{ foo: "bar" }} />
          )}
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mui";
import { Button } from "@mui/material";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Material UI &#8594](https://mui.com/material-ui/api/box/)

## API Reference

### Properties

<PropsTable module="@refinedev/mui/List"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtons-default="[`CreateButton`](/core/docs/ui-integrations/material-ui/components/buttons/create-button/)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/core/docs/ui-integrations/material-ui/components/breadcrumb)"
createButtonProps-type="[`CreateButtonProps`](/core/docs/ui-integrations/material-ui/components/buttons/create-button/)"
/>

[create-button]: /core/docs/ui-integrations/material-ui/components/buttons/create-button
