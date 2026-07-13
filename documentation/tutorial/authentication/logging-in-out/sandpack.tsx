import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../intro/sandpack";
import { finalFiles as initialFiles } from "../protecting-content/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const AuthProviderTsxWithLoginMethod = /* tsx */ `
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    // login method receives an object with all the values you've provided to the useLogin hook.
    login: async ({ email, password }) => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
      const token = localStorage.getItem("my_access_token");

      return { authenticated: Boolean(token) };
    },
    logout: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const LoginComponentBase = /* tsx */ `
import React from "react";

export const Login = () => {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};
`.trim();

const AppTsxWithLoginComponent = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
`.trim();

const LoginComponentWithUseLogin = /* tsx */ `
import React from "react";
import { useLogin } from "@refinedev/core";

export const Login = () => {
    const { mutate, isPending } = useLogin();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Using FormData to get the form values and convert it to an object.
      const data = Object.fromEntries(new FormData(event.target).entries());
      // Calling mutate to submit with the data we've collected from the form.
      mutate(data);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue="demo@demo.com"
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue="demodemo"
                />

                {isPending && <span>loading...</span>}
                <button
                    type="submit"
                    disabled={isPending}
                >Submit</button>
            </form>
        </div>
    );
};
`.trim();

const AuthProviderTsxWithLogoutMethod = /* tsx */ `
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    logout: async () => {
        localStorage.removeItem("my_access_token");
        return { success: true };
    },
    // login method receives an object with all the values you've provided to the useLogin hook.
    login: async ({ email, password }) => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
        const token = localStorage.getItem("my_access_token");

        return { authenticated: Boolean(token) };
    },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const HeaderComponentBase = /* tsx */ `
import React from "react";

export const Header = () => {
    return (
      <>
        <h2>Welcome!</h2>
        <button type="button">
            Logout
        </button>
      </>
    );
};
`.trim();

const AppTsxWithHeaderComponent = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
`.trim();

const HeaderComponentWithUseLogout = /* tsx */ `
import React from "react";
import { useLogout } from "@refinedev/core";

export const Header = () => {
  const { mutate, isPending } = useLogout();

  return (
    <>
      <h2>Welcome!</h2>
      <button
        type="button"
        disabled={isPending}
        onClick={mutate}
      >
        Logout
      </button>
    </>
  );
};
`.trim();

// actions

// logging-in-out actions

export const AddLoginMethodToAuthProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/auth-provider.ts",
          AuthProviderTsxWithLoginMethod,
        );
        sandpack.setActiveFile("/src/providers/auth-provider.ts");
      }}
    />
  );
};

export const CreateLoginComponentFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "src/pages/login.tsx": {
            code: LoginComponentBase,
          },
        });
        sandpack.openFile("/src/pages/login.tsx");
        sandpack.setActiveFile("/src/pages/login.tsx");
      }}
      name="src/pages/login.tsx"
    />
  );
};

export const AddLoginToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithLoginComponent);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const AddUseLoginToLoginComponent = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/pages/login.tsx", LoginComponentWithUseLogin);
        sandpack.setActiveFile("/src/pages/login.tsx");
      }}
    />
  );
};

export const AddLogoutMethodToAuthProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/auth-provider.ts",
          AuthProviderTsxWithLogoutMethod,
        );
        sandpack.setActiveFile("/src/providers/auth-provider.ts");
      }}
    />
  );
};

export const CreateHeaderComponentFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "src/components/header.tsx": {
            code: HeaderComponentBase,
          },
        });
        sandpack.openFile("/src/components/header.tsx");
        sandpack.setActiveFile("/src/components/header.tsx");
      }}
      name="src/components/header.tsx"
    />
  );
};

export const AddHeaderToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithHeaderComponent);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const AddUseLogoutToHeaderComponent = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/components/header.tsx",
          HeaderComponentWithUseLogout,
        );
        sandpack.setActiveFile("/src/components/header.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithHeaderComponent,
  },
  "src/providers/auth-provider.ts": {
    code: AuthProviderTsxWithLogoutMethod,
  },
  "src/pages/login.tsx": {
    code: LoginComponentWithUseLogin,
  },
  "src/components/header.tsx": {
    code: HeaderComponentWithUseLogout,
    active: true,
  },
};
