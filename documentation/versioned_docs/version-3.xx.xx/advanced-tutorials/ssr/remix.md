---
id: remix
title: Remix
---

**refine** can be used with [**Remix**][remix] to SSR your pages. It doesn't get in the way and follows Remix conventions and also provides helper modules when necessary.

## Setup

<InstallPackagesCommand args="@refinedev/remix-router"/>

:::tip
We recommend using `create refine-app` to initialize your refine projects. It configures the project according to your needs including SSR with Remix!

<CreateRefineAppCommand args="-o refine-remix my-refine-remix-app" />

:::

## Usage

`<Refine>` should wrap your `<Outlet>` component located in `app/root.tsx`. This way your [routes][remixroutes] are integrated to **refine**.

```tsx title="app/root.tsx"
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// highlight-start
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-remix-router";
// highlight-end

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix + Refine App",
  viewport: "width=device-width,initial-scale=1",
});

// highlight-next-line
const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        // highlight-start
        <Refine
          dataProvider={dataProvider(API_URL)}
          routerProvider={routerProvider}
        >
          <Outlet />
        </Refine>
        // highlight-end
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

## Custom Route

Let's say we want to show a list of users in `/posts`. After creating `posts.tsx` under `routes` in your Remix app, we can use the `useTable` hook to list the users in a table:

```tsx title="routes/posts.tsx"
import { LayoutWrapper, useTable } from "@pankod/refine-core";

export const PostList: React.FC = () => {
  const { tableQueryResult } = useTable<IPost>({
    resource: "posts",
  });

  return (
    <LayoutWrapper>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutWrapper>
  );
};

interface IPost {
  id: number;
  title: string;
  status: string;
}

export default PostList;
```

:::tip
If you want to handle your `resource` with a custom route or create a custom route with or without a resource, these will not be visible in the `<Sider />` component. You can trick the `<Sider/>` by passing an empty resource to show your custom route in it.

```tsx title="Example"
const App = () => (
  <Refine
    resources={[
      // This will add an item to `<Sider/>` with route `/my-custom-item`
      { name: "my-custom-item", list: () => null },
    ]}
  />
);
```

:::

:::caution
Notice how we passed `resource` prop to [`useTable`][usetable]. This is necessary since for `useTable` to be able to get `resource` name from the route, it needs to be a route parameter in a dynamic route. [Refer here](#standard-crud-page) where standard CRUD pages can be built with dynamic routing.
:::

:::caution
We also used `<LayoutWrapper>` to show the page in the layout provided to [`<Refine>`][refine]. This is deliberately opt-in to provide flexibility. [If you're building a standard CRUD page layout can be baked in automatically](#standart-crud-page).
:::

### SSR

**refine** uses [react-query][reactquery] in its hooks for data management. [Following react-query's guide][reactqueryssr], SSR can be achieved like this:

```tsx title="routes/posts.tsx"
// highlight-start
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// highlight-end

import { LayoutWrapper, useTable } from "@pankod/refine-core";

// highlight-next-line
import dataProvider from "@pankod/refine-simple-rest";

