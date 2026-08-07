---
title: Authentication
---

import { Sandpack, UseAuthPageInLogin } from "./sandpack.tsx";

<Sandpack>

Now our application is ready to use with layouts, views and notifications. Only thing left unstyled is the `/login` page. Refine provides [`<AuthPage />`](/core/docs/ui-integrations/ant-design/components/auth-page) components which works with Refine's auth hooks and uses the UI elements from the Ant Design.

`<AuthPage />` component supports multiple views such as:

- Login page with type `login` which renders a login form with links to the other auth pages such as forgot password and sign up and works with the `useLogin` hook.
- Register page with type `register` which renders a register form and works with the `useRegister` hook.
- Forgot password page with type `forgotPassword` which renders a forgot password form and works with the `useForgotPassword` hook.
- Update password page with type `updatePassword` which renders a update password form and works with the `useUpdatePassword` hook.

## Using `<AuthPage />` Component

Now let's update our `<Login />` component to use the `<AuthPage />` from `@refinedev/antd` package. This component will provide a consistent look and feel with the rest of the application.

Update your `src/pages/login.tsx` file by adding the following lines:

```tsx title="src/pages/login.tsx"
import React from "react";
import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: {
          email: "demo@demo.com",
          password: "demodemo",
        },
      }}
    />
  );
};
```

<UseAuthPageInLogin />

Now logout and try to login again. You will see the new login page with the Ant Design components.

## Summary

In this unit, we've covered the following topics:

- How Refine deals with the UI libraries,
- Using layouts and views to create complex UIs,
- Using tailored hooks and components to manage tables, forms, buttons and fields,
- Handling notifications in Refine with Ant Design's notification system,
- Handling authentication pages with Refine's prebuilt `<AuthPage />` components.

In the next unit, we'll learn about the additional tools and packages that Refine provides to make the developer experience even better.

</Sandpack>
