---
title: A Guide to useContext and React Context API
description: Share data across components with React Context in TypeScript and Next.js
slug: usecontext-and-react-context
authors: chibuzor_otuokwu
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-23-react-context/social-2.png
hide_table_of_contents: false
last_update: 2024-10-31
---

**This article was last updated on October 30, 2024 to include sections on optimizing context performance, testing React Context, managing state with context in complex applications, and security considerations with context data.**

When building React applications, we typically pass data from parent to child components via props. It would be easy if we had few layers of components. However, some components are deeply nested.

Things become complex as you introduce more components with several nesting levels. Keeping track of state and props can become cumbersome.

The **React Context API** provides functionality for passing data from a parent component to its descendants without prop drilling.

In this tutorial, you will learn the context API and build a mini e-commerce store to illustrate how to use the context API in a real-world application.

<br />

## What is prop drilling?

React is a declarative, component-based UI framework. You will almost always need to compose two or more components when building UIs. In React, a parent component can primarily share data with its children via props.

However it becomes more complex if your app has several nesting levels and you have to pass data from the topmost to the innermost component.

As an example, assume `ComponentA` renders `ComponentB` and `ComponentB` renders `ComponentC`. If you want the topmost component to share data with the innermost component, you need to pass `props` from `ComponentA` to `ComponentB` and then finally from `ComponentB` to `ComponentC`.

```tsx
function ComponentA() {
  const [counter, setCounter] = useState(0);

  return <ComponentB counter={counter} />;
}

function ComponentB({ counter }) {
  return <ComponentC counter={counter} />;
}

function ComponentC({ counter }) {
  return <p>{counter}</p>;
}
```

In React, prop drilling refers to passing data via props through multiple layers of nested components, as in the above example. Props are useful for basic data sharing between a component and its children.

However, drilling props through several layers of nesting can make your components less readable, difficult to maintain, and reuse. You can solve this prop drilling problem using the React context API.

## What is React Context API?

The React Context API is one of the built-in APIs in React. You can use it to pass data from a parent component to its descendants without prop drilling.

You can create a context by invoking the `createContext` function with an optional default value as in the example below. The default argument can be of any type.

```tsx
import { createContext } from "react";
const ContextObject = createContext(defaultValue);
```

The `createContext` function returns a context object. The returned object has the `Provider` and `Consumer` properties. These properties are React components and are usually referred to as context providers and consumers respectively.

You can use the context provider to wrap the nested components that need to access the context data like so:

```tsx
import { createContext, useContext, useState } from "react";

const Context = createContext(1);

function App() {
  const [count, setCount] = useState(1);

  return (
    <>
      <Context.Provider value={count}>
        <NestedComponent />
      </Context.Provider>
    </>
  );
}
```

As in the above example, you can use the `value` attribute of the context `Provider` component to make the context data available to the nested components .

Any nested functional component, no matter the nesting level, will be able to access or consume the context data via the `useContext` hook.

```tsx
import { useContext } from "react";
import { Context } from "./App";

function NestedComponent() {
  const contextValue = useContext(Context);

  return <p>{contextValue}</p>;
}
```

Instead of using the `useContext` hook to consume context, you can also use the `Context.Consumer` component as in the example below.

```tsx
function NestedComponent() {
  return (
    <>
      <Context.Consumer>
        {(contextValue) => {
          return <p>{contextValue}</p>;
        }}
      </Context.Consumer>
    </>
  );
}
```

However, this is a legacy method for consuming context. Always stick with the `useContext` hook in functional components. Use the `Context.Consumer` method in class components where you can't use hooks.

<br />

## Why React Context?

As hinted above, one of the primary reasons for using the context API is to reduce the downsides of prop drilling. Passing props through deeply nested component tree can result in complex, tightly coupled, and difficult-to-maintain code.

The context API comes in handy if your code requires passing data through several levels of component hierarchy. It makes your code easier to read and maintain.

## Use cases of the React Context API

There are several use-cases of the React context API. Below are some of the use-cases you might encounter often.

### Managing application theme

Most websites and web apps have built-in theme switching functionality. In managing application theme, you can wrap the root component in a theme context provider. Any nested component in the component hierarchy can read the context value.

