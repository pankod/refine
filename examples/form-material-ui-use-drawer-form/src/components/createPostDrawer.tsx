import { Create, useAutocomplete } from "@refinedev/mui";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import type { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import type { HttpError } from "@refinedev/core";

import type { ICategory, IPost, IStatus, Nullable } from "../interfaces";

export const CreatePostDrawer: React.FC<
  UseModalFormReturnType<IPost, HttpError, Nullable<IPost>>
> = ({
  saveButtonProps,
  modal: { visible, close },
  register,
  control,
  formState: { errors },
}) => {
  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Drawer
      open={visible}
      onClose={close}
      anchor="right"
      PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
    >
      <Create
        saveButtonProps={saveButtonProps}
        headerProps={{
          action: (
            <IconButton
              onClick={() => close()}
              sx={{ width: "30px", height: "30px" }}
            >
              <CloseOutlined />
            </IconButton>
          ),
          avatar: null,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            id="title"
            {...register("title", {
              required: "This field is required",
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="normal"
            fullWidth
            label="Title"
            name="title"
          />
          <Controller
            control={control}
            name="status"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete<IStatus>
                id="status"
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
              <Autocomplete<ICategory>
                id="category"
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
                  />
                )}
              />
            )}
          />
          <TextField
            id="content"
            {...register("content", {
              required: "This field is required",
            })}
            error={!!errors.content}
            helperText={errors.content?.message}
            margin="normal"
            label="Content"
            multiline
            rows={4}
          />
        </Box>
      </Create>
    </Drawer>
  );
};
