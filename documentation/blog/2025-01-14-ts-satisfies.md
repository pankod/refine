---
title: How to Use the TypeScript satisfies Operator
description: TypeScript classes are a superset of JavaScript classes. This post covers the fundamentals of type annotations in TypeScript Classes and their associated quirks.
slug: typescript-satisfies-operator
authors: abdullah_numan
category: "Tutorials"
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-15-ts-satisfies/social-2.png
hide_table_of_contents: false
last_update: 2025-01-14
---

**This article was last updated on January 14, 2025, to include best practices for using the TypeScript satisfies operator, a detailed table comparing satisfies with type annotations and assertions, and tips for avoiding common mistakes when validating nested object types, using utility types like Partial, and working with complex type structures.**

## Introduction

This post is about how to use TypeScript `satisfies` operator to effectively apply property value conformance in complex object types with nested properties.

TypeScript's `satisfies` operator comes with a few features that allow developers to check and validate the value of a variable against a given type. It was introduced in version `v4.9` specifically to match type of variable values after their assignment, rather than setting an annotation prior to it.

As of the features added to the current iteration (dating November, 2023), `satisfies` supports property value conformance, property name constraining and property name fulfillment -- largely associated with the `Record<>` utility type. It also allows optional member conformance with partial types transformed with `Partial<>`.

In this post, we get into the details of using TypeScript `satisfies` while validating types of property values in a fairly nested user (`joe`) object. We first consider how `satisfies` is focused on type checking and validation of variable values, rather than their annotation. We explore examples that further illustrate type validation of nested properties of objects - which we transform with the `Record<>` utility. We also understand how `satisfies` is geared to handle associated property name constraining and fulfillment that come with the `Record<>` type. In the end, we go through an example of partial member conformance with the `Partial<>` transformation utility.

Step by step, we'll cover the following:

