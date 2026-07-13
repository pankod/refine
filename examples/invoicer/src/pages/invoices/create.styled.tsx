import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, isDarkMode }) => {
  return {
    serviceTableWrapper: {
      overflow: "auto",
    },
    serviceTableContainer: {
      minWidth: "960px",
      borderRadius: "8px",
      border: `1px solid ${token.colorBorder}`,
    },
    serviceHeader: {
      background: isDarkMode ? "#1F1F1F" : "#FAFAFA",
      borderRadius: "8px 8px 0 0",
    },
    serviceHeaderDivider: {
      height: "24px",
      marginTop: "auto",
      marginBottom: "auto",
      marginInline: "0",
    },
    serviceHeaderColumn: {
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
    },
    serviceRowColumn: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
    },
    addNewServiceItemButton: {
      color: token.colorPrimary,
    },
    labelTotal: {
      color: token.colorTextSecondary,
    },
  };
});
