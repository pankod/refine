import React from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useExportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import type { ExportButtonProps } from "../types";

/**
 * `<ExportButton>` is an Ant Design {@link https://ant.design/components/button/ `<Button>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
  hideText = false,
  children,
  ...rest
}) => {
  const { label } = useExportButton();

  return (
    <Button
      type="default"
      icon={<ExportOutlined />}
      data-testid={RefineButtonTestIds.ExportButton}
      className={RefineButtonClassNames.ExportButton}
      {...rest}
    >
      {!hideText && (children ?? label)}
    </Button>
  );
};
