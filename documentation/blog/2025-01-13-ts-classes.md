---
title: Essentials of TypeScript Classes
description: TypeScript classes are a superset of JavaScript classes. This post covers the fundamentals of type annotations in TypeScript Classes and their associated quirks.
slug: typescript-classes
authors: abdullah_numan
category: "Tutorials"
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-07-ts-classes/social-2.png
hide_table_of_contents: false
last_update: 2025-01-13
---

**This article was last updated on January 13, 2025, to include best practices for using TypeScript classes, a detailed table comparing TypeScript classes with JavaScript ES6 classes, and tips for avoiding common mistakes when implementing class features like readonly fields, access modifiers, and this bindings.**

## Introduction

:::tip What is TypeScript Classes?
TypeScript classes are an extension of the ES6 classes of JavaScript, adding type annotations, access modifiers (`public`, `private`, `protected`), and other features such as `readonly` fields, `static` members, and parameter properties.

Key points to remember:

- TypeScript Classes are typed versions of JavaScript ES6 classes.
- Class members - fields, methods, and accessors can have type annotations and visibility modifiers.
- The fields marked as `readonly` can only be assigned during declaration or in the constructor.
- Declare and initialize fields directly in the constructor using parameter properties.
- TypeScript mitigates the issues with `this` binding by using arrow functions or the `this` parameter. - Classes support generics and multiple interfaces using the `implements` keyword.

:::

TypeScript supports all the features of JavaScript Class syntax introduced in ES2015. Basically, type annotations are applied to all members, namely: fields, constructors, methods and accessors -- and where applicable, parameters as well. TypeScript also bakes in a special syntax to class constructors called **parameter properties** which allows us to declare a class **field** from the constructor function's parameters.

A TypeScript class definition creates a type from itself and it is used to validate conformity of an instance. TypeScript allows generic classes with type parameters passed to the outer class definition. Usually, generic class type parameters are accepted as constructor parameters, but they can also be passed to fields, methods and accessors as well. A single TS class can implement multiple other **interfaces**, something that is done with the `implements` keyword.

Besides type annotations, TypeScript adds member visibility across the prototype chain with three access modifiers: `public`, `protected` and `private` -- a feature distinct from how ES2022 implements member privacy with `#`.

JavaScript `this` keyword leads to some unpredictability in different **call site** contexts. TypeScript is geared to mitigate during development some of the call site uncertainties by allocating a possible `this` parameter to a method's first argument.

Steps we'll cover in this post:

