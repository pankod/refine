import React, { useContext } from "react";

import warnOnce from "warn-once";

import { I18nContext } from "@contexts/i18n";
import { getActionRoutesFromResource } from "@definitions/helpers/router";
import { composeRoute } from "@definitions/helpers/router/compose-route";
import { useRefineContext, useResourceParams, useTranslate } from "@hooks";
import { useParsed } from "@hooks/router/use-parsed";

import type { IResourceItem } from "../../contexts/resource/types";
import { pickResource } from "../../definitions/helpers/pick-resource/index";

export type BreadcrumbsType = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

type UseBreadcrumbReturnType = {
  breadcrumbs: BreadcrumbsType[];
};

type UseBreadcrumbProps = {
  /**
   * Additional params to be used in the route generation process.
   */
  meta?: Record<string, string | number>;
};

export const useBreadcrumb = ({
  meta: metaFromProps = {},
}: UseBreadcrumbProps = {}): UseBreadcrumbReturnType => {
  const { i18nProvider } = useContext(I18nContext);
  const parsed = useParsed();
  const translate = useTranslate();
  const { action, resource, resources } = useResourceParams();
  const {
    options: { textTransformers },
  } = useRefineContext();

  const breadcrumbs: BreadcrumbsType[] = [];

  if (!resource?.name) {
    return { breadcrumbs };
  }

  const addBreadcrumb = (parentName: string | IResourceItem) => {
    const parentResource =
      typeof parentName === "string"
        ? pickResource(parentName, resources) ?? {
            name: parentName,
          }
        : parentName;

    if (parentResource) {
      const grandParentName = parentResource?.meta?.parent;
      if (grandParentName) {
        addBreadcrumb(grandParentName);
      }
      const listActionOfResource = getActionRoutesFromResource(
        parentResource,
        resources,
      ).find((r) => r.action === "list");

      const hrefRaw = listActionOfResource?.resource?.list
        ? listActionOfResource?.route
        : undefined;

      const href = hrefRaw
        ? composeRoute(hrefRaw, parentResource?.meta, parsed, metaFromProps)
        : undefined;

      breadcrumbs.push({
        label:
          parentResource.meta?.label ??
          translate(
            `${parentResource.name}.${parentResource.name}`,
            textTransformers.humanize(parentResource.name),
          ),
        href: href,
        icon: parentResource.meta?.icon,
      });
    }
  };

  addBreadcrumb(resource);

  if (action && action !== "list") {
    const key = `actions.${action}`;
    const actionLabel = translate(key);
    if (typeof i18nProvider !== "undefined" && actionLabel === key) {
      warnOnce(
        true,
        `[useBreadcrumb]: Breadcrumb missing translate key for the "${action}" action. Please add "actions.${action}" key to your translation file.\nFor more information, see https://refine.dev/docs/api-reference/core/hooks/useBreadcrumb/#i18n-support`,
      );
      breadcrumbs.push({
        label: translate(
          `buttons.${action}`,
          textTransformers.humanize(action),
        ),
      });
    } else {
      breadcrumbs.push({
        label: translate(key, textTransformers.humanize(action)),
      });
    }
  }

  return {
    breadcrumbs,
  };
};
