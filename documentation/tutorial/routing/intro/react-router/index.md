---
title: Introduction
---

import { Sandpack, AddRouterProviderToApp } from "./sandpack.tsx";

<Sandpack>

Now we've learned the data fetching essentials and basics of authentication in Refine. In this unit, we'll learn how to add a router provider to our app and the features we're unlocking with a router provider.

Refine provides integrations for the most popular routing options such as [React Router](/core/docs/routing/integrations/react-router), [Next.js](/core/docs/routing/integrations/next-js) and [Remix](/core/docs/routing/integrations/remix).

:::simple Implementation Tips

- It's recommended to pick a built-in integration for your router but if you want to use a custom solution you can create your own provider with Refine's easy to use [router provider interface](/core/docs/routing/router-provider).

- Refine won't interfere with your router's way of handling navigation. You'll be generating the routes/pages as you would normally do with your router.

- Providing a router provider to Refine will unlock many features without giving up any of your router's features.

:::

This unit will cover the following topics:

- Refine's resource concept and how to use it,
- Using router integration to infer parameters such as `resource`, `action` and `id` from the URL,
- Handling navigation and redirections in Refine,
- Using router integration to store form and table states in the URL,
- Finally, handling authentication with router options.

This unit will be UI framework agnostic. Related parts of routing for the UI frameworks will be covered in the next units.

## Adding Router Provider

Let's get started with adding our dependencies. For routing, we will use `react-router`, and to integrate it with Refine, we'll be using `@refinedev/react-router` package.

<InstallPackagesCommand args="react-router @refinedev/react-router"/>

Then we'll pass our router provider to the `<Refine />` component. Additionally, we'll be wrapping our app with `<BrowserRouter />` from `react-router`.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
// highlight-next-line
import routerProvider from "@refinedev/react-router";

// highlight-next-line
import { BrowserRouter } from "react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    // highlight-next-line
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        // highlight-next-line
        routerProvider={routerProvider}
      >
        <Authenticated key="protected" fallback={<Login />}>
          <Header />
          {/* <ShowProduct /> */}
          {/* <EditProduct /> */}
          <ListProducts />
          {/* <CreateProduct /> */}
        </Authenticated>
      </Refine>
      {/* highlight-next-line */}
    </BrowserRouter>
  );
}
```

<AddRouterProviderToApp />

Now we're ready to start exploring the features of Refine's router integration.

In the next step, we'll be learning about how to inform Refine about the related routes per resource.

</Sandpack>
