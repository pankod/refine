---
title: "Mantine Clone Button Component | CRUD Actions in Refine v5"
display_title: "Clone"
sidebar_label: "Clone"
description: "Secure Clone Button in Refine v5. Learn best practices. Learn integration patterns for React UI library, components for polished admin UIs."
swizzle: true
---

```tsx live shared
const ClonePage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useParsed();

  return (
    <div>
      <MantineCore.Text italic color="dimmed" size="sm">
        URL Parameters:
      </MantineCore.Text>
      <MantineCore.Code>{JSON.stringify(params, null, 2)}</MantineCore.Code>
      <MantineCore.Space h="md" />
      <MantineCore.Button
        size="xs"
        variant="outline"
        onClick={() => list("posts")}
      >
        Go back
      </MantineCore.Button>
    </div>
  );
};
```

`<CloneButton>` uses Mantine's [`<Button>`](https://mantine.dev/core/button) component. It uses the `clone` method from [useNavigation](/core/docs/routing/hooks/use-navigation/) under the hood.
It can be useful when redirecting the app to the create page with the record id route of resource.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, CloneButton } from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";

const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            // highlight-start
            <CloneButton size="xs" recordItemId={getValue() as number} />
            // highlight-end
          );
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel },
    refineCore: { setCurrentPage, pageCount, currentPage },
  } = useTable({
    columns,
  });

  //hide-start
  List.defaultProps = {
    headerButtons: <></>,
  };
  //hide-end

  return (
    <List>
      <Table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={currentPage}
        onChange={setCurrentPage}
      />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          clone: "/posts/clone/:id",
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
          <ReactRouter.Route path="clone/:id" element={<ClonePage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path. By default `id` will be read from the route parameters.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CloneButton } from "@refinedev/mantine";

const MyCloneComponent = () => {
  return <CloneButton recordItemId="123" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          clone: "/posts/clone/:id",
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
          <ReactRouter.Route index element={<MyCloneComponent />} />
          <ReactRouter.Route path="clone/:id" element={<ClonePage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

### resource

It is used to redirect the app to the `clone` action of the given resource name. By default, the app redirects to the inferred resource's `clone` action path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CloneButton } from "@refinedev/mantine";

const MyCloneComponent = () => {
  return <CloneButton resource="categories" recordItemId="2" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyCloneComponent />} />
        </ReactRouter.Route>
        <ReactRouter.Route
          path="/categories/clone/:id"
          element={<ClonePage />}
        />
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

### meta

It is used to pass additional parameters to the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/). By default, existing parameters in the route are used by the `clone` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `clone` action route is defined by the pattern: `/posts/:authorId/clone/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <CloneButton meta={{ authorId: "10" }} />;
};
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

// visible-block-start
import { CloneButton } from "@refinedev/mantine";

const MyCloneComponent = () => {
  return <CloneButton hideText />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          clone: "/posts/clone/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyCloneComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/)

```tsx
import { CloneButton } from "@refinedev/mantine";

export const MyListComponent = () => {
  return (
    <CloneButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/CloneButton" />
