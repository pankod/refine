---
title: A Guide on React Lazy Loading
description: We will be looking at what lazy loading is, how it works, and how it can be used to improve the performance of React applications.
slug: react-lazy-loading
authors: chidume_nnamdi
category: "Engineering"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-07-react-lazy/social-2.png
hide_table_of_contents: false
---

**This article was last updated on July 12, 2024, to add sections for SEO Considerations with Lazy Loading and Testing Lazy Loaded Components.**

## Introduction

Lazy Loading has been a concept in software development in general not just in web development. Lazy Loading can and used in desktop and mobile development. It is just another trick in making performance better in applications.
Lazy loading is a technique used to optimize the performance of a website or application. It's an approach that loads only the necessary resources when they're needed, instead of downloading everything at once. This way, users don't have to wait for all the resources to be downloaded before they can use the site or app.

## What is Lazy Loading and Why Use It?

Lazy loading is a resource-loading strategy used in the effective performance of a website or application, where all the resources are not downloaded along with the loading of the entire site; they are dynamically loaded when needed. In that way, a user doesn't need to wait for all resources to be downloaded before being able to use the site or app.

The essence of lazy loading is that it reduces the first-page load time, achieving quick loading and a good user experience. Particularly, it is useful for websites or applications with huge content to load only the required resources.

### Improvement in Performance

Lazy loading makes the initial page load minimal, thus achieving a quicker load time for the page and a better user experience overall. Loading only those resources that will be used at the time means a user does not have to wait for all resources to download before using the site or app, especially for content-heavy sites or apps.

### Loading UI Elements

Similarly, lazy loading can also be implemented for other user interface components, such as lists or images. For example, on a detail page with hundreds of images, when all the images are loaded initially, performance takes a hit. Images can then load right before they are supposed to be displayed in the viewport, thus making fewer immediate requests.

### User Experience

Lazy loading thus increases customer retention by enhancing the user experience in terms of diminishing load time of the page and response times. Research studies have shown that approximately 95% of users are likely to leave if a webpage takes more than 2 seconds to fully upload. In this sense, lazy loading promotes stickiness through loading first and loading fast the most important parts.

Now let's see how lazy loading works in practice.

### How Lazy Loading Works

The concept behind lazy loading is to cut initial page load time and facilitate quick page loading, which makes for a better user experience. This is more effective for websites or applications with lots of content, as it makes sure only the most necessary resources are loaded first.

Let's take a blog website as an example to describe how lazy loading will be effective in upping the performance of the website.

For the blog website, there is a home page, a list page, and a detail page. Home page: The main page of a website is the first page that users see when they access the website. List page: This lists all the different blog articles. Detail page: Shows the contents of an article in detail. We will find that this will slow down the page loading if the home page loads the list, and detail pages are also loaded with it.

- **Home page**: 39KB
- **List page**: 90 KB
- **Detail page**: 88KB

We can observe that it is going to load 217KB in total of the file, just for loading the home page. We are able to avoid this by breaking up the bundle and loading them at will. When loading the home page, only the homepage is loaded. This will make the page load quickly, since at this moment we are only loading 39KB instead of all the 217 KB. To put it in a nutshell, such is the application of lazy loading in web development to speed the performance of a page up.

Not just pages, it is also other UI elements of a page that get lazy-loaded. For example, lists or images; they are all lazy-loaded until an actual need arises for them. Now the question is, when does a need arise?

Let's expound on that: let's say in our detail page we have hundreds of images and these images will require another fetch from the server, so imagine sending a hundred requests to fetch images in a single detail page; for sure, we will begin to see the performance dip in our browser. What we will do is defer loading images so that they are loaded once they are just going to scroll inside the browser's viewport.

This is a good example because we can implement lazy loading of UI elements across the web page and other pages on our website. Lazy loading is an attempt to lower the page load time and improve response times for our webpages in an effort to increase customer retention. Humans are impatient, and if your web page takes more than 2 seconds to load, the chances are that 95% of users will not wait and start feeling impatient. So we will do our best to implement lazy loading—to get the critical part first and fast!

## What is React.lazy

`React.lazy()` is a powerful tool for optimizing the performance of React applications. It allows developers to import components dynamically, which can significantly reduce the size of the initial bundle and improve the overall performance of the application. In this article, we'll take a look at what `React.lazy()` is, how it works, and how it can be used to improve the performance of React applications.

React.lazy is a new feature introduced in React 16.6 that allows developers to implement lazy loading easily. It enables developers to split their code into small chunks, which can then be loaded on demand. This helps improve the performance of applications by reducing the amount of code that needs to be downloaded initially.

So, `lazy()` is a function in the React bundle. We can import it like this:

```tsx
import { lazy } from "react";
```

// OR

```
import React from "react";
React.lazy;
```

