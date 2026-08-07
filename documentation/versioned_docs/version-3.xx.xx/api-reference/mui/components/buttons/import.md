---
id: import-button
title: Import
swizzle: true
---

`<ImportButton>` is compatible with the `useImport` hook and is meant to be used as it's upload button. It uses Material UI [`<LoadingButton>`][button] component and native html [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element. It wraps a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) with a [`<LoadingButton>`][button] component and [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element and accepts it's own properties for separately.

[Refer to the for more detailed information about `useImport`. &#8594][useimport]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Use it like any other Material UI [`<LoadingButton>`][button]. You can use it with [useImport][useimport]:

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import { useImport } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  ImportButton,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  const { inputProps, isLoading } = useImport<IPost>();

  return (
    <List
      // highlight-start
      headerButtons={
        <ImportButton inputProps={inputProps} loading={isLoading} />
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
import { ImportButton } from "@pankod/refine-mui";

const MyImportComponent = () => {
  return (
    <ImportButton
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
        list: MyImportComponent,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/ImportButton" />

:::tip External Props
It also accepts all props of Material UI [LoadingButton](https://mui.com/material-ui/api/loading-button/#main-content).
:::

[button]: https://mui.com/material-ui/api/loading-button/#main-content
[useimport]: /core/docs/3.xx.xx/api-reference/core/hooks/import-export/useImport
