import type { Theme, ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import { lightPalette } from "./palette/lightPalette";
import { darkPalette } from "./palette/darkPalette";
import { typography } from "./typography";
import { RefinePalettes } from "./palette";

const commonThemeProperties: ThemeOptions = {
  shape: {
    borderRadius: 6,
  },
  typography: {
    ...typography,
  },
};

const LightTheme = createTheme({
  ...commonThemeProperties,
  palette: lightPalette,
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          fontWeight: 800,
          lineHeight: "2rem",
        },
      },
    },
  },
});

const DarkTheme = createTheme({
  ...commonThemeProperties,
  palette: darkPalette,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025))",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          fontWeight: 800,
          lineHeight: "2rem",
        },
      },
    },
  },
});

const RefineThemes = Object.keys(RefinePalettes).reduce((acc, key) => {
  const paletteName = key as keyof typeof RefinePalettes;

  return {
    ...acc,
    [key]: createTheme({
      palette: {
        ...RefinePalettes[paletteName],
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState }) => ({
              ...(ownerState.variant === "contained" &&
                ownerState.color === "primary" && {
                  color: "#fff",
                }),
            }),
          },
        },
      },
    }),
  };
}, {}) as Record<keyof typeof RefinePalettes, Theme>;

export { LightTheme, DarkTheme, RefineThemes };
