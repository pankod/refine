import React from "react";

import { Sandpack } from "@site/src/components/sandpack";

export function MUISandpack() {
  return (
    <Sandpack
      hidePreview
      showFiles
      files={{
        "/App.tsx": { code: AppTsxCode.trim() },
        "/authProvider.ts": {
          code: AuthProviderCode.trim(),
        },
        "/i18n.ts": {
          code: I18nCode.trim(),
        },
        "/context/color-mode.tsx": {
          code: ColorModeCode.trim(),
        },
        "/components/header.tsx": {
          code: HeaderCode.trim(),
        },
        "/pages/categories/create.tsx": {
          code: CategoryCreateCode.trim(),
        },
        "/pages/categories/edit.tsx": {
          code: CategoryEditCode.trim(),
        },
        "/pages/categories/list.tsx": {
          code: CategoryListCode.trim(),
        },
        "/pages/categories/show.tsx": {
          code: CategoryShowCode.trim(),
        },
        "/pages/categories/types.ts": {
          code: CategoryTypesCode.trim(),
        },
        "/pages/products/create.tsx": {
          code: ProductCreateCode.trim(),
        },
        "/pages/products/edit.tsx": {
          code: ProductEditCode.trim(),
        },
        "/pages/products/list.tsx": {
          code: ProductListCode.trim(),
        },
        "/pages/products/show.tsx": {
          code: ProductShowCode.trim(),
        },
        "/pages/products/types.ts": {
          code: ProductTypesCode.trim(),
        },
      }}
    />
  );
}

const AppTsxCode = `
import { Authenticated, type I18nProvider, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  AuthPage,
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";

import { useTranslation } from "react-i18next";

import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "@/pages/categories";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "@/pages/products";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    translate: (key, params) => t(key, params).toString(),
    changeLocale: (lang: string | undefined) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            resources={[
              {
                name: "products",
                list: "/products",
                create: "/products/new",
                edit: "/products/:id/edit",
                show: "/products/:id",
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/new",
                edit: "/categories/:id/edit",
                show: "/categories/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2 Header={() => <Header sticky />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="products" />}
                />
                <Route path="/products">
                  <Route index element={<ProductList />} />
                  <Route path="new" element={<ProductCreate />} />
                  <Route path=":id" element={<ProductShow />} />
                  <Route path=":id/edit" element={<ProductEdit />} />
                </Route>
                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="new" element={<CategoryCreate />} />
                  <Route path=":id" element={<CategoryShow />} />
                  <Route path=":id/edit" element={<CategoryEdit />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated
                    key="authenticated-outer"
                    fallback={<Outlet />}
                  >
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        defaultValues: {
                          email: "demo@refine.dev",
                          password: "demodemo",
                        },
                      }}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" />}
                />
              </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
`;

const AuthProviderCode = `
import type { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      localStorage.setItem(TOKEN_KEY, username);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  forgotPassword: async (params) => {
    return {
      success: true,
      redirectTo: "/update-password",
      successNotification: {
        message: "Email has been sent.",
      },
    };
  },
  updatePassword: async (params) => {
    return {
      success: true,
      redirectTo: "/login",
      successNotification: {
        message: "Successfully updated password.",
      },
    };
  },
};
`;

const I18nCode = `
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "de"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: ["en", "de"],
  });

export default i18n;
`;

const ColorModeCode = `
import { ThemeProvider } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";
import type React from "react";
import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference,
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider
        // you can change the theme colors here. example: mode === "light" ? RefineThemes.Magenta : RefineThemes.MagentaDark
        theme={mode === "light" ? RefineThemes.Blue : RefineThemes.BlueDark}
      >
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
`.trim();

