```css live shared
body {
  padding: 4px;
  background: white;
}
```

```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, HttpError, useMany } from "@refinedev/core";

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: {
    id: number;
  };
}

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
      },
      {
        id: "createdAt",
        header: "CreatedAt",
        accessorKey: "createdAt",
      },
      // highlight-start
      {
        id: "category",
        header: "Category",
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse<ICategory>;
          };
          // Gets the  category from the meta.categoryData object, which is the result of the useMany hook We pass this data to meta with the setOptions function.
          const category = meta.categoryData?.data?.find(
            (item) => item.id === getValue(),
          );

          return category?.title ?? "Loading...";
        },
      },
      // highlight-end
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel, setOptions },
    refineCore: { result },
  } = useTable<IPost, HttpError>({
    columns,
  });

  // highlight-start
  // Fetches the category of each post. It uses the useMany hook to fetch the category data from the API.
  const { result: categoryData } = useMany<ICategory, HttpError>({
    resource: "categories",
    // Creates the array of ids. This will filter and fetch the category data for the relevant posts.
    ids: result?.data?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      // Set to true only if the posts array is not empty.
      enabled: !!result?.data,
    },
  });
  // highlight-end

  // highlight-start
  // set meta data to table options. We will use this data in cell render.
  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));
  // highlight-end

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```
