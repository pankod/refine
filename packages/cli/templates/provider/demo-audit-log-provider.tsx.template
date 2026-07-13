import { AuditLogProvider } from "@refinedev/core";

/**
 * Check out the Audit Log Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/audit-log-provider
 **/
export const auditLogProvider: AuditLogProvider = {
  get: async ({ resource, meta, action, author, metaData }) => {
    console.log("get", {
      resource,
      meta,
      action,
      author,
      metaData,
    });

    // TODO: send request to the API

    return {};
  },

  create: async ({ resource, meta, action, author, data, previousData }) => {
    console.log("create", {
      resource,
      meta,
      action,
      author,
      data,
      previousData,
    });

    // TODO: send request to the API

    return {};
  },

  update: async ({
    resource,
    meta,
    action,
    author,
    data,
    previousData,
    id,
    name,
  }) => {
    console.log("update", {
      resource,
      meta,
      action,
      author,
      data,
      previousData,
      id,
      name,
    });

    // TODO: send request to the API

    return {};
  },
};
