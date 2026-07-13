---
id: file
title: File
swizzle: true
---

This field is used to display files and uses [`<Typography.Link>`](https://ant.design/components/typography) from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<FileField>` with the example in the edit page.

```tsx live
// visible-block-start
import {
  List,
  Table,
  useTable,
  // highlight-next-line
  FileField,
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="50%" />
        <Table.Column<IPost>
          title="Image"
          dataIndex="image"
          render={(_, record) => (
            // highlight-next-line
            <FileField src={record.image[0].url} />
          )}
          width="50%"
        />
      </Table>
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

:::tip
If you don't use `title` prop it will use `src` as `title`
:::

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/FileField" />

:::tip External Props
It also accepts all props of Ant Design [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router).
:::
