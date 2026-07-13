import React from "react";

import { useUserFriendlyName } from "../../../definitions/helpers/useUserFriendlyName";
import { useResourceParams } from "../../use-resource-params";
import { useRefineOptions } from "../../use-refine-options";
import { useButtonCanAccess } from "../button-can-access";
import { useNavigation } from "../../navigation";
import { useTranslate } from "../../i18n";
import { useLink } from "../../router";

import type { BaseKey } from "../../../contexts/data/types";
import type { Action } from "../../../contexts/router/types";
import type { CanReturnType } from "../../../contexts/accessControl/types";

export type NavigationButtonProps = {
  action: Action;
  id?: BaseKey;
  resource?: string;
  meta?: Record<string, unknown>;
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
};

export type NavigationButtonValues = {
  to: string;
  label: string;
  disabled: boolean;
  title: string;
  hidden: boolean;
  canAccess: CanReturnType | undefined;
  LinkComponent: React.ComponentType<
    React.PropsWithChildren<{
      [prop: string]: any;
      to: string;
    }>
  >;
};

export function useNavigationButton(
  props: NavigationButtonProps,
): NavigationButtonValues {
  const navigation = useNavigation();
  const Link = useLink();
  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const {
    textTransformers: { humanize },
  } = useRefineOptions();

  const { id, resource, identifier } = useResourceParams({
    resource: props.resource,
    id: props.action === "create" ? undefined : props.id,
  });

  const { canAccess, title, hidden, disabled } = useButtonCanAccess({
    action: props.action,
    accessControl: props.accessControl,
    meta: props.meta,
    id,
    resource,
  });

  const LinkComponent = Link;

  const to = React.useMemo(() => {
    if (!resource) return "";
    switch (props.action) {
      case "create":
      case "list":
        return navigation[`${props.action}Url`](resource, props.meta);
      default:
        if (!id) return "";
        return navigation[`${props.action}Url`](resource, id, props.meta);
    }
  }, [resource, id, props.meta, navigation[`${props.action}Url`]]);

  const label =
    props.action === "list"
      ? translate(
          `${identifier ?? props.resource}.titles.list`,
          getUserFriendlyName(
            resource?.meta?.label ?? identifier ?? props.resource,
            "plural",
          ),
        )
      : translate(`buttons.${props.action}`, humanize(props.action));

  return {
    to,
    label,
    title,
    disabled,
    hidden,
    canAccess,
    LinkComponent,
  };
}
