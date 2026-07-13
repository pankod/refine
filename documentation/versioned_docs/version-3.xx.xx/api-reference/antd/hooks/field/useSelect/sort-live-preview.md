```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useSelect, Select, Button } from "@pankod/refine-antd";

interface ICategory {
    id: number;
    title: string;
}

const PostCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        // highlight-start
        sort: [
            {
                field: "title",
                order,
            }
        ]
        // highlight-end
    });

    return (
        <>
            <Select 
                placeholder={`Ordered Categories: ${order}`} style={{ width: 300 }}
                {...selectProps}
            />
            <Button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>Toggle Order</Button>
        </>
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