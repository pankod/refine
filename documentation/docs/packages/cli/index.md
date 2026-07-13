---
title: "CLI Integration Guide | Best Practices in Refine v5"
display_title: "CLI"
sidebar_label: "CLI"
description: "Learn to implement CLI in Refine v5. Learn swizzle and command for real-world React admin panels. Hands-on examples included."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Refine CLI is a command line application that allows you to interact with your Refine project and perform some tasks. This includes [creating a new resource](#create-resource), [managing updates](#update), [swizzle](#swizzle) components, and [runs your project](#dev--start--build) (build, start, dev).

```bash
> npm run refine
Usage: refine <command> [options]

      ___           ___           ___                       ___           ___
     /\  \         /\  \         /\  \          ___        /\__\         /\  \
    /::\  \       /::\  \       /::\  \        /\  \      /::|  |       /::\  \
   /:/\:\  \     /:/\:\  \     /:/\:\  \       \:\  \    /:|:|  |      /:/\:\  \
  /::\~\:\  \   /::\~\:\  \   /::\~\:\  \      /::\__\  /:/|:|  |__   /::\~\:\  \
 /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\  __/:/\/__/ /:/ |:| /\__\ /:/\:\ \:\__\
 \/_|::\/:/  / \:\~\:\ \/__/ \/__\:\ \/__/ /\/:/  /    \/__|:|/:/  / \:\~\:\ \/__/
    |:|::/  /   \:\ \:\__\        \:\__\   \::/__/         |:/:/  /   \:\ \:\__\
    |:|\/__/     \:\ \/__/         \/__/    \:\__\         |::/  /     \:\ \/__/
    |:|  |        \:\__\                     \/__/         /:/  /       \:\__\
     \|__|         \/__/                                   \/__/         \/__/

Options:
  -v, --version              Output the current version.
  -h, --help                 Output usage information.

Commands:
  swizzle                    Export a component or a function from refine packages to customize it in your project
  create-resource [options]  Create a new resource files (deprecated, please use "add resource" command)
  update [options]           Interactively select and update all `refine` packages to selected version. To skip the interactive mode, use the `--all` option.
  dev [options] [args...]    It runs: `unknown `. Also accepts all the arguments `unknown` accepts.
  build [options] [args...]  It runs: `unknown `. Also accepts all the arguments `unknown` accepts.
  start [options] [args...]  It runs: `unknown `. Also accepts all the arguments `unknown` accepts.
  run [command] [args...]    Runs a defined package script. If no `command` is provided, it will list the available scripts
  check-updates              Check all installed `refine` packages are up to date
  whoami                     View the details of the development environment
  proxy [options]            Manage proxy settings
  devtools [command]         Start or install refine's devtools server; it starts on port 5001.
  add                        Add new resources, providers, or integrations
  help [command]             display help for command
```

:::simple Installation

CLI is automatically installed in projects created with the `create refine-app` command. You can use the [commands](#commands) immediately 🎉

If you want to add it to your existing project, checkout [how to add to an existing project?](#how-to-add-to-an-existing-project) section.

:::

## Commands

### swizzle

In this command, you can swizzle the components of the Refine. This allows you to customize the components and use your own components.

<details>

<summary>Why is it called swizzling?</summary>

The term comes from Objective-C and Swift-UI: [method swizzling](https://pspdfkit.com/blog/2019/swizzling-in-swift/) is the process of changing the implementation of an existing selector (method).

For Refine, component swizzling means providing an alternative component that will be used instead of the default one.

You can think of it as [Monkey Patching](https://en.wikipedia.org/wiki/Monkey_patch) for React components, which allows you to change the default implementation. Gatsby has a similar feature called [theme shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/).

**Thanks to the [Docusaurus](https://docusaurus.io) team for inspiring us for this feature.**

</details>

#### Do I need to swizzle?

Refine packages provide data providers, UI frameworks, and components that make it easy to build a project. Most these are customizable and can be used as is. However, sometimes you may want to customize it as if you created it yourself. This is where swizzling comes in. Most of Refine packages provide a swizzle command that ejects the files to your project. You can then customize them as you wish.

#### Usage

Let's create a new component by swizzling the `Layout` components.

```bash
> npm run refine swizzle

? Which package do you want to swizzle? (Use arrow keys or type to search)

Data Provider
 ◯ @refinedev/simple-rest
UI Framework
 ◉ @refinedev/antd
```

First, you need to select the package you want to swizzle. In this example, we will swizzle the `@refinedev/antd` package.

:::simple Good to know

Refine CLI will only show the packages that are installed in your project.

:::

```bash
? Which component do you want to swizzle?

 ◯ TagField
 ◯ TextField
 ◯ UrlField
Other
 ◯ Breadcrumb
❯◉ Layout
Pages
 ◯ ErrorPage
 ◯ AuthPage
(Move up and down to reveal more choices)
```

Then, you need to select the component you want to swizzle. In this example, we will swizzle the `Layout` component.

```bash
Successfully swizzled Layout
Files created:
 - src/components/layout/sider.tsx
 - src/components/layout/header.tsx
 - src/components/layout/title.tsx
 - src/components/layout/index.tsx

Warning:
If you want to change the default layout;
You should wrap your pages with layout/index.tsx inside <Refine>
component.

    ╭ App.tsx ────────────────────────────────────────╮
    │                                                 │
    │   import { Layout } from "components/layout";   │
    │                                                 │
    │   const App = () => {                           │
    │       return (                                  │
    │           <Refine                               │
    │               /* ... */                         │
    │           >                                     │
    │               <Layout>                          │
    │                   {/* ... */}                   │
    │               <Layout>                          │
    │           </Refine>                             │
    │       );                                        │
    │   }                                             │
    │                                                 │
    ╰─────────────────────────────────────────────────╯
```

Finally, the swizzle command will create a new folder in the `src/components/layout` directory and generate the layout components of the `@refinedev/antd` package in it.

:::simple Good to know

- Refine CLI determines the path to create a new folder according to the framework you are using. For example, if you are using the `remix`, the path will be `app/components/layout`.

- If there is already a file with the same name in the directory, the swizzle command will not overwrite it.

:::

### add

Use this command to add a new `resource`, `provider`, or `integration` to your project.

#### resource

CRUD components are created for the selected actions. These components are put on the specified path. The folder name here becomes plural.

```bash
> npm run refine add resource
```

| Argument                | Description                               |
| ----------------------- | ----------------------------------------- |
| resourceName (optional) | The name of the resource you want to add. |

#### provider

Empty Provider methods are created for to easily implement and connect to your data source from your Refine project. These components are put on the specified path.

```bash
> npm run refine add provider

? Which providers do you want to add? (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◯ Auth provider - Manage user authentication and authorization
 ◯ Live provider - Enable real-time updates and synchronization
 ◯ Data provider - Communicate with your API
 ◯ Access Control - Manage user permissions & roles
 ◯ Notification provider - Display in-app alerts and messages
 ◯ I18n provider - Support multiple languages and locales
 ◯ Audit Log provider - Display audit logs for your resources
```

```bash
> npm run refine add provider auth
> npm run refine add provider data
> npm run refine add provider live
> npm run refine add provider access-control
> npm run refine add provider audit-log
> npm run refine add provider i18n
> npm run refine add provider notification
```

| Argument                                                                                                               | Description                               |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `auth` &#124 `data` &#124 `live` &#124 `access-control` &#124 `audit-log` &#124 `i18n` &#124 `notification` (required) | The name of the provider you want to add. |

| Alias | Option    | Default                                                                                             | Description                                                                                |
| ----- | --------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| -a    | --actions | `list`,`create`,`edit`,`show`                                                                       | Only generate the specified actions for resource. (works only when `add resource`)         |
| -p    | --path    | (when `add resource`): react/vite: `src/pages` next.js: `src/components` remix: `app/components`    | The path to create source files. (It is created automatically according to the framework.) |
| -p    | --path    | (when `add providers`): react/vite: `src/providers` next.js: `src/providers` remix: `app/providers` | The path to create source files. (It is created automatically according to the framework.) |
| -h    | --help    |                                                                                                     | Output usage information                                                                   |

#### integration

You can use this command to add integration to your existing projects.

```bash
> npm run refine add integration

? Which integration do you want to add? (Use arrow keys)
❯ Ant Design - Setup Ant Design with Refine
  React Router - Setup routing with React Router
```

### update

Interactively update your outdated Refine packages. To skip interactive mode, use the `--all` flag to update all outdated Refine packages to selected tag.

```bash
> npm run refine update

? Choose packages to update (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

   Package                          From      To

Patch Updates
 ◯ @refinedev/cli                1.5.1 -> 1.5.3

Minor Updates
 ◯ @refinedev/airtable           2.1.1 -> 2.7.8
 ◉ @refinedev/core              3.88.1 -> 3.90.4
 ◯ @refinedev/react-hook-form   3.31.0 -> 3.33.2
 ◯ @refinedev/simple-rest        2.6.0 -> 2.7.8
❯◉ @refinedev/strapi            3.18.0 -> 3.37.0

Major Updates
 ◯ @refinedev/airtable           2.1.1 -> 3.33.0
 ◯ @refinedev/simple-rest        2.6.0 -> 3.35.2
```

#### Options

| Option    | Alias | Description                                                                                 | Values           | Default                                                    |
| --------- | ----- | ------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------- |
| --tag     | -t    | Select version to update to.                                                                | `latest`, `next` | Version ranges in the `package.json` will be installed.    |
| --all     | -a    | Use to skip interactive mode update and update all `Refine` packages to the selected `tag`. |                  | `false` Interactive mode will be open.                     |
| --dry-run | -d    | Use to skip automatic installation. Prints the update command of the packages.              |                  | `false` Selected packages will be installed automatically. |

### check-updates

Show the running versions of the installed Refine packages.

```bash
> npm run refine check-updates
                                    Update Available
                ┌────────────────────────────────┬─────────┬────────┬────────┐
                │ name                           │ current │ wanted │ latest │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @refinedev/airtable        │ 2.1.1   │ 2.7.8  │ 3.33.0 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @refinedev/cli             │ 1.5.1   │ 1.5.3  │ 1.5.3  │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @refinedev/core            │ 3.88.1  │ 3.90.4 │ 3.90.4 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @refinedev/react-hook-form │ 3.31.0  │ 3.33.2 │ 3.33.2 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @refinedev/simple-rest     │ 2.6.0   │ 2.7.8  │ 3.35.2 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @refinedev/strapi          │ 3.18.0  │ 3.37.0 │ 3.37.0 │
                └────────────────────────────────┴─────────┴────────┴────────┘
                    To update `Refine` packages with the wanted version
                        Run the following command npm run refine update
```

### dev, start, build

When you run `npm run refine [dev | start | build]` It will detect the framework you are using and run the commands accordingly.

Also you can pass environment variables, and all the options that are available in the framework. For example, you can run `npm run refine dev --port 3001` to run the app on port `3001`.

<Tabs
defaultValue="cra"
values={[
{label: 'React', value: 'cra'},
{label: 'Next.js', value: 'nextjs'},
{label: 'Remix', value: 'remix'}
]}>

<TabItem value="cra">

```bash
 # Starts application in development mode. Equivalent to `react-scripts start` or `vite`.
npm run refine dev
```

```bash
# Creates a production build of your app. Equivalent to `react-scripts build` or `vite build`.
npm run refine build
```

[Refer to the Create React App documentation for detailed usage. &#8594](https://create-react-app.dev/docs/available-scripts)

[Refer to the Vite documentation for detailed usage. &#8594](https://vitejs.dev/guide/#command-line-interface)

</TabItem>

<TabItem value="nextjs">

```bash
# Starts application in development mode. Equivalent to `next dev`.
npm run refine dev
```

```bash
# Starts application in production mode. Equivalent to `next start`.
npm run refine start
```

```bash
# Creates a production build of your app. Equivalent to `next build`.
npm run refine build
```

[Refer to the Next.js documentation for detailed usage. &#8594](https://nextjs.org/docs/api-reference/cli)

</TabItem>

<TabItem value="remix">

```bash
# Starts application in development mode. Equivalent to `remix dev`.
npm run refine dev
```

```bash
# Starts application in production mode. Equivalent to `remix-serve start`.
npm run refine start
```

```bash
# Creates a production build of your app. Equivalent to `next build`.
npm run refine build
```

[Refer to the Remix documentation for detailed usage. &#8594](https://remix.run/docs/en/v1/other-api/dev)
</TabItem>
</Tabs>

### run

Runs a custom script in the context of your Refine project. Also It will pass all the arguments to the script.

First it will check `package.json` to see if there is a script with the given name. If there is, it will run that script. Otherwise, it will run in `node_modules/.bin`.

With this way you can run unsupported commands via Refine.

```bash
npm run refine run react-app-rewired start
```

### whoami

View the details of the development environment.

```bash
> npm run refine whoami

## System:
 - OS: macOS 13.0
 - CPU: (8) arm64 Apple M1 Pro
## Binaries:
 - Node: 16.14.0 - ~/.nvm/versions/node/v16.14.0/bin/node
 - Yarn: 1.22.17 - /opt/homebrew/bin/yarn
 - npm: 8.3.1 - ~/.nvm/versions/node/v16.14.0/bin/npm
## Browsers:
 - Chrome: 107.0.5304.121
 - Firefox: 106.0.3
 - Safari: 16.1

## Refine Packages:
 - @refinedev/airtable: 2.1.1
 - @refinedev/antd: 3.62.0
 - @refinedev/cli: 1.5.1
 - @refinedev/core: 3.88.1
 - @refinedev/react-hook-form: 3.31.0
 - @refinedev/simple-rest: 2.6.0
 - @refinedev/strapi: 3.18.0
```

## How to add to an existing project?

If you want to add the [@refinedev/cli](https://github.com/refinedev/refine/tree/main/packages/cli) to your existing project, you have to add it to your project's `dependencies`.

<InstallPackagesCommand args="@refinedev/cli"/>

Then add the `refine` command to your scripts in your `package.json` file

```diff title="package.json"
{
    "scripts": {
+       "refine": "refine"
    }
}
```

Hooray!

```bash
> npm run refine
Usage: refine <command> [options]

      ___           ___           ___                       ___           ___
     /\  \         /\  \         /\  \          ___        /\__\         /\  \
    /::\  \       /::\  \       /::\  \        /\  \      /::|  |       /::\  \
   /:/\:\  \     /:/\:\  \     /:/\:\  \       \:\  \    /:|:|  |      /:/\:\  \
  /::\~\:\  \   /::\~\:\  \   /::\~\:\  \      /::\__\  /:/|:|  |__   /::\~\:\  \
 /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\  __/:/\/__/ /:/ |:| /\__\ /:/\:\ \:\__\
 \/_|::\/:/  / \:\~\:\ \/__/ \/__\:\ \/__/ /\/:/  /    \/__|:|/:/  / \:\~\:\ \/__/
    |:|::/  /   \:\ \:\__\        \:\__\   \::/__/         |:/:/  /   \:\ \:\__\
    |:|\/__/     \:\ \/__/         \/__/    \:\__\         |::/  /     \:\ \/__/
    |:|  |        \:\__\                     \/__/         /:/  /       \:\__\
     \|__|         \/__/                                   \/__/         \/__/

Options:
  -v, --version              Output the current version.
  -h, --help                 Output usage information.

Commands:
  create-resource [options]  Create a new resource files
  check-updates              Check all installed `Refine` packages are up to date
  update [options]           Interactively select and update all `Refine` packages to selected version. To skip the interactive mode, use the `--all` option.
  dev [args...]              It runs: `nextjs dev`. Also accepts all the arguments `nextjs` accepts.
  build [args...]            It runs: `nextjs build`. Also accepts all the arguments `nextjs` accepts.
  start [args...]            It runs: `nextjs start`. Also accepts all the arguments `nextjs` accepts.
  run [command] [args...]    Runs a defined package script. If no `command` is provided, it will list the available scripts
  whoami                     View the details of the development environment
  help [command]             display help for command

```

You can optionally modify your scripts in `package.json` with `Refine CLI` [commands](#dev--start--build). The benefit it will provide you is that it gives warnings to keep your `Refine` packages always up to date.

<Tabs
defaultValue="react"
values={[
{label: 'React', value: 'react'},
{label: 'Next.js', value: 'nextjs'},
{label: 'Remix', value: 'remix'}
]}>

<TabItem value="react">

```diff title="package.json"
{
    "scripts": {
-       "dev": "react-scripts start",
-       "build": "react-scripts build",
+       "dev": "refine dev",
+       "build": "refine build",
    }
}
```

</TabItem>
<TabItem value="nextjs">

```diff title="package.json"
{
    "scripts": {
-       "dev": "next dev",
-       "build": "next build",
-       "start": "next start",
+       "dev": "refine dev",
+       "build": "refine build",
+       "start": "refine start",
    }
}
```

</TabItem>
<TabItem value="remix">

```diff title="package.json"
{
    "scripts": {
-       "dev": "remix dev",
-       "build": "remix build",
-       "start": "remix-serve build"
+       "dev": "refine dev",
+       "build": "refine build",
+       "start": "refine start",
    }
}
```

</TabItem>
</Tabs>
