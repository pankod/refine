---
title: "MUI BooleanField | Refine v4 Data Display"
display_title: "Boolean"
sidebar_label: "Boolean"
description: "Display boolean values using Material UI icons and badges. Documentation on implementing the BooleanField for clear data representation in Refine v4."
swizzle: true
---

This field is used to display boolean values. It uses the [`<Tooltip>`](https://mui.com/material-ui/react-tooltip/#main-content) values from Material UI.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list:

```tsx live url=http://localhost:3000/posts previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  BooleanField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Close, Check } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "status",
    headerName: "Published",
    display: "flex",
    renderCell: function render({ row }) {
      // highlight-start
      return (
        <BooleanField
          value={row.status === "published"}
          trueIcon={<Check />}
          falseIcon={<Close />}
          valueLabelTrue="published"
          valueLabelFalse="unpublished"
        />
      );
      // highlight-end
    },
    align: "center",
    headerAlign: "center",
    minWidth: 100,
    flex: 1,
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
  status: "published" | "draft" | "rejected";
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
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
          <ReactRouter.Route index element={<PostsList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/BooleanField" 
title-description="The text shown in the tooltip" 
title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" 
trueIcon-default="[`<CheckOutlined />`](https://mui.com/material-ui/material-icons/)"
falseIcon-default="[`<CloseOutlined />`](https://mui.com/material-ui/material-icons/)"
/>

:::simple External Props

It also accepts all props of Material UI [Tooltip](https://mui.com/material-ui/react-tooltip/#main-content).

:::
