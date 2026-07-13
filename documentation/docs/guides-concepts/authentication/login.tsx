import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Login() {
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
        "/login-page.tsx": {
          code: LoginPageTsxCode,
          hidden: false,
          active: true,
        },
        "/auth-provider.ts": {
          code: AuthProviderCode,
          hidden: false,
        },
        "/data-provider.ts": {
          code: DataProviderCode,
          hidden: true,
        },
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";

import { LoginPage } from "./login-page.tsx";
import { dataProvider } from "./data-provider.ts";
import { authProvider } from "./auth-provider.ts";

const API_URL = "https://api.fake-rest.refine.dev";


export default function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
        >
            <LoginPage />
        </Refine>
    );
}

`.trim();

const AuthProviderCode = `
import React from "react";
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    login: async ({ email }) => {
        // to keep the example short and simple, we didn't send a request, and we save the token in localStorage.
        // in real world, you should send a request and token should be saved in more secure place.
        localStorage.setItem("token", email);
        alert("You are logged in!");

        return {
            success: true,
        };
        throw new Error("Not implemented");
    },
    register: async () => {
        throw new Error("Not implemented");
    },
    logout: async () => {
        throw new Error("Not implemented");
    },
    check: async () => {
        throw new Error("Not implemented");
    },
    onError: async () => {
        throw new Error("Not implemented");
    },
};
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
    getList: async () => {
        throw new Error("Not implemented");
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

const LoginPageTsxCode = `
import React from "react";
import { useLogin } from "@refinedev/core";

export const LoginPage = () => {
    const { mutate: login } = useLogin();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // get form data
        const formData = Object.fromEntries(
            new FormData(e.currentTarget).entries(),
        );

        // call login mutation
        login(formData);

        // reset form data
        e.currentTarget.reset();
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input type="email" placeholder="email" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
`.trim();
