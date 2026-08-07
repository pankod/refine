---
title: "Chakra UI Show View | Refine v4 Detail Pages"
display_title: "Show"
sidebar_label: "Show"
description: "Display resource details using Chakra UI. Learn how to build professional 'Show' pages with Refine v4's layout components and typography."
swizzle: true
---

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Show>` does using properties with examples.

```tsx live previewHeight=420px hideCode url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/chakra-ui";
import { Heading, Text } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record?.category?.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <Text mt={2}>{record?.id}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Title
      </Heading>
      <Text mt={2}>{record?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Category
      </Heading>
      <Text mt={2}>{categoryData?.data?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### title

`title` allows you to add a title inside the `<Show>` component. If you don't pass title props, it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show title={<Heading size="lg">Custom Title</Heading>}>
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

The `<Show>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Show>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom/123
setInitialRoutes(["/custom/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show resource="posts" recordItemId={123}>
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
        {
          name: "custom",
          list: "/custom",
          show: "/custom/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/custom/:id" element={<CustomPage />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### recordItemId

The `<Show>` component reads the `id` information from the route by default. If you want to use a custom `id` value, you can use the `recordItemId` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show recordItemId="123">
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`usePermission` documentation &#8594](/core/docs/authentication/hooks/use-permissions)

### deleteButtonProps

If the resource has the `canDelete` property and you want to customize this button, you can use the `deleteButtonProps` property like the code below.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { usePermissions } from "@refinedev/core";

const PostShow: React.FC = () => {
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ size: "small" }}
      canEdit={permissionsData?.includes("admin")}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
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
      return {
        data: {},
      };
    },
  };

  const authProvider = {
    login: async () => {
      return {
        success: true,
        redirectTo: "/",
      };
    },
    register: async () => {
      return {
        success: true,
      };
    },
    forgotPassword: async () => {
      return {
        success: true,
      };
    },
    updatePassword: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      return {
        success: true,
        redirectTo: "/",
      };
    },
    check: async () => ({
      authenticated: true,
    }),
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    getPermissions: async () => ["admin"],
    getIdentity: async () => null,
  };

  return (
    <ReactRouter.BrowserRouter>
      <RefineHeadlessDemo
        notificationProvider={RefineChakra.notificationProvider()}
        resources={[
          {
            name: "posts",
            show: "/posts/show/:id",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
          <ReactRouter.Route path="/posts" element={<DummyListPage />} />
        </ReactRouter.Routes>
      </RefineHeadlessDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

`canEdit` allows you to add an edit button inside the `<Show>` component. If the resource has the `canEdit` property, Refine adds the edit button by default. If you want to customize this button you can use the `editButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { usePermissions } from "@refinedev/core";

const PostShow: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Show
      /* highlight-start */
      canEdit={permissionsData?.includes("admin")}
      editButtonProps={{ colorScheme: "red" }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
          edit: "/posts/edit/:id",
        },
      ]}
      options={{
        auth: {
          getPermissions: () => Promise.resolve(["admin"]),
        },
      }}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### canDelete and deleteButtonProps

`canDelete` allows you to add a delete button inside the `<Show>` component. If the resource has the `canDelete` property, Refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { usePermissions } from "@refinedev/core";

const PostShow: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ colorScheme: "red" }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
      options={{
        auth: {
          getPermissions: () => Promise.resolve(["admin"]),
        },
      }}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### goBack

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { IconMoodSmile } from "@tabler/icons-react";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show goBack={<IconMoodSmile />}>
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Show/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show isLoading={true}>
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/chakra-ui` package.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show, Breadcrumb } from "@refinedev/chakra-ui";
import { Box } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      breadcrumb={
        <Box borderColor="blue" borderStyle="dashed" borderWidth="2px">
          <Breadcrumb />
        </Box>
      }
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerProps

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      headerProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtons

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, editButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <HStack>
          {defaultButtons}
          <Button colorScheme="red">Custom Button</Button>
        </HStack>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      headerButtonProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
      }}
      // highlight-end
      headerButtons={
        <Button colorScheme="green" variant="outline">
          Custom Button
        </Button>
      }
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtons

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <HStack borderColor="blue" borderStyle="dashed" borderWidth="2px" p="2">
          {defaultButtons}
          <Button colorScheme="red" variant="solid">
            Custom Button
          </Button>
        </HStack>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      footerButtonProps={{
        style: {
          float: "right",
          borderColor: "blue",
          borderStyle: "dashed",
          borderWidth: "2px",
          padding: "8px",
        },
      }}
      // highlight-end
      footerButtons={<Button colorScheme="green">Custom Button</Button>}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.ShowButton recordItemId="123">
                Show Post 123
              </RefineChakra.ShowButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/Show" />

[list-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/list-button
[refresh-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/refresh-button
[edit-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/edit-button
[delete-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/delete-button
