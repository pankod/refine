import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";

import { ColorModeContext } from "../contexts";

export const Header: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  return (
    <AppBar color="default" position="sticky">
      <Stack width="100%" direction="row" justifyContent="end">
        <Box marginRight="20px">
          <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Box>
      </Stack>
    </AppBar>
  );
};
