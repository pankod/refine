---
title: "MUI Show Component | UI Component in Refine v5"
display_title: "Show"
sidebar_label: "Show"
description: "Secure Show in Refine v5. Learn best practices. Explore customization options for hide for polished admin UIs. Real-world snippets included."
swizzle: true
---

`<Show>` provides us a layout for displaying the page. It does not contain any logic and just adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import React from "react";
import { useShow, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";

const ShowPage = () => {
  const {
    result: product,
    query: { isLoading },
  } = useShow();

  const {
    result: category,
    query: { isLoading: categoryIsLoading },
  } = useOne({
    resource: "categories",
    id: product?.category?.id || "",
    queryOptions: {
      enabled: !!product,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={product?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={product?.title} />
        <Typography variant="body1" fontWeight="bold">
          Content
        </Typography>
        <MarkdownField value={product?.content} />
        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        {categoryIsLoading ? <>Loading...</> : <>{category?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={product?.createdAt} />
      </Stack>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
          edit: "/posts/edit/:id",
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
          <ReactRouter.Route index element={<SampleList />} />
        </ReactRouter.Route>
        <ReactRouter.Route
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<SampleShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Properties

### title

`title` allows the addition of titles inside the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it would be "Show post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";
import { Typography } from "@mui/material";

const ShowPage: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      title={<Typography variant="h5">Custom Title</Typography>}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
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
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<ShowPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

The `<Show>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Show>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
setInitialRoutes(["/custom"]);

// visible-block-start
import { Show } from "@refinedev/mui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show resource="posts" recordItemId={123}>
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
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
          path="/custom"
          element={
            <div style={{ padding: 16 }}>
              <CustomPage />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### canDelete and canEdit

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property Refine adds the buttons by default.

When clicked on, delete button executes the [`useDelete`](/core/docs/data/hooks/use-delete/) method provided by the [`dataProvider`](/core/docs/data/data-provider/) and the edit button redirects the user to the record edit page.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...dataProvider,
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

// visible-block-start
import { Show } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";

const ShowPage: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      canEdit={
        permissionsData?.includes("editor") ||
        permissionsData?.includes("admin")
      }
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      authProvider={authProvider}
      dataProvider={customDataProvider}
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
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<DeleteButton>` &#8594](/core/docs/ui-integrations/material-ui/components/buttons/delete-button/), [`<EditButton>` &#8594](/core/docs/ui-integrations/material-ui/components/buttons/edit-button/) and [`usePermission` &#8594](/core/docs/authentication/hooks/use-permissions/) documentations.

### deleteButtonProps

If the resource has the `canDelete` property and you want to customize this button, you can use the `deleteButtonProps` property like the code below.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...dataProvider,
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

// visible-block-start
import { Show } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";

const ShowPage: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ size: "small" }}
      canEdit={
        permissionsData?.includes("editor") ||
        permissionsData?.includes("admin")
      }
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      authProvider={authProvider}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          show: "/posts/show/:id",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route element={<ShowPage />} path="/posts/show/123" />
        <ReactRouter.Route element={<SampleList />} path="/posts" />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### recordItemId

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
setInitialRoutes(["/custom"]);

// visible-block-start
import { Show } from "@refinedev/mui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show resource="posts" recordItemId={123}>
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
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
          path="/custom"
          element={
            <div style={{ padding: 16 }}>
              <CustomPage />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

`<Show>` component needs the `id` information for [`<RefreshButton>`](/core/docs/ui-integrations/material-ui/components/buttons/refresh-button/) to work properly.

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Show } from "@refinedev/mui";

// highlight-start
const PostShow = () => {
  return <Show dataProviderName="other">...</Show>;
};
// highlight-end

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

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";
import { useBack } from "@refinedev/core";

const BackButton = () => {
  const goBack = useBack();

  return <Button onClick={goBack}>BACK!</Button>;
};

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      goBack={<BackButton />}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123" />
            </div>
          ),
          show: PostShow,
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Show/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);
// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-next-line
      isLoading={loading}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          show: "/posts/show/:id",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route element={<PostShow />} path="/posts/show/123" />
        <ReactRouter.Route element={<SampleList />} path="/posts" />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mui` package.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show, Breadcrumb } from "@refinedev/mui";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      breadcrumb={
        <div
          style={{
            padding: "3px 6px",
            border: "2px dashed cornflowerblue",
          }}
        >
          <Breadcrumb />
        </div>
      }
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          show: "/posts/show/:id",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route element={<PostShow />} path="/posts/show/123" />
        <ReactRouter.Route element={<SampleList />} path="/posts" />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/material-ui/components/breadcrumb/)

### wrapperProps

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      wrapperProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          show: "/posts/show/:id",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route element={<PostShow />} path="/posts/show/123" />
        <ReactRouter.Route element={<SampleList />} path="/posts" />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation from Material UI &#8594](https://mui.com/material-ui/api/card/)

### headerProps

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      headerProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          show: "/posts/show/:id",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route element={<PostShow />} path="/posts/show/123" />
        <ReactRouter.Route element={<SampleList />} path="/posts" />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`CardHeader` documentation from Material UI &#8594](https://mui.com/material-ui/api/card-header/)

### contentProps

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      contentProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

> For more information, refer to the [`CardContent` documentation from Material UI &#8594](https://mui.com/material-ui/api/card-content/)

### headerButtons

By default, the `<Show/>` component has a [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, deleteButtonProps, editButtonProps, listButtonProps, refreshButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

If [`canDelete`](#candelete-and-canedit) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

If [`canEdit`](#candelete-and-canedit) is `false`, [`<EditButton>`][edit-button] will not render and `editButtonProps` will be `undefined`.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123" />
            </div>
          ),
          show: PostShow,
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import {
  Show,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

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
          <Button type="primary">Custom Button</Button>
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
        </>
      )}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton recordItemId="123" />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      headerButtonProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123" />
            </div>
          ),
          show: PostShow,
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtons

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123" />
            </div>
          ),
          show: PostShow,
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      footerButtonProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123" />
            </div>
          ),
          show: PostShow,
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`CardActions` documentation from Material UI &#8594](https://mui.com/material-ui/api/card-actions/)

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Show"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
headerButtons-default="[`ListButton`](/core/docs/ui-integrations/material-ui/components/buttons/list-button/), [`EditButton`](/core/docs/ui-integrations/material-ui/components/buttons/edit-button/), [`DeleteButton`](/core/docs/ui-integrations/material-ui/components/buttons/delete-button/), [`RefreshButton`](/core/docs/ui-integrations/material-ui/components/buttons/refresh-button/)"
footerButtonProps-type="[`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/core/docs/ui-integrations/material-ui/components/breadcrumb/)"
goBack-default="`<ArrowLeft />`"
goBack-type="`ReactNode`"
/>

```tsx live shared
const SampleList = () => {
  const { dataGridProps } = RefineMui.useDataGrid();

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = RefineCore.useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "category",
        headerName: "Category",
        valueGetter: ({ row }) => {
          const value = row?.category?.id;

          return value;
        },
        minWidth: 300,
        display: "flex",
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 250,
        display: "flex",
        renderCell: function render({ value }) {
          return <RefineMui.DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <RefineMui.ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData?.data],
  );

  return (
    <RefineMui.List>
      <MuiXDataGrid.DataGrid {...dataGridProps} columns={columns} />
    </RefineMui.List>
  );
};
```

[list-button]: /core/docs/ui-integrations/material-ui/components/buttons/list-button
[refresh-button]: /core/docs/ui-integrations/material-ui/components/buttons/refresh-button
[edit-button]: /core/docs/ui-integrations/material-ui/components/buttons/edit-button
[delete-button]: /core/docs/ui-integrations/material-ui/components/buttons/delete-button
