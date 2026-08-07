```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Button, TextField } from "@mui/material";

interface ICategory {
  id: number;
  title: string;
}

const PostCreate: React.FC = () => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const { autocompleteProps } = useAutocomplete<ICategory>({
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
      <Autocomplete
        {...autocompleteProps}
        getOptionLabel={(item) => item.title}
        isOptionEqualToValue={(option, value) =>
          value === undefined ||
          option?.id?.toString() === (value?.id ?? value)?.toString()
        }
        placeholder="Select a category"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            margin="normal"
            variant="outlined"
            required
          />
        )}
      />
      <Button
        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
        variant="contained"
        size="small"
      >
        Toggle Order
      </Button>
    </>
  );
};
// visible-block-end
render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          create: "posts/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```
