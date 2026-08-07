---
title: "Chakra UI Delete Button | Refine v4 Security"
display_title: "Delete"
sidebar_label: "Delete"
description: "Implement record deletion with confirmation alerts. Guide to using the Chakra UI Delete Button in your Refine v4 CRUD applications."
swizzle: true
---

`<DeleteButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) and [`<Popover>`](https://www.chakra-ui.com/docs/components/popover#usage) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/docs/data/hooks/use-delete) method provided by your [`dataProvider`](/core/docs/data/data-provider).

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

```tsx live previewHeight=360px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  // highlight-next-line
  DeleteButton,
} from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
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
            <DeleteButton recordItemId={getValue() as number} />
            // highlight-end
          );
        },
      },
    ],
    [],
  );

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
  });

  return (
    <List>
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
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
    <RefineChakraDemo
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
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` allows us to manage which record will be deleted. By default, the `recordItemId` is inferred from the route params.

```tsx live previewHeight=160px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resource="posts"
      // highlight-next-line
      recordItemId="123"
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
          <ReactRouter.Route index element={<MyDeleteComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/data/hooks/use-delete) method and then the record whose resource is "posts" and whose id is "123" will be deleted.

### resource

`resource` allows us to manage which resource's record is going to be deleted. By default, the `resource` is inferred from the route params.

```tsx live previewHeight=160px
setInitialRoutes(["/categories"]);

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton resource="categories" recordItemId="123" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
        {
          name: "categories",
          list: "/categories",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/categories"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyDeleteComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/data/hooks/use-delete) method and then the record whose resource is "categories" and whose id is "123" will be deleted.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### onSuccess

`onSuccess` can be used if you want to do something based on the results returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live previewHeight=160px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resource="posts"
      recordItemId="1"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
          <ReactRouter.Route index element={<MyDeleteComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live previewHeight=160px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/chakra-ui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      // highlight-next-line
      hideText={true}
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
          <ReactRouter.Route index element={<MyDeleteComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { DeleteButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
  return (
    <DeleteButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/DeleteButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::
