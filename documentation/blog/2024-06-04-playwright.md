---
title: Creating testable React applications with Playwright
description: We'll take a look at how to create testable React applications with Playwright.
slug: playwright-react
authors: peter_osah
category: "Ecosystem / Integrations"
tags: [react, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/social.png
hide_table_of_contents: false
---

## Introduction

As a React developer, your React applications must be thoroughly tested end to end to ensure the release of high-quality, bug-free applications that provide the best user experience and quality. End-to-end testing is accomplished using a variety of test automation tools, such as Cypress, WebdriverIO, and others, and one worthy to note is Playwright.

Microsoft developed [Playwright](https://playwright.dev/), a Node.js test automation framework, in 2020. It provides a high-level API for effortlessly automating current web applications and is compatible with all modern web browsers. It automates web testing end-to-end, emulating user interactions including clicks, scrolls, and keyboard inputs, as well as complicated tasks like form filling and page navigation.
In this article, we will take a look at how to create testable React applications with Playwright.

Steps to be covered in this article include:

- [What is Playwright?](#what-is-playwright)
- [Features of Playwright?](#features-of-playwright)
- [Setting up Playwright on a React Project](#setting-up-playwright-on-a-react-project)
- [Create tests with Playwright on the project](#create-tests-with-playwright-on-the-project)
- [Difference between Playwright and React testing Library](#difference-between-playwright-and-react-testing-library)

## What is Playwright?

Playwright is an open-source automation library for end-to-end testing. It was created by Microsoft and it allows developers and testers to automate web browser interactions in a way to simulate how users may interact with a website or a web application. Playwright's extensive feature set makes it appropriate for a wide range of web testing situations, from simple page interactions to large, stateful apps, such as single-page applications (SPAs) and progressive web applications (PWAs).

## Features of Playwright?

- **Cross browser**: Playwright is compatible with all modern rendering engines, such as Firefox, WebKit, and Chromium.
- **Supports Headless and GUI browser Modes**: Browsers can be launched in GUI mode for development and debugging, or headless mode (without a graphical user interface) for faster execution in testing conditions.
- **Cross language support**: Languages like **JavaScript**, **TypeScript**, **Python**, **.NET**, and **Java** can access the Playwright API.
- **Evaluate the Mobile Web**: It supports Google Chrome for Android and Mobile Safari native emulation. Both your desktop and the cloud are powered by the same rendering engine.
- **CI testing**: Playwright can be integrated with other frameworks and tools that offer **CI** environments. You may accomplish continuous testing in this way.
- **Playback and Codegen recording**: A feature of Playwright allows it to create test scripts by watching how you interact with the browser.

## Setting up Playwright on a React Project

You can install Playwright first by using yarn or npm by using the command below:

```bash
npm init playwright@latest
```

You will receive installation-related command line prompts when you type any of the commands. Choose the option as indicated below:

```
Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (y/N) · false
✔ Install Playwright browsers (can be done manually via 'pnpm exec playwright install')? (Y/n) · true
Installing Playwright Test (pnpm add --save-dev @playwright/test)…
```

These options will install the playwright browsers which will be used for the test, create a playwright config file as well as create the test directory which will house the test files as shown below:

```tsx
playwright.config.ts;
tests / example.spec.ts;
tests - examples / demo - todo - app.spec.ts;
```

As an alternative, you can also use the [VS Code Extension](https://playwright.dev/docs/getting-started-vscode) to get started and execute your tests.

## Create tests with Playwright on the project

The tests for playwrights are easy and they perform two actions namely;

- Perform an action
- Assert/declare the state in opposition to expectations.

We will take a look at the example test that was added to installation of playwright

```tsx
tsx title="tests/example.spec.tsx"

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

In the first test `("has title")`, the steps can be divided into

- **Performing the action**: The `page.goto('https://playwright.dev/');` makes an action of going to the url (https://playwright.dev/).
- **Asserts the state** : When the url loads, it looks to see if the title "**Playwright**" is there.
  (`hence the assertion: await expect(page).toHaveTitle(/Playwright/)`)
  If the title is not rendered on the page, it signifies the test has failed and vice versa.

**N/B**: When writing tests, a good guideline is to create them the same way a typical user would use a website or web app.

### Running The Tests

After writing the test, we can run it and get a visual representation by executing the Playwright test command below:

```bash
npx playwright test
```

This command will run your tests across all browsers, as specified in the playwright.config file. Tests are run in headless mode by default, which means no browser window is opened while the tests are running, and the results are displayed in the terminal.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/1.png" alt="playwright react" />
</div>

To preview the test results, type the following command:

```bash
npx playwright show-report
```

This will open a local server that displays the results of the test.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/2.png" alt="playwright react" />
</div>

You may also preview any of the individual tests on the page and get more information on how the test ran.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/3.png" alt="playwright react" />
</div>

If the test fails, it indicates that on the terminal.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/4.png" alt="playwright react" />
</div>

it also automatically opens a dev server and displays the failed tests

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/5.png" alt="playwright react" />
</div>

### Running The Tests in UI Mode

For a better development experience when running your tests, It is advised to use the UI Mode. This allows you to simply navigate through each stage of the test and see what was happening before, during, and after each step. Numerous other functions, such as the location picker and watch mode, are also included in UI mode.

To run the test in UI mode, type the command below

```bash
npx playwright test --ui
```

This will open up a headless browser and display your tests.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/6.png" alt="playwright react" />
</div>

For more information on running tests in UI mode, visit the [docs](https://playwright.dev/docs/running-tests).

### Locators and Interactions

In Playwright, you can also include interactions in tests like locating content and then performing an action on that content. An example is a test to find a **link** and initiate a click on the **link** as shown below:

```tsx
// Create a locator.
const getStarted = page.getByRole("link", { name: "Get started" });

// Click it.
await getStarted.click();
```

To get more **locator** and **interaction** methods that Playwright offers on a page, visit the [docs](https://playwright.dev/docs/api/class-page).

### Assertions

Playwright also supports assertion statements. A notable way to indicate an assertion statement is to look for a statement that has an "**expect**" method from Playwright's API. Examples of assertion statements are indicated below:

```tsx
// checks if a page has a title "Playwright".
await expect(page).toHaveTitle(/Playwright/);

// checks if the success variable is a boolean (true or false) value.
expect(success).toBeTruthy();

// checks if the page have the url: "https://playwright.dev/".
await expect(page).toHaveURL("https://playwright.dev/");
```

An assertion statement can also be **async** (particularly for statements involving an asynchronous action).

To view more methods on assertions, visit the [docs](https://playwright.dev/docs/test-assertions)

### Trace Recording

With the use of the GUI, you may examine recorded Playwright traces of your tests by navigating back and forth through each action and seeing what transpired on screen using the Playwright Trace Viewer.

Before tracing a test, ensure that the **trace** property on the `playwright.config.ts` is set to `**'on-first-retry'**

```bash
use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
},
```

Once this is confirmed, type the following command below

```bash
npx playwright test --trace on
```

On doing that, it opens a dev server, that displays a Viewer icon on the ran tests.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/7.png" alt="playwright react" />
</div>

On clicking the viewer icon beside the tests, you will be redirected to the Trace Viewer

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/8.png" alt="playwright react" />
</div>

The trace viewer comes in handy on reviewing failed tests. You can locate the point where the test failed and make the necessary adjustments. To view more on trace recording, view [here](https://playwright.dev/docs/trace-viewer-intro)

### Code Generation

To run the test generator and produce tests for a website or web application, use the codegen command and the website's URL. It is always possible to run the command without the URL and then add it right into the browser window. The URL is optional.

```bash
npx playwright codegen demo.playwright.dev/todomvc
```

On running the command, it opens the headless browser and generates tests in its inspector.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-06-04-playwright/9.png" alt="playwright react" />
</div>

## Migration from Testing Library

One of the advantages of using Playwright as a testing tool in React applications is that you can easily migrate from the populous React testing library to Playwright with ease as their API are respectively complementary to each other.

For example, the `Screen` Method in the React testing library is interchangeable with the `Page` and `Component` methods in Playwright as shown below:

**Testing Library**

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("should sign in", async () => {
  // Setup the page.
  const user = userEvent.setup();
  render(<SignInPage />);

  // Perform actions.
  await user.type(screen.getByLabel("Username"), "John");
  await user.type(screen.getByLabel("Password"), "secret");
  await user.click(screen.getByText("Sign in"));

  // Verify signed in state by waiting until "Welcome" message appears.
  await screen.findByText("Welcome, John");
});
```

```tsx
const { test, expect } = require("@playwright/experimental-ct-react"); // 1

test("should sign in", async ({ page, mount }) => {
  // 2
  // Setup the page.
  const component = await mount(<SignInPage />); // 3

  // Perform actions.
  await component.getByText("Username").fill("John"); // 4
  await component.getByText("Password").fill("secret");
  await component.getByText("Sign in").click();

  // Verify the signed in state by waiting until "Welcome" message appears.
  await expect(component.getByText("Welcome, John")).toBeVisible(); // 5
});
```

Also, All queries in React testing library like the `getBy...`, `findBy...`, `queryBy...`, and their multi-element variants, are replaced with `component.getBy...` locators in Playwright as shown in the example above where the `screen.getByLabel()` method in React testing library is synonymous to the `component.getByText()` method on Playwright.

To view more on migration from React testing library to Playwright, visit [here](https://playwright.dev/docs/testing-library).

## Difference between Playwright and React testing Library

The basic difference between Playwright and React testing library is

- Playwright is an automation framework designed for end-to-end tests. It simulates how users may interact with a website or a web application.
- React testing library is a framework for testing a unit (a unit of code, functions, or React components). It doesn't simulate the application experience in totality.

## Conclusion

In this article, we delved into the Playwright automation testing tool. For automated testing of web applications, Playwright is a strong and adaptable solution because of its feature set. It is a great tool for any scale of end-to-end automation testing.
