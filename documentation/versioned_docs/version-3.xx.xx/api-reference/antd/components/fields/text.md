---
id: text
title: Text
swizzle: true
---

This field lets you show basic text. It uses Ant Design's [`<Typography.Text>`](https://ant.design/components/typography/#Typography.Text) component.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how to use it in a basic list page:

```tsx live
// visible-block-start
import { IResourceComponentsProps, useMany } from "@pankod/refine-core";
import {
  List,
  // highlight-next-line
  TextField,
  Table,
  useTable,
} from "@pankod/refine-antd";

const PostList: React.FC<IResourceComponentsProps> = (props) => {
  const { tableProps } = useTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];

  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List {...props}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="title" width="50%" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="category"
          render={(value: number) => {
            // highlight-start
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                strong
                value={
                  categoriesData?.data.find((item) => item.id === value)?.title
                }
              />
            );
            // highlight-end
          }}
          width="50%"
        />
      </Table>
    </List>
  );
};

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  category: { id: number };
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
Table columns already render their data as text by default. If the rendered data is in text form and its text field won't be customized with any of Ant Design `<Typography.Text>` properties, there isn't any need to use `<TextField>` in a column's render function.
:::

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/TextField" />

:::tip External Props
It also accepts all props of Ant Design [Text](https://ant.design/components/typography/#Typography.Text).
:::