A user can switch the theme and the context provider will make the currently selected theme available to all its descendants.

### Managing user authentication

You can use the context API to manage user authentication. You can provide information about the currently logged in user to all components via context.

### Managing localization

Most modern applications may need to support multiple languages so that a user can switch to a language they know. You can wrap the root component in a context provider. Any nested component can read the selected language and render content in the user's locale of choice.

### Manage routing

In the React ecosystem, most routing packages rely on the context API to hold information about the active route. Therefore, if you've ever used one of the front-end routing libraries, chances are high that it uses the context API under the hood.

## How to use the React context API with functional components

In this section, we will explore how to use the context API in React functional components.

### How to create Context in React

As hinted above, you can create context by invoking the built-in `createContext` function with a default value as an argument.

```tsx
import { createContext } from "react";
const ExampleContext = createContext({} as any);
```

In most real-world applications, you may want to create a dedicated directory for managing your application's context. You can create context in this directory and import them for your consumers and providers. Creating such a directory simplifies code maintenance.

The code below illustrates how to create a basic React context.

```tsx
import React, { createContext } from "react";

export const ExampleContext = createContext({ username: "Israel" });

interface Props {
  children: React.ReactNode;
}

export const ExampleProvider: React.FC<Props> = ({ children }) => {
  return (
    <ExampleContext.Provider value={{ username: "Chibuzor" }}>
      {children}
    </ExampleContext.Provider>
  );
};
```

In the code above, we created a simple`ExampleContext` with a default value. The `ExampleProvider` component is our parent component. It will wrap multiple nested components that want to consume the data shared by the context.

<br />

### How to consume Context in React

Any component nested within a context provider can consume the shared data. In React functional components, you can use the `useContext` hook to read the context value. The `useContext` hook takes the context as an argument and returns the context value as in the example below.

```tsx title="src/context/example.context.tsx"
import React, { createContext, useContext } from "react";

export const ExampleContext = createContext({ username: "Israel" });

interface Props {
  children: React.ReactNode;
}

export const ExampleProvider: React.FC<Props> = ({ children }) => {
  return (
    <ExampleContext.Provider value={{ username: "Chibuzor" }}>
      {children}
    </ExampleContext.Provider>
  );
};

export const Greet = () => {
  const data = useContext(ExampleContext);
  return <h1>Hello, {data.username}</h1>;
};
```

In the code above, we declared a simple context provider and a component that will consume the context data. The two components don't need to be in the same file.

You can now import and use the components we created above like so:

```tsx title="src/pages/index.tsx"
...
import { ExampleProvider, Greet } from "context/example.context";

const Home: NextPage = () => {
 ...
  return (
    <div className="container">
      <main className="main-content">
        <ExampleProvider>
          <Greet />
        </ExampleProvider>
      </main>
    </div>
  );
};

export default Home;
```

The abvoe component should now display the text "Hello Chibuzor". That's just about everything you need to know to create and consume context in React functional components.

<br />

## How to use the React context API with class components

Creating context in React class components is similar to that in functional components. You use the `createContext` function to create context and wrap your components in the context provider.

However, the difference is in consuming context because hooks only work with functional components. Therefore, you can't use the `useContext` hook to consume context in class components.

With React class components, you use the `Context.Consumer` component to consume the context data as in the example below.

```js
import { Component } from "react";
import { Context } from "./Context";

class MyComponent extends Component {
  render() {
    return (
      <>
        <Context.Consumer>
          {(contextValue) => {
            return <p>{contextValue}</p>;
          }}
        </Context.Consumer>
      </>
    );
  }
}
```

## How to use the React context API in a Next.js project

In this section, we will build a simple e-commerce site using the context API.

### Set up the project

Run the command below to set up a simple Next.js project.

```
npx create-next-app react-context-tutorial --typescript
```

The command above will bootstrap a Next.js app with TypeScript. Select the following options when prompted on the commandline.

```txt
✔ Would you like to use ESLint with this project? Yes
✔ Would you like to use `src/` directory with this project? Yes
✔ Would you like to use experimental `app/` directory with this project? No
✔ What import alias would you like configured? @/*
```

