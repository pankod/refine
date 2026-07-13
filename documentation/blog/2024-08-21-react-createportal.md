---
title: A complete guide to the React createPortal API
description: We'll explore the React createPortal API, its advantages, disadvantages, and possible use cases.
slug: react-createportal
authors: joseph_mawa
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-12-react-createportal/social-2.png
hide_table_of_contents: false
last_update: 2024-09-05
---

**This article was last updated on August 21, 2024, to add sections on Best Practices for Using Portals and Testing Portals.**

## Introduction

The `createPortal` API is part of the React DOM. You can use it to flexibly render the children of a React component in another location in the DOM. Though you can render a portal in another location, it still behaves like any other React child component.

This behavior of the `createPortal` API makes it easy to create UIs such as tooltips, toasts, modals, and popups. This article will take a deep dive into the `createPortal` API. We will explore its advantages, disadvantages, and possible use cases.

## Complete guide to the `createPortal` API

As explained above, the `createPortal` API is part of the React DOM API. Therefore, before using it, you need to import it from `react-dom` like so:

```tsx
import { createPortal } from "react-dom";
```

Ordinarily, a React component and its children have a parent-child relationship, and all the children are nested within their parent after rendering.

However, with the `createPortal` API, a React component can render all or some of its children in another location in the DOM rather than the parent. The code below shows its function signature.

```tsx
createPortal(children, domNode, key?)
```

The `children` parameter of the `createPortal` function must be a React component, JSX, React Fragment, string, number, or an array of these.

The `domNode` parameter is the DOM Node in which you want to render the `children`. You can use the `document.getElementById` method or any of the element-lookup methods of the `document` object.

The last parameter is an optional key. It is a unique string or number that will be used as the portal's key.

The `createPortal` function returns a React Node. Therefore, you can return it from a React component or render it inside another component's JSX, as in the example below.

```tsx
import { createPortal } from "react-dom";

export function PortalDemo() {
  return (
    <div>
      <p>This child is placed in the parent div.</p>
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body,
      )}
    </div>
  );
}
```

When you render a component using the `createPortal` API, only the rendering of the component in the DOM changes. Everything else remains the same. The events generated from the portal will bubble in the React Node hierarchy not in the DOM hierarchy.

Though a portal is rendered in a different location in the DOM, it is still a child of the parent React Component that renders it. It re-renders whenever the props or context passed to it changes, and its parent re-renders.

## Pros of the `createPortal` API

There are several benefits of the `createPortal` API. Below are some of these benefits.

### Rendering an element in another location in the DOM

The biggest benefit of the `createPortal` API is that it gives you the flexibility to render an element outside its parent in another DOM element therefore breaking out of the usual parent-child relationship between components.

This helps you to easily build certain UIs, such as tooltips and modals which might otherwise be difficult without portals.

### Integrating third-party packages into your project

More often than not, you may want to integrate third-party packages that do not use React in your React application. The `createPortal` API makes it easy because you can use it to render a React component anywhere in the DOM.

## Best Practices for Using Portals in React

I'd like to share some best practices for using the `createPortal` API in React with you and have some examples of code to explain those rules in practice.

### Simplicity Is Bliss

Make sure that the components you render are as simple as possible when working with portals. The complexity of portals can become very hard to maintain. Here's a simple modal example using `createPortal`:

```jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose }) {
  return createPortal(
    <div className="modal">
      <p>This is a modal.</p>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body,
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
```

### State Management

A better practice is to manage the state that affects the portal in the parent component rather than inside the portal itself. That way, all related logic is centralized within one place for easier debugging.

```jsx
function App() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Hover me
      </button>
      {showTooltip && (
        <Tooltip>
          <p>This is a tooltip</p>
        </Tooltip>
      )}
    </div>
  );
}
```

### Styling Consistency

Portals do not inherit styles from their parent component since the portal itself is outside of the DOM hierarchy of the parent. An example of passing styles directly into the portal:

```jsx
function Tooltip({ children }) {
  return createPortal(
    <div
      style={{
        position: "absolute",
        top: "50px",
        left: "100px",
        background: "black",
        color: "white",
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
```

### Accessibility

Ensure that accessibility is achieved. Use ARIA roles and attributes to ensure the portal content is accessible for proper interaction with screen readers.

```jsx
function Modal({ onClose }) {
  return createPortal(
    <div role="dialog" aria-modal="true" className="modal">
      <p>This is a modal.</p>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body,
  );
}
```

## Cons of the `createPortal` API

As hinted above, the `createPortal` API comes in handy when you're looking to render a component in a different location in the DOM. It is without doubt a very useful feature of the `react-dom` package and has very many useful applications.

However, the `createPortal` API is not without drawbacks. Let's explore its disadvantages in this section.

