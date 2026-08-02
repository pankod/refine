import { Layout, Button, Space, Typography } from "antd";
import { useLogin } from "@refinedev/core";
import { ThemedTitle as ThemedTitleV2 } from "@refinedev/antd";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin();

  return (
    <Layout
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space direction="vertical" align="center" size="large">
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
          }}
        />
        <Button
          type="primary"
          size="middle"
          onClick={() => login({})}
          style={{ width: "240px" }}
        >
          Sign in
        </Button>
        <Typography.Text type="secondary">Powered by Keycloak</Typography.Text>
      </Space>
    </Layout>
  );
};
