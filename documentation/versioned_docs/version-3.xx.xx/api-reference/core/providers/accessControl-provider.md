---
id: accessControl-provider
title: Access Control Provider
sidebar_label: Access Control Provider
---

Access control is a broad topic where there are lots of advanced solutions that provide different set of features. **refine** is deliberately agnostic for its own API to be able to integrate different methods (RBAC, ABAC, ACL, etc.) and different libraries ([Casbin](https://casbin.org/), [CASL](https://casl.js.org/v5/en/), [Cerbos](https://cerbos.dev/), [AccessControl.js](https://onury.io/accesscontrol/)). `can` method would be the entry point for those solutions.

**refine** provides an agnostic API via the `accessControlProvider` to manage access control throughout your app.

An `accessControlProvider` must implement only one async method named `can` to be used to check if the desired access will be granted.

`can` must have the interface:

```ts
type CanParams = {
    resource: string;
    action: string;
    params?: {
        resource?: IResourceItem;
        id?: BaseKey;
        [key: string]: any;
    };
};

type CanReturnType = {
    can: boolean;
    reason?: string;
}

const accessControlProvider = {
    can: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
}
```

> `*`: Too see &#8594 [`IResourceItem`][iresourceitem], [`BaseKey`][basekey], [`CanParams`][canparams], [`CanReturnType`][canreturntype]

## Usage

A basic example looks like:

```tsx
const App: React.FC = () => {
  <Refine
    // other providers and props
    accessControlProvider={{
      can: async ({ resource, action, params }) => {
        if (resource === "posts" && action === "edit") {
          return Promise.resolve({
            can: false,
            reason: "Unauthorized",
          });
        }

        // or you can access directly *resource object
        // const resourceName = params?.resource?.name;
        // const anyUsefulOption = params?.resource?.options?.yourUsefulOption;
        // if (resourceName === "posts" && anyUsefulOption === true && action === "edit") {
        //     return Promise.resolve({
        //         can: false,
        //         reason: "Unauthorized",
        //     });
        // }

        return { can: true };
      },
    }}
  />;
};
```

> `*resource`: &#8594 It returns the resource ([ResourceItemProps][iresourceitem]) object you gave to `<Refine />` component. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

:::tip
You can pass a `reason` along with `can`. It will be accessible using `useCan`. It will be shown at the tooltip of the buttons from **refine** when they are disabled.
:::

:::tip
You can find access control examples made with **refine**

- **Casbin** &#8594 [Source Code](https://github.com/refinedev/refine/tree/v3/examples/access-control-casbin) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/access-control-casbin/?view=preview&theme=dark&codemirror=1)
- **Cerbos** &#8594 [Source Code](https://github.com/refinedev/refine/tree/v3/examples/access-control-cerbos) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/access-control-cerbos/?view=preview&theme=dark&codemirror=1)

:::

**refine** checks for access control in its related components and pages. [Refer here to see all the places **refine** checks for access control.](#list-of-default-access-control-points)

## Hooks and Components

**refine** provides a hook and a component to use the `can` method from the `accessControlProvider`.

### `useCan`

`useCan` uses the `can` as the query function for **react-query**'s `useQuery`. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.

```tsx
const { data } = useCan({
  resource: "resource-you-ask-for-access",
  action: "action-type-on-resource",
  params: { foo: "optional-params" },
});
```

```ts
const useCan: ({
    action,
    resource,
    params,
    queryOptions,
}: CanParams* & {
    queryOptions?: UseQueryOptions<CanReturnType>;
}) => UseQueryResult<CanReturnType*>
```

> `*`: Too see &#8594 [`CanParams`](/core/docs/3.xx.xx/api-reference/core/interfaces#canparams), [`CanReturnType`](/core/docs/3.xx.xx/api-reference/core/interfaces#canreturntype)

### `<CanAccess />`

`<CanAccess />` is a wrapper component that uses `useCan` to check for access control. It takes the parameters that `can` method takes and also a `fallback`. It renders its children if the access control returns true and if access control returns false renders `fallback` if provided.

```tsx
<CanAccess
  resource="posts"
  action="edit"
  params={{ id: 1 }}
  fallback={<CustomFallback />}
>
  <YourComponent />
</CanAccess>
```

## Performance

As the number of points that checks for access control in your app increases the performance of your app may take a hit especially if its access control involves remote endpoints. Caching the access control checks helps a great deal. Since **refine** uses react-query it can be easily done configuring [`staleTime` and `cacheTime`](https://react-query.tanstack.com/reference/useQuery) properties.

```ts
// inside your component

const { data } = useCan({
    resource: "resource-you-ask-for-access",
    action: "action-type-on-resource",
    params: { foo: "optional-params" } },
    queryOptions: {
        staleTime: 5 * 60 * 1000, // 5 minutes
    }
);
```

**refine** uses 5 minutes `cacheTime` and 0 for `staleTime` by default for its own access control points.

## List of Default Access Control Points

### Routes

[`@pankod/refine-nextjs-router`][nextjsrouter], [`@pankod/refine-react-router`][reactrouter], and [`@pankod/refine-react-location`][reactlocation] packages integrate access control for CRUD pages at `[resource]/[action]` and root routes.

They will check access control with parameters:

- dashboard (`/`): `{ resource: "dashboard", action: "list" }`
- list (e.g. `/posts`): `{ resource: "posts", action: "list", params: { *resource } }`
- create (e.g. `/posts/create`): `{ resource: "posts", action: "create", params: { *resource } }`
- clone (e.g. `/posts/clone/1`): `{ resource: "posts", action: "create", params: { id: 1, *resource }}`
- edit (e.g. `/posts/edit/1`): `{ resource: "posts", action: "edit", params: { id: 1, *resource } }`
- show (e.g. `/posts/show/1`): `{ resource: "posts", action: "show", params: { id: 1, *resource } }`

In case access control returns `false` they will show [`cathcAll`][catchall] if provided or a standard error page otherwise.

> `*resource`: &#8594 It returns the resource ([ResourceItemProps][iresourceitem]) object you gave to `<Refine />` component. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

### Sider

Sider is also integrated so that unaccessible resources won't appear in the sider menu.

Menu items will check access control with `{ resource, action: "list" }`

For example if your app has resource `posts` it will be checked with `{ resource: "posts", action: "list" }`

### Buttons

These buttons will check for access control.
Let's say these buttons are rendered where `resource` is `posts` and `id` is `1` where applicable.

- [**List**](/core/docs/3.xx.xx/api-reference/antd/components/buttons/list): `{ resource: "posts", action: "list", params: { *resource } }`
- [**Create**](/core/docs/3.xx.xx/api-reference/antd/components/buttons/create): `{ resource: "posts", action: "create", params: { *resource } }`
- [**Clone**](/core/docs/3.xx.xx/api-reference/antd/components/buttons/clone): `{ resource: "posts", action: "create", params: { id: 1, *resource } }`
- [**Edit**](/core/docs/3.xx.xx/api-reference/antd/components/buttons/edit): `{ resource: "posts", action: "edit", params: { id: 1, *resource } }`
- [**Delete**](/core/docs/3.xx.xx/api-reference/antd/components/buttons/delete): `{ resource: "posts, action: "delete", params: { id: 1, *resource } }`
- [**Show**](/core/docs/3.xx.xx/api-reference/antd/components/buttons/show): `{ resource: "posts", action: "show", params: { id: 1, *resource } }`

> `*resource`: &#8594 It returns the resource ([ResourceItemProps][iresourceitem]) object you gave to `<Refine />` component. This will enable Attribute Based Access Control (ABAC), for example granting permissions based on the value of a field in the resource object.

These buttons will be disabled if access control returns `{ can: false }`

## Example

<CodeSandboxExample path="access-control-casbin" />

[nextjsrouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[reactrouter]: https://www.npmjs.com/package/@pankod/refine-react-router
[reactlocation]: https://www.npmjs.com/package/@pankod/refine-react-location
[catchall]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#catchall
[listbtn]: /core/docs/3.xx.xx/api-reference/antd/components/buttons/list
[iresourceitem]: /core/docs/3.xx.xx/api-reference/core/interfaces#resourceitemprops
[basekey]: /core/docs/3.xx.xx/api-reference/core/interfaces#basekey
[canparams]: /core/docs/3.xx.xx/api-reference/core/interfaces#canparams
[canreturntype]: /core/docs/3.xx.xx/api-reference/core/interfaces#canreturntype
