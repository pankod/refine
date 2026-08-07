---
id: boolean
title: Boolean
swizzle: true
---

This field is used to display boolean values. It uses the [`<Tooltip>`](https://ant.design/components/tooltip/#header) values from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx live
// visible-block-start
import {
  List,
  Table,
  useTable,
  // highlight-start
  BooleanField,
  Icons,
  // highlight-end
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  // highlight-next-line
  const { CloseCircleOutlined, CheckCircleOutlined } = Icons;

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="50%" />
        <Table.Column
          dataIndex="status"
          title="Published"
          render={(value) => (
            // highlight-start
            <BooleanField
              value={value === "published"}
              trueIcon={<CheckCircleOutlined />}
              falseIcon={<CloseCircleOutlined />}
              valueLabelTrue="published"
              valueLabelFalse="unpublished"
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

<PropsTable module="@pankod/refine-antd/BooleanField" 
title-description="The text shown in the tooltip" 
title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" 
trueIcon-default="[`<CheckOutlined />`](https://ant.design/components/icon/)"
falseIcon-default="[`<CloseOutlined />`](https://ant.design/components/icon/)"
/>

:::tip External Props
It also accepts all props of Ant Design [Tooltip](https://ant.design/components/tooltip/#API).
:::
