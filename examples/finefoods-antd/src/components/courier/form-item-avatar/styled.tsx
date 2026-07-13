import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    formItem: {
      ".ant-upload .ant-upload-disabled .ant-upload-btn": {
        borderColor: "transparent",
        backgroundColor: "transparent",
        color: token.colorText,
        userSelect: "text",
        cursor: "text",
      },
    },
    upload: {
      position: "relative",

      ".ant-upload .ant-upload-btn": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      },

      ".ant-upload-drag": {
        border: "none !important",
        background: "transparent",
      },

      ".ant-avatar": {
        border: "none",
      },
    },
    container: {
      position: "relative",
      width: "72px",
      height: "72px",
      overflow: "hidden",
      borderRadius: "100%",
    },
    avatar: {
      aspectRatio: 1,
      objectFit: "contain",
      width: "72px",
      height: "72px",
      borderRadius: "100%",
      background: "#D9D9D9",
    },
    overlay: {
      position: "absolute",
      width: "72px",
      height: "36px",
      borderBottomLeftRadius: "100%",
      borderBottomRightRadius: "100%",
      background: "rgba(0, 0, 0, 0.45)",
      bottom: 0,
    },
    overlayIcon: {
      fontSize: "24px",
      color: "white",
    },
  };
});
