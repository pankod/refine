---
title: JavaScript Substring Method
description: We'll learn how to use JavaScript substring method to extract substrings from a parent string.
slug: javascript-substring-method
authors: abdullah_numan
category: "Tutorials"
tags: [javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-23-js-substring/social-2.png
hide_table_of_contents: false
last_update: 2025-01-01
---

**This article was last updated on December 31, 2024, to include common mistakes to avoid when working with JavaScript’s substring() method, such as skipping the endIndex or misunderstanding negative indices. A Frequently Asked Questions section has also been added to clarify common issues and provide practical examples.**

## Introduction

This post is about how to effectively use the `String.prototype.substring()` method in JavaScript. We go through a few examples to understand how it works, play around to observe a few patterns and explore the quirks.

### What is JavaScript `substring()`?

JavaScript `substring()` is a `String` method that is typically used to extract and store part of a string. During the extraction, the original string remains intact, and the target part is returned as a new string.

`String.prototype.substring()` is handy for producing substrings of characters from a point to another of a parent string. The substring may be from the beginning, in-between specified indexes or from the tail.

In this post, we perform some exercise with the JS `substring()` method by going through a few examples. We start by getting familiar with the method signature of `String.prototype.substring()`, the required argument (`startIndex`), the additional argument (`endIndex`) and understand which ones to use when. We then go ahead and see examples of extracting a number of characters after a starting index, characters from a range between two indexes, characters from the beginning and from the tail. While doing so, we elaborate on a few patterns of extraction from a parent string: namely, that of extracting a tail after first `n` characters, another of producing a substring composed of first `n` characters and that of extracting last `n` characters.

In the later half of the post, we discuss some of the nuances associated with `startIndex` and `endIndex` values. In the end, we point out how JavaScript `String.prototype.substring()` compares to `String.prototype.slice()` as well as the deprecated method `String.prototype.substr()`.

Step by step, we'll cover the following topics:

- [Introduction](#introduction)
- [JavaScript `substring()` Method](#javascript-substring-method)
  - [`Array.prototype.substring()` Method Signature](#arrayprototypesubstring-method-signature)
  - [JavaScript `substring()` with `startIndex` Only](#javascript-substring-with-startindex-only)
  - [Extract Tail After First `n` Characters - JavaScript `substring()`](#extract-tail-after-first-n-characters---javascript-substring)
  - [JavaScript `String.prototype.substring()` - Extract a Substring Between Two Points](#javascript-stringprototypesubstring---extract-a-substring-between-two-points)
  - [Extract First `n` Characters - JavaScript `substring()`](#extract-first-n-characters---javascript-substring)
  - [Extract Last `n` Characters Using `String.prototype.substring()`](#extract-last-n-characters-using-stringprototypesubstring)
- [Nuances of `startIndex` and `endIndex` in JavaScript `substring()`](#nuances-of-startindex-and-endindex-in-javascript-substring)
  - [JavaScript `substring()` with `startIndex > endIndex`](#javascript-substring-with-startindex--endindex)
  - [JavaScripty `substring()` with Negative `startIndex` and `endIndex`](#javascripty-substring-with-negative-startindex-and-endindex)
- [`String.prototype.substring()` Comparison](#stringprototypesubstring-comparison)
  - [JavaScript `substring()` vs `slice()`](#javascript-substring-vs-slice)
  - [JavaScript `substring()` vs `substr()`](#javascript-substring-vs-substr)
- [Common Mistakes When Working With substring()](#common-mistakes-when-working-with-substring)
  - [Skipping endIndex](#skipping-endindex)
  - [Reversed Indices Confusion](#reversed-indices-confusion)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Summary](#summary)

## JavaScript `substring()` Method

`Array.prototype.substring()` takes two possible arguments: a `startIndex` and an `endIndex`. `startIndex` is mandatory, while `endIndex` can be passed to explicitly indicate the termination of extraction.

### `Array.prototype.substring()` Method Signature

We can call `substring()`with the below possible signatures:

```js
substring(startIndex);
substring(startIndex, endIndex);
```

`startIndex` represents the point where substring extraction kicks off. The value at `startIndex` is **inclusive**, i.e. it is included in the returned substring. The `endIndex` denotes termination of the extraction. However, the value at `endIndex` is **excluded**. This means that we end extraction at the character **_before_** `endIndex`.

Let's see this in action with some examples.

### JavaScript `substring()` with `startIndex` Only

With only `startIndex` passed to `substring()`, we get a substring that begins at `startIndex` and spans to the end of the parent string:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";
console.log(mnemonic.substring(14)); // "cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked."
```

As we can figure out from the string above, chopping starts at `startIndex` and we get the tail from that point on.

### Extract Tail After First `n` Characters - JavaScript `substring()`

Since we are using a zero-based index for `startIndex`, the first `startIndex` number of characters are represented by the index just **before** `startIndex`. And since the value at `startIndex` is included in the extracted tail, the following pattern emerges where with `startIndex = n`, we get the tail **after** first `n` characters in the parent string:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

// Extract characters after first 14
console.log(mnemonic.substring(14)); // "cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked."

// Extract tail after first 20
console.log(mnemonic.substring(20)); // "monkeys, and, zebras, in, large, cages, make, sure, padlocked."

// Extract tails after 29
console.log(mnemonic.substring(29)); // "and, zebras, in, large, cages, make, sure, padlocked."

// Extract after 72
console.log(mnemonic.substring(72)); // "padlocked."
```

### JavaScript `String.prototype.substring()` - Extract a Substring Between Two Points

When we pass both the `startIndex` and `endIndex`, we get a substring of characters in `startIndex <= str < endIndex` range:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";
console.log(mnemonic.substring(14, 27)); // "cats, monkeys"
```

This means, now we end up with a substring that ends **before** the `endIndex`.

### Extract First `n` Characters - JavaScript `substring()`

When we need a substring from the start of the parent string, the `startIndex` should be `0`:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";
console.log(mnemonic.substring(0, 27)); // "Please send, cats, monkeys"
```

With `startIndex = 0` and `endIndex = n`, we get the first `n` characters from the parent string:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

// First 12 characters
console.log(mnemonic.substring(0, 12)); // "Please, send"

// First 18 characters
console.log(mnemonic.substring(0, 18)); // "Please, send, cats"

// First 27 characters
console.log(mnemonic.substring(0, 27)); // "Please, send, cats, monkeys"

// First 70 characters
console.log(mnemonic.substring(0, 70)); // "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure"
```

### Extract Last `n` Characters Using `String.prototype.substring()`

We can get the last `n` characters by leveraging the caller `length` in `startIndex`:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

// Last 9 characters
console.log(mnemonic.substring(mnemonic.length - 9)); // "padlocked."

// Last 15 characters
console.log(mnemonic.substring(mnemonic.length - 15)); // "sure, padlocked."
```

The way the above pattern works is that `mnemonic.length` sets the `startIndex` **just outside** the parent string. Moving `startIndex` back by `-n` repositions the extraction entry to the tail by `n`. And since we are not passing `endIndex`, extraction continues till the end of the string. So, we get the last `n` characters.

## Nuances of `startIndex` and `endIndex` in JavaScript `substring()`

Other quirks of using `substring()` include cases when `startIndex` is greater than `endIndex` and when either of `startIndex` and `endIndex` or both are negative. Let's look at them one by one.

### JavaScript `substring()` with `startIndex > endIndex`

When `startIndex` is greater than `endIndex` JavaScript `substring()` **swaps** the indexes to produce the substring:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

// Swaps to mnemonic.substring(0, 6)
console.log(mnemonic.substring(6, 0)); // "Please"
```

### JavaScripty `substring()` with Negative `startIndex` and `endIndex`

A negative value of `startIndex` or `endIndex` sets the respective value to `0`:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

// Same as mnemonic.substring(0, 6)
console.log(mnemonic.substring(-1, 6)); // "Please"

// Same as mnemonic.substring(0, 0)
console.log(mnemonic.substring(-1, -6)); // ""

// // Same as mnemonic.substring(12, 0)
console.log(mnemonic.substring(12, -6)); // "Please, send"
```

In the last invocation above, swapping between `startIndex` and `endIndex` is also involved since `12 > 0`. The call is equivalent to `mnemonic.substring(0, 12);`.

## `String.prototype.substring()` Comparison

In this section, we briefly discuss how JavaScript `substring()` method differs from `slice()` and `substr()`, which are also similar `String`extraction methods.

### JavaScript `substring()` vs `slice()`

`String.prototype.substring()` and `String.prototype.slice()` both implement string extraction almost identically. However, there are some subtle differences in their implementations.

For example, swapping of arguments -- which we saw above in `substring()` -- doesn't take place in `slice()` when `startIndex > endIndex`:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

// Swaps to mnemonic.substring(0, 6)
console.log(mnemonic.substring(6, 0)); // "Please"

// Doesn't swap. Returns empty string, meaning non-existent characters
console.log(mnemonic.slice(6, 0)); // ""
```

With `slice()`, `startIndex > endIndex` returns an empty string.

Another difference is when either or both of `startIndex` and `endIndex` are negative. In general, when they are negative, `slice()` wraps `startIndex` and `endIndex` to the tail by traversing backward from the last character. And then if `startIndex < endIndex`, slicing works:

```js
const mnemonic = "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

// Zeroes and swaps to mnemonic.substring(0, 18)
console.log(mnemonic.substring(18, -12)); // "Please, send, cats"

// Doesn't swap, -12 finds index from tail. String is long enough, slicing works
console.log(mnemonic.slice(20, -12)); // "monkeys, and, zebras, in, large, cages, make, sure"
.........

console.log(mnemonic.substring(-12, 18)); // "Please, send, cats"

// Doesn't swap. -12 finds index from tail, but startIndex > endIndex. Returns non-existent string
console.log(mnemonic.slice(-12, 18)); // ""
.........

console.log(mnemonic.substring(-16, -12)); // ""

// Both startIndex and endIndex finds index from tail. startIndex < endIndex. Slicing works
console.log(mnemonic.slice(-16, -12)); // "sure"
```

### JavaScript `substring()` vs `substr()`

JavaScript `substr()` is also another method for extracting substrings from a parent string. However, it is a legacy `String` method that accepts the `length` of the target substring, instead of an index for extraction exit.

In other words, with `substr()`, we get indicate the `length` of the substring:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

console.log(mnemonic.substring(10, 12)); // "nd"

// Gets 12 characters starting from startIndex onwards
console.log(mnemonic.substr(10, 12)); // "nd, cats, mo"
```

Also, as with `slice()`, with a negative `startIndex`, `substr()` counts backwards from the last character:

```js
const mnemonic =
  "Please, send, cats, monkeys, and, zebras, in, large, cages, make, sure, padlocked.";

console.log(mnemonic.substring(-10, 12)); // "Please, send"

// startIndex wraps to 10 items from tail. Gets 10 characters from tail, doesn't have the other 2
console.log(mnemonic.substr(-10, 12)); // "padlocked."
```

In this case, only `10` characters are picked because `2` out of targeted `12` are not available in the last `10` characters.

## Common Mistakes When Working With substring()

Over the years, I have encountered a few mistakes developers make using the substring() method. Let me outline them below.

### Skipping endIndex

A lot of us forget that the endIndex is optional. If you don’t pass it, substring() just extracts everything from the startIndex to the end of the string. That’s OK most of the time, but if you accidentally leave it out when you meant to extract a certain range, it may mess things up.

```tsx
const text = "Hello, World!";
console.log(text.substring(7)); // "World!"
console.log(text.substring(7, 12)); // "World"
```

Before using substring(), I double-check whether I really need the endIndex or not.

```tsx
const text = "Hello, World!";
console.log(text.substring(-5)); // "Hello, World!" (negative becomes 0)
console.log(text.slice(-5)); // "orld!"
```

What I do now: In cases when I need negative indexing, I stick with slice().

### Reversed Indices Confusion

If the value of startIndex is greater than the value of endIndex, substring() will swap them. If you’re not paying attention, it can lead to unexpected behavior.

```tsx
const text = "Hello, World!";
console.log(text.substring(12, 7)); // "World" (indices are swapped)
console.log(text.slice(12, 7)); // "" (slice doesn't swap, just returns an empty string)
```

What I do now: Always ensure that startIndex <= endIndex whenever using substring().

## Frequently Asked Questions

**What if startIndex equals endIndex?**

You will get an empty string because substring() does not include the endIndex.

```tsx
const text = "Hello, World!";
console.log(text.substring(5, 5)); // ""
```

**Can substring() change the original string?**

Nope - it’s non-destructive, simply returning the new string and leaving the original alone.

```tsx
const text = "Hello, World!";
const result = text.substring(7);
console.log(result); // "World!"
console.log(text); // "Hello, World!"
```

**What if the indices are out of range?**

If the indices exceed the length of the string, substring() will simply stop at the string’s end.

```tsx
const text = "Hello";
console.log(text.substring(2, 10)); // "llo"
console.log(text.substring(10, 20)); // ""
```

**How does substring() differ from slice()?**

Both do similar things, but here’s the difference:

- substring() swaps indices if startIndex > endIndex. slice() doesn’t.
- slice() supports negative indices; substring() doesn’t.

```tsx
const text = "Hello, World!";
console.log(text.substring(7, 12)); // "World"
console.log(text.slice(-5)); // "orld!"
```

**Negative Indices Misconception**

Here’s a big one: substring() doesn’t handle negative numbers. If you pass in a negative startIndex or endIndex, it will just treat them as 0. I’ve seen people confuse this with slice(), which actually supports negative indices.

## Summary

In this post, we exercised the use of JavaScript `substring()` with some basic examples. We first learned that `substring()` is a `String` extraction method that returns a target portion from a parent string. We got familiar with the required `startIndex` argument whose value is included in the extracted substring, and also with the `endIndex` argument which indicates termination of the string.

We then explored with examples how to use `substring()` with only `startIndex` and discovered how to extract the tail after first `n` characters of the parent string. We also saw how to extract a substring between two points with `startIndex` and `endIndex` passed. We found out another pattern where we can produce the first `n` characters by passing `0` as `startIndex` and `n` as the `endIndex`. We also figured out how we can extract the last `n` characters using caller `length - n`.

Towards the later half, we touch based on some other nuances of using `startIndex` and `endIndex` values. In the end, we compared and discussed how `substring()` differs in implementation from JavaScript `slice()` and `substr()`.
