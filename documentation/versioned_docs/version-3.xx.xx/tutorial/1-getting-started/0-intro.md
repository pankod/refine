---
id: index
title: 1. Intro
tutorial:
  prev: 3.xx.xx/tutorial/introduction/select-framework
  next: 3.xx.xx/tutorial/getting-started/prepare-env
---

<UIConditional is="antd">

Now that you have selected the **Ant Design** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="chakra-ui">

Now that you have selected the **Chakra UI** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="headless">

Now that you have selected the **headless** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="mantine">

Now that you have selected the **Mantine** option as your UI preference, let's get started!

</UIConditional>

<UIConditional is="mui">

Now that you have selected the **Material UI** option as your UI preference, let's get started!

</UIConditional>

:::info Using Stackblitz?
Prefer to finish this tutorial in an online code editor? That's possible!

<details>

<summary>Follow these instructions, then go directly to "Generate CRUD pages automatically with Inferencer" section!</summary>

**Set up StackBlitz**

<UIConditional is="antd">

1. Click [here](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/template-antd?file=src%2FApp.tsx) to open the Ant Design template.

</UIConditional>

<UIConditional is="chakra-ui">

1. Click [here](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/template-chakra-ui?file=src%2FApp.tsx) to open the Chakra UI template.

</UIConditional>

<UIConditional is="headless">

1. Click [here](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/template-headless?file=src%2FApp.tsx) to open the headless template.

</UIConditional>

<UIConditional is="mantine">

1. Click [here](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/template-mantine?file=src%2FApp.tsx) to open the Mantine template.

</UIConditional>

<UIConditional is="mui">

1. Click [here](https://codesandbox.io/embed/github/refinedev/refine/tree/v3/examples/template-material-ui?file=src%2FApp.tsx) to open the Material UI template.

</UIConditional>

2. Click “Sign in” on the top right to log in using your GitHub credentials.

3. In the upper left of the StackBlitz editor window, click to “fork” the template (save to your own account dashboard).

<UIConditional is="antd">

4. Wait for the project to load, and you will see a live preview of the “refine-antd-boilerplate” starter.

</UIConditional>

<UIConditional is="chakra-ui">

4. Wait for the project to load, and you will see a live preview of the “refine-chakra-ui-boilerplate” starter.

</UIConditional>

<UIConditional is="headless">

4. Wait for the project to load, and you will see a live preview of the “refine-headless-boilerplate” starter.

</UIConditional>

<UIConditional is="mantine">

4. Wait for the project to load, and you will see a live preview of the “refine-mantine-boilerplate” starter.

</UIConditional>

<UIConditional is="mui">

4. Wait for the project to load, and you will see a live preview of the “refine-mui-boilerplate” starter.

</UIConditional>

**Make Changes**
<UIConditional is="antd">

In the file pane, you should see `src/app.tsx`. Click to open it, and follow [Generate CRUD pages automatically with Inferencer](/core/docs/3.xx.xx/tutorial/getting-started/antd/generate-crud-pages/) to make a change to this file.

</UIConditional>

<UIConditional is="chakra-ui">

In the file pane, you should see `src/app.tsx`. Click to open it, and follow [Generate CRUD pages automatically with Inferencer](/core/docs/3.xx.xx/tutorial/getting-started/chakra-ui/generate-crud-pages/) to make a change to this file.

</UIConditional>

<UIConditional is="headless">

In the file pane, you should see `src/app.tsx`. Click to open it, and follow [Generate CRUD pages automatically with Inferencer](/core/docs/3.xx.xx/tutorial/getting-started/headless/generate-crud-pages/) to make a change to this file.

</UIConditional>

<UIConditional is="mantine">

In the file pane, you should see `src/app.tsx`. Click to open it, and follow [Generate CRUD pages automatically with Inferencer](/core/docs/3.xx.xx/tutorial/getting-started/mantine/generate-crud-pages/) to make a change to this file.

</UIConditional>

<UIConditional is="mui">

In the file pane, you should see `src/app.tsx`. Click to open it, and follow [Generate CRUD pages automatically with Inferencer](/core/docs/3.xx.xx/tutorial/getting-started/mui/generate-crud-pages/) to make a change to this file.

</UIConditional>

**Create a GitHub Repository**

1. Press the "Connect Repository" button at the top of your list of files, enter a new name for your repository, and click "Create repo & push".

2. When you have changes to be committed back to GitHub, a “Commit” button will appear at the top left of your workspace. Clicking on this will allow you to enter a commit message, and update your repository.

**Deploy your App**

If you’d like to deploy to Netlify, skip to [Deploy your app to the web](/core/docs/3.xx.xx/tutorial/getting-started/deploy-project/). Otherwise, skip to [Generate CRUD pages automatically with Inferencer](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/index/) to start building with **refine**!

</details>
:::

<h3>Where are we going?</h3>

In this unit, we will be covering the following steps:

- Setting up your development environment.
- Creating a new project.
- Generating CRUD pages for your data model.
- Store your project in a git repository.
- Deploy your project to the cloud.

As you make changes to your project, you can commit them to your GitHub repository. Netlify listens for changes to your GitHub repository to automatically rebuild and deploy your application on every commit. This allows anyone to access and view your website updates as you make them.

<Checklist>

<ChecklistItem id="getting-started">
Let's prepare to build a refine project!
</ChecklistItem>

</Checklist>
