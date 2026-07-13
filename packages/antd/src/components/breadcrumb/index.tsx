import React from "react";
import {
  useBreadcrumb,
  useLink,
  useResourceParams,
  matchResourceFromRoute,
} from "@refinedev/core";
import type { RefineBreadcrumbProps } from "@refinedev/ui-types";

import {
  Breadcrumb as AntdBreadcrumb,
  type BreadcrumbProps as AntdBreadcrumbProps,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";

export type BreadcrumbProps = RefineBreadcrumbProps<AntdBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  showHome = true,
  hideIcons = false,
  meta,
  minItems = 2,
}) => {
  const { breadcrumbs } = useBreadcrumb({
    meta,
  });
  const Link = useLink();

  const { resources } = useResourceParams();

  const rootRouteResource = matchResourceFromRoute("/", resources);

  if (breadcrumbs.length < minItems) return null;

  const breadCrumbItems = breadcrumbs.map(({ label, icon, href }) => ({
    key: `breadcrumb-item-${label}`,
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {!hideIcons && icon}
        {href ? <Link to={href}>{label}</Link> : <span>{label}</span>}
      </div>
    ),
  }));

  const getBreadcrumbItems = () => {
    if (showHome && rootRouteResource.found) {
      return [
        {
          key: "breadcrumb-item-home",
          title: (
            <Link to="/">
              {rootRouteResource?.resource?.meta?.icon ?? <HomeOutlined />}
            </Link>
          ),
        },
        ...breadCrumbItems,
      ];
    }

    return breadCrumbItems;
  };

  return <AntdBreadcrumb items={getBreadcrumbItems()} {...breadcrumbProps} />;
};
