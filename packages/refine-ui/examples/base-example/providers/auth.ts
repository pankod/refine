import type { AuthProvider } from "@refinedev/core";

/**
 *  mock auth credentials to simulate authentication
 */
const authCredentials = {
  email: "demo@refine.dev",
  password: "demodemo",
};

const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  login: async ({ providerName, email }) => {
    if (providerName === "google") {
      return {
        success: true,
      };
    }

    if (providerName === "github") {
      return {
        success: true,
      };
    }

    if (email === authCredentials.email) {
      localStorage.setItem(TOKEN_KEY, email);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async (params) => {
    if (params.email === authCredentials.email && params.password) {
      localStorage.setItem(TOKEN_KEY, params.email);
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
  updatePassword: async (params) => {
    if (params.password === authCredentials.password) {
      //we can update password here
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  forgotPassword: async (params) => {
    if (params.email === authCredentials.email) {
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
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    return token
      ? {
          authenticated: true,
        }
      : {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Not authenticated",
          },
          logout: true,
          redirectTo: "/login",
        };
  },
  getPermissions: async (params) => params?.permissions,
  getIdentity: async () => ({
    id: 1,
    firstName: "Jane",
    lastName: "Doe",
    fullName: "Jane Doe",
    avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
    email: "jane.doe@example.com",
  }),
};
