---
title: Using Devtools
---

import { Sandpack, SelectorButtonIcon } from "./sandpack.tsx";

<Sandpack>

In this step, we'll explore Refine's powerful Devtools package, which offers monitoring and update features for inspecting and debugging Refine applications.

:::note

`@refinedev/devtools` is in the beta stage and soon to be updated with even more features and improvements.

:::

`@refinedev/devtools` package is designed to help you in development process and it will be removed from the production builds. There will be no performance impact on your application and left-over code in the production bundle of your application.

## Installation

Installation of the package is straightforward but the `@refinedev/cli` package also provides a command to install and setup the Devtools package. We'll use the below command to install the Devtools package:

<Tabs>

<TabItem value="cli" label="Using CLI" default>

```sh
npm run refine devtools init
```

</TabItem>

<TabItem value="manual" label="manual">

<InstallPackagesCommand args="@refinedev/devtools" />

Then we'll need to wrap our application with the `<DevtoolsProvider />` component. The `<DevtoolsProvider />` component should be wrapped around the `<Refine />` component in the `App` component. We'll also be importing the `<DevtoolsPanel />` component to have a nice shortcut to open the Devtools in our application.

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
// highlight-next-line
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
/* ... */

export default function App() {
    return (
        {/* highlight-start */}
        {/* You can mount the DevtoolsProvider at the top most level of the element tree */}
        <DevtoolsProvider>
        {/* highlight-end */}
            <Refine>
                {/* ... */}
            </Refine>
            {/* highlight-start */}
            {/* DevtoolsPanel component should be mounted inside the DevtoolsProvider */}
            <DevtoolsPanel />
            {/* highlight-end */}
            {/* ... */}
        {/* highlight-next-line */}
        </DevtoolsProvider>
    );
}
```

Then we can start using the Devtools in our application.

</TabItem>

</Tabs>

## Using the Monitoring Feature

After you've installed and setup the Devtools package, you'll be able to see the small devtools panel on the bottom of your application. Clicking on the panel will open the devtools. Then you can click on the `"Monitor"` on the sidebar to open the monitoring screen.

This screen will include all the queries and mutations triggered in your application for the currentPage session. You can see their details such as the response, target data provider, target resource, the time it took to execute the query/mutation, and lots more.

You'll be able to filter the queries and mutations by their type, resource, status and the component/hook that triggered them. Also, you can pick the component you want to filter on your UI by using the selector.

To use the selector, click on the <SelectorButtonIcon /> icon and when you hover over a component on your page that triggered a query or a mutation, there will be a highlight around the component. Clicking on the component will filter the queries and mutations by that component.

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/devtools-xray-3.webm" playsInline loop autoPlay muted />

## Using the Update Feature

The update feature of the Devtools package is similar to the `@refinedev/cli`'s update command and it will give you a nice UI to update your Refine dependencies with a single click. Using the same panel, you can also add new Refine packages to your application with a single click and learn about how to use them in your application.

Check out the `"Overview"` tab to see the available updates and click on the `"Add Package"` button to add new Refine packages to your application.

</Sandpack>
