import React from "react";
import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useResourceParams,
} from "@refinedev/core";
import type { RefineBreadcrumbProps } from "@refinedev/ui-types";

import {
  Text,
  Breadcrumbs,
  type BreadcrumbsProps as MantineBreadcrumbProps,
  Anchor,
  Group,
} from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

export type BreadcrumbProps = RefineBreadcrumbProps<MantineBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  showHome = true,
  hideIcons = false,
  meta,
  minItems = 2,
}) => {
  const { breadcrumbs } = useBreadcrumb({ meta });
  const Link = useLink();

  const { resources } = useResourceParams();

  const rootRouteResource = matchResourceFromRoute("/", resources);

  if (breadcrumbs.length < minItems) return null;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      styles={{
        separator: { marginRight: 8, marginLeft: 8, color: "dimgray" },
      }}
      {...breadcrumbProps}
    >
      {showHome && rootRouteResource.found && (
        <Anchor component={Link as any} color="dimmed" to="/">
          {rootRouteResource?.resource?.meta?.icon ?? <IconHome size={18} />}
        </Anchor>
      )}
      {breadcrumbs.map(({ label, icon, href }) => {
        return (
          <Group key={label} spacing={4} align="center" noWrap>
            {!hideIcons && icon}
            {href ? (
              <Anchor
                component={Link as any}
                color="dimmed"
                to={href}
                size="sm"
              >
                {label}
              </Anchor>
            ) : (
              <Text color="dimmed" size="sm">
                {label}
              </Text>
            )}
          </Group>
        );
      })}
    </Breadcrumbs>
  );
};
