---
title: "Ant Design Edit View | Refine v4 CRUD Management"
display_title: "Edit"
sidebar_label: "Edit"
description: "Learn how to create 'Edit' pages using Ant Design in Refine v4. Master data fetching, form pre-filling, and update logic with official UI components."
swizzle: true
---

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom/123
setInitialRoutes(["/custom/123"]);

// visible-block-start
import { Edit } from "@refinedev/antd";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="posts">
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/custom/:id"
          element={
            <div style={{ padding: 16 }}>
              <CustomPage />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::tip
The example above shows how to use the `resource` prop when the component is rendered on a custom page with a different route than the resource route.
:::

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Properties

### title

`title` allows you to add a title inside the `<Edit>` component. If you don't pass title props, it uses the "Edit" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/antd";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit title="Custom Title">
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### saveButtonProps

The `<Edit>` component has a save button that submits the form by default. If you want to customize this button you can use the `saveButtonProps` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/antd";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ size: "small" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<SaveButton>` documentation &#8594](/core/docs/ui-integrations/ant-design/components/buttons/save-button)

### canDelete and deleteButtonProps

`canDelete` allows you to add a delete button inside the `<Edit>` component. This button uses the `useDelete` method provided by the `dataProvider`

If you want to customize this button you can use the `deleteButtonProps` property like the code below.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

import { Edit } from "@refinedev/antd";
import { usePermissions } from "@refinedev/core";

// visible-block-start
const PostEdit: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ size: "small" }}
      /* highlight-end */
      saveButtonProps={{ size: "small" }}
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<DeleteButton>` documentation &#8594](/core/docs/ui-integrations/ant-design/components/buttons/delete-button)

> For more information, refer to the [`usePermission` documentation &#8594](/core/docs/authentication/hooks/use-permissions)

### resource

The `<Edit>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Edit>` component, you can use the `resource` prop:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom/123
setInitialRoutes(["/custom/123"]);

// visible-block-start
import { Edit } from "@refinedev/antd";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="posts">
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/custom/:id"
          element={
            <div style={{ padding: 16 }}>
              <CustomPage />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::tip
The example above shows how to use the `resource` prop when the component is rendered on a custom page with a different route than the resource route.
:::

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### recordItemId

The `<Edit>` component reads the `id` information from the route by default. When it cannot be read from the URL, which happens when it's used on a custom page, modal or drawer, `recordItemId` is used.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit, useModalForm } from "@refinedev/antd";
import { Modal, Button } from "antd";

// visible-block-start
const PostEdit: React.FC = () => {
  const { modalProps, id, show } = useModalForm({
    action: "edit",
  });

  return (
    <div>
      <Button onClick={() => show()}>Edit Button</Button>
      <Modal {...modalProps}>
        {/* highlight-next-line */}
        <Edit recordItemId={id}>
          <p>Rest of your page here</p>
        </Edit>
      </Modal>
    </div>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.

### mutationMode

Determines which mode mutation will have while executing `<DeleteButton>` .

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit mutationMode="undoable" saveButtonProps={{ size: "small" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [mutation mode documentation &#8594](/core/docs/advanced-tutorials/mutation-mode)

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers, you can use the `dataProviderName` property to specify which one you want to use:

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Edit } from "@refinedev/antd";

// highlight-start
const PostEdit = () => {
  return <Edit dataProviderName="other">...</Edit>;
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

To customize the back button or to disable it, you can use the `goBack` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";
import { Button } from "antd";

// visible-block-start
const PostEdit: React.FC = () => {
  const BackButton = () => <Button>←</Button>;
  return (
    /* highlight-next-line */
    <Edit goBack={<BackButton />}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

If your route has no `:action` parameter or your action is `list`, the back button will not be shown even if you pass a `goBack` property. You can override this behavior by using the `headerProps` property:

```tsx
import { useBack } from "@refinedev/core";
import { Edit } from "@refinedev/antd";
import { Button } from "antd";

