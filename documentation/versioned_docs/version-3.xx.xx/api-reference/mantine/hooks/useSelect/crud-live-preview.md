```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { Create, Select, useForm, useSelect } from "@pankod/refine-mantine";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const { saveButtonProps, getInputProps, errors } = useForm({
        initialValues: {
            category: {
                id: "",
            },
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <Select
                    mt={8}
                    label="Category"
                    placeholder="Select a category"
                    {...getInputProps("category.id")}
                    {...selectProps}
                />
            </form>
        </Create>
    );
};
// visible-block-end
setRefineProps({
    resources: [
        {
            name: "posts",
            create: ProductCreate,
        },
    ],
});
render(<RefineMantineDemo />);
```