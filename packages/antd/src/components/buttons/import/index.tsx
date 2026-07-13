import React from "react";
import { Button, Upload } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { useImportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import type { ImportButtonProps } from "../types";

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/api-reference/antd/hooks/import/useImport `useImport`} hook and is meant to be used as it's upload button.
 * It uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} and {@link https://ant.design/components/upload/ `<Upload>`} components.
 * It wraps a `<Button>` component with an `<Upload>` component and accepts properties for `<Button>` and `<Upload>` components separately.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/import-button} for more details.
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
  uploadProps,
  buttonProps,
  hideText = false,
  children,
  loading,
  ...rest
}) => {
  const { label } = useImportButton();

  return (
    <Upload {...uploadProps}>
      <Button
        icon={<ImportOutlined />}
        data-testid={RefineButtonTestIds.ImportButton}
        className={RefineButtonClassNames.ImportButton}
        loading={loading}
        {...buttonProps}
        {...rest}
      >
        {!hideText && (children ?? label)}
      </Button>
    </Upload>
  );
};
