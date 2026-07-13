import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, isDarkMode }) => {
  return {
    headerTitleRefine: {
      fontFamily: "Bricolage Grotesque, sans-serif",
      color: isDarkMode ? token["purple-10"] : token["purple-8"],
    },
    headerTitleInvoicer: {
      fontFamily: "Bricolage Grotesque, sans-serif",
      color: isDarkMode ? token["purple-10"] : token["purple-8"],
      fontWeight: 700,
    },
    tabs: {
      marginLeft: "auto",
      marginRight: "auto",

      ".ant-tabs-nav": {
        height: "48px",
      },
    },
    inputSuffix: {
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: token.colorBgTextHover,
      color: token.colorTextDisabled,
      borderRadius: "4px",
      fontSize: "12px",
    },
    inputPrefix: {
      color: token.colorTextPlaceholder,
      marginRight: "4px",
    },
    languageSwitchText: {
      color: token.colorTextSecondary,
    },
    languageSwitchIcon: {
      color: token.colorTextTertiary,
      width: "10px",
    },
    themeSwitch: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "32px",
      width: "32px",
      borderRadius: "50%",
      cursor: "pointer",
      flexShrink: 0,
      backgroundColor: isDarkMode
        ? token.colorBgLayout
        : token.colorBgTextHover,
    },
    userName: {
      display: "flex !important",
      color: token.colorTextHeading,
      fontSize: "14px",
    },
    rightSlot: {
      marginLeft: "auto",

      "@media (max-width: 1000px)": {
        padding: "16px",
      },
    },
  };
});
