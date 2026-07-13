import type { PropsWithChildren } from "react";
import { ThemedLayout } from "@refinedev/mui";
import { Box } from "@mui/material";
import { Header } from "./header";
import { Sider } from "./sider";

type Props = PropsWithChildren<{}>;

export const Layout = ({ children }: Props) => {
  return (
    <ThemedLayout Header={() => <Header />} Sider={() => <Sider />}>
      <Box
        sx={(theme) => ({
          position: "relative",
          padding: "8px",
          [theme.breakpoints.up("sm")]: {
            padding: "16px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "8px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "0px",
          },
        })}
      >
        <Box
          sx={{
            maxWidth: "1128px",
            marginX: "auto",
            minHeight: "100%",
            display: "flex",
          }}
        >
          <Box sx={{ flex: 1, minWidth: "100%" }}>{children}</Box>
        </Box>
      </Box>
    </ThemedLayout>
  );
};
