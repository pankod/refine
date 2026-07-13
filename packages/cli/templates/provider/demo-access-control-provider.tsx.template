import { AccessControlProvider } from "@refinedev/core";

/**
 * Check out the Access Control Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/accessControl-provider
 **/
export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    console.log("can", {
      resource,
      action,
      params,
    });

    // TODO: control if the user can do the action

    return { can: true };
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
  },
};
