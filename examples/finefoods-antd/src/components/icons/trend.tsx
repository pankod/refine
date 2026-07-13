import { CaretUpOutlined } from "@ant-design/icons";
import { theme } from "antd";

export const TrendUpIcon = () => {
  const { token } = theme.useToken();

  return (
    <CaretUpOutlined
      style={{
        color: token.colorSuccess,
      }}
    />
  );
};

export const TrendDownIcon = () => {
  const { token } = theme.useToken();

  return (
    <CaretUpOutlined
      style={{
        color: token.colorWarning,
      }}
    />
  );
};
