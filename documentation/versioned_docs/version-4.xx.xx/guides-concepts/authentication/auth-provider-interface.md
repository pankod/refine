```ts
import { Refine, AuthProvider } from "@refinedev/core";

const authProvider: AuthProvider = {
  register: async (params) => {
    if (params.email === authCredentials.email && params.password) {
      localStorage.setItem("email", params.email);
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
  login: async ({ providerName, email }) => {
    if (providerName === "google") {
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
      return {
        success: true,
      };
    }

    if (providerName === "github") {
      window.location.href = "https://github.com/login/oauth/authorize";
      return {
        success: true,
      };
    }

    if (email === authCredentials.email) {
      localStorage.setItem("email", email);
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
  check: async () => {
    return localStorage.getItem("email")
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
  logout: async () => {
    localStorage.removeItem("email");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getIdentity: async () => ({
    id: 1,
    name: "Jane Doe",
    avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
  }),
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
  getPermissions: async (params) => {
    if (params) {
      // do some logic like for example you can get roles for specific tenant
      return ["admin"];
    }

    return ["admin"];
  },
};
```
