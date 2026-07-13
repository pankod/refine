---
id: faq
title: FAQ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

<Tabs
defaultValue="core"
values={[
{label: 'Core Form', value: 'core'},
{label: 'Ant Design Form', value: 'antd'},
{label: 'React Hook Form', value: 'react-hook-form'}
]}>
<TabItem value="core">

```tsx
import React, { useState } from "react";
import { useForm } from "@pankod/refine-core";

export const UserCreate: React.FC = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();

  const { onFinish } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    const fullName = `${name} ${surname}`;
    onFinish({
      fullName: fullName,
      name,
      surname,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setName(e.target.value)} />
      <input onChange={(e) => setSurname(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

</TabItem>
<TabItem value="antd">

```tsx
import React from "react";
import { useForm, Form, Input } from "@pankod/refine-antd";

export const UserCreate: React.FC = () => {
  const { formProps } = useForm();

  return (
    <Form
      {...formProps}
      onFinish={(values) => {
        const { name, surname } = values;
        const fullName = `${name} ${surname}`;

        return (
          formProps.onFinish &&
          formProps.onFinish({
            ...values,
            fullName,
          })
        );
      }}
    >
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Surname" name="surname">
        <Input />
      </Form.Item>
    </Form>
  );
};
```

</TabItem>
<TabItem value="react-hook-form">

```tsx
import React from "react";
import { useForm } from "@pankod/refine-react-hook-form";

export const UserCreate: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleSubmitPostCreate = (values) => {
    const { name, surname } = values;
    const fullName = `${name} ${surname}`;
    onFinish({
      ...value,
      fullName,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitPostCreate)}>
      <input {...register("name")} />
      <input {...register("surname")} />
    </form>
  );
};
```

</TabItem>
</Tabs>

## How can I refetch data?

**Refine** automatically invalidates the affected resources after mutations. However, in some cases you may want to refetch manually.

<Tabs
defaultValue="refetch"
values={[
{label: 'React Query Refetch', value: 'refetch'},
{label: 'useInvalidate Hook', value: 'useinvalidate'},
]}>
<TabItem value="refetch">

```tsx
import { useTable, useForm, useShow } from "@pankod/refine-core";

// All "data" related hooks provided by Refine can use queryResult' refetch function
const { tableQueryResult: { refetch } } = useTable();
const { queryResult: { refetch } } = useForm();
...
...
const { queryResult: { refetch } } = useShow();
...
...
```

</TabItem>
<TabItem value="useinvalidate">

```tsx
import { useInvalidate } from "@pankod/refine-core";

const invalidate = useInvalidate();

// To invalidate the list and many states of the Posts resource
invalidate({
  resource: "posts",
  invalidates: ["list", "many"],
});

// To invalidate the state of a Posts with an id of 1
invalidate({
  resource: "posts",
  invalidates: ["detail"],
  id: 1,
});

// To invalidate the list and many states of the Posts resource of the dataProvider named "second-data-provider"
invalidate({
  resource: "posts",
  dataProviderName: "second-data-provider",
  invalidates: ["list"],
});

// To invalidate all states of dataprovider named "second-data-provider"
invalidate({
  dataProviderName: "second-data-provider",
  invalidates: ["all"],
});
```

[Refer to the **refine** useInvalidate hook documentation for more information. →](/core/docs/3.xx.xx/api-reference/core/hooks/invalidate/useInvalidate)

</TabItem>
</Tabs>

## How can I request an API with nested route?

**Refine**'s way of doing this is with the `resource` property on all data hooks. You can think of the `resource` property as the URL.

For example, If you want to make a request of the URL `/user/1/posts`.

```tsx
import { useTable, useOne } from "@pankod/refine-core";

useTable({
  resource: "/users/1/posts",
});
```

## How can I ensure a query is only run after a certain variable is available and not on load?

Note that `data` related hooks (`useMany`, `useOne`, etc.) can also accept all `useQuery` options, which allows you to implement dependent queries whereby a query is only run after a certain data is available. This is particularly useful if you want `useMany` to only run after a certain data is available and not on load.

[Refer to react-query docs on **dependent queries** for more information → ](https://react-query.tanstack.com/guides/dependent-queries)

- Suppose you want this query to run after `categoryIds` is fetched by a preceding query, you can set `enabled` to `categoryIds.length > 0`. This will ensure that `useMany` is only run after `categoryIds` is fetched.

```tsx
useMany({
  resource: "categories",
  ids: categoryIds,
  // highlight-next-line
  queryOptions: { enabled: categoryIds.length > 0 },
});
```

## Can I work with JavaScript?

**Yes!** You can work with JavaScript!

[Refer to **Refine JavaScript** example → ](https://github.com/refinedev/refine/tree/v3/examples/with-javascript)

## How I can override specific function of Data Providers?

In some cases, you may need to override functions of Refine data providers. The simplest way to do this is to use the [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

For example, Let's override the `update` function of the [`@pankod/refine-simple-rest`](https://github.com/refinedev/refine/tree/v3/packages/simple-rest). `@pankod/refine-simple-rest` uses the `PATCH` HTTP method for `update`, let's change it to `PUT` without forking the whole data provider.

```tsx
import dataProvider from "@pankod/refine-simple-rest";

const simpleRestProvider = dataProvider("API_URL");
const myDataProvider = {
  ...simpleRestProvider,
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.put(url, variables);

    return {
      data,
    };
  },
};

<Refine dataProvider={myDataProvider} />;
```

What if we want to select `PUT` or `PATCH` on a request basis?

💥 We can use `metaData` for this. Remember, `metaData` can be used in all `data`, `form` and `table` hooks

```tsx
// PATCH Request
useUpdate({
  resource: "this-is-patch",
  id: 1,
  variables: {
    foo: "bar",
  },
  metaData: {
    httpMethod: "patch",
  },
});

// PUT Request
useUpdate({
  resource: "this-is-put",
  id: 1,
  variables: {
    foo: "bar",
  },
  metaData: {
    httpMethod: "put",
  },
});

const simpleRestProvider = dataProvider("API_URL");
const myDataProvider = {
  ...simpleRestProvider,
  update: async ({ resource, id, variables, metaData }) => {
    const method = metaData.httpMethod ?? "patch";

    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient[method](url, variables);

    return {
      data,
    };
  },
};
```

## Why are API calls triggering twice

This is the expected behavior if you use [`<React.StrictMode>`][react-strict-mode]. In this mode, React will render the components twice in development mode to identify unsafe life cycles, unexpected side effects, and legacy or deprecated APIs. It's used for highlighting possible problems.

:::caution note

[`<React.StrictMode>`][react-strict-mode] checks are run in development mode only; they do not impact the production build.

:::

> Refer to [`<React.StrictMode>` documentation][react-strict-mode] for more information. &#8594

> Refer to [TanStack Query issue](https://github.com/TanStack/query/issues/3633) for more information. &#8594

[react-strict-mode]: https://beta.reactjs.org/reference/react/StrictMode
