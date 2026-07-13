---
title: React useEffect Cleanup Function
description: Understanding the cleanup function of the useEffect hook in React. Learn how to clean up side effects in React components to prevent memory leaks and improve performance.
slug: useeffect-cleanup
authors: peter_osah
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-22-useeffect-cleanup/social.png
hide_table_of_contents: false
last_update: 2024-09-30
---

## Introduction

The `useEffect` hook is a popular hook that combines the functionality of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` lifecycle methods of `React` class components. The hook helps developers handle side effects in their programmes. Side effects may involve receiving data from an **API**, configuring **event listeners**, or subscribing to a **WebSocket**. All of these activities might influence the state of your application and may cause memory leaks if not taken care of.

The `useEffect` hook comes with a cleanup function that cleans up effects to prevent memory leaks, which in turn improves the performance of the application. In this article, we will explain the cleanup function of the `useEffect` hook.

## What are “side-effects”?

A "**side effect**" is an operation that impacts something other than the function being executed.
In React, a side effect occurs when we impact something outside the scope of React in our `React` components.
A **side effect** could be retrieving data from a remote server, reading or writing to local storage, configuring event listeners, or creating a subscription. These side effects could also occur when a button is clicked, a form is submitted, or a component is mounted and unmounted.

## Why cleanup “side-effects”?

Cleaning up side effects in `React` is a method of removing side effects that are no longer required. This, in turn, avoids **memory leaks**, which occur when your program or application attempts to perform an unnecessary operation or update a state memory location that no longer exists.

## What is the `useEffect` cleanup function?

The `useEffect` cleanup function is a return function within the `useEffect` hook.

```tsx
import React, { useEffect } from "React";

useEffect(() => {
  // Your effect
  return () => {
    // Cleanup
  };
}, []);
```

## What does `useEffect` function do?

The function allows React developers to stop side effects that do not need to be executed before our component is unmounted.

For example, you have a `React` component that performs a certain action in a `setTimeout`. Every time the component is shown, it runs the `setTimeout` function and performs the action in the timeout on that component.
Assuming You decided to navigate away from this component and into another portion of the app. The component is no longer being rendered, thus there is no need to leave the `setTimeout` function running in the background. However, the setTimeout function is still running in the background.

This is where the `useEffect` cleaning function comes in. In the cleanup function, we can simply add a `clearTimeout` which clears the timeout when the component is unmounted (i.e., no longer rendered).

## When to use the `useEffect` cleanup function

There are various scenarios which will prompt the use of the `useEffect` cleanup function. They are as follows:

### Fetch requests

When initiating an **API** request in a component, it is important that we also account for a way to abort the request when the component is unmounted or re-rendered.
There are several methods for canceling fetch request calls; we can use the native `fetch` `AbortController` or `Axios's` `AbortController` (If you are utilizing `Axios` as our API Client).

To utilize `AbortController`, first, create a controller with the `AbortController()` constructor. When our fetch request is initiated, we pass `signal` as an option in the request's options object.

This associates the controller and signals with the fetch request, allowing us to cancel the request call at any time using the `AbortController.abort()` method.
We will then add the `AbortController.abort()` method to our `useEffect` cleanup function to ensure that the request is aborted when the component is unmounted or re-rendered.

Examples of the useCases are displayed below:

**Fetch example:**

```tsx
useEffect(() => {
  //create the abort controller
  let controller = new AbortController();

  (async () => {
    try {
      const response = await fetch(APIEndpoint, {
        // attach the controller to the request
        signal: controller.signal,
      });
      // add the success response to a state value
    } catch (e) {
      // Handle the error
    }
  })();
  //abort the request when the component umounts
  return () => controller?.abort();
}, []);
```

**Axios example:**

```tsx
useEffect(() => {
  // create a controller
  let controller = new AbortController();

  (async () => {
    try {
      const response = await axios.get(APIEndpoint, {
        // attach the controller to the request
        signal: controller.signal,
      });

      // add the success response to a state value
    } catch (e) {
      // Handle the error
    }
  })();
  //abort the request when the component umounts
  return () => controller?.abort();
}, []);
```

### Timeouts

For timeouts, you can use the `setTimeout(callback, timeInMs)` timer function in the `useEffect` hook, followed by the `clearTimeout(timerId)` function in the cleanup function. This guarantees that the timer is cleared when the component is unmounted.

An example of this is displayed below:

```tsx
useEffect(() => {
  let timerId = setTimeout(() => {
    // perform an action like state update
    timerId = null;
  }, 5000);

  // clear the timer when component unmouts
  return () => clearTimeout(timerId);
}, []);
```

### Intervals

The `setInterval(callback, timeInMs)` function can be declared in the `useEffect` hook, and the `clearInterval(intervalId)` function can be added to the cleanup function to handle intervals. By doing this, you can be sure that the timer will stop when the part is unmounted.

An example of this is displayed below:

```tsx
useEffect(() => {
  let intervalId = setInterval(() => {
    // perform an action like state update
    intervalId = null;
  }, 5000);

  // cleanup the interval when component unmounts
  return () => clearInterval(interval);
}, []);
```

### Event Listeners

For event listeners, you can define them in the `useEffect` callback by attaching the `addEventListener` function to the element, and then cleanup the listeners by attaching the `removeEventListener` function to the element on the `useEffect` cleanup function. This guarantees that the listener is removed from the element when the component is mounted.

A simple usage of this is displayed in the example below, which is a custom hook for handling click events that occur outside of a certain `DOM` element, such as a `div`.

```tsx
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback, ref]);

  return ref;
};
```

### Web sockets

For **WebSockets**, When you create a **WebSocket** connection in a component, you can close it when the component unmounts by including the `socket.close()` method in the cleanup function.

An example of this is displayed below:

```tsx
useEffect(() => {
  const ws = new WebSocket(url, protocols);
  // perform socket related actions

  // cleanup web socket when component unmounts
  return () => ws.close();
}, []);
```

## Conclusion.

In this article, we learned about side effects and how they create memory leaks and unwanted behaviors in `React` components. We also looked at how to use the `useEffect` cleanup function to fix memory leaks.
Understanding how and when to repair memory leaks with the cleanup function is a significant step toward becoming a better React developer.
