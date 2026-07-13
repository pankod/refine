import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  headerTitle: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    fontWeight: "bold",
    borderBottom: "1px",
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
    backgroundColor: token.colorBgTextHover,
  },
  userName: {
    display: "flex !important",
    color: token.colorTextHeading,
    fontSize: "14px",
  },
}));
