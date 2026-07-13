import type { PropsWithChildren } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { ChevronDownIcon } from "@/icons/chevron-down";
import { Role } from "@/types";
import { indigo, red, slate, teal } from "./colors";

const themeOptionsBase: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 360,
      sm: 720,
      md: 960,
      lg: 1296,
      xl: 1440,
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          fontSize: "14px",
          lineHeight: "24px",
        },
        root: {
          "& .MuiAutocomplete-inputRoot": {
            padding: "0",
            paddingLeft: "8px",
            minHeight: "40px",
            height: "max-content !important",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: 0,
          height: "40px",

          "&.MuiInputBase-adornedStart": {
            padding: "8px",
          },
        },
        multiline: {
          height: "auto",
        },
        sizeSmall: {
          height: "32px",
        },
        input: {
          fontSize: "14px",
          lineHeight: "20px",
          paddingLeft: "0",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: "6px",

          "&.Mui-selected": {
            backgroundColor: "transparent",
            border: `1px solid ${slate[200]}`,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          height: "calc(100% - 16px)",
          margin: "8px",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "4px",
          backgroundColor: slate[100],
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: "3px !important",
          borderBottomLeftRadius: "3px !important",
          borderTopRightRadius: "3px !important",
          borderBottomRightRadius: "3px !important",
          border: "none",
          padding: "6px 12px",
          borderRadius: "3px",
          minWidth: "160px",
          height: "32px",
          backgroundColor: "transparent",
          textTransform: "capitalize",
          color: slate[700],

          "&.Mui-selected": {
            color: slate[900],
            backgroundColor: "white",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${slate[200]} !important`,
            borderWidth: "1px !important",
            borderRadius: "6px",
          },

          "& .MuiInputBase-inputSizeSmall": {
            fontSize: "12px",
            lineHeight: "16px",
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          color: slate[500],
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          color: slate[500],
          fontSize: "12px",
          lineHeight: "16px",
          flexWrap: "wrap",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: slate[200],
          color: slate[500],
          fontSize: "12px",
          lineHeight: "16px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          alignItems: "flex-start",
          "& > .MuiFormLabel-root": {
            marginBottom: "8px",
          },
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          "&.MuiRadioGroup-root": {
            gap: "8px",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0,
          marginLeft: "12px",
          marginRight: "8px",
          color: slate[900],
        },
        sizeSmall: {
          width: "16px",
          height: "16px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "14px",
          lineHeight: "24px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "large",
      },
      styleOverrides: {
        colorInherit: {
          color: slate[900],
          backgroundColor: slate[100],
        },
        sizeLarge: {
          padding: "0px 16px",
          minWidth: "80px",
          height: "40px",
        },
        root: {
          width: "max-content",
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 400,
          boxShadow: "none",
          borderRadius: "6px",
          textTransform: "capitalize",

          "&:hover": {
            boxShadow: "none",
          },

          "&.MuiButton-colorError": {
            color: "white",
            backgroundColor: red[500],

            "&:hover": {
              backgroundColor: red[600],
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: slate[200],
          },
        },
        icon: {
          color: slate[500],
        },
      },
      defaultProps: {
        IconComponent: ChevronDownIcon,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: `${slate[900]} !important`,
        },
      },
    },
  },

  palette: {
    text: {
      primary: slate[900],
      secondary: slate[500],
      disabled: slate[300],
    },
    success: {
      main: "#16A34A",
      light: "#0D9488",
    },
    error: {
      dark: "#B91C1C",
      main: "#DC2626",
      light: "#EF4444",
    },
    grey: slate,
    divider: slate[200],
    action: {
      selected: slate[100],
      hover: slate[50],
    },
    mode: "light",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
};

const themeOptionsEmployee: ThemeOptions = {
  palette: {
    primary: {
      ...teal,
      main: teal[600],
    },
    secondary: {
      ...slate,
      main: slate[900],
    },
  },
};

const themeOptionsManager: ThemeOptions = {
  palette: {
    primary: {
      ...indigo,
      main: indigo[600],
    },
  },
};

const themeEmployee = createTheme(
  deepmerge(themeOptionsEmployee, themeOptionsBase),
);

const themeManager = createTheme(
  deepmerge(themeOptionsManager, themeOptionsBase),
);

type Props = PropsWithChildren<{
  role?: Role;
}>;

export const ThemeProvider = ({ children, role = Role.EMPLOYEE }: Props) => {
  let selectedTheme = themeEmployee;

  switch (role) {
    case Role.EMPLOYEE:
      selectedTheme = themeEmployee;
      break;
    case Role.MANAGER:
      selectedTheme = themeManager;
      break;
    default:
      selectedTheme = themeEmployee;
  }

  return (
    <MuiThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": {
            minHeight: "100dvh",
          },
          html: { WebkitFontSmoothing: "auto" },
        }}
      />
      {children}
    </MuiThemeProvider>
  );
};
