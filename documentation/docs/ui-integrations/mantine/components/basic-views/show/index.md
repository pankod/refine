---
title: "Mantine Show Component | UI Component in Refine v5"
display_title: "Show"
sidebar_label: "Show"
description: "Integrate Show in Refine v5. Learn best practices. Learn integration patterns for React UI library, components for polished admin UIs."
swizzle: true
---

`<Show>` provides us a layout for displaying the page. It does not contain any logic and just adds extra functionalities like a refresh button and being able to give titles to the page.

We will show what `<Show>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { useShow } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/mantine";
import { Title, Text } from "@mantine/core";

const PostShow: React.FC = () => {
  const {
    result: post,
    query: { isLoading },
  } = useShow<IPost>();

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="sm">{post?.id}</Text>

      <Title mt="sm" order={5}>
        Title
      </Title>
      <Text mt="sm">{post?.title}</Text>

      <Title mt="sm" order={5}>
        Content
      </Title>
      <MarkdownField value={post?.content} />
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know
You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.
:::

## Properties

### title

`title` allows the addition of titles inside the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it would be "Show post".

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Title } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      title={<Title order={3}>Custom Title</Title>}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

The `<Show>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Show>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom/123 previewHeight=280px
setInitialRoutes(["/custom/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";

const CustomPage: React.FC = () => {
  return (
    // highlight-next-line
    <Show resource="categories">
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "categories",
          list: "/categories",
          show: "/categories/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/custom/:id" element={<CustomPage />} />
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### canDelete and canEdit

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property Refine adds the buttons by default.

When clicked on, delete button executes the `useDelete` method provided by the [`dataProvider`](/core/docs/data/data-provider/) and the edit button redirects the user to the record edit page.

> For more information, refer to the [`<DeleteButton>`](/core/docs/ui-integrations/mantine/components/buttons/delete-button/) and the [`<EditButton>`](/core/docs/ui-integrations/mantine/components/buttons/edit-button/) documentation.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";
import { usePermissions } from "@refinedev/core";

const PostShow: React.FC = () => {
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      // highlight-start
      canDelete={permissionsData?.includes("admin")}
      canEdit={permissionsData?.includes("admin")}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
  );
};

// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
      ]}
      authProvider={{
        getPermissions: async () => ["admin"],
      }}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`usePermission` documentation &#8594](/core/docs/authentication/hooks/use-permissions/)

### deleteButtonProps

If the resource has the `canDelete` property and you want to customize this button, you can use the `deleteButtonProps` property like the code below.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@refinedev/core";
import { ShowButton } from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Show } from "@refinedev/mantine";
import { usePermissions } from "@refinedev/core";
import { Title } from "@mantine/core";

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
      <RefineMantineDemo
        dataProvider={customDataProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            show: "/posts/show/:id",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route
            path="/posts"
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route element={<PostShow />} path="/posts/show/:id" />
        </ReactRouter.Routes>
      </RefineMantineDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### recordItemId

The `<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL, such as when it's used on a custom page, modal or drawer.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=350px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show, useModalForm } from "@refinedev/mantine";
import { Modal, Button } from "@mantine/core";

const PostShow: React.FC = () => {
  const {
    modal: { visible, close, show },
    id,
  } = useModalForm({
    action: "show",
  });

  return (
    <div>
      <Button onClick={() => show()}>Show Button</Button>
      <Modal
        opened={visible}
        onClose={close}
        size={700}
        withCloseButton={false}
      >
        {/* highlight-start */}
        <Show recordItemId={id}>
          {/* highlight-end */}
          <p>Rest of your page here</p>
        </Show>
      </Modal>
    </div>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import { Show } from "@refinedev/mantine";
import dataProvider from "@refinedev/simple-rest";

const PostShow = () => {
  return (
    <Show
      // highlight-next-line
      dataProviderName="other"
    >
      <p>Rest of your page here</p>
    </Show>
  );
};

export const App: React.FC = () => {
  return (
    <Refine
      // highlight-start
      dataProvider={{
        default: dataProvider("https://api.fake-rest.refine.dev/"),
        other: dataProvider("https://other-api.fake-rest.refine.dev/"),
      }}
      // highlight-end
    >
      {/* ... */}
    </Refine>
  );
};
```

### goBack

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      goBack="😊"
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Show/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";

// highlight-start
const PostShow: React.FC = () => {
  return (
    <Show isLoading={true}>
      <p>Rest of your page here</p>
    </Show>
  );
};
// highlight-end
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mantine` package.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";

const CustomBreadcrumb: React.FC = () => {
  return (
    <p
      style={{
        padding: "3px 6px",
        border: "2px dashed cornflowerblue",
      }}
    >
      My Custom Breadcrumb
    </p>
  );
};

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<CustomBreadcrumb />}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/mantine/components/breadcrumb/)

### wrapperProps

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property. For `@refinedev/mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start

      wrapperProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
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
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation from Mantine &#8594](https://mantine.dev/core/card/)

### contentProps

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      contentProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
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
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />

          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/box/)

### headerButtons

By default, the `<Show/>` component has a [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, deleteButtonProps, editButtonProps, listButtonProps, refreshButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
        </>
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
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] components.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import {
  Show,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      headerButtons={({
        deleteButtonProps,
        editButtonProps,
        listButtonProps,
        refreshButtonProps,
      }) => (
        <>
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          {editButtonProps && (
            <EditButton {...editButtonProps} meta={{ foo: "bar" }} />
          )}
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} meta={{ foo: "bar" }} />
          )}
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
        </>
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
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      headerButtonProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
      headerButtons={
        <Button variant="outline" type="primary">
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
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

### footerButtons

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button variant="gradient">Custom Button</Button>
        </>
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
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      footerButtonProps={{
        style: {
          float: "right",
          marginRight: 24,
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
      footerButtons={
        <Button variant="outline" type="primary">
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
    <RefineMantineDemo
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
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/group/)

## API Reference

### Props

<PropsTable module="@refinedev/mantine/Show" title-default="<Title order={3}>Show {resource.name}</Title>"/>

[list-button]: /core/docs/ui-integrations/mantine/components/buttons/list-button
[refresh-button]: /core/docs/ui-integrations/mantine/components/buttons/refresh-button
[edit-button]: /core/docs/ui-integrations/mantine/components/buttons/edit-button
[delete-button]: /core/docs/ui-integrations/mantine/components/buttons/delete-button
