---
title: React Props Explained with Examples
description: A detailed guide on React props with examples
slug: react-props
authors: chidume_nnamdi
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-16-react-props/social-2.png
hide_table_of_contents: false
last_update: 2024-07-10
---

**This article was last updated on July 10, 2024, to add sections for Dynamic Component Rendering and Performance Optimization with React Props.**

## Introduction

React.js is the backbone of modern web development. Almost all companies use it. This is because React is easy to install and use, has strong community support, and is still actively maintained by Facebook.

It has a plethora of simple features that made it incredibly powerful. One of those features is Props, and we are going to learn what it is in this article.

Props in simple terms are used for communication among components in React app. Component communication is a very essential feature that any framework based on component-driven design should have. Most popular frameworks like Angular and Vuejs have their own way of components passing data to each other.

In a component-drive framework, every single unit of the UI is made up of components. Now, each of these components might need to communicate data among themselves, so you see that this becomes a necessity to have in frameworks.
For example, we have the below components

```
Root

|
v
CompA CompB

|      |
v      v
CompC CompD

```

The Root component is root of the component tree, it renders the components CompA and CompB. They in turn render CompC and CompD. Let's say that CompD needs data to render and the data comes from CompB, we see that CompB must pass that data to CompD

```
Root

|
v
CompA CompB

|      | dataToRender: 90
v      v
CompC CompD
```

On the other hand, we might need to send data upward from a child to a parent.

```
Root

|
v
CompA CompB
        ^
|      | |dataToRender: 90
v      v
CompC CompD
```

## Props in React

Props are the main backbone of Reactjs, it is one of the basic features that made Reactjs awesome and powerful. Props in Reactjs are used for one-way and bidirectional way communication in Reactjs components.

Think of props as arguments to functions. Functions in JS are a group of codes that perform a task. We can have a function that returns the summation of `1` and `2`:

```tsx
function sum() {
  return 1 + 2;
}
```

This function returns the summation of 1 and 2. We can make this function to be flexible enough not to sum only 1 and 2 but to sum any two numbers. We will make it to accept two arguments.

```tsx
function sum(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
```

Here, now we can add two numbers:

```tsx
sum(1, 2); // 3
sum(90, 23); // 113
```

We are using the `sum` function passing to it what we need it to work with.
This is the same concept as "props" in React components. Components in React are JavaScript functions and ES6 classes. The arguments we pass to functions are now "props" in React Components.

React Components written as functions are known as Functional Components. While the ES6 components are known as Class Components.

Functional Components are basically JavaScript functions. Let's see an example:

```tsx
function FunctionalComponent() {
  return <div>Hello</div>;
}
```

We can now render it like this:

```ts
<FunctionalComponent />
```

Very simple.

Now, to pass props to a React Component, we pass them like attributes on an HTML element:

```ts
<img src="./image.jpg" width="120" height="90" alt="Example image" />
```

The attributes here are `src`, `width`, and `height`. The `img` uses them to render an image. So these attributes are just like passing arguments to a function.

So similar to the thing we do on a React component:

```ts
<ReactComponent data1="Hi" data2={20} />
```

The props here in the `ReactComponent` is `data1` and `data2`. So, the question is how do we get to access and use them in the `ReactComponent`?
Now, React gathers all the "attributes" in the Component and adds them to an argument object it passes to the Component it is being rendered.

```ts
function ReactComponent(props) {}
```

The `props` argument is an argument that React passes to its Components when they are being rendered(and updated too). The name is not just to be `props`, it can be anything. I was following naming conventions, the `props` name tells us it's a prop/property passed to the Component.

So, the "attributes" passed to the `ReactComponent` can be accessed as properties in the `props` argument. As we said before the `props` argument is an object.

```tsx
function ReactComponent(props) {
  typeof props; // "object"
  return null;
}
```

Now, we can access the `data1` and `data2` in the `props`

```tsx
function ReactComponent(props) {
  const data1 = props.data1;
  const data2 = props.data2;
  return null;
}
```

We can display the props:

```ts
function ReactComponent(props) {
  const data1 = props.data1;
  const data2 = props.data2;
  return (
    <div>
      <span>Data 1: {data1}</span>
      <span>Data 2: {data2}</span>
    </div>
  );
}
```

We can convert our first example of the `sum` function as a React Component. This is it:

```ts
function Sum() {
  return <div>{1 + 2}</div>;
}
```

We render it:

```
<Sum />;

// <div>3</div>
```

Let's make accept two numbers to sum and then display the result:

```ts
function Sum(props) {
  const firstNumber = +props.firstnumber;
  const secondNumber = +props.secondnumber;

  const result = firstNumber + secondNumber;

  return (
    <div>
      <span>
        Summing {firstNumber} and {secondNumber}{" "}
      </span>
      <span>{result}</span>
    </div>
  );
}
```

