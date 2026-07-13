import type { AuthProvider } from "@refinedev/core";

import { supabaseClient } from "@/providers/supabase-client";

const authProvider: AuthProvider = {
  login: async ({ mobileNo, otp }) => {
    const { data, error } = await supabaseClient.auth.verifyOtp({
      phone: mobileNo,
      token: otp,
      type: "sms",
    });

    if (error) {
      return {
        success: false,
        error: error || {
          message: "Login failed",
          name: "Invalid OTP",
        },
      };
    }

    if (data.session) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid OTP",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error || {
          message: "Logout failed",
          name: "Unexpected error",
        },
      };
    }

    return {
      success: true,
      redirectTo: "/login",
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
    const session = data.session;

    if (!session) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Session not found",
        },
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getUser();

    return data.user?.role ?? null;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();
    const user = data.user;

    if (!user) {
      return null;
    }

    return {
      ...user,
      name: user.phone ?? user.email,
    };
  },
};

export default authProvider;