export const PostList: React.FC = () => {
  // highlight-next-line
  const { initialData } = useLoaderData();

  const { tableQueryResult } = useTable<IPost>({
    resource: "posts",
    // highlight-start
    queryOptions: {
      initialData,
    },
    // highlight-end
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableQueryResult.data?.data.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// highlight-start
export const loader: LoaderFunction = async ({ params, request, context }) => {
  const API_URL = "https://api.fake-rest.refine.dev";

  try {
    const data = await dataProvider(API_URL).getList({
      resource: "posts",
    });

    return json({ initialData: data });
  } catch (error) {
    return json({});
  }
};
// highlight-end

interface IPost {
  id: number;
  title: string;
  status: string;
}

export default PostList;
```

We use the [`getList`][getlist] method from our [`dataProvider`][dataprovider] to fetch `posts` data and pass through `props` as conventionally done in Remix. Then `posts` data is available in the props of our `/posts` page. [`useTable`][usetable] can take options for underlying react-query queries with `queryOptions`. Passing `posts` data to its `initialData` loads the data on server side.

:::tip
We used `getList` from `dataProvider` but data can be fetched in any way you desire.
:::

## Standard CRUD Page

**@pankod/refine-remix-router** package provides `RemixRouteComponent` for routing in **refine** resources. Simply export the component from the page and add a [loader function][loaderfunction]. While you can create pages with defined params like `$resource/$action/$id.tsx`, we recommend using a splat route to handle all refine routing in a single file. You can start by creating a `$.tsx` file under `app/routes` in your Remix app:

```tsx title="app/routes/$.tsx"
export { RemixRouteComponent as default } from "@pankod/refine-remix-router";
```

Remix, does not handle the root `/` route in splat routes. So we also need to create a `index.tsx` file under `app/routes` with the same content:

```tsx title="app/routes/index.tsx"
export { RemixRouteComponent as default } from "@pankod/refine-remix-router";
```

:::info

You can also define routes without using `$.tsx` file like below, but a splat route is an easier approach with nested route support.

Export `RemixRouteComponent` as default in the following pages:

- `routes/$resource/index.tsx`
- `routes/$resource/$action/index.tsx`
- `routes/$resource/$action/$id/index.tsx`
- `routes/index.tsx`

`RemixRouteComponent` will use route parameters `resource` and `action` and render the associated component defined in [`resources`][refine].

- `list` component will be rendered for `/$resource` route
- `create`, `edit` and `show` will be rendered for `/$resource/$action` and `/$resource/$action/$id` routes
- For the root `/` route, it will render `DashboardPage` if it's defined and if not will navigate to the first resource in `resources`.

:::

:::caution
`RemixRouteComponent` will wrap the page with `Layout` provided to [`<Refine>`][refine]
:::

### SSR

`RemixRouteComponent` accepts an `initialData` prop for SSR data.

```ts
type RemixRouteComponentProps = {
  initialData?: any;
};
```

`initialData` must be passed as props from `loader`. `RemixRouteComponent` will pass this data as `initialData` to the `list`, `create`, `edit`, and `show` components.

For example, for a `list` component that will be rendered for `/$.tsx`, the page can use SSR like this:

```tsx title="app/routes/$.tsx"
import { json, LoaderFunction } from "@remix-run/node";
import dataProvider from "@pankod/refine-simple-rest";
import { handleRefineParams } from "@pankod/refine-remix-router";

export { RemixRouteComponent as default } from "@pankod/refine-remix-router";

const API_URL = "https://api.fake-rest.refine.dev";
export const loader: LoaderFunction = async ({ params, request }) => {
  const { resource } = params;

  const refineSplatParams = handleRefineParams(params["*"]);

  const {
    resource = undefined,
    action = undefined,
    id = undefined,
  } = { ...refineSplatParams, ...params };

  try {
    if (resource && action === "show" && id) {
      const data = await dataProvider(API_URL).getOne({
        // we're slicing the resource param to get the resource name from the last part
        resource: `${resource}`.slice(`${resource}`.lastIndexOf("/") + 1),
        id,
      });

      return json({ initialData: data });
    } else if (resource && !action && !id) {
      const data = await dataProvider(API_URL).getList({
        // we're slicing the resource param to get the resource name from the last part
        resource: `${resource}`.slice(`${resource}`.lastIndexOf("/") + 1),
      });

      return json({ initialData: data });
    }

    return null;
  } catch (error) {
    return json({});
  }
};
```

And in the `list` component for a `resource` e.g. "posts":

```tsx title="app/pages/posts/list.tsx"
// highlight-next-line
import { useLoaderData } from "@remix-run/react";
import {
  useTable,
  GetListResponse,
  IResourceComponentsProps,
} from "@pankod/refine-core";

export const PostList: React.FC<
  IResourceComponentsProps<GetListResponse<IPost>>
> = () => {
  // highlight-next-line
  const { initialData } = useLoaderData();

  const { tableQueryResult } = useTable<IPost>({
    // highlight-start
    queryOptions: {
      initialData,
    },
    // highlight-end
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableQueryResult?.data?.data.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface IPost {
  id: number;
  title: string;
  status: string;
}
```

Finally, let's give our `PostList` page as a `resource` to `<Refine>`

```tsx title="app/root.tsx"
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-remix-router";

import { PostList } from "./pages/posts/list";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix + Refine App",
  viewport: "width=device-width,initial-scale=1",
});

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Refine
          dataProvider={dataProvider(API_URL)}
          routerProvider={routerProvider}
          resources={[
            {
              name: "posts",
              list: PostList,
            },
          ]}
        >
          <Outlet />
        </Refine>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

## Server Side Authentication

There are two ways to do Server Side Authentication with Remix. You can choose one of the two methods according to your use case.

1. You can store the user session as encrypted using `createCookieSessionStorage`. When you choose this method, all authentication information will remain on the server side.
2. Self service cookies! You manage authentication cookies yourself. The plus of this method is that the Authentication information can also be used on the Client Side. (recommended)

### createCookieSessionStorage

First, let's create our `AuthProvider`. For more information on `AuthProvider`, visit our [AuthProvider documentation][authprovider].

```tsx title="app/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

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
  login: ({ username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find((item) => item.username === username);

    if (user) {
      return Promise.resolve(user);
    }

    return Promise.reject();
  },
  logout: () => {
    return Promise.resolve("/logout");
  },
  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: async ({ request, storage }) => {
    const session = await storage.getSession(request.headers.get("Cookie"));

    const user = session.get("user");

    if (!user) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: async () => {
    return Promise.resolve();
  },
  getUserIdentity: async () => {
    return Promise.resolve();
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
    const user = await authProvider.checkAuth?.({ request, storage });
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
import { useTranslate } from "@pankod/refine-core";

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

Yeeyy! Now our users can login!

:::tip
Remember, actions and loaders run on the server, so console.log calls you put in those you can't see in the browser console. Those will show up in the terminal window you're running your server in.
:::

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

### Self service Cookie

First, let's install the `js-cookie` and `cookie` packages in our project.

<InstallPackagesCommand args="js-cookie cookie"/>

<InstallPackagesCommand args="-D @types/js-cookie"/>

We will set/destroy cookies in the `login`, `logout` and `checkAuth` functions of our `AuthProvider`.

```tsx title="app/authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";
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
      return Promise.resolve();
    }

    return Promise.reject();
  },
  logout: () => {
    // highlight-next-line
    Cookies.remove(COOKIE_NAME);

    return Promise.resolve();
  },
  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: async (context) => {
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
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: async () => {
    return Promise.resolve();
  },
  getUserIdentity: async () => {
    return Promise.resolve();
  },
};
```

Tadaa! that's all!

`checkAuthentication` expects your authProvider and `request`'s context. It uses the `checkAuth` from the `authProvider` to check for authentication. In unauthenticated cases, it redirects to `/login` while keeping the original route to be navigated to after successful login.

```tsx title="app/routes/index.tsx"
import { json, LoaderFunction } from "@remix-run/node";
import { authProvider } from "~/authProvider";

//highlight-next-line
import { checkAuthentication } from "@pankod/refine-remix-router";
export { RemixRouteComponent as default } from "@pankod/refine-remix-router";

export const loader: LoaderFunction = async ({ params, request, context }) => {
  //highlight-next-line
  await checkAuthentication(authProvider, request);
  return null;
};
```

You can also add the authentication check to the routes below

- `app/routes/$resource/index.tsx`
- `app/routes/$resource/$action/index.tsx`
- `app/routes/$resource/$action/$id/index.tsx`

## `syncWithLocation` and Query Parameters in SSR

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

```tsx title="app/routes/$resource/index.tsx"
import { json, LoaderFunction } from "@remix-run/node";
import dataProvider from "@pankod/refine-simple-rest";
// highligt-next-line
import { parseTableParams } from "@pankod/refine-core";

export { RemixRouteComponent as default } from "@pankod/refine-remix-router";

const API_URL = "https://api.fake-rest.refine.dev";
export const loader: LoaderFunction = async ({ params, request }) => {
  const { resource } = params;
  const url = new URL(request.url);

  // highligt-next-line
  const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
    parseTableParams(url.search);

  try {
    const data = await dataProvider(API_URL).getList({
      resource: resource as string,
      filters: parsedFilters,
      pagination: {
        current: parsedCurrent || 1,
        pageSize: parsedPageSize || 10,
      },
      sort: parsedSorter,
    });

    return json({ initialData: data });
  } catch (error) {
    return json({});
  }
};
```

`parseTableParams` parses the query string and returns query parameters([refer here for their interfaces][interfaces]). They can be directly used for `dataProvider` methods that accept them.

## Examples

- [Ant Design](https://ant.design/) CRUD app example ([source code](https://github.com/refinedev/refine/tree/v3/examples/remix/antd))
- Headless CRUD app example ([source code](https://github.com/refinedev/refine/tree/v3/examples/remix/headless))

[remix]: https://remix.run/
[remixrouter]: https://www.npmjs.com/package/@pankod/remix-router
[routerprovider]: /core/docs/3.xx.xx/api-reference/core/providers/router-provider
[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[remixroutes]: https://remix.run/docs/en/v1/api/conventions#routes
[usetable]: /core/docs/3.xx.xx/api-reference/core/hooks/useTable
[reactqueryssr]: https://react-query.tanstack.com/guides/ssr#using-initialdata
[reactquery]: https://react-query.tanstack.com/
[getlist]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#getlist-
[dataprovider]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider
[usetable]: /core/docs/3.xx.xx/api-reference/core/hooks/useTable
[interfaces]: /core/docs/3.xx.xx/api-reference/core/interfaces/#crudfilters
[loaderfunction]: https://remix.run/docs/en/v1/api/conventions#loader
[jokesapp]: https://remix.run/docs/en/v1/tutorials/jokes#authentication
[authprovider]: /core/docs/3.xx.xx/api-reference/core/providers/auth-provider
