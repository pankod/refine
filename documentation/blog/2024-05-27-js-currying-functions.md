---
title: Javascript Currying - Variadic Currying
description: Deep dive into variadic currying in JavaScript with examples
slug: javascript-variadic-currying
authors: abdullah_numan
category: "Tutorials"
tags: [javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-28-js-currying-functions/social-2.png
hide_table_of_contents: false
last_update: 2024-05-28
---

**_This article was last updated on May 27, 2024 to add new sections on advanced usage, explanations and performance consideration on JavaScript Currying_**

## Introduction

In this post, we first look at the confusion around currying in JavaScript, especially with respect to polyadic partial application. We find out that we're not really doing currying in the real sense that it is implemented in Haskell, rather in a much limited capacity.

In the later part, we delve into variadic currying in a stricter sense with an example that returns unary accumulators.

This post is about variadic currying in JavaScript. It is the fifth part of the series titled [Curry Functions in JavaScript](https://dev.to/anewman15/curry-functions-in-javascript-4jpa).

## What is JavaScript Currying?

Currying is a way of transforming a multi-argument function into a sequence of functions with a single argument. In other words, if a function will generally receive multiple arguments, it can be represented as a series of functions in which the first one receives one argument and then returns another function to which the next argument is passed as an argument, and so on. This way, we build more modular functions, hence reusable.

As an instance here is a function that adds two numbers :

```javascript
function add(a, b) {
  return a + b;
}
```

Using currying, we can transform this into:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

Now `add(2)(3)` would produce `5`. That is pretty useful when we want to build partially applied functions for a better readability/maintainability of the code.

This property of currying also supports the development of higher-order functions and hence can be used to make function compositions easier in a way that makes the code more graceful and functional.

Currying is very powerful stuff in terms of writing reusable code and empowering our functions with a lot of flexibility. It may take a bit of time to get used to, but when one sees the patterns, it is soon recognized as a very useful tool in our JavaScript toolkit.

## What is Variadic Currying?

Variadic currying is an advanced concept in functional programming. It is an extension of the idea of currying for functions that are supposed to handle variable arguments. In the case of currying with n arguments, the function gets converted into a succession of n functions where each function takes a single argument. Variadic currying extends that concept to handle functions when the number of function arguments is not fixed.

In the case of variadic currying, the function receives plural arguments in the first call and in all subsequent calls, but a requirement of each partial application is to still be able to receive a plural number of preferences. This allows the function to be called with plural arguments and made flexible to be useful and reusable with a dynamic number of parameters.

```javascript
function concatenate(...strings) {
  return strings.join(" ");
}

function curry(f) {
  return function curried(...args) {
    if (args.length >= f.length) return f(...args);
    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

const curriedConcatenate = curry(concatenate);
console.log(curriedConcatenate("Hello")("world!")("How", "are", "you?")()); // Outputs: "Hello world! How are you?"
```

### Benefits of Variadic Currying

**Flexibility**: Being able to partially apply functions regardless of the number of arguments, they lean more toward flexibility, molding them in various use cases.

**Reusability**: Functions can be modularized and then reused with different sets of arguments without developing the core logic again and again.

**Modularity**: It allows functions to be used in more modular ways, making the code modular

## Variadic Partial Application

In the previous article titled [Auto-currying in JavaScript](https://dev.to/anewman15/auto-currying-in-javascript-17il), we focused on the **unarity** of curried functions, because that's what a curried function ought to be.

We defined two versions of the `curry()` function. The first one maintains unarity of the accumulator function at every level of the recursive stack.

In the second definition of `curry()` though, with the spread `...args` arguments, we are introducing polyadic partial application to the first call of the curried function:

```javascript
function curry(f) {
  return function curried(...args) {
    if (args.length >= f.length) return f(...args);
    return accumulator;

    function accumulator(a) {
      return curried(...args, a);
    }
  };
}
```

This is a good starting point to deviate from actual currying. So, now we can take an arbitrary number of arguments for our first call to the curried function:

```javascript
function createMessage(greeting, name, message) {
  return `${greeting}, ${name}! ${message}`;
}

const curriedCreateMessage = curry(createMessage);

// First accumulator is a variadic function
console.log(curriedCreateMessage("Hi")("Haskell")("Whadup?")); // Hi, Haskell! Whadup?
console.log(curriedCreateMessage("Hi", "Haskell", "Whadup?")); // Hi, Haskell! Whadup?
console.log(
  curriedCreateMessage(
    "Hi",
    "Haskell",
    "Whadup?",
    "Say something",
    `Let's talk.`,
  ),
);
// Hi, Haskell! Whadup?

// Subsequent accumulators are unary
console.log(
  curriedCreateMessage("Hi")(
    "Haskell",
    "Whadup?",
    "Say something",
    `Let's talk.`,
  ),
);
// [Function: accumulator]
console.log(
  curriedCreateMessage("Hi")("Haskell")(
    "Whadup?",
    "Say something",
    `Let's talk.`,
  ),
);
// Hi, Haskell! Whadup?
```

Notice, we have opened only the first accumulator to accept any number of arguments. Subsequent calls maintain unarity of the accumulator with `accumulator(a)` accepting only one argument.

We can deviate more and allow the accumulator to be polyadic with `...a`:

```javascript
function curry(f) {
  return function curried(...args) {
    if (args.length >= f.length) return f(...args);
    return accumulator;

    function accumulator(...a) {
      return curried(...args, ...a);
    }
  };
}
```

Doing so allows `accumulator(...a)` to be variadic at every level of the recursive stack. So, now we can take multiple arguments in the subsequent calls as well:

```javascript
console.log(
  curriedCreateMessage("Hi")(
    "Haskell",
    "Whadup?",
    "Say something",
    `Let's talk.`,
  ),
);
// Hi, Haskell! Whadup?
console.log(
  curriedCreateMessage("Hi", "Haskell")(
    "Whadup?",
    "Say something",
    `Let's talk.`,
  ),
);
// Hi, Haskell! Whadup?
```

Notice, the additional arguments are gracefully ignored by JavaScript.

So basically, what we've done is allow the accumulator to take multiple arguments per call. It **_can be_** unary, as well as polyadic. We've lost the essence of currying.

But now our `curry()` function is much more powerful. We can pass any number of arguments to an accumulator, as long as that is returned. And it is common to implement this with native JavaScript `Function.prototype` methods.

## Using `Function.prototype` Methods

We can re-write the `curry()` function with `Function.prototype.apply`, and with `Function.prototype.bind`:

```javascript
// with Function.prototype.apply
function curry(f) {
  return function curried(...args) {
    if (args.length >= f.length) return f(...args);
    return accumulator;

    function accumulator(...a) {
      return curried.apply(this, [...args, ...a]);
    }
  };
}

// with Function.prototype.bind
function curryBound(f) {
  return function curried(...args) {
    if (args.length < f.length) return curried.bind(null, ...args);
    return f(...args);
  };
}
```

Refactoring `curry()` with `Function.prototype.apply` is not radically different in terms of the logic. We're just passing in the arguments `args` and `a` as part of an array instead of a list.

However, with `Function.prototype.bind`, we are returning a bound function that binds incoming arguments recursively to a copy of itself till we are able to receive all required arguments. So, inside `curryBound()`, the `curried()` function at a current execution context is a bound copy of the `curried()` function called one level below it in the recursive stack with the arguments passed there.

To be semantically more accurate, we should rename `curryBound()` to be `partialize()` and `curried()` to be `bound()`:

```javascript
function partialize(f) {
  return function bound(...args) {
    if (args.length < f.length) return bound.bind(null, ...args);
    return f(...args);
  };
}
```

This is because, `Function.prototype.bind` applied here allows a variadic and more powerful partial application than unary currying. Really, this is nothing more than native JavaScript partial application with context binding and recursion.

**The Stunner**
Ok, so what about invoking our original function, `f()`, when we have all arguments available ?

```javascript
f(...args);
```

We're just calling a polyadic function with all its required arguments. Is it currying ? To me, with `f(...args);` we just embraced back what we wanted to avoid by accepting single arguments at a time. That is, we have not found a way around to call our original function, `f()`, with single arguments sequentially.

In Haskell, currying does not involve calling the multary function with all arguments passed in collectively. In JavaScript, we are eventually calling it with all arguments together - and with the possibility of accepting additional ones. We're fooling around.

What we're actually doing is, generating a series of variadic accumulators returned in sequence - with good intentions, inspired by currying to begin with. This is probably what currying should idiomatically mean in the sphere of JavaScript.

## Variadic Currying with Termination

In a stricter sense, if we want to implement currying in JavaScript - at best - we can go as far as returning unary accumulators. Contrary to this, as we have seen above, variadic multary accumulators are also commonly returned.

However, we can go ahead and implement variadic currying by returning unary accumulators as well. This can be a case if our `f()` is variadic itself. Below, we have modified our `createMessage()` function to produce a message for a given arbitrary number of text strings.

```javascript
function createMessage(...texts) {
  return texts.reduce(
    (combinedText, currentText) => combinedText + currentText,
    "",
  );
}
```

**Terminator**
Here, we want to curry `createMessage()` with unary accumulators. And we can keep receiving as many arguments we want, without stopping.

So, in order to produce a result from a curried variadic function, we have to decide on an arity for `f()` at some point. After we fix an arity of our desire for `f()` by passing in those arguments one at a time, we can terminate the accumulator.

The idea is to terminate the accumulator when we receive an empty (`undefined`) argument and invoke `f()` with the available arguments. So, the empty parens, `()` acts as the terminator in this case.

For a curried function, `vCurriedCreateMessage()`, returned from `vCurry()` by passing in `createMessage()`, let's say we want to terminate the accumulator after 5 arguments. And we want to invoke `f()` after that. It will look something like this:

```javascript
const vCurriedCreateMessage = vCurry(createMessage);
const messageHaskell = vCurriedCreateMessage("Hi Haskell,")(
  `I hope you're doing good!`,
)(`We're discussing currying here. Do you wanna join in?`)("See you soon!")(
  "Bye.",
);

messageHaskell();
```

**The Plan**
Implementing `vCurry()` follows a slightly different logic, mostly due to the fact that we have to terminate the accumulator on demand with an empty argument, i.e. having a value of `undefined`. And since sometimes a variadic function can potentially take infinite number of arguments, it can lead to infinite currying. We'll talk about infinite currying in an upcoming article, but for such cases `f.length` doesn't play an important role in the currying logic. Instead, length of the incoming arguments is the main point of focus.

If we have an incoming argument, we keep accumulating. When we receive none, we terminate and invoke `f()` with accumulated arguments:

```javascript
function vCurry(f) {
  function curried(args) {
    return function accumulator(a) {
      if (args.length === 0 || a) return curried([...args, a]);
      return f(...args);
    };
  }

  return curried([]);
}
```

So, now currying `createMessage()` and invoking the curried function with 5 arguments and then invoking returned function with `()` (empty argument) will produce the message string;

```javascript
const vCurriedCreateMessage = vCurry(createMessage);
const messageHaskellShorter = vCurriedCreateMessage(
  "Hi Haskell,\n",
  `You can't see this.`,
)(`I hope you're doing good!\n`)(
  `We're discussing currying here. Do you wanna join in?`,
  "Bye",
);
const messageHaskell = vCurriedCreateMessage("Hi Haskell,\n")(
  `I hope you're doing good!\n`,
)(`We're discussing currying here. Do you wanna join in?\n`)("See you soon!\n")(
  "Bye.",
);
const messageHaskellLonger = messageHaskell("\nAbdullah Numan");

console.log(messageHaskellShorter()); // Additional arguments ignored: `You can't see this.`
/*
Hi Haskell,
I hope you're doing good!
We're discussing currying here. Do you wanna join in?
*/

console.log(messageHaskell()); // Additional arguments ignored:  'Bye'
/*
Hi Haskell,
I hope you're doing good!
We're discussing currying here. Do you wanna join in?
See you soon!
Bye.
*/

console.log(messageHaskellLonger()); // Extended from messageHaskell()
/*
Hi Haskell,
I hope you're doing good!
We're discussing currying here. Do you wanna join in?
See you soon!
Bye.
Abdullah Numan
*/
```

Notice the `messageHaskellLonger` function. The curried function can be extended basing on that of a smaller arity to any arbitrary arity, before it gets terminated.

Notice also that since we focused on unary implementation of variadic currying, the accumulators ignore the second arguments passed.

Currying a variadic function is quite different from currying functions with fixed arity in terms of the logic, especially with respect to how termination is achieved by passing an empty argument. Without termination, it can take infinite number of arguments. In the next article, we'll see an example of infinitely curried function that does not require termination at all.

## Performance Consideration when Using Javascript Currying

It, however, does have a bright side; the curried code could be much more readable and modular. On the flip side, however, there are issues related to performance. When a curried function is created, at least two functions are abstracted at that point in time to wrap around each other. This reinstates extra overhead, especially if the function is called from inside a performance-critical section or very frequently. Each level of currying adds a new level of function calling to the stack so, when the program is executed, unless that is well controlled, it's slower.

For instance, a simple curried addition function:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

That may look clean enough, but heavy use in a loop or in a performance-heavy application introduces a very noticeable latency compared to what a simple addition function would do.

Be cautious when using currying so that poor performance is avoided, especially in performance-critical paths. Prefer a direct usage style when currying in such paths. Besides, modern JavaScript engines try to optimize a lot around function calls. Knowledge about the trade-offs in the different ways those optimizations can be turned on or off will help you be sure to make a better decision when and where to apply currying.

While currying really helps to make the code readable and flexible, during such process we must not suffer much from performance at critical sections of our application. Striking the right balance between clean code and efficient execution is important.

## Bonus: Advanced JavaScript Currying Techniques

Beyond the most basic kind of currying that we've already seen, there's a host of more sophisticated tricks to be played. One of them is **partial application**, in which we pre-fill some of the function's arguments, so as to create a more specialized version of the function, but without actually running it. That can be used, in particular, to 'configure' functions with common settings.

For example:

```javascript
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
console.log(double(5)); // Outputs 10
```

Another operation is **function composition** which allows to combine several functions into a new one. Function composition is a way to make it easier to tap into the power of currying when transforming and passing data through a pipeline of functions. One can do that with a little help of utility functions from libraries like lodash and Ramda.

For instance:

```javascript
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x);
const add = (a) => (b) => a + b;
const square = (x) => x * x;

const addAndSquare = compose(square, add(2));
console.log(addAndSquare(3)); // Outputs 25
```

We can also consider **infinite currying**; a function can continue to curry forever, holding its arguments, until enough arguments have been received, at which point it would carry out its computation. This is an attractive feature for function definition, but it needs to be used with care.

```javascript
function infiniteCurry(fn, seed) {
  const reduceValue = (args, arg) => fn.apply(null, args.concat(arg));
  const next =
    (...args) =>
    (arg) =>
      arg ? next(...args, arg) : args.reduce(reduceValue, seed);
  return next();
}

const sum = infiniteCurry((a, b) => a + b, 0);
console.log(sum(1)(2)(3)()); // Outputs 6
```

These advanced feature additions can significantly enhance our functional programming capabilities within JavaScript. It is a great way to write cleaner, more modular, and reusable code in dealing with big codebases.

## Conclusion

In this post, we found out that deviating from unary currying in leads to variadic partial application in JavaScript, which turns out to be more powerful. We also saw how currying an existing variadic function follows a different logic than those with fixed arity with a unary implementation.
