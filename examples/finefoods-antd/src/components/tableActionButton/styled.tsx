import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginTop: -6,
      width: 32,
      height: 32,
      border: `1px solid ${token.colorBorder}`,
      borderRadius: 6,
      fontSize: 16,
    },
  };
});
