---
title: NextAuth - Google And GitHub Authentications for Nextjs
description: How to implement Google and GitHub authentications using NextAuth.js in Next.js?
slug: nextauth-google-github-authentication-nextjs
authors: ekekenta_clinton
category: "Ecosystem / Integrations"
tags: [nextjs, backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/social-2.png
hide_table_of_contents: false
last_update: 2024-06-24
---

**This article was last updated on June 21, 2024, to include new sections on testing, security, error handling, and performance optimization for NextAuth.**

## Introduction

We know how exhausting and time-consuming it can be to set up authentication, which includes handling databases, cookies, JWT, sessions, etc., on your own.
The goal of this article is for you to learn about an alternative and simple tool (NextAuth), which we will use to easily add Google and GitHub authentication to our application.

Steps we’ll cover:

- [What is NextAuth?](#what-is-nextauth)
- [Why use NextAuth.js?](#why-use-nextauthjs)
- [Project setup](#project-setup)
- [Create API Routes](#create-api-routes)
  - [For GoogleProvider (Make sure you have a Google account):](#for-googleprovider-make-sure-you-have-a-google-account)
  - [For GithubProvider (you will need a GitHub account):](#for-githubprovider-you-will-need-a-github-account)
- [Configure Shared Session State](#configure-shared-session-state)
- [Update Page Components](#update-page-components)
- [Add React Hook](#add-react-hook)
- [Protect API Routes](#protect-api-routes)
- [Testing Authentication](#testing-authentication)
- [Security Considerations](#security-considerations)
- [Error Handling](#error-handling)
- [Some Performance Optimization Tips](#some-performance-optimization-tips)

## Prerequisites

We will be building a simple landing page to demonstrate how you can simply add Google and GitHub authentication to your Next.js app, and to follow along, you need to have the following in place:

- Node.js 12.22.0 or later
- Google console account.
- GitHub account.

## What is NextAuth?

[NextAuth.js](https://next-auth.js.org/) is an easy-to-implement open source authentication library originally designed for Nextjs and serverless. With NextAuth, you don’t necessarily have to create and use any database or any backend of any kind for authentication because it takes care of all that. It allows your users to sign in with their favorite preexisting logins. You can add as many predefined providers provided by NextAuth to your applications.

## Why use NextAuth.js?

- It supports OAuth 1.0, 1.0A, 2.0, and OpenID Connect and is designed to work with any OAuth service.
- Many popular sign-in services are already supported.
- Email and passwordless authentication are supported.
- Allows for stateless authentication with any backend (Active Directory, LDAP, etc.)
- JSON Web Tokens and database sessions are both supported.
- Designed for Serverless but runs anywhere (AWS Lambda, Docker, Heroku, and so on…).
- An open-source solution that gives you control over your data
- MySQL, MariaDB, Postgres, SQL Server, MongoDB, and SQLite are all supported natively.
- Excellent compatibility with popular hosting provider databases
- It can be used without a database (for example, OAuth + JWT).
- Secure by default

## Project setup

To create a project, run:

```
yarn create next-app
```

The command above creates a new Next.js app using `create-next-app`, which sets up everything automatically for you. You will be prompted to enter your project name to complete the installation. We used the `yarn` package manager here, feel free to use `npm` if you have to.

Once the installation is completed, move into your folder directory and run the below command to start the project:

```
yarn dev
```

Now your app has started you need to install the NextAuth package which is essential for the authentications.

```
yarn add next-auth
```

Once this is done, you will have all the dependencies required to follow up with this tutorial set up and can proceed with s authentication in your next application.

_If you are using TypeScript, NextAuth.js comes with its types definitions within the package. To learn more about TypeScript for next-auth, check out the [TypeScript documentation](https://next-auth.js.org/getting-started/typescript)_

## Create API Routes

To get started with adding NextAuth.js to your project, you first create a new folder named `auth` inside the `pages/api` directory. Inside this new folder, you will create a file called `[...nextauth].js`.

This will contains the dynamic route handler for `NextAuth.js` which will also contain all of your global `NextAuth.js` configurations.

Next, inside the ``[...nextauth].js` you've created, you will configure the global `NextAuth` configurations for `Github` and `Google` providers.

```tsx title="pages/api/auth/[...nextauth].js"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
});
```

Looking at the code snippet above, we started by importing `NextAuth` from the next-auth package we installed earlier, and since we will be adding only Google and Github auth in this tutorial, `GoogleProvider` and `GithubProvider` were also imported and passed in the `providers` array which stores all `NextAuth` providers.

Next, we will be looking into how we can obtain the `clientId` and `clientSecret` for each of the providers.

### For GoogleProvider (Make sure you have a Google account):

Navigate to your [Google console](https://console.developers.google.com/apis/credentials) credentials tab.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/google-create.jpeg" alt="Create a Google project" />

<br/>

If you have created and selected a project before now, you will see a button at the top that says **_"CREATE CREDENTIALS"_** but if you haven't you need to create a project by clicking on the **_"CREATE PROJECT"_** action button like the one circled in the image above. You will be taken to a page where you will enter your project name and organization (optional).

When that is done, ensure you select the project you just created when notified.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/google-select-project.png" alt="Google select project" />

<br/>

Once that is done, proceed to create credentials by clicking on the "CREATE CREDENTIALS" action button at the top, this will open a dropdown containing four items. Click on the item circled in the below image to create an OAuth client ID.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/google-select-auth.png" alt="Google select auth provider" />

<br/>

If you come across anything like:

> To create an OAuth client ID, you must first configure your consent screen

Please, go ahead to configure the consent screen by providing some information on your app, and when that is done, proceed to continue creating the OAuth client ID by choosing the application type and filling up the rest of the fields.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/google-select-type.png" alt="Create an auth client" />

<br/>

After entering the name of your OAuth 2.0 client. You will see a section that requests adding an **"Authorized JavaScript origins"**, click on the "+ ADD URI" action button to add your app origin. Since we are working in the development environment, all we need to do is to copy/paste our app URL which is running on localhost.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/authorised-origins.png" alt="Authorized origins" />

<br/>

For the **"Authorized redirect URIs"**, you must include your full domain and end in the callback path.

- For production: `https://{YOUR_DOMAIN}/api/auth/callback/google`
- For development: `http://localhost:3000/api/auth/callback/google`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/redirect-url.png" alt="Redirect URL" />

<br/>

:::note

If you eventually push to production, you need to change the Authorized JavaScript Origin and Authorized redirect URIs to the production URIs.

:::

<br/>

Please verify the details provided and if they are all correct, click on "CREATE" to finally create your OAuth client ID.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/auth-client-created.png" alt="Auth client verified" />

<br/>

Congratulations! You've successfully created Google OAuth client ID and SECRET.

Where do you store it?

Next, you will create a `.env.local` file in the root level of your app folder and inside of it you will create `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables and assign the OAuth client values we just created for each.

You also need to include `NEXTAUTH_URL` (assign your app origin) and `NEXTAUTH_SECRET` environment variables in the `.env`.

When deploying to production, set the `NEXTAUTH_URL` environment variable to the canonical URL of your site.

Create a `NEXTAUTH_SECRET` environment variable for all environments.

- You can use `openssl rand -base64 32` or https://generate-secret.vercel.app/32 to generate a random value.
- You **do not** need the `NEXTAUTH_URL` environment variable in Vercel.

Your `.env.local` file should be looking like this when you're done.

```ts title=".env"
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_SECRET
```

### For GithubProvider (you will need a GitHub account):

To create your GithubProvider ID and SECRET, navigate to your GitHub account [developer settings](https://github.com/settings/apps) and click on the OAuth Apps tab to register a new application.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/github_register.png" alt="Github register" />

<br/>

Complete application registration by filling out the fields.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/github_register_enable.png" alt="Github register enable" />

<br/>

Once completed, click on the "Register application" action button to register your app.
Remember to go back and change the URIs to your production URI once you push to production.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/github_client_secrets.png" alt="Github secrets" />

<br/>

Congratulations! You've just created your Github OAuth Client ID and SECRET. You can generate a new client secret by clicking on the "Generate a new client secret" action button.

Recall you've already created a `.env` file for your environment variables, go ahead and assign the Client ID and Client secrets you just generated to the `GITHUB_ID` and `GITHUB_SECRET` variables.

```ts title=".env"
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_SECRET

GITHUB_ID=YOUR_ID
GITHUB_SECRET=YOUR_SECRET
```

This is the final look of our `.env` file.

Next, you will head into your `[...nextauth].js` file and add the secret, remember you've already added the environment variable as `NEXTAUTH_SECRET`.

```tsx title="pages/api/auth/[...nextauth].js"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
```

Congratulations! You’ve added your complete API route. The next thing you are going to do is to configure the shared session state.

## Configure Shared Session State

The `useSession()` React Hook in the NextAuth.js client is the easiest way to check if someone is signed in, and to be able to use this hook, first you’ll need to expose the session context, `<SessionProvider />`, at the top level of your application:

```ts title="pages/_app.jsx"
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

Instances of `useSession` will then have access to the session data and status. The `<SessionProvider />` also takes care of keeping the session updated and synced between browser tabs and windows.

## Update Page Components

Now update the `pages/index.js` file to create a blog application. To that, add the code snippet below to the `page/index.js`.

```ts title="page/index.js"
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>My Blog</h1>
        <div className={styles.row}>
          <div className={styles.blogCard}>
            <Image
              src="/Getting-Started-with-NextJS-Inside.jpeg"
              alt="Next.js blog card cover image"
              width={300}
              height={200}
            />
            <div className={styles.blogCardContent}>
              <h2>Nexjs for Beginers</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quidem.
              </p>

              <a href="/blog1">Read More</a>
            </div>
          </div>
          <div className={styles.blogCard}>
            <Image
              src="/pasted image 0.png"
              alt="Django course blog card cover image"
              width={300}
              height={200}
            />
            <div className={styles.blogCardContent}>
              <h2>Django Full Course</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quidem.
              </p>

              <a href="/blog1">Read More</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

Then add the code snippets in the `styles/Home.module.css` file to style the application.

```css title="styles/Home.module.css"
.blogCard {
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;
}
.blogCardContent {
  margin-top: 1rem;
}

.login {
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: center;
}
.header {
  display: flex;
  align-items: center;
}
.header button {
  margin-left: 10rem;
  padding: 4px;
  height: 2rem;
  background-color: #ad270c;
  border: none;
}
```

So if you refresh the application, you should see the blog application as shown in the screenshot below.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/result_view.png" alt="Result view" />

<br/>

Right now, everyone can have access to the application. Let's add a hook to restrict access to only authenticated users.

## Add React Hook

To know if a user is authenticated, we'll use the `useSession()` hook. To get started, we need to import and update the `pages/index.js` with the code snippet below.

```ts title="pages/index"
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <>
          <p>Not signed in</p>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <main className={styles.main}>
          <div className={styles.header}>
            <h4>Signed in as {session.user.name}</h4>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <h1 className={styles.title}>My Blog</h1>
          <div className={styles.row}>
            <div className={styles.blogCard}>
              <Image
                src="/Getting-Started-with-NextJS-Inside.jpeg"
                alt="Next.js blog card cover image"
                width={300}
                height={200}
              />
              <div className={styles.blogCardContent}>
                <h2>Nexjs for Beginers</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quidem.
                </p>

                <a href="/blog1">Read More</a>
              </div>
            </div>
            <div className={styles.blogCard}>
              <Image
                src="/pasted image 0.png"
                alt="Django course blog card cover image"
                width={300}
                height={200}
              />
              <div className={styles.blogCardContent}>
                <h2>Django Full Course</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quidem.
                </p>

                <a href="/blog1">Read More</a>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
```

Let's point out what we did in the above code. First, we `NextAuth` hooks, the `useSession` which helps us know if a user is authenticated, the `signIn` hook to load the sign-in buttons and the `signOut` hook to log a user out. Then we destructured the `session` object from the `useSession` hook. The `session` object provides us with the information of the logged-in user. Using conditional rendering, we check if a user is logged in and render the blogs else show the user a sign-in button.

Now, if you refresh the application, it will look like the screenshot below for non-authenticated users.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/not_signed_in.png" alt="Not sign in" />

<br/>

When the user clicks the sign-in button, they will be redirected to the sign-in button page as shown in the screenshot below.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/sign_in_box.png" alt="Sign in box" />

<br/>

Now when they click on any of the buttons, they will be redirected to the Google or Github page depending on which button they click. Once they are authenticated, the application will look like the screenshot below.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-18-auth-with-nextauth/result_with_sign.png" alt="Sign in result" />

<br/>

## Protect API Routes

NextAuth also allows you to protect your API routes. You can use the `unstable_getServerSession()` method to do that. Let's update and protect the `pages/api/hello.js` API with the code snippet below.

```ts title="pages/api/hello.js"
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    const blogData = [
      {
        id: 1,
        title: "Blog 1",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        image: "/images/blog1.jpg",
      },
      {
        id: 2,
        title: "Blog 2",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        image: "/images/blog2.jpg",
      },
    ];
    res.status(200).json(blogData);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
```

In the above code snippet, we imported the `unstable_getServerSession` method and the `authOptions` props. Then we created a `session` object from the `unstable_getServerSession` method passing in the `req`, `res` and `authOptions` as arguments. The session object will provide us with the details of the logged-in user. We check if a session exists and send the blog data to the client else send a `401` (Unauthorized) response.

## Testing Authentication

Testing on authentication in my project using NextAuth.js. Auth flow is significant, so here is the process.

The first step involves writing unit tests for my authentication logic. I use Jest, which is a great testing framework for JavaScript. For example, I am going to test out my API routes to ensure that they are handling login and logout properly.

The following is a simple test that verifies the success response of the login route:

```js
import { createMocks } from "node-mocks-http";
import handleLogin from "./pages/api/auth/[...nextauth]";

test("login API returns success", async () => {
  const { req, res } = createMocks({
    method: "POST",
    body: {
      provider: "google",
      token: "sample-token",
    },
  });

  await handleLogin(req, res);

  expect(res.statusCode).toBe(200);
  expect(res._getJSONData().message).toBe("Login successful");
});
```

I also make sure the whole authentication flow works using end-to-end integration tests. I write it using the likes of Cypress and for instance, simulating user interactions like signing in and out and verifying whether an application behaves in a certain way. The following is an example of an integration test with Cypress:

```js
describe("Authentication Flow", () => {
  it("should allow a user to sign in and sign out", () => {
    cy.visit("/");
    cy.contains("Sign in").click();
    cy.url().should("include", "/auth/signin");
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("password");
    cy.contains("Sign in").click();
    cy.url().should("include", "/");
    cy.contains("Sign out").click();
    cy.contains("Sign in");
  });
});
```

Lastly, I mock the OAuth providers during tests to avoid hitting real provider APIs. This makes tests much faster and saves you from dealing with issues around rate limiting or network problems during the test. I use libraries such as `nock` for HTTP request mocking.

## Security Considerations

When building your app and implementing authentication, it is very important to ensure the security of your users' data. One major step to take in this regard is using environment variables to store sensitive information such as client IDs and secrets so that it is out of the code base.

Always make sure to use HTTPS for transmission of data between the client and server, which helps to avoid attackers from intercepting sensitive information. Also, the session information may be maintained securely with cookies. The cookie attribute may be applied along with HttpOnly to avoid an XSS attack.

Correct handling of the sessions is also essential. The session should be given a proper expiry time and invalidated when the user logs out. Another best practice is the updating of dependencies to safeguard against known vulnerabilities within libraries, including but not limited to Next.js, NextAuth.js, etc. Last but not least, apply the rate limit on your authentication endpoints to protect against brute-force attacks.

By these best practices, you can further secure the implementation of your authentication and provide better protection for data belonging to your users.

## Error Handling

I use tools like Sentry and LogRocket to track and diagnose these issues. They help me spot patterns and recurring problems. For custom error handling, I set up custom error pages using the pages/\_error.js file in Next.js. This way, users get guided through troubleshooting steps if something goes wrong.

Additionally, I use middleware to catch and manage errors at different stages of the authentication process. The signIn and signOut methods from NextAuth.js can include error handling logic to manage specific authentication failures.

By using these tools and methods, I can handle authentication errors smoothly, which improves the user experience and keeps the application secure.

## Some Performance Optimization Tips

To begin with, one of the excellent ways to boost authentication performance is by using caching. You can implement a caching strategy about OAuth tokens, cutting down on the number of requests made to the authentication provider.

Another efficient way is to reduce the size of data sent and received. I made these requests on Google, GitHub, and the like, requesting only the scopes needed and the data required out of them, which has helped in making my payloads small and efficient.

Plus, all my dependencies are up-to-date, so I have everything at the best performance and without bugs in libraries like Next.js and NextAuth.js.

Finally, I use a Content Delivery Network (CDN) to serve static assets quickly. This dramatically reduces the load on my server and speeds up general application performance. With those strategies in place, my authentication process will be fast and effective.

## Conclusion

Throughout this tutorial, we've implemented how to add Google and GitHub authentication to a Nextjs application using NextAuth. We started by knowing what NextAuth is and why you should use it. Then we built a blog application for the demonstration. Now that you have the knowledge you seek, how would you add authentication to your next Nextjs project? Perhaps you can learn more about NextAuth from the [documentation](https://next-auth.js.org/).

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>
