import React from "react";

import { Space } from "antd";

import { AccordionHeaderSkeleton, Text } from "@/components";

type Props = React.PropsWithChildren<{
  icon: React.ReactNode;
  isActive: boolean;
  fallback?: string | React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}>;

export const AccordionHeader = ({
  icon,
  isActive,
  fallback,
  isLoading = false,
  children,
}: Props) => {
  if (isLoading) {
    return <AccordionHeaderSkeleton />;
  }

  return (
    <Space size={15} align="start">
      {icon}
      {isActive ? <Text strong>{children}</Text> : fallback}
    </Space>
  );
};