- Open the tsconfig.json file and add the changes below to it.

  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      // highlight-next-line
      "baseUrl": "src",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
  }
  ```

- Import styles in the `src/_app.tsx` file using absolute path.

```tsx title="src/_app.tsx"
//highlight-next-line
import "styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

- Start the development server using the `npm run dev` command
- Open your browser on `localhost` on port 3000

<br />

## Exploring Context in Complex State Management: Using Reducers and Middlewares with Context API

I thought it would be helpful to look at a couple of advanced patterns for managing complex state with React Context: using reducers within our Context API and incorporating middleware for more flexible state handling. These methods can give us more control, especially as our state management needs grow.

### Using Reducers with Context API

If we’re managing a complex state structure, like in an e-commerce app with products, users, and orders, useReducer with Context can be a powerful combo. It allows us to handle multiple actions in a predictable way, similar to Redux but without the extra dependency.

Here’s a basic example of using useReducer with Context:

```tsx
import React, { createContext, useReducer, useContext } from "react";

// Define initial state
const initialState = { cart: [], user: null };

// Define actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider with reducer
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier access
export const useAppContext = () => useContext(AppContext);
```

With this setup, components can dispatch actions without directly managing state. Here’s an example of how we’d add an item to the cart:

```tsx
import { useAppContext } from "../context/AppContext";

const Product = ({ product }) => {
  const { dispatch } = useAppContext();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};
```

Using useReducer helps keep our state updates consistent and reduces the risk of bugs when managing complex data.

### Adding Middleware to Context for Logging and Async Actions

Middleware can enhance our state management, especially for tasks like logging, analytics, or handling async actions. While Redux has built-in support for middleware, we can achieve similar functionality in React Context.

Below is an example of creating a simple logging middleware in our useReducer setup:

```tsx
import React, { createContext, useReducer, useContext } from "react";

// Initial state and reducer function
const initialState = { cart: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    default:
      return state;
  }
};

// Middleware function for logging
const loggerMiddleware = (dispatch) => (action) => {
  console.log("Dispatching action:", action);
  return dispatch(action);
};

// Custom hook to initialize middleware
const useMiddlewareReducer = (reducer, initialState, middlewares = []) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Apply each middleware to dispatch function
  const enhancedDispatch = middlewares.reduce(
    (acc, middleware) => middleware(acc),
    dispatch,
  );

  return [state, enhancedDispatch];
};

// Context and provider setup
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useMiddlewareReducer(reducer, initialState, [
    loggerMiddleware,
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
```

With loggerMiddleware applied, every action dispatched will be logged to the console, which is useful for debugging. We can easily add other middlewares for additional functionality like handling async actions (e.g., API calls).

To use this setup in a component:

```tsx
import { useAppContext } from "../context/AppContext";

const Product = ({ product }) => {
  const { dispatch } = useAppContext();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};
```

### Building the Product Listings

In this section, we will build the UIs for the product list and share data across several components.

- Replace the styles in the `styles/globals.css` file with the styles below.

    <details><summary>Show the styles/globals.css file</summary>
    <p>

  ```css title="styles/globals.css"
  /**  css reset **/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  /*main page content*/
  .main-content {
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    margin-top: 100px;
  }

  /*product*/
  .product-container {
    width: 800px;
    margin: 16px auto;
  }

  .product-details {
    display: flex;
    margin-top: 2em;
  }

  .product-image,
  .product-info {
    padding: 10px;
  }

  .product-image {
    flex: 1;
    font-size: 6em;
    border: 1px solid #999;
  }

  table.product-info {
    border-collapse: collapse;
    flex: 2;
  }

  .product-info td {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
    letter-spacing: 2px;
  }

  .product-info td:last-child {
    line-height: 18px;
  }

  .additional-info {
    border-left: 2px solid purple;
    padding-left: 4px;
    margin-bottom: 4px;
  }

  .add-to-cart {
    display: flex;
    justify-content: flex-end;
  }
  .favorites h2 {
    margin-bottom: 32px;
  }
  .favorites {
    max-width: 600px;
    margin: 32px auto;
    text-align: center;
  }

  .favorites ul {
    text-align: left;
    margin: 16px;
  }

  .button {
    padding: 4px;
    margin: 4px;
    font-size: 20px;
    cursor: pointer;
  }

  .update-quantity {
    width: 124px;
    display: flex;
    padding: 2px;
    margin-top: 0.4em;
    background-color: #fdfefe;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.5);
  }
  .quantity {
    width: 40px;
    text-align: center;
    font-size: 20px;
  }
  .update-button {
    width: 40px;
    padding: 4px;
    font-size: 20px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  ```

    </p>
  </details>

