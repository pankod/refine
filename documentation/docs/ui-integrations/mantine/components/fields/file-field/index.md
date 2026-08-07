---
title: "Mantine File Field Component | UI Component in Refine v5"
display_title: "File"
sidebar_label: "File"
description: "Integrate File Field in Refine v5. Learn best practices. Explore customization options for React UI library, components for polished admin UIs."
swizzle: true
---

This field is used to display files and it uses the [`<Anchor>`](https://mantine.dev/core/anchor) component of Mantine.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<FileField>` with the example in the list page.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, FileField } from "@refinedev/mantine";
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
        id: "image",
        header: "Image",
        accessorKey: "image",
        cell: function render({ getValue }) {
          return (
            // highlight-next-line
            <FileField src={getValue()[0].url} target="_blank" />
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
  image: [{ url: string }];
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

:::simple Implementation Tips

If you don't use `title` prop it will use `src` as `title`

:::

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/FileField" />
