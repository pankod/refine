import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Usage() {
  return (
    <Sandpack
      hidePreview={true}
      showFiles
      showOpenInCodeSandbox={false}
      template="react-ts"
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/appwrite": "latest",
      }}
      files={{
        "src/appwrite.ts": {
          active: true,
          code: AppwriteTsxCode,
        },
        "src/auth-provider.ts": {
          code: AuthProviderTsxCode,
        },
        "App.tsx": {
          code: AppTsxCode,
        },
      }}
    />
  );
}

const AppwriteTsxCode = `
import { Appwrite, Account, Storage } from "@refinedev/appwrite";

const APPWRITE_URL = "<APPWRITE_ENDPOINT>";
const APPWRITE_PROJECT = "<APPWRITE_PROJECT_ID>";

/**
 * We'll use the \`appwriteClient\` instance
 * in our \`dataProvider\`, \`liveProvider\` and \`authProvider\`.
 */
const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for authentication
const account = new Account(appwriteClient);
// for file upload
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };
`.trim();

const AuthProviderTsxCode = `
import { AuthProvider } from "@refinedev/core";

import { account } from "./appwriteClient";

/**
 * We'll use the \`account\` instance to handle authentication.
 * This will be in sync with our appwrite client.
 */

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password);
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const { type, message, code } = e as AppwriteException;
      return {
        success: false,
        error: {
          message,
          name: \`\${code} - \${type}\`,
        },
      };
    }
  },
  logout: async () => {
    try {
      await account.deleteSession("current");
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    try {
      const session = await account.get();

      if (session) {
        return {
          authenticated: true,
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error,
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Session not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = await account.get();

    if (user) {
      return user;
    }

    return null;
  },
};
`.trim();

const AppTsxCode = `
import { Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/appwrite";

import { appwriteClient, account } from "src/appwrite";
import authProvider from "src/auth-provider";

const App: React.FC = () => {
  return (
      <Refine
        // \`appwriteClient\` is passed to the \`dataProvider\` and \`liveProvider\`
        dataProvider={dataProvider(appwriteClient, {
          databaseId: "default",
        })}
        // If you want to use the realtime features of Refine, you can pass the \`liveProvider\` prop.
        liveProvider={liveProvider(appwriteClient, {
          databaseId: "default",
        })}
        options={{ liveMode: "auto" }}
        authProvider={authProvider}
      >
        {/* ... */}
      </Refine>
  );
};
`.trim();
