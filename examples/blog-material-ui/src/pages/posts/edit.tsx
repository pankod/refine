import type { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Edit, useAutocomplete } from "@refinedev/mui";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import type { IPost, ICategory, Nullable } from "interfaces";

export const PostEdit: React.FC = () => {
  const {
    refineCore: { formLoading, query: queryResult },
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IPost, HttpError, Nullable<IPost>>({
    refineCoreProps: { metaData: { populate: ["category"] } },
  });

  const categoryId = queryResult?.data?.data?.category?.id;

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
    defaultValue: categoryId,
    queryOptions: { enabled: !!categoryId },
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", { required: "Title is required" })}
          error={!!errors?.title}
          helperText={errors.title?.message}
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          defaultValue={" "}
          autoFocus
        />

        <Controller
          control={control}
          name="category"
          rules={{ required: "Category is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return item.title
                  ? item.title
                  : autocompleteProps?.options?.find(
                      (p) => p.id.toString() === item.toString(),
                    )?.title ?? "";
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
      </Box>
    </Edit>
  );
};
