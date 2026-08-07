---
title: A Guide to Using the useLayoutEffect Hook in React
description: We'll explore the useLayoutEffect hook in-depth, how it differs from useEffect and learn how to properly leverage its capabilities to enhance the user experience.
slug: uselayouteffect-vs-useeffect
authors: wisdom_ekpotu
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-02-react-uselayouteffect/social-2.png
hide_table_of_contents: false
last_update: 2024-08-12
---

**This article was last updated on August 09, 2024, to add sections on Testing Components that Use `useLayoutEffect` and Performance Optimization Strategies.**

## Introduction

In recent years, [React](https://react.dev/) has solidified itself in the ever-changing landscape of web development as one of the most efficient ways of building highly performant and interactive user interfaces. With the introduction of a new feature called [Hooks](https://react.dev/reference/react), React has revolutionized the way developers manage stateful and reusable logic within functional components.

With Hooks you can use state and other React features without the need to write ES6 class components. One important hook though not very popular is the `useLayoutEffect` hook, which allows developers to handle and perform side effects in React components.

In this article, you will explore the `useLayoutEffect` hook in-depth, how it differs from `useEffect` and learn how to properly leverage its capabilities to enhance the user experience. Also, to follow along with this article you should have some experience working with Reactjs.

- [Comparing `useEffect` to `useLayoutEffect`](#comparing-useeffect-to-uselayouteffect)
- [Benefits of using the `useLayoutEffect` hook](#benefits-of-using-the-uselayouteffect-hook)
- [Pitfalls of using the `useLayoutEffect` hook](#pitfalls-of-using-the-uselayouteffect-hook)
- [Best Practices for using `useLayoutEffect`](#best-practices-for-using-uselayouteffect)
- [Choosing the Right Hook](#choosing-the-right-hook)

## What are side effects in React?

To truly grasp what `useLayoutEffect` is and what it does, it's essential to have a solid understanding of side effects in React.

A component's primary responsibilities include rendering the user interface (UI), responding to user input and events, and re-rendering the UI as necessary. You might need to carry out some tasks or operations when working on a React project that falls outside the render cycle of the component. These are known as "**Side Effects**".

A side effect is anything that happens within your application that is not (at least not directly) related to UI rendering. For example, send HTTP requests to servers, store data in the browser's memory, and set time functions. There are no UI changes in these scenarios. In other words, React will not re-render your component for these scenarios.

Although they can be very helpful in our application and are a key concept in functional programming, side effects can also be challenging to manage and, if done incorrectly, can result in unexpected behavior and performance problems.

To handle side effects you can make use of a set of built-in hooks called [Effect Hooks](https://react.dev/reference/react#effect-hooks) namely; `useEffect`, `useLayoutEffect`, `useInsertionEffect`.

Among these hooks, the `useEffect` hook is the most used by react developers compared to the other hooks. But a question arises. Is it suitable for treating all kinds of side effects?

## The `useEffect` hook

If you have written React code using class components then you should be familiar with the lifecycle methods; `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

The `useEffect` hook is a combination of all three lifecycle methods hence it allows us to access lifecycle methods in functional components.

The `useEffect` hooks runs **_asynchronously_** ie and It is commonly used to make API requests.

### Syntax:

```tsx title="src/App.js"
import React, { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // Side effect logic goes here
    console.log("Component rendered!");
    // Cleanup function (optional)
    return () => {
      console.log("Component unmounted!");
    };
  }, []); // Empty dependencies array, runs only on mount
  return <div>{/* Component JSX */}</div>;
}
```

`useEffect` operates once the component is fully loaded initially, and then every time there's a change in the component's state.

## What is the problem with `useEffect`?

As stated above the `useEffect` hook is asynchronous this has a significant drawback in that it can only be called after the component has been mounted. This implies that side effects that depend on the layout of the component cannot be carried out using `useEffect`.

Now how do we solve this problem, this is where `useLayoutEffect` comes in.

## Introducing the `useLayoutEffect` hook?

While many React developers are familiar with the widely used `useEffect` hook, the `useLayoutEffect` hook remains overshadowed by its sibling but is still a powerful tool for improving the performance of React apps.

Unlike the `useEffect` hook, the `useLayoutEffect` hook runs **_synchronously_** which means it runs immediately after React has performed all the necessary DOM mutations but just before the browser paints the screen. It has the same API and possesses a similar syntax as the `useEffect` hook.

This hook was introduced to solve some layout specific / niche issues that plagued devs when using the `useEffect` hook.

Syntax:

```tsx title="src/App.js"
import React, { useLayoutEffect } from 'react';

function MyComponent() {
  useLayoutEffect(() => {
    // Perform side effects here
    // This code runs after the component has rendered but before the browser paints the screen

    return () => {
      // Cleanup code here (optional)
    };
  }, []);

  return (
    // JSX code for your component
  );
}
```

`useLayoutEffect` is usually used together with the `useRef` hook, which will allow you to get a reference to any DOM element that you can use to read layout information.

## How does the `useLayoutEffect` hook work

Here is a basic overview of how the `useLayoutEffect` hook works:

- The user interacts with the application.
- The components' states change.
- After that, the DOM is altered.
- If the `useLayoutEffect` dependencies have changed, this method is called to clean up effects from the previous render.
- After cleanup, the `useLayoutEffect` hook is called.
- Changes are reflected on the browser screen.

## When should you use the `useLayoutEffect` hook?

### 1. Adding Smooth Scroll:

Example:

```jsx
import React, { useRef, useLayoutEffect } from "react";

const SmoothScrolling = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      // Smoothly scroll to the top of the container
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Scroll to the top when the component is mounted
    handleScroll();

    // Add event listener to scroll to the top on subsequent scrolls
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={containerRef}>{/* Your Content */}</div>;
};
```

In the code above, the `useLayoutEffect` hook is used to add smooth scrolling functionality to a container element. An event listener is set up to listen for a scroll event on the window object and invoke the `handlescroll` function. The function will smoothly scroll the container to top using the scrollTo method with `{ top: 0, behavior: 'smooth' }` as the options.

The `useLayoutEffect` hook will perform the initial scroll to the top when the component is mounted. A clean-up function is added to remove the event listener when the component is unmounted.

### 2. Animating Elements:

Example:

```jsx
import React, { useRef, useLayoutEffect } from "react";

const AnimatingElements = () => {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    // Animate the element's opacity on mount
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.opacity = 1;
    }, 1000);

    return () => {
      // Clean up animation when the component unmounts
      element.style.opacity = 0;
    };
  }, []);

  return <div ref={elementRef}>Animate me!</div>;
};
```

The code block above demonstrates how to animate an element's opacity using the useLayoutEffect hook. An initial opacity of the element is set to 0 and then a setTimeout function is used to animate it to 1 after a delay of 1000ms.

Then the `useLayoutEffect` hook applies the animation after the component is mounted. The element's opacity is reset to 0 when the component is unmounted.

### 3. Auto-focus Input Field:

Example:

```jsx
import React, { useRef, useLayoutEffect } from "react";

