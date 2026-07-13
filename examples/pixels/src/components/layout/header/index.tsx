import React from "react";
import {
  useGo,
  useIsAuthenticated,
  useLogout,
  useMenu,
  useNavigation,
  useParsed,
} from "@refinedev/core";
import { Link } from "react-router";
import { useModalForm } from "@refinedev/antd";

import {
  PlusSquareOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Image, Space } from "antd";

import { CreateCanvas } from "../../../components/canvas";
import type { Canvas } from "../../../types";

export const Header: React.FC = () => {
  const { data } = useIsAuthenticated();
  const { mutate: mutateLogout } = useLogout();
  const go = useGo();
  const { selectedKey } = useMenu();
  const { pathname } = useParsed();

  const { modalProps, formProps, show } = useModalForm<Canvas>({
    resource: "canvases",
    action: "create",
    redirect: "show",
  });

  const isAuthenticated = data?.authenticated;

  const handleRedirect = () => {
    if (!pathname) {
      return go({ to: "/login" });
    }

    if (pathname === "/") {
      return go({ to: "/login" });
    }

    go({ to: `/login?to=${encodeURIComponent(pathname)}` });
  };

  return (
    <div className="container">
      <div className="layout-header">
        <Link to="/">
          <Image
            width="120px"
            src="/pixels-logo.svg"
            alt="Pixels Logo"
            preview={false}
          />
        </Link>
        <Space size="large">
          <Link
            to="/"
            className={`nav-button ${selectedKey === "/" ? "active" : ""}`}
          >
            <span className="dot-icon" />
            HOME
          </Link>
          <Link
            to="/canvases"
            className={`nav-button ${
              selectedKey === "/canvases" ? "active" : ""
            }`}
          >
            <span className="dot-icon" />
            NEW
          </Link>
        </Space>
        <Space>
          <Button
            icon={<PlusSquareOutlined />}
            onClick={() => {
              if (isAuthenticated) {
                show();
              } else {
                handleRedirect();
              }
            }}
            title="Create a new canvas"
          >
            Create
          </Button>
          {isAuthenticated ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                mutateLogout();
              }}
              icon={<LogoutOutlined />}
              title="Logout"
            />
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleRedirect();
              }}
              icon={<LoginOutlined />}
              title="Login"
            >
              Login
            </Button>
          )}
        </Space>
      </div>
      <CreateCanvas modalProps={modalProps} formProps={formProps} />
    </div>
  );
};
