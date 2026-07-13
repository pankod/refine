import { createStyles } from "antd-style";

export const useStyles = createStyles((props) => {
  return {
    container: {
      padding: "8px 16px",

      ".ant-form-item": {
        marginBottom: "0",
        width: "100%",
      },
      ".ant-form-item-explain-error": {
        marginLeft: "32px",
      },

      "input::placeholder": {
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
      ".ant-form-item-label": {
        padding: 0,
      },

      ".ant-input-disabled": {
        borderColor: "transparent",
        backgroundColor: "transparent",
        color: props.token.colorText,
        userSelect: "text",
        cursor: "text",
        paddingLeft: 0,
      },
    },
  };
});
