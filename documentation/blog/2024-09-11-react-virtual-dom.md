---
title: Understanding Virtual DOM in React
description: We'll dive into the concept of a virtual DOM in the React as well as explore its purpose.
slug: react-virtual-dom
authors: peter_osah
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-23-react-virtual-dom/social.webp
hide_table_of_contents: false
last_update: 2024-09-12
---

**This article was last updated on September 11, 2024, to add sections on Impact of Virtual DOM on Rendering Performance and Common Pitfalls with the Virtual DOM**

## Introduction

The virtual DOM (Virtual Document Object Model) is a programming concept in which a "virtual" representation of a user interface is preserved in memory and synchronized with the browser's DOM (Document Object Model) via a library.

The concept of the virtual DOM has been an integral part of various Javascript frontend frameworks, and it has been one of the things that make them efficient.
In this article, we will dive into the concept of a virtual DOM in the React Library as well as explore its purpose in React.

## What is the DOM?

When a webpage is loaded into a browser, the browser typically receives an HTML document for that page from the server. The browser constructs a logical, tree-like structure from the HTML to show the requested page to the client. The DOM refers to this `tree` structure.

The Document Object Model (DOM) is a logical tree that describes a document. Each tree branch terminates in a `node`, which holds an `object`.
Because the document on the browser has been parsed to a tree structure, methods that offer programmatic access to the tree, allowing one to change the structure, style, or content of a document, are required. This gave rise to the DOM API, which provides these methods for altering the elements represented as nodes in the tree.

## Drawbacks in updating the DOM

Making updates to the DOM using the DOM API is quick and efficient. However, there is a predominant issue with updating the DOM, which is:

**Performance issues**: When updating an element in a document, the updated element and its children must be re-rendered to update the application's UI. This re-rendering affects the website's or web application's performance. As a result, the more elements present in your website or web application, the more expensive the DOM updates may be, and the more frequent re-rendering of the DOM occurs.

## React's Virtual DOM Implementation

For the purpose of optimizing re-rendering on websites/applications, many JavaScript frameworks provide various approaches. However, React's approach is the idea of the virtual DOM.

React's virtual DOM implies a "**virtual**" representation (as a tree, as each element is a node that holds an object ) of a user interface, which is preserved in memory and synchronized with the browser's DOM via React's ReactDOM library.

### Components of the Virtual DOM

- **React Elements**: We will illustrate React Elements with an example as they are an integral part of the virtual DOM:

Consider a regular React component rendered with `JSX`:

```tsx
export const SampleComponent = () => {
  return (
    <div>
      <h1>This is the component header</h1>
      <p> This is the component paragraph</p>
    </div>
  );
};
```

We will console log this component.

```tsx
console.log(SampleComponent());
```

When we log this component, we get the value shown below:

```tsx
{
    "type": "div",
    $$typeof: Symbol(react.element)
    "key": null,
    "ref": null,
    "props": {
        "children": [
            {
                "type": "h1",
                "key": null,
                "ref": null,
                "props": {
                    "children": "This is the component header"
                },
                "_owner": null,
                "_store": {}
            },
            {
                "type": "p",
                "key": null,
                "ref": null,
                "props": {
                    "children": "This is the component paragraph"
                },
                "_owner": null,
                "_store": {}
            }
        ]
    },
    "_owner": null,
    "_store": {}
}
```

The code above implies that our `JSX` code has been parsed to a React element. A **_ReactElement_** is simply a representation of a DOM **_element_** in the **_Virtual DOM._**

This parsing is possible by `react/jsx-runtime` and `react/jsx-dev-runtime` (development mode) present in the React library.

A React Element consists of many fields. but our interest will be in the following:

- **$$typeof :** This field is represented by a `symbol`. React uses this field to identify a react element in the virtual DOM. As a result, any React element lacking that field may not be recognized as an element by React.
- **props**: This field contains the props values for your react component and its children.
- **props**.**children**: The children fields can both accept React elements and be `null` values.

for example we have a nested React component below:

