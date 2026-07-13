---
title: "Strapi V4 Integration Guide | REST API Integration in Refine v5"
display_title: "Strapi v4"
sidebar_label: "Strapi v4"
description: "Secure Strapi V4 in Refine v5. Learn best practices. Learn scale fields and posts for custom APIs and scalable data flows. Real-world snippets included."
source: https://github.com/refinedev/refine/tree/main/packages/strapi-v4
swizzle: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```tsx live shared
import axios from "axios";
const axiosInstance = axios.create();
axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer 6ae3cf664d558bc67d21ddabd0cf5ba0716367cd74c2ceaedf86f0efa09b3fe1605c90ab051fd4961ba03db961273bb2b48b9213ae267013317977f737b4ac8765a2e0bc64e9f275791ccb881117553f589675f5e6ce84d3859511fa124d477209cf1cbbd4fd7f6ddacc77eb4520753e3636446f807629de911eac7afbf60fd4`;
```

Refine supports the features that come with [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

A few of the Strapi-v4 API features are as follows:

- Authentication
- Fields Selection
- Relations Population
- Publication State
- Locale

`meta` allows us to use the above features in hooks. Thus, we can fetch the data according to the parameters we want.

Hooks and components that support `meta`:

| Supported data hooks                                             | Supported other hooks                                                                        | Supported components                                                                               |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`useUpdate` &#8594](/core/docs/data/hooks/use-update/)          | [`useForm` &#8594](/core/docs/data/hooks/use-form/)                                          | [`DeleteButton` &#8594](/core/docs/ui-integrations/ant-design/components/buttons/delete-button/)   |
| [`useUpdateMany` &#8594](/core/docs/data/hooks/use-update-many/) | [`useModalForm` &#8594](/core/docs/ui-integrations/ant-design/hooks/use-modal-form/)         | [`RefreshButton` &#8594](/core/docs/ui-integrations/ant-design/components/buttons/refresh-button/) |
| [`useDelete` &#8594](/core/docs/data/hooks/use-delete/)          | [`useDrawerForm` &#8594](/core/docs/ui-integrations/ant-design/hooks/use-drawer-form/)       |                                                                                                    |
| [`useDeleteMany` &#8594](/core/docs/data/hooks/use-delete-many/) | [`useStepsForm` &#8594](/core/docs/ui-integrations/ant-design/hooks/use-steps-form/)         |                                                                                                    |
| [`useCreate` &#8594](/core/docs/data/hooks/use-create/)          | [`useTable` &#8594](/core/docs/data/hooks/use-table/)                                        |                                                                                                    |
| [`useCreateMany` &#8594](/core/docs/data/hooks/use-create-many/) | [`useEditableTable` &#8594](/core/docs/ui-integrations/ant-design/hooks/use-editable-table/) |                                                                                                    |
| [`useList` &#8594](/core/docs/data/hooks/use-list/)              | [`useSimpleList` &#8594](/core/docs/ui-integrations/ant-design/hooks/use-simple-list/)       |                                                                                                    |
| [`useOne` &#8594](/core/docs/data/hooks/use-one/)                | [`useShow` &#8594](/core/docs/data/hooks/use-show/)                                          |                                                                                                    |
| [`useMany` &#8594](/core/docs/data/hooks/use-many/)              | [`useExport` &#8594](/core/docs/core/hooks/utilities/use-export/)                            |                                                                                                    |
| [`useCustom` &#8594](/core/docs/data/hooks/use-custom/)          | [`useCheckboxGroup` &#8594](/core/docs/ui-integrations/ant-design/hooks/use-checkbox-group/) |                                                                                                    |
|                                                                  | [`useSelect` &#8594](/core/docs/data/hooks/use-select/)                                      |                                                                                                    |
|                                                                  | [`useRadioGroup` &#8594](/core/docs/ui-integrations/ant-design/hooks/use-radio-group/)       |                                                                                                    |

:::note

There is no need to use `meta` for sorting, pagination, and, filters. Sorting, pagination, and, filters will be handled automatically by the strapi-v4 dataProvider.

:::

:::info

Normally, strapi-v4 backend returns data in the following format:

```json
{
    "id": 1,
    "attributes": {
        "title": "My title",
        "content": "Long content...",
}
```

However, we can use [normalizeData](https://github.com/refinedev/refine/blob/27a55320ada61a0624ed2f5b29331946334f7727/packages/strapi-v4/src/dataProvider.ts#L80) to customize the data returned by the backend. So, our data will look like:

```json
{
  "id": 1,
  "title": "My title",
  "content": "Long content..."
}
```

:::

## Setup

<InstallPackagesCommand args="@refinedev/strapi-v4"/>

:::caution

To make this example more visual, we used the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/main/packages/antd) package. If you are using Refine headless, you need to provide the components, hooks, or helpers imported from the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/main/packages/antd) package.

:::

## Usage

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
//highlight-next-line
import { DataProvider } from "@refinedev/strapi-v4";

const App: React.FC = () => {
  return (
    <Refine
      //highlight-next-line
      dataProvider={DataProvider("API_URL")}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

## API Parameters

Let's examine how API parameters that come with Strapi-v4 are used with `meta`. Then, let's see how it is used in the application.

### Create Collections

We created two collections on [Strapi](https://strapi.io/) as `posts` and `categories` and added a relation between them. For detailed information on how to create a collection, you can check [here](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html).

<Tabs
defaultValue="posts"
values={[
{label: 'posts', value: 'posts'},
{label: 'categories', value: 'categories'}
]}>
<TabItem value="posts">

**posts** has the following fields:

- `id`
- `title`
- `content`
- `category`
- `createdAt`
- `locale`

</TabItem>
<TabItem value="categories">

**categories** has the following fields:

- `id`
- `title`

</TabItem>
</Tabs>

### Fields Selection

To select only some fields, we must specify these fields with `meta``.

[Refer to the Fields Selection documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#fields-selection)

```tsx title="Get only id and title of all posts"
const { tableProps } = useTable<IPost>({
  meta: {
    fields: ["id", "title"],
  },
});
```

```tsx title="Get all fields of all posts(id, title, category, content ...)"
const { tableProps } = useTable<IPost>({
  meta: {
    fields: "*",
  },
});
```

When sending the request, we can specify which fields will come, so we send `fields` in `meta` to hooks that we will fetch data from. In this way, you can perform the queries of only the fields you want.

```tsx live url=http://localhost:5173 previewHeight=450px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { DataProvider } from "@refinedev/strapi-v4";
const API_URL = "https://api.strapi-v4.refine.dev";

// visible-block-start
// src/pages/posts/list.tsx

import { List, EditButton, ShowButton, useTable } from "@refinedev/antd";
import { Table, Space } from "antd";

const PostList = () => {
  const { tableProps, sorters } = useTable<IPost>({
    meta: {
      // highlight-start
      fields: ["id", "title"],
      // highlight-end
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
          resources={[
            {
              name: "posts",
              list: "/posts",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

### Relations Population

By default, relations are not populated when fetching entries.

The `populate` parameter is used to define which fields will be populated.

[Refer to the Relations Population documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html#population)

```tsx title="Get all the posts and populate the selected relations"
const { tableProps } = useTable<IPost>({
  meta: {
    populate: ["category", "cover"],
  },
});
```

```tsx title="Get all posts and populate all their first-level relations"
const { tableProps } = useTable<IPost>({
  meta: {
    populate: "*",
  },
});
```

It should be noted that Strapi-V4 allows populating relations more than 1 level.

```tsx title="Get all posts and populate one second-level relation and first-level relation"
const { tableProps } = useTable<IPost>({
  meta: {
    populate: {
      category: {
        populate: ["cover"],
      },
      cover: {
        populate: [""],
      },
    },
  },
});
```

In order to pull the `categories` related to the posts, we can now show the categories in our list by defining the `meta` `populate` parameter.

```tsx live url=http://localhost:5173 previewHeight=450px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { DataProvider } from "@refinedev/strapi-v4";
const API_URL = "https://api.strapi-v4.refine.dev";

// visible-block-start
// src/pages/posts/list.tsx

import {
  List,
  EditButton,
  ShowButton,
  // highlight-start
  useSelect,
  FilterDropdown,
  // highlight-end
  useTable,
} from "@refinedev/antd";
import {
  Table,
  // highlight-next-line
  Select,
  Space,
} from "antd";

const PostList = () => {
  const { tableProps, sorters } = useTable<IPost>({
    meta: {
      fields: ["id", "title"],
      // highlight-next-line
      populate: ["category"],
    },
  });

  // highlight-start
  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
  });
  // highlight-end

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        {/* highlight-start */}
        <Table.Column
          dataIndex={["category", "title"]}
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
        />
        {/* highlight-end */}
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
          resources={[
            {
              name: "posts",
              list: "/posts",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

#### Relations Population for `/me` request

If you need to the population for the `/me` request you can use it like this in your `authProvider`.

```tsx
const strapiAuthHelper = AuthHelper(API_URL + "/api");

strapiAuthHelper.me("token", {
  meta: {
    populate: ["role"],
  },
});
```

### Publication State

:::note

The Draft & Publish feature should be enabled on Strapi.

:::

[Refer to the Publication State documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#publication-state)

`live`: returns only published entries

`preview`: returns draft and published entries

```tsx
const { tableProps } = useTable<IPost>({
  meta: {
    publicationState: "preview",
  },
});
```

We can list the posts separately according to the `published` or `draft` information.

```tsx live url=http://localhost:5173 previewHeight=450px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { DataProvider } from "@refinedev/strapi-v4";
const API_URL = "https://api.strapi-v4.refine.dev";

// visible-block-start
// src/pages/posts/list.tsx

import {
  List,
  EditButton,
  ShowButton,
  useSelect,
  FilterDropdown,
  useTable,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Select,
  // highlight-start
  Form,
  Radio,
  Tag,
  // highlight-end
} from "antd";

const PostList = () => {
  // highlight-next-line
  const [publicationState, setPublicationState] = React.useState("live");

  const { tableProps, sorters } = useTable<IPost>({
    meta: {
      fields: ["id", "title", "publishedAt"],
      populate: ["category"],
      publicationState,
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <List>
      {/* highlight-start */}
      <Form
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "center",
          gap: "16px",
        }}
        layout="inline"
        initialValues={{
          publicationState,
        }}
      >
        <Form.Item label="Publication State" name="publicationState">
          <Radio.Group onChange={(e) => setPublicationState(e.target.value)}>
            <Radio.Button value="live">Published</Radio.Button>
            <Radio.Button value="preview">Draft and Published</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      {/* highlight-end */}
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["category", "title"]}
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
        />
        {/* highlight-start */}
        <Table.Column
          dataIndex="publishedAt"
          title="Status"
          render={(value) => {
            return (
              <Tag color={value ? "green" : "blue"}>
                {value ? "Published" : "Draft"}
              </Tag>
            );
          }}
        />
        {/* highlight-end */}
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
          resources={[
            {
              name: "posts",
              list: "/posts",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

### Locale

:::tip

To fetch content for a locale, make sure it has been already [added to Strapi in the admin panel](https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#configuring-internationalization-locales)

:::

[Refer to the Locale documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#locale)

```tsx
const { tableProps } = useTable<IPost>({
  meta: {
    locale: "de",
  },
});
```

With the local parameter feature, we can fetch posts and categories created according to different languages.

```tsx
import { useState } from "react";

import {
  List,
  useTable,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Select, Space, Form, Radio, Tag } from "antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC = () => {
  //highlight-start
  const [locale, setLocale] = useState("en");
  //highlight-end
  const [publicationState, setPublicationState] = useState("live");

  const { tableProps, sorters } = useTable<IPost>({
    meta: {
      populate: ["category", "cover"],
      //highlight-start
      locale,
      //highlight-end
      publicationState,
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    //highlight-start
    meta: { locale },
    //highlight-end
  });

  return (
    <List>
      <Form
        layout="inline"
        //highlight-start
        initialValues={{
          locale,
          publicationState,
        }}
        //highlight-end
      >
        //highlight-start
        <Form.Item label="Locale" name="locale">
          <Radio.Group onChange={(e) => setLocale(e.target.value)}>
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="de">Deutsch</Radio.Button>
          </Radio.Group>
        </Form.Item>
        //highlight-end
        <Form.Item label="Publication State" name="publicationState">
          <Radio.Group onChange={(e) => setPublicationState(e.target.value)}>
            <Radio.Button value="live">Published</Radio.Button>
            <Radio.Button value="preview">Draft and Published</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <br />
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
        }}
      >
        <Table.Column
          dataIndex="id"
          title="ID"
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
          sorter={{ multiple: 3 }}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          defaultSortOrder={getDefaultSortOrder("title", sorters)}
          sorter={{ multiple: 2 }}
        />
        <Table.Column
          dataIndex={["category", "title"]}
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
        />
        {/* highlight-start */}
        <Table.Column dataIndex="locale" title="Locale" />
        {/* highlight-end */}
        <Table.Column
          dataIndex="publishedAt"
          title="Status"
          render={(value) => {
            return (
              <Tag color={value ? "green" : "blue"}>
                {value ? "Published" : "Draft"}
              </Tag>
            );
          }}
        />
        <Table.Column<{ id: string }>
          title="Actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
```

```tsx live url=http://localhost:5173 previewHeight=450px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { DataProvider } from "@refinedev/strapi-v4";
const API_URL = "https://api.strapi-v4.refine.dev";
import { ConfigProvider, Layout } from "antd";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";

// visible-block-start
// src/pages/posts/list.tsx

import {
  List,
  EditButton,
  ShowButton,
  useSelect,
  FilterDropdown,
  useTable,
} from "@refinedev/antd";
import { Table, Space, Select, Form, Radio, Tag } from "antd";

const PostList = () => {
  // highlight-next-line
  const [locale, setLocale] = React.useState("en");
  const [publicationState, setPublicationState] = React.useState("live");
  const { tableProps, sorters } = useTable<IPost>({
    meta: {
      fields: ["id", "title", "publishedAt", "locale"],
      populate: ["category"],
      locale,
      publicationState,
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    // highlight-next-line
    meta: { locale },
  });

  return (
    <List>
      <Form
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "center",
          gap: "16px",
        }}
        layout="inline"
        initialValues={{
          // highlight-next-line
          locale,
          publicationState,
        }}
      >
        {/* highlight-start */}
        <Form.Item label="Locale" name="locale">
          <Radio.Group onChange={(e) => setLocale(e.target.value)}>
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="de">Deutsch</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {/* highlight-end */}
        <Form.Item label="Publication State" name="publicationState">
          <Radio.Group onChange={(e) => setPublicationState(e.target.value)}>
            <Radio.Button value="live">Published</Radio.Button>
            <Radio.Button value="preview">Draft and Published</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["category", "title"]}
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="publishedAt"
          title="Status"
          render={(value) => {
            return (
              <Tag color={value ? "green" : "blue"}>
                {value ? "Published" : "Draft"}
              </Tag>
            );
          }}
        />
        {/* highlight-start */}
        <Table.Column dataIndex="locale" title="Locale" />
        {/* highlight-end */}
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
// visible-block-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
          resources={[
            {
              name: "posts",
              list: "/posts",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

## `meta` Usages

When creating and editing posts you can use these API parameters in `meta`:

```tsx
const { formProps, saveButtonProps, query } = useForm<IPost>({
  meta: { publicationState: "preview" },
});
```

```tsx title="EditList.tsx"
const { formProps, saveButtonProps, query } = useForm<IPost>({
  meta: { populate: ["category", "cover"] },
});
```

```tsx title="CreateList.tsx"
const { selectProps } = useSelect({
  meta: { locale: "en" },
});
```

## Authentication

Strapi V4 supports authentication and you can use the Refine's `authProvider` to add authentication to your application.

First, we need to create own `fetch` instance to use both `authProvider` and `dataProvider`. We will use `axios` to create the `fetch` instance, however you can use any other library for this.

```tsx title="src/utils/axios.ts"
import axios from "axios";

export const axiosInstance = axios.create();
```

Then, we need to give the `axiosInstance` to the `dataProvider`. Create a `dataProvider` with the `axiosInstance` and export it.

```tsx title="src/dataProvider.ts"
import { DataProvider } from "@refinedev/strapi-v4";
import { axiosInstance } from "./utils/axios";
import { API_URL } from "./constants";

export const dataProvider = DataProvider(`${API_URL}/api`, axiosInstance);
```

Now, we are ready to create the `authProvider`.

```tsx title="src/authProvider.ts"
import { AuthHelper } from "@refinedev/strapi-v4";
import { type AuthProvider } from "@refinedev/core";
import { axiosInstance } from "./utils/axios";
import { TOKEN_KEY } from "./constants";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data, status } = await strapiAuthHelper.login(email, password);
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);

        // set header axios instance
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.jwt}`;

        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      const errorObj = error?.response?.data?.message?.[0]?.messages?.[0];
      return {
        success: false,
        error: {
          message: errorObj?.message || "Login failed",
          name: errorObj?.id || "Invalid email or password",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    axiosInstance.defaults.headers.common["Authorization"] = undefined;
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Authentication failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const { data, status } = await strapiAuthHelper.me(token);
    if (status === 200) {
      const { id, username, email } = data;
      return {
        id,
        username,
        email,
      };
    }

    return null;
  },
};
```

After creating the `authProvider`, and `dataProvider`, we need to pass it to the `Refine` component.

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";

const App = () => {
  return <Refine authProvider={authProvider} dataProvider={dataProvider} />;
};
```

This is the setup for authentication with Refine. Please refer to the [Authentication guide](/core/docs/guides-concepts/authentication/) for more information about how to use authentication with Refine.

## File Upload

Strapi supports file upload. Below are examples of how to upload files to Strapi.

[Refer to the Strapi documentation for more information &#8594](https://docs.strapi.io/dev-docs/plugins/upload#upload-files)

<Tabs
defaultValue="antd"
values={[
{label: 'Ant Design Form', value: 'antd'},
{label: 'React Hook Form', value: 'react-hook-form'},
{label: 'Mantine Form', value: 'mantine'}
]}>
<TabItem value="antd">

`getValueProps` and `mediaUploadMapper` are helper functions for Ant Design Form.

```tsx
import { Edit, useForm } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Form, Upload } from "antd";

import { TOKEN_KEY, API_URL } from "../../constants";
import { IPost } from "../interfaces";

export const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>({
    meta: { populate: ["cover"] },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <Form.Item label="Cover">
          <Form.Item
            name="cover"
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
            noStyle
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/api/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              }}
              listType="picture"
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

</TabItem>

<TabItem value="react-hook-form">

```tsx
import { useState } from "react";
import axios from "axios";
import { Edit } from "@refinedev/mui";
import { Box, Input, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { ICategory, IPost } from "interfaces";

import { TOKEN_KEY, API_URL } from "../../constants";

export const PostEdit: React.FC = () => {
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const {
    saveButtonProps,
    register,
    formState: { errors },
    setValue,
    setError,
  } = useForm<IPost, HttpError, IPost & { category: ICategory; cover: any }>();

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      setIsUploadLoading(true);

      const formData = new FormData();

      const target = event.target;
      const file: File = (target.files as FileList)[0];

      formData.append("files", file);

      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      setImageURL(`${API_URL}${res.data[0].url}`);
      setValue("cover", res.data[0].id, { shouldValidate: true });

      setIsUploadLoading(false);
    } catch (error) {
      setError("cover", { message: "Upload failed. Please try again." });
      setIsUploadLoading(false);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Stack
          direction="row"
          gap={4}
          flexWrap="wrap"
          sx={{ marginTop: "16px" }}
        >
          <label htmlFor="images-input">
            <Input
              id="images-input"
              type="file"
              sx={{ display: "none" }}
              onChange={onChangeHandler}
            />
            <input
              id="file"
              {...register("cover", {
                required: "This field is required",
              })}
              type="hidden"
            />
            <LoadingButton
              loading={isUploadLoading}
              loadingPosition="end"
              endIcon={<FileUploadIcon />}
              variant="contained"
              component="span"
            >
              Upload
            </LoadingButton>
            <br />
            {errors.cover && (
              <Typography variant="caption" color="#fa541c">
                {errors.cover?.message?.toString()}
              </Typography>
            )}
          </label>
          {imageURL && (
            <Box
              component="img"
              sx={{
                maxWidth: 250,
                maxHeight: 250,
              }}
              src={imageURL}
              alt="Post image"
            />
          )}
        </Stack>
      </Box>
    </Edit>
  );
};
```

</TabItem>

<TabItem value="mantine">

```tsx
import { useState } from "react";
import axios from "axios";
import { Edit, useForm } from "@refinedev/mantine";
import { Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";

const API_URL = "http://localhost:1337";
const TOKEN_KEY = "strapi-jwt-token";

export const PostEdit: React.FC = () => {
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const { saveButtonProps, setFieldValue } = useForm<any>({
    initialValues: {
      title: "",
      cover: "",
    },
  });

  const handleOnDrop = async (files: FileWithPath[]) => {
    try {
      setIsUploadLoading(true);

      const formData = new FormData();

      const file = files[0];

      formData.append("files", file);

      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      setFieldValue("cover", res.data[0].id);

      setIsUploadLoading(false);
    } catch (error) {
      setIsUploadLoading(false);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <Text mt={8} weight={500} size="sm" color="#212529">
          Cover
        </Text>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={handleOnDrop}
          loading={isUploadLoading}
        >
          <Text align="center">Drop images here</Text>
        </Dropzone>
      </form>
    </Edit>
  );
};
```

</TabItem>
</Tabs>

## Server-side form validation

Strapi provides a way to add validation rules to your models. So if you send a request to the server with invalid data, Strapi will return errors for each field that has a validation error.

[Refer to the Strapi documentation for more information &#8594 ](https://docs.strapi.io/dev-docs/backend-customization/models#validations)

By default, `@refinedev/strapi-v4` transforms the error response from Strapi into a [`HttpError`](/core/docs/core/interface-references#httperror) object. This object contains the following properties:

- `statusCode` - The status code of the response.
- `message` - The error message.
- `errors` - An object containing the validation errors for each field.

Thus, `useForm` will automatically set the error message for each field that has a validation error.

[Refer to the server-side form validation documentation for more information &#8594 ](/core/docs/guides-concepts/forms/#server-side-validation-).

## Example

:::note Demo Credentials

Username: demo@refine.dev

Password: demodemo

:::

<CodeSandboxExample path="data-provider-strapi-v4" />
