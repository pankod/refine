---
id: edit
title: Edit
swizzle: true
---

```tsx live shared
setRefineProps({
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

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import {
  Edit,
  Select,
  TextInput,
  useForm,
  useSelect,
} from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    refineCore: { queryResult },
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
    refineCoreProps: {
      warnWhenUnsavedChanges: true,
    },
  });

  const postData = queryResult?.data?.data;
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

It allows adding titles inside the `<Edit>` component. if you don't pass title props it uses the "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Title } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit title={<Title order={3}>Custom Title</Title>}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

The `<Edit>` component has a save button by default. If you want to customize this button you can use the `saveButtonProps` property like the code below.

Clicking on the save button will submit your form.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mantine/components/buttons/save-button)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ size: "xs" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property,refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the `dataProvider`.

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mantine/components/buttons/delete)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";
import { usePermissions } from "@pankod/refine-core";

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
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve("admin"),
    getUserIdentity: () => Promise.resolve(),
  };

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={customDataProvider}
      authProvider={authProvider}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions)

### `resource`

`<Edit>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Edit>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live url=http://localhost:3000/custom/23 previewHeight=280px
setInitialRoutes(["/custom/23"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, Edit } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="categories">
      <p>Rest of your page here</p>
    </Edit>
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
            path: "/custom/:id",
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

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=350px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, useModalForm, Modal, Button } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="23">Edit Item 23</EditButton>
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

:::note
The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>`.

[Refer to the mutation mode docs for further information. &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, TextInput, useForm } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm<IPost>({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
    },
    refineCoreProps: {
      warnWhenUnsavedChanges: true,
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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostEdit = () => {
  return <Edit dataProviderName="other">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      // highlight-start
      dataProvider={{
        default: dataProvider("https://api.fake-rest.refine.dev/"),
        other: dataProvider("https://other-api.fake-rest.refine.dev/"),
      }}
      // highlight-end
      resources={[{ name: "posts", edit: PostEdit }]}
    />
  );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit goBack="😊">
      <p>Rest of your page here 2</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit isLoading={true}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Breadcrumb } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property. For `@pankod/refine-mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

[Refer to the `Card` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/card/)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

[Refer to the `Box` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/box/)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Button } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Button } from "@pankod/refine-mantine";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Button } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-mantine";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
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

<PropsTable module="@pankod/refine-mantine/Edit" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Edit {resource.name}</Title>`" />
