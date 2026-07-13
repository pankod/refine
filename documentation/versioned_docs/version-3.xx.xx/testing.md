---
id: testing
title: Testing
---

**refine**'s components and hooks are made from small pieces of code. Each component or hook is designed to be testable and work independently of each other.

So, you don't need unit testing, because **refine** is already tested by its maintainers. However, you can write unit tests in your own code (helper, definitions, etc.).

We strongly recommend that you write end-to-end tests of your application. **refine** used the [cypress](https://www.cypress.io/) framework as an example. You are free to write tests with any framework you want.

## Example

<CodeSandboxExample path="with-cypress" />

