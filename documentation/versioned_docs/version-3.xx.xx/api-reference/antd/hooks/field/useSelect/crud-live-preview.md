```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { Create, Form, Select, useSelect, useForm } from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

const PostCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<ICategory>();

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Category"
                    placeholder="Select a category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...selectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};
// visible-block-end
setRefineProps({
    resources: [
        {
            name: "posts",
            create: PostCreate,
        },
    ],
});
render(<RefineAntdDemo />);
```