---
id: import-button
title: Import
swizzle: true
---

`<ImportButton>` is compatible with the [`useImport`][useimport] hook and is meant to be used as it's upload button.
It uses Ant Design's [`<Button>`][button] and [`<Upload>`][upload] components. It wraps a [`<Button>`][button] component with an [`<Upload>`][upload] component and accepts properties for [`<Button>`][button] and [`<Upload>`][upload] components separately.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live
import {
  List,
  Table,
  useTable,
  // highlight-start
  useImport,
  ImportButton,
  // highlight-end
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  // highlight-next-line
  const importProps = useImport<IPostFile>();

  return (
    <List
      headerButtons={
        // highlight-next-line
        <ImportButton {...importProps} />
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

interface IPostFile {
  title: string;
  categoryId: number;
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
import { ImportButton, useImport } from "@pankod/refine-antd";

const MyImportComponent = () => {
  const importProps = useImport();

  return (
    <ImportButton
      {...importProps}
      // highlight-next-line
      hideText
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
        list: MyImportComponent,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/ImportButton" />

[useimport]: /core/docs/3.xx.xx/api-reference/antd/hooks/import/useImport
[button]: https://ant.design/components/button/
[upload]: https://ant.design/components/upload/
