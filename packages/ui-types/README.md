<br/>

<div align="center" style="margin: 30px;">
<a href="https://refine.dev/">
  <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"   style="width:250px;" align="center" />
</a>
<br />
<br />

<div align="center">
    <a href="https://refine.dev">Home Page</a> |
    <a href="https://discord.gg/refine">Discord</a> |
    <a href="https://refine.dev/examples/">Examples</a> |
    <a href="https://refine.dev/blog/">Blog</a> |
    <a href="https://refine.dev/docs/">Documentation</a>
</div>
</div>

<br />

<div align="center"><strong>Build your <a href="https://reactjs.org/">React</a>-based CRUD applications, without constraints.</strong><br>An open source, headless web application framework developed with flexibility in mind.

<br />
<br />

[![Discord](https://img.shields.io/discord/837692625737613362.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/refine)
[![Twitter Follow](https://img.shields.io/twitter/follow/refine_dev?style=social)](https://twitter.com/refine_dev)

<a href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=362220&theme=light&period=daily" alt="refine - 100&#0037;&#0032;open&#0032;source&#0032;React&#0032;framework&#0032;to&#0032;build&#0032;web&#0032;apps&#0032;3x&#0032;faster | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

</div>

<div align="center">

[![Awesome](https://github.com/refinedev/awesome-refine/raw/main/images/badge.svg)](https://github.com/refinedev/awesome-refine)
[![npm version](https://img.shields.io/npm/v/@refinedev/core.svg)](https://www.npmjs.com/package/@refinedev/core)
[![npm](https://img.shields.io/npm/dm/@refinedev/core)](https://www.npmjs.com/package/@refinedev/core)
[![](https://img.shields.io/github/commit-activity/m/refinedev/refine)](https://github.com/refinedev/refine/commits/main)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)

</div>

<br/>
<a href="https://refine.dev/">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/18739364/200257042-3f2aa7f7-a07f-4824-8d2a-b25f26b6fd32.png">
  <img alt="how-works-refine" src="https://user-images.githubusercontent.com/18739364/200257209-8fc0c8b1-2568-453e-873f-00513434deed.png">
</picture>
</a>

## What is refine?

**refine** is a React-based framework for the rapid ✨ development of web applications.
It eliminates repetitive tasks demanded by **CRUD** operations and provides industry standard solutions for critical parts like **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.

**refine** is _headless by design_, thereby offering unlimited styling and customization options.

## What do you mean by "headless"?

Instead of being a limited set of pre-styled components, **refine** is a collection of helper `hooks`, `components`, and `providers`. They are all decoupled from _UI components_ and _business logic_, so that they never keep you from customizing your _UI_ or coding your own flow.

**refine** seamlessly works with any **custom design** or **UI framework** that you favor. For convenience, it ships with ready-made integrations for [Ant Design System](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/).

## Use cases

**refine** shines on _data-intensive⚡_ applications like **admin panels**, **dashboards** and **internal tools**. Thanks to the built-in **SSR support**, **refine** can also power _customer-facing_ applications like **storefronts**.

You can take a look at some live examples that can be built using **refine** from scratch:

<a href="https://example.admin.refine.dev/" target="_blank">
 <img src="https://user-images.githubusercontent.com/18739364/204285956-cc20fa11-b769-4bd5-b8f6-9c05a283ac85.gif"   style="width:267px;"  />
</a>

 <a href="https://refine-real-world.netlify.app/" target="_blank">
<img src="https://user-images.githubusercontent.com/18739364/204285047-8f24f1f4-65ea-4952-83ed-81e92cdd5b90.gif"   style="width:200px;"  />
</a>

 <a href="https://refine.dev/" target="_blank">
<img src="https://user-images.githubusercontent.com/18739364/204285039-1ce0cb06-fbf8-4704-89c9-2e004620c9a8.gif"   style="width:200px;"  />
</a>

<br/>
<br/>

[👉 Refer to most popular real use case examples](https://refine.dev/examples/)

[👉 More **refine** powered different usage scenarios can be found here](https://refine.dev/docs/examples/)

## Key Features

⚙️ Zero-config, **one-minute setup** with a **single CLI command**

🔌 Connectors for **15+ backend services** including [REST API](https://github.com/refinedev/refine/tree/main/packages/simple-rest), [GraphQL](https://github.com/refinedev/refine/tree/main/packages/graphql), [NestJs CRUD](https://github.com/refinedev/refine/tree/main/packages/nestjsx-crud), [Airtable](https://github.com/refinedev/refine/tree/main/packages/airtable), [Strapi](https://github.com/refinedev/refine/tree/main/packages/strapi), [Strapi v4](https://github.com/refinedev/refine/tree/main/packages/strapi-v4), [Supabase](https://github.com/refinedev/refine/tree/main/packages/supabase), [Hasura](https://github.com/refinedev/refine/tree/main/packages/hasura), [Appwrite](https://github.com/refinedev/refine/tree/main/packages/appwrite), [Firebase](https://firebase.google.com/), [Nestjs-Query](https://github.com/refinedev/refine/tree/main/packages/nestjs-query) and [Directus](https://directus.io/).

🌐 **SSR support** with **Next.js** or **Remix**

🔍 Auto-generated **CRUD** UIs from **your API data structure**

⚛ Perfect **state management** & **mutations** with **React Query**

🔀 **Advanced routing** with any router library of your choice

🔐 Providers for seamless **authentication** and **access control** flows

⚡ Out-of-the-box support for **live / real-time applications**

📄 Easy **audit logs** & **document versioning**

💬 Support for any **i18n** framework

💪 Future-proof, **robust architecture**

⌛️ Built-in CLI with time-saving features

✅ Full **test coverage**

## Quick Start

The fastest way to get started with **refine** is by using the `create refine-app` project starter tool.
Run the following command to create a new **refine** project configured with [Ant Design System](https://ant.design/) as the default UI framework:

```
npm create refine-app@latest -- --preset refine-antd
```

Once the setup is complete, navigate to the project folder and start your project with:

```
npm run dev
```

<br/>

Your **refine** application will be accessible at [http://localhost:3000](http://localhost:3000):

<a href="http://localhost:3000">![Welcome on board](https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/welcome-on-board.png)</a>

<br/>

Let's consume a public `fake REST API` and add two resources (_posts_, _categories_) to our project. Replace the contents of `src/App.tsx` with the following code:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import {
  Layout,
  useNotificationProvider,
  ErrorComponent,
} from "@refinedev/antd";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { AntdInferencer } from "@refinedev/inferencer/antd";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        notificationProvider={useNotificationProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            show: "/posts/show/:id",
            create: "/posts/create",
            edit: "/posts/edit/:id",
            meta: { canDelete: true },
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
          },
        ]}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<NavigateToResource />} />
            <Route path="posts">
              <Route index element={<AntdInferencer />} />
              <Route path="show/:id" element={<AntdInferencer />} />
              <Route path="create" element={<AntdInferencer />} />
              <Route path="edit/:id" element={<AntdInferencer />} />
            </Route>
            <Route path="categories">
              <Route index element={<AntdInferencer />} />
              <Route path="show/:id" element={<AntdInferencer />} />
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
```

<br/>

🚀 Thanks to **refine Inferencer package**, it guesses the configuration to use for the `list`, `show`, `create`, and `edit` pages based on the data fetched from the API and generates the pages automatically.

Now, you should see the output as a table populated with `post` & `category` data:

![First example result](https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/readme-quick-start.png)

<br/>

You can get the auto-generated pages codes by clicking the `Show Code` button on each page. Afterward, simply pass the pages to the `resources` array by replacing with the Inferencer components.

## Next Steps

👉 Jump to [Tutorial](https://refine.dev/docs/tutorial/introduction/index/) to continue your work and turn the example into a full-blown CRUD application.

👉 Visit [Learn the Basics Page](https://refine.dev/docs/getting-started/overview/) to get informed about the fundamental concepts.

👉 Read more on [Advanced Tutorials
](https://refine.dev/docs/advanced-tutorials/) for different usage scenarios.

👉 See the real-life [Finefoods Demo](https://refine.dev/core/templates/) project.

👉 Play with interactive [Examples](https://refine.dev/docs/examples/)

## Stargazers

[![Stargazers repo roster for refinedev/refine](https://reporoster.com/stars/refinedev/refine)](https://github.com/refinedev/refine/stargazers)

## Contribution

[👉 Refer to contribution docs for more information](https://refine.dev/docs/contributing/#ways-to-contribute)

If you have any doubts related to the project or want to discuss something, then join our [Discord Server](https://discord.gg/refine).

## Our ♥️ Contributors

<a href="https://github.com/refinedev/refine/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=refinedev/refine" />
</a>

## License

Licensed under the MIT License, Copyright © 2021-present Refinedev
