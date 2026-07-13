---
title: "MUI Edit Button | Refine v4 Action Components"
display_title: "Edit"
sidebar_label: "Edit"
description: "Official guide to the Material UI Edit Button. Learn how to navigate to resource update pages with optimized MUI button components."
swizzle: true
---

`<EditButton>` uses Material UI's [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `edit` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation) under the hood. It can be useful to redirect the app to the edit page route of resource.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

## Usage

```tsx live previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  EditButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    display: "flex",
    renderCell: function render({ row }) {
      // highlight-next-line
      return <EditButton size="small" recordItemId={row.id} />;
    },
    align: "center",
    headerAlign: "center",
    minWidth: 80,
  },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

const PostEdit = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/:id/edit",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<PostsList />} />
          <ReactRouter.Route path=":id/edit" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path for the edit route. By default, the `recordItemId` is inferred from the route params.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { EditButton } from "@refinedev/mui";

const MyEditComponent = () => {
  return (
    <EditButton
      resource="posts"
      // highlight-next-line
      recordItemId="123"
    />
  );
};

// visible-block-end

const PostEdit = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/:id/edit",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyEditComponent />} />
          <ReactRouter.Route path=":id/edit" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation) and then redirect the app to the `edit` action path of the resource, filling the necessary parameters in the route.

### resource

Redirection endpoint is defined by the `resource` property and its `edit` action path. By default, `<EditButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { EditButton } from "@refinedev/mui";

const MyEditComponent = () => {
  return (
    <EditButton
      // highlight-next-line
      resource="categories"
      recordItemId="123"
    />
  );
};

// visible-block-end

const CategoryEdit = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/:id/edit",
        },
        {
          name: "categories",
          list: "/categories",
          edit: "/categories/:id/edit",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/categories" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyEditComponent />} />
          <ReactRouter.Route path=":id/edit" element={<CategoryEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation) and then redirect the app to the `edit` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `edit` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `edit` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `edit` action route is defined by the pattern: `/posts/:authorId/edit/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <EditButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { EditButton } from "@refinedev/mui";

const MyEditComponent = () => {
  return (
    <EditButton
      resource="posts"
      recordItemId="123"
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const PostEdit = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/:id/edit",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyEditComponent />} />
          <ReactRouter.Route path=":id/edit" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { EditButton } from "@refinedev/mui";

export const MyListComponent = () => {
  return (
    <EditButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/EditButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).

:::
