---
title: TypeScript Record Type with Examples
description: We'll explore TypeScript Record type with examples.
slug: typescript-record-type
authors: abdullah_numan
category: "Tutorials"
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-16-typescript-record/social-2.png
hide_table_of_contents: false
last_update: 2025-01-09
---

**This article was last updated on January 6, 2025, to include sections on Common Mistakes with TypeScript Record and Tips for Using Record in TypeScript.**

## What is Record Type in TypeScript?

The `Record<>` utility type in TypeScript is typically associated with a record or a collection of records returned from an API endpoint. It helps define a type with property names such as `id` and map the values to the type of the data.

## Introduction

The `Record<>` type is a TypeScript object transformation type that is often used to derive stable object types for API data in an application. This is possible mainly because the property identifiers of the `Record<>` type are themselves types and the mapped value is also a type. As such, the `Record<>` type helps write error-free, maintainable and efficient code, and becomes increasingly useful when an application's API endpoints and versions start growing.

This post explores the TypeScript Record type with a series of examples ranging from simple strings and numbers based types to more common ones involving API data and React components. With the examples, we see how to derive `Record<>` types by assigning types for `Keys` and `Value`, discuss how a `Record<>` type is advantageous over simple object types and index signatures, and try to understand the quirks of its usage.

:::tip FAQs about TypeScript Record Type

- Q: What is the `Record<>` type in TypeScript?
  The `Record<>` type is useful in specifying an object whose keys and values have explicit types. Ensure type safety for dynamic objects.

- Can the `Record<>` type have keys other than `string`?
  Yes, for the keys we can use `string`, `number`, or `symbol`. All other types are prohibited for the keys.

- How does `Record<>` differ from the index signature?
  `Record<>` provides stricter type checking, while index signatures (`[key: string]: Value`) are more flexible but less type-safe.

- Can I use the `Record<>` type with React components?
  Yes, `Record<>` does work with JSX components as values. You can map component names or props to components.

- How do I constrain keys in a `Record<>` type?

You can define a union of allowed keys for the `Keys` type.

For example:

```ts
type Permissions = "Admin" | "User" | "Guest";
type PermissionMap = Record<Permissions, string>;
```

:::

## Understanding the Record Type

Starting easy, let's begin with a simple **object type** that represents a user:

```ts
type TUser = {
  email: string;
  password: string;
};

const user: TUser = {
  email: "example@example.com",
  password: "12345678",
};

console.log(user.email); // "example@example.com"
```

The object type is fine for typing a user. And we need it to base a record type on it.

We could also use an **index signature**:

```ts
type TIUser = {
  [s: string]: string;
};

const iUser: TIUser = {
  email: "example@example.com",
  password: "12345678",
};

console.log(iUser.email); // "example@example.com"
```

Not very insightful. This is because albeit acceptable, the index signature is a misrepresentation of the user data that has a well-defined shape in itself.

For API data like a `user`, a much more accurate representation is by constructing a member based on indexed table columns like `id`:

```ts
"3xamp1eUSERIdSTOR3DinAdb": {
    email: "example@example.com",
    password: "12345678",
};
```

This is crucial, especially in backend development for building RESTful APIs that use `id`s in query params to fetch data from API endpoints.

### Enter the `Record<>`

The TypeScript `Record<>` type helps reconstruct API data types into structured maps that are easier to handle:

```ts
type TUser = {
  email: string;
  password: string;
};

const user: Record<string, TUser> = {
  "3xamp1eUSERIdSTOR3DinAdb": {
    email: "example@example.com",
    password: "12345678",
  },
};

console.log(user["3xamp1eUSERIdSTOR3DinAdb"].email); // "example@example.com"
```

Now the type is a more structured hash map whose members can be plucked with the id.

Notice the `Record<Keys, Value>` is a generic. The `Keys` passed represents the type or union of types for the member name. And the `Value` is the type for the value of the property.

The important thing here is that we're still using the `TUser` type to base the record type on the actual shape of the data.

The derived Record type actually represents a collection of data:

```ts
const users: Record<string, TUser> = {
  "3xamp1eUSERIdSTOR3DinAdb": {
    email: "example@example.com",
    password: "12345678",
  },
  another3xamp1eUSERIdSTOR3DinAdb: {
    email: "another_example@example.com",
    password: "12345678",
  },
};

console.log(users["another3xamp1eUSERIdSTOR3DinAdb"].email); // "another_example@example.com"
```

### Union of Key Types

The transformed type above is unrestricted with respect to the number of items because we can add as many members as possible.

However, if we want to restrict the collection to a number of ids, `Keys` can have a union of types:

```ts
type TUser = {
  email: string;
  password: string;
};

type ActiveUserIds =
  | "3xamp1eUSERIdSTOR3DinAdb"
  | "another3xamp1eUSERIdSTOR3DinAdb"
  | "yetAnother3xamp1eUSERIdSTOR3DinAdb";

const activeUsers: Record<ActiveUserIds, TUser> = {
  "3xamp1eUSERIdSTOR3DinAdb": {
    email: "example@example.com",
    password: "12345678",
  },
  another3xamp1eUSERIdSTOR3DinAdb: {
    email: "another_example@example.com",
    password: "12345678",
  },
  yetAnother3xamp1eUSERIdSTOR3DinAdb: {
    email: "yet_another_example@example.com",
    password: "12345678",
  },
};

console.log(activeUsers["3xamp1eUSERIdSTOR3DinAdb"].email); // example@example.com
console.log(activeUsers["amongOther3xamp1eUSERIdsSTOR3DinAdb"].email);
/*
Property 'amonganother3xamp1eUSERIdSTOR3DinAdb' does not exist on type 'Record<activeUserIds, TUser>'. Did you mean 'another3xamp1eUSERIdSTOR3DinAdb'?(2551)
*/
```

