import type { AvailablePackageType } from "@refinedev/devtools-shared";
import dedent from "dedent";
import { getPackagesFromPackageJSON } from "./get-packages-from-package-json";

export const AVAILABLE_PACKAGES: AvailablePackageType[] = [
  {
    name: "@refinedev/ably",
    description: "Ably integration for Refine",
    install: "npm install @refinedev/ably",
    usage: dedent(
      `
            import { liveProvider, Ably } from "@refinedev/ably";

            export const ablyClient = new Ably.Realtime("YOUR_API_TOKEN");

            const App = () => {
                return (
                    <Refine
                        liveProvider={liveProvider(ablyClient)}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
        `.trim(),
    ),
  },
  {
    name: "@refinedev/airtable",
    description: "Airtable integration for Refine",
    install: "npm install @refinedev/airtable",
    usage: dedent(
      `
            import dataProvider from "@refinedev/airtable";

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider("API_KEY", "BASE_ID")}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/antd",
    description: "Ant Design integration for Refine",
    install: "npm install @refinedev/antd antd",
    usage: dedent(
      `
            import { ThemedLayout } from "@refinedev/antd";

            import "@refinedev/antd/dist/reset.css";

            const App = () => {
                return (
                    <Refine
                        /* ... */
                    >
                        <ThemedLayout>
                            {/* ... */}
                        </ThemedLayout>
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/appwrite",
    description: "Appwrite integration for Refine",
    install: "npm install @refinedev/appwrite",
    usage: dedent(
      `
            import { dataProvider, liveProvider, Account, Appwrite, Storage } from "@refinedev/appwrite";

            const appwriteClient = new Appwrite();
            appwriteClient.setEndpoint("API_URL").setProject("PROJECT_ID");

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider(appwriteClient, { databaseId: "default" })}
                        liveProvider={liveProvider(appwriteClient, { databaseId: "default" })}
                        /* ... */
                    >
                        <ThemedLayout>
                            {/* ... */}
                        </ThemedLayout>
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/chakra-ui",
    description: "Chakra UI integration for Refine",
    install:
      "npm install @refinedev/chakra-ui @chakra-ui/react @emotion/react @emotion/styled framer-motion @tabler/icons-react",
    usage: dedent(
      `
            import { ThemedLayout } from "@refinedev/chakra-ui";
            import { ChakraProvider } from "@chakra-ui/react";

            const App = () => {
                return (
                        <ChakraProvider>
                        <Refine
                            /* ... */
                        >
                            <ThemedLayout>
                                {/* ... */}
                            </ThemedLayout>
                        </Refine>
                    </ChakraProvider>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/graphql",
    description: "GraphQL integration for Refine",
    install: "npm install @refinedev/graphql",
    usage: dedent(
      `
            import dataProvider, { GraphQLClient } from "@refinedev/graphql";

            const client = new GraphQLClient("YOUR_API_URL");

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider(client)}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/hasura",
    description: "GraphQL integration for Refine",
    install: "npm install @refinedev/hasura",
    usage: dedent(
      `
            import dataProvider, { GraphQLClient } from "@refinedev/hasura";

            const client = new GraphQLClient("HASURA_API_URL", {
                headers: {
                    "x-hasura-role": "public",
                },
            });

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider(client)}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/inferencer",
    description: "Auto generate views based on your APIs with Refine",
    install: "npm install @refinedev/inferencer",
    usage: dedent(
      `
        import { AntdInferencer } from "@refinedev/inferencer/antd";

        const App = () => {
            return (
                <Refine
                    /* ... */
                >
                    <AntdInferencer action="list" resource="posts" />
                </Refine>
            );
        };
        `.trim(),
    ),
  },
  {
    name: "@refinedev/kbar",
    description: "Command palette integration with kbar for Refine",
    install: "npm install @refinedev/kbar",
    usage: dedent(
      `
            import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

            const App = () => {
                return (
                    <RefineKbarProvider>
                        <Refine
                            /* ... */
                        >
                            <RefineKbar />
                        </Refine>
                    </RefineKbarProvider>
                );
            };
        `.trim(),
    ),
  },
  {
    name: "@refinedev/mantine",
    description: "Mantine UI integration for Refine",
    install:
      "npm install @refinedev/mantine @refinedev/react-table @mantine/core @mantine/hooks @mantine/form @mantine/notifications @emotion/react @tabler/icons-react",
    usage: dedent(
      `
            import { ThemedLayout } from "@refinedev/mantine";
            import { MantineProvider } from "@mantine/core";

            const App = () => {
                return (
                    <MantineProvider>
                        <Refine
                            /* ... */
                        >
                            <ThemedLayout>
                                {/* ... */}
                            </ThemedLayout>
                        </Refine>
                    </MantineProvider>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/medusa",
    description: "Medusa store integration for Refine",
    install: "npm install @refinedev/medusa",
    usage: dedent(
      `
            import dataProvider, { authProvider } from "@refinedev/medusa";

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider("API_URL")}
                        authProvider={authProvider("API_URL")}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/mui",
    description: "Material UI integration for Refine",
    install:
      "npm install @refinedev/mui @refinedev/react-hook-form @mui/material @mui/lab @mui/x-data-grid @emotion/react @emotion/styled react-hook-form",
    usage: dedent(
      `
            import { ThemedLayout } from "@refinedev/mui";

            import CssBaseline from "@mui/material/CssBaseline";
            import GlobalStyles from "@mui/material/GlobalStyles";
            import { ThemeProvider } from "@mui/material/styles";

            const App = () => {
                return (
                    <ThemeProvider>
                        <CssBaseline />
                        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
                        <Refine
                            /* ... */
                        >
                            <ThemedLayout>
                                {/* ... */}
                            </ThemedLayout>
                        </Refine>
                    </ThemeProvider>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/nestjs-query",
    description: "NestJS Query data provider integration for Refine",
    install: "npm install @refinedev/nestjs-query graphql-ws",
    usage: dedent(
      `
            import dataProvider, {
                GraphQLClient,
                liveProvider,
            } from "@refinedev/nestjs-query";

            import { createClient } from "graphql-ws";

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider(new GraphQLClient( "API_URL" ))}
                        liveProvider={liveProvider(createClient({ url: "WS_URL" }))}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/nestjsx-crud",
    description: "NestJSX CRUD data provider integration for Refine",
    install: "npm install @refinedev/nestjsx-crud",
    usage: dedent(
      `
            import dataProvider from "@refinedev/nestjsx-crud";

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider("API_URL")}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/react-hook-form",
    description: "React Hook Form integration for Refine",
    install: "npm install @refinedev/react-hook-form react-hook-form",
    usage: dedent(
      `
            import { useForm } from "@refinedev/react-hook-form";

            const EditPost = () => {
                const {
                    register,
                    handleSubmit,
                    formState,
                    refineCore,
                } = useForm({
                    refineCoreProps: {
                        resource: "posts",
                        id: "1",
                    },
                });

                return /* ... */
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/react-table",
    description: "Tanstack React Table integration for Refine",
    install: "npm install @refinedev/react-table @tanstack/react-table",
    usage: dedent(
      `
            import { useTable } from "@refinedev/react-table";

            import { ColumnDef, flexRender } from "@tanstack/react-table";

            const EditPost = () => {
                const columns = React.useMemo<ColumnDef<IPost>[]>(
                    () => [
                        {
                            id: "id",
                            header: "ID",
                            accessorKey: "id",
                        },
                        {
                            id: "title",
                            header: "Title",
                            accessorKey: "title",
                            meta: {
                                filterOperator: "contains",
                            },
                        },
                ], []);

                const tableInstance = useTable({
                    columns,
                    refineCoreProps: {
                        resource: "posts",
                    }
                });

                return /* ... */
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/simple-rest",
    description: "Data provider integration for REST APIs with Refine",
    install: "npm install @refinedev/simple-rest",
    usage: dedent(
      `
            import dataProvider from "@refinedev/simple-rest";

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider("API_URL")}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/supabase",
    description:
      "Data provider and live provider integrations for Supabase with Refine",
    install: "npm install @refinedev/supabase",
    usage: dedent(
      `
            import { dataProvider, liveProvider, createClient } from "@refinedev/supabase";

            const supabaseClient = createClient("SUPABASE_URL", "SUPABASE_KEY");

            const App = () => {
                return (
                    <Refine
                        dataProvider={dataProvider(supabaseClient)}
                        liveProvider={liveProvider(supabaseClient)}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/strapi",
    description: "Strapi integration of Refine",
    install: "npm install @refinedev/strapi axios",
    usage: dedent(
      `
            import { DataProvider, AuthHelper } from "@refinedev/strapi";

            const axiosInstance = axios.create();
            const strapiAuthHelper = AuthHelper("API_URL");

            const App = () => {
                return (
                    <Refine
                        dataProvider={DataProvider("API_URL", axiosInstance)}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
  {
    name: "@refinedev/strapi-v4",
    description: "StrapiV4 integration of Refine",
    install: "npm install @refinedev/strapi-v4 axios",
    usage: dedent(
      `
            import { DataProvider, AuthHelper } from "@refinedev/strapi-v4";

            const axiosInstance = axios.create();
            const strapiAuthHelper = AuthHelper("API_URL");

            const App = () => {
                return (
                    <Refine
                        dataProvider={DataProvider("API_URL", axiosInstance)}
                        /* ... */
                    >
                        {/* ... */}
                    </Refine>
                );
            };
            `.trim(),
    ),
  },
];

export const getAvailablePackages = async (projectPath?: string) => {
  const installedRefinePackages = await getPackagesFromPackageJSON(projectPath);

  return AVAILABLE_PACKAGES.filter(
    (p) => !installedRefinePackages.includes(p.name),
  );
};
