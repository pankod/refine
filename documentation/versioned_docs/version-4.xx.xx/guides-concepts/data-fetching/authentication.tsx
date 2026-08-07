import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Authentication() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        axios: "^1.6.2",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: false,
        },
        "/home-page.tsx": {
          code: HomePageTsxCode,
          hidden: false,
          active: true,
        },
        "/data-provider.ts": {
          code: DataProviderCode,
          hidden: false,
        },
        "/auth-provider.ts": {
          code: AuthProviderCode,
          hidden: false,
        },
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";

import { HomePage } from "./home-page.tsx";
import { dataProvider } from "./data-provider.ts";
import { authProvider } from "./auth-provider.ts";

const API_URL = "https://api.fake-rest.refine.dev";


export default function App() {
    return (
        <Refine
            dataProvider={dataProvider(API_URL)}
            authProvider={authProvider(API_URL)}
        >
            <HomePage />
        </Refine>
    );
}

`.trim();

const AuthProviderCode = `
import React from "react";
import { AuthProvider } from "@refinedev/core";

export const authProvider = (url: string): AuthProvider => ({
    login: async ({ email, password }) => {
        // To keep the example short and simple,
        // we didn't send a request, and we save the token in localStorage.
        localStorage.setItem("token", JSON.stringify({ email, password }));

        return {
            success: true,
        };
    },

    check: async () => {
        const token = localStorage.getItem("token");
        return {
            authenticated: !!token,
            error: new Error("Unauthorized"),
        };
    },

    logout: async () => {
        localStorage.removeItem("token");
        return {
            success: true,
        };
    },

    onError: async () => {
        throw new Error("Not implemented");
    },
});
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";
import axios from "axios";

const axiosInstance = axios.create();

// add token to every request
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token && config?.headers) {
            config.headers.Authorization = \`Bearer \${token}\`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const dataProvider = (url: string): DataProvider => ({
    getList: async ({ resource }) => {
        const response = await axiosInstance.get(\`\${url}/$\{resource}\`);
        const data = response.data;

        return {
            data,
            total: data.length,
        };
    },

    getOne: async () => {
        throw new Error("Not implemented");
    },

    create: async () => {
        throw new Error("Not implemented");
    },
    update: async () => {
        throw new Error("Not implemented");
    },
    deleteOne: async () => {
        throw new Error("Not implemented");
    },

    getApiUrl: () => url,
});

`.trim();

const HomePageTsxCode = `
import React from "react";
import {
    BaseKey,
    Authenticated,
    useList,
    useLogin,
    useLogout,
} from "@refinedev/core";

export const HomePage = () => {
    const { data: animalsData, isLoading: isLoadingAnimals } =
        useList<IAnimals>({
            resource: "animals",
        });
    const animals = animalsData?.data;

    const { mutate: login, isLoading: isLoadingLogin } = useLogin();
    const { mutate: logout } = useLogout();

    const loading = isLoadingAnimals || isLoadingLogin;

    return (
        <Authenticated
            loading={loading}
            fallback={
                <div>
                    <h4>You are not authenticated</h4>
                    <button
                        disabled={isLoadingLogin}
                        onClick={() =>
                            login({
                                email: "refine@demo.com",
                                password: "refine",
                            })
                        }
                    >
                        Login
                    </button>
                </div>
            }
        >
            <div>
                <button onClick={() => logout()}>Logout</button>
                <h4>Animals</h4>
                <ul>
                    {animals?.map((animal) => (
                        <li key={animal.id}>
                            <p>Name: {animal.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Authenticated>
    );
};

interface IAnimals {
    id: BaseKey;
    name: string;
    type: string;
}
`.trim();
