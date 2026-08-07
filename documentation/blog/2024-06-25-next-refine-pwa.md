---
title: Build a Progressive Web App (PWA) with Next.js
description: We will walk you through the entire process of building a PWA using Next.JS and Refine framework, from start to finish!
slug: next-js-pwa
authors: david_omotayo
category: "How To Build"
tags: [nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-11-next-refine-pwa/social-2.png
hide_table_of_contents: false
last_update: 2024-06-25
---

**This article was last updated on Jun 25, 2024, to add new SEO considerations, accessibility, and configuring Service Worker for Next PWA apps**

## Introduction

Building a complex site requires a one-size-fits-all framework that not only simplifies the complexity but also integrates seamlessly with other build tools on a whim.

Over the years, frameworks and libraries such as React have been the go-to packages for building complex and large applications, even in the face of their susceptible nature to tiresome caveats.

Fast forward to today, there are several frameworks and libraries in the picture, and they all promise to do a better job than their predecessors. However, many still don't meet the flexibility mark, except for a handful of them.

In this article, we'll look at what Refine is and demonstrate how to use it to build a **Next.js PWA** storefront application.

<!--truncate-->

## Prerequisites

**Refine** templates are shipped with TypeScript by default. This is because TypeScript is the recommended language for writing **Refine** applications.

So to follow along with this tutorial, you should have a fundamental knowledge of TypeScript and its concepts and the following:

- The LTS version of [Node.js](https://nodejs.org/en) installed on your machine
- Fundamental knowledge of [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- Basic understanding of [tailwindcss](https://tailwindcss.com/)

## What is Refine?

[Refine](https://github.com/refinedev/refine) is an open-source React headless meta-framework for rapidly building data-driven applications. It offers immense development speed without any customization or significant functionality tradeoffs. **Refine**'s use-case includes **admin panels**.

At its core, **Refine** is a collection of helper hooks, components, and providers that give you complete control over your application's user interface. These hooks are similar to what you'd find in [TanStack Query](https://tanstack.com/query/latest), meaning **Refine** will automatically handle your data-fetching logic, authorizations, state management, and internalization out of the box.

The decoupled nature of these hooks makes it easy to incorporate your desired UI customizations and code flow. Although integrated with design systems such as Ant design and Material UI out of the box, **Refine** is designed to work seamlessly with any other **UI frameworks**.

## What is a PWA?

PWA stands for **progressive web application**. It is an application built with web technologies such as HTML, CSS, and JavaScript. However, it also delivers functionalities and emulates the characteristics of a native application.

PWAs offer features that make them operate both as a web page and a mobile application with access to native-like features such as push notifications, offline mode, and much more.

Unlike actual native applications, PWAs are not difficult to develop. With just an addition of a service worker and a manifest to an existing web page, you can create an application that not only lives on the but also serve as a native application that is platform-agnostic without having to learn programming languages that are specific to such platforms.

**PWA** is a good choice for e-commerce operators that want to get on the mobile-first e-commerce bandwagon without having to go through the troubles of integrating with different app stores. While also retaining the perks a web page has to offer, such as discoverability via search engines and Responsiveness.

### Benefits of PWA

I wanted to share some thoughts on why Progressive Web Apps (PWAs) are useful for our projects. These are the reasons:

**Performance**: PWAs are blistering fast. Once loaded, they cache resources and run well in case of a poor Internet connection.

**User Experience**: They feel native in many ways, e.g., push notifications and offline access.

**Easy Updates**: Considering they run using a web browser, updating is updated at the server, and the user gets the latest version without any downloads.

**Cross-Platform**: PWAs work across all devices with a web browser. We need not develop different apps for platforms like iOS, Android, etc.

**Cost-Effective**: Generally, developing and maintaining separate apps for different platforms costs more and takes longer compared to building a PWA.

**Discoverability**: Contrastingly, with native apps, PWAs can be indexed by search engines, making them, therefore more easily discoverable.

**No app store hassles**: We can bypass all of the app store submission processes and restrictions, allowing more flexibility in updates and releases.

PWAs are, overall, the best combination of both web and mobile app features for our purposes.

## Project Setup

Although it is possible to integrate **Refine** into an existing Next.js project, it is recommended to set up a project using the `create refine-app` command-line interface (CLI), as it sets things up according to your preferences.

Open up your command line tool, cd to your folder of choice, and run the following command to bootstrap a Next.js Refine template:

```
npm create refine-app@latest refine-storefront
```

After running the command, you’ll be prompted to choose your preferences for the project. Select the following options to proceed:

```bash
✔ Choose a project template · Refine(Next.js)
✔ What would you like to name your project?: · refine-storefront
✔ Choose your backend service to connect: · REST API
✔ Do you want to use a UI Framework?: · Headless
✔ Do you want to add example pages?: · No
✔ Do you need i18n (Internationalization) support?: · No
✔ Choose a package manager: · npm
```

<br/>

## Adding Tailwind CSS for styling

After installation, cd into the newly created project folder and run the following command:

```bash
npm i -D tailwindcss postcss autoprefixer
```

```bash
npm i next-pwa
```

This command will install Tailwind and other packages we’ll be using for this tutorial, such as:

- tailwindcss
- next-pwa

Next, we’ll configure Tailwind and start the development server. First, go back to your terminal and run the command below:

```
npx tailwindcss init -p
```

This command will generate tailwind and postcss config files in the root folder of our project.

Next, open the tailwind.config.js file and add the path to all your template files like so:

```tsx title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Open the global.css file, and add the @tailwind directives for each of Tailwind layers at the top of the file:

```css title="src/styles/global.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

That’s it! Now we can use Tailwind utility classes in our project.

:::caution

`create refine-app` provides some components for us. We will be not using them in this project. You can delete them if you want.

- src/components/breadcrumb
- src/components/layout
- src/components/menu

:::

## Refine core setup

`create refine-app` Next.js template is pre-configured with Refine out of the box, so all we have to do now is to complete the setup by adding a layout, resources, and data provider to the Refine component.

As a first step, navigate to the `_app.tsx` file inside the pages folder. When you open the file, you should see something similar to the following:

<details>
<summary>Show _app.tsx Code</summary>
<p>

```tsx title="pages/_app.tsx"
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router/pages";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Layout } from "@components/layout";
import dataProvider from "@refinedev/simple-rest";
import "@styles/global.css";

const API_URL = "https://api.fake-rest.refine.dev";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          {renderComponent()}
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
```

</p>
</details>

This is where most of our app’s functionalities will be configured. Right now, nothing much is going on - the **Refine** component is being used to wrap our entire app, with a `routerProvider` and a `dataProvider` hook passed to it as props.

We’ll see how to leverage these hooks and other props of the Refine component in the subsequent sections. But first, let’s configure the `dataProvider` hook for our needs.

Run `npm run dev` to start the Refine development server.

Within seconds it should automatically bring up your default browser with the preview of the app. If it does not, open the browser manually and navigate to `http://localhost:3000`.

 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-11-next-refine-pwa/welcome.jpg" alt="Next.js Refine welcome screen" />

## Adding a Data provider

Data providers are hooks that Refine use to communicate with APIs. They act as adapters that make HTTP requests to different APIs and return response data using predefined methods.

Refine comes with different data providers out of the box, but the one we’re interested in and will be using in this tutorial is the [refine-simple-rest](https://github.com/refinedev/refine/tree/main/packages/simple-rest) data provider, a data provider for communicating with RESTful APIs. Visit the docs to learn more about Refine’s data providers.

We’ll be using the fake store API to populate our storefront prototype app, and since it’s a REST API, the refine-simple-rest data provider won’t have trouble communicating with it.

To add a data provider to our app, we’d have to install a data provider package (in our case, the refine-simple-rest data provider), import it into the `_app.tsx` file, and add it to the Refine component with the API endpoint passed to it.

Fortunately for us, superplate has done all the heavy lifting for us, now all we have to do is replace Refine’s fake API endpoint:

```diff title="pages/_app.tsx"
 ...
- const API_URL = "https://api.fake-rest.refine.dev";
 ...

With our Fake store endpoint:

 ...
//highlight-next-line
+ const API_URL = "https://fakestoreapi.com";
 ...
```

Next, we’ll create a layout component for our app and pass it as a prop to the Refine component.

[Refer to documentation for more information about data providers in refine. &#8594](https://refine.dev/core/docs/core/providers/data-provider/)

## Adding a Layout component

A Layout component is a component that Refine uses to create a template for our app. The template is independent of the app’s default UI, thus giving us the option to design as many templates as possible.

The default layout takes a child argument that accepts components that can be used to further customize and structure the template. These child components are regarded as layout parameters.

To get started, create a components sub-folder inside the src folder, Next, create a `Layout.tsx` file inside it and add the following code:

```tsx title="src/components/Layout.tsx"
import * as React from "react";
import { LayoutProps } from "@refinedev/core";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-red">
      <div className="relative sticky top-0 z-50 flex items-center justify-between bg-[#fff] px-24 py-8">
        <a href="https://refine.dev">
          <img src="./refine_logo.png" alt="refine logo" />
        </a>
        <button className="mb-2 mt-2 w-fit rounded bg-[#042940] px-8 py-2 text-white outline outline-offset-2 outline-[#D6D58E]">
          Cart
        </button>
      </div>
      <div className="grid-rows-3">{children}</div>
    </div>
  );
};
```

Also you need to add the Refine logo to the public folder. You can find the logo [here](https://github.com/refinedev/refine/blob/main/examples/blog-next-refine-pwa/public/refine_logo.png).

The code above is relatively straightforward, we created a functional component structure with a destructured children argument. In the returned JSX code, we created a navbar with the Refine logo and a cart button, and below it is the children argument rendered dynamically to the template.

To understand how the children argument works, we need to take a look at the `<Layout />` component and how it works.

The `<Layout />` component is used to wrap the contents of a component or custom page that will be rendered to **Refine**’s default layout.

Suppose we want to render the content of a list component to **Refine**’s layout, we would go about it like so:

```tsx
const List: React.FC<Props> = () => {
  return (
    <Layout>
      <ul>
        <li>Groceries</li>
        <li>Workout</li>
        <li>Work</li>
      </ul>
    </Layout>
  );
};

export default List;
```

The wrapped unordered list in the code above will be rendered below the navbar we created inside the Layout component earlier, in the same spot we're dynamically rendering the children argument. What this means is that the content of the list component is being passed as a child to the `<Layout />` component.

Now that we have a basic understanding of how **Refine**'s Layout works, let's go ahead and add our `<Layout />` component as a wrapper to next's page component.

Navigate back to the `_app.tsx` file, import the `<Layout />` component we just created and add it like below:

```tsx title="pages/_app.tsx"
// ...
//highlight-next-line
import { Layout } from "@components/Layout";

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />
    }

    return (
      //highlight-next-line
      <Layout>
        <Component {...pageProps} />
        {/* highlight-next-line */}
      </Layout>
    )
  }

// ...

```

If you save your progress at this point and go to the browser, you won’t notice any significant change. This is because we’re yet to add resources to the **Refine** component.

## Adding Resources

The resources prop is used to map a specific endpoint of the provided API to **Refine**. The prop takes an array of properties, such as the name and list property.

```js
resources={[{ name: "endpoint name", list: "/list", ... }]}
```

The name property is the most important resource property. It is used to specify an endpoint from the provided API, which **Refine**, then automatically creates a route for our app.

For example, if we add a “products” value to the name property like so:

```
resources={[{ name: "products" }]}
```

**Refine** will utilize the `/products` endpoint from the API and append it to our URL: `http://localhost:3000/products`.

```tsx title="pages/_app.tsx"
// ...

import { Refine } from "@refinedev/core";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      // ...
      //highlight-next-line
      resources={[{ name: "products", list: "/" }]}
    >
      {renderComponent()}
    </Refine>
  );
}

export default MyApp;
```

Go to `pages/index.ts` and add the following code:

```tsx title="pages/index.tsx"
export default function Index() {
  return null;
}
```

Now if you save your progress and go back to the browser, you should see the Layout component rendered successfully.

 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-11-next-refine-pwa/layout.png" alt="App layout preview" />

<br/>

## Using Next.js SSR

**Refine** handles data management automatically out of the box. It uses [TanStack Query](https://tanstack.com/query/latest) under the hood to fetch and manage predefined data from APIs.

This way, we don’t have to write data-fetching logic because the content of the API endpoint that we added to the **Refine** component earlier will be readily available to every component in the application via hooks such as useTable and Typography.

However, to leverage Next.js’ pre-rendering features (SSR or SSG), we’d have to manually fetch the data using a Refine `dataProvider` from a `getServerSideProps` or `getStaticProps` function.

To go about this, navigate to the `index.tsx` file inside the pages folder and add the following code:

```tsx title="pages/index.tsx"
import { GetServerSideProps } from "next";
import dataProvider from "@refinedev/simple-rest";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Index() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await dataProvider("https://fakestoreapi.com").getList<IProduct>(
    {
      resource: "products",
    },
  );
  return {
    props: { products: data },
  };
};
```

Let’s breakdown what’s going on here:

First, we imported the `GetServerSideProps` type and the `dataProvider` hooks at the top of the files and created an interface for the data we’ll be fetching.

Next, we created a `getServerSideProps` function where we’re fetching the data using the `dataProvider` hook and assigned the response data to a data variable.

Then we chain the `getList` method to the `dataProvider` to specify the endpoint to retrieve via the resources property.

Lastly, we exposed the data variable by passing it to the props object.

[Refer to official Refine docs for more information about Next.js usage. &#8594](https://refine.dev/core/docs/guides-and-concepts/ssr/nextjs/)

## Creating product cards

Navigate back to the components folder and create a `ProductCard.tsx` file, then add the following codes:

```tsx title="components/ProductCards.tsx"
import * as React from "react";

export interface Props {
  price: number;
  category: string;
  title: string;
  description: string;
  cardImage: string;
}

const ProductCards: React.FC<Props> = ({
  price,
  title,
  category,
  description,
  cardImage,
}) => {
  return (
    <div className="relative max-w-xs pb-2 outline outline-[#042940]">
      <div className="relative flex items-center justify-center bg-[#fff] py-4">
        <img
          src={cardImage}
          alt={`${title}`}
          className="z-30 h-56 max-w-xs transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        />
      </div>
      <div className="px-4">
        <p className="mb-1 text-lg font-semibold text-black">{title}</p>
        <div className="flex justify-between">
          <p className="mb-2 mt-2 w-fit rounded bg-[#042940] p-1 text-white outline outline-offset-2 outline-[#D6D58E]">
            ${price}
          </p>
          <button className="mb-2 mt-2 w-fit rounded bg-[#042940] p-1 text-white outline outline-offset-2 outline-[#D6D58E]">
            Add to cart
          </button>
        </div>
        <p>{`${(description || []).slice(0, 100)}`}...</p>
        <p className=" py mt-2 w-fit rounded-3xl bg-[#D6D58E] px-2 py-0.5 text-sm text-gray-600">
          {category}
        </p>
      </div>
    </div>
  );
};

export default ProductCards;
```

Here, we’re destructuring several props and rendering them to the component’s template, nothing special.

Next, we’ll create a `Productlist` component and demonstrate how we can use the `useTable` hook to access our data.

## Creating ProductList

Create a `ProductList` component just above the `getServerSideProps` function inside the index.tsx file and pass the `products` property to it as a prop.

Also import the `ProductCards` and the `LayoutWrapper` components like highlighted code block below:

```tsx title="pages/index.tsx"
import { GetServerSideProps } from "next";
import dataProvider from "@refinedev/simple-rest";
//highlight-start
import { GetListResponse, useTable } from "@refinedev/core";
import ProductCards from "@components/ProductCards";
//highlight-end

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
//highlight-start
type ItemProp = {
  products: GetListResponse<IProduct>;
};
//highlight-end

const ProductList: React.FC<ItemProp> = ({ products }) => {
  //highlight-start
  const { result } = useTable<IProduct>({
    resource: "products",
    queryOptions: {
      initialData: products,
    },
  });
  //highlight-end

  return (
    //highlight-start
    <div className="my-8 grid grid-cols-4 gap-6 px-24">
      {result?.data.map((product) => {
        return (
          <ProductCards
            key={product.id}
            title={product.title}
            category={product.category}
            description={product.description}
            cardImage={product.image}
            price={product.price}
          />
        );
      })}
    </div>
    //highlight-end
  );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await dataProvider("https://fakestoreapi.com").getList<IProduct>(
    {
      resource: "products",
    },
  );
  return {
    props: { products: data },
  };
};
```

### Using the useTable hook

`useTable` is a Refine hook that uses helper hooks to simplify the process of fetching, interacting, and rendering data. To put things into perspective, we’ll use the `useTable` hook to process our response data from the `getServerSideProps` function.

In the code above, we’re using `result` to map through the query results and passing them as props to the `ProductCards` component. Then we wrapped the component with the LayoutWrapper component.

What we’re doing here is similar to what we did earlier with the resources prop, we specify which source (endpoint) to be fetched from the API by passing the resource option a string value. In this case, `products`.

The only difference is that we added a `queryOptions` option and passed the products prop as its initial data. Then we destructed the `result` object from the `useTable` hook. This is what we’ll use to get the result of our query.

Also we created a `ProductCard` component and use it to render the query results using the `result` object.

If you save your progress and go back to the browser, you should see a nicely rendered grid of product cards.

 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-11-next-refine-pwa/final.png" alt="Final PWA UI preview" />

<br/>
<br/>

That’s it! We’ve successfully built a storefront using Refine and Next.js SSR. Next, we’ll demonstrate how to generate a PWA manifest for our app, and how to turn it into a PWA.

## Generating PWA manifest

The first thing we need to do is to create a manifest for our application. This is a JSON file that contains metadata such as the name of the app or the start URL, which defines the look and behavior of our **PWA** when installed as an application. You should be familiar with the concept if you've built a chrome extension before.

Generating a manifest file manually is tedious. Fortunately for us, we can use several PWA manifest generators online to speed up the process.

Head over to [SimiCart manifest generator](https://www.simicart.com/manifest-generator.html/) or any site you trust and generate your manifest with the following example:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-11-next-refine-pwa/manifest.png" alt="Web app manifest settings" />

<br/>

As you can see, you're required to upload a logo image. The generator will use this image to output the various image sizes that are required for the manifest. In this case, we're using the Refine logo.

After filling the form in the appropriate order, click on the "Generate manifest" button, and you'll be prompted to download a manifest zip file.

:::note

Make sure to download the file with a chrome browser. Firefox doesn't seem to download the file correctly.

:::

After downloading the file, extract it and rename the manifest file from the `.webmanifest` format to a `.json` format.

Before renaming

```
manifest.webmanifest
```

After renaming

```
manifest.json
```

Next, copy the manifest.json file and the generated icons to the public folder of your project.

Then, go to the pages folder and create a `_document.tsx` file. This file will let us override or update the contents within the `<html>` and `<body>` tags used to render a page. We will be using it to configure our PWA in the next section.

## Configuring PWA

First, open the `_document.tsx` file and add the following codes:

```tsx title="pages/_document.tsx"
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta name="theme-color" content="#042940" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

Within the `<Head>` tag is three `<link>` tags that are linking the manifest file, icon, and theme setting to the head section of our application’s template.

Now for the final step, open the `next.config.js` in your project and add the following code:

```tsx title="next.config.js"
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  experimental: {
    newNextLinkBehavior: true,
  },
});

module.exports = nextConfig;
```

That’s it! We’ve successfully made our storefront application into a PWA. To test it, run the build command below to create a local build of the application:

```
npm run build
```

Once the CLI is done with the build process, run the build locally by running the following command:

```
npm run start
```

<br/>

After starting the server, head over to your browser and visit `http://localhost:3000`. You should see a new icon beside the share icon, on the right side of the browser’s address bar.

<br/>

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-11-next-refine-pwa/pwa.png" alt="Installable PWA prompt" />

<br/>

This is the installation icon for our PWA app. Click on the icon to install the app and use it as a standalone application.

## SEO Considerations for PWAs

I would like to share a few thoughts on the SEO considerations for our PWA. Here is what we should bear in mind:

Firstly, ensure our HTML has meta tags for a title, description, and keywords. This is for search engines to make sense of the content better. Implement canonical tags in order not to run into issues such as duplicate content. Define which version of a URL is preferred. Use Schema.org, together with structured data, to enable the search engines to understand more content for greater visibility. PWAs are built for speed, but we can optimize our images, use lazy loading, and minify CSS and JavaScript so that they load with a bang.

By configuring to serve cached content without SEO interference, we ensure the service worker does not block essential resources for crawlers. We must make our content crawlable by the search engines and easily indexed using server-side rendering (SSR) or static site generation (SSG) with Next.js.

PWAs are mobile-friendly by design, but it is imperative to validate that using Google's Mobile-Friendly Test to ensure optimal user experience on mobile. A clean and readable URL structure is friendly; avoid complex query strings. It will make URLs meaningful and user-friendly.
Lastly, make sure our PWA is served over HTTPS. That's important for many reasons, with security at the top of the list, but search engines also look more favorably upon secure sites. Create an XML sitemap.

These are some of the SEO considerations to keep in mind at all times so that we can ensure our PWA takes pride in the ranks it achieves and in its visibility to the public at large.

## Advance techniques: Customizing the Service Worker

I wanted to briefly give you a rundown on how to go about customizing the service worker for our PWA. You'd do this as follows:

1. **Create Service Worker**: First, we will create a file called `service-worker. js` in our project, which will be responsible for caching and managing other background tasks.
2. **Register the Service Worker**: You register a service worker in your main JavaScript file so the browser can find out where it lives and what it does. Very simplistically:

```tsx
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
```

3. **Caching Strategies**: We can define caching strategies that our app is supposed to adhere to. For instance, we may be required to cache static assets (images and stylesheets) differently than the API responses. Let me show a basic one:

```tsx
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/script.js",
        "/images/logo.png",
      ]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
```

4. **Update Handling**: We can make service worker update gracefully. For instance, on a new version, we might like to have this make the user see a prompt to reload the page.

5. **Push Notifications**: Also, if needed, we may develop the code for push notifications, with the help of which any update or message can be directly sent to a user's device.

By modifying the service worker, we can ensure that our PWA does just what we wish whenever the user goes offline. We can, therefore, efficiently manage resource caching toward a better user experience.

## Accessibility Considerations for PWAs

There are some essential things concerning accessibility in our PWA, and I would like to share them with you. Here is what we should have in mind:

Our images should have alt text so that screen readers can easily describe those images to visually impaired people. Use semantic HTML elements: `<header>`, `<main>`, `<footer>`, etc., as appropriate so that more context and structure can be given to the document. Ensure full keyboard navigability by using appropriate tab indexing and focus management.

Then, make sure there is sufficient contrast between text and background so that someone with a visual impairment can read it. Use ARIA attributes to convey the information better to AT. Make all interactive elements—buttons, links, etc.—distinctive, and, of course, ensure easily seen and clear focus states.

Multimedia features should have captions and transcripts so that users who are hard of hearing can be facilitated. The PWA should also be tested on screen readers like NVDA or VoiceOver to ensure experience is suitable for using those tools. Frequently audit our site using accessibility evaluation tools such as Lighthouse or axe to find and fix issues.
Therefore, through these accesses, our PWA will be user-friendly and inclusive to all kinds of users, regardless of their abilities.

## Conclusion

In this article, we demonstrated how to set up a Next.js Refine project from scratch and how to fetch and render data from an external API using the Refine's REST data provider. Then we looked at how to turn our application into a **PWA** using a JSON manifest.

The purpose of this tutorial is to give you a headstart with Refine and its ecosystem. Visit documentations to learn more about Refine and how to use it to build complex applications.

## Project source code

https://github.com/refinedev/refine/tree/main/examples/blog-next-refine-pwa
