---
id: email
title: Email
swizzle: true
---

This field is used to display email values. It uses the [`<Link>`](https://ant.design/components/typography/#FAQ) component of [`<Typography>`](https://ant.design/components/typography) from Ant Design.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<EmailField>` with the example in the user list.

```tsx live
// visible-block-start
import {
  List,
  Table,
  useTable,
  // highlight-next-line
  EmailField,
} from "@pankod/refine-antd";

const UserList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column
          dataIndex="email"
          title="Email"
          // highlight-next-line
          render={(value: string) => <EmailField value={value} />}
          width="100%"
        />
        ...
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  email: string;
}
// visible-block-end

render(
  <RefineAntdDemo
    resources={[
      {
        name: "users",
        list: UserList,
      },
    ]}
  />,
);
```

:::tip
`<EmailField>` uses "mailto:" in the href prop of the `<Link>` component. For this reason, clicking `<EmailField>` opens your device's default mail application.
:::

## API Reference

<PropsTable module="@pankod/refine-antd/EmailField" />

:::tip External Props
It also accepts all props of Ant Design [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router).
:::

[Refer to the documentation for the rest of Link properties. &#8594](https://ant.design/components/typography/#API)
