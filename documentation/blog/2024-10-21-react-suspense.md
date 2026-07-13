---
title: A Quick Start Guide to React Suspense
description: We will discuss how React Suspense works and common use cases
slug: react-suspense-guide
authors: joel_adewole
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-23-react-suspense/social-2.png
hide_table_of_contents: false
last_update: 2024-10-22
---

**_This article was last updated on October 21, to include advanced use cases of React Suspense, such as streaming data and progressive loading, along with best practices for using Suspense with server-side rendering (SSR)._**

## Introduction

React suspense is a built-in React component which lets you temporarily render a fallback UI while its children are still loading. Content delivery and site performance are important factors for web applications. You must deliver content quickly and effectively for better user experience.

Traditionally, you need to use state to manage the different stages when fetching data from an API. With React Suspense, you can suspend rendering a component that is still loading data and render a fallback UI. This improves both developer and user experience.

Similarly, you can use React suspense to split large React components into chunks and lazy load them to reduce the initial load time and bundle size.

In this article, we will discuss the React Suspense API and some of its common use cases. You must have a working knowledge of React and JavaScript to follow along.

## What is React Suspense?

React Suspense is a built-in React component that you can use to declaratively render a fallback UI until its children finish loading.

```tsx
<Suspense fallback={<FallbackUI />}>
  <MyComponent />
</Suspense>
```

It's a low-level implementation that tracks a component's lifecycle and delays rendering while required data pends. It improves user experience because users won't have to view a partially loaded component before data is fully fetched and rendered.

For instance, if the duration it takes for a table component to load data is long, users may initially see an empty table before the component rerenders and displays a fully loaded table.

The Suspense API acts as a wrapper around a component to be rendered and then provides a fallback that executes before the wrapped component renders.

As an example, we may use React Suspense to wrap the component that renders an image and specify a loading animation as the fallback option to prevent viewers from seeing blurry images that gradually change into the original picture after it loads from a CDN or cloud storage.

```tsx
// Logo is a component that fetches an image from a CDN
import Logo from "./Logo.js";

<Suspense fallback={<h1>Loading . . .</h1>}>
  <Logo />
</Suspense>;
```

## Comparing React Suspense to Transitions

Despite their similarities, do not use Suspense and Transition APIs interchangeably or in the same context.

React Suspense tracks a component's readiness before rendering it and only offers a deferred alternative until the original component is ready for rendering.

Transition, on the other hand, enables you to prioritize one event over another.

For instance, when adding a search feature, you might want to show the user what they are entering but wait to start the search until the user finishes typing.

```tsx
import { startTransition } from "react";

// Set the input value but don't initiate the search
setInputValue(input);

startTransition(() => {
  // Set the final search value, then initiate search
  setSearchQuery(input);
});
```

State updates tagged as non-urgent inside of `startTransition` are interrupted if an urgent update is made while the non-urgent state is still updating. This process continues until no new urgent updates are made.

## Use cases of React Suspense

As was discussed in the previous section, it is simple to mistake the React Suspense API for Transition and vice versa. Therefore, it's crucial to know when to use and when not to use them.

### Fetch data using React suspense

Traditionally, the fetch-on-render pattern is the commonest approach when fetching data from an API. With this pattern, you render the component, fetch data in a `useEffect` hook, update state, and the component re-renders to display the data.

Therefore, you need to declare state to manage the different data fetching stages. You need to display an appropriate UI when the data is still loading and an error message when an error occurs like in the example below.

```tsx
function MyComponent() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchData();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <div>Loading data...</div>;
  if (isError)
    return (
      <div>
        Oops failed to fetch data! <a href="/home">Home page</a>
      </div>
    );

  return (
    <ul>
      {data.map(({ id, name }) => {
        return <li key={id}>{name}</li>;
      })}
    </ul>
  );
}
```

The code above looks simple and easy to maintain. However, it can become complex pretty quickly in a real-world application where you fetch data from multiple data sources and work with several components concurrently. You can refactor the code above to use the Suspense API like in the example. You don't need to track the loading states manually. The temporary fallback UI is rendered while the data is still loading.

```tsx
import loadData from "./api/loadData.js";
const data = loadData("users.json");

<Suspense fallback={<h1>Loading . . .</h1>}>
  <Users />
</Suspense>;

function MyComponent() {
  const people = data.read();

  return (
    <div>
      {people.map(({ id, name }) => {
        <li key={id}>{name}</li>;
      })}
    </div>
  );
}
```

### Lazy load components using React suspense

Lazy loading is an optimization technique for improving the initial load time. For large applications, loading everything at once can lead to a performance hit on initial render. With lazy load, you can defer the initial load for certain components or modules until they're about to be rendered.

With lazy load, you can split code into small components and import only those components you need for initial render and defer loading others until the user interacts with the application.

You can use the built-in `lazy` function to lazy load a component. It takes a function or another thenable as argument. The function you pass to the `lazy` function should return a promise.

The `lazy` function returns a React component that you can render. While lazy-loading a component, attempting to render it will suspend. Therefore, you can use the `Suspense` component to render a lazy loaded component like so:

