---
title: "Next.js Guide | Best Practices in Refine v5"
display_title: "Next.js"
sidebar_label: "Next.js"
description: "Learn to implement Next.js in Refine v5. Explore server and route for real-world React admin panels. Hands-on examples included."
---

import { NextJSAppProviderServerClient } from "./provider-client-server";

Refine provides router bindings and utilities for [Next.js](https://nextjs.org/). This package will provide easy integration between Refine and **Next.js** for both existing projects and new projects without giving up the benefits of **Next.js**.

<InstallPackagesCommand args="@refinedev/nextjs-router"/>

We recommend using `create refine-app` to initialize your Refine projects. It configures the project according to your needs including SSR with Next.js!

<CreateRefineAppCommand args="-o refine-nextjs my-refine-nextjs-app" />

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

## Basic Usage

### `/app` Directory

We'll use the `routerProvider` from `@refinedev/nextjs-router` to set up the router bindings for Refine. We'll define the action routes for our resources in the `resources` array and define our pages in the `app` directory.

We'll create four routes for our resources:

- `app/posts/page.tsx` - List page for posts
- `app/posts/show/[id]/page.tsx` - Detail page for posts
- `app/categories/page.tsx` - List page for categories
- `app/categories/show/[id]/page.tsx` - Detail page for categories

And we'll create one route for the index and use it to redirect to the `posts` resource:

- `app/page.tsx` - Index page

Let's start with the initialization of the Refine app in the `app/layout.tsx` file:

```tsx title=app/layout.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";

import { Layout } from "components/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          // highlight-next-line
          routerProvider={routerProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
            },
            {
              name: "categories",
              list: "/categories",
              show: "/categories/show/:id",
            },
          ]}
        >
          {/* We're defining `Layout` here but you might want to have different layouts per your page. */}
          {/* This is totally fine for Refine, you can place your Layout wherever you like. */}
          <Layout>{children}</Layout>
        </Refine>
      </body>
    </html>
  );
}
```

> 🚨 Refer to the [FAQ section](#how-can-i-use-my-providers-in-the-both-server-and-client-side) for instructions on using providers in both client and server components.

:::simple Good to know

- Next.js uses the bracket syntax (`[param]`) for dynamic routes but Refine uses the colon syntax (`:param`) for route parameters. This won't cause any problems since Refine only uses the colon syntax as an indicator for route parameters and the communication between Refine and the router is handled by the `routerProvider` prop.

- Since `<Refine />` is heavily using React context and React state, it's needed to be a client component, and we can't pass functions into the Refine component unless we mark them as `client` functions(dataProvider, authProvider etc.) with `"use client";` directive. See the solution for this in the [FAQ](#how-can-i-use-my-providers-in-the-both-server-and-client-side) section.

:::

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

Refine supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

Now we can create our pages in the `app` directory:

```tsx title=app/posts/page.tsx
"use client";

import { useTable } from "@refinedev/core";
import Link from "next/link";

type IPost = {
  id: string;
  title: string;
  description: string;
};

export default function PostList() {
  // `posts` resource will be inferred from the route.
  // Because we've defined `/posts` as the `list` action of the `posts` resource.
  const {
    result,
    tableQuery: { isLoading },
  } = useTable<IPost>();

  const tableData = result?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ul>
          {tableData?.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/show/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

```tsx title=pages/posts/show/[id]/page.tsx
"use client";

import { useShow } from "@refinedev/core";

type IPost = {
    id: string;
    title: string;
    description: string;
}

export default function PostShow() {
    // `posts` resource and the `id` will be inferred from the route.
    // Because we've defined `/posts/show/:id` as the `show` action of the `posts` resource.
    const { result: post, query: { isLoading } } = useShow<IPost>();

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <h1>{post?.title}</h1>
                <p>{post?.description}</p>
            )}
        </div>
    );
}
```

```tsx title=pages/categories/page.tsx
"use client";

import { useTable } from "@refinedev/core";
import Link from "next/link";

type ICategory = {
  id: string;
  label: string;
};

