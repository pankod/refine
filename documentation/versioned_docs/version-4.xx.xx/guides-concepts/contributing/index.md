---
title: "Contributing to Refine | Open Source Guide"
display_title: "Contributing"
sidebar_label: "Contributing"
description: "Join the Refine community. Learn how to contribute to the core framework, documentations, and ecosystem to help grow the project."
---

We follow a [code of conduct](https://github.com/refinedev/refine/blob/main/CODE_OF_CONDUCT) when participating in the community. Please read it before you make any contributions.

- If you plan to work on an issue, mention so in the issue page before you start working on it.
- If you plan to work on a new feature, create an issue and discuss it with other community members/maintainers.
- Ask for help in our [community room](https://discord.gg/refine).

## Ways to contribute

- **Stars on GitHub**: If you're a Refine user and enjoy using our platform, don't forget to star it on [GitHub](https://github.com/refinedev/refine)! 🌟
- **Improve documentation**: Good documentation is imperative to the success of any project. You can make our documents the best they need to be by improving their quality or adding new ones.
- **Give feedback**: We're always looking for ways to make Refine better, please share how you use Refine, what features are missing and what is done good via [GitHub Discussions](https://github.com/refinedev/refine/discussions) or [Discord](http://discord.gg/refine).
- **Share Refine**: Help us reach people. Share [Refine repository](https://github.com/refinedev/refine) with everyone who can be interested.
- **Contribute to codebase**: your help is needed to make this project the best it can be! You could develop new features or fix [existing issues](https://github.com/refinedev/refine/issues) - every contribution will be welcomed with great pleasure!
- **Share your own integrations**: If you've created an integration for Refine, this can be a data provider, an auth provider, a UI integration or a routing integration, please share it with us! Refine's community has been growing rapidly and we're sure that your integration will be useful for many people. We'll be happy to add your integration to our [integrations page](/core/integrations) along with the other community made integrations and share it with our community.

## Setting Up Your Environment for Development

:::simple Requirements

- [Node.js](https://nodejs.org/en/) version 18 or higher
- [Git](https://git-scm.com/) and [GitHub](https://github.com) account
- [pnpm](https://pnpm.io/) version 9 or higher
- [Latest Microsoft Visual C++ Redistributable Version](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170)

:::

If your environment is ready, you can [fork the Refine repository](https://github.com/refinedev/refine/fork) and clone it to your local machine.

### Cloning the Repository

After you fork the Refine repository, you need to clone it to your local machine. Instead of using the `refinedev/refine` repository, it's recommended to use your fork. This way, you can push your changes to your fork and create a pull request from there.

```sh
git clone https://github.com/refinedev/refine.git
```

### Installing dependencies

After you clone the repository, you need to install the dependencies. We use pnpm as package manager with workspaces feature. You can run the following command to install, link dependencies and build packages:

```sh title="Terminal"
pnpm install
```

If you don't want to wait for building packages, you can use

```sh title="Terminal"
pnpm install --ignore-scripts
```

### Building packages

You can use `pnpm build` command with `--scope` flag to build packages & examples.

```sh title="Terminal"
pnpm build --scope @refinedev/antd --scope base-antd
```

### Working with packages

```sh title="Terminal"
pnpm dev --scope @refinedev/antd --scope base-antd
```

After running this command, you should see the packages and examples you've started in watch mode. You can now make changes in any of them and see the results in the browser.

If you make a change in the `@refinedev/antd` package, you will see that right after the compilation, the `base-antd` example will re-compile and you will see the changes in the browser.

<details>

<summary>How to add a dependency to a package?</summary>

Navigate to the folder and run the following command:

```sh title="Terminal"
cd packages/core
pnpm add my-new-dep
```

</details>

### Running Tests

Just like the `dev` command, we can use the `test` command to run tests for the packages and examples we're working on.

```sh title="Terminal"
pnpm test -- --scope @refinedev/antd
```

:::simple Good to know

- Refine uses [Jest](https://jestjs.io/) as the test runner and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for testing React components. For E2E tests, we're using [Cypress](https://www.cypress.io).
- We're expecting to see proper tests for each feature/bugfix you make. If you're not sure how to write tests for your feature/bugfix, please ask for help in our [community room](https://discord.gg/refine).

:::

## Working on Documentation

Refine documentation is built with [Docusaurus](https://docusaurus.io/). Documentation is handled separately from Lerna, so you need to install the dependencies and start the documentation separately.

```sh title="Terminal"
cd documentation
pnpm install
pnpm dev:docs
```

:::simple Documentation Scripts

- You can also use `pnpm dev:blog` to start the blog section of the documentation.

- `dev:docs` and `dev:blog` scripts start a portion of the documentation and skips the unnecessary parts to speed up the development process such as type and props table generation, checklist generation, etc. If you want to start the documentation with all the features, you can use `pnpm dev` command.

- To create a production build of the documentation, you can use `pnpm build` command. Then, you can use `pnpm serve` command to serve the production build in your local machine.

:::

### Creating Previews and Code Samples

We're using [Codesandbox's Sandpack](https://sandpack.codesandbox.io) to provide live previews and code editors in our documentation. We've created a custom `<Sandpack />` component to make it easier to use with Refine and provided some predefined configurations for the most common use cases.

Check out the example usage of `<Sandpack />` in Core API's `useForm` hook documentation:

- [useForm Documentation](/core/docs/data/hooks/use-form/#usage)
- [Source Code for Sandpack](https://github.com/refinedev/refine/blob/main/documentation/docs/data/hooks/use-form/basic-usage.tsx)
- [Source Code for Markdown](https://github.com/refinedev/refine/blob/main/documentation/docs/data/hooks/use-form/index)

## Committing Your Work and Preparing a Pull Request

Refine is a monorepo with multiple packages and examples. To make sure we're keeping things clean and in order, we're using couple of tools to enforce a good development experience.

### Linting & Formatting

We are using [biome](https://biomejs.dev) for linting & formatting across the repository.

We suggest using [biome VSCode extension](https://biomejs.dev/reference/vscode/) to handle linting & formatting on your local environment to avoid unexpected failures on CI.

Since biome doesn't have markdown support yet, we are using prettier to format markdown files.

### Commit Convention

Commit messages are essential to keep everything clear in our development process. We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to keep our commit messages consistent and easy to understand.

We're expecting to see proper commit messages with the following format:

```
<type>(optional scope): <description>
```

An example commit message:

```
feat(core): add useAwesome hook
```

:::simple Good to know

We're using [commitlint](https://commitlint.js.org/) to enforce conventional commits. If you don't follow the conventional commit format, you will see an error message when you try to commit your changes or a Github action will fail when you create a pull request.

:::

### Creating a Changeset

To manage our releases, changelogs and versioning, we're using [Changesets](https://github.com/changesets/changesets) and [Changesets GitHub Action](https://github.com/changesets/action) to automate the process. Changesets are designed to make your workflows easier, by allowing the person making contributions to make key decisions when they are making their contribution. Changesets hold two key bits of information: a version type (following semver), and change information to be added to a changelog.

Follow the steps below to create a changeset:

```sh
pnpm changeset
```

After you run this command, you will be asked couple of questions:

- Select the package(s) you are modifying
- Choose one of `major/patch/minor` according to your change
- Add explanation about the changes

After you answer these questions, a changeset file will be created under `.changeset` directory. You can commit this file with your changes.

:::simple Good to know

- We're expecting a changeset to include a description about the changes you've made and how it affects the users. Please make sure you provide a good description for your changeset.
- It's required for a changeset to provide a link to the issue that is related with. If you don't have an issue for your changes, please create one and link it to your changeset.
- You'll be able to edit your changeset after you create it. If you need to make changes to your changeset, you can edit it under `.changeset` directory.

:::

Check out the following examples to see how changesets should be formatted:

```md title=".changeset/some-changeset.md"
---
"@refinedev/core": minor
---

feat: added x feature #ISSUE_ID

Now with x feature, you can do y.

Resolves #1234
```

or

```md title=".changeset/some-other-changeset.md"
---
"@refinedev/mantine": patch
---

fix: issue with x. #ISSUE_ID

We had an edge where it causes x issue to happen, now it's fixed.

Fixes #5678
```

### Creating a Pull Request

After you commit your changes and create a changeset, you can push your changes to your fork and [create a pull request](https://github.com/refinedev/refine/compare). When you create a pull request, you will see a Github action that will run the tests and check if your changeset is valid. Our maintainers will review your changes in short time and merge your pull request if everything is good.

Our Pull Request template is designed to make sure you provide all the necessary information about your changes. Please make sure you fill the template with the required information.

We're looking forward to see your contributions! 🎉

## Release Cycle

Refine follows a monthly release cycle. We're releasing a new version every month with the changes we've made in that month. Unless there's a critical bugfix, we're not releasing a new version in the middle of the month. If your PR is approved and ready to be merged, it will be labeled as `pr-ready` and will be merged to the `main` branch with the next release.

Each approved PR will be included to a milestone, these milestones are used to track the progress of the monthly release.
