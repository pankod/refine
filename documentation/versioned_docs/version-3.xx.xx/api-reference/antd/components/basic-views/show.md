---
id: show
title: Show
swizzle: true
---

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/show/2
// visible-block-start
import { Show, Typography, MarkdownField } from "@pankod/refine-antd";
import { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";

const { Title, Text } = Typography;

const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } =
    useOne<ICategory>({
      resource: "categories",
      id: record?.category.id || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.data.title}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton recordItemId="2">Edit Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding a title for the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;
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

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show title="Custom Title">
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton recordItemId="2">Show Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `resource`

The `<Show>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Show>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom/2
setInitialRoutes(["/custom/2"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show resource="posts">
      <p>Rest of your page here</p>
    </Show>
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
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end

render(<App />);
```

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property refine adds the buttons by default.

When clicked on, delete button executes the `useDelete` method provided by the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider) and the edit button redirects the user to the record edit page.

Refer to the [`<DeleteButton>`](/core/docs/3.xx.xx/api-reference/antd/components/buttons/delete) and the [`<EditButton>`](/core/docs/3.xx.xx/api-reference/antd/components/buttons/edit) documentation for detailed usage.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton, Edit } = RefineAntd;
const { usePermissions } = RefineCore;

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
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve("admin"),
  getUserIdentity: () => Promise.resolve(),
};

// visible-block-start
import { Show } from "@pankod/refine-antd";
import { usePermissions } from "@pankod/refine-core";

const PostShow: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      canEdit={permissionsData?.includes("admin")}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    authProvider={authProvider}
    dataProvider={customDataProvider}
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton>Show Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
        edit: () => {
          return <Edit>Edit Page</Edit>;
        },
      },
    ]}
  />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions)

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, useModalForm, Modal, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  const { modalProps, id, show } = useModalForm({
    action: "show",
  });

  return (
    <div>
      <Button onClick={() => show()}>Show Button</Button>
      <Modal {...modalProps}>
        {/* highlight-next-line */}
        <Show recordItemId={id}>
          <p>Rest of your page here</p>
        </Show>
      </Modal>
    </div>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton recordItemId="2">Show Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

:::note
`<Show>` component needs the `id` information for `<RefreshButton>` to work properly.
:::

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostShow = () => {
  return <Show dataProviderName="other">...</Show>;
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
      resources={[{ name: "posts", show: PostShow }]}
    />
  );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, Icons } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show goBack={<Icons.SmileOutlined />}>
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts", "/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton>Show Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `isLoading`

Since `<Show>` uses the Ant Design [`<Card>`](https://ant.design/components/card/) component, the `isLoading` property can be set like the below.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

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
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-antd` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/antd/components/breadcrumb)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-antd";

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
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property. For `@pankod/refine-antd` wrapper elements are simple `<div/>`s and `wrapperProps` can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `headerProps`

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

[Refer to the `PageHeader` documentation from Ant Design for detailed usage. &#8594](https://procomponents.ant.design/en-US/components/page-header)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `contentProps`

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

[Refer to the `Card` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
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
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
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
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, Button } from "@pankod/refine-antd";

const PostShow: React.FC = () => {
  return (
    <Show
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/Show"
contentProps-type="[`CardProps`](https://ant.design/components/card/#API)"
headerProps-type="[`PageHeaderProps`](https://procomponents.ant.design/en-US/components/page-header)"
headerButtons-default="[`ListButton`](https://refine.dev/core/docs/api-reference/antd/components/buttons/list-button/), [`RefreshButton`](https://refine.dev/core/docs/api-reference/antd/components/buttons/refresh-button/), [`EditButton`](https://refine.dev/core/docs/api-reference/antd/components/buttons/edit-button/) and [`DeleteButton`](https://refine.dev/core/docs/api-reference/antd/components/buttons/delete-button/)"
headerButtonProps-type="[`SpaceProps`](https://ant.design/components/space/)"
deleteButtonProps-type="[`DeleteButtonProps`](/core/docs/3.xx.xx/api-reference/antd/components/buttons/delete-button/)"
saveButtonProps-type="[`SaveButtonProps`](https://refine.dev/core/docs/api-reference/antd/components/buttons/save-button/)"
footerButtonsProps-type="[`SpaceProps`](https://ant.design/components/space/)"
breadcrumb-default="[`<Breadcrumb>`](https://ant.design/components/breadcrumb/)"
goBack-default="`<ArrowLeft />`"
goBack-type="`ReactNode`"
/>
