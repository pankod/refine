---
title: React Ecosystem in 2024 - Sustaining Popularity
description: We'll look at the React ecosystem and the tools and libraries that have been created to support React.
slug: react-js-ecosystem-in-2024
authors: chidume_nnamdi
category: "Engineering"
tags: [react, tech-industry]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-11-react-ecosystem-2024/social.png
hide_table_of_contents: false
last_update: 2025-10-01
---

**Update (September 2025): This article has been updated to include information about React 19's release, the deprecation of Create React App, new ecosystem developments, and current best practices in the React ecosystem as of late 2025.**

### Introduction

React.js is undoubtedly the most popular front-end library in the world. It has been used by many companies, including Facebook, Instagram, Netflix, Twitter, and Uber. React.js popularity grew because it was so simple to use and understand, and simplified the concept of component-based design.

React.js ecosystem boomed with it. Many tools and libraries have been built for it. Existing tools and libraries also built a React version of it.

However many of the tools and libraries have been created to solve the same problems. For example, there are many routing libraries, data management libraries, and UI component libraries. It is hard to choose the right one for your project.

In this article, we will look at the React ecosystem and the tools and libraries that have been created to support React.

## Major Updates Since 2024

The React ecosystem has undergone significant transformations since early 2024. **React 19 was officially released in December 2024**, bringing revolutionary features like Actions, Server Components, and the new `use()` API that fundamentally change how we handle data mutations and asynchronous operations. The release introduced game-changing hooks like `useActionState` and `useOptimistic` for better form handling and optimistic updates.

In a major shift, **Create React App was officially deprecated in February 2025**, with the React team now strongly recommending production-ready frameworks like Next.js, Remix, and Expo for new projects. This marks the end of an era and signals the ecosystem's maturation toward full-stack, framework-first development. The deprecation reflects the reality that modern React applications require sophisticated tooling for routing, data fetching, server-side rendering, and performance optimization that frameworks provide out-of-the-box.

Additionally, the **React Compiler** has moved from experimental to Release Candidate status, promising automatic optimization of React components without manual memoization. These changes represent the biggest evolution in React development practices since hooks were introduced, pushing the ecosystem toward more sophisticated, performance-oriented, and developer-friendly patterns.

## React Meta-frameworks

A meta-framework is a framework with a higher level of abstraction, built on top of another framework. Meta-framework makes it easier to build applications using the underlying framework.

React.js simply provides the view layer of the application. It may or may not provide other things like routing, data management, HTTP requests, etc. It may provide them but they can be at a very basic level.

Now, React meta-frameworks provide all these things. They provide things like:

- Authentication
- Security
- Routing
- Data providers
- Database connections
- Styling
- Layouts

Let's look at the most popular React meta-frameworks to use in 2024 below:

### Nextjs

