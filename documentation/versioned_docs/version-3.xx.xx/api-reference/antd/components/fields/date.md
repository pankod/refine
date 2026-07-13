---
id: date
title: Date
swizzle: true
---

This field is used to display dates. It uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<DateField>` with the example in the post list.

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
  List,
  Table,
  useTable,
  // highlight-start
  DateField,
  // highlight-end
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="50%" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value) => (
            // highlight-start
            <DateField value={value} />
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
  createdAt: string;
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

<PropsTable module="@pankod/refine-antd/DateField" format-default="`L`"/>

:::tip External Props
It also accepts all props of Ant Design [Text](https://ant.design/components/typography/#Typography.Text).
:::
