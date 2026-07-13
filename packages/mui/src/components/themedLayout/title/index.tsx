import React from "react";
import { useLink, useRefineOptions } from "@refinedev/core";

import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import type { RefineLayoutThemedTitleProps } from "../types";

export const ThemedTitle: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
  icon: iconFromProps,
  text: textFromProps,
}) => {
  const {
    title: { icon: defaultIcon, text: defaultText } = {},
  } = useRefineOptions();
  const icon =
    typeof iconFromProps === "undefined" ? defaultIcon : iconFromProps;
  const text =
    typeof textFromProps === "undefined" ? defaultText : textFromProps;
  const Link = useLink();

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          ...wrapperStyles,
        }}
      >
        <SvgIcon height="24px" width="24px" color="primary">
          {icon}
        </SvgIcon>
        {!collapsed && (
          <Typography
            variant="h6"
            fontWeight={700}
            color="text.primary"
            fontSize="inherit"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {text}
          </Typography>
        )}
      </Box>
    </Link>
  );
};
