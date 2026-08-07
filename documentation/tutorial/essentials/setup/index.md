---
title: Your First Refine App
---

import { Sandpack } from "./sandpack.tsx";

<Sandpack>

Creating a new Refine app is super simple and takes only a few steps to generate a fully functional app. For the sake of this tutorial, we will not be using the `create-refine-app` at its full potential. Instead, we will be creating an empty app and installing the required dependencies and configuring the app manually.

<Tabs wrapContent={false}>

<TabItem value="quick" label="Quick Setup">

To follow this tutorial along, you can use the starter templates provided by `create-refine-app`. The following command will create a new empty project for you with `@refinedev/core` and `@refinedev/cli` packages, providing everything needed to get started with the tutorial.

```sh
npm create refine-app@latest -- --example starter-vite
```

</TabItem>

<TabItem value="manual" label="Manual Setup">

We'll need to create our app using the appropriate templates. Then, we'll move on to installing the Refine dependencies and configuring the app.

```sh
npm create vite@latest my-refine-app -- --template react-ts
```

To learn more about Vite and project creation, you can visit [Vite's documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

After we've created our project, we'll need to install the Refine dependencies.

```sh
npm install @refinedev/core @refinedev/cli
```

We're installing `@refinedev/core` which provides all the core functionalities of Refine and `@refinedev/cli` which although optional, provides a lot of useful features for the development process. To learn more about `@refinedev/cli`, you can visit [its documentation](/core/docs/packages/cli).

### Configuring the Scripts

We'll replace our `dev`, `build` and `serve` scripts with the following:

```json
{
  "scripts": {
    "dev": "refine dev",
    "build": "refine build",
    "serve": "refine serve"
  }
}
```

While `refine`'s runner commands will use the same commands as the ones provided by the bundler, it will provide some useful features such as version checks for the dependencies and announcements from Refine team.

### Configuring the App

We'll need to mount `<Refine />` component to our app. We'll mount it to the root of our app.

```tsx title="src/App.tsx"
import { Refine, WelcomePage } from "@refinedev/core";

function App() {
  return (
    <Refine>
      <WelcomePage />
    </Refine>
  );
}

export default App;
```

We're not really doing anything special here. We're just mounting the `<Refine />` component to our app. `<Refine />` component is the core component of Refine and it provides all the necessary context and logic for the app to work.

The `<WelcomePage />` component is a component that is provided by `@refinedev/core` and it is a simple page that welcomes you to Refine. You can remove it if you want.

This will be enough to get our app up and running. We can now start our app using the following command:

```sh
npm run dev
```

When you open your browser and navigate to localhost, you should the page at right. If everything is working as expected, move on to the next section.

</TabItem>

</Tabs>

:::tip Tailored App Generation

`create-refine-app` by default walks you through a few steps to create a new app tailored to your needs from data providers to authentication, UI libraries and more. You can read more about it in the [quickstart](/core/docs/getting-started/quickstart) section.

:::

</Sandpack>
