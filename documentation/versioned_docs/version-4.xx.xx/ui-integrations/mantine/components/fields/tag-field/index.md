---
title: "Mantine TagField | Refine v4 Status Badges"
display_title: "Tag"
sidebar_label: "Tag"
description: "Learn how to display tags and categories with Mantine. Documentation on the TagField component for status and label visualization in v4."
swizzle: true
---

This field lets you display a value in a tag. It uses Mantine [`<Chip>`](https://mantine.dev/core/chip) component.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use it in a basic list page:

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, TagField } from "@refinedev/mantine";
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
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: function render({ getValue }) {
          return (
            // highlight-next-line
            <TagField value={getValue()} />
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
  status: "published" | "draft" | "rejected";
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

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/TagField" value-description="Tag content" />

:::simple External Props

It also accepts all props of Mantine [Chip](https://mantine.dev/core/chip?t=props).

:::
