import type { AuthProvider, HttpError } from "@refinedev/core";
import axios from "axios";

export const authProvider = (API_URL: string): AuthProvider => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const customError: HttpError = {
        ...error,
        message: error.response?.data?.message,
        statusCode: error.response?.status,
      };

      return Promise.reject(customError);
    },
  );
  axiosInstance.defaults.baseURL = API_URL;

  return {
    login: async ({ username, password }) => {
      try {
        const response = await axiosInstance.post(
          "/auth",
          { email: username, password: password },
          {
            withCredentials: true,
          },
        );

        if (response) {
          return { succes: true, ...response.data.customer };
        }
      } catch (error) {
        return {
          success: false,
          error,
        };
      }
    },
    logout: async ({ redirectTo }: { redirectTo: string }) => {
      try {
        axiosInstance
          .delete("/auth")
          .then(() => localStorage.removeItem("user"));

        return {
          success: true,
          redirectTo,
        };
      } catch (error) {
        return {
          success: false,
        };
      }
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const { data: session } = await axiosInstance.get("/auth");
      if (session) {
        return { authenticated: true };
      }
      return { authenticated: false };
    },
    getIdentity: async () => {
      const { data: session } = await axiosInstance.get("/auth");

      return { ...session.customer };
    },
    getPermissions: () => Promise.resolve(),
  };
};
