---
title: React Hook Form vs Formik - Comparing the most popular React form libraries
description: This article will compare React Hook Form and Formik by highlighting their strengths and weaknesses.
slug: react-hook-form-vs-formik
authors: joseph_mawa
category: "Alternatives"
tags: [react, comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-30-compare-form-libraries/social-2.png
hide_table_of_contents: false
last_update: 2024-07-24
---

**This article was last updated on July 23, 2024, to add sections for Custom Validation and Accessibility Features.**

## Introduction

Forms are a handy feature for collecting data from users. Unfortunately, creating, styling, and validating forms is not always straightforward, especially when using front-end frameworks such as React. Fortunately, packages such as [React Hook Form](https://react-hook-form.com/) and [Formik](https://formik.org/) exist to simplify working with forms in React and React frameworks.

Among other benefits, most form libraries simplify working with forms by handling form validation and submission out of the box for you. Despite the advantages of using a library for form management, each library has strengths and weaknesses.

Formik and React hook form are among the most popular libraries for form management in the React ecosystem. This article will compare Formik and React hook form by highlighting their strengths and weaknesses. Hopefully, it will help you choose a form library that will meet your project's requirements.

## The most popular React form libraries

As mentioned above, there are several React packages that you can use when working with forms. However, React Hook Form and Formik are the most popular. We will explore the two libraries in this section. We will highlight how to use them and their pros and cons.

### React Hook Form

React Hook Form is another library for managing forms in React and React frameworks like Next and Gatsby. Similar to Formik, React Hook Form is a free, open-source library. It is MIT licensed. Therefore, you can use it pretty much any way you want.

You can use it to manage your form state and field validation. You can integrate it with some popular UI libraries like Material UI. As its name suggests, React Hook Form was built using React hooks. Therefore, you can't use it directly in class components.

#### How to use React Hook Form

You can install React Hook Form from the NPM package registry like any other package before using it. Run one of the commands below in an existing React or React Native project.

```sh
# npm
npm install react-hook-form

# yarn
yarn add react-hook-form
```

The code below shows a simple login form demonstrating the most basic usage of React Hook Form. In the example code below, we are using the `useForm` hook. It is one of the hooks that simplifies form management, and you will almost always use it when working with React Hook Form. The `useForm` hook takes an optional object as an argument and returns several methods.

The method worth mentioning is the `register` function. You can use it to register input elements and apply validation rules. It takes a unique input name string as the first argument and an optional object as the second. You can use the second argument to add input validation fields like the example below.

```tsx
import { useForm } from "react-hook-form";

export function Form() {
  const { register, handleSubmit, watch, formState } = useForm();

  const submitHandler = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: true, minLength: 4 })}
        />
      </p>
      <p>
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true, minLength: 10 })}
          required
        />
      </p>
      <button> Submit </button>
    </form>
  );
}
```

The example above is a basic illustration of React Hook Form. Do check out the React Hook Form documentation for more advanced features.

#### Pros of React Hook Form

- It is free and open source.
- React Hook Form has no dependencies and a small bundle size. It has a gzipped bundle size of 12.12KB, according to [bundlejs](https://bundlejs.com/).
- It is MIT licensed
- It is easy to pick up.
- Good documentation
- It is performant
- You can use it in both React and React Native.
- It validates form fields out of the box.
- It is in active maintenance.
- It has an active community.
- You can integrate React Hook Form with UI libraries like Material UI and [Refine](https://refine.dev/). With Refine, you can use the [@refinedev/react-hook-form](https://github.com/refinedev/refine/tree/main/packages/react-hook-form) adapter. You can handle forms using [`useForm`](https://refine.dev/core/docs/packages/documentation/react-hook-form/useForm/) hook in your Refine CRUD apps with React Hook Form.
- [Refer to article on using React Hook Form dynamic form fields with Refine](https://refine.dev/blog/dynamic-forms-in-react-hook-form/).

#### Cons of React Hook Form library

- React Hook Form uses React hooks. Therefore, you can't use it directly in class components.

### Formik

Formik is a free, popular open-source package for building forms in React and React Native. It has built-in features for managing form validation, error messages, and form submissions. It has a minimal API surface area. Therefore, it shouldn't be hard to start using, even for an absolute beginner to Formik.

It has over thirty thousand GitHub stars, two million weekly downloads on the NPM package registry, and is Apache 2.0 Licensed.

#### How to use Formik

Depending on your package manager of choice, you can install Formik in any React or React Native project using one of the commands below.

```sh
# npm
npm install formik

# yarn
yarn add formik
```

If you are not using a package bundler like webpack, you can also load it from the unpkg CDN using an HTML `script` tag like so:

```html
<script src="https://unpkg.com/formik/dist/formik.umd.production.min.js"></script>
```

The code below illustrates the most basic use of Formik for building a simple login form. The login form comprises text and email `input` fields. It uses the built-in `Form`, `Formik`, and `Field` components.

The `Formik` component is one of the built-in components you use when building forms with Formik. It internally uses render props. Therefore, you can pass a render prop to the `Formik` component or use it to wrap a child component. In addition to the render prop, the `Formik` Component also takes several other props you can look up in the documentation.

`Form` is another built-in component that wraps the HTML form element. Internally, it has access to the `onSubmit` prop and several other props you pass to `Formik`.

`Field` is a built-in component for adding `input` elements to your form. For a complete list of props it takes and how to use them, check the Formik documentation.

```tsx
import { Form, Formik, Field } from "formik";

export function LoginForm() {
  return (
    <>
      <h1>Login form</h1>
      <Formik
        initialValues={{ userName: "", password: "" }}
        onSubmit={(values) => console.log("values ", values)}
      >
        <Form>
          <p>
            <label htmlFor="username">Username</label>
            <Field id="username" required type="text" name="userName" />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <Field id="password" required type="password" name="password" />
          </p>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </>
  );
}
```

Formik leaves form validation to you. You can do it yourself or use a third-party library like [Yup](https://github.com/jquense/yup).

The above code illustrates a simple use case of the Formik library. It has several complex features for solving a variety of problems. Check the Formik documentation for all the other features I have not hinted at in this article.

#### Pros of Formik

- You can use it with both React and React Native.
- It is free
- It is performant
- It has a flexible licensing requirement. Released under the terms of the Apache License version 2.0
- It is lightweight. According to [bundlejs.com](https://bundlejs.com/), the gzipped bundle size of Formik is 44.34KB.
- It has excellent documentation.
- It is easy to pick up.
- It has bindings for popular UI frameworks like Ant design, Material UI, and Semantic UI.

#### Cons of Formik

- Formik is not actively maintained at the moment. The last Git commit to the project repository was a year ago. Similarly, there hasn't been any new version released for at least one year.

## Comparing Formik and React Hook Form

|                      | Formik                     | React Hook Form |
| -------------------- | -------------------------- | --------------- |
| Gzipped bundle size  | 44.34KB                    | 12.12KB         |
| Dependencies         | 7                          | 0               |
| GitHub stars         | 31.6k                      | 32.2k           |
| Active maintenance   | No                         | Yes             |
| Performance          | Good                       | Good            |
| Documentation        | Good                       | Good            |
| License              | Apache License version 2.0 | MIT             |
| NPM weekly downloads | 2.1 Million                | 2.7 Million     |
| Pricing              | Free                       | Free            |
| Community support    | Good                       | Good            |
| Open GitHub issues   | 635                        | 3               |
| Closed GitHub issues | 1497                       | 3528            |

## Custom Validation with React Hook Form

This would be a post to share some insights on how to apply custom validation in React forms using React Hook Form and Formik. I hope this simple guide will help all of us in our next project.

Custom validation is pretty easy using React Hook Form. We'll set up our validation rules using the register function directly on input fields. Here's an example:

```javascript
import { useForm } from "react-hook-form";

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", {
          required: "Username is required",
          validate: (value) =>
            value.length >= 4 || "Username must be at least 4 characters",
        })}
      />
      {errors.username && <p>{errors.username.message}</p>}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

In the above example, we put in place some custom validation messages for the username and email fields.

## Custom Validation with Formik

Formik also allows custom validation through its `validate` prop. We can write our validation logic inside a function and pass it to Formik. Here's an example:

```javascript
import { Formik, Form, Field, ErrorMessage } from "formik";

function MyForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Username is required";
        } else if (values.username.length < 4) {
          errors.username = "Username must be at least 4 characters";
        }
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="username" />
          <ErrorMessage name="username" component="div" />

          <Field name="email" />
          <ErrorMessage name="email" component="div" />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

In this case, we implemented custom validation for the `username` and `email` fields using a `validate` function.

## Implementing Accessibility Features in React Forms

I would like to share a few tips on how to implement the necessary accessibility features in our React forms with the help of React Hook Form and Formik. Accessibility is so important because it ensures our applications are accessible to everyone, including people with disabilities. Below are some guidelines with examples on how to enhance the accessibility of our forms.

### Accessibility with React Hook Form

With React Hook Form, form accessibility is just as easy. We should use semantic HTML elements and ARIA attributes where necessary. Here's an example:

```tsx
import { useForm } from "react-hook-form";

function AccessibleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          aria-invalid={errors.username ? "true" : "false"}
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <span role="alert">{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

In this example, we have used `aria-invalid` to indicate invalid fields and `role="alert"` to announce error messages to screen readers.

### Accessibility with Formik

Formik also supports accessibility enhancements. We should go ahead to support the same by the right use of semantic HTML elements and ARIA attributes. Here is an example:

```tsx
import { Formik, Form, Field, ErrorMessage } from "formik";

function AccessibleForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Username is required";
        }
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              name="username"
              aria-invalid={
                errors.username && touched.username ? "true" : "false"
              }
            />
            <ErrorMessage name="username" component="span" role="alert" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              aria-invalid={errors.email && touched.email ? "true" : "false"}
            />
            <ErrorMessage name="email" component="span" role="alert" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

In this example, we ensured all the form fields have proper labels and ARIA attributes so they can be more accessible. Implementing these accessibility features will make our forms more user-friendly.

## Conclusion

Form management is an area of web development that may be difficult to get right, especially when using front-end frameworks like React. The HTML5 built-in form functionality comes in handy when validating form fields, managing errors, and submitting forms.

However, solutions like Formik and React Hook Form also exist to simplify form management in React and React frameworks. Formik and React Hook Form are popular, free, open-source, mature, and battle-tested. They are both excellent packages for form management. You can use them alongside the native HTML5 form functionality.

On the flip side, judging by its commit and release history on GitHub, Formik is not actively maintained. While writing this article, the Formik GitHub repository has not had a recent Git commit or new release in the last year.

Additionally, Formik has a relatively larger bundle size than React Hook Form. According to [bundlejs](https://bundlejs.com/), the gzipped bundle size of Formik is 44.34KB, while that of React Hook Forms is 12.12 KB. Furthermore, Formik internally relies on seven dependencies, while React Hook Form has no dependency.

Given the pros and cons of both packages highlighted above, your best bet is React Hook Form when looking to use one of the two libraries in a new project. Hopefully, this article has given you insights into which form library to pick for your next project.