const AutoFocusInput = () => {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
};
```

In the preceding code, we make use of the `useLayoutEffect` hook to automatically focus on an input field when the component is mounted.
We proceed to access the input element using the `ref` hook. Inside the `useLayoutEffect` hook, we call the focus method on the input element to give it focus. Since we want this only to run once we will leave the dependency array empty ([]).

**Note:** For this example there is no cleanup function because there is no need to undo the focus when the component is unmounted.

## Comparing `useEffect` to `useLayoutEffect`

|                             | useEffect Hook                                                                            | useLayoutEffect Hook                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Order of Execution          | Runs after rendering and any updates have been applied.                                   | Runs after rendering but before the browser paints the screen                                  |
| Scheduling                  | Schedule asynchronous operations                                                          | Schedules synchronous operations                                                               |
| Timing                      | Runs asynchronously during the render phase.                                              | Runs synchronously during the commit phase.                                                    |
| Use Cases                   | Fetching data, subscribing to events, scheduling side effects.                            | Performing measurements, synchronously modifying the DOM based on layout.                      |
| Blocking Nature             | Non-blocking, does not delay rendering                                                    | Potentially blocking, may delay rendering                                                      |
| Performance                 | Optimized for performance in most cases                                                   | Can cause performance issues if not used carefully                                             |
| Usage Considerations        | Preferable for most side effects and effects that don't require immediate visual updates. | Suitable for effects that need to be applied synchronously before the browser paints.          |
| Dependencies                | Can specify an array of dependencies to control when the effect runs.                     | Similar to `useEffect`, dependencies can be specified to optimize effect re-execution.         |
| Server-side Rendering (SSR) | Can be used in both client-side and server-side rendering environments.                   | Not recommended for server-side rendering, as it can block rendering. Use `useEffect` instead. |

## Benefits of using the `useLayoutEffect` hook

- It ensures that layouts are very consistent throughout and are stable before the user sees it.
- It helps prevent unnecessary re-renders or repaints by synchronizing state changes with DOM changes.
- **Preventing Flickering or unwanted content flashes:** In some circumstances, utilizing useLayoutEffect can assist to eliminate visual flickering or layout shifts that might occur when elements need to be relocated or styled depending on layout information. By performing the appropriate layout changes synchronously before the browser paints, you may prevent the visual glitches that could arise if you used `useEffect` and had a delay between layout changes and rendering.

## Pitfalls of using the `useLayoutEffect` hook

1.  A major pitfall of this hook according to the official React docs, is that it can hurt app performance.
2.  No support for Server-Side Rendering (SSR): Because SSR requires asynchronous rendering to avoid blocking the server thread, using useLayoutEffect in an SSR setup can result in mismatches between server-rendered and client-rendered content.

## Best Practices for using `useLayoutEffect`

When using the `useLayoutEffect` hook in React, it's important to follow best practices to ensure that your code behaves correctly and efficiently. Here are some recommended practices for using `useLayoutEffect` effectively:

- `useLayoutEffect` is a Hook, and hence must be called at the top level of your component.
- Do not call it inside loops or conditions. If you need to do that then extract a component and move the Effect there.
- Only use the `useLayoutEffect` hook for side effects that depend on the layout of the component.
- Also make use of the `ref` object in order to access the current layout of the component.
- Avoid using `useLayoutEffect` to update the state of your components.
- Avoid carrying out expensive operations and computations that could significantly cause a delay in rendering.
- Always consider using alternatives such as `useEffect`.
- **Limit the use of useLayoutEffect:** In most circumstances, useEffect will suffice to deliver the needed functionality. Use useLayoutEffect only in situations when synchronous execution and quick access to the DOM is required.
- **Be mindful of dependencies:** Just like `useEffect`, `useLayoutEffect` hook also accepts an array of dependencies as the second argument. So ensure you include all the relevant dependencies to avoid unnecessary re-renders.

## Choosing the Right Hook

There is no right or wrong hook to use it all depends on your specific use case. So I would recommend starting with the`useeffect` hook and switching over when it causes a problem.

## Test React components using `useLayoutEffect`

I wanted to share some thoughts on how we can write effective tests for our components using `useLayoutEffect` hooks in our React applications. Testing is sometimes a bit burdensome because of the fact that `useLayoutEffect` is synchronous, but if we take the right approach, we can make sure that our components behave as we expect. Here's a breakdown of some strategies:

### React Testing Library

React Testing Library is a popular choice to test React components. As `useLayoutEffect` runs synchronously, that is an important thing to work with in our tests. For the test, we can render a component and right away verify that the side effects have occurred as expected.

```tsx
import React, { useLayoutEffect, useRef } from "react";
import { render, screen } from "@testing-library/react";

