---
title: A Detailed Guide on TypeScript Pick Type
description: We'll deep dive into the TypeScript Pick utility type with examples and use cases.
slug: typescript-pick-utility-type
authors: abdullah_numan
category: "Tutorials"
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-30-typescript-pick/social-2.png
hide_table_of_contents: false
last_update: 2024-12-17
---

**This article was last updated on November 17, 2024, to include a clear introduction to TypeScript Pick and its practical use cases.**

## Introduction

### TL;DR: What is TypeScript Pick?

`Pick<Type, Keys>` is a TypeScript utility type that constructs a new type by picking the specific properties from an existing type. It's great for taking large types and distilling them down into smaller, more focused types.

This is a series on Object Type Transformations in TypeScript. In this series, we will first look into what object type transformations are, the situations that necessitate a transformation and how they are different from object interface extensions. Then we will closely examine various utilities that TypeScript provides to facilitate object type transformations, such as `Pick<>`, `Omit<>` and `Partial<>`.

We will dive into the details of commonly used utilities individually in each article in the series. In this part, we will consider how to generate a new type from an existing type by cherry-picking a few properties from a base type or interface using `Pick<Type, Keys>`.

But first let's understand what transforming an object type means and under what circumstances do we need one.

## What is Object Type Transformation?

Object Type Transformation refers to generating a modified type from an existing type or interface that represents an object. Such transformations are related to one or more properties, in other words, the shape of an object.

TypeScript has various utilities that allow us to implement different sorts of object type transformations, such as by picking or omitting properties from already available types.

Object type transformations become very handy when we need a bunch of similar object types that otherwise have to be defined individually. Instead of defining each type separately, we can leverage TypeScript's transformation utilities to generate new types from an existing type by just asking for small adjustments. This way, we are able to make our types re-usable and generate them on-the-go anywhere in our modules system.

Object type transformations are different from object interface extensions that uses the `extends` keyword, especially because extensions are possible on **object interfaces only** and are not available for types. And although transformations can also be applied to object interfaces with the same utilities, they are generally useful for creating new object types.

We'll build the examples in this series based on the following scenario that involves a few different types of users. While the focus will be on object types, we will also bring interfaces into the discussion.

### The Scenario

Let's say we have a bunch of user entities that differ in terms of how they interact with a blog. Basically, whether they are a `GuestUser`, a `Subscriber`, an `Editor` or an `Admin`, etc. The following ERD shows how their shapes may differ in the backend:

<div class="img-container" align-items="center" >
   <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-30-typescript-pick/ts-pick-visualize.png"  alt="TypeScript Omit Type" />

</div>

<br/>

