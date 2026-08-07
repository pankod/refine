---
title: "Ant Design Email Field Component | UI Component in Refine v5"
display_title: "Email"
sidebar_label: "Email"
description: "Build Email Field in Refine v5. Learn the key steps. Explore customization options for enterprise UI, components for polished admin UIs."
swizzle: true
---

This field is used to display email values. It uses the [`<Link>`](https://ant.design/components/typography/#FAQ) component of [`<Typography>`](https://ant.design/components/typography) from Ant Design.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<EmailField>` with the example in the user list:

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/users"]);

// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  EmailField,
} from "@refinedev/antd";
import { Table } from "antd";

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
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "users",
          list: "/users",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/users"
          element={
            <div style={{ padding: 16 }}>
              <UserList />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Implementation Tips

`<EmailField>` uses "mailto:" in the href prop of the `<Link>` component. For this reason, clicking `<EmailField>` opens your device's default mail application.

:::

## API Reference

<PropsTable module="@refinedev/antd/EmailField" />

:::simple External Props

This field also accepts all props of Ant Design's [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router) component.

:::

> For more information, refer to the [documentation for the rest of Link properties &#8594](https://ant.design/components/typography/#API)
