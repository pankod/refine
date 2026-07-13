import { Button, type ButtonProps, theme } from "antd";
import { useConfigProvider } from "../context";
import { CheckCircleOutlined } from "@ant-design/icons";

type Props = {} & ButtonProps;

export const ButtonSuccess = ({
  style,
  disabled,
  children,
  ...props
}: Props) => {
  const { token } = theme.useToken();
  const { mode } = useConfigProvider();

  return (
    <Button
      type="default"
      disabled={disabled}
      icon={<CheckCircleOutlined />}
      style={{
        color: disabled
          ? undefined
          : mode === "dark"
            ? token.green7
            : token.green8,
        borderColor: disabled ? undefined : token.green4,
        ...style,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
