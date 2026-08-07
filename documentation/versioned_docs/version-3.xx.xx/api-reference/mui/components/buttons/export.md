---
id: export-button
title: Export
swizzle: true
---

`<ExportButton>` is a Material UI [`<LoadingButton>`][button] with a default export icon and a default text with "Export". It only has presentational value.

[Refer to the for more detailed information about `useExport`. &#8594][useexport]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Use it like any other Ant Design [`<Button>`][button]. You can use it with [useExport][useexport]:

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import { useExport } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  ExportButton,
} from "@pankod/refine-mui";

const columns: GridColumns = [
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
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <RefineMuiDemo
    resources={[
      {
        name: "posts",
        list: PostsList,
      },
    ]}
  />,
);
```

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ExportButton } from "@pankod/refine-mui";

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
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyExportComponent,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/ExportButton" />

:::tip External Props
It also accepts all props of Material UI [LoadingButton](https://mui.com/material-ui/api/loading-button/#main-content).
:::

[button]: https://mui.com/material-ui/api/loading-button/#main-content
[useexport]: /core/docs/3.xx.xx/api-reference/core/hooks/import-export/useExport
