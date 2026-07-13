import { Link } from "react-router";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useThemedLayoutContext } from "@refinedev/mui";
import { HandleIcon, RefineLogo } from "@/icons";

export const Header = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { setMobileSiderOpen } = useThemedLayoutContext();

  if (isDesktop) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        px: "16px",
        height: "64px",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          left: "16px",
          backgroundColor: theme.palette.grey[100],
        }}
        onClick={() => setMobileSiderOpen(true)}
      >
        <HandleIcon style={{ color: theme.palette.text.secondary }} />
      </IconButton>
      <Box
        sx={{
          height: "40px",
        }}
      >
        <Link to="/">
          <RefineLogo />
        </Link>
      </Box>
      <Box />
    </Box>
  );
};
