---
title: "MUI Show Button | Refine v4 Detail Views"
display_title: "Show"
sidebar_label: "Show"
description: "Implement record detail navigation using the MUI Show Button. Official UI component documentation for managing views in Refine v4."
swizzle: true
---

`<ShowButton>` uses Material UI's [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation) under the hood. It can be useful when redirecting the app to the show page with the record id route of resource.

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
  ShowButton,
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
      return <ShowButton size="small" recordItemId={row.id} />;
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

const PostShow = () => {
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
          show: "/posts/:id/show",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<PostsList />} />
          <ReactRouter.Route path=":id/show" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path. By default, the `recordItemId` is inferred from the route params.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { ShowButton } from "@refinedev/mui";

const MyShowComponent = () => {
  return (
    <ShowButton
      resource="posts"
      // highlight-next-line
      recordItemId="123"
    />
  );
};

// visible-block-end

const PostShow = () => {
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
          show: "/posts/:id/show",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyShowComponent />} />
          <ReactRouter.Route path=":id/show" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

Redirection endpoint is defined by the `resource`'s `show` action path. By default, `<ShowButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@refinedev/mui";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      resource="categories"
      recordItemId="123"
    />
  );
};

// visible-block-end

const CategoryShow = () => {
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
          show: "/posts/:id/show",
        },
        {
          name: "categories",
          list: "/categories",
          show: "/categories/:id/show",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/categories" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyShowComponent />} />
          <ReactRouter.Route path=":id/show" element={<CategoryShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `show` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `show` action route is defined by the pattern: `/posts/:authorId/show/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <ShowButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to show or hide the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@refinedev/mui";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const PostShow = () => {
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
          show: "/posts/:id/show",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyShowComponent />} />
          <ReactRouter.Route path=":id/show" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { ShowButton } from "@refinedev/mui";

export const MyListComponent = () => {
  return (
    <ShowButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/ShowButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).

:::
