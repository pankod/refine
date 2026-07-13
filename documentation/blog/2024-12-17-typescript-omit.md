---
title: A Guide on TypeScript Omit Type
description: We'll dive into the TypeScript Omit utility type with examples
slug: typescript-omit-utility-type
authors: abdullah_numan
category: "Tutorials"
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-03-typescript-omit/social-2.png
hide_table_of_contents: false
last_update: 2024-12-17
---

**This article was last updated on December 17, 2024, to add sections for Use Cases of TypeScript Omit and clean introduction**

## Introduction

**TL;DR:**

The `Omit<Type, Keys>` utility in TypeScript helps to construct a new type by omitting certain properties from the existing type. It is perfect for reducing redundant code when certain properties are not needed.

In this article, we discuss object type transformations in TypeScript using `Omit<>`. This is the second part of the series titled [TypeScript Utility Type Series](https://refine.dev/blog/typescript-pick-utility-type/).

In the previous post, we went through an example where we derived a `GuestUser` type by picking a few properties from the base type, `SuperbUser`, with `Pick<>`. We hinted that if the number of properties to be picked are more than those being discarded, picking becomes less convenient. In that case, we should prefer using `Omit<>`.

In this post, we will consider an example of `Omit<>` by creating a type for our `Subscriber` entity.

Step we'll cover:

- [TypeScript `Omit<Type, Keys>` Example](#typescript-omittype-keys-example)
- [TypeScript `Omit<>` with Interface](#typescript-omit-with-interface)
- [When to Avoid](#when-to-avoid)
- [When to Use TypeScript Omit](#when-to-use-typescript-omit)
- [Comparison of `Pick` and `Omit` in TypeScript](#comparison-of-pick-and-omit-in-typescript)

## TypeScript `Omit<Type, Keys>` Example

`Omit<>`, like `Pick<>`, takes a base type as the first argument. It takes an union type of the keys to be omitted as the second argument and returns the derived type that excludes those properties.

Looking back at the ERD, the `Subscriber` entity has all the same properties as `SuperbUser` - except `roles`:

<div class="img-container" align-items="center" >
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-03-typescript-omit/ts-omit-visualize.png"  alt="TypeScript Omit Type" />

</div>

<br/>

Deriving a `Subscriber` type from the `SuperbUser` plainly requires us to omit only the `roles` property, as opposed to picking all the rest:

```tsx
type SuperbUser = {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: ("Admin" | "Editor" | "Author")[];
};

type Subscriber = Omit<SuperbUser, "roles">;
```

So, in this case, TypeScript `Omit<>` offers us convenience over `Pick<>`. We can now create a subscriber object that has `roles` property removed from its fields:

```tsx
const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
  password: "12345678",
  firstName: "Abdullah",
  lastName: "Numan",
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com",
  "password": "12345678",
  "firstName": "Abdullah",
  "lastName": "Numan"
}
*/

console.log(subscriber.roles); // undefined
```

Notice, if we navigate to `subscriber.roles` it returns `undefined`.

Now, let's try adding `roles` to the `subscriber`:

```tsx
subscriber.roles = ["Reader", "Commenter"]; // Property 'roles' does not exist on type 'Subscriber'.

console.log(subscriber.roles); // ["Reader", "Commenter"]
```

And TypeScript grunts:

```tsx
// Property 'roles' does not exist on type 'Subscriber'.
```

If we look at `console.log(subscriber.roles);` though, we can see that our assignment actually sets the property and value of `subscriber.roles`. TypeScript only yells at us at development, but doesn't help us with this in runtime. JavaScript sets the value of `subscribe.roles`.

So, caution there, as it is an important distinction that TypeScript is applying omit at development, not JavaScript. TypeScript does not check for any consequence of the written code **after** it is compiled to JavaScript. So, it is crucial to leverage TypeScript linter suggestions to strictly check omit while developing.

## TypeScript `Omit<>` with Interface

Like it was in `Pick<>`, we can use an interface for `SuperbUser` and the results will be the same:

```tsx
interface SuperbUser {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: ("Admin" | "Editor" | "Author")[];
}

type Subscriber = Omit<SuperbUser, "roles">;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
  password: "12345678",
  firstName: "Abdullah",
  lastName: "Numan",
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com",
  "password": "12345678",
  "firstName": "Abdullah",
  "lastName": "Numan"
}
*/

console.log(subscriber.roles); // undefined
```

## When to Avoid

As with `Pick<>`, the second argument to Typescript Omit also takes a union of keys. So, if we need to omit any other property, we can add them to the second argument with the pipe operator `|`:

```tsx
type Subscriber = Omit<SuperbUser, 'roles' | 'firstName' | ...>;
```

We should avoid using `Omit<>` and prefer `Pick<>` when we have more properties to omit than to pick.

## When to Use TypeScript Omit

- To remove sensitive fields (e.g., password) from user objects.
- To generate simplified versions of complex types. - When most of the fields are needed but a few.

**Simplifying Derived Types**:

- Omit comes in very handy when you have a complicated base type, but need a simplified version that doesn't contain a few fields.

```tsx
type FullUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

// Create a "PublicUser" type without sensitive data like 'password' and 'createdAt'
type PublicUser = Omit<FullUser, "password" | "createdAt">;

const user: PublicUser = {
  id: 1,
  name: "John Doe",
  email: "johndoe@gmail.com",
};

console.log(user);
/*
  Output:
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com"
  }
*/
```

**API Data Filtering**:

- Sometimes APIs or backends give you a full object when your frontend only needs a small subset of the fields. You could create a whole new type by hand. Alternatively, use Omit for quick adjustments.

```tsx
interface ApiResponse {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  isAdmin: boolean;
}

// Create a 'FrontendUser' without sensitive backend data
type FrontendUser = Omit<ApiResponse, "passwordHash" | "isAdmin">;

const frontendUser: FrontendUser = {
  id: 101,
  username: "frontend_dev",
  email: "dev@example.com",
};
```

**Creating Cleaner Types for Specific Contexts**:

- If you're working with forms, UI components, or other modules, chances are you only need some of the fields from the parent, larger type: Omit comes in handy to keep your types tidy and focused.

```tsx
interface FullProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create a 'ProductForm' type for a UI form without metadata
type ProductForm = Omit<FullProduct, "id" | "createdAt" | "updatedAt">;

const formData: ProductForm = {
  name: "Gaming Laptop",
  description: "A powerful laptop for gaming.",
  price: 1500,
};
```

## Comparison of `Pick` and `Omit` in TypeScript

| Feature      | `Pick`                        | `Omit`                        |
| ------------ | ----------------------------- | ----------------------------- | ---------------------------------- |
| **Purpose**  | Select specific fields        | Exclude specific fields       |
| **Syntax**   | `Pick<Type, Keys>`            | `Omit<Type, Keys>`            |
| **Use Case** | When fewer fields are needed  | When fewer fields are omitted |
| **Example**  | `type A = Pick<Type, "id"     | "name">;`                     | `type B = Omit<Type, "password">;` |
| **Result**   | Includes only `id` and `name` | Excludes `password`           |

## Conclusion

In this article, we delved into `Omit<>` with an example of deriving a type for our `Subscriber` entity by omitting a property from our base type, `SuperbUser`. We saw that `Omit<>` is the opposite equivalent of `Pick<>` and is more convenient when we want to pick more properties and omit less from a base type.

In the next article, we'll cover object type transformations using `Partial<Type>`.