`React.lazy` utilizes dynamic import, which is a new feature of ES6 (ECMAScript 6). Dynamic import allows developers to dynamically import a module or component at runtime.

```tsx
import { capitalizeFirstLetter } from "./utils";
```

We want to lazy load the "utils" file and to be loaded when we want to use the `capitalizeFirstLetter` function. We use the `import` dynamic function:

```tsx
import("./utils").then((utils) => {
  console.log(utils.capitalizeFirstLetter("nnamdi chidume"));
});
```

This will spill out the `utils` file from the final bundle and load it on demand.
Coming to use `React.lazy`, we will first have to import the component we want to lazy load:

```tsx
import LazyComponent from "./LazyComponent";
```

Then, we call `React.lazy` passing a callback function to it. Then this callback function will call the `import` function in its body and return it. Then the path of the component will be passed to the `import` function call.

```tsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));
```

The `LazyComponent` will be split from the main bundle into its bundle. It will not load with the main bundle during the page's initial load. It will be loaded when the `LazyComponent` is to be used.

For example, on our blog website, we have the pages: home, list, and detail. On the home page, we have links in each blog article to the detail page.

Our home page will be like this:

```tsx
import DetailPage from "./DetailPage";

const DetailPage = React.lazy(() => import("./DetailPage"));

export const HomePage = () => {
  return (
    <ul>
      {this.props.blogs.map((blog, index) => {
        return <DetailPage blog={blog} />;
      })}
    </ul>
  );
};
```

Now, the DetailPage component will be broken out into a separate bundle and will not be loaded in the initial load time of the HomePage.
When we run this code we will get an error: `React component suspended while rendering, but no fallback UI was specified.`
This is because a lazily loaded component with `React.lazy` must be wrapped inside `Suspense` component.

What is Suspense?

## Suspense

`Suspense` is a React feature that allows for components to be loaded asynchronously. It is used in conjunction with `React.lazy`. Suspense is also used to display a loading indicator while the component is being fetched, or it can be used to render a fallback component if the component fails to load.
To use the Suspense component, we import it from the "react" package.

```tsx
import { Suspense } from "react";
```

Next, we wrap a `React.lazy` loaded component inside it:

```tsx
<Suspense>
  <LazyComponent />
</Suspense>
```

This will render the LazyComponent.

This is bad UX practice because the user will not know that a component will load. So we need to show the UX that something is coming, we will display a UI element to indicate to the user that a UI view will be loaded.

To do that in Suspense, we will use the `fallback` prop. Suspense uses the `fallback` prop to display a UI on the page while the lazily loaded component is still being loaded.

Let's add `fallback` to the above code, to display "Loading" before the LazyComponent is downloaded completely and rendered:

```tsx
<Suspense fallback={"Loading..."}>
  <LazyComponent />
</Suspense>
```

The `fallback` can take a JSX element:

```tsx
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

## Catching Loading Errors

When using `React.lazy`, it is important to catch any loading errors that might occur(for example, if a network error occurs).
We will wrap the Suspense component that contains our lazy-loaded components in an ErrorBoundary component. ErrorBoundary in React is like a try-catch block in JavaScript. It catches an error in a component tree without causing the errors to break the whole application.

A simple ErrorBoundary component is this:

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
    logService(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <h1>Something went wrong.</h1>
    ) : (
      this.props.children
    );
  }
}
```

If there is an error in the component tree it is wrapped in, that component will not break the app rather it will render `Something went wrong.` in its place. This will allow you to catch any errors that occur with the loading of the component and handle them appropriately.
Now, we use this error boundary like this:

```tsx
<ErrorBoundary>
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

## Route-based code-splitting

Much of what we have seen here is code-splitting components used for UI sections in the application. We don't however have to lazy load all the components in our application. Doing that might lead to serious issues.

Finding and knowing when and which component to lazy load is quite tricky. But the thing we know for sure is that we have to lazy load Route-based components.
Route-based components are components that are loaded when a specified URL is navigated to our application. They are the route pages setup using react-router in our application:

```tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
```

We have two routes here: `/` and `/about`. They each load the `Home` and `About` pages respectively. The `Home` and `About` components are route-based components.
Now, these components are ideal components that are to be lazy loaded. IT will drastically reduce the overall bundle size of the application and decrease the load time of the page.

```tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));

