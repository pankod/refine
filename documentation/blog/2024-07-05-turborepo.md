---
title: What is Turborepo and Why Should You Care?
description: The advantages of using Turborepo for monorepo development.
slug: how-to-use-turborepo
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-13-turborepo/social-2.png
hide_table_of_contents: false
last_update: 2024-07-08
---

**This article was last updated on July 05, 2024, to add sections for Advanced Configuration Options and Integrating Turborepo with Existing Tools.**

## Introduction

Monorepos are very popular in modern application development because of their immense benefits. A monorepo is a single repository having multiple distinct projects with well-defined associations. Note that monorepo is not a monolith; in fact, it is the opposite of a monolith.

It is very easy to make cross-cutting code changes across different applications (/backend, /frontend) in a single atomic commit. It also provides a single source of truth for various environmental concerns you would want to be applied uniformly across your organization. Some examples include dependency management, code reuse from shared packages, etc. Because of the powerful features of monorepo that tech giants like Google and Facebook have adopted monorepo. Even major Javascript tools like React, Next.JS, Yarn, and many others are using monorepo.

In this article, we will discuss [Turborepo](https://turbo.build/) in detail. Turborepo is one of the best tools for monorepo. It is a high-performance build system for Typescript and Javascript projects. It provides some powerful features like:

- Fast incremental build
- Local computational caching
- Distributed computation caching
- Local task orchestration
- Dependency graph visualization
- Source code sharing

Today we will cover why we should use Turborepo, what are its major features and when are the best use cases for adopting it in your projects.

## Why Turborepo?

There was a need for a monorepo tool that could take advantage of advanced techniques with zero configuration. Something that is easy to scale and adapt while at the same time improving the speed of monorepo pipelines. Turborepo provides all these features and more.

The main idea behind monorepo is to never recompute the work that has already been done before. It keeps a cache of previous builds for each project and then uses it for subsequent builds. It keeps track of the output of any task you execute and then skips the work that is already done.
Turborepo is designed to be adopted incrementally, so you can add it to our codebase in just a few minutes. It speeds up your tasks through smart scheduling, minimizing idle CPU.

Turborepo's magic lies in the execution of its tasks. For package installation, you can still use pnpm or npm. Turborepo complements pnpm/npm, where these package managers install your packages, and Turborepo runs your tasks efficiently.

## Unique Features of Turborepo

### Remote caching

Build caches are usually generated and checked on the local machine, so if you are reviewing your team member's code, you will also have to build it locally. Remote caching shares that cache on a global scale, turning it into a "dropbox of your `dist` folder". Vercel offers free remote cache on Turborepo builds even if you are not hosting your application on Vercel servers.

With your remote caching, builds can achieve amazingly fast build times by providing a way to share compiled computations and code artifacts on Vercel. These artifacts can be log outputs, build outputs, blobs of data, etc. Remote caching identifies any necessary artifacts already generated in the same code PR and recycles them across different machines. This recycling or reuse can be done either during Vercel build process or an external CI/CD.

<br/>

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-13-turborepo/turbopack.png"  alt="Turbopack architecture diagram" />
<em> Source - </em>
</div>

<br/>

The above image shows that the shared cache resides on the Vercel servers. You can share your cache with fellow developers and your CI server.
Remote caching speeds up your workflow as you do not need to constantly re-compile, re-test, or re-run your unchanged code.

### Prune now supports all package managers

Pruning is the process of automatically removing the overgrowth of the build cache efficiently. Pruning creates a subset of your monorepo, including pruning the dependencies in your lock file. As a result, the tool providing the pruning must also implement the logic for each workspace manager separately. The good news is that the command ` turbo prune` provides support for all major package managers including npm, yarn, and pnpm.

### Support for Polyrepo

Initially, Turborepo was focused solely on monorepo because monorepo runs plenty of tasks, and Turborepo is exceptionally fast in executing the tasks rapidly. Now Turborepo supports polyrepo too. After all, a polyrepo also executes plenty of tasks, so it is well worth utilizing Turborepo in monorepo and polyrepo. The majority of CI/CD processes duplicate a lot of work, so taking advantage of the Turborepo cache would benefit polyrepo too.
Some of the other features of Turborepo include:

- Incremental builds. Turborepo will remember what you have built and skip the existing computations
- Context-aware hashing. Turborepo keeps track of the contents of your files, not date/time, to identify what needs to be built.
- Zero runtime overhead. Turborepo will not interfere with your runtime code or alter your sourcemaps
- Pruned subsets. It speeds up your deployments by generating a subset of your monorepo with only what is required to build a specific target
- Integration with Lerna. If you are using lerna as your package publishing workflow, you can use Turborepo in parallel to improve the execution of your tasks.
- Profile in your browser. You can create build profiles and import them in Edge or chrome browser to identify which tasks are running the longest.

## When should you use Turborepo?

Despite all the good things about monorepo, they struggle to scale. Each project in monorepo has its own ecosystem of testing, building, linting, etc. While majority of the projects will benefit from Turborepo, Turborepo will be highly beneficial for you if:

- There is a lot of dependency of scripts on each other
- You want to execute tasks in parallel
- You want top-level dependency management for JavaScript and TypeScript
- You want Incremental builds
- You want a uniform linting configuration
- You want caching of the build steps
- You want out-of-the-box hot module reload for the NextJS application for imported packages

## How to use Turborepo?

Following are some of the commands to use Turborepo:

- `npx create-turbo@latest turbo-demo` scaffolds a monorepo with different applications (API, frontend) and packages (design system and shared configs (eslint, tsconfig))
- `turbo run build` builds all apps simultaneously. When you execute this command again, the second build completes in just 100ms because everything is cached. There are many [variations](https://turborepo.org/docs/reference/command-line-reference) of `turbo run` command.
- `turbo prune --scope=<target>` creates a sparse/partial monorepo with a pruned lock file for a target package.
- Remote Caching commands: `turbo login` and `turbo link`

## Advanced Configuration Options

I have added a new section under advanced configuration options in our article on Turborepo. The following ways describe how you can configure your build process to tailor it to your project's specific needs and optimize your build performance.

### Customizing Build Pipelines

Customizing build pipelines in Turborepo will allow you to tailor the process to your project's needs. Define custom pipelines that handle dependencies, outputs, and task orchestration effectively.

If you are willing to do deeper customization around building pipelines, you can define an additional task with its dependencies in your Turborepo configuration file. This allows you to create a build process that ties together building for multiple environments and use cases. For example, separate pipelines can be established for building, linting, and testing projects with their respective dependencies and outputs.

```bash
module.exports = {
  pipeline: {
    build: {
      dependsOn: ['^build'],
      outputs: ['dist/**'],
    },
    lint: {
      dependsOn: ['^lint'],
      outputs: [''],
    },
    test: {
      dependsOn: ['^test'],
      outputs: ['coverage/**'],
    },
  },
};
```

### Optimizing Build Performance

Optimizing build performance is extremely important to speed up and run the development process efficiently. Turborepo integrates a set of more advanced techniques in the context of build optimization: caching strategies, and running tasks in parallel.

During the build process with Turborepo, optimization for better performance means running some parallel tasks and caching the results of those tasks. To do that, it gives you the flexibility to run tasks in parallel so the already cached results can be utilized other than executing them, again boosting the process of parallel tasking manifolds at a minimal cost of total turnaround time, using all the resources it could lay its hands on.

```bash
module.exports = {
  cache: {
    build: true,
    lint: true,
    test: true,
  },
  workers: {
    maxConcurrentTasks: 4,
  },
};
```

With these advanced configuration features, you can customize the build and fully optimize the performance of your projects such that your projects are built quickly and efficiently.

.

## Using Turborepo with the Existing Tools

By integrating Turborepo into the most popular development tools, your development workflow will be seamless and allow you to get maximum efficiency from the development process. Maybe you'd have it set up to work with CI/CD pipelines, package managers, and testing frameworks to enhance your build and deploy software processes.

### Example: CI/CD Pipelines

You can adapt your existing CI/CD scripts to run Turborepo commands and be plugged into the CI/CD pipelines. This would ensure that builds, tests, and other tasks are carried out efficiently while following the continuous integration and deployment.

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"

      - name: Install dependencies
        run: npm install

      - name: Run Turborepo build
        run: npx turbo run build --cache-dir=.cache/turbo

      - name: Run tests
        run: npx turbo run test
```

1. **Setup**: Make sure Node.js and Turborepo are available within your CI/CD environment.
2. **Configuration**: Add Turborepo to your CI/CD configuration file with instructions for building and testing your projects.

### Example: Package Managers

Turborepo effectively integrates with package managers like npm, yarn, and pnpm, making it possible to manage dependencies in one centralized place. The add-on nature of Turborepo allows you to use the main features of your favorite package manager while using Turborepo's advanced features for task execution and caching.

1. **Setup**: Install dependencies using your favorite package manager.

2. **Configuration**: Configure Turborepo to understand and work with the package manager's lock file and workspace settings.

### Example: Testing Frameworks

Testing is made practical with tools that come with Turborepo by being integrated into testing frameworks. By using caching features, the running of tests with commands to take advantage of the infrastructure of Turborepo enables one to achieve a fast process in this case.

1. **Setup**: Set up your favorite testing framework (e.g., Jest or Mocha).
2. **Configuration**: Integrate test commands into the Turborepo pipeline configuration to trigger tests in the build process.

Leveraging these tools with Turborepo, you can set up an integrated and seamless development environment that substantially enhances your workflow and shrinks build times.

## Conclusion

Turborepo is a high performant and blazing-fast build tool for monorepo. With the Javascript ecosystem growing rapidly, you need a modern and efficient set of tools, especially the build tool.

As shown in the above picture, Turborepo is written 74% in the Go language, which means it is written with performance in mind. Clearly, the age of "JS tools in JS" is gone. Turborepo can make your pipeline 10x faster. It brings immense value out of the box with a declarative build pipeline, excellent debugging/profiling options, and great documentation.
