---
id: deploy-project
title: 6. Deploy your app to the web
tutorial:
  prev: 3.xx.xx/tutorial/getting-started/store-your-repository
  next: 3.xx.xx/tutorial/understanding-dataprovider/index
---

To make your app accessible to the public, you can use a hosting service to build and deploy your site live on the web. In this tutorial, we will use Netlify, but you are welcome to choose your preferred hosting service.

Netlify will use your GitHub repository to build and deploy your site every time you commit a change to your code. To connect your repository to Netlify, you will need to create a new Netlify site and link it to your GitHub repository.

## Create a new Netlify site

1. If you don't already have a Netlify account, go to [Netlify.com](https://www.netlify.com/) and create a free account.

2. Click `Add new site` > `Import an existing project`.

> You will be prompted to connect to a Git provider. Choose GitHub and follow the on-screen instructions to authenticate your GitHub account. Then, choose your project’s GitHub repository from the list provided.

3. To complete the process of deploying your app to the web, you will need to review and confirm the settings provided by Netlify. These settings should already be correctly configured for your **refine** project. Simply scroll down and click `Deploy site`.

Congratulations! You now have an **refine** website hosted on Netlify.

:::tip

To support for client-side routing, you can check out the Create React App documentation on [deployment](https://create-react-app.dev/docs/deployment/#netlify).

:::

## Visit your new website

To view your new website, visit the URL provided in your site settings or type it into a browser window.

<Checklist>

<ChecklistItem id="deploy-your-project">
I deployed my app to the Netfly.
</ChecklistItem>

</Checklist>
