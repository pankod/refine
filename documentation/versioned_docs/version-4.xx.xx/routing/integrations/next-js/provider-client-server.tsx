import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function NextJSAppProviderServerClient() {
  return (
    <Sandpack
      template="nextjs"
      showFiles
      showConsole={false}
      showNavigator
      hidePreview
      startRoute="/"
      files={{
        "/pages/index.js": {
          code: "// See /src/app/page.tsx",
          hidden: true,
        },
        "/src/app/layout.tsx": {
          code: LayoutTsxCode.trim(),
          active: true,
        },
        "/src/app/page.tsx": {
          code: IndexPageTsxCode.trim(),
        },
        "/src/constants.tsx": {
          code: ConstantsTsxCode.trim(),
        },
        "/src/providers/access-control/access-control.tsx": {
          code: AccessControlTsxCode.trim(),
        },
        "/src/providers/access-control/access-control.server.tsx": {
          code: AccessControlServerTsxCode.trim(),
        },
        "/src/providers/access-control/access-control.client.tsx": {
          code: AccessControlClientTsxCode.trim(),
        },
        "/src/providers/data-provider/data-provider.server.tsx": {
          code: DataProviderServerTsxCode.trim(),
        },
        "/src/providers/data-provider/data-provider.client.tsx": {
          code: DataProviderClientTsxCode.trim(),
        },
        "/src/providers/auth-provider/auth-provider.server.tsx": {
          code: AuthProviderServerTsxCode.trim(),
        },
        "/src/providers/auth-provider/auth-provider.client.tsx": {
          code: AuthProviderClientTsxCode.trim(),
        },
      }}
    />
  );
}

const IndexPageTsxCode = /* tsx */ `
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { accessControlProviderServer } from "@providers/access-control/access-control.server";
import { dataProviderServer } from "@providers/data-provider/data-provider.server";
import { redirect } from "next/navigation";

export default async function IndexPage() {
    const { hasAuth, hasPermission, data } = await getData();

    if (!hasAuth) {
        return redirect("/login");
    }

    if (!hasPermission) {
        return <h1>Unauthorized</h1>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data?.map((post: any) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

async function getData() {
    const hasAuth = await authProviderServer.check();
    const hasPermission = await accessControlProviderServer.can({
        action: "list",
        resource: "posts",
    });

    let data = null;
    if (hasAuth && hasPermission) {
        data = await dataProviderServer.getList({
            resource: "posts",
        });
    }

    return {
        hasAuth,
        hasPermission,
        data,
    };
}
`;

const LayoutTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import React, { Suspense } from "react";

import { authProviderClient } from "@providers/auth-provider/auth-provider";
import { dataProviderClient } from "@providers/data-provider/data-provider.client";
import { accessControlProviderClient } from "@providers/access-control/access-control.client";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Suspense>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProviderClient}
                        authProvider={authProviderClient}
                        accessControlProvider={accessControlProviderClient}
                        resources={[
                            {
                                name: "blog_posts",
                                list: "/blog-posts",
                                create: "/blog-posts/create",
                                edit: "/blog-posts/edit/:id",
                                show: "/blog-posts/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                        ]}
                    >
                        {children}
                    </Refine>
                </Suspense>
            </body>
        </html>
    );
}
`;

const ConstantsTsxCode = /* tsx */ `
export const API_URL = "https://api.fake-rest.refine.dev";

`;

const AccessControlTsxCode = /* tsx */ `
import { AccessControlProvider } from "@refinedev/core";

export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action }) => {
        if (resource === "posts" && action === "edit") {
            return {
                can: false,
                reason: "Unauthorized",
            };
        }

        return { can: true };
    },
};

`;

const AccessControlServerTsxCode = /* tsx */ `
import { accessControlProvider } from "./access-control";

export const accessControlProviderServer = accessControlProvider;

`;

const AccessControlClientTsxCode = /* tsx */ `
"use client";

import { accessControlProvider } from "./access-control";

export const accessControlProviderClient = accessControlProvider;

`;

const DataProviderServerTsxCode = /* tsx */ `
import { API_URL } from "@constants";
import dataProviderSimpleRest from "@refinedev/simple-rest";

export const dataProviderServer = dataProviderSimpleRest(API_URL);

`;

const DataProviderClientTsxCode = /* tsx */ `
"use client";

import { API_URL } from "@constants";
import dataProviderSimpleRest from "@refinedev/simple-rest";

export const dataProviderClient = dataProviderSimpleRest(API_URL);

`;

const AuthProviderServerTsxCode = /* tsx */ `
import { AuthBindings } from "@refinedev/core";
import { cookies } from "next/headers";

export const authProviderServer: Pick<AuthBindings, "check"> = {
    check: async () => {
        const cookieStore = cookies();
        const auth = cookieStore.get("auth");

        if (auth) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
        };
    },
};

`;

const AuthProviderClientTsxCode = /* tsx */ `
"use client";

import { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";

const mockUsers = [
    {
        email: "admin@refine.dev",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
        roles: ["admin"],
    },
    {
        email: "editor@refine.dev",
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
        roles: ["editor"],
    },
    {
        email: "demo@refine.dev",
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
        roles: ["user"],
    },
];

export const authProviderClient: AuthBindings = {
    login: async ({ email, username, password, remember }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            Cookies.set("auth", JSON.stringify(user), {
                expires: 30, // 30 days
                path: "/",
            });
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
    register: async (params) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === params.email);

        if (user) {
            Cookies.set("auth", JSON.stringify(user), {
                expires: 30, // 30 days
                path: "/",
            });
            return {
                success: true,
                redirectTo: "/",
            };
        }
        return {
            success: false,
            error: {
                message: "Register failed",
                name: "Invalid email or password",
            },
        };
    },
    forgotPassword: async (params) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === params.email);

        if (user) {
            //we can send email with reset password link here
            return {
                success: true,
            };
        }
        return {
            success: false,
            error: {
                message: "Forgot password failed",
                name: "Invalid email",
            },
        };
    },
    updatePassword: async (params) => {
        // Suppose we actually send a request to the back end here.
        const isPasswordInvalid =
            params.password === "123456" || !params.password;

        if (isPasswordInvalid) {
            return {
                success: false,
                error: {
                    message: "Update password failed",
                    name: "Invalid password",
                },
            };
        }

        return {
            success: true,
        };
    },
    logout: async () => {
        Cookies.remove("auth", { path: "/" });
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const auth = Cookies.get("auth");
        if (auth) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => {
        const auth = Cookies.get("auth");
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return parsedUser.roles;
        }
        return null;
    },
    getIdentity: async () => {
        const auth = Cookies.get("auth");
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return parsedUser;
        }
        return null;
    },
    onError: async (error) => {
        if (error.response?.status === 401) {
            return {
                logout: true,
            };
        }

        return { error };
    },
};

`;