- [What is the TypeScript satisfies Operator ?](#what-is-the-typescript-satisfies-operator-)
- [TypeScript satisfies - Checking for Property Value Conformance](#typescript-satisfies---checking-for-property-value-conformance)
- [TypeScript satisfies - Property Name Constraining](#typescript-satisfies---property-name-constraining)
- [TypeScript satisfies - Property Name Fulfillment](#typescript-satisfies---property-name-fulfillment)
- [TypeScript satisfies - Optional Member Conformance](#typescript-satisfies---optional-member-conformance)
- [Advanced Use: Combining satisfies with Utility Types](#advanced-use-combining-satisfies-with-utility-types)
- [Performance Implications and Best Practices](#performance-implications-and-best-practices)
- [FAQs About the satisfies Operator in TypeScript](#faqs-about-the-satisfies-operator-in-typescript)

### TypeScript Setup

Your JavaScript engine has to have TypeScript installed. It could be [**Node.js**](https://nodejs.org/en) in your local machine with TypeScript supported or you could use the [TypeScript Playground](https://www.typescriptlang.org/play#code).

### Prior Knowledge

The TypeScript concepts covered in this post range from Intermediate to Advanced. We assume you are already familiar with the following:

1. [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
2. Typing a variable in TypeScript. If you are not already familiar with this, please go through the examples [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables)
3. Typing an object literal in TypeScript. More [here](https://www.typescriptlang.org/docs/handbook/2/objects.html)
4. Utility types, particularly how to transform types with the [`Record<>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) and [`Partial<>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utilities. Feel free to get a refesher on all TypeScript utility types from the [docs here](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## What is the TypeScript satisfies Operator ?

TypeScript's `satisfies` operator is a syntax that helps developers validate the type of a variable's value after assignment. It does this by first matching the value to the type and then remembering the internals of the matched type, i.e. the properties and methods. As such, `satisfies` keeps track of the types of the nested property values, helps catching otherwise uncaught TypeScript errors, and complying deeply with nested property types as well. It is thus a syntax aimed specifically for validating types on nested property values of objects with certain degrees of complexity.

Here's a nested `joe` user object example:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Old Avenue",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // 12345
```

Notice in the example that, we have used `TUser` on `joe` for its value validation with `satisfies`. And `TUser` is a transformed record with `Record<UserKeys, string | TAddress>`

### TypeScript satisfies Leverages Contextual Typing

It is necessary to understand that type inference before assignment is different from type validation of the assigned value with `satisfies`. In other words, `joe` above has a contextual typing: its type is set to itself and then `satisfies` checks `joe`'s internals against it to validate the types for all properties and their values, including nested ones. You can find `joe`'s type when you hover over `joe`. You'll see this:

```ts
// joe's inferred type is the object itself

const joe: {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    postCode: number;
    city: string;
    state: string;
    country: string;
  };
};
```

### TypeScript satisfies - Annotated Type Has Precedence Over `satisfies` Type

When we explicitly annotate the variable `joe`, the annotated type gains precedence during type checking over the one passed to `satisfies`. We get errors indicating the annotated type's loose specificity on its nested properties. Notice the `2339` error when we annotate `joe` with `TUser`:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

// highlight-next-line
const joe: TUser = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // Property 'postCode' does not exist on type 'string | TAddress'. Property 'postCode' does not exist on type 'string'.(2339)
```

In the modification above, we are using the same `TUser` type for both annotating `joe` and for validating it with `satisfies`. Clearly, since annotating with `TUser` gains precedence, it doesn't keep track of the internal information we are trying to get from inside the `address` object nested in `joe`. TypeScript confuses the `TAddress` type with the other ones typed with `string`.

The point to be delivered here is that type inference or annotation of the variable declaration, `joe`, is not the same thing as type validation of its value with `satisfies`. And `satisfies` is not intended for annotation, but rather largely for validating conformance.

## TypeScript satisfies - Checking for Property Value Conformance

Annotating `joe` above with `TUser` prevents access to `joe.address` on the grounds of TypeScript's _typal dissonance_ between the union members: `string` and `TAddress`. Removing it and reinstating validation with `satisfies` restores clarity and access, because `satisfies` keeps track of the types of all property names and values at nested levels:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // 12345
```

Since we are using a number for `joe.address.postCode` above, `satisfies` correctly tracks it and no longer leads to the `2339` error.

## TypeScript satisfies - Property Name Constraining

Notice that we are using the `Record<>` utility to derive a record type for the user. TypeScript `satisfies` is generally used in conjunction with the `Record<>` type. And as you notice already, we are applying property name constraints to limit `TUser`'s keys with: `type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";`.

Due to this, property overloading is prevented. In the below version, `role` is not included in `UserKeys`, so we get a complain:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  lastName: "Hiyden",

  // Complains about property overloading
  // highlight-start
  role: "Admin", // Object literal may only specify known properties, and 'role' does not exist in type 'TUser'.(1360)
  // highlight-end
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
} satisfies TUser;

console.log(joe.address.postCode); // 12345
```

## TypeScript satisfies - Property Name Fulfillment

Similarly, if we have a missing property in `joe`, we get accused till we get all properties included:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  // lastName missing
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
  // Complains about missing property at `satisfies`
  // highlight-next-line
} satisfies TUser; //  Property 'lastName' is missing in type '{ username: string; email: string; firstName: string; address: { addressLine1: string; addressLine2: string; postCode: number; city: string; state: string; country: string; }; }' but required in type 'TUser'.(1360)
```

## TypeScript satisfies - Optional Member Conformance

Instead of mandatory property name fulfillment, we can force an optional member conformance with a `Partial<>` transformation. In the following update, there's no complains about any missing property (`lastName`). We are all good:

```ts
type TAddress = {
  addressLine1: string;
  addressLine2?: string;
  postCode: number | string;
  city: string;
  state: string;
  country: string;
};

type UserKeys = "username" | "email" | "firstName" | "lastName" | "address";
type TUser = Record<UserKeys, string | TAddress>;

const joe = {
  username: "joe_hiyden",
  email: "joe@exmaple.com",
  firstName: "Joe",
  address: {
    addressLine1: "1, New Avenue",
    addressLine2: "Mission Bay",
    postCode: 12345,
    city: "California",
    state: "California",
    country: "USA",
  },
  // highlight-next-line
} satisfies Partial<TUser>; // No complains about missing `lastName`
```

## Advanced Use: Combining satisfies with Utility Types

You know how we've been using satisfies to validate object types? Well, you can take it up a notch by combining it with other utility types like `Pick<>`, `Omit<>` and `Readonly<>` . These combos are super handy when you want more control over what parts of a type you're validating.

### Using satisfies with Pick

Let's say you only care about a couple of fields from a bigger type. With `Pick<>` and `satisfies`, you can validate just those fields:

```typescript
type TUser = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
};

type UserMinimal = Pick<TUser, "username" | "email">;

const minimalUser = {
  username: "joe_hiyden",
  email: "joe@example.com",
} satisfies UserMinimal;

console.log(minimalUser.username); // "joe_hiyden"
console.log(minimalUser.email); // "joe@example.com"
```

See? We only checked username and email, and ignored everything else. Clean and simple!

### Using satisfies with `Omit<>`

Now, imagine the opposite: you want to skip certain fields. Enter `Omit<>` . Here's how it works:

```typescript
type TUser = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
};

type UserWithoutAddress = Omit<TUser, "address">;

const userWithoutAddress = {
  username: "joe_hiyden",
  email: "joe@example.com",
  firstName: "Joe",
  lastName: "Hiyden",
} satisfies UserWithoutAddress;

console.log(userWithoutAddress.firstName); // "Joe"
```

Boom! No address field needed, but everything else is validated. This trick is a lifesaver when working with partial data.

By combining satisfies with utility types like `Pick<>` and `Omit<>`, you can create more focused and efficient type validations, keeping your code both clean and robust.

## Performance Implications and Best Practices

Okay, let's get real for a second. While satisfies is awesome, you need to use it judiciously. Here are some tips which will keep your code efficient and clean:

### It's Compile-Time Only

The satisfies operator works only during TypeScript's compile-time checks. This operator doesn't generate any runtime code and hence has no impact on performance. Think of it as a safety net for your types.

### When to Use satisfies

Use satisfies when:

- You're working with complex objects containing many nested properties.
- You need super strict type validation (e.g., `Record<>`).
- The usual type annotations (: Type) aren't enough.

### When Not to Use satisfies

Skip it if:

- You're just dealing with simple objects. A basic : Type annotation will do the job.
- You want runtime validation. Then, zod or io-ts may be better suited.

### Don't Go Overboard

It's tempting to use satisfies for everything, but don't. Keep it for when type validation really matters. Otherwise, it will make your code hard to read and maintain.

### Combine with Utility Types

When you combine `satisfies` with utility types like `Partial<>` or `Pick<>` , you can create reusable, modular type definitions. This makes your code cleaner and more maintainable.

## FAQs About the satisfies Operator in TypeScript

Five of the most frequently asked questions about the Satisfies operator follow, along with examples that serve to make the answer obvious.

### 1. What is the purpose of the satisfies operator in TypeScript?

The satisfies operator checks that a value is of a certain type after assignment. It doesn't change the inferred type of the variable, but it always enforces its value to be of the type provided.

```tsx
type User = {
  username: string;
  age: number;
};

const joe = {
  username: "joe_hiyden",
  age: 30,
} satisfies User; // asserts `joe` fits `User`

console.log(joe.username); // Works fine
```

### 2. How is satisfies different from type annotations?

Type annotations (: Type) explicitly set the type of a variable. satisfies, on the other hand, validates the value and lets TypeScript infer the type of the variable.

```tsx
type User = {
  username: string;
  age: number;
};

// Type annotation
const annotatedUser: User = { username: "joe", age: 30 };

// Using `satisfies`
const validatedUser = {
  username: "joe",
  age: 30,
} satisfies User;

// `validatedUser` keeps its original inferred type:
console.log(typeof validatedUser); // It's the same object type, not forced to `User`
```

### 3. Will satisfied work with utility types like Partial or Record?

Yes! The satisfies operator works great with utility types like Partial or Record to validate objects with flexible or constrained properties.

Using Partial

```typescript
type User = {
  username: string;
  email?: string;
  age?: number;
};

const partialUser = {
  username: "joe_hiyden",
} satisfies Partial<User>; // No complaints, optional fields are fine

console.log(partialUser.username); // "joe_hiyden"
```

Using Record

```typescript
type Roles = "admin" | "editor" | "viewer";
type Permissions = Record<Roles, boolean>;

const permissions = {
  admin: true,
  editor: false,
  viewer: true,
} satisfies Permissions; // Ensures all roles are covered
```

### 4. What happens when I don't specify a property if using satisfies?

If there is a missing property that is required by TypeScript, then it will throw an error to ensure the object fully conformed to the provided type.

```typescript
type User = {
  username: string;
  email: string;
};

const incompleteUser = {
  username: "joe_hiyden",
  // Missing `email` here!
} satisfies User; // Error: Property 'email' is missing
```

### 5. Can I use satisfies to validate nested object properties?

Absolutely! satisfies is particularly useful for deeply nested objects. It ensures that all nested properties match the expected types.

```typescript
type Address = {
  city: string;
  postalCode: string | number;
};

type User = {
  username: string;
  address: Address;
};

const nestedUser = {
  username: "joe_hiyden",
  address: {
    city: "New York",
    postalCode: 12345,
  },
} satisfies User;

console.log(nestedUser.address.city); // "New York"
```

If any property in address didn't match, TypeScript would catch it immediately. These FAQs cover some of the most common questions developers have about the satisfies operator.

## Summary

In this post, we covered the `satisfies` operator, a `v4.9` addition to TypeScript. We discovered that TypeScript `satisfies` offers a set of features primarily aimed for type validation of assigned variable values and their nested properties and values. We illustrated through examples that the `satisfies` operator is used in conjunction with the `Record<>` utility type.

In our examples, we found out that property name constraining, fulfillment associated with a `Record<>` derived type are handled well by TypeScript `satisfies`. Finally, we also saw how `satisfies` can be used to enforce partial member conformance with `Partial<>` transformation of a variable's value.
