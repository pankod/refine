import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseSelectMaterialUI() {
  return (
    <Sandpack
      // showNavigator
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-hook-form": "latest",
        "@refinedev/mui": "latest",
        "@mui/material": "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/edit-page.tsx": {
          code: EditPageTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import {
    RefineThemes,
    useNotificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import { EditPage } from "./edit-page";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={RefineThemes.Blue}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={useNotificationProvider}
                    resources={[
                        {
                            name: "posts",
                        },
                    ]}
                >
                    <EditPage />
                </Refine>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
`.trim();

const EditPageTsxCode = `
import React from "react";
import { useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";

export const EditPage: React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { query: productQuery },
        register,
        control,
    } = useForm<IProduct>({
        refineCoreProps: {
            resource: "products",
            id: 1,
            action: "edit",
        },
    });
    const product = productQuery?.data?.data;

    const { autocompleteProps, queryResult: categoriesQueryResult } =
        useAutocomplete<ICategory>({
            resource: "categories",
            defaultValue: product?.category.id,
        });
    const categories = categoriesQueryResult?.data?.data;

    // find category of product by id from categories
    const categoryOfProduct = categories?.find(
        (category) => Number(category.id) === Number(product?.category.id),
    );

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    py: 2,
                }}
            >
                <Typography variant="h5">
                    {\`Edit "\${product?.name}" Product\`}
                </Typography>
                <Typography variant="h5">
                    Category: {categoryOfProduct?.title}
                </Typography>
            </Box>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", width: 400 }}
                autoComplete="off"
            >
                <TextField
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    autoFocus
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
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
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
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
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Button variant="contained" type="submit" {...saveButtonProps}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

interface ICategory {
    id: number;
    title: string;
}

interface IProduct {
    id: number;
    name: string;
    category: { id: number };
}


`.trim();
