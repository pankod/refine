---
title: "Refine v4 DevTools | Advanced Debugging & Tuning"
display_title: "Devtools"
sidebar_label: "Devtools"
description: "Speed up your development with Refine DevTools. Monitor application state and optimize performance directly in your React environment."
---

import DockerUsage from "./docker.tsx";

# Refine Devtools

In addition to the features provided by the [Refine Devtools](/core/docs/guides-concepts/development/#using-devtools), Enterprise Edition allows you to change the port of the devtools server or use a custom domain for the devtools server. This is useful if you're dockerizing your app and devtools server separately or using multiple Refine apps and want to use Refine Devtools for multiple apps.

## Specifying the Port

You can be using `@refinedev/cli` or `@refinedev/devtools-server` to start the devtools server. Both of these tools will respect the `REFINE_DEVTOOLS_PORT` environment variable. Changing the port is as simple as setting the `REFINE_DEVTOOLS_PORT` environment variable to the desired port number.

```bash
REFINE_DEVTOOLS_PORT=5002 refine dev
```

When `REFINE_DEVTOOLS_PORT` is set in `refine dev` command, it will be automatically propagated to your App and made available as an environment variable. The environment variable will automatically be used by the `<DevtoolsProvider />` component of the `@refinedev/devtools` to connect to the devtools server. If the environment variable is not working in the browser or you want to use a custom domain, you can manually set the URL in the `<DevtoolsProvider />` component via the `url` prop.

```tsx title="App.tsx"
import Refine from "@refinedev/core";
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";

const App = () => {
  return (
    <DevtoolsProvider
      // highlight-next-line
      url="http://refine-devtools.local"
    >
      <Refine>
        {/* ... */}
        <DevtoolsPanel />
      </Refine>
  );
};
```

## Using Custom Domains with Docker

In this example, we'll dockerize a Refine app and Refine Devtools separately and serve them on `http://my-app.local` and `http://devtools.local` respectively. After our setup is complete, we'll use the `url` prop of the `<DevtoolsProvider />` component to connect to the devtools server.

<DockerUsage />

Then, we'll need to update our `/etc/hosts` file to point `my-app.local` and `devtools.local` to `127.0.0.1`,

```txt
127.0.0.1 my-app.local
127.0.0.1 devtools.local
```

That's it! Now you can run your Refine app and Refine Devtools separately in Docker containers and connect to the devtools server using the custom domain. Notice that we're only changing one line in our `App.tsx` file to use the custom domain, rest will be handled by the `@refinedev/devtools` package.
