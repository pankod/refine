---
title: How to use React Fragments?
description: We'll cover what React Fragments are, differences between React Fragments and Div elements.
slug: how-react-fragments-is-works
authors: clara_ekekenta
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-02-react-fragments/social-2.png
hide_table_of_contents: false
last_update: 2024-06-27
---

**This article was last updated on Jun 26, 2024, to add new advantages, use cases and common problems sections for React Fragments**

## Introduction

Returning multiple elements from a component has always been problematic for React developers.
This is because React depends on creating a tree-like structure that is used for reconciliation. Therefore, when multiple elements are returned in the render method, the algorithm used for reconciliation will not function as expected, and the presumption that the tree will have one root node for a component will no longer be valid.

React Fragment fixed this problem in version 16.2 of the library.

## What is React Fragment?

React Fragment is a feature in React that allows you to return multiple elements from a React component by allowing you to group a list of children without adding extra nodes to the DOM.

To return multiple elements from a React component, you'll need to wrap the element in a root element. This approach has not been efficient and may cause issues in some cases. Eg.

```tsx
function TableData() {
  return (
    <div>
      <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    </div>
  );
}

function Table() {
  return (
    <table>
      <tr>
        <TableData />
      </tr>
    </table>
  );
}
```

The above code will produce the HTML equivalent below.

```tsx
<table>
  <tr>
    <div>
      <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    </div>
  </tr>
</table>
```

So as you can see that wrapping the `<td>` tags in a `div` element breaks the table parent-child relationship. For things to work as expected, the `<td>` tags have to be rendered individually without wrapping them in a `div` element. In scenarios like this, it's better to use React Fragment.

## React Fragment vs Div Element

In React, "Fragment" and "Div" are used interchangeably. The main difference between the two is that "Fragment" clears out all extra divs from a DOM tree while "Div" adds a div to the DOM tree.

With React Fragments, we can create code that is cleaner and easier to read. It renders components more quickly and uses less memory. Every element is rendered as intended. While Div expands the DOM due to the long nested nodes that occur when there are too many HTML tags on your website.

The `div` element has more methods and properties, which causes it to consume more memory which can make the page slow load time; the prototype chain is like HTMLDivElement -> HTMLElement -> Element -> Node -> EventTarget, whereas the React fragment has fewer methods with the prototype chain DocumentFragment -> Node -> EventTarget.

Using fragments, you can reuse parts of your application. But, like in the table example we used in the previous section, div makes it challenging to do so. However, there are situations where using div instead of a fragment is necessary.

For instance, utilizing fragments does not allow you to design a component since you must wrap the target elements in a div. Additionally, you must use a div if you are adding keys to the components' elements. In light of this, you can use the two interchangeably depending on what you want your React application to accomplish.

## Problem with using div

Let's look at some of the problems in using div in detail.

- The div element expands the HTML DOM, causing the browser to consume more resources than expected.
- When the DOM is too large, it consumes a lot of memory, causing the pages to load slowly in the browser.
- Debugging and tracing the origin of the extra nodes becomes more difficult as the DOM grows larger and more nested.
- Using div to render components may cause performance issues by clogging your HTML.

## Advantages of Fragment

React Fragment replaces the `<div>` element, which can cause issues with invalid HTML, with the following advantages.

- The code readability of React Fragment is higher.
- Because React fragments have a smaller DOM, they render faster and use less memory.
- React Fragment allows React components to be rendered as intended without causing any parent-child relationship issues.
- Fragments allow the return of multiple JSX elements, which addresses the issue of invalid HTML markups within react applications that were caused by the must-have constraint of only one element returning per component.

### Limitations of React Fragments

I just wanted to point out a few things you should be aware of regarding React Fragments. Although they are great for grouping elements without having to add an extra node in the DOM, there are limitations to them.

First off, it is not possible to apply any CSS styles to a Fragment directly as Fragments are not fundamental DOM elements and do not render any actual element. This means that when you want to style a collection of elements, you are forced to still wrap them with a `<div>` or other such container element.

In the case of fragments, you can't use keys. That can sometimes be a little frustrating when you work with lists of children. Keys help React identify which items have changed or been added or removed. Without the ability to assign keys, managing dynamic lists becomes tricky.

Finally, when we do this cleanup of the DOM, sometimes Fragments make the JSX a bit harder to read if overused. It is essential that they be used wisely; not every `<div>` must be replaced with a Fragment just for it.

## Using the key prop with React fragments

In some cases, the key prop is required in a React application. In react, the key props are typically used to control component instances. React uses the key prop in scenarios like this to identify which items changed, removed, or added. Using the key props in a React application with fragments will be like the code snippet below.

