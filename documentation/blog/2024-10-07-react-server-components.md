---
title: An Intro to Server Components in React
description: We will discuss what React server components are as well as how to incorporate them into building applications.
slug: react-server-components
authors: peter_osah
category: "Engineering"
tags: [react, nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-09-react-server-components/social-3.png
hide_table_of_contents: false
last_update: 2024-10-07
---

**_This article was last updated on October 07, 2024 to include sections on Hydration, Performance Benefits, and Error Handling for React Server Components._**

## Introduction

There has been a lot of hype and excitement around React server components(RSCs) recently. This is largely because server components run exclusively on the server. Therefore, eliminating the need to bundle server components with client JavaScript. With RSCs, you can now have a mix of both server components and the traditional client components in a single application.

RSCs also improve page load time because you can prefetch data from the database or an API and prerender your UI on the server. In this article, we'll discuss React server components and how to start using them.

Steps we'll follow:

- [What are React server components?](#what-are-react-server-components)
- [Problems React server components attempt to solve](#problems-react-server-components-attempt-to-solve)
- [Differences between React server components and client components](#differences-between-react-server-components-and-client-components)
- [Differences between React server components and server-side rendering(SSR) in React](#differences-between-react-server-components-and-server-side-renderingssr-in-react)
- [Using server components in a React application](#using-server-components-in-a-react-application)
- [Error Boundaries in React Server Components](#error-boundaries-in-react-server-components)
- [When to use React server components?](#when-to-use-react-server-components)
- [Using server components in a Next.js application](#using-server-components-in-a-nextjs-application)
- [Pros and Cons of React server components](#pros-and-cons-of-react-server-components)
- [Bonus: Hydration and React Server Components](#bonus-hydration-and-react-server-components)

## What are React server components?

React Server Components(RSCs) are a new addition to the React ecosystem. With RSCs, you can create components that run exclusively on the server side. These components are referred to as Server Components.

With RSCs, data fetching and all other side effects happen on the server and rendering happen at the component level. It eliminates round trips as with conventional rendering because of the proximity of the data fetching functionality to the database server or API.

Server components execute once at build time or on demand when a user hits an endpoint. You can fetch data from the database or API and render it once. The rendered data is locked. The code you write in a Server component remains on the server. It is not shipped to the front-end. Therefore, Server Components do not use React hooks and don't have access to web APIs.

## Problems React server components attempt to solve

In this section, we will explore real-world problems that RSCs attempt to solve.

As an illustration, let's assume the code below displays product details on a web app. The `ProductPage` component renders the `ProductDetails`, `ProductItem`, and `MatchedItems` components .

```tsx
const ProductPage = ({ productId }) => {
  return (
    <>
      <ProductDetails productId={productId}>
        <ProductItem productId={productId} />
        <MatchedItems productId={productId} />
      </ProductDetails>
    </>
  );
};
```

There are several ways you can fetch the data to display on the above page. We could fetch the data all at once in the `ProductPage` component as in the example below:

```tsx
const ProductPage = ({ productId }) => {
  const data = fetchContentsFromAPI();

  return (
    <>
      <ProductDetails details={data.details} productId={productId}>
        <ProductItem item={data.product} productId={productId} />
        <MatchedItems items={data.matchedItems} productId={productId} />
      </ProductDetails>
    </>
  );
};
```

The above approach works fine and has its advantage.

- It could provide a good user experience since all the components are rendered after fetching the data.

However, it may create some issues below.

- It creates a high level of coupling. The child components are tightly coupled with their parent. They also depend on the data the parent component provides. This makes it difficult to maintain them.
- It also goes against the idea of single responsibility. The child components aren't individually responsible for their data. They're dependent on the data from their parent.
- High load time. The parent component fetches all the data for all the components at once.

For the sake of single responsibility, we could refactor the parent component to render its children as follows:

```tsx
const ProductDetails = ({ productId, children }) => {
  const details = fetchProductDetails(productId);

  return <>{{ children }}</>;
};

const ProductItem = ({ productId }) => {
  const item = fetchProductItem(productId);

  return /*...*/;
};

const MatchedItems = ({ productId }) => {
  const items = fetchMatchedItems(productId);

  return /*...*/;
};

const ProductPage = ({ productId }) => {
  return (
    <>
      <ProductDetails productId={productId}>
        <ProductItem productId={productId} />
        <MatchedItems productId={productId} />
      </ProductDetails>
    </>
  );
};
```

The above refactor works fine and has its advantage:

- Single responsibility: Each component is responsible for its data.

However, it may create some issues:

- It may provide poor user experience. Any of the child components can be rendered before the other based on how fast the network requests resolve. Users will see sections of the page before the other.
- It will create a [network waterfall](https://nischithbm.medium.com/web-performance-optimizing-the-network-waterfall-8a65df932df6) problem because of sequential data fetching.

Each of the methods highlighted above have their pros and cons, however, they share a common limitation. Both approaches require making API calls to the server from the client. This can increase [latency](https://aws.amazon.com/what-is/latency/).

This limitation initially prompted the React team to introduce server components. Because server components execute on the server, they can make API calls and render faster than client components.

While it was initially created to address the limitation highlighted above, it had other benefits. Since server components execute on the server, they can access backend-only services easily.

## Differences between React server components and client components

A major distinction between server components and client components is that server components are rendered once on the server-side while client components are rendered on the client-side. Client components are re-rendered as the user interacts with the application.

Normally for a client-side react application, when a user requests a web page, the server sends an empty HTML file with one or more script tags for loading the React code and other project dependencies. The browser parses the HTML file, downloads the Javascript files, and uses the client JavaScript to render the web page.

Server components execute on the server-side. They are not included in the client JavaScript bundle. Thus, reducing the client JavaScript bundle size. Client components, on the other hand, are sent to the client and increases the bundle size of your application. A client component is a typical traditional React component.

Another distinction lies in their rendering environment which gives them different properties:

- A server component cannot use React hooks like `useState`, `useReducer`, and `useEffect`. This is because a server component is rendered once on the server and doesn't re-render. On the other hand, a client component is a normal React component with access to hooks and re-renders as the user interacts with the app.
- A server component does not have access to browser APIs such as `sessionStorage` and `localStorage`. On the other hand, a client component is a normal React component with access to all the browser APIs.
- Server components support async/await. You can use async/await to make AJAX requests and connect to databases and APIs in the component body. A client component cannot be asynchronous. You need to use React hooks for AJAX requests and other side effects.

## Differences between React server components and server-side rendering(SSR) in React

Server-side rendering (SSR) in the case of React refers to an application's ability to turn React components on the server into a fully rendered static HTML page for the client.
React Server Components, on the other hand, work with SSR via an intermediary structure(a protocol similar to that of a JSON format) to enable rendering without delivering any bundles to the client side.

## Using server components in a React application

Server components can be confusing at first sight. As explained above, a server component can be asynchronous and perform side effects within the function body.

Also note that in order to utilize `async/await` in a typescript component with `.tsx` file, you will need to update your typescript version to 5.1.1. Read [this article](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1/#decoupled-type-checking-between-jsx-elements-and-jsx-tag-types) for more.

Below is an example of a simple server component,

```tsx title="BlogPost.tsx"
// Server Component

const BlogPost = async ({ id, isEditing }) => {
  const post = await db.posts.get(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
    </div>
  );
};
```

A client component is a regular React component. However, you need to include the `'use client'` directive at the top of the component file. The `'use client'` directive is similar to the `'use strict'` directive for executing JavaScript code in strict mode.

```tsx title="PostEditor.tsx"
// A client component

"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PostEditor = ({ blogPost }) => {
  const [post, setPost] = useState<any>({
    id: uuidv4(),
    title: blogPost.title,
    content: blogPost.content,
  });

  const onChange = (type: any, value: any) => {
    switch (type) {
      case "title":
        setPost({ ...post, title: value });
        break;
      case "content":
        setPost({ ...post, content: value });
        break;
      default:
        break;
    }
  };

  const submitPost = () => {
    // save blog post
  };

  return (
    <div>
      <div className="mt-10 px-6 md:mx-auto md:w-9/12 md:px-0">
        <h1 className="my-4 text-center">Create Post</h1>

        <form onSubmit={submitPost}>
          <div className="mt-8">
            <label className="mb-2 text-white"> Title </label>
            <input
              type="text"
              placeholder=""
              value={post.title}
              required
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>

          <div className="mt-8">
            <label className="mb-2 text-white">Add your Blog content</label>
            <textarea
              value={post.content}
              required
              onChange={(e) => onChange("content", e.target.value)}
            ></textarea>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="c-white border-radius bg-[#0e9f64] px-4 py-4"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
```

There are certain rules you need to follow when working with server and client components.

- Server components cannot be imported into client components but client components can be imported into server components. We will illustrate how to import a client component to a server component using our previous example:

```tsx title="BlogPost.tsx"
// Server Component

import db from "db";
import NoteEditor from "NoteEditor";

async function BlogPost({ id, isEditing }) {
  const post = await db.posts.get(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
      {isEditing ? <PostEditor blogPost={post} /> : null}
    </div>
  );
}
```

In the code above, we imported the `PostEditor` client component into the `BlogPost` server component.

- A server component can be passed as a child prop to a client component when the client component is rendered in a server component.

```tsx
const ServerComponent1 = () => {
  return (
    <ClientComponent>
      <ServerComponent2 />
    </ClientComponent>
  );
};
```

## Error Boundaries in React Server Components

Some thoughts concerning error handling in React Server Components, as we work with them quite a bit. Here are some key things to keep in mind:

### Catching Errors on the Server Level

The beauty of it is that in RSCs, we can handle errors on the server before they even reach the client. Great, because at least we can return either the fallback UI or the error message and not affect the client-side code. We just have to make sure to handle API or database failures with aplomb so the user doesn’t see broken components.
For instance, on an RSC, which fetches data from a random API, we can wrap our data fetch inside a try-catch block:

```tsx
const BlogPost = async ({ id }) => {
  try {
    const post = await db.posts.get(id);
    return <div>{post.title}</div>;
  } catch (error) {
    console.error("Error fetching post:", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
};
```

#### User Feedback

It is always good to return users clear feedback when something goes wrong. Even though things are handled on the server side by the RSCs, we should always return a friendly message on the UI in case of an error; that way they know something went wrong, and we are working on it.

#### Logging and Monitoring

And, of course, log the errors server-side! Since RSCs run on the server, it’s a heck of a lot easier to track errors and performance metrics. We can plug in logging services like Sentry to automatically detect and report issues to us. That gives us far better insight into what’s actually going wrong and helps us fix issues much quicker.

#### Fallbacks for Non-Critical Data

For non-vital areas of the UI, we can render fallback content or even loading states. If the data is not important, instead of rendering an error, we could always render a default component until the issue is resolved. Here, at least the app is not fully broken, and users can still interact with it for core functionalities.

## When to use React server components?

- **Faster Initial Load Times:** React Server Components significantly reduce web app loading times, improving the user experience.
- **Ideal for Large-Scale Apps:** They shine in complex applications where handling client-side interactivity is challenging.
- **Reduced Client-Side Interactivity:** Use them for components not requiring immediate client-side interactions.
- **SEO Benefits:** Server-side rendering with React Server Components enhances SEO by providing pre-rendered content to search engines, boosting discoverability.

## Using server components in a Next.js application

At the time of writing this article, Next.js is the only stable implementation of React Server Components. In any Next.js project that uses App router, each component is a server component by default.

The code below shows what a simple Server component looks like in Next.js.

```tsx title="app/BlogPost.tsx"
// Server Component

const BlogPost = async ({ id, isEditing }) => {
  const post = await db.posts.get(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
    </div>
  );
};
```

On the other hand, a client component looks like a regular React component but has a `'use client'` directive at the top of the component file like so:

```tsx title="app/PostEditor.tsx"
// A client component

"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PostEditor = ({ blogPost }) => {
  const [post, setPost] = useState<any>({
    id: uuidv4(),
    title: blogPost.title,
    content: blogPost.content,
  });

  const onChange = (type: any, value: any) => {
    switch (type) {
      case "title":
        setPost({ ...post, title: value });
        break;
      case "content":
        setPost({ ...post, content: value });
        break;
      default:
        break;
    }
  };

  const submitPost = () => {
    // save blog post
  };

  return (
    <div>
      <div className="mt-10 px-6 md:mx-auto md:w-9/12 md:px-0">
        <h1 className="my-4 text-center">Create Post</h1>

        <form onSubmit={submitPost}>
          <div className="mt-8">
            <label className="mb-2 text-white"> Title </label>
            <input
              type="text"
              placeholder=""
              value={post.title}
              required
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>

          <div className="mt-8">
            <label className="mb-2 text-white">Add your Blog content</label>
            <textarea
              value={post.content}
              required
              onChange={(e) => onChange("content", e.target.value)}
            ></textarea>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="c-white border-radius bg-[#0e9f64] px-4 py-4"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
```

## Pros and Cons of React server components

In this section, we will explore the pros and cons of React Server Components.

**Pros:**

- **Reduced bundle size**: Server components execute and remain on the server. They don't contribute to the front-end JavaScript bundle. You can use third-party packages in RSCs without worrying about their impact to your client bundle size.
- **Improved security**: Because server components execute on the server-side, you can securely access sensitive data such as API keys, database URI strings and endpoints, usernames, and passwords.
- **Reduced Latency**: You can delegate certain API calls to server components since they run on the server. Therefore, eliminating round trips as with client components.
- **Improved SEO**: Server components are executed on the server side and only the generated HTML is sent to the client side. This makes it easier for search engines to index your web page.
- **Improved performance**: We fetch data and render server components on the server. Therefore, improving performance.

**Cons:**

- You can only use React Server components with meta React frameworks. At the moment, you can only use it with Next.js. You can't use it with vanilla React.
- RSCs can be complex, unintuitive and difficult to get right. RSCs introduce a new mental model. The shift in paradigm comes with significant learning overhead.

## Bonus: Hydration and React Server Components

In React, hydration means attaching React’s event listeners to already rendered HTML on the client side in order to make it interactive. React Server Components (RSCs) are rendered only on the server, so they don’t need hydration. Client components, however, require hydration since they handle interactions such as clicks and inputs.

### Basic Hydration Setup

For interactive components, they must be client components. React will hydrate them once the page loads. Server components, on the other hand, generate only HTML and don’t have any interactive behavior, so they aren’t hydrated.

Here’s an example:

```tsx
// ServerComponent.tsx - This won't be hydrated
export const ServerComponent = async () => {
  const data = await fetchSomeData();

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};
```

This ServerComponent is rendered on the server, and no JavaScript is sent to the client for this component. It outputs static HTML and is never hydrated.

```tsx
// ClientComponent.tsx - This will be hydrated
"use client"; // Flagging it as a client component

import { useState } from "react";

export const ClientComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
    </div>
  );
};
```

The ClientComponent is marked as ‘use client’, so React will hydrate this component on the client, making it interactive—updating the count when the button is clicked.

### Hydration in Next.js with Server and Client Components

By default, components in a Next.js app are server components, and client components must be explicitly declared. Hydration occurs only for client components. Here’s an example using both server and client components:

```tsx
// app/BlogPage.tsx - Next.js Example using both Server and Client components

import { ServerComponent } from "./ServerComponent";
import { ClientComponent } from "./ClientComponent";

export default function BlogPage() {
  return (
    <div>
      {/* ServerComponent will be rendered as static HTML on the server */}
      <ServerComponent />

      {/* ClientComponent will be hydrated on the client for interactivity */}
      <ClientComponent />
    </div>
  );
}
```

In this example:

ServerComponent is rendered as static HTML on the server.
ClientComponent is hydrated on the client after the page loads, making the button interactive.

### How Hydration Works: A Deeper Look

React Server Components don’t send any JavaScript to the client. The server provides fully-rendered HTML, and hydration applies only to client components, which handle things like button clicks and form submissions.

Here’s how hydration works for a client component:

- 1. The static HTML for the client component is already rendered on the page.
- 2. After React’s JavaScript bundle is downloaded, React looks for the existing HTML markup and attaches event listeners to the DOM nodes.
- 3. Now, the component becomes interactive.

```tsx
// ClientComponent.tsx
"use client";

import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

In the example above:

When the page loads, React will hydrate the Counter component, attaching the onClick handler to the button. The button becomes interactive after hydration.

### Why Hydration Is Not Needed for Server Components

Server components are static and don’t include any logic for interactivity. They don’t require hydration because they don’t run on the client. This reduces the amount of JavaScript the client has to download, improving performance.

```tsx
// ServerComponent.tsx - Non-interactive server component

export const StaticContent = async () => {
  const data = await fetch("https://api.example.com/data");
  const result = await data.json();

  return (
    <div>
      <h1>{result.title}</h1>
      <p>{result.description}</p>
    </div>
  );
};
```

The ServerComponent fetches data and renders it as HTML on the server. It doesn’t include any JavaScript that needs to be sent to the client.

### Improving Performance with Reduced Hydration

One of the key performance benefits of React Server Components is the reduced need for hydration. Since server components don’t include JavaScript, the client has less work to do, and page load times are faster.

To avoid excessive hydration, we should only use client components when necessary (e.g., for interactivity like forms and buttons). Server components should handle static content or non-interactive logic to keep the client bundle small.

## Conclusion.

In this article, we explored React server components and discussed its use and benefits. React server components enable us combine both client-side and server-side rendered components in React applications in a new way. I hope this article convinces you to test out React server components today.
