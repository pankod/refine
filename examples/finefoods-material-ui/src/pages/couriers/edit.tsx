import React from "react";
import InputMask from "react-input-mask";
import {
  useTranslate,
  type HttpError,
  useApiUrl,
  useNavigation,
} from "@refinedev/core";
import { DeleteButton, ListButton, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import type { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import type { ICourier, IFile, IStore, Nullable } from "../../interfaces";
import { CourierImageUpload, CourierTableReviews } from "../../components";
import { useImageUpload } from "../../utils";

export const CourierEdit = () => {
  const { list } = useNavigation();
  const t = useTranslate();
  const apiUrl = useApiUrl();
  const { palette } = useTheme();

  const {
    watch,
    control,
    setValue,
    formState: { errors },
    refineCore: { formLoading, query: queryResult },
    saveButtonProps,
  } = useForm<ICourier, HttpError, Nullable<ICourier>>();
  const courier = queryResult?.data?.data;
  const avatarInput: IFile[] | null = watch("avatar");

  const { autocompleteProps: storesAutoCompleteProps } =
    useAutocomplete<IStore>({
      resource: "stores",
      queryOptions: {
        enabled: !!courier,
      },
    });

  const { autocompleteProps: vehiclesAutoCompleteProps } = useAutocomplete({
    resource: "vehicles",
    queryOptions: {
      enabled: !!courier,
    },
  });

  const imageUploadOnChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.target;
    const file: File = (target.files as FileList)[0];

    const image = await useImageUpload({
      apiUrl,
      file,
    });

    setValue("avatar", image, { shouldValidate: true });
  };

  return (
    <>
      <ListButton
        variant="outlined"
        sx={{
          borderColor: "GrayText",
          color: "GrayText",
          backgroundColor: "transparent",
        }}
        startIcon={<ArrowBack />}
      />
      <Divider
        sx={{
          marginBottom: "24px",
          marginTop: "24px",
        }}
      />
      <Grid container spacing="24px">
        <Grid size={{ xs: 12, md: 12, lg: 5 }}>
          <form>
            <Box
              mb="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="24px"
            >
              <Controller
                control={control}
                name="avatar"
                defaultValue={null}
                rules={{
                  required: t("errors.required.field", {
                    field: "avatar",
                  }),
                }}
                render={({ field }) => {
                  return (
                    <CourierImageUpload
                      {...field}
                      previewURL={avatarInput?.[0]?.url}
                      inputProps={{
                        id: "avatar",
                        onChange: imageUploadOnChangeHandler,
                      }}
                    />
                  );
                }}
              />
              {errors.avatar && (
                <FormHelperText error>{errors.avatar.message}</FormHelperText>
              )}
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="name"
                  defaultValue=""
                  rules={{
                    required: t("errors.required.field", {
                      field: "name",
                    }),
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        variant="outlined"
                        type="name"
                        id="name"
                        required
                        sx={{
                          "& .MuiInputBase-input": {
                            backgroundColor:
                              palette.mode === "dark"
                                ? "#1E1E1E"
                                : palette.background.paper,
                          },
                        }}
                        label={t("couriers.fields.name.label")}
                        placeholder={t("couriers.fields.name.label")}
                      />
                    );
                  }}
                />
                {errors.name && (
                  <FormHelperText error>{errors.name.message}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Paper>
              <Stack p="24px" spacing="24px">
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="gsm"
                    defaultValue=""
                    rules={{
                      required: t("errors.required.field", {
                        field: "gsm",
                      }),
                    }}
                    render={({ field }) => {
                      return (
                        <InputMask
                          {...field}
                          mask="(999) 999 99 99"
                          disabled={formLoading}
                        >
                          {/* @ts-expect-error False alarm */}
                          {(props: TextFieldProps) => (
                            <TextField
                              {...props}
                              required
                              variant="outlined"
                              id="gsm"
                              label={t("couriers.fields.gsm.label")}
                              placeholder={t("couriers.fields.gsm.label")}
                            />
                          )}
                        </InputMask>
                      );
                    }}
                  />
                  {errors.gsm && (
                    <FormHelperText error>{errors.gsm.message}</FormHelperText>
                  )}
                </FormControl>{" "}
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="address"
                    defaultValue=""
                    rules={{
                      required: t("errors.required.field", {
                        field: "address",
                      }),
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          required
                          variant="outlined"
                          id="address"
                          label={t("couriers.fields.address.label")}
                          placeholder={t("couriers.fields.address.label")}
                        />
                      );
                    }}
                  />
                  {errors.address && (
                    <FormHelperText error>
                      {errors.address.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    rules={{
                      required: t("errors.required.field", {
                        field: "email",
                      }),
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          variant="outlined"
                          type="email"
                          id="email"
                          required
                          label={t("couriers.fields.email.label")}
                          placeholder={t("couriers.fields.email.label")}
                        />
                      );
                    }}
                  />
                  {errors.email && (
                    <FormHelperText error>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="accountNumber"
                    defaultValue=""
                    rules={{
                      minLength: {
                        value: 10,
                        message: t("errors.minLength", { min: 10 }),
                      },
                      maxLength: {
                        value: 10,
                        message: t("errors.maxLength", { max: 10 }),
                      },
                      required: t("errors.required.field", {
                        field: "accountNumber",
                      }),
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          required
                          variant="outlined"
                          name="accountNumber"
                          label={t("couriers.fields.accountNumber.label")}
                          placeholder={t("couriers.fields.accountNumber.label")}
                        />
                      );
                    }}
                  />
                  {errors.accountNumber && (
                    <FormHelperText error>
                      {errors.accountNumber.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="licensePlate"
                    defaultValue=""
                    rules={{
                      required: t("errors.required.field", {
                        field: "licensePlate",
                      }),
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          required
                          variant="outlined"
                          type="licensePlate"
                          id="licensePlate"
                          label={t("couriers.fields.licensePlate.label")}
                          placeholder={t("couriers.fields.licensePlate.label")}
                        />
                      );
                    }}
                  />
                  {errors.licensePlate && (
                    <FormHelperText error>
                      {errors.licensePlate.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="vehicle"
                    rules={{
                      required: "vehicle required",
                    }}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...vehiclesAutoCompleteProps}
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        getOptionLabel={(item) => {
                          return item.model ? item.model : "";
                        }}
                        isOptionEqualToValue={(option, value) =>
                          value === undefined ||
                          option?.id?.toString() ===
                            (value?.id ?? value)?.toString()
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("couriers.fields.vehicle.label")}
                            variant="outlined"
                            error={!!errors.vehicle}
                            required
                          />
                        )}
                      />
                    )}
                  />
                  {errors.vehicle && (
                    <FormHelperText error>
                      {errors.vehicle.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <Controller
                    control={control}
                    name="store"
                    rules={{
                      required: "Store required",
                    }}
                    defaultValue={null}
                    render={({ field }) => (
                      <Autocomplete
                        {...storesAutoCompleteProps}
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        getOptionLabel={(item) => {
                          return item.title ? item.title : "";
                        }}
                        isOptionEqualToValue={(option, value) =>
                          value === undefined ||
                          option?.id?.toString() ===
                            (value?.id ?? value)?.toString()
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("couriers.fields.store.label")}
                            variant="outlined"
                            error={!!errors.store}
                            required
                          />
                        )}
                      />
                    )}
                  />
                  {errors.store && (
                    <FormHelperText error>
                      {errors.store.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <DeleteButton
                    recordItemId={courier?.id}
                    variant="contained"
                    onSuccess={() => {
                      list("couriers");
                    }}
                  />
                  <Button {...saveButtonProps} variant="contained">
                    {t("buttons.save")}
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </form>
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 7 }} marginTop="96px">
          <CourierTableReviews courier={courier} />
        </Grid>
      </Grid>
    </>
  );
};
