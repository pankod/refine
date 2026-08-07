---
title: Building a Complete React CRM App with Refine, Ant Design and GraphQL
description: We'll explore the key features of our CRM app, the technologies we used.
slug: react-crm-with-refine
authors: necati
category: "How To Build"
tags: [react, admin-panel]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/social.jpg
hide_table_of_contents: false
last_update: 2026-02-05
---

![Refine CRM application overview showing the main interface](https://refine.ams3.cdn.digitaloceanspaces.com/CRM-app/crm-general.avif)

I want to introduce our newest example app – a full-fledged React CRM (Customer Relationship Management) application built using Refine, Ant Design, and GraphQL.

👉 [Live Demo](https://example.crm.refine.dev/)

A minimal CRM app tutorial from scratch was published on [YouTube](https://www.youtube.com/watch?v=6a3Dz8gwjdg). You can follow the Refine to get notified for more real use case examples!

Twitter: https://twitter.com/refine_dev

GitHub: https://github.com/refinedev/refine

## Introduction

This article briefly overviews the CRM application built using Refine, an open-source React framework designed for rapidly developing web applications.

We'll explore the key features of our CRM app, the technologies we used, and how you can adapt this template for various business needs.

Step we'll cover:

- [Key Features of the CRM App](#key-features-of-the-crm-app)
- [Technologies Used](#technologies-used)
- [Best Practices and Ecosystem Integration](#best-practices-and-ecosystem-integration)
- [Where Can You Use This CRM As A Reference Template?](#where-can-you-use-this-crm-as-a-reference-template)

## Key Features of the CRM App

Our CRM application is feature-rich and comes with everything you need to manage customer relationships efficiently:

### Dashboard

The Dashboard provides an at-a-glance overview of your CRM activities. It displays key metrics, recent customer interactions, and upcoming events, offering valuable insights to help you make informed decisions.

![CRM dashboard showing key metrics, charts, and recent activity overview](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/halx7sfl9ctke1fu3w35.png)

<br/>
<br/>

### Calendar Integration

Effortlessly manage appointments, meetings, and important events with the integrated Calendar feature. Stay organized and ensure you never miss a crucial interaction with your customers.

![Calendar view displaying scheduled appointments, meetings, and events](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/m2v8ghazuheiznefwat9.png)

<br/>
<br/>

### Scrumboard-Project Kanban

Our Scrumboard or Project Kanban page streamlines project management. Visualize project progress, manage tasks, and facilitate team collaboration with ease. Move tasks through customizable boards to keep your projects on track.

![Kanban board with multiple columns showing project tasks and their progress](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/0hcll7tbqx3t71i6v7a9.png)

<br/>
<br/>

### Sales Pipeline

Effectively manage your sales process from lead generation to deal closure. The Sales Pipeline provides a visual representation of your sales stages, helping your team prioritize leads and track conversions.

![Sales pipeline visualization showing deal stages from lead to closed](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/q5uoj722wasvw2fx8z49.png)

<br/>
<br/>

### Companies

The Companies page allows you to organize and categorize your business contacts. Maintain detailed profiles for each company, including contact information, communication history, and associated contacts.

![Companies list view showing company profiles with contact details and history](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/gjlahcc1icfthu2n31ar.png)

<br/>
<br/>

### Contacts

Manage individual contacts efficiently using the Contacts page. Keep track of customer interactions, schedule follow-ups, and access critical contact information quickly.

![Contacts page displaying individual contact information and interaction history](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/4c0ef7tv7nktax4gt3oz.png)

<br/>
<br/>

### Quotes

Create, send, and manage quotes seamlessly with the Quotes feature. Generate professional quotes for your customers, track their status, and convert them into sales.

![Quotes management interface showing quote creation and tracking](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/9rqj0pzgkrure7ov5mr9.png)

<br/>
<br/>

### Administration

The Administration section empowers you to configure and customize your CRM application to suit your specific business needs. Manage user roles, access permissions, and system settings effortlessly.

![Administration panel with user roles, permissions, and system configuration](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/m5deq6ceue79kloeuryz.png)

<br/>

### Authentication & Authorization

![Login and authentication screen with secure access control](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-10-02-refine-crm-overview/m1r04i2h0cf1jegasbte.png)

This example app is a comprehensive set of features that ensures you can streamline your customer interactions, project management, and sales processes, all within a single, user-friendly platform. Whether you're managing contacts, tracking sales, or overseeing projects, our CRM app provides the tools you need for success.

## Technologies Used

Our CRM app's modular structure and use of open-source tools make it adaptable to various business needs. So you can build all kinds of web apps like internal tools, admin panels, or dashboards on top of it.

To bring our CRM app to life, we leveraged several cutting-edge technologies:

### 1. Refine

[Refine](https://github.com/refinedev/refine) served as the backbone of our CRM application. It offers a wide range of tools and components for easily building data-intensive applications.

Refine's internal hooks and components simplify the development process and eliminate repetitive tasks by providing industry-standard solutions for crucial aspects of a project, including authentication, access control, routing, networking, state management, and i18n.

### 2. Ant Design

[Ant Design](https://ant.design/), a popular UI library, provided the sleek and responsive user interface that our CRM app needed. Its pre-built components saved us time and effort.

It's consistent and polished UI components ensured a professional and user-friendly interface. Refine has a built-in integration for Ant Design.

### 3. GraphQL

We used [GraphQL](https://graphql.org/) for effective data retrieval and updating from our server. Additionally, we integrated [GraphQL Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/) to manage real-time modifications.

For instance, on the Project Kanban page, tasks get updated automatically when cards are dragged and dropped between sections.

![Real-time task updates on Kanban board with GraphQL subscriptions](https://refine.ams3.cdn.digitaloceanspaces.com/CRM-app/real-time.avif)

GraphQL's efficient data-fetching capabilities made working with large datasets a breeze. It's flexibility allowed us to tailor our queries to our exact requirements.

Refine has built-in data provider support for GraphQL.You can set it up during the project creation phase.

## Best Practices and Ecosystem Integration

Throughout the development process, we adhered to best practices and incorporated elements from the broader ecosystem. This ensures our CRM app is not only functional but also scalable and maintainable.

The group responsible for the CRM example app is the core Refine framework team. Feel free to explore the best practices within the ecosystem!

## Where Can You Use This CRM As A Reference Template?

Our CRM template isn't limited to just one use case. You can adapt it for various purposes, including:

- **B2B Applications**: Streamline customer interactions in a business-to-business context.
- **Internal Tools**: Use it as an internal tool to manage employee or departmental tasks and interactions.
- **All CRUD Applications**: The template's versatility means it can serve as the foundation for creating all sorts of CRUD applications.

## Conclusion

In this article, we've introduced you to our CRM application built with refine. We've highlighted its key features, the technologies we used, and the advantages of our approach. With this CRM template, you have the power to tailor your customer relationship management system to meet your unique business needs. Whether you're running a B2B operation, need an efficient internal tool, or want a versatile CRUD application, our CRM template has you covered.
