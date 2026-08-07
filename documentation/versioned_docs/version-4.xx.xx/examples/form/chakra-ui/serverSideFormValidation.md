---
id: serverSideFormValidation
title: "Chakra UI Server-Side Validation | Refine v4 Guide"
display_title: "Server-Side Form Validation"
sidebar_label: "Server-Side Form Validation"
description: "Learn to display backend validation errors in Chakra UI forms with Refine v4. A practical example for mapping server errors to React UI."
example-tags: [form, chakra-ui, react-hook-form]
---

You can handle server-side form validation errors out-of-the-box with [React Hook Form useForm][react-hook-form-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] will automatically update the error state with the rejected `errors` field.

[Refer to the server-side Form Validation documentation for more information. →](/core/docs/guides-concepts/forms/#server-side-validation-)

<CodeSandboxExample path="server-side-form-validation-chakra-ui" />

[react-hook-form-use-form]: /core/docs/packages/list-of-packages
