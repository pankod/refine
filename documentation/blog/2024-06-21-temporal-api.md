---
title: Temporal API - A new approach to managing Date and Time in JS
description: Are we saying goodbye to the JavaScript Date object? Use the Temporal API to manipulate date and time objects in JavaScript.
slug: temporal-date-api
authors: muhammed_arslan
category: "Tutorials"
tags: [javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-19-temporal-api/social-2.png
hide_table_of_contents: false
last_update: 2024-06-24
---

**This article was last updated on June 21, 2024, to include additional use cases and information about the JavaScript Temporal API.**

## Introduction

Date object is the least-fun thing and a long-standing pain point in JavaScript. That's why there're other libraries like moment.js and date-fns. Developers use these to make sense of Date object. Implementation of Date object was directly copied from Java. Java scrapped it, but it remained in JavaScript for backward compatibility. It was written a long-time ago and not updated.

Steps we’ll cover:

- [What Is The Temporal API?](#what-is-the-temporal-api)
- [Why Temporal API?](#why-temporal-api)
  - [Benefits of Using Temporal API](#benefits-of-using-temporal-api)
  - [When to Use Temporal API](#when-to-use-temporal-api)
- [Project setup](#project-setup)
- [Temporal API Data Types](#temporal-api-data-types)
  - [Temporal.Now](#temporalnow)
  - [Temporal.PlainDate](#temporalplaindate)
  - [Temporal.Duration](#temporalduration)
  - [Temporal.TimeZone](#temporaltimezone)
- [Temporal API Advanced Features](#temporal-api-advanced-features)
- [Browser Support for Temporal API](#browser-support-for-temporal-api)

## What Is The Temporal API?

[Temporal API](https://tc39.es/proposal-temporal/docs/), will be a better replacement for Date object.

As of the latest updates, the Temporal API is still considered experimental. It is currently at Stage 3 in the TC39 process, which means it is close to being finalized but is not yet a part of the official ECMAScript standard.

Temporal presents standard data types and methods for working with dates and times. It allows you to have an easy-to-use API for date and time computations. It gives support for all time zones without having to reach for another library like date-fns. It’s a way to have a better date/time API in JavaScript. It provides PlainDate, PlainTime, and PlainDateTime objects which don’t have an association with a time zone. There’s also a way to grab time associated with time zone. It supplies tools to work with time zones or without them. So, basically, Temporal provides data types that are being split into plain and zoned.

Temporal handles these issues by:

- First-class support for all time zones
- Handling objects available with fixed dates and times
- Providing reliability through parsing a strict string format
- Support for non-Gregorian calendars
- Date and time computations by providing simple APIs

There’re several data types and methods available with Temporal and we'll get to explore most of them in this guide.

## Why Temporal API?

### Benefits of Using Temporal API

The Temporal API is much easier to work with compared to the Date object, and therefore, it's more reliable. It supports all time zones out of the box. This means you don't have to worry about additional libraries like date-fns or Moment.js to make time zone handling right.

Another wonderful thing about Temporal objects is immutability. For this reason, when they undergo operations, it will not change the current object but return a new one. This makes your code way more predictable and less error-prone.

Parsing dates from strings is also a lot more reliable with Temporal. It strictly follows the ISO 8601 format, where one avoids the pitfalls that usually comes across with a Date object. It offers a convenient way to also work with non-Gregorian calendars; in case we would ever need to work with dates from another cultural background, this would be perfect for that purpose. This makes date and time calculations pretty simple; the API is relatively straightforward.

In a general sense, the Temporal API offers a modern and robust approach to working with dates and times in JavaScript. That is light years better than the old Date object. Handling dates and times has become much less of a headache now.

### When to Use Temporal API

If you need to work across multiple time zones, the Temporal API is just perfect. The complex time zone conversions are managed perfectly without extra libraries such as date-fns or Moment.js. And that makes it perfect for worldwide applications.

Another good case is when you need precise and reliable date and time calculations. Temporal being immutable means that operations return new objects instead of changing the original ones, which helps you to avoid bugs in your code.

It's also beneficial when you're dealing with different calendar systems. Temporal supports non-Gregorian calendars so that you can handle dates from different cultural formats.

Temporal is an excellent alternative to the old Date object, which we have gotten used to with its unreliable parsing and manipulation methods. It is more reliable because it uses a strict ISO 8601 format for parsing.

## Project setup

We'll create a very basic project.

Create an empty directory for your new **Temporal API** project.

```
mkdir temporal-api
cd temporal-api
```

To start working with **Temporal API**, you need to install the following package first:

```
npm init
npm install @js-temporal/polyfill
```

Make sure you add `Snowpack` as a dev dependency.

```
npm install --save-dev snowpack
```

Create a temporal.js file and include it as a source in the index.html file to test the Temporal API.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Temporal API</title>
    <script src="temporal.js" type="module"></script>
  </head>
  <body></body>
</html>
```

Import the following package in the `temporal.js` file, and you're ready to start working with `Temporal API`.

```ts title="temporal.js"
import { Temporal } from "@js-temporal/polyfill";
```

Now, we are able to inspect the browser console when testing the following cases.

## Temporal API Data Types

### Temporal.Now

It'll give you a bunch of different methods that allow you to essentially get an object for the current time. Let's say you want to get a plain date and time:

```ts
const now = Temporal.Now.plainDateTimeISO();
console.log(now.toString());
// 2022-08-15T17:26:43.63340363
```

This is the exact time all the way down to micro and nono-seconds. It's very specific, which you can't do with a normal Date object. If you want to get the date and time separately, you can do this:

```ts
const nowDate = Temporal.Now.plainDateISO();
const nowTime = Temporal.Now.plainTimeISO();

console.log(nowDate.toString());
// 2022-08-15
console.log(nowTime.toString());
// 17:27:51.688660566
```

Adding date, month, or year using the old Date methods is a huge pain. It's very simple to do this in `Temporal`.

```ts
const now = Temporal.Now.plainDateISO();

console.log(now.add({ days: 1, months: 1, years: 1 }).toString());
// 2023-09-16
```

You can also do subtraction like this:

```ts
const now = Temporal.Now.plainDateISO();
console.log(now.subtract({ days: 1, months: 1, years: 1 }).toString());
// 2021-07-14
```

These methods return a new date instead of modifying the date you're working on. This was implemented badly in the normal Date object. Because it returns a modified object rather than a new object, if you want to compare two dates, you can do this:

```ts
const now = Temporal.Now.plainDateISO();
const now2 = Temporal.Now.plainDateISO();

console.log(now.equals(now2));
// true
```

If you want to calculate duration between two dates, you can do this in following way:

```ts
const now = Temporal.Now.plainDateISO();
const now2 = new Temporal.PlainDate(2022, 1, 1);

console.log(now.since(now2).toString());
// P226D
console.log(now.until(now2).toString());
// -P226D
```

Both helper methods `since` and `until` help in finding the duration between two dates. Helper method `with` allows you to set a specific value. For example:

```ts
const now = Temporal.Now.plainDateISO();

console.log(now.with({ year: 2021 }).toString());
// 2021-08-15
```

If you want to go into details of helper methods, you can check [Temporal Docs](https://tc39.es/proposal-temporal/docs/).

So, based on these different types of planeDate, plainTime and plainDateTime, you can get very specific information. Also, if you care about time zones, You can do the following for a specific time zone of your choice.

```ts
const now = Temporal.Now.zonedDateTimeISO();

console.log(now.toString());
// 2022-08-15T17:37:00.986020984+05:00[Asia/Karachi]
```

It puts the time zone at the end to show time with your current time zone. It's something you can't do very easily with a normal Date object. Conversion between time zones and non-time zones was very difficult to achieve. So, this `Temporal.Now`
the object has functions for getting the current date time, whatever you're looking for.

### Temporal.PlainDate

If you want to get the exact date without time, You can do this:

```ts
const now = new Temporal.PlainDate(2022, 8, 8);

console.log(now.toString());
// 2022-08-08
```

Another way to get a date is by calling a method called `from`:

```ts
const now = Temporal.PlainDate.from("2022-08-08");

console.log(now.toString());
// 2022-08-08
```

You can also pass an object in the `from` method. You'll get the exact same result.

```ts
const now = Temporal.PlainDate.from({
  year: 2022,
  month: 8,
  day: 8,
});

console.log(now.toString());
// 2022-08-08
```

All of these allow you to define the date, time, or whatever. It's possible for all different time zones as well. You can do a zoned date-time like this:

```ts
const now = Temporal.ZonedDateTime.from({
  year: 2022,
  month: 8,
  day: 8,
  timeZone: Temporal.Now.timeZone(),
});

console.log(now.toString());
// 2022-08-08T00:00:00+05:00[Asia/Karachi]
```

You'll get year, month, and day in your specific time zone because you mentioned it. Those are part of the main data types you're going to use. If you want to sort dates, you can do like this:

```ts
const today = Temporal.Now.plainDateISO();
const yesterday = today.subtract({ days: 1 });
const tomorrow = today.add({ days: 1 });
const days = [today, yesterday, tomorrow];
const sortedDays = days.sort(Temporal.PlainDate.compare);

console.log(sortedDays.map((d) => d.toString()));
//  ['2022-08-14', '2022-08-15', '2022-08-16']
```

### Temporal.Duration

This data type conveys the length or duration of time. This helps in dealing with the comparison of dates. You can build a new `Duration` with the constructor or `from` method.

```ts
const duration = Temporal.Duration.from({ days: 2, months: 8 });

console.log(duration.toString());
// P8M2D
```

You can use `round`, `with`, `subtract` or `add` helper methods on `Duration`. `total` helper method calculates the whole duration in a specific unit.

```ts
const duration = Temporal.Duration.from({ hours: 12, minutes: 30 });

console.log(duration.total("minutes"));
// 750
```

### Temporal.TimeZone

This data type is used to show a specific time zone. You can use this in the following two ways:

```ts
const timeZone = Temporal.TimeZone.from("America/Chicago");

console.log(timeZone.toString());
// America/Chicago

const localTimeZone = Temporal.Now.timeZone();

console.log(localTimeZone.toString());
// Asia/Karachi
```

There're various data types and helper methods available with `Temporal`. If you want to explore them, you can do it through [Temporal Docs](https://tc39.es/proposal-temporal/docs/).

## Temporal API Advanced Features

One of the cool things about Temporal is its support for non-Gregorian calendars. This is super handy if you need to work with different cultural date formats. You can easily switch between calendars without any hassle.

Another advanced feature is the `Temporal.Instant` object. This lets you work with precise timestamps down to the nanosecond. It’s perfect for applications that need high precision, like logging events or handling real-time data.

The Temporal API also includes the `Temporal.Calendar` object, which allows you to define custom calendars. This can be really useful if you have specific business rules or need to track dates in a unique way.

Additionally, Temporal provides robust timezone handling with the `Temporal.ZonedDateTime` object. You can easily convert dates and times between different time zones, making it great for global applications.

Lastly, the API includes helper methods like `with`, `add`, `subtract`, `since`, and `until`, which make date arithmetic straightforward and reliable. These methods return new objects, ensuring immutability and preventing unintended side effects in your code.

Overall, these advanced features of Temporal give you a lot of flexibility and power when working with dates and times in JavaScript.

## Browser Support for Temporal API

Now, after reading all this, you may get excited to start trying out the `Temporal API`. This API isn't available yet as the proposal for this API is at stage 3. No browser supports this API at the moment, but you can use polyfill if you want to try this API. Several polyfills are available for this API, but [@js-temporal/polyfill](https://www.npmjs.com/package/@js-temporal/polyfill) is quite useful. You can immediately use this API, once you install this library.

## Conclusion

Dates in JavaScript include multiple issues with the implementation. Temporal API solves this problem with easy-to-use APIs. JavaScript developers will find it helpful once browsers start supporting this API.