[Next.js](https://nextjs.org/) is a meta-framework that provides SSR/SSG support to Reactjs applications.
Next.js boasts of

**Built-in optimizations**
Nextjs has optimizations built-in for production. It has built-in support for:

Image: Nextjs extends the img tag to support lazy loading and automatically optimizes images for loading performance. It can automatically serve correctly sized images for each device. Prevent layout shifts and also auto-resize remote images.

Next.js also can optimize our fonts and script for faster web performance and improved Core Web Vitals.

**Streaming** Next.js can stream pages to the client as they are being served. This reduces the time to the first byte and improves the perceived performance of your application.

**Incremental Static Regeneration** Next.js can update static pages after they have been built. This allows us to update our pages without rebuilding the entire site. This is useful for pages that are updated frequently.

**Prefetching** Next.js can prefetch pages that are likely to be visited by the user. This improves the perceived performance of your application.

**React Server Components** We can write Server-rendered components in Next.js. This is very good because we will have to do data-fetching in the server, the component can also be cached in the server, reduce bundle sizes because we don't need to ship the component to the client, improve initial load time, and improve SEO.

### [Refine](https://github.com/refinedev/refine)

[Refine](https://github.com/refinedev/refine) is a React meta-framework used to build React-based internal tools, admin panels, dashboards, and B2B apps.

It is an open-source for enterprise standing at [18K+](https://github.com/refinedev/refine) at the time of writing this article. It has more than 8K+ apps in production, 32K+ active developers in our open-source community, and 200K+ end users using apps built with Refine.

Refine.js is an ideal tool for building CRM applications, HR applications, financial planning systems, inventory management systems, and more. It scaffolds a complete CRUD interface for your data and provides a lot of features out of the box.

Refine provides us with options to select the data provider, authentication provider, and styling library. It also provides us with a lot of plugins to extend its functionality.

We can select the React platform to use:

- Next.js
- Remix
- Vite-bundled React

It headless but also offers built-in UI framework supports for:

- Ant Design
- Chakra UI
- Material UI
- Mantine UI

Backend to use:

- 15+ backend services including REST API, GraphQL, NestJs CRUD, Airtable, Strapi, Strapi v4, Strapi GraphQL, Supabase, Hasura, Appwrite, Firebase, Nestjs-Query and Directus.

The authentication provider to use:

- Google Auth
- Auth0
- Okta
- AWS Cognito

Refine has internal support for the i18n framework, you don't need to install an external tool for i18n. Also, you can easily audit your logs, and version your documents. It also has perfect state management for React Query.

Setting up a Refine project:

```bash
npm create refine-app@latest
```

You can also create a Refine project in the browser from [here](https://refine.dev/?playground=true).

### Remix

[Remix](https://remix.run/) is a full-stack framework that lets you build apps with React, server-rendered components, and zero build configuration.

Remix uses distributed systems and native browser features to provide server and client runtimes that are fast, secure, and easy to use.

Remix is known for delivering the fastest possible first-load experience. It is also known for its security, and ease of use.

Remix has a lot of features. It has a wide range of hooks, as well as a wide range of built-in components. For example, we can use `<Await>` component to wait for a promise to resolve before rendering the children. We can also use `<Outlet>` component to render the children of the parent route.

There is `<Meta>` to set the title and description of the page. There is `<Link>` to link to other pages. There is `<Form>` to handle the form submission. There is `<Image>` to render images. There is `<Script>` to render renders the client runtime of your app.

## Routing

Routing is one of the most important parts of a web application. It is the process of determining which page to render based on the URL.

Let's look at the different routing libraries available for React.

### Nextjs

Next.js has built-in support for routing. It uses the file system to determine the routes of your application. It also has support for dynamic routes.

The routes are set in the `pages` directory. For example, if we have a file named `pages/about.tsx`, it will be rendered at the `/about` route.

### React Router

This is the most popular routing library for React. It has more than [50,000 stars on Github](https://github.com/remix-run/react-router). It has been used by many companies, including Facebook, Instagram, Netflix, Twitter, and Uber.

The React Router is the default library for routing installed by React devs. It is very easy to use and has a lot of features.

It has a lot of built-in hooks to help in routing. It has `useParams` to get the params of the current route. It has `useLocation` to get the current location. It has `useHistory` to get the history of the current route. It has `useRouteMatch` to get the current route match.

It also has a lot of components to help in routing. It has `Link` to link to other pages. It has `NavLink` to link to other pages with active classes. It has `Prompt` to show a prompt when the user tries to navigate away from the current page. It has `Redirect` to redirect to another page. It has `Route` to render a component based on the current route. It has `Switch` to render the first matching route.

### TanStack Router

[TanStack Router](https://tanstack.com/router/v1) is a React router that is built for suspense and transitions. It has an in-built capability to handle data fetching and transitions.

TanStack Router offers complete TypeScript support, typesafe navigation, and nested routing, along with built-in SWR caching for route loaders.

It's optimized for client-side data caching and supports automatic prefetching, asynchronous components, and error boundaries.

## Client State Data management

There are many ways to manage client state data in React. React has its built-in method but there are libraries built on top of it to make it easier to use.

### Redux Toolkit

[Redux Toolkit](https://redux-toolkit.js.org/) is the official, opinionated, batteries-included toolset for efficient Redux development. It is the recommended way to write Redux logic.

It is simple, powerful, effective, and opinionated. Redux Toolkit can also be used in Next.js and other extensions of it to React have been built also, the React-Redux.
We can write reducers in Immer, so the Redux Toolkit integrates well with Immer.

### Jotai

[Jotai](https://jotai.org/) is a primitive and flexible state management library for React. It is built on top of React Hooks and the Context API.

It takes an atomic approach to global React state management. The atoms approach stems from the concept of hooks in React, a state which can be of any type can be created and managed. Actions can be performed on it, and it can maintain its state.

```jsx
import { atom } from "jotai";

const countAtom = atom(0);
const countryAtom = atom("Japan");
const citiesAtom = atom(["Tokyo", "Kyoto", "Osaka"]);
const mangaAtom = atom({
  "Dragon Ball": 1984,
  "One Piece": 1997,
  Naruto: 1999,
});
```

Jotai currently has [28M downloads on NPM](https://www.npmjs.com/package/jotai), [more than 15,000 stars on Github](https://github.com/pmndrs/jotai), [1,208 active members on Discord](https://discord.gg/poimandres).

Its bundle size is just [2.78kB](https://bundlephobia.com/result?p=jotai), so it is very lightweight and won't even make a dent in your bundle size.

Jotai is being used by many companies like [Ping](https://ping.gg/), [Candycode](https://candycode.com/), [Adobe](https://www.adobe.com/), [TikTok](https://www.tiktok.com/), [Uniswap](https://uniswap.org/), etc.

### Zustand

[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) is a small, minimalistic state management library for React that uses the Flux principles. It is very lightweight and has a very small bundle size.

Zustand has TypeScript support, you can create an immutable state with Immerjs and also integrates well with other Third-party libraries like mobz, etc.
Its bundle size is [1.18kB](https://bundlephobia.com/result?p=zustand). Has more than [38,000 stars on Github](https://github.com/pmndrs/zustand), [118M downloads on NPM](https://www.npmjs.com/package/zustand), [1,222 active users on Discord](https://discord.gg/poimandres).

Zustand set up a [live demo where you can take it for a swing](https://githubbox.com/pmndrs/zustand/tree/main/examples/demo)

Just run:

```bash
npm install zustand
```

## Server-side data management

React has a lot of libraries built on it for managing server-side data.

### Tanstack Query

Another of the Tanstack libraries, [Tanstack Query][https://tanstack.com/query/v3/](https://tanstack.com/query/v3/)) is a data fetching and caching library for React and React Native.

Tanstack Query uses the declarative approach in data fetching, you don't have to manually write the data fetching logic, point to where the data is and it will fetch it for you.

Tanstack Query is very simple to understand and use, it is quite similar to Promise and async-await code style. It is highly extensible and configurable.
Several companies have adopted Tanstack Query, Facebook, Paypal, Amazon, Microsoft, ebay, etc.

Tanstack Query has [more than 38,000 stars on Github](https://github.com/tanstack/query), it has [11M downloads on NPM](https://www.npmjs.com/package/@tanstack/query-core), and its size is [38.1kb to 11.3kb (gzip)](https://bundlejs.com/?q=%40tanstack%2Freact-query&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%5D%7D%7D&badge=)

### SWR

This is a library developed by Vercel the creators of Nextjs. It is a React Hooks library for remote data fetching.

The SWR stands for stale-while-revalidate, this a caching strategy that allows us to use stale data while fetching new data in the background.

The [SWR](https://swr.vercel.app/) library uses this strategy to fetch and cache our data.

Example:

```tsx
import useSWR from "swr";

function Profile() {
  const { data, error, isLoading } = useSWR("/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

The key passed to is the first parameter `/api/user`, this is the key it uses to cache the data returned from the URL. So the first param is the URL from where to fetch the data and also the key to cache the data against. So we can retrieve the cached data using the key.
SWR is lightweight, and fast and has support for server-side rendering, incremental side rendering, and server-side generation.

SWR has [more than 28,000 stars on Github](https://github.com/vercel/swr) and a [minimized size of 4.4kB](https://bundlephobia.com/result?p=swr).

## HTTP

Let's look into the most used HTTP libraries for React.

### Axios

This is the most popular and widely used HTTP library in the world.
[Axios](https://axios-http.com/) is a promised-based HTTP client library for Nodejs and browsers.

It is very easy to use:

```tsx
import axios from "axios";
axios.get("/users").then((res) => {
  console.log(res.data);
});
```

Axios has incredible features:

- Make XMLHttpRequests from the browser
- Make http requests from Node.js
- Intercepts request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client-side support for protecting against XSRF
- many more

The code above makes an HTTP request to the `/users` endpoint and logs the response data to the console.

Axios is used by many companies, like [Stytch](https://stytch.com/?utm_source=axios&utm_medium=sponsorlist&utm_campaign=sponsorship), [Incognito](https://opencollective.com/user-5d607d62?utm_source=axios&utm_medium=sponsorlist&utm_campaign=sponsorship), [nonGamstop casinos](https://nongamstopcasinos.net/gb), [Casino reviews](https://www.casinoreviews.net/), [BairesDev](https://www.bairesdev.com/sponsoring-open-source-projects), etc.

Axios has more than a whooping [103,000 stars on Github](https://github.com/axios/axios), and more than [209M downloads per month on NPM](https://npm-stat.com/charts.html?package=axios), yes you read it right. The [installed size is 2.07MB](https://packagephobia.now.sh/result?p=axios) and the [minimized size is 11.8kB](https://bundlephobia.com/package/axios@latest)

### SWR

This library is also used for data fetching and has data caching capability.

### RTK Query

RTK Query is a library for data fetching and caching. RTK Query adds a unique approach to its API design. Its data fetching and caching capability is built on top of the Redux Toolkit.
RTK Query can generate hooks and we can use them hooks to in the data fetching process and also manage the lifetime of the cached data.

## Form

We can handle forms in React using the built-in form elements. However, there are libraries that make it easier to handle forms in React.

### Formik

[Formik](https://formik.org/) is the most popular tool for building forms in React. It is declarative, adaptable, and intuitive. Using Formik, we can build forms in React without the tears.
Formik makes creating and handling forms feel like magic. It handles the state of the form, validation, submission, and error handling. It takes away the time we spend wiring up state and change handlers.

With Formik, you don't need to use Observables, subscriptions, or any other fancy stuff.
To use Formik, we need to install it:

    npm install formik

Then we can use it in our React app:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Contact Us</h1>
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Field name="name" type="text" />
          <Field name="email" type="email" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
```

See its declarative nature, we just need to pass the initial values and the submit handler, and Formik will handle the rest.

Formik is tree-shakeable and supports i18n. We can add custom validations. It can handle API errors, form, and field level errors.

It integrates well with Material UI.

Formik is used worldwide by a lot of companies, like Nasdaq, US Amry, Booking.com, Lyft, NASA, etc.

Formik has [more than 30K stars on Github](https://github.com/jaredpalmer/formik) and has [more than 100 users active online](https://discord.gg/pJSg287)

### React Hook Form

[React Hook Form](https://react-hook-form.com/) is a popular flexible and extensible library for building forms in React. It is very lightweight, has a small bundle size, and is very fast.

It is highly performant, it does this by minimizing the number of re-renders, validating computation, and reducing the amount of memory allocated.

Easy to get started with:

```
npm install react-hook-form
```

Example [code](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm):

```tsx
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
```

It has a plethora of hooks you can use, built-in validations, integration with UI libraries, controlled inputs, states, and services.

React Hook Form has [more than 30K stars on Github](https://github.com/react-hook-form/react-hook-form) and [238M downloads on NPM](https://www.npmjs.com/package/react-hook-form). It has [385 users in Discord](https://discord.gg/yYv7GZ8)

It is supported and backed by Casino Reviews, Vercel and BeekAI.

### React Final Form

React Final Form is a subscription-based form of state management for React.
It is modular, which means we can use only the parts we need. You don't need to download the whole library just for two fields.

It has zero dependencies, it does not depend on another library for any functionality everything is built-in.

It is very fast, it has a small bundle size, and it is very easy to use.

It is compatible with React hooks.

React Final Form is used by many big companies like, Google, Cisco, Salesforce, Yandex, TED, Nokia, etc.

React Final Form has [7.3K stars on Githib](https://github.com/final-form/react-final-form), and has up to [1.3M downloads per month on NPM](https://www.npmjs.com/package/react-final-form) and has [8 sponsors](https://github.com/final-form/react-final-form?tab=readme-ov-file#sponsors).

Installation is simple:

```
npm install --save final-form react-final-form
```

Then, use:

```tsx
import { Form, Field } from "react-final-form";

const MyForm = () => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>

        <h2>An Arbitrary Reusable Input Component</h2>
        <div>
          <label>Interests</label>
          <Field name="interests" component={InterestPicker} />
        </div>

        <h2>Render Function</h2>
        <Field
          name="bio"
          render={({ input, meta }) => (
            <div>
              <label>Bio</label>
              <textarea {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        />

        <h2>Render Function as Children</h2>
        <Field name="phone">
          {({ input, meta }) => (
            <div>
              <label>Phone</label>
              <input type="text" {...input} placeholder="Phone" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <button type="submit">Submit</button>
      </form>
    )}
  />
);
```

## Testing

There are many testing libraries in the React testing sub-ecosystem. Let's look at some of them.

### Jest

[Jest](https://jestjs.io/) is a JavaScript testing framework designed to ensure the correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar, and feature-rich API that gives you results quickly.

It focuses on simplicity, apart from React, Jest works and integrates well with Angular, Node, Vue, TypeScript, etc.

It has zero configurations, fast and safe, and has great documentation, and APIs.
We can easily apply mocks in Jest, and generate clear and concise code coverage reports. It has a lot of matches and a lot of plugins.

Jest is used by a lot! Facebook, Twitter, the New York Times, Spotify, Airbnb, Instagram, etc.
It is sponsored by Airbnb, 777, Prinicipla Financial Group, Katalon, Transloadit, etc. Then backed by more than 20 groups and individuals.

### Vitest

[Vitest](https://vitest.dev/) has emerged as a modern alternative to Jest, especially popular in the Vite ecosystem. It's designed to be fast, lightweight, and compatible with Jest's API, making migration easier for existing projects.

**Key advantages of Vitest:**

- **Native ESM support**: Works seamlessly with modern JavaScript modules without configuration
- **Vite integration**: Shares the same config, plugins, and transformers as your Vite build setup
- **Faster execution**: Significantly faster than Jest, especially for large codebases
- **Jest compatibility**: Most Jest APIs work out of the box, making migration straightforward
- **Built-in TypeScript support**: No additional setup required for TypeScript projects

Example setup with Vitest:

```bash
npm install -D vitest
```

Configuration in `vite.config.ts`:

```tsx
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // for React component testing
    globals: true, // enables Jest-like global APIs
    setupFiles: "./src/test-setup.ts",
  },
});
```

Many modern React projects, especially those using Vite as their build tool, are migrating from Jest to Vitest for better performance and simplified configuration. The choice between Jest and Vitest often depends on your build setup—Jest remains excellent for Create React App and Webpack-based projects, while Vitest excels in Vite-based environments.

### React Testing Library

[React Testing Library](https://testing-library.com/) is a powerful library for rendering and testing React components. It is very simple and easy to use.

We can write tests for our React components without worrying about implementation details. We can write tests that are more maintainable and less brittle. The tests are written in JSX and the React Testing Library lets us test so many aspects of it.
Apart from React, React Testing Library also works with Vue, Angular, Svelte, etc.

It is easy to set up, just run:

```bash
npm install --save-dev @testing-library/react
```

And you can begin to write your tests.

Also, we can test hooks using the React Testing Library, this is done using the `renderHook` API. We can test for components being rendered in the DOM document, we can test for snapshots, and get texts and elements from the DOM to test for them.

React Testing Library is really powerful and highly useful. It sits at [18,329 stars on Github](https://github.com/testing-library/react-testing-library), has [37M downloads per month](http://www.npmtrends.com/@testing-library/react) and has [141 contributors](https://github.com/testing-library/react-testing-library#contributors)

### Playwright

[Playwright](https://playwright.dev/) is mostly used for E2E(end-to-end) testing. It is a framework used for web testing and automation, it has a single API that enables cross-browser testing.

To set up Playwright, we need to install it:

```
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

Playwright has more than [57,000 stars on Github](https://github.com/microsoft/playwright) and is widely chosen and used by companies and open-source projects, VS Code, Bing, Outlook, Disney Plus Hotstar, etc.

### Cypress

[Cypress](https://www.cypress.io/) is a library for writing tests, and automation tests and accelerates the ease with which tests are written, run, and via continuous integration.

Cypress is used for unit tests, and e2e tests and runs the tests very fast. There are no servers, drivers, or other dependencies to install or configure.

It eliminates flaky tests by running tests in the same run loop as the application. This enables Cypress to control every aspect of the test run, including the network, browser, and page content.

It integrates very well with many CI providers, like CircleCI, TravisCI, Jenkins, BitBucket, GitLab, and Github.

It has up to [5M+ weekly downloads](https://www.npmjs.com/package/cypress), [45K+ stars on Github](https://github.com/cypress-io/cypress), and 1M+ dependent repositories.

It is very easy to install and use:

```bash
npm install cypress --save-dev
```

Example:

```tsx
import TodoList from "./components/TodoList";

it("contains the correct number of todos", () => {
  const todos = [
    { text: "Buy milk", id: 1 },
    { text: "Learn Component Testing", id: 2 },
  ];

  cy.mount(<TodoList todos={todos} />);
  // the component starts running like a mini web app
  cy.get('[data-testid="todos"]').should("have.length", todos.length);
});
```

## Headless CMS

There are several headless CMS that integrate well with React. Let's look at some of them.

### Strapi

[Strapi](https://strapi.io/) is an open-source headless content management system (CMS) designed to make it easy to create, edit, and manage content.

Strapi is also highly customizable, allowing developers to quickly build out custom back-ends for their applications. Additionally, Strapi comes with an extensive set of APIs that make it easy to integrate with other services and platforms.

Strapi integrates well with several databases, e.g. MongoDB, Postgres, MySQL, SQLite, etc. It has a lot of plugins and has a lot of features. The [docs](https://docs.strapi.io/) is great and clarifies all the features of Strapi.

It has a great admin panel, that enables us to create content, and collections and even test them out. It also has webhooks that can be triggered based on some events in your collection.

Strapi is very popular and sits at [57.8K stars on Github](https://github.com/strapi/strapi), and [2,202 active users on Discord](https://discord.strapi.io/).

### Sanity

[Sanity](https://www.sanity.io/) is a modern headless CMS tool that is used worldwide. Sanity has 500K plus projects built with it, 50M documents created of it, 20B API/CDN requests per month, and 1PB content served per month.

Easy way to start using Sanity:

```bash
npm create sanity@latest
```

Major companies like Nike, Brex, Figma, CloudFlare, Shopify, etc use Sanity.

## Styling

We will look into styling libraries for React.

### Tailwind CSS

[Tailwind](https://tailwindcss.com/) is a utility-based CSS framework. It has a lot of utility classes that can be used to style our components.

These utility classes are CSS classes that are targeted for specific styling selectors. For example, we can use `bg-red-500` to set the background color of an element to red.

For example, Tailwind has these `flex`, `pt-4`, `text-center`, and `rotate-90` classes. `flex` is a class with CSS styling like this:

```
.flex {
    display: flex;
}
```

So when we use the `flex` class on an element, it will be styled with the `display: flex` CSS property.

Getting started with Tailwind is quite easy:

```
npm install -D tailwindcss
npx tailwindcss init
```

We can also set events via utility classes with Tailwind.

```
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

Also, has a [playground](https://play.tailwindcss.com/) where you can test it out.

It sits at [74.5K stars on Github](https://github.com/tailwindlabs/tailwindcss), and has [410M downloads on NPM](https://www.npmjs.com/package/tailwindcss).

### Styled Components

[Styled Components](https://styled-components.com/) is a CSS-in-JS library that allows us to write CSS in our JavaScript code. It is very easy to use and has a lot of features.

Example:

```
const Button = styled.button`
      width: 11rem;
    `;
```

This creates a button component and sets its width to 11rem.

Install via:

```bash
npm install styled-components
```

We can create animations, and theme our applications using Styled Components. Styled Components is [really powerful and has a lot of features](https://styled-components.com/docs).

It has [more than 39,000 stars on Github](https://github.com/styled-components/styled-components), and [27M downloads on NPM](https://www.npmjs.com/package/styled-components).

### Emotion

[Emotion](https://emotion.sh/docs/introduction) is another library for writing CSS using JavaScript. It uses the same tagged literal string syntax as Styled Components.

The syntax is very similar to Styled Components, so it is very easy to use.

```tsx
import { css } from "@emotion/react";

<div
  className={css`
    padding: 32px;
    background-color: hotpink;
  `}
>
  Hover to change color.
</div>;
```

The above code creates a div element with a hot pink background color and padding of 32px.
Emotion supports media queries, nested selectors, and composition.

Emotion has [more than 16,000 stars on Github](https://github.com/emotion-js/emotion), [15 sponsors](https://github.com/emotion-js/emotion#sponsors) and [33 backers](https://github.com/emotion-js/emotion#backers).

## UI component libraries

We have many UI component libraries we can use in our React projects

### Material UI

[Material UI](https://mui.com/) is one of the most popular UI component libraries in the world, if not the most popular. It is used by many companies, like Uber, Netflix, Twitter, etc.

It is based on [Material Design](https://m3.material.io/) which was developed and maintained by Google, originally for Angular, but now it has been ported to React, Vue, Svelte, etc.

Material UI is a UI component library for React used to build nice and smooth interfaces and UI. It has a whole lot of components like Card, Button, etc. It has components for layout, utils, navigation, surfaces, feedback, data display, etc.

It has customization options for theming, spacing, typography, etc.
Material UI sits at [90,000 stars on Github](https://github.com/mui/material-ui) and has [14M downloads per month on NPM](https://www.npmjs.com/package/@mui/material).

### Mantine UI

[MantineUI](https://mantine.dev/) is a modern and responsive user interface library for React.js.
It is a fully-featured React components library and includes a comprehensive set of components, utilities, and styles, making it easy to build user interfaces for web applications. It also provides an intuitive and accessible design that makes it ideal for a wide range of projects.

Mantine has [more than 22,000 stars on Github](https://github.com/mantinedev/mantine), [1.3M downloads per month](https://www.npmjs.com/package/@mantine/hooks) and [459 contributors](https://github.com/mantinedev/mantine/graphs/contributors).

### Ant Design

[Ant Design](https://ant.design/) is another UI component library. It is quite popular and hosts a lot of components in its arsenal.

Ant Design has a whooping [88.8K stars on Github](https://github.com/ant-design/ant-design), and [5.7M downloads per month on NPM](https://npmjs.org/package/antd).

### Chakra UI

[Chakra UI](https://chakra-ui.com/) is an open-source React UI library that provides components for building user interfaces.

It is designed to be accessible and composable, which makes it easy to combine components to create custom user experiences. Chakra UI also provides support for theming and styling, making it easy to customize the look and feel of your application.

You can easily get started by installing it:

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Then import the components you need:

```
import { Button } from "@chakra-ui/react";
```

Chakra UI has [more than 35,000 stars on Github](https://github.com/chakra-ui/chakra-ui), and [2.1M downloads per month on NPM](https://camo.githubusercontent.com/4961fcbc4cf7b1e7c21fdbd470f57fe5383bc897379b2cc26c7a10f62af1d788/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f406368616b72612d75692f72656163742e7376673f7374796c653d666c6174).

### Shadcn

[Shadcn](https://ui.shadcn.com/) is a collection of reusable components that you can copy and paste into your apps. It is a collection of components that you can use in your React apps.

It is freely accessible, open-source, and has a lot of components. It has a lot of components, like an accordion, alert, alert-dialog, aspect-ratio, avatar, badge, button, calendar, etc.
You cannot install Shadcn as a dependency, you can only copy and paste the components you need. It is not on NPM, so you cannot install it.

Shadcn has utility classes and CSS variables for use. It sits at [37.2K stars on Github](https://github.com/shadcn-ui/ui)

## Data visualization

This is a very important part of web development. This is the visual presentation of data in a graphical format. It is used to communicate information clearly and efficiently to users.
There are many tools that integrate well with React for data visualization.

### D3

This is the most popular of them all. [D3](https://d3js.org/) creates custom dynamic visualizations with unparalleled flexibility.

It integrates well with React. We just have to run the command `yarn add d3` to install it and import it `import * as d3 from "d3";`.

Example in React:

```tsx
import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}) {
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight],
  );
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
```

D3 is massively popular, sitting at [107,000 stars on Github](https://github.com/d3/d3) and a [community Slack group](https://observablehq.com/slack/join).

### Victory

[Victory](https://formidable.com/open-source/victory/) is a set of modular charting and data visualization components for React.
Victory is robust and flexible. We can plot area charts, scatter charts, etc using Victory

It is also very easy to install and use

```
npm install victory
```

We can easily create a chart.

Example:

```tsx
import React from "react";
import { render } from "react-dom";
import { VictoryPie } from "victory";

const PieChart = () => {
  return <VictoryPie />;
};

render(<PieChart />, document.getElementById("app"));
```

This creates a pie chart.

It has about [10.6K stars on Github](https://github.com/FormidableLabs/victory) and [212K downloads per week on NPM](https://npmjs.com/package/victory).

### Recharts

[Recharts](https://recharts.org/en-US/) is a composable React charting library.

Recharts is built on top of SVG elements with a lightweight dependency on D3 submodules and contains reusable chart components that are customizable via props.

```tsx
<LineChart
  width={400}
  height={400}
  data={data}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
  <XAxis dataKey="name" />
  <Tooltip />
  <CartesianGrid stroke="#f5f5f5" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
  <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
</LineChart>
```

This creates a line chart.

Recharts are used by many companies like Squadlytics, ahrefs, hayns, demisto, etc.
Recharts has more than [21,000 stars on Github](https://github.com/recharts/recharts) and [5.9M downloads per month](https://www.npmjs.com/package/recharts).

## i18n (Internationalization)

i18n is an important feature in web applications because of language diversity. There are many libraries that help us with i18n in React.

### react-i18next

[react-i18next](https://react.i18next.com/) is a popular i18n framework for React. It is based on [i18next](https://www.i18next.com/).

Easy to install:

```
npm install react-i18next i18next --save
```

Then to use

```tsx
<div>{t("simpleContent")}</div>
```

react-i18next has many hooks and providers that make i18n a breeze in your React application.

It sits at [8.7k stars on Github](https://github.com/i18next/react-i18next) and [2.7M downloads per week](https://npmjs.org/package/react-i18next)

### react-intl

[react-intl](https://formatjs.io/docs/react-intl/) is a library for bringing internationalization into your React application. It is built on top of [formatjs](https://formatjs.io/).

Easy to install:

```bash
npm i -S react-intl
```

react-intl has 1,364,010 weekly downloads.

## Summary

React is a big framework and is used by many, so a lot of tools are created daily to make working with React.js easier.

It was really a long post, but I hope you enjoyed it. I hope you learned something new.
