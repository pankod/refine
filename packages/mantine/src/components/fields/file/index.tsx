import React from "react";

import { UrlField } from "@components";

import type { FileFieldProps } from "../types";

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
