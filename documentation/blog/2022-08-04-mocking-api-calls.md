---
title: Mocking API calls in React Tests with Nock
description: How to test API calls in React?
slug: mocking-api-calls-in-react
authors: necati
category: "Engineering"
tags: [react, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-04-mocking-api-calls/social.webp
hide_table_of_contents: false
---

## Introduction

Writing unit tests is very important for the development process. Testing components that use HTTP requests sometimes may be a real pain.

In testing, we often want to make mock requests to test our code without actually making an HTTP request. This can be especially important when we are testing code that makes external API calls since we don't want to rely on the availability of the external API.

We'll use a third-party package called [nock](https://github.com/nock/nock) that helps us to mock HTTP requests. With nock, we can specify the desired behavior of our mock HTTP requests, including the URL, headers, and body. This allows us to test our code against a known data set, making debugging and testing much more straightforward.

I'll show how to write unit tests for API calls by mocking method in the simple React app.

## Why mocking HTTP requests during testing is important?

Mock testing is a great way to speed up running tests because you can eliminate external systems and servers.

These are all possible errors that you might encounter when running tests with the API:

- The data returned from API can be different on each request.
- It takes a longer time to finish running the test.
- You may get a big size of data that you don't need to use in tests.
- You may have issues like rate limiting and connectivity.

We'll use the Nock to find a solution for these problems. We'll create a simple react app and request an external API. We will implement how to mock API calls and write a unit test for API calls using Nock in a React application.

## What is Nock?

Nock is an HTTP server mocking and expectations library. Nock works by overriding Node's `http.request` function.

It helps us mock calls to API and specifies what URLs we want to listen for, and responds with predefined responses, just like real APIs would.

We can use nock to test React components that make HTTP requests.

## Bootstrapping the example app

We'll use [superplate](https://github.com/pankod/superplate) CLI wizard to create and customize the React application fastly.

Run the following command:

```
npx superplate-cli example-app
```

Select the following options when taking the CLI steps:

```
? Select your project type
❯ react

? Testing Framework
❯ React Testing Library
```

CLI should create a project and install the selected dependencies.

Create a component with the following code:

```tsx title="index.tsx"
export const Main = () => {
  const [state, setState] = React.useState<{ firstName: string }>({
    firstName: "",
  });

  const fetchData = async () => {
    const response = await fetch("https://api.fake-rest.refine.dev/users/1");
    const result = await response.json();
    return result;
  };

  React.useEffect(() => {
    (async () => {
      const data = await fetchData();
      setState(data);
    })();
  }, []);

  return <div>{state.firstName}</div>;
};
```

Above we can see that we do fetch call to [Refine](https://github.com/refinedev/refine)'s fake REST API URL and thereafter returned data shows on the screen.

<br/>
<div>
<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="Support Refine on GitHub banner" />
</a>
</div>

## Adding a unit test

Now, we are going to create a test file.

We want to add a test case for the function that makes an HTTP request to a URL and returns the data provided. Waiting for the data returned by API to be rendered on screen is a typical way of testing it.

Using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) the expected unit test vase will be the following:

```tsx title="index.spec.tsx"
import { Main } from "./index";
import { render, screen, waitFor } from "@testing-library/react";

describe("expectedData", () => {
  it("checks if returned data from API rendered into component", async () => {
    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText("/value from the api")).toBeInTheDocument();
    });
  });
});
```

At this point, if run the test it will fail. It'll attempt to perform a network request. Since we are calling a real database it will return all the data rather than only the specific data that we need.
Also, the API will respond with different values for each request.

Testing this HTTP request-related architecture in that way can be a headache.

With the nock mock service, we can intercept requests to the API and return custom responses.

## Nock installation and configuration

Install the nock with the following command if you don't have it.

```
npm install --save-dev nock
```

We'll add the highlighted codes to initialize the nock.

```tsx title="index.spec.tsx"
import { Main } from "./index";
import { render, screen, waitFor } from "@testing-library/react";
//highlight-next-line
import nock from "nock";

describe("expectedData", () => {
  it("checks if returned data from API rendered into component", async () => {
    //highlight-start
    nock("https://api.fake-rest.refine.dev")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/users/1")
      .reply(200, {
        id: 1,
        firstName: "/value from the api",
      });
    //highlight-end

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText("/value from the api")).toBeInTheDocument();
    });
  });
});
```

At this point, our test works.

<div >
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-04-mocking-api-calls/test-run.png" alt="Test run" />
</div>

<br/>

The test runner creates a mock server with nock and the `fetchData()` method will trigger.
Rather than calling the API to test our app, we provide a set of known responses that mock it.

Nock intercepts `GET` requests to `'https://api.fake-rest.refine.dev'` followed by the path `'/users/1'` with the HTTP method `get`.

The response should be like defined in the `reply()` method.
We also set the `CORS` policy to the header with `defaultReplyHeaders`.

## Custom requests in Nock

We can specify the mock requests.

#### All HTTP methods like `GET`, `POST`, `PUT`, `DELETE` can be mock.

Simple `POST` request:

```tsx
nock("https://api.fake-rest.refine.dev")
  .post("/users", {
    username: "test",
    status: true,
  })
  .reply(201);
```

#### To handle query parameters, the `query` option can be used.

```tsx
nock("https://api.fake-rest.refine.dev")
  .get("/users")
  .query({
    username: "test",
    status: true,
  })
  .reply(200);
```

When an HTTP request is made with specified query, nock will intercept and return with a `200` status code.

#### Mocking server Errors

Error replies can be returned from the mocking server with `replyWithError` prop.

```tsx
nock("https://api.fake-rest.refine.dev").get("/users").replyWithError({
  message: "Server ERROR",
});
```

You may want to handle errors by only replying with a status code.

```tsx
nock("https://api.fake-rest.refine.dev")
  .post("/users", {
    username: "test",
    status: true,
  })
  .reply(500);
```

:::note

It’s important to note we are using `afterAll(nock.restore)` and `afterEach(nock.cleanAll)` to make sure interceptors do not interfere with each other.

```tsx
afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
```

:::

## Recording in Nock

Recording relies on intercepting real requests and responses and then persisting them for later use.

Nock prints the code to the console which we can use as a response in tests with `nock.recorder.rec()` method.

Comment out the nock function and let's add `nock.recorder.rec()` in to the test file.

When the test runs, the console logs all the service calls that nock has recorded.

<div >
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-04-mocking-api-calls/nock-recorder-log.png" alt="nock record log" />
</div>

<br/>

Instead of defining `nock` method and reply values manually, we can use recorded values.

## Alternative API mocking libraries

[MSW Mock Service Worker](https://mswjs.io/): Mock Service Worker is an API mocking library that uses Service Worker API to intercept actual requests.

[Mirage JS](https://miragejs.com/): Mirage JS is an API mocking library that lets you build, test, and share a complete working JavaScript application without having to rely on any backend services.

[fetch-mock](https://github.com/wheresrhys/fetch-mock): fetch-mock allows mocking HTTP requests made using fetch or a library imitating its API.

## Conclusion

In this article, we've implemented API mocking and explained how useful it can be. We used nock to mock HTTP requests in our test and some useful properties are shown.

We have seen how to test only the behavior of an application in isolation. Avoid any external dependencies that may affect our tests and ensure they are running on stable versions at all times.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord-banner.png" alt="Join Refine on Discord banner" />
</a>
</div>
