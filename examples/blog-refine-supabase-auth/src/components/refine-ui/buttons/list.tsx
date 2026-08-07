"use client";

import { Button } from "@/components/ui/button";
import { type BaseKey, useListButton } from "@refinedev/core";
import { List } from "lucide-react";
import React from "react";

type ListButtonProps = {
  /**
   * Resource name for API data interactions. `identifier` of the resource can be used instead of the `name` of the resource.
   * @default Inferred resource name from the route
   */
  resource?: BaseKey;
  /**
   * Access Control configuration for the button
   * @default `{ enabled: true, hideIfUnauthorized: false }`
   */
  accessControl?: {
    enabled?: boolean;
    hideIfUnauthorized?: boolean;
  };
  /**
   * `meta` property is used when creating the URL for the related action and path.
   */
  meta?: Record<string, unknown>;
} & React.ComponentProps<typeof Button>;

export const ListButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  ListButtonProps
>(({ resource, accessControl, meta, children, onClick, ...rest }, ref) => {
  const { hidden, disabled, LinkComponent, to, label } = useListButton({
    resource,
    accessControl,
    meta,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
    <Button {...rest} ref={ref} disabled={isDisabled} asChild>
      <LinkComponent
        to={to}
        replace={false}
        onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          if (onClick) {
            e.preventDefault();
            onClick(e);
          }
        }}
      >
        {children ?? (
          <div className="flex items-center gap-2 font-semibold">
            <List className="w-4 h-4" />
            <span>{label}</span>
          </div>
        )}
      </LinkComponent>
    </Button>
  );
});

ListButton.displayName = "ListButton";
