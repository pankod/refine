---
id: image
title: Image
swizzle: true
---

This field is used to display images and uses [`<Image>`](https://ant.design/components/image/#header) from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<ImageField>` with the example in the edit page.

```tsx live
// visible-block-start
import {
  List,
  Table,
  useTable,
  // highlight-next-line
  ImageField,
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
            // highlight-start
            <ImageField
              value={record.image[0].url}
              title={record.image[0].name}
              width={200}
            />
            // highlight-end
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
      name: string;
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

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/ImageField" value-description="Image path"/>

:::tip External Props
It also accepts all props of Ant Design [Image](https://ant.design/components/image/#API).
:::
