import React from "react";

import { UrlField } from "@components";

import type { FileFieldProps } from "../types";

/**
 * This field is used to display files and  uses Material UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`}  and {@link https://mui.com/material-ui/react-link/#main-content `<Link>`} components.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/fields/file} for more details.
 */
export const FileField: React.FC<FileFieldProps> = ({
  title,
  src,
  ...rest
}) => {
  return (
    <UrlField value={src} title={title} {...rest}>
      {title ?? src}
    </UrlField>
  );
};
