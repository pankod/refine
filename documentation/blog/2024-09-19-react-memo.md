---
title: React Memo Guide with Examples
description: Improve app performance with React.memo().
slug: react-memo-guide
authors: abdullah_numan
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-13-react-memo/social2.png
hide_table_of_contents: false
last_update: 2024-09-19
---

**This article was last updated on September 19, 2024, to add sections on Deep vs Shallow Comparison in Memoization, Profiling Components in DevTools, and Best Practices for Using `React.memo()`.**

## Introduction

This post introduces the [React Memoization Series](https://refine.dev/blog/react-memo-guide/) and demonstrates the usage of the [`React.memo`](https://react.dev/reference/react/memo) API. `React.memo` memoizes a functional component and its props. Doing so helps prevent unnecessary re-renderings that originate from the re-renderings of the component's parent / ancestors.

This is the first post of a three-part series hosted on [Refine blog](https://refine.dev/blog) on the use of memoization in React.

The other two posts in the series cover the usage of React `useMemo()` and `useCallback()` hooks.

Steps we'll cover in this post:

- [What is Memoization?](#what-is-memoization)
- [Why Memoization in React?](#why-memoization-in-react)
- [Memoization in React](#memoization-in-react)
- [About the React Memoization Series](#about-the-react-memoization-series)
- [Project Overview](#project-overview)
- [Memoizing a Functional Component using `React.memo()`](#memoizing-a-functional-component-using-reactmemo)
- [Best Practices for Using `React.memo()`](#best-practices-for-using-reactmemo)
- [You can Profile Components in DevTools](#you-can-profile-components-in-devtools)
- [Bonus: Deep vs Shallow Comparison in Memoization](#bonus-deep-vs-shallow-comparison-in-memoization)
- [Live Example](#live-example)

## What is Memoization?

Memoization is an performance optimization technique that allows us to minimize the use of memory and time while executing a resource-intensive function. It works by storing the last computed value or object from the function. Memoization lets us bypass the function's costly computations when the function is called with the same parameters repeatedly.

## Why Memoization in React?

Memoization plays a crucial role in enhancing the performance of a React component. It addresses following shortcomings in React:

### Excessive Re-rendering Due to Ancestor Re-rendering

React is all about re/rendering components in the virtual DOM prior to updating the actual Document Object Model in the browser. Re-render in an ancestor component, by default, triggers a re-render in a descendent component.

For example, a local state update in a parent component causes it to re-render. This, in turn, causes its children to re-render.

Such behavior in React causes a lot of memory and time to be wasted on useless renderings of the descendent components. Excessive re-renderings, therefore impact a React app's performance negatively.

### Expensive Utilities

In addition, resource intensive functions such as utilities used in data processing, transformation and manipulation lower a React app's performance. Functions used for sorting, filtering and mapping traverse large sets of data and therefore slows down an application.

### Passing Callbacks to Children

Performance of a React app is also adversely effected due to callback functions passed from a parent component to a child. This happens because a new function object from the callback is created in memory every time the child re-renders. So, multiple copies of the same callback function are spun off in runtime and they consume resources unnecessarily.

## Memoization in React

Using **memoization** the right way in React helps in mitigating these drawbacks and facilitates better use of computing resources in a React app.

Memoization can be used in a number of ways for optimizing the performance of a React app. React components can be memoized to prevent unnecessary component re-renders originating from ancestors participating in the component hierarchy. In functional React, component memoization is done using the `React.memo` API.

Caching values of expensive utility functions and memoizing callbacks are two common ways of boosting a React app's performance. Caching function values is done using `useMemo()` hook. And callback functions are memoized with the `useCallback()` hook.

<!-- On the other hand, using memoization the wrong way can rip us off the benefits. Not only that, on the flip side of unnecessary re-renderings, unnecessary memoization can sometimes cost more than ignoring memoization - eventually hurting performance. -->

## About the React Memoization Series

The **React Memoization Series** is a three part guide on how to implement memoization in a React app. Each part demonstrates in the browser console how memoization contributes to performance optimization.

The three parts are:

1. [React Memo Guide with Examples](https://refine.dev/blog/react-memo-guide/)
2. [React useMemo Hook Guide With Examples](https://refine.dev/blog/react-usememo/)
3. [Memoization in React - How useCallback Works](https://refine.dev/blog/react-usecallback-guide/)

In the first post, we implement memoizing a React component with `React.memo()` and demonstrate how unnecessary re-renders coming from ancestor state updates are prevented. The second post covers how caching the value of an expensive utility function with `useMemo` stops repetitive invocations of data heavy computations that slow down a React app. In the third part, we get an idea on how memoization of callbacks passed to child components helps reduce application memory consumption.

We will begin with an example that involves memoizing a functional component with `React.memo()`. In the subsequent posts, we will gradually extend it to include use cases for the `useMemo()` and `useCallback()` hooks.

## Project Overview

This series is a demo rather than a step-by-step coding tutorial. It is intended to demonstrate how memoization contributes to performance optimization in a React app. We've made the code available [here](#live-stackblitz-example).

All the components have been already coded. We'll be showing how memoization is implemented using `React.memo`, `useMemo()` and `useCallback` APIs by examining relevant code snippets and highlighting lines on the existing components.

We'll follow the impact of memoization mainly from the browser's console.

### Setup

In order to properly follow this tutorial, we recommend you run the app in a browser - since we will be visiting the console to investigate the impact of memoization on our React app.

For this to happen, please follow the below steps as outlined [here](https://github.com/refinedev/refine/tree/main/examples/blog-react-memoization-memo):

1. Clone [this repository](https://github.com/refinedev/refine/tree/main/examples/blog-react-memoization-memo).
2. Open it in your code editor and install the packages:

```bash
yarn install
```

3. Then run the app:

```bash
yarn start
```

4. Open Google Chrome and navigate to `http://localhost:3000`.
5. Use `CTRL` + `Shift` + `J` on Ubuntu or `Command` + `Option` + `J` on Mac to inspect the webpage and open browser's console.

### Investigation

If you look at the project folder in your code editor, you'll find that `react-memoization` is created using `create-react-app`.

The app is based on the idea of a list of posts on a blog. There are several components involving a user presented the latest posts and a list of the user's posts. Allow yourself some time to understand the components individually, their relationships, their state changes, and how props are passed through. It is crucial to pay close attention to how the change of a parent's state triggers re-render of its descendants.

Let's dig into the components and check out what's happening.

**The `<App />` Component**

To begin with, we have an `<App />` component that houses `<Blog />`.

If we look inside `<App />`, we can see that we're storing a `signedIn` state with `useState()` hook. We also have a toggler function that alters the value of `signedIn`:

```tsx title="src/components/App.jsx"
import { useState } from "react";
import Blog from "./components/Blog";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const handleClick = () => setSignedIn(!signedIn);

  console.log("Rendering App component");

  return (
    <main>
      <nav>
        <button onClick={handleClick}>Sign Out</button>
      </nav>
      <Blog signedIn={signedIn} setSignedIn={setSignedIn} />
    </main>
  );
}

export default App;
```

In the JSX, we pass `signedIn` to `<Blog />`.

**The `<Blog />` Component**

Looking inside `<Blog />`, it fetches a list of posts with a click on the `Get Latest Post` button and sets the `updatedPosts` state:

```tsx title="src/components/Blog.jsx"
import React, { useEffect, useMemo, useState } from "react";
import fetchUpdatedPosts from "../fetch/fetchUpdatedPosts";
import allPosts from "./../data/allPosts.json";
import sortPosts from "../utils/sortPosts";
import LatestPost from "./LatestPost";
import UserPostsIndex from "./UserPostsIndex";

const Blog = ({ signedIn }) => {
  const [updatedPosts, setUpdatedPosts] = useState(allPosts);
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());

  const getLatestPosts = () => {
    const posts = fetchUpdatedPosts();
    setUpdatedPosts(posts);
  };

  const sortedPosts = sortPosts(updatedPosts);

  useEffect(() => {
    const id = setInterval(
      () => setLocalTime(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  console.log("Rendering Blog component");

  return (
    <div>
      <div>{localTime}</div>
      <button onClick={getLatestPosts}>Get Latest Post</button>
      //highlight-next-line
      <LatestPost signedIn={signedIn} post={sortedPosts[0]} />
      <UserPostsIndex signedIn={signedIn} />
    </div>
  );
};

export default Blog;
```

We can see that the `updatedPosts` are sorted with the `sortPosts` utility and the first item from the sorted array is then passed to `<LatestPost />` component along with `signedIn`.

**The `<LatestPost />` Component**

Then coming to `<LatestPost />`, it nests the `<Post />` component, which we are going to memoize with `React.memo()`.

Let's quickly run through `<LatestPost />` to see what it does:

```tsx title="src/components/LatestPost.jsx"
import React, { useEffect, useState } from "react";
import Post from "./Post";

const LatestPost = ({ signedIn, post }) => {
  const [likesCount, setLikesCount] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setLikesCount((likesCount) => likesCount + 1);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  console.log("Rendering LatestPost component");

  return (
    <div>
      {post ? (
        <>
          //highlight-next-line
          <Post signedIn={signedIn} post={post} />
          {likesCount && (
            <div className="my-1 p-1">
              <span>{likesCount} Likes</span>
            </div>
          )}
        </>
      ) : (
        <p>Click on Get Latest Post button</p>
      )}
    </div>
  );
};

export default LatestPost;
```

We can see that `<LatestPost />` changes its local state of `likesCount` every 3 seconds in the `useEffect()` hook. Because of this, `<LatestPost />` should re-render every 3 seconds. So should `<Post />` as a consequence of being a child of `<LatestPost />`:

**The `Post />` Component**

Let's now focus on `<Post />`. It receives `signedIn` and `post` as props and displays the content of `post`:

```tsx title="src/components/Post.jsx"
import React from "react";

const Post = ({ signedIn, post }) => {
  console.log("Rendering Post component");

  return (
    <div className="">
      {post && (
        <div className="post p-1">
          <h1 className="heading-sm py-1">{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
```

Notice we are logging to the console the event when `<Post />` gets rendered: `console.log('Rendering Post component');`

When we check the console, we can expect to see that `<Post />` is re-rendered with a change in `likesCount` from `<LatestPost />`. This would be happening even though `<Post />` does not depend on `likesCount`.

If we examine closely, we can see that this is indeed the case: we have `<Post />` rendering again and again following an interval:

<img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-13-react-memo/memo1.png" alt="Console logs showing repeated Post renders" />

<br/>

Notice, rendering `<Post />` is accompanied by `<LatestPost />` at 3 seconds interval, so it is consistent that `<Post />`'s re-renders are happening due to `likesCount` state changes in `<LatestPost />`. That is, they are coming at `3000ms` intervals from `<LatestPost />`'s `useEffect()` hook.

All these re-renders are futile for `<Post />` and costly for the app. So we are going to prevent them using component memoization.

## Memoizing a Functional Component using `React.memo()`

Now, if we memoize `<Post />` with `React.memo()`, the re-renders should stop.

So, in `<Post />`, let's update the component export with the highlighted code:

```tsx title="src/components/Post.jsx"
const Post = ({ signedIn, post }) => {

console.log('Rendering Post component');

  return ( ... );
};

//highlight-next-line
export default React.memo(Post);
```

Looking at the console, we can see that `Post` is no longer re-rendered at 3s intervals:

<img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-13-react-memo/memo2.png" alt="Console logs after React.memo optimization" />

<br/>

It is clear that memoizing `<Post />` reduces the number of re-renders. In a real app, this is a huge blessing because re-renders due to frequent likes turn out to be very costly for a social media app's performance.

But what exactly happened?

### What is `React.memo` ?

Well, with `export default React.memo(Post);`, we produced a new component that re-renders only when its props and internal state is changed.

`React.memo()` is a Higher Order Component (HOC) that memoizes the passed in component along with the value of its props. Doing so helps in optimizing its performance by preventing unnecessary re-renders due to changes it does not depend on, e.g. the unrelated state changes in ancestor components.

`React.memo` does this by memoizing the component function itself and the accepted props. When the values of the props change, the component re-renders.

### React.memo() - How to Memoize Component Props

We can see that `<Post />` receives `signedIn` and `post` props.

Now, unlike with `likesCount`, `<Post />` **depends on** `signIn` and `post`. And **React memo** caches these props and checks for incoming changes in them. Incoming changes to them triggers a re-render. So, altering any of `signedIn` or `post` re-renders `Post`.

If we look back inside `<App />`, we see that `signedIn` originated from there and gets relayed via `<Blog />` and `<LatestPost />` to `<Post />` as props. We have a button in the navbar that toggles the value of `signedIn`:

```jsx
<nav className="navbar">
  <button className="btn btn-danger" onClick={handleClick}>
    Sign Out
  </button>
</nav>
```

In the browser, let's try toggling its value to see the effect on memoized `<Post />`.

Add the following console log statement to `<Post />` in order to log the value of `signedIn` to the console:

```tsx
//highlight-next-line
console.log(signedIn);
```

When we click on the `Sign Out` button in the navbar, we can see in the console that `<Post />` re-renders after `<LatestPost />`:

<img width="400px" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-13-react-memo/memo3.png" style={{alignSelf:"center"}} alt="Console logs showing signedIn change re-render" />

<br/>

This is now because **React memo** caches the props passed to the component and checks for incoming changes. Notice the Boolean value of `signedIn` printed to the console. A change in `signedIn`'s state renews the memoization and a re-render of the component is triggered.

## Best Practices for Using `React.memo()`

I wanted to share a few best practices for using `React.memo()` with some code examples. These can help improve the performance of our React components:

### Use it for frequently re-rendered components

If a component is being re-rendered unnecessarily due to its parent re-rendering, `React.memo()` can help. For example, if we have a component like this:

```jsx
const Post = ({ title, content }) => {
  console.log("Rendering Post component");
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Post;
```

We can prevent unnecessary re-renders by wrapping it with `React.memo()`:

```jsx
const Post = React.memo(({ title, content }) => {
  console.log("Rendering Post component");
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
});

export default Post;
```

Now, this component will only re-render if its `title` or `content` props change.

### Avoid overusing `React.memo()`

It’s important not to use `React.memo()` everywhere. If a component’s props change frequently, memoization can add more overhead than improvement. Use it only when the props don't change often.

### Shallow comparison only

By default, `React.memo()` performs a shallow comparison of props. If you’re passing complex objects or arrays, you might need to write a custom comparison function. For example:

```jsx
const Post = React.memo(
  ({ title, content }) => {
    console.log("Rendering Post component");
    return (
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title; // Custom comparison
  },
);
```

In this example, we are only checking if the `title` has changed. The component will only re-render if the `title` prop changes, even if `content` changes.

### Don’t memoize static or rarely updated components

If a component is static or doesn’t receive changing props, there’s no need to use `React.memo()`. For example, this component doesn’t benefit from memoization:

```jsx
const Footer = () => {
  return <footer>Footer content</footer>;
};

// No need to memoize here
```

Memoization would add unnecessary complexity without improving performance.

By following these best practices and using `React.memo()` in the right situations, we can optimize performance without adding extra overhead.

### When to Use `React.memo`

This is actually what we want. Because we don't want `<Post />` to re-render when we don't need it to, and we want to re-render it when we need it to.

If value of `signedIn` never changed, we know `<Post />` will never be re-rendered because of `signedIn`. In that case, caching `signedIn` doesn't do us any favor.

So, typically we should use `React.memo` when we want to prevent re-renderings due to state changes that do not concern our component and only allow re-renderings due to prop changes that happen often or are driven by an event.

### When Not to Use `React.memo`

In our example, had we resorted to `React.memo()` solely to retain the value of `signedIn` and **not** to prevent re-renders due to changes in `likesCount` or `post`, we would not get much performance benefit.

Instead, we would be bringing the comparison function into the scene for no reason, which adds to the performance cost. So, it is **not** recommended to memoize a component if its prop values **don't** change often.

It is therefore important to figure out the performance gains by measuring and analyzing runtime performance using browser utilities like Chrome DevTools.

### React.memo: Prop Comparison

**React memo** checks for changes between the previous and current values for a given prop passed to the component. The default function carries out a shallow comparison on each passed in prop. It checks for equality of incoming values with the existing ones.

In our `React.memo(Post)` memo, the current states of `signedIn` and `post` are checked for equality to their incoming states. If both values for each prop are equal, the memoized value is retained and re-render prevented. If they are not equal, the new value is cached and `<Post />` re-renders.

### Using React Memo with Custom Comparators

It is possible to customize the comparison by passing in a comparator function to the `React.memo()` HOC as a second argument:

```tsx
React.memo(Post, customComparator);
```

For example, we can specify dependencies for `React.memo()` and choose to compare only the props we want to:

```tsx title="src/components/Post.jsx"
import React from "react";

const Post = ({ signedIn, post }) => {
  console.log("Rendering Post component");

  return ( ... );
};

//highlight-start
const customComparator = (prevProps, nextProps) => {
  return nextProps.post === prevProps.post;
};
//highlight-end

//highlight-start
export default React.memo(Post, customComparator);
//highlight-end
```

Here, we are omitting `signedIn` from the comparison by including only `post`. Now, if we click on `Sign Out` button, `Post` is not being re-rendered:

<img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-13-react-memo/memo4.png" alt="Console logs after custom comparator" />

<br/>

This is because, our `customComparator` checks for equality of incoming values of only `post` and excludes `signedIn` from the comparison.

## You can Profile Components in DevTools

I wanted to share some tips on **Profiling Components in DevTools** to help us identify and fix performance bottlenecks in our React app.

**Opening the React Profiler**

- Install the **React Developer Tools** extension for Chrome or Firefox.
- Open **DevTools** (`F12` or `Ctrl + Shift + I`), go to the **Profiler** tab, and click **"Record"** before interacting with the app.

**Capturing Component Renders**

Interact with the app while recording (e.g., clicking buttons, changing state). The Profiler will track which components re-render and how long each takes.

**Analyzing Results**

After recording, view the timeline to inspect:

- **Render Time**: Time taken for each component render.
- **Render Reason**: Prop or state changes causing re-renders.

**Optimizing Slow Renders**

If a component (e.g., `Post`) is re-rendering unnecessarily, wrap it in `React.memo()` to prevent it from re-rendering when props haven't changed.

**Highlight Updates**

Enable **"Highlight Updates"** in the **React** tab to visually see components that re-render, making it easier to spot unnecessary updates.

Using the Profiler, we can quickly identify and optimize slow re-renders.

## Bonus: Deep vs Shallow Comparison in Memoization

I wanted to go over deep vs shallow comparison in memoization and how that affects performance optimization in React, especially when using `React.memo()` and other memoization techniques.

### Shallow Comparison

By default, React does **shallow comparison** to check if a component’s props have changed to decide whether to re-render it. Shallow comparison means React checks for changes only at the top level of an object or array and doesn't go into nested properties.

For example:

```jsx
const person1 = { name: "John" };
const person2 = { name: "John" };

console.log(person1 === person2); // false - because of different object references
```

Even though `person1` and `person2` have the same data, during a shallow comparison, they are considered different because the reference is compared, not the content.

```jsx
const Post = React.memo(({ title, content }) => {
  console.log("Rendering Post component");
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
});
```

If the `title` and `content` props are **primitives** (like strings or numbers), the shallow comparison works as expected. But if they are **objects** or **arrays**, even a slight change in the reference (e.g., creating a new object) will trigger a re-render.

### Deep Comparison

A deep comparison goes beyond top-level properties and checks all nested properties. It's a bit heavier since every level of the object or array has to be checked.

React doesn't perform deep comparisons by default in `React.memo()` because it can be slow, especially with deeply nested objects or large arrays.

### Custom Comparators for Deep Comparison

If shallow comparison isn’t enough (for example, when passing complex objects as props), we can provide a custom comparator function in `React.memo()` to implement **deep comparison**.

Here’s a custom comparator for deep comparison:

```jsx
import React from "react";
import { isEqual } from "lodash";

const Post = ({ post }) => {
  console.log("Rendering Post component");
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

const customComparator = (prevProps, nextProps) => {
  return isEqual(prevProps.post, nextProps.post); // Deep comparison using lodash
};

export default React.memo(Post, customComparator);
```

Here, we’re using `lodash`'s `isEqual()` function to deep compare the entire `post` object. This helps avoid unnecessary re-renders when only the reference changes, but the data inside remains the same.

### When to Use Deep Comparison

- **Complex Data Structures**: When passing large or deeply nested objects as props, and you don’t want to re-render components unnecessarily.
- **Performance Trade-offs**: Deep comparison might be slower than a shallow comparison, so it’s important to measure and ensure that the performance gain from avoiding re-renders outweighs the cost of deep comparison.

### Best Practices

- Use shallow comparison whenever possible to keep performance high.
- Only use deep comparison when you’re sure the props involve deeply nested objects that don’t change often.
- Use libraries like `lodash` or `deep-equal` for effective deep comparisons.

## Summary

In this post, we acknowledged what memoization is and why it is important in React. We learned about the use of `React.memo()`, `useMemo` and `useCallback` APIs for implementing memoization in a React app.

By investigating a demo blog post app, we observed in the browser console that `React.memo()` is very useful in preventing unnecessary, frequent re-renders of a component due to ancestor state changes that it does not depend on. A good example involves a component that accepts props whose values change often and/or on demand. With a `React.memo` custom comparator function, we can choose to specify only the props we want to track for triggering a re-render of our component.

In the next article, we will turn our attention to the `<Blog />` component and memoize a sorting function with `useMemo()` hook.

## Live Example

<CodeSandboxExample path="blog-react-memoization-memo" />
