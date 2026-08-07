import * as React from "react";
import { AuthPage as AntdAuthPage, type AuthProps } from "@refinedev/antd";
import { Link } from "react-router";
import { Image } from "antd";

import { SponsorsBanner } from "../../components/banners";

const authWrapperProps = {
  style: {
    backgroundImage: "url('/bg.png')",
    backgroundRepeat: "repeat-x",
  },
};

const contentProps = {
  style: {
    backgroundColor: "#fff",
    border: "1px solid #f5f5f5",
    borderRadius: "16px",
    boxShadow: "4px 8px 16px rgba(42, 42, 66, 0.25)",
    width: "384px",
    padding: "16px",
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ marginBottom: "32px" }}>
        <Image
          height="160"
          src="/pixels-logo.svg"
          alt="pixels-logo"
          preview={false}
        />
      </Link>
      {content}
      <SponsorsBanner />
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps, ...rest }) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      contentProps={contentProps}
      renderContent={renderAuthContent}
      formProps={formProps}
      {...rest}
    />
  );
};