From this, we know now that we will pass the numbers we want to sum to the `Sum` component in `firstNumber` and `secondNumber` props.

```ts
//let's display the summation of 1 and 2:

<Sum firstNumber={1} secondNumber={2} />
```

The display will be this:

```
<div>
  <span> Summing 1 and 2 </span>
  <span>3</span>
</div>;
```

We can pass any data type as props in React components: object, array, boolean, number, string, function, etc.

Object

Yes, it is possible to pass objects to React components. Let's say you have the below object in a parent component and want to pass it to a child component so it can display the object's property values.

```ts
const user = {
  id: 0,
  name: "Chidume Nnamdi",
  age: 54,
};
```

We pass it to the component like this:

```ts
<DisplayUser user={user} />
```

Very simple.

Now, we can access the `user` prop in the `DisplayUser` component in the `props` object.

```ts
function DisplayUser(props) {
  const user = props.user;

  return (
    <div>
      <p>
        Name: <span>{user.name}</span>
      </p>
      <p>
        Age: <span>{user.age}</span>
      </p>
    </div>
  );
}
```

## Passing Array to React Component

Let's see how to pass an array to React components via "props".

Let's say we have this array of users:

```tsx
const users = [
  {
    id: 0,
    name: "Chidume Nnamdi",
    age: 54,
  },
  {
    id: 1,
    name: "Karim",
    age: 24,
  },
  {
    id: 2,
    name: "Bruno",
    age: 45,
  },
  {
    id: 3,
    name: "Ola Brown",
    age: 24,
  },
];
```

We have a component that displays a list of users. We want this component to receive an array of users via a `users` props. We pass the array to it like this:

```
<DisplayUsers users={users} />
```

Now, let's get the `users` from the `props` object and display the users.

```ts
function DisplayUsers(props) {
  const users = props.users;

  return (
    <div>
      {users.map((user) => (
        <div>
          <p>
            Name: <span>{user.name}</span>
          </p>
          <p>
            Age: <span>{user.age}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
```

Yes, simple.

## Passing Function to React Component

This may seem a bit complex, but yes, we can actually pass a function via props to a component.

Most function props are used to communicate data from a child component to a parent component. If you delve deep into Angular that's what it uses under the hood in its `@Output` decorator to pass data from child component to parent component.

Let's see a simple example:

```ts
function func() {
  console.log("Yes, I am a function");
}
```

Now, we can pass this function to a component, by setting its name as the value in props on a component.

```
<Component funcProp={func} />
```

Now, we can get this function in `funcProp` in the props argument.

```ts
function Component(props) {
  const funcProp = props.funcProp;
  funcProp();
  return null;
}
```

We will see `Yes, I am a function` in our Console tab.

## Default Props in React

Default props are props that the Component will fall back to when the props are not passed to the component.

Think of default props as default values set on an argument in a function.

Let's say we have this function:

```ts
function concat(str1, str2) {
  return str1 + str2;
}
```

Let's say we call the function passing only one param for the `str1`:

```
concat("Hello");
```

The second argument `str2` will be undefined and will get this result: `Helloundefined`. This is a bad result, we don't want `undefined` concatenated in our string if any of the arguments are missing. If any of the arguments are missing the only argument available should be concatenated with an empty string. So to do this we will set a default value to the `str2` like this:

```ts
function concat(str1, str2 = "") {
  return str1 + str2;
}
```

So now this:

```
concat("Hello");
```

will return this:

    Hello

We can also set the default value on the `str1` in case no arguments are passed when the function is called:

```ts
function concat(str1 = "", str2 = "") {
  return str1 + str2;
}
concat();
// ""
```

This is exactly what default props are all about. Let's say that this is our `DisplayUser` component:

```ts
function DisplayUser(props) {
  const user = props.user;

  return (
    <div>
      <p>
        Name: <span>{user.name}</span>
      </p>
      <p>
        Age: <span>{user.age}</span>
      </p>
    </div>
  );
}
```

That, we did not pass any `user` object to it via its `user` props.

```
<DisplayUser />
```

This will throw an error and will probably crash the application. So you see because of missing props the whole application went down. This is where default props come in to help.

Let's set default props on `DisplayUser` component. This is done by using the static property `defaultProps`.

```ts
function DisplayUser(props) {
  //...
}
```

Inside this object, we will set the default values of the props in the `DisplayUser` component.

```ts
DisplayUser.defaultProps = {
  user: {
    name: "",
    age: 0,
  },
};
```

To see that we set the `user` props inside the `defaultProps` object. This is will be the value of the `user` props when it is not passed to the component.

Let's see it in action:

```ts
<>
  <DisplayUser />
  <div>
    <p>
      Name: <span></span>
    </p>
    <p>
      Age: <span>0</span>
    </p>
  </div>
</>
```

The application didn't crash this time.

## Destructuring Props

Destructuring props in functional components will make your code cleaner and more readable. You simply access the props rather than through properties of an object.

