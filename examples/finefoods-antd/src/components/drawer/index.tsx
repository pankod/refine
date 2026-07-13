import { CloseOutlined } from "@ant-design/icons";
import {
  Drawer as AntdDrawer,
  Button,
  type DrawerProps,
  Typography,
  theme,
} from "antd";
import type { PropsWithChildren } from "react";

type Props = {} & DrawerProps;

export const Drawer = (props: PropsWithChildren<Props>) => {
  const { token } = theme.useToken();

  return (
    <AntdDrawer
      {...props}
      styles={{
        body: {
          backgroundColor: token.colorBgLayout,
          borderLeft: `1px solid ${token.colorBorderSecondary}`,
          padding: "0",
        },
        header: {
          display: "none",
        },
      }}
    >
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          backgroundColor: token.colorBgContainer,
        }}
      >
        {props.title && (
          <Typography.Title
            style={{
              fontWeight: 400,
              marginLeft: "16px",
              marginBottom: 0,
            }}
            level={5}
          >
            {props.title}
          </Typography.Title>
        )}
        <Button
          type="text"
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "16px",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            color: token.colorTextTertiary,
          }}
          icon={<CloseOutlined />}
          onClick={props?.onClose}
        />
      </div>
      {props.children}
    </AntdDrawer>
  );
};