const PostEdit: React.FC = () => {
  const back = useBack();
  const BackButton = () => <Button>←</Button>;

  return (
    <Edit goBack={<BackButton />} headerProps={{ onBack: back }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
```

### isLoading

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit isLoading={true}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default the `Breadcrumb` component from the `@refinedev/antd` package is used for breadcrumbs.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit, Breadcrumb } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
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
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/ant-design/components/breadcrumb)

### wrapperProps

You can use the `wrapperProps` property if you want to customize the wrapper of the `<Edit/>` component. The `@refinedev/antd` wrapper elements are simply `<div/>`s and `wrapperProps` and can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      wrapperProps={{
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerProps

You can use the `headerProps` property to customize the header of the `<Edit/>` component:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerProps={{
        subTitle: "This is a subtitle",
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`PageHeader` documentation &#8594](https://procomponents.ant.design/en-US/components/page-header)

### contentProps

You can use the `contentProps` property to customize the content of the `<Edit/>` component:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      contentProps={{
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation &#8594](https://ant.design/components/card/)

### headerButtons

By default, the `<Edit/>` component has a [`<ListButton>`][list-button] and a [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If the "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";
import { Button } from "antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `refreshButtonProps` and `listButtonProps` to utilize the default values of the `<ListButton>`[list-button] and `<RefreshButton>`[refresh-button] components.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit, ListButton, RefreshButton } from "@refinedev/antd";
import { Button } from "antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ refreshButtonProps, listButtonProps }) => (
        <>
          <Button type="primary">Custom Button</Button>
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can use the `headerButtonProps` property to customize the wrapper element of the buttons at the header:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";
import { Button } from "antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtonProps={{
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
      headerButtons={<Button type="primary">Custom Button</Button>}
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtons

By default, the `<Edit/>` component has a [`<SaveButton>`][save-button] and a [`<DeleteButton>`][delete-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If [`canDelete`](#candelete-and-deletebuttonprops) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";
import { Button } from "antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` and `deleteButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] and [`<DeleteButton>`][delete-button] components.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit, SaveButton, DeleteButton } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps} hideText />
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} hideText />
          )}
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

import { Edit } from "@refinedev/antd";

// visible-block-start
const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtonProps={{
        style: {
          float: "right",
          marginRight: 24,
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### autoSaveProps

You can use the auto save feature of the `<Edit/>` component by using the `autoSaveProps` property.

```tsx live url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

// visible-block-start
const PostEdit: React.FC = () => {
  const { current, gotoStep, stepsProps, formProps, saveButtonProps, query } =
    useStepsForm<IPost>({
      stepsProps: {
        items: [
          {
            title: "First Step",
          },
          {
            title: "Second Step",
          },
        ],
      },
    });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Steps {...stepsProps} />
      <Form {...formProps} layout="vertical">
        {current === 0 && (
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {current === 1 && (
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        )}
      </Form>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineAntd.EditButton recordItemId="123">
                  Edit Item 123
                </RefineAntd.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::tip
The `query` object from the `useForm` hook contains the query result from the data provider. You can use it to access the data returned from the API.

```tsx
const { query } = useForm();
const record = query?.data?.data;
```

The `data.data` structure shown above is the default for the `@refinedev/simple-rest` data provider. This structure may be different for other data providers.
:::

## API Reference

### Properties

<PropsTable module="@refinedev/antd/Edit" />

:::tip External Props
It also accepts all props of Ant Design [Form](https://ant.design/components/form/#API).
:::

### Type Parameters

| Property     | Extends | Default | Description                                                    |
| ------------ | ------- | ------- | -------------------------------------------------------------- |
| TQueryFnData | unknown | unknown | Result data returned by the query function. Extends unknown    |
| TError       | unknown | unknown | Custom error object that extends unknown                       |
| TVariables   | object  | object  | Values for params. default `object`                            |
| TData        | unknown | unknown | Result data returned by the `select` function. Extends unknown |
| TResponse    | unknown | unknown | Result data returned by the mutation function. Extends unknown |

### Return values

| Property            | Description                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `queryResult`       | If the `queryResult` prop is given, it will be returned. Otherwise, it will return `undefined`.                        |
| `mutationResult`    | Mutation result from `react-query`. [Check here →](https://tanstack.com/query/latest/docs/react/reference/useMutation) |
| `saveButtonProps`   | Props for a save button.                                                                                               |
| `cancelButtonProps` | Props for a cancel button.                                                                                             |
| `deleteButtonProps` | Props for a delete button.                                                                                             |
| `formProps`         | Props for the `<Form>` component.                                                                                      |
| `formLoading`       | Loading state of form.                                                                                                 |
| `setId`             | `id` setter.                                                                                                           |
| `id`                | Record id for edit action. The record to edit.                                                                         |
| `defaultValues`     | Default form values.                                                                                                   |
| `formValues`        | Form values.                                                                                                           |
| `submit`            | Submit method, the parameter is the values to update a record.                                                         |
| `reset`             | Reset method, reset the form values to initial values.                                                                 |
| `redirect`          | Redirect function, will be called after form is submitted successfully.                                                |
| `goBack`            | Go back function, will be called when the cancel button is clicked.                                                    |
| `query`             | Query result from `react-query`. [Check here →](https://tanstack.com/query/latest/docs/react/reference/useQuery)       |

[list-button]: /core/docs/ui-integrations/ant-design/components/buttons/list-button
[refresh-button]: /core/docs/ui-integrations/ant-design/components/buttons/refresh-button
[save-button]: /core/docs/ui-integrations/ant-design/components/buttons/save-button
[delete-button]: /core/docs/ui-integrations/ant-design/components/buttons/delete-button
