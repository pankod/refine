import type { PropsWithChildren, ReactNode } from "react";
import {
  Flex,
  Typography,
  Form,
  theme,
  type FormItemProps,
  type FlexProps,
} from "antd";
import { useStyles } from "./styled";

type Props = {
  icon: ReactNode;
  label: string;
  labelStyle?: React.CSSProperties;
  flexProps?: Omit<FlexProps, "children">;
  isInput?: boolean;
} & FormItemProps;

export const FormItemHorizontal = ({
  icon,
  label,
  labelStyle,
  flexProps,
  isInput = true,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const { token } = theme.useToken();
  const { styles } = useStyles();
  return (
    <Flex
      align="baseline"
      style={{
        padding: "24px 16px 0px 16px",
      }}
      {...flexProps}
    >
      <Flex
        gap={8}
        style={{
          minWidth: "120px",
        }}
      >
        <span
          style={{
            color: token.colorPrimary,
          }}
        >
          {icon}
        </span>
        <Typography.Text style={labelStyle}>{label}</Typography.Text>
      </Flex>
      {isInput ? (
        <Form.Item
          {...props}
          className={styles.formItem}
          style={{
            width: "100%",
          }}
        >
          {children}
        </Form.Item>
      ) : (
        children
      )}
    </Flex>
  );
};