### CSS Inherited properties

Though a portal is still a child of its parent React component, it doesn't inherit CSS properties applied to its parent because it's rendered in a different location in the DOM. This may result in hard-to-find bugs, especially when dealing with complex portals.

In the example below, I'm applying `color: red` to the parent `div`. Ordinarily, the nested `p` elements inherit the `color` property from their parent. However, the `p` element rendered using `createPortal` won't because it is rendered in a different location in the DOM.

```tsx
import { createPortal } from "react-dom";

function PortalDemo() {
  return (
    <div style={{ color: "red" }}>
      <p>This will be red.</p>

      {createPortal(
        <p>This won't be red.</p>,
        document.getElementById("portal"),
      )}
    </div>
  );
}
```

Such behavior may result in bugs that may be difficult to trace, especially when dealing with complex applications.

### Complex portals are difficult to maintain

Portals may become difficult to maintain if you're dealing with complex interdependent portals. Similarly, it is difficult to reason about the components and the application because of the mismatch between the location of the portal in the DOM and where it is rendered in the React component.

### Accessibility issues

As we will discuss in the next subsection, the most common use-cases of the `createPortal` API are for creating toasts, modals, and popups. You will need to go above and beyond to make them accessible.

### Mismatch between location in the DOM and event bubbling

When you render an element in the DOM using `createPortal`, the events bubble up the React tree, not the DOM tree. The mismatch between the location of a portal in the DOM and event bubbling may make debugging a little more difficult in complex applications.

## Use cases of the `createPortal` API

As hinted above, the most common use-case of the `createPortal` API is for building UIs such as modals, tooltips, popups, and toasts.

The example below shows how to use portals to implement a basic modal in React. You can also implement tooltips, popups, and toasts pretty much similarly.

The example below is a basic illustration of the `createPortal` API without styling.

```tsx
import { useState } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose }) {
  return (
    <div className="modal">
      <p>This is a modal.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open modal.</button>
      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </div>
  );
}

export default App;
```

Furthermore, it is also possible to use the `createPortal` API to integrate React in a static page or a non-react application because it enables rendering React components anywhere in the DOM.

## Testing Portals in React Applications

I wanted to share some tips on testing React components using the `createPortal` API. This can be a bit tricky due to the way portals work—rendering outside the parent component's DOM hierarchy. Here are a few practices that should make it easier to test these components effectively.

### Make Sure the Portal is Displayed Properly

First of all, make sure that the portal content actually renders in the correct place of the DOM. The following is an example of how you might test this using React Testing Library:

```javascript
import { render } from "@testing-library/react";
import { createPortal } from "react-dom";
import Modal from "./Modal"; // assume you have a Modal component

test("renders modal in a portal", () => {
  const { getByText } = render(<Modal />);
  expect(getByText("This is a modal.")).toBeInTheDocument();
  expect(document.body).toContainElement(getByText("This is a modal."));
});
```

### Test Interactivity within the Portal

Test the interactions within the portal, such as how a modal would close after a button is clicked.

```javascript
import { render, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

test("should close modal on button click", () => {
  const onClose = jest.fn();
  const { getByText } = render(<Modal onClose={onClose} />);

  fireEvent.click(getByText("Close"));
  expect(onClose).toHaveBeenCalledTimes(1);
});
```

### Check Accessibility

If you're concerned about accessibility, you may test whether content in the portal is accessible to screen readers by testing for appropriate ARIA roles and attributes:

```javascript
import { render } from "@testing-library/react";
import Modal from "./Modal";

test("modal has correct accessibility attributes", () => {
  const { getByRole } = render(<Modal />);
  const modal = getByRole("dialog");
  expect(modal).toHaveAttribute("aria-modal", "true");
  expect(modal).toHaveTextContent("This is a modal.");
});
```

### Unmounting Test

Make sure that the portal content is properly unmounted once the parent component unmounts. This is very critical to clean up resources and prevent memory leaks.

```javascript
import { render, unmountComponentAtNode } from "react-dom";
import Modal from "./Modal";

test("unmounts portal on component unmount", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  render(<Modal />, div);
  expect(document.body).toContainElement(div);

  unmountComponentAtNode(div);
  expect(document.body).not.toContainElement(div);
});
```

## Conclusion

As explained above, the `createPortal` API is part of the React DOM API. It is for rendering the children of a React component in another location in the DOM.

Though a portal is rendered in another location, it behaves like any React child component. It re-renders when its state, props, or context changes and when the parent component re-renders.

The `createPortal` function takes the `children`, `domNode`, and an optional `key` as arguments and returns a React Node, which you can render in another React component or JSX.

You can use the `createPortal` API to create toasts, modals, tooltips, and popups such as cookie permissions popups. However, make sure any portal you create is accessible.
