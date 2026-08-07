---
title: "How to Build a React Admin Dashboard with Refine"
description: A step-by-step guide to building a React admin dashboard from scratch using Refine. Covers project setup, data providers, CRUD resources, authentication, and theming.
slug: how-to-create-react-admin-dashboard
authors: ozgur
category: "How To Build"
tags: [react, admin-panel, dashboards]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2026/2026-02-12-react-admin-dashboard/react-admin-banner.png
hide_table_of_contents: false
---

## Introduction

Every admin dashboard starts the same way: someone says "we just need a simple table and a few charts." Three months later, you're knee-deep in routing configs, permission edge cases, and a login flow that only half works.

This guide walks through how to build a React admin dashboard that actually ships. We'll use [React](https://react.dev/) with [Refine](https://refine.dev/) to put together something clean and extensible, and I'll cover the decision between templates, themes, and frameworks so you can pick the right approach for your situation.

If you're building internal tools, B2B apps, or anything data-heavy, this is for you. It's also useful if you already have a React app and want to bolt on an admin layer without rebuilding everything.

## What is a React admin dashboard

It's the control center for your product. The place where your team manages data, reviews metrics, and takes action. Most dashboards revolve around CRUD workflows (creating, reading, updating, deleting records), user management, and some kind of analytics view.

Think e-commerce back offices, SaaS consoles, content moderation panels, and ops tools. If your team regularly needs to look at data and do something about it, you need an admin dashboard.

The good ones share a few things in common: they load fast, show the right information without clutter, and make the most common actions easy to reach. Navigation is clear, data is fresh enough to act on, and permissions actually match how your company works. Keep those goals in mind and the rest of the build decisions get a lot simpler.

## Templates, themes, or frameworks?

Before you start coding, figure out which approach matches your situation. The answer usually comes down to three questions: how fast do you need to ship, how much UI control do you need, and how much will this dashboard change over time?

**Templates** give you a ready-made UI with layouts and screens already built. Great for demos, pilots, or teams that need something polished fast. The tradeoff is that deep customization gets painful later. If your data model is stable and workflows are standard, templates are a smart short-term pick.

**Themes** sit in the middle. You build with a component library and apply a design system through tokens, colors, and spacing rules. This works well when you know your UX flow but want visual consistency without designing every component from scratch. If brand identity matters to you, themes give you that flexibility.

**Frameworks** handle the hard parts, data providers, routing, permissions, resource management, while you stay in control of the UI. This is the best long-term choice when you expect the dashboard to grow, new features, new data sources, new teams touching the code. The core patterns are standardized, so the codebase stays maintainable.

