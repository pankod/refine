import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { RefineLogo } from "@/icons";
import { useThemedLayoutContext } from "@refinedev/mui";
import { UserSelect } from "./user-select";
import { Menu } from "./menu";

export const Sider = () => {
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mobileSiderOpen, setMobileSiderOpen } = useThemedLayoutContext();

  useEffect(() => {
    if (mobileSiderOpen && isMobile) {
      setMobileSiderOpen(false);
    }
  }, [location]);

  return (
    <>
      {isMobile ? (
        <MobileSiderContent
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
        />
      ) : (
        <SiderContent />
      )}
    </>
  );
};

const MobileSiderContent = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
        sx: {
          "& .MuiDrawer-paper": {
            borderRadius: 0,
            margin: 0,
            height: "100%",
          },

          "& .MuiModal-backdrop": {
            backgroundColor: theme.palette.grey[900],
            opacity: "0.8 !important",
          },
        },
      }}
    >
      <SiderContent />
    </Drawer>
  );
};

const SiderContent = () => {
  return (
    <Box
      sx={{
        px: "24px",
        pt: "24px",
        width: "240px",
        minHeight: "100dvh",
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          height: "40px",
        }}
      >
        <Link to="/">
          <RefineLogo />
        </Link>
      </Box>
      <Box
        sx={{
          marginTop: "24px",
        }}
      >
        <UserSelect />
        <Menu />
      </Box>
    </Box>
  );
};
