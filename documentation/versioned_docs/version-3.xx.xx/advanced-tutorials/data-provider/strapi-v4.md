---
id: strapi-v4
title: Strapi-v4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** supports the features that come with [Strapi-v4](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

A few of the Strapi-v4 API features are as follows:

- Fields Selection
- Relations Population
- Publication State
- Locale

`metaData` allows us to use the above features in hooks. Thus, we can fetch the data according to the parameters we want.

Hooks and components that support `metaData`:

| Supported data hooks                                                                      | Supported other hooks                                                                           | Supported components                                                                              |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`useUpdate` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/)         | [`useForm` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/useForm)                         | [`DeleteButton` &#8594](/core/docs/3.xx.xx/api-reference/antd/components/buttons/delete-button)   |
| [`useUpdateMany` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdateMany/) | [`useModalForm` &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useModalForm)          | [`RefreshButton` &#8594](/core/docs/3.xx.xx/api-reference/antd/components/buttons/refresh-button) |
| [`useDelete` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/)         | [`useDrawerForm` &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useDrawerForm)        |                                                                                                   |
| [`useDeleteMany` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDeleteMany/) | [`useStepsForm` &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useStepsForm)          |                                                                                                   |
| [`useCreate` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/)         | [`useTable` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/useTable)                       |                                                                                                   |
| [`useCreateMany` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreateMany/) | [`useEditableTable` &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/table/useEditableTable) |                                                                                                   |
| [`useList` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/)             | [`useSimpleList` &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/list/useSimpleList)        |                                                                                                   |
| [`useOne` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/)               | [`useShow` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/show/useShow)                    |                                                                                                   |
| [`useMany` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/)             | [`useExport` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/import-export/useExport)       |                                                                                                   |
| [`useCustom` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCustom/)         | [`useCheckboxGroup` &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/field/useCheckboxGroup) |                                                                                                   |
|                                                                                           | [`useSelect` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/useSelect/)                    |                                                                                                   |
|                                                                                           | [`useRadioGroup` &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/field/useRadioGroup)       |                                                                                                   |

:::note
There is no need to use `metaData` for sorting, pagination, and, filters. Sorting, pagination, and, filters will be handled automatically by the strapi-v4 dataProvider.
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

<InstallPackagesCommand args="@pankod/refine-strapi-v4"/>

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks, or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package.
:::

## Usage

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
//highlight-next-line
import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router-v6";

const App: React.FC = () => {
  return (
    <Refine
      authProvider={authProvider}
      //highlight-next-line
      dataProvider={DataProvider("API_URL")}
      routerProvider={routerProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
    />
  );
};
```

## API Parameters

Let's examine how API parameters that come with Strapi-v4 are used with `metaData`. Then, let's see how it is used in the application.

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

To select only some fields, we must specify these fields with `metaData``.

[Refer to the Fields Selection documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#fields-selection)

```tsx title="Get only id and title of all posts"
const { tableProps } = useTable<IPost>({
  metaData: {
    fields: ["id", "title"],
  },
});
```

```tsx title="Get all fields of all posts(id, title, category, content ...)"
const { tableProps } = useTable<IPost>({
  metaData: {
    fields: "*",
  },
});
```

When sending the request, we can specify which fields will come, so we send `fields` in `metaData` to hooks that we will fetch data from. In this way, you can perform the queries of only the fields you want.

```tsx title="PostList.tsx"
import { useState } from "react";
import { IResourceComponentsProps } from "@pankod/core";
import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  FilterDropdown,
  Select,
  useSelect,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IPost>({
    metaData: {
      // highlight-start
      fields: ["id", "title"],
      // highlight-end
    },
  });

  return (
    <List>
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
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter={{ multiple: 3 }}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter={{ multiple: 2 }}
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

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/selection.png" alt="Fields Selection Metadata" />

### Relations Population

By default, relations are not populated when fetching entries.

The `populate` parameter is used to define which fields will be populated.

[Refer to the Relations Population documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/populating-fields.html#population)

```tsx title="Get all the posts and populate the selected relations"
const { tableProps } = useTable<IPost>({
  metaData: {
    populate: ["category", "cover"],
  },
});
```

```tsx title="Get all posts and populate all their first-level relations"
const { tableProps } = useTable<IPost>({
  metaData: {
    populate: "*",
  },
});
```

It should be noted that Strapi-V4 allows populating relations more than 1 level.

```tsx title="Get all posts and populate one second-level relation and first-level relation"
const { tableProps } = useTable<IPost>({
  metaData: {
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

In order to pull the `categories` related to the posts, we can now show the categories in our list by defining the `metaData` `populate` parameter.

```tsx title="PostList.tsx"
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  FilterDropdown,
  Select,
  useSelect,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IPost>({
    metaData: {
      fields: ["id", "title"],
      // highlight-start
      populate: ["category"],
      // highlight-end
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
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter={{ multiple: 3 }}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter={{ multiple: 2 }}
        />
        //highlight-start
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
        //highlight-end
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

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/category.png" alt="category" />

##### Relations Population for `/me` request

If you need to the population for the `/me` request you can use it like this in your `authProvider`.

```tsx
const strapiAuthHelper = AuthHelper(API_URL + "/api");

strapiAuthHelper.me("token", {
  metaData: {
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
  metaData: {
    publicationState: "preview",
  },
});
```

We can list the posts separately according to the `published` or `draft` information.

```tsx title="PostList"
// highlight-next-line
import { useState } from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  FilterDropdown,
  Select,
  useSelect,
  DateField,
  Space,
  EditButton,
  DeleteButton,
  // highlight-start
  Form,
  Radio,
  Tag,
  // highlight-end
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  // highlight-start
  const [publicationState, setPublicationState] = useState("live");
  // highlight-end

  const { tableProps, sorter } = useTable<IPost>({
    metaData: {
      fields: ["id", "title"],
      populate: ["category"],
      // highlight-start
      publicationState,
      // highlight-end
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <List>
      //highlight-start
      <Form
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
      //highlight-end
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
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter={{ multiple: 3 }}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
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
        //highlight-start
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
        //highlight-end
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

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/publication.gif" alt="publication" />

<br/>

### Locale

:::tip
To fetch content for a locale, make sure it has been already [added to Strapi in the admin panel](https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#configuring-internationalization-locales)
:::

[Refer to the Locale documentation for detailed information. →](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#locale)

```tsx
const { tableProps } = useTable<IPost>({
  metaData: {
    locale: "de",
  },
});
```

With the local parameter feature, we can fetch posts and categories created according to different languages.

```tsx
import { useState } from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  FilterDropdown,
  Select,
  useSelect,
  Space,
  EditButton,
  DeleteButton,
  Form,
  Radio,
  Tag,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
  //highlight-start
  const [locale, setLocale] = useState("en");
  //highlight-end
  const [publicationState, setPublicationState] = useState("live");

  const { tableProps, sorter } = useTable<IPost>({
    metaData: {
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
    metaData: { locale },
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
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter={{ multiple: 3 }}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
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

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/strapi-v4/locale.gif" alt="locale" />
<br/>

## `metaData` Usages

When creating and editing posts you can use these API parameters in `metaData`:

```tsx
const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
  metaData: { publicationState: "preview" },
});
```

```tsx title="EditList.tsx"
const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
  metaData: { populate: ["category", "cover"] },
});
```

```tsx title="CreateList.tsx"
const { selectProps } = useSelect({
  metaData: { locale: "en" },
});
```

## Example

:::note Demo Credentials
Username: demo@refine.dev

Password: demodemo
:::

<CodeSandboxExample path="data-provider-strapi-v4" />
