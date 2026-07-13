import React from "react";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useCloneButton } from "@refinedev/core";
import {
  RefineButtonTestIds,
  RefineButtonClassNames,
} from "@refinedev/ui-types";

import type { CloneButtonProps } from "../types";

/**
 * `<CloneButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/clone-button} for more details.
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
  resource: resourceNameFromProps,
  recordItemId,
  hideText = false,
  accessControl,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, LinkComponent, label, disabled, hidden, title } = useCloneButton({
    id: recordItemId,
    resource: resourceNameFromProps,
    accessControl,
    meta,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  return (
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
      <Button
        icon={<PlusSquareOutlined />}
        disabled={isDisabled}
        title={title}
        data-testid={RefineButtonTestIds.CloneButton}
        className={RefineButtonClassNames.CloneButton}
        {...rest}
      >
        {!hideText && (children ?? label)}
      </Button>
    </LinkComponent>
  );
};
