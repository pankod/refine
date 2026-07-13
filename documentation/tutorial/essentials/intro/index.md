---
title: Introduction
---

import { Sandpack } from "./sandpack.tsx";
import { TutorialParameterDropdown } from "@site/src/refine-theme/tutorial-parameter-dropdown";

<Sandpack>

This tutorial will walk you through from essentials of Refine to advanced topics. You'll learn how to build a full-featured CRUD applications with Refine.

Refine is router agnostic and you're free to choose the routing library you're most familiar with. Refine officially supports [React Router DOM](/core/docs/routing/integrations/react-router), [Next.js](/core/docs/routing/integrations/next-js) and [Remix](/core/docs/routing/integrations/remix). In the further steps of the tutorial, you'll be presented with the related content based on your routing selection. You can always change your selection and see the content for the other libraries throughout the tutorial.

Pick the Routing library you want to continue with:

<TutorialParameterDropdown parameter="routerSelection" label="Routing" className="w-min pb-4" />

In the further units of this tutorial, you'll be selecting a UI framework integration of Refine and learn more about how UI integrations are made and where they can be useful. While Refine provides official support for Ant Design, Material UI, Mantine and Chakra UI, the tutorial is prepared for the top two most used UI frameworks; [Ant Design](/core/docs/ui-integrations/ant-design/introduction) and [Material UI](/core/docs/ui-integrations/material-ui/introduction).

Pick the UI framework you want to continue with:

<TutorialParameterDropdown parameter="uiSelection" label="UI Framework" className="w-min pb-4" />

You can find the corresponding material that is taught in this tutorial for the other UI frameworks in the [documentation](/core/docs/guides-concepts/ui-libraries).

## Tutorial Contents

Below you can find all the tutorial sections organized by topic:

### Essentials

- [Your First Refine App](/core/tutorial/essentials/setup/)
- [Fetching a Record](/core/tutorial/essentials/data-fetching/fetching-data/)
- [Updating a Record](/core/tutorial/essentials/data-fetching/updating-data/)
- [Listing Records](/core/tutorial/essentials/data-fetching/listing-data/)
- [Forms](/core/tutorial/essentials/forms/)
- [Tables](/core/tutorial/essentials/tables/)

### Authentication

- [Introduction](/core/tutorial/authentication/intro/)
- [Protecting Content](/core/tutorial/authentication/protecting-content/)
- [Logging In & Out](/core/tutorial/authentication/logging-in-out/)
- [Using User Identity](/core/tutorial/authentication/user-identity/)
- [Data Provider Integration](/core/tutorial/authentication/data-provider-integration/)

### Routing with React Router

- [Introduction](/core/tutorial/routing/intro/react-router/)
- [Authentication](/core/tutorial/routing/authentication/react-router/)
- [Defining Resources](/core/tutorial/routing/resource-definition/react-router/)
- [Navigation](/core/tutorial/routing/navigation/react-router/)
- [Inferring Parameters](/core/tutorial/routing/inferring-parameters/react-router/)
- [Redirects](/core/tutorial/routing/redirects/react-router/)
- [Syncing State with Location](/core/tutorial/routing/syncing-state/react-router/)

### UI Libraries with Ant Design

- [Introduction](/core/tutorial/ui-libraries/intro/ant-design/react-router/)
- [Using Layouts](/core/tutorial/ui-libraries/layout/ant-design/react-router/)
- [Refactoring](/core/tutorial/ui-libraries/refactoring/ant-design/react-router/)
- [CRUD Components](/core/tutorial/ui-libraries/crud-components/ant-design/react-router/)
- [Notifications](/core/tutorial/ui-libraries/notifications/ant-design/react-router/)
- [Authentication](/core/tutorial/ui-libraries/authentication/ant-design/react-router/)

### UI Libraries with Material UI

- [Introduction](/core/tutorial/ui-libraries/intro/material-ui/react-router/)
- [Using Layouts](/core/tutorial/ui-libraries/layout/material-ui/react-router/)
- [Refactoring](/core/tutorial/ui-libraries/refactoring/material-ui/react-router/)
- [CRUD Components](/core/tutorial/ui-libraries/crud-components/material-ui/react-router/)
- [Notifications](/core/tutorial/ui-libraries/notifications/material-ui/react-router/)
- [Authentication](/core/tutorial/ui-libraries/authentication/material-ui/react-router/)

### Next Steps with Ant Design

- [Introduction](/core/tutorial/next-steps/intro/ant-design/)
- [Using Inferencer](/core/tutorial/next-steps/inferencer/react-router/ant-design/)
- [Using CLI](/core/tutorial/next-steps/cli/react-router/ant-design/)
- [Using Devtools](/core/tutorial/next-steps/devtools/react-router/ant-design/)
- [Summary](/core/tutorial/next-steps/summary/react-router/ant-design/)

### Next Steps with Material UI

- [Introduction](/core/tutorial/next-steps/intro/material-ui/)
- [Using Inferencer](/core/tutorial/next-steps/inferencer/react-router/material-ui/)
- [Using CLI](/core/tutorial/next-steps/cli/react-router/material-ui/)
- [Using Devtools](/core/tutorial/next-steps/devtools/react-router/material-ui/)
- [Summary](/core/tutorial/next-steps/summary/react-router/material-ui/)

</Sandpack>
