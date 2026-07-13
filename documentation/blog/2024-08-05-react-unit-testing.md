---
title: A Comprehensive Guide of React Unit Testing
description: We'll learn how to unit test our component down to hooks and Context.
slug: react-unit-testing
authors: chidume_nnamdi
category: "Engineering"
tags: [react, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-26-react-unit-testing/social-2.png
hide_table_of_contents: false
last_update: 2024-08-05
---

**This article was last updated on August 05, 2024 to add sections for Accessibility Testing and Custom Hooks Testing.**

## Introduction

Unit testing is a crucial step in the software development process, where developers meticulously examine the smallest functional components, known as units, to ensure their proper functioning. This process involves thorough testing conducted by software developers, and occasionally by QA personnel, as an integral part of the development lifecycle.

Unit testing helps us have faith and strong faith at that, that our software works well and in the most bizarre use cases. Users would not want bug-ridden software. Once users find glitches and bugs in software, they lose hope and if the bugs and glitches are not fixed immediately they might abandon the software altogether. So we see that bugs contribute a lot to how software progress in the market.

Sometimes, it's difficult to test and cover all use cases before the software is deployed, but unit testing helps us test different independent units of our software. Making sure that they are working correctly and will stand the test of time.

Let's see an example of how unit testing is important. Let's say we have a `add` function in an application that we use in our calculator application. This `add` function accepts two parameters, and these parameters should be a number. Now, in the real world, users might input words and characters or even symbols, this will cause our application to glitch because we did not know that users might enter inputs other than numbers. But with unit testing of the `add` function before deployment, we would have caught this and refactored the `add` function to handle these scenarios.

So we see how unit testing is very crucial in the software development of any application. So in that unit testing has been a must in companies, developers must write tests in any feature they build in their application otherwise the software will be deemed a risk. Nobody wants to lose customers.

So many unit testing tools have sprung up in recent years making unit testing in the React framework very easy. In addition, almost all programming has testing frameworks or tools built for them. The popular ones are JUnit, PHUnit, Jasmine, Mocha, etc.

In this article, we will learn all about unit testing in the Reactjs framework. We will learn how to unit test our component down to hooks and Context.

## Setting up a testing environment

Let's create a new React project.

```sh
create-react-app test-prj
cd test-prj
```

The testing tools that we will use are [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

- **Jest**: This is a popular testing library built by Facebook. It has simple APIs that make testing very easy.
- **React Testing Library**: This is a testing built on-top DOM Testing Library that gives us the power to test React components. It comes with React project scaffolded with the `create-react-app` tool, if it is not present you can install it using `npm install --save-dev @testing-library/react`.

To install Jest we run the command: `npm install --save-dev jest`.

The next question is "Where do we write the test?"

Tests are written in `js/ts` files, but the `.js/ts` are preceded with `.test` so that Jest and React Testing Library can pick them up because that is the only we tell the testing libraries that those are our test files. So our test file for the `add` function will be `add.test.js`.

To run the test files, we will have to add a `test` section to the `scripts` section in our `package.json`.

```tsx
{
  "scripts": {
    "test": "jest"
  }
}
```

Now, when we run the command: `npm run test` or `yarn run test`, Jest will search and collect all files with `.test.*js|ts|tsx|tsx` in their names and run them in a testing environment.

We can group the test files under a folder called `__tests__`. Jest we look for the folders in your application and run the `.test.*js|ts|tsx|tsx` in them.

## Writing unit tests for React components

We will learn how to test a basic React component.

Let's write a component that renders "Hello World" and test that the component actually renders the popular greeting:

```tsx
import React from "react";

const HelloWorld = () => {
  return <div>Hello World</div>;
};

export default HelloWorld;
```

Now, we will create a test file `HelloWorld.test.js`:

```tsx
test('renders "Hello World" text', () => {
  const { getByText } = render(<HelloWorld />);
  const helloWorldElement = getByText("Hello World");
  expect(helloWorldElement).toBeInTheDocument();
});
```

In this test case, we render the `HelloWorld` component using the `render` function provided by React Testing Library. We then use the `getByText` function to retrieve the element that contains the "Hello World" text. Finally, we use the `toBeInTheDocument` matcher to check if the element is present in the rendered component.

The `render` function is used to render the component in a DOM, this is similar to the DOM in the browser. Once this is done we can then test the component using DOM API-like functions provided by the React Testing Library.

The `getByText` function searches the rendered DOM for the string passed to it.

The `toBeInTheDocument` function is used to test if the DOM object it was called exists in the DOM.

We can assign a `test-id` to elements in our component so we can pinpoint them directly by using the `getTestById` function provided by React Testing Library.

```tsx
import React from "react";

const HelloWorld = () => {
  return <div data-testid="hello-world">Hello World</div>;
};

export default HelloWorld;
```

See the use of `data-testid` property in the `div` element there. To get the `div` element, we will call the `getByTestId` function passing in the value of the `data-testid` to the function: `getByTestId("hello-world")`. This returns the HTMLElement instance of the `div` element and then we can test the `Hello World` text node using the `textContent` DOM property.

```tsx
import React from "react";
import { render } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

test('renders "Hello World" text using getByTestId', () => {
  const { getByTestId } = render(<HelloWorld />);
  const helloWorldElement = getByTestId("hello-world");
  expect(helloWorldElement).toBeInTheDocument();
  expect(helloWorldElement.textContent).toBe("Hello World");
});
```

We use `getByTestId('hello-world')` to query the element with the `data-testid` attribute set to "hello-world". Then, we assert that the element is in the document and verify its `textContent` to be "Hello World" using the `toBe` matcher.

Now, let's move over to testing and firing events in components.

**Test firing events**

Let's say we have a Counter application that updates the DOM with the click of a button:

```tsx
import React, { useState } from "react";

const Counter = ({ count }) => {
  const [increment, setIncrement] = useState(0);

  const handleIncrement = () => {
    setIncrement(increment + 1);
  };

  return (
    <div>
      <p>Increment: {increment}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default Counter;
```

Now, we have a state `increment` that holds the state of the application, and it is displayed in the DOM. The `Increment` button when clicked increases the state `increment` by one. So let's write a test for this component to make sure that the `increment` state is increased when the `Increment` button is clicked.

So, to test this we will need to somehow fire a `click` event on the `Increment` button, but how can we do this? We will see below.

```tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increments count on button click", () => {
  const { getByText } = render(<Counter />);
  const incrementElement = getByText("Increment: 0");
  const buttonElement = getByText("Increment");

  fireEvent.click(buttonElement);

  expect(incrementElement.textContent).toBe("Increment: 1");
});
```

React Testing Library has a `click()` method set to the DOM instance of an element that simulates the `click` event as if it was actually clicked by a user.

See that we got the DOM instance of the button by calling this `getByText('Increment')`, then we called the `click()` method on its instance, this will fire the click event on the button causing the `increment` state to be increased by one, then we will thereafter to see if the state was really updated.

See in the last line, we got the text node of the div element and expect it to be `Increment: 1`.

Now, let's move over to testing states and props in components.

## State and props of the components

This entails testing that the current value of a state is updated correctly when an action is executed.

Let's say we have a state:

```tsx
import React, { useState } from "react";

const Counter = ({ count }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>
        Count: <span data-testid="count">{count}</span>
      </p>
      <button data-testid="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
};

export default Counter;
```

We have a state `count`, and it is displayed in the DOM in the `p` element. The `Increment` button when clicked increments the state of the `count` by 1 and this in turn makes the component re-render and displayed the updated value of the `count` state.

Let's write a test that ensures that the `count` state is updated when the `setCount` is called.

```tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increments count on button click", () => {
  const { getByText } = render(<Counter />);
  const countElement = getByTestId("count");
  const buttonElement = getByTestId("button");

  fireEvent.click(buttonElement);

  expect(incrementElement.textContent).toBe("1");
});
```

We are now familiar with what is being done here. We expect the last code to pass because after the button has been clicked the state `count` should be incremented to 1.

Let's test for `props` passed to a component. We know that props are attributes passed to components.

```tsx
import React, { useState } from "react";

const Counter = ({ count }) => {
  return (
    <div>
      <p>
        Count: <span data-testid="count">{count}</span>
      </p>
    </div>
  );
};

export default Counter;
```

We have this component expecting a value to be passed to it via `count` attribute in its props object. So now let's write a test for it to make sure a `count` attribute passed to the `Counter` component is displayed.

```tsx
import React from "react";
import { render } from "@testing-library/react";
import Counter from "./Counter";

test("increments count on button click", () => {
  const { getByText } = render(<Counter count={9} />);
  const countElement = getByTestId("count");

  expect(incrementElement.textContent).toBe("9");
});
```

Here, we rendered the `Counter` component passing a value of 9 via its `count` props. Then, we got hold of the `p` element where the props will be rendered. Then, we expect it to be the value 9.

## Mocking function calls

During testing, we might not really want an actual function to be called based on some factors. For example, the function might have a number of calls set on it. The only way to go about this is to mock that function, ie, to create a dumb version function of that actual function. We do this in Jest by calling the `fn()` API. This creates a mock function and returns it.

```tsx
const mockFn = jest.fn();
```

We can then test the number of times the function was called, and the return value of the function, and also Jest provides in an array the arguments passed to the function each time it was called.

Let's see an example:

```tsx
const Test = ({ done }) => {
  return (
    <div>
      <button onClick={done}>Call DONE</button>
    </div>
  );
};
```

We have a simple component here, it accepts a function in its props object via `done` property. This `done` props function is called when the `Call DONE` button is clicked. Now, we want to test the component to see if the `done` props passed to the component is called when the `Call DONE` button is clicked. To test this we will need to pass a mock function to the `done` props of the component. Let's see below how we can do it:

```tsx
import React from "react";
import { render } from "@testing-library/react";
import Test from "./Test";

test("test mock function props is called", () => {
  const fn = jest.fn();
  const { getByText } = render(<Test done={fn} />);
  const button = getByText("Call DONE");
  button.click();

  expect(fn.mock.calls).toBe(1);

  button.click();
  expect(fn.mock.calls).toBe(2);
});
```

We created a mock function `fn` by calling the `fn()` function from the `jest` object. We passed the mock function to the `Test` component in a `done` attribute. Next, we got the handle of the `Call DONE` button and fire a click event on it. This will call the mock function once, that's why in the next line we expect the mocked function to be called once. Next, we fired the click event, and this time we expected the function to be called again.

## Testing React hooks

Now, we will test React custom hooks. In testing React hooks we will be verifying the behavior and state changes of a component that uses hooks. Let's say we have a custom hook called `useCounter` that manages a counter value and provides functions to increment and decrement it:

```tsx
import { useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return { count, increment, decrement };
};

export default useCounter;
```

The above custom hook gives us the ability to handle our `count` state from one place. It returns the `count` state, the `increment` function, and the `decrement` function. We will destructure all these inside the component and use it to manage and manipulate the `count` state.

Now, let's write a test case for this custom hook:

```tsx
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

test("should increment and decrement counter correctly", () => {
  const { result } = renderHook(() => useCounter());

  const { count, increment, decrement } = result.current;

  expect(count).toBe(0);

  act(() => {
    increment();
  });

  expect(count).toBe(1);

  act(() => {
    decrement();
  });

  expect(count).toBe(0);
});
```

In this test case, we use the `renderHook` function from the `@testing-library/react-hooks` package to render the `useCounter` hook. The `result` object from `renderHook` gives us access to the current state and functions returned by the hook. The `result` is an object that contains a property called `current`. The value of this `current` is an object that contains the return value of the `useCounter` hook. From this `current` object we destructured all the objects returned by the `useCounter` hook.

We assert that the initial value of the `count` state is 0. Then, we use the `act` function to perform actions on the hook. Within `act`, we call the `increment` function and assert that the `count` state is incremented to 1. Similarly, we call the `decrement` function and verify that the `count` state is decremented to 0.

The `act` function is used to wrap asynchronous or state-updating code that affects React components. It ensures that all state updates are properly processed and reflected in the component before making assertions.

You see how easy it is to test custom hooks using the `renderHook` function, we had no need of using the custom hook inside of a component just to test it.

## Testing asynchronous operations

Asynchronous operations involve handling promises, asynchronous functions, and async/await syntax. The most common example of an async operation in a React component is the fetching of data over HTTP. HTTP calls are async operations in the sense that it does not stop the flow of the code execution, instead, it is executed in parallel with the main code.

Let's see a component that on render makes an HTTP call to an endpoint and then renders the result of the fetch.

```tsx
import React, { useState, useEffect } from "react";

const AsyncComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.example.com/data");
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return <div>{data ? data.message : "Loading..."}</div>;
};

export default AsyncComponent;
```

This component fetches data from `https://api.example.com/data` and renders it. Now, we want to test this component but we don't want the component to make an actual HTTP call to the endpoint. So what do we do? We have to mock the `fetch` call. Also, the `fetch` call is an async op, what do we do? The React Testing Library has a function `waitFor`, this function waits for an async operation to complete before the code execution flow resumes. We can pass a callback to it, that executes after the async operation completes.

Let's see below:

```tsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import AsyncComponent from "./AsyncComponent";

test("renders fetched data after async call", async () => {
  const mockData = { message: "Test Message" };

  // Mock the fetch API
  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    }),
  );

  const { getByText } = render(<AsyncComponent />);

  // Assert that "Loading..." is initially rendered
  expect(getByText("Loading...")).toBeInTheDocument();

  // Wait for the async operation to complete
  await waitFor(() => {
    expect(getByText(mockData.message)).toBeInTheDocument();
  });

  // Restore the original fetch implementation
  window.fetch.mockRestore();
});
```

In this test case:

- A mock data object `mockData` is defined to simulate the data returned from the API.
- The `fetch` function is mocked using `jest.spyOn` and `mockImplementation`. It returns a resolved promise that resolves to an object with a `json` function that, in turn, resolves to `mockData`.
- The `render` function is used to render the `AsyncComponent`.
- The initial rendering displays "Loading...", which is verified using `expect` and `getByText`.
- The `waitFor` function from `@testing-library/react` is used to wait for the asynchronous operation to complete. Within the callback of `waitFor`, we assert that the fetched data (`mockData.message`) is rendered in the component.
- Finally, the original implementation of `fetch` is restored using `window.fetch.mockRestore()` to ensure other tests are not affected.

By using `await` and `waitFor`, you can test and assert the behavior of asynchronous operations in our React components. It allows us to verify that the correct data is fetched and rendered after the asynchronous operation is completed.

## Testing React Context API

In testing React Context API, we will verify that the components correctly consume and provide values from the context.

Let's say we have a context called `ThemeContext` that provides a theme value to consuming components:

```tsx
import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = "light";

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

We created a global context here that passes down a theme down to its children. The `ThemeProvider` does that, see how encloses the children element between its tag. We created a custom hook that we can use to get the `ThemeContext`, see that it utilizes the `useContext` hook from React to consume the `theme` value from the `ThemeContext`. It returns the current value of the `ThemeContext`.

Now, let's write a test case for a component that consumes the `ThemeContext` using the `useTheme` hook:

```tsx
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";

const ThemeConsumer = () => {
  const theme = useTheme();
  return <div>{theme}</div>;
};

test("renders theme value from the context", () => {
  const { getByText } = render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>,
  );

  expect(getByText("light")).toBeInTheDocument();
});
```

Here, we rendered the `ThemeConsumer` component wrapped within the `ThemeProvider` to provide the theme value.

Next, we used the `getByText` function to query the DOM for the rendered text. We expect to have a text node with the value `light` in the DOM because the `ThemeConsumer` must have gotten the theme value and rendered it.

Next, let's see how we can test routing in React.

## Testing React Router

Its quite tricky how this can be done but believe me it's very easy and straightforward. To test React Router, all we have to do is to load a particular URL and verify that the associated component is rendered on the DOM.

Let's say we have two routes: `/home` and `/about` in our application and `/home` route is mapped to `Home` component and the `/about` route is mapped to the `About` component.

```tsx title="Home.js"
// Home.js
const Home = () => {
  return <div>This is the Home component</div>;
};

export default Home;

// About.js
const About = () => {
  return <div>This is the About component</div>;
};

export default About;
```

Let's set up the routing:

```tsx title="App.js"
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};

