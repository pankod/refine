---
title: "Refine Component Overview | Refine v4 Core"
display_title: "<Refine>"
sidebar_label: "<Refine>"
description: "Learn how the Refine component works in v4 and how it connects routing, auth, data providers, and UI layers in one core setup."
---

`<Refine>` component is the entry point of a Refine app. It is where the highest level of configuration of the app occurs.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

const App = () => (
  <Refine
    dataProvider={dataProvider("https://api.example.com")}
    resources={[
      {
        name: "posts",
        list: "/posts",
      },
    ]}
  />
);
```

## dataProvider <PropTag asterisk />

A [`dataProvider`](/core/docs/data/data-provider) is the place where a Refine app communicates with an API.
Data providers also act as adapters for Refine, making it possible for it to consume different API's and data services.
A [`dataProvider`](/core/docs/data/data-provider) makes HTTP requests and returns response data back using predefined methods.

[Refer to the Data Provider documentation for detailed information. &#8594](/core/docs/data/data-provider)

Multiple data providers can be used with Refine, if you have multiple data providers, you can pass them to the `dataProvider` prop as an object.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { defaultDataProvider, exampleDataProvider } from "./data-providers";

const App = () => (
  <Refine
    dataProvider={{
      // `default` key must be defined to determine the default data provider
      default: defaultDataProvider,
      example: exampleDataProvider,
    }}
  />
);
```

## routerProvider

Refine provides a simple interface from the `routerProvider` prop to infer the resource from route, pass, parse and sync the query parameters and handle navigation operations. This provider and its properties are optional but it is recommended to use it to get the most out of Refine. Bindings to pass to the `routerProvider` prop are provided for the following libraries:

- React Router via `@refinedev/react-router`
- Next.js via `@refinedev/nextjs-router`
- Remix via `@refinedev/remix-router`

It's also possible to create a custom router bindings for your routing needs.

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

:::simple Legacy Router

In prior versions from v4 of Refine, `routerProvider` had a different interface and it was required. This is no longer the case and `routerProvider` is optional. If you want to keep using the legacy router provider, you can use the `legacyRouterProvider` prop instead.

:::

## resources

