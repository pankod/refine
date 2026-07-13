import { account } from "./appwriteClient";

import type { AuthProvider } from "@refinedev/core";
import type { AppwriteException } from "@refinedev/appwrite";
export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailPasswordSession(email, password);
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
          name: `${code} - ${type}`,
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
    if (error?.code === 401) {
      return {
        logout: true,
      };
    }

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
