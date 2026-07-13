import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies, finalFiles as initialFiles } from "../intro/sandpack";
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

const AuthProviderTsxCode = /* tsx */ `
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
    logout: async () => { throw new Error("Not implemented"); },
    check: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    // optional methods
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const AppTsxWithAuthProvider = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const AuthProviderTsxWithCheckMethod = /* tsx */ `
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    check: async () => {
      // When logging in, we'll obtain an access token from our API and store it in the local storage.
      // Now let's check if the token exists in the local storage.
      // In the later steps, we'll be implementing the login and logout methods.
      const token = localStorage.getItem("my_access_token");

      return { authenticated: Boolean(token) };
    },
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
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

const AppTsxWithAuthenticatedComponent = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<div>Not authenticated</div>}
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

// actions

// protecting-content actions

export const CreateAuthProviderFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "/src/providers/auth-provider.ts": {
            code: AuthProviderTsxCode,
          },
        });
        sandpack.openFile("/src/providers/auth-provider.ts");
        sandpack.setActiveFile("/src/providers/auth-provider.ts");
      }}
      name="src/providers/auth-provider.ts"
    />
  );
};

export const AddAuthProviderToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithAuthProvider);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const AddCheckMethodToAuthProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/auth-provider.ts",
          AuthProviderTsxWithCheckMethod,
        );
        sandpack.setActiveFile("/src/providers/auth-provider.ts");
      }}
    />
  );
};

export const AddAuthenticatedComponentToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/App.tsx", AppTsxWithAuthenticatedComponent);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithAuthenticatedComponent,
    active: true,
  },
  "src/providers/auth-provider.ts": {
    code: AuthProviderTsxWithCheckMethod,
  },
};
