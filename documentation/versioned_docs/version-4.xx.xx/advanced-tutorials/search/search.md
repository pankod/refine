---
id: search
title: "Implementing Search Guide | Refine v4 Search Functionality"
display_title: "Search"
sidebar_label: "Search"
description: "Learn the best practices for implementing global and resource-specific search features in your Refine v4 React applications."
---

We will create a `<Header>` component for your application with Ant Design's [`<AutoComplete>`](https://ant.design/components/auto-complete) component.
We will now examine how to search within the application with this component.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/search/search.gif" alt="search" />
<br/>

To do this, let's first create our `<Header>` component.

```tsx title="src/components/header.tsx"
import { Layout, AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const Header: React.FC = () => {
  return (
    <Layout.Header
      style={{
        padding: "0px 24px",
        backgroundColor: "#FFF",
      }}
    >
      <AutoComplete
        style={{ width: "100%", maxWidth: "550px" }}
        filterOption={false}
      >
        <Input
          size="large"
          placeholder="Search posts or categories"
          suffix={<SearchOutlined />}
        />
      </AutoComplete>
    </Layout.Header>
  );
};
```

We created the `<Header>` component as we want it to appear. We have not done anything for any search process at this stage. We just created the UI.

<br />

:::note

Let's not forget to pass the `<Header>` component to the `<Layout>` component in `App.tsx` as below.

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";

import "@refinedev/antd/dist/reset.css";

// highlight-next-line
import { Header } from "components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      dataProvider={dataProvider(API_URL)}
      /* ... */
    >
      <Layout Header={Header}>{/* ... */}</Layout>
    </Refine>
  );
};

export default App;
```

:::

Now let's get our [`<AutoComplete>`](https://ant.design/components/auto-complete) input ready to search. So, let's fetch our posts according to the value entered in our input.

To fetch more than one record, we will use the [`useList`](/core/docs/data/hooks/use-list) data hook, and we will filter and fetch this data according to the search value.

Before we start, let's create the interfaces of our [`<AutoComplete>`](https://ant.design/components/auto-complete)'s `options` property and the post source.

```ts title="src/interfaces/index.d.ts"
export interface IPost {
  id: number;
  title: string;
}

export interface ICategory {
  id: number;
  title: string;
}

export interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

export interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}
```

```tsx title="src/components/header.tsx"
import { useState, useEffect } from "react";
import { useList } from "@refinedev/core";
import { Layout, AutoComplete, Input, Icons, Typography } from "antd";
import routerProvider from "@refinedev/react-router";

const { Link } = routerProvider;
const { Text } = Typography;
const { SearchOutlined } = Icons;

import { IOptions, IPost } from "interfaces";

// To be able to customize the option title
const renderTitle = (title: string) => {
  return (
    <Text strong style={{ fontSize: "16px" }}>
      {title}
    </Text>
  );
};

// To be able to customize the option item
const renderItem = (title: string, resource: string, id: number) => {
  return {
    value: title,
    label: (
      <Link to={`/${resource}/show/${id}`}>
        <Text>{title}</Text>
      </Link>
    ),
  };
};

export const Header: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<IOptions[]>([]);

  const { refetch: refetchPosts } = useList<IPost>({
    resource: "posts",
    filters: [{ field: "title", operator: "contains", value }],
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const postOptionGroup = data.data.map((item) =>
          renderItem(item.title, "posts", item.id),
        );
        if (postOptionGroup.length > 0) {
          setOptions([
            {
              label: renderTitle("Posts"),
              options: postOptionGroup,
            },
          ]);
        }
      },
    },
  });

  useEffect(() => {
    setOptions([]);
    refetchPosts();
  }, [value]);

  return (
    <Layout.Header
      style={{
        padding: "0px 24px",
        backgroundColor: "#FFF",
      }}
    >
      <AutoComplete
        style={{ width: "100%", maxWidth: "550px" }}
        filterOption={false}
        options={options}
        onSearch={(value: string) => setValue(value)}
      >
        <Input
          size="large"
          placeholder="Search posts or categories"
          suffix={<SearchOutlined />}
        />
      </AutoComplete>
    </Layout.Header>
  );
};
```

We created states to dynamically manage the `value` and `options` properties of the [`<AutoComplete>`](https://ant.design/components/auto-complete) component. The [`useList`](/core/docs/data/hooks/use-list) hook is triggered whenever the value changes. Likewise, the filter used to fetch the data is updated each time the value changes.

<br />

Search value is currently only searched and fetched inside posts. Let's update our code to search both posts and categories according to the search value.

```tsx title="src/components/header.tsx"
...
export const Header: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<IOptions[]>([]);

    const { refetch: refetchPosts } = useList<IPost>({
        resource: "posts",
        filters: [{ field: "title", operator: "contains", value }],
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const postOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "posts", item.id),
                );
                if (postOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions
                        {
                            label: renderTitle("Posts"),
                            options: postOptionGroup,
                        },
                    ]);
                }
            },
        },
    });

    const { refetch: refetchCategories } = useList<ICategory>({
        resource: "categories",
        filters: [{ field: "q", operator: "contains", value }],
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const categoryOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "categories", item.id),
                );
                if (categoryOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Categories"),
                            options: categoryOptionGroup,
                        },
                    ]);
                }
            },
        },
    });

    useEffect(() => {
        setOptions([]);
        refetchPosts();
        refetchCategories();
    }, [value]);

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 24px",
                backgroundColor: "#FFF",
            }}
        >
            ...
        </AntdLayout.Header>
    );
};
```

:::tip

By doing the same implementation on your other resources, you can search for more than one resource with a value.

:::

## Example

<CodeSandboxExample path="search" />
