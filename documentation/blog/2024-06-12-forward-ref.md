---
title: Ref Forwarding with React forwardRef
description: We discuss in detail how ref forwarding with React forwardRef works.
slug: react-forwardref
authors: abdullah_numan
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-12-forward-ref/social.png
hide_table_of_contents: false
---

## Introduction

This post is about the `forwardRef()` utility function in React. We discuss in detail how `ref`s work in React, why they need to be forwarded in functional components, and how `forwardRef()` is used to manipulate child DOM elements.

React `forwardRef()` is a utility function that helps convey `ref`s from a parent component to a child functional component. In a functional component in React, forwarding a parent's `ref`s is important as child functional components by default do not have a `ref` attribute and do not accept the parent's `ref` as a prop. `ref` forwarding from parent to a child functional component, among other uses, especially plays important role in manipulating DOM nodes in the child.

In this post, we explore what entails `ref` forwarding with `React.forwardRef()` and how this function is used in manipulating DOM elements as well as in higher-order components in React.

We first spend time to understand what the `ref` attribute in a React component stands for, and how to initialize a `ref` value in a parent component using the `useRef()` hook and the `React.createRef()` method. We expound on why functional React components fail to accept a `ref` prop from its parent and demonstrate with examples how the `forwardRef()` utility addresses this shortcoming. With a `<VideoPlayer />` example, we examine the internals of how `ref` forwarding works with the participation of a parent component that initializes a `ref` handle, a child functional component that acquires it and internally ties one of its DOM node to that handle by setting its `ref` attribute.

In the latter half of the post, we consider an example of `ref` forwarding in higher-order components and how `forwardRef()` is used in building reusable components in robust UI systems like Shadcn/ui. We also cover the benefits of using `forwardRef()`, and some of the associated pitfalls and best practices centered around `ref` forwarding.

Steps we'll cover in this post:

