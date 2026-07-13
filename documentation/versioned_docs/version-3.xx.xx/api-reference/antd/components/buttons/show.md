---
id: show-button
title: Show
swizzle: true
---

`<ShowButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood. It can be useful when redirecting the app to the show page with the record id route of resource.

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
  ShowButton,
} from "@pankod/refine-antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="100%" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            // highlight-next-line
            <ShowButton size="small" recordItemId={record.id} />
          )}
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

`recordItemId` is used to append the record id to the end of the route path.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;
// visible-block-start
import { ShowButton } from "@pankod/refine-antd";

const MyShowComponent = () => {
  return (
    <ShowButton
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
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
    ]}
    DashboardPage={MyShowComponent}
  />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/posts/show/1`.

:::note
`<ShowButton>` component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/show`) is defined by `resourceNameOrRouteName` property. By default, `<ShowButton>` uses `name` property of the resource object as an endpoint to redirect after clicking.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@pankod/refine-antd";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      resourceNameOrRouteName="categories"
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
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
      {
        name: "categories",
        list: () => {
          return <RefineAntd.List>List page here...</RefineAntd.List>;
        },
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
    ]}
    DashboardPage={MyShowComponent}
  />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/categories/show/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@pankod/refine-antd";

const MyShowComponent = () => {
  return (
    <ShowButton
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
        list: MyShowComponent,
        show: () => {
          return <RefineAntd.Show>Show page here...</RefineAntd.Show>;
        },
      },
    ]}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { ShowButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
  return (
    <ShowButton
      // highlight-start
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
      // highlight-end
    />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/ShowButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::