const HeaderCode = `
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { FormControl, MenuItem, Select } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import {
  HamburgerMenu,
  type RefineThemedLayoutV2HeaderProps,
} from "@refinedev/mui";
import i18n from "i18next";
import type React from "react";
import { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity<IUser>();

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <FormControl sx={{ minWidth: 64 }}>
              <Select
                disableUnderline
                defaultValue={currentLocale}
                slotProps={{
                  input: {
                    "aria-label": "Without label",
                  },
                }}
                variant="standard"
                sx={{
                  color: "inherit",
                  "& .MuiSvgIcon-root": {
                    color: "inherit",
                  },
                  "& .MuiStack-root > .MuiTypography-root": {
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  },
                }}
              >
                {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                  <MenuItem
                    selected={currentLocale === lang}
                    key={lang}
                    defaultValue={lang}
                    onClick={() => {
                      changeLanguage(lang);
                    }}
                    value={lang}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        sx={{
                          width: "24px",
                          height: "24px",
                          marginRight: "5px",
                        }}
                        src={\`/images/flags/\${lang}.svg\`}
                      />
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {(user?.avatar || user?.name) && (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                {user?.name && (
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline-block",
                      },
                    }}
                    variant="subtitle2"
                  >
                    {user?.name}
                  </Typography>
                )}
                <Avatar src={user?.avatar} alt={user?.name} />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
`;

const ProductCreateCode = `
import { type HttpError, useTranslate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { Autocomplete, Box, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import type { Product } from "./types";

export const ProductCreate: React.FC = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm<Product, HttpError, Product>();

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: translate("form.required"),
          })}
          error={!!errors?.name}
          helperText={<>{errors?.name?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label={translate("products.fields.name")}
          name="name"
        />
        <TextField
          {...register("description", {
            required: translate("form.required"),
          })}
          error={!!errors?.description}
          helperText={<>{errors?.description?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          multiline
          label={translate("products.fields.description")}
          name="description"
        />
        <TextField
          {...register("price", {
            required: translate("form.required"),
            min: 0.1,
            valueAsNumber: true,
          })}
          error={!!errors?.price}
          helperText={<>{errors?.price?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label={translate("products.fields.price")}
          name="price"
        />
        <TextField
          {...register("material", {
            required: translate("form.required"),
          })}
          error={!!errors?.material}
          helperText={<>{errors?.material?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label={translate("products.fields.material")}
          name="material"
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: translate("form.required") }}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString(),
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("products.fields.category")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors?.category}
                  helperText={<>{errors?.category?.message}</>}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
};
`;

const ProductEditCode = `
import {
  type HttpError,
  useTranslate,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { Autocomplete, Box, TextField } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import type { Product } from "./types";

export const ProductEdit = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { query, formLoading },
    register,
    control,
    formState: { errors },
  } = useForm<Product, HttpError, Product>();

  const productsData = query?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: productsData?.category?.id,
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", { valueAsNumber: true })}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label={translate("products.fields.id")}
          name="id"
          disabled
        />
        <TextField
          {...register("name", {
            required: translate("form.required"),
          })}
          error={!!errors?.name}
          helperText={<>{errors?.name?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label={translate("products.fields.name")}
          name="name"
        />
        <TextField
          {...register("description", {
            required: translate("form.required"),
          })}
          error={!!errors?.description}
          helperText={<>{errors?.description?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          multiline
          label={translate("products.fields.description")}
          name="description"
        />
        <TextField
          {...register("price", {
            required: translate("form.required"),
            valueAsNumber: true,
          })}
          error={!!errors?.price}
          helperText={<>{errors?.price?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label={translate("products.fields.price")}
          name="price"
        />
        <TextField
          {...register("material", {
            required: translate("form.required"),
          })}
          error={!!errors?.material}
          helperText={<>{errors?.material?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label={translate("products.fields.material")}
          name="material"
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: translate("form.required") }}
          defaultValue={productsData?.category ?? null}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString(),
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("products.fields.category")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors?.category?.id}
                  helperText={errors?.category?.id?.message}
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
`;

