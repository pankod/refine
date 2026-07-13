---
title: "Testing in Refine v4 | Unit & E2E Testing Guide"
display_title: "Testing"
sidebar_label: "Testing"
description: "Master testing patterns for Refine v4 applications. Learn how to write unit tests and E2E tests for your React CRUD components and logic."
---

**Refine**'s components and hooks are made from small pieces of code. Each component or hook is designed to be testable and work independently of each other.

So, you don't need unit testing, because **Refine** is already tested by its maintainers. However, you can write unit tests in your own code (helper, definitions, etc.).

We strongly recommend that you write end-to-end tests of your application. **Refine** used the [cypress](https://www.cypress.io/) framework as an example. You are free to write tests with any framework you want.

## Example

<CodeSandboxExample path="with-cypress" />
