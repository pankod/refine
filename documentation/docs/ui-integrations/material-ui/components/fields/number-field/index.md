---
title: "MUI Number Field Component | UI Component in Refine v5"
display_title: "Number"
sidebar_label: "Number"
description: "Learn to integrate Number Field in Refine v5. Learn integrate options and display for polished admin UIs. Hands-on examples included."
swizzle: true
---

This field is used to display a number formatted according to the browser locale, right aligned. and uses [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to display date format.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

`<NumberField>` uses `Intl.NumberFormat()` if available, passing the locales and options props as arguments. This allows a perfect display of decimals, currencies, percentages, etc.

See [Intl.NumberFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for the options prop syntax.

If Intl is not available, `<NumberField>` outputs numbers as is (and ignores the locales and options props).

```tsx live url=http://localhost:3000/posts previewHeight=340px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  useDataGrid,
  List,
  // highlight-next-line
  NumberField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 100, flex: 1 },
  {
    field: "hit",
    headerName: "Hit",
    display: "flex",
    renderCell: function render({ row }) {
      // highlight-start
      return (
        <NumberField
          value={row.hit}
          options={{
            notation: "compact",
          }}
        />
      );
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
  hit: number;
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

<PropsTable module="@refinedev/mui/NumberField" value-description="Number value" />

:::simple External Props

It also accepts all props of Material UI [Text](https://mui.com/material-ui/react-text-field/).

:::
