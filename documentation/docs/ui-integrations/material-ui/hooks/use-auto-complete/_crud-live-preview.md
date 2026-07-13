```tsx live url=http://localhost:3000 previewHeight=400px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, Autocomplete, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

interface ICategory {
  id: number;
  title: string;
}

const PostCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, query },
    register,
    control,
    formState: { errors },
  } = useForm<IPost, HttpError, IPost & { category: ICategory }>();

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form">
        <Controller
          control={control}
          name="category"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              //highlight-next-line
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={({ title }) => title}
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
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
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
