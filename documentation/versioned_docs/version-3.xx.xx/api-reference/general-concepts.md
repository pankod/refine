---
id: general-concepts
title: General Concepts
---

- **refine** core is fully independent of UI. So you can use core components and hooks without any UI dependency.
- All the **data** related hooks([`useTable`](/core/docs/3.xx.xx/api-reference/core/hooks/useTable/), [`useForm`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm), [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList) etc.) of **refine** can be given some common properties like `resource`, `metaData`, `queryOptions` etc.

### `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how `resource` are handled.

How does refine know what the resource value is?

1- The resource value is determined from the active route where the component or the hook is used.

Like below, if you are using the hook in the `<PostList>` component, the `resource` value defaults to `"posts"`.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostList } from "pages/posts/list.tsx";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          list: PostList,
        },
      ]}
    />
  );
};

export default App;
```

2- The resource value is determined from the `resource` prop of the hook.

You can override the default `resource` value hook by passing the `resource` prop to the hook like below:

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";

const PostList: React.FC = () => {
  const result = useTable({
    //highlight-next-line
    resource: "users",
  });

  return <div>...</div>;
};
```

How can I request an API with nested route?

<br/>

[Refer to how to use resource with nested routes documentation for more information. &#8594](/faq.md#how-can-i-request-an-api-with-nested-route)

### `metaData`

`metaData` is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON).

How to use `metaData` to pass additional information to data provider methods?

```tsx
useOne({
    resource: "posts",
    id: 1,
    // highlight-start
    metaData: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    ...
    getOne: async ({ resource, id, metaData }) => {
        // highlight-next-line
        const headers = metaData?.headers ?? {};
        const url = `${apiUrl}/${resource}/${id}`;

        //highlight-next-line
        const { data } = await httpClient.get(url, { headers });

        return {
            data,
        };
    },
    ...
};
```

In the above example, we pass the `headers` property in the `metaData` object to the `getOne` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

[Refer to the how to pass `metaData` to your existing `dataProvider` methods. &#8594](/faq.md#how-i-can-override-specific-function-of-data-providers)

[Refer to the `GraphQL` guide to learn how to use `metaData` to create GraphQL queries. &#8594](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/)
