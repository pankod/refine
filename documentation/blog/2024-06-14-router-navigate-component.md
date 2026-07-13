---
title: Redirect in React Router V6 with Navigate Component
description: We'll see how to redirect using Navigate Component in React Router V6
slug: navigate-react-router-redirect
authors: joseph_mawa
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-29-router-navigate-component/social-3.png
hide_table_of_contents: false
last_update: 2024-06-24
---

**This article was last updated on Jun 14, 2024, to add performance optimization, testing and additional features for React Router**

## Introduction

React Router version 6 shipped recently with several new features and improvements. One such feature is the `Navigate` component. It is the component equivalent of the `useNavigate` hook.

This article will take a deep dive into the `Navigate` component.

## Getting started with React router

In this section, you will learn how to set up React router in an existing React project.

### Installing React router

Depending on your package manager, install React router from the NPM package registry using one of the commands below.

```sh
# Using NPM
 npm install react-router-dom@6

# Using Yarn
yarn add react-router-dom@6

# Using pnpm
pnpm add react-router-dom@6
```

### Setting up React router

Before using React router in the browser environment, import one of the top-level Components and wrap your root Component in it. We will use `BrowserRouter` since we want to run React router in the browser. It is the recommended way for running React router in the browser.

If you are using React router version 6, wrap your root component in `BrowserRouter` as in the example below.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
```

### Setting up routes

In React router version 6, you can use the `Routes` and `Route` Components to set up the routes in your application. You can import and use them like so:

```tsx
import { Route, Routes } from "react-router-dom";
import { Home, Blog } from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}
```

## How to use the `Navigate` component

The `Navigate` component is one of the several built-in components in React router version 6. It is a wrapper for the `useNavigate` hook, and the current location changes when you render it.

```tsx
import { Navigate } from "react-router-dom";
```

Import `Navigate` from `react-router-dom` to start using it. The `Navigate` component takes up to three `props`, only one of which is required. The other two are optional.

Below are the explanations for these three `props`.

```tsx
<Navigate to="/dashboard" state={{ todos: [] }} replace={true} />
```

- `to` - A required prop. Its value should be the path which you want to navigate.
- `replace` - An optional boolean prop. Setting its value to `true` will replace the current entry in the history stack.
- `state` - An optional prop. You can use it to pass data from the component that renders `Navigate`.

The code below illustrates how you can use the `Navigate` component for navigation. We are rendering it conditionally after a state update and using the `state` prop to pass a route state.

```tsx
const App = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((loginDetails) => ({ ...loginDetails, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = await loginUser(loginDetails);
    setUser(user);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={loginDetails.email}
            onChange={changeHandler}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={changeHandler}
            required
          />
        </label>
        <button type="submit"> Login </button>
      </form>
      {user && <Navigate to="/dashboard" state={user} replace={true} />}
    </div>
  );
};
```

After navigation, the component rendered by the matching route can access the state prop passed to `Navigate` using the `useLocation` hook like so:

```tsx
const location = useLocation();
console.log(location.state);
// The default value of location.state is null if you don't pass any data.
```

The `props` you pass to the `Navigate` component are the same as the arguments required by the function returned by the `useNavigate` hook.

## Features of React Router V6

### Lazy Loading Routes

Loading routes is necessary for better app performance; that way, you do not have to load all the components simultaneously, but, based on user navigation, you load them—hence decreasing the initial load time and making your app so much faster.

This is how lazy loading can be done in React Router v6:

```javascript
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load components
const Home = lazy(() => import("./components/Home"));
const Blog = lazy(() => import("./components/Blog"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
```

In this case, the `Home` and `Blog` components are lazy-loaded only when the user navigates to their respective routes. The `Suspense` component works more like a placeholder or fallback UI, such as a loading spinner, until the components are loaded.

### Code Splitting

Code splitting is an approach in which the code for an app is split into little bundles. Instead of everything being one huge file, many small files load just in time. This dramatically optimizes performance and reduces code that has to be downloaded upfront when your app is first opened.

Here is how you might do this with React Router V6, for example:

```javascript
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load components
const Home = lazy(() => import("./components/Home"));
const Blog = lazy(() => import("./components/Blog"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
```

In this example, `Home`, `Blog`, and `Contact` components are split into separate bundles and are loaded only when the user navigates to their respective routes. This ensures that the initial load time is minimized, and only the required code is loaded when needed.

By using lazy loading and code splitting, you can significantly enhance the performance and user experience of your React application.

## Performance Optimization

### Memoization with React Router

Memoization is a performance optimization technique that is used to cache the results of function calls that are usually expensive. In React, you can use React.memo for memoizing components to avoid unnecessary re-renders.

Here's an example:

```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.memo(() => {
  console.log("Home component rendered");
  return <h1>Home Page</h1>;
});

const Blog = React.memo(() => {
  console.log("Blog component rendered");
  return <h1>Blog Page</h1>;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
```

In this example, the Home and Blog components will be memoized; they only change their status if the props get changed, which will further optimize the performance since it does not allow any type of unnecessary re-renders.

### Optimizing Route Matching

Route matching optimization makes many time savings to be found and displayed by the suitable component corresponding to the route. The Routes component in React Router strives to match only one route, thus helping in optimizing performance.

Here's an example:

```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.memo(() => <h1>Home Page</h1>);
const Blog = React.memo(() => <h1>Blog Page</h1>);
const About = React.memo(() => <h1>About Page</h1>);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
```

In that sample above, what a Routes component does ensure is to match and render only one route at once, efficiently, not more than one.

You may enhance performance even more with dynamic imports and lazy loading for significant components or extensive routes that are rarely active.

```javascript
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.memo(() => <h1>Home Page</h1>);
const Blog = React.memo(() => <h1>Blog Page</h1>);
const About = lazy(() => import("./About"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
```

In this use case, the `<About>` component is loaded lazily; it will be loaded only when the user navigates to the `/about` route. It has a significant meaning when related to the significance of reducing initial load time and, hence, improving performance. Optimize and drastically improve your application's performance using React Router memoization with optimized route matching.

## React Router Testing

### Routes Unit Testing

Unit testing for routes: You can test all route components to ensure each component renders its route. For instance, you are using the React Testing Library with Jest.

The code example is shown below:

```javascript
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const Home = () => <h1>Home Page</h1>;
const Blog = () => <h1>Blog Page</h1>;

test("should render Home component for / route", () => {
  const { getByText } = render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>,
  );
  expect(getByText("Home Page")).toBeInTheDocument();
});

test("renders Blog component for /blog route", () => {
  window.history.pushState({}, "Blog Page", "/blog");
  const { getByText } = render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>,
  );
  expect(getByText("Blog Page")).toBeInTheDocument();
});
```

For this, we use `render` from the React Testing Library to render the `Routes` component and make assertions about the following:

Integration Testing Navigation
Implementation testing means that you can go all the way through your app's flow from the very beginning to the final state, including navigating between these states. This essentially means that your application behaves as such under normal conditions when the user is using it.

Navigation is tested in this way through integration testing:

```javascript
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <Link to="/blog">Go to Blog</Link>
  </div>
);
const Blog = () => (
  <div>
    <h1>Blog Page</h1>
    <Link to="/">Go to Home</Link>
  </div>
);

test("Goes from Home to Blog and back", async () => {
  const { getByText } = render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>,
  );

  // Verify the basic route
  expect(getByText("Home Page")).toBeInTheDocument();

  // Head to blog
  fireEvent.click(getByText("Go to Blog"));
  expect(getByText("Blog Page")).toBeInTheDocument();

  // Home Page
  fireEvent.click(getByText("Go to Home"));
  expect(getByText("Home Page")).toBeInTheDocument();
});
```

In the following example, we will use `fireEvent` to make user interactions: click links and assert that proper components are being rendered after each navigation. Both unit and integration testing can give you surety that your React Router application works and the same when other users interact with it.

## Conclusion

`Navigate` component is one of the built-in components that shipped with React router version 6. It is a React component equivalent of the `useNavigate` hook. It uses `useNavigate` internally. The props you pass to `Navigate` are the same as the arguments you pass to the function returned by `useNavigate`.

Unlike functional components in React, ES6 classes do not support hooks. Therefore, `Navigate` is a handy equivalent of `useNavigate` when working with class-based React components.
