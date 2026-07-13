import React from "react";
import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useResourceParams,
} from "@refinedev/core";
import type { RefineBreadcrumbProps } from "@refinedev/ui-types";
import {
  Breadcrumb as ChakraBreadcrumb,
  type BreadcrumbProps as ChakraBreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { IconHome } from "@tabler/icons-react";

export type BreadcrumbProps = RefineBreadcrumbProps<ChakraBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  showHome = true,
  hideIcons = false,
  meta,
  minItems = 2,
}) => {
  const { breadcrumbs } = useBreadcrumb({ meta });
  const Link = useLink();

  if (breadcrumbs.length < minItems) return null;

  const { resources } = useResourceParams();

  const rootRouteResource = matchResourceFromRoute("/", resources);

  return (
    <ChakraBreadcrumb mb="3" {...breadcrumbProps}>
      {showHome && rootRouteResource?.found && (
        <BreadcrumbItem>
          <Link to="/">
            {rootRouteResource?.resource?.meta?.icon ?? <IconHome size={20} />}
          </Link>
        </BreadcrumbItem>
      )}
      {breadcrumbs.map(({ label, icon, href }) => {
        return (
          <BreadcrumbItem key={label}>
            {!hideIcons && icon}
            {href ? (
              <BreadcrumbLink ml={2} as={Link as any} to={href}>
                {label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink ml={2}>{label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </ChakraBreadcrumb>
  );
};
