---
title: "Ant Design Create View | Refine v4 CRUD Pages"
display_title: "Create"
sidebar_label: "Create"
description: "Official guide to building 'Create' pages with Ant Design. Documentation on integrating forms, layout, and save logic in your Refine v4 application."
swizzle: true
---

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We will show what `<Create>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

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

// visible-block-start
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Properties

### title

`title` allows you to add a title inside the `<Create>` component. If you don't pass the title props, it uses the "Create" prefix and the singular resource name by default. For example, for the `/posts/create` resource, it would be "Create post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create title="Custom Title">
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### saveButtonProps

The `<Create>` component has a save button that submits the form by default. If you want to customize this button you can use the `saveButtonProps` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create saveButtonProps={{ size: "small" }}>
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<SaveButton>` documentation &#8594](/core/docs/ui-integrations/ant-design/components/buttons/save-button)

### resource

The `<Create>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Create>` component, you can use the `resource` prop:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { Create } from "@refinedev/antd";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create resource="posts">
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<CustomPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### goBack

To customize the back button or to disable it, you can use the `goBack` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
  const BackButton = () => <Button>←</Button>;
  return (
    /* highlight-next-line */
    <Create goBack={<BackButton />}>
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

If your route has no `:action` parameter or your action is `list`, the back button will _not_ be shown even if you pass a `goBack` property. You can override this behavior by using the `headerProps` property:

```tsx
/* highlight-next-line */
import { useBack } from "@refinedev/core";
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
  /* highlight-next-line */
  const back = useBack();
  const BackButton = () => <Button>←</Button>;

  return (
    /* highlight-next-line */
    <Create goBack={<BackButton />} headerProps={{ onBack: back }}>
      <p>Rest of your page here</p>
    </Create>
  );
};
```

### isLoading

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create isLoading={true}>
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default the `Breadcrumb` component from the `@refinedev/antd` package is used for breadcrumbs.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create, Breadcrumb } from "@refinedev/antd";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/ant-design/components/breadcrumb)

### wrapperProps

You can use the `wrapperProps` property if you want to customize the wrapper of the `<Create/>` component. The `@refinedev/antd` wrapper elements are simply `<div/>`s and `wrapperProps` and can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerProps

You can use the `headerProps` property to customize the header of the `<Create/>` component:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`PageHeader` documentation &#8594](https://procomponents.ant.design/en-US/components/page-header)

### contentProps

You can use the `contentProps` property to customize the content of the `<Create/>` component:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation &#8594](https://ant.design/components/card/)

### headerButtons

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can use the `headerButtonProps` property to customize the wrapper element of the buttons at the header:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtonProps={{
        style: {
          // hide-start
          float: "right",
          marginRight: 24,
          // hide-end
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
      headerButtons={<Button type="primary">Custom Button</Button>}
    >
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Space` documentation &#8594](https://ant.design/components/space/)

### footerButtons

By default, the `<Create/>` component has a [`<SaveButton>`][save-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] component.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create, SaveButton } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton
            {...saveButtonProps}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Save
          </SaveButton>
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerButtonProps={{
        style: {
          // hide-start
          float: "right",
          marginRight: 24,
          // hide-end
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
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
          create: "/posts/create",
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
                <RefineAntd.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Space` documentation &#8594](https://ant.design/components/space/)

## API Reference

### Properties

<PropsTable module="@refinedev/antd/Create" goBack-default="`<ArrowLeft />`" headerProps-type="[`PageHeaderProps`](https://procomponents.ant.design/en-US/components/page-header)" />

[save-button]: /core/docs/ui-integrations/ant-design/components/buttons/save-button

</rewritten_file>
