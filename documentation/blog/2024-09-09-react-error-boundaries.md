---
title: Error Boundaries in React -  Handling Errors Gracefully
description: We'll see how to handle errors in React using Error Boundaries and how to use the react-error-boundary library to handle errors in React.
slug: react-error-boundaries
authors: chidume_nnamdi
category: "Engineering"
tags: [react, bugs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-09-react-error-bounderies/social-2.png
hide_table_of_contents: false
last_update: 2024-09-10
---

**This article was last updated on September 09, 2024, to add sections on Advanced Error Logging, Best Practices and Handling Asynchronous Errors in React Error Boundaries.**

## Introduction

React, a popular JavaScript library for building user interfaces offers a powerful tool called Error Boundaries. These Error Boundaries serve as a safety net for React applications, allowing developers to gracefully catch and manage errors, preventing them from propagating up the component tree and causing application crashes.

Developers can utilize Error Boundaries to present users with informative error messages, log error specifics to aid in debugging, and ensure the application remains resilient even in the face of unforeseen challenges. In the forthcoming sections, we will investigate the critical role of error handling and examine how React Error Boundaries can elevate the user experience by serving as a protective shield for your application.

## What Are React Error Boundaries?

In JavaScript, we use the `try...catch` statement to catch errors.

```tsx
try {
  // code that may throw an error
} catch (error) {
  // code to handle the error
}
```

We put the fragile code inside the `try` block, and if an error occurs, we catch it in the `catch` block. This fragile code is a code we are unsure that there might be undefined or null occurring and we don't want the whole program stopping, so we enclose them in the `try` block. The `catch` block is where we handle the error. It is there that we can display a message to the user or log the error to the console.

You will find this `try...catch` statement very useful when working with imperative code, and you don't want your users to see their app breaking down in the middle of usage.
However, this approach is not suitable for React applications, as it only works for imperative code. React applications are declarative, meaning they are composed of components that render based on the state of the application. Therefore, we need a different approach for handling errors in React applications.

The concept of Error Boundaries in React was introduced in version 16 of the library. Before the introduction of Error Boundaries, errors in React components were challenging to handle gracefully. When an error occurs within a component, it could potentially corrupt the entire component tree, leading to a broken user interface and a poor user experience.
React Error Boundary is like the `try..catch` of React. It is a React component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of the component tree that crashed.
See a component tree below:

 <div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-09-react-error-bounderies/1.jpeg"  alt="mojo framework" />
</div>

<br/>

`root` is the root component of the component tree. It is the parent of `COMP I` and `COMP II`. `COMP I` is the parent of `COMP III` and `COMP IV`. `COMP III` is the parent of `COMP V`. `COMP IV` is the parent component of `COMP VI`. `COMP I`, `COMP II`, `COMP III`, and `COMP IV` are leaf components.

If an error occurs in `COMP V`, it will propagate up the component tree to `COMP III`, then to `COMP I`, and finally to `root`. If there is no error boundary in the component tree, the entire component tree will be corrupted, and the application will crash.

 <div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-09-react-error-bounderies/2.jpeg"  alt="mojo framework" />
</div>

<br/>

 <div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-09-react-error-bounderies/3.jpeg"  alt="mojo framework" />
</div>

<br/>

However, if there is an error boundary in the component tree, it will catch the error and display a fallback UI instead of the component tree that crashed.

 <div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-09-react-error-bounderies/4.jpeg"  alt="mojo framework" />
</div>

<br/>

Here, the error boundary is `COMP III`. It catches the error that occurred in `COMP V` and displays a fallback UI instead of the component tree that crashed. The error and crash do not propagate up the component tree to `COMP I` and `root`. We see now the benefit of React Error Boundary.

Error Boundaries are React components that implement the `componentDidCatch` lifecycle method. This method is invoked after an error has been thrown by a descendant component. It receives two arguments: `error` and `info`. The `error` argument is the error that was thrown, while the `info` argument is an object that contains a component stack trace.

## Basic Usage of Error Boundaries

In the last section, we said that Error Boundaries are React components that implement the `componentDidCatch` lifecycle method. A lifecycle method is a special method in a React Component that is invoked at a particular stage in the lifecycle of the component.

> The `componentDidCatch` lifecycle method is invoked after an error has been thrown by a descendant component.

There are different stages in the lifecycle of a component in React. The stages are: `initialization`, `mounting`, `updating`, and `unmounting`. The `componentDidCatch` lifecycle method is invoked during the `updating` stage of the component lifecycle.
This method is invoked after an error has been thrown by a descendant component. It receives two arguments: `error` and `info`.

- The `error` argument is the error that was thrown.
- The `info` argument is an object that contains a component stack trace.

Let's see a simple example of an Error Boundary.

```tsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

There are things we need to learn here. See that in the `componentDidCatch` method it receives two arguments as we have known. The `error` and `info` arguments. We set the `hasError` property of the state to `true` in the `componentDidCatch` method. We also log the error and info to the console. We will see the use of the `hasError` property later.
This is a basic usage of an Error Boundary. We will see how to use it in a React application.

**Handling Different Types of Errors**

In React, we can create components from a function or a class. We call them functional components and class components respectively. React Error Boundaries are only created from class components because they implement the `componentDidCatch` lifecycle method. There is no way to implement `componentDidCatch` lifecycle method in functional components for now. React can come up with their magic in the future where we can be able to create an Error Boundary in functional components but for now, we can only do that in the class components.

We stated in the last section that a React Error Boundary is created when a class component implements the `componentDidCatch` lifecycle method. A class component can also be an Error Boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`.

The `static getDerivedStateFromError()` lifecycle method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as an argument and should return a value to update state.

```tsx
static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
}
```

The `getDerivedStateFromError`is used to render a fallback UI after an error has been thrown by a descendant component. The `componentDidCatch` lifecycle method is used to log the error information.

```tsx
componentDidCatch(error, info) {
    // You can also log the error to an error-reporting service
    logErrorToMyService(error, info);
}
```

Example:

```tsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error-reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

The `getDerivedStateFromError` method is called during the "render" phase, so side effects are not permitted. For those use cases, use the `componentDidCatch` lifecycle method instead. In the `componentDidCatch` method, we can log the error to an error reporting service. We can also use it to perform side effects. We will see how to do that later.

```tsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

The code above is an example of how to use an Error Boundary in a React application. We wrap the component we want to catch errors from in the Error Boundary component. In this case, we wrap the `MyComponent` component in the `ErrorBoundary` component. If an error occurs in the `MyComponent` component, it will be caught by the `ErrorBoundary` component.

This is akin to `try...catch` in JavaScript:

```tsx
try {
  MyComponent();
} catch (error) {
  // code to handle the error
}
```

## Error Boundary Limitations

We have seen throughout this post the beauty of handling errors in React using Error Boundary but the downside is that not all errors can be caught by Error Boundary. Some errors cannot be caught by Error Boundary. We will see them in this section.

Error Boundaries do not catch errors for:

**Event handlers**

Event handlers inside React components are not known by React, they are functions to be called when an event happens. they are handled by the browser DOM. Therefore, if an error occurs in an event handler, it will not be caught by the Error Boundary.

**Asynchronous code**

Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame` callbacks) same thing as Event handlers are not caught by React so the Error Boundary cannot catch them to deal with them.

**Server-side rendering**

Error boundaries are specific to the client side and won't catch errors that occur on the server or in server-side rendering. Server errors should be handled on the server and communicated to the client.

**Errors in Error Boundary component**

Errors thrown in the error boundary itself (rather than its children) cannot be handled by the Error boundary, it is a component also, so we should take great care when writing our error boundary component.

Error boundaries can help display a fallback UI, but they don't inherently manage the error state of your application. You need to implement your own error state management and recovery strategies.

## Handling errors using `react-error-boundary` library

Error handling business in React has been simplified by a great library called [react-error-boundary](https://www.npmjs.com/package/react-error-boundary). It is a reusable React error boundary component. Supports all React renderers (including React DOM and React Native).

To use it, we need to install it via npm or yarn:

```
npm install react-error-boundary
```

Then we import it in our React application:

```tsx
import { ErrorBoundary } from "react-error-boundary";
```

With this library, we do not need to create a React Error Boundary component. the library has done that for us. We only need to use it in our React application. `react-error-boundary` exposes an ErrorBoundary component, which supports several props to help you build an error boundary component with no effort.

```tsx
<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <ExampleApplication />
</ErrorBoundary>
```

You see how simple it is. Just wrap the component you want to catch errors from in the ErrorBoundary component. The `fallback` prop is the UI to render when there is an error. It can be a React component or a function that returns a React component.

The `ErrorBoundary` component has some useful that we can use to render UI fallback or get some errors.

**fallbackRender**

This `fallbackRender` is a Render prop passed to the `ErrorBoundary`. The `fallbackRender` prop is a function, it is called when an error occurs and the return value is a JSX that is rendered in place of the misbehaving component.

```tsx
function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

<ErrorBoundary fallbackRender={fallbackRender}>
  <ExampleApplication />
</ErrorBoundary>;
```

See that the render prop is called with an object that destructs to `error` and `resetErrorBoundary`. The `error` is the error message details and the `resetErrorBoundary` is a function that can be called to reset the error boundary and retry the render.

## How Error Boundaries are Used for Logging and Reporting Errors

I was just thinking that we could share some thoughts on the effective way to log and report errors when using React Error Boundaries in our app.

When an error occurs in a component that's inside an error boundary, we have the opportunity to do more than show a fallback UI. We also want to log these errors to a service so that we can keep track of issues and fix them quickly.

We can place a logging mechanism inside the `componentDidCatch` method to send error details and component stack traces to some error tracking service, as shown in the following simple example:

```jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    // Post the error to a service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

The `logErrorToMyService` function would send the error details to our preferred error tracking service, enabling us to monitor the issues in real-time. That way, we'll know what's going wrong behind the scenes, even if the UI doesn't crash.

## Resetting your app after an Error

The `react-error-boundary` provides us with a prop `onReset` which we can use to reset our component when an error is thrown.

```tsx
function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

<ErrorBoundary
  fallbackRender={fallbackRender}
  onReset={() => {
    // reset the state of your app so the error doesn't happen again
  }}
>
  <ExampleApplication />
</ErrorBoundary>;
```

The `onReset` is called when the `resetErrorBoundary` function is called. The `resetErrorBoundary` function is passed to the `fallbackRender` function as a parameter.
We can now add a button in the JSX returned by the `fallbackRender` function to reset the error boundary.

```tsx
function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

The `resetErrorBoundary` function is called when the `retry` button is clicked. This will reset the error boundary and retry the render.
You see that the library has made it easy for us to handle errors in our React application. We don't need to create an Error Boundary component, the library has done that for us. We only need to use it in our React application.

## FallbackComponent prop

The `react-error-boundary` library also provides us with a `FallbackComponent` prop. This prop is used to render a fallback UI when an error occurs. It is a React component.

```tsx
function ErrorFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
  <ExampleApplication />
</ErrorBoundary>;
```

The `ErrorFallbackComponent` is a React component that renders a fallback UI when an error occurs. It receives two props: `error` and `resetErrorBoundary`. The `error` is the error message details and the `resetErrorBoundary` is a function that can be called to reset the error boundary and retry the render.

## Bonus: Best Practices for Error Boundaries

When using error boundaries in React, there are a few good practices to follow that ensure the error boundaries work well and do not break the performance or user experience.

#### Use Error Boundaries Strategically

- Avoid wrapping your **entire application** in a single error boundary. This might sound like a good idea for global error handling, but it can lead to a poor user experience. Instead, wrap smaller sections of the component tree.
  For instance, wrapping error boundaries around the sidebar, dashboard, or form ensures that only the feature that throws the error will show the fallback UI, while the rest of the application continues to work.

```jsx
<ErrorBoundary>
  <Header />
  <ErrorBoundary>
    <MainContent />
  </ErrorBoundary>
  <Footer />
</ErrorBoundary>
```

#### Pick the Right Fallback UI

- Make a user-friendly, informative fallback UI. Avoid generic messages like "Something went wrong." Provide clearer descriptions or actions users can take, such as reloading the page or contacting support.
- Customize the fallback UI depending on where the error occurs. For example, if an error happens in a form, show a form-specific error message with a retry option.

```jsx
if (this.state.hasError) {
  return <h1>Oops! Something went wrong. Please try again later.</h1>;
}
```

#### Granularity Matters

- Find the right balance in how many error boundaries you use. Wrapping too many small components adds unnecessary complexity, while too few error boundaries could break large sections of your app if an error occurs.
  Best practice: wrap error boundaries around **independent features** or sections that can fail without breaking the whole app (e.g., third-party components, dynamic content areas, or data fetching components).

#### Logging and Monitoring

- Error boundaries should be more than just UI fallbacks. Use the `componentDidCatch` lifecycle method to log errors to an external service like Sentry, Datadog, or a custom logging system.
- Logging helps track issues that may not be visible to the user but still need to be fixed, especially in production environments.

```jsx
componentDidCatch(error, info) {
  logErrorToService(error, info); // Log error and stack trace
}
```

#### Consider Using Libraries for Error Boundaries

- You can use libraries like `react-error-boundary`, which offer features like automatic retries, reset functionality, and better support for functional components.
- This saves time and ensures best practices are followed.

```jsx
<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => resetApp()}>
  <MyComponent />