Here's how you do it: The following example accesses the props just like we would do with properties of an object.

```tsx
// Without Destructuring
function MyComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// With Destructuring
function MyComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

The second example shows the direct deconstruction of props with properties such as name and age in the parameter list of the function to keep the code for the component nice.

## React children prop

The `children` prop is a special prop passed by React itself to components. This `children` contains the child node of a component. Let's see an example:

```ts
<DisplayUser user={user}>
  <>
    <Hello />
    <div>I am a child</div>
  </>
</DisplayUser>
```

We see that we have some elements rendered in between the `DisplayUser` component.

These elements are passed to the `DisplayUser` component in the `children` property of the `props` object.

```ts
function DisplayUser(props) {
 const user = props.user;
 const children = props.children;

 return ( // )
}
```

This `children` is a React Fiber Node that renders the element in between a component's tag. Let's render the child elements:

```ts
function DisplayUser(props) {
  const user = props.user;
  const children = props.children;

  return (
    <div>
      <p>
        Name: <span>{user.name}</span>
      </p>
      <p>
        Age: <span>{user.age}</span>
      </p>
      {children}
    </div>
  );
}
```

This will render this:

```tsx
<div>
  <p>
    Name: <span>{user.name}</span>
  </p>
  <p>
    Age: <span>{user.age}</span>
  </p>
  <div>Hello</div>
  <div>I am a child</div>
</div>
```

## Dynamic Component Rendering

I wrote a new section for our article: Dynamic Component Rendering with React Props. This is about rendering sections of the components depending on the value of the prop, and it is very useful in making components reusable and flexible.

Dynamic component rendering in React supplies you with a way to conditionally render different components or content, based on the props that are passed to a given component. This would be very useful in helping developers build flexible and reusable components under different use cases.

Here is an example of dynamic component rendering based on values of props:

```tsx
function DynamicComponent({ type }) {
  if (type === "A") {
    return <ComponentA />;
  } else if (type === "B") {
    return <ComponentB />;
  } else {
    return <DefaultComponent />;
  }
}
```

In this case, `DynamicComponent` receives a prop called `type`; depending on its value, it renders either `ComponentA`, `ComponentB`, or `DefaultComponent`. This allows you to write just one component that outputs differently based on the passed props.

## State vs Props

We have learned deep down what props are. Now, people often tend to confuse props with the state in React components. They differ completely, let's see their differences.

Props as we know are passed to components, and from one component to another. State on the other hand is not passed from one component to the other, it is passed within the component only. The state is local data used and maintained by one component only. Two components cannot use or maintain one state.

Props are immutable, which means that they cannot be modified. Once a props is passed to a component, that component cannot change the value of the props. State on the reverse is mutable. States can be changed at will in the component.

So props are read-only while states are read-and-write.
Props are used for communication uni-directional or bi-directional, while the state is used to render dynamic data in the component.

## Optimize Performance with Props

### Memoization via React.memo

A further good reason for using memoization will be that it avoids unnecessary re-renders of functional components when props did not really change. By using the `React.memo` wrapper, you can create a memoized version of a component which only re-renders when the props change.

In this example, `MemoizedComponent` will only re-render if the `name` prop changes, hence deriving great benefit in terms of performance since unwanted renders can be eliminated.

```tsx
import React from "react";

// Without memoization
function MyComponent({ name }) {
  console.log("Rendering MyComponent");
  return <p>Name: {name}</p>;
}

// With memoization
const MemoizedComponent = React.memo(function MyComponent({ name }) {
  console.log("Rendering MemoizedComponent");
  return <p>Name: {name}</p>;
});
```

### useCallback and useMemo Hooks

`useCallback` and `useMemo` are hooks for the memoization of functions and values, respectively. They help you to optimize and ensure the same function or value is not recreated on every single render, which can become quite important if you pass functions as props often.

```tsx
import React, { useCallback, useMemo } from "react";

function ParentComponent({ onClick }) {
  const memoizedCallback = useCallback(() => {
    onClick();
  }, [onClick]);

  const memoizedValue = useMemo(() => {
    return computeExpensiveValue();
  }, []);

  return <ChildComponent onClick={memoizedCallback} value={memoizedValue} />;
}
```

Here, `memoizedCallback` represents the memoized callback of function `onClick`, while `memoizedValue` represents a memoized value from expensive computation. You, of course, will use `useCallback` and `useMemo` so you make sure values are just recomputed upon each change of dependencies, hence avoiding poor performance.

## Conclusion

We have learned a great lot from this article.
We started by introducing the concept of component-driven design in JS frameworks and components communication in them. From there, we introduced Props in React and learned about these basic concepts.

Next, we learned examples of how to use props, and how to access them from the components. We learned also how to pass other data types(object, array, function, etc) via props to components. Next, we learned about default props and `children` props, how they work, and all that. Finally, we saw the comparison between state and props in React.
