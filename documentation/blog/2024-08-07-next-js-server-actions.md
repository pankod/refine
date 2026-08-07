---
title: Next.js 13.4's Server Actions and Data Fetching
description: We'll delve into the Next.js alpha feature Server actions and data fetching techniques.
slug: next-js-server-actions-and-data-fetching
authors: victor_uma
category: "Tutorials"
tags: [nextjs, backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-29-next-js-server-actions/social-2.png
hide_table_of_contents: false
last_update: 2024-08-09
---

**This article was last updated on August 07, 2024, to add sections on Security Considerations and SWR.**

## Overview

Delivering flawless user experience and structured data retrieval is of the most important when it comes to web development. Next.js, a robust React framework, has become the go-to choice for developers seeking to optimize server-side rendering (SSR) and client-side rendering (CSR) capabilities. One crucial aspect that sets Next.js apart is its comprehensive toolkit for data fetching and server actions.

Understanding the fundamentals of data fetching is essential to harnessing the power of Next.js. In this tutorial, we're going to dive deep into Next.js data fetching and server actions and how we can use and manage its features in an application. Whether you're a seasoned Next.js developer or exploring the framework for the first time, this article will provide valuable insights and practical examples to supercharge your web applications.

Server actions are an alpha feature in Next.js, enable you to build custom server endpoints that handle specific actions and data operations. Next.js API routes offer a robust foundation to implement server actions effectively, bridging the gap between the client and server seamlessly. We'll delve into the intricacies of creating API routes, handling client-server communication, and implementing server-side functionalities.

## Basics of Next.js

Next.js is a powerful framework built on top of React that simplifies and improves the building of modern front-end apps. It combines the best features of server-side rendering (SSR) and client-side rendering (CSR), offering developers flexibility and performance optimization.

### Server-Side Rendering (SSR) vs. Client-Side Rendering (CSR) in Next.js

Server-side rendering involves generating the HTML for a web page on the server and sending it to the client. This approach improves initial page load time and enables search engine optimization (SEO) since search engine crawlers can easily parse the fully rendered HTML. Next.js excels at server-side rendering, allowing you to pre-render pages dynamically or statically.

Client-side rendering, on the other hand, relies on JavaScript to render web pages on the client's browser. This approach provides interactivity and dynamic content updates but may result in slower initial page loads. Next.js supports hybrid rendering, allowing you to select between server-side and client-side rendering according on the needs of your application.

**Advantages of Next.js**

1. Simplified Setup: Next.js simplifies the setup process by providing a batteries-included framework. It comes with built-in routing, webpack configuration, and hot module replacement, saving you time and effort.
2. Automatic Code Splitting: Next.js intelligently splits your code into smaller chunks, allowing for faster initial page loads. It only loads the JavaScript required for the current page, reducing bandwidth and optimizing performance.
3. Server-Side Rendering Made Easy: Next.js makes server-side rendering seamless. With functions like `getStaticProps` and `getServerSideProps`, you can fetch data during the server-rendering process, ensuring your pages have the necessary data before rendering. This is particularly useful for static generation and dynamic rendering scenarios.

## Data Fetching in Next.js

Data fetching is a crucial aspect of web development, and Next.js provides several built-in methods to handle data fetching and rendering. These methods enable you to fetch data during the server-side rendering process or on the client-side, depending on your specific requirements. Let's explore the various data fetching techniques offered by Next.js and see how they can be implemented with code examples.

## Client-Side Data Fetching

Next.js offers functions that enable data fetching on the client-side, providing dynamic updates without a full page reload. The most commonly used function is `useEffect` from React, which allows us to execute code after the component has rendered. Within the `useEffect` hook, we can utilize the `fetch` API or any other data fetching library to retrieve data from an API endpoint.

```tsx
import { useEffect, useState } from "react";

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display the fetched data */}
      {data && <p>{data.message}</p>}
    </div>
  );
}
```

In the code above, we define a functional component `MyComponent` that fetches data from an API endpoint using the `fetch` API. The fetched data is stored in the `data` state variable using the `setData` function. We use the `useEffect` hook with an empty dependency array `[]` to ensure the data fetching only occurs once when the component mounts.

## Server-Side Data Fetching

Next.js provides two functions, `getStaticProps` and `getServerSideProps`, for server-side data fetching during the rendering process. These functions allow you to fetch data from an API or a database and pass it as props to your page components.

```tsx
export async function getStaticProps() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

function MyPage({ data }) {
  return (
    <div>
      {/* Display the fetched data */}
      {data && <p>{data.message}</p>}
    </div>
  );
}

export default MyPage;
```

In the code snippet above, we define the `getStaticProps` function, which is a special function Next.js recognizes for pre-rendering. Inside `getStaticProps`, we fetch data from an API and return it as the `data` prop. The `MyPage` component receives the fetched data as a prop and renders it accordingly.

It's important to note that `getStaticProps` is used for static generation, where the page content is pre-rendered at build time, while `getServerSideProps` is used for server-side rendering on each request. You can choose the appropriate function based on your specific use case.
Next.js also provides other data fetching options, such as `getInitialProps` for legacy support or more advanced scenarios. These options offer flexibility in handling data fetching based on your application's needs.

Next.js simplifies the process of data fetching by seamlessly integrating it into the rendering pipeline. Whether you need to fetch data on the client-side or during server-side rendering, Next.js provides the necessary tools to make data fetching efficient and straightforward.

## Server Actions in Next.js

Server actions are an integral part of web applications, allowing you to handle server-side logic and perform operations such as data manipulation, authentication, and more. Next.js provides a powerful feature called API routes, which enables you to create custom server endpoints to handle server actions seamlessly. Let's explore how to implement server actions using API routes in Next.js with code examples.

### Creating an API Route:

To create an API route in Next.js, you need to create a file inside the `pages/api` directory. The file should be named based on the desired endpoint, for example, `pages/api/users.js`. Within this file, you can define your server action logic.

```tsx
// pages/api/users.js

export default function handler(req, res) {
  // Perform server action
  const myUsers = [
    { id: 1, name: "Odioko" },
    { id: 2, name: "Victor" },
  ];

  // Return the response
  res.status(200).json(myUsers);
}
```

In the code snippet above, we create an API route `users.js` inside the `pages/api` directory. Within the `handler` function, we perform the desired server action, such as retrieving a list of users. In this case, we define a simple array of users and return it as the response using `res.status(200).json(users)`.

### Server Side communication using Server Actions

Next.js presents a feature of Server Actions, which is still in its alpha stage. This feature is constructed upon React [Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#actions). With these actions, data alterations may be initiated on the server-side, leading to decreased client-side JavaScript, and enhanced forms that progress over time.

If you want to add server actions in your Next project, go into your `next.config.js` file and enable the experimental `serverActions` flag.

```tsx
module.exports = {
  experimental: {
    serverActions: true,
  },
};
```

After doing this, you have to creare the Server Action by defining an asynchronous function with the `"use server"` directive at the top of the component function body.

```tsx
async function myServerAction() {
  "use server";
  // code here
}
```

Let's look at some code from the [docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#invocation) and explain what it's doing.

```tsx
import { cookies as nextCookies } from "next/headers";

export default function ProductCard({ productId }) {
  async function addToCart(data) {
    "use server";

    const cartId = nextCookies().get("cartId")?.value;
    await saveToDatabase({ cartId, data });
  }

  return (
    <form onSubmit={addToCart}>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

The code above is a React functional component in Next.js called `AddToCart`. It is responsible for rendering a form with a `Add to Cart` button. Let's break down the code and understand its functionality.

1. The component is exported as the default export, meaning it can be imported and used in other files.
2. The component takes a `productId` prop, which presumably represents the ID of the product being displayed on the card. This prop can be used to fetch the relevant product information or perform any necessary operations.
3. The `addToCart` function is an asynchronous function declared inside the component. It is triggered when the form is submitted (i.e., when the "Add to Cart" button is clicked). The function has access to the `data` parameter, which can be passed to it when it is called.
4. Inside the `addToCart` function, there is a line "use server';`. This comment is likely indicating that the following code should be executed only on the server-side, as opposed to running on the client-side. This can be relevant if you're using Next.js and want to differentiate server-side and client-side code execution.
5. The `nextCookies().get('cartId')?.value` code retrieves the value of the `cartId` cookie using the `nextCookies` function from the `next/headers` module. The `?.` operator is used for optional chaining, ensuring that the code doesn't throw an error if the cookie or its value doesn't exist.
6. The `await saveToDatabase({ cartId, data })` code represents the asynchronous task of saving the `data` along with the `cartId` to the database. You would need to replace `saveToDatabase` with your actual function that handles the database saving logic.
7. The component returns a form element with an `onSubmit` event handler set to the `addToCart` function. This means that when the form is submitted (by clicking the "Add to Cart" button), the `addToCart` function will be executed.
8. Inside the form, there is a single button with the text `Add to Cart` that triggers the form submission when clicked.

### How to Invoke Server Action

When working with Next.js and server actions, there are several methods available for invoking these actions. Let's explore these methods in detail:

**Using `action` prop**: React `action` prop can be used to invoke a server action on a form element as we can see from the piece of code below:

```tsx
export default function TodoApp() {
  async function addTodoItem(data) {
    "use server";

    const todoId = getTodoId().get("todoId")?.value;
    await saveToDb({ todoId, data });
  }

  return (
    <form onSubmit={addTodoItem}>
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

In the code snippet above, `TodoApp` component serves as a simple todo application. It allows users to add new todos by submitting a form. The `addTodoItem` function, triggered when the form is submitted, performs server-side actions related to adding a todo item. It retrieves, a todo ID using a `getTodoId` function and saves the todo item to a database using the `saveToDb` function. The code provides a basic structure for a todo app, allowing users to add todos with server-side handling.

**Using** `formAction` **prop**: In our Next.js code, we can handle form actions on elements such as `<button>` using the `formAction` prop as we can see from the code below:

```tsx
export default function Form() {
  async function Submit() {
    "use server";
    // ...
  }

  async function submitFile() {
    "use server";
    // ...
  }

  return (
    <form action={Submit}>
      <input type="text" name="name" />
      <input type="image" formAction={submitFile} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

In the above example, the `Submit` function is invoked when the form is submitted, while the `submitFile` function is invoked when the file input is clicked. The server actions are triggered by the `formAction` prop.

`startTransition` **custom invocation**: Apart from the two ways of invoking server actions that we just listed above, there is another way we can perform a server action. This method involves using the `startTransition`, provided by the React `useTransition` hook, and we can use when we are not performing form server actions.

```tsx
import { useTransition } from "react";
import { addTodo } from "../actions";

function TodoAppClientComponent({ id }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => addTodo(id))}>Add Todo</button>
  );
}
```

In the code above, the `startTransition` function wraps the invocation of the `addTodo` server action. When the button is clicked, the server action is executed. Using `startTransition` allows you to control the timing of the server action invocation.

### Client-Side Communication with API Routes

Next.js makes it seamless to communicate with API routes from the client-side code. You can use the `fetch` API or any other HTTP library to make requests to your API endpoints.

```tsx
import { useEffect, useState } from "react";

function MyComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
```

In the code above, we define a component `MyComponent` that fetches users from the `/api/users` endpoint using the `fetch` API. The fetched data is stored in the `users` state variable using the `setUsers` function. We use the `useEffect` hook with an empty dependency array `[]` to ensure the data fetching only occurs once when the component mounts.

Note that when making requests to API routes from the client-side code, you can use relative URLs like `/api/users` since Next.js automatically routes requests to the appropriate API route.
Next.js API routes provide a powerful mechanism to handle server actions seamlessly within your application. Whether you need to fetch data, perform data mutations, or handle authentication, API routes enable you to define custom server endpoints with ease.

## Bonus: Securing API Routes in Our Next.js App

Just wanted to share some key practices in making sure our Next.js application is secure, especially with regard to the server actions and API routes.

### Protecting API Endpoints

First, we need to ensure that API routes are kept safe from unauthorized access. Here's what we can do:

#### JWT Authentication

We could authenticate users through JSON Web Tokens (JWT). When a user logs in, we will issue a token for them to send along with their requests.

```tsx
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { username, password } = req.body;
    // Verify user credentials
    if (username === "user" && password === "pass") {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

#### Authorization Middleware

We will write a middleware that will check these tokens before giving access to any of our routes.

```tsx
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // Proceed with the request
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
```

### Data Validation and Sanitization

Next, it's very important to validate and sanitize incoming data so that security risks like SQL injection or XSS attacks are avoided.

#### Validation of Data with Yup

The data validation can be done with the help of libraries like Yup to check for the desired type of data.

```tsx
import { object, string } from "yup";

const schema = object({
  username: string().required().min(3).max(50),
  password: string().required().min(6),
});

export default async function handler(req, res) {
  try {
    await schema.validate(req.body);
    // Process the validated data
    res.status(200).json({ message: "Data is valid" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
```

#### Sanitizing Data

We should also sanitize user inputs so as to exclude all injurious content.

```tsx
import { sanitize } from "dompurify";

export default function handler(req, res) {
  const { username, password } = req.body;
  const sanitizedUsername = sanitize(username);
  const sanitizedPassword = sanitize(password);

  // Use sanitized data
  res.status(200).json({ message: "Data sanitized" });
}
```

## Bonus: Using SWR to Fetch Data Efficiently with Next.js

This will be the time when I will introduce you to one of the greatest data-fetching tools for our Next.js projects: SWR. Using SWR, we manage data fetching efficiently, ensuring that the UI stays fast and responsive while new data is fetched.

### SWR (Stale-While-Revalidate)

#### Introduction to SWR

SWR is a React Hooks library for remote data fetching. When working with this library, fetching data can be made really simple and assured that it is up-to-date with live data at any time. The acronym SWR stands for "Stale-While-Revalidate": a strategy in which the component exhibits stale data while it continues to revalidate in the background.

#### SWR for Data Fetching

Below is a simple example of how we might use SWR in our components.

```javascript
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function MyComponent() {
  const { data, error } = useSWR("/api/data", fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <p>{data.message}</p>
    </div>
  );
}
```

Here the function of `useSWR` is to take a key (the URL to fetch) and a fetcher function: it will automatically handle the fetch, error, and revalidation process.

#### Fetch User Data

```javascript
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function UserProfile() {
  const { data, error } = useSWR("/api/user", fetcher);

  if (error) return <div>Failed to load user data</div>;
  if (!data) return <div>Loading user data...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}
```

#### Managing Pagination

```javascript
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PaginatedList = ({ page }) => {
  const { data, error } = useSWR(`/api/items?page=${page}`, fetcher);

  if (error) return <div>Failed to load items</div>;
  if (!data) return <div>Loading items...</div>;

  return (
    <ul>
      {data.items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

#### Benefits of SWR

- **Automatic Caching and Revalidation**: SWR, in the background, caches the data and automatically revalidates it, making the UI fast, live, and always updated.
- **Simple focus**: Abstract away fetching data; make our code more clean and maintainable.
- **Error Handling**: SWR has error handling built-in, so it's fairly trivial to deal with data fetching failures.

## Conclusion

We explored the basics of Next.js, simplified setup process, and advantages. We delved into data fetching, showcasing both client-side and server-side techniques with code examples. Additionally, we explored the concept of server actions using Next.js API routes, enabling custom server endpoints for handling server-side logic and operations.

Next.js continues to evolve and empower developers to build web applications that deliver exceptional user experiences. By embracing Next.js' data fetching and server action capabilities, developers can unlock the true potential of modern web development and stay at the forefront of the ever-changing web landscape. So, embark on your Next.js journey, explore its vast capabilities, and elevate your web development projects to new heights.
