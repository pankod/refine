---
title: "MUI File Field Component | UI Component in Refine v5"
display_title: "File"
sidebar_label: "File"
description: "Explore how to integrate File Field in Refine v5. Explore customization options for Material Design, components for polished admin UIs."
swizzle: true
---

This field is used to display files and it uses the [`<Link>`](https://mui.com/material-ui/react-link/#main-content) component of [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) from Material UI.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

Let's see how we can use `<FileField>` with the example in the edit page:

```tsx live url=http://localhost:3000/posts previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  FileField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "image",
    headerName: "Image",
    display: "flex",
    renderCell: function render({ row }) {
      // highlight-start
      return (
        <FileField src={row.image[0].url} target="_blank" rel="noopener" />
      );
      // highlight-end
    },
    minWidth: 100,
    flex: 2,
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
  image: [
    {
      url: string;
    },
  ];
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

:::simple Implementation Tips

If you don't use `title` prop it will use `src` as `title`

:::

## API Reference

### Properties

<PropsTable module="@refinedev/mui/FileField"/>

:::simple External Props

It also accepts all props of Material UI [Link](https://mui.com/material-ui/react-link/#main-content).

:::
