---
title: Create Your Own Supabase Database In 5 Minutes
description: Learn how to create and configure a scalable Supabase database. A step-by-step guide to getting your backend ready for your next web project.
slug: supabase-database-setup
authors: ozgur
category: "Tutorials"
tags: [supabase, backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-11-17-supabase-tutorial/supabase-tutorial-big.png
hide_table_of_contents: false
last_update: 2026-02-02
---

If you’ve ever wanted to create a backend quickly — with a real database, authentication, storage, and auto-generated APIs — **Supabase** is a practical place to start. It’s open source, runs on top of PostgreSQL, and helps you move from idea to data in minutues.

In this guide, we’ll focus entirely on **setting up your Supabase database** — creating tables, understanding relationships, and preparing your project so that tools like **Refine** can generate a working admin panel from it.

No frontend, no API calls — just a clear, simple walkthrough of setting up a real, production-grade database the easy way.

---

---

## Step 1: Create a Supabase Project

Start at [supabase.com](https://supabase.com) and click **Start your project**.
You can sign in using GitHub or any email address.

Once you’re in the dashboard, click **New project** and fill in the details:

- **Name** – anything you like, e.g., `team-admin`
- **Password** – this is your database password (keep it safe!)
- **Region** – choose one close to you or your users

Then click **Create new project**.
Within about 30 seconds, you’ll have a live PostgreSQL database running in the cloud — complete with authentication, storage, and instant APIs.

You’ll land on the **project dashboard**, where you’ll see the core sections:

- **Table Editor** – visually manage your database schema
- **Authentication** – add users and permissions
- **Storage** – upload and manage files
- **Edge Functions** – run custom backend logic

For now, we’ll stay inside the **Table Editor**.

---

## Step 2: Understanding the Table Editor

The Table Editor is where you design your data model. You don’t have to write SQL — though you can, if you want to — Supabase gives you a clean UI for defining everything visually.

Each table is like a spreadsheet, but with types, constraints, and relationships.

When you create a new table, you’ll define:

- **Table name**
- **Columns** (fields)
- **Data types** (text, integer, timestamp, etc.)
- **Default values** and **constraints**
- **Relationships** (foreign keys)
  Supabase automatically handles the SQL under the hood, and everything you build here instantly becomes accessible through a REST API and GraphQL

### Row Level Security (RLS) & Policies (Quick Primer)

When you create a table using the Table Editor, **[Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security)** is enabled by default. With RLS enabled and **no policies**, any request through the REST or GraphQL APIs (using the public `anon` key) returns **no rows**. Policies are Postgres rules that act like implicit `WHERE` clauses for each operation (`SELECT`, `INSERT`, `UPDATE`, `DELETE`). You’ll add policies later to selectively open access.

Role mapping:

- `anon`: requests without a user JWT (public key only)
- `authenticated`: requests with a valid user JWT (including “anonymous sessions” created via Supabase Auth; those still assume the `authenticated` role)

You can always inspect or change RLS via the table’s Policies tab. We’ll keep schema focus first, then add policies once structure exists.

---

## Step 3: Create Your First Table

Let’s create a simple `employees` table — a common resource you might manage later in Refine.

1. In the **Table Editor**, click **New Table**.
2. Name it `employees`.
3. Add the following columns:

| Column       | Type            | Default             | Notes                                                                                               |
| ------------ | --------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| `id`         | `uuid`          | `gen_random_uuid()` | Primary key                                                                                         |
| `name`       | `text`          | —                   | Employee name                                                                                       |
| `role`       | `text`          | —                   | Job title or position                                                                               |
| `salary`     | `numeric(12,2)` | —                   | Optional salary field (consider storing minor units as integer if you need strict money arithmetic) |
| `created_at` | `timestamptz`   | `now()`             | Record creation time                                                                                |

![Supabase Project Editor Schema Public (1)](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-11-17-supabase-tutorial/supabase-tutorial-2.png)

:::tip
The “Enable Row Level Security” toggle is ON by default in the Table Editor. Leave it enabled—your table is protected until you add explicit policies.
:::

Click **Save**. Your table is created instantly and available via REST (once policies allow it).

---

## Step 4: Add a Related Table

Let’s make another table called `departments` so you can see how relationships work.

1. Click **New Table**, name it `departments`.
2. Add:

| Column | Type   | Default             |
| ------ | ------ | ------------------- |
| `id`   | `uuid` | `gen_random_uuid()` |
| `name` | `text` | —                   |

![Supabase Project Editor (3)](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-11-17-supabase-tutorial/supabase-tutorial-2.png)

Now go back to your `employees` table and click **Add Column** → name it `department_id`.
Set its **type** to `uuid`, and under **Foreign Key**, select **departments → id**. For safer deletes, set the FK behavior to **ON DELETE SET NULL**.

Click **Save** again.

You’ve just created your first relational link — every employee belongs to a department. Supabase automatically handles referential integrity and updates your schema.

This structure is now ready for Refine to analyze later and generate fully functional list, create, and edit pages for you.

---

## Step 5: Insert Sample Data

In the **Table Editor**, click on your `departments` table and choose **Insert Row**.
Add a few examples:
![Supabase Project Editor Schema Public](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-11-17-supabase-tutorial/supabase-tutorial-3.png)

| id     | name        |
| ------ | ----------- |
| (auto) | Engineering |
| (auto) | Marketing   |
| (auto) | HR          |

Then go to your `employees` table and insert:
![Supabase Project Editor Schema](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-11-17-supabase-tutorial/supabase-tutorial-4.png)

| id     | name  | role          | salary | department_id    |
| ------ | ----- | ------------- | ------ | ---------------- |
| (auto) | Alice | Engineer      | 85000  | (Engineering id) |
| (auto) | Bob   | HR Specialist | 60000  | (HR id)          |

Your data is now live.
You can view, edit, and filter it right in the dashboard — or query it using SQL in the **SQL Editor** tab.

---

## Step 6: Explore the SQL Editor

Even though the Table Editor is visual, Supabase lets you use full PostgreSQL SQL if you prefer. Click the SQL Editor tab in the sidebar.

Here you can:

- Run queries like `SELECT * FROM employees;`
- Create views, triggers, and functions
- Save and version your SQL scripts

For example, once you’ve inserted `departments` and linked employees with a real `department_id`, try:
![Supabase SQL Editor query](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-11-17-supabase-tutorial/supabase-tutorial-5.png)

```sql
SELECT e.name, e.role, d.name AS department
FROM public.employees e
LEFT JOIN public.departments d ON e.department_id = d.id;
```

:::warning Relation not found (42P01)
If you see `ERROR: 42P01: relation "public.employees" does not exist`:

- Ensure you clicked Save when creating the table.
- Confirm the schema is `public` (default) and the table name is lowercase `employees`.
- Refresh the browser tab—occasionally the SQL Editor metadata lags.
- Verify you’re in the same project where the table was created.

:::

:::tip No results or NULL department values?

`LEFT JOIN` will keep employees visible even when `department_id` isn’t set yet. To see department names, edit the employee and paste the UUID of the
correct department into `department_id`.

:::

## This flexibility means you can build relational structures that Refine (or any frontend) can use directly.

## Step 7: Enable APIs and Policies

Every table you create in an exposed schema automatically has a REST endpoint, e.g.:

```
https://<project-ref>.supabase.co/rest/v1/employees
```

View API examples and keys under Project Settings → API Docs (see the [API overview](https://supabase.com/docs/guides/api)).

Because RLS is enabled, you must add policies before data is visible. Using the **Policies** tab in a table:

1. Open `employees` → Policies → New Policy.
2. Choose operation: SELECT.
3. Template: “Allow authenticated users” (or create custom).
4. Save. The UI shows the SQL for reference.

Resulting read policy:

```sql
create policy "Authenticated can read employees"
on public.employees
for select
to authenticated
using (true);
```

Insert policy (allow authenticated users to add rows):

```sql
create policy "Enable insert for authenticated users only"
on public.employees
for insert
to authenticated
with check (true);
```

![Supabase RLS policies](https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-11-17-supabase-tutorial/supabase-tutorial-6.png)

Optional (dev only) broader read access:

```sql
create policy "Dev read employees (anon + authenticated)"
on public.employees
for select
to anon, authenticated
using (true);
```

Remove permissive policies before production.

Role nuance:

- Requests without a JWT use the `anon` role.
- Authenticated user sessions (including Supabase’s [anonymous auth](https://supabase.com/docs/guides/auth/auth-anonymous) sessions) map to `authenticated`.
- `auth.uid()` is `NULL` for unauthenticated requests—combine with checks like `auth.uid() IS NOT NULL` for clarity.

REST example (after policies):

```bash
curl -H "apikey: $SUPABASE_ANON_KEY" \
		 -H "Authorization: Bearer $USER_JWT" \
		 "https://<project-ref>.supabase.co/rest/v1/employees?select=*"
```

You can layer more granular policies later (row ownership, role-based filters, etc.).

---

## Why This Matters

The old way of setting up databases meant provisioning servers, installing PostgreSQL, managing connections, and writing migration scripts. Supabase makes the setup much simpler.

Within minutes, you can have:

- A structured PostgreSQL database
- Relationships and constraints
- Realtime APIs
- Secure authentication

Supabase also works well with **Refine** — once your schema is ready, Refine can generate an admin UI around it: tables, forms, relationships, and filters.

---

## What to do after

The quickest win now is to connect your Supabase database to Refine and generate working internal tools (admin panel, CRUD, filters, relations) from your schema in minutes. See the walkthrough:

- Build internal tools from your Supabase schema → https://refine.dev/blog/supabase-refine-ai/

---

## Helpful Links

- [Supabase Docs](https://supabase.com/docs) – explore all features
- [Refine + Supabase Guide](https://refine.dev/core/docs/data/packages/supabase/) – connect your schema to Refine
- [Make an admin panel in 5 minutes with your Supabase database](https://refine.dev/blog/admin-panel-with-supabase/)

---
