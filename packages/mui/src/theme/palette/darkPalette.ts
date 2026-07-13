import type { PaletteOptions } from "@mui/material/styles";

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#67be23",
    contrastText: "#fff",
  },
  secondary: {
    main: "#2A132E",
    contrastText: "#fff",
  },
  background: {
    default: "#212121",
    paper: "#242424",
  },
  success: {
    main: "#67be23",
    contrastText: "#fff",
  },
  error: {
    main: "#ee2a1e",
    contrastText: "#fff",
  },
  warning: {
    main: "#fa8c16",
    contrastText: "#fff",
  },
  info: {
    main: "#1890ff",
    contrastText: "#fff",
  },
  divider: "rgba(0,0,0,0)",
  text: {
    primary: "#fff",
    secondary: "rgba(255,255,255,0.7)",
    disabled: "#d1d1d1",
  },
};
