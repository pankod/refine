---
id: export-button
title: Export
swizzle: true
---

`<ExportButton>` is an Ant Design [`<Button>`][button] with a default export icon and a default text with "Export". It only has presentational value.

[Refer to the for more detailed information about `useExport`. &#8594][useexport]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Use it like any other Ant Design [`<Button>`][button]. You can use it with [useExport][useexport]:

```tsx live
// visible-block-start
import { useExport } from "@pankod/refine-core";
import {
  List,
  Table,
  useTable,
  // highlight-next-line
  ExportButton,
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  const { triggerExport, isLoading: exportLoading } = useExport<IPost>();

  return (
    <List
      headerButtons={
        // highlight-start
        <ExportButton onClick={triggerExport} loading={exportLoading} />
        // highlight-end
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <RefineAntdDemo
    resources={[
      {
        name: "posts",
        list: PostList,
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
import { ExportButton } from "@pankod/refine-antd";

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
  <RefineAntdDemo
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

<PropsTable module="@pankod/refine-antd/ExportButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::

[button]: https://ant.design/components/button/
[useexport]: /core/docs/3.xx.xx/api-reference/core/hooks/import-export/useExport
