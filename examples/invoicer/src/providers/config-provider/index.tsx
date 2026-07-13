import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ConfigProvider as AntdConfigProvider,
  type ThemeConfig,
  theme,
} from "antd";
import { ThemeProvider } from "antd-style";
import { RefineThemes } from "@refinedev/antd";

type ConfigProviderType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ConfigProviderContext = createContext<ConfigProviderType>(
  {} as ConfigProviderType,
);

export const ConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference,
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;
  const algorithm = mode === "light" ? defaultAlgorithm : darkAlgorithm;
  const customTheme: ThemeConfig = {
    // you can change the theme colors here. example: ...RefineThemes.Magenta,
    ...RefineThemes.Purple,
    cssVar: true,
    algorithm,
    components: {
      Card: {
        headerBg: mode === "dark" ? "#1F1F1F" : "#FAFAFA",
      },
      Tabs: {
        horizontalMargin: "0px",
        inkBarColor: theme.getDesignToken({ algorithm }).purple8,
        itemActiveColor: theme.getDesignToken({ algorithm }).purple8,
        itemSelectedColor: theme.getDesignToken({ algorithm }).purple8,
      },
    },
  };

  return (
    <ConfigProviderContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <AntdConfigProvider theme={customTheme}>
        <ThemeProvider theme={customTheme} appearance={mode}>
          {children}
        </ThemeProvider>
      </AntdConfigProvider>
    </ConfigProviderContext.Provider>
  );
};

export const useConfigProvider = () => {
  const context = useContext(ConfigProviderContext);
  if (!context) {
    throw new Error("useConfigProvider must be used within a ConfigProvider");
  }
  return context;
};
