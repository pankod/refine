---
id: serverSideFormValidation
title: "ServerSideFormValidation Example | Best Practices in Refine v5: MUI"
display_title: "Server-Side Form Validation"
sidebar_label: "Server-Side Form Validation"
description: "Set up ServerSideFormValidation in Refine v5. Learn best practices. Explore Material Design, components for real-world React admin panels."
example-tags: [form, material-ui]
---

You can handle server-side form validation errors out-of-the-box with [React Hook Form useForm][react-hook-form-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] will automatically update the error state with the rejected `errors` field.

[Refer to the server-side Form Validation documentation for more information. →](/core/docs/guides-concepts/forms/#server-side-validation-)

<CodeSandboxExample path="server-side-form-validation-material-ui" />

[react-hook-form-use-form]: /core/docs/packages/list-of-packages
