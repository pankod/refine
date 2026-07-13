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
  Layout: RefineChakra.Layout,
  Sider: () => null,
  catchAll: <RefineChakra.ErrorComponent />,
});

const Wrapper = ({ children }) => {
  return (
    <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </RefineChakra.ChakraProvider>
  );
};
```

`<ListButton>` is using Chakra UI's [`<Button>`](https://chakra-ui.com/docs/components/button/usage) component. It uses the `list` method from [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

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
  Spacer,
  MarkdownField,
  //highlight-next-line
  ListButton,
} from "@pankod/refine-chakra-ui";

const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    // highlight-next-line
    <Show headerButtons={<ListButton />} isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <Text mt={2}>{record?.id}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Title
      </Heading>
      <Text mt={2}>{record?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      <Spacer mt={2} />
      <MarkdownField value={record?.content} />
    </Show>
  );
};
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

:::note
The button text is defined automatically by **refine** based on _resource_ object name property.
:::

## Properties

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/list`) is defined by `resourceNameOrRouteName` property. By default, `<ListButton>` uses `name` property of the resource object as the endpoint to redirect after clicking.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";

// visible-block-start
import { ListButton } from "@pankod/refine-chakra-ui";

const MyListComponent = () => {
  return (
    <ListButton colorScheme="black" resourceNameOrRouteName="categories" />
  );
};
// visible-block-end

const ListPage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useRouterContext().useParams();

  return (
    <RefineChakra.VStack alignItems="flex-start">
      <RefineChakra.Text as="i" color="gray.700" fontSize="sm">
        URL Parameters:
      </RefineChakra.Text>
      <RefineChakra.Code>{JSON.stringify(params)}</RefineChakra.Code>

      <RefineChakra.Button
        size="sm"
        onClick={() => list("posts")}
        colorScheme="green"
      >
        Go back
      </RefineChakra.Button>
    </RefineChakra.VStack>
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
import { ListButton } from "@pankod/refine-chakra-ui";

const MyListComponent = () => {
  return <ListButton colorScheme="black" hideText />;
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
import { ListButton } from "@pankod/refine-chakra-ui";

export const MyListComponent = () => {
  return (
    <ListButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-chakra-ui/ListButton" />
