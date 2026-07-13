import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Controller } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { HttpError } from "@refinedev/core";

interface IFormValue {
  firstname: string;
  lastname: string;
  address: string;
  number: number;
  work: string;
  company: string | undefined;
  role: string | undefined;
}
const defaultValues = {
  firstname: "",
  lastname: "",
  address: "",
  number: 0,
  work: "unemployed",
  company: "",
  role: "",
};

const schema: Yup.SchemaOf<IFormValue> = Yup.object().shape({
  firstname: Yup.string().label("First Name").trim().required().min(3).max(64),
  lastname: Yup.string().label("Last Name").trim().required().min(3).max(64),
  address: Yup.string().label("Address").trim().required().min(3),
  number: Yup.number().label("Number").required(),
  work: Yup.string().label("Work").required().oneOf(["unemployed", "employed"]),
  company: Yup.string().when(
    "work",
    ([work]: string | string[], schema: Yup.AnySchema) => {
      if (work === "employed") {
        return schema.required().min(3).max(64);
      }
      return schema.notRequired();
    },
  ),
  role: Yup.string().when(
    "work",
    ([work]: string | string[], schema: Yup.AnySchema) => {
      if (work === "employed") {
        return schema.required().min(3).max(64);
      }
      return schema.notRequired();
    },
  ),
});

const Create: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormValue, HttpError, IFormValue>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSubmission = (data: IFormValue) => console.log(data);

  const work = watch("work");

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(handleSubmission)}
    >
      <Controller
        control={control}
        name="firstname"
        rules={{ required: true, minLength: 5 }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ maxWidth: 600 }}
            label="First Name"
            margin="dense"
            error={!!errors.firstname}
            helperText={errors.firstname && `${errors.firstname.message}`}
          />
        )}
      />
      <Controller
        control={control}
        name="lastname"
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ maxWidth: 600 }}
            label="Last Name"
            margin="dense"
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ maxWidth: 600 }}
            label="Address"
            margin="dense"
          />
        )}
      />
      <Controller
        control={control}
        name="number"
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ maxWidth: 600 }}
            label="Number"
            margin="dense"
            type="number"
          />
        )}
      />
      <FormControl sx={{ marginTop: 1, marginBottom: 0.7 }}>
        <InputLabel id="type-label">Work</InputLabel>
        <Controller
          control={control}
          name="work"
          render={({ field }) => (
            <Select
              sx={{ maxWidth: 600 }}
              margin="dense"
              {...field}
              type="select"
              labelId="type-label"
              label="Work"
            >
              <MenuItem value="employed">Employed</MenuItem>
              <MenuItem value="unemployed">Unemployed</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      {work === "employed" && (
        <>
          <Controller
            control={control}
            name="company"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ maxWidth: 600 }}
                label="Company"
                margin="dense"
                error={!!errors.company}
                helperText={errors.company && `${errors.company.message}`}
              />
            )}
          />
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ maxWidth: 600 }}
                label="Role"
                margin="dense"
                error={!!errors.role}
                helperText={errors.role && `${errors.role.message}`}
              />
            )}
          />
        </>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          maxWidth: "600px",
          padding: "10px",
          backgroundColor: "#67BE23",
          color: "white",
          marginTop: "5px",
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Create;
