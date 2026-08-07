---
title: Unexpected token in JSON at position 0 error
description: We will look into the various possible causes of this error message and suggest methods to rectify it.
slug: unexpected-token-in-json-at-position-0-error
authors: chukwuka_reuben
category: "Tutorials"
tags: [javascript, bugs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-09-json-error/social-2.png
hide_table_of_contents: false
last_update: 2024-07-18
---

**This article was last updated on July 18, 2024, to add sections for JSON Validation Tools and Best Practices for Working with JSON.**

## Introduction.

This post aims to address the "Unexpected token in JSON at position 0" error message. We will look into the various possible causes of this message and suggest methods to rectify it.

## What is JSON?

JSON which stands for Javascript Object Notation can be said to be a lightweight format for storing and transporting data, it is used often when data is sent from a server to a webpage.

If you have ever utilized API endpoints in your projects before, there's a very high chance that JSON is being used to store and transport data between your web page and servers.

Let us quickly examine the utilization of JSON for transporting and storing data. We don't need to look too far since the local storage on our internet browsers can function as servers.

The codeblock below shows how JSON can be used to transport data between local storage and the web page:

```tsx
localStorage.setItem("list", JSON.stringfy(list));

JSON.parse(localStorage.getItem("list"));
```

Now that we are aware of what JSON is and how it can be applied, let us move on to resolving the "Unexpected token in JSON at position 0" error message.

## What does the "Unexpected token &lt; in JSON at position 0" error mean?

In very simple language, "Unexpected token &lt; in JSON at position 0" indicates that you are parsing something else that is not JSON as JSON.

To prove my point, I will attempt to reproduce the mistake. Go to your browser console and execute this code snippet:

```javascript
JSON.parse(undefined);
```

The code snippet above will produce this type of error:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-09-json-error/json-error-1.png"  alt="json error" />

<br />

Why? because "undefined" is not JSON but we have tried to parse it as JSON.

**There's something I would like you to note before we proceed:**

The actual "Unexpected token in JSON at position 0" message may vary depending on what your server generates, however, the fundamental reason remains the same: you are attempting to parse something that is not JSON as JSON.

Below are some of the different forms in which the error message could be presented:

- " is not a valid JSON at JSON.parse".
- Unexpected token '&lt;', "&lt;!DOCTYPE "... is not valid JSON.
- Unexpected token 'o', "not found!" is not valid JSON.
- Unexpected token 'o', "\[object obj... is not valid JSON"

and so on. So going forward I'll be using the general name "JSON.parse unexpected token" to refer to this error.

Now that we know what the "JSON.parse unexpected token" error means, let us proceed to know the different reasons why you might have this error and also look into ways to fix them.

## Different Reasons Why You Might Have This Error and Their Fixes.

In this section of this article, 4 reasons and their fixes will be listed:

## Hitting Any API endpoint that does not exist:

This is one of the most common causes of this error, and this tends to occur during the fetch request in javascript.

As you might have already assumed, yes! it occurs when you're trying to parse an endpoint result that is not JSON as JSON.

In this part of the article, we will consider two brief cases - one to obtain a valid endpoint and show the outcome, and the other to retrieve an endpoint that doesn't exist so we can reproduce the error message.

**Example 1:**

In this example, I've used the JSON endpoints from [https://dummyjson.com/](https://dummyjson.com/), a place where you can get fake JSON data to use during development.

I've picked a valid endpoint from this site and went ahead to call the javascript fetch method on it, check out the code snippet and its result below:

```javascript
fetch("https://dummyjson.com/products/1")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

Using the code snippet above, I want to clarify that `JSON.parse()` is being done by `res.json()` under the hood.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-09-json-error/json-error-2.png"  alt="json error" />

<br />

The image above shows that we got a valid JSON response, now let us move to the second example.

**Example 2:**

```javascript
fetch("https://dummyjson.com/myProduct/1")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

"https://dummyjson.com/myProduct/1" that has been used as our API is an endpoint that I made up, so it is not a valid API endpoint and as you know parsing it will be you trying to parse something that isn't JSON, as it is not a formatted JSON.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-09-json-error/json-error-3.png"  alt="json error" />

<br />

**How To Fix.**

- **Make sure you are using a valid API endpoint:**
  To make sure you are using a valid JSON endpoint, use [JSONFORMATTER](https://jsonformatter.curiousconcept.com/) to verify your endpoints before using it.
- Always use the try-and-catch within your fetch method or function to prevent your app from crashing.

## Spelling Error

This is so much similar to hitting the wrong API, only that you might have been pretty sure that the API endpoint exists.

Spelling error tends to happen due to typographical error or maybe you don't know what the correct spellings are.

Spelling errors do not apply only to API endpoints, they can also occur while attempting to fetch information from your local storage and lead to the "JSON.parse unexpected token" error message showing up.

**How To Fix.**

- Check and proofread well before hitting the API.
- Make sure you verify your API before hitting it. use JSONFORMATTER.
- Use the try-and-catch method in your function to prevent your app from crashing.

## Forgetting to stringify your object:

If we don't use the JSON.stringify() technique to convert our object into a string before sending it to a server, then we may encounter the error "JSON.parse unexpected token". This raises the question, "why is it necessary to transform our object into a string before sending it to a server?"

When sending data to a web server, the data has to be a string and to convert a javascript object to a string `JSON.stringify()` does the trick.

We are going to take two quick examples in this section, example 1 will represent the problem and example 2 will be the solution.

**Example 1**

**Note:**

Local storage will stand as our servers in this example.

_I have a list of todos that I have written on my web page,_ I wish for them to stay even after I have reloaded my page**,** _how do I make that happen?_

_I have to send those lists as data to my server,_ and then to retrieve them whenever I reload the page.

```ts
localStorage.setItem("list", list);
```

In the code snippet that I have provided, I have sent my data to the server without converting the object to a string using `JSON.stringify()`. Let's take a look at the consequence this will have on our page, below is the code snippet for retrieving the list, and an image of the result:

```ts
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-09-json-error/json-error-4.png"  alt="json error" />

<br />

The error indicates that I'm trying to parse an object, and it's not a valid JSON.

**Example 2(The fix):**

All we have to do to fix this error is to stringify our list before sending it to the server:

```javascript
localStorage.setItem("list", JSON.stringify(list));
```

The code snippet above will fix the error.

In general, it is always a good idea to carefully check your JSON data for any syntax errors before attempting to parse it. This will help to ensure that your code is able to properly handle the JSON data and avoid any errors like the "Unexpected token in JSON at position 0" error.

## Tools to Validate JSON

Let me introduce some tools and libraries that may help us to validate JSON responses before parsing them in order to save a lot of time by catching errors early.

### JSONLint

JSONLint is quite helpful in checking the JSON data quickly. It is an online tool where you can paste your JSON data, and it will point out all the errors. It helps me with debugging small snippets of JSON very well.

The way to use JSONLint:

1. Go to [JSONLint](https://jsonlint.com/).
2. Paste your JSON data into the input box.
3. Click the "Validate JSON" button.
4. Review the highlighted errors and fix them accordingly.

### Ajv

Ajv is a useful library whenever more sophisticated validation is required, especially when working with JSON schemas. It allows us to define the structure of our JSON data and validate it programmatically.

The following example demonstrates how to use Ajv:

1. Install Ajv:

   ```sh
   npm install ajv
   ```

2. Create a JSON Schema:

   ```json
   {
     "type": "object",
     "properties": {
       "name": { "type": "string" },
       "age": { "type": "integer" }
     },
     "required": ["name", "age"]
   }
   ```

3. Validate your JSON data:

   ```javascript
   const Ajv = require("ajv");
   const ajv = new Ajv();

   const schema = {
     type: "object",
     properties: {
       name: { type: "string" },
       age: { type: "integer" },
     },
     required: ["name", "age"],
   };

   const validate = ajv.compile(schema);
   const data = { name: "John", age: 30 };

   const valid = validate(data);
   if (!valid) console.log(validate.errors);
   else console.log("Valid JSON");
   ```

Using these tools, we can ensure that our JSON data is correctly formatted and adheres to the expected structure, which should help us avoid those annoying parsing errors.

## Best Practices for Working with JSON

I would like to share some good practices for working with JSON within our projects so that we do not fall into the basic pitfalls and make code more robust and maintainable.

### Never Forget to Validate Your JSON Data

Always validate JSON data first in order to ensure it is, in fact, well-formed and fits the expected schema; one can use quick-check tools like JSONLint or schema validation libraries such as Ajv.

Example with Ajv:

```javascript
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
  },
  required: ["name", "age"],
};

