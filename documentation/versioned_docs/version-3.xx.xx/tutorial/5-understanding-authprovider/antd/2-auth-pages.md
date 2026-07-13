---
id: auth-pages
title: 3. Auth Pages
tutorial:
  prev: 3.xx.xx/tutorial/understanding-authprovider/create-authprovider
  next: false
---

```tsx live shared
window.__refineAuthStatus = false;

const authProvider = {
  login: (params) => {
    window.__refineAuthStatus = true;
    console.log("login: ", params);
    return Promise.resolve();
  },
  register: (params) => {
    console.log("register: ", params);
    return Promise.resolve();
  },
  forgotPassword: () => {
    console.log("forgotPassword: ", params);
    return Promise.resolve();
  },
  updatePassword: () => {
    console.log("updatePassword: ", params);
    return Promise.resolve();
  },
  logout: () => {
    window.__refineAuthStatus = false;
  },
  checkAuth: () =>
    window.__refineAuthStatus ? Promise.resolve() : Promise.reject(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
  getUserIdentity: () => Promise.resolve(),
};

import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";

import "@pankod/refine-antd/dist/reset.css";

const App: React.FC = () => {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          { path: "/login", element: <AuthPage /> },
          {
            path: "/register",
            element: <AuthPage type="register" />,
          },
          {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
          },
          {
            path: "/update-password",
            element: <AuthPage type="updatePassword" />,
          },
        ],
      }}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: "blog_posts",
          list: AntdInferencer,
          show: AntdInferencer,
          create: AntdInferencer,
          edit: AntdInferencer,
        },
      ]}
    />
  );
};
```

In this section, we will learn how to create auth pages such as login, signup, forgot password and reset password using the `<AuthPage/>` component.

[Refer to the `<AuthPage/>` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/antd/components/antd-auth-page/)

`<AuthPage/>` component provides auth pages for login, signup, forgot password and reset password. It also provides a way to customize theses pages with various props. So, `<AuthPage/>` is a quick starting point for creating auth pages.

Before using `<AuthPage/>` component, we need to create an auth provider because `<AuthPage/>` component uses the auth provider to perform auth operations. However, we have already created an auth provider in the previous section. So, we will use the same auth provider for this section.

Let's create the auth pages step by step.

## Login Page

Login page is used to authenticate users. It provides a basic form to enter email, password and remember. After submitting the form, it sends the email, password and remember to the auth provider's `login` method via `useLogin` hook.

1. Open `src/App.tsx` file and import the `<AuthPage/>` component.

   ```tsx
   import { AuthPage } from "@pankod/refine-antd";
   ```

2. Add the `<AuthPage/>` component to the `routes` prop of the `routerProvider` prop of the `<Refine/>` component.

   ```tsx
   import { Refine } from "@pankod/refine-core";
   import {
     Layout,
     ReadyPage,
     useNotificationProvider,
     ErrorComponent,
     //highlight-next-line
     AuthPage,
   } from "@pankod/refine-antd";
   import dataProvider from "@pankod/refine-simple-rest";
   import routerProvider from "@pankod/refine-react-router-v6";

   import { BlogPostList } from "pages/blog-posts/list";
   import { BlogPostEdit } from "pages/blog-posts/edit";
   import { BlogPostshow } from "pages/blog-posts/show";
   import { BlogPostCreate } from "pages/blog-posts/create";

   import { authProvider } from "./authProvider";

   import "@pankod/refine-antd/dist/reset.css";

   const App: React.FC = () => {
     return (
       <Refine
         authProvider={authProvider}
         //highlight-start
         routerProvider={{
           ...routerProvider,
           routes: [{ path: "/login", element: <AuthPage /> }],
         }}
         //highlight-end
         dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
         Layout={Layout}
         ReadyPage={ReadyPage}
         notificationProvider={useNotificationProvider}
         catchAll={<ErrorComponent />}
         resources={[
           {
             name: "blog_posts",
             list: BlogPostList,
             edit: BlogPostEdit,
             show: BlogPostShow,
             create: BlogPostCreate,
           },
         ]}
       />
     );
   };
   ```

   By default, `<AuthPage>` component renders the login page. So, we don't need to pass any props to the `<AuthPage/>` component.

   :::note

   When the user submits the login form, it passes the email, password and remember to the auth provider's `login` method like below:

   ```ts
   const authProvider = {
       login: ({ email, password, remember }) => {
           ...
       },
       ...
   };
   ```

   :::

3. Run the app and navigate to the `/login` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/login
setInitialRoutes(["/login"]);

