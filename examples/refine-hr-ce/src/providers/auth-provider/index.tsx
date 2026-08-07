import type { AuthProvider } from "@refinedev/core";
import { Role, type Employee, type ResponseLogin } from "@/types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utilities/constants";
import { kyInstance } from "../data";

export const authProvider: AuthProvider = {
  login: async ({ email, redirectTo }) => {
    try {
      const { accessToken, refreshToken, user } =
        await kyInstance<ResponseLogin>("login", {
          method: "post",
          body: JSON.stringify({ email }),
        }).json();

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        success: true,
        redirectTo,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    }
  },
  register: async () => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("user");

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
  check: async () =>
    localStorage.getItem(ACCESS_TOKEN_KEY)
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
        },
  getPermissions: async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return {
        role: Role.EMPLOYEE,
      };
    }

    const parsedUser = JSON.parse(user);

    return {
      role: parsedUser.role,
    };
  },
  getIdentity: async () => {
    const user = await kyInstance("me").json<Employee>();

    return user;
  },
};
