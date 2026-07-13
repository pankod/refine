import type { HttpError } from "@refinedev/core";
import { Create, useAutocomplete, SaveButton } from "@refinedev/mui";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useStepsForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import type { ICategory, IPost, IStatus, Nullable } from "../../interfaces";

const stepTitles = ["Title", "Status and category", "Slug and content"];

export const PostCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    register,
    handleSubmit,
    control,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, Nullable<IPost>>();

  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
  });

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
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
            autoFocus
          />
        );
      case 1:
        return (
          <>
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
                      required
                    />
                  )}
                />
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              id="slug"
              {...register("slug", {
                required: "This field is required",
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
              margin="normal"
              fullWidth
              label="Slug"
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
          </>
        );
    }
  };

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      footerButtons={
        <>
          {currentStep > 0 && (
            <Button
              onClick={() => {
                gotoStep(currentStep - 1);
              }}
            >
              Previous
            </Button>
          )}
          {currentStep < stepTitles.length - 1 && (
            <Button
              onClick={() => {
                gotoStep(currentStep + 1);
              }}
            >
              Next
            </Button>
          )}
          {currentStep === stepTitles.length - 1 && (
            <SaveButton onClick={handleSubmit(onFinish)} />
          )}
        </>
      }
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Stepper
          nonLinear
          activeStep={currentStep}
          orientation={isSmallOrLess ? "vertical" : "horizontal"}
        >
          {stepTitles.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={() => gotoStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <br />
        {renderFormByStep(currentStep)}
      </Box>
    </Create>
  );
};