`resources` is the main building block of a Refine app. A resource represents an entity in an endpoint in the API (e.g. https://api.fake-rest.refine.dev/posts). It serves as a bridge between the data from the API and the pages in the app, allowing pages to interact with the data from the API.

Here's an app that consumes the https://api.fake-rest.refine.dev/posts endpoint as a resource to list multiple items, edit or create an item and show a single item.

Routes for the action pages that are for interacting with the CRUD API operations are passed as a resource element to `resources`.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/json-server";

const App = () => (
  <Refine
    dataProvider={dataProvider("https://api.example.com")}
    // highlight-start
    resources={[
      {
        name: "posts",
        list: "/posts", // Means that the list action of this resource will be available at /posts in your app
        create: "/posts/create", // Means that the create action of this resource will be available at /posts/create in your app
        edit: "/posts/edit/:id", // Means that the edit action of this resource will be available at /posts/edit/:id in your app
        show: "/posts/show/:id", // Means that the show action of this resource will be available at /posts/show/:id in your app
      },
    ]}
    // highlight-end
  />
);
```

:::simple Accessing the Resource

You can use [useResource](/core/docs/routing/hooks/use-resource) hook to get the current active resource by the route or you can pass the `name` or the `identifier` of a resource to the `useResource` hook to get the resource object.

:::

### name <PropTag asterisk />

A string value that identifies a resource in the API. Interacting with the data in a resource will be done using an endpoint determined by the `name`:

```
https://api.fake-rest.refine.dev/posts
https://api.fake-rest.refine.dev/posts/1
```

### identifier

The `identifier` value serves as the main matching key for a resource. It allows you to effectively differentiate between multiple resources that share the same `name`.

There are scenarios where you may have multiple resources with the same `name` but different `meta` values. For instance, you might want a `posts` resource utilizing the default data provider and another `posts` resource utilizing the "typicode" data provider. In this case, you can use the `identifier` to differentiate between them.

```tsx
import { Refine } from "@refinedev/core";

<Refine
    ...
    dataProvider={{
        default: defaultDataProvider,
        typicode: typicodeDataProvider,
    }}
    resources={[
        {
            name: "posts",
            identifier: "posts",
            meta: {
                foo: "bar",
            },
        },
        {
            name: "posts",
            identifier: "featured-posts",
            meta: {
                foo: "baz",
                filter: {
                    featured: true,
                },
                dataProviderName: "typicode",
            },
        },
    ]}
>
...
</Refine>;
```

As you can see in the example above, we have two resources with the same `name` but different `identifier` values. Also, both resources have different `meta` values. Using the `identifier`, we can differentiate between the two resources like so:

```tsx
import { useTable } from "@refinedev/core";

useTable({
  resource: "featured-posts",
});

const typicodeDataProvider = {
  //...
  getList: async ({ resource, meta }) => {
    console.log(resource); // "posts"
    console.log(meta); // { foo: "baz", filter: { featured: true } }
  },
  //...
};
```

### list

The list path of the resource. The value assigned to the `list` will be treated as the `list` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

### create

The create path of the resource. The value assigned to the `create` will be treated as the `create` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}/create`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

### edit

The edit path of the resource. The value assigned to the `edit` will be treated as the `edit` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}/edit/:id`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

### show

The show path of the resource. The value assigned to the `show` will be treated as the `show` action path for the resource and the navigation operations will be performed on this path.

You can also pass a component to this property. In this case the default value for the path will be used, which is the `/${name}/show/:id`.

There's also a third option, which is to pass an object with the `component` and `path` properties. This allows you to customize the path of the list action.

:::simple Action definitions

- Additional parameters can also be used in the paths for the actions of the resources. Paths like `/:authorId/posts/:id/details` are also valid and supported. When these actions are used in the navigation helpers, the existing parameters from the URL and the `meta` property of these functions will be used to determine the additional parameters when composing the path.

- Passing a component or an object to the action will only take effect if the RefineRoutes component from one of the [Router Packages](/core/docs/guides-concepts/routing/#router-integrations) is used in the app to render the routes.

- When using the legacy router provider, only the component values will be used. Custom paths are not supported.

:::

### meta

`meta` can have any kind of property. It is used to store additional information about the resource. This property you pass can be received from the [useResource](/core/docs/routing/hooks/use-resource). Listed below are the properties that are used by Refine or its libraries.

#### label

Name to show in the menu. The plural form of the resource name is shown by default.

```tsx
<Refine
  resources={[
    {
      /* ... */
      // highlight-next-line
      meta: { label: "custom" },
    },
  ]}
/>
```

#### icon

An icon element can be passed as properties for the icon in the menu.

```tsx
<Refine
  resources={[
    {
      /* ... */
      // highlight-next-line
      meta: { icon: <CustomIcon /> },
    },
  ]}
/>
```

#### canDelete

This value is used by the Crud views to determine whether to show the delete button or not.

```tsx
<Refine
  resources={[
    {
      /* ... */
      // highlight-next-line
      meta: { canDelete: true },
    },
  ]}
/>
```

#### parent

You can set this value if you want to nest your resource into another resource. Usually this value represents the name of the parent resource but you can also pass a custom string. In this case, it will still be interpreted as a parent resource. This value is used by the `useMenu` and `useBreadcrumb` hooks.

```tsx
<Refine
  resources={[
    { name: "parent" },
    {
      name: "child",
      // highlight-next-line
      meta: { parent: "parent" },
    },
  ]}
/>
```

#### dataProviderName

Default data provider name to use for the resource. If not specified, the default data provider will be used.

```tsx
<Refine
  dataProvider={{
    default: defaultDataProvider,
    typicode: typicodeDataProvider,
  }}
  resources={[
    {
      /* ... */
      // highlight-next-line
      meta: { dataProviderName: "typicode" },
    },
  ]}
/>
```

#### hide

Can be used to hide a `resource` in `Sider`. This resource is also filtered in the `useMenu` hook.

```tsx
<Refine
  resources={[
    {
      /* ... */
      // highlight-next-line
      meta: { hide: true },
    },
  ]}
