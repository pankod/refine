import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    card: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      ":hover": {
        ".viewButton": {
          display: "block !important",
        },
      },
    },
    viewButton: {
      position: "absolute",
      display: "none !important",
      width: "max-content !important",
      top: "50%",
      left: 0,
      marginLeft: "50%",
      transform: "translate(-50%, -50%)",
      padding: "5px 12px 5px 12px",
      zIndex: 1,
      backgroundColor: token.colorBgContainer,
    },
  };
});
