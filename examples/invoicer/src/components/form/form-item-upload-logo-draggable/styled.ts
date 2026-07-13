import { createStyles } from "antd-style";

export const useStyles = createStyles((props) => {
  return {
    container: {
      ".ant-upload-wrapper .ant-upload-drag .ant-upload": {
        padding: 0,
        width: "148px",
        height: "148px",
      },
    },
  };
});
