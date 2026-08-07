import React from "react";
import Box from "@mui/material/Box";

import { ThemedLayoutContextProvider } from "@contexts";
import { ThemedSider as DefaultSider } from "./sider";
import { ThemedHeader as DefaultHeader } from "./header";

import type { BoxProps } from "@mui/material";
import type { RefineThemedLayoutProps } from "./types";

interface ExtendedRefineThemedLayoutProps extends RefineThemedLayoutProps {
  /**
   * Additional properties for the children box.
   * This type includes all properties of BoxProps, including 'sx'.
   */
  childrenBoxProps?: BoxProps;

  /**
   * Additional properties for the container box.
   * This type includes all properties of BoxProps, including 'sx'.
   */
  containerBoxProps?: BoxProps;
}

export const ThemedLayout: React.FC<ExtendedRefineThemedLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
  initialSiderCollapsed,
  onSiderCollapsed,
  childrenBoxProps = {},
  containerBoxProps = {},
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  const { sx: childrenSx, ...restChildrenProps } = childrenBoxProps;
  const { sx: containerSx, ...restContainerProps } = containerBoxProps;

  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapsed}
    >
      <Box
        sx={{ display: "flex", flexDirection: "row", ...containerSx }}
        {...restContainerProps}
      >
        <SiderToRender Title={Title} />
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: "1px",
              minHeight: "1px",
            },
          ]}
        >
          <HeaderToRender />
          <Box
            component="main"
            sx={{
              p: { xs: 1, md: 2, lg: 3 },
              flexGrow: 1,
              bgcolor: (theme) => theme.palette.background.default,
              ...childrenSx,
            }}
            {...restChildrenProps}
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
