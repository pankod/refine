import React from "react";
import { useLink, useRefineOptions } from "@refinedev/core";
import { Center, Text, useMantineTheme } from "@mantine/core";
import type { RefineLayoutThemedTitleProps } from "../types";

export const ThemedTitle: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  icon: iconFromProps,
  text: textFromProps,
  wrapperStyles = {},
}) => {
  const {
    title: { icon: defaultIcon, text: defaultText } = {},
  } = useRefineOptions();
  const icon =
    typeof iconFromProps === "undefined" ? defaultIcon : iconFromProps;
  const text =
    typeof textFromProps === "undefined" ? defaultText : textFromProps;
  const theme = useMantineTheme();
  const Link = useLink();

  return (
    <Link to="/" style={{ all: "unset" }}>
      <Center
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: "8px",
          ...wrapperStyles,
        }}
      >
        <Text
          lh={0}
          fz="inherit"
          color={theme.colorScheme === "dark" ? "brand.5" : "brand.6"}
        >
          {icon}
        </Text>
        {!collapsed && (
          <Text
            fz="inherit"
            color={theme.colorScheme === "dark" ? "white" : "black"}
          >
            {text}
          </Text>
        )}
      </Center>
    </Link>
  );
};
