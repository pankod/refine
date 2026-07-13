---
id: create-project
title: 3. Create your refine project
tutorial:
  prev: 3.xx.xx/tutorial/getting-started/{preferredUI}/prepare-env
  next: 3.xx.xx/tutorial/getting-started/{preferredUI}/generate-crud-pages
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Launch the refine CLI setup

The easiest way to create a new project is to use the **refine CLI**. This tool will help you get started quickly by generating a new project with a basic configuration and a folder structure that follows best practices.

1. Launch your terminal and type the following command using your preferred package manager:

<CreateRefineAppCommand args="-o refine-headless tutorial" />

1. Confirm `y` to installation of `create-refine-app`

2. The `-o refine-headless` flag in the command above tells the CLI to install the project with the `refine-headless` preset. This preset selects some options for you in accordance with this tutorial.

   > We use a preset here to sync the tutorial content with the code. Outside of the tutorial, you can skip this flag and select your own options.

3. The CLI will ask if you agree to share your selection anonymously with the **refine** team. You can choose whatever you prefer.

Once the installation wizard is finished, you can close this terminal window and open VS Code to continue your journey.

### Open your project in VS Code

1. Open Visual Studio Code and select the directory that was generated during your setup process.

2. Make sure the terminal is open and ready to run commands. You can open it by pressing `Ctrl + J`(Windows) or `Cmd ⌘ + J`(macOS).

For the rest of this tutorial, you can use the terminal within VS Code instead of your computer's terminal.

### Running the dev server

To preview your project as a web page while you work on it, the project must be running in development (dev) mode.

<h4>Start the dev server</h4>

To start the dev server, run the following command in your terminal:

<Tabs
defaultValue="npm"
values={[ {label: 'npm', value: 'npm'}, {label: 'pnpm', value: 'pnpm'}, {label: 'yarn', value: 'yarn'} ]}>

<TabItem value="npm">

```bash
npm run dev
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm run dev
```

</TabItem>

<TabItem value="yarn">

```bash
yarn run dev
```

</TabItem>

</Tabs>

You should see confirmation in the terminal that the **refine** app is running in dev mode.

### Viewing a preview of your app

Your project files contain all the code you need to run your website. To see a preview of your website in the browser:

1. Click on the <a href="http://localhost:3000" rel="noopener noreferrer nofollow">localhost:3000</a> link in the terminal. This will open a new browser tab with your app running in dev mode.

2. You will be redirected to the welcome page as we have not added any pages yet.

   ([Next section](/core/docs/3.xx.xx/tutorial/getting-started/headless/generate-crud-pages) will guide you through adding pages to your app.)

Here's what you should see:

```tsx live previewOnly previewHeight=450px url=http://localhost:3000
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    />
  );
};

render(<App />);
```

<Checklist>

<ChecklistItem id="getting-started-headless">
I understood how to create a new project.
</ChecklistItem>
<ChecklistItem id="getting-started-headless-2">
I run the dev server and previewed my app.
</ChecklistItem>

</Checklist>
