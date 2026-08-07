---
id: refresh-button
title: Refresh
swizzle: true
---

`<RefreshButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component to update the data shown on the page via the [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) method provided by your [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { Show, Typography, Stack, RefreshButton } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      headerButtons={
        // highlight-start
        <RefreshButton />
        // highlight-end
      }
    >
      <Typography fontWeight="bold">Id</Typography>
      <Typography>{record?.id}</Typography>
      <Typography fontWeight="bold">Title</Typography>
      <Typography>{record?.title}</Typography>
    </Show>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <RefineMui.List>
            <p>Rest of the page here...</p>
          </RefineMui.List>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

## Properties

### `recordItemId`

`recordItemId` allows us to manage which data is going to be refreshed.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { RefreshButton } from "@pankod/refine-mui";

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
  <RefineMuiDemo
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
const { useRouterContext } = RefineCore;
// visible-block-start
import { RefreshButton } from "@pankod/refine-mui";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      recordItemId="1"
      // highlight-next-line
      resourceNameOrRouteName="posts"
    />
  );
};
// visible-block-end

render(
  <RefineMuiDemo
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

Clicking the button will trigger the [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/) method and then fetches the record whose resource is "categories" and whose id is "2".

:::note
`<RefreshButton>` component reads the resource name from the route by default.
:::

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { RefreshButton } from "@pankod/refine-mui";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      // highlight-next-line
      hideText
      resourceNameOrRouteName="posts"
      recordItemId="1"
    />
  );
};
// visible-block-end

render(
  <RefineMuiDemo
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

<PropsTable module="@pankod/refine-mui/RefreshButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).
:::