function AutoFocusInput() {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} data-testid="auto-focus-input" />;
}

test("focuses the input field on render", () => {
  render(<AutoFocusInput />);
  const input = screen.getByTestId("auto-focus-input");

  expect(input).toHaveFocus();
});
```

### Mocking `useLayoutEffect`

Sometimes you would need to mock `useLayoutEffect` to test how it interacts with other hooks or isolate its behavior. You can use Jest to mock the hook, allowing you to control its execution during tests and simulate different scenarios.

```tsx
import React, { useLayoutEffect } from "react";
import { render } from "@testing-library/react";
import { jest } from "@jest/globals";

const MyComponent = () => {
  useLayoutEffect(() => {
    console.log("useLayoutEffect called");
  }, []);

  return <div>Test Component</div>;
};

test("mocks useLayoutEffect", () => {
  const useLayoutEffectMock = jest.spyOn(React, "useLayoutEffect");
  useLayoutEffectMock.mockImplementation(() => {
    console.log("Mocked useLayoutEffect");
  });

  render(<MyComponent />);

  expect(useLayoutEffectMock).toHaveBeenCalledTimes(1);
  useLayoutEffectMock.mockRestore();
});
```

### Testing Manipulating the DOM

If `useLayoutEffect` is being used to manipulate the DOM for measuring elements or applying styles, it's extremely important to assert these changes in your tests. This will make sure the side effects which your hook applies happen as expected.

```tsx
import React, { useLayoutEffect, useRef } from "react";
import { render, screen } from "@testing-library/react";

