---
title: "MUI Create Button | Refine v4 Navigation UI"
display_title: "Create"
sidebar_label: "Create"
description: "Documentation for the MUI Create Button. Learn how to trigger navigation to resource creation pages using pre-styled Material UI components."
swizzle: true
---

`<CreateButton>` uses Material UI's [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `create` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation) under the hood. It can be useful to redirect the app to the create page route of resource.

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
  CreateButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  return (
    // highlight-next-line
    <List headerButtons={<CreateButton />}>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

const PostCreate = () => {
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
          create: "/posts/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<PostsList />} />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### resource

It is used to redirect the app to the `create` action path of the given resource name. By default, the app redirects to the inferred resource's `create` action path.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CreateButton } from "@refinedev/mui";

const MyCreateComponent = () => {
  return (
    <CreateButton
      // highlight-next-line
      resource="categories"
    />
  );
};

// visible-block-end

const CategoriesCreate = () => {
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
        },
        {
          name: "categories",
          create: "/categories/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<MyCreateComponent />} />

        <ReactRouter.Route
          path="/categories/create"
          element={<CategoriesCreate />}
        />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `create` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation) and then redirect the app to the `create` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `create` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `create` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `create` action route is defined by the pattern: `/posts/:authorId/create`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <CreateButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to show or hide the text of the button. When `true`, only the button icon is visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CreateButton } from "@refinedev/mui";

const MyCreateComponent = () => {
  return (
    <CreateButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const PostCreate = () => {
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
          create: "/posts/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyCreateComponent />} />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

The `accessControl` prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { CreateButton } from "@refinedev/mui";

export const MyListComponent = () => {
  return (
    <CreateButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/CreateButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).

:::