<!-- Create products directory -->

- Copy and paste the `products` data below in the `products.ts` file.

```ts title="src/constants/products.ts"
const products = [
  {
    id: 1,
    title: "Grape",
  },
  {
    id: 2,
    title: "ice cream",
  },
  {
    id: 3,
    title: "Tangerine",
  },
];

export default products;
```

- Create the `src/types/product.ts` file. Copy and paste the code below into it. The `types` directory doesn't exist yet. You need to first create it.

```ts title="src/types/product.ts"
export default interface Product {
  id: number;
  title: string;
}
```

- Replace the contents of the `src/pages/index.tsx` file with the code below.

```tsx title="src/pages/index.tsx"
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="container">
      <main className="main-content">
        <h1 style={{ textAlign: "center" }}>Hello World</h1>
      </main>
    </div>
  );
};

export default Home;
```

The text "Hello World" will be displayed on the screen.

<br />

- Create the _favorites.tsx_, _product-list.tsx_, _product-item.tsx_, and _product-details.tsx_ files in the `src/components` directory. The `components` directory doesn't exist yet. You need to create it yourself.

<details><summary>Show favorites.tsx file</summary>
<p>

```tsx title="src/components/favorites.tsx"
import Product from "types/product";

interface Props {
  products: Product[];
  favorites: number[];
}

const Favorites: React.FC<Props> = ({ products, favorites }) => {
  const myFavorites: Product[] = [];

  favorites.forEach((fav) => {
    const favorite = products.find((product) => product.id === fav);
    if (favorite) {
      myFavorites.push(favorite);
    }
  });

  return (
    <section className="favorites">
      <h2>My Favorite products</h2>
      {myFavorites.length ? (
        <ul>
          {myFavorites.map((favorite) => (
            <li key={favorite.id}>{favorite.title}</li>
          ))}
        </ul>
      ) : (
        <div>😂No favorite product!</div>
      )}
    </section>
  );
};
export default Favorites;
```

 </p>
</details>

<details><summary>Show product-list.tsx file</summary>
<p>

```tsx title="src/components/product-list.tsx"
import React from "react";
import ProductItem from "components/product-item";
import Product from "types/product";

interface Props {
  favorites: number[];
  products: Product[];
  handleFavorite: (productId: number) => void;
}

const ProductList: React.FC<Props> = ({
  favorites,
  products,
  handleFavorite,
}) => {
  return (
    <section className="product-container">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          handleFavorite={handleFavorite}
          favorites={favorites}
        />
      ))}
    </section>
  );
};
export default ProductList;
```

 </p>
</details>

<details><summary>Show product-item.tsx file</summary>
<p>

```tsx title="src/components/product-item.tsx"
import React from "react";
import ProductDetails from "components/product-details";
import Product from "types/product";

interface Props {
  product: Product;
  favorites: number[];
  handleFavorite: (productId: number) => void;
}

const ProductItem: React.FC<Props> = ({
  product,
  handleFavorite,
  favorites,
}) => {
  return (
    <div className="product-card">
      <ProductDetails
        product={product}
        handleFavorite={handleFavorite}
        favorites={favorites}
      />
    </div>
  );
};
export default ProductItem;
```

 </p>
</details>

<details><summary>Show product-details.tsx file</summary>
<p>

