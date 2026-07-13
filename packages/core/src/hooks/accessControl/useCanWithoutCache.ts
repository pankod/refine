import React from "react";

import { AccessControlContext } from "@contexts/accessControl";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";

import type { IAccessControlContext } from "../../contexts/accessControl/types";

export const useCanWithoutCache = (): IAccessControlContext => {
  const { can: canFromContext } = React.useContext(AccessControlContext);

  const can = React.useMemo(() => {
    if (!canFromContext) {
      return undefined;
    }

    const canWithSanitizedResource: NonNullable<typeof canFromContext> =
      async ({ params, ...rest }) => {
        const sanitizedResource = params?.resource
          ? sanitizeResource(params.resource)
          : undefined;

        return canFromContext({
          ...rest,
          ...(params
            ? {
                params: {
                  ...params,
                  resource: sanitizedResource,
                },
              }
            : {}),
        });
      };

    return canWithSanitizedResource;
  }, [canFromContext]);

  return { can };
};
