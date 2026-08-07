---
id: markdown
title: Markdown
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

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-mantine";

// visible-block-start
import { useShow } from "@pankod/refine-core";
import { Show, Title, Text, MarkdownField } from "@pankod/refine-mantine";

const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="sm">{record?.id}</Text>
      <Title mt="sm" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};

interface IPost {
  id: number;
  content: string;
}
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

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/MarkdownField" value-description="Markdown data to render"/>