```tsx
function TableData () {
  return  (
       {data.map(rec=>
        <React.Fragment key={rec.id}>
           <td>{rec.hobby}</td>
        </React.Fragment>
      )}
  );
}
```

## Using shortcut version

Aside from using React Fragment, React also provides a shorthand notation `<></>` to wrap multiple elements together that works similarly to React Fragment but with a lower memory load. In a react application, the shorthand notation `<></>` is implemented as follows.

```tsx
<function TableData () {
  return  (
    <>
      <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    <>
  );
}
```

The above code will produce the expected HTML equivalent below.

```tsx
<table>
  <tr>
    <div>
      <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    </div>
  </tr>
</table>
```

However, there are some drawbacks to this approach. For example, implementing the key props is impossible because the shorthand notation `<></>` will not work here. After all, it cannot take an attribute.

## Fragment in Action

Now let's see how fragments are used in a React application. In the example below, we'll use the React Fragment to render a list of items in a table.

```tsx
import "./App.css";
import React from "react";

const Table = ({ children, style }) => {
  return <div>{children}</div>;
};

const TableData = () => {
  return (
    <React.Fragment>
      <td>John Doe</td>
      <td>16</td>
      <td>Developer</td>;
    </React.Fragment>
  );
};

function App() {
  return (
    <Table>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Occupation</th>
      </tr>
      <TableData />
    </Table>
  );
}
export default App;
```

In the above code snippet, we created two components that we to be rendered in our application. In the render method, we used React Fragment instead of wrapping the elements in the TableData components in a div. This way, our table data will be rendered as expected.

### Other Use Cases for a React Fragment

React Fragments come in really handy when handling lists of elements, forms, and complex layouts. Using Fragments in a list would clean up the DOM, saving you from creating wrapper elements that are not needed for this to increase performance.

For forms, it helps ease the structure without adding more nodes because of multiple input elements. Furthermore, with complex layouts, when the nesting of elements is there, Fragments controls and manages the layout for proper handling and styling. Fragments make sure that the structure of a table is valid when the rows and cells of the table are being rendered; it ensures there are no layout-related problems.

React Fragments, conversely, help with conditional rendering because they enable you to return several elements depending on some conditions—but without adding nodes, which would make your DOM dirty and your components complex to read and maintain. In any case, the use of fragments in this context helps enhance the readability, performance, and maintainability of your applications.

### Common Problems and Solutions

Below are some common issues one is likely to face while working with React Fragments and how to resolve them.

#### 1. **Invalid HTML Structure**

**Issue:** My HTML structure is invalid when using Fragments.

**Solution:** Ensure there is no breakage of HTML rules; for example, if you place table cells (`<td>`) outside the table row (`<tr>`). Use fragments properly to maintain structural validity.

```jsx
function TableData() {
  return (
    <>
      <td>Eat</td>
      <td>Learn</td>
      <td>Code</td>
    </>
  );
}
```

#### 2. **Cannot Apply Styles**

**Issue:** I can't apply styles to a Fragment.

**Solution:** As fragments do not render any DOM elements, you can't apply styles directly. If you want to style these elements, wrap them in a `<div>` or some other appropriate container.

```jsx
function StyledComponent() {
  return (
    <div className="styled-container">
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}
```

#### 3. **Keyed Fragments**

**Issue:** I need to use keys with my Fragments, yet the short-hand syntax doesn't support it.

**Solution:** In cases where you need to pass keys, use the extended syntax for Fragments.

```jsx
function ListItems({ items }) {
  return (
    <>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <li>{item.name}</li>
          <li>{item.description}</li>
        </React.Fragment>
      ))}
    </>
  );
}
```

#### 4. **Fragment Overuse**

**Problem:** My JSX is getting hard to read as it has too many Fragments.

**Solution:** Use Fragments judiciously. Only use them when absolutely necessary to not unnecessarily convolute your JSX.

#### 5. **Unexpected Rendering Behavior**

**Problem:** Fragments of enclosed objects are not displayed as expected.

**Solution:** Confirm if your Fragments are correctly placed, and you haven't omitted any closing tags. Also see to it that you write your component logic correctly.

#### 6. **Debugging Problems**

**Issue:** Since the Fragments are not directly visible in the DOM, debugging becomes hard.

**Solution:** Use descriptive comments or temporary wrappers while debugging. Remove the wrappers once you've resolved the issues.

```jsx
function DebugComponent() {
  return (
    // <div> /* debugging temporary wrapper */
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
    // </div>
  );
}
```

## Conclusion

Throughout this tutorial, you've learned about React Fragment. We started by knowing what a React Fragment is and when to use it in a React application. Then we went further to demonstrate how it's used in a practical application.
