---
title: "SignUpForm Component | Authentication UI Patterns in Refine v5"
display_title: "<SignUpForm />"
sidebar_label: "<SignUpForm />"
description: "Secure Sign Up Form in Refine v5. Learn best practices. Learn integration patterns for registration and password for polished admin UIs."
source: https://github.com/refinedev/refine/tree/main/packages/refine-ui/registry/new-york/refine-ui/form/sign-up-form.tsx
---

When building admin dashboards, you often need to allow new team members to register for accounts. The `SignUpForm` provides a complete registration interface with email/password fields, password confirmation, and proper validation.

This component integrates with Refine's authentication system to handle user registration, including proper error handling and success notifications.

## Installation

Add the sign-up form to your project:

```bash
npx shadcn@latest add https://ui.refine.dev/r/sign-up-form.json
```

This installs the complete registration form with password input and validation components.

## Usage

Use the sign-up form on your registration page:

```tsx
import { SignUpForm } from "@/components/refine-ui/form/sign-up-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUpForm />
    </div>
  );
}
```

The form automatically handles user registration through your `authProvider`. It includes email and password fields with confirmation, plus client-side validation to ensure passwords match.

## Requirements

To use the sign-up form, you need to configure an `authProvider` with a `register` method:

```tsx
import { AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  register: async ({ email, password }) => {
    // Your registration logic here
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return { success: true };
    }

    return {
      success: false,
      error: { message: "Registration failed" },
    };
  },
  // Other authProvider methods...
};
```
