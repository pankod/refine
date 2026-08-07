---
title: "MUI Export Button Component | Data Tools in Refine v5"
display_title: "Export"
sidebar_label: "Export"
description: "Set up Export Button in Refine v5. Learn best practices. Learn integrate hide and properties for polished admin UIs. See practical code samples."
swizzle: true
---

`<ExportButton>` is a Material UI [`<LoadingButton>`][button] with a default export icon and a default text with "Export". It only has presentational value.

> For more information, refer to the [useExport documentation &#8594][useexport]

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

Use it like any other Ant Design [`<Button>`][button]. You can use it with [useExport][useexport]:

```tsx live previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import { useExport } from "@refinedev/core";
import {
  useDataGrid,
  List,
  // highlight-next-line
  ExportButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();
  const { triggerExport, isLoading: exportLoading } = useExport<IPost>();
  return (
    <List
      // highlight-start
      headerButtons={
        <ExportButton onClick={triggerExport} loading={exportLoading} />
      }
      // highlight-end
    >
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
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
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<PostsList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### hideText

`hideText` is used to show or hide text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/"]);

// visible-block-start
import { ExportButton } from "@refinedev/mui";

const MyExportComponent = () => {
  return (
    <ExportButton
      // highlight-next-line
      hideText={true}
    />
  );
};

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
        <ReactRouter.Route index element={<MyExportComponent />} />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/ExportButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button).

:::

[button]: https://mui.com/material-ui/react-button/#loading-2
[useexport]: /core/docs/core/hooks/utilities/use-export