render(<App />);
```

<br />

:::tip

You can also use the `LoginPage` prop of the `<Refine/>` component to render the login page.

```tsx
<Refine
    authProvider={authProvider}
    routerProvider={routerProvider}
    ...
    //highlight-start
    LoginPage={AuthPage}
    //highlight-end
/>
```

[Refer to the `<Refine/>` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#loginpage)

:::

## Register Page

Register page is used to register new users. It provides a basic form to enter email and password. After submitting the form, it sends the email and password to the auth provider's `register` method via `useRegister` hook.

1. Open `src/App.tsx` file and add the `<AuthPage/>` component to the `routes` prop of the `routerProvider` prop of the `<Refine/>` component.

   ```tsx
   import { Refine } from "@pankod/refine-core";
   import {
     Layout,
     ReadyPage,
     useNotificationProvider,
     ErrorComponent,
     //highlight-next-line
     AuthPage,
   } from "@pankod/refine-antd";
   import dataProvider from "@pankod/refine-simple-rest";
   import routerProvider from "@pankod/refine-react-router-v6";

   import { BlogPostList } from "pages/blog-posts/list";
   import { BlogPostEdit } from "pages/blog-posts/edit";
   import { BlogPostShow } from "pages/blog-posts/show";
   import { BlogPostCreate } from "pages/blog-posts/create";

   import { authProvider } from "./authProvider";

   import "@pankod/refine-antd/dist/reset.css";

   const App: React.FC = () => {
     return (
       <Refine
         authProvider={authProvider}
         routerProvider={{
           ...routerProvider,
           routes: [
             { path: "/login", element: <AuthPage /> },
             //highlight-start
             {
               path: "/register",
               element: <AuthPage type="register" />,
             },
             //highlight-end
           ],
         }}
         dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
         Layout={Layout}
         ReadyPage={ReadyPage}
         notificationProvider={useNotificationProvider}
         catchAll={<ErrorComponent />}
         resources={[
           {
             name: "blog_posts",
             list: BlogPostList,
             edit: BlogPostEdit,
             show: BlogPostShow,
             create: BlogPostCreate,
           },
         ]}
       />
     );
   };
   ```

   We need to pass the `type` prop to the `<AuthPage/>` component to render the register page.

   :::note

   When the user submits the register form, it passes the email and password to the auth provider's `register` method like below:

   ```ts
   const authProvider = {
       register: ({ email, password }) => {
           ...
       },
       ...
   };
   ```

   :::

2. Run the app and navigate to the `/register` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/register
setInitialRoutes(["/register"]);

render(<App />);
```

## Forgot Password Page

Forgot password page is used to send a reset password link to the user's email. It provides a basic form to enter email. After submitting the form, it sends the email to the auth provider's `forgotPassword` method via `useForgotPassword` hook.

1. Open `src/App.tsx` file and add the `<AuthPage/>` component to the `routes` prop of the `routerProvider` prop of the `<Refine/>` component.

   ```tsx
   import { Refine } from "@pankod/refine-core";
   import {
     Layout,
     ReadyPage,
     useNotificationProvider,
     ErrorComponent,
     //highlight-next-line
     AuthPage,
   } from "@pankod/refine-antd";
   import dataProvider from "@pankod/refine-simple-rest";
   import routerProvider from "@pankod/refine-react-router-v6";

   import { BlogPostList } from "pages/blog-posts/list";
   import { BlogPostEdit } from "pages/blog-posts/edit";
   import { BlogPostShow } from "pages/blog-posts/show";
   import { BlogPostCreate } from "pages/blog-posts/create";

   import { authProvider } from "./authProvider";

   import "@pankod/refine-antd/dist/reset.css";

   const App: React.FC = () => {
     return (
       <Refine
         authProvider={authProvider}
         routerProvider={{
           ...routerProvider,
           routes: [
             { path: "/login", element: <AuthPage /> },
             {
               path: "/register",
               element: <AuthPage type="register" />,
             },
             //highlight-start
             {
               path: "/forgot-password",
               element: <AuthPage type="forgotPassword" />,
             },
             //highlight-end
           ],
         }}
         dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
         Layout={Layout}
         ReadyPage={ReadyPage}
         notificationProvider={useNotificationProvider}
         catchAll={<ErrorComponent />}
         resources={[
           {
             name: "blog_posts",
             list: BlogPostList,
             edit: BlogPostEdit,
             show: BlogPostShow,
             create: BlogPostCreate,
           },
         ]}
       />
     );
   };
   ```

   We need to pass the `forgotPassword` prop to the `<AuthPage/>` component to render the forgot password page.

   :::note

   When the user submits the forgot password form, it passes the email to the auth provider's `forgotPassword` method like below:

   ```ts

   const authProvider = {
       forgotPassword: ({ email }) => {
           ...
       },
       ...
   };
   ```

   :::

