import { useContext } from "react";
import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Space,
  Avatar,
  Typography,
  Switch,
  theme,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
};

export const Header: React.FC = () => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  return (
    <AntdLayout.Header
      style={{
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 24px",
        height: "64px",
      }}
    >
      <Space>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode()}
          checked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {(user?.name || user?.email) && (
            <Text strong>{user?.name ?? user?.email}</Text>
          )}
          <Avatar
            src={user?.avatar}
            alt={user?.name ?? user?.email}
            icon={!user?.avatar ? <UserOutlined /> : undefined}
          />
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
