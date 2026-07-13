import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
  return {
    container: {
      ".ant-card-body": {
        padding: "0",
      },

      ".ant-card-head": {
        padding: "32px",
        background: token.colorBgContainer,
      },

      "@media print": {
        margin: "0 auto",
        minHeight: "100dvh",
        maxWidth: "892px",

        ".ant-card": {
          boxShadow: "none",
          border: "none",
        },

        ".ant-card-head": {
          padding: "0 !important",
        },

        ".ant-col": {
          maxWidth: "50% !important",
          flex: "0 0 50% !important",
        },

        table: {
          width: "unset !important",
        },

        ".ant-table-container::after": {
          content: "none",
        },
        ".ant-table-container::before": {
          content: "none",
        },
      },
    },
    fromToContainer: {
      minHeight: "192px",
      padding: "32px",

      "@media print": {
        flexWrap: "nowrap",
        flexFlow: "row nowrap",
        minHeight: "unset",
        padding: "32px 0",
      },
    },
    productServiceContainer: {
      padding: "32px",

      "@media print": {
        padding: "0",
        marginTop: "32px",
      },
    },
    labelTotal: {
      color: token.colorTextSecondary,
    },
  };
});
