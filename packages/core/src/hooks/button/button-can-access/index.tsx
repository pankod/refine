import React from "react";

import { AccessControlContext } from "../../../contexts/accessControl";
import { useCan } from "../../accessControl";
import { useTranslate } from "../../i18n";

import type { CanReturnType } from "../../../contexts/accessControl/types";
import type { IResourceItem } from "../../../contexts/resource/types";
import type { Action } from "../../../contexts/router/types";
import type { BaseKey } from "../../../contexts/data/types";

type ButtonCanAccessProps = {
  action: Action | "delete";
  resource?: IResourceItem;
  id?: BaseKey;
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
  meta?: Record<string, unknown>;
};

type ButtonCanAccessValues = {
  title: string;
  hidden: boolean;
  disabled: boolean;
  canAccess: CanReturnType | undefined;
};

export const useButtonCanAccess = (
  props: ButtonCanAccessProps,
): ButtonCanAccessValues => {
  const translate = useTranslate();
  const accessControlContext = React.useContext(AccessControlContext);

  const accessControlEnabled =
    props.accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    props.accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const { data: canAccess } = useCan({
    resource: props.resource?.name,
    action: props.action === "clone" ? "create" : props.action,
    params: { meta: props.meta, id: props.id, resource: props.resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const title = React.useMemo(() => {
    if (canAccess?.can) return "";
    if (canAccess?.reason) return canAccess.reason;

    return translate(
      "buttons.notAccessTitle",
      "You don't have permission to access",
    );
  }, [canAccess?.can, canAccess?.reason, translate]);

  const hidden = accessControlEnabled && hideIfUnauthorized && !canAccess?.can;

  const disabled = canAccess?.can === false;

  return {
    title,
    hidden,
    disabled,
    canAccess,
  };
};
