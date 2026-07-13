---
title: "shadcn/ui ErrorComponent Component | Error UI in Refine v5"
display_title: "<ErrorComponent />"
sidebar_label: "<ErrorComponent />"
description: "Set up ErrorComponent in Refine v5. Learn best practices. Learn integrate back for polished admin UIs. Hands-on examples included."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/layout/error-component.tsx
---

When users encounter broken links or navigate to pages that don't exist, you want to show them a helpful error page instead of a browser's default 404 message. The `ErrorComponent` provides a polished error page that keeps users engaged and helps them get back to working parts of your admin dashboard.

The component includes clear messaging, visual graphics, and navigation options to help users recover from errors gracefully.

## Installation

Add the error component to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/error-component.json
```

This installs a complete 404 error page with navigation back to your app.

## Usage

Use the error component as your 404 page:

```tsx
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";

export default function NotFoundPage() {
  return <ErrorComponent />;
}
```

The component automatically provides a user-friendly error message with a button to navigate back to your app's homepage. It adapts to your theme settings and maintains visual consistency with the rest of your dashboard.

## Integration with Routing

In most React Router setups, you can use this as a catch-all route:

```tsx
// In your routing configuration
import { ErrorComponent } from "@/components/refine-ui/layout/error-component";

function App() {
  return (
    <Routes>
      {/* Your other routes */}
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
}
```
