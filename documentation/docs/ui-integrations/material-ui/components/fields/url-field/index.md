---
title: "MUI Url Field Component | UI Component in Refine v5"
display_title: "Url"
sidebar_label: "Url"
description: "Explore how to integrate Url Field in Refine v5. Explore customization options for Material Design, components for polished admin UIs."
swizzle: true
---

This field lets you embed a link. It uses Material UI's [`<Typography>`](https://mui.com/material-ui/react-typography/#main-content) and [`Link`](https://mui.com/material-ui/react-link/#main-content) components. You can pass a URL in its `value` prop and you can show a text in its place by passing any `children`.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<UrlField>` with an example:

```tsx live url=http://localhost:3000/posts previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  UrlField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "image",
    headerName: "Image URL",
    display: "flex",
    renderCell: function render({ row }) {
      // highlight-start
      return <UrlField value={row.image[0].url} />;
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
  image: IImage[];
}

interface IImage {
  url: string;
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

<PropsTable module="@refinedev/mui/UrlField" value-description="URL for link to reference to"/>

:::simple External Props

It also accepts all props of Material UI [Link](https://mui.com/material-ui/react-link/#main-content).

:::
