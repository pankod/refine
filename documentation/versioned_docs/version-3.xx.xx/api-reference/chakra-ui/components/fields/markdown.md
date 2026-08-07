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
  Layout: RefineChakra.Layout,
  Sider: () => null,
});

const Wrapper = ({ children }) => {
  return (
    <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </RefineChakra.ChakraProvider>
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
import { ShowButton } from "@pankod/refine-chakra-ui";

// visible-block-start
import { useShow } from "@pankod/refine-core";
import {
  Show,
  Heading,
  Text,
  // highlight-next-line
  MarkdownField,
} from "@pankod/refine-chakra-ui";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <Text mt={2}>{record?.id}</Text>
      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      // highlight-next-line
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
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          show: PostShow,
          list: () => (
            <RefineChakra.VStack alignItems="flex-start">
              <RefineChakra.Text>This page is empty.</RefineChakra.Text>
              <ShowButton colorScheme="black" recordItemId="123">
                Show Item 123
              </ShowButton>
            </RefineChakra.VStack>
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

<PropsTable module="@pankod/refine-chakra-ui/MarkdownField" value-description="Markdown data to render"/>
