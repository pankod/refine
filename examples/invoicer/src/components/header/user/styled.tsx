import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, isDarkMode }) => {
  return {
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
