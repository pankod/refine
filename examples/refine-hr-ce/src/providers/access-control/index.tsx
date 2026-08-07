import type { AccessControlBindings } from "@refinedev/core";
import { Role } from "@/types";
import { keepPreviousData } from "@tanstack/react-query";

export const accessControlProvider: AccessControlBindings = {
  options: {
    queryOptions: {
      placeholderData: keepPreviousData,
    },
    buttons: {
      hideIfUnauthorized: true,
    },
  },
  can: async ({ params, action }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user) return { can: false };

    const scope = params?.resource?.meta?.scope;
    // if the resource does not have a scope, it is not accessible
    if (!scope) return { can: false };

    if (user.role === Role.MANAGER) {
      return {
        can: true,
      };
    }

    if (action === "manager") {
      return {
        can: user.role === Role.MANAGER,
      };
    }

    if (action === "employee") {
      return {
        can: user.role === Role.EMPLOYEE,
      };
    }

    // users can only access resources if their role matches the resource scope
    return {
      can: user.role === scope,
    };
  },
};
