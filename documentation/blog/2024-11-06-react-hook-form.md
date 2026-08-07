---
title: Essentials of Managing Form State with React Hook Form
description: This post covers the essentials of form state management with React Hook Form library.
slug: react-hook-form
authors: abdullah_numan
category: "Ecosystem / Integrations"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-26-react-hook-form/social.png
hide_table_of_contents: false
last_update: 2024-11-07
---

**This article was last updated on November 6, 2024 to include optimization techniques for managing large forms with useFieldArray() and strategies for integrating custom input components using the Controller API in React Hook Form.**

## Introduction

Forms are crucial part of web applications. Managing form data, overarching states, field level states, validations, errors and submission states are critical aspects of form management in data intensive web applications.

Form management from scratch in React typically involves the hype for using controlled form fields thanks to the JSX syntax and React's inherent re-rendering behavior with local state updates. Simple forms are easy to be built with a few states such as data, submission success, loading and error.

For more advanced form manipulation, we can use battle tested form management solutions like React Hook Form.

Steps we'll cover in this post:

- [What is React Hook Form ?](#what-is-react-hook-form-)
  - [How React Hook Form Works](#how-react-hook-form-works)
- [Starter Files: A Regular React Form](#starter-files-a-regular-react-form)
- [Better Form Management with React Hook Form](#better-form-management-with-react-hook-form)
  - [How to Build Advanced Forms with RHF `useForm()` Hook](#how-to-build-advanced-forms-with-rhf-useform-hook)
  - [React Hook Form: How to Configure and Use the `useForm()` Hook](#react-hook-form-how-to-configure-and-use-the-useform-hook)
  - [React Hook Form: How to Register a Field](#react-hook-form-how-to-register-a-field)
  - [React Hook Form: How to Display Validation Errors](#react-hook-form-how-to-display-validation-errors)
  - [Handling Submission in React Hook Formxx](#handling-submission-in-react-hook-formxx)
  - [Setting Default Values and Resetting Form Fields](#setting-default-values-and-resetting-form-fields)
  - [Watching Form Fields in React Hook Form with `watch()`](#watching-form-fields-in-react-hook-form-with-watch)
- [Large Forms in React Hook Form with useFieldArray()](#large-forms-in-react-hook-form-with-usefieldarray)
- [Making Custom Input Components with React Hook Form’s Controller](#making-custom-input-components-with-react-hook-forms-controller)

## Overview

In this post, in a small demo form, we play around with the essentials of [React Hook Form](https://react-hook-form.com/) and explore its capabilities in building highly performant form components. We first relate how a hooks based approach work in React Hook Form. And then demonstrate how to initialize an instance of a React Hook Form using the `useForm()` hook. We expound on the configurations and features of the form instance and while doing so, we discuss with examples the major APIs essential to functioning of a React Hook Form. We learn how to register a form field to the form's `data` object with the `register()` API and hook up the input element with its return props.

We focus on form field validations and cover object, string and boolean syntax that enables React Hook Form define and validate input data. We see with examples how to display validation errors for each field. We cover examples of handling form submission with the `handleSubmit()` method and implement submission lock with the `isValid` prop in `formState` object. We also elaborate with an example of the `setError()` API how to integrate server side errors inside React Hook form errors and display them in respective fields.

In the later half, we spare time to understand the benefits of configuring `defaultValues`and how to reset the form data using the `reset()` API from inside a `useEffect()` hook. We discuss how to subscribe to form data in React Hook Form with the `watch()` API and how this brings the downside of increasingrender count in a manner similar to React's native controlled input fields. We explore how to change validation strategies using the `mode` configuration (for example, on `onSubmit`, or on `onChange` form events). Towards the end, we relate to how schema validation libraries such as [Yup](https://github.com/jquense/yup) and [Zod](https://zod.dev/?id=introduction) works with React Hook Form.

## What is React Hook Form ?

React Hook form is a lightweight form management library that is used to build highly performant form compponents. It offers complete solutions for managing form data, state, field states, validation, error generation and third party schema integrations. It has a hooks based architecture that encapsulates the form state inside a context placed locally inside the host component

### How React Hook Form Works

React Hook Form exposes APIs for configuring and manipulating the state from within the component logic as well as via user initiated changes in the JSX elements.

#### React Hook Form `useForm()` Hook and Form Instance

React Hook Form uses a hook, the [`useForm()`](https://react-hook-form.com/docs/useform) hook, to instantiate a form instance inside a host component. The form instance comes with with necessary form props.

For example, the form instance include a `data` object that contains all registered field data. Other states such as `isValid`, `isDirty` `dirtyFields`, `isTouched`, `touchedFields`, `isSubmitting`, `isSubmitted`, etc., are part of the form's states.

Form states and behavior can be custom configured with a config object passed to `useForm()`. State and behavior are then accessed and manipulated with props / methods returned from the form instance. They include methods such as `register()`, `handleSubmit()` and `reset()`.

#### React Hook Form Configuration

For example, the form instance can be configured with validation strategies, error aggregation mode and default values:

```tsx
const formInstance = useForm({
  mode: "onChange",
  reValidateMode: "onSubmit",
  defaultValues: {
    title: "",
    subtitle: "",
    content: "",
    category: "",
  },
  criteriaMode: "all",
});
```

In the above snippet, the `formInstance` is set to run field validations on `onChange` of values, will revalidate each field on the form `onSubmit` event, has set default values for each field and with `criteriaMode: "all"` will gather all errors in a given field.

There are other config options such as `shouldFocusError`, `resetOptions`, `delayError`, etc. For details, explore the config [API docs here](https://react-hook-form.com/docs/useform).

#### React Hook Form: Essential APIs

The `formInstance` returned by `useForm()` come packed with methods and states to implement the form logic and UI. You can find the full list of [React Hook Form return props API here](https://react-hook-form.com/docs/useform/register).

For example, input field data can be registered to the form's `data` object by invoking the form instance's `register()` method:

```tsx
// Omitted component code

const formInstance = useForm({ mode: "onChange" });

// Omitted component code
return <input {...formInstance?.register("title", { required: true })} />;
```

The most sought React Hook Form APIs are:

- [`register()`](https://react-hook-form.com/docs/useform/register): registers a field to the form's `data` object with a name, validation rules, error message and values.
- [`formState`](https://react-hook-form.com/docs/useform/formstate): represents details of the form's state. Includes props such as `errors`, `isValid`, `isDirty`, `dirtyFields`, `isTouched`, `touchedFields`, `isSubmitting`, `isLoading`, etc.
- [`handleSubmit()`](https://react-hook-form.com/docs/useform/handlesubmit): called on the form submit event. It accepts a callback which is passed the form `data` object.
- [`watch()`](https://react-hook-form.com/docs/useform/watch): helps turn a field into a controlled field, subscribe to its changes and perform re-renders on the `onChange` event.

The above listed APIs handle easily more than what we would implement from scratch. And the rest of the APIs help build advanced feature rich form experiences.

For the purpose of this demo, we are using these essential ones. And we are also going to use [`reset()`](https://react-hook-form.com/docs/useform/reset) to reset form fields and [`setError()`](https://react-hook-form.com/docs/useform/seterror) to integrate server side errors to existing form field errors.

#### React Hook Form: Standout Features

These APIs, and most other state-of-the-art solutions offered by React Hook Form are also implemented by similar form libraries like [Formik](https://formik.org/docs/overview). However, React Hook Form offers clear advantage over others in terms of performance, developer experience and user experience.

Performance enhancement in React Hook happens in the following ways:

- React Hook Form prioritizes on uncontrolled input implementation. This means, form fields are uncontrolled by default, in contrast to the React hype of controlling all input fields. "Uncontrolled first" approach leads to better performance as no re-renders happen due to changes in form values.
- Form fields can be controlled to some degree on demand and individually. This is possible because React Hook Form isolates re-renders of form fields from value updates. And hence reduces unnecessary re-renders unless demanded otherwise.
- Form data subscription in React Hook Form is managed through a proxy which works to minimize re-renders in unrelated fields due to updates in a certain field. This is perhaps React Hook Form's silver bullete for improving performance through minimizing unnecessary re-renders.

**Developer Experience:** In terms of developer experience, React Hook Form helps implement feature rich forms with very little code. This is possible because React Hook Form internally handles all essential logic for form field data registration, validation, error messages, sever error integration and more, and leaves custom implementation to the developer.

**User Experience:** With respect to UX, enhanced performance with minimized re-renders and proper error feedback in forms enbuilt with React Hook Form offer positive user experience.

In the sections that follow, we are going to witness the essential aspects of what sets forms built with React Hook Form apart from others.

## Starter Files: A Regular React Form

We begin with a plain React form that involves regular controlled input fields, with plenty of unnecessary re-renders. In the sections ahead, we convert this controlled form to a RHF based form. While doing so, we cover the essential APIs of React Hook Form.

The starter files for this demo can be found in [this repo](https://github.com/anewman15/hf-demo). We suggest you clone and run it locally by following the instructions below:

1. Clone [this repository](https://github.com/anewman15/hf-demo) to a folder of your choice.
2. Install dependencies with the following `npm` command:

```bash
npm install
```

3. Run the app:

```bash
npm run dev
```

4. Navigate to `http://localhost:3000`. You should be presented with a controlled form that logs data to the console, on each value change:

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-26-react-hook-form/1.png" alt="shadcn ui" />
</div>

Play around with a bit to explore the limitations, such as unnecessary re-rendering displayed in the `Render count` board, absence of field value validation, no error reporting, etc.

The code for this form is contained inside the `App.js` component. It looks like this:

<details>

<summary>Show starter App.js code</summary>

```tsx title="./src/App.js"
import "./App.css";
import { useState } from "react";

let renderCount = 0;

function App() {
  renderCount++;

  const [formState, setFormState] = useState({
    data: {
      title: "",
      subtitle: "",
      content: "",
      category: "",
    },
    isLoading: null,
    isSuccess: null,
    errors: [],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      data: { title, subtitle, content },
    } = formState;

    if (title && subtitle && content) {
      setFormState({
        ...formState,
        isSuccess: true,
        errors: [],
      });
    } else {
      setFormState({
        ...formState,
        errors: [new Error("Please fill all form fields")],
        isSuccess: false,
        isLoading: false,
      });
    }
  };

  // console.log(formState);

  const onChange = (e) => {
    setFormState({
      ...formState,
      data: {
        ...formState.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-gray-950">
      <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <h1 className="mb-4 text-center text-2xl font-bold dark:text-gray-200">
          Create Post
        </h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4 block">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              onChange={onChange}
              value={formState?.data?.title}
              placeholder="Add title"
            />
          </div>
          <div className="mb-4 block">
            <label
              htmlFor="subtitle"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Subtitle
            </label>
            <input
              id="subtitle"
              name="subtitle"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              onChange={onChange}
              value={formState?.data?.subtitle}
              placeholder="Add a subtitle"
            />
          </div>
          <div className="mb-4 block">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              type="text"
              cols={40}
              rows={5}
              onChange={onChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              value={formState?.data?.content}
              placeholder="Add content here"
            ></textarea>
          </div>
          <div className="my-4 text-red-400">
            {formState?.errors?.map((error) => (
              <div>{error?.message}</div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="flex w-40 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Post
            </button>
            <div className="w-40 rounded-lg bg-red-600 p-2 text-center text-white">
              Render count: {renderCount}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
```

</details>

Notice the amount of code to build some rudimentary form features with just `errors`, `isLoading` and `isSuccess` states. Consider the pain dealing with destructuring the form field `data` object at different levels in order to update the values at every change. And imagine the memory consumed by every destructured copy between re-renders on each change in the form fields. Costly at multiple levels.

## Better Form Management with React Hook Form

With React Hook Form, we can build much better form experiences, both as a developer and as a user. Let's now begin making the changes for converting this React controlled form into a React Hook Form based one.

### Installing React Hook Form

First run the following command to install React Hook Form:

```bash
npm install react-hook-form
```

### How to Build Advanced Forms with RHF `useForm()` Hook

We are going to import and use the `useForm()` hook to instantiate a `formInstance` provided by React Hook Form. And then we are going to use the props and methods necessary for our form.

So, let's update the `App.js` component to this:

<details>

<summary>Show updated form code</summary>

```tsx title="./src/App.js"
import { useForm } from "react-hook-form";
import "./App.css";

let renderCount = 0;

function App() {
  renderCount++;

  const formInstance = useForm({
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-gray-950">
      <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <h1 className="mb-4 text-center text-2xl font-bold dark:text-gray-200">
          Create Post
        </h1>
        <form>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              {...formInstance?.register("title", {
                required: "Post title cannot be empty",
              })}
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add post title"
            />
            {formInstance?.formState.errors?.title && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.title?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subtitle
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add a subtitle"
              {...formInstance?.register("subtitle", {
                maxLength: {
                  value: 65,
                  message: "Keep subtitle shorter",
                },
              })}
            />
            {formInstance?.formState.errors?.subtitle && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.subtitle?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              type="text"
              cols={40}
              rows={5}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add content here"
              {...formInstance?.register("content", {
                required: "Content cannot be empty",
                minLength: {
                  value: 20,
                  message: "Content should have enough information",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Content has reached maximum limit of 1000 characters",
                },
              })}
            ></textarea>
            {formInstance?.formState.errors?.content && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.content?.message}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="flex w-40 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
            >
              Create Post
            </button>
            <div className="w-40 rounded-lg bg-red-600 p-2 text-center text-sm text-white">
              Render count: {renderCount}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
```

</details>

After the above changes, if you play around a bit with the form, you'll notice that the form now displays validation errors when the user fails to comply with the field rules:

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-26-react-hook-form/2.png" alt="shadcn ui" />
</div>

In the sections below, we make sense of the applied React Hook Form APIs for the changes.

### React Hook Form: How to Configure and Use the `useForm()` Hook

In the above changes, we first create an instance of the React Hook Form with the `useForm()` hook:

```tsx
const formInstance = useForm({
  mode: "onChange",
  criteriaMode: "all",
  shouldFocusError: true,
});
```

We also configure the form behavior with a config object passed with `mode`, `criteriaMode` and `shouldFocusError` properties.

Here's what they do:

- `mode: onChange` makes the form run field validations on every change made.
- `criteriaMode: all` collects all errors as opposed to the first error for a field so that they can all be displayed.
- `shouldFocusError: true` focuses on the first field where a validation error has been reported.

### React Hook Form: How to Register a Field

We are then registering the form fields with the `register()` method of the form instance. Registering a field is necessary in order for its value to be included in the `formInstance`'s `data` object. In React Hook Form, values of only registered fields get included in the form's `data` object.

The `register()` method has to be passed the name of the field and a validation rules object as arguments. For example, we are registering the `title` input field with a message for a `required` error in the following snippet:

```tsx
<input
  {...formInstance?.register("title", {
    required: "Post title cannot be empty",
  })}
/>
```

#### React Hook Form: How Registering a Field Works

The `register()` method in React Hook Form, returns an object with the `onChange`, `onBlur`, `name`, `ref` props. These are native properties of the JSX `<input />` element. React Hook Form provides corresponding values for each of these props, including handlers for `onChange` and `onBlur` events.

These props are then passes to the `<input />` elements to effectively spy on and run validations on the changes happening to the field. Additionally, React Hook Form sets a data field on the form's `data` object with the name passed to `register()` as key and the field value as its value:

```tsx
// RHF `data` property

{
    title: "Ali MacDonald has a form",
}
```

#### React Hook Form: How to Set Validation Rules

We have to set validation rules while registering a form field. React Hook Form provides validation with support for its own standard set of options. These include `required`, `maxLength` and `minLength` with their related syntax.

Validation options can be set with both explicit and implicit syntax. For example, an explicit syntax for `minLength` and `maxLength` rules takes an object shape to define `value` and error `message` properties:

```tsx
{...formInstance?.register("content", {
    required: "Content cannot be empty",
    minLength: {
    value: 20,
    message: "Content should have enough information"
    },
    maxLength: {
    value: 1000,
    message: "Content has reached maximum limit of 1000 characters",
    }
})}
```

Notice how `required` does not need an explicit `value` - `message` specification. Implicit definition is enough in this case.

In cases where we don't need an error message, we can use the Boolean syntax:

```tsx
<input
  {...formInstance?.register("title", {
    required: true,
  })}
/>
```

Notice also that, React Hook Form allows us to apply multiple validations, as needed according to our specifications.

### React Hook Form: How to Display Validation Errors

We can display the error message for individual fields by accessing the `errors` property of the `formState` object picked from `formInstance`: `formInstance.formState.errors`.

In our case we have done it for each field. For example, the `content` field errors are displayed with the following snippet:

```tsx
<textarea
  {...formInstance?.register("content", {
    required: "Content cannot be empty",
    minLength: {
      value: 20,
      message: "Content should have enough information",
    },
    maxLength: {
      value: 1000,
      message: "Content has reached maximum limit of 1000 characters",
    },
  })}
></textarea>;
// highlight-start
{
  formInstance?.formState.errors?.content && (
    <span className="text-xs text-red-500">
      {formInstance?.formState.errors?.content?.message}
    </span>
  );
}
// highlight-end
```

Notice, we have multiple validation rules for the `content` field. React Hook Form runs all field validations upon a change and presents the current error for us to display in the markup. This is crucial for user experience, as concurrent validation errors give the user a smoother form feedback, for example on the `onChange` event in our case.

### Handling Submission in React Hook Formxx

In React Hook Form, registered field data are accumulated in a `data` object with their `name` and field values. We handle submission of the form data with the `handleSubmit` method of the form instance.

Let's now deal with submitting the data by making changes to the form we have so far. Update the `App.js` to the following code with `formInstance.handleSubmit` passed to `onSubmit` event on `<form>` element:

<details>

<summary>Show  code</summary>

```tsx
import { useForm } from "react-hook-form";
import "./App.css";

let renderCount = 0;

function App() {
  renderCount++;

  const formInstance = useForm({
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-gray-950">
      <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <h1 className="mb-4 text-center text-2xl font-bold dark:text-gray-200">
          Create Post
        </h1>
        <form
          // highlight-start
          onSubmit={formInstance?.handleSubmit((data) => {
            console.log("data", data);
          })}
          // highlight-end
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              {...formInstance?.register("title", {
                required: "Post title cannot be empty",
              })}
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add post title"
            />
            {formInstance?.formState.errors?.title && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.title?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subtitle
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add a subtitle"
              {...formInstance?.register("subtitle", {
                maxLength: {
                  value: 65,
                  message: "Keep subtitle shorter",
                },
              })}
            />
            {formInstance?.formState.errors?.subtitle && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.subtitle?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              type="text"
              cols={40}
              rows={5}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add content here"
              {...formInstance?.register("content", {
                required: "Content cannot be empty",
                minLength: {
                  value: 20,
                  message: "Content should have enough information",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Content has reached maximum limit of 1000 characters",
                },
              })}
            ></textarea>
            {formInstance?.formState.errors?.content && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.content?.message}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <button
              // disabled={!formInstance?.formState?.isValid}
              type="submit"
              className="flex w-40 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
            >
              Create Post
            </button>
            <div className="w-40 rounded-lg bg-red-600 p-2 text-center text-sm text-white">
              Render count: {renderCount}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
```

</details>

#### The React Hook Form `handleSubmit()` Method

The React Hook Form `handleSubmit` handler takes a callback function which has the `data` object at its disposal to make a fetch request to backend API. The callback can be any function that implements a fetch call. It can use the JS native `fetch()` API, or React Query mutation, RTK Query or SWR request that implements a mutation with the collected data. The implementation is up to the specifications of your app.

In our case, for the demo, we are just logging the data to the console, but it demonstrates the point:

```tsx
<form
  // highlight-start
  onSubmit={formInstance?.handleSubmit((data) => {
    console.log("data", data);
  })}
  // highlight-end
>
  {/* form stuff here */}
</form>
```

Notice that, the submit handler locks submission if any of the fields fails validation. You can find this out in this demo when you have one or more form fields invalid and click to see that there is no data logged in the console. In other words, when `formInstance.formState.isValid` is `false` the form is not submitted.

#### Form Validation in React Hook Form: The `isValid` Prop

We can use the `isValid` property of `formState` to implement a submission lock button:

```tsx
<button
  disabled={!formInstance?.formState?.isValid}
  type="submit"
  className="flex w-40 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
>
  Create Post
</button>
```

The above snippet disables the submit button when the `formInstance` `formState` is invalid. And it gets enabled when it is `isValid`.

Thanks to React Hook Form's `formState` APIs like `isValid`, we can implement much superior, elegant and intuitive user experiences like this submission lock.

#### React Hook Form: Integrating Server Side Errors with `setError()`

The `setError()` method on React Hook Form form instance is a versatile method that can be used in numerous ways to add errors to the `formState`'s `errors` object. It can be used to set custom errors and additional errors besides field validation errors. One useful case is when we need to integrate server side errors into the form errors object.

For example, we can use the `setError()` method to integrate field level server side errors with a field specific implementation. In our demo form, we emulate the serverside action with an async timeout function and then use `setError()` to add a mock error to the `title` field:

```tsx
onSubmit={formInstance?.handleSubmit(data => {
    console.log("data", data);
    setTimeout(() => {
        formInstance?.setError("subtitle", { message: new Error("Server Error: Subtitle field is protected").message, })
    }, 2000);
})}
```

As you can see, we are setting a field level error that would occur in a backend service. This turns out to be very specific, as the error now gets displayed in the JSX `<span>` element, without demanding any change to the data or error particular to the field:

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-26-react-hook-form/3.png" alt="shadcn ui" />
</div>

### Setting Default Values and Resetting Form Fields

Let's now focus on setting default values of the form fields in React Hook Form. In the latest code in `App.js` below, we make necessary changes with default values and resetting them on page refresh:

<details>

<summary>Show latest App.js code</summary>

```tsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./App.css";

let renderCount = 0;

function App() {
  renderCount++;

  const formInstance = useForm({
    mode: "onChange",
    // highlight-start
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
    // highlight-end
    criteriaMode: "all",
    shouldFocusError: true,
  });

  // highlight-start
  useEffect(() => {
    formInstance?.reset();
  }, []);
  // highlight-end

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-gray-950">
      <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <h1 className="mb-4 text-center text-2xl font-bold dark:text-gray-200">
          Create Post
        </h1>
        <form
          onSubmit={formInstance?.handleSubmit((data) => {
            setTimeout(() => {
              console.log("data", data);
              formInstance?.setError("subtitle", {
                message: new Error("Server Error: Subtitle field is protected")
                  .message,
              });
            }, 2000);
          })}
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              {...formInstance?.register("title", {
                required: "Post title cannot be empty",
              })}
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add post title"
            />
            {formInstance?.formState.errors?.title && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.title?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subtitle
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add a subtitle"
              {...formInstance?.register("subtitle", {
                maxLength: {
                  value: 65,
                  message: "Keep subtitle shorter",
                },
              })}
            />
            {formInstance?.formState.errors?.subtitle && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.subtitle?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              type="text"
              cols={40}
              rows={5}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Add content here"
              {...formInstance?.register("content", {
                required: "Content cannot be empty",
                minLength: {
                  value: 20,
                  message: "Content should have enough information",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Content has reached maximum limit of 1000 characters",
                },
              })}
            ></textarea>
            {formInstance?.formState.errors?.content && (
              <span className="text-xs text-red-500">
                {formInstance?.formState.errors?.content?.message}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <button
              disabled={!formInstance?.formState?.isValid}
              type="submit"
              className="flex w-40 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
            >
              Create Post
            </button>
            <div className="w-40 rounded-lg bg-red-600 p-2 text-center text-sm text-white">
              Render count: {renderCount}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
```

</details>

#### React Hook Form: `defaultValues` Config

We've set the default values of the form fields by adding the `defaultValues` config to `useForm()`'s configuration argument object:

```tsx
defaultValues: {
    title: "",
    subtitle: "",
    content: "",
},
```

One important aspect of `defaultValues` is to include only the registered field names, because default values must reflect the form field values that make up the `data` object which gets submitted.

Proper assignment of the `defaultValues` object has a number of benefits. It is particularly useful for determining `isDirty` and `dirtyFields` props because a changed field gets compared to `defaultValues` for figuring out these props. In addition, with TypeScript, the shape of `defaultValues` is used to infer type of the form `data` object. Another advantage is, a `defaultValues` object can be used with the `reset()` API to reset the form values to `defaultValues`.

#### Resetting React Hook Form Fields with `reset()`

We can reset the form values using the `reset` method of the form instance. There can be many nuanced implementations according to specs, and React Hook Form's `reset()` API allows resetting a form in various ways, like from a button, on page reload, etc.

In our demo, for example, we have implemented reset of the form on the component mount with `useEffect()`:

```tsx
useEffect(() => {
  formInstance?.reset();
}, []);
```

This empties all the form fields every time the `<App />` component reloads.

There are numerous ways the `reset()` API can be used. Form example for resetting individual fields, resetting to a certain state, resetting to default values, resetting on a certain event, etc.

One caution, however, is to avoid resetting the form fields inside the submit handler callback passed to `handleSubmit()`, especially if it is an `async` handler. For example, it is suggested **_not_** to do this:

```tsx
<form
  onSubmit={formInstance?.handleSubmit((data) => {
    setTimeout(() => {
      console.log("data", data);
    }, 2000);
    // not safe
    // highlight-next-line
    formInstance?.reset();
  })}
><
```

This is because inside `async` callbacks to `handleSubmit()`, resetting form fields may erase the `data` object before they are passed to a fetch function and the mutation would malfunction.

### Watching Form Fields in React Hook Form with `watch()`

React Hook Form implements uncontrolled form fields by default. This is deliberately so for the sake of performance gains. React Hook Form offers some degree of control by allowing subscription to form field values. It's not clear though whether the form field values are totally controlled by reassignment everytime the subscribed values change, as in the case with the regular React implementation.

We can subscribe to form data using the `watch()` API. The entire form `data` object can be watched. Or individual fields of interest can also be watched. Watching form fields with the `watch()` API triggers re-renders, as it happens with pure controlled fields.

For example, we can watch the entire form data by injecting the watcher:

```tsx
const post = formInstance?.watch();
console.log(post);
```

Watching values like this have numerous use cases. One such case may be to send the data to a preview component:

```js
return (
  <>
    <form>{/*...*/}</form>
    <Preview post={post} />
  </>
);
```

It is also common to use the `watch()` API for collecting analytics about user entries.

Notice that when we call `watch()`, the render count increases when the form values change in any of the form fields. This is pretty much what happens with regular React controlled forms.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-26-react-hook-form/4.png" alt="shadcn ui" />
</div>

With React Hook Form, we can watch fields individually, by passing in the field name to `watch()`:

```js
const content = watch("content");
```

This way, when we only need to watch a specific field, we can prevent re-renders originating from other fields.

## Large Forms in React Hook Form with useFieldArray()

I noticed one pretty handy approach to handling big forms in React Hook Form, especially when dealing with dynamic lists or groups of fields that you want to add and remove as easily as possible. In fact, `useFieldArray()` from React Hook Form is meant for just that, and it enhances form performance by effectively handling arrays of fields.

### Using `useFieldArray()` for Better Performance in Large Forms

When we have forms that require users to add or remove multiple sets of input fields—like a set of addresses, items, or complex form sections—`useFieldArray()` can help manage those fields without causing too many re-renders. This is important for maintaining responsiveness of the form as the number of fields increases.

```javascript
import { useForm, useFieldArray } from "react-hook-form";

const LargeForm = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: { items: [{ name: "", quantity: 1 }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.name`)} placeholder="Item Name" />
          <input
            type="number"
            {...register(`items.${index}.quantity`)}
            placeholder="Quantity"
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", quantity: 1 })}>
        Add Item
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};
```

Key Points on `useFieldArray()`:

**Efficient Field Management:** This hook saves you the pain of managing dynamic field changes by keeping track of each field’s state in an array, which is helpful for repeating items. For example, in an order form, each item can be added, removed, or modified without causing a full re-render of the entire form.

**Better Performance with Reduced Re-renders:** React Hook Form optimizes this by re-rendering components that have field-specific dependencies rather than re-rendering the entire form each time an item is added or removed. This helps larger forms remain responsive, even with multiple field groups.

**Simple Integration for Dynamic Inputs:** The helper functions append and remove make it easy to add or remove fields. This makes useFieldArray() ideal for forms that need flexibility, like adding multiple addresses or filling out lists like skills or experiences in profile forms.

**Real-Life Applications:** This hook is useful for forms with repeated inputs, such as order forms, sections with child elements, or any scenario where users can dynamically add or remove entries. It reduces code overhead and keeps form logic organized.

Using `useFieldArray()` helps avoid issues common in large forms in React, like sluggish performance or excessive re-renders. If we’re building a complex form that requires dynamic input lists, this hook can save time and effort. Let me know if you’d like to go over it together or if you’re interested in more examples on different use cases.

### React Hook Form: Changing Validation Strategies with `mode` Config

So far, we have run the first validation on the `onChange` field event. We have achieved this with the `mode: onChange` configuration of the `useForm()` hook:

```js
const formInstance = useForm({
  mode: "onChange",
});
```

This makes the form run validations for individual fields when the value of the field is changed.

We can change this behavior to `onSubmit`, which triggers the first validation after the submit action is performed. You can test this behavior by making the changes accordingly:

```js
const formInstance = useForm({
  mode: "onSubmit",
});
```

`onSubmit` is also the default strategy, so for triggering first validation on form submission, we don't need to pass any `mode` configuration.

### Lower Render Count with React Hook Form

Throughout the demo, we have placed the `Render count` scorer in order to keep count of the re-renders happening in `App.js`:

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-26-react-hook-form/5.png" alt="shadcn ui" />
</div>

If you compare the render counts in the starter React controlled form with those in the React Hook Form version, you'll notice significantly reduced number of re-renderings due to form field changes in the React Hook Form version. React Hook Form leads to huge performance gains in forms.

Feel free to play around with both versions and examine the difference React Hook Form makes.

### Advanced Implementations with React Hook Form

In this post, we have covered essential APIs of React Hook Form that help implement average form features very conveniently. However, it is equipped with myriad of additional APIs that facilitate speedy development of more advanced features and robust reusable form components and collections.

#### Using Schema Validation Libraries

For example, we can implement complex validation rules by integrating schema validation libraries like [Yup](https://github.com/jquense/yup) and [Zod](https://zod.dev/?id=introduction).

Both Yup and Zod helps define form data schema and complex validation rules aligned with data shape available in a backend API. Zod has excellent support for TypeScript and come with compile time type checks for schema and data shape as well as their validation.

Schema validation libraries utilize their respective React Hook Form [resolvers](https://github.com/react-hook-form/resolvers) in order to properly interpret and run validation rules in a React Hook Form based component.

#### React Hook: Advanced Form Features

React Hook Form contain diverse form state props that represent different aspects of data in the field. Properties like `isDirty`, `dirtyFields`, `isTouched`, `touchedFields`, `isValid`, `submitCount` and so on provide in depth details about the states specific fields are in at a certain moment. While using the `reset()`, `resetField()`, `setError()` and `setValue()` APIs, together with options like `keepErrors`, `keepDirty`, `keepTouched`, `shouldFocus`, `shouldValidate`, `shouldTouch`, etc., we can implement more elegant, superior and intuitive form experiences.

We can use the `validate()` API, to define custom validation rules as we like. We can trigger validation programmatically using the `trigger()` API and so on.

#### Advanced Reusable Form Component with React Hook Form APIs

React Hook Form helps compose complex reusable components using the `<Controller />` and `<FormProvider />` components. `useController()` hook and `useFormContext()`, `useWatch()` and `useFormState()` and `useFieldArray()` are designed to implement robust reusable components. For example, Shadcn [`<Form />`](https://ui.shadcn.com/docs/components/form) components use React Hook Form APIs to compose reusable form components using TailwindCSS and Class Variance Authority and Radix UI primitives.

React Hook Form's `<Controller />` can be used to manage sophisticated controlled components in Ant Design, Material UI, React-Select, etc.

## Making Custom Input Components with React Hook Form’s Controller

If you’re working with a form in React and want to use custom input components—like third-party UI components that don’t natively support React Hook Form—Controller can be a big help. It lets us connect custom components to React Hook Form’s state while giving us full control over user input and validation.

### Why Use Controller?

React Hook Form is set up to manage inputs as uncontrolled by default. But custom or third-party components don’t always fit well with this approach. Controller acts as a bridge, enabling us to use these components while keeping React Hook Form’s state management, validation, and error handling intact.

Setting Up a Custom Input with Controller

Let’s walk through an example where Controller handles a custom input component like a date picker:

1. Setup with Controller: Wrap the custom component in Controller to manage registration, validation, and other form logic.
2. Handle Value Changes and Errors: Controller provides a field object with key props (onChange, onBlur, value, etc.) to sync the component’s state with React Hook Form. You also get fieldState for validation and error handling.

```tsx
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormWithDatePicker = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="date"
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field, fieldState }) => (
          <div>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              placeholderText="Select a date"
            />
            {fieldState.error && <span>{fieldState.error.message}</span>}
          </div>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

How Controller Works in This Setup

1. Field Management with field Props: The field object includes props like onChange, onBlur, value, etc., making it easy to sync the input’s internal state with React Hook Form’s data. In the example, selected={field.value} and onChange={(date) => field.onChange(date)} keep the date picker in sync with the form state.

2. Error Handling with fieldState: fieldState.error captures validation errors for the controlled field, allowing us to show error messages under the custom component. Here, if the date field is empty, “Date is required” will be displayed.

3. Enhanced Control and Flexibility: Controller also lets us handle custom behaviors—like validation rules, conditional formatting, or special component states—that can be hard to manage with default form inputs.

Real-Life Use Cases

- UI Libraries and Custom Components: Whenever using a third-party UI component (e.g., date picker, multi-select, slider, or toggle) that’s not natively compatible with React Hook Form, Controller makes it easy to integrate.
  -Complex Input Components: Controller is ideal for managing complex inputs that need special event handling, validation, and error messages for each component.

Controller is a great tool for managing custom components in forms while keeping everything in sync with React Hook Form’s state management.

## Summary

In this post, we converted a regular React controlled form to React Hook Form version. On the way, we explored the essential configurations and APIs of React hook form. We learned with examples how to instantiate a React Hook Form with `useForm()` hook, set its configurations by passing in the config options to the hook and used some return props to implement form field registrations and validations. We used the `register()` method for form field registrations and `handleSubmit()` method with a callback to see how form submission works in React Hook Form.

We also explored the use of `setError()` in setting and displaying serverside errors. We discussed the importance of using `defaultValues` in React Hook Form and learned how to use the `reset()` API for resetting form fields. We also learned how to subscribe to form fields with the `watch()` API. Towards the end, we talked about how React Hook Form helps implement advanced features and reusable form component libraries.
