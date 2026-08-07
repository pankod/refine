---
id: refresh-button
title: Refresh
swizzle: true
---

`<RefreshButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component to update the data shown on the page via the [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) method provided by your [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live
// visible-block-start
import { useShow } from "@pankod/refine-core";
import {
  // highlight-next-line
  RefreshButton,
  Show,
  Typography,
} from "@pankod/refine-antd";

const { Title, Text } = Typography;

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      // highlight-next-line
      headerButtons={<RefreshButton />}
    >
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
    </Show>
  );
};

interface IPost {
  id: string;
  title: string;
}
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        show: PostShow,
        list: () => {
          return (
            <RefineAntd.List>
              <p>Your list page here</p>
            </RefineAntd.List>
          );
        },
      },
    ]}
  />,
);
```

## Properties

### `recordItemId`

`recordItemId` allows us to manage which data is going to be refreshed.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { RefreshButton } from "@pankod/refine-antd";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      resourceNameOrRouteName="posts"
      // highlight-next-line
      recordItemId="1"
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
      },
    ]}
    DashboardPage={MyRefreshComponent}
  />,
);
```

Clicking the button will trigger the [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) method and then fetches the record whose resource is "post" and whose id is "1".

:::note
`<RefreshButton>` component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

`resourceNameOrRouteName` allows us to manage which resource is going to be refreshed.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { RefreshButton } from "@pankod/refine-antd";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      // highlight-next-line
      resourceNameOrRouteName="posts"
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
      },
      {
        name: "categories",
      },
    ]}
    DashboardPage={MyRefreshComponent}
  />,
);
```

Clicking the button will trigger the [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) method and then fetches the record whose resource is "categories" and whose id is "2".

:::note
`<RefreshButton>` component reads the resource name from the route by default.
:::

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { RefreshButton } from "@pankod/refine-antd";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      // highlight-next-line
      hideText
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
      },
    ]}
    DashboardPage={MyRefreshComponent}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/RefreshButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::
