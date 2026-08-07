---
title: "Enterprise Edition Guide | Docs in Refine v5"
display_title: "Getting Started"
sidebar_label: "Getting Started"
description: "Build Enterprise Edition in Refine v5. Learn the key steps. Learn best practices for release for real-world React admin panels. See practical code samples."
---

## Overview

While Refine Community Edition follows monthly release cycles, Enterprise Edition features are released continuously as they are merged to `next` branch.

Refine EE packages are distributed through our private NPM registry at `registry.refine.dev` under `@refinedev` scope.

## Setting up private registry

To use Refine Enterprise Edition packages, you need to configure your project to use our private registry for `@refinedev` scoped packages.

Create or edit `.npmrc` file in your project root with the following content:

```
@refinedev:registry=https://registry.refine.dev
//registry.refine.dev/:_authToken=${REFINE_NPM_TOKEN}
```

There are two ways to set up your authentication token:

1. **Environment Variable (Recommended)**

   Add the token to your environment variables:

   ```bash
   export REFINE_NPM_TOKEN=your-token-here
   ```

2. **Direct in .npmrc**

   You can also directly add the token to your `.npmrc` file (not recommended for security reasons):

   ```plaintext
   @refinedev:registry=https://registry.refine.dev
   //registry.refine.dev/:_authToken=your-token-here
   ```

Once you've configured the registry and authentication, you can install enterprise packages using npm or yarn:

<InstallPackagesCommand args="@refinedev/core @refinedev/enterprise" />

## Release Cycle

Enterprise Edition packages follow the same versioning scheme as Community Edition but with continuous releases as features are developed and merged.

Let's look at an example to understand the release cycle:

1. Current version of `@refinedev/core` is `4.57.1`
2. A new feature or fix is developed and merged
3. Enterprise Edition immediately gets a new release as `4.57.2`
4. Community Edition will include this change in the next monthly release as `4.57.3`

This means Enterprise Edition users get access to new updates as soon as they are ready, while Community Edition users receive updates in regular monthly cycles.

**Note: in cases of critical bugs or security vulnerabilities, we release updates immediately for both Enterprise and Community editions. This is an exception to the regular monthly release cycle for Community Edition.**
