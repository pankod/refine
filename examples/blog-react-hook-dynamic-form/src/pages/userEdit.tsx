import { Edit } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller, useFieldArray } from "react-hook-form";
import type { HttpError } from "@refinedev/core";

interface IPost {
  firstName: string;
  email: string;
  skills: string[];
}

const defaultValues = {
  firstName: "",
  email: "",
  skills: [],
};

function PostEdit() {
  const {
    saveButtonProps,
    control,
    formState: { errors },
    watch,
  } = useForm<IPost, HttpError, IPost>({
    mode: "onChange",
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error - `useFieldArray` works without an `id` field in the array items but the type definition requires it
    name: "skills",
    rules: {
      required: "please add at least one skill",
    },
  });

  const skills = watch("skills");

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form">
        <>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors?.firstName}
                helperText={errors.firstName && `${errors.firstName.message}`}
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors?.email}
                helperText={errors.email && `${errors.email.message}`}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
              />
            )}
          />
          {skills.map((_, index) => {
            return (
              <Box
                key={fields[index]?.id}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginRight: "15px",
                }}
              >
                <Controller
                  control={control}
                  name={`skills.${index}`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors?.skills}
                      helperText={errors.skills && `${errors.skills.message}`}
                      margin="normal"
                      required
                      fullWidth
                      id="skills"
                      label={`Skill - ${index + 1}`}
                    />
                  )}
                />
                <DeleteIcon
                  onClick={() => {
                    remove(index);
                  }}
                  sx={{ color: "red", cursor: "pointer" }}
                />
              </Box>
            );
          })}
        </>
      </Box>
      <p>{errors.skills && `${errors.skills?.root?.message}`}</p>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          append("Javascript");
        }}
      >
        Add a skill
      </Button>
    </Edit>
  );
}

export default PostEdit;