```tsx title="src/components/product-details.tsx"
import React from "react";
import Product from "types/product";

interface Props {
  product: Product;
  favorites: number[];
  handleFavorite: (productId: number) => void;
}

const ProductDetails: React.FC<Props> = ({
  product,
  handleFavorite,
  favorites,
}) => {
  const isFavorite = favorites.includes(product.id);
  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">{product.title}</div>
      </div>
      <div className="add-to-cart">
        <button
          type="button"
          className="button"
          onClick={() => handleFavorite(product.id)}
        >
          <span>{isFavorite ? "❤️" : "❤︎"}</span>
        </button>
      </div>
    </div>
  );
};
export default ProductDetails;
```

 </p>
</details>

- Update the index.tsx file in the `pages` directory with the following code.

```tsx title="src/pages/index.tsx"
import { useState } from "react";
import type { NextPage } from "next";
import ProductList from "components/product-list";
import products from "constants/products";
import Favorites from "components/favorites";

const Home: NextPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      const newFavorites = favorites.filter((fav) => fav !== productId);
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  return (
    <div className="container">
      <main className="main-content">
        <Favorites products={products} favorites={favorites} />
        <ProductList
          products={products}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </main>
    </div>
  );
};

export default Home;
```

If you click the favorite icon for each product, you should see it listed under the "My Favorite products" list.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-23-react-context/favorite-product-list.png"  alt="Favorite products list section" />

<br />

## Custom Hooks and Optimizations with React.memo and useCallback

I wanted to share some ideas on making our use of React Context more efficient and maintainable, especially for larger projects. Two approaches that can help us streamline context usage and improve performance are creating custom hooks for context and optimizing context updates with React.memo and useCallback. Here’s a quick overview with examples for both.

### Creating Custom Hooks for Context Access

Instead of directly calling useContext throughout the app, we can create custom hooks to simplify context access. This keeps our codebase clean, ensures type safety, and helps us better control how the context is accessed.

Let’s say we have a UserContext to share user data across components. Here’s how we could set up a custom hook:

```tsx
import React, { createContext, useContext, useState } from "react";

// Step 1: Create the Context
const UserContext = createContext();

// Step 2: Set up the Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Step 3: Create a custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
```

Now, instead of importing both UserContext and useContext in each component that needs access to the user data, we can just use useUser:

```tsx
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user, logout } = useUser();

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};
```

This makes our components cleaner, and any updates to context usage only need to happen in the custom hook.

### Optimizing Context with React.memo and useCallback

One common issue with context is that when context updates, all components using that context can re-render, potentially impacting performance. To minimize unnecessary re-renders, we can use React.memo and useCallback where appropriate.

Let’s say we have a ThemeContext that provides the current theme and a toggle function. We can use React.memo to wrap components that don’t need to re-render unless the context value they use changes.

```tsx
import React, { createContext, useContext, useState, useCallback } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Using useCallback to memoize the toggle function
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Memoized component example
const ThemeButton = React.memo(() => {
  const { toggleTheme } = useTheme();
  console.log("ThemeButton rendered");

  return <button onClick={toggleTheme}>Toggle Theme</button>;
});
```

By wrapping ThemeButton in React.memo, it will only re-render if toggleTheme changes. Since we used useCallback to memoize toggleTheme, it won’t change on every re-render of the provider. This can significantly reduce unnecessary renders in large component trees.

### Share Data using the context API

In this section, we will refactor our code to use the React context API.

- Create the `context/product.context.tsx` file. Copy and paste the code below into it. The `context` directory doesn't exist yet. You need to create it yourself.

```tsx title="src/context/product.context.tsx"
import React, { createContext, useContext, useReducer } from "react";
import products from "constants/products";
import Product from "types/product";

type ProductData = {
  products: Product[];
  favorites: number[];
};

type ProductAction =
  | {
      type: "PRODUCTS";
      products: Product[];
    }
  | {
      type: "FAVORITES";
      favorites: number;
    };

const productReducer = (
  state: ProductData,
  action: ProductAction,
): ProductData => {
  switch (action.type) {
    case "PRODUCTS":
      return { ...state, products: action.products };
    case "FAVORITES":
      let favorites = state.favorites;

      if (state.favorites.includes(action.favorites)) {
        favorites = favorites.filter((fav) => fav !== action.favorites);
      } else {
        favorites = [...state.favorites, action.favorites];
      }

      return { ...state, favorites };
    default:
      return state;
  }
};

const defaultValues: ProductData = {
  products,
  favorites: [],
};

const myProduct = {
  product: defaultValues,
  setProduct: (action: ProductAction): void => {},
};

const ProductContext = createContext<{
  product: ProductData;
  setProduct: React.Dispatch<ProductAction>;
}>(myProduct); //initialize context with default value

interface Props {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [product, setProduct] = useReducer(productReducer, defaultValues);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
```

