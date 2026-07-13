---
title: A Complete guide to pnpm
description: We'll explore pnpm, an efficient alternative to npm.
slug: how-to-use-pnpm
authors: joseph_mawa
category: "Tutorials"
tags: [dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-27-pnpm-guide/social.webp
hide_table_of_contents: false
last_update: 2024-09-12
---

**This article was last updated on September 11, 2024, to add sections on Advantages of pnpm in Monorepos, Optimizing CI/CD with pnpm and pnpm’s Dependency Audit and Security Features.**

## Introduction

When working with Node, npm is the default package manager. It is bundled with modern, official versions of Node. However, there are several alternatives to npm. Some of these alternatives include pnpm and yarn.

pnpm is a popular and efficient alternative to npm. It works by installing packages in a global content-addressable store. Your projects can access these packages in the global store via hard links.

This makes pnpm more efficient than npm. With pnpm, you can install packages quickly, and the installed packages take up a lot less disk space.

In this article, we will take a deep dive into pnpm. We will explore its usage, pros, and cons and compare it with npm, the default package manager in Node.

What we will cover:

- [What is pnpm](#what-is-pnpm)
- [How to install pnpm](#how-to-install-pnpm)
- [How to uninstall pnpm](#how-to-uninstall-pnpm)
- [How to use pnpm](#how-to-use-pnpm)
- [Comparing npm and pnpm](#comparing-npm-and-pnpm)

## What is pnpm

pnpm, also known as performant npm in full, is an efficient, popular, open-source, MIT-licensed Node package manager. Unlike npm, the default package manager in Node, you need to install pnpm before using it.

Ordinarily, when using npm, each Node project will install its dependencies from the package registry and store them on disk. Each package installation involves writing the dependencies to disk in the `node_modules` directory on a per-project basis. Therefore, if you have multiple projects with the same dependency, each project will have its copy of the dependency stored on disk.

On the other hand, when using pnpm, the packages are installed in a content-addressable global store. Any project can access the dependencies in the store via hard links without having to install and save the dependencies separately on a per-project basis.

This feature of pnpm makes it more efficient than npm. With pnpm, your project dependencies will install faster and take up a lot less disk space because project dependencies are installed in a global store and shared among your projects.

When installing a different version of a package available in the global store, pnpm will only install the file that has changed. It won't install an entire copy of the new package version.

## How to install pnpm

There are various options for installing pnpm. You can install it as a standalone script or use Corepack, npm, homebrew, Winget, or any other supported installer. We will explore how to install pnpm using some of the mentioned options.

### Install pnpm as standalone script

You can install pnpm as a standalone script even if you haven't installed Node. Depending on your operating system or the installer available, you can use one of the commands below to install pnpm as a standalone script.

```sh
# Using iwr on windows
iwr https://get.pnpm.io/install.ps1 -useb | iex

# Using curl on POSIX systems
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Using wget on POSIX systems
wget -qO- https://get.pnpm.io/install.sh | sh -

```

### Install pnpm using Corepack

This is the fastest way to install pnpm if you use an official modern version of Node that ships with Corepack. Corepack is an experimental tool for managing versions of package managers in Node.

Because it is still an experimental tool, you enable Corepack before using it.

```sh
corepack enable
```

Some third-party Node distributions may not bundle Corepack out of the box. If that's the case for you, you may need to install Corepack before enabling it using the command above.

After that, you can install the latest version of pnpm using the command below.

```sh
corepack prepare pnpm@latest --activate
```

### Install pnpm using npm

You can also use npm to install either the ordinary version of `pnpm` or `@pnpm/exe`, the executable version of pnpm. The ordinary version of `pnpm` requires you to install Node in your system for it to work.

On the other hand, the executable version of pnpm is bundled with Node into an executable. Therefore, you don't need to first install Node before using it. Use one of the commands below to install the version you want.

```sh
# ordinary version
npm install -g pnpm

# executable version
npm install -g @pnpm/exe
```

Check the pnpm documentation to learn how to install pnpm using other supported installers I have not highlighted here.

## How to uninstall pnpm

It is advisable to uninstall the global packages you installed using pnpm before uninstalling the pnpm CLI. Use the command below to view the list of pnpm's global package installations.

```sh
pnpm ls -g
```

After that, you can remove one package at a time using the command below.

```sh
pnpm rm -g <package-name>
```

Removing one package at a time can become tedious and laborious. You can use the command below to determine the path to the global package directory and remove all the installed packages by manually deleting the directory.

```sh
pnpm root -g
```

After removing the global package installations, you can uninstall the pnpm CLI. If you installed pnpm using the standalone script, remove the pnpm home directory to uninstall the pnpm CLI.

```sh
rm -rf $PNPM_HOME
```

After removing the pnpm home directory, be sure to also remove the `PNPM_HOME` environment variable in your shell configuration file.

On the other hand, if you used npm to install pnpm, be sure to also use npm to uninstall pnpm.

```sh
npm rm -g pnpm
```

As explained above, pnpm installs packages in a content-addressable global store. After removing pnpm, be sure to remove the global store. You can remove it manually or use the command below.

```sh
rm -rf $(path to global store)
```

## How to use pnpm

The pnpm CLI has several commands to manage dependencies, run scripts, and manage the global store. A typical pnpm command takes the form below.

```sh
pnpm [command] [flags]
pnpm [ -h | --help | -v | --version ]
```

Let us explore some of the commands in the subsections below.

### Install packages with pnpm

The `add` command will install a package and its dependencies. It installs the package as a production dependency by default.

```sh
# Install as a production dependency
pnpm add @refinedev/react-table

# Install as a development dependency
pnpm add -D @refinedev/react-table

# Install as an optional dependency
pnpm add -O @refinedev/react-table

# Install the package globally
pnpm add -g @refinedev/react-table
```

The above commands will install the `@refinedev/react-table` package from the npm package registry. You can also use the `add` command to install a package from the local file system, a git repository, or a remote tarball.

If you already have a Node project, you can install all its dependencies using the `install` command. The alias of the `install` command is `i`.

```sh
# Install all the packages in a project
pnpm install

# Same as above
pnpm i
```

### Uninstall packages with pnpm

You can use the `remove` command to remove a package from the `node_modules` directory and the `package.json` file. Its aliases are `uninstall`, `rm`, and `un`.

```sh
# Uninstall a package
pnpm remove @refinedev/react-table

# Alternative to the uninstall command
pnpm rm @refinedev/react-table

# Alternative to the uninstall command
pnpm un @refinedev/react-table
```

### Update packages with pnpm

You can update installed packages to their latest version using the `update` command. This command adheres to the ranges specified in the `package.json` file. Its aliases are `up` and  `upgrade`.

```sh
# Update package
pnpm update @refinedev/react-table

# Alternative to the update command
pnpm upgrade @refinedev/react-table

# Alternative to the update command
pnpm up @refinedev/react-table
```

### Patch packages with pnpm

With pnpm, you can extract a package you want to patch to a temporary editable directory. You can modify the package and use the command below to generate the patch file and register it in the `patchedDependencies` field of the top-level manifest.

```sh
pnpm patch <package name>@<package version>
```

### Run scripts with pnpm

You can use the `run` command to run scripts declared in the `package.json` file. Its alias is `run-script`. Therefore, you can use both commands interchangeably.

If the `scripts` field of your `package.json` file has the script below, you can use the `pnpm run build` command to run the `build` script.

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

## Why pnpm is Great for Monorepos

I'd quickly like to share my thoughts on why **pnpm** is such a great monorepo management tool.

One of the main advantages of pnpm is that it offers support for **workspaces**. With pnpm, you can handle multiple packages inside a single repository. It installs dependencies for all packages at once but links them together instead of duplicating them in each package’s `node_modules` folder. This saves disk space and speeds up installation times.

Here’s how pnpm can assist monorepos:

### Shared Dependencies

pnpm links packages from a global store, so we avoid having multiple copies of the same dependency across different packages, saving a lot of space—especially in large projects.

### Installation Efficiency

The installation process is efficient since pnpm installs all packages together, downloading only the files that are unique and haven’t been cached yet.

### Hoisting Dependencies

pnpm strictly hoists dependencies so each package gets precisely the version of a dependency it needs. This prevents version conflicts and ensures consistency across projects.

### Automatic Linking

Packages inside the monorepo are automatically linked with pnpm. If we’re working on a package that depends on another package within the repository, changes are reflected instantly.

## Comparing npm and pnpm

As hinted above, pnpm is an efficient alternative to npm. In this section, we will draw some parallels between npm and pnpm by exploring their differences and similarities.

### Package storage on disk

One of the main differences between npm and pnpm is the way installed packages are stored on disk. When using npm, packages are installed on disk on a per-project basis.

If you create a project with ten dependencies, npm will install and save them on disk in the project's `node_modules` directory. Creating another project with the same dependencies will fetch and store the packages on disk again.

On the other hand, pnpm installs dependencies and saves them on disk in a content-addressable global store. Your projects can access the packages in the store via hard links. Therefore, pnpm is more space-efficient than npm.

### Package installation time

Traditionally, dependency installation has three stages. These stages are:

- Resolving dependencies
- Fetching dependencies
- Linking dependencies

These stages are sequential and blocking when using npm. One stage must end before the next one starts. On the other hand, these phases run separately and independently for each dependency when using pnpm. Therefore, pnpm has a faster installation speed than npm.

### Node version management

pnpm has a built-in feature for managing Node.js versions while, npm doesn't have such a feature. With pnpm, you can use one of the commands below to install and activate any Node.js version.

```sh
# Install the LTS version of Node
pnpm env use --global lts

# Install Node version 20
pnpm env use --global 20

# Install the pre-release Node version
pnpm env use --global nightly

# Install the latest Node version
pnpm env use --global latest
```

Check the pnpm documentation for other commands you can use to manage installed Node versions.

### Support for workspaces and monorepos

Both npm and pnpm have built-in support for workspaces. The workspace feature in npm and pnpm has capabilities for managing monorepos.

## Efficiency in CI/CD by using pnpm

I wanted to share some thoughts on how we can use **pnpm** to optimize our **CI/CD pipelines**, which could help improve build times.

### Faster Dependency Installation

pnpm's global store approach for managing dependencies is faster than npm. By caching dependencies across builds, we can avoid downloading them repeatedly, saving a lot of time. Most CI/CD platforms, like GitHub Actions or Jenkins, support dependency caching.

Here's an example of caching pnpm dependencies in a GitHub Actions workflow:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"
      - name: Cache pnpm store
        uses: actions/cache@v2
        with:
          path: ~/.pnpm-store
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('pnpm-lock.yaml') }}
      - name: Install dependencies with pnpm
        run: pnpm install
```

By caching the `pnpm-store`, we save time by avoiding reinstalling all dependencies during each CI run.

### Parallelization of Tasks

One of pnpm's key features is the ability to parallelize scripts, which speeds up CI processes, especially for monorepos. The `pnpm run --recursive` command runs tasks in all packages simultaneously, reducing build times for large projects.

```sh
pnpm run --recursive build
```

### Consistent Lockfiles

pnpm lockfile (`pnpm-lock.yaml`) is more deterministic, ensuring that builds are consistent across environments and helping to avoid dependency issues during deployments.

### Smaller Disk Usage

Since pnpm uses hard links for dependencies in its global store, it saves disk space, particularly in large projects. This is useful for CI systems with limited storage.

### Node Version Management

pnpm includes built-in support for managing Node.js versions, which simplifies setup in CI/CD pipelines. We can specify the exact Node.js version for builds, ensuring consistency across environments.

```bash
pnpm env use --global 16
```

Integrating pnpm into our CI/CD pipelines will drastically reduce build times, improve consistency, and save resources.

## Conclusion

pnpm is one of the package managers in the Node ecosystem. Though it's not the default, you can install it easily using Corepack, npm, and install it as a standalone script.

pnpm stores installed packages in a content-addressable global store. A package is installed once into the global store, and all your projects can access it via hard links.

When installing dependencies using pnpm, the resolving, fetching, and linking phases run independently for each package and in a non-blocking way.

These features make pnpm a more efficient alternative to npm. Packages install quickly, and the installed packages take up less disk space.
