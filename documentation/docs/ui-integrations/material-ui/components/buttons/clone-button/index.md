---
title: "MUI Clone Button Component | CRUD Actions in Refine v5"
display_title: "Clone"
sidebar_label: "Clone"
description: "Learn to integrate Clone Button in Refine v5. Learn integrate Material Design, components for polished admin UIs. Hands-on examples included."
swizzle: true
---

`<CloneButton>` Material UI's [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `clone` method from [useNavigation](/core/docs/routing/hooks/use-navigation/) under the hood.

It can be useful when redirecting the app to the create page with the record id route of resource.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

```tsx live previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  CloneButton,
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
      return <CloneButton size="small" recordItemId={row.id} />;
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

const PostClone = () => {
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
          clone: "/posts/clone/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<PostsList />} />
          <ReactRouter.Route path="clone/:id" element={<PostClone />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path. By default, the `recordItemId` is inferred from the route params.

```tsx live  previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CloneButton } from "@refinedev/mui";

const MyCloneComponent = () => {
  return <CloneButton resource="posts" recordItemId="123" />;
};

// visible-block-end

const PostClone = () => {
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
          clone: "/posts/clone/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyCloneComponent />} />
          <ReactRouter.Route path="clone/:id" element={<PostClone />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

### resource

It is used to redirect the app to the `clone` action of the given resource name. By default, the app redirects to the inferred resource's `clone` action path.

```tsx live previewHeight=120px
setInitialRoutes(["/categories"]);

// visible-block-start
import { CloneButton } from "@refinedev/mui";

const MyCloneComponent = () => {
  return <CloneButton resource="categories" recordItemId="123" />;
};

// visible-block-end

const CategoryClone = () => {
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
          clone: "/posts/clone/:id",
        },
        {
          name: "categories",
          list: "/categories",
          clone: "/categories/clone/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/categories" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyCloneComponent />} />
          <ReactRouter.Route path="clone/:id" element={<CategoryClone />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/). By default, existing parameters in the route are used by the `clone` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `clone` action route is defined by the pattern: `/posts/:authorId/clone/:id`, the `meta` prop can be used as follows:

```tsx
const MyCloneComponent = () => {
  return <CloneButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CloneButton } from "@refinedev/mui";

const MyCloneComponent = () => {
  return <CloneButton resource="posts" hideText={true} />;
};

// visible-block-end

const PostClone = () => {
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
          clone: "/posts/clone/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyCloneComponent />} />
          <ReactRouter.Route path="clone/:id" element={<PostClone />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/)

```tsx
import { CloneButton } from "@refinedev/mui";

export const MyCloneComponent = () => {
  return (
    <CloneButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

<PropsTable module="@refinedev/mui/CloneButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).

:::
