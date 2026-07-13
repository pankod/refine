```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useSelect } from "@refinedev/mantine";
import { Select, Button } from "@mantine/core";

interface ICategory {
  id: number;
  title: string;
}

const ProductCreate: React.FC = () => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    // highlight-start
    sorters: [
      {
        field: "title",
        order,
      },
    ],
    // highlight-end
  });

  return (
    <>
      <Button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
        Toggle Order
      </Button>
      <Select
        label="Category"
        placeholder="Select a category"
        withinPortal
        {...selectProps}
      />
    </>
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
