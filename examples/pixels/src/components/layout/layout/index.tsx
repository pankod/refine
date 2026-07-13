import React from "react";
import type { LayoutProps } from "@refinedev/core";
import { Layout as AntdLayout } from "antd";

import { Header } from "../../../components/layout";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntdLayout
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "repeat-x",
      }}
    >
      <Header />
      <AntdLayout.Content>{children}</AntdLayout.Content>
    </AntdLayout>
  );
};
