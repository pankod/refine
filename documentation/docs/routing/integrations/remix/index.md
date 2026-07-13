---
title: "Remix Guide | Best Practices in Refine v5"
display_title: "Remix"
sidebar_label: "Remix"
description: "Integrate Remix in Refine v5. Learn best practices. Learn SSR, navigation for real-world React admin panels. Hands-on examples included."
---

Refine provides router bindings and utilities for [Remix](https://remix.run). This package will provide easy integration between Refine and **Remix** for both existing projects and new projects without giving up the benefits of **Remix**.

import { CodeBlock } from "@site/src/theme/CodeBlock/base";

<InstallPackagesCommand args="@refinedev/remix-router"/>

You can use one of our remix examples to start your project.

<Tabs wrapContent={false}>
  <TabItem value="npm" label="npm" default>
    <Tabs>
      <TabItem value="vite" label="Vite Headless">
        <CodeBlock className="language-bash">npm create refine-app@latest -- --example with-remix-vite-headless my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="antd" label="Ant Design">
        <CodeBlock className="language-bash">npm create refine-app@latest -- --example with-remix-antd my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="mui" label="MUI">
        <CodeBlock className="language-bash">npm create refine-app@latest -- --example with-remix-mui my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="auth" label="Ant Design and Auth">
        <CodeBlock className="language-bash">npm create refine-app@latest -- --example with-remix-auth my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="headless" label="Headless">
        <CodeBlock className="language-bash">npm create refine-app@latest -- --example with-remix-headless my-refine-remix-app</CodeBlock>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    <Tabs>
      <TabItem value="vite" label="Vite Headless">
        <CodeBlock className="language-bash">pnpm create refine-app@latest --example with-remix-vite-headless my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="antd" label="Ant Design">
        <CodeBlock className="language-bash">pnpm create refine-app@latest --example with-remix-antd my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="mui" label="MUI">
        <CodeBlock className="language-bash">pnpm create refine-app@latest --example with-remix-mui my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="auth" label="Ant Design and Auth">
        <CodeBlock className="language-bash">pnpm create refine-app@latest --example with-remix-auth my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="headless" label="Headless">
        <CodeBlock className="language-bash">pnpm create refine-app@latest --example with-remix-headless my-refine-remix-app</CodeBlock>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="yarn" label="yarn">
    <Tabs>
      <TabItem value="vite" label="Vite Headless">
        <CodeBlock className="language-bash">yarn create refine-app@latest --example with-remix-vite-headless my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="antd" label="Ant Design">
        <CodeBlock className="language-bash">yarn create refine-app@latest --example with-remix-antd my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="mui" label="MUI">
        <CodeBlock className="language-bash">yarn create refine-app@latest --example with-remix-mui my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="auth" label="Ant Design and Auth">
        <CodeBlock className="language-bash">yarn create refine-app@latest --example with-remix-auth my-refine-remix-app</CodeBlock>
      </TabItem>
      <TabItem value="headless" label="Headless">
        <CodeBlock className="language-bash">yarn create refine-app@latest --example with-remix-headless my-refine-remix-app</CodeBlock>
      </TabItem>
    </Tabs>
    <ReactMarkdown>{"> Only supports yarn@1 version."}</ReactMarkdown>
  </TabItem>
</Tabs>

[Refer to the Router Provider documentation for detailed information. &#8594][routerprovider]

:::simple Legacy Router

`@refinedev/remix-router` also exports the legacy router provider and it will be available until the next major version of Refine. It is recommended to use the new router provider instead of the legacy one.

If you are using the legacy router provider, it can be imported from `@refinedev/remix-router/legacy` and passed to the `legacyRouterProvider` prop of the `Refine` component.

:::

## Usage

We'll use the `routerProvider` from `@refinedev/remix-router` to set up the router bindings for Refine. We'll define the action routes for our resources in the `resources` array and define our routes in `app/routes` directory.

We'll create four pages for our resources:

- `app/routes/posts._index.tsx` - List page for posts
- `app/routes/posts.show.$id.tsx` - Detail page for posts
- `app/routes/categories._index.tsx` - List page for categories
- `app/routes/categories.show.$id.tsx` - Detail page for categories

And we'll create one page for the index route and use it to redirect to the `posts` resource:

- `app/routes/_index.tsx` - Index page

Notice that we're using the V2 for route file naming convention for our routes. You can find more information about it in the [Remix documentation](https://remix.run/docs/en/main/file-conventions/route-files-v2).

Currently, to enable that you need to add the following line to your `remix.config.js` file:

```node title=remix.config.js
module.exports = {
  future: {
    v2_routeConvention: true,
  },
};
```

Let's start with the initialization of the Refine app in the `app/root.tsx` file:

```tsx title=app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/remix-router";

import { Layout } from "components/Layout";

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
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
          <Layout>
            <Outlet />
          </Layout>
        </Refine>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

:::simple Good to know

Remix uses the `$` symbol to indicate parameters but Refine uses the colon syntax (`:param`) for route parameters. This won't cause any problems since Refine only uses the colon syntax as an indicator for route parameters and the communication between Refine and the router is handled by the `routerProvider` prop.

:::

Your action definitions in the resources can contain additional parameters and nested routes. Passing these parameters when navigating to the pages are handled by the current available parameters and the `meta` props of the related hooks and components.

Refine supports route parameters defined with `:param` syntax. You can use these parameters in your action definitions and create your routes accordingly. For example, if you have a `posts` resource and you want to create a route for the `show` action of a specific post, you can define the `show` action as `/posts/show/:id` and use the `id` parameter in your component.

Now we can create our pages in the `routes` directory:

```tsx title=app/routes/posts._index.tsx
import { useTable } from "@refinedev/core";
import { NavLink } from "@remix-run/react";

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

  const getToPath = useGetToPath();

  const tableData = result?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ul>
          {tableData?.map((post) => (
            <li key={post.id}>
              <NavLink
                to={getToPath({
                  resource: "categories",
                  action: "show",
                  meta: { id: category.id },
                })}
              >
                {post.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

```tsx title=app/routes/posts.show.$id.tsx
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

```tsx title=app/routes/categories._index.tsx
import { useTable, getToPath } from "@refinedev/core";
import { NavLink } from "@remix-run/react";

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

  const getToPath = useGetToPath();

  const tableData = result?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ul>
          {tableData?.map((category) => (
            <li key={category.id}>
              <NavLink
                to={getToPath({
                  resource: "categories",
                  action: "show",
                  meta: { id: category.id },
                })}
              >
                {category.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

```tsx title=app/routes/categories.show.$id.tsx
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

Even though we're using the `NavigateToResource` component, when using Remix it's better to handle such redirect operations in the server side rather than the client side. You can use the `loader` function to redirect the user to the `/posts`.

```tsx title=app/routes/_index.tsx
import { NavigateToResource } from "@refinedev/remix-router";

export default function Index() {
  return <NavigateToResource />;
}
```

## Additional Components

`@refinedev/remix-router` package also includes some additional components that can be useful in some cases.

### NavigateToResource

A basic component to navigate to a resource page. It is useful when you want to navigate to a resource page at the index route of your app.

```tsx title=app/routes/index.tsx
import { NavigateToResource } from "@refinedev/remix-router";

export default function IndexPage() {
  return <NavigateToResource />;
}
```

#### Properties

`resource` (optional) - The name of the resource to navigate to. It will redirect to the first `list` route in the `resources` array if not provided.

`fallbackTo` (optional) - The path to navigate to if no resource is found. If not provided and no resource is found, no navigation will be made.

`meta` (optional) - The meta object to use if the route has parameters in it. The parameters in the current location will also be used to compose the route but `meta` will take precedence.

### UnsavedChangesNotifier

This component enables the `warnWhenUnsavedChanges` feature of Refine. It will show a warning message when user tries to navigate away from the current page without saving the changes. Also checks for `beforeunload` event to warn the user when they try to close the browser tab or window.

Place this component inside the `<Refine>` components children to enable this feature.

```tsx title=app/root.tsx
import { Refine } from "@refinedev/core";
import { UnsavedChangesNotifier } from "@refinedev/remix-router";

export default function App(): JSX.Element {
  return (
    <Refine
    /* ... */
    >
      <Outlet />
      {/* highlight-next-line */}
      <UnsavedChangesNotifier />
    </Refine>
  );
}
```

#### Properties

`translationKey` (optional) - The translation key for the warning message. Default value is `warnWhenUnsavedChanges`. Useful when you use an i18n provider.

`message` (optional) - The warning message. Default value is `Are you sure you want to leave? You have unsaved changes.` Useful when you don't use an i18n provider.

### parseTableParams

This function can be used to parse the query parameters of a table page. It can be useful when you want to use the query parameters in your server side functions (`loader`) to fetch the data such as [persisting the table state](#how-to-persist-syncwithlocation-in-ssr)

## Authentication

In Remix you can achieve authentication control in multiple ways;

On the client-side [`Authenticated`](/core/docs/authentication/components/authenticated/) component from `@refinedev/core` can be used to protect your pages from unauthenticated access.

On the server-side `authProvider`'s `check` function inside server side functions (`loader`) to redirect unauthorized users to other pages using `redirect` from `@remix-run/node`.

:::simple Implementation Tips

For page level access control, server-side approach is recommended.

:::

### Server Side Authentication with `createCookieSessionStorage`

First, let's create our `AuthProvider`. For more information on `AuthProvider`, visit our [AuthProvider documentation][authprovider].

```tsx title="app/authProvider.ts"
import { AuthProvider } from "@refinedev/core";

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

export const authProvider: AuthProvider = {
  login: async ({ username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.username === username);

    if (user) {
      return {
        success: true,
        redirectTo: "/",
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
    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    if (error && error.statusCode === 401) {
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    return {};
  },
  check: async ({ request, storage }) => {
    const session = await storage.getSession(request.headers.get("Cookie"));

    const user = session.get("user");

    if (!user) {
      return {
        authenticated: false,
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

Next, let's create the `app/session.server.ts` file as mentioned in the [`Jokes App`][jokesapp] tutorial

```tsx title="app/session.server.ts"
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { authProvider } from "./authProvider";

type LoginForm = {
  username: string;
  password: string;
};

// normally you want this to be env variable
const sessionSecret = "SUPER_SECRET_SESSION"; //process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function login({ username, password }: LoginForm) {
  try {
    const user = await authProvider.login({ username, password });
    if (user) {
      return { user };
    }
  } catch (error) {
    return error;
  }
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) {
  try {
    const user = await authProvider.check?.({ request, storage });
    return user;
  } catch (error) {
    const searchParams = new URLSearchParams([["to", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
}

export async function createUserSession(user: object, redirectTo: string) {
  const session = await storage.getSession();
  session.set("user", { ...user });
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
```

In the `login` and `requireUserId` functions, we call the corresponding functions of our `AuthProvider`.

Now let's create our login page

```tsx title="app/routes/login.tsx"
import React from "react";
import { useTranslate } from "@refinedev/core";

import { login, createUserSession } from "~/session.server";
import { ActionFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";

export interface ILoginForm {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const translate = useTranslate();
  const [searchParams] = useSearchParams();

  return (
    <>
      <h1>{translate("pages.login.title", "Sign in your account")}</h1>
      <form method="post">
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get("to") ?? undefined}
        />
        <table>
          <tbody>
            <tr>
              <td>
                {translate("pages.login.username", undefined, "username")}:
              </td>
              <td>
                <input
                  name="username"
                  type="text"
                  size={20}
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoFocus
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                {translate("pages.login.password", undefined, "password")}:
              </td>
              <td>
                <input type="password" name="password" required size={20} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <input type="submit" value="login" />
      </form>
    </>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;
  const redirectTo = form.get("redirectTo") || "/";
  // highlight-start
  const user = await login({ username, password });
  if (!user) {
    return null;
  }

  return createUserSession(user as any, redirectTo as string);
  // highlight-end
};

export default LoginPage;
```

Yeeyy! Now our users can login! 🎉

Remember, actions and loaders run on the server, so console.log calls you put in those you can't see in the browser console. Those will show up in the terminal window you're running your server in.

We can call the `requireUserId` function on our routes where we want the authentication check done.

```tsx
import { json, LoaderFunction } from "@remix-run/node";
//highlight-next-line
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ params, request, context }) => {
  //highlight-next-line
  await requireUserId(request);

  return json({});
};
```

Finally, let's make sure our users can log out. For this, we create a routes for `/logout`.

```tsx title="/app/routes/logout.tsx"
import type { LoaderFunction } from "@remix-run/node";

import { logout } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await logout(request);
};
```

### Server Side Authentication with Self service Cookie

First, let's install the `js-cookie` and `cookie` packages in our project.

<InstallPackagesCommand args="js-cookie cookie"/>

<InstallPackagesCommand args="-D @types/js-cookie"/>

We will set/destroy cookies in the `login`, `logout` and `check` functions of our `AuthProvider`.

```tsx title="app/authProvider.ts"
import { AuthProvider } from "@refinedev/core";
// highlight-start
import Cookies from "js-cookie";
import * as cookie from "cookie";
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
      // highlight-next-line
      Cookies.set(COOKIE_NAME, JSON.stringify(user));
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
    Cookies.remove(COOKIE_NAME);

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
      const { request } = context;
      const parsedCookie = cookie.parse(request.headers.get("Cookie"));
      user = parsedCookie[COOKIE_NAME];
    } else {
      // for CSR
      const parsedCookie = Cookies.get(COOKIE_NAME);
      user = parsedCookie ? JSON.parse(parsedCookie) : undefined;
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

Tadaa! that's all! 🎉

Now, we can check the authentication in loaders of our routes.

```tsx title="app/routes/_index.tsx"
import { json, LoaderFunction } from "@remix-run/node";
import { authProvider } from "~/authProvider";

export const loader: LoaderFunction = async ({ params, request, context }) => {
  // We've handled the SSR case in our `check` function by sending the `request` as parameter.
  const { authenticated } = await authProvider.check(request);

  if (!authenticated) {
    return json({}, { status: 401 });
  }

  return null;
};
```

This needs to be done for all the routes that we want to protect.

## Access Control

There are two ways to do Server Side Authentication with Remix. You can choose one of the two methods according to your use case.

### Server Side

On the server-side `accessControlProvider`'s `can` function inside server side functions (`loader`) to redirect unauthorized users to other pages using `redirect` from `@remix-run/node`.

First, let's build our [AccessControlProvider](/core/docs/authorization/access-control-provider/)

```tsx title="app/acccessControlProvider.ts"
export const accessControlProvider = {
  can: async ({ resource, action, params }) => {
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

You can also access resource object directly.

```tsx
const resourceName = params?.resource?.name;
const anyUsefulMeta = params?.resource?.meta?.yourUsefulMeta;

export const accessControlProvider = {
  can: async ({ resource, action, params }) => {
    if (
      resourceName === "posts" &&
      anyUsefulMeta === true &&
      action === "edit"
    ) {
      return {
        can: false,
        reason: "Unauthorized",
      };
    }
  },
};
```

Then, let's create our posts route.

```tsx title="app/routes/_protected.posts._index.tsx"
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import dataProvider from "@refinedev/simple-rest";

import { IPost } from "../interfaces";
import { API_URL } from "~/constants";
import { accessControlProvider } from "../accessControlProvider";

const PostList: React.FC = () => {
  const { initialData } = useLoaderData<typeof loader>();

  return <>{/* ... */}</>;
};

export default PostList;

export async function loader({ request }: LoaderFunctionArgs) {
  const can = accessControlProvider.can({
    resource: "posts",
    action: "list",
  });

  if (!can) {
    return json({}, { status: 403 });
  }

  const data = await dataProvider(API_URL).getList<IPost>({
    resource: "posts",
  });

  return json({ initialData: data });
}
```

Tadaa! that's all! 🎉

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

## FAQ

### Can I use nested routes?

Yes, you can use nested routes in your app. Refine will match the routes depending on how you define the action paths in your resources. Additional parameters and nesting is supported. Refine will not limit you and your router in route configuration, all you need to do is to pass the appropriate path to the related resource and the action in the `resources` array (This is also optional but recommended due to the features it provides).

You can use `:param` syntax to define parameters in your routes.

### How to make SSR work?

You can always use the methods provided from the `dataProvider` to fetch data in your pages. To do this, you can use `loader` function and pass the data to your page as a prop.

All you need to do is to pass the data as the `initialData` to your data hooks using the `queryOptions` prop.

```tsx
import { useList } from "@refinedev/core";
import { useLoaderData } from "@remix-run/react";

import { dataProvider } from "src/providers";

type IPost = {
  id: number;
  title: string;
  description: string;
};

export async function loader() {
  const { data } = await dataProvider.getList<IPost>("posts", {
    pagination: {
      page: 1,
      perPage: 10,
    },
  });

  return json(data);
}

export default function Posts() {
  const initialPosts = useLoaderData<typeof loader>();

  const {
    tableQuery: { data },
  } = useTable<IPost>({
    queryOptions: {
      initialData: initialPosts,
    },
  });

  return <>{/* ... */}</>;
}
```

### How to persist `syncWithLocation` in SSR?

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

```tsx
import { json, LoaderFunction } from "@remix-run/node";
// highlight-next-line
import { parseTableParams } from "@refinedev/remix-router";
import dataProvider from "@refinedev/simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { resource } = params;
  const url = new URL(request.url);

  // highlight-next-line
  const tableParams = parseTableParams(url.search);

  try {
    const data = await dataProvider(API_URL).getList({
      resource: resource as string,
      ...tableParams, // this includes `filters`, `sorters` and `pagination`
    });

    return json({ initialData: data });
  } catch (error) {
    return json({});
  }
};

export default function MyListRoute() {
  return <>{/* ... */}</>;
}
```

`parseTableParams` parses the query string and returns query parameters([refer here for their interfaces][interfaces]). They can be directly used for `dataProvider` methods that accept them.

### Handling 404s

In the earlier versions of Refine, if `authProvider` was defined, we've redirected the users to the `/login` route even with the 404s and 404 pages were only available to the authenticated users. Now, the routes are handled by the users, so you can handle the 404s however you like.

In remix, you can use a splat ($) route to handle the 404s. Check out the [remix docs](https://remix.run/docs/en/main/guides/routing#md-splats) for more information.

**Using `loader`**

```tsx title="app/routes/$.tsx"
import { json, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params, request, context }) => {
  return json({}, { status: 404 });
};
```

**Using `Authenticated`**

```tsx title="app/routes/$.tsx"
import { Authenticated } from "@refinedev/core";

export default function NotFound() {
  return (
    <Authenticated>
      <div>I'm the 404 page for the authenticated users.</div>
    </Authenticated>
  );
}
```

### RefineRoutes

While this may work for the simple cases, it is not recommended to use this component. Defining your routes separately will give you more control over your routes and will allow you to use the full potential of your router.

This component can be used to render the matching route in your resources by using the `resources` prop. It will only take effect if the action properties in the resource definitions are assigned to components or objects with `component` property.

It will render the component for the matching route and pass it as a `JSX.Element` to the `children` function. You can use this to render your components in a single catch-all route. If there's no matching route `undefined` will be passed to the `children` function. In this case, you can render an error page or redirect the user to another page.

We'll define our resources in the `<Refine>` component:

```tsx title=app/root.tsx
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

```tsx title=app/routes/$.tsx
import { RefineRoutes } from "@refinedev/remix-router";

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

## Example

<CodeSandboxExample path="with-remix-antd" />

<CodeSandboxExample path="with-remix-headless" hideSandbox />

[routerprovider]: /core/docs/routing/router-provider
[remix]: https://remix.run/
[remixrouter]: https://www.npmjs.com/package/@refinedev/remix-router
[Refine]: /core/docs/core/refine-component
[remixroutes]: https://remix.run/docs/en/v1/api/conventions#routes
[usetable]: /core/docs/data/hooks/use-table
[reactqueryssr]: https://react-query.tanstack.com/guides/ssr#using-initialdata
[reactquery]: https://react-query.tanstack.com/
[getlist]: /core/docs/data/data-provider#getlist-
[dataprovider]: /core/docs/data/data-provider
[usetable]: /core/docs/data/hooks/use-table
[interfaces]: /core/docs/core/interface-references/#crudfilters
[loaderfunction]: https://remix.run/docs/en/v1/api/conventions#loader
[jokesapp]: https://remix.run/docs/en/v1/tutorials/jokes#authentication
[authprovider]: /core/docs/authentication/auth-provider