const App = () => (
  <Router>
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

Now, `Home` and `About` will be broken off into their separate bundles. These bundles will be loaded when any of the page routes attached to the component is loaded.

## SEO Considerations with Lazy Loading

I'd like to share with you some thoughts about how lazy loading can affect SEO, and what we need to bear in mind.

Lazy loading would significantly improve the performance and user experience of the website because only necessary resources are loaded at the time of need. As a result, this prevents the users from having to sit around waiting for everything to download at once. We'll just consider some SEO aspects so that search engines crawl our content effectively.

Here's what you need to keep in mind:

### Ensure Critical Content is Accessible

Make sure important content, and especially above-the-fold content, is not lazy-loaded. This ensures the most critical parts of our pages are visible for search engines from the get-go.

### Use Proper HTML Markup

Use standard HTML tags and attributes correctly. For instance, even though we are lazy-loading images, still use the `<img>` tag; however, set the src attribute to a placeholder image and use the data-src attribute, or similar, for the real image URL. This will ensure search engines can interpret and index our images.

### Intersection Observer API

Use this API to implement lazy loading; that is, this is the response to a quick and lightweight way to monitor the visibility of an element within the document so that it perfectly fits all those fancy web search engines, which support JavaScript and, by extension, makes perfect sense for creating a lazy load.

### Provide Fallbacks

Always provide fallbacks for users and bots that may not support lazy loading. This might mean displaying a basic version of the content or ensuring that content is available without JavaScript.

### Watch out for search engine crawls

Use tools like the Google Search Console to check how search engines are crawling and indexing our pages. If we notice that important content is missing, it may be that bad lazy loading implementation is at fault. Using lazy loading correctly will help us strike a balance between performance improvement and SEO considerations.

Do let me know if you have any further questions!

## Component-based code-splitting

We have two types of components in React. There are Route-based components and Component-based components. We have learned about Route-based components in the above section.

Component-based components are components that are not attached to the application's page route. They are normal components in the application used to display UI sections in the app. Most of the examples we touched on here are examples of Component-based code-splitting. Examples of components that are ideal to be code-split are Modals and Asides. This is because they are loaded eagerly on the load of the webpage.
Headers, dropdowns, and buttons are not to be lazily loaded because they are easily needed and are one of the most used UI elements in a webpage.

I wanted to share some insights on testing lazy-loaded components in our React applications. Testing these components can ensure they work correctly and are loaded efficiently. Here’s a simple guide to help us get started:

## Testing Lazy Loaded Components

**Setting Up the Test Environment**:

Ensure that our test setup supports lazy loading. This usually involves configuring Jest or another testing framework to work with React’s `Suspense` and `React.lazy`.

**Mocking Dynamic Imports**:

When testing, we might want to mock dynamic imports to control how and when components are loaded.

**Using `Suspense` for Testing**:

Wrap the lazy-loaded component with `Suspense` in our tests, just as we do in our application code.

Here's a step-by-step example using Jest and React Testing Library:

```jsx
// LazyComponent.js
import React from 'react';

const LazyComponent = () => {
  return <div>Lazy Loaded Component</div>;
};

export default LazyComponent;

// App.js
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default App;

// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('loads and displays lazy component', async () => {
  render(<App />);

  // Check for fallback content
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for lazy component to load
  const lazyElement = await screen.findByText('Lazy Loaded Component');
  expect(lazyElement).toBeInTheDocument();
});
```

By following this approach, we can effectively test our lazy-loaded components to ensure they work as expected. If you have any questions or need further clarification, feel free to reach out!

## Performance Metrics and Lazy Loading

I'd love to share some ideas about how we might measure our performance metrics and improve lazy loading in React projects. The insights derived from the metrics further drive the optimization of our applications towards providing an enhanced user experience.

### Key Performance Metrics

Some of the key metrics we should focus on for measuring the impact on application performance in lazy loading are:

- **First Contentful Paint (FCP):** The time taken up to the point when any amount of content is drawn on the screen. Lazy loading helps as it's reducing the initial bundle size, hence improving the FCP.
- **Time to Interactive (TTI):** The time taken by the application to become truly interactive. Loading only what is necessary at initial load will help to reduce TTI.
- **Largest Contentful Paint (LCP):** This measures the time it takes for the largest content piece to become visible. Lazy loading can be optimized to help improve LCP.
- **Cumulative Layout Shift (CLS):** The total of all the unexpected layout shift scores that occurred throughout the life of the page. Lazy loaded images and components might have a tendency for less layout shifts, which results in better CLS.

### Measuring Performance: Tools

These are some of the tools that enable us to quantitatively measure these performance metrics:

- **Lighthouse:** It is an inbuilt feature of Chrome DevTools to audit performance, accessibility, best practices, and SEO.
- **WebPageTest:** Performance details that are more in-depth, using filmstrip view and waterfall charts.
- **Google Analytics:** Use of custom metrics set-up that will track performance data through time.
- **Performance API:** A browser's integrated Performance API can be used for measuring precise timings in an application code.

## Conclusion

We started by learning the definition of lazy loading, what it means and what good it brings to web development and software development at large. In the next sections, we learned about React.lazy function and how to use it. Next, we learned examples of how to lazily load Route-based and Component-based components in our React application.

`React.lazy` is a powerful feature of React that allows components to be loaded lazily from the server. It is a way to make components available only when they are needed, thus improving the performance of an application.
