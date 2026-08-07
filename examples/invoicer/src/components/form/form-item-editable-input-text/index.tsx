import { type PropsWithChildren, useState } from "react";
import {
  Button,
  Flex,
  Form,
  type FormItemProps,
  Input,
  Skeleton,
  Typography,
} from "antd";
import InputMask from "react-input-mask";
import { EditOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";

type Props = {
  icon?: React.ReactNode;
  placeholder?: string;
  formItemProps?: FormItemProps;
  variant?: "text" | "phone";
  loading?: boolean;
  onEditClick?: () => void;
  onCancelClick?: () => void;
  onSave?: () => void;
};

export const FormItemEditableInputText = ({
  icon,
  placeholder,
  formItemProps,
  variant = "text",
  loading,
  onEditClick,
  onCancelClick,
  onSave,
}: PropsWithChildren<Props>) => {
  const [disabled, setDisabled] = useState(true);

  const { styles, cx } = useStyles();
  const form = Form.useFormInstance();

  const handleEdit = () => {
    setDisabled(false);
    onEditClick?.();
  };

  const handleOnCancel = () => {
    setDisabled(true);
    form.resetFields([formItemProps?.name]);
    onCancelClick?.();
  };

  const handleOnSave = async () => {
    try {
      await form.validateFields();
      form.submit();
      setDisabled(true);
      onSave?.();
    } catch (error) {}
  };

  return (
    <Flex align="center" vertical={!disabled} className={styles.container}>
      <Form.Item
        {...formItemProps}
        rules={disabled ? [] : formItemProps?.rules}
        className={cx(styles.formItem, {
          [styles.formItemDisabled]: disabled,
          [styles.formItemEnabled]: !disabled,
        })}
        label={
          formItemProps?.label && (
            <Flex gap={16} align="center">
              <Typography.Text type="secondary">{icon}</Typography.Text>
              <Typography.Text type="secondary">
                {formItemProps?.label}
              </Typography.Text>
            </Flex>
          )
        }
      >
        {loading && (
          <Skeleton.Input
            style={{ height: "22px", marginLeft: "32px" }}
            active
          />
        )}
        {!loading && variant === "phone" && (
          <InputMask mask="(999) 999-9999">
            {/* @ts-expect-error  <InputMask /> expects React.JSX.Element but we are using React.ReactNode */}
            {(props: InputProps) => (
              <Input
                {...props}
                disabled={disabled}
                placeholder={placeholder}
                addonBefore={<div style={{ width: "8px" }} />}
              />
            )}
          </InputMask>
        )}
        {!loading && variant === "text" && (
          <Input
            disabled={disabled}
            placeholder={placeholder}
            addonBefore={<div style={{ width: "8px" }} />}
          />
        )}
      </Form.Item>
      {disabled && <Button icon={<EditOutlined />} onClick={handleEdit} />}
      {!disabled && (
        <Flex
          gap={8}
          style={{
            alignSelf: "flex-end",
            marginTop: "8px",
          }}
        >
          <Button onClick={handleOnCancel}>Cancel</Button>
          <Button type="primary" onClick={handleOnSave}>
            Save
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
