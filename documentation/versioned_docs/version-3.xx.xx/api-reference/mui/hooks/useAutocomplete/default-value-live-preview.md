```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import {
    Autocomplete,
    useAutocomplete,
    TextField,
} from "@pankod/refine-mui";

interface ICategory {
    id: number;
    title: string;
}

const PostCreate: React.FC = () => {
    
    const { autocompleteProps } = useAutocomplete<ICategory>({
        resource: "categories",
        // highlight-next-line
        defaultValue: 11,
    });

    return (
        <Autocomplete
            {...autocompleteProps}
            getOptionLabel={(item) => item.title}
            isOptionEqualToValue={(option, value) =>
                value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
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
render(<RefineMuiDemo />);
```