---
id: serverSideFormValidation
title: "Material UI Server-Side Validation | Refine v4"
display_title: "Server-Side Form Validation"
sidebar_label: "Server-Side Form Validation"
description: "Master server-side validation with Material UI and Refine v4. Display backend response errors clearly in your MUI-based React forms."
example-tags: [form, material-ui]
---

You can handle server-side form validation errors out-of-the-box with [React Hook Form useForm][react-hook-form-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] will automatically update the error state with the rejected `errors` field.

[Refer to the server-side Form Validation documentation for more information. →](/core/docs/guides-concepts/forms/#server-side-validation-)

<CodeSandboxExample path="server-side-form-validation-material-ui" />

[react-hook-form-use-form]: /core/docs/packages/list-of-packages