export default App;
```

Now, let's write the test cases:

```tsx title="App.test.js"
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders home component when visiting the home route", () => {
  render(
    <Router initialEntries={["/home"]}>
      <App />
    </Router>,
  );

  expect(screen.getByText("This is the Home component")).toBeInTheDocument();
});

test("renders about component when visiting the about route", () => {
  render(
    <Router initialEntries={["/about"]}>
      <App />
    </Router>,
  );

  expect(screen.getByText("This is the About component")).toBeInTheDocument();
});
```

You understand the trick we did there. See that in the first `render`, we rendered our `App` component enclosed by the `Router` component and passed the URL `/home` to it. Now, according to our route mapping, this is supposed to render the `Home` component, and the component will render the text `This is the Home component` in the DOM.

So in the next line, we expect to see the text `This is the Home component` in the DOM. Easy.

To test for the `/about` route, we did the same thing, but this time we passed `/about` URL, so we know that the `About` will be rendered this time and we `expect` to have `This is the About component` text node in the DOM.

These test cases verify that the components `Home` and `About` are rendered correctly based on the route configuration.

## Snapshot testing

Snapshot testing is quite different from what we have seen in this article. This type of testing is classified as output comparison testing. In the case of React component snapshot testing, the UI of the component is taken first and saved, then on subsequent testing, a current snapshot of the component is taken and compared with the previous snapshot to check for changes that may cause breaks.

Let's see an example:

```tsx
import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {text}
    </button>
  );
};

