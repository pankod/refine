import type { FC } from "react";

import { useTranslate } from "@refinedev/core";

import { Typography, theme } from "antd";

type PaginationTotalProps = {
  total: number;
  entityName: string;
};

export const PaginationTotal: FC<PaginationTotalProps> = ({
  total,
  entityName,
}) => {
  const t = useTranslate();
  const { token } = theme.useToken();
  return (
    <div
      style={{
        marginLeft: "16px",
        marginRight: "auto",
      }}
    >
      <Typography.Text
        style={{
          color: token.colorTextSecondary,
        }}
      >
        {total}
      </Typography.Text>{" "}
      <Typography.Text
        style={{
          color: token.colorTextTertiary,
        }}
      >
        {t(`${entityName}.${entityName}`)} {t("table.inTotal")}
      </Typography.Text>
    </div>
  );
};
