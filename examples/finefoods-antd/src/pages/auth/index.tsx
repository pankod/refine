import { AuthPage as AntdAuthPage, type AuthProps } from "@refinedev/antd";
import { Flex } from "antd";
import { Link } from "react-router";
import { FinefoodsLogoIcon, FinefoodsLogoText } from "../../components";

const authWrapperProps = {
  style: {
    background:
      "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.png')",
    backgroundSize: "cover",
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        maxWidth: 408,
        margin: "auto",
      }}
    >
      <Link to="/">
        <Flex
          align="center"
          justify="center"
          gap={12}
          style={{
            marginBottom: 16,
          }}
        >
          <FinefoodsLogoIcon
            style={{
              width: 64,
              height: 64,
              color: "#fff",
            }}
          />
          <FinefoodsLogoText
            style={{
              color: "#fff",
              width: "300px",
              height: "auto",
            }}
          />
        </Flex>
      </Link>
      {content}
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={renderAuthContent}
      formProps={formProps}
    />
  );
};
