---
title: "MUI Date Field Component | UI Component in Refine v5"
display_title: "Date"
sidebar_label: "Date"
description: "Integrate Date Field in Refine v5. Learn best practices. Learn integration patterns for locales for polished admin UIs. See practical code samples."
swizzle: true
---

This field is used to display dates. It uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

Let's see how we can use `<DateField>` with the example in the post list:

```tsx live url=http://localhost:3000/posts previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "createdAt",
    headerName: "Created At",
    display: "flex",
    renderCell: function render({ row }) {
      // highlight-start
      return <DateField format="LLL" value={row.createdAt} />;
      // highlight-end
    },
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
  createdAt: string;
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

<PropsTable module="@refinedev/mui/DateField" format-default="`L`"/>

:::simple External Props

It also accepts all props of Material UI [Typography](https://mui.com/material-ui/react-typography/#main-content).

:::