Now, if we want to model these types for our frontend API calls, we can manually write a TypeScript type for each user type - which obviously violates the DRY (Don't Repeat Yourself) principle because we are repeating several common properties for each user type. We can also use interface extensions but that's not the scope of this series.

So, what we will do is use TypeScript's transformation utilities to generate the types we need from a base type. And in order to do the right transformations, we need to conveniently set the right base type and then pair it with the utility tool that generates our target type.

For example, in this article we will consider the use case for `Pick<Type, Keys>`.

## What is TypeScript Pick?

### Picking Items with `Pick<Type, Keys>`

For the above entities in the diagram, it makes sense to take `SuperbUser` as our base type because it includes all properties that exists on all other user types.

We will first work with an **interface** for `SuperbUser`:

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
```

Now, if we want to generate a `GuestUser` type from `SuperbUser`, we just pick `userId`, `macAddress` and `username` properties:

```tsx
type GuestUser = Pick<SuperbUser, "userId" | "macAddress" | "username">;
```

If we look closely, **TypeScript Pick** takes the base type as the first argument and a union of keys we want to pick from the base as the second.

Using these two types to declare actual objects gives us the objects with their respective properties:

```tsx
const me: SuperbUser = {
  userId: 1,
  macAddress: "my:5up4b:m4ch1ne",
  username: "supab_usa",
  email: "supab_usa@hotmail.com",
  password: "12345678",
  firstName: "Abdullah",
  lastName: "Numan",
  roles: ["Admin", "Editor", "Author"],
};

const guest: GuestUser = {
  userId: 2,
  macAddress: "a:gu3st:m4ch1ne",
  username: "randomly_generated",
};

console.log(me.roles); // ["Admin", "Editor", "Author"]
console.log(guest.username); // "randomly_generated"
console.log(guest.roles); // undefined
```

Notice, `guest.roles` is `undefined` at runtime and a lot prior to that TypeScript throws an error:

```tsx
// Property 'roles' does not exist on type 'GuestUser'.
```

Now, if we try to represent an object with any other properties added from `SuperbUser` interface -- as a type of `GuestUser`, we get yelled at:

```tsx
const anotherGuest: GuestUser = {
  userId: 3,
  macAddress: "4n0th4:m4ch1ne",
  username: "randomly_generated",
  email: "not_allowed_by_typescript@email.com",
};
// Object literal may only specify known properties, and 'email' does not exist in type 'GuestUser'.
```

Here, the complain being `anotherGuest` cannot be of `GuestUser` type, because `GuestUser` does not have an `email` property signature.

### For Types Only

Notice that we defined `GuestUser` as a type with the `type` keyword, although we are using an interface as our base. This is because TypeScript `Pick<Type, Keys>` can only be used to generate a **type** and not an interface.

If we try to define it with `interface`, TypeScript throws an error:

```tsx
interface GuestUser = Pick<SuperbUser, 'userId' | 'macAddress' | 'username'>;
// 'Pick' only refers to a type, but is being used as a value here.
```

### Picking from a Type

Transformations are more useful for **types** rather than interfaces because we cannot extend types. If we convert our `SuperbUser` interface into a type, we get the same results:

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

type GuestUser = Pick<SuperbUser, "userId" | "macAddress" | "username">;

const me: SuperbUser = {
  userId: 1,
  macAddress: "my:5up4b:m4ch1ne",
  username: "supab_usa",
  email: "supab_usa@hotmail.com",
  password: "12345678",
  firstName: "Abdullah",
  lastName: "Numan",
  roles: ["Admin", "Editor", "Author"],
};

const guest: GuestUser = {
  userId: 2,
  macAddress: "a:gu3st:m4ch1ne",
  username: "randomly_generated",
};

console.log(me.roles); // ["Admin", "Editor", "Author"]
console.log(guest.username); // "randomly_generated"
console.log(guest.roles); // undefined
```

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>

### When to Avoid

Now, if we want to derive a type for our `Subscriber` entity, we would want to pick all the properties except `roles`. But, it doesn't make sense to list all the properties in the union type passed as the second argument:

```tsx
// Poor choice of utility type
type Subscriber = Pick<SuperbUser, 'userId' | 'macAddress' | 'username' | 'email' | ... >;
```

Instead, we can just omit `roles` from the passed in utility type. As we'll see in the next post, we can do this with `Omit<Type, Keys>`.

These are the cruces of using `Pick<>` transformations in TypeScript.

## Add a Comparison Table: Pick vs. Other Utilities

```markdown
### Pick vs. Omit vs. Partial

| **Utility**        | **What It Does**                         | **When to Use**                        |
| ------------------ | ---------------------------------------- | -------------------------------------- |
| `Pick<Type, Keys>` | Select specific properties from a type.  | When you need a subset of properties.  |
| `Omit<Type, Keys>` | Exclude specific properties from a type. | When you need all except a few.        |
| `Partial<Type>`    | Makes all properties of a type optional. | When optional properties are required. |

**Example Use Cases:**

- Use `Pick` for creating **focused types** with only relevant properties.
- Use `Omit` when excluding unnecessary fields.
- Use `Partial` for making types flexible during updates or creation.

## Conclusion

In this post, we found out that Object Type Transformations allow us to derive similar types from a base type when we have objects that share properties. We looked at an example that uses TypeScript `Pick<>` to create a new type by picking a few properties from a type with larger shape. We found out that a type transformation can take both an interface as well as a type as its base, but the generated type cannot be declared as an interface.

`Omit<>`, the opposite equivalent of `Pick<>`, can be used when we have more properties to pick and less to omit. We'll look at it in the next post.
```
