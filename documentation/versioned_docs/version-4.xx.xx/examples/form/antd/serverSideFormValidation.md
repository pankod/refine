---
id: serverSideFormValidation
title: "Server-Side Form Validation | Refine v4 & Ant Design"
display_title: "Server-Side Form Validation"
sidebar_label: "Server-Side Form Validation"
description: "Master server-side validation with Ant Design and Refine v4. Display backend errors seamlessly on your React frontend forms."
example-tags: [form, antd]
---

You can handle server-side form validation errors out-of-the-box with [Ant Design useForm][antd-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] will automatically update the error state with the rejected `errors` field.

[Refer to the server-side Form Validation documentation for more information. →](/core/docs/guides-concepts/forms/#server-side-validation-)

<CodeSandboxExample path="server-side-form-validation-antd" />

[antd-use-form]: /core/docs/ui-integrations/ant-design/hooks/use-form
