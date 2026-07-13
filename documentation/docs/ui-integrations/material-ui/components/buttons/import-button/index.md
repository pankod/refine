---
title: "MUI Import Button Component | Data Tools in Refine v5"
display_title: "Import"
sidebar_label: "Import"
description: "Learn to integrate Import Button in Refine v5. Learn integration patterns for properties and hide for polished admin UIs. Real-world snippets included."
swizzle: true
---

`<ImportButton>` is compatible with the `useImport` hook and is meant to be used as it's upload button. It uses Material UI [`<LoadingButton>`][button] component and native html [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element. It wraps a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) with a [`<LoadingButton>`][button] component and [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element and accepts it's own properties for separately.

> For more information, refer to the [`useImport` documentation &#8594][useimport]

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

Use it like any other Material UI [`<LoadingButton>`][button]. You can use it with [useImport][useimport]:

```tsx live previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  ImportButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  return (
    <List>
      <ImportButton />
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

`hideText` is used to show and hide the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ImportButton } from "@refinedev/mui";

const MyImportComponent = () => {
  return (
    <ImportButton
      // highlight-next-line
      resource="posts"
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
        <ReactRouter.Route path="/posts" element={<ReactRouter.Outlet />}>
          <ReactRouter.Route index element={<MyImportComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/ImportButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button).

:::

[button]: https://mui.com/material-ui/react-button/#loading-2
[useimport]: /core/docs/core/hooks/utilities/use-import