```js
import { lazy } from "react";
import Loading from "./Loading.js";

const MyComponent = lazy(() => import("./MyComponent.js"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MyComponent />
    </Suspense>
  );
}
```

In the basic example above, React will import `MyComponent` when it's about to be rendered. While lazy-loading `MyComponent`, React renders the fallback `Loading` component.

### React Suspense with Concurrent Mode Integration

I wanted to give a quick explanation of how React Suspense works with Concurrent Mode, in case you haven’t had an opportunity to dive into it yet.

React Suspense, coming through Concurrent Mode, will make it easier to handle asynchronous operations, like fetching data or lazy loading, while keeping ease of improvement for user experience by keeping the UI responsive. For compatibility, the basic overview of how both work together is as follows:

**How They Work Together**

- React Suspense pauses the rendering of a component until its dependencies (like data) are fully ready. While it’s waiting, Suspense shows a fallback UI, which can be something like a loading spinner.
- Concurrent Mode allows React to work on several tasks in parallel without blocking the main thread. That means this feature helps in making the app feel faster, mainly by allowing React to prioritize urgent tasks, such as user input, versus less urgent ones, like fetching data.

When we put the two together, React Suspense ensures that the user is not in a situation of waiting for components to load, while Concurrent Mode makes sure user interactions are smooth, even if some components may still be fetching or rendering.

### Loading a Component with Suspense in Concurrent Mode

```tsx
import { Suspense, startTransition } from "react";

// Loading component for fallback
const Loading = () => <div>Loading...</div>;

// Lazy-load a component
const MyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);

    // Use startTransition to prioritize user typing while deferring the search
    startTransition(() => {
      setSearchQuery(newInput);
    });
  };

  return (
    <div>
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      {/* Render MyComponent with Suspense */}
      <Suspense fallback={<Loading />}>
        <MyComponent searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
}
```

#### In this example:

- Suspense is a wrapper for the lazy-loaded MyComponent. While fetching the component, it shows a fallback: Loading.
- startTransition is called when the user starts typing in the input field, ensuring that the UI updates (displaying the typed text) are prioritized, and the search query is updated after the interaction with the UI is complete.

#### Why this matters

The combination of Suspense and Concurrent Mode helps us strike a balance between loading times and responsiveness, improving user experience. Users aren’t blocked by long-running tasks like data fetching, and they can continue interacting with the UI while React handles the heavy lifting.

## When to use React Suspense

You can use React Suspense to manage components that perform asynchronous operations such as fetching data from the server and lazy loading a component.

React pauses rendering a component wrapped in React suspense while it's performing an async operation and renders a temporary fallback UI until the operation is complete. This improves both developer and user experience.

React Suspense has several use cases:

1. **Data Fetching**: It allows components to wait for data before rendering. You can use libraries like Relay to integrate data fetching with Suspense.
2. **Code Splitting**: Suspense can dynamically load components with `React.lazy` and a dynamic `import()`, reducing the initial load time of your application.
3. **Resource Loading**: It can manage loading states for resources like images or scripts, improving the user experience during resource-intensive operations.
4. **Concurrency in React**: With the concurrent mode, Suspense can handle multiple tasks like data fetching, rendering, and user inputs simultaneously, making the app more responsive.

## React suspense and Error boundaries

In React , Error boundaries are components that you can use to catch errors in the application's component tree. If you don't handle it, an error in a single component can crash the entire application.

At the moment, you can define error boundaries using class components. A class component becomes an error boundary if it implements either the `static getDerivedStateFromError()` method or  the `componentDidCatch()` life cycle method or both as in the example below.

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error has occurred.</h1>;
    }

    return this.props.children;
  }
}
```

After that, you can wrap the `Suspense` component using the Error boundary like so:

```tsx
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <MyComponent />
  </Suspense>
</ErrorBoundary>
```

Instead of declaring an error boundary as in the example above, you can also use the [React error boundary](https://github.com/bvaughn/react-error-boundary) package. It's a popular React error boundary component. You can install it from the npm package registry using any package manager of choice.

The Refine blog also has an in-depth article about error boundaries. You can check it out [here](https://refine.dev/blog/react-error-boundaries/).

## Using React Suspense along with Server-Side Rendering (SSR)

I just wanted to give a little overview of how React Suspense works with Server-Side Rendering, since it’s a bit different compared to the usual client-side rendering.

### How Suspense Works with SSR

When we use SSR, the server-side render prepares the initial HTML for our app before it’s delivered to a client. The issue here is that React Suspense doesn’t fully support data fetching out of the box yet with SSR, but there are ways we can use it effectively with frameworks like Next.js.

For example, if the project is in Next.js, we can use React Suspense for code-splitting and lazy loading of components. As for data fetching, for now, we need to strictly adhere to using the built-in methods of Next.js, such as by using getServerSideProps or getStaticProps.

### Suspense in Next.js

Here is a quick example of how we could integrate React Suspense with SSR in a Next.js application:

```tsx
// Lazy-load a heavy component
const HeavyComponent = React.lazy(() => import("./components/HeavyComponent"));

