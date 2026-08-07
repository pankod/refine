---
id: list-button
title: List
swizzle: true
---

`<ListButton>` is using Material UI [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { ListButton, Show, Typography, Stack } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      headerButtons={
        // highlight-start
        <ListButton />
        // highlight-end
      }
    >
      <Stack gap="10px">
        <Typography fontWeight="bold">Id</Typography>
        <Typography>{record?.id}</Typography>
        <Typography fontWeight="bold">Title</Typography>
        <Typography>{record?.title}</Typography>
      </Stack>
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

:::note
The button text is defined automatically by **refine** based on _resource_ object name property.
:::

## Properties

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/list`) is defined by `resourceNameOrRouteName` property. By default, `<ListButton>` uses `name` property of the resource object as the endpoint to redirect after clicking.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ListButton } from "@pankod/refine-mui";

const MyListComponent = () => {
  return <ListButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
        list: () => (
          <RefineMui.List>
            <p>Rest of the page here...</p>
          </RefineMui.List>
        ),
      },
    ]}
    DashboardPage={MyListComponent}
  />,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect to `/categories`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ListButton } from "@pankod/refine-mui";

const MyListComponent = () => {
  return (
    <ListButton
      resourceNameOrRouteName="posts"
      // highlight-next-line
      hideText
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
        list: () => (
          <RefineMui.List>
            <p>Rest of the page here...</p>
          </RefineMui.List>
        ),
      },
    ]}
    DashboardPage={MyListComponent}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { ListButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
  return (
    <ListButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/ListButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).
:::
