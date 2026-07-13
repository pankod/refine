---
title: "React Query vs TanStack Query vs SWR: A 2025 Comparison"
description: What's the difference between React Query, TanStack Query, and SWR? A straightforward comparison of these data-fetching libraries and how Refine uses them.
slug: react-query-vs-tanstack-query-vs-swr-2025
authors: ozgur
category: "Alternatives"
tags: [react, comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-12-01-tanstack-vs-swr/tanstack-vs-swr-1.png
hide_table_of_contents: false
last_update: 2026-02-19
---

If you've been building React apps, you've probably heard people mention "React Query," "TanStack Query," and "SWR." Maybe you're confused about what the difference is, or why they matter.

Let me clear this up.

---

## What Problem Do These Libraries Solve?

When you build a web app, you need to fetch data from your backend. The traditional way looks like this:

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Hello, {user.name}!</div>;
}
```

This works, but you're writing a lot of boilerplate. And that's just for one simple fetch. In a real app, you also need caching (don't re-fetch the same data), background refetching (keep data fresh), error handling, loading states, mutations (create/update/delete), optimistic updates, request deduplication, pagination, and infinite scrolling.

Writing all this yourself gets old fast. That's the problem these libraries solve.

---

## The Plot Twist: React Query and TanStack Query Are The Same Thing

Here's something that confuses a lot of people: **React Query and TanStack Query are the same library.**

The library was originally called "React Query" when it launched in 2019. It quickly became one of the most popular data-fetching libraries for React.

In 2022, the creator [Tanner Linsley](https://twitter.com/tannerlinsley) decided to expand it to work with other frameworks like Vue, Solid, and Svelte. Since it wasn't just for React anymore, he renamed it to **[TanStack Query](https://tanstack.com/query/latest)**.

So when you see:

- `@tanstack/react-query` - This is the current name (v4 and v5)
- `react-query` - This is the old package name (v3 and earlier)

They're the same library, just rebranded. If someone says "React Query" today, they usually mean TanStack Query. The React community still calls it "React Query" out of habit.

**For this article, I'll call it TanStack Query since that's the official name.**

---

## What Is TanStack Query?

TanStack Query is a library that handles server state in your application.

Think of it like this: your app has two types of state:

1. **Client state** - Things like "is this modal open?" or "what tab is selected?"
2. **Server state** - Data that lives on your backend and needs to be synced to your UI

TanStack Query focuses on that second part. It gives you hooks like `useQuery` and `useMutation` that handle all the messy parts of data fetching.

Here's the same user profile example using TanStack Query:

```jsx
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Hello, {user.name}!</div>;
}
```

Much cleaner. But the real value is what happens behind the scenes. It automatically caches your data, so using it elsewhere in your app won't trigger another fetch. It refetches in the background when the window regains focus to keep things fresh. It shows cached data instantly while loading fresh data. Multiple components requesting the same data only make one API call. Failed requests retry automatically. You get all this without writing extra code.

---

## What Is SWR?

[SWR](https://swr.vercel.app/) is [Vercel](https://vercel.com/)'s data-fetching library. It came out around the same time as React Query and solves the same problems. The name stands for "stale-while-revalidate," which is the caching strategy both libraries use - SWR just named itself after it.

Here's that same example with SWR:

```jsx
import useSWR from "swr";

