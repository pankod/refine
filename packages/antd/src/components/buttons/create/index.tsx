import React from "react";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useCreateButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import type { CreateButtonProps } from "../types";

/**
 * <CreateButton> uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/create-button} for more details.
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  hideText = false,
  accessControl,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { hidden, disabled, label, title, LinkComponent, to } = useCreateButton(
    {
      resource: resourceNameFromProps,
      meta,
      accessControl,
    },
  );

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
        data-testid={RefineButtonTestIds.CreateButton}
        className={RefineButtonClassNames.CreateButton}
        type="primary"
        {...rest}
      >
        {!hideText && (children ?? label)}
      </Button>
    </LinkComponent>
  );
};
