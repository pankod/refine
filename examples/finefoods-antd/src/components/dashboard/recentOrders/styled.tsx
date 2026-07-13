import { createStyles } from "antd-style";

export const useStyles = createStyles(({ isDarkMode }) => {
  return {
    pagination: {
      margin: "0 !important",
      padding: "16px 0",
      borderRadius: 8,
      backgroundColor: isDarkMode ? "#1F1F1F" : "#FAFAFA",
    },
    column: {
      verticalAlign: "top",
      whiteSpace: "nowrap",
    },
  };
});
