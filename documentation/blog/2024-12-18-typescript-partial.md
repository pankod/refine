---
title: How to use TypeScript Partial Type?
description: We'll explain the TypeScript Partial utility type with examples
slug: typescript-partial-utility-type
authors: abdullah_numan
category: "Tutorials"
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-10-10-typescript-partial/social-2.png
hide_table_of_contents: false
last_update: 2024-12-18
---

**This article was last updated on November 18, 2024, to include a clear introduction to TypeScript partial and its practical use cases.**

## Introduction

### TL;DR: What is TypeScript Partial?

What is TypeScript Partial? `Partial<Type>` is a utility type in TypeScript which represents all properties of a given type are optional.

In this article, we discuss object type transformations in TypeScript using `Partial<>`. This is the third part of the series titled [TypeScript Utility Type Series](https://refine.dev/blog/typescript-omit-utility-type/).

In the previous post, we went through an example where we derived a `Subscriber` type by omitting a property from the base type, `SuperbUser`, with `Omit<>`.

In this post, we will consider an example of **TypeScript `Partial<>`** by modifying our `Subscriber` type to assume a more realistic scenario.

## Optional Registration Scenario

For our blog, we would have `GuestUser`s who are not allowed to like or comment on a post. We would allow registered `Subscriber`s to like and comment. So, the scenario goes:

- a `GuestUser` must register with their `email` and become a `Subscriber`.
- they receive a link to set their password in an email sent to their `email`.
- they are able to set their `password`, `firstName` and `lastName` afterwards.

In such a scenario, the `Subscriber` type we derived previously, which effectively has the shape below, does not deliver our needs the way we want:

```tsx
type Subscriber = {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
};

console.log(subscriber);
/*
From TypeScript Error:
"Type '{ userId: number; macAddress: string; username: string; email: string; }' is missing the following properties from type 'Subscriber': password, firstName, lastName"

From console:
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com"
}
*/
```

TypeScript complains about the inconformity of `subscriber` to `Subscriber` type. This is because it sets all the fields to be **required** by default. If we set `password`, `firstName` and `lastName` to optional manually, it is happy:

```tsx
type Subscriber = {
  userId: number;
  macAddress: string;
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};

const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com"
}
*/
```

But this comes with the overhead of defining `Subscriber` manually in the first place and additionally then setting individual optional properties. In real APIs, it's not a good idea to define a shape manually.

## Enter TypeScript `Partial<Type>`

We want to remove the hassle and do this much more comfortably from the type returned from `Omit<>`. So what we want to do is set all the properties of the returned type to be optional with `Partial<Type>`:

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

type Subscriber = Partial<Omit<SuperbUser, "roles">>;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
};

console.log(subscriber);
/*
{
  "userId": 4,
  "macAddress": "a:5ub:mach1ne",
  "username": "sub_user",
  "email": "sub_user@gmail.com"
}
*/
```

No complains, which is great!

So, we are now free to set values for `password`, `firstName` and `lastName`:

```tsx
subscriber.password = "12345678";
subscriber.firstName = "Abdullah";
subscriber.lastName = "Numan";

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
```

But, like before, TypeScript complains again if we add the properties that disrupts the shape of `Subscriber`:

```tsx
subscriber.roles = ["Reader", "Commenter"];

console.log(subscriber);
// Property 'roles' does not exist on type 'Partial<Omit<SuperbUser, "roles">>'.
```

So, the benefits of using TypeScript to derive a partial type includes its support for partial assignment of the object's properties that is allowed by JavaScript and not allowed by default TypeScript. It also warns about possible undesired assignments to the partial.

## With Interfaces

We get the same result if we use an interface for our base `SuperbUser` type:

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

type Subscriber = Partial<Omit<SuperbUser, "roles">>;

const subscriber: Subscriber = {
  userId: 4,
  macAddress: "a:5ub:mach1ne",
  username: "sub_user",
  email: "sub_user@gmail.com",
};

subscriber.password = "12345678";
subscriber.firstName = "Abdullah";
subscriber.lastName = "Numan";

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
```

We can also refactor the return type from `Omit<>` into an intermediary type, `StrictSubscriber`, and pass it as the argument of **TypeScript Partial**:

```tsx
type StrictSubscriber = Omit<SuperbUser, "roles">;
type Subscriber = Partial<StrictSubscriber>;
```

### Comparison: Pick vs Omit vs Partial

| Utility Type       | Purpose                                 | Example Usage                        |
| ------------------ | --------------------------------------- | ------------------------------------ | -------- |
| `Pick<Type, Keys>` | Creates a type with only specific keys. | `type Guest = Pick<User, "id"        | "name">` |
| `Omit<Type, Keys>` | Excludes specified keys from a type.    | `type NoEmail = Omit<User, "email">` |
| `Partial<Type>`    | Makes all keys of a type optional.      | `type OptionalUser = Partial<User>`  |

#### Common Use Cases for `Partial`

- **API Responses**: When some of the fields are not returned at all.
  Example: Fetching user data with optional fields.
- **Form Handling**: Partial data in forms that might have some input fields not filled.
- **Object Updates**: Every time any part of an already existing object is updated, that does not imply all fields are modified.

## Frequently Asked Questions (FAQ)

**Q: What is `Partial<Type>` in TypeScript?**

A: Well, `Partial` is a utility type that makes every property of a type optional.

**Q: Can I use Partial with interfaces?**

A: Yes, absolutely, `Partial` works for both types and interfaces.

**Q: How is Partial different from Pick?**

A: `Partial` makes all properties optional; `Pick` selects some properties from a type.

## Conclusion

In this post, we covered partial object transformations with using the utility transformer **Partial**. We found out that it is preferable to setting certain properties of a type to optional manually, especially when dealing with types returned from APIs.
