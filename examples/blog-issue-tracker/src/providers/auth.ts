import type { AuthProvider } from "@refinedev/core";

import { supabaseClient } from "./supabase-client";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error || {
          message: "Login failed",
          name: "Invalid credentials",
        },
      };
    }

    if (data?.user) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: error || {
        message: "Login failed",
        name: "Invalid credentials",
      },
    };
  },
  register: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email ?? "",
      password: password ?? "",
    });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    if (data?.user) {
      return {
        success: true,
        redirectTo: "/login",
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "User not created",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    if (error?.code === "PGRST301" || error?.code === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const { data, error } = await supabaseClient.auth.getSession();
    const { session } = data;

    if (!session) {
      return {
        authenticated: false,
        redirectTo: "/login",
        logout: true,
        error: error || {
          message: "Check failed",
          name: "Session not found",
        },
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const user = await supabaseClient.auth.getUser();

    if (user) {
      return user.data.user?.role;
    }

    return null;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      };
    }

    return null;
  },
};

export default authProvider;
