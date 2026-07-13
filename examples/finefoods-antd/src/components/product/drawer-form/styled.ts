import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    uploadDragger: {
      width: "100% !important",
      height: "100% !important",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "16px",

      ".ant-upload-drag": {
        width: "240px !important",
        height: "240px !important",
        marginLeft: "auto",
        marginRight: "auto",
        border: "none",
        backgroundColor: token.colorBgContainer,
      },
      ".ant-upload-btn": {
        padding: "0px !important",
      },
    },
    formItem: {
      backgroundColor: token.colorBgContainer,
      padding: "16px",
      margin: 0,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    },
  };
});
