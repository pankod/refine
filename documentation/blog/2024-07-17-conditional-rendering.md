---
title: How to use Conditional Rendering in React
description: We'll implement Conditional Rendering in React and the various ways to use it in your React applications.
slug: react-conditional-rendering
authors: deborah_emeni
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-14-conditional-rendering/social-2.png
hide_table_of_contents: false
last_update: 2024-07-17
---

**This article was last updated on July 17, 2024, to add sections for Common Pitfalls and Best Practices in Conditional Rendering and Testing Conditional Rendering in React Applications.**

## Introduction

One of the essential features in modern React applications is the dynamic rendering of User Interface (UI) components with JSX based on user interactions, which cause certain events to be triggered and specific actions to be performed. These events are typically defined in functional components while building the application and are carried out by "**Conditional Rendering**."

Developers can use React to define a number of distinct functional components that are only rendered when a specific condition is passed. This is a useful feature that has provided several benefits in a variety of areas, including user personalization, defining authentication roles, and implementing Authorization.

In this article, you'll learn about Conditional Rendering in React and the various ways to use it in your React applications.

## What is Conditional Rendering in React?

When developing applications, you must consider the experience of your application's users. You may want to show or deliver certain functionalities to your users based on their interaction with your application. In other words, depending on the state of your application, you may want your users to have access to specific content or functionalities built into your app. All of these are made possible by conditional rendering.

In React, creating and rendering functional components in JSX is the order of the day, hence conditional rendering is the most feasible way of providing an easy user flow or customer experience based on certain events in your application.

_Next, you’ll learn various common and useful methods of conditional rendering._

## Demo: Methods of Conditional Rendering in React

React provides users with a much more functional approach to development, along with the advantages of using only Javascript. This section will demonstrate how to perform conditional rendering in React in a variety of ways. You'll be writing and testing code in the [codesandbox](https://codesandbox.io/) environment.