Notice the `Keys` argument is now a union of `id` strings, which helps us restrict the members to only `activeUserIds`. This means that accessing users with ids that are not included, like `amongOther3xamp1eUSERIdsSTOR3DinAdb`, throws the above TypeScript `2551` error.

Union of keys types in `Record<>` is much more restrictive - in the sense that TypeScript considers the union strictly as a set. If we miss one item from the union as the map key, we get a `2741` error:

```ts
type TUser = {
  email: string;
  password: string;
};

type ActiveUserIds =
  | "3xamp1eUSERIdSTOR3DinAdb"
  | "another3xamp1eUSERIdSTOR3DinAdb"
  | "yetAnother3xamp1eUSERIdSTOR3DinAdb";

const activeUsers: Record<ActiveUserIds, TUser> = {
  "3xamp1eUSERIdSTOR3DinAdb": {
    email: "example@example.com",
    password: "12345678",
  },
  yetAnother3xamp1eUSERIdSTOR3DinAdb: {
    email: "yet_another_example@example.com",
    password: "12345678",
  },
};

/*
Property 'another3xamp1eUSERIdSTOR3DinAdb' is missing in type '{ "3xamp1eUSERIdSTOR3DinAdb": { email: string; password: string; }; yetAnother3xamp1eUSERIdSTOR3DinAdb: { email: string; password: string; }; }' but required in type 'Record<activeUserIds, TUser>'.(2741)
*/
```

This is not the case with the values though. For example, in the below code, the values include `TProjectManager` type and there is no such member in the map, and TypeScript acts as usual and does not complain:

```ts
// No error with missing a type in values.

type TUser = {
  email: string;
  password: string;
};

type TProjectManager = {
  phone: string;
  email: string;
  password: string;
};

type ActiveUserIds =
  | "3xamp1eUSERIdSTOR3DinAdb"
  | "another3xamp1eUSERIdSTOR3DinAdb"
  | "yetAnother3xamp1eUSERIdSTOR3DinAdb";

const user: Record<ActiveUserIds, TUser | TProjectManager> = {
  "3xamp1eUSERIdSTOR3DinAdb": {
    email: "example@example.com",
    password: "12345678",
  },
  another3xamp1eUSERIdSTOR3DinAdb: {
    email: "another_example@example.com",
    password: "12345678",
  },
  yetAnother3xamp1eUSERIdSTOR3DinAdb: {
    email: "yetAnother_example@example.com",
    password: "12345678",
  },
};
```

### Other Quirks

Among other quirks are the types allowed for keys and values.

**Allowed Types for Keys**

The types for `Keys` can only be `number`, `string` and `symbol`. Types other than these throw `2344` error at definition:

```ts
type numberedUser = Record<number, TUser>;
type stringUser = Record<string, TUser>;
type symbolUser = Record<symbol, TUser>;

type booleanUser = Record<boolean, TUser>; // Type 'boolean' does not satisfy the constraint 'string | number | symbol'.(2344)
type booleanUser = Record<object, TUser>; // Type 'object' does not satisfy the constraint 'string | number | symbol'.(2344)
```

**Allowed Types for Values**

Types for values can be of any type. `object`s and function types are common. This means, they can also be React components. Below, we see a React example.

## Using TypeScript `Record<>` with React Components

Now, we'll consider a more elaborate usage of the `Record<>` type using React components.

Let's say our user has permission to a few types of accounts, namely: `ProjectManager`, `Recruiter`, `Employer`. Each of these memberships has a dashboard page and we want to render a preview of each dashboard page somewhere inside a main dash page.

We can type the permissions and then define a `Record<>` type with values as `JSX.Element` like below:

```ts
type TPermissions = "ProjectManager" | "Recruiter" | "Employer";

type TDashBoardPreview = Record<TPermissions, JSX.Element>;

const dashboardPreviews: TDashboardPreview = {
  ProjectManager: <DashboardPreview type="ProjectManager" size="thumbnail" />,
  Recruiter: <DashboardPreview type="Recruiter" size="thumbnail" />,
  Employer: <DashboardPreview type="Employer" size="thumbnail" />,
};
```

We can then use the map inside main dash page.

## Common Mistakes and Best Practices

### Using Types Not Allowed for Keys

- Keys must be of type `string`, `number`, or `symbol`. Types like `boolean` are not permitted.

```ts
type InvalidRecord = Record<boolean, string>; // error
```

### Confusing Keys and Values

- It is easy for developers to think that `Record<>` enforces key and value constraints together, which is just not true. Remember `Keys` applies only to the names of the properties.

```typescript
type Example = Record<string, number>;
const data: Example = { key: "value" }; // Error: "value" is not a number
```

### Over-Complicating the Type

- If it's something you can dynamically generate with enums, or mapped types then don't manually define every key in a union.

### Best Practices

- Use `Record<>` when: - You need type-safe objects with dynamic keys.
- You must map keys to complex types, like objects, components or unions.
- You need a lightweight alternative to creating interfaces or types for objects with simple mappings.
- Use unions to constrain keys instead of an unnecessary flexibility being given.
- Validate API responses when using `Record<>` to map backend data.

## Summary

In this post we explored how to use the `Record<>` type in TypeScript to construct stable types that are error-prone and more maintainable. We saw how the derived type is a hash map based on a type that represents the actual shape of the data. It also accepts and assigns types to member keys of the map, which can be restricted by using a union type. We have seen an example of using `Record<>` to type `users` data for an API endpoint as well as one example that uses `Record<>` type for rendering React components.