- [What is React forwardRef?](#what-is-react-forwardref)
- [Anatomy of Ref Forwarding with `React.forwardRef()`: A Video Player Example](#anatomy-of-ref-forwarding-with-reactforwardref-a-video-player-example)
- [React forwardRef: Advanced Examples](#react-forwardref-advanced-examples)
- [React.forwardRef: Benefits \& Best Practices](#reactforwardref-benefits--best-practices)

## What is React forwardRef?

`React.forwardRef()` is a React utility function that allows `ref` values from a parent component to be availed to a child **_functional component_**. The `ref`s are first created using `useRef()` or `createRef()` inside the parent. They are then forwarded and picked to manipulate a DOM node rendered inside the child JSX.

`React.forwardRef()` returns a component that can accept a `ref` prop, something the original functional component is not capable of doing. In other words, React `forwardRef()` enables a functional component to accept a `ref` prop and forward it to its internal JSX.

For example, in the following code, we are using the `forwardRef()` API for implementing `focus` on an `<input />` element:

```jsx
import React, { useRef } from "react";

export function Form() {
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current.focus();

  return (
    <div className="form">
      <Input label="Title" ref={inputRef} />
      <button className="button" onClick={handleClick}>
        Focus Title Field
      </button>
    </div>
  );
}

export const Input = React.forwardRef((props, inputRef) => {
  const { label, ...otherProps } = props;
  return (
    <div className="form-control">
      <label className="form-label">{label}</label>
      <input className="form-field" {...otherProps} ref={inputRef} />
    </div>
  );
});
```

### What are `ref`s in React?

`ref`s in React are understood in two levels: first, the JSX `ref` attribute and secondly, `ref` values initialized by an owner using the `useRef()` hook or the `createRef()` method on `React`.

#### The JSX `ref` Attribute

A `ref` in React is an attribute assigned to a JSX node. The `ref` attribute does not exist in HTML elements and is specific to JSX and React. Thus a `ref` attribute can be set on JSX elements. It can also be set on a React class component node:

```js
<input ref={refValue}> // ref attribute set on JSX elements

// OR
<AClassComponent ref={refValue} /> // ref set on a class component
```

:::tip[TIP: A `ref` value ties the current node to the value's owner]

The JSX `ref` attribute placed on a target component or element gives the `refValue` owner access to the JSX node.
The `refValue` is an object with a `current` property. The node is assigned to the `current` property and can be accessed by the owner via `refValue.current`:

```ts
const refValue = {
  current: HTMLElement,
};

const targetNode = refValue.current;
```

Then intended actions such as event handlers can be implemented on the node as necessary.

:::

#### `ref` Values in React

Secondly, `ref` values are initialized by an owner. They can be initialized using the `useRef()` hook or the `React.createRef()` method. A `ref` value is typically initialized or possessed by a parent component. When intended for a target JSX element, it can then get assigned to the `ref` attribute of the JSX node. Setting a `ref` value to the `ref` attribute of a JSX node allows the parent component to control it via its DOM APIs.

For example, in the following `<Input />` component, `inputRef` is set as a `ref` value of the `<input />` element:

```jsx
import { useRef } from "react";

export const Input = () => {
  // highlight-next-line
  const inputRef = useRef(null);

  // highlight-next-line
  const handleClick = () => inputRef.current.focus();

  return (
    <div>
      <div className="form-control">
        <label className="form-label">Title</label>
        // highlight-next-line
        <input className="form-field" ref={inputRef} />
      </div>
      // highlight-next-line
      <button className="button" onClick={handleClick}>
        Focus Title Field
      </button>
    </div>
  );
};
```

The `ref` value is then used to access and manipulate the `<input />` node, i.e. making it `focus` with the `handleClick` function.

:::note[Refs are React ways of getting a DOM element]

React `ref`s offer an escape hatch to get a handle over a child JSX or DOM nodes. They are React ways of getting a DOM node, something we achieve with `document.getElementById()` in plain JavaScript.

:::

Apart from storing a reference to a JSX or DOM node, a `ref` value can be used to store `string`s or `number`s data as well. They can be used for values that represent anything other than component / application state.

:::warning[WARNING: Do not use `ref`s for states]

It is strongly suggested **not** to use `ref`s for storing component states. This is because `ref`s do not trigger a re-render. And thus are not updated in the UI.

:::

### What Does `useRef()` Do in React ?

The `useRef()` hook is used to initialize a `ref`'s value (such as `inputRef` above) to be possessed by an owner component. The `useRef()` hook is used for initializing `ref` values, particularly in a functional component. As in the `<Input />` component above:

```jsx
import { useRef } from "react";

export function Input() {

	// highlight-next-line
	const inputRef = useRef(null); // Declaring a ref value

  return (
		// ...
  );
};
```

It is equivalent to the `React.createRef()` method that is used for initializing a `ref` value in class components.

### What Does `React.createRef()` Do in a Class Component

The `React.createRef()` method is used to initialize a `ref` value inside a class component. If we were to use a class component for implementing the same above `focus` functionality, it would be like this:

```jsx
import React, { Component } from "react";

export class Input extends Component {
  constructor(props) {
    super(props);
    // highlight-next-line
    this.inputClassRef = React.createRef();
  }

  handleClick = () => {
    // highlight-next-line
    this.inputClassRef.current.focus();
  };

  render() {
    return (
      <div>
        <div className="form-control">
          <label className="form-label">Title</label>
          // highlight-next-line
          <input className="form-field" ref={this.inputClassRef} />
        </div>
        // highlight-next-line
        <button className="button" onClick={this.handleClick}>
          Focus Title Field
        </button>
      </div>
    );
  }
}
```

Notice, that we have used the `React.createRef()` method this time to initialize a value for the `ref` attribute. This is so because the `<Input />` component now is a class component.

It is important to note that, in both the examples above, we haven't applied any `ref` forwarding. This is because, the `<input />` element is hosted as a direct child of the `ref` value owner, so no forwarding is necessary.

`ref` forwarding is needed when the target node by default does not get passed the owner's `ref`s, for example when rendered inside a child functional component.

### Why Ref Forwarding is Needed in React Functional Components

React adds the `ref` attribute out-of-the-box in JSX shadow DOM nodes. This happens by setting the `ref` attribute to DOM elements during component mount. The `ref` attribute can be custom-added to React class components as well. Setting a `ref` attribute is possible because class components and DOM elements have **instances**.

However, React functional components do **not** have instances since they are JavaScript functions. So, a React functional component cannot be assigned a `ref` attribute. This makes a `ref` value owner associate it to child functional components and any JSX node within them.

To overcome this, a child functional component needs to be enabled to accept a `ref` props and forward the `ref` **values** of the owner (typically a **parent** component). This is done by wrapping the functional component with the `React.forwardRef()` function. Doing so gives us an enhanced component that can be passed a `ref` prop.

### How `React.forwardRef()` Works

`React.forwardRef()` accepts a `render` function as its argument. The `render` function is **_always_** a React functional component:

```js
const EnhancedComponent = React.forwardRef(render);
```

Wrapping a child functional component with `React.forwardRef()` returns an enhanced component that can be passed a `ref` prop and conveys the accepted `ref` values to the `render` function's closure. This means the ultimate job of the `React.forwardRef()` function is to avail the parent's `ref` values to the child functional component:

```jsx
import React from "react";

export const Input = React.forwardRef((props, inputRef) => {
  // Use inputRef to set ref attribute of DOM node

  const { label, ...otherProps } = props;

  return (
    <div>
      <div className="form-control">
        <label className="form-label">{label}</label>
        // highlight-next-line
        <input className="form-field" {...otherProps} ref={inputRef} />
      </div>
    </div>
  );
});
```

And then inside the component's JSX, a target node (the `<input />` element above) gets associated with the parent by setting the target's `ref` attribute to the forwarded value (`inputRef`).

In other words, a parent node initializes a `ref` value (such as `inputRef`) somewhere else. A child functional component is wrapped with the `React.forwardRef()` function, which conveys the `ref` value to the function's lexical context. The functional component picks the `ref` value and internally associates a subnode of its own by setting the latter's `ref` attribute to the value. The functional component also accepts its usual `props` object.

The returned component then is equipped to be passed a `ref` prop when rendered inside the parent:

```jsx
import { useRef } from "react";

export function Form() {
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current.focus();

  return (
    <div>
      // highlight-next-line
      <Input label="Title" ref={inputRef} /> // The enhanced component now accepts
      a `ref` prop
      <button className="button" onClick={handleClick}>
        Focus Input Field
      </button>
    </div>
  );
}
```

## Anatomy of Ref Forwarding with `React.forwardRef()`: A Video Player Example

In this section, we elaborate on different aspects of forwarding a `ref` with `React.forwardRef()`. We consider a `<VideoPlayer />` component, that acts as the parent of a child functional component which returns a `<Video />` component after being wrapped with `React.forwardRef()`.

### The Parent Component

React `ref` forwarding involves a parent component that is the owner of the `ref` value. The parent in this example is the `<VideoPlayer />` component, which initializes a `videoRef`. It looks like this:

<details>

<summary>Show VideoPlayer component code</summary>

```jsx
import React from "react";
import { Video } from "./video";

export function VideoPlayer({ source }) {
  // highlight-next-line
  const videoRef = React.useRef(null);

  // highlight-start
  const playVideo = () => videoRef.current.play();
  const pauseVideo = () => videoRef.current.pause();
  // highlight-end

  return (
    <div className="video-player">
      <Video
        source={source}
        // highlight-next-line
        ref={videoRef}
      />
      <div className="video-controls">
        <button
          className="video-button"
          // highlight-next-line
          onClick={playVideo}
        >
          Play
        </button>
        <button
          className="video-button"
          // highlight-next-line
          onClick={pauseVideo}
        >
          Pause
        </button>
      </div>
    </div>
  );
}
```

</details>

### Using `useRef()` with `React.forwardRef()`

Since we are using a functional component for the parent, we are initializing the `videoRef` with `useRef()` hook:

```js
const videoRef = React.useRef(null);
```

### Pass `ref` Prop of Child Functional Component

Inside JSX, we have to then pass the `ref` prop of the child functional component (`<Video />`) to the initialized value:

```js
return (
  <Video
    source={source}
    // highlight-next-line
    ref={videoRef}
  />
);
```

We expect this to be possible because a `ref` prop will be enabled on `<Video />` thanks to `React.forwardRef()`. Normally, the `ref` prop here would be non-sense if `<Video />` is a plain functional component. Since we'll be wrapping `<Video />` with `React.forwardRef()`, `ref` gets recognized as a prop being forwarded internally.

### Controlling `ref` Target from the Parent

We are also defining two event handlers for controlling the target DOM node (a `<video>` element):

```js
const playVideo = () => videoRef.current.play();
const pauseVideo = () => videoRef.current.pause();
```

The necessity and perhaps the significance of `ref` forwarding is that we want to control the target from **_within the parent_**, without passing the event handlers down the DOM tree. Instead, we'd just pass along the `ref` value.

This way of control segregates the control-related nodes up the DOM tree from the target node further down. And helps keep the control nodes inside the parent component:

```js
// Control remains inside the parent <VideoPlayer /> component

<div className="video-controls">
  <button
    className="video-button"
    // highlight-next-line
    onClick={playVideo}
  >
    Play
  </button>
  <button
    className="video-button"
    // highlight-next-line
    onClick={pauseVideo}
  >
    Pause
  </button>
</div>
```

### The Child Functional Component with `React.forwardRef()`

The most important part of React `ref` forwarding entails conveying the `ref` attribute that is passed to the child functional component (`<Video />` inside `<VideoPlayer />` we saw above). In other words, the child component has to be wrapped with `React.forwardRef()`. As in the `<Video />` component below:

```jsx
import React from "react";

// highlight-next-line
export const Video = React.forwardRef((props, videoRef) => {
  const { source, ...otherProps } = props;

  return (
    <video
      {...otherProps}
      // highlight-next-line
      ref={videoRef}
      width="640"
      height="360"
      controls
      controlslist="play timeline volume"
    >
      <source src={source} type="video/mp4" />
    </video>
  );
});
```

Otherwise, `ref` gets passed to the child as a regular prop, and its `current` property is unintelligible.

Notice, the `ref` value (`videoRef`) is forwarded as a separate argument to the `render` argument of `React.forwardRef()`, and we can access it as so.

### React Ref Forwarding: Setting `ref` Attribute in a Target DOM Element

We have to then set the `ref` attribute of the target DOM node to the forwarded `videoRef` value:

```jsx
<video {...otherProps} ref={videoRef}></video>
```

Setting the `ref` attribute of the target node allows it to be controlled from the parent component. With this, now, we can trigger `playVideo` and `pauseVideo` functions from the `Play` and `Pause` buttons that are rendered inside the parent `<VideoPlayer />` component.

### Forwarding Refs from a React Class Component

Notice the parent `<VideoPlayer />` component. It is currently a functional component. However, the **parent** component involved in `ref` forwarding does **not** have to be a functional component.

:::note[NOTE: The child must be a functional component, the parent can be a class]

The child component must be functional as `React.forwardRef()` is intended to legitimize the `ref` attribute in the child functional component. But the parent can be a class component also.

:::

Below, we have a React class version of the parent `<VideoPlayer />` component that uses `React.createRef()` method to initialize `videoRef`, and all _classy_ stuff we don't use in functional React:

<details>

<summary>Show VideoPlayer class component code</summary>

```jsx
import React, { Component } from "react";

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    // highlight-next-line
    this.videoRef = React.createRef();
  }

  playVideo = () => {
    this.videoRef?.current?.play();
  };
  pauseVideo = () => {
    this.videoRef?.current?.pause();
  };

  render() {
    const { source } = this.props;

    return (
      <div className="video-player">
        <Video
          source={source}
          // highlight-next-line
          ref={this?.videoRef}
        />
        <div className="video-controls">
          <button
            className="video-button"
            // highlight-next-line
            onClick={this?.playVideo}
          >
            Play
          </button>
          <button
            className="video-button"
            // highlight-next-line
            onClick={this?.pauseVideo}
          >
            Pause
          </button>
        </div>
      </div>
    );
  }
}
```

</details>

## React forwardRef: Advanced Examples

In this section, we consider advanced use cases that utilize `React.forwardRef()`. We illustrate with an example, how to compose enhanced higher-order components in combination `React.forwardRef()`. We also discuss how `ref` forwarding with `React.forwardRef()` underpins mission-critical DOM manipulation mechanisms in robust UI libraries like Shadcn/ui and React Hook Form.

### Using `React.forwardRef()` in Higher Order Components

Higher-order components, or HOCs, are a React pattern for deriving enhanced versions from an existing component by extending their capabilities. In an HOC, features are added to a stable component by wrapping it inside a functional component that returns the enhanced version.

Forwarding `ref`s using `React.forwardRef()` inside a higher order component is a common pattern of adding features to `ref` controlled nodes.

Below, we extend our `<Input />` component by to display error messages using a `withErrorMessage()` HOC:

<details>

<summary>Show `withErrorMessage` HOC and related updates to `<Form />`</summary>

```jsx
import React, { useRef } from "react";

export function Form() {
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current.focus();

  return (
    <div>
      // highlight-next-line c{" "}
      <button className="button" onClick={handleClick}>
        Focus Input Field
      </button>
    </div>
  );
}

export const Input = React.forwardRef((props, inputRef) => {
  const { label, ...otherProps } = props;

  return (
    <div>
      <div className="form-control">
        <label className="form-label">{label}</label>
        <input className="form-field" {...otherProps} ref={inputRef} />
      </div>
    </div>
  );
});

const withErrorMessage = (Component) => {
  const EnhancedComponent = ({ error, ...props }, ref) => {
    const hasError = !!error?.message;

    return (
      <>
        // highlight-next-line
        <Component {...props} ref={ref} />
        {hasError && <div className="error-message">{error?.message}</div>}
      </>
    );
  };
  // highlight-next-line
  return React.forwardRef(EnhancedComponent);
};

// highlight-next-line
export const InputWithErrorMessage = withErrorMessage(Input);
```

</details>

Let's break down the `withErrorMessage` component HOC first:

```jsx
const withErrorMessage = (Component) => {
  const EnhancedComponent = ({ error, ...props }, ref) => {
    const hasError = !!error?.message;

    return (
      <>
        <Component {...props} ref={ref} />
        // highlight-start
        {hasError && <div className="error-message">{error?.message}</div>}
        // highlight-end
      </>
    );
  };
  // highlight-next-line
  return React.forwardRef(EnhancedComponent);
};

// highlight-next-line
export const InputWithErrorMessage = withErrorMessage(Input);
```

The `withErrorMessage()` higher-order component is designed with the `<Input />` component in mind. It accepts a `ref` forwarded component as an argument and frames a new `EnhanacedComponent` that is returned with its parent's `ref`s forwarded: `React.forwardRef(EnhancedComponent)`.

The exposed version of `EnhancedComponent` is stored in `InputWithErrorMessage`. It can be passed a `ref` from its parent and forwarded to `EnhancedComponent` along with its `props` and additional props (`error` here). It then adds desired features (the error message `div`) on top of the `<Component />` itself.

We can now render the `<InputWithErrorMessage />` component with all props passed to the original `<Input />` component, including the `ref` prop:

```jsx
<InputWithErrorMessage
  label="Title"
  error={{ message: "You got an error" }}
  ref={inputRef}
/>
```

In addition, we can also pass new props that affect the added features: i.e. the `error` object to display a message. Passing and displaying an error message like this can help `<Input />` component integrate with external form management libraries such as React Hook Form to display field errors.

Notice, that we did not need to make any change to the original `<Input />` component itself. If its content is stabilized in our codebase, we can leave it as it is. So, the composite HOC derived with `React.forwardRef()` contributes to code stability, reusability, maintainability, and growth.

### `React.forwardRef()` for Reusable Components

Composing robust reusable components with `React.forwardRef()` helps integrate with third-party libraries. For example, [React Hook Form](https://www.react-hook-form.com/api/useform/register/) relies on `ref`s extensively to internally set `ref` attributes to form fields by default.

Versatile design systems such as [Shadcn/ui](https://ui.shadcn.com/docs) build on top of React Hook Form `ref`s and make use of `ref` forwarding with `React.forwardRef()` to help produce collections of superior UI components.

For example, the internal implementation of a [Shadcn/ui `<Input />`](https://ui.shadcn.com/docs/components/input) component would look like this:

<details>

<summary>Show Shadcn/ui Input component code</summary>

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
```

</details>

Other Shadcn/ui components such as `<Form />` and related subcomponents also use `React.forwardRef()` to forward `ref`s from a parent to a target DOM node. You can check their implementations from the [`<Form />` docs here](https://ui.shadcn.com/docs/components/form#installation).

## React.forwardRef: Benefits & Best Practices

In this section, we discuss the benefits, use cases, and some best practices centered around `ref` forwarding in React.

### Benefits of using React `forwardRef()`

The most obvious benefit of React `forwardRef()` is that it enables the use of `ref`s in child functional components by allowing a `ref` prop. It also makes the value of the `ref` available to the function's internals. That way, React `forwardRef()` helps associate descendent DOM nodes to a parent component.

Useful consequences of this behavior are:

- Child DOM nodes can be targeted with a forwarded `ref` value.
- Offers a meaningful React way of targeting DOM nodes, by replacing native JavaScript APIs such as `document.getElementById()`.
- Parent component can manipulate DOM elements rendered inside a functional component.
- `ref`s forwarding can be combined with hooks, higher-order functions (HOCs), and render props patterns to compose robust and reusable components.

### React.forwardRef(): Use Cases

React `forwardRef()` mainly serves the purpose of exposing a DOM node with a `ref` to a parent. Common use cases involve triggering event-based actions such as:

- Focusing a node on an event.
- Scrolling to a node.
- Selecting a text.
- Triggering an animation.
- Triggering custom-defined actions, such as form field validations in React Hook Form-based forms.

### `React.forwardRef()`: Some Best Practices

React `ref` forwarding is associated with initializing `ref`s with `createRef()` and `useRef()`. So, we need to follow the best practices related to them as well as those around `forwardRef()`.

With regards to `ref` usage:

- We shouldn't overuse `ref`s.
- We should use `ref`s for imperative behaviors such as DOM event handling, animations, and so on.
- Never use `ref`s to replace states for updates that trigger a re-render.
- Use `ref`s to store mutable values that don't need the JSX to re-render.
- Use `ref`s as escape hatches that connect to external libraries and browser APIs such as DOM nodes.

While using `forwardRef()` we need to be aware of the pitfalls involved in forwarding `ref` values and setting the `ref` attribute:

- Make sure the `ref` gets properly initialized in the parent. Use `createRef()` in class components, and `useRef()` in functional components.
- Make sure to pass the `ref` prop to the enhanced child functional component returned from `React.forwardRef()`. Otherwise, there is no question of a `ref` being forwarded.
- Use the `React.forwardRef()` method with the `ref` value accepted as **_the second argument_**, not as part of the `props` object. Use it inside the component.
- Set the target DOM element's `ref` attribute to the forwarded value properly. Edge cases must be managed if they should be set conditionally. Otherwise, the target could be set to `null`.

## Summary

In this post, we discussed in depth how `ref` forwarding with `React.forwardRef()` works in React. We touch on the underlying concepts of the `ref` attribute and its values on a JSX node, how it is used to target a DOM node, and how functional components need to be introduced in a `ref` prop.

We delved into `ref` forwarding with a `<VideoPlayer />` example and investigated how `React.forwardRef()` makes it easy to implement custom controls on a `<video>` element by manipulating its DOM APIs from inside a parent component. Later on, with an `<InputWithErrorMessage>` component example, we examined how to write composite higher-order components with `ref`s forwarded with `React.forwardRef()`.

In the later part of the post, we explained how `React.forwardRef()` helps control DOM APIs of JSX elements needed by third-party libraries like React Hook Form and Shadcn/ui. Finally, we discussed the benefits and use cases of `React.forwardRef()` as well as some best practices to be maintained while implementing `ref` forwarding in React.