export default function Home({ data }) {
  return (
    <div>
      {/* Suspense handles the loading of the component */}
      <Suspense fallback={<div>Loading component...</div>}>
        <HeavyComponent data={data} />
      </Suspense>
    </div>
  );
}

// Using Next.js SSR data-fetching method
export async function getServerSideProps() {
  const data = await fetchSomeData();
  return { props: { data } };
}
```

#### What’s Happening:

- Suspense lazy-loads HeavyComponent, where it will only get loaded on the client-side once the server renders the initial HTML.
- The data fetching is handled by Next.js’s getServerSideProps, which fetches the data on the server-side before rendering the component.

#### Important Considerations:

- Suspense works great with lazy-loaded components for SSR, but Suspense is not yet fully capable of handling data fetching in SSR. For now, data fetching is managed by frameworks like Next.js, where Suspense can still handle loading components and showing fallback UIs.
- Going forward, React 18 and beyond should provide better support for Suspense data-fetching in SSR, but until then, we need to combine traditional SSR methods with Suspense for code-splitting.

#### Why It’s Useful:

Suspense with SSR—especially in Next.js—helps us improve performance by loading only the necessary components on the client side, reducing the initial bundle size. This leads to a better user experience. While we wait for full Suspense support for data fetching on the server, we can still use it to optimize how large components are loaded.

## Common Mistakes When Using React Suspense

It's not uncommon to misuse the Suspense API because of its similarity to Transition and other APIs. For illustration:

Using components that handle concurrency using `useEffect()` inside Suspense. The use of "useEffect", which is designed to manage concurrency, inside the Suspense API defeats the purpose of the API.

Relay uses Suspense, however, it doesn't perform the same functions as Relay. Some users mistake Suspense for a server API request tool like Axios or Relay.

Another mistake people make is using `catch()` to handle errors. This will cause the component to wait for the promise before rendering. Instead, use Error Boundary to handle rendering errors.

## Advanced React Suspense Use Cases: Streaming and Progressive Loading

I wanted to share some of the advanced ways we can use React Suspense, especially for streaming data and progressive loading. These techniques are super useful for real-time apps or those that handle a lot of data.

### Streaming Data with Suspense

React Suspense helps manage streaming data by pausing rendering until the initial data chunks load. As new data arrives, Suspense continues to display the already-rendered portion, offering a smoother experience.

For instance, imagine we’re building a live chat application or a dashboard that updates with live data. With Suspense, we can start rendering the page with the first few data chunks and then progressively display more as it streams in.

Here’s a simplified example:

```javascript
import { Suspense } from "react";

function StreamingComponent() {
  const dataStream = fetchStreamData(); // Assume this returns a stream of data

  return (
    <div>
      {dataStream.map((chunk, index) => (
        <div key={index}>{chunk}</div>
      ))}
    </div>
  );
}

<Suspense fallback={<div>Loading data...</div>}>
  <StreamingComponent />
</Suspense>;
```

In this case, Suspense waits for the first chunk to be ready before rendering. As new data comes in, React updates the UI without needing to block the whole process.

### Progressive Loading with Suspense

Another advanced use case is progressive loading, which helps improve user experience in large, resource-heavy apps. With progressive loading, we can prioritize the most important parts of the page first, while deferring less critical sections until later.

For example, if we’re building a media-heavy page with lots of images or videos, we can load the essential content (like text or headings) first, while the images load progressively in the background.

Here’s how we can do that:

```javascript
import { Suspense, lazy } from "react";

const HeavyImage = lazy(() => import("./HeavyImage"));

function MediaPage() {
  return (
    <div>
      <h1>Welcome to the Media Page</h1>
      <p>Here’s some important content while the media loads:</p>

      {/* Progressive loading of images */}
      <Suspense fallback={<div>Loading images...</div>}>
        <HeavyImage />
      </Suspense>
    </div>
  );
}
```

In this example, the important text and headings load first, and then Suspense progressively loads the images. This ensures a faster initial load without blocking the entire page due to heavy media content.

### Why It’s Useful

These advanced Suspense use cases are helpful for improving user experience in apps dealing with real-time data or large media files. By streaming or progressively loading content, we can:

1. **Reduce initial load times**: Users can see content faster, even if not all data is ready.
2. **Improve responsiveness**: Especially in real-time applications, users can interact with the page while more data is still loading.
3. **Optimize performance**: Prioritize loading critical content first to ensure it is displayed as soon as possible.

## Conclusion

React suspense API comes in handy for building performant and responsive web apps. As explained above, you can use React suspense to render a lazy loaded React component or render a fallback UI while fetching data from an API. The `Suspense` component will render a fallback UI while its children are loading.

As you use the suspense API, be aware that only suspense-enabled functionalities such as lazy loading will activate the Suspense component out of the box.

At the moment, React doesn't have out-of-the-box support for suspense-enabled data fetching. However, you can use React meta frameworks such as Next.js because they integrate suspense-enabled data fetching functionality for you.

Similarly, the `Suspense` component doesn't detect any data you load inside a `useEffect` hook or an event handler.

Suspense is easy to switch to; if you're interested in learning more about the API, check the [official React documentation](https://17.reactjs.org/docs/concurrent-mode-suspense.html).