const validate = ajv.compile(schema);
const data = { name: "John", age: 30 };

const valid = validate(data);
if (!valid) console.log(validate.errors);
else console.log("Valid JSON");
```

### Use Good Error-Handling Practices

Always use the try-catch block when parsing JSON to handle the errors in a nice and graceful manner.

```javascript
try {
  const data = JSON.parse(jsonString);
  console.log("Parsed data:", data);
} catch (error) {
  console.error("Error parsing JSON:", error);
}
```

### Minify JSON Data

Wherever possible, remove all unnecessary white space and, to the extent possible, use short key nameThis helps keep JSON payloads reduced in size, hence saving on bandwidth and optimizing for performance.

```json
{
  "n": "John",
  "a": 30
}
```

### Use Consistent Naming Conventions for Keys

Be sure to use a consistent key naming scheme, whether it is camelCase or snake_case, as consistency will make your code easily readable and maintainable.

```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

### Get Rid of Circular References

JSON does not support circular reference. Make sure that the objects do not contain circular references before stringifying.

```javascript
const obj = {};
obj.a = obj; // Circular reference
JSON.stringify(obj); // This is going to throw an error
```

### Stringify with a Replacer Function

Here is where you can serialize the format into a JSON, which might have an option for the filter to exclude some properties or even a method to change all other values before the process of serialization.

```javascript
const data = {
  name: "John",
  password: "secret",
};

const jsonString = JSON.stringify(data, (key, value) => {
  if (key === "password") return undefined;
  return value;
});

console.log(jsonString); // {"name":"John"}
```

### Watch Your Dates

With regard to native support, JSON does not support date objects. Prior to serialization, dates have to be converted into a string or timestamp format.

```javascript
const data = {
  name: "John",
  createdAt: new Date().toISOString(),
};

const jsonString = JSON.stringify(data);
console.log(jsonString); // {"name":"John","createdAt":"2024-07-10T12:34:56.789Z"}
```

Here's a quick list of best practices that will help us all work through JSON with increasing effectiveness and some common pitfalls to avoid.

## Conclusion

In this article, I began by providing a brief overview of what JSON is. Then, I clarified the “JSON.parse unexpected token” error message. Finally, I listed some of the different causes of this error, providing example errors and instructions on how to fix them.
