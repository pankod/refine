import { Tag, Typography, theme } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";
import type { IProduct } from "../../../interfaces";
import { useConfigProvider } from "../../../context";

type Props = {
  value: IProduct["isActive"];
};

export const ProductStatus = ({ value }: Props) => {
  const t = useTranslate();
  const { token } = theme.useToken();
  const { mode } = useConfigProvider();
  const isDark = mode === "dark";

  return (
    <Tag
      color={value ? "green" : "default"}
      style={{
        color: value ? token.colorSuccess : token.colorTextTertiary,
        marginInlineEnd: 0,
      }}
      icon={value ? <CheckCircleOutlined /> : <StopOutlined />}
    >
      <Typography.Text
        style={{
          color: value
            ? isDark
              ? token.green7
              : "#3C8618"
            : isDark
              ? token.colorTextTertiary
              : token.colorTextTertiary,
        }}
      >
        {t(`products.fields.isActive.${value}`)}
      </Typography.Text>
    </Tag>
  );
};
