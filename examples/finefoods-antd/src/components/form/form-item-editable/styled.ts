import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    formItem: {
      height: "40px",
      display: "flex",
      alignItems: "center",
      width: "100%",

      ".ant-input-disabled": {
        borderColor: "transparent",
        backgroundColor: "transparent",
        color: token.colorText,
        userSelect: "text",
        cursor: "text",
      },
    },
    title: {
      ".ant-input-disabled": {
        fontSize: token.fontSizeHeading3,
        padding: 0,
        margin: 0,
      },
    },
    default: {},
  };
});
