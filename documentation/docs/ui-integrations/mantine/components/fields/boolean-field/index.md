---
title: "Mantine Boolean Field Component | UI Component in Refine v5"
display_title: "Boolean"
sidebar_label: "Boolean"
description: "Learn to integrate Boolean Field in Refine v5. Learn integrate React UI library, components for polished admin UIs. Explore with code snippets."
swizzle: true
---

This field is used to display boolean values. It uses the [`<Tooltip>`](https://mantine.dev/core/tooltip) values from Mantine.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, BooleanField } from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { IconX, IconCheck } from "@tabler/icons-react";

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
            // highlight-start
            <BooleanField
              value={getValue() === "published"}
              trueIcon={<IconCheck />}
              falseIcon={<IconX />}
              valueLabelTrue="published"
              valueLabelFalse="unpublished"
            />
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

<PropsTable module="@refinedev/mantine/BooleanField" title-description="The text shown in the tooltip" title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" trueIcon-default="[`<IconCheck />`](https://tabler-icons.io/i/check)" falseIcon-default="[`<IconX />`](https://tabler-icons.io/i/x)" />

:::simple External Props

It also accepts all props of Mantine [Tooltip](https://mantine.dev/core/tooltip?t=props).

:::
