---
title: "shadcn/ui Forgot Password Component | UI Component in Refine v5"
display_title: "<ForgotPasswordForm />"
sidebar_label: "<ForgotPasswordForm />"
description: "Implement Forgot Password in Refine v5. Learn the key steps. Learn integrate Radix UI, Tailwind CSS for polished admin UIs. Explore with code snippets."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/form/forgot-password-form.tsx
---

Users occasionally forget their passwords, especially in admin systems where they might not log in daily. The `ForgotPasswordForm` provides a simple interface for users to request a password reset link via email.

This component integrates with Refine's authentication system to handle password reset requests, providing clear feedback when the email is sent successfully.

## Installation

Add the forgot password form to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/forgot-password-form.json
```

This installs the password reset request form with email validation.

## Usage

Create a dedicated page for password reset requests:

```tsx
import { ForgotPasswordForm } from "@/components/refine-ui/form/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ForgotPasswordForm />
    </div>
  );
}
```

The form collects the user's email address and sends a password reset request through your authentication provider. Users receive clear feedback when the email is sent successfully.

## Requirements

You need to implement a `forgotPassword` method in your `authProvider`:

```tsx
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  forgotPassword: async ({ email }) => {
    // Send password reset email
    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return { success: true };
    }

    return {
      success: false,
      error: { message: "Failed to send reset email" },
    };
  },
  // ... other auth methods
};
```