```tsx
export const SampleComponent = () => {
  return (
    <div>
      <div>
        <h1>This is the component header</h1>
      </div>
      <p> This is the component paragraph</p>
    </div>
  );
};
```

When we log this component, the component's `props.children` property will be rendered as:

```tsx
{
    ...
    "props": {
        "children": [
            {
                "type": "div",
                "key": null,
                "ref": null,
                "props": {
                    "children": {
                        "type": "h1",
                        "key": null,
                        "ref": null,
                        "props": {
                            "children": "This is the component header"
                        },
                        "_owner": null,
                        "_store": {}
                    }
                },
                "_owner": null,
                "_store": {}
            },
            {
                "type": "p",
                "key": null,
                "ref": null,
                "props": {
                    "children": "This is the component paragraph"
                },
                "_owner": null,
                "_store": {}
            }
        ]
    }
}

```

**Events** can be represented in a React element. For example, we have a React component with an `onClick` and `onkeydown` event as shown below:

```tsx
export const SampleComponent = () => {
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          console.log("hello world");
        }}
        onKeyDown={() => {
          console.log("hello world");
        }}
      >
        <h1>This is the component header</h1>
      </div>
      <p> This is the component paragraph</p>
    </div>
  );
};
```

When we log this component, the component's `props.children` property will be rendered as:

```tsx
{
    "type": "div",
    "key": null,
    "ref": null,
    "props": {
        "children": [
            {
                "type": "div",
                "key": null,
                "ref": null,
                "props": {
                    "role": "button",
                    "tabIndex": 0,
                    "onClick": () => { console.log("hello world"); },
                    "onKeyDown": () => { console.log("hello world"); },
                    "children": {
                        "type": "h1",
                        "key": null,
                        "ref": null,
                        "props": {
                            "children": "This is the component header"
                        },
                        "_owner": null,
                        "_store": {}
                    }
                },
                "_owner": null,
                "_store": {}
            },
            {
                "type": "p",
                "key": null,
                "ref": null,
                "props": {
                    "children": "This is the component paragraph"
                },
                "_owner": null,
                "_store": {}
            }
        ]
    }
}
```

As mentioned, **_React element_** represents a DOM **_element_** in the **_Virtual DOM_**. This implies that the virtual DOM JavaScript `object` is simply a composition of nested React elements.

## React Virtual DOM vs. real DOM

The table below provides an overview of the distinctions between virtual and real DOM:

| Real DOM                                                                                                | Virtual DOM                                                                                        |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| when the actual structure of the web page (which is not lightweight) or document is represented by DOM. | The virtual DOM is a lightweight and in-memory representation                                      |
| Any change causes the entire DOM tree to be updated.                                                    | Any change only affects the corresponding node in the tree.                                        |
| It is an HTML abstraction of a page.                                                                    | It is an HTML DOM abstraction.                                                                     |
| It is capable of manipulating items on the screen.                                                      | It is unable to manipulate the elements displayed on the screen.                                   |
| Every modification updates the complete DOM tree, which is a laborious and slow operation.              | Because the update is tailored to the modified nodes, its update operation is quick and effective. |

## The Role of the Virtual DOM in React's Reconciliation

When new elements are added to a user interface, the virtual DOM is constructed. If the state of any of these elements changes, a new virtual DOM tree is produced.
This tree is then compared, or "**diffed**," with the preceding virtual DOM tree. This is done through the **diffing** algorithm.

The **diffing** algorithm is an `O(n)` heuristic algorithm predicated on two suppositions:

- Different trees will result from two different types of elements.
- Using a `key` prop, we can indicate which child items might remain consistent between renders.

When the **diffing** algorithm comes across **DOM elements of different types**, it does the following:

- It treats the two as distinct entities and removes the entire old DOM subtree.
- Following the new element type's specifications, the react diffing process then starts from scratch and builds a new DOM subtree.

When it comes across **DOM elements of same types**, it does the following:

- It preserves the current DOM node and only modifies the altered properties when it compares two components of the same type. This is an important aspect of the algorithm. Reducing the amount of manipulation required to update the actual DOM fosters efficiency.
- It guarantees that updates are displayed in the user interface while maintaining the current component and its state in this manner.

