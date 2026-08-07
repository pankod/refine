---
title: "Mantine Edit View | Refine v4 CRUD Management"
display_title: "Edit"
sidebar_label: "Edit"
description: "Learn how to build 'Edit' pages using Mantine in Refine v4. Master data fetching and update logic with official Mantine components."
swizzle: true
---

`<Edit>` provides us a layout for displaying the page. It does not contain any logic and just adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);
// visible-block-start
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    refineCore: { query },
  } = useForm<IPost>({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: query?.data?.data?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          {...getInputProps("status")}
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <Select
          mt={8}
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
      </form>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know
You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.
:::

## Properties

### title

`title` allows the addition of titles inside the `<Edit>` component. if you don't pass title props it uses the "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Title } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-next-line
      title={<Title order={3}>Custom Title</Title>}
    >
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### saveButtonProps

`saveButtonProps` can be used to customize the default button of the `<Edit>` component that submits the form:

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ size: "xs" }}>
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

For more information, refer to the `<SaveButton>` documentation →

### canDelete and deleteButtonProps

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property, Refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the dataProvider.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { usePermissions } from "@refinedev/core";

const PostEdit: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ size: "xs" }}
      /* highlight-end */
      saveButtonProps={{ variant: "outline", size: "xs" }}
    >
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the documentations [`<DeleteButton>` &#8594](/core/docs/ui-integrations/mantine/components/buttons/delete-button) and [`usePermission` &#8594](/core/docs/authentication/hooks/use-permissions)

### resource

`<Edit>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Edit>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom/23 previewHeight=280px
setInitialRoutes(["/custom/23"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="categories">
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/categories/edit/:id",
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

### recordItemId

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL, such as when it is used on a custom page, modal or drawer.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=350px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, useModalForm } from "@refinedev/mantine";
import { Modal, Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  const {
    modal: { visible, close, show },
    id,
  } = useModalForm({
    action: "edit",
  });

  return (
    <div>
      <Button onClick={() => show()}>Edit Button</Button>
      <Modal
        opened={visible}
        onClose={close}
        // hide-start
        size={700}
        withCloseButton={false}
        // hide-end
      >
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
    <RefineMantineDemo
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
                <RefineMantine.EditButton recordItemId="23">
                  Edit Item 23
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### mutationMode

Determines which mode mutation will have while executing `<DeleteButton>`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

const PostEdit: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm<IPost>({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
    },
  });

  return (
    <Edit
      //highlight-next-line
      mutationMode="undoable"
      canDelete
      saveButtonProps={saveButtonProps}
    >
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
      </form>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [mutation mode documentation &#8594](/core/docs/advanced-tutorials/mutation-mode)

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Edit } from "@refinedev/mantine";

const PostEdit = () => {
  return (
    <Edit
      // highlight-start
      dataProviderName="other"
      // highlight-end
    >
      {/* ... */}
    </Edit>
  );
};

export const App: React.FC = () => {
  return (
    <Refine
      dataProvider={{
        default: dataProvider("https://api.fake-rest.refine.dev/"),
        other: dataProvider("https://other-api.fake-rest.refine.dev/"),
      }}
    >
      {/* ... */}
    </Refine>
  );
};
```

### goBack

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit goBack="😊">
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

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
    <RefineMantineDemo
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mantine` package.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, Breadcrumb } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    >
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/mantine/components/breadcrumb)

### wrapperProps

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property. For `@refinedev/mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation from Mantine &#8594](https://mantine.dev/core/card/)

### headerProps

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      headerProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
    >
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### contentProps

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      contentProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
    >
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/box/)

### headerButtons

By default, the `<Edit/>` component has a [`<ListButton>`][list-button] and a [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `refreshButtonProps` and `listButtonProps` to utilize the default values of the [`<ListButton>`][list-button] and [`<RefreshButton>`][refresh-button] components.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, RefreshButton, ListButton } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ refreshButtonProps, listButtonProps }) => (
        <>
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
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
    <RefineMantineDemo
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Modal, Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      headerButtonProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      headerButtons={
        <Button variant="outline" type="primary">
          Custom Button
        </Button>
      }
    >
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### footerButtons

By default, the `<Edit/>` component has a [`<SaveButton>`][save-button] and a [`<DeleteButton>`][delete-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If [`canDelete`](#candelete-and-deletebuttonprops) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` and `deleteButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] and [`<DeleteButton>`][delete-button] components.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, SaveButton, DeleteButton } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostEdit: React.FC = () => {
  return (
    <Edit
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps} hideText />
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} hideText />
          )}
          <Button variant="gradient">Custom Button</Button>
        </>
      )}
    >
      <p>Rest of your page here</p>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtonProps={{
        style: {
          // hide-start
          float: "right",
          marginRight: 24,
          // hide-end
          border: "2px dashed cornflowerblue",
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
    <RefineMantineDemo
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### autoSaveProps

You can use the auto save feature of the `<Edit/>` component by using the `autoSaveProps` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    refineCore: { query, autoSaveProps },
  } = useForm<IPost>({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
    },
    // highlight-start
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
    // highlight-end
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: query?.data?.data?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          {...getInputProps("status")}
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <Select
          mt={8}
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
      </form>
    </Edit>
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
                <RefineMantine.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMantine.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Props

<PropsTable module="@refinedev/mantine/Edit" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Edit {resource.name}</Title>`" />

[list-button]: /core/docs/ui-integrations/mantine/components/buttons/list-button
[refresh-button]: /core/docs/ui-integrations/mantine/components/buttons/refresh-button
[save-button]: /core/docs/ui-integrations/mantine/components/buttons/save-button
[delete-button]: /core/docs/ui-integrations/mantine/components/buttons/delete-button
