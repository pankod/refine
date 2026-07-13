---
id: clone-button
title: Clone
swizzle: true
---

`<CloneButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `clone` method from [useNavigation](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood.
It can be useful when redirecting the app to the create page with the record id route of resource.

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
  CloneButton,
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
            <CloneButton size="small" recordItemId={record.id} />
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

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { CloneButton } from "@pankod/refine-antd";

const MyCloneComponent = () => {
  return <CloneButton resourceNameOrRouteName="posts" recordItemId="1" />;
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        create: ClonedPage,
      },
    ]}
    DashboardPage={MyCloneComponent}
  />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/posts/clone/1`.

:::note
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

It is used to redirect the app to the `/clone` endpoint of the given resource name. By default, the app redirects to a URL with `/clone` defined by the name property of the resource object.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@pankod/refine-antd";

const MyCloneComponent = () => {
  return <CloneButton resourceNameOrRouteName="categories" recordItemId="1" />;
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
        create: ClonedPage,
      },
    ]}
    DashboardPage={MyCloneComponent}
  />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/categories/clone/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@pankod/refine-antd";

const MyCloneComponent = () => {
  return (
    <CloneButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyCloneComponent,
        create: ClonedPage,
      },
    ]}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { CloneButton } from "@pankod/refine-antd";

export const MyListComponent = () => {
  return (
    <CloneButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/CloneButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::
