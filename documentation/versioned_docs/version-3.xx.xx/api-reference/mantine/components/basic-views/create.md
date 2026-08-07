---
id: create
title: Create
swizzle: true
---

```tsx live shared
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
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
```

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px hideCode
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import {
  Create,
  Select,
  TextInput,
  useForm,
  useSelect,
} from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Title } from "@pankod/refine-mantine";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create title={<Title order={3}>Custom Title</Title>}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mantine/components/buttons/save-button)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-mantine";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create saveButtonProps={{ size: "xs" }}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `resource`

The `<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { Layout, Create } from "@pankod/refine-mantine";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create resource="categories">
      <p>Rest of your page here</p>
    </Create>
  );
};

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        // highlight-start
        routes: [
          {
            element: <CustomPage />,
            path: "/custom",
          },
        ],
        // highlight-end
      }}
      Layout={Layout}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-mantine";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create goBack="😊">
      <p>Rest of your page here 2</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `isLoading`

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-mantine";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create isLoading={true}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-mantine` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mantine/components/breadcrumb)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Breadcrumb } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `wrapperProps`

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@pankod/refine-mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

[Refer to the `Card` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/card/)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `headerProps`

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `contentProps`

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `Box` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/box/)

```tsx live url=http://localhost:3000/posts/create previewHeight=320px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Button } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Button } from "@pankod/refine-mantine";

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
      // highlight-end
      headerButtons={<Button type="primary">Custom Button</Button>}
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Button } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <CreateButton />
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

### Props

<PropsTable module="@pankod/refine-mantine/Create" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Create {resource.name}</Title>`"/>