When it \*\*\*\*comes across React elements(components) of the same types, it does the following:

- It does not reject or replace existing component elements with new ones when it comes across component elements of the same type. Instead, it only updates the `props` supplied to the component instance, leaving it intact. This ensures that the component's state is maintained across renderings.

On handling recursion on the `children` of the React element, the **diffing** algorithm does the following:

- It simply iterates across both child lists concurrently, producing a modification each time there is a difference.

For the **diffing** algorithm, switching between these two trees is effective when adding an element at the end of the children:

```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

The algorithm can easily match the existing list and append the new list element to the tree.

However, in cases where there is an Insertion of an element at the beginning of the tree, as shown below:

```html
<ul>
  <li>Second</li>
  <li>Third</li>
</ul>

<ul>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ul>
```

This could inherently cause performance issues because rather than realizing, it can preserve the subtree values that didn't change (in this case, the `<li>Second</li>` and `<li>Third</li>` subtrees), the algorithm will alter every child.
To combat this, React provides support for a `key` attribute to address this problem. The algorithm matches the `children` in the initial tree with `children` in the succeeding tree using the `key` that the `children` have. To make the tree conversion more efficient, for instance, we can add a key to our previously inefficient example:

```html
<ul>
  <li key="Second">Second</li>
  <li key="Third">Third</li>
</ul>

<ul>
  <li key="First">First</li>
  <li key="Second">Second</li>
  <li key="Third">Third</li>
</ul>
```

It is now known to the algorithm that the elements with the keys `Second` and `Third` have moved, and the element with `First` is the new element.

**N/B**: One thing to note is that the key should be distinct and unique

After these are done, the Virtual DOM Representation of the application is passed to the `ReactDOM. render()` function in the application. To update the real DOM to its current state, the `render()` method makes the fewest feasible modifications by comparing the virtual and real DOM components and their offspring. It renders the updated HTML to the real DOM.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## How Virtual DOM Boosts Rendering Performance\*\*

I wanted to explain how the Virtual DOM helps improve React's rendering performance.

The React Virtual DOM can be thought of as a lightweight copy of the actual DOM. Whenever the state or props change, before making updates to the real DOM, React first updates the Virtual DOM, calculating the differences between the previous and current states—a process called **diffing**.

After identifying the differences, React only applies the necessary updates to the real DOM. This makes the rendering process more efficient since, instead of re-rendering the entire page, only the parts of the DOM that require changes are updated.

Here’s a simple example:

```tsx
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

In this case, clicking the button doesn’t cause the entire `<div>` to re-render. React only updates the `<p>` element that displays the count, thanks to Virtual DOM diffing. Without the Virtual DOM, making small, frequent changes that directly manipulate the real DOM would be inefficient for applications with complex UIs.

The Virtual DOM significantly reduces the cost of updating the UI, resulting in faster rendering and better performance—especially when there are frequent updates or many interactive elements.

**N/B:** The `ReactDOM.render()` function works differently from the regular `render()` function in class components. While `ReactDOM.render` ensures the update of the real DOM, `render()` in class components simply creates a React Element from JSX.

## React virtual DOM vs. shadow DOM

Is the virtual DOM the same as the shadow DOM? The quick answer is that they are quite different.

The Shadow DOM allows hidden DOM trees to be joined to ordinary DOM tree elements – this shadow DOM tree begins with a shadow root, beneath which you can attach any element, just like the standard DOM. This makes the shadow DOM very useful for creating web components.

For example, Consider the following HTML `input` element range:

```tsx
<div>
  <h1>This is the component header</h1>
  <input type="range" />
  <p> This is the component paragraph</p>
</div>
```

When we view the element with the browser's developer tools, we just see a simple `input` element. Internally, browsers encapsulate and hide the additional components and styles that make up the input slider.

To see the shadow DOM, utilize Chrome DevTools and enable the `Show user agent shadow DOM` option from `preferences` in `Settings`:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-23-react-virtual-dom/virtual-dom.png" alt="Virtual DOM update diagram" />
</div>

<br/>

