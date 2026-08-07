---
title: Dictionaries in TypeScript -  How to Ensure Type Safety
description: This post is provides a guide on how to ensure type safety to dictionaries with TypeScript.
slug: typescript-dictionary
authors: abdullah_numan
category: "Tutorials"
tags: [typescript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-05-07-ts-dictionary/social.png
hide_table_of_contents: false
last_update: 2024-11-11
---

**This article was last updated on November 11, 2024 to include advanced techniques for TypeScript dictionary validation and best practices for ensuring type safety in dynamic and complex data structures.**

## Introduction

Dictionaries are one of the crucial data structures in programming. Dictionaries or maps are useful for describing key-value paired objects in an application. They can be implemented using `Object` and `Map` instances in JavaScript. In TypeScript, dictionaries are also implemented as a `Record<>` with related types for its keys and values.

TypeScript necessitates proper type annotation to a dictionary's keys and values. So, in this post, we explore how type safe dictionaries in TypeScript are implemented with necessary type definitions, annotations and specificity.

We first make sense of what dictionaries are and go through a couple of examples which illustrate that dictionaries are collections of entries with key-value pairs which adhere to a specific structure describable by their types. Through these examples, we observe how dictionaries are implemented in JavaScript with `Object` instances.

We then relate how dictionaries in TypeScript demand proper type definition and annotation in order to achieve type safety and specificity and see how to apply proper types for dictionary keys and entries. We elaborate with examples how to implement open ended TypeScript dictionaries with index signatures and closed set dictionaries with TypeScript generic mapped types.

Towards the later half, we cover type safe approaches to iterating over TS `Object` based dictionaries with `for...in` and `for...of` loops. We consider dictionary data extracted with `Object.keys()`, `Object.values()` and `Object.entries`, and traversing them using `Array` iterators like `Array.prototype.map()` as an example. We also encounter a TypeScript `7503` type incompatibility error while iterating over dictionary keys returned by `Object.keys()` with a `for...in` loop, and address how to solve it with the type assertion `as` operator.

Towards the end, we explore examples of implementing the same dictionary (`fictionalDictators`) features with the TypeScript `Record<>` utility and TS `Map` instances.

Steps we'll cover in this post:

- [what is TS Dictionary](#what-is-ts-dictionary)
- [Dictionaries in TypeScript](#dictionaries-in-typescript)
- [Iterating Over TypeScript Dictionaries](#iterating-over-typescript-dictionaries)
- [Type Narrowing for Key Lookups](#type-narrowing-for-key-lookups)
- [TypeScript Dictionaries with the `Map` Prototype](#typescript-dictionaries-with-the-map-prototype)
- [Advanced Mapped Types to Dynamically Create Dictionaries](#advanced-mapped-types-to-dynamically-create-dictionaries)

## Prerequisites

In order to properly follow this post and test out the examples, you need to have a JavaScript engine. The discussions in this post cover intermediate-to-advanced topics in TypeScript. We expect you come with enough knowledge about at the basics of TypeScript utility types and mapped types. It'll be useful if you have worked significantly with the JavaScript [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) APIs as well.

### TypeScript Setup

Your JavaScript engine has to have TypeScript installed. It could be [Node.js](https://nodejs.org/en/download) in your local machine with TypeScript supported or you could use the [TypeScript Playground](https://www.typescriptlang.org/play/).

## What is TS Dictionary ?

A dictionary is a data structure which contains entries with unique keys that describe its content. Each key typically represents and maps to a value of known or generalizable type.

Most programming languages implement a dictionary in the form of an object with properties that are expressed with a key and its value. A trivial example of dictionary in JavaScript looks like this:

```tsx
const dictators = {
  ah_aladeen: "Admiral Haffaz Aladeen",
  bg_brother: "Big Brother",
  cr_snow: "Coriolanus Snow",
  es_palpatine: "Emperor Sheev Palpatine",
};
```

The term "dictionary" belongs mainly to Python. It is synonymous with the hash or hash map data structure in Ruby and hash tables in Java. A dictionary is also often referred to as a map.

### How Dictionaries are Implemented in JavaScript

JavaScript has a legacy of implementing dictionaries with the help of basic objects -- which are instances of the `Object` prototype. ES2015 brings a dedicated JavaScript `Map` prototype which helps implement dictionaries in JavaScript using key-value tuples in a multidimensional `Array` instance.

In this section, we briefly look at how object based dictionaries are implemented in JavaScript.

#### JavaScript Dictionaries with `Object` Literals

In the above `dictators` example, we are using a JavaScript object literal to define a list of dictators. The property keys describe a dictator's lowercase name / initials. We have the values of each key as `string` literals. Dictionaries are what they are called because all their values are describable by some type, such as a `string`. In other words, the values of a dictionary are always some consistently structured object.

For example, the `dictators` dictionary above could also have entries with consistently shaped `Object` values, like this:

```tsx
const dictators = {
  ah_aladeen: {
    name: "Admiral Haffaz Aladeen",
    dominion: "North African Republic of Wadiya",
  },
  bg_brother: {
    name: "Big Brother",
    dominion: "Oceania",
  },
  cr_snow: {
    name: "Coriolanus Snow",
    dominion: "The Capitol of Anem",
  },
  es_palpatine: {
    name: "Emperor Sheev Palpatine",
    dominion: "Star Wars Galaxy, First Order",
  },
};
```

This precisely means that in a dictionary, the items are composed in a well defined shape - rather than assuming random shapes from inconsistent property names and values.

#### JavaScript Dictionaries with `Object` Prototype

In JavaScript, we can create a dictionary using the `Object` constructor and then add items:

```tsx
const dictators = new Object();

dictators["ah_aladeen"] = "Admiral Haffaz Aladeen";
dictators.bg_brother = "Big Brother";
console.log(dictators); // Object { ah_aladeen: "Admiral Haffaz Aladeen", bg_brother: "Big Brother" }
```

A different approach to creating dictionaries from a prototype is using the `Object.create()` method:

```tsx
const dictators_dictionary = { title: "The Ultimate Dictionary of Dictators" };

const dictators = Object.create(dictators_dictionary);

dictators["ah_aladeen"] = "Admiral Haffaz Aladeen";
dictators.bg_brother = "Big Brother";

console.log(dictators); // Object { ah_aladeen: "Admiral Haffaz Aladeen", bg_brother: "Big Brother" }
console.log(dictators.title); // "The Ultimate Dictionary of Dictators"
```

Dictionaries created from a prototype give access to inherited properties. You can see this in the `title` field of the above `dictators` object, which is derived from the `dictators_dictionary` prototype.

:::tip

Overall, it is important that a JavaScript object based dictionary maintains consistent structure in its item values.

:::

## Dictionaries in TypeScript

In TypeScript, the structure of a dictionary is described by respective types for its keys and values. Type annotation of dictionary entries becomes mandatory in TypeScript in order to achieve type safety and precise type specificity. Otherwise, we are subject to TypeScript compiler errors and brittle code that is dangerous for maintainability and scalability.

### Why Dictionary Type Safety is Needed in TypeScript

Since TypeScript applies a structural typing system, randomly shaped objects pose a challenge while implementing dictionaries in TypeScript. Structurally inconsistent values of dictionary key and values throw type errors in TypeScript.

One common example of dictionary type errors, as discussed later in a [later section](#how-to-solve-typescript-mapped-type-keys-problem-type-assertion-with-as), is while iterating over a dictionary via its keys extracted in an array with `Object.keys()`.

Also, TypeScript's structural typing complements the consistency of structure sought in dictionary entries. So, it is essential that we annotate well-defined types to dictionary keys and values in TypeScript.

## Dictionaries in TypeScript: How to Apply Type Safety

Implementing type-safe dictionaries in TypeScript involves annotating types to both the keys and the values of the items. Additionally, we can also apply type specificity of dictionary keys and values.

While some dictionaries may have less constrained types -- for example, as implemented with index signature -- others can achieve accurate specificity by imposing type constraints with union of keys, the `in` narrowing operator and the `as` type assertion operator.

### TypeSafe Dictionaries in TypeScript: Object Examples

In this section, we cover some of the common examples of applying type safety to `Object` based dictionaries in TypeScript.

#### TypeScript Dictionaries with Object Index Signatures

We can implement a open ended dictionary in TypeScript with index signatures. For example, the first `dictators` dictionary with a `string` value we considered in this post can be annotated as below:

```ts
type TDictators = {
  [dict_key: string]: string;
};

const dictators: TDictators = {
  ah_aladeen: "Admiral Haffaz Aladeen",
  bg_brother: "Big Brother",
  cr_snow: "Coriolanus Snow",
  es_palpatine: "Emperor Sheev Palpatine",
};

console.log(dictators.ah_aladeen); // "Admiral Haffaz Aladeen"
```

Here, we first defined a `TDictators` type with index signature syntax and then annotated the `dictators` object with `TDictators`.

Notice, we have to annotate both the key and value of the dictionary items. Notice also that this dictionary is a perpetually extendable one. That's because, with the index signature type above, we have annotated the keys to be **_any_** `string`. And we want the value to be `string` as well.

The value of a TypeScript dictionary entry can be any valid type, in order to reflect a consistent structure demanded by dictionary entries. For example, it can be an object of the following shape:

```ts
type TDictatorInfo = {
  name: string;
  dominion: string;
};
```

And this allows us to express the `dictators` dictionary values with an object that conforms to this shape:

```ts
type TDictatorInfo = {
  name: string;
  dominion: string;
};

type TDictators = {
  [dict_key: string]: TDictatorInfo;
};

const dictators: TDictators = {
  ah_aladeen: {
    name: "Admiral Haffaz Aladeen",
    dominion: "North African Republic of Wadiya",
  },
  bg_brother: {
    name: "Big Brother",
    dominion: "Oceania",
  },
  cr_snow: {
    name: "Coriolanus Snow",
    dominion: "The Capitol of Anem",
  },
  es_palpatine: {
    name: "Emperor Sheev Palpatine",
    dominion: "Star Wars Galaxy, First Order",
  },
};

dictators["sl_snoke"] = {
  name: "Supreme Leader Snoke",
  dominion: "Star Wars Galaxy, First Order",
};
```

Notice, with the above definition / annotation changes, the `dictators` dictionary remains open ended since keys can still be any `string`. So, we are able to keep adding entries, as we are doing with the `dictators["sl_snoke"] =` assignment.

However, if we try to add a value inconsistent with `TDictatorInfo`, we get TypeScript errors:

```ts
dictators["sl_kylo"] = "Supreme Leader Kylo Ern"; // Type 'string' is not assignable to type 'TDictatorInfo'.(2322)
dictators["sl_kylo"] = {
  name: "Supreme Leader Kylo Ern",
  nick_name: "Ben Solo",
}; // Object literal may only specify known properties, and 'nick_name' does not exist in type 'TDictatorInfo'.(2353)
```

Here, when we try to assign a `string` value to the item, TypeScript throws `2322` error. And when we add an inconsistent property with unknown / missing type, we get a `2353` error.

So, as we can already see, proper type annotation of dictionaries proves useful for the stability of the codebase.

:::tip

Take note that TS dictionaries with index signatures are open ended and extendable, as we can add as many items to the dictionary as we want.

:::

#### Reusable TypeScript Dictionaries with Generic Mapped Types

We can limit the keys of a dictionary with union of keys. In such cases, we need to derive a generic mapped type to describe the dictionary by narrowing down a list of keys with TypeScript's `in` operator. For example:

```ts
type TDictionary<Keys extends string | number | symbol, Value> = {
  [dict_key in Keys]: Value;
};
```

The `TDictionary` type now is a generic type that accepts `Keys` and `Value` as type parameters. `TDictionary` is also a mapped type that limits its keys to the members of `Keys` union type. `Keys` is a union type because it is being looped over by the `in` operator. And we want `Keys` to be only among `string`, `number` and `symbol` primitive types. So, we are applying type specificity on several levels to consolidate type safety besides code reusability.

Now we can use this type to constrain the dictionary entries to a certain set of keys:

```ts
type TDictionary<Keys extends string | number | symbol, Value> = {
  [dict_key in Keys]: Value;
};

type TFictionalDictatorKeys =
  | "ah_aladeen"
  | "bg_brother"
  | "cr_snow"
  | "es_palpatine";

type TDictatorInfo = {
  name: string;
  dominion: string;
};

type TFictionalDictators = TDictionary<TFictionalDictatorKeys, TDictatorInfo>;

const fictionalDictators: Partial<TFictionalDictators> = new Object();

fictionalDictators["ah_aladeen"] = {
  name: "Admiral Haffaz Aladeen",
  dominion: "North African Republic of Wadiya",
}; // Does okay. No error.

fictionalDictators["sl_snoke"] = {
  name: "Supreme Leader Snoke",
  dominion: "Star Wars Galaxy, First Order",
}; // Throws error: Property 'sl_snoke' does not exist on type 'Partial<TFictionalDictators>'.(7053)
```

Here, we limit the keys of the `TFictionalDictators` type with the `TFictionalDictatorKeys` union type and set the type for the value to `TDictatorInfo` type. We are also partializing the type for `fictionalDictators` dictionary object with the `Partial<>` transformation utility. Partializing allows us to instantiate `fictionalDictators` without initializing any property -- as with no object passed to `new Object()`.

Notice, an entry with acceptable key (`"ah_aladeen"`) encounters no complain. However, when we try to add a non-member key (`"sl_snoke"`), TypeScript throws `7053` error.

Since `TDictionary<>` is now a generic type, we can reuse it for a dictionary with `Value`s that are `string`:

```ts
type TFictionalDictators = TDictionary<TFictionalDictatorKeys, string>;

const fictionalDictators: Partial<TFictionalDictators> = new Object();

fictionalDictators["ah_aladeen"] = "Admiral Haffaz Aladeen";
console.log(fictionalDictators); // Object { ah_aladeen: "Admiral Haffaz Aladeen" }
```

### Type Safe Dictionaries in TypeScript: A `Record<>` Example

The reusable dictionary `TDictionary<>` type that we have defined implements the features of TypeScript's `Record<>` utility type. Similar to our implementation in `TDictionary<Keys, Value>`, `Record<>` is a generic type that accepts the keys and value types as type parameters to map a set of keys to a value that represents a data entity or record.

:::tip

Although TypeScript `Record<>` is often used to represent and manipulate database record types, we can use it to annotate TS `Object` based dictionaries as well.

:::

Below is the similar annotation of the `fictionalDictators` dictionary with TypeScript's `Record<>` utility:

```ts
type TFictionalDictatorKeys =
  | "ah_aladeen"
  | "bg_brother"
  | "cr_snow"
  | "es_palpatine";

type TDictatorInfo = {
  name: string;
  dominion: string;
};

type TFictionalDictators = Record<TFictionalDictatorKeys, TDictatorInfo>;

const fictionalDictators: Partial<TFictionalDictators> = {};

fictionalDictators["ah_aladeen"] = {
  name: "Admiral Haffaz Aladeen",
  dominion: "North African Republic of Wadiya",
}; // Does okay. No error.

fictionalDictators["sl_snoke"] = {
  name: "Supreme Leader Snoke",
  dominion: "Star Wars Galaxy, First Order",
}; // Same 7053 error due to union member constraint
```

## Iterating Over TypeScript Dictionaries

Type safety and type specificity of TypeScript dictionaries prove important and offer convenience while iterating over a dictionary. This is particularly because individual keys or values or entries have to be consistently typed for the iteration operations.

Most often, as in the examples we have explored so far, the types of the keys and values need to be in the form of predefined, and reusable type definitions so that all can be used as a suite accompanies with the main dictionary type:

```ts
type TDictionary<Keys extends string | number | symbol, Value> = {
  [dict_key in Keys]: Value;
};

type TFictionalDictatorKeys =
  | "ah_aladeen"
  | "bg_brother"
  | "cr_snow"
  | "es_palpatine";

type TDictatorInfo = {
  name: string;
  dominion: string;
};

type TFictionalDictators = TDictionary<TFictionalDictatorKeys, TDictatorInfo>;

const fictionalDictators: Partial<TFictionalDictators> = {};
```

There are various use cases and hence various ways where a dictionary is iterated over. Most legacy code involve iterating over a dictionary with the keys extracted in an array with `Object.keys()` method. Similar extraction of dictionary entries with `Object.entries()` and only values with `Object.values()` are also often used.

For iteration, we can use the `for...in` loop directly on the dictionary object itself or the `for...of` loop on the extracted arrays. We can also use regular JS iterators like `Array.prototype.map()`, `Array.prototype.forEach()`, `Array.prototype.reduce()` and the likes to match our use cases.

In the sections that follow, we discuss with examples the type safety aspects of some of these iteration APIs.

For these examples, we use the following types and `fictionalDictators` dictionary object:

<details>

<summary>Show example dictionary object and types</summary>

```ts
type TDictionary<Keys extends string | number | symbol, Value> = {
  [dict_key in Keys]: Value;
};

type TFictionalDictatorKeys =
  | "ah_aladeen"
  | "bg_brother"
  | "cr_snow"
  | "es_palpatine";

type TDictatorInfo = {
  name: string;
  dominion: string;
};

type TFictionalDictators = TDictionary<TFictionalDictatorKeys, TDictatorInfo>;

const fictionalDictators: TFictionalDictators = {
  ah_aladeen: {
    name: "Admiral Haffaz Aladeen",
    dominion: "North African Republic of Wadiya",
  },
  bg_brother: {
    name: "Big Brother",
    dominion: "Oceania",
  },
  cr_snow: {
    name: "Coriolanus Snow",
    dominion: "The Capitol of Anem",
  },
  es_palpatine: {
    name: "Emperor Sheev Palpatine",
    dominion: "Star Wars Galaxy, First Order",
  },
};
```

</details>

### Iterating Over TypeScript Object Dictionaries with `for...in` Loop

We have a `fictionalDictators` object and we can iterate over it directly with the `for...in` loop. The `for...in` loop gives access to the keys of the dictionary with which we can attempt to access the entries.

For example, when we want to store the fictional dictator names in an array:

```ts
const fictionalDictatorNames = [];

for (const key in fictionalDictators) {
  fictionalDictatorNames.push(fictionalDictators[key]?.name); // Gives 7053 error
}

console.log(fictionalDictatorNames);
```

With the above code, we try to populate the `fictionalDictatorNames` array with the names of the dictators from the `fictionalDicatiors` dictionary.

However, we encounter this big error:

```ts
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TFictionalDictators'.
No index signature with a parameter of type 'string' was found on type 'TFictionalDictators'.(7053)
```

We'll come to what it stands for and where it originates from in a later section when we encounter it again with `Object.keys()`, but we can fix this with type assertion using the TypeScript `as` operator:

```ts
const fictionalDictatorNames = [];

for (const key in fictionalDictators) {
  fictionalDictatorNames.push(
    // highlight-next-line
    fictionalDictators[key as TFictionalDictatorKeys]?.name,
  );
}

console.log(fictionalDictatorNames); // ["Admiral Haffaz Aladeen", "Big Brother", "Coriolanus Snow", "Emperor Sheev Palpatine"]
```

And this time, we get the desired array of dictator names without error.

### Iterating Over TypeScript Dictionaries with `for...of` Loop

The `for...of` loop can be used to iterate over array of keys, values and key-value tuples.

For example, we can get the same `fictionalDictatorNames` array in the previous example by extracting the keys first in a separate array with `Object.keys()`. And then by iterating over the array with `for...of` loop to populate `fictionalDictatorNames`:

```ts
const dictatorKeysArray = Object.keys(fictionalDictators);
const fictionalDictatorNames = [];

// highlight-start
for (const key of dictatorKeysArray) {
  fictionalDictatorNames.push(
    fictionalDictators[key as TFictionalDictatorKeys]?.name,
  );
}
// highlight-end

console.log(fictionalDictatorNames); // ["Admiral Haffaz Aladeen", "Big Brother", "Coriolanus Snow", "Emperor Sheev Palpatine"]
```

Notice this time too, we need to apply type assertion with the `as` operator. Otherwise, we get the same `7053` error.

Let's cover a couple of more examples of using the `for...of` loop. In the code snippet below, we iterate over the dictionary values and also the key-value entries themselves:

```ts
const dictatorsInfoArray = Object.values(fictionalDictators);
const fictionalDictatorNames = [];

for (const value of dictatorsInfoArray) {
  fictionalDictatorNames.push(value?.name);
}
console.log(fictionalDictatorNames); // ["Admiral Haffaz Aladeen", "Big Brother", "Coriolanus Snow", "Emperor Sheev Palpatine"]

const dictatorItemsArray = Object.entries(fictionalDictators);
const fictionalDictatorList = [];

for (const entry of dictatorItemsArray) {
  fictionalDictatorList.push(entry[1]);
}

console.log(fictionalDictatorList);
```

In the first part that involves the values extracted with `Object.values()`, we iterated over the `dictatorsInfoArray` array and used each `value` to populate the `fictionalDictatorNames` like before, but this time without utilizing the keys.

In the second part, we extracted the dictionary entries with `Object.entries()` which gives an array of key-value tuples. We then iterate over the array and populate the `fictionalDictatorList` array with the dictionary entry values.

Notice, in both instances, we didn't need to apply any type assertion like we had to with `Object.keys()`. The respective types for the values and entries are assigned by TypeScript's intelligent type inference.

The `fictionalDictatorList` ends up being an array of `TDictatorInfo` objects.

<details>

<summary>Show `fictionalDictatorList` array</summary>

```ts
[
  {
    name: "Admiral Haffaz Aladeen",
    dominion: "North African Republic of Wadiya",
  },
  {
    name: "Big Brother",
    dominion: "Oceania",
  },
  {
    name: "Coriolanus Snow",
    dominion: "The Capitol of Anem",
  },
  {
    name: "Emperor Sheev Palpatine",
    dominion: "Star Wars Galaxy, First Order",
  },
];
```

</details>

The original `dictatorItemsArray` entries generated by `Object.entries(fictionalDictators)` is an array of dictionary key-value tuples.

<details>

<summary>Show `dictatorItemsArray`</summary>

```ts
[
  [
    "ah_aladeen",
    {
      name: "Admiral Haffaz Aladeen",
      dominion: "North African Republic of Wadiya",
    },
  ],
  [
    "bg_brother",
    {
      name: "Big Brother",
      dominion: "Oceania",
    },
  ],
  [
    "cr_snow",
    {
      name: "Coriolanus Snow",
      dominion: "The Capitol of Anem",
    },
  ],
  [
    "es_palpatine",
    {
      name: "Emperor Sheev Palpatine",
      dominion: "Star Wars Galaxy, First Order",
    },
  ],
];
```

</details>

The inferred type of this object has a shape similar to the `Map` prototype and it looks as below:

```ts
type TDictatorItemsArray: [string, TDictatorInfo][]
```

We cover type-safe TypeScript `Map` based dictionaries in [this later section](#typescript-dictionaries-with-js-map-prototype).

### Iterating Over TypeScript Dictionaries with Array Methods

It is common to use `Array` iterators such as `Array.prototype.map()`, `Array.prototype.reduce()`, `Array.prototype.forEach()` to traverse through arrays generated by `Object.keys()`, `Object.values()` and `Object.entries()`. These iterators operate in similar ways with `O(n)` complexity, so we'll just cover an example of `Array.prototype.map()`.

For instance, we want to map `fictionalDictators` to only its dominions based on the keys extracted with `Object.keys()`:

```ts
const dictatorKeysArray = Object.keys(fictionalDictators);
const fictionalDictatorships = dictatorKeysArray?.map(
  (key) => fictionalDictators[key]?.dominion,
);
console.log(fictionalDictatorships);
```

Here also, we run into the same `7053` error we encountered before with object keys:

```ts
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TFictionalDictators'.
No index signature with a parameter of type 'string' was found on type 'TFictionalDictators'.(7053)
```

#### How to Solve TypeScript Mapped Type Keys Problem: Type Assertion with `as`

Basically, the `7503` error happens when we use the keys to iterate over a dictionary when it is an object represented by a TypeScript mapped type. Apparently, the error above points to incompatibility of the `string` type of the items in the array extracted by `Object.keys()` to the union keys, `TFictionalDictatorKeys`, in the `TDictionary` mapped type.

Even if we try to annotate the keys directly with `string[]` or `TFictionalDictatorKeys` they are still incompatible. In other words, these remain invalid:

```ts
const dictatorKeysArray: string[] = Object.keys(fictionalDictators); // Gives same 7503 error

// OR
const dictatorKeysArray: TFictionalDictatorKeys =
  Object.keys(fictionalDictators); // Gives 2322 error
```

Therefore, we have to assert the `key` to `TFictionalDictatorKeys` with the help of the `as` type assertion operator:

```ts
const dictatorKeysArray = Object.keys(fictionalDictators);
const fictionalDictatorships = dictatorKeysArray?.map(
  // highlight-next-line
  (key) => fictionalDictators[key as TFictionalDictatorKeys]?.dominion,
);
console.log(fictionalDictatorships); // ["North African Republic of Wadiya", "Oceania", "The Capitol of Anem", "Star Wars Galaxy, First Order"]
```

## Type Narrowing for Key Lookups

While dealing with dictionaries or maps in TypeScript, it becomes compulsory to handle type safety with respect to the keys. The most common scenario is digging down to the possible kinds of types for those keys so that they might prevent any sort of key lookup error. Such narrowing of types will help us ensure that we access the keys only from those sets that are known to be valid, making processes more predictable and with fewer runtime errors.

With dynamic keys on a dictionary, TypeScript often doesn’t know if the key will exist on the dictionary. We can work around this by applying a type guard or conditional check to tell TypeScript what type we are expecting at certain points in the code, making our accessed dictionary much safer and avoiding TypeScript errors.

For example, consider a dictionary describing fictional characters, where each key of the dictionary is a character alias and each value provides information about the character. Here’s how we can access dictionary entries safely by narrowing down the type of the key:

```tsx
type CharacterInfo = {
  name: string;
  universe: string;
};

type Characters = {
  [key: string]: CharacterInfo;
};

const characters: Characters = {
  aladeen: { name: "Admiral Aladeen", universe: "Wadiya" },
  vader: { name: "Darth Vader", universe: "Star Wars" },
};

// Type narrowing example
function getCharacterInfo(characterAlias: string) {
  if (characterAlias in characters) {
    return characters[characterAlias];
  }
  return null; // Alias not found
}
```

In this example:

- We check with the in operator whether the key characterAlias exists in the dictionary characters.
- TypeScript narrows the type of characterAlias to keys that exist within the characters dictionary, avoiding “key not found” errors.

Type narrowing here ensures we access only valid entries in our dictionaries, particularly useful in larger projects pulling data from dynamic sources. This stops any unexpected errors in lookup and keeps TypeScript happy, making our code much safer to maintain over time.

## TypeScript Dictionaries with the `Map` Prototype

TypeScript dictionaries can also be implemented with the ES2015 `Map` prototype. The ES2015 `Map` data structure is an array of key-value tuples. TypeScript offers native support for `Map` data structure as a generic that accepts types for the keys and entry values as type parameters.

### Closed Set Dictionaries with TypeScript `Map`

We can express TypeScript dictionaries with `new Map<Keys, Value>`, as we did with the custom generic types such as `TDictionary<>` and the `Record<>` utility.

For example, we can re-write the `fictionaDictators` dictionary with the `TFictionalDictatorKeys` keyset using a `Map`:

```ts
type TDictionary<Keys extends string | number | symbol, Value> = {
  [dict_key in Keys]: Value;
};

type TFictionalDictatorKeys =
  | "ah_aladeen"
  | "bg_brother"
  | "cr_snow"
  | "es_palpatine";

type TDictatorInfo = {
  name: string;
  dominion: string;
};

type TFictionalDictators = Map<TFictionalDictatorKeys, TDictatorInfo>;

const fictionalDictators: TFictionalDictators = new Map([
  [
    "ah_aladeen",
    {
      name: "Admiral Haffaz Aladeen",
      dominion: "North African Republic of Wadiya",
    },
  ],
  [
    "bg_brother",
    {
      name: "Big Brother",
      dominion: "Oceania",
    },
  ],
]);

fictionalDictators.set("cr_snow", {
  name: "Coriolanus Snow",
  dominion: "The Capitol of Anem",
}); // Works okay. No error

console.log(fictionalDictators); // Map(3)

fictionalDictators.set("sl_snoke", {
  name: "Supreme Leader Snoke",
  dominion: "Star Wars Galaxy, First Order",
}); // Argument of type '"sl_snoke"' is not assignable to parameter of type 'TFictionalDictatorKeys'.(2345)
```

You can notice, this time, we are using the TypeScript type supported `Map` class. And we can use it with the same type parameters for `Keys` and `Value`s as we did before with the `Object` examples.

Notice that we are now passing a array of tuples to the `new Map` initializer. This is similar to the array of tuples we get from `Object.entries()` in the `TDictionary<>` example with `Object` instance. Take note also that we are not able to enter invalid keys (`"sl_snoke"`) when we limit them to a union with `TFictionalDictatorKeys`.

### Open Ended Dictionaries with TypeScript `Map`

When we want the `Map` based dictionary to be extendable, we can just make the keys to be more generous `string`s:

```ts
// highlight-next-line
type TFictionalDictators = Map<string, TDictatorInfo>;

const fictionalDictators: TFictionalDictators = new Map();

fictionalDictators.set("cr_snow", {
  name: "Coriolanus Snow",
  dominion: "The Capitol of Anem",
});

fictionalDictators.set("sl_kyloren", {
  name: "Supreme Leader Kylo Ern",
  dominion: "Star Wars Galaxy, First Order",
});

console.log(fictionalDictators); // Map(2)
```

## Advanced Mapped Types to Dynamically Create Dictionaries

I wanted to share some tips on handling dynamic dictionaries in TypeScript using advanced mapped types. This technique is especially helpful when we have complex dictionaries where each key needs a specific structure but the overall data type should stay consistent.

Let’s say we have an object representing different departments in a company, where each department has a team, and each team member has attributes like name, role, and years of experience.

```tsx
type TeamMember = {
  name: string;
  role: string;
  experience: number;
};

type Departments = "engineering" | "marketing" | "sales";

type DepartmentDictionary = {
  [K in Departments]: TeamMember[];
};

const companyDepartments: DepartmentDictionary = {
  engineering: [
    { name: "Alice", role: "Developer", experience: 5 },
    { name: "Bob", role: "DevOps Engineer", experience: 3 },
  ],
  marketing: [{ name: "Carol", role: "Marketing Specialist", experience: 4 }],
  sales: [{ name: "Dave", role: "Sales Lead", experience: 6 }],
};
```

- Defining Departments: This type sets a list of allowed department names.
- DepartmentDictionary with Mapped Type: We use a mapped type to specify that each department (e.g., engineering, marketing) contains a list of TeamMember objects.
- Consistent Data Structure: This approach keeps our data structured, ensuring each entry follows the same format.

Advanced mapped types help us lock down the structure of dynamic dictionaries, preventing unexpected issues. By restricting keys and types in this way, we leverage TypeScript’s strong type-checking, which keeps things predictable and minimizes errors.

## Dictionary Validation with Custom Types

Here is a quick breakdown on how to validate dictionaries in TypeScript using custom types. This will be super helpful in keeping our dictionaries consistent and catching mistakes early, especially with complex data.

Imagine we have a settings dictionary for an app, where each setting needs a specific type. Using custom types, we can specify a structure that ensures each setting has the expected type.

```tsx
type SettingType = "boolean" | "string" | "number";

type AppSetting<T extends SettingType> = T extends "boolean"
  ? boolean
  : T extends "string"
  ? string
  : number;

type AppSettings = {
  [key: string]: AppSetting<SettingType>;
};

const settings: AppSettings = {
  darkMode: true, // boolean type
  theme: "light", // string type
  timeout: 30, // number type
};
```

What’s Going On Here?

- SettingType defines the allowed types.
- AppSetting is a conditional type that maps each setting type to its correct JavaScript type.
- AppSettings is our dictionary type, where each key must match an appropriate SettingType.

When using custom types like this, TypeScript will catch mismatched types if someone tries to assign the wrong type to a setting.

## Summary

In this post, we covered in significant depth how to implement properly defined and annotated dictionaries in TypeScript. We illustrated common approaches of applying type safety to TypeScript dictionaries defined with `Object` and `Map` APIs, the `Record<>` utility type, the `for...in` and `for...of` loops as well as the `Array.prototype.map()` method.

We stressed that dictionaries are composed of key-value pairs that are described by respective types in TypeScript. We acknowledged how proper type definition and annotation in `Object` based dictionaries lead to consistent and type safe code that offer convenient type inference later during iteration. As part of the examples, we implemented the same `fictionalDictators` dictionary in three different ways: first with a custom typed `TDictionary<>` utility, then using the TypeScript `Record<>` utility type and finally with the TypeScript type supported `Map<>` instance.

While exploring the examples, we encountered a type incompaitbility problem (TS `7503` error) of dictionary keys implemented with a TypeScript mapped type. And we learned how to resolve it by type assertion with the `as` operator.