- In the code above, we moved the logic for handling favorites into the `productReducer`.
- We initialized the `ProductContext` with a default value.
- We exported a `useProduct` function that exports `ProductContext`. If we don't export the `useProduct` function, we would have to call the `useContext` and pass `ProductContext` as its argument each time we want to consume the `ProductContext` data.
- We need to update our components (_index.tsx_, _favorites.tsx_, _product-list.tsx_, _product-item.tsx_ and _product-details.tsx_) to consume the data in the `ProductContext`.

```tsx title="src/pages/index.tsx"
import type { NextPage } from "next";
import ProductList from "components/product-list";
import Favorites from "components/favorites";
import { ProductProvider } from "context/product.context";

const Home: NextPage = () => {
  return (
    <div className="container">
      <main className="main-content">
        <ProductProvider>
          <Favorites />
          <ProductList />
        </ProductProvider>
      </main>
    </div>
  );
};

export default Home;
```

<br/>

<details><summary>Show the favorites.tsx file</summary>
<p>

```tsx title="src/components/favorites.tsx"
import Product from "types/product";
import { useProduct } from "context/product.context";

const Favorites: React.FC = () => {
  const { product } = useProduct();
  const myFavorites: Product[] = [];

  product.favorites.forEach((fav) => {
    const favorite = product.products.find((product) => product.id === fav);
    if (favorite) {
      myFavorites.push(favorite);
    }
  });

  return (
    <section className="favorites">
      <h2>My Favorite products</h2>
      {myFavorites.length ? (
        <ul>
          {myFavorites.map((favorite) => (
            <li key={favorite.id}>{favorite.title}</li>
          ))}
        </ul>
      ) : (
        <div>😂No favorite product!</div>
      )}
    </section>
  );
};

export default Favorites;
```

 </p>
</details>

<details><summary>Show the product-list.tsx file</summary>
<p>

```tsx title="src/components/product-list.tsx"
import React from "react";
import ProductItem from "components/product-item";
import { useProduct } from "context/product.context";

const ProductList: React.FC = () => {
  const { product } = useProduct();
  return (
    <section className="product-container">
      {product.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
```

 </p>
</details>

<details><summary>Show the product-item.tsx file</summary>
<p>

```tsx title="src/components/product-item.tsx"
import React from "react";
import ProductDetails from "components/product-details";
import Product from "types/product";

interface Props {
  product: Product;
}
const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductItem;
```

 </p>
</details>

<details><summary>Show the product-details.tsx file</summary>
<p>

```tsx title="src/components/product-details.tsx"
import React from "react";
import Product from "types/product";
import { useProduct } from "context/product.context";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const { product: productData, setProduct } = useProduct();

  const handleFavorite = (productId: number) => {
    setProduct({ type: "FAVORITES", favorites: productId });
  };

  const isFavorite = productData.favorites.includes(product.id);

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">{product.title}</div>
      </div>
      <div className="add-to-cart">
        <button
          type="button"
          className="button"
          onClick={() => handleFavorite(product.id)}
        >
          <span>{isFavorite ? "❤️" : "❤︎"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
```

 </p>
</details>

- If you reload the browser, the app should work as expected.

Our web application works as before, only this time the data is shared via the React Context API.

<br />

## Conclusion

The context API comes in handy when passing data from a parent component to its deeply nested descendants.

In a typical React app, you create context by invoking the built-in `createContext` function. It takes an initial value as an argument and returns a context object. The returned context object has a context provider and a context consumer.

You wrap your components in a context provider and use the `value` attribute to share the context with the nested components that need it.

The nested components can access the context data using the `useContext` hook. The `useContext` hook takes the context object as argument.
