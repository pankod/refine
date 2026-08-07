---
title: What is Next.js getInitialProps and getServerSideProps?
description: We will deep dive into Next.js getInitialProps and getServerSideProps.
slug: next-js-getinitialprops-and-getserversideprops
authors: michael
category: "Tutorials"
tags: [nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-31-next-getInitial/social.png
hide_table_of_contents: false
---

## Introduction

Next.js is an open-source React framework for building production and enterprise-ready applications. It includes many built-in features such as Server-side Rendering (SSR), Static Site Generation (SSG), automatic image optimization, backend functionality support using API Routes and so on, that make developing web applications a breeze.

One of the many interesting features in Next.js are its data fetching methods. Next.js offers different ways of fetching and rendering data in your applications depending on your use case.

At times, it may be confusing as to which of the methods or functions to use for data fetching if you're new to Next.js.

Next.js has two functions for server-side rendering (pre-rendering or pre-population of data/contents on the server) namely: `getInitialProps` and `getServerSideProps`. As we go on, we'll explore both functions, understand how they work and learn when it's appropriate to use them in our applications.

## What is `getInitialProps`?

`getInitialProps` is an asynchronous function used for fetching data on the server and pre-rendering the resulting data (aka server-side rendering) in Next.js page components.

`getInitialProps` behavior can be tricky for developers who are new to Next.js. The function runs only on the server at the initial page load. However, if you make client-side navigation to other parts of your application through the `<Link>` component or `next/router` and come back to the page using `getInitialProps`, the function will then run in the browser this time.

Any data you are fetching in `getInitialProps` is returned as an object and is used by Next.js to populate the `props` parameter in the default export in a page component.

The example below shows how you can use `getInitialProps` in a page component:

```tsx title="pages/example.tsx"
// Get the data returned from getInitialProps as props
function Page({ data }) {
  // Render data...
}

Page.getInitialProps = async (context) => {
  const res = await fetch("https://api.com");
  const data = await res.json();

  return { data }; // this will be passed to the page component as props
};

export default Page;
```

### Context parameter

`getInitialProps` accepts a single and optional parameter named `context`. The `context` parameter is an object containing the following keys:

- `req`: An instance of [HTTP request object](https://nodejs.org/api/http.html#http_class_http_incomingmessage) (this object is only available when `getInitialProps` runs on the server)

- `res`: An instance of [HTTP response object](https://nodejs.org/api/http.html#http_class_http_serverresponse) (this object is only available when `getInitialProps` runs on the server)

- `pathname`: Returns the current route. For example, if you have a file `pages/example.js`, `pathname` will return `/example`

- `query`: Query string parsed as an object if the URL contains query parameters

- `aspath`: Returns a string of the actual path (including the query) as shown in the browser.

- `err`: Contains an error object if any error is encountered during the rendering

Visit the Next.js documentations [here](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props) to learn more about `getInitialProps`.

## What is `getServerSideProps`?

`getServerSideProps` is an asynchronous function used in Next.js pages component for server-side rendering and works almost the same as `getInitialProps`. It is a newer alternative to `getInitialProps` introduced in [Next.js 9.3](https://nextjs.org/blog/next-9-3).

`getServerSideProps` runs at request time and is **guaranteed to always run on the server and never in the browser**. So unlike `getInitialProps`, even if you refresh the page or perform client-side navigation using `<Link>` or `next/router`, `getServerSideProps` will always run on the server.

```tsx title="pages/example.js"
// Get the data returned from getServerSideProps as props
function Page({ message }) {
  return (
    <>
      <h1>Example page</h1>
      // Render data
      <h2>{message}</h2>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      message: "Hello world!",
    },
  };
}

export default Page;
```

### Context parameter

Like `getInitialProps`, `getServerSideProps` accepts a single and optional `context` parameter. The `context` object contains the following keys:

- `req`: An instance of [HTTP request object](https://nodejs.org/api/http.html#http_class_http_incomingmessage)

- `res`: An instance of [HTTP response object](https://nodejs.org/api/http.html#http_class_http_serverresponse)

- `params`: Contains the route parameter if the page is a dynamic page. For example, a dynamic file `pages/[id.js]` will have a `params` object that looks like `{ id: ... }`

- `query`: An object that contains the query string (if the page utilizes one), including dynamic route parameters.

- `preview`: Returns a Boolean value. Returns true if the page utilizes Preview Mode and false otherwise.

- `previewData`: The preview data set by setPreviewData if the page utilizes Preview Mode

- `resolvedUrl`: A resolved version of the URL that removes the \_next/data prefix for client transitions

- `locale`: Contains the active [internationalized locale](https://nextjs.org/docs/advanced-features/i18n-routing) (if enabled)

- `locales`: Contains all supported locales information (if enabled)

- `defaultLocale`: Contains the configured default locale (if enabled)

### Return value

`getServerSideProps` must return an object with any of the following properties:

- `props`: An object key-value pair passed to the page component. It should be a serializable object that can be serialized with `JSON.stringify`.

- `notFound`: A boolean object which allows the page to return a 404 status and 404 Page. If `notFound` is set to true, the page will return a `404` error even if the page was previously generated successfully.

- `redirect`: An object with the following structure `{ destination: string, permanent: boolean }`. It allows redirecting to internal and external resources such as redirecting a user to a login page after a successful sign-up.

You can visit the Next.js documentations [here](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) to learn more about `getServerSideProps`.

### Automatic caching capabilities

Next.js provides `getServerSideProps` (server-side Rendering) with caching capabilities that help improve server response times and reduces the number of requests to external services.

Next.js will automatically add caching headers to static assets served from `/_next/static` including JavaScript, CSS, static images, and other immutable media.

Here's how you can set a custom header in `getServerSideProps` using the response object:

```tsx title="pages/example.js"
function Page({}) {
  return <>// ...</>;
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59",
  );

  return {
    props: {},
  };
}

export default Page;
```

Note that caching doesn't work when your application is running in development mode (`next dev`).

You can learn more about configuration options for the HTTP header field `Cache-Control` on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control).

## `getInitialProps` vs `getServerSideProps`

When you are doing server-side rendering in your applications, it's important to know which of the functions to use in your applications since the two functions work almost similarly, and are both included in the Next.js docs.

We'll go through some examples to see how both functions work in real-world applications.

### `getInitialProps`

The GIF below shows how `getInitialProps` behaves when it's used to fetch data for server-side rendering.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-31-next-getInitial/getInitProp.avif"  alt="getInitialProps server and client log behavior demo" />

<br />

Here's the code for the example above:

```tsx title="pages/example.js"
import Link from "next/link";
function Page({ data }) {
  return (
    <>
      <h1>
        Example page using <code>getInitialProps</code>
      </h1>
      <h1 style={{ textDecoration: "underline" }}>
        <Link href="/">Go home</Link>
      </h1>
      <br></br>
      {data.map((data, i) => {
        return <h2 key={i}>{data.username}</h2>;
      })}
    </>
  );
}

Page.getInitialProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // The next line will log the first item in the API data to the console in the server
  // during the initial first page load. After making a client-side navigation to the home page
  // or any other part of the application, `getInitialProps` will then run in the browser.
  // This will make the first item in the data returned from the API to be logged to the browser console
  // instead of the server.
  console.log(data[0]);

  return { data };
};

export default Page;
```

In the code above, we're fetching a list of users from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API using `getInitialProps`, and then passing the data as props to the page component for rendering.

From the GIF, when the `localhost:3000/example` page is first loaded, `getInitialProps` runs **only** on the server so the line `console.log(data[0])` is logged to the server, and nothing is logged to the browser console.

However, when we make client-side navigation to the home page `localhost:3000` using the `<Link>` component, and return to `localhost:3000/example`, `getInitialProps` then runs **only** in the browser and the line `console.log(data[0])` logs the first item in the data returned from the API to the browser console.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>

### `getServerSideProps`

The GIF below shows the same example from the previous section using `getServerSideProps` to fetch a list of users from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API for server-side rendering.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-31-next-getInitial/getServerProp.avif"  alt="getServerSideProps server-only log behavior demo" />

<br />

Here's the code for the example above:

```javascript title="pages/example.js"
import Link from "next/link";

function Page({ data }) {
  return (
    <>
      <h1>
        Example page using <code>getServerSideProps</code>
      </h1>
      <h1 style={{ textDecoration: "underline" }}>
        <Link href="/">Go home</Link>
      </h1>

      <br></br>
      {data.map((data, i) => {
        return <h2 key={i}>{data.username}</h2>;
      })}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // The next line will only be logged on the server and never on the browser console even if we make
  // client-side navigation.
  // This confirms that `getServerSideProps` is guaranteed to run on the server and never on the client (or browser).
  console.log(data[0]);

  return {
    props: {
      data,
    },
  };
}

export default Page;
```

From the GIF, you can see that even though we made client-side navigation, and refresh the page, `getServerSideProps` was never run in the browser.

In addition, writing server-side specific code such as using the `fs` module and so on will work perfectly in `getServerSideProps`. However, you'll run into errors if you try the same thing in `getInitialProps`.

As you have learned from the previous sections and examples, `getInitialProps` and `getServerSideProps` are both used in fetching data for server-side rendering in Next.js.

Both functions share similarities as well as differences. One similar property is that both cannot be used in children components, but only in page components. The major and significant differences between the two functions is where they run and their behavior when making client-side navigation.

`getInitialProps` will run on the server during the initial page load and, subsequently, run in the browser if you make client-side transition to other parts of the application. However, `getServerSideProps` will only run on the server and never in the browser (even if you make client-side navigation, or refresh the page).

Using `getInitialProps` for data fetching and SSR in Next.js is outdated and deprecated because its behavior can be confusing for beginners and could also lead to unintentional bugs and errors if used the wrong way.

## Conclusion

In summary, the Next.js developers recommend using `getServerSideProps` over `getInitialProps` since the former has extra features such as automatic caching and handles all use cases for server-side rendering.

In this article, we covered in-depth, the two Next.js data fetching methods for server-side rendering (`getInitialProps` and `getServerSideProps`). You also learned about how each function works and their behavior.

And now, we hope this article will help you make the right choice to avoid unintentional errors and bugs when you do SSR in your Next.js applications.
