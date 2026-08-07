import React from "react";
import { Box } from "@chakra-ui/react";

import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";
import type { RefineThemedLayoutProps } from "./types";
import { ThemedLayoutContextProvider } from "../../contexts";

export const ThemedLayout: React.FC<RefineThemedLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
  initialSiderCollapsed,
  onSiderCollapsed,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapsed}
    >
      <Box display="flex">
        <SiderToRender Title={Title} />
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          minH="100vh"
          overflow="clip"
        >
          <HeaderToRender />
          <Box p={[2, 4]}>{children}</Box>
          {Footer && <Footer />}
        </Box>
        {OffLayoutArea && <OffLayoutArea />}
      </Box>
    </ThemedLayoutContextProvider>
  );
};