For most teams in 2026, a framework approach gives you the best balance of speed and flexibility. That's the path we'll take in this guide, using [Refine](https://refine.dev/).

## What we're building

We'll put together a dashboard with a metrics overview page, CRUD resources for users and orders, authentication hooks, and a clean layout you can theme later. The focus is on getting a solid structure in place first, then layering on features.

One quick note before we start coding: dashboards fail more often because of unclear data than because of bad UI. Before you build, know your key resources (users, orders, invoices), the metrics that actually drive decisions, and the actions people need to take after seeing those numbers. This saves you from painful rewrites down the road.

## Step-by-step: Build a React admin dashboard with Refine

### Step 1: Create the project

The Refine CLI scaffolds a project with routing, data hooks, and a layout already wired up.

```bash
npm create refine-app@latest
```

When prompted, pick [Ant Design](https://ant.design/) for the UI framework, [React Router](https://reactrouter.com/) for routing, Simple REST for the data provider, and skip auth for now (we'll add it in Step 5).

This gives you a working app with sensible defaults. The nice part is that you can swap the UI framework later without touching your core logic.

### Step 2: Connect your API

Refine uses data providers as the bridge between your API and the UI. You pass in a provider and Refine handles the rest, fetching, caching, pagination, all of it.

```tsx
import { Refine } from "@refinedev/core";
import { RefineThemes, ThemedLayout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";

const API_URL = "https://api.example.com";

export const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            options={{ syncWithLocation: true }}
          >
            <ThemedLayout>
              <Routes>{/* Your routes will go here */}</Routes>
            </ThemedLayout>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};
```

If your backend is GraphQL or something like [Supabase](https://supabase.com/), just swap in the matching data provider. Refine has [built-in providers](https://refine.dev/core/docs/data/data-provider/) for most popular backends. Don't have an API yet? Mock the endpoints and replace them later.

### Step 3: Add resources

Resources are how you tell Refine what your dashboard manages. Each resource maps to an API endpoint and gets its own set of routes automatically.

```tsx
import { Refine } from "@refinedev/core";
import { RefineThemes, ThemedLayout } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";

export const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.example.com")}
            resources={[
              { name: "users", list: "/users" },
              { name: "orders", list: "/orders" },
            ]}
            options={{ syncWithLocation: true }}
          >
            <ThemedLayout>
              <Routes>{/* Your routes will go here */}</Routes>
            </ThemedLayout>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};
```

This gives you clean navigation and predictable URLs out of the box, which makes it easy to share links to specific records. Name your resources the way your team actually talks about the data. "orders" is better than "order_items_v2" if everyone calls them orders.

### Step 4: Build the dashboard page

Start with a simple overview screen. I like to hardcode the values first to get the layout right, then wire them to the API.

```tsx
import { Card, Col, Row, Typography } from "antd";

export const Dashboard = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card>
          <Typography.Text>Total Revenue</Typography.Text>
          <Typography.Title level={3}>$248,900</Typography.Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Text>Active Users</Typography.Text>
          <Typography.Title level={3}>4,120</Typography.Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Text>Open Orders</Typography.Text>
          <Typography.Title level={3}>128</Typography.Title>
        </Card>
      </Col>
    </Row>
  );
};
```

Once the layout feels right, replace the hardcoded numbers with data from Refine hooks like `useList`:

```tsx
import { useList } from "@refinedev/core";
import { Card, Col, Row, Typography, Spin } from "antd";

export const Dashboard = () => {
  const { data: users, isLoading: usersLoading } = useList({
    resource: "users",
    meta: { select: "count" },
  });

  const { data: orders, isLoading: ordersLoading } = useList({
    resource: "orders",
    filters: [{ field: "status", operator: "eq", value: "open" }],
  });

  if (usersLoading || ordersLoading) {
    return <Spin size="large" />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card>
          <Typography.Text>Total Revenue</Typography.Text>
          <Typography.Title level={3}>$248,900</Typography.Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Text>Active Users</Typography.Text>
          <Typography.Title level={3}>{users?.total || 0}</Typography.Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Text>Open Orders</Typography.Text>
          <Typography.Title level={3}>{orders?.total || 0}</Typography.Title>
        </Card>
      </Col>
    </Row>
  );
};
```

The `useList` hook handles fetching, caching, and automatic refetching. You can add filters, sorting, and pagination without managing state yourself. Check the [data hooks documentation](https://refine.dev/core/docs/data/hooks/use-list/) for more patterns.

A word of advice: three metrics that lead to action are worth more than twelve that just look busy. Keep it focused.

### Step 5: Add authentication and permissions

Most dashboards need some form of access control. Refine makes this straightforward with its auth provider interface.

```tsx
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  login: async () => ({ success: true }),
  logout: async () => ({ success: true }),
  check: async () => ({ authenticated: true }),
  getIdentity: async () => ({ id: 1, name: "Admin User" }),
};
```

This is a skeleton. In practice, you'd plug in your JWT logic, session management, or a service like Auth0. The [auth provider docs](https://refine.dev/core/docs/authentication/auth-provider/) walk through the full setup.

For role-based access control, add an `accessControlProvider` and define permissions by resource and action. It's worth thinking about this early, even if you only have one role right now. Retrofitting permissions into a dashboard that wasn't built for them is never fun.

### Step 6: Theme it to match your brand

Since Refine is headless at its core, you can restyle everything without touching business logic. Use Ant Design's token system to adjust colors, typography, and spacing. If you already have a design system, map your tokens early rather than doing a big visual refactor later.

You'd be surprised how much even small tweaks, a consistent font, tighter spacing, your brand's primary color, can make a dashboard feel polished and trustworthy.

### Step 7: Launch and iterate

Get your first version live and then layer on advanced features as you need them: audit logs, real-time updates, multi-tenant routing, custom role permissions. Refine has [dedicated guides](https://refine.dev/core/docs/) for each of these.

The most important thing after launch is watching how people actually use the dashboard. The best improvements come from observation, not guesswork.

## Things that will save you pain later

A few lessons from building and maintaining dashboards in production:

**Performance matters more than you think.** Admin dashboards get used every day, often for hours. If a list page takes five seconds to load, people lose trust in the tool. Always paginate large tables, measure real loading times, and add error handling and empty states early. A good dashboard tells the user what happened and how to recover.

**Test the critical paths.** You don't need 100% coverage, but cover login, your main list pages, and the forms that handle money or sensitive data. End-to-end tests on those workflows pay for themselves fast.

**Don't ignore accessibility.** Dashboards are used in long sessions. Keyboard navigation, clear focus states, and proper contrast reduce fatigue and help everyone move faster. If your UI library supports accessibility out of the box, lean on it.

**Avoid the classic pitfalls.** Too many metrics on one screen (focus on signals that drive decisions). Over-customizing before you've validated the workflow (start with defaults). Ignoring permissions until launch day (fix access control early). Building a fast UI on top of stale data (speed means nothing if the numbers are wrong).

## Deployment and next steps

Your dashboard is a standard React app, so deploy it wherever you'd normally host one. [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or your own infrastructure all work. If you need server-side rendering down the line, Refine pairs nicely with [Next.js](https://nextjs.org/) and you can keep the same resource structure.

As your product grows, you'll probably want audit logging for compliance, multi-tenant routing for enterprise customers, and real-time updates for operations teams. Refine supports all of these, so you won't need to swap frameworks when the requirements expand.

## FAQ

### Can I start with a template and move to a framework later?

Absolutely. A lot of teams start with a template for speed, then migrate to a framework when things get more complex. Refine makes that transition easier because it doesn't lock you into any UI layer.

### What if my API is GraphQL or Supabase?

Refine has [data providers](https://refine.dev/core/docs/data/data-provider/) for both (and many others). You can swap providers without touching your UI code.

### Do I need a design system to make the dashboard look good?

Not at all. Start with a clean UI library theme and adjust tokens and layout as your product matures. You can always invest in a full design system later.

### How long does it take to build a first version?

With a framework approach and a clear data model, most teams get a usable MVP in a day or two. The scaffolding handles enough boilerplate that you can focus on the actual business logic.

### Is Refine suitable for enterprise dashboards?

Yes. It supports access control, multi-resource routing, audit logs, and large data sets, which covers the most common enterprise requirements.