</ErrorBoundary>
```

#### Testing Your Error Boundaries

- Test your error boundaries to ensure they display the correct fallback UI and log errors. You can use libraries like Jest or React Testing Library to simulate component failures and validate error handling logic.
- Mock errors in child components and check if the fallback UI renders as expected.

```jsx
it("renders fallback UI on error", () => {
  const { getByText } = render(
    <ErrorBoundary>
      <BrokenComponent />
    </ErrorBoundary>,
  );
  expect(getByText("Something went wrong")).toBeInTheDocument();
});
```

#### Error Boundaries for Third-Party Components

- If you're using third-party components or libraries, add error boundaries around them so bugs in those components won't break your whole app.

```jsx
<ErrorBoundary fallback={<h2>Failed to load chart</h2>}>
  <ChartComponent />
</ErrorBoundary>
```

#### Avoid Overuse

- Don’t overuse error boundaries. They are not a substitute for good code practices like proper error handling in event handlers, API calls, and promises. Error boundaries should be the last line of defense, not the primary error management tool.

#### Reset State On Error

- Sometimes you may want to reset your app's state after an error, like when a user clicks "Try Again." You can reset the error boundary’s state and re-render the component.
- Libraries like `react-error-boundary` handle this with `resetErrorBoundary`.

```jsx
const FallbackComponent = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong!</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);
```

## Dealing with Errors in Asynchronous Operations in React\*\*

I would like to share some quick thoughts on how we could manage errors with asynchronous operations since React Error Boundaries don't catch them. For example, if an API call or Promise fails, the error wouldn't be caught by the error boundary.

To manage this, we can either use the `.catch()` method with Promises or try-catch blocks with async functions. Here's a simple example for fetching data:

```js
fetchData()
  .then((response) => setData(response))
  .catch((error) => {
    console.error("Error fetching data:", error);
    setError(true); // We can show an error message in the UI
  });
```

For async/await, we can use `try...catch`:

```js
async function fetchData() {
  try {
    const response = await fetch(url);
    setData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    setError(true);
  }
}
```

This way, if something goes wrong with our API request, we can display a fallback UI, log the error, and prevent the whole component from breaking.
