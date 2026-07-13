---
title: Redirects
---

import { Sandpack, AddRedirectsToAuthProvider, AddCustomRedirectToCreate, AddCustomRedirectToEdit } from "./sandpack.tsx";

<Sandpack>

Now we've updated our components to benefit from the parameter inference of Refine. In this step, we'll be learning about the redirects and how to benefit from them in our forms and auth provider.

Refine can manage redirects automatically for you. After a successful form submission, Refine will try to redirect the user to the appropriate page.

Just like the forms, redirects are also supported in the auth provider. By providing a `redirectTo` parameter to the return values of the `login`, `logout` and `onError` method, you can redirect the user to the appropriate page. Such as the index page after a successful login or the login page after a successful logout.

## Redirecting After Form Submission

By default, Refine will redirect the user to the list page of the target resource after a successful form submission. We can customize this behavior by providing a `redirect` parameter to the `useForm` hook.

:::tip

You can also use the `options.redirect` prop of the `<Refine />` component to set a default redirect for all forms per action.

:::

### Showing the Record After Update

Let's update our `<EditProduct />` component and provide a `redirect` parameter to let users redirect to the show page of the edited product after a successful form submission.

Update your `src/pages/products/edit.tsx` file by adding the following lines:

```tsx title="src/pages/products/edit.tsx"
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  const { onFinish, mutation, query } = useForm({
    // highlight-start
    // This will redirect to the show page after the mutation is successful.
    // Default value is `"list"`.
    // We can also provide `false` to disable the redirect.
    redirect: "show",
    // highlight-end
  });

  /* ... */
};
```

<AddCustomRedirectToEdit />

### Continue to Edit the Record After Creation

Let's update our `<CreateProduct />` component and provide a `redirect` parameter to let users continue to edit the created product after a successful form submission.

Update your `src/pages/products/create.tsx` file by adding the following lines:

```tsx title="src/pages/products/create.tsx"
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({
    // highlight-start
    // We can also provide `false` to disable the redirect.
    // Default value is `"list"`.
    redirect: "edit",
    // highlight-end
  });

  /* ... */
};
```

<AddCustomRedirectToCreate />

## Handling Redirects in Auth Provider

Refine provides a simple way to integrate routing into your auth provider. By providing a `redirectTo` parameter to the return values of the `login`, `logout` and `onError` methods, you can redirect the user to the appropriate page. Such as the index page after a successful login or the login page after a successful logout.

Let's update our `src/providers/auth-provider.ts` file and provide a `redirectTo` properties to the return values of the `login` and `logout` methods. We want to redirect the user to the index page after a successful login and to the login page after a successful logout.

Update your `src/providers/auth-provider.ts` file by adding the following lines:

```tsx title="src/providers/auth-provider.ts"
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  logout: async () => {
    localStorage.removeItem("my_access_token");

    // highlight-start
    // Let's redirect to the login page after a successful logout.
    return { success: true, redirectTo: "/login" };
    // highlight-end
  },
  login: async ({ email, password }) => {
    const response = await fetch(
      "https://api.fake-rest.refine.dev/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      // highlight-start
      // Let's redirect to the index page after a successful login.
      return { success: true, redirectTo: "/" };
      // highlight-end
    }

    return { success: false };
  },
  /* ... */
};
```

<AddRedirectsToAuthProvider />

Now we've learned about the redirects and how to benefit from them in our forms and auth provider, let's move on to the next step. In the next step, we'll be learning about how to store the currentPage table state in the URL.

</Sandpack>
