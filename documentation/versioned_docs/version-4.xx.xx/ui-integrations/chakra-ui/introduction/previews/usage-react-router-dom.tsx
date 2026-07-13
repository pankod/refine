import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageReactRouterDom() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/chakra-ui": "^2.26.17",
        "@tabler/icons-react": "^3.1.0",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router": "latest",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@refinedev/react-hook-form": "^4.8.12",
        "@chakra-ui/react": "^2.5.1",
        "react-dom": "^18.0.0",
        "react-router": "^7.0.2",
      }}
      startRoute="/products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/index.tsx": {
          code: ProductsTsxCode,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
        },
        "/pages/products/show.tsx": {
          code: ShowTsxCode,
        },
        "/pages/products/edit.tsx": {
          code: EditTsxCode,
        },
        "/pages/products/create.tsx": {
          code: CreateTsxCode,
        },
        "/components/pagination/index.tsx": {
          code: PaginationTsxCode,
        },
        "/auth-provider.tsx": {
          code: AuthProviderTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AuthProviderTsxCode = /* jsx */ `
const authProvider = {
    login: async ({ username, password }) => {
      (window as any).authenticated = true;
      return { success: true };
    },
    check: async () => {
      // auto login at first time
      if (typeof (window as any).authenticated === "undefined") {
        (window as any).authenticated = true;
      }
      return { authenticated: Boolean((window as any).authenticated) };
    },
    logout: async () => {
      (window as any).authenticated = false;
      return { success: true };
    },
    register: async () => {
      return { success: true };
    },
    forgotPassword: async () => {
      return { success: true };
    },
    resetPassword: async () => {
      return { success: true };
    },
    getIdentity: async () => ({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/300"})
};

export default authProvider;
`.trim();

const ProductsTsxCode = /* jsx */ `
export * from "./list";
export * from "./show";
export * from "./edit";
export * from "./create";
`.trim();

const AppTsxCode = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    notificationProvider,
    AuthPage
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import authProvider from "./auth-provider";

import { ProductList, ProductCreate, ProductEdit, ProductShow } from "./pages/products";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ChakraProvider theme={RefineThemes.Blue}>
                <Refine
                    notificationProvider={notificationProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "products",
                            list: "/products",
                            show: "/products/:id",
                            edit: "/products/:id/edit",
                            create: "/products/create",
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                >
                    <Routes>
                        <Route element={<Authenticated fallback={<Navigate to="/login" />}><Outlet /></Authenticated>}>
                            <Route
                                element={
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                }
                            >
                                <Route index element={<NavigateToResource resource="products" />} />
                                <Route path="/products" element={<Outlet />}>
                                    <Route index element={<ProductList />} />
                                    <Route path="create" element={<ProductCreate />} />
                                    <Route path=":id" element={<ProductShow />} />
                                    <Route path=":id/edit" element={<ProductEdit />} />
                                </Route>
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Route>
                        <Route element={<Authenticated fallback={<Outlet />}><NavigateToResource resource="products" /></Authenticated>}>
                            <Route
                                path="/login"
                                element={(
                                <AuthPage
                                    type="login"
                                    formProps={{
                                    defaultValues: {
                                        email: "demo@refine.dev",
                                        password: "demodemo",
                                    },
                                    }}
                                />
                                )}
                            />
                            <Route path="/register" element={<AuthPage type="register" />} />
                            <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                            <Route path="/reset-password" element={<AuthPage type="resetPassword" />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
`.trim();

const PaginationTsxCode = /* jsx */ `
import React from "react";
import { HStack, Button, Box } from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { usePagination } from "@refinedev/chakra-ui";

import { IconButton } from "@chakra-ui/react";

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
`;

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import {
    List,
    ShowButton,
    EditButton,
    DeleteButton,
    DateField,
} from "@refinedev/chakra-ui";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
} from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";

export const ProductList = () => {
    const columns = React.useMemo(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "name",
                header: "Name",
                accessorKey: "name",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "price",
                header: "Price",
                accessorKey: "price",
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <DeleteButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQuery: { data: tableData },
        },
    } = useTable({
        columns,
        refineCoreProps: {
            initialSorter: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
    });

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        <Text>
                                            {flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext(),
                                            )}
                                        </Text>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};
`.trim();

const ShowTsxCode = /* jsx */ `
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField, MarkdownField } from "@refinedev/chakra-ui";

import { Heading } from "@chakra-ui/react";

export const ProductShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm">
                Id
            </Heading>
            <TextField value={record?.id} />

            <Heading as="h5" size="sm" mt={4}>
                Name
            </Heading>
            <TextField value={record?.name} />

            <Heading as="h5" size="sm" mt={4}>
                Material
            </Heading>
            <TextField value={record?.material} />

            <Heading as="h5" size="sm" mt={4}>
                Description
            </Heading>
            <MarkdownField value={record?.description} />

            <Heading as="h5" size="sm" mt={4}>
                Price
            </Heading>
            <NumberField value={record?.price}  options={{ style: "currency", currency: "USD" }} />
        </Show>
    );
};
`.trim();

const EditTsxCode = /* jsx */ `
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const ProductEdit = () => {
    const {
        refineCore: { formLoading, queryResult, autoSaveProps },
        saveButtonProps,
        register,
        formState: { errors },
        setValue,
    } = useForm({
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
        },
    });

    return (
        <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            autoSaveProps={autoSaveProps}
        >
            <FormControl mb="3" isInvalid={!!errors?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.name?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.material}>
                <FormLabel>Material</FormLabel>
                <Input
                    id="material"
                    type="text"
                    {...register("material", { required: "Material is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.material?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    id="description"
                    {...register("description", {
                        required: "Description is required",
                    })}
                />
                <FormErrorMessage>
                    {\`$\{errors.description?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.price}>
                <FormLabel>Price</FormLabel>
                <Input
                    id="price"
                    type="number"
                    {...register("price", { required: "Price is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.price?.message}\`}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};
`.trim();

const CreateTsxCode = /* jsx */ `
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const ProductCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm<IPost>();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.name?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.material}>
                <FormLabel>Material</FormLabel>
                <Input
                    id="material"
                    type="text"
                    {...register("material", { required: "Material is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.material?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    id="description"
                    {...register("description", {
                        required: "Description is required",
                    })}
                />
                <FormErrorMessage>
                    {\`$\{errors.description?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.price}>
                <FormLabel>Price</FormLabel>
                <Input
                    id="price"
                    type="number"
                    {...register("price", { required: "Price is required" })}
                />
                <FormErrorMessage>
                    {\`$\{errors.price?.message}\`}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};
`.trim();
