---
title: Using CLI
---

import { Sandpack } from "./sandpack.tsx";

<Sandpack>

In the previous step, we've learned about the Inferencer package and how to use it to generate views for resources. In this step, we'll be learning about the Refine's CLI and its features.

Refine offers a `@refinedev/cli` package that provides a set of commands and built-in utilities to help you build and manage your Refine applications. In the tutorial we'll cover the following commands:

- Runners, which are used to start the development server, build the application for production and run the preview server,
- `add` command to create new resources and providers,
- `update` command to check and update versions of the Refine packages,
- `swizzle` command to export Refine components and providers on your project to customize them.

## Installation

At the beginning of the tutorial, we've already installed the `@refinedev/cli` but if you've missed this step, you can use the below command to install it easily:

<InstallPackagesCommand args="@refinedev/cli" />

## Using Runners

We've already handed over our runners to the CLI's runners, our `package.json` file's scripts should look like the below:

```json title="package.json"
{
  "scripts": {
    "dev": "refine dev",
    "build": "refine build",
    "start": "refine start",
    "refine": "refine"
  }
}
```

These commands will use the same runners as your bundler, and using them is optional but recommended for staying updated with Refine team's updates and receiving notifications about new package versions.

:::note

Notice that we have the `refine` command defined in `"scripts"`. This command is used to run the CLI commands. You can use the `refine` command to run the CLI commands with the `npx` command as well.

:::

## Using the `add` Command

The `add` command can be used to create a new resource or provider.

Try to run the following command to create a new resource called `categories`:

```sh
npm run refine add resource categories
```

This command will create files to an appropriate location in your project, populates them with Inferencer components, and add the resource definition to your `<Refine />` component.

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/add-resource.webm" playsInline loop autoPlay muted />

We can use the `add provider` command to create new providers, with available provider options including:

- Auth Provider to handle authentication,
- Data Provider to handle data fetching and mutations,
- Live Provider to handle real-time updates,
- Access Control Provider to handle access control and permissions.
- Audit Log Provider to submit/list audit logs.
- i18n Provider to handle internationalization and localization.
- Notification Provider to handle notifications.

Try to run the following command to create a new i18n Provider:

```sh
npm run refine add provider i18n
```

By running this command, you'll be provided with the necessary files for the i18n provider and the provider definition will be added to your `<Refine />` component.

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/add-provider-i18n-2.webm" playsInline loop autoPlay muted />

## Using the `update` Command

The `update` command can be used to check and update versions of the Refine packages. As mentioned in the [Using Runners](#using-runners) section, using the runner commands notifies you of new Refine package versions, allowing you to run the update command for updates.

Try to run the following command to check and update the versions of the Refine packages:

```sh
npm run refine update
```

## Using the `swizzle` Command

The `swizzle` command is a powerful tool that exports Refine components and providers for customization. Running it allows you to customize the exported component or provider, serving as a starting point for creating your own elements.

:::note

Please note that the `swizzle` command is a one-time operation; exporting the elements detaches them from Refine's updates, making you responsible for updating them if there are any breaking changes in the future. Refine won't automatically use the exported elements in the application; you'll need to import and use them manually.

:::

Try to run the following command to see swizzle in action:

```sh
npm run refine swizzle
```

Running this command prompts you to select the package and elements you want to export. Once selected, the CLI exports them to the appropriate directory based on your application's setup.

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/cli-swizzle.webm" playsInline loop autoPlay muted />

In this step, we've briefly covered the Refine's CLI and its features. In the next step, we'll be learning about the Refine's Devtools.

</Sandpack>
