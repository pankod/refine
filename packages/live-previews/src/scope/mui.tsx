import React from "react";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import type * as RefineMuiTypes from "@refinedev/mui";
import * as MuiMaterialStyles from "@mui/material/styles";

import * as EmotionReact from "@emotion/react";
import * as EmotionStyled from "@emotion/styled";
import * as MuiLab from "@mui/lab";
import * as MuiMaterial from "@mui/material";
import * as MuiXDataGrid from "@mui/x-data-grid";
import * as ReactHookForm from "react-hook-form";

import * as RefineMui from "@refinedev/mui";

const { CssBaseline, GlobalStyles } = MuiMaterial;

import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Camera from "@mui/icons-material/Camera";
import ListOutlined from "@mui/icons-material/ListOutlined";
import Logout from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import MenuRounded from "@mui/icons-material/MenuRounded";
import Menu from "@mui/icons-material/Menu";
import Dashboard from "@mui/icons-material/Dashboard";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";

import axios from "axios";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const RefineMuiDemo: React.FC<
  Partial<RefineProps> & {
    initialRoutes?: string[];
  }
> = ({ initialRoutes, ...rest }) => {
  if (initialRoutes) {
    RefineCommonScope.setInitialRoutes(initialRoutes);
  }

  return (
    <ThemeProvider theme={RefineMui.LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineMui.RefineSnackbarProvider>
        <RefineCommonScope.RefineCore.Refine
          routerProvider={RefineCommonScope.RefineReactRouter.default}
          dataProvider={RefineCommonScope.RefineSimpleRest.default(
            SIMPLE_REST_API_URL,
          )}
          notificationProvider={RefineMui.useNotificationProvider}
          options={{
            disableTelemetry: true,
          }}
          {...rest}
        />
      </RefineMui.RefineSnackbarProvider>
    </ThemeProvider>
  );
};

const ThemedTitle = ({
  collapsed,
  wrapperStyles,
  text: textFromProps,
  icon: iconFromProps,
}: RefineMuiTypes.RefineLayoutThemedTitleProps) => {
  const [svgContent, setSvgContent] = React.useState<string | undefined>(
    window.__refineIconSVGContent || undefined,
  );
  const [title, setTitle] = React.useState<string | undefined>(
    window.__refineTitleContent || undefined,
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const messageListener = (event: MessageEvent) => {
        if (event.data.type === "UPDATE_DYNAMIC_VALUES") {
          if (event.data.payload?.title) {
            setTitle(event.data.payload?.title);

            if (typeof window !== "undefined") {
              window.__refineTitleContent = event.data.payload?.title;
            }
          }

          if (event.data.payload?.icon) {
            try {
              axios
                .get(`/assets/icons/${event.data.payload.icon}`)
                .then((res) => {
                  const content = res.data
                    .replace(/fill\=\"white\"/g, `fill="currentColor"`)
                    .replace(/stroke\=\"white\"/g, `stroke="currentColor"`);

                  setSvgContent(content);

                  if (typeof window !== "undefined") {
                    window.__refineIconSVGContent = content;
                  }
                });
            } catch (error) {
              console.error(error);
            }
          }
        }
      };

      window.addEventListener("message", messageListener);

      return () => {
        window.removeEventListener("message", messageListener);
      };
    }

    return () => undefined;
  }, []);

  return (
    <RefineMui.ThemedTitle
      collapsed={collapsed}
      wrapperStyles={wrapperStyles}
      text={title || textFromProps}
      icon={svgContent ? parseHtml(svgContent) : iconFromProps}
    />
  );
};

const ThemeProvider = ({
  children,
  theme,
}: {
  children?: React.ReactNode;
  theme?: { palette?: { mode?: "light" | "dark" } };
}) => {
  const [themeFromWindow, setThemeFromWindow] = React.useState<
    undefined | string
  >(undefined);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const messageListener = (event: MessageEvent) => {
        if (event.data.type === "UPDATE_DYNAMIC_VALUES") {
          if (event.data.payload?.theme) {
            setThemeFromWindow(event.data.payload.theme);
          }
        }
      };

      window.addEventListener("message", messageListener);

      return () => {
        window.removeEventListener("message", messageListener);
      };
    }

    return () => undefined;
  }, []);

  const isLightPalette = theme?.palette?.mode === "light";

  const RefineThemeFromWindow = React.useMemo(() => {
    if (themeFromWindow && themeFromWindow in RefineMui.RefineThemes) {
      if (isLightPalette) {
        return RefineMui.RefineThemes[
          themeFromWindow as keyof typeof RefineMui.RefineThemes
        ];
      }
      return RefineMui.RefineThemes[
        `${themeFromWindow}Dark` as keyof typeof RefineMui.RefineThemes
      ];
    }

    return undefined;
  }, [themeFromWindow, isLightPalette]);

  return (
    <MuiMaterialStyles.ThemeProvider
      theme={(RefineThemeFromWindow as any) ?? theme}
    >
      {children}
    </MuiMaterialStyles.ThemeProvider>
  );
};

const MuiScope = {
  // ...RefineCommonScope,
  RefineMuiDemo,
  RefineMui: {
    ...RefineMui,
    ThemedTitle,
  },
  EmotionReact,
  EmotionStyled,
  MuiLab,
  MuiMaterial,
  MuiXDataGrid,
  MuiMaterialStyles: {
    ...MuiMaterialStyles,
    ThemeProvider,
  },
  ReactHookForm,
  MuiIconsMaterial: {
    Close,
    Check,
    LightModeOutlined,
    DarkModeOutlined,
    ArrowRight,
    Camera,
    ListOutlined,
    Logout,
    ExpandLess,
    ExpandMore,
    ChevronLeft,
    ChevronRight,
    MenuRounded,
    Menu,
    Dashboard,
  },
};

export default MuiScope;
