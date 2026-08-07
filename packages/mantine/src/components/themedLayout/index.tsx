import React from "react";
import { Box } from "@mantine/core";

import type { RefineThemedLayoutProps } from "./types";
import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";
import { ThemedLayoutContextProvider } from "../../contexts";

export const ThemedLayout: React.FC<RefineThemedLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  initialSiderCollapsed,
  children,
  onSiderCollapsed,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapsed}
    >
      <Box sx={{ display: "flex" }}>
        <SiderToRender Title={Title} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <HeaderToRender />
          <Box
            component="main"
            sx={(theme) => ({
              padding: theme.spacing.sm,
            })}
          >
            {children}
          </Box>
          {Footer && <Footer />}
        </Box>
        {OffLayoutArea && <OffLayoutArea />}
      </Box>
    </ThemedLayoutContextProvider>
  );
};
