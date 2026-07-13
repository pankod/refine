import type { HttpError } from "@refinedev/core";
import { SaveButton, useAutocomplete } from "@refinedev/mui";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import type { UseModalFormReturnType } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import type { ICategory, IPost, IStatus, Nullable } from "../interfaces";

export const CreatePostModal: React.FC<
  UseModalFormReturnType<IPost, HttpError, Nullable<IPost>>
> = ({
  saveButtonProps,
  modal: { visible, close, title },
  register,
  control,
  formState: { errors },
}) => {
  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
  });

  return (
    <Dialog
      open={visible}
      onClose={close}
      PaperProps={{ sx: { minWidth: 500 } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
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
              <Autocomplete
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
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <SaveButton {...saveButtonProps} />
      </DialogActions>
    </Dialog>
  );
};
