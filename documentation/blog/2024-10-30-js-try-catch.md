---
title: Error Handling With try, catch and finally Blocks in JavaScript
description: We'll see how to handle errors in JavaScript using the try/catch/finally blocks.
slug: javascript-try-catch-finally
authors: abdullah_numan
category: "Tutorials"
tags: [javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-22-js-try-catch/social.png
hide_table_of_contents: false
last_update: 2024-10-31
---

**This article was last updated on October 30, 2024 to clarify explanations and add sections on handling JSON operations, user input, file operations in Node.js, and scenarios for using try-catch effectively.**

## Introduction

This post is about graceful error handling in JavaScript where we explore the use of `try/catch/finally` blocks.

## What are Errors?

Errors are integral part of programming. Errors in JavaScript can arise while writing code due to syntax related issues like missing or mistyped variables, duplicate variables, wrong use of JavaScript constructs, etc. They can also happen at run time due to internal errors at an external server, unreachable resources at an API endpoint, broken or missing data structures - whose interfaces are usually manipulated by our program, etc.

Syntax errors are generally tracked by linters but are also pointed out when the buggy code is executed by JavaScript's engine, i.e. at run time. Errors thrown at run time are often referred to as **exceptions**. Exceptions throw an `Error` object that - if unhandled proactively - instantly terminates the script and does not allow execution of the rest of the code.

So, when an error is expected, in order to avoid breaking our program, it is important to handle errors gracefully and direct the flow of the program to a safe avenue where further execution resumes unhindered.

### What is Graceful Error Handling?

Graceful error handling refers to an approach in programming where we proactively consider the scenarios that might lead to an error, design our control flow to handle these possible errors and direct the control of the program in each case in such a way that execution continues unterminated.

In JavaScript, we do this with the `try/catch/finally` construct.

In this article, we get into the details of what the `try`, `catch` and `finally` blocks represent and how they work together with examples. And on the way, we will discuss about what nesting of these blocks bring to the table. We'll also spend some time delving into how the `finally {...}` block is used to guide the control of the script to carry out routine procedures, like closing down a write stream in a file.

Let's start with how `try/catch/finally` works first.

## How `try/catch/finally` Blocks Work

The `try/catch/finally` construct, it's obvious, can have three possible blocks. A `try {...}` block, a `catch {...}` block and a `finally {...}` block. Of these three, `try {...}` is always a must. And we need one more: either `catch {...}` or `finally {...}` to make the `try {...}` block relevant. The possible scenarios covered by this are:

```tsx
// Possibility 1: try/catch statement
try {
  // Things to be tried
} catch (e) {
  // Catch errors thrown in try and do something with it
}

// Possibility 2: try/finally statement
try {
  // Things to be tried
} finally {
  // Standard procedures to be completed regardless of the output in try block
}
```

So at least two blocks make up a `try` control flow. We can also have another possibility that involves the `finally {...}` block as the third:

```tsx
try {
  // Try stuff
  // Throw graceful error
} catch (e) {
  // Catch error and do relevant stuff like log to console, retry, redirect, etc.
} finally {
  // Do standard stuff like cleanup, closing file, send log data, etc after try and catch
}
```

Below, we go through each block with examples for each possible scenario above.

### Running Usual Code In The `try` Block

The `try {...}` block contains the code which we want to execute in our normal control flow but bears the risk of throwing an error. It could be just another part of the synchronous procedures we declare in our script, such as the first `console.log()` statement below:

```tsx
console.log("We are exploring error handling with try/catch/finally");
// 'We are exploring error handling with try/catch/finally'

console.log("This is safe avenue.");
// 'This is safe avenue.'
```

Here, the control makes it to the safe zone and logs both statements. But if we introduce an error, the program crashes entirely - not reaching the safe avenue:

```tsx
console.logd("We are exploring error handling with try/catch/finally");
console.log("This is safe avenue.");

// TypeError: console.logd is not a function
```

Here, the intentional mistake in `console.logd` throws a `TypeError`. And strikingly, the execution is halted entirely. No dealing with the error, no redirection, just a bunch of stack information.

That's bad. We need to deal with this proactively.

Let's use a `try/catch` block. We need to put the code of our interest inside the `try` block:

```tsx
try {
  console.logd("We are exploring error handling with try/catch/finally");
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
}

console.log("This is safe avenue.");

// Hello, you erred'n we messed. We are thy m'ssinjas.
// This is safe avenue.
```

Now, we placed our `console.logd()` statement inside the `try` block. It's still buggy and throws the same exception, but it did not lead to termination of execution. It instead diverted the control to the `catch` block, executed the code there and eventually moved control to the safe zone.

Let's just fix the error so the control remains in the `try` block and the program makes it to the safe zone through our desired, error-free path:

```tsx
try {
  console.log("We are exploring error handling with try/catch/finally");
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
}

console.log("This is safe avenue.");

// We are exploring error handling with try/catch/finally
// This is safe avenue.
```

And it does.

**`try` Block with Synchronous Functions**

We can invoke any function inside the `try` block. Let's refactor the first log statement into a function and use it inside `try` block:

```tsx
function sayWhatWeReDoing() {
  console.log("We are exploring error handling with try/catch/finally");
}

try {
  sayWhatWeReDoing();
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
}

console.log("This is safe avenue.");
// We are exploring error handling with try/catch/finally
// This is safe avenue.
```

The result is the same.

## The `catch` Block

Now, as we've seen in the buggy `console.logd()` example, presence of the `catch` block creates a fork when we have errors in our desired flow in the `try` block. Let's focus on the `catch` block now.

The `catch` block offers an alternate channel to transfer execution control in the case of an error raised in the `try` block. When an error is raised, the `catch` block allows a way out from crashing the program. That is, the `catch` block allows us to handle errors gracefully.

**`catch` Without the `Error` Object**

In the previous example, when we erred with `console.logd()`, we were able to log another statement we provided in the `catch` block:

```tsx
try {
  console.logd("We are exploring error handling with try/catch/finally");
} catch {
  console.log(`Hello, you erred'n we messed. We are thy m'ssinjas.`);
}

console.log("This is safe avenue.");

// Hello, you erred'n we messed. We are thy m'ssinjas.
// This is safe avenue.
```

Notice in the beginning of the `catch` block, we don't have any argument passed. This is because, here we did not require access to the `Error` object produced by our error.

So, we may choose to ignore the `Error` object totally.

**`catch` With the `Error` Object**

However, we may also choose to use the `Error` object if we need to. And most often we do.

We can access the `Error` object as an argument passed to the `catch` block, with `catch(e)` or anything replacing `e` really. It's the only argument that's available from `try` to the `catch` block. And it's not available to other blocks.

It consists of the `name` of the error and a `message`. Let's see what the error was in our above case:

```tsx
try {
  console.logd("We are exploring error handling with try/catch/finally");
} catch (e) {
  console.log(`${e.name}: ${e.message}`);
}

console.log("This is safe avenue.");

// TypeError: console.logd is not a function
// This is safe avenue.
```

Clearly, it was our intentional typo.

**`throw`ing Custom Errors**

It is important to note that exceptions thrown at the `try` block is caught by only the `catch` block of the same construct. We'll come to this in the next two sections below. Exceptions thrown in the `catch` block itself and in the `finally` block are not accessible from the `catch` block of the same construct.

We can throw custom errors with JavaScript's `throw` method, and even if there is perfect code written after the `throw`, the later code won't be run because the control has moved to the `catch` block already:

```ts
try {
  console.log("We are exploring error handling with try/catch/finally");
  throw Error("We wanted this Error just to make a point.");
  console.log("Perfect code here. But does not run.");
} catch (e) {
  console.log(`${e.name}: ${e.message}`);
}

console.log("This is safe avenue.");

// We are exploring error handling with try/catch/finally
// Error: We wanted this Error just to make a point.
// This is safe avenue.
```

Here, the "perfect code" statement did not get logged to the console, because `try` spewed `Error` before that and control already moved to `catch`.

**Nested `try/catch` Blocks**

We can nest `try/catch` blocks. Let's see how errors interact between nesting levels:

```ts
try {
  console.log("We are exploring error handling with try/catch/finally");
  try {
    console.log("This is second level try/catch block.");
    throw Error("Custom error thrown from second level.");
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
  }
} catch (e) {
  console.log(`Error from first level:\n"${e}"`);
}

console.log("This is safe avenue.");

// We are exploring error handling with try/catch/finally
// This is second level try/catch block.
// Error: Custom error thrown from second level.
// This is safe avenue.
```

In the above snippet, the custom error thrown in the nested `try` block is caught in the `catch` block of the same construct. That is, it remains in the same level.

**Rethrowing**

We can rethrow an error in a nested `try/catch` block, and it will be picked by an ancestor `try/catch` block:

```ts
try {
  console.log("We are exploring error handling with try/catch/finally");
  try {
    console.log("This is second level try/catch block.");
    throw Error("Custom error thrown from second level.");
  } catch (e) {
    throw e;
  }
} catch (e) {
  console.log(`Error from first level:\n"${e}"`);
}

console.log("This is safe avenue.");
/* We are exploring error handling with try/catch/finally
   This is second level try/catch block.
   Error from first level:
   "Error: Custom error thrown from second level."
   This is safe avenue.
*/
```

In the above chunk, we rethrew `e` with `throw(e)` inside the `catch` block of the child `try/catch` block. It was picked up by the `catch` block of the parent `try/catch` section:

```ts
/* Error from first level:
   "Error: Custom error thrown from second level."
*/
```

These are most of the "gotchas" of using the `catch` block.

### The `finally` Block

The `finally {...}` block - if applied - is the block where the control flow moves before it exits the `try/catch/finally` or `try/finally` construct. It contains code that is part of the standard set of procedures, such as closing the write stream of a file regardless of whether an attempted write operation throws an error or not:

```ts
const fs = require("fs");
const writeStream = fs.createWriteStream("nodeFsTest");

try {
  console.log("Starting writing...");
  writeStream.write("Hi,");
  writeStream.write("\nThis is finally in action.");
} catch (e) {
  console.log(e);
} finally {
  console.log("Closing file...");
  writeStream.end();
}

/*
Starting writing...
Closing file...
*/
```

In the example above, we're writing to a file using `Node.js` `fs` module. After a successful write operation, we want to declare that we have ended writing by closing the write stream with `writeStream.end()`.

**`try/finally` Only**

We could have only used a `try/finally` block, only if we knew we won't run into errors:

```ts
const fs = require("fs");
const writeStream = fs.createWriteStream("nodeFsTest");

try {
  console.log("Starting writing...");
  writeStream.write("Hi,");
  writeStream.write("\nThis is finally in action.");
} finally {
  console.log("Closing file...");
  writeStream.end();
}

/*
Starting writing...
Closing file...
*/
```

## Error Types in JavaScript

I wanted to share some useful info on different types of errors we can encounter in JavaScript. Understanding these error types can help us catch and handle them more effectively. Here are the main ones:

- TypeError: Occurs when we try to use a value in an inappropriate way, like calling a non-function as a function. Example:

```tsx
let x;
x(); // TypeError: x is not a function
```

- SyntaxError: This happens due to incorrect syntax, like missing brackets or quotes. It usually gets caught right away since it prevents the code from even running.

```tsx
console.log("Hello // SyntaxError: Unexpected end of input
```

- ReferenceError: We see this when trying to access variables that haven’t been declared. Example:
-

```tsx
console.log(y); // ReferenceError: y is not defined
```

- RangeError: This error shows up when we pass a number outside the allowed range, often with arrays or loops.

```tsx
let arr = new Array(-1); // RangeError: Invalid array length
```

Each of these errors has unique causes, so spotting them quickly can save time debugging. Let me know if you’d like more examples on handling them!

## Custom Error Handling with throw

In JavaScript, we can also create custom errors using the throw statement to make our code more readable and provide specific error messages.

Here’s a quick example:

```tsx
function checkAge(age) {
  if (age < 18) {
    throw new Error("User is not old enough to access this feature.");
  }
  console.log("Access granted.");
}

try {
  checkAge(16);
} catch (e) {
  console.error(e.message); // Outputs: User is not old enough to access this feature.
}
```

In this example, if the age is below 18, a custom error message is thrown. The catch block then captures and logs this message, allowing us to handle the situation gracefully without breaking the app.

Using throw in this way helps control flow more cleanly and makes it easier to understand what’s wrong. Let me know if you need more examples or have questions!

## Error Handling in Promises

I thought I’d share a quick rundown on error handling in promises. When working with asynchronous code, errors are handled a bit differently since we’re not in a typical try/catch structure.

Here’s a basic example of error handling with promises:

```tsx
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("Error fetching data:", error.message);
  });
```

In this code, if any part of the fetch operation fails (network issue, API error, etc.), the error will be caught by the .catch() block. This approach ensures that errors don’t go unnoticed without stopping the rest of the program.

Alternatively, we can use async/await with a try/catch block for promise-based error handling, which can be cleaner:

```tsx
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

getData();
```

## When to use try-catch in JavaScript?

Some common scenarios for using try-catch:

1. **Dealing with External Data:** When fetching data from external sources (like APIs), where there's a risk of network issues or bad data.

2. **Handling JSON Operations:** Parsing JSON with `JSON.parse()`, since malformed JSON strings can throw errors.

3. **Working with User Input:** When processing user input that might be invalid or cause errors during processing.

4. **Interacting with the DOM:** Especially when dealing with elements that may not exist or properties that can’t be read or set.

5. **Using Third-Party Libraries:** Where you don’t have control over the internal functionality, and there might be unknown errors.

6. **Complex Calculations or Operations:** Where there’s a possibility of runtime errors due to unexpected values.

7. **Working with Files in Node.js:** Like reading/writing files, where the file might not exist or you don't have permission.

Using try-catch allows your program to handle errors gracefully and maintain functionality even when something goes wrong. It's generally not a good practice to use try-catch for controlling normal flow in your application; it should be reserved for exceptional, error-prone situations.

I wanted to go over some typical scenarios where using try-catch in JavaScript can make a big difference. try-catch is ideal for handling unexpected issues without crashing our entire app. Here are some cases where it’s particularly useful:

### External Data Fetching

When making API calls, network errors or unexpected data formats can cause issues. Wrapping our fetch calls in try-catch prevents these from breaking our app.

```tsx
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
fetchData();
```

### JSON Parsing

If we’re dealing with JSON data, using try-catch around JSON.parse() helps catch parsing errors from malformed data.

```tsx
const jsonString = '{"name": "John"';
try {
  const data = JSON.parse(jsonString);
  console.log(data);
} catch (error) {
  console.error("JSON parsing error:", error.message);
}
```

### User Input Processing

Sometimes users provide unexpected input. Wrapping validation or parsing code in try-catch helps handle these gracefully.

```tsx
function processUserInput(input) {
  try {
    const number = parseInt(input, 10);
    if (isNaN(number)) throw new Error("Invalid number input");
    console.log("User input processed:", number);
  } catch (error) {
    console.error(error.message);
  }
}
processUserInput("abc"); // Outputs: Invalid number input
```

### File Operations in Node.js

When working with files, try-catch is essential in Node.js to handle cases like missing files or permission issues.

```tsx
const fs = require("fs");
try {
  const data = fs.readFileSync("/path/to/file.txt", "utf8");
  console.log(data);
} catch (error) {
  console.error("File read error:", error.message);
}
```

## Conclusion

In this article, we discussed in depth about graceful error handling in JavaScript using the `try/catch/finally` construct. We found out that putting our error-prone code inside a `try {...}` block allows us to catch any thrown exception. This prevents our program from crashing.

We also saw that `try/catch` blocks can be nested, exceptions thrown in nested `try/catch` blocks can be rethrown and picked from ancestor `try/catch` blocks.

Later, we looked into the details of how the `finally {..}` block is used to conduct routine procedures, regardless of whether the main operation in the `try` block throws an error or not.
