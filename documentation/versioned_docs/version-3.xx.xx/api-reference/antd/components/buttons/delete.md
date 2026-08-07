---
id: delete-button
title: Delete
swizzle: true
---

`<DeleteButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) and [`<Popconfirm>`](https://ant.design/components/popconfirm/) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method provided by your [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live
// visible-block-start
import {
  Table,
  List,
  useTable,
  // highlight-next-line
  DeleteButton,
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="50%" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            // highlight-next-line
            <DeleteButton size="small" recordItemId={record.id} />
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

### `recordItemId`

`recordItemId` allows us to manage which record will be deleted.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;
// visible-block-start
import { DeleteButton } from "@pankod/refine-antd";

const MyEditComponent = () => {
  return (
    <DeleteButton
      resourceNameOrRouteName="posts"
      // highlight-next-line
      recordItemId="123"
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
        list: () => {
          return <RefineAntd.List>List page here...</RefineAntd.List>;
        },
      },
    ]}
    DashboardPage={MyEditComponent}
  />,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method and then the record whose resource is "post" and whose id is "1" gets deleted.

:::note
**`<DeleteButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

`resourceNameOrRouteName` allows us to manage which resource's record is going to be deleted.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { DeleteButton } from "@pankod/refine-antd";

const MyDeleteComponent = () => {
  return (
    <DeleteButton resourceNameOrRouteName="categories" recordItemId="123" />
  );
};

// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: () => {
          return <RefineAntd.List>List page here...</RefineAntd.List>;
        },
      },
      {
        name: "categories",
        list: () => {
          return <RefineAntd.List>List page here...</RefineAntd.List>;
        },
      },
    ]}
    DashboardPage={MyDeleteComponent}
  />,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method and then the record whose resource is "categories" and whose id is "2" gets deleted.

:::note
**`<DeleteButton>`** component reads the resource name from the route by default.
:::

### `onSuccess`

`onSuccess` can be used if you want to do anything on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live url=http://localhost:3000 previewHeight=150px disableScroll
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-antd";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resourceNameOrRouteName="posts"
      recordItemId="1"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        message: "You have successfully deleted the record",
      };
    },
  };

  return (
    <RefineAntdDemo
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
      ]}
    />
  );
};

render(<App />);
```

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>`.

[Refer to the mutation mode docs for further information. &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)

```tsx
import { List, Table, DeleteButton, useTable } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <DeleteButton
              size="small"
              recordItemId={record.id}
              // highlight-next-line
              mutationMode="undoable"
            />
          )}
        />
      </Table>
    </List>
  );
};
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { DeleteButton } from "@pankod/refine-antd";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      recordItemId="123"
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
        list: MyDeleteComponent,
      },
    ]}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { DeleteButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
  return (
    <DeleteButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## How to override confirm texts?

You can change the text that appears when you confirm a transaction with `confirmTitle` prop, as well as what ok and cancel buttons text look like with `confirmOkText` and `confirmCancelText` props.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { DeleteButton } from "@pankod/refine-antd";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      recordItemId="123"
      // highlight-start
      confirmTitle="Title"
      confirmOkText="Ok Text"
      confirmCancelText="Delete Text"
      // highlight-end
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
        list: MyDeleteComponent,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/DeleteButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::
