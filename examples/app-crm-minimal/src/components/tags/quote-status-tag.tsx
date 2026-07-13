import React from "react";

import {
  CheckCircleOutlined,
  ExpandOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

import type { QuoteStatus } from "@/graphql/schema.types";

const variant: Record<
  QuoteStatus,
  { color: string; icon: React.ReactElement }
> = {
  DRAFT: {
    color: "blue",
    icon: <ExpandOutlined />,
  },
  SENT: {
    color: "cyan",
    icon: <SendOutlined />,
  },
  ACCEPTED: {
    color: "green",
    icon: <CheckCircleOutlined />,
  },
};

type Props = {
  status: QuoteStatus;
};

export const QuoteStatusTag = ({ status }: Props) => {
  return (
    <Tag
      style={{
        textTransform: "capitalize",
      }}
      color={variant[status].color}
      icon={variant[status].icon}
    >
      {status.toLowerCase()}
    </Tag>
  );
};
