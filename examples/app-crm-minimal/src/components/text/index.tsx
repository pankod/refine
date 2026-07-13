import React from "react";

import { ConfigProvider, Typography } from "antd";

export type TextProps = {
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl"
    | "huge"
    | "xhuge"
    | "xxhuge";
} & React.ComponentProps<typeof Typography.Text>;

const sizes = {
  xs: {
    fontSize: 12,
    lineHeight: 20 / 12,
  },
  sm: {
    fontSize: 14,
    lineHeight: 22 / 14,
  },
  md: {
    fontSize: 16,
    lineHeight: 24 / 16,
  },
  lg: {
    fontSize: 20,
    lineHeight: 28 / 20,
  },
  xl: {
    fontSize: 24,
    lineHeight: 32 / 24,
  },
  xxl: {
    fontSize: 30,
    lineHeight: 38 / 30,
  },
  xxxl: {
    fontSize: 38,
    lineHeight: 46 / 38,
  },
  huge: {
    fontSize: 46,
    lineHeight: 54 / 46,
  },
  xhuge: {
    fontSize: 56,
    lineHeight: 64 / 56,
  },
  xxhuge: {
    fontSize: 68,
    lineHeight: 76 / 68,
  },
};

export const Text = ({ size = "sm", children, ...rest }: TextProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          ...sizes[size],
        },
      }}
    >
      <Typography.Text {...rest}>{children}</Typography.Text>
    </ConfigProvider>
  );
};
