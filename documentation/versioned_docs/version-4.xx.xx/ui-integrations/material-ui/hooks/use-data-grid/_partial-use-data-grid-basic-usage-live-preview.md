```tsx live url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { useDataGrid, List } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
}

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 75,
      },
      { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
      {
        field: "status",
        headerName: "Status",
        width: 120,
      },
    ],
    [],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
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
