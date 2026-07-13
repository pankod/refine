---
id: serverSideFormValidation
title: "ServerSideFormValidation Example | Best Practices in Refine v5"
display_title: "Server-Side Form Validation"
sidebar_label: "Server-Side Form Validation"
description: "Build ServerSideFormValidation in Refine v5. Learn the key steps. Explore best practices for enterprise UI, components for real-world React admin panels."
example-tags: [form, antd]
---

You can handle server-side form validation errors out-of-the-box with [Ant Design useForm][antd-use-form].

When `dataProvider` returns rejected promise with `errors` field, [`useForm`][react-hook-form-use-form] will automatically update the error state with the rejected `errors` field.

[Refer to the server-side Form Validation documentation for more information. →](/core/docs/guides-concepts/forms/#server-side-validation-)

<CodeSandboxExample path="server-side-form-validation-antd" />

[antd-use-form]: /core/docs/ui-integrations/ant-design/hooks/use-form
