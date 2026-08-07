---
id: tag
title: Tag
swizzle: true
---

This field lets you display a value in a tag. It uses Ant Design's [`<Tag>`](https://ant.design/components/tag/) component.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use it in a basic list page:

```tsx live
// visible-block-start
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  List,
  // highlight-next-line
  TagField,
  Table,
  useTable,
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Sitle" width="50%" />
        <Table.Column
          dataIndex="status"
          title="Status"
          // highlight-next-line
          render={(value: string) => <TagField value={value} />}
          width="50%"
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
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

<PropsTable module="@pankod/refine-antd/TagField" value-description="Tag content" />

:::tip External Props
It also accepts all props of Ant Design [Tag](https://ant.design/components/tag/#API).
:::
