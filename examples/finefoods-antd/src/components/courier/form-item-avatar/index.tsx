import { type UseFormReturnType, getValueFromEvent } from "@refinedev/antd";
import { Avatar, Flex, Form, Upload } from "antd";
import { useApiUrl } from "@refinedev/core";
import type { ICourier } from "../../../interfaces";
import { useStyles } from "./styled";
import { CloudUploadOutlined } from "@ant-design/icons";

type Props = {
  formProps: UseFormReturnType<ICourier>["formProps"];
  showUploadOverlay?: boolean;
  containerStyle?: React.CSSProperties;
  disabled?: boolean;
};

export const CourierFormItemAvatar = ({
  formProps,
  containerStyle,
  showUploadOverlay = true,
  disabled,
}: Props) => {
  const apiUrl = useApiUrl();
  const { styles } = useStyles();

  const avatars = Form.useWatch("avatar", formProps.form);
  const avatar = avatars?.[0] || null;
  const previewImageURL = avatar?.url || avatar?.response?.url;

  return (
    <Form.Item
      name="avatar"
      valuePropName="fileList"
      getValueFromEvent={getValueFromEvent}
      className={styles.formItem}
      style={{
        margin: 0,
        ...containerStyle,
      }}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Upload.Dragger
        name="file"
        action={`${apiUrl}/media/upload`}
        maxCount={1}
        accept=".png"
        showUploadList={false}
        className={styles.upload}
      >
        <Flex
          vertical
          align="center"
          justify="center"
          className={styles.container}
        >
          <Avatar
            shape="circle"
            className={styles.avatar}
            src={previewImageURL || "/images/courier-default-avatar.png"}
            alt="Courier Avatar"
          />
          {showUploadOverlay && !disabled && (
            <div className={styles.overlay}>
              <CloudUploadOutlined className={styles.overlayIcon} />
            </div>
          )}
        </Flex>
      </Upload.Dragger>
    </Form.Item>
  );
};