export default Button;
```

To create a snapshot test for this component, you can write a test case using the `toMatchSnapshot` matcher:

```tsx
import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

test("Button component matches snapshot", () => {
  const { asFragment } = render(<Button text="Click me" onClick={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});
```

Here, the `render` function renders the `Button` component with some props. The `asFragment` function is then used to retrieve the rendered component as a snapshot.

The `toMatchSnapshot` matcher compares the rendered output with the previously saved snapshot. If a snapshot doesn't exist, Jest creates a new one. If a snapshot exists and there are no changes, the test passes. If there are differences between the snapshot and the current output, Jest highlights the differences and the test fails.

When you run this test for the first time, Jest will create a snapshot file (e.g., `Button.test.js.snap`) containing the rendered output. On subsequent test runs, Jest compares the rendered output with the snapshot and reports any changes.

If you intentionally make changes to the component's output and want to update the snapshot, you can run Jest with the `--updateSnapshot` flag to update the snapshot file:

```
jest --updateSnapshot
```

## Testing Performance with React Profiler

I wanted to add some performance testing to our React app. This will help us ensure that our components are not only functional, but also performant.

### Profiling with the React Profiler

React Profiler is a tool to measure the performance of React components. To identify performance bottlenecks and optimize our components accordingly.

```jsx
import React, { Profiler } from "react";
import { render } from "@testing-library/react";
import MyComponent from "./MyComponent";

const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions, // the Set of interactions belonging to this update
) => {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};

test("measures performance of MyComponent", () => {
  render(
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>,
  );
});
```

In this example, we wrap `MyComponent` inside a `Profiler` giving it an `onRenderCallback` function to log performance metrics so that we may pinpoint potential trouble spots.

### Using Performance Tools

We can use performance tools to analyze and optimize our React components effectively. Here are a couple:

**React DevTools Profiler**

The Profiler tab in React DevTools allows developers to record and analyze component performance during real time. This helps locate components that are re-rendering too frequently or take an excessively long time to render.

**Lighthouse:** Lighthouse is an open-source automatic tool for increasing web page quality. It gives access to all the performance metrics and suggests changes you need to make.

## Accessibility Testing

### Ensuring Accessible Components

The final expected outcome is that every component should be largely accessible in order to provide a great user experience for all, including those with disabilities. Here's a general outline and code samples of what we will cover:

Ensuring Accessible Components We can automatically find and fix accessibility issues on components with the use of tooling like Axe. Axe is an engine used to run accessibility tests on web pages and other HTML interfaces.

```tsx
import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const MyComponent = () => (
  <div>
    <h1>Hello, World!</h1>
    <button>Click Me</button>
  </div>
);

test("should have no accessibility violations", async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Here, we are using the axe library to check our component for accessibility issues. The toHaveNoViolations matcher helps us assert that there are no accessibility violations in our component.

### Writing Tests for ARIA Roles and Properties

Writing Tests for ARIA Roles and Properties ARIA (Accessible Rich Internet Applications) roles and properties help make content on the web more accessible to people with disabilities. Test your components' correct use of ARIA attributes.

```tsx
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const AriaComponent = () => (
  <div>
    <button aria-label="Close">X</button>
  </div>
);

test("button should have correct aria-label", () => {
  const { getByLabelText } = render(<AriaComponent />);
  const button = getByLabelText("Close");
  expect(button).toBeInTheDocument();
});
```

In this example we are using the aria-label attribute in order that the button is accessibly labeled. We then use the @testing-library/react getByLabelText to test that the button is accessible by its ARIA label.

### Keyboard Navigation Testing

Simulating keyboard events and verifying focus management ensures that users can navigate our application using the keyboard.

```tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const KeyboardComponent = () => (
  <div>
    <button>First Button</button>
    <button>Second Button</button>
  </div>
);

test("should navigate buttons using keyboard", () => {
  const { getByText } = render(<KeyboardComponent />);
  const firstButton = getByText("First Button");
  const secondButton = getByText("Second Button");

  firstButton.focus();
  expect(firstButton).toHaveFocus();

  fireEvent.keyDown(document, { key: "Tab" });
  expect(secondButton).toHaveFocus();
});
```

In this test, we simulate pressing the Tab key to shift focus from the first button to the second button. We use the `fireEvent` function of `@testing-library/react` for simulating keyboard events and use the `toHaveFocus` matcher for verification of focus management.

## Conclusion

We covered a lot in this article. We started with introducing unit testing in software development as a whole. Then, next, we learned how to set up a testing environment in React project, and from there we installed the testing tools and libraries.

Further down, we learned how to write tests for basic React components, how to fire events on elements in a testing env, and how to test states and props. We advanced a little, exploring deep concepts, we learned how to test React Context-powered components, Routing system, and snapshot testing.
