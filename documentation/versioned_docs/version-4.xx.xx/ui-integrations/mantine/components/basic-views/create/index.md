---
title: "Mantine Create View | Refine v4 CRUD Pages"
display_title: "Create"
sidebar_label: "Create"
description: "Official guide to building 'Create' pages with Mantine. Documentation on integrating forms and layouts in your Refine v4 React application."
swizzle: true
---

```tsx live shared
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

const Wrapper = ({ children }) => {
  return (
    <MantineCore.MantineProvider
      theme={RefineMantine.LightTheme}
      withNormalizeCSS
      withGlobalStyles
    >
      <MantineCore.Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <MantineNotifications.NotificationsProvider position="top-right">
        {children}
      </MantineNotifications.NotificationsProvider>
    </MantineCore.MantineProvider>
  );
};
```

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We will show what `<Create>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px hideCode
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

const PostCreate: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm<IPost>({
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
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
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

`title` allows the addition of titles inside the `<Create>` component by passing title props. If you don't pass title props, however, it uses the "Create" prefix and the singular resource name by default. For example, for the `/posts/create` resource, it would be "Create post".

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Title } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      title={<Title order={3}>Custom Title</Title>}
    >
      <p>Rest of your page here</p>
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### saveButtonProps

`saveButtonProps` can be used to customize the default button of the `<Create>` component that submits the form:

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      saveButtonProps={{ size: "xs" }}
    >
      <p>Rest of your page here</p>
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<SaveButton>` documentation &#8594](/core/docs/ui-integrations/mantine/components/buttons/save-button)

### resource

The `<Create>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Create>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

// visible-block-start
import { Create } from "@refinedev/mantine";

const CustomPage: React.FC = () => {
  return (
    <Create
      // highlight-start
      resource="categories"
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
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
          create: "/categories/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/custom" element={<CustomPage />} />
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### goBack

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      goBack="😊"
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      isLoading={true}
    >
      <p>Rest of your page here</p>
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create, Breadcrumb } from "@refinedev/mantine";

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
    <RefineMantineDemo
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### wrapperProps

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@refinedev/mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation from Mantine &#8594](https://mantine.dev/core/card/)

### headerProps

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerProps={{
        style: {
          border: "2px dashed cornflowerblue",
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
    <RefineMantineDemo
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Group` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### contentProps

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtons

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Button } from "@mantine/core";

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
    <RefineMantineDemo
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/box/)

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtonProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      headerButtons={<Button type="primary">Custom Button</Button>}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtons

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Group` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mantine";
import { Button } from "@mantine/core";

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
          border: "2px dashed cornflowerblue",
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
    <RefineMantineDemo
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
                <RefineMantine.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Group` documentation from Mantine &#8594](https://mantine.dev/core/group/)

## API Reference

### Props

<PropsTable module="@refinedev/mantine/Create" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Create {resource.name}</Title>`"/>

[save-button]: /core/docs/ui-integrations/mantine/components/buttons/save-button
