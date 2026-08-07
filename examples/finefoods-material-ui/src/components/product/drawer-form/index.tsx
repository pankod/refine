import {
  type HttpError,
  useApiUrl,
  useGetToPath,
  useGo,
  useTranslate,
} from "@refinedev/core";
import { DeleteButton, useAutocomplete } from "@refinedev/mui";
import { useSearchParams } from "react-router";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormLabel from "@mui/material/FormLabel";
import { Drawer, DrawerHeader, ProductImageUpload } from "../../../components";
import { useImageUpload } from "../../../utils";
import type { ICategory, IFile, IProduct, Nullable } from "../../../interfaces";

type Props = {
  action: "create" | "edit";
};

export const ProductDrawerForm = (props: Props) => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();
  const t = useTranslate();
  const apiUrl = useApiUrl();

  const onDrawerCLose = () => {
    go({
      to:
        searchParams.get("to") ??
        getToPath({
          action: "list",
        }) ??
        "",
      query: {
        to: undefined,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish, id, formLoading },
    saveButtonProps,
  } = useForm<IProduct, HttpError, Nullable<IProduct>>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: null,
      isActive: true,
      images: [],
    },
    refineCoreProps: {
      redirect: false,
      onMutationSuccess: () => {
        if (props.action === "create") {
          onDrawerCLose();
        }
      },
    },
  });
  const imageInput: IFile[] | null = watch("images");

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
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

    setValue("images", image, { shouldValidate: true });
  };

  return (
    <Drawer
      PaperProps={{ sx: { width: { sm: "100%", md: "416px" } } }}
      open
      anchor="right"
      onClose={onDrawerCLose}
    >
      <DrawerHeader
        title={t("products.actions.edit")}
        onCloseClick={onDrawerCLose}
      />
      <form
        onSubmit={handleSubmit((data) => {
          onFinish(data);
        })}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Controller
            control={control}
            name="images"
            defaultValue={[]}
            rules={{
              required: t("errors.required.field", {
                field: "images",
              }),
            }}
            render={({ field }) => {
              return (
                <ProductImageUpload
                  {...field}
                  sx={{
                    marginTop: "32px",
                  }}
                  previewURL={imageInput?.[0]?.url}
                  inputProps={{
                    id: "images",
                    onChange: imageUploadOnChangeHandler,
                  }}
                />
              );
            }}
          />

          {errors.images && (
            <FormHelperText error>{errors.images.message}</FormHelperText>
          )}
        </Box>

        <Paper
          sx={{
            marginTop: "32px",
          }}
        >
          <Stack padding="24px" spacing="24px">
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
                      id="name"
                      label={t("products.fields.name")}
                      placeholder={t("products.fields.name")}
                    />
                  );
                }}
              />
              {errors.name && (
                <FormHelperText error>{errors.name.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="description"
                defaultValue=""
                rules={{
                  required: t("errors.required.field", {
                    field: "category",
                  }),
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      id="description"
                      label={t("products.fields.description")}
                      placeholder={t("products.fields.description")}
                    />
                  );
                }}
              />
              {errors.description && (
                <FormHelperText error>
                  {errors.description.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="price"
                defaultValue={0}
                rules={{
                  required: t("errors.required.field", {
                    field: "price",
                  }),
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      id="price"
                      label={t("products.fields.price")}
                      placeholder={t("products.fields.price")}
                      type="number"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        },
                      }}
                    />
                  );
                }}
              />
              {errors.price && (
                <FormHelperText error>{errors.price.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <Controller
                disabled={formLoading}
                control={control}
                name="category"
                defaultValue={null}
                rules={{
                  required: t("errors.required.field", {
                    field: "category",
                  }),
                }}
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
                      option?.id?.toString() ===
                        (value?.id ?? value)?.toString()
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
              {errors.category && (
                <FormHelperText error>{errors.category.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>{t("products.fields.isActive.label")}</FormLabel>
              <Controller
                control={control}
                name="isActive"
                rules={{
                  validate: (value) => {
                    if (value === undefined) {
                      return t("errors.required.field", {
                        field: "isActive",
                      });
                    }
                    return true;
                  },
                }}
                defaultValue={false}
                render={({ field }) => (
                  <ToggleButtonGroup
                    id="isActive"
                    {...field}
                    exclusive
                    color="primary"
                    onChange={(_, newValue) => {
                      setValue("isActive", newValue, {
                        shouldValidate: true,
                      });

                      return newValue;
                    }}
                  >
                    <ToggleButton value={true}>
                      {t("products.fields.isActive.true")}
                    </ToggleButton>
                    <ToggleButton value={false}>
                      {t("products.fields.isActive.false")}
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
              {errors.isActive && (
                <FormHelperText error>{errors.isActive.message}</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Paper>
        <Stack
          direction="row"
          justifyContent="space-between"
          padding="16px 24px"
        >
          <Button variant="text" color="inherit" onClick={onDrawerCLose}>
            {t("buttons.cancel")}
          </Button>
          {props.action === "edit" && (
            <DeleteButton
              recordItemId={id}
              variant="contained"
              onSuccess={() => {
                onDrawerCLose();
              }}
            />
          )}
          <Button {...saveButtonProps} variant="contained">
            {t("buttons.save")}
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};