To begin, create a new React application on your [codesandbox](https://codesandbox.io/).

## Using If-else

Conditional rendering in React works similarly to the if-else statement in JavaScript, and each functional component returns a JSX value (which stands for JavaScript XML) that is rendered.
The following example shows how to render JSX conditionally using the `if-else` syntax. You can accomplish this by using a variable or encapsulating the changing JSX in a wrapping function that is added to the return statement.

_The code example is available on_ [_codesandbox_](https://codesandbox.io/s/using-if-else-for-conditional-rendering-6506hl)_._

First, you'll create two components: a **HeaderComponent.js** file that contains the JSX that will be rendered when the user logs in, as shown below:

```tsx
export default function HeaderComponent(props) {
  return (
    <>
      <h1> Welcome {props.username}! </h1>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </>
  );
}
```

Create a **NotLoggedIn.js** file to house the JSX that will be rendered when the user is not logged in, as shown below:

```tsx
export default function NotLoggedIn(props) {
  return <h2> No User Found </h2>;
}
```

Then, import the two components into the **app.js** file and add an `if-else` condition before the `return` statement that will assign either of the components to the `{template}` depending on whether the `isLoggedIn` state is **true** or **false**:

```tsx
import HeaderComponent from "./HeaderComponent";
import NotLoggedIn from "./NotLoggedIn";
import React from "react";

import "./styles.css";

export default function App() {
  const [isloggedIn, setIsLoggedIn] = React.useState(false);
  let template;
  if (isloggedIn) {
    template = <HeaderComponent username="Debby" />;
  } else {
    template = <NotLoggedIn />;
  }
  return <div className="App">{template}</div>;
}
```

When a user logs in, the state is set to **true**, and the **welcome message** from the `HeaderComponent` is displayed to the user as follows:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-14-conditional-rendering/screen-1.png"  alt="conditional rendering react" />

<br />

If the user is not logged in, the state is set to **false**, and the following **message** is displayed from the `NotloggedIn` component:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-14-conditional-rendering/screen-2.png"  alt="conditional rendering react" />

<br />

## Rendering nothing with null

On occasion, you may want to limit the contents or pages that are rendered to your users based on their preferences, time, location, demography, and other interests in order to improve your application's user experience or personalization. In such a case, you would not want to bore or stress your users with irrelevant content.

When rendering JSX, conditional rendering in React gives you the option of not rendering a specific piece of content or anything to your users. A good example is the [Paypal business site](https://www.paypal.com/us/business), where users are unable to access certain PayPal businesses because the template is not being rendered.

To implement such functionality in React, use 'null' as the rendered template. Using 'null' will result in nothing being rendered and will also prevent errors due to no template being returned.
As an example, suppose you have a "food ordering" application that only renders a page to edit orders for specific users with permission rights, while users with none are rendered nothing.

Create another react application on codesandbox or clone the code example [here](https://codesandbox.io/s/rendering-nothing-with-nulll-bg5ks9?file=/src/App.js).

Then, create an **EditComponent.js** file that will contain a welcome message and a button interface for editing food orders:

```tsx
export default function HeaderComponent(props) {
  return (
    <>
      <h1> Welcome {props.username}! </h1>
      <button style={{ padding: "10px", background: "green", color: "white" }}>
        {" "}
        Edit{" "}
      </button>
    </>
  );
}
```

Import the `EditComponent` into the **App.js** file and add a state `isHasPermission` to check if the user has the permission to edit. Then, add a condition that checks if the user has editing permission and returns the `EditComponent` or `null` depending on whether the state is **true** or **false**:

```tsx
import EditComponent from "./EditComponent";
import React from "react";

import "./styles.css";

export default function App() {
  const [isHasPermission, setIsHasPermission] = React.useState(true);
  let template;
  if (isHasPermission) {
    template = <EditComponent username="Debby" />;
  } else {
    template = null;
  }
  return (
    <div className="App">
      <div>
        <ul>
          <li> Food </li>
          <li> Rice </li>
          <li> Goat </li>
          <li> Food </li>
        </ul>
      </div>
      {template}
    </div>
  );
}
```

If the user has permission, the state is set to **true** and the `EditComponent` is rendered as follows:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-14-conditional-rendering/screen-3.png"  alt="conditional rendering react" />

<br />

If the user has no permission, the state is set to **false** and `null` is rendered as the `template`:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-14-conditional-rendering/screen-4.png"  alt="conditional rendering react" />

<br />

## Conditional rendering with switch statements

There are times when you may want to show a different UI to users based on the state of the application, such as the user's value. The [JavaScript Switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) is ideal for this functionality.

Switch statements are not part of the JSX syntax, and so they cannot be used directly within React. You can, however, use the Switch statements in a subcomponent before using the component in the main component.

In the following example, you will use Switch statements to render different content based on a specific case. You will create an input that takes the user's value and renders the components the user requests.

What is rendered to the user is determined by what the user enters as the case. Type the following code into your **app.js** file:

```tsx
import "./styles.css";
import { useState } from "react";

function SwitchComponent(props) {
  switch (props.route) {
    case "home":
      return <h1> You are Home </h1>;
    case "about-us":
      return <h1> Check Us Out </h1>;
    case "learn":
      return <h1> Come and Learn the mind blowing stuffs </h1>;
    default:
      return null;
  }
}

export default function App() {
  const [path, setPath] = useState("");
  return (
    <div className="App">
      <input onChange={(e) => setPath(e.target.value)} />
      <h1>Hello CodeSandbox</h1>
      <SwitchComponent route={path} />
    </div>
  );
}
```

The component will render based on what the users enter as follows:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-14-conditional-rendering/screen-5.png"  alt="conditional rendering react" />

<br />

## Using ternary operators

The ternary operator is synonymous with the 'if-else' operator. The only difference between the ternary operator and the 'if-else' statement is in the implementation, as JSX supports the use of ternary operators. That is, ternary operators can be easily added to the template to be rendered
You can use the ternary operators to seamlessly render your components within the JSX syntax based on a specific condition.

_The sample code can be found_ [_here_](https://codesandbox.io/s/using-ternary-operators-for-conditional-rendering-qqfn3l?file=/src/App.js)_._

Consider the following example, which renders different content based on the client's existence or state in the application:

```ts
import "./styles.css";

export default function App() {
  const isExistingClient = false;
  return (
    <div className="App">
      {isExistingClient ? (
        <>
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </>
      ) : (
        <>
          <h1> Hi!, New User </h1>
          <h3> Welcome to our palace </h3>
        </>
      )}
    </div>
  );
}
```

## Using Logical AND (&&) and OR (||) operators (Short Circuit Evaluation)

Short-circuiting is how JavaScript handles logical expression evaluation, but the logical && and || operators work slightly differently in React. When the left-hand expression returns **false**, the right-hand expression is evaluated and returns **true**. If the left-hand expression is false, the evaluation of the second expression will be returned.

For example, suppose you have a store application; when the store is open, it should return true and render a specific message to users; when the store is closed, it should return false and render nothing. Also, when the AND (&&) operator is true or open, the right-hand-side expression is evaluated or rendered; if it is not true, it is rendered null.

See the code example [here](https://codesandbox.io/s/using-logical-and-and-or-for-conditional-rendering-kuseun).

```ts
import "./styles.css";

export default function App() {
  const isOpen = true;
  const isAvailable = false;
  return (
    <div className="App">
      {isOpen && (
        <>
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </>
      )}

      {isAvailable || (
        <>
          <h2> Sorry I am not available </h2>
          <button> Make Available </button>
        </>
      )}
    </div>
  );
}
```

## Common Pitfalls in Conditional Rendering

I wanted to share some insights on common pitfalls and best practices for conditional rendering in React. I hope you find these tips useful for our projects.

### Overusing Conditional Logic

- Issue: Too much conditional logic can make the code hard to read and maintain.
  Avoid multiple nested ternary operators in the render function.

```jsx
// Avoid this
return condition1 ? (
  condition2 ? (
    <ComponentA />
  ) : (
    <ComponentB />
  )
) : (
  <ComponentC />
);
```

### State Management Issues

- Issue: Improper state management can cause unexpected behavior.
  Ensure the state is updated correctly before re-rendering.

```jsx
// Properly update state
const handleClick = () => {
  setState((prevState) => ({ ...prevState, key: newValue }));
};
```

### Performance Degradation

- Issue: Unoptimized conditional rendering can slow down performance.
  Use memoization to avoid frequent re-renders.

```jsx
const MemoizedComponent = React.memo(() => {
  return <ExpensiveComponent />;
});
```

### Conditional Rendering of Large Components

- Issue: Rendering large components without optimization can affect load time.
  Use lazy loading for large components.

```jsx
const LazyComponent = React.lazy(() => import("./LargeComponent"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```

### Ignoring Accessibility

- Issue: Not considering accessibility can make the app difficult to use.
  Provide alternative text and manage focus properly.

```jsx
const AccessibleComponent = ({ isVisible }) =>
  isVisible ? <div aria-live="polite">Content is visible</div> : null;
```

### Inconsistent User Experience

- Issue: Inconsistent UI due to poor handling of conditions.
  Use loading indicators consistently and reset states appropriately.

```jsx
const LoadingIndicator = ({ isLoading }) =>
  isLoading ? <Spinner /> : <Content />;
```

**Best Practices in Conditional Rendering**

### Keep It Simple

Use simple and readable conditional statements.
Prefer if-else statements or ternary operators for clarity.

```jsx
const SimpleConditional = ({ isTrue }) =>
  isTrue ? <ComponentA /> : <ComponentB />;
```

### Use Descriptive Variable Names

Use meaningful variable names to make conditions clear.
Name variables to describe the condition precisely.

```jsx
const isUserLoggedIn = true;
return isUserLoggedIn ? <Dashboard /> : <Login />;
```

### Optimize Performance

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.
Memoize components that are conditionally rendered.

```jsx
const OptimizedComponent = React.memo(() => {
  return <ExpensiveComponent />;
});
```

### Implement Code-Splitting and Lazy Loading

Load components only when needed using React.lazy and Suspense.
Lazy load large components to improve performance.

```jsx
const LazyComponent = React.lazy(() => import("./LargeComponent"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```

### Consider Accessibility

Ensure conditional rendering doesn’t compromise accessibility.
Use ARIA attributes and manage focus for screen readers.

```jsx
const AccessibleComponent = ({ isVisible }) =>
  isVisible ? <div aria-live="polite">Content is visible</div> : null;
```

### Maintain Consistent User Experience

Provide a consistent and predictable UI and state.
Use loading spinners or placeholders for better UX.

```jsx
const LoadingIndicator = ({ isLoading }) =>
  isLoading ? <Spinner /> : <Content />;
```

### Separate Logic from JSX

Move conditional logic outside the JSX for readability.
Use helper functions or variables for managing conditions.

```jsx
const renderContent = (isLoggedIn) => {
  if (isLoggedIn) {
    return <Dashboard />;
  } else {
    return <Login />;
  }
};

const App = () => {
  const isLoggedIn = true;
  return <div>{renderContent(isLoggedIn)}</div>;
};
```

## Using IIFEs (Immediately Invoked Function Expressions)

IIFEs are self-invoking functions (functions that call themselves immediately after they have been created). They allow you to use your `if...else` and `switch` statements within the JSX you are returning. This opens up the possibility of using the previously mentioned `switch` or `if-else` method in the JSX.

In the following example, you have a state called `isLoggedIn,` and the content is rendered based on whether the user is logged in or not. In addition, based on the `isLoggedIn` state, an input field is rendered or a welcome user message is displayed.
The code example can be found on [codesanbox](https://codesandbox.io/s/using-iifes-s4bm0n?file=/src/App.js).

```tsx
import "./styles.css";

export default function App() {
  const isLoggedIn = false;
  const user = "Debby";

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      {(() => {
        if (isLoggedIn) {
          return <h1> Welcome {user} </h1>;
        } else {
          return (
            <>
              <label style={{ textAlign: "left !important" }}>Username: </label>
              <br />
              <input />
            </>
          );
        }
      })()}
    </div>
  );
}
```

The result is shown below:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-14-conditional-rendering/screen-6.png"  alt="conditional rendering react" />

<br />

_Next, you’ll see some use cases of conditional rendering._

## Use cases of conditional rendering

Conditional rendering has so many use cases. To list a few:

- **Authentication**: Typically, authentication usually requires access to a user's view of a specific resource. You can derive from the understanding of conditional rendering and previous examples in this article that it can be used to authenticate users for your application.

- **Personalization**: Giving customers a personalized experience is what personalization entails. To accomplish this, many templates must be customized based on the personalization conditions specified.

- **Authorization**: When developing applications, you may need to hide certain actions or information from the user. This is possible by using the null method, as previously mentioned. Depending on the user's role, you can hide or render certain features.

## Best Practices for Testing Conditional Rendering in React

I wanted to share some best practices for testing conditional rendering in our React applications. Effective testing ensures our components behave as expected under different conditions. Here are the key points and examples:

### Using Jest and React Testing Library

- Jest and React Testing Library are popular tools for testing React components. They provide a simple and efficient way to test conditional rendering.

### Test Different States

- Ensure you cover all possible states and conditions in your tests.

### Mock Functions and Props

- Use mock functions and props to simulate different scenarios.

### Snapshots for UI Testing

- Use snapshots to ensure the UI renders correctly based on conditions.

### Example Code

Here’s how you can set up tests for conditional rendering using Jest and React Testing Library:

### Install Necessary Packages

```sh
   npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### Component Example

```jsx
// MyComponent.js
import React from "react";

const MyComponent = ({ isLoggedIn }) => {
  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>}</div>
  );
};

export default MyComponent;
```

### Test File

```jsx
// MyComponent.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyComponent from "./MyComponent";

test("renders welcome message if user is logged in", () => {
  render(<MyComponent isLoggedIn={true} />);
  expect(screen.getByText("Welcome back!")).toBeInTheDocument();
});

test("renders log in message if user is not logged in", () => {
  render(<MyComponent isLoggedIn={false} />);
  expect(screen.getByText("Please log in.")).toBeInTheDocument();
});
```

### Testing with Mock Functions

```jsx
// MyComponentWithFunction.js
import React from "react";

const MyComponentWithFunction = ({ isLoggedIn, handleLogin }) => {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <>
          <h1>Please log in.</h1>
          <button onClick={handleLogin}>Log In</button>
        </>
      )}
    </div>
  );
};

export default MyComponentWithFunction;
```

```jsx
// MyComponentWithFunction.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyComponentWithFunction from "./MyComponentWithFunction";

test("calls handleLogin when login button is clicked", () => {
  const handleLogin = jest.fn();
  render(
    <MyComponentWithFunction isLoggedIn={false} handleLogin={handleLogin} />,
  );

  fireEvent.click(screen.getByText("Log In"));
  expect(handleLogin).toHaveBeenCalledTimes(1);
});
```

### Using Snapshots

```jsx
// MyComponentWithSnapshot.test.js
import React from "react";
import renderer from "react-test-renderer";
import MyComponent from "./MyComponent";

test("renders correctly when logged in", () => {
  const tree = renderer.create(<MyComponent isLoggedIn={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly when not logged in", () => {
  const tree = renderer.create(<MyComponent isLoggedIn={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

Testing conditional rendering in React applications ensures that our components display the correct content under various conditions. By using Jest and React Testing Library, we can efficiently test different states, mock functions, and props, and utilize snapshots for UI consistency.

## Conclusion

In this article, you covered what Conditional Rendering is in React, as well as several methods of Conditional Rendering in React, such as using `if...else`, rendering nothing with `null`, conditional rendering with `switch` statements, using ternary operators, using logical AND (&&) and OR (||) operators (Short Circuit Evaluation), and Using IIFEs. You also learned about some conditional rendering use cases.
