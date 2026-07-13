import { AuthProvider } from "@refinedev/core";

/**
 * Check out the Auth Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/auth-provider/
 **/
export const authProvider: AuthProvider = {
  login: async (params) => {
    console.log("login", params);

    // TODO: send request to the API to login

    return {
      success: true, // or false if the login is not successful
      redirectTo: "/",
    };
  },

  register: async (params) => {
    console.log("register", params);

    // TODO: send request to the API to login

    return {
      success: true, // or false if the register is not successful
      redirectTo: "/",
    };
  },

  check: async (params) => {
    console.log("check", params);

    // TODO: control if the user is logged in

    return {
      authenticated: true, // or false if the user is not authenticated
    };
  },

  logout: async (params) => {
    console.log("logout", params);

    // TODO: send request to the API to logout

    return {
      success: true, // or false if the logout is not successful
      redirectTo: "/login",
    };
  },

  forgotPassword: async (params) => {
    console.log("forgotPassword", params);

    // TODO: send request to the API to forgot password

    return {
      success: true, // or false if the forgot password is not successful
      redirectTo: "/update-password",
    };
  },

  updatePassword: async (params) => {
    console.log("updatePassword", params);

    // TODO: send request to the API to update password

    return {
      success: true, // or false if the update password is not successful
      redirectTo: "/login",
    };
  },

  getPermissions: async (params) => {
    console.log("getPermissions", params);

    // TODO: send request to the API to get permissions

    return {
      permissions: [],
    };
  },

  getIdentity: async (params) => {
    console.log("getIdentity", params);

    // TODO: send request to the API to get identity

    return {};
  },

  onError: async (params) => {
    console.log("onError", params);

    // TODO: do something with the error

    return {
      logout: true, // or false if you want to continue
      redirectTo: "/login", // or undefined if you want to continue
    };
  },
};
