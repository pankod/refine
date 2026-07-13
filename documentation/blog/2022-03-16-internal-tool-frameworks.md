---
title: ReactJS Frameworks You Should Know Before Start Developing B2B/Internal Application
description: We have listed Open source ReactJS frameworks that will help and speed you up while developing internal-tool applications.
slug: best-internal-tool-react-frameworks
authors: melih
category: "Alternatives"
tags: [react, comparison, admin-panel]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
---

## Best Internal Tool Frameworks for ReactJS

In this article, I will talk about new open-source React.js frameworks that will greatly contribute to your project while developing internal-tool applications and make your work easier with their features.

<!--truncate-->

## What is Internal Tool?

Internal tools, also known as Backoffice applications, are software pieces developed to improve your corporate processes and make your work easier. Internal tool applications are generally used to control your business follow-up or to manage your product's internal processes.

Internal tools manage the activities your company or product needs, such as tracking inventory, processing customer requests, controlling payments. Although its field is quite wide, the needs of each product or company differ. Here in this article, we will review React.js Frameworks that will help you quickly develop your own internal-tool applications according to your needs.

Internal Tool React.js Frameworks that we will review:

- [Blitz.js](https://blitzjs.com/)
- [Refine](https://refine.dev/)
- [Redwood.js](https://redwoodjs.com/)
- [React Admin](https://github.com/marmelab/react-admin)

## 1. Blitz.js

[Blitz](https://blitzjs.com/) is a batteries-included is built on Next.js, and features a Zero-API data layer abstraction that eliminates the need for REST/GraphQL. Provides helpful defaults and conventions for things like routing, file structure, and authentication while also being extremely flexible.

### Key Features

- The zero-api data layer
- Authentication
- Authorization
- Conventions
- New app templates

### Installation

```bash
yarn global add blitz

or

npm install -g blitz
```

[For Blitz.js examples, you can take a look at the showcase section. → ](https://blitzjs.com/showcase)

## Refine

[**Refine**](https://refine.dev/) is a React-based framework for rapid building of internal tools. It's is a a collection of helper hooks, components and providers. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

**Refine** offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards

### Key Features​

🔥 Headless : Works with any UI framework

⚙️ Zero-configuration : One-line setup with superplate. It takes less than a minute to start a project.

📦 Out-of-the-box : Routing, networking, authentication, state management, i18n and UI.

🔌 Backend Agnostic : Connects to any custom backend. Built-in support for REST API, GraphQL, NestJs CRUD, Airtable, Strapi, Strapi v4, Strapi GraphQL, Supabase, Hasura, Appwrite, Medusa, Firebase, and Directus.

📝 Native Typescript Core : You can always opt out for plain JavaScript.

🐜 Enterprise UI : Works seamlessly with Ant Design. (Support for multiple UI frameworks is on the Roadmap)

📝 Boilerplate-free Code : Keeps your codebase clean and readable.

### Installation

You can quickly create the project containing **Refine** and all the features you will use with it, thanks to **Refine**'s Project Creator CLI (Superplate). No extra setup required!

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-16-internal-tool-frameworks/superplate.gif" alt="Refine Project Creator CLI" />
<br />

If you want, you can manually install the Refine packages.

```bash
npm i @refinedev/core @refinedev/antd
```

### Refine Examples

[**Refine** Admin Panel Example](https://example.admin.refine.dev/?current=1&pageSize=5)

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-16-internal-tool-frameworks/refine-admin-panel.webp" alt="Refine Admin Panel Example" />

<br/>

[**Refine** Headless + Tailwind CSS Client(B2C) Example](https://example.refine.dev/)

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-16-internal-tool-frameworks/refine_client.webp" alt="Refine Client Example" />

## 3. RedwoodJS

[Redwood](https://redwoodjs.com/) is an opinionated, full-stack, JavaScript/TypeScript web application framework designed to keep you moving fast as your app grows from side project to startup.

Redwood includes deploy support for Netlify, Vercel, Render.com, AWS and more. Built on React, GraphQL, and Prisma, with full TypeScript support, and Webpack/Babel ready to go with zero config. Redwood gives you the workflow you love, but with simple conventions and helpers to make your experience even better.

### Key Features

- Database and Data migrations
- Automatic page-based code-splitting
- Cells: a declarative way to fetch data from the backend API
- Scaffold generator for CRUD operations specific to a DB table
- Simple but powerful GraphQL Directives to validate access or transform resolved data
- Simple but powerful routing (all routes defined in one file) with dynamic (typed)
- Opinionated defaults for formatting, file organization, Webpack, Babel, and more

### Installation

```bash
  yarn create redwood-app my-redwood-app
```

### RedwoodJS Example

[Link](https://github.com/redwoodjs/example-blog)

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-16-internal-tool-frameworks/redwood.webp" alt="Redwood Example" />

## 4. React Admin

[React Admin](https://github.com/marmelab/react-admin) is a frontend Framework for building data-driven applications running in the browser, on top of REST/GraphQL APIs, using React and Material Design.

### Key Features

- Powered by material-ui, redux, react-final-form, react-router and a few more
- Adapts to any backend (REST, GraphQL, SOAP, etc.)
- Internationalization (i18n)
- Supports any authentication provider (REST API, OAuth, Basic Auth, ...)
- Can be included in another React app
- Powered by material-ui, redux, react-final-form, react-router and a few more

### Installation

```bash
npm install react-admin

or

yarn add react-admin
```

### React Admin Example

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-16-internal-tool-frameworks/react_admin.png" alt="React Admin interface example" />

<br/>
<br/>

In this article, we have listed the popular open-source ReactJS internal-tool frameworks. If you want a more detailed review article, you can like and share this article. Thank you for your interest and reading.

[For more information about **Refine** ->](https://refine.dev/core/docs/)
