import type { HttpError } from "@refinedev/core";
import { useAutocomplete, Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import type {
  ICategory,
  IPost,
  IStatus,
  ITag,
  Nullable,
} from "../../interfaces";

export const PostCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<IPost, HttpError, Nullable<IPost>>();

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
  });

  const { autocompleteProps: tagsAutocompleteProps } = useAutocomplete<ITag>({
    resource: "tags",
    defaultValue: getValues("tags") || [],
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoFocus
        />
        <Controller
          control={control}
          name="status"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete<IStatus>
              options={["published", "draft", "rejected"]}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  autocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString(),
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
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
        <Controller
          control={control}
          name="tags"
          defaultValue={[]}
          render={({ field }) => {
            const newValue = tagsAutocompleteProps.options.filter(
              (p) => field.value?.find((v) => v === p?.id) !== undefined,
            );

            return (
              <Autocomplete
                {...tagsAutocompleteProps}
                {...field}
                value={newValue}
                multiple
                clearOnBlur={false}
                onChange={(_, value) => {
                  const newValue = value.map((p) => p?.id);
                  field.onChange(newValue);
                }}
                getOptionLabel={(item) => {
                  return (
                    tagsAutocompleteProps?.options?.find(
                      (p) => p?.id?.toString() === item?.id.toString(),
                    )?.title ?? ""
                  );
                }}
                isOptionEqualToValue={(option, value) => {
                  return (
                    value === undefined ||
                    option?.id?.toString() === value?.id?.toString()
                  );
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Tags"
                      name="tags"
                      id="tags"
                      margin="normal"
                      variant="outlined"
                      error={!!errors.tags}
                      helperText={errors.tags?.message}
                      required
                    />
                  );
                }}
              />
            );
          }}
        />
      </Box>
    </Create>
  );
};