const MeasureComponent = () => {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    box.style.width = "200px";
  }, []);

  return (
    <div ref={boxRef} data-testid="measured-box">
      Box
    </div>
  );
};

test("applies styles to the element", () => {
  render(<MeasureComponent />);
  const box = screen.getByTestId("measured-box");

  expect(box).toHaveStyle("width: 200px");
});
```

### Dealing with Cleanup Effects

Similarly, when testing components that have an effect in `useLayoutEffect`, it is important to ensure they clean up properly. This means you need to check if all event listeners are removed and, if there were any, their side effects on the DOM are removed once the component is unmounted.

```tsx
import React, { useLayoutEffect, useRef } from "react";
import { render, unmountComponentAtNode } from "@testing-library/react";

const EventListenerComponent = () => {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      console.log("Scrolling...");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={divRef}>Scroll Event Listener</div>;
};

test("removes event listener on unmount", () => {
  const { unmount } = render(<EventListenerComponent />);

  const spy = jest.spyOn(window, "removeEventListener");
  unmount();

  expect(spy).toHaveBeenCalledWith("scroll", expect.any(Function));
  spy.mockRestore();
});
```

### Timers and Asynchronous Operations

If the `useLayoutEffect` depends on some async operation or running timers, then with the help of test utilities, such as Jest's fake timers, you are sure the behavior is tested right. You will be able to manipulate time better and determine the side effects that should happen with that delay.

```tsx
import React, { useLayoutEffect, useRef } from "react";
import { render, screen } from "@testing-library/react";

jest.useFakeTimers();

const DelayedEffectComponent = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      ref.current.textContent = "Updated Text";
    }, 2000);
  }, []);

  return (
    <div ref={ref} data-testid="delayed-box">
      Initial Text
    </div>
  );
};

test("updates text after delay", () => {
  render(<DelayedEffectComponent />);
  const box = screen.getByTestId("delayed-box");

  expect(box).toHaveTextContent("Initial Text");

  jest.advanceTimersByTime(2000);

  expect(box).toHaveTextContent("Updated Text");
});
```

## Conclusion

Throughout this article, you have learned a lot about `useLayoutEffect` hook, similarities and differences, best practices etc. By now I am confident you know enough to properly make use of effect hooks in your applications to improve the overall experience and solve great problems.
