---
id: list-button
title: List
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  routerProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  notificationProvider: RefineMantine.useNotificationProvider,
  Layout: RefineMantine.Layout,
  Sider: () => null,
  catchAll: <RefineMantine.ErrorComponent />,
});

const Wrapper = ({ children }) => {
  return (
    <RefineMantine.MantineProvider
      theme={RefineMantine.LightTheme}
      withNormalizeCSS
      withGlobalStyles
    >
      <RefineMantine.Global
        styles={{ body: { WebkitFontSmoothing: "auto" } }}
      />
      <RefineMantine.NotificationsProvider position="top-right">
        {children}
      </RefineMantine.NotificationsProvider>
    </RefineMantine.MantineProvider>
  );
};
```

`<ListButton>` is using Mantine [`<Button>`](https://mantine.dev/core/button) component. It uses the `list` method from [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-mantine";

// visible-block-start
import { useShow } from "@pankod/refine-core";
import {
  Show,
  Title,
  Text,
  MarkdownField,
  //highlight-next-line
  ListButton,
} from "@pankod/refine-mantine";

const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    // highlight-next-line
    <Show headerButtons={<ListButton />} isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="sm">{record?.id}</Text>

      <Title mt="sm" order={5}>
        Title
      </Title>
      <Text mt="sm">{record?.title}</Text>

      <Title mt="sm" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

:::note
The button text is defined automatically by **refine** based on _resource_ object name property.
:::

## Properties

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/list`) is defined by `resourceNameOrRouteName` property. By default, `<ListButton>` uses `name` property of the resource object as the endpoint to redirect after clicking.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine, useRouterContext, useNavigation } from "@pankod/refine-core";
import { Button, Code, Space, Text } from "@pankod/refine-mantine";

// visible-block-start
import { ListButton } from "@pankod/refine-mantine";

const MyListComponent = () => {
  return <ListButton resourceNameOrRouteName="categories" />;
};
// visible-block-end

const ListPage = () => {
  const { list } = useNavigation();
  const params = useRouterContext().useParams();

  return (
    <div>
      <Text italic color="dimmed" size="sm">
        URL Parameters:
      </Text>
      <Code>{JSON.stringify(params)}</Code>
      <Space h="md" />
      <Button size="xs" variant="outline" onClick={() => list("posts")}>
        Go back
      </Button>
    </div>
  );
};

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          list: MyListComponent,
        },
        {
          name: "categories",
          list: ListPage,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect to `/categories`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";

// visible-block-start
import { ListButton } from "@pankod/refine-mantine";

const MyListComponent = () => {
  return <ListButton hideText />;
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          list: MyListComponent,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { ListButton } from "@pankod/refine-mantine";

export const MyListComponent = () => {
  return (
    <ListButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/ListButton" />
