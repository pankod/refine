---
title: React Design Patterns
description: We'll explore React design patterns and examine how they might improve the development of React applications.
slug: react-design-patterns
authors: peter_osah
category: "Engineering"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-17-react-patterns/social-2.png
hide_table_of_contents: false
last_update: 2025-07-28
---

**This article was last updated on July 23, 2025, to add a section on React Server Components and their impact on data fetching patterns.**

## Introduction

React developers can save time and effort by using design patterns, which provide a quick approach to addressing problems using tested-and-trusted solutions. They enable cohesive modules with lower coupling, which in turn helps React developers create maintainable, scalable, and efficient applications. In this article, we will explore React design patterns and examine how they might improve the development of React applications.

Steps we'll cover

- [Container and presentation patterns](#container-and-presentation-patterns)
- [Component composition with Hooks](#component-composition-with-hooks)
- [State management with Reducers](#state-management-with-reducers)
- [Data management with Providers](#data-management-with-providers)
- [Component enhancement with HOCs (higher-order components)](#component-enhancement-with-hocs-higher-order-components)
- [Compound Components](#compound-components)
- [Prop combination](#prop-combination)
- [Lazy Loading Components in React](#lazy-loading-components-in-react)
- [Controlled inputs](#controlled-inputs)
- [Error Boundaries Pattern in React](#error-boundaries-pattern-in-react)
- [Manage custom components with forwardRefs](#manage-custom-components-with-forwardrefs)
- [Data Fetching with React Server Components (RSC)](#data-fetching-with-react-server-components-rsc)

## Container and presentation patterns

The Container and presentation pattern is a pattern that aims to separate the presentation logic from the business logic in a react code, thereby making it modular, testable, and one that follows the separations of concern principle.
Mostly in react applications, there arise cases where we are required to fetch data from a backend/store or to compute a logic and represent the resultant of that computation on a react component. In these cases, the container and presentation pattern shines as it can be used to categorize the components into two namely:

- The container component, which acts as the component responsible for the data fetching or computation.
- the presentation component, whose job is to render the fetched data or computed value on the UI(user interface).

An example of Container and presentation pattern is shown below:

```tsx
import React, { useEffect } from "react";
import CharacterList from "./CharacterList";

const StarWarsCharactersContainer: React.FC = () => {
  const [characters, setCharacters] = useState<Character>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://akabab.github.io/starwars-api/api/all.json",
      );
      const data = await response.json();
      setIsLoading(false);
      if (!data) return;
      setCharacters(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <CharacterList loading={loading} error={error} characters={characters} />
  );
};

export default StarWarsCharactersContainer;
```

```tsx
// the component is responsible for displaying the characters

import React from "react";
import { Character } from "./types";

interface CharacterListProps {
  loading: boolean;
  error: boolean;
  users: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({
  loading,
  error,
  characters,
}) => {
  if (loading && !error) return <div>Loading...</div>;
  if (!loading && error)
    return <div>error occurred.unable to load characters</div>;
  if (!characters) return null;

  return (
    <ul>
      {characters.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default CharacterList;
```

## Component composition with Hooks

Hooks are a brand-new feature that debuted in React 16.8. Since then, they have played a crucial role in developing react applications. Hooks are basic functions that grant functional components access to state and lifecycle methods (which were previously exclusively available to class components). Hooks, on the other hand, can be specifically designed to meet a component requirement and have additional use cases.

We can now isolate all stateful logic—a type of logic that needs reactive state variable(s)—and compose or use it in the components using custom hooks. As a result, the code is more modularized and testable because the hooks are loosely tied to the component and can therefore be tested separately.

An example of component composition with hooks is shown below:

```tsx
// creating a custom hook that fetches star wars characters

export const useFetchStarWarsCharacters = () => {
  const [characters, setCharacters] = useState<Character>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const controller = new AbortController();

  const getCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://akabab.github.io/starwars-api/api/all.json",
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          signal: controller.signal,
        },
      );
      const data = await response.json();
      setIsLoading(false);
      if (!data) return;
      setCharacters(data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getCharacters();
    return () => {
      controller.abort();
    };
  }, []);

  return [characters, isLoading, error];
};
```

After creating the custom hook, we will import it into our **StarWarsCharactersContainer** component and use it;

```tsx
// importing the custom hook to a component and fetch the characters

import React from "react";
import { Character } from "./types";
import { useFetchStarWarsCharacters } from "./useFetchStarWarsCharacters";

const StarWarsCharactersContainer: React.FC = () => {
  const [characters, isLoading, error] = useFetchStarWarsCharacters();

  return (
    <CharacterList loading={loading} error={error} characters={characters} />
  );
};

export default StarWarsCharactersContainer;
```

## State management with Reducers

Most often, handling many states in a component leads to issues with many ungrouped states, which can be burdensome and challenging to handle. The reducer pattern can be a helpful option in this situation. We can categorize states using reducers into certain actions that, when executed, can change the grouped states.

This pattern allows the developer who uses it to control the component's and/or hook's state management, letting them manage state changes when events are sent.

An example of using the reducer pattern is shown below:

```tsx
import React, { useReducer } from "react";

const initState = {
  loggedIn: false,
  user: null,
  token: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "logout":
      return initState;
    default:
      break;
  }
}

const AuthComponent = () => {
  const [state, dispatch] = useReducer(authReducer, initState);

  const logIn = () => {
    dispatch({
      type: "login",
      payload: {
        user: { name: "John Doe" },
        token: "token",
      },
    });
  };

  const logOut = () => {
    dispatch({ type: "logout" });
  };

  return (
    <div>
      {state.loggedIn ? (
        <div>
          <p> Welcome {state.user.name} </p>
          <button onClick={logOut}></button>
        </div>
      ) : (
        <form onSubmit={logIn}>
          <input type="text" />
          <input type="password" />
          <button type="submit"></button>
        </form>
      )}
    </div>
  );
};
```

In the above code, the component dispatches two actions:

- The '**login**' action type triggers a state change that affects three state values namely **loggedIn**, **user**, **token**.
- The '**logout**' action simply resets the state to its initial value.

## Data management with Providers

The provider pattern is very useful for data management as it utilizes the context API to pass data through the application's component tree. This pattern is an effective solution to prop drilling, which has been a common concern in react development.

To implement the provider pattern, we will first create a Provider Component. A Provider is a higher-order component that the Context object provides to us. We can construct a Context object by utilizing the createContext method provided by React.

```tsx
export const ThemeContext = React.createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

After creating the provider, we will enclose components dependent on the data from context API with the created Provider Component.

To obtain the data from context API, we call useContext hook, which accepts a context as a parameter(in this case, **ThemeContext**).

```tsx
import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "../context";

const HeaderSection = () => {
  <ThemeProvider>
    <TopNav />
  </ThemeProvider>;
};

const TopNav = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme === "light" ? "#fff" : "#000 " }}>
      ...
    </div>
  );
};
```

## Component enhancement with HOCs (higher-order components)

A higher-order component takes in a component as an argument and returns a supercharged component injected with additional data or functionality. The possibility of HOCs in React is due to React preference of composition over inheritance.

The Higher-Order Component (HOC) pattern offers a mechanism to increase or modify a component's functionality, facilitating component reuse and code sharing.

An example of the HOC pattern is shown below:

```tsx
import React from 'react'

const higherOrderComponent = Component => {
  return class HOC extends React.Component {
    state = {
      name: 'John Doe'
    }

    render() {
      return <Component name={this.state.name} {...this.props} />
    }
 }


const AvatarComponent = (props) => {
  return (
    <div class="flex items-center justify-between">
      <div class="rounded-full bg-red p-4">
          {props.name}
      </div>
      <div>
          <p>I am a {props.description}.</p>
      </div>
    </div>
  )
}


const SampleHOC = higherOrderComponent(AvatarComponent);


const App = () => {
  return (
    <div>
      <SampleHOC description="Frontend Engineer" />
    </div>
  )
}

export default App;
```

In the code above, the **<AvatarComponent/>** is supplied props by the **higherOrderComponent**, which it will utilize internally.

## Compound Components

The Compound Components Pattern is a React design pattern for managing parent components that are made up of child components.

The principle behind this pattern is to break down the parent component into smaller components and then manage the interactions between these smaller components with either props, context or other react data management techniques.

This pattern comes in handy when there is a need to create reusable, versatile components made up of smaller components. It enables developers to create sophisticated UI components that can be readily customized and extended while maintaining a clear and simple code structure.

An example of a use case of the compound components pattern is shown below:

```tsx
import React, { createContext, useState } from "react";

const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

Toggle.On = function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.Off = function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
};

Toggle.Button = function ToggleButton(props) {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle} {...props} />;
};

function App() {
  return (
    <Toggle>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button>Toggle</Toggle.Button>
    </Toggle>
  );
}
```

## Prop combination

This entails creating a single object out of several related props and passing it as a single prop to the component.

This pattern allows us to clean up our code and make it simpler to manage the props, making it especially helpful when we want to pass a lot of related properties to a component.

```tsx
import React from "react";

function P(props) {
  const { color, size, children, ...rest } = props;
  return (
    <p style={{ color, fontSize: size }} {...rest}>
      {children}
    </p>
  );
}

function App() {
  const paragraphProps = {
    color: "red",
    size: "20px",
    lineHeight: "22px",
  };
  return <P {...paragraphProps}>This is a P</P>;
}
```

## Controlled inputs

The Controlled Input pattern can be used to handle input fields. This pattern involves using an event handler to update the component state if the value of an input field changes, as well as storing the current value of the input field in the component state.

Because React controls the state and behavior of the component, this pattern makes code more predictable and readable than the uncontrolled inputs pattern, which does not use the component's state and instead controls it directly through the DOM (Document object model).

An example of a use case of a controlled inputs pattern is shown below:

```tsx
import React, { useState } from "react";

function ControlledInput() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return <input type="text" value={inputValue} onChange={handleChange} />;
}
```

## Error Boundaries Pattern in React

I would like to introduce you to this note on the **Error Boundaries Pattern** in React; it's really crucial to help errors in our apps become gentle.

An error in React means if a component crashes, it can break the whole UI. This doesn't bode well for a good user experience. Error boundaries help us trap these JavaScript errors anywhere in the tree of a component and show a fallback UI without breaking the whole app.

We can create an error boundary using a class component, and define lifecycle methods `componentDidCatch` and `getDerivedStateFromError`. Here's a small simple example:

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
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

We can wrap any component with `ErrorBoundary`, and if it crashes, users will see a fallback message instead of a broken app. This pattern is awesome for catching problems and informing the user in a friendly manner, rather than just letting the app crash.

## Manage custom components with forwardRefs

A higher-order component called a ForwardRef takes another component as input and outputs a new component that passes the original component's ref. By doing this, the child component's ref, which can be used to retrieve the underlying DOM node or component instance, is made accessible to the parent component.

When creating a custom component that interacts with a third-party library or another custom component within your application, it is highly helpful to include the ForwardRef pattern in your workflow. By granting access to the library's DOM node or another component's DOM instance, it helps transfer control of such components to you.

An example of a use case of the forwardRef pattern is shown below:

```tsx
import React from "react";

const CustomInput = React.forwardRef((props, ref) => (
  <input type="text" {...props} ref={ref} />
));

const ParentComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <CustomInput ref={inputRef} />;
};
```

In the code above, we triggered the focus of another component `<CustomInput/>` from our component `<ParentComponent/>` using `forwardRefs`.

## Lazy Loading Components in React

Lazy loading components in React feels to me like a very nice pattern for better performance in our applications, especially when dealing with huge components or routes.

The alternative is eager loading, which will load the needed components in advance. That means lazy loading reduces initial loading time and improves the user experience in general.

In React, the process of lazy loading is implemented using `React.lazy()` and `Suspense`. Here's an example:

```tsx
import React, { Suspense } from "react";

const MyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}
```

In this example, `MyComponent` will only be fetched once it's rendered, and meanwhile, the user sees a fallback like "Loading…". This pattern is especially useful for components that are not immediately visible on the page (e.g., in routes or modals). It's a simple yet potent way for more app optimization, especially for those projects that are more involved.

## Bonus: Memoization Patterns in React

I'd like to share some quick insights on memoization patterns in React: `React.memo`, `useMemo`, and `useCallback`. These are great tools for optimization, avoiding unnecessary re-renders that can be quite a performance cost.

1. **`React.memo`**: This is a higher-order component that wraps around functional components and forbids them from re-rendering unless their props change. It can come in really handy while working with components that require a re-render based on some particular props update.

   Example:

   ```tsx
   const MyComponent = React.memo(({ count }) => {
     console.log("Component rendered");
     return <div>{count}</div>;
   });
   ```

   Now `MyComponent` will only rerender when the `count` prop changes.

2. **`useMemo`**: This hook memoizes the result of a function so that it will only be recomputed if its dependencies have been changed. It's useful for expensive computations where the result does not need to be recalculated on every render.

   Example:

   ```tsx
   const expensiveCalculation = (num) => {
     console.log("Calculating...");
     return num * 2;
   };

   const MyComponent = ({ number }) => {
     const calculatedValue = useMemo(
       () => expensiveCalculation(number),
       [number],
     );

     return <div>{calculatedValue}</div>;
   };
   ```

   The `expensiveCalculation` function will be called every time `number` changes, and not on each render.

3. **`useCallback`**: This hook is quite like `useMemo` but for memoizing functions. This one comes in handy when you have to pass down callbacks into child components in such a manner that they do not get recreated on every render of the parent component.

   Example:

   ```tsx
   const MyComponent = ({ handleClick }) => {
     console.log("Component rendered");
     return <button onClick={handleClick}>Click me</button>;
   };

   const ParentComponent = () => {
     const handleClick = useCallback(() => {
       console.log("Button clicked");
     }, []);

     return <MyComponent handleClick={handleClick} />;
   };
   ```

   Here, `handleClick` is memoized, and thus it won't be re-created every render. These memoization patterns will be useful for optimal performance during complex UI interaction and while working with large sets of data.

### Data Fetching with React Server Components (RSC)

A major evolution in React is the introduction of React Server Components (RSC). Unlike the traditional client-side data fetching patterns we've discussed (like using `useEffect` in a Container Component or a custom Hook), Server Components run exclusively on the server.

This allows them to directly access server-side resources like databases or internal APIs without needing to expose an API endpoint to the client. This pattern simplifies data fetching, reduces the amount of JavaScript sent to the browser, and can significantly improve initial page load performance.

A simple example might look like this:

```jsx
// app/some-page/page.js

// This is a Server Component, so we can use async/await directly!
async function getCharacters() {
  const res = await fetch("https://your-internal-api/characters", {
    cache: "no-store", // Example of fetch options
  });
  return res.json();
}

export default async function CharactersPage() {
  const characters = await getCharacters();

  return (
    <ul>
      {characters.map((char) => (
        <li key={char.id}>{char.name}</li>
      ))}
    </ul>
  );
}
```

In this pattern, the data fetching and rendering happen on the server. The client receives simple HTML, resulting in a faster and more efficient user experience, especially for content-heavy pages. This pattern co-exists with client components, which still handle interactivity and state using hooks like `useState` and `useEffect`.

# Conclusion

We discussed React design patterns in this article, including Higher-Order Components, Container-Presentational Component Patterns, Compound Components, Controlled Components, and many more. You can enhance code quality, promote team collaboration, and make your apps more scalable, flexible, and maintainable by incorporating these design patterns and best practices into your React projects.
