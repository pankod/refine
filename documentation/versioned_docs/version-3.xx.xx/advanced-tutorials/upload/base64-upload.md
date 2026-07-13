---
id: base64-upload
title: Base64 Upload
---

By encoding your files and images from your forms to Base64 you can change all files needed for the upload to Base64 format before the submit. This can be done via the `onFinish` property of the [`<Form>`](https://ant.design/components/form/#Form) component that comes with [Ant Design](https://ant.design/) 

# Example

Now let's make a small example to see how its done. In this example, the file we are going to be uploading files in Base64 type  is going to be called `avatar`

```tsx  title="pages/users/create.tsx"
import {
    //highlight-start
    file2Base64,
    //highlight-end
} from "@pankod/refine-core";

import {
    Create,
    Form,
    Upload,
    Input,
    useForm,
// highlight-start
    getValueFromEvent,
// highlight-end
} from "@pankod/refine-antd";

export const UserCreate: React.FC = () => {
    const { form, formProps, saveButtonProps } = useForm<IUser>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
// highlight-start
                onFinish={async (values) => {
                    const base64Files = [];
                    // @ts-ignore
                    const { avatar } = values;

                    for (const file of avatar) {
                        if (file.originFileObj) {
                            const base64String = await file2Base64(file);

                            base64Files.push({
                                ...file,
                                base64String,
                            });
                        } else {
                            base64Files.push(file);
                        }
                    }

                    return (
                        formProps.onFinish &&
                        formProps.onFinish({
                            ...values,
                            avatar: base64Files,
                        })
                    );
                }}
// highlight-end
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Avatar">
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
// highlight-start
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
                            listType="picture"
                            multiple
// highlight-start
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Create>
    );
};

interface IUser {
    id: number;
    firstName: string;
    avatar: [
        {
            uid: string;
            name: string;
            url: string;
            status: "error" | "success" | "done" | "uploading" | "removed";
        },
    ];
}
```

You can change files to Base64 by using the `file2Base64` function.

:::tip
An edit form can be made by using the `<Edit>` component instead of `<Create>` without changing the rest of the code.

:::

## Example

<CodeSandboxExample path="upload-antd-multipart" />
 