/>
```

#### ~~route~~ <PropTag deprecated />

Custom route name for the resource.

## authProvider

`authProvider` handles authentication logic like login, logout flow, and checking user credentials. It is an object with methods that Refine uses when necessary.

[Refer to Auth Provider documentation for detailed information. &#8594](/core/docs/authentication/auth-provider)

## i18nProvider

The `i18nProvider` property lets you add i18n support to your app. Making you able to use any i18n framework.

[Refer to i18n documentation for detailed information. &#8594](/core/docs/i18n/i18n-provider)

## accessControlProvider

`accessControlProvider` is the entry point for implementing access control for Refine apps.

[Refer to access control documentation for detailed information. &#8594](/core/docs/authorization/access-control-provider)

## liveProvider

Refine lets you add Realtime support to your app via `liveProvider`. It can be used to update and show data in Realtime throughout your app.

[Refer to live provider documentation for detailed information. &#8594](/core/docs/realtime/live-provider)

## notificationProvider

`notificationProvider` handles notification logic. It is an object with methods that Refine uses when necessary.

[Refer to the Notification Provider documentation for detailed information. &#8594](/core/docs/notification/notification-provider)

## options

`options` is used to configure the app.

### disableServerSideValidation

When the `dataProvider` returns rejected promise with [`errors`][http-error] field, the `useForm` hook will set the [`errors`][http-error] state with the `errors` returned from the `dataProvider`.

[Refer to Server Side Validation section of the Forms guide for detailed information. &#8594](/core/docs/guides-concepts/forms/#server-side-validation-)

To disable this behavior, you can set the `disableServerSideValidation` option to `true`.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

const App = () => (
  <Refine
    // highlight-start
    options={{ disableServerSideValidation: true }}
    // highlight-end
  >
    {/* ... */}
  </Refine>
);
```

### breadcrumb

Customize or disable the breadcrumb. By default it uses the Breadcrumb component from the respective package.

