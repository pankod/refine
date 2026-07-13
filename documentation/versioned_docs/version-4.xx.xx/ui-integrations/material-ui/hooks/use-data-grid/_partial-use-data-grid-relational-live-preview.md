```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
// highlight-next-line
import { useSelect } from "@refinedev/core";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { ICategory, IPost } from "interfaces";

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>({
    pagination: {
      current: 2,
      pageSize: 10,
    },
    sorters: {
      initial: [
        {
          field: "title",
          order: "asc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "status",
          operator: "eq",
          value: "draft",
        },
      ],
    },
    syncWithLocation: true,
  });

  // highlight-start
  const {
    options,
    queryResult: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
    hasPagination: false,
  });
  // highlight-end

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
      // highlight-start
      {
        field: "category.id",
        headerName: "Category",
        type: "singleSelect",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
        valueOptions: options,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          const category = options.find(
            (item) => item.value.toString() === row.category.id.toString(),
          );
          return category?.label;
        },
      },
      // highlight-end
      {
        field: "status",
        headerName: "Status",
        minWidth: 120,
        flex: 0.3,
        type: "singleSelect",
        valueOptions: ["draft", "published", "rejected"],
      },
    ],
    [options, isLoading],
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
      />
    </List>
  );
};

// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostsList,
    },
  ],
});

render(<RefineMuiDemo />);
```