const ProductListCode = `
import { useMemo } from "react";

import {
  useGetLocale,
  useList,
  useTranslate,
} from "@refinedev/core";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";

export const ProductList = () => {
  const { dataGridProps } = useDataGrid();

  const locale = useGetLocale()();

  const translate = useTranslate();

  const { data: categoryData, isLoading: categoryLoading } = useList({
    resource: "categories",
    pagination: {
      mode: "off",
    },
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        flex: 1,
        headerName: translate("products.fields.name"),
        minWidth: 300,
      },
      {
        field: "category",
        flex: 1,
        headerName: translate("products.fields.category"),
        minWidth: 200,
        valueGetter: ({ row }) => {
          const value = row?.category;
          return value;
        },
        display: "flex",
        renderCell: function render({ value }) {
          return categoryLoading ? (
            <>{translate("loading")}</>
          ) : (
            categoryData?.data?.find((item) => item.id === value?.id)?.title ??
              null
          );
        },
      },
      {
        field: "price",
        flex: 1,
        headerName: translate("products.fields.price"),
        minWidth: 100,
        maxWidth: 150,
        display: "flex",
        renderCell: ({ value }) => {
          return (
            <NumberField
              value={value}
              locale={locale}
              options={{ style: "currency", currency: "USD" }}
            />
          );
        },
      },
      {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
              <EditButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryLoading, categoryData, locale, translate],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
`;

const ProductShowCode = `
import { useOne, useShow, useTranslate } from "@refinedev/core";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import type { Product } from "./types";

export const ProductShow: React.FC = () => {
  const translate = useTranslate();
  const {
    query: { data: productResult, isLoading },
  } = useShow<Product>();

  const product = productResult?.data;

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useOne({
    resource: "categories",
    id: product?.category?.id,
    queryOptions: {
      enabled: !!product?.category?.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.id")}
        </Typography>
        {product ? (
          <NumberField value={product.id} />
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.name")}
        </Typography>
        {product ? (
          <TextField value={product.name} />
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.description")}
        </Typography>
        {product ? (
          <TextField value={product.description} />
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.price")}
        </Typography>
        {product ? (
          <NumberField value={product.price} />
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.material")}
        </Typography>
        {product ? (
          <TextField value={product.material} />
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
        <Typography variant="body1" fontWeight="bold">
          {translate("products.fields.category")}
        </Typography>
        {categoryError ? null : categoryLoading ? (
          <Skeleton height="20px" width="200px" />
        ) : (
          <TextField value={categoryData?.data?.title} />
        )}
      </Stack>
    </Show>
  );
};
`;

const ProductTypesCode = `
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  material: string;
  category?: {
    id: string;
  } | null;
}
`;

const CategoryCreateCode = `
import { type HttpError, useTranslate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";

import type { Category } from "./types";

export const CategoryCreate: React.FC = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm<Category, HttpError, Category>();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: translate("form.required"),
          })}
          error={!!errors?.title}
          helperText={<>{errors?.title?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label={translate("categories.fields.title")}
          name="title"
        />
      </Box>
    </Create>
  );
};
`;

const CategoryEditCode = `
import { type HttpError, useTranslate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";

import type { Category } from "./types";

export const CategoryEdit: React.FC = () => {
  const translate = useTranslate();

  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<Category, HttpError, Category>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", { valueAsNumber: true })}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="number"
          label={translate("categories.fields.id")}
          name="id"
          disabled
        />
        <TextField
          {...register("title", {
            required: translate("form.required"),
          })}
          error={!!errors?.title}
          helperText={<>{errors?.title?.message}</>}
          margin="normal"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="text"
          label={translate("categories.fields.title")}
          name="title"
        />
      </Box>
    </Edit>
  );
};
`;

const CategoryListCode = `
import { useMemo } from "react";

import { useTranslate } from "@refinedev/core";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";

export const CategoryList: React.FC = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "title",
        flex: 1,
        headerName: translate("categories.fields.title"),
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
              <EditButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [translate],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
`;

const CategoryShowCode = `
import {
  useShow,
  useTranslate,
} from "@refinedev/core";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import type { Category } from "./types";

export const CategoryShow = () => {
  const translate = useTranslate();
  const {
    query: { data: categoryResult, isLoading },
  } = useShow<Category>();

  const category = categoryResult?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {translate("categories.fields.id")}
        </Typography>
        {category ? (
          <NumberField value={category?.id ?? ""} />
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
        <Typography variant="body1" fontWeight="bold">
          {translate("categories.fields.title")}
        </Typography>
        {category ? (
          <TextField value={category?.title} />
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
      </Stack>
    </Show>
  );
};
`;

const CategoryTypesCode = `
export interface Category {
  id: string;
  title: string;
}
`;
