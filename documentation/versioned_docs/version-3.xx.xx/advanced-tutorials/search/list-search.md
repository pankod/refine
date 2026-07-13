---
id: list-search
title: List Search
---

We will examine how to make an extensive search and filtering with the [`useSimpleList`](/core/docs/3.xx.xx/api-reference/antd/hooks/list/useSimpleList) hook that works with the Ant Design's [`<List>`](https://ant.design/components/list) component.

To do this, let's list posts using the posts resource.

```tsx title="pages/posts/list.tsx"
import { useMany } from "@pankod/refine-core";
import {
  List,
  // highlight-next-line
  useSimpleList,
  AntdList,
  Typography,
  Space,
  NumberField,
} from "@pankod/refine-antd";

const { Text } = Typography;

export const PostList: React.FC = () => {
  // highlight-next-line
  const { listProps } = useSimpleList<IPost>();

  const categoryIds =
    listProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const renderItem = (item: IPost) => {
    const { title, hit, content } = item;

    const categoryTitle = data?.data.find(
      (category: ICategory) => category.id === item.category.id,
    )?.title;

    return (
      <AntdList.Item
        actions={[
          <Space key={item.id} direction="vertical" align="end">
            <NumberField
              value={hit}
              options={{
                notation: "compact",
              }}
            />
            <Text>{categoryTitle}</Text>
          </Space>,
        ]}
      >
        <AntdList.Item.Meta title={title} description={content} />
      </AntdList.Item>
    );
  };

  return (
    <List>
      // highlight-next-line
      <AntdList {...listProps} renderItem={renderItem} />
    </List>
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
  hit: number;
  category: { id: number };
}
```

After creating the `<PostList>` component, add it to the resource with `list` prop:

```tsx
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/reset.css";

// highlight-next-line
import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
      // highlight-start
      resources={[
        {
          name: "posts",
          list: PostList,
        },
      ]}
      //highlight-end
    />
  );
};

export default App;
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/list-search/basic-list.png" alt="basic list" />
<br />

We will create a form by extracting `searchFormProps` from [`useSimpleList`](/core/docs/3.xx.xx/api-reference/antd/hooks/list/useSimpleList). We will use this form for search/filtering. We will also create an interface to determine the types of values from the form.

```tsx title="pages/posts/list.tsx"
...

import {
    ...
// highlight-next-line
    CrudFilters,
} from "@pankod/refine-core";

export const PostList: React.FC = () => {
// highlight-start
    const { listProps, searchFormProps } = useSimpleList<
        IPost,
        IPostFilterVariables
    >({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { category, createdAt } = params;

            filters.push(
                {
                    field: "category.id",
                    operator: "eq",
                    value: category,
                },
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt ? createdAt[0].toISOString() : undefined,
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt ? createdAt[1].toISOString() : undefined,
                },
            );

            return filters;
        },
    });
// highlight-end

    // ...

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
// highlight-start
            <Form
                {...searchFormProps}
                layout="vertical"
                onValuesChange={() => searchFormProps.form?.submit()}
            >
                <Space wrap>
                    <Form.Item label="Category" name="category">
                        <Select
                            {...categorySelectProps}
                            allowClear
                            placeholder="Search Categories"
                        />
                    </Form.Item>
                    <Form.Item label="Created At" name="createdAt">
                        <RangePicker />
                    </Form.Item>
                </Space>
            </Form>
            <AntdList {...listProps} renderItem={renderItem} />
// highlight-end
        </List>
    );
};

interface IPostFilterVariables {
    category: string;
    createdAt: [Dayjs, Dayjs];
}
```

When the form is submitted, the `onSearch` method runs and we get the search form values. Then the `listProps` is refreshed according to the criteria.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/list-search/form-list.png" alt="form list" />

<br />

:::caution
[`CrudFilters`](/core/docs/3.xx.xx/api-reference/core/interfaces#crudfilters) type object has `field`, `operator`, and `value` properties. These properties help us to filter in which field, with which operator, and with which data.
:::

## Example

<CodeSandboxExample path="use-simple-list-antd" />
