---
title: "Mantine Delete Button | Refine v4 Security"
display_title: "Delete"
sidebar_label: "Delete"
description: "Implement safe record deletion with Mantine Modal confirmations. Guide to using the Delete Button in your Refine v4 CRUD applications."
swizzle: true
---

```tsx live shared
const DeletePage = () => {
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

`<DeleteButton>` uses Mantine's [`<Button>`](https://mantine.dev/core/button) and [`<Popconfirm>`](https://mantine.dev/core/popover/) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/docs/data/hooks/use-delete) method provided by your [`dataProvider`](/core/docs/data/data-provider).

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, DeleteButton } from "@refinedev/mantine";
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
            <DeleteButton size="xs" recordItemId={getValue() as number} />
            // highlight-end
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

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
        page={current}
        onChange={setCurrent}
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` allows us to manage which record will be deleted. By default, `recordItemId` is read from the route parameters.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/mantine";

const MyDeleteComponent = () => {
  return <DeleteButton recordItemId="123" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      dataProvider={RefineSimpleRest.default(
        "https://api.fake-rest.refine.dev",
        {
          custom: {
            deleteOne: async ({ resource, id, variables }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return { data: {} };
            },
          },
        },
      )}
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/data/hooks/use-delete) method and then the record whose resource is "post" and whose id is "123" gets deleted.

### resource

`resource` allows us to manage which resource's record is going to be deleted. By default, `resource` is read from the current route.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/mantine";

const MyDeleteComponent = () => {
  return <DeleteButton resource="categories" recordItemId="123" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      dataProvider={RefineSimpleRest.default(
        "https://api.fake-rest.refine.dev",
        {
          custom: {
            deleteOne: async ({ resource, id, variables }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return { data: {} };
            },
          },
        },
      )}
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/data/hooks/use-delete) method and then the record whose resource is "categories" and whose id is "123" gets deleted.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### onSuccess

`onSuccess` can be used if you want to do anything based on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/mantine";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      recordItemId="123"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      dataProvider={RefineSimpleRest.default(
        "https://api.fake-rest.refine.dev",
        {
          custom: {
            deleteOne: async ({ resource, id, variables }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return { data: {} };
            },
          },
        },
      )}
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/mantine";

const MyDeleteComponent = () => {
  return <DeleteButton hideText recordItemId="1" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      dataProvider={RefineSimpleRest.default(
        "https://api.fake-rest.refine.dev",
        {
          custom: {
            deleteOne: async ({ resource, id, variables }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return { data: {} };
            },
          },
        },
      )}
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/DeleteButton" />