export default function CategoryList() {
  // `categories` resource will be inferred from the route.
  // Because we've defined `/categories` as the `list` action of the `categories` resource.
  const {
    result,
    tableQuery: { data, isLoading },
  } = useTable<ICategory>();

  const tableData = result?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ul>
          {tableData?.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/show/${category.id}`}>
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

```tsx title=pages/categories/show/[id]/page.tsx
"use client";

import { useShow } from "@refinedev/core";

type ICategory = {
  id: string;
  label: string;
};

export default function CategoryShow() {
  // `categories` resource and the `id` will be inferred from the route.
  // Because we've defined `/categories/show/:id` as the `show` action of the `categories` resource.
  const {
    result: category,
    query: { isLoading },
  } = useShow<ICategory>();

  return (
    <div>
      <h1>{category?.label}</h1>
    </div>
  );
}
```

Now, we'll use [`NavigateToResource`](#navigatetoresource) component to redirect to the `posts` resource when the user visits the home page.

:::simple Implementation Tips

Even though we're using the `NavigateToResource` component, when using Next.js it's better to handle such redirect operations in the server side rather than the client side. You can use the `getServerSideProps` function to redirect the user to the `/posts`.

:::

```tsx title=app/page.tsx
"use client";

import { NavigateToResource } from "@refinedev/nextjs-router";

export default function IndexPage() {
  return <NavigateToResource />;
}
```

### `/pages` Directory

We'll use the `routerProvider` from `@refinedev/nextjs-router` to set up the router bindings for Refine. We'll define the action routes for our resources in the `resources` array and define our pages in the `pages` directory.

We'll create four pages for our resources:

- `pages/posts/index.tsx` - List page for posts
- `pages/posts/show/[id].tsx` - Detail page for posts
- `pages/categories/index.tsx` - List page for categories
- `pages/categories/show/[id].tsx` - Detail page for categories

And we'll create one page for the index route and use it to redirect to the `posts` resource:

- `pages/index.tsx` - Index page

Let's start with the initialization of the Refine app in the `_app.tsx` file:

```tsx title=_app.tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router/pages";

import { Layout } from "components/Layout";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      // highlight-next-line
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
        {
          name: "categories",
          list: "/categories",
          show: "/categories/show/:id",
        },
      ]}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Refine>
  );
}
```

:::simple Good to know

Next.js uses the bracket syntax (`[param]`) for dynamic routes but Refine uses the colon syntax (`:param`) for route parameters. This won't cause any problems since Refine only uses the colon syntax as an indicator for route parameters and the communication between Refine and the router is handled by the `routerProvider` prop.

:::

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

Refine supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

Now we can create our pages in the `pages` directory:

```tsx title=pages/posts/index.tsx
import { useTable } from "@refinedev/core";
import Link from "next/link";

type IPost = {
  id: string;
  title: string;
  description: string;
};

