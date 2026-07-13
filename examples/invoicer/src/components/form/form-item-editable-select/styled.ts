import { createStyles } from "antd-style";

export const useStyles = createStyles((props) => {
  return {
    container: {
      padding: "8px 16px",

      ".ant-form-item": {
        marginBottom: "0",
        width: "100%",
      },

      ".ant-select-selection-placeholder": {
        color: props.token.colorPrimary,
      },
    },

    formItem: {
      ".ant-input-group >.ant-input:last-child": {
        borderStartStartRadius: "6px",
        borderEndStartRadius: "6px",
      },

      ".ant-input-group-addon": {
        opacity: "0 !important",
      },
    },

    formItemEnabled: {},

    formItemDisabled: {
      ".ant-select-disabled": {
        ".ant-select-selector": {
          backgroundColor: "transparent !important",
          borderColor: "transparent !important",
          background: "transparent !important",
          color: `${props.token.colorText} !important`,
          userSelect: "text",
          cursor: "text",
          paddingLeft: "30px",
        },

        ".ant-select-arrow": {
          display: "none",
        },
      },
    },
  };
});
