import { createStyles } from "antd-style";

export const useStyles = createStyles((props) => {
  return {
    container: {
      position: "relative",
    },

    upload: {
      overflow: "hidden",
      display: "block",
      borderRadius: "6px",

      "ant-avatar-image": {
        borderRadius: "6px",
      },

      img: {
        width: "98px",
        height: "98px",
      },
    },

    overlayContainer: {
      cursor: "pointer",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      right: 0,
      height: "50%",
      width: "96px",
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      borderBottomLeftRadius: "6px",
      borderBottomRightRadius: "6px",
    },

    overlayIconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      width: "32px",
      height: "32px",
    },

    overlayIcon: { color: "white", width: "16px", height: "16px" },
  };
});
