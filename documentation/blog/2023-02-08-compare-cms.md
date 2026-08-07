---
title: Comparing the best headless CMS solutions
description: We compared best headless CMS solutions -  Strapi, Hasura, and Hygraph. We'll highlight their pros and cons.
slug: best-headless-cms
authors: joseph_mawa
category: "Alternatives"
tags: [strapi, comparison, backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-08-compare-cms%2Fsocial.png
hide_table_of_contents: false
---

## Introduction

A content management system, abbreviated as CMS, is software for creating and managing content. With traditional CMS, you can create textual content and upload images and multimedia content like audio and video files. The CMS then generates and serves the presentation layer with the created content.

On the other hand, unlike traditional CMS, headless content management systems are content repositories without the presentation layer. A headless CMS decouples your content from the presentation. You can build the presentation layer in any way and using any framework of your choice with a Headless CMS. Therefore, making it easy to extend your customers' digital experience from the web to mobile and IoT devices.

You need to pick the appropriate headless CMS for a better developer experience and to provide a satisfactory digital experience to your customers. There are several headless CMS out there. The most popular ones include Strapi, Contentful, Hygraph, Sanity, and Headless WordPress.

Each headless CMS has strengths and weaknesses. Some of them are tailor-made for a specific purpose. And different projects have different requirements. Therefore, it may be difficult to zero down on a headless CMS which meets your project requirements. This article will compare Strapi, Hasura, and Hygraph. We will go above and beyond to highlight their pros and cons.

## The best headless CMS

### Strapi

[Strapi](https://strapi.io/) is a popular open-source headless CMS built based on Node.js. It has an intuitive, customizable UI for creating content. While writing this article, Strapi's cloud hosting platform is still in beta. Therefore, you need to self-host your Strapi project at the moment. Strapi has several out-of-the-box integrations for some of the most popular tools and frameworks.

With Strapi, you can access the content API using REST or GraphQL API. Internally, Strapi uses the Koa web framework. If you want to customize the Strapi back end, you need a working knowledge of Koa.

#### How to start using Strapi

To get the feel of Strapi, you can create a Strapi project from scratch or use one of the available starter templates. If you are an absolute beginner to Strapi, I recommend you start with the available starter templates.

The command below will create the Next blog starter template. Respond to the prompts during the installation process. You can choose the `Quickstart` option as your installation type.

```sh
# npm
npx create-strapi-starter project-name next-blog

# yarn
yarn create strapi-starter project-name next-blog
```

Once the installation is complete, Strapi will launch the admin panel. You will have to create your admin account by filling out the form.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-08-compare-cms%2Fstrapi-login-page.png"  alt="Strapi admin sign-up screen" />

<br />

After creating your admin account, the Strapi dashboard looks like the image below. The Strapi documentation has detailed getting-started guides you can use to explore the main features of Strapi.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-08-compare-cms%2Fstrapi-dashboard.png"  alt="Strapi admin dashboard" />

<br />

Instead of using a starter template like in the example above, you can also create a Strapi project from the ground up using one of the commands below.

```sh
# npm
npx create-strapi-app@latest project-name --quickstart

# yarn
yarn create strapi-app project-name --quickstart
```

#### Refine built-in Strapi data provider

A [data provider](https://refine.dev/core/docs/api-reference/core/providers/data-provider/#overview) is an interface a [Refine](https://refine.dev/) application uses to communicate with an API. Refine has data providers for most of the popular CMS and platforms. You can use Refine's [Strapi data provider](https://github.com/refinedev/refine/tree/main/packages/strapi-v4) to interact with your Strapi instance from a Refine application.

You can install the Strapi data provider in a Refine application like so:

```sh
npm install @refinedev/strapi-v4
```

The Refine documentation has comprehensive guides on [data providers](https://refine.dev/core/docs/api-reference/core/providers/data-provider/).

#### Pros of using Strapi

- Strapi is open-source
- It has an active community support
- It is released under the terms of MIT and Strapi's Enterprise Edition Supplemental License
- Strapi has an excellent documentation
- You can quickly get up and running with Strapi
- The admin panel has an intuitive UI
- You can access your content via REST or GraphQL API
- Strapi is flexible and customizable
- Supports several integrations out of the box
- Since you can use GraphQL API to access your content, Strapi comes with all the benefits of GraphQL.

#### Cons of using Strapi

- At the time of writing this article, Strapi's cloud service is still in beta. You have to self-host your Strapi projects.
- Any Strapi project must strictly use one of the supported databases. The latest version, Strapi version 4, only supports MySQL, MariaDB, PostgreSQL, and SQLite.

### Hasura

[Hasura](https://hasura.io/) is an open-source GraphQL engine. You can use Hasura to connect to a database and third-party REST and GraphQL API endpoints. It then uses a GraphQL API to expose your data. Though Hasura primarily exposes your data via a GraphQL API, you can create REST API endpoints from GraphQL queries and mutations.

You can use the most popular cloud SQL databases like AWS RDS Postgres and Azure Postgres with Hasura cloud. However, be aware that Hasura mainly supports PostgreSQL databases at the time of writing this article.

Compared to Strapi, Hygraph, and other headless CMS, Hasura is more of a GraphQL engine than a CMS. It provides an instant, fast, and secure GraphQL API for your database with built-in data caching and authorizations.

The Hasura console doesn't provide functionality for managing content like the other headless CMS.

#### How to start using Hasura

Hasura cloud is the fastest way to start using Hasura. You can create an account using your email id or log in using GitHub or Google.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-08-compare-cms%2Fhasura-cloud-login-page.png"  alt="Hasura Cloud login page" />

<br />

After logging into your Hasura cloud account, you can create a Neon PostgreSQL database or connect an existing database. There are detailed how-to guides in the Hasura documentation on creating a new database or adding a database from the supported cloud database providers. I won't repeat them here.

After creating a database and populating it with entries, you can query, mutate, and subscribe from the API explorer in the Hasura console. You can also create REST API endpoints to access the database.

#### Refine built-in Hasura data provider

As highlighted above, Refine has data providers for most CMS and platforms. You can use the [Hasura data provider](https://github.com/refinedev/refine/tree/main/packages/hasura) to communicate with your Hasura GraphQL API or REST API endpoints from a Refine application.

You can install the Hasura data provider in your Refine application like so:

```sh
npm install @refinedev/hasura
```

Check the [Refine documentation](https://refine.dev/core/docs/api-reference/core/providers/data-provider/) on using data providers in a Refine application.

#### Pros of Hasura

- It has an intuitive UI and console
- Hasura is open-source
- The GraphQL engine is Apache version 2.0 licensed. Other resources, such as the documentation and tutorials, are MIT licensed.
- Hasura offers a generous free tier without requiring a credit card or payment information
- Hasura supports most of the popular SQL cloud databases
- It has comprehensive documentation
- Hasura has an active and supportive community
- It is easy to pick up
- There are both cloud and self-hosted Hasura instances
- It is performant

#### Cons of Hasura

- Hasura doesn't support NoSQL databases while writing this article. Though, there are plans to include them in the future.
- Hasura is tailored towards exposing databases via GraphQL API. It doesn't have content management capabilities like the other headless CMS.

### Hygraph

Hygraph is another headless CMS with an intuitive UI for creating, editing and modifying content. Unlike Strapi, Hygraph is not open-source. You can interact with the Hygraph content via GraphQL API. It also has a feature for composing content from third-party REST and GraphQL APIs.

Hygraph provides a generous community plan for free without even asking for a credit card or payment information. The free plan also comes with most of the features of the paid plans.

#### How to start using Hygraph

To start using [Hygraph](https://hygraph.com/), you need to have an account. If you haven't, create an account using your email id or log in with your Google, Facebook, or GitHub account. You can create a new project or use one of the available starter projects after setting up an account to explore Hygraph.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-08-compare-cms%2Fhygraph-login-page.png"  alt="Hygraph login page" />

<br />

As highlighted above, Hygraph has an intuitive UI for creating and managing content. Starting shouldn't be difficult if you are already familiar with other CMS. If you are a beginner to CMS, there are comprehensive getting-started guides in the Hygraph documentation to set you off. However, it requires you to have a basic understanding of GraphQL.

In this article, our primary goal is to compare Hygraph with other similar headless CMS. Therefore, we won't explore the details of creating a project or managing your content with Hygraph.

#### Pros of Hygraph

- Hygraph has an intuitive UI for creating, editing, and managing content
- It has an excellent documentation
- Good community support
- It offers a generous free community plan which includes most of the features in the paid plans
- You can compose content from third-party REST and GraphQL APIs
- It serves content using low-latency Edge CDN
- It has a feature for content permission management
- Because it serves content using GraphQL API, it has all the benefits of GraphQL, such as avoiding multiple round-trips when querying content

#### Cons of Hygraph

- You can only access content in the CMS using GraphQL API
- It is not open-source.
- It is not as customizable as Hasura

## Comparing the best CMS

In this section, we will compare Hasura, Strapi, and Hygraph. The table below summarizes their similarities and differences.

|                      | Strapi                                          | Hasura                     | Hygraph            |
| -------------------- | ----------------------------------------------- | -------------------------- | ------------------ |
| License              | MIT and Enterprise Edition Supplemental License | Apache version 2.0 and MIT | Proprietary        |
| GitHub stars         | 51.1k                                           | 29k                        | Not available      |
| Open source          | Yes                                             | Yes                        | No                 |
| Active maintenance   | Yes                                             | Yes                        | Yes                |
| Documentation        | Good                                            | Good                       | Good               |
| Pricing              | Free                                            | Generous free plan         | Generous free plan |
| Community support    | Good                                            | Good                       | Good               |
| Open GitHub issues   | 296                                             | 1886                       | Not available      |
| Closed GitHub issues | 6938                                            | 3473                       | Not available      |
| Ease of use          | Easy                                            | Easy                       | Easy               |

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>

## Conclusion

Though our focus in this article was on Strapi, Hasura, and Hygraph, there are many excellent headless content management systems out there. As mentioned above, each headless CMS has strengths and weaknesses. Some are tailor-made for a specific purpose.

If you are looking for an open-source, customizable headless CMS with an intuitive UI, Strapi may be the best option. It can serve your content using REST or GraphQL API. However, on the flip side, you may have to self-host your Strapi project because Strapi's cloud solution is still in beta. Strapi also supports a few databases at the moment.

Hygraph is similar to Strapi, but it is not open-source. It has an intuitive UI for creating content and a cloud solution to which you can automatically deploy your project. You can get up and running with Hygraph faster than Strapi, but it is not as flexible and customizable.

Hasura is more of a GraphQL engine than a headless CMS. It is an excellent choice if you want a fast and secure GraphQL API to source data from a database or third-party REST or GraphQL API. However, Hasura doesn't have the content creation capabilities of the other headless CMS.

I hope this article has highlighted the main features of Strapi, Hasura, and Hypgraph so that you can pick the most suitable for your project.
