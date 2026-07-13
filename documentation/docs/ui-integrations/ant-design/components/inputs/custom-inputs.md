---
id: custom-inputs
title: Custom Inputs
---

Refine uses Ant Design's [`<Form>`](https://ant.design/components/form/) components to control and work with form data. Ant Design supports custom form items inside the [`<Form.Item>`](https://ant.design/components/form/#Form.Item) components. These items should be controllable via their `value` property and should implement `onChange` (or a custom callback name specified by [`<Form.Item>`](https://ant.design/components/form/#Form.Item)'s `trigger` prop).

For some data types, displaying and editing as plain text may cause user experience problems.

Custom components may be useful when working with markdown (with markdown editor), JSON based rich text (draft, quill like editors), and HTML (a HTML editor). It can be used in table columns and form fields

> For more information, refer to the [Ant Design's `<Form>` documentation. &#8594](https://ant.design/components/form/)

## Example

We will demonstrate how to use custom input fields for markdown data by adding a markdown editor to edit and create forms:

```tsx title="/src/pages/posts/edit.tsx"
import React, { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

// highlight-start
import MDEditor from "@uiw/react-md-editor";
// highlight-end

import { IPost } from "interfaces";

export const PostEdit: React.FC = (props) => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
    <Edit {...props} saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        // highlight-start
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
        // highlight-end
      </Form>
    </Edit>
  );
};
```

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/components/inputs/custom-inputs/markdown-input.png" alt="Markdown input" />
<br/>

## Example

<CodeSandboxExample path="input-custom" />