2. Run the app and navigate to the `/forgot-password` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/forgot-password
setInitialRoutes(["/forgot-password"]);

render(<App />);
```

## Update Password Page

Update password page is used to update the user's password. It provides a basic form to enter new password and confirm password. After submitting the form, it sends the new password and confirm password to the auth provider's `updatePassword` method via `useUpdatePassword` hook.

1. Open `src/App.tsx` file and add the `<AuthPage/>` component to the `routes` prop of the `routerProvider` prop of the `<Refine/>` component.

   ```tsx
   import { Refine } from "@pankod/refine-core";
   import {
     Layout,
     ReadyPage,
     useNotificationProvider,
     ErrorComponent,
     //highlight-next-line
     AuthPage,
   } from "@pankod/refine-antd";
   import dataProvider from "@pankod/refine-simple-rest";
   import routerProvider from "@pankod/refine-react-router-v6";

   import { BlogPostList } from "pages/blog-posts/list";
   import { BlogPostEdit } from "pages/blog-posts/edit";
   import { BlogPostShow } from "pages/blog-posts/show";
   import { BlogPostCreate } from "pages/blog-posts/create";

   import { authProvider } from "./authProvider";

   import "@pankod/refine-antd/dist/reset.css";

   const App: React.FC = () => {
     return (
       <Refine
         authProvider={authProvider}
         routerProvider={{
           ...routerProvider,
           routes: [
             { path: "/login", element: <AuthPage /> },
             {
               path: "/register",
               element: <AuthPage type="register" />,
             },
             {
               path: "/forgot-password",
               element: <AuthPage type="forgotPassword" />,
             },
             //highlight-start
             {
               path: "/update-password",
               element: <AuthPage type="updatePassword" />,
             },
             //highlight-end
           ],
         }}
         dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
         Layout={Layout}
         ReadyPage={ReadyPage}
         notificationProvider={useNotificationProvider}
         catchAll={<ErrorComponent />}
         resources={[
           {
             name: "blog_posts",
             list: BlogPostList,
             edit: BlogPostEdit,
             show: BlogPostShow,
             create: BlogPostCreate,
           },
         ]}
       />
     );
   };
   ```

   We need to pass the `updatePassword` prop to the `<AuthPage/>` component to render the update password page.

   :::note

   When the user submits the update password form, it passes the new password and confirm password to the auth provider's `updatePassword` method like below:

   ```ts
   const authProvider = {
       updatePassword: ({ password, confirmPassword }) => {
           ...
       },
       ...
   };
   ```

   :::

2. Run the app and navigate to the `/update-password` page.

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/update-password
setInitialRoutes(["/update-password"]);

render(<App />);
```

## Customizing Auth Pages

You can customize the auth pages by using the `<AuthPage/>` component's props. Also, you can use [`refine-cli`](/core/docs/3.xx.xx/packages/documentation/cli/) to [swizzle](/core/docs/3.xx.xx/packages/documentation/cli/#swizzle) the auth pages.

[Refer to the `<AuthPage/>` component's props to customize the auth pages &#8594](/core/docs/3.xx.xx/api-reference/core/components/auth-page/#props)

When you swizzle the auth pages, default auth pages will be copied to the `components/pages/auth` folder. You can customize the auth pages as you want by editing the files.

Let's customize the auth pages.

1. Run the following command in the project directory.

   ```bash
   npm run refine swizzle
   ```

2. Select the `@pankod/refine-antd` package.

   ```bash
       ? Which package do you want to swizzle?
       UI Framework
       ❯  @pankod/refine-antd
   ```

3. Select the `AuthPage` component.

   ```bash
       ? Which component do you want to swizzle?
       Pages
          ErrorPage
       ❯  AuthPage
   ```

After swizzling the auth pages, you will show the success message like below.

```bash
    Successfully swizzled AuthPage

    Files created:
    - src/components/pages/auth/index.tsx
    - src/components/pages/auth/components/forgotPassword.tsx
    - src/components/pages/auth/components/login.tsx
    - src/components/pages/auth/components/register.tsx
    - src/components/pages/auth/components/updatePassword.tsx
    - src/components/pages/auth/components/index.tsx
    - src/components/pages/auth/components/styles.ts
    ...
```

Now, you can customize the auth pages by editing the files in the `src/components/pages/auth` folder.

<br/>
<br/>

<Checklist>

<ChecklistItem id="auth-provider-antd-auth-pages">
I understood how to use AuthPage component to render auth pages.
</ChecklistItem>
<ChecklistItem id="auth-provider-antd-auth-pages-2">
I understood how to customize auth pages.
</ChecklistItem>

</Checklist>