function UserProfile() {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR("/api/user", (url) => fetch(url).then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Hello, {user.name}!</div>;
}
```

The API looks pretty similar to TanStack Query. Both give you hooks that return data, loading states, and errors.

---

## TanStack Query vs SWR: What's Different?

Both solve the same problem. The differences come down to philosophy and feature set.

### Bundle Size

[SWR is 5.3KB minified + gzipped](https://bundlephobia.com/package/swr@2.3.6), while [TanStack Query is 16.2KB](https://bundlephobia.com/package/@tanstack/react-query@5.90.11). That's roughly 3x larger, though still quite small in the grand scheme of things. If you're working on a project where every kilobyte matters, SWR has the advantage here.

### API Design

**TanStack Query** uses objects for configuration:

```jsx
useQuery({
  queryKey: ["user", userId],
  queryFn: fetchUser,
  staleTime: 5000,
});
```

**SWR** uses positional arguments:

```jsx
useSWR(["user", userId], fetchUser, { refreshInterval: 5000 });
```

The TanStack Query approach is more verbose but arguably easier to read when you have many options.

### Features

Both libraries handle the core data-fetching features well - caching, automatic refetching, error handling, request deduplication, mutations, and more. They both support advanced patterns like infinite queries, pagination, and optimistic updates.

TanStack Query includes DevTools for debugging, which SWR doesn't have officially. TanStack Query also has a larger plugin ecosystem. That said, SWR is actively evolving and continuously adding more features with each release, narrowing the gap over time. Feature-wise, they're pretty comparable. The main differences are in API design and bundle size rather than capabilities.

### DevTools

TanStack Query has DevTools that show you all queries in your app, their cache status, when they were last fetched, and let you manually trigger refetches. This is really helpful when debugging why data isn't updating or why something is refetching too often. SWR doesn't have official DevTools, though there are community options if you look around.

### TypeScript Support

Both have excellent TypeScript support, but TanStack Query's type inference is slightly more sophisticated.

### Community & Ecosystem

TanStack Query has a larger community, which means more plugins, more Stack Overflow answers, and more examples to learn from. SWR is backed by Vercel and integrates really well with Next.js, so if you're in that ecosystem it's a natural fit.

### When to Choose Each

Choose TanStack Query if you want DevTools for debugging or prefer a larger community with more plugins and Stack Overflow answers. It's the most widely adopted option.

Choose SWR if you want a smaller bundle size or you're already in the Vercel/Next.js ecosystem.

Both are solid choices. The differences are smaller than you'd think.

---

## How Refine Uses TanStack Query

[Refine](https://refine.dev) is a React framework for building internal tools, admin panels, and CRUD apps. Under the hood, Refine uses **TanStack Query v5** to handle all its data operations.

When you use Refine's hooks like `useList`, `useOne`, `useCreate`, or `useUpdate`, you're actually using TanStack Query. Refine just wraps it with a simpler API tailored for CRUD operations.

Here's what this looks like:

```jsx
import { useList } from "@refinedev/core";

function ProductList() {
  const { data, isLoading } = useList({
    resource: "products",
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.data.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

Behind the scenes, Refine's `useList` hook:

1. Calls your data provider's `getList` method
2. Wraps it in TanStack Query's `useQuery`
3. Handles caching, refetching, and state management
4. Returns the result in a clean, consistent format

### Why Refine Chose TanStack Query

TanStack Query is the most popular data-fetching library in React, which means developers already know it, you can use TanStack Query features directly when needed, and there are more community resources available. The TypeScript support is also excellent.

Admin panels typically need pagination, infinite scrolling, real-time updates, optimistic UI updates, and complex filtering and sorting. TanStack Query has all of this built in, so Refine doesn't have to reinvent these features.

The DevTools are also helpful. When debugging data issues in your admin panel, you can see exactly what's cached, what's loading, and what failed.

Finally, while Refine is primarily React-focused, TanStack Query's multi-framework approach fits with Refine's philosophy of being flexible and adaptable.

---

## Summary

**React Query = TanStack Query** (just renamed)

**TanStack Query vs SWR:**

- Both are solid
- TanStack Query: more features, larger bundle, better DevTools
- SWR: simpler, smaller, good for basic use cases
- Pick based on your app's complexity

**For Refine users:**

- Refine uses TanStack Query v5
- You get all its features automatically
- You can use raw TanStack Query hooks when needed
- The `queryOptions` prop lets you pass TanStack Query options directly

**Starting a new project:**

- TanStack Query for full features
- SWR for simplicity
- Refine? The choice is made (TanStack Query)

Both libraries made React data fetching much easier. Pick one, learn it, and you're good to go.

---

## Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [SWR Docs](https://swr.vercel.app)
- [Refine Docs](https://refine.dev/core/docs)
- [Refine Data Fetching Guide](https://refine.dev/core/docs/guides-concepts/data-fetching)
- [TanStack Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