```tsx
<input type="range">
  #shadow-root (user-agent)
  <div>
    <div pseudo="-webkit-slider-runnable-track" id="track">
      <div id="thumb"></div>
  </div>
</input>
```

**_A code snippet showing the shadow DOM of the input range function_**

Meanwhile, the virtual DOM is a lightweight representation of the DOM that optimizes updates to the real DOM.

## Common Problems with React Virtual DOM and How to Avoid Them

I wanted to share some common issues we might encounter with React’s **Virtual DOM** and how we can avoid them.

### Too Many Re-renders

- **Problem**: The Virtual DOM in React is designed for efficient rendering, but unnecessary re-renders can still cause performance issues.
- **Solution**: Use `React.memo()` or, for class components, `shouldComponentUpdate()` to ensure components only update when their props or state actually change.

```tsx
const MyComponent = React.memo(({ count }) => <p>Count: {count}</p>);
```

### Improper Use of Keys in Lists

- **Problem**: Failing to use **unique keys** for list items can cause inefficient updates and even break the app's behavior.
- **Solution**: Always assign a unique `key` to each element in a list. Avoid using array indices as keys unless you’re sure the list items won’t change positions.

```tsx
const items = ["Item 1", "Item 2", "Item 3"];
return (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
```

### Deeply Nested Components

- **Problem**: Too many nested components or a complex component tree can slow down the Virtual DOM’s diffing process.
- **Solution**: Keep the component structure as flat as possible and break large components into smaller, reusable ones. This improves React’s diffing efficiency.

### Avoiding Inline Functions and Objects

- **Problem**: Inline functions and objects create new references on each render, leading to unnecessary re-renders.
- **Solution**: Move functions and objects outside the component or use `useCallback` and `useMemo` to memoize them.

```tsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);

return <button onClick={handleClick}>Click Me</button>;
```

### Ignoring Performance Tools

- **Problem**: Not using React’s performance tools makes it difficult to identify performance bottlenecks.
- **Solution**: Use **React DevTools** to profile component updates and see which components are re-rendering unnecessarily. This helps pinpoint Virtual DOM-related performance issues.

## Real DOM vs. virtual DOM vs. shadow DOM

|                                    | Real DOM                                                                                                                                             | Virtual DOM                                                                                                                                                                                      | shadow DOM                                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Definition**                     | It is the representation of a document/webpage/web application's user interface as a tree data structure(node and objects).                          | It is a "virtual" representation of a the real DOM as a tree data structure(node and objects).                                                                                                   | The shadow DOM can be thought of as a "DOM within a DOM." It is a separate DOM tree with its own elements and styles, fully separate from the main DOM.                  |
| **usage**                          | The Real DOM is used in every browser.                                                                                                               | The virtual DOM is employed in many frontend frameworks and libraries like React, Vue, etc.                                                                                                      | Web components use the concept of shadowDOM.                                                                                                                             |
| **The purpose of each technology** | It provides a simpler, more programmatic method of representing web pages.                                                                           | The virtual DOM was created to address performance problems with webpages and web applications that resulted from the constant re-rendering of the whole DOM whenever DOM elements were updated. | The shadow DOM was designed to contain and isolate DOM elements, hence preventing direct DOM leakage of those elements and their dependent data.                         |
| **Implementation**                 | Implemented on the browser                                                                                                                           | utilized by frameworks and libraries such as, React, Vue, etc.                                                                                                                                   | implemented on the browser                                                                                                                                               |
| **Principle**                      | The DOM represents the document/webpage as nodes and objects, allowing programming languages like javascript to interact with the page using an API. | The virtual DOM is a tree representation of the real DOM using nodes and objects and is subsequently used as a blueprint to update the real DOM.                                                 | The shadow DOM doesn't comprehensively represent the whole DOM. Instead of adding DOM items to the main DOM tree, it inserts subtrees of DOM elements into the document. |

## Conclusion

We delved into React's virtual DOM in this article. Understanding the virtual DOM's operating principle is crucial for React developers. Knowing the virtual DOM's active principles from this post will improve your comprehension of React as a Javascript framework.