- [Typing Class Members in TypeScript](#typing-class-members-in-typescript)
  - [Typing Fields in TypeScript](#typing-fields-in-typescript)
  - [TypeScript Classes - Constructor Functions](#typescript-classes---constructor-functions)
  - [TypeScript Classes - Typing Methods](#typescript-classes---typing-methods)
  - [TypeScript Classes - Typing Accessors](#typescript-classes---typing-accessors)
- [`this` Object in TypeScript Classes](#this-object-in-typescript-classes)
  - [TypeScript Classes - Arrow Functions for Permanently Attaching `this` Object](#typescript-classes---arrow-functions-for-permanently-attaching-this-object)
  - [TypeScript Classes - Context Binding with `this` Parameter](#typescript-classes---context-binding-with-this-parameter)
- [FAQ](#faq)
- [TypeScript Generic Classes](#typescript-generic-classes)
- [TypeScript Classes - Multiple Interfaces with `implements`](#typescript-classes---multiple-interfaces-with-implements)
- [TypeScript Classes - Relationship Between Class Types](#typescript-classes---relationship-between-class-types)
- [TypeScript vs JavaScript Classes: Feature Comparison](#typescript-vs-javascript-classes-feature-comparison)

## Overview

In this post, we focus on the essentials of class based programming in TypeScript using a simple `User` class. We begin with how type annotations are applied to different class members and their parameters.

We first consider typing class fields and delve into details of their initialization options, particularly investigating _definite initialization_ with the bang `!` operator and strict initialization with the `--strictPropertyInitialization` flag.

We then familiarize with how member visibility is implemented in TypeScript. Member visibility in TypeScript classes is largely related to effective usage of prototypal heritage in JavaScript. However, in this post, we don't cover inheritance in TypeScript classes: for brevity, we only consider privacy of fields for a simple uninherited class and its instances. We also touch base on static fields which acts the same as that in JavaScript.

We elaborate on what `readonly` fields are and how they are limited to be initialized at the top or re/assigned from a constructor function. We extensively cover typing a constructor function with examples from our uninherited `User` class and relate that constructor parameters are typed similar to any TS function. We end up learning how parameter properties work inside a constructor. Moving forward, we also work our way through easy-to-pick examples of typing methods and accessors, along with their parameters.

In the later half of this post, we zoom in on the way TypeScript mitigates errors related to the `this` object. We expound on how arrow functions and the special TS **`this` parameter** in non-arrow functions can be used for correctly setting a class method's `this` object and also learn about some of their caveats.

We also explore generic classes with passed in type parameters and see examples of how TypeScript facilitates class conformity to multiple interfaces with the `implements` keyword.

Towards the end, we briefly discuss the structural type system that TypeScript bases itself on. We observe with an example how instances of different but identically typed and subtype classes conform to a given class (or rather the type from it) and how a supertype cannot not conform to a subtype because of missing properties.

Before we begin with type annotation examples, in the next section, let's first go through how to set up the environment for using TypeScript.

## Typing Class Members in TypeScript

A TypeScript class commonly has type annotations for its members and where applicable, their parameters. In the following sections, one by one, we cover the details of typing TypeScript class fields, constructor functions, methods, accessors and their parameters.

Let's start with typing fields.

### Typing Fields in TypeScript

Below is an unsophisticated example with a few fields for a `User` class:

```ts
class User {
  username = "randomString";
  firstName: string;
  lastName: string;
  age!: number;
}
```

As you can notice, typing a class field in TypeScript is done like typing a variable. For example, as the usual story goes, the type of `username` is being inferred from its initializer type. With the rest of the properties, we are being explicit about the types for `firstName`, `lastName` and `age!`.

<br />

**TypeScript Classes - Field Initialization**

TypeScript class syntax adds some particular options to field initializations. A field may be initialized at declaration, or remain uninitialized, or uninitialized but aimed to be initialized **definitely** at some point during runtime.

For example, in the `User` class, `username` field is assigned a random string and the name fields are uninitialized. Notice the `age!` field with a bang!

<br />

**TypeScript Classes - Definite Field Assignments**

`age` above is uninitialized but it is accompanied by a bang (`!`) operator which is called the _definite assignment assertion operator_. It is used to indicate that leaving the field uninitialized is good enough to avoid TypeScript **strict property initialization** (see next section) error but it is expected to be definitely assigned a value with the specified type at some point.

It is common to use definite assignments when fields are assigned to an instance by APIs from some external libraries:

```ts
const joe = new User();

// Set joe's age externally
joe.age = getUserInfoFromStatsBureau("someId")?.data?.age;
```

<br />

**TypeScript Classes - Strict Field Initialization**

The `--strictPropertyInitialization` flag in TypeScript controls how strict field/property initialization should be. We can set the strictness of property initialization from the `tsconfig.json` file using the following entry to `compilerOptions`:

```json
// Inside tsconfig.json

{
  "compilerOptions": {
    "strictPropertyInitialization": true
  }
}
```

In TypeScript Playground, you can activate strict property initialization first by visiting the `TS Config` dropdown and then selecting `strictPropertyInitialization` from the `Type Checking` section.

Setting `"strictPropertyInitialization": true` necessitates all fields to either have an initializer, or they should be set in the constructor function, or they should be definitely assigned at a later point. Otherwise, TypeScript throws a `2564` error:

```ts
// With --strictPropertyInitialization

class User {
  // Initialized, so no error
  username = "randomString";

  // Assigned in constructor, so no error
  private firstName: string;

  // Not assigned in constructor
  private lastName: string; // Property 'lastName' has no initializer and is not definitely assigned in the constructor.(2564)

  // Removing bang (!) also throws 2564 error
  protected age: number; // Property 'age' has no initializer and is not definitely assigned in the constructor.(2564)

  constructor(firstName: string) {
    this.firstName = firstName;
  }
}
```

**TypeScript Class Member / Field Visibility**

TypeScript offers `public`, `protected` and `private` visibility options for its members. These privacy options are different from how JavaScript implements member privacy in ES2022.

Visibility in TypeScript classes is a general feature applicable to **all members**. We are covering it for fields, but the same principles apply to methods as well.

Fields that are not designated any privacy are by default `public`. We can access or set `public` properties from an instance:

```ts
class User {
  username = "randomString";
  firstName: string;
  lastName: string;
  age!: number;
}

const joe = new User();
joe.username = "jos3ph";
joe.firstName = "Joseph";
joe.lastName = "Hiyden";
joe.age = 63;

console.log(joe.username); // "jos3ph"
console.log(`${joe.firstName} ${joe.lastName}`); // "Joseph Hiyden"
console.log(joe.age); // 63
```

We have to explicitly state when a field or any member should be `private` or `protected`. `private` visibility restricts member access and assignment to within the class. `protected` limits the member to be accessed and set from its subclasses as well. This means that we can't access or set `private` or `protected` fields from an instance. Attempting to do so, as shown in the series of log statements below, throws errors:

```ts
class User {
  username = "randomString";
  private firstName: string;
  private lastName: string;
  protected age!: number;
}

const joe = new User();
joe.username = "jos3ph";
joe.firstName = "Joseph"; // Property 'firstName' is private and only accessible within class 'User'.(2341)
joe.lastName = "Hidden"; // Property 'firstName' is private and only accessible within class 'User'.(2341)
joe.age = 63; // Property 'age' is protected and only accessible within class 'User' and its subclasses.(2445)

console.log(joe.username);
console.log(`${joe.firstName} ${joe.lastName}`); // 2341 Errors
console.log(joe.age); // 2445 Error
```

<br />

**TypeScript Classes - Static Members / Fields**

Just as in JavaScript, we set class members on TypeScript classes with the `static` keyword. Let's introduce a static field `userType` to our `User` class:

```ts
class User {
  public static userType: string = "Guest";

  username = "randomString";
  protected age!: number;
}

console.log(User.userType); // "Guest"
```

As it happens in JavaScript, static fields in TypeScript represent class properties. One thing to note is that while declaring static fields, we have to place privacy modifiers (`public` here, which we technically don't need, but just to make a point) **before** the `static` keyword. Otherwise, TypeScript feels _uncomfortable_:

```ts
'public' modifier must precede 'static' modifier.(1029)
```

**TypeScript Classes - `readonly` Fields**

TypeScript allows fields to be `readonly`. As it implies, `readonly` fields tempt not be assigned from an instance, even with a setter. They are legal to be initialized at the top declaration and also assigned inside the constructor:

```ts
class User {
  static userType: string = "Guest";

  readonly _username: string = "randomString"; // No error at initialization
  protected age!: number;

  get username() {
    return this._username;
  }

  set username(username: string) {
    // Error while re/assignment from setter
    this._username = username; // Cannot assign to '_username' because it is a read-only property.(2540)
  }

  constructor(username: string) {
    this._username = username; // No error while assigned from constructor
  }
}

const dona = new User("trump");

// Error while being assigned from instance property, but gets assigned at compilation
console.log((dona._username = "trump_trippin")); // Cannot assign to '_username' because it is a read-only property.(2540)
```

### TypeScript Classes - Constructor Functions

As you already have noticed above, just like in regular TS functions that take parameters, class constructor parameters also get annotated with their types. Below is a more common example:

```ts
class User {
  username = "randomString";
  private firstName: string;
  private lastName: string;
  protected age!: number;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

It is important to note that a constructor function in a TypeScript class does **not** take types as parameters. In other words, there is nothing like this:

```ts
class User {
  // Constructor fn cannot accept type param
  constructor<AbsurdTypeParam>() {}
}
```

Instead, the class declaration itself takes type parameters. Type parameters passed to a class are useful for defining **generic class types**, since a class ends up creating its own type. We'll explore generic classes in a [later section](#typescript-generic-classes).

<br />

**TS Classes - Constructor Return Type**

It should be also noted that we do **not** need to type the return value of a TypeScript class constructor. Because, it **always** returns the instance's type, which is the type created from the class.

```ts
class User {
  username = "randomString";
  private firstName: string;
  private lastName: string;
  protected age!: number;

  // Constructor's return type is the type of the class' instance
  constructor(firstName: string, lastName: string) {
    // constructor User(firstName: string, lastName: string): User
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// joe is of type User
const joe = new User("Joe", "Hiyden"); // joe: User
```

<br />

**TypeScript Class Creates a Type**

It should be pretty obvious that a TypeScript class creates a type from itself:

```ts
// joe is of type User
const joe = new User("Joe", "Hiyden"); // joe: User
```

**Typescript Classes - Parameter Properties**

In TypeScript, we can turn a constructor parameter into a class property using **parameter properties**. The way to implement parameter properties is by designating field visibility modifiers (`public`, `private`, `protected`) and/or accessor modifiers (`readonly`) to respective constructor parameters, instead of declaring field definitions that we usually perform at the top:

```ts
class User {
  username = "randomString";
  protected age!: number;

  // Use field modifiers to declare parameter properties in constructor
  constructor(private firstName: string, private lastName: string) {
    // No assignments inside constructor body needed
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const joe = new User("Joe", "Hiyden");
joe.firstName; // Property 'firstName' is private and only accessible within class 'User'.(2341)
console.log(joe.fullName()); // "Joe Hiyden"
```

Above, we have a reworked `User` class where we no longer need to declare `firstName` and `lastName` as fields at the top. Notice closely that we also don't need to carry out respective field assignments inside the constructor body. This way, TypeScript neatly keeps our code compact.

### TypeScript Classes - Typing Methods

Applying type annotations to class methods is easy and follow the same principles as other functions. We already have the example of `fullName()` method above that has an inferred return type of `string`. In the below code, `greetUserWith()` is another method that has an explicit return type of `string`. It is annotated a `string` parameter as well:

```ts
class User {
  username = "randomString";
  protected age!: number;

  constructor(private firstName: string, private lastName: string) {}

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  greetUserWith(greeting: string): string {
    return `${greeting}, ${this.fullName()}`;
  }
}

const joe = new User("Joe", "Hiyden");
console.log(joe.fullName()); // "Joe Hiyden"
console.log(joe.greetUserWith("Hello")); // "Hello, Joe Hiyden"
```

### TypeScript Classes - Typing Accessors

In a similar vein, we can annotate types for accessor function parameters. Let's see how to do that for our `protected` `_age` field:

```ts
class User {
  username = "randomString";
  protected _age!: number;

  constructor(private firstName: string, private lastName: string) {}

  get age(): number {
    return this._age;
  }

  set age(age: number) {
    this._age = age;
  }
}

const joe = new User("Joe", "Hiyden");
joe.age = 20;
console.log(joe.age); // 20
```

It is worth noting that although we can annotate a type for the return value of `get` accessors, TypeScript complains if we assign a type for the return value of setters. Annotating a return type for setters is not allowed, so the following is invalid:

```ts
set age(age: number): number { // A 'set' accessor cannot have a return type annotation.(1095)
    this._age = age;
};
```

<br />

There are a couple of quirks related to accessors typing in TypeScript. Let's consider them now.

**TS Classes - Setter Parameter Type Inferred from Existing Getter Param Type**

For example, the above `age()` **setter** can have its parameter type omitted. That's because when a getter exists, the setter's type parameter is inferred from the **return type** of getter:

```ts
class User {
  username = "randomString";
  protected _age!: number;

  constructor(private firstName: string, private lastName: string) {}

  // Existing getter with `number` return type
  get age(): number {
    return this._age;
  }

  // Type of setter parameter inferred from return type of existing getter
  set age(age) {
    // (parameter) age: number
    this._age = age;
  }
}

const joe = new User("Joe", "Hidin");
joe.age = 20;
console.log(joe.age); // 20
```

**TS Classes - Field With Only Getter is Set to `readonly`**

When we have only a `get`ter method, and no corresponding setter, the field is automatically set to `readonly`:

```ts
class User {
  username = "randomString";
  protected _age!: number;

  constructor(private firstName: string, private lastName: string) {}

  get age(): number {
    return this._age;
  }
}

const joe = new User("Just", "Kiddin");

// Assignment gives error with read-only message
joe.age = 20; // Cannot assign to 'age' because it is a read-only property.(2540)
```

## `this` Object in TypeScript Classes

In JavaScript, the `this` object on which a method is called depends on the **call site** of the method. At runtime, the `this` object can be one of the root causes of unpredictable outcomes of a method call. In this section, we consider how TypeScript has a couple of options for controlling the `this` object predictably in order to produce more stable outcomes.

### TypeScript Classes - Arrow Functions for Permanently Attaching `this` Object

As with JavaScript, when we want to permanently attach a class instance to a method, we can use the arrow syntax to define our method. For example, a redefined `fullName()` method with arrow syntax:

```ts
class User {
  username = "randomString";
  protected age!: number;

  constructor(private firstName: string, private lastName: string) {}

  // highlight-next-line
  fullName = () => `${this.firstName} ${this.lastName}`;

  greetUserWith(greeting: string) {
    return `${greeting}, ${this.fullName()}`;
  }
}

const joe = new User("Joe's", "Kiddin");
console.log(joe.fullName()); // "Joe's Kiddin"

// Doesn't lose `this` context, because it is permanently bound to instance
const jfn = joe.fullName;
console.log(jfn()); // "Joe's Kiddin"
```

As it happens in JavaScript, the arrow syntax permanently binds the `fullName` method to the instance of class `User`, `joe` here. So, regardless of whether we invoke it directly on `joe` or extract it and call it later on, the `this` object remains `joe`.

One of the caveats of using context binding with arrow syntax is that in a derived class of `User`, we can't access `super.fullName()` as arrow functions don't have a `prototype` property.

### TypeScript Classes - Context Binding with `this` Parameter

Another way TypeScript helps handle method context binding is that it spares the `this` object for the first parameter to every method or accessor. When we want to bind an instance of the class to the method, we can specify the instance as the `this` parameter and type it as the class itself. Like this:

```ts
class User {
  username = "randomString";
  protected age!: number;

  constructor(private firstName: string, private lastName: string) {}

  // highlight-next-line
  fullName(this: User) {
    return `${this.firstName} ${this.lastName}`;
  }

  greetUserWith(greeting: string) {
    return `${greeting}, ${this.fullName()}`;
  }
}

const joe = new User("Joe's", "Hidin");
console.log(joe.fullName()); // "Joe's Hidin"

// Error when taken out of context
const jfn = joe.fullName;
console.log(jfn()); // The 'this' context of type 'void' is not assignable to method's 'this' of type 'User'.(2684)
```

Context binding with the `this` parameter is specifically useful when we are sure to use the method on an instance of the `User` class, and without taking it out of context. An added advantage is that we can also call it from a derived class using `super`.

The drawback, as we can see above, is that the method loses the instance as its `this` when it is extracted out of context.

## FAQ

**Q: How are TypeScript classes different from JavaScript classes?**
TypeScript classes differ from the ES6 classes of plain JavaScript in that they enable type annotations, access modifiers, `readonly` fields, parameter properties, generics, and multiple implementations of interfaces.

**Q: Do classes in TypeScript have private fields?**
Yes, you can use modifiers such as `private` or `protected` for classes in TypeScript. It's another syntax compared to `#private` syntax in JavaScript ES2022.

**Q: What are the purposes of `readonly` fields in TypeScript?**
The `readonly` fields are supposed to create immutable properties that can only be assigned during initialization or in the constructor.

**Q: How does TypeScript bind this in classes?**
TypeScript provides two means to deal with `this`:

1. Use arrow functions for methods to permanently bind `this` to the class instance.
2. Employing the special `this` parameter for explicitly specifying the type of class instance.

**Q: Is it possible to implement multiple interfaces with classes in TypeScript?**
Yes, TypeScript allows you to implement multiple interfaces using the keyword implements.

**Q: Can static members in TypeScript have type parameters?**
No, in TypeScript, static members cannot refer to class type parameters.

**Q: What is the advantage of parameter properties in TypeScript?**
Parameter properties in C# allow you to declare and initialize the fields directly in constructor parameters, which reduces boilerplate code.

## TypeScript Generic Classes

As it does with other generic types, TypeScript allows us to declare generic classes by passing in type parameters at class declaration. The passed in type can then be used to annotate types for any member inside the class.

```ts
class User<T> {
  readonly userType: T;

  username = "randomString";
  protected age!: number;

  constructor(userType: T) {
    this.userType = userType;
  }
}

type UserTypes = "Guest" | "Authenticated" | "Admin";

const joe = new User<string>("Guest");
const dae = new User<UserTypes>("Authenticated");
const dan = new User<UserTypes>("Unknown"); // Argument of type '"Unknown"' is not assignable to parameter of type 'UserTypes'.(2345)

console.log(joe.userType); // "Guest"
console.log(dae.userType); // "Authenticated"
```

It is, however, not legal to pass class type parameters to `static` members:

```ts
class User<T> {
  static readonly userType: T; // Static members cannot reference class type parameters.(2302)

  username = "randomString";
  protected age!: number;
}
```

## TypeScript Classes - Multiple Interfaces with `implements`

It is possible for a TypeScript class to implement more than one interface. We use the `implements` clause for this. Any interface that the class satisfies can be passed to `implements`. For example, the following interfaces are all satisfied by the `User` class:

```ts
interface Identifiable {
  fullName(): string;
}

interface Greetable {
  greetUserWith(greeting: string): string;
}

interface Updatable {
  updateUsername(username: string): void;
}

class User<T> implements Identifiable, Greetable, Updatable {
  readonly userType: T;

  username = "randomString";
  protected age!: number;

  constructor(
    userType: T,
    private firstName: string,
    private lastName: string,
  ) {
    this.userType = userType;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  greetUserWith(greeting: string) {
    return `${greeting}, ${this.fullName()}`;
  }

  updateUsername(username: string) {
    this.username = username;
  }
}

const joe = new User<string>("Guest", "Joe", "Hidden");
console.log(joe.fullName()); // "Joe Hidden"
console.log(joe.greetUserWith("Hello")); // "Hello, Joe Hidden"
```

TypeScript throws a `2420` error when a given interface property is not satisfied by the class. For example, for a `Registerable` interface, the `register` method is not implemented by `User`, so it does not satisfy the `Registerable` interface:

```ts
interface Identifiable {
  fullName(): string;
}

interface Greetable {
  greetUserWith(greeting: string): string;
}

interface Updatable {
  updateUsername(username: string): void;
}

interface Registerable {
  register(userId: string): void;
}

// Complains with 2420 error because `register()` method is missing in User
class User<T> implements Identifiable, Greetable, Updatable, Registerable {
  //
  readonly userType: T;

  username = "randomString";
  protected age!: number;

  constructor(
    userType: T,
    private firstName: string,
    private lastName: string,
  ) {
    this.userType = userType;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  greetUserWith(greeting: string) {
    return `${greeting}, ${this.fullName()}`;
  }

  updateUsername(username: string) {
    this.username = username;
  }
}
```

## TypeScript Classes - Relationship Between Class Types

TypeScript has a structural type system. And in structural type systems, the shape of the class and their instances are enough to compare them.

### TypeScript Classes - Classes with Identical Shapes are Type Compliant

If the shapes of two classes are identical, their types are compliant:

```ts
// With --strictPropertyInitialization set to false

class User {
  username = "randomString";
  firstName: string;
  lastName: string;
  age!: number;
}

class Admin {
  username = "randomString";
  firstName: string;
  lastName: string;
  age!: number;
}

// No complains when we type instance of Admin with User and vice versa, because User and Admin are structurally identical
const joe: User = new Admin(); // joe: User
const dona: Admin = new User(); // joe: Admin
```

Here, we are able to type `joe`: an instance of `Admin` with `User`, and `dona`: an instance of `User` with `Admin` because the shapes of the two classes are the same.

### TypeScript Classes - Subtyped Classes are Type Compliant

Similarly, subtyped classes that have partial but the same members with a supertype is compliant to the supertype:

```ts
class User {
  username = "randomString";
  firstName: string;
  lastName: string;
  age!: number;
}

class Admin {
  username = "randomString";
  firstName: string;
  lastName: string;
  age!: number;
  role: string = "Admin";
}

// No complains typing instance of Admin with User, because User is a subtype of Admin
const joe: User = new Admin(); // joe: User

// This time around, we can't type instance of User with Admin, because missing property in supertype
const dae: Admin = new User(); // Property 'role' is missing in type 'User' but required in type 'Admin'.(2741)
```

In this example, `joe`, is still compliant to `User` because the `Admin` has all the members of `User` and an additional one. The opposite (`dae: Admin`) is not true though, because `User` has the missing member `role` that is present in `Admin`.

## TypeScript vs JavaScript Classes: Feature Comparison

| Feature                           | TypeScript Classes                     | JavaScript ES6 Classes |
| --------------------------------- | -------------------------------------- | ---------------------- |
| Type Annotations                  | Yes (fields, methods, and parameters)  | No                     |
| Access Modifiers (`private`)      | Yes (`public`, `private`, `protected`) | No                     |
| `readonly` Fields                 | Yes                                    | No                     |
| Parameter Properties              | Yes                                    | No                     |
| `this` Parameter for Methods      | Yes                                    | No                     |
| Generics                          | Yes                                    | No                     |
| Multiple Interface Implementation | Yes (`implements`)                     | No                     |

## Best Practices of TypeScript Classes

- **Use Readonly Fields for Immutable Data**: Use the `readonly` modifier to ensure a field is never changed after it's initialized.
- **Leverage Parameter Properties**: Reduce boilerplate code by initializing and declaring fields in the constructor.
- **Use Access Modifiers**: Use access modifiers such as `private`, `protected`, and `public` to protect class members and guarantee encapsulation.
- **Avoid Overusing Static Members**: Excessive use of static members can lead to tight coupling.
- **Use Generics**: Write more flexible, reusable classes using type parameters.
- **Annotate Method Return Types**: Specify the return types for methods to make the class behavior more explicit.
- **Test `this` binding**: Use arrow functions or the `this` parameter to ensure the `this` context is correctly bound to class instances.

## Summary

In this post, we have traversed a long way in our exploration of classes in TypeScript. We have covered the essentials of type annotation in TS classes. We began with how to type class fields, their initialization options and visibility modifiers. We touched on `static` fields, and with an example covered the concept of `readonly` fields that TypeScript implements. We have went through in depth how class constructor, method and accessor parameters, and their return values are annotated. We saw how `readonly` properties can be assigned from a constructor function, and how to implement parameter properties.

We also expounded on how arrow functions are used to bind a method permanently to an instance and discovered how the `this` parameter in TypeScript methods allows us to bind an instance more selectively to its methods.

Near the end, we learned about how a class should implement multiple interfaces with the `implement` clause. We also explored how subtypes from classes are compliant to those from supertyped classes and and not the other way around because of TypeScript's structural typing system.