[Refer to the Layouts and Menus section of UI Libraries guide for further information. &#8594](/core/docs/guides-concepts/ui-libraries/#layouts-and-menus)

```tsx title="App.tsx"
import { Breadcrumb } from "@refinedev/antd";

const App = () => (
  <Refine
    // highlight-start
    options={{
      // Or you can pass `false` to disable the breadcrumbs
      breadcrumb: (
        <div
          style={{
            padding: "3px 6px",
            border: "2px dashed cornflowerblue",
          }}
        >
          <Breadcrumb />
        </div>
      ),
    }}
    // highlight-end
  />
);
```

### mutationMode

`mutationMode` determines which mode the mutations run with. (e.g. useUpdate, useDelete).

```tsx title="App.tsx"
const App = () => (
  <Refine
    // highlight-next-line
    options={{ mutationMode: "optimistic" }}
  />
);
```

`pessimistic`: The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfully. This is the default setting.

`optimistic`: The mutation is applied locally, and redirection and UI updates are executed immediately as if the mutation is successful. If the mutation returns with an error, UI updates accordingly.

`undoable`: The mutation is applied locally, and redirection and UI updates are executed immediately as if the mutation is successful. Waits for a customizable amount of timeout before mutation is applied. During the timeout, mutation can be canceled from the notification with the ?undo? button. UI will revert accordingly.

[Refer to the Mutation Mode docs for further information. &#8594](/core/docs/guides-concepts/forms/#mutation-modes-)

### undoableTimeout

The duration of the timeout period in **undoable** mode is shown in milliseconds. Mutations can be canceled during this period. This period can also be set on the supported data hooks.
The value set in hooks will override the value set with `undoableTimeout`.
`undoableTimeout` has a default value of `5000`.

```tsx title="App.tsx"
const App = () => (
  <Refine
    // highlight-next-line
    options={{ mutationMode: "undoable", undoableTimeout: 3500 }}
  />
);
```

### syncWithLocation

List query parameter values can be edited manually by typing directly in the URL.
`syncWithLocation`'s default value is `false`, so you need to set it to `true` to activate the feature.

Form hooks like `useDrawerForm` and `useModalForm` also have a `syncWithLocation` property but the value of this option has no effect on these hooks. You'll still need to set the `syncWithLocation` property in hooks to `true` to activate this feature.

When `syncWithLocation` is active, the URL on the listing page shows query parameters like those shown below:

```
/posts?current=1&pageSize=8&sort[]=createdAt&order[]=desc
```

Users can change the current page, items count per page, and sort and filter parameters.

### warnWhenUnsavedChanges

When you have unsaved changes and try to leave the current page, Refine shows a confirmation modal box.
`warnWhenUnsavedChanges`'s default value is `false`, so you need to set it to `true` to activate the feature.

This feature also **requires** `UnsavedChangesNotifier` component to be mounted. You can import this component from your router package.

<Image className="p-3 object-none" src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/warnwhen.png" />

### liveMode

`liveMode` controls whether to update data automatically or not, with `auto` and `manual` respectively if a related live event is received. The `off` value can be used to avoid creating a subscription all together.

> For more information, refer to the [live provider documentation &#8594](/core/docs/realtime/live-provider#livemode)

### disableTelemetry

Refine implements a simple and transparent telemetry module for collecting usage statistics defined in a very limited scope. This telemetry module is used to improve the Refine experience. You can disable this by setting `disableTelemetry` to `true`.

> For more information, refer to the [Refine telemetry documentation &#8594](/core/docs/further-readings/telemetry)

### redirect

By default, Refine redirects to the `list` page of the resource after a successful form mutation. To change this behavior based on the form [action](/core/docs/data/hooks/use-form/#actions), set `redirect` as follows:

```tsx title="App.tsx"
const App = () => (
  <Refine
    // highlight-start
    options={{
      redirect: {
        // If the resource doesn't have a show page defined, the user will be redirected to the list page.
        afterCreate: "show",
        // If the mutation mode is `undoable` or `optimistic`, the redirect happens before the mutation succeeds. Therefore, if there is no known `id` value, the user will be redirected to the list page.
        afterClone: "edit",
        // If set to `false`, no redirect is performed after a successful form mutation.
        afterEdit: false,
      },
    }}
    // highlight-end
  />
);
```

### reactQuery

#### clientConfig

Config for React Query client that Refine uses.

:::simple Defaults

- `refetchOnWindowFocus`: `false`
- `keepPreviousData`: `true`

:::

```tsx
const App = () => (
  <Refine
    // highlight-start
    options={{
      reactQuery: {
        clientConfig: {
          defaultOptions: {
            queries: {
              staleTime: Infinity,
            },
          },
        },
      },
    }}
    // highlight-end
  />
);
```

Also, you can use your own [QueryClient](https://react-query.tanstack.com/reference/QueryClient#queryclient).

```tsx
import { QueryClient } from "@tanstack/react-query";

const myQueryClient = new QueryClient();

const App = () => (
  <Refine
    // highlight-start
    options={{
      reactQuery: {
        clientConfig: myQueryClient,
      },
    }}
    // highlight-end
  />
);
```

> For more information, refer to the [QueryClient documentation &#8594](https://react-query.tanstack.com/reference/QueryClient#queryclient)

#### ~~devtoolConfig~~ <PropTag deprecated />

React Query Devtools are removed from the `@refinedev/core` and this prop is no longer supported for the configuration of the devtools. You can use the `@tanstack/react-query-devtools` in your app directly to use the devtools. For more information, please check out [FAQ - How to use React Query Devtools with Refine?](/core/docs/guides-concepts/faq/#how-to-use-react-query-devtools-with-refine)

> For more information, refer to the [Devtools documentation &#8594](https://react-query.tanstack.com/devtools#options)

### textTransformers

The `textTransformers` option in Refine is used to transform the resource name displayed on the user interface (UI). By default, if you define a resource named `posts`, Refine will display it as `Posts`. Similarly, when you delete a record, notification messages will be shown as `Post deleted successfully.`.

You have the flexibility to customize these messages by using the `textTransformers` option. For instance, if you wish to disable any transformation, you can set the `textTransformers` option as shown in the example below:

```tsx
const App = () => (
  <Refine
    // ...
    options={{
      textTransformers: {
        humanize: (text) => text,
        plural: (text) => text,
        singular: (text) => text,
      },
    }}
  />
);
```

#### humanize

The function converts the resource name to a more human-readable format. The default value uses the [`humanize-string`](https://www.npmjs.com/package/humanize-string) library.

#### plural

The function converts the resource name to its plural form. The default value uses the [`pluralize`](https://www.npmjs.com/package/pluralize) library.

#### singular

The function converts the resource name to its singular form. The default value uses the [`pluralize`](https://www.npmjs.com/package/pluralize) library.

### overtime

If you want loading overtime for the request, you can use the `overtime` object. It is useful when you want to show a loading indicator when the request takes too long.

```tsx
const App = () => (
  <Refine
    // highlight-start
    options={{
      overtime: {
        enabled: true,
        interval: 1000, // default value is 1000
        onInterval: (elapsedInterval, context) => {
          console.log(elapsedInterval, context);
        },
      },
    }}
    // highlight-end
  />
);
```

#### enabled

If true, the elapsed time will be calculated. If set to false, the elapsed time will always be `undefined`.

#### interval

The interval value in milliseconds. The default value is `1000`.

#### onInterval

The callback function that will be called on every interval. The default value is `undefined`.

The callback function receives two parameters:

- `elapsedInterval`: The elapsed interval in milliseconds.
- `context`: `{ resource?: IResourceItem; resourceName?: string; id?: BaseKey, action?: Action }`

### useNewQueryKeys

With `@refinedev/core`'s `v4.35.0`, Refine introduced new query and mutation keys which are more structured and easy to construct. These keys are used in all data, auth, access control and audit log queries and mutations.

By default, Refine uses the legacy keys for backward compatibility and in the future versions it will switch to using the new query keys. You can easily switch to using new keys by setting `useNewQueryKeys` to `true`.

### title

Refine's predefined layout and auth components displays a title for the app, which consists of the app name and an icon. These values can be customized globally by passing `options.title` to the `<Refine>` component.

`title` is an object that can have the following properties:

- `icon`: A React Node to be used as the app icon. By default, it's Refine logo.
- `text`: A React Node to be used as the app name. By default, it's `"Refine Project"`.

```tsx title="App.tsx"
const App = () => (
  <Refine
    options={{
      // highlight-start
      title: {
        icon: <CustomIcon />,
        text: "Custom App Name",
      },
      // highlight-end
    }}
  />
);
```

If you wish to use separate values for your `<AuthPage />` and `<ThemedLayoutV2 />` components, you can `Title` prop to override the default title component (which is the `<ThemedTitleV2 />` component from the respective package).

```tsx
import { Refine } from "@refinedev/core";
// ThemedTitleV2 accepts `text` and `icon` props with same types as `options.title`
// This component is used in both AuthPage and ThemedLayoutV2 components.
import { ThemedLayoutV2, AuthPage, ThemedTitleV2 } from "@refinedev/antd";

const App = () => {
  return (
    <Refine
      options={{
        // highlight-start
        title: {
          text: "My App",
          icon: <IconA />,
        },
        // highlight-end
      }}
    >
      {/* ... */}
      <ThemedLayoutV2
        // highlight-start
        Title={(props) => (
          <ThemedTitleV2
            // These values will override the global title values
            text="A Different Value"
            icon={<IconB />}
            {...props}
          />
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
      {/* ... */}
      <AuthPage
        type="login"
        // highlight-start
        title={
          <ThemedTitleV2
            collapsed={false}
            // These values will override the global title values
            text="A Different Value"
            icon={<IconC />}
          />
        }
        // highlight-end
      />
    </Refine>
  );
};
```

## onLiveEvent

Callback to handle all live events.

> For more information, refer to the [live provider documentation &#8594](/core/docs/realtime/live-provider#Refine)

## ~~catchAll~~ <PropTag deprecated />

| 🚨 Use the `<CustomErrorPage />` component in your routes instead.

When the app is navigated to a non-existent route, Refine shows a default error page. A custom error component can be used for this error page by passing the customized component to the `catchAll` property:

```tsx title="App.tsx"
// highlight-next-line
const CustomErrorPage = <div>Page not found</div>;

const App = () => (
  <Refine
    // highlight-next-line
    catchAll={CustomErrorPage}
  />
);
```

## ~~LoginPage~~ <PropTag deprecated />

| 🚨 Use the `<AuthPage />` component in your routes instead.

Refine has a default login page form which is served on the `/login` route when the `authProvider` configuration is provided.

Custom login component can be passed to the `LoginPage` property.

```tsx title="App.tsx"
// highlight-next-line
const CustomLoginPage = () => <div> Custom Login Page </div>;

const App = () => (
  <Refine
    // highlight-next-line
    LoginPage={CustomLoginPage}
  />
);
```

## ~~DashboardPage~~ <PropTag deprecated />

| 🚨 Use the `<CustomDashboardPage />` component in your routes instead.

A custom dashboard page can be passed to the `DashboardPage` prop which is accessible on the root route.

The dashboard item will appear at the top of the sider menu. If `DashboardPage` is not given, the first resource of `resources` will be shown.

```tsx title="App.tsx"
// highlight-next-line
const CustomDashboardPage = () => <div> Custom Dashboard Page </div>;

const App = () => (
  <Refine
    // highlight-next-line
    DashboardPage={CustomDashboardPage}
  />
);
```

## ~~ReadyPage~~ <PropTag deprecated />

Refine shows a default ready page on the root route when no `resources` is passed to the `<Refine>`.

Custom ready page component can be set by passing to the `ReadyPage` property?.

```tsx title="App.tsx"
// highlight-next-line
const CustomReadyPage = () => <div> Custom Ready Page </div>;

const App = () => (
  <Refine
    // highlight-next-line
    ReadyPage={CustomReadyPage}
  />
);
```

## ~~Sider~~ <PropTag deprecated />

| 🚨 Use `Sider` prop of `<ThemedLayoutV2 />` component instead.

The default sidebar can be customized by using Refine hooks and passing custom components to the `Sider` property.

> For more information, refer to the [`useMenu` hook documentation &#8594](/core/docs/core/hooks/utilities/use-menu)

## ~~Footer~~ <PropTag deprecated />

| 🚨 Use `Footer` prop of `<ThemedLayoutV2 />` component instead.

The default app footer can be customized by passing the `Footer` property.

```tsx title="App.tsx"
// highlight-next-line
const CustomFooter = () => <div>Custom Footer</div>;

const App = () => (
  <Refine
    // highlight-next-line
    Footer={CustomFooter}
  />
);
```

## ~~Header~~ <PropTag deprecated />

| 🚨 Use `Header` prop of `<ThemedLayoutV2 />` component instead.

```tsx title="App.tsx"
// highlight-next-line
const CustomHeader = () => <div>Custom Header</div>;

const App = () => (
  <Refine
    // highlight-next-line
    Header={CustomHeader}
  />
);
```

## ~~Layout~~ <PropTag deprecated />

| 🚨 Use `<ThemedLayoutV2 />` as children of `<Refine />` instead.

The default layout can be customized by passing the `Layout` property.

Layout property will receive individual layout components as property.

```tsx title="App.tsx"
const App = () => (
  <Refine
    // highlight-start
    Layout={({ children, Sider, Footer, Header, OffLayoutArea }) => (
      <AntdLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
        {Sider && <Sider />}
        <AntdLayout>
          {Header && <Header />}
          <AntdLayout.Content>
            <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
          </AntdLayout.Content>
          {Footer && <Footer />}
        </AntdLayout>
        {OffLayoutArea && <OffLayoutArea />}
      </AntdLayout>
    )}
    // highlight-end
  />
);
```

A completely custom layout can also be implemented instead of the Refine's default:

```tsx title="App.tsx"
const App = () => (
  <Refine
    // highlight-start
    Layout={({ children }) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>Custom Layout</div>
        <div>{children}</div>
      </div>
    )}
    // highlight-end
  />
);
```

## ~~OffLayoutArea~~ <PropTag deprecated />

| 🚨 Use `OffLayoutArea` prop of `<ThemedLayoutV2 />` component instead.

The component wanted to be placed out of the app layout structure can be set by passing to the `OffLayoutArea` prop.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

const App = () => (
  <Refine
    // highlight-next-line
    OffLayoutArea={() => <div>Some elements to place outside the layout</div>}
  />
);
```

## ~~Title~~ <PropTag deprecated />

| 🚨 Use `Title` prop of `<ThemedLayoutV2 />` component instead.

The app title can be set by passing the `Title` property.

```tsx title="App.tsx"
// highlight-start
const CustomTitle = ({ collapsed }) => (
  <div>{collapsed ? "Collapsed Title" : "Full Title"}</div>
);
// highlight-end

const App = () => (
  <Refine
    // highlight-next-line
    Title={CustomTitle}
  />
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/Refine"/>

[routerprovider]: /core/docs/routing/router-provider
[http-error]: /core/docs/core/interface-references#httperror
