---
title: How Next.js Redirects Work
description: We'll examine the concept of URL redirection in Next.js and how redirects work.
slug: next-js-redirect
authors: michael
category: "Tutorials"
tags: [nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-16-next-redirects/social-2.png
hide_table_of_contents: false
last_update: 2024-07-30
---

**This article was last updated on July 29, 2024, to add sections for Custom Redirects and Redirect Chains.**

## Introduction

The concept of URL redirection in web application development is one that is ubiquitous. We experience it almost every time during our usage of the internet. Think about the last time you were trying to sign up on a website and they asked you to sign up with Google. Remember all the pop-ups and redirects that happen before you're finally signed up to the website? Yeah, that's a typical example of URL redirection in web app development.

In this article, we'll examine the concept of URL redirection in Next.js, you'll learn how Next.js redirects work, how to implement them in your next project and everything else you need to know about Next.js redirects. Now, let's get started!

## Prerequisites

Before you continue with this article, you'll need to have a Next.js 13 app or above running that you can use to try out the code examples in this article.

The app in this tutorial is bootstrapped with [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app).

## What is URL Redirection?

URL Redirection is a technique used in web development for automatically changing the URL of a website from one to another. Redirects are implemented in web development using the 3XX HTTP status codes. For example, a 301 status code implies the URL you requested has moved permanently.

Some common use cases for performing URL redirects include:

- Link shortening
- User authentication
- A/B Testing
- Marketing campaigns
- Website migration
- Website maintenance or redesign

There are two most widely used methods of redirecting in web development:

1. Permanent redirection: This method which uses a 301 HTTP status code is used to indicate that a URL you're requesting has permanently moved to a new web address. A good example to illustrate this is the Angelist Talent former website (https://angel.co) which now permanently redirects to https://wellfound.com/.

2. Temporary redirection: This method uses a 302 HTTP status code to indicate a redirection from a specific URL to another for a limited duration of time. For example, if you're recreating your website or adopting a new brand design, you can redirect your users to a different page to notify them about the update until the new website is up.

## How to make redirects in Next.js

Now that you understand what URL redirection is, let's see how you can use the technique in your Next.js app.

The most basic way to setup Next.js redirects is to use the `redirects` key in your `next.config.js` file.

The Next.js app created for us by `create-next-app` comes with a `next.config.js` file by default in the app root folder. If you don't have the `next.config.js` file, you can create it now in your root folder.

Next, edit the content of `app/page.js` to the following:

```tsx
export default function Home() {
  return (
    <>
      <main>
        <div>This is the home page </div>
      </main>
    </>
  );
}
```

Now, create a new folder named `feed` inside the `app` folder and create a `page.js` in it like so: `app/feed/page.js`:

```tsx
export default function Feed() {
  return <h1>Hello, welcome to your feed!</h1>;
}
```

Finally, edit the content of `next.config.js` file in your app folder to this:

```tsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/feed",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

Now if you start the development server with `npm run dev` and navigate to `http://localhost:3000`, instead of the app to render the home page in `app/page.js`, you'll be redirected to the `app/feed/page.js` page instead.

Here's how everything works behind the scenes:

The `redirects` key in `next.config.js` is an async function that returns array with objects for configuring redirects in your app. You'll be using it most of the time to implement redirects in your Next.js app.

In the above example, we defined three objects: `source`, `destination` and `permanent` to implement the redirect.

The configuration objects are seven in total, but the following three are required to perform any redirects.

- `source` - the original path the user requested.
- `destination` - the new path you want to route to.
- `permanent` - a boolean value. When set to true, it will utilize the 308 status code, instructing clients and search engines to cache the redirect indefinitely. If set to false, it will use the 307 status code, which is temporary and not cached.

While the following four are optional and only required for specific use cases.

basePath - can be either false or undefined - if set to false, the basePath will not be considered during matching. This can be useful for external redirects exclusively.

- `locale` - can be either false or undefined - determines whether the locale should be excluded during matching.
- `has` - an array of has objects with the type, key and value properties.
- `missing` - an array of missing objects with the type, key and value properties.

## Methods of Redirecting in Next.js

Next.js provides a variety of ways to perform redirects. These include; path matching; header, cookie, and query matching; API redirecting and so on.

### Path matching

This method involves the use of URL paths to configure how you want Next.js to perform the redirect. The example we used above is an example of using URL paths to configure Next.js redirects.

```tsx
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/feed",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

There are two methods we can use to match URL paths for redirects. These are:

- Matching URL path using wildcard patterns
- Matching URL path using Regular expressions

#### Matching URL path using wildcard patterns

You can use wildcard patterns (using asterisks) to match one or more characters in the URL path. For example, a URL path such as "/user/:username\*" will match any URLs that have the word "user" followed by any string, such as, `/user/johndoe` or `/user/samurai`:

The example below will redirect a user that tries to access, say for example, `/user/johndoe` to `profile/johndoe`.

```tsx
module.exports = {
  async redirects() {
    return [
      {
        source: "/user/:username*",
        destination: "/profile/:username*",
        permanent: true,
      },
    ];
  },
};
```

#### Matching URL path using Regular expressions

Another way to configure Next.js redirects is to use regex patterns to match the URL path. To do this, you can wrap the regex pattern in parentheses. For example, `/posts/:slug([A-Za-z0-9]+)` will match `/posts/XRTw34gFG` but not `/posts/FEE$#GRgtyy`.

```tsx
module.exports = {
  async redirects() {
    return [
      {
        source: "/posts/:slug([A-Za-z0-9]+)",
        destination: "/articles/:slug",
        permanent: false,
      },
    ];
  },
};
```

### Redirecting Based on Header, Cookie and Query Values

You can also configure Next.js redirects based on when the values of headers, cookies or query match the `source` and `has` objects or don't match the `missing` object in `next.config.js`. Note that for the redirect to take effect, the values of `source` and `has` must match while the value of `missing` must not match.

The `has` and `missing` objects can have the following fields:

`type`: a string value that must be either `header`, `cookie`, `host`, or `query`.
`key`: String - the key from the selected type to match against.
`value`: String or undefined - the value to check for, if undefined any value will match.

Let's look at an example that redirects the user to a different page in the app based on cookie value.

Edit the content of `feed/page.js` to the following:

```tsx
"use client";
import { useEffect } from "react";

export default function Feed() {
  useEffect(() => {
    document.cookie = "admin=true; SameSite=None; Secure";
    console.log(document.cookie);
  });

  return <h1>Hello, welcome to your feed!</h1>;
}
```

Next, edit the content of `next.config.js` to the following:

```tsx
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/feed",
        has: [
          {
            type: "cookie",
            key: "admin",
            value: "true",
          },
        ],
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

In the example above, we are setting a cookie in `feed/page.js` immediately after the page renders. Then we configure `next.config.js` to redirect the user from the feed page to the home page -`localhost:3000`- based on the cookie value. The `has` key checks if there's a cookie with a key-value pair of 'admin=true' and then applies the redirect if so.

### Redirecting with `basePath` support

The `basePath` key allows you to prefix the URLs with a specific path.
For example, if you want to redirect users to a new version of your docs with a different path and you don't want to write the new path repeatedly, you can set the value of `basePath` in `next.config.js` like so:

```tsx
const nextConfig = {
  basePath: "/v2",

  async redirects() {
    return [
      {
        source: "/v1/docs",
        destination: "/docs/getting-started/",
        permanent: false,
      },
      // ...
    ];
  },
};

module.exports = nextConfig;
```

Now, when a user tries to visit the old docs at `/v1/docs/getting-started`, they will be redirected to `/v2/docs/getting-started` instead.

And if you don't want the `basePath` to apply to a specific redirect you can set `basePath` to false like so:

```tsx
const nextConfig = {
  basePath: "/v2",

  async redirects() {
    return [
      {
        source: "/v1/docs",
        destination: "/docs/getting-started/",
        permanent: false,
      },
      {
        source: "/without-basepath",
        destination: "https://google.com", // basePath is set to false here so this URL won't be prefixed with `/v2`
        basePath: false,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
```

### Other Methods of Performing Next.js Redirects

#### In API Routes

Apart from configuring redirects using the `next.config.js` file, Next.js provides other methods for doing this in different scenarios. For example, if you're building a full-stack application using Next.js API routes you can use the `redirect()` method to make redirects.

```tsx
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.redirect("https://nextjs.org/");
}
```

#### In `getServerSideProps` and `getStaticProps`

```tsx
export default function Home() {
  return <h1>Welcome to the home page!</h1>;
}

export const getServerSideProps = async ({ res }) => {
  return {
    redirect: {
      destination: "/new-url",
      permanent: false,
    },
  };
};
```

## Custom Redirects

This is where you might specify to developers how they are to implement custom redirects based on certain criteria—be it user roles, authentication states, or certain actions by a user.

### User Role-Based Redirects

```tsx
export async function getServerSideProps(context) {
  const { userRole } = context.req;

  if (userRole !== "admin") {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
```

### Authentication-Based Redirects

```tsx
export async function getServerSideProps(context) {
  const { isAuthenticated } = context.req;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
```

## Chains of Redirects

Describe how you would handle multiple redirections without creating a redirect loop. In this section, please feel free to offer advice on how to design redirect logic that will not lead to such infinite loops and will allow the user to always complete the journey to their destination of interest.

### Multiple Redirects

```tsx
export async function getServerSideProps(context) {
  const { isAuthenticated, userRole } = context.req;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (userRole !== "admin") {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
```

## Performance Considerations

You can also explore how redirects contribute to Next.js application performance.

### Making User-Friendly Redirects

- Use server-side redirects (via `getServerSideProps`) rather than navigating via the client.
- Minimize redirects to reduce HTTP requests.

## Redirections w.r.t Internationalization (i18n)

If your application is localized for various languages, explain how to keep redirects for user language settings intact.

### Linguistic Reductions

```tsx
export async function getServerSideProps({ req, res }) {
  const { locale } = req;

  if (locale === "fr") {
    return {
      redirect: {
        destination: "/fr/welcome",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
```

## SEO Best Practices

So, make an attempt with me, and we will tell you how to make more graceful redirects. Discuss the importance of using the right HTTP status codes, and major pitfalls to avoid that may produce a rather destructive influence on the ranking of the website for search engines.

### SEO Redirects

- Permanent changes, for example, should be saved with 301 redirects to keep the SEO rankings.
- They're attempting to avoid any diluting of link equity by redirecting to the chains.
- Ensuring that each redirect drops the user on some piece of relevant content that is informative and engaging.

## Test Redirects

Include methodologies and tools for testing that redirects work as intended. It can cover automated testing using frameworks such as Cypress or manual testing hints.

### Automated Redirect Testing

```jsx
describe("Redirects", () => {
  it("should redirect to login if not authenticated", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
  });

  it("should redirect to home if authenticated", () => {
    cy.setCookie("isAuthenticated", "true");
    cy.visit("/");
    cy.url().should("include", "/home");
  });
});
```

## Conclusion

In this article, we looked at the several ways through which you can leverage Next.js' capabilities to easily configure redirects based on a variety of criteria, including URL matching, query parameters, cookies, headers, and more.

Next.js gives you a powerful and flexible system for handling redirects in your web applications. Whether you're building a simple or complex application, the methods discussed in this article are guaranteed to work for your use cases.

Happy coding!
