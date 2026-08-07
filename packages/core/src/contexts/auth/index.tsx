import React, { type PropsWithChildren } from "react";

import type { IAuthContext } from "./types";
import { useQueryClient } from "@tanstack/react-query";

export const AuthProviderContext = React.createContext<Partial<IAuthContext>>(
  {},
);

export const AuthProviderContextProvider: React.FC<
  PropsWithChildren<IAuthContext>
> = ({ children, isProvided, ...authProvider }) => {
  const queryClient = useQueryClient();

  const handleLogin = async (params: unknown) => {
    try {
      const result = await authProvider.login?.(params);

      return result;
    } catch (error) {
      console.warn(
        "Unhandled Error in login: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleRegister = async (params: unknown) => {
    try {
      const result = await authProvider.register?.(params);

      return result;
    } catch (error) {
      console.warn(
        "Unhandled Error in register: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleLogout = async (params: unknown) => {
    try {
      const result = await authProvider.logout?.(params);
      queryClient.invalidateQueries();

      return result;
    } catch (error) {
      console.warn(
        "Unhandled Error in logout: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleCheck = async (params: unknown) => {
    try {
      const result = await authProvider.check?.(params);

      return Promise.resolve(result);
    } catch (error) {
      console.warn(
        "Unhandled Error in check: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleForgotPassword = async (params: unknown) => {
    try {
      const result = await authProvider.forgotPassword?.(params);

      return Promise.resolve(result);
    } catch (error) {
      console.warn(
        "Unhandled Error in forgotPassword: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleUpdatePassword = async (params: unknown) => {
    try {
      const result = await authProvider.updatePassword?.(params);
      return Promise.resolve(result);
    } catch (error) {
      console.warn(
        "Unhandled Error in updatePassword: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleUpdateIdentity = async (params: unknown) => {
    try {
      const result = await authProvider.updateIdentity?.(params);
      return Promise.resolve(result);
    } catch (error) {
      console.warn(
        "Unhandled Error in updateIdentity: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  return (
    <AuthProviderContext.Provider
      value={{
        ...authProvider,
        login: handleLogin as IAuthContext["login"],
        logout: handleLogout as IAuthContext["logout"],
        check: handleCheck as IAuthContext["check"],
        register: handleRegister as IAuthContext["register"],
        forgotPassword: handleForgotPassword as IAuthContext["forgotPassword"],
        updatePassword: handleUpdatePassword as IAuthContext["updatePassword"],
        updateIdentity: handleUpdateIdentity as IAuthContext["updateIdentity"],
        isProvided,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuthProviderContext = () => {
  const context = React.useContext(AuthProviderContext);

  return context;
};