export default function PostList() {
  // `posts` resource will be inferred from the route.
  // Because we've defined `/posts` as the `list` action of the `posts` resource.
  const {
    result,
    tableQuery: { data, isLoading },
  } = useTable<IPost>();

  const tableData = result?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ul>
          {tableData?.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/show/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

```tsx title=pages/posts/show/[id].tsx
import { useShow } from "@refinedev/core";

type IPost = {
    id: string;
    title: string;
    description: string;
}

export default function PostShow() {
    // `posts` resource and the `id` will be inferred from the route.
    // Because we've defined `/posts/show/:id` as the `show` action of the `posts` resource.
    const { result: post, query: { isLoading } } = useShow<IPost>();

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <h1>{post?.title}</h1>
                <p>{post?.description}</p>
            )}
        </div>
    );
}
```

```tsx title=pages/categories/index.tsx
import { useTable } from "@refinedev/core";
import Link from "next/link";

type ICategory = {
  id: string;
  label: string;
};

export default function CategoryList() {
  // `categories` resource will be inferred from the route.
  // Because we've defined `/categories` as the `list` action of the `categories` resource.
  const {
    result,
    tableQuery: { data, isLoading },
  } = useTable<ICategory>();

  const tableData = result?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ul>
          {tableData?.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/show/${category.id}`}>
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

```tsx title=pages/categories/show/[id].tsx
import { useShow } from "@refinedev/core";

type ICategory = {
  id: string;
  label: string;
};

export default function CategoryShow() {
  // `categories` resource and the `id` will be inferred from the route.
  // Because we've defined `/categories/show/:id` as the `show` action of the `categories` resource.
  const {
    result: category,
    query: { isLoading },
  } = useShow<ICategory>();

  return (
    <div>
      <h1>{category?.label}</h1>
    </div>
  );
}
```

Now, we'll use [`NavigateToResource`](#navigatetoresource) component to redirect to the `posts` resource when the user visits the home page.

:::simple Implementation Tips

Even though we're using the `NavigateToResource` component, when using Next.js it's better to handle such redirect operations in the server side rather than the client side. You can use the `getServerSideProps` function to redirect the user to the `/posts`.

:::

```tsx title=pages/index.tsx
import { NavigateToResource } from "@refinedev/nextjs-router/pages";

export default function Home() {
  return <NavigateToResource />;
}
```

## Additional Components

`@refinedev/nextjs-router` package also includes some additional components that can be useful in some cases.

### NavigateToResource

A basic component to navigate to a resource page. It is useful when you want to navigate to a resource page at the index route of your app.

#### In `app/page.tsx`

```tsx title=app/page.tsx
"use client";

import { NavigateToResource } from "@refinedev/nextjs-router";

export default function IndexPage() {
  return <NavigateToResource />;
}
```

#### In `pages/index.tsx`

```tsx title=pages/index.tsx
import { NavigateToResource } from "@refinedev/nextjs-router/pages";

export default function IndexPage() {
  return <NavigateToResource />;
}
```

#### Properties

`resource` (optional) - The name of the resource to navigate to. It will redirect to the first `list` route in the `resources` array if not provided.

`fallbackTo` (optional) - The path to navigate to if no resource is found. If not provided and no resource is found, no navigation will be made.

`meta` (optional) - The meta object to use if the route has parameters in it. The parameters in the current location will also be used to compose the route but `meta` will take precedence.

### UnsavedChangesNotifier

> 🚨 Note that this component currently only works in the `pages` directory due to limitations of the `next/navigation` and missing events.

This component enables the `warnWhenUnsavedChanges` feature of Refine. It will show a warning message when user tries to navigate away from the current page without saving the changes. Also checks for `beforeunload` event to warn the user when they try to close the browser tab or window.

Place this component inside the `<Refine>` components children to enable this feature.

```tsx title=_app.tsx
import { Refine } from "@refinedev/core";
import { UnsavedChangesNotifier } from "@refinedev/nextjs-router/pages";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
    /* ... */
    >
      <Component {...pageProps} />
      {/* highlight-next-line */}
      <UnsavedChangesNotifier />
    </Refine>
  );
}
```

:::info

This feature is not working in `appDir` mode in Next.js due to limitations of the `next/navigation` and missing events.

:::

#### Properties

`translationKey` (optional) - The translation key for the warning message. Default value is `warnWhenUnsavedChanges`. Useful when you use an i18n provider.

`message` (optional) - The warning message. Default value is `Are you sure you want to leave? You have unsaved changes.` Useful when you don't use an i18n provider.

### parseTableParams

This function can be used to parse the query parameters of current route. It can be useful when you want to use the query parameters in your server side functions (`getData`) to fetch the data such as [persisting the table state](#how-to-persist-syncwithlocation-in-ssr)

For server components, import it from `@refinedev/nextjs-router/parse-table-params`.

```tsx
import parseTableParams from "@refinedev/nextjs-router/parse-table-params";
```

If you want to use it in your client components, you can import it directly from `@refinedev/nextjs-router`.

```tsx
import { parseTableParams } from "@refinedev/nextjs-router";
```

### DocumentTitleHandler

> 🚨 Note that this component currently only works in the `pages` directory.

This component will generate the document title for the current page.By default, it follows a set of predefined rules to generate titles based on the provided props. However, it also offers the flexibility to customize the title generation process by providing a custom `handler` function.
The default title generation rules are as follows:

- list : `Posts | Refine`
- edit : `#{id} Edit Post | Refine`
- show : `#{id} Show Post | Refine`
- create : `Create new Post | Refine`
- clone : `#{id} Clone Post | Refine`
- default : `Refine`

```tsx
const App = () => {
  return (
    <BrowserRouter>
      <Refine
      /* ... */
      >
        {/* ... */}
        {/* highlight-next-line */}
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
};
```

#### Properties

`handler` (optional) - The function that will get invoked in every location change. It will receive an object with the following properties:

- `pathname`: The current URL pathname.
- `resource`: The resource being displayed (e.g., "posts").
- `action`: The action being performed (e.g., "edit", "show", "create").
- `autoGeneratedTitle`: The default auto-generated title based on the predefined rules.
- `params`: An object containing URL parameters, including the `id` parameter if present.

Inside the handler function, you can dynamically generate the document title based on the provided properties and any additional logic required. The function should return the generated title.

```tsx
const customTitleHandler = ({ resource, action, params }) => {
  let title = "Custom default"; // Default title

  if (resource && action) {
    title = `${resource} ${action} ${params.id}`;
  }

  return title;
};

// Usage
<DocumentTitleHandler handler={customTitleHandler} />;
```

## Hooks

### useDocumentTitle

Note that this hook doesn't support SSR. It will only set the document title in the client side.

This hook allows you to set the document title for the current page. It can be used in any component that is a child of the `<Refine>` component.

```tsx
import { useDocumentTitle } from "@refinedev/nextjs-router/pages";

const PostList = () => {
  // highlight-next-line
  useDocumentTitle("Posts | Refine");

  return <List>{/* ... */}</List>;
};
```

This hook can take an object as an argument with `i18nKey`. This key will be used to translate the title using the i18n provider.

```tsx
import { useDocumentTitle } from "@refinedev/nextjs-router/pages";

const PostList = () => {
  // highlight-next-line
  useDocumentTitle({ i18nKey: "documentTitle.posts.list" });

  return <List>{/* ... */}</List>;
};
```

This hook also returns a function that can be used to set the document title dynamically.

```tsx
import { useDocumentTitle } from "@refinedev/nextjs-router/pages";

const PostList = () => {
  const setTitle = useDocumentTitle();

  useEffect(() => {
    setTitle("Posts | Refine");
  }, []);

  return <List>{/* ... */}</List>;
};
```

## Authentication

In Next.js you can achieve authentication control in multiple ways;

:::simple Implementation Tips

For page level authentication, server-side approach is recommended.

:::

### Client side

On the client-side, you can wrap your pages with [`Authenticated`](/core/docs/authentication/components/authenticated/) component from `@refinedev/core` to protect your pages from unauthenticated access.

### Server Side

:::simple Implementation Tips

For page level authentication, server-side approach is recommended.

:::

First let's create our [AuthProvider](/core/docs/authentication/auth-provider/)

let's install the `nookies` packages in our project.

<InstallPackagesCommand args="nookies"/>

We will set/destroy cookies in the `login`, `logout` and `check` functions of our `AuthProvider`.

```tsx title="src/providers/auth-provider.ts"
import { AuthProvider } from "@refinedev/core";
// highlight-start
import nookies from "nookies";
// highlight-end

const mockUsers = [
  {
    username: "admin",
    roles: ["admin"],
  },
  {
    username: "editor",
    roles: ["editor"],
  },
];

// highlight-next-line
const COOKIE_NAME = "user";

export const authProvider: AuthProvider = {
  login: ({ username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.username === username);

    if (user) {
      // highlight-start
      nookies.set(null, COOKIE_NAME, JSON.stringify(user), {
        maxAge: remember ? 30 * 24 * 60 * 60 : undefined,
      });
      // highlight-end

      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  },
  logout: () => {
    // highlight-next-line
    nookies.destroy(null, COOKIE_NAME);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: (error) => {
    if (error && error.statusCode === 401) {
      return {
        error: new Error("Unauthorized"),
        logout: true,
        redirectTo: "/login",
      };
    }

    return {};
  },
  check: async (context) => {
    // highlight-start
    let user = undefined;
    if (context) {
      // for SSR
      const cookies = nookies.get(context);
      user = cookies[COOKIE_NAME];
    } else {
      // for CSR
      const cookies = nookies.get(null);
      user = cookies[COOKIE_NAME];
    }
    // highlight-end

    if (!user) {
      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Unauthorized",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    return null;
  },
  getIdentity: async () => {
    return null;
  },
};
```

After creating our `AuthProvider`, we can call it from server-side to check if the user is authenticated or not.

#### `app` directory

You can use your authProvider's check function inside your server components. To do this, you can use normal async function and use it in your server component.

> 🚨 Refer to the [FAQ section](#how-can-i-use-my-providers-in-the-both-server-and-client-side) for instructions on using providers in both client and server components.

```tsx title="app/blog-posts/layout.ts"
import { authProvider } from "@providers/auth-provider";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const { hasAuth, hasPermission, data } = await getData();

  if (!hasAuth) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

async function getData() {
  const hasAuth = await authProvider.check();

  let data = null;
  if (hasAuth && hasPermission) {
    data = await dataProvider.getList({
      resource: "posts",
    });
  }

  return {
    hasAuth,
    data,
  };
}
```

#### `pages` directory

On the server-side of pages router, you can use your `authProvider`'s `check` function inside server side functions (`getServerSideProps`) to redirect unauthenticated users to other pages like login...

```tsx title="pages/posts/index.tsx"
import { authProvider } from "@providers/auth-provider";

export const getServerSideProps = async (context) => {
  // We've handled the SSR case in our `check` function by sending the `context` as parameter.
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    context.res.statusCode = 401;
    context.res.end();
  }

  if (!authenticated && redirectTo) {
    return {
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
    };
  }

  return {
    props: {
      authenticated,
    },
  };
};
```

This needs to be done for all the routes that we want to protect.

## Access Control

In Next.js you can achieve access control in multiple ways;

On the client-side you can wrap your pages with `CanAccess` component from `@refinedev/core` to protect your pages from unauthorized access.

And on the server-side you can use your `accessControlProvider`'s `can` function inside server side functions (`getServerSideProps`) to redirect unauthorized users to other pages..

:::simple Implementation Tips

For page level access control, server-side approach is recommended.

:::

First, let's build our [AccessControlProvider](/core/docs/authorization/access-control-provider/)

```tsx title="src/acccessControlProvider.ts"
export const accessControlProvider = {
  can: async ({ resource, action, params }) => {
    // You can also access resource object directly with `params.resource` and use any useful meta data in `params.resource.meta`.
    // const resourceName = params?.resource?.name;
    // const anyUsefulMeta = params?.resource?.meta?.yourUsefulMeta;

    if (resource === "posts" && action === "edit") {
      return {
        can: false,
        reason: "Unauthorized",
      };
    }

    return { can: true };
  },
};
```

### Client Side

For client-side, you can wrap your pages with [`CanAccess`](/core/docs/authorization/components/can-access/) component from `@refinedev/core` to protect your pages from unauthorized access.

```tsx
import { CanAccess } from "@refinedev/core";

export const MyPage = () => (
  <CanAccess>
    <div>{/* ... */}</div>
  </CanAccess>
);
```

### Server Side

#### `app` directory

You can use your `accessControlProvider`'s `can` function inside your server components. To do this, you can use normal async function and use it in your server component.

```tsx title="app/posts/page.tsx"
import { accessControlProvider } from "src/accessControlProvider";

export default async function PostList() {
  const { can } = await getData();

  if (!can) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}

async function getData() {
  const { can } = await accessControlProvider.can({
    resource: "posts",
    action: "list",
  });

  return {
    can,
  };
}
```

> 🚨 Refer to the [FAQ section](#how-can-i-use-my-providers-in-the-both-server-and-client-side) for instructions on using providers in both client and server components.

To learn more about how to fetch data in server components, you can check the [data fetching documentation of Next.js](https://nextjs.org/docs/pages/building-your-application/data-fetching).

#### `pages` directory

You can use your `accessControlProvider`'s `can` function inside `getServerSideProps` to redirect unauthorized users to other pages.

Then, let's create our posts page and use the `accessControlProvider` to check if the user can list the posts.

```tsx title="pages/posts/index.tsx"
import { accessControlProvider } from "src/accessControlProvider";

export default async function PostList() {
  const { can } = await getData();

  if (!can) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}

async function getData() {
  const { can } = await accessControlProvider.can({
    resource: "posts",
    action: "list",
  });

  return {
    can,
  };
}
```

## FAQ

### How can I use my providers in the both server and client side?

:::simple Possible Errors

- Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".

- Error: It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.

:::

In some cases, you may want to use your providers on both the server and client side. For example, you may want to use your data provider in your server components to fetch data even before the page is rendered but also you need to give the same data provider to your Refine components to fetch data in the client side.

Since Refine heavily uses React context and React state, It's needed to be a client component, and we can't pass functions into the Refine component unless we mark them as `client` functions with `"use client";` directive. After marking them as `client` functions, you can't use them on the server side.

To solve this problem, you can create a separate file for your providers and mark them as `client` or `server` functions. Then, you can use the appropriate provider in your server and client components.

<NextJSAppProviderServerClient/>

You can learn more about this on the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/data-fetching).

### Can I use nested routes?

Yes, you can use nested routes in your app. Refine will match the routes depending on how you define the action paths in your resources. Additional parameters and nesting is supported. Refine will not limit you and your router in route configuration, all you need to do is to pass the appropriate path to the related resource and the action in the `resources` array (This is also optional but recommended due to the features it provides).

You can use `:param` syntax to define parameters in your routes.

### How to make SSR work?

<Tabs>
<TabItem value="app" label="App router" default>

You can use the methods provided from the `dataProvider` to fetch data in your server components. To do this, you can use normal async function and use it in your server component.

To learn more about how to fetch data in server components, you can check the [data fetching documentation](https://nextjs.org/docs/app/building-your-application/data-fetching) of Next.js.

```tsx title="app/posts/page.tsx"
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export default async function ProductList() {
  const { posts, total } = await getData();

  return (
    <div>
      <h1>Posts ({total})</h1>
      <hr />
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

async function getData() {
  const response = await dataProvider(API_URL).getList({
    resource: "posts",
    pagination: { currentPage: 1, pageSize: 10 },
  });

  return {
    posts: response.data,
    total: response.total,
  };
}
```

</TabItem>

<TabItem value="pages" label="Pages Router">

You can always use the methods provided from the `dataProvider` to fetch data in your pages. To do this, you can both use `getServerSideProps` or `getStaticProps` methods and pass the data to your page as a prop.

All you need to do is to pass the data as the `initialData` to your data hooks using the `queryOptions` prop.

```tsx
import { useList } from "@refinedev/core";

import { dataProvider } from "src/providers";

type IPost = {
  id: number;
  title: string;
  description: string;
};

export const getServerSideProps = async () => {
  const { data } = await dataProvider.getList<IPost>("posts", {
    pagination: {
      page: 1,
      perPage: 10,
    },
  });

  return {
    props: {
      posts: data,
    },
  };
};

export default function Posts({ posts }: { posts: GetListResponse<IPost> }) {
  const {
    tableQuery: { data },
  } = useTable<IPost>({
    queryOptions: {
      initialData: posts,
    },
  });

  return <>{/* ... */}</>;
}
```

</TabItem>

</Tabs>

### How to persist `syncWithLocation` in SSR?

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

For example, search params can be like this:

<Tabs>
<TabItem value="app" label="App router" default>

```tsx title="app/posts/page.tsx"
import dataProvider from "@refinedev/simple-rest";
import { type CrudFilters, type Pagination } from "@refinedev/core";
import { parseTableParams } from "@refinedev/nextjs-router";

const API_URL = "https://api.fake-rest.refine.dev";

type PostListProps = {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
};

export default async function PostList({ searchParams }: PostListProps) {
  const tableParams = parseTableParams(searchParams);
  const { posts, total } = await getData(tableParams);

  return (
    <div>
      <h1>Posts ({total})</h1>
      <hr />
      {posts?.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

type GetDataParams = {
  pagination?: Pagination;
  filters?: CrudFilters;
};

async function getData(
  params: GetDataParams = {
    pagination: { currentPage: 1, pageSize: 10 },
    filters: [],
  },
) {
  const response = await dataProvider(API_URL).getList({
    resource: "posts",
    pagination: params.pagination,
    filters: params.filters,
  });

  return {
    posts: response.data,
    total: response.total,
  };
}
```

</TabItem>

<TabItem value="pages" label="Pages Router">

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

```tsx
// highlight-next-line
import { parseTableParams } from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps = ({ params, resolvedUrl }) => {
  const { resource } = params;

  // highlight-next-line
  const tableParams = parseTableParams(resolvedUrl?.split("?")[1] ?? "");

  try {
    const data = await dataProvider(API_URL).getList({
      resource: resource as string,
      ...tableParams, // this includes `filters`, `sorters` and `pagination`
    });

    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
export default function MyListPage({ initialData }) {
  return <>{/* ... */}</>;
}
```

`parseTableParams` parses the query string and returns query parameters([refer here for their interfaces][interfaces]). They can be directly used for `dataProvider` methods that accept them.
</TabItem>
</Tabs>

### How to use multiple layouts?

You'll probably have a point where you need to use multiple layouts. For example, you may want to use a different layout for the login page. To achieve this, you can either use your `Layout` wrappers in your pages or you can add extra properties to your page components to render the page with the specified layout.

Here's an example of how you can use additional properties to render different layouts.

<Tabs>
<TabItem value="app" label="App router" default>

The App Router inside Next.js 13 introduced new file conventions to easily create pages, shared layouts, and templates. You can define a layout by default exporting a React component from a `layout.js` file.

File structure should similar to this:

```bash

├── app
│   ├── posts
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── login
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   ├── page.tsx
│

```

In the example above we have three layouts.

- app/layout.tsx - The default layout and wraps all the pages.
- app/posts/layout.tsx - The layout for the posts page.
- app/login/layout.tsx - The layout for the login page.

To learn more about this, you can check the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts).

</TabItem>

<TabItem value="pages" label="Pages Router">

```tsx title="pages/login.tsx"
export default function Login() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

Login.layout = "auth";
```

```tsx title="pages/posts/index.tsx"
export default function Posts() {
  return <div>{/* ... */}</div>;
}

Posts.layout = "default";
```

```tsx title="pages/_app.tsx"
import { AuthLayout, DefaultLayout } from "src/layouts";

const Layouts = {
    auth: AuthLayout,
    default: DefaultLayout,
};

export default function MyApp({ Component, pageProps }) {
    const Layout = Layouts[Component.layout ?? "default"];

    return (
        <Refine
            {/* ... */}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Refine>
    );
}
```

To comply with TypeScript types, we'll need to extend the `NextPage` and `AppProps` types accordingly to expect the `layout` property in page components.

:::simple Further Reading

You can find out more about this at [Next.js documentation for multiple layouts](https://nextjs.org/docs/basic-features/layouts#with-typescript)

:::

We'll define the types in `_app.tsx` file.

```tsx title="pages/_app.tsx"
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: keyof typeof Layouts;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

// Then we'll change the type of `MyApp` components props to `AppPropsWithLayout`.
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  /* ... */
}
```

Then in our pages, we can use the `PageWithLayout` type when defining our page components.

```tsx title="pages/login.tsx"
import type { PageWithLayout } from "pages/_app";

const Login: PageWithLayout = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

Login.layout = "auth";
```

</TabItem>
</Tabs>

### Handling 404s

In the earlier versions of Refine, if `authProvider` was defined, we've redirected the users to the `/login` route even with the 404s and 404 pages were only available to the authenticated users. Now, the routes are handled by the users, so you can handle the 404s however you like.

<Tabs>
<TabItem value="app" label="App router" default>

<h4>Using the Next.js's not-found.js</h4>

If you want handle unmatched routes, you can create a `not-found.tsx` file in your `/app` directory and it will be used as the 404 page. For more information, you can check the [Next.js documentation for not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found).

```ts title="app/not-found.tsx"
import { ErrorComponent } from "@refinedev/antd";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <ErrorComponent />
    </Suspense>
  );
}
```

<h4>Using a catch-all route</h4>

If you want to achieve the legacy behavior or want to have more control over the unhandled routes, you can use the catch-all route. For more information, you can check the [Next.js documentation for catch-all route](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments).

**Client Side**

```tsx title="app/[[...slug]]/page.tsx"
"use client";

import { Authenticated } from "@refinedev/core";

export default function CatchAll() {
  return (
    // This will redirect the user if they're not authenticated depending on the response of `authProvider.check`.
    <Authenticated>
      <div>This page is not found.</div>
    </Authenticated>
  );
}
```

**Server Side**

```tsx title="app/[[...slug]]/page.tsx"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect("/login");
  }

  return <>{children}</>;
}

async function getData() {
  const cookieStore = cookies();
  const auth = cookieStore.get("auth");

  return {
    authenticated = !!auth,
  };
}
```

</TabItem>

<TabItem value="pages" label="Pages Router">

<h4>Using the Next.js's 404 page</h4>

If you want to use the Next.js's 404 page, you can create a `404.tsx` file in your `/pages` directory and it will be used as the 404 page. For more information, you can check the [Next.js documentation for custom 404 page](https://nextjs.org/docs/advanced-features/custom-error-page#404-page).

<h4>Using a catch-all route</h4>

If you want to achieve the legacy behavior or want to have more control over the unhandled routes, you can use the catch-all route. For more information, you can check the [Next.js documentation for catch-all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes).

You can use Refine's authentication hooks and the `authProvider` to check if the user is authenticated or not and redirect them to the login page. This check can be done on the client-side or server-side.

**Client Side**

```tsx title="pages/[...slug].tsx"
import { Authenticated } from "@refinedev/core";

export default function CatchAll() {
  return (
    // This will redirect the user if they're not authenticated depending on the response of `authProvider.check`.
    <Authenticated>
      <div>This page is not found.</div>
    </Authenticated>
  );
}
```

**Server Side**

```tsx title="pages/[...slug].tsx"
import { authProvider } from "src/authProvider";

export const getServerSideProps = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated && redirectTo) {
    return {
      redirect: {
        destination: redirectTo,
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default function CatchAll() {
  return <div>This page is not found.</div>;
}
```

</TabItem>
</Tabs>

### `RefineRoutes` Component

:::simple Good to know

While this may work for the simple cases, it is not recommended to use this component. Defining your routes separately will give you more control over your routes and will allow you to use the full potential of your router.

:::

This component can be used to render the matching route in your resources by using the `resources` prop. It will only take effect if the action properties in the resource definitions are assigned to components or objects with `component` property.

It will render the component for the matching route and pass it as a `JSX.Element` to the `children` function. You can use this to render your components in a single catch-all route. If there's no matching route `undefined` will be passed to the `children` function. In this case, you can render an error page or redirect the user to another page.

We'll define our resources in the `<Refine>` component:

```tsx
return (
  <Refine
    resources={[
      {
        name: "posts",
        list: "/posts",
        show: "/posts/show/:id",
      },
      {
        name: "categories",
        list: "/categories",
      },
    ]}
  >
    {/* ... */}
  </Refine>
);
```

Then, we'll create a catch-all route to render the matching route in our resources:

<h4>In `app/[[...refine]]/page.tsx`</h4>

If you're using `appDir` in your Next.js project, you can create a catch-all route in the `app` directory.

```tsx title=app/[[...refine]]/page.tsx
"use client";

import { RefineRoutes } from "@refinedev/nextjs-router";

export default function CatchAll() {
  return (
    <RefineRoutes>
      {(matchingRoute) => {
        if (matchingRoute) {
          return { matchingRoute };
        }

        return <ErrorPage />;
      }}
    </RefineRoutes>
  );
}
```

<h4>In `pages/[[...refine]].tsx`</h4>

If you're using the `/pages` directory in your Next.js project, you can create a catch-all route in the `pages` directory.

```tsx title=pages/[[...refine]].tsx
import { RefineRoutes } from "@refinedev/nextjs-router/pages";

import { ErrorPage } from "components/error";

export default function CatchAll() {
  return (
    <RefineRoutes>
      {(matchingRoute) => {
        if (matchingRoute) {
          return { matchingRoute };
        }

        return <ErrorPage />;
      }}
    </RefineRoutes>
  );
}
```

When components are used to define the resource actions, default paths will be used. You can override the default paths by assigning an object with `component` and `path` properties to the action properties.

Default paths are:

- `list`: `/resources`
- `create`: `/resources/create`
- `edit`: `/resources/edit/:id`
- `show`: `/resources/show/:id`

### How to change the document title?

By default [`<DocumentTitleHandler/>`](#documenttitlehandler) component will generate the document title based on current resource and action with the "Refine" suffix. You can customize the title generation process by providing a custom `handler` function.

```tsx
import { BrowserRouter, DocumentTitleHandler } from "@refinedev/react-router";
import { Refine } from "@refinedev/core";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
      /* ... */
      >
        {/* ... */}
        <DocumentTitleHandler
          handler={({ action, params, resource }) => {
            const id = params?.id ?? "";

            const actionPrefixMatcher = {
              create: "Create new ",
              clone: `#${id} Clone ${resource?.meta?.label}`,
              edit: `#${id} Edit ${resource?.meta?.label}`,
              show: `#${id} Show ${resource?.meta?.label}`,
              list: `${resource?.meta?.label}`,
            };

            const suffix = " | <Company Name>";
            const title = actionPrefixMatcher[action || "list"] + suffix;

            return title;
          }}
        />
      </Refine>
    </BrowserRouter>
  );
};
```

## Example (`/app`)

<CodeSandboxExample path="with-nextjs" />

[routerprovider]: /core/docs/routing/router-provider
