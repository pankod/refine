---
title: Pilot & Refine architecture
description: We'll be taking a look at the architecture of Refine and how week of RefineWeek series will be structured.
slug: refine-react-invoice-generator-1
authors: abdullah_numan
category: "How To Build"
tags: [react, refine-week]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-04-10-refine-invoicer-1%2Fsocial.png
hide_table_of_contents: false
---

This is the opening post of another 2023 [**#RefineWeek**](https://refine.dev/core/week-of-refine-strapi/) series. It is intended to provide an introduction to the series itself as well as to present [**Refine**](https://github.com/refinedev/refine), a React framework that is used to rapidly build any data heavy CRUD apps like dashboards, admin panels and e-commerce storefronts.

This five part guide aims to help developers learn the ins-and-outs of **Refine**'s powerful capabilities and get going with **Refine** within a week.

<br />

<br/>

 <div className="centered-image"  >

<img style={{alignSelf:"center", width:"600px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-04-10-refine-invoicer-1%2Fmultiple_logo.png" alt="RefineWeek series logos" />

</div>

<br/>
<br/>

In this series we are going to build a **Invoicer - React PDF Invoice Generator** app with [**Refine**](https://github.com/refinedev/refine), [**Strapi**](https://strapi.io/) and [**Ant Design**](https://ant.design/).

[👉 The live version of the app is be available here.](https://invoice-generator.refine.dev/)

[👉 The final apps source code is available on GitHub.](https://github.com/refinedev/refine/tree/main/examples/refine-week-invoice-generator)

To get completed client source code simply run:

```
 npm create refine-app@latest -- --example refine-week-invoice-generator
```

## What is **Refine** ?

[**Refine**](https://github.com/refinedev/refine) is a highly customizable **React** based framework that has a headless core package and comes with a myriad of supplementary modules for the UI, backend API clients and Internationalization support.

**Refine**'s (intentionally decapitalized) core is strongly opinionated about RESTful conventions, HTTPS networking, state management, authentication and authorization. It is, however, unopinionated about the UI and render logic. This makes it customizable according to one's choice of UI library and frameworks.

## What is Strapi ?

[**Strapi**](https://strapi.io) is an open source content management system ( CMS ) which allows us to build headless backend services for creating and managing content.

It is highly customizable and can be hosted locally as well as in the cloud. **Strapi** is especially useful for building readily available RESTful APIs available for consumption from a frontend app.

## Refine Architecture

A **Refine** app is centered mainly around the `<Refine />` component, which is mostly configured via a set of provider props that each requires a provider object to be passed in. An example usage of providers on the `<Refine />` component looks like this:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider from "@refinedev/react-router";

<Refine
  dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
  authProvider={authProvider}
  routerProvider={{ routerProvider }}
  resources={[]}
  // ... etc.
/>;
```

The code above shows a few of the props and their assigned objects. As can be inferred from this, rather than precisely being a component, [`<Refine />`](https://refine.dev/core/docs/api-reference/core/components/refine-config/) is largely a monolith of provider configurations backed by a context for each.
Hence, inside [`dataProvider`](https://refine.dev/core/docs/data/data-provider), we should have a standard set of methods for making API requests; inside [`authProvider`](https://refine.dev/core/docs/authentication/auth-provider/#what-is-auth-provider), we should have methods for dealing with authentication and authorization; inside [`routerProvider`](https://refine.dev/core/docs/packages/documentation/routers/), we should have methods for dealing with standard routing - both RESTful and non-RESTful, etc. And each of these providers should have their own set of conventions and type definitions.

For example, a `dataProvider` object should have the following signature to which any definition of a data provider object should conform:

```tsx title=" Data provider object signature"
const dataProvider: DataProvider = {
  // required methods
  getList: ({ resource, pagination, sorters, filters, meta }) => Promise,
  create: ({ resource, variables, meta }) => Promise,
  update: ({ resource, id, variables, meta }) => Promise,
  deleteOne: ({ resource, id, variables, meta }) => Promise,
  getOne: ({ resource, id, meta }) => Promise,
  getApiUrl: () => "",

  // optional methods
  getMany: ({ resource, ids, meta }) => Promise,
  createMany: ({ resource, variables, meta }) => Promise,
  deleteMany: ({ resource, ids, variables, meta }) => Promise,
  updateMany: ({ resource, ids, variables, meta }) => Promise,
  custom: ({ url, method, filters, sorters, payload, query, headers, meta }) =>
    Promise,
};
```

The underlying architecture facilitates any presentational component passed to `<Refine />` to be able to consume these configured methods via corresponding hooks. Each method in a provider has appropriate hooks via which a consumer component is able to fetch data from the backend. For instance, [`useSimpleList()`](https://refine.dev/core/docs/api-reference/antd/hooks/list/useSimpleList/) is a high level data and UI hook via which the [`dataProvider.getList()`](https://refine.dev/core/docs/data/data-provider#getlist) provider method can be accessed.

An example hook usage from a UI component looks like this:

```tsx
const { listProps } = useSimpleList<IClient>({
  meta: { populate: ["contacts"] },
});
```

The above `useSimpleList()` hook is a `@refinedev/antd` UI hook that is built on top of the low level [`useList()`](https://refine.dev/core/docs/data/hooks/use-list/) data hook. Low level hooks, in turn, leverage **React Query** hooks in order to make API calls invoked from inside the provider methods. Here's an early sneak peek into the action under the hood:

```tsx title="Inside useList() hook"
const queryResponse = useQuery<GetListResponse<TData>, TError>(
  queryKey.list(config),
  ({ queryKey, pageParam, signal }) => {
    const { hasPagination, ...restConfig } = config || {};
    return getList<TData>({
      resource,
      ...restConfig,
      hasPagination,
      meta: {
        ...meta,
        queryContext: {
          queryKey,
          pageParam,
          signal,
        },
      },
    });
  },
  {
    ...queryOptions,
    onSuccess: (data) => {
      queryOptions?.onSuccess?.(data);

      const notificationConfig =
        typeof successNotification === "function"
          ? successNotification(data, { meta, config }, resource)
          : successNotification;

      handleNotification(notificationConfig);
    },
    onError: (err: TError) => {
      checkError(err);
      queryOptions?.onError?.(err);

      const notificationConfig =
        typeof errorNotification === "function"
          ? errorNotification(err, { meta, config }, resource)
          : errorNotification;

      handleNotification(notificationConfig, {
        key: `${resource}-useList-notification`,
        message: translate(
          "common:notifications.error",
          { statusCode: err.statusCode },
          `Error (status code: ${err.statusCode})`,
        ),
        description: err.message,
        type: "error",
      });
    },
  },
);
```

We'll be visiting code like this on Day 4, but if we examine the snippet above closely we can see that **Refine** uses **React Query** to handle caching, state management as well as errors out-of-the-box.

The following diagram illustrates the interactions:

![1-refine-week](https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/api-consuming-flow.webp)

## Providers and Hooks

**Refine**'s power lies in the abstraction of various app component logic such as authentication, authorization, routing and data fetching - inside individual providers and their corresponding hooks.

Common providers include:

- [`authProvider`](https://refine.dev/core/docs/authentication/auth-provider/#what-is-auth-provider) - for authentication and authorization.
- [`dataProvider`](https://refine.dev/core/docs/data/data-provider) - for CRUD operations.
- [`routerProvider`](https://refine.dev/core/docs/packages/documentation/routers/) - for dealing with routing.

For an exhaustive list of providers, please visit the **Refine** providers documentation from [here](https://refine.dev/core/docs/api-reference/core/).

As part of the core package, each method in these providers comes with a corresponding low level hook to be used from inside higher level hooks, partial UI components and pages. As mentioned above with the `useSimpleList()` hook, higher level hooks can be built on top of lower level hooks such as the `useList()` hook. For more details, please refer to the **Refine** hooks documentation starting [here](https://refine.dev/core/docs/api-reference/core/hooks/accessControl/useCan/).

## Support Packages

**Refine** is inherently headless in its core API and deliberately agnostic about the UI and backend layers. Being so, it is able to provide fantastic support for major UI libraries and frameworks as well as popular backend frameworks and services. To name a few, **Refine**'s UI support packages include [**Ant Design**](https://refine.dev/core/docs/api-reference/antd/) and [**Material UI**](https://refine.dev/core/docs/api-reference/mui/). Backend supplementary modules include [**Strapi**](https://strapi.io/), **GraphQL**, **NestJS** and .

For a complete list of all these modules, check out [this page](/core/docs/packages/list-of-packages/).

## A week of Refine ft. Strapi

 <div className="centered-image"  >

<img style={{alignSelf:"center", width:"600px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-04-10-refine-invoicer-1%2Finvoicer_logo.png" alt="Invoicer app logo banner" />

</div>

<br/>
<br/>

In this tutorial series, we will be going through a few vital features of **Refine** by building a basic **Invoicer - Pdf Invoice Generator** app. This section is intended to provide more details.

The final version of the **Invoicer** comprises of a dashboard that allows users to register their companies, add their clients and contacts, create tasks (missions) that they do for their clients and issue invoices for the tasks. Users are also able to generate a pdf document of the invoice.

We will be building this app day-by-day over a period of 5 days. And while doing so, we will dive deep into the details of related providers, hooks, UI components and how **Refine** works behind the scenes.

As far as our features and functionalities go, we will cover some key concepts including `authProvider`, `dataProvider` `routerProvider` and `resources` props of `<Refine />`, the provider objects and their associated hooks. For the UI side, we will be using the optional **Ant Design** package supported by **Refine**. For the backend, we will use a [**Strapi**](https://strapi.io) content management system.

<br />

Here are the detailed outlines split per day:

### Day One - On This #RefineWeek

This opening post. Hello! :wave: :wave: We are here! :smile: :smile:

### Day Two - Setting Up the App

We start with setting up the **React Pdf Invoice Generator** app using **Refine** **CLI Wizard**. We choose **Refine**'s optional **Ant Design** and **Strapi** modules as support packages. After initialization, we explore the boilerplate code created by the **CLI Wizard**, look into the details of the `dataProvider` and `authProvider` objects and briefly discuss their mechanisms.

In the later sections, we also initialize the **Strapi** backend app for our **React Invoice Generator**. Here's what we do step by step after that:

1. Start the **Strapi** server and sign up for an **admin** user to get access to the dashboard.
2. We create collections for our app using the `Content-Type Manager`.
3. We set up permissions for `authenticated` role for **Refine** app users, i.e. our **React Invoice Generator** app users.

### Day Three - Adding CRUD Actions & Authentication

On Day 3, we start off with generating an API Token for our **Strapi** backend app to be accessed from our **React Invoice Generator**. We then update our `constants.ts` file with them.

We complete the app halfway by adding CRUD pages for `companies`, `clients` and `contacts`. While doing so, we get familiar with `dataProvider` methods such as `getList`, `create` and `delete` and some of the corresponding low level hooks: `useList()`, `useCreate()` and `useDelete()`.

We also examine the use of higher level hooks such as `useSimpleList()`, `useModalForm()`, `useDrawerForm()` and `useTable()` that integrate data hooks with **Ant Design** components.

We discuss authentication with the `authProvider` object and implement an email / password based authentication with the `<AuthPage />` component that is provided by **refine-Ant Design** (`@refinedev/antd`) package.

### Day Four - Adding Mission and Invoice Pages

On Day 4, we continue to add CRUD pages for `missions` and `invoices` resources. We first add **Strapi** collections for `missions` and `invoices` and set up permissions on them for `authenticated` user role. And then we go ahead and add the resource items, routes as well as the CRUD pages.

We also get an opportunity to dig into some low level code to make sense of how **Refine** undertakes data heavy tasks behind the scenes and presents us with convenient, highly customizable hooks like `useTable()` and `useSelect()` to be used in our app.

Besides the above mentioned hooks, we examine the source code for the **refine-Ant Design** `<DeleteButton />` component.

### Day Five - Adding PDF Renderer

On the final day, we add a pdf renderer to generate pdf document and view for our invoices. We use the `@react-pdf/renderer` `npm` package for this.

We then wrap up the series by discussing the accomplishments we are about to achieve starting Day 2.

## Summary

In this post, we introduced the **Refine** framework and the [**#RefineWeek**](https://refine.dev/core/week-of-refine-strapi/) series itself. We talked about **Refine**'s underlying architecture which consists of providers, hooks and components that help rapidly build internal tools.

We laid out the plans for building a **React Pdf Invoice Generator** app in considerable depth.

Tomorrow, on Day Two, we are ready to start **Setting Up the App**. See you soon!
